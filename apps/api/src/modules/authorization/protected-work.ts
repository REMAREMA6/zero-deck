import type { Pool, PoolClient } from 'pg';
import {
  evaluateAuthorizationInTransaction,
  isValidAuthorizationRequest,
  type AuthorizationDecision,
  type AuthorizationRequest,
} from './authorization.js';

/**
 * Executes an authorization-gated operation through a durable queue/dispatch
 * state transition. Operations must honor the supplied AbortSignal before each
 * outbound provider request and pass it to any cancellable transport.
 */
type ProtectedWorkDatabase = Pick<Pool, 'connect'>;

export type ProtectedWorkResult<T> =
  | { status: 'completed'; value: T }
  | { status: 'blocked'; decision: AuthorizationDecision }
  | { status: 'cancelled' }
  | { status: 'unavailable' }
  | { status: 'failed' };

async function finishWork(
  database: ProtectedWorkDatabase,
  workId: string,
  outcome: 'completed' | 'failed' | 'cancelled',
): Promise<'completed' | 'failed' | 'cancelled'> {
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const current = await client.query<{ status: string }>(
      'SELECT status FROM protected_work_items WHERE work_id = $1 FOR UPDATE',
      [workId],
    );
    const status = current.rows[0]?.status;
    if (status === 'cancel_requested' || status === 'cancelled') {
      await client.query(
        "UPDATE protected_work_items SET status = 'cancelled', finished_at = now() WHERE work_id = $1",
        [workId],
      );
      await client.query('COMMIT');
      return 'cancelled';
    }
    if (status !== 'dispatched') {
      await client.query('COMMIT');
      return status === 'completed' || status === 'failed' ? status : 'cancelled';
    }
    await client.query(
      'UPDATE protected_work_items SET status = $2, finished_at = now() WHERE work_id = $1',
      [workId, outcome],
    );
    await client.query('COMMIT');
    return outcome;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // A failed finalization remains unavailable and is never treated as success.
    }
    throw error;
  } finally {
    client.release();
  }
}

export function createProtectedWorkService(database: ProtectedWorkDatabase): {
  execute<T>(
    request: AuthorizationRequest,
    operation: (signal: AbortSignal) => Promise<T>,
  ): Promise<ProtectedWorkResult<T>>;
} {
  return {
    async execute<T>(
      request: AuthorizationRequest,
      operation: (signal: AbortSignal) => Promise<T>,
    ): Promise<ProtectedWorkResult<T>> {
      if (!isValidAuthorizationRequest(request)) {
        return { status: 'blocked', decision: { allowed: false, reason: 'permission_unknown' } };
      }

      let listener: PoolClient | undefined;
      let workId: string | undefined;
      const notifiedWorkIds = new Set<string>();
      const controller = new AbortController();
      const onNotification = (message: { channel?: string; payload?: string }) => {
        if (message.channel !== 'zerodeck_protected_work' || !message.payload) return;
        notifiedWorkIds.add(message.payload);
        if (message.payload === workId) controller.abort();
      };
      const onListenerError = () => controller.abort();

      try {
        // LISTEN is established before admission so a revocation notification
        // cannot be lost between queue creation and dispatch.
        listener = await database.connect();
        listener.on('notification', onNotification);
        listener.on('error', onListenerError);
        await listener.query('LISTEN zerodeck_protected_work');

        const enqueueClient = await database.connect();
        try {
          await enqueueClient.query('BEGIN');
          const decision = await evaluateAuthorizationInTransaction(enqueueClient, request);
          if (!decision.allowed) {
            await enqueueClient.query('COMMIT');
            return { status: 'blocked', decision };
          }
          const inserted = await enqueueClient.query<{ work_id: string }>(
            'INSERT INTO protected_work_items (account_id, permission_key, require_pro, feature_key) VALUES ($1, $2, $3, $4) RETURNING work_id',
            [
              request.accountId,
              request.permission,
              request.requirePro ?? false,
              request.featureKey ?? null,
            ],
          );
          workId = inserted.rows[0]?.work_id;
          if (!workId) throw new Error('Protected work admission did not return an identifier.');
          await enqueueClient.query('COMMIT');
        } catch (error) {
          try {
            await enqueueClient.query('ROLLBACK');
          } catch {
            // The admission failure is returned as unavailable.
          }
          throw error;
        } finally {
          enqueueClient.release();
        }

        if (notifiedWorkIds.has(workId)) controller.abort();

        // Re-evaluate gates and transition queued -> dispatched under the same
        // transaction. Revocation triggers also transition queued work, so a
        // stale queue entry can never be dispatched.
        const dispatchClient = await database.connect();
        try {
          await dispatchClient.query('BEGIN');
          const decision = await evaluateAuthorizationInTransaction(dispatchClient, request);
          const current = await dispatchClient.query<{ status: string }>(
            'SELECT status FROM protected_work_items WHERE work_id = $1 FOR UPDATE',
            [workId],
          );
          if (
            !decision.allowed ||
            current.rows[0]?.status !== 'queued' ||
            controller.signal.aborted
          ) {
            await dispatchClient.query(
              "UPDATE protected_work_items SET status = 'cancelled', cancellation_reason = COALESCE(cancellation_reason, 'dispatch_denied'), finished_at = now() WHERE work_id = $1 AND status = 'queued'",
              [workId],
            );
            await dispatchClient.query('COMMIT');
            return decision.allowed ? { status: 'cancelled' } : { status: 'blocked', decision };
          }
          await dispatchClient.query(
            "UPDATE protected_work_items SET status = 'dispatched', dispatched_at = now() WHERE work_id = $1 AND status = 'queued'",
            [workId],
          );
          await dispatchClient.query('COMMIT');
        } catch (error) {
          try {
            await dispatchClient.query('ROLLBACK');
          } catch {
            // Remain fail-closed.
          }
          throw error;
        } finally {
          dispatchClient.release();
        }

        // The notification callback and this check run on the same event loop:
        // a revocation received before this point prevents the provider call.
        if (controller.signal.aborted) {
          await finishWork(database, workId, 'cancelled');
          return { status: 'cancelled' };
        }

        try {
          const value = await operation(controller.signal);
          const finalStatus = await finishWork(
            database,
            workId,
            controller.signal.aborted ? 'cancelled' : 'completed',
          );
          return finalStatus === 'completed' && !controller.signal.aborted
            ? { status: 'completed', value }
            : { status: 'cancelled' };
        } catch (error) {
          const finalStatus = await finishWork(
            database,
            workId,
            controller.signal.aborted ? 'cancelled' : 'failed',
          );
          if (finalStatus === 'cancelled' || controller.signal.aborted) {
            return { status: 'cancelled' };
          }
          return { status: 'failed' };
        }
      } catch {
        controller.abort();
        if (workId) {
          try {
            await finishWork(database, workId, 'cancelled');
          } catch {
            // No uncertain or failed work is surfaced as completed.
          }
        }
        return { status: 'unavailable' };
      } finally {
        if (listener) {
          listener.removeListener('notification', onNotification);
          listener.removeListener('error', onListenerError);
          try {
            await listener.query('UNLISTEN zerodeck_protected_work');
          } catch {
            // The dedicated listener is released regardless.
          }
          listener.release();
        }
      }
    },
  };
}
