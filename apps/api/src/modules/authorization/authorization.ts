import type { Pool, PoolClient } from 'pg';

export interface AuthorizationRequest {
  accountId: string;
  permission: string;
  requirePro?: boolean;
  featureKey?: string;
}

export type AuthorizationDecision =
  | { allowed: true }
  | {
      allowed: false;
      reason:
        | 'account_unknown'
        | 'account_disabled'
        | 'permission_unknown'
        | 'permission_stale'
        | 'permission_denied'
        | 'entitlement_unknown'
        | 'entitlement_stale'
        | 'pro_required'
        | 'activation_unknown'
        | 'activation_stale'
        | 'activation_disabled'
        | 'unavailable';
    };

type AuthorizationDatabase = Pick<Pool, 'connect'>;
const KEY_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;

export function createAuthorizationService(database: AuthorizationDatabase): {
  authorize(request: AuthorizationRequest): Promise<AuthorizationDecision>;
} {
  return {
    async authorize(request) {
      if (
        !request.accountId ||
        !request.permission ||
        !KEY_PATTERN.test(request.permission) ||
        (request.featureKey !== undefined && !KEY_PATTERN.test(request.featureKey))
      ) {
        return { allowed: false, reason: 'permission_unknown' };
      }

      let client: PoolClient | undefined;
      try {
        client = await database.connect();
        await client.query('BEGIN');

        const account = await client.query<{ status: string }>(
          'SELECT status FROM accounts WHERE account_id = $1 FOR SHARE',
          [request.accountId],
        );
        if (!account.rowCount) {
          await client.query('COMMIT');
          return { allowed: false, reason: 'account_unknown' };
        }
        if (account.rows[0]?.status !== 'active') {
          await client.query('COMMIT');
          return { allowed: false, reason: 'account_disabled' };
        }

        const permission = await client.query<{ granted: boolean; state_status: string }>(
          'SELECT granted, state_status FROM account_permissions WHERE account_id = $1 AND permission_key = $2 FOR SHARE',
          [request.accountId, request.permission],
        );
        if (!permission.rowCount || permission.rows[0]?.state_status === 'unknown') {
          await client.query('COMMIT');
          return { allowed: false, reason: 'permission_unknown' };
        }
        if (permission.rows[0]?.state_status !== 'fresh') {
          await client.query('COMMIT');
          return { allowed: false, reason: 'permission_stale' };
        }
        if (permission.rows[0]?.granted !== true) {
          await client.query('COMMIT');
          return { allowed: false, reason: 'permission_denied' };
        }

        if (request.requirePro) {
          const entitlement = await client.query<{ pro_active: boolean; state_status: string }>(
            'SELECT pro_active, state_status FROM account_entitlements WHERE account_id = $1 FOR SHARE',
            [request.accountId],
          );
          if (!entitlement.rowCount || entitlement.rows[0]?.state_status === 'unknown') {
            await client.query('COMMIT');
            return { allowed: false, reason: 'entitlement_unknown' };
          }
          if (entitlement.rows[0]?.state_status !== 'fresh') {
            await client.query('COMMIT');
            return { allowed: false, reason: 'entitlement_stale' };
          }
          if (entitlement.rows[0]?.pro_active !== true) {
            await client.query('COMMIT');
            return { allowed: false, reason: 'pro_required' };
          }
        }

        if (request.featureKey) {
          const activation = await client.query<{ enabled: boolean; state_status: string }>(
            'SELECT enabled, state_status FROM system_feature_controls WHERE feature_key = $1 FOR SHARE',
            [request.featureKey],
          );
          if (!activation.rowCount || activation.rows[0]?.state_status === 'unknown') {
            await client.query('COMMIT');
            return { allowed: false, reason: 'activation_unknown' };
          }
          if (activation.rows[0]?.state_status !== 'fresh') {
            await client.query('COMMIT');
            return { allowed: false, reason: 'activation_stale' };
          }
          if (activation.rows[0]?.enabled !== true) {
            await client.query('COMMIT');
            return { allowed: false, reason: 'activation_disabled' };
          }
        }

        await client.query('COMMIT');
        return { allowed: true };
      } catch {
        if (client) {
          try {
            await client.query('ROLLBACK');
          } catch {
            // Remain fail-closed when rollback itself is unavailable.
          }
        }
        return { allowed: false, reason: 'unavailable' };
      } finally {
        client?.release();
      }
    },
  };
}
