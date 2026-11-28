import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { createAccountRegistrationService } from '../src/modules/identity/account-registration.js';
import { createFreshAuthenticationGuard } from '../src/modules/identity/fresh-authentication.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const passwordPolicy = { assertAccepted: () => undefined };

describe('fresh authentication guard with PostgreSQL', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for fresh-authentication tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('runs the sensitive operation only after verifying the current password', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'FreshAuth-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'current-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    const guard = createFreshAuthenticationGuard(pool);
    const action = vi.fn(async (client) => {
      await client.query('UPDATE accounts SET updated_at = now() WHERE account_id = $1', [
        account.rows[0]!.account_id,
      ]);
      return 'changed';
    });

    await expect(
      guard.execute(account.rows[0]!.account_id, 'incorrect-password', action),
    ).resolves.toEqual({ authenticated: false });
    expect(action).not.toHaveBeenCalled();

    await expect(
      guard.execute(account.rows[0]!.account_id, 'current-password', action),
    ).resolves.toEqual({ authenticated: true, value: 'changed' });
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('denies fresh authentication for a disabled account', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'FreshAuthDisabled-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'current-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    const accountId = account.rows[0]!.account_id;
    await pool.query('UPDATE accounts SET status = $2 WHERE account_id = $1', [
      accountId,
      'disabled',
    ]);
    const action = vi.fn(async () => undefined);
    const guard = createFreshAuthenticationGuard(pool);
    await expect(guard.execute(accountId, 'current-password', action)).resolves.toEqual({
      authenticated: false,
    });
    expect(action).not.toHaveBeenCalled();
  });
});
