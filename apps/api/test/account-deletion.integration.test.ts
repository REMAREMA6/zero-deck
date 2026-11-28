import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';
import { createAccountRegistrationService } from '../src/modules/identity/account-registration.js';
import {
  ACCOUNT_DELETION_CONFIRMATION,
  AccountDeletionUnavailableError,
  createAccountDeletionService,
} from '../src/modules/identity/account-deletion.js';
import { createFreshAuthenticationGuard } from '../src/modules/identity/fresh-authentication.js';
import { createSessionService } from '../src/modules/identity/sessions.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const registrationPolicy = { assertAccepted: () => undefined };

describe('policy-gated account deletion with PostgreSQL', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for account-deletion tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('requires an explicit schedule and retention reason before changing account state', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'DeletionPolicy-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, registrationPolicy).register({
      email,
      password: 'current-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    const accountId = account.rows[0]!.account_id;
    const sessions = createSessionService(pool);
    const issued = await sessions.authenticate(email, 'current-password');
    expect(issued).not.toBeNull();

    const deletion = createAccountDeletionService(pool, createFreshAuthenticationGuard(pool), null);
    await expect(
      deletion.requestDeletion({
        accountId,
        currentPassword: 'current-password',
        confirmation: ACCOUNT_DELETION_CONFIRMATION,
      }),
    ).rejects.toBeInstanceOf(AccountDeletionUnavailableError);

    const state = await pool.query<{ status: string }>(
      'SELECT status FROM accounts WHERE account_id = $1',
      [accountId],
    );
    expect(state.rows[0]?.status).toBe('active');
    expect(await sessions.authenticateToken(issued!.sessionToken)).not.toBeNull();
  });

  it('requires fresh password authentication and schedules deletion without claiming it is complete', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    let now = new Date('2026-11-28T12:00:00.000Z');
    const email = 'DeletionFlow-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, registrationPolicy).register({
      email,
      password: 'current-password',
    });
    const sessions = createSessionService(pool, () => now);
    const issued = await sessions.authenticate(email, 'current-password');
    expect(issued).not.toBeNull();

    const deletionDueAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const auditRetainUntil = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    const deletion = createAccountDeletionService(
      pool,
      createFreshAuthenticationGuard(pool),
      {
        resolveSchedule: async () => ({
          deletionDueAt,
          auditRetention: {
            purpose: 'Test-only deletion audit',
            reason: 'Verify scheduled account closure in integration tests',
            retainUntil: auditRetainUntil,
          },
        }),
      },
      () => now,
    );
    const app = buildApp({ database: pool, sessionService: sessions, accountDeletion: deletion });

    try {
      const wrongPassword = await app.inject({
        method: 'POST',
        url: '/v1/account/deletion',
        headers: { authorization: 'Bearer ' + issued!.sessionToken },
        payload: {
          currentPassword: 'incorrect-password',
          confirmation: ACCOUNT_DELETION_CONFIRMATION,
        },
      });
      expect(wrongPassword.statusCode).toBe(401);

      const request = await app.inject({
        method: 'POST',
        url: '/v1/account/deletion',
        headers: { authorization: 'Bearer ' + issued!.sessionToken },
        payload: {
          currentPassword: 'current-password',
          confirmation: ACCOUNT_DELETION_CONFIRMATION,
        },
      });
      expect(request.statusCode).toBe(202);
      expect(request.json()).toEqual({
        status: 'deletion_scheduled',
        accessDisabled: true,
        sessionsRevoked: true,
        deletionDueAt: deletionDueAt.toISOString(),
        personalDataDeleted: false,
      });

      expect(await sessions.authenticateToken(issued!.sessionToken)).toBeNull();
      expect(await sessions.authenticate(email, 'current-password')).toBeNull();

      const requestRow = await pool.query<{
        status: string;
        deletion_due_at: Date;
        audit_retention_purpose: string;
        audit_retention_reason: string;
        audit_retain_until: Date;
      }>(
        `SELECT status, deletion_due_at, audit_retention_purpose,
                audit_retention_reason, audit_retain_until
         FROM account_deletion_requests WHERE account_id = $1`,
        [issued!.accountId],
      );
      expect(requestRow.rows[0]).toMatchObject({
        status: 'scheduled',
        deletion_due_at: deletionDueAt,
        audit_retention_purpose: 'Test-only deletion audit',
        audit_retention_reason: 'Verify scheduled account closure in integration tests',
        audit_retain_until: auditRetainUntil,
      });

      const beforeDue = await deletion.executeDueDeletions();
      expect(beforeDue.deletedAccounts).toBe(0);
      expect(beforeDue.expiredAuditRecords).toBe(0);
      const accountBeforeDue = await pool.query('SELECT 1 FROM accounts WHERE account_id = $1', [
        issued!.accountId,
      ]);
      expect(accountBeforeDue.rowCount).toBe(1);

      now = deletionDueAt;
      const executed = await deletion.executeDueDeletions();
      expect(executed.deletedAccounts).toBe(1);
      expect(executed.expiredAuditRecords).toBe(0);

      const accountAfterDue = await pool.query('SELECT 1 FROM accounts WHERE account_id = $1', [
        issued!.accountId,
      ]);
      expect(accountAfterDue.rowCount).toBe(0);
      const credentialsAfterDue = await pool.query(
        'SELECT 1 FROM account_credentials WHERE account_id = $1',
        [issued!.accountId],
      );
      const sessionsAfterDue = await pool.query(
        'SELECT 1 FROM sessions WHERE account_id = $1',
        [issued!.accountId],
      );
      expect(credentialsAfterDue.rowCount).toBe(0);
      expect(sessionsAfterDue.rowCount).toBe(0);
      const retainedAudit = await pool.query<{
        account_id: string | null;
        status: string;
        completed_at: Date | null;
        audit_retention_reason: string;
      }>(
        `SELECT account_id, status, completed_at, audit_retention_reason
         FROM account_deletion_requests WHERE deletion_due_at = $1`,
        [deletionDueAt],
      );
      expect(retainedAudit.rows[0]).toMatchObject({
        account_id: null,
        status: 'completed',
        audit_retention_reason: 'Verify scheduled account closure in integration tests',
      });
      expect(retainedAudit.rows[0]?.completed_at).toBeInstanceOf(Date);

      now = auditRetainUntil;
      const expired = await deletion.executeDueDeletions();
      expect(expired.deletedAccounts).toBe(0);
      expect(expired.expiredAuditRecords).toBe(1);
    } finally {
      await app.close();
    }
  });

  it('rejects an unconfirmed deletion request without disabling the account', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'DeletionConfirm-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, registrationPolicy).register({
      email,
      password: 'current-password',
    });
    const sessions = createSessionService(pool);
    const issued = await sessions.authenticate(email, 'current-password');
    const deletion = createAccountDeletionService(pool, createFreshAuthenticationGuard(pool), {
      resolveSchedule: async (_accountId, requestedAt) => ({
        deletionDueAt: new Date(requestedAt.getTime() + 60_000),
        auditRetention: {
          purpose: 'Test-only',
          reason: 'Test confirmation boundary',
          retainUntil: new Date(requestedAt.getTime() + 120_000),
        },
      }),
    });
    const app = buildApp({ database: pool, sessionService: sessions, accountDeletion: deletion });

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/account/deletion',
        headers: { authorization: 'Bearer ' + issued!.sessionToken },
        payload: { currentPassword: 'current-password', confirmation: 'delete' },
      });
      expect(response.statusCode).toBe(422);
      const account = await pool.query<{ status: string }>(
        'SELECT status FROM accounts WHERE account_id = $1',
        [issued!.accountId],
      );
      expect(account.rows[0]?.status).toBe('active');
    } finally {
      await app.close();
    }
  });
});
