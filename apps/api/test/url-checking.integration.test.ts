import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { createUrlCheckService } from '../src/modules/website/url-checking.js';
import { createProtectedWorkService } from '../src/modules/authorization/protected-work.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

async function createAccount(accountId: string) {
  if (!pool) throw new Error('PostgreSQL is unavailable.');
  await pool.query(
    'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
    [accountId, accountId + '@example.test'],
  );
}

async function grantWebsitePermission(accountId: string) {
  if (!pool) throw new Error('PostgreSQL is unavailable.');
  await pool.query(
    'INSERT INTO account_permissions (account_id, permission_key, granted, state_status) VALUES ($1, $2, true, $3)',
    [accountId, 'website.check', 'fresh'],
  );
}

async function setUrlGates(accountId: string, pro: boolean, activation: boolean) {
  if (!pool) throw new Error('PostgreSQL is unavailable.');
  await pool.query(
    'INSERT INTO account_entitlements (account_id, pro_active, state_status) VALUES ($1, $2, $3)',
    [accountId, pro, 'fresh'],
  );
  await pool.query(
    "INSERT INTO system_feature_controls (feature_key, enabled, state_status) VALUES ('mvp03_url_check', $1, 'fresh') ON CONFLICT (feature_key) DO UPDATE SET enabled = EXCLUDED.enabled, state_status = 'fresh'",
    [activation],
  );
}

describe('MVP-03 independent URL-check authorization gates', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for URL-check integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('does not call the provider when Pro or owner activation is false or unknown', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await createAccount(accountId);
    await grantWebsitePermission(accountId);
    const lookup = vi.fn(async () => ({
      verdict: 'no_match',
      explanation: 'No known match was returned.',
    }));
    const service = createUrlCheckService(pool, { lookup });

    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'eligibility_unknown',
    });
    expect(lookup).not.toHaveBeenCalled();
    await setUrlGates(accountId, false, true);
    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'pro_required',
    });
    expect(lookup).not.toHaveBeenCalled();
    await pool.query('UPDATE account_entitlements SET pro_active = true WHERE account_id = $1', [
      accountId,
    ]);
    await pool.query(
      "UPDATE system_feature_controls SET enabled = false WHERE feature_key = 'mvp03_url_check'",
    );
    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'activation_disabled',
    });
    expect(lookup).not.toHaveBeenCalled();
  });

  it('calls the provider only after permission, both independent gates and consent pass', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await createAccount(accountId);
    await grantWebsitePermission(accountId);
    await setUrlGates(accountId, true, true);
    const lookup = vi.fn(async () => ({
      verdict: 'no_match',
      explanation: 'No known match was returned. This is not a safety guarantee.',
    }));
    const service = createUrlCheckService(pool, { lookup });

    await expect(service.check(accountId, 'https://example.com/path', false)).rejects.toThrow();
    expect(lookup).not.toHaveBeenCalled();
    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'completed',
      verdict: 'no_match',
      explanation: 'No known match was returned. This is not a safety guarantee.',
    });
    expect(lookup).toHaveBeenCalledTimes(1);
    expect(lookup).toHaveBeenCalledWith({
      url: 'https://example.com/path',
      signal: expect.any(AbortSignal),
    });
  });

  it('rejects unsupported schemes, malformed URLs and embedded credentials before dispatch', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const lookup = vi.fn();
    const service = createUrlCheckService(pool, { lookup });
    for (const value of ['javascript:alert(1)', 'file:///etc/passwd', '***example.com']) {
      await expect(service.check(randomUUID(), value, true)).rejects.toThrow();
    }
    expect(lookup).not.toHaveBeenCalled();
  });

  it('does not make a provider call when no provider is configured', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await createAccount(accountId);
    await grantWebsitePermission(accountId);
    await setUrlGates(accountId, true, true);
    const service = createUrlCheckService(pool, null);
    expect(await service.check(accountId, 'https://example.com', true)).toEqual({
      status: 'unavailable',
    });
  });

  it('cancels queued work before dispatch when permission is revoked in the admission-dispatch gap', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await createAccount(accountId);
    await grantWebsitePermission(accountId);

    let releaseDispatch: (() => void) | undefined;
    let signalDispatch: (() => void) | undefined;
    const dispatchReached = new Promise<void>((resolve) => {
      signalDispatch = resolve;
    });
    const dispatchGate = new Promise<void>((resolve) => {
      releaseDispatch = resolve;
    });
    let connectionCount = 0;
    const gatedDatabase = {
      connect: async () => {
        connectionCount += 1;
        if (connectionCount === 3) {
          signalDispatch?.();
          await dispatchGate;
        }
        return pool!.connect();
      },
    };
    const work = createProtectedWorkService(gatedDatabase);
    const providerOperation = vi.fn(async () => 'should-not-run');
    const pending = work.execute({ accountId, permission: 'website.check' }, providerOperation);

    await dispatchReached;
    await pool.query(
      "UPDATE account_permissions SET granted = false WHERE account_id = $1 AND permission_key = 'website.check'",
      [accountId],
    );
    releaseDispatch?.();

    await expect(pending).resolves.toEqual({
      status: 'blocked',
      decision: { allowed: false, reason: 'permission_denied' },
    });
    expect(providerOperation).not.toHaveBeenCalled();
    const workRows = await pool.query<{ status: string }>(
      'SELECT status FROM protected_work_items WHERE account_id = $1',
      [accountId],
    );
    expect(workRows.rows).toEqual([{ status: 'cancelled' }]);
  });

  it('aborts dispatched provider work when permission is revoked and never returns its result', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await createAccount(accountId);
    await grantWebsitePermission(accountId);
    await setUrlGates(accountId, true, true);

    let providerStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      providerStarted = resolve;
    });
    const lookup = vi.fn(
      ({ signal }: { url: string; signal: AbortSignal }) =>
        new Promise<never>((_resolve, reject) => {
          providerStarted?.();
          signal.addEventListener('abort', () => reject(new Error('provider aborted')), {
            once: true,
          });
        }),
    );
    const service = createUrlCheckService(pool, { lookup });
    const pending = service.check(accountId, 'https://example.com/path', true);

    await started;
    await pool.query(
      "UPDATE account_permissions SET granted = false WHERE account_id = $1 AND permission_key = 'website.check'",
      [accountId],
    );

    await expect(pending).resolves.toEqual({ status: 'cancelled' });
    expect(lookup).toHaveBeenCalledTimes(1);
    expect(lookup.mock.calls[0]?.[0].signal.aborted).toBe(true);
    const workRows = await pool.query<{ status: string }>(
      'SELECT status FROM protected_work_items WHERE account_id = $1',
      [accountId],
    );
    expect(workRows.rows).toEqual([{ status: 'cancelled' }]);
  });

  it('revokes queued and dispatched records for every independent authorization gate', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const cases = [
      { gate: 'account', reason: 'account_disabled' },
      { gate: 'permission', reason: 'permission_revoked' },
      { gate: 'entitlement', reason: 'entitlement_revoked' },
      { gate: 'activation', reason: 'owner_activation_revoked' },
    ] as const;

    for (const testCase of cases) {
      const accountId = randomUUID();
      await createAccount(accountId);
      await grantWebsitePermission(accountId);
      await setUrlGates(accountId, true, true);
      await pool.query(
        "INSERT INTO protected_work_items (account_id, permission_key, require_pro, feature_key, status) VALUES ($1, 'website.check', true, 'mvp03_url_check', 'queued'), ($1, 'website.check', true, 'mvp03_url_check', 'dispatched')",
        [accountId],
      );

      if (testCase.gate === 'account') {
        await pool.query("UPDATE accounts SET status = 'disabled' WHERE account_id = $1", [
          accountId,
        ]);
      } else if (testCase.gate === 'permission') {
        await pool.query(
          "UPDATE account_permissions SET granted = false WHERE account_id = $1 AND permission_key = 'website.check'",
          [accountId],
        );
      } else if (testCase.gate === 'entitlement') {
        await pool.query(
          'UPDATE account_entitlements SET pro_active = false WHERE account_id = $1',
          [accountId],
        );
      } else {
        await pool.query(
          "UPDATE system_feature_controls SET enabled = false WHERE feature_key = 'mvp03_url_check'",
        );
      }

      const rows = await pool.query<{ status: string; cancellation_reason: string }>(
        'SELECT status, cancellation_reason FROM protected_work_items WHERE account_id = $1 ORDER BY created_at, work_id',
        [accountId],
      );
      expect(rows.rows.map((row) => row.status).sort()).toEqual(['cancel_requested', 'cancelled']);
      expect(rows.rows.every((row) => row.cancellation_reason === testCase.reason)).toBe(true);
    }
  });
});
