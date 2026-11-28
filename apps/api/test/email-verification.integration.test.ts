import { createHash, randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';
import { createAccountRegistrationService } from '../src/modules/identity/account-registration.js';
import {
  createEmailVerificationService,
  type VerificationDelivery,
} from '../src/modules/identity/email-verification.js';

class FakeVerificationDelivery implements VerificationDelivery {
  readonly deliveries: Array<{ email: string; token: string }> = [];

  async sendVerification(email: string, token: string): Promise<void> {
    this.deliveries.push({ email, token });
  }
}

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const testPasswordPolicy = { assertAccepted: (_password: string) => undefined };

describe('email verification with PostgreSQL and fake delivery', () => {
  beforeAll(async () => {
    if (!pool)
      throw new Error('DATABASE_URL is required for email verification integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('uses generic request responses and stores only a token hash', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const email = 'Verify-' + randomUUID() + '@Example.com';
    const registration = createAccountRegistrationService(pool, testPasswordPolicy);
    await registration.register({ email, password: 'test-only-password' });

    const delivery = new FakeVerificationDelivery();
    const verification = createEmailVerificationService(
      pool,
      { challengeLifetimeMs: 60_000 },
      delivery,
    );
    const app = buildApp({ database: pool, emailVerification: verification });

    try {
      const existing = await app.inject({
        method: 'POST',
        url: '/v1/email-verification-challenges',
        payload: { email },
      });
      const unknown = await app.inject({
        method: 'POST',
        url: '/v1/email-verification-challenges',
        payload: { email: 'not-registered@example.com' },
      });

      expect(existing.statusCode).toBe(202);
      expect(unknown.statusCode).toBe(202);
      expect(existing.json()).toEqual(unknown.json());
      expect(delivery.deliveries).toHaveLength(1);
      expect(delivery.deliveries[0]?.email).toBe(email);

      const token = delivery.deliveries[0]!.token;
      const stored = await pool.query<{ token_hash: string; expires_at: Date }>(
        'SELECT token_hash, expires_at FROM email_verification_challenges WHERE account_id = (SELECT account_id FROM accounts WHERE email_canonical = $1)',
        [email.slice(0, email.lastIndexOf('@')) + '@example.com'],
      );

      expect(stored.rowCount).toBe(1);
      expect(stored.rows[0]?.token_hash).toBe(createHash('sha256').update(token).digest('hex'));
      expect(stored.rows[0]?.token_hash).not.toBe(token);
      expect(stored.rows[0]?.expires_at).toBeInstanceOf(Date);
    } finally {
      await app.close();
    }
  });

  it('verifies a challenge once and rejects replay', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const email = 'SingleUse-' + randomUUID() + '@example.com';
    await createAccountRegistrationService(pool, testPasswordPolicy).register({
      email,
      password: 'test-only-password',
    });

    const delivery = new FakeVerificationDelivery();
    const verification = createEmailVerificationService(
      pool,
      { challengeLifetimeMs: 60_000 },
      delivery,
    );
    const app = buildApp({ database: pool, emailVerification: verification });

    try {
      await app.inject({
        method: 'POST',
        url: '/v1/email-verification-challenges',
        payload: { email },
      });
      const token = delivery.deliveries[0]!.token;

      const first = await app.inject({
        method: 'POST',
        url: '/v1/email-verification',
        payload: { token },
      });
      const replay = await app.inject({
        method: 'POST',
        url: '/v1/email-verification',
        payload: { token },
      });

      expect(first.statusCode).toBe(200);
      expect(first.json()).toEqual({ verified: true });
      expect(replay.statusCode).toBe(400);

      const account = await pool.query<{ email_verified_at: Date | null }>(
        'SELECT email_verified_at FROM accounts WHERE email_canonical = $1',
        [email],
      );
      expect(account.rows[0]?.email_verified_at).toBeInstanceOf(Date);
    } finally {
      await app.close();
    }
  });

  it('rejects an expired challenge without verifying the account', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const email = 'Expired-' + randomUUID() + '@example.com';
    await createAccountRegistrationService(pool, testPasswordPolicy).register({
      email,
      password: 'test-only-password',
    });

    let now = new Date();
    const delivery = new FakeVerificationDelivery();
    const verification = createEmailVerificationService(
      pool,
      { challengeLifetimeMs: 1_000 },
      delivery,
      () => now,
    );
    const app = buildApp({ database: pool, emailVerification: verification });

    try {
      await app.inject({
        method: 'POST',
        url: '/v1/email-verification-challenges',
        payload: { email },
      });
      const token = delivery.deliveries[0]!.token;
      now = new Date(now.getTime() + 1_001);

      const response = await app.inject({
        method: 'POST',
        url: '/v1/email-verification',
        payload: { token },
      });
      expect(response.statusCode).toBe(400);

      const account = await pool.query<{ email_verified_at: Date | null }>(
        'SELECT email_verified_at FROM accounts WHERE email_canonical = $1',
        [email],
      );
      expect(account.rows[0]?.email_verified_at).toBeNull();
    } finally {
      await app.close();
    }
  });
});
