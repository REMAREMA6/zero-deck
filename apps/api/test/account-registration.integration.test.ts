import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';
import {
  createAccountRegistrationService,
  PasswordPolicyRejectedError,
} from '../src/modules/identity/account-registration.js';
import { verifyPassword } from '../src/modules/identity/password-hasher.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const testPasswordPolicy = {
  assertAccepted(password: string) {
    if (password.length === 0) throw new PasswordPolicyRejectedError();
  },
};

describe('account registration with PostgreSQL', () => {
  const app = pool
    ? buildApp({
        database: pool,
        accountRegistration: createAccountRegistrationService(pool, testPasswordPolicy),
      })
    : null;

  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for account registration integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await app?.close();
    await pool?.end();
  });

  it('creates an unverified account and stores only an Argon2id password verifier', async () => {
    if (!pool || !app) throw new Error('PostgreSQL test dependencies are unavailable.');

    const localPart = 'Account-' + randomUUID();
    const email = localPart + '@Example.COM';
    const password = 'test-only-password';
    const response = await app.inject({
      method: 'POST',
      url: '/v1/accounts',
      payload: { email: '  ' + email + '  ', password },
    });

    expect(response.statusCode).toBe(202);
    expect(response.json()).toEqual({ status: 'accepted' });

    const account = await pool.query<{
      account_id: string;
      email: string;
      email_canonical: string;
      email_verified_at: Date | null;
      status: string;
    }>(
      'SELECT account_id, email, email_canonical, email_verified_at, status FROM accounts WHERE email_canonical = $1',
      [localPart + '@example.com'],
    );

    expect(account.rowCount).toBe(1);
    expect(account.rows[0]?.email).toBe(email);
    expect(account.rows[0]?.email_canonical).toBe(localPart + '@example.com');
    expect(account.rows[0]?.email_verified_at).toBeNull();
    expect(account.rows[0]?.status).toBe('active');

    const credential = await pool.query<{ password_hash: string }>(
      'SELECT password_hash FROM account_credentials WHERE account_id = $1',
      [account.rows[0]?.account_id],
    );

    expect(credential.rowCount).toBe(1);
    expect(credential.rows[0]?.password_hash).not.toBe(password);
    expect(credential.rows[0]?.password_hash.startsWith('$argon2id$')).toBe(true);
    expect(await verifyPassword(credential.rows[0]!.password_hash, password)).toBe(true);
    expect(await verifyPassword(credential.rows[0]!.password_hash, 'incorrect-password')).toBe(false);
  });

  it('preserves local-part semantics and canonicalizes only the domain', async () => {
    if (!pool || !app) throw new Error('PostgreSQL test dependencies are unavailable.');

    const localPart = 'Case-' + randomUUID();
    const firstEmail = localPart + '@Example.com';
    const secondEmail = localPart + '@EXAMPLE.COM';
    const thirdEmail = localPart.toLowerCase() + '@example.com';

    for (const email of [firstEmail, secondEmail, thirdEmail]) {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/accounts',
        payload: { email, password: 'test-only-password' },
      });
      expect(response.statusCode).toBe(202);
    }

    const count = await pool.query<{ count: string }>(
      'SELECT count(*)::text AS count FROM accounts WHERE email_canonical IN ($1, $2)',
      [localPart + '@example.com', localPart.toLowerCase() + '@example.com'],
    );

    expect(count.rows[0]?.count).toBe('2');
  });

  it('keeps duplicate registration responses generic and creates no duplicate principal', async () => {
    if (!pool || !app) throw new Error('PostgreSQL test dependencies are unavailable.');

    const localPart = 'Duplicate-' + randomUUID();
    const first = await app.inject({
      method: 'POST',
      url: '/v1/accounts',
      payload: { email: localPart + '@Example.com', password: 'test-only-password' },
    });
    const second = await app.inject({
      method: 'POST',
      url: '/v1/accounts',
      payload: { email: localPart + '@example.COM', password: 'another-test-password' },
    });

    expect(first.statusCode).toBe(202);
    expect(second.statusCode).toBe(202);
    expect(second.json()).toEqual(first.json());

    const count = await pool.query<{ count: string }>(
      'SELECT count(*)::text AS count FROM accounts WHERE email_canonical = $1',
      [localPart + '@example.com'],
    );
    expect(count.rows[0]?.count).toBe('1');
  });
});
