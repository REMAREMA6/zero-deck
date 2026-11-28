import { createHash, randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';
import { createAccountRegistrationService } from '../src/modules/identity/account-registration.js';
import { createSessionService } from '../src/modules/identity/sessions.js';
import { createAccountRecoveryService } from '../src/modules/identity/account-recovery.js';
import { createEmailVerificationService } from '../src/modules/identity/email-verification.js';
import { createVerifiedEmailSecurityNotifier } from '../src/modules/identity/verified-email-notifications.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const passwordPolicy = {
  assertAccepted: (password: string) => {
    if (password.length < 8) throw new Error('password rejected');
  },
};

class FakeRecoveryDelivery {
  readonly deliveries: Array<{ email: string; token: string }> = [];
  async sendRecoveryChallenge(email: string, token: string) {
    this.deliveries.push({ email, token });
  }
}

class FakeSecurityDelivery {
  readonly notifications: Array<{ email: string; kind: string }> = [];
  async sendSecurityNotification(email: string, kind: string) {
    this.notifications.push({ email, kind });
  }
}

describe('account recovery with PostgreSQL and fake delivery', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for recovery integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('issues only verified-email challenges and stores only a token hash', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'Recovery-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'initial-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    const accountId = account.rows[0]!.account_id;
    const verification = createEmailVerificationService(pool, null, null);
    const recoveryDelivery = new FakeRecoveryDelivery();
    const securityDelivery = new FakeSecurityDelivery();
    const notifier = createVerifiedEmailSecurityNotifier(verification, securityDelivery);
    const recovery = createAccountRecoveryService(
      pool,
      { challengeLifetimeMs: 60_000 },
      recoveryDelivery,
      passwordPolicy,
      notifier,
    );
    const app = buildApp({ database: pool, accountRecovery: recovery });

    try {
      const unverified = await app.inject({
        method: 'POST',
        url: '/v1/account-recovery-challenges',
        payload: { email },
      });
      expect(unverified.statusCode).toBe(202);
      expect(recoveryDelivery.deliveries).toHaveLength(0);

      await pool.query('UPDATE accounts SET email_verified_at = now() WHERE account_id = $1', [
        accountId,
      ]);
      const accepted = await app.inject({
        method: 'POST',
        url: '/v1/account-recovery-challenges',
        payload: { email },
      });
      expect(accepted.statusCode).toBe(202);
      expect(accepted.body).not.toContain(recoveryDelivery.deliveries[0]!.token);

      const stored = await pool.query<{ token_hash: string; expires_at: Date }>(
        'SELECT token_hash, expires_at FROM account_recovery_challenges WHERE account_id = $1',
        [accountId],
      );
      expect(stored.rowCount).toBe(1);
      expect(stored.rows[0]?.token_hash).toBe(
        createHash('sha256').update(recoveryDelivery.deliveries[0]!.token).digest('hex'),
      );
      expect(stored.rows[0]?.token_hash).not.toBe(recoveryDelivery.deliveries[0]!.token);
      expect(stored.rows[0]?.expires_at).toBeInstanceOf(Date);
    } finally {
      await app.close();
    }
  });

  it('consumes recovery once, replaces the password, revokes every session and notifies verified email', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'RecoverOnce-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'initial-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    const accountId = account.rows[0]!.account_id;
    await pool.query('UPDATE accounts SET email_verified_at = now() WHERE account_id = $1', [
      accountId,
    ]);
    const verification = createEmailVerificationService(pool, null, null);
    const recoveryDelivery = new FakeRecoveryDelivery();
    const securityDelivery = new FakeSecurityDelivery();
    const notifier = createVerifiedEmailSecurityNotifier(verification, securityDelivery);
    const recovery = createAccountRecoveryService(
      pool,
      { challengeLifetimeMs: 60_000 },
      recoveryDelivery,
      passwordPolicy,
      notifier,
    );
    const sessions = createSessionService(pool);
    const first = await sessions.authenticate(email, 'initial-password');
    const second = await sessions.authenticate(email, 'initial-password');
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    await recovery.request(email);
    const token = recoveryDelivery.deliveries[0]!.token;
    const app = buildApp({ database: pool, accountRecovery: recovery });

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/v1/account-recovery',
        payload: { token, newPassword: 'replacement-password' },
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ recovered: true });
      expect(await sessions.authenticateToken(first!.sessionToken)).toBeNull();
      expect(await sessions.authenticateToken(second!.sessionToken)).toBeNull();
      expect(await sessions.authenticate(email, 'initial-password')).toBeNull();
      expect(await sessions.authenticate(email, 'replacement-password')).not.toBeNull();
      expect(securityDelivery.notifications).toEqual([
        { email, kind: 'account_recovery_completed' },
      ]);

      const replay = await app.inject({
        method: 'POST',
        url: '/v1/account-recovery',
        payload: { token, newPassword: 'another-password' },
      });
      expect(replay.statusCode).toBe(400);
    } finally {
      await app.close();
    }
  });

  it('rejects expired recovery challenges', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'RecoverExpiry-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'initial-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    await pool.query('UPDATE accounts SET email_verified_at = now() WHERE account_id = $1', [
      account.rows[0]!.account_id,
    ]);
    let now = new Date();
    const delivery = new FakeRecoveryDelivery();
    const notifier = createVerifiedEmailSecurityNotifier(
      createEmailVerificationService(pool, null, null),
      new FakeSecurityDelivery(),
    );
    const recovery = createAccountRecoveryService(
      pool,
      { challengeLifetimeMs: 1_000 },
      delivery,
      passwordPolicy,
      notifier,
      () => now,
    );
    await recovery.request(email);
    now = new Date(now.getTime() + 1_001);
    await expect(
      recovery.recover(delivery.deliveries[0]!.token, 'replacement-password'),
    ).resolves.toBe(false);
  });

  it('does not make a recovery token usable when fake delivery fails', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const email = 'RecoverDelivery-' + randomUUID() + '@example.test';
    await createAccountRegistrationService(pool, passwordPolicy).register({
      email,
      password: 'initial-password',
    });
    const account = await pool.query<{ account_id: string }>(
      'SELECT account_id FROM accounts WHERE email_canonical = $1',
      [email],
    );
    await pool.query('UPDATE accounts SET email_verified_at = now() WHERE account_id = $1', [
      account.rows[0]!.account_id,
    ]);
    const failingDelivery = {
      token: '',
      async sendRecoveryChallenge(_email: string, token: string) {
        this.token = token;
        throw new Error('fake delivery failure');
      },
    };
    const notifier = createVerifiedEmailSecurityNotifier(
      createEmailVerificationService(pool, null, null),
      new FakeSecurityDelivery(),
    );
    const recovery = createAccountRecoveryService(
      pool,
      { challengeLifetimeMs: 60_000 },
      failingDelivery,
      passwordPolicy,
      notifier,
    );
    await expect(recovery.request(email)).resolves.toBeUndefined();
    await expect(recovery.recover(failingDelivery.token, 'replacement-password')).resolves.toBe(
      false,
    );
  });
  it(
    'keeps completed recovery successful when the security notification adapter fails',
    async () => {
      if (!pool) throw new Error('PostgreSQL is unavailable.');
      const email = 'RecoverNoticeFailure-' + randomUUID() + '@example.test';
      await createAccountRegistrationService(pool, passwordPolicy).register({
        email,
        password: 'initial-password',
      });
      const account = await pool.query<{ account_id: string }>(
        'SELECT account_id FROM accounts WHERE email_canonical = $1',
        [email],
      );
      await pool.query('UPDATE accounts SET email_verified_at = now() WHERE account_id = $1', [
        account.rows[0]!.account_id,
      ]);
      const recoveryDelivery = new FakeRecoveryDelivery();
      const notifier = {
        async notify() {
          throw new Error('fake security notification failure');
        },
      };
      const recovery = createAccountRecoveryService(
        pool,
        { challengeLifetimeMs: 60_000 },
        recoveryDelivery,
        passwordPolicy,
        notifier,
      );

      await recovery.request(email);
      await expect(
        recovery.recover(recoveryDelivery.deliveries[0]!.token, 'replacement-password'),
      ).resolves.toBe(true);
      await expect(
        recovery.recover(recoveryDelivery.deliveries[0]!.token, 'another-password'),
      ).resolves.toBe(false);
    },
  );
});
