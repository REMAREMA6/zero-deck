import { createHash, randomBytes } from 'node:crypto';
import type { Pool } from 'pg';
import { canonicalizeEmail, type PasswordPolicy } from './account-registration.js';
import { hashPassword } from './password-hasher.js';
import type { SecurityNotificationKind } from './verified-email-notifications.js';

export interface AccountRecoveryDelivery {
  sendRecoveryChallenge(email: string, token: string): Promise<void>;
}

export interface AccountRecoveryNotifier {
  notify(accountId: string, notification: SecurityNotificationKind): Promise<boolean>;
}

export interface AccountRecoveryPolicy {
  challengeLifetimeMs: number;
}

export interface AccountRecoveryService {
  request(email: string): Promise<void>;
  recover(token: string, newPassword: string): Promise<boolean>;
}

export class AccountRecoveryUnavailableError extends Error {
  constructor() {
    super('Account recovery is not configured.');
    this.name = 'AccountRecoveryUnavailableError';
  }
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function createAccountRecoveryService(
  database: Pool,
  policy: AccountRecoveryPolicy | null,
  delivery: AccountRecoveryDelivery | null,
  passwordPolicy: PasswordPolicy | null,
  notifier: AccountRecoveryNotifier | null,
  clock: () => Date = () => new Date(),
): AccountRecoveryService {
  const configured = () =>
    Boolean(
      policy &&
        Number.isSafeInteger(policy.challengeLifetimeMs) &&
        policy.challengeLifetimeMs > 0 &&
        delivery &&
        passwordPolicy &&
        notifier,
    );

  return {
    async request(email) {
      if (!configured() || !policy || !delivery) throw new AccountRecoveryUnavailableError();

      const emailCanonical = canonicalizeEmail(email);
      const client = await database.connect();
      let accountId: string | null = null;
      let verifiedEmail: string | null = null;
      let token: string | null = null;
      let tokenHash: string | null = null;

      try {
        await client.query('BEGIN');
        const account = await client.query<{
          account_id: string;
          email: string;
        }>(
          `SELECT account_id, email
           FROM accounts
           WHERE email_canonical = $1
             AND status = 'active'
             AND email_verified_at IS NOT NULL
           FOR UPDATE`,
          [emailCanonical],
        );
        const row = account.rows[0];
        if (row) {
          accountId = row.account_id;
          verifiedEmail = row.email;
          token = randomBytes(32).toString('base64url');
          tokenHash = hashToken(token);
          const now = clock();
          await client.query(
            `UPDATE account_recovery_challenges
             SET consumed_at = $2
             WHERE account_id = $1 AND consumed_at IS NULL`,
            [accountId, now],
          );
          await client.query(
            `INSERT INTO account_recovery_challenges (account_id, token_hash, expires_at)
             VALUES ($1, $2, $3)`,
            [accountId, tokenHash, new Date(now.getTime() + policy.challengeLifetimeMs)],
          );
        }
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }

      if (!accountId || !verifiedEmail || !token || !tokenHash) return;
      try {
        await delivery.sendRecoveryChallenge(verifiedEmail, token);
      } catch {
        await database.query(
          `UPDATE account_recovery_challenges
           SET consumed_at = $2
           WHERE token_hash = $1 AND consumed_at IS NULL`,
          [tokenHash, clock()],
        ).catch(() => undefined);
        // Keep the public request response identical for unknown and undeliverable accounts.
      }
    },

    async recover(token, newPassword) {
      if (!configured() || !passwordPolicy || !notifier) {
        throw new AccountRecoveryUnavailableError();
      }
      if (!token) return false;

      const tokenHash = hashToken(token);
      const candidate = await database.query<{ account_id: string }>(
        `SELECT account_id
         FROM account_recovery_challenges
         WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > $2`,
        [tokenHash, clock()],
      );
      const accountId = candidate.rows[0]?.account_id;
      if (!accountId) return false;

      await passwordPolicy.assertAccepted(newPassword);
      const newPasswordHash = await hashPassword(newPassword);
      const client = await database.connect();
      try {
        await client.query('BEGIN');
        const now = clock();
        const account = await client.query(
          `SELECT account_id
           FROM accounts
           WHERE account_id = $1
             AND status = 'active'
             AND email_verified_at IS NOT NULL
           FOR UPDATE`,
          [accountId],
        );
        if (!account.rowCount) {
          await client.query('COMMIT');
          return false;
        }

        const challenge = await client.query(
          `SELECT challenge_id
           FROM account_recovery_challenges
           WHERE token_hash = $1
             AND account_id = $2
             AND consumed_at IS NULL
             AND expires_at > $3
           FOR UPDATE`,
          [tokenHash, accountId, now],
        );
        if (!challenge.rowCount) {
          await client.query('COMMIT');
          return false;
        }

        await client.query(
          `UPDATE account_credentials
           SET password_hash = $2, password_changed_at = $3
           WHERE account_id = $1`,
          [accountId, newPasswordHash, now],
        );
        await client.query(
          `UPDATE account_recovery_challenges
           SET consumed_at = $2
           WHERE account_id = $1 AND consumed_at IS NULL`,
          [accountId, now],
        );
        await client.query(
          `UPDATE sessions
           SET revoked_at = $2
           WHERE account_id = $1 AND revoked_at IS NULL`,
          [accountId, now],
        );
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }

      // Recovery remains successful if the notification transport is unavailable.
      // The notifier resolves the current verified address and never accepts a client-supplied one.
      await notifier.notify(accountId, 'account_recovery_completed').catch(() => false);
      return true;
    },
  };
}
