import type { Pool, PoolClient } from 'pg';
import type { FreshAuthenticationGuard } from './fresh-authentication.js';

export interface AccountDeletionSchedule {
  deletionDueAt: Date;
  auditRetention: {
    purpose: string;
    reason: string;
    retainUntil: Date;
  };
}

export interface AccountDeletionPolicy {
  resolveSchedule(accountId: string, requestedAt: Date): Promise<AccountDeletionSchedule>;
}

export interface AccountDeletionService {
  requestDeletion(input: {
    accountId: string;
    currentPassword: string;
    confirmation: string;
  }): Promise<{ requestedAt: Date; deletionDueAt: Date } | null>;
  executeDueDeletions(): Promise<{ deletedAccounts: number; expiredAuditRecords: number }>;
}

export class AccountDeletionUnavailableError extends Error {
  constructor() {
    super('The account deletion retention policy is not configured.');
    this.name = 'AccountDeletionUnavailableError';
  }
}

export const ACCOUNT_DELETION_CONFIRMATION = 'DELETE MY ACCOUNT';

function validateSchedule(schedule: AccountDeletionSchedule, requestedAt: Date): void {
  const { deletionDueAt, auditRetention } = schedule;
  if (
    !(deletionDueAt instanceof Date) ||
    !Number.isFinite(deletionDueAt.getTime()) ||
    deletionDueAt.getTime() <= requestedAt.getTime() ||
    !auditRetention ||
    typeof auditRetention.purpose !== 'string' ||
    !auditRetention.purpose.trim() ||
    typeof auditRetention.reason !== 'string' ||
    !auditRetention.reason.trim() ||
    !(auditRetention.retainUntil instanceof Date) ||
    !Number.isFinite(auditRetention.retainUntil.getTime()) ||
    auditRetention.retainUntil.getTime() <= deletionDueAt.getTime()
  ) {
    throw new AccountDeletionUnavailableError();
  }
}

export function createAccountDeletionService(
  database: Pool,
  freshAuthentication: FreshAuthenticationGuard,
  policy: AccountDeletionPolicy | null,
  clock: () => Date = () => new Date(),
): AccountDeletionService {
  return {
    async requestDeletion(input) {
      if (!policy || input.confirmation !== ACCOUNT_DELETION_CONFIRMATION) {
        throw new AccountDeletionUnavailableError();
      }

      const requestedAt = clock();
      const schedule = await policy.resolveSchedule(input.accountId, requestedAt);
      validateSchedule(schedule, requestedAt);

      const authenticated = await freshAuthentication.execute(
        input.accountId,
        input.currentPassword,
        async (client: PoolClient) => {
          await client.query(
            `UPDATE accounts
             SET status = 'disabled', updated_at = $2
             WHERE account_id = $1 AND status = 'active'`,
            [input.accountId, requestedAt],
          );
          await client.query(
            `UPDATE sessions
             SET revoked_at = COALESCE(revoked_at, $2)
             WHERE account_id = $1`,
            [input.accountId, requestedAt],
          );
          await client.query(
            `INSERT INTO account_deletion_requests (
               account_id,
               requested_at,
               deletion_due_at,
               audit_retention_purpose,
               audit_retention_reason,
               audit_retain_until
             )
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              input.accountId,
              requestedAt,
              schedule.deletionDueAt,
              schedule.auditRetention.purpose.trim(),
              schedule.auditRetention.reason.trim(),
              schedule.auditRetention.retainUntil,
            ],
          );
          return { requestedAt, deletionDueAt: schedule.deletionDueAt };
        },
      );

      return authenticated.authenticated ? authenticated.value : null;
    },

    async executeDueDeletions() {
      const client = await database.connect();
      try {
        await client.query('BEGIN');
        const due = await client.query<{ deletion_request_id: string; account_id: string | null }>(
          `SELECT deletion_request_id, account_id
           FROM account_deletion_requests
           WHERE status = 'scheduled' AND deletion_due_at <= $1
           ORDER BY deletion_due_at
           FOR UPDATE SKIP LOCKED`,
          [clock()],
        );

        let deletedAccounts = 0;
        for (const request of due.rows) {
          if (request.account_id) {
            const deleted = await client.query(
              `DELETE FROM accounts
               WHERE account_id = $1 AND status = 'disabled'`,
              [request.account_id],
            );
            deletedAccounts += deleted.rowCount ?? 0;
          }
          await client.query(
            `UPDATE account_deletion_requests
             SET status = 'completed', completed_at = $2
             WHERE deletion_request_id = $1 AND status = 'scheduled'`,
            [request.deletion_request_id, clock()],
          );
        }

        const expired = await client.query(
          `DELETE FROM account_deletion_requests
           WHERE status = 'completed' AND audit_retain_until <= $1`,
          [clock()],
        );
        await client.query('COMMIT');
        return {
          deletedAccounts,
          expiredAuditRecords: expired.rowCount ?? 0,
        };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
  };
}

/**
 * Owner-approved initial account-deletion policy.
 *
 * Personal data is deleted 30 days after a confirmed request. The minimal
 * deletion audit record is retained for 12 calendar months after deletion.
 * Legal review remains a production-readiness check for the applicable markets.
 */
export const ACCOUNT_DELETION_GRACE_PERIOD_DAYS = 30;
export const ACCOUNT_DELETION_AUDIT_RETENTION_MONTHS = 12;

function addUtcCalendarMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const dayOfMonth = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const lastDayOfTargetMonth = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();
  result.setUTCDate(Math.min(dayOfMonth, lastDayOfTargetMonth));
  return result;
}

export function createApprovedAccountDeletionPolicy(): AccountDeletionPolicy {
  return {
    async resolveSchedule(_accountId, requestedAt) {
      const deletionDueAt = new Date(
        requestedAt.getTime() + ACCOUNT_DELETION_GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000,
      );
      return {
        deletionDueAt,
        auditRetention: {
          purpose: 'Minimal account-deletion security and compliance audit evidence',
          reason:
            'Retain the deletion event and its approved schedule for 12 months after personal-data deletion',
          retainUntil: addUtcCalendarMonths(
            deletionDueAt,
            ACCOUNT_DELETION_AUDIT_RETENTION_MONTHS,
          ),
        },
      };
    },
  };
}
