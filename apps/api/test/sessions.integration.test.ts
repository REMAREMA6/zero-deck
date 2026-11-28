import { createHash, randomUUID } from 'node:crypto';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';
import { createAccountRegistrationService } from '../src/modules/identity/account-registration.js';
import {
  createSessionService,
  SESSION_ABSOLUTE_LIFETIME_MS,
  SESSION_INACTIVITY_WINDOW_MS,
} from '../src/modules/identity/sessions.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const testPasswordPolicy = { assertAccepted: (_password: string) => undefined };
const registration = pool ? createAccountRegistrationService(pool, testPasswordPolicy) : null;
let now = new Date();
const sessions = pool ? createSessionService(pool, () => now) : null;
const app = pool && sessions ? buildApp({ database: pool, sessionService: sessions }) : null;

async function createAccount(email: string, password = 'test-only-password') {
  if (!registration) throw new Error('PostgreSQL test dependency is unavailable.');
  await registration.register({ email, password });
}

describe('shared account sessions with PostgreSQL', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for session integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  beforeEach(() => {
    now = new Date();
  });

  afterAll(async () => {
    await app?.close();
    await pool?.end();
  });

  it('authenticates across clients and stores only a hash of the opaque session token', async () => {
    if (!pool || !app) throw new Error('PostgreSQL test dependencies are unavailable.');

    const email = 'Session-' + randomUUID() + '@Example.com';
    const password = 'test-only-password';
    await createAccount(email, password);

    const login = await app.inject({
      method: 'POST',
      url: '/v1/sessions',
      payload: { email, password },
    });

    expect(login.statusCode).toBe(201);
    const issued = login.json<{
      sessionToken: string;
      sessionId: string;
      accountId: string;
      absoluteExpiresAt: string;
    }>();
    expect(issued.sessionToken).toBeTruthy();
    expect(issued.absoluteExpiresAt).toBe(
      new Date(now.getTime() + SESSION_ABSOLUTE_LIFETIME_MS).toISOString(),
    );

    const stored = await pool.query<{ token_hash: string }>(
      'SELECT token_hash FROM sessions WHERE session_id = $1',
      [issued.sessionId],
    );
    expect(stored.rowCount).toBe(1);
    expect(stored.rows[0]?.token_hash).toBe(
      createHash('sha256').update(issued.sessionToken).digest('hex'),
    );
    expect(stored.rows[0]?.token_hash).not.toBe(issued.sessionToken);

    const profile = await app.inject({
      method: 'GET',
      url: '/v1/session',
      headers: { authorization: 'Bearer ' + issued.sessionToken },
    });
    expect(profile.statusCode).toBe(200);
    expect(profile.json()).toEqual({
      accountId: issued.accountId,
      sessionId: issued.sessionId,
      email,
      emailVerified: false,
    });

    const wrongPassword = await app.inject({
      method: 'POST',
      url: '/v1/sessions',
      payload: { email, password: 'incorrect-password' },
    });
    const unknownAccount = await app.inject({
      method: 'POST',
      url: '/v1/sessions',
      payload: { email: 'missing-' + randomUUID() + '@example.com', password },
    });
    expect(wrongPassword.statusCode).toBe(401);
    expect(unknownAccount.statusCode).toBe(401);
    expect(wrongPassword.json()).toEqual(unknownAccount.json());

    const logout = await app.inject({
      method: 'DELETE',
      url: '/v1/sessions/current',
      headers: { authorization: 'Bearer ' + issued.sessionToken },
    });
    expect(logout.statusCode).toBe(204);

    const afterLogout = await app.inject({
      method: 'GET',
      url: '/v1/session',
      headers: { authorization: 'Bearer ' + issued.sessionToken },
    });
    expect(afterLogout.statusCode).toBe(401);
  });

  it('enforces the seven-day inactivity and thirty-day absolute session limits', async () => {
    if (!sessions) throw new Error('Session service is unavailable.');

    const inactivityEmail = 'Inactive-' + randomUUID() + '@example.com';
    await createAccount(inactivityEmail);
    const inactivitySession = await sessions.authenticate(inactivityEmail, 'test-only-password');
    expect(inactivitySession).not.toBeNull();

    now = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);
    expect(await sessions.authenticateToken(inactivitySession!.sessionToken)).not.toBeNull();

    now = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
    expect(await sessions.authenticateToken(inactivitySession!.sessionToken)).toBeNull();

    const absoluteEmail = 'Absolute-' + randomUUID() + '@example.com';
    await createAccount(absoluteEmail);
    now = new Date('2026-11-28T12:00:00.000Z');
    const absoluteStart = new Date(now);
    const absoluteSession = await sessions.authenticate(absoluteEmail, 'test-only-password');
    expect(absoluteSession).not.toBeNull();

    for (let day = 6; day <= 24; day += 6) {
      now = new Date(absoluteStart.getTime() + day * 24 * 60 * 60 * 1000);
      expect(await sessions.authenticateToken(absoluteSession!.sessionToken)).not.toBeNull();
    }

    now = new Date(absoluteStart.getTime() + 29 * 24 * 60 * 60 * 1000);
    expect(await sessions.authenticateToken(absoluteSession!.sessionToken)).not.toBeNull();

    now = new Date(absoluteStart.getTime() + 31 * 24 * 60 * 60 * 1000);
    expect(await sessions.authenticateToken(absoluteSession!.sessionToken)).toBeNull();
    expect(SESSION_INACTIVITY_WINDOW_MS).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('supports individual-session revocation and logout-all', async () => {
    if (!sessions) throw new Error('Session service is unavailable.');

    const email = 'Revoke-' + randomUUID() + '@example.com';
    await createAccount(email);
    const first = await sessions.authenticate(email, 'test-only-password');
    const second = await sessions.authenticate(email, 'test-only-password');
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();

    await sessions.revokeSession(first!.accountId, first!.sessionId);
    expect(await sessions.authenticateToken(first!.sessionToken)).toBeNull();
    expect(await sessions.authenticateToken(second!.sessionToken)).not.toBeNull();

    await sessions.revokeAll(second!.accountId);
    expect(await sessions.authenticateToken(second!.sessionToken)).toBeNull();
  });

  it('denies existing sessions and new sign-in after account disablement', async () => {
    if (!pool || !sessions) throw new Error('PostgreSQL test dependencies are unavailable.');

    const email = 'Disabled-' + randomUUID() + '@example.com';
    await createAccount(email);
    const session = await sessions.authenticate(email, 'test-only-password');
    expect(session).not.toBeNull();

    await pool.query('UPDATE accounts SET status = $2 WHERE account_id = $1', [
      session!.accountId,
      'disabled',
    ]);

    expect(await sessions.authenticateToken(session!.sessionToken)).toBeNull();
    expect(await sessions.authenticate(email, 'test-only-password')).toBeNull();
  });
});
