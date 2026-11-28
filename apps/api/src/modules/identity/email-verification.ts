import { createHash, randomBytes } from 'node:crypto';
import type { Pool } from 'pg';
import { canonicalizeEmail } from './account-registration.js';

export interface EmailVerificationPolicy {
  challengeLifetimeMs: number;
}

export interface VerificationDelivery {
  sendVerification(email: string, token: string): Promise<void>;
}

export interface EmailVerificationService {
  request(email: string): Promise<void>;
  verify(token: string): Promise<boolean>;
  getVerifiedEmail(accountId: string): Promise<string | null>;
}

export class EmailVerificationUnavailableError extends Error {
  constructor() {
    super('Email verification is not configured.');
    this.name = 'EmailVerificationUnavailableError';
  }
}

export class EmailVerificationDeliveryError extends Error {
  constructor() {
    super('Email verification delivery failed.');
    this.name = 'EmailVerificationDeliveryError';
  }
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function createEmailVerificationService(
  database: Pool,
  policy: EmailVerificationPolicy | null,
  delivery: VerificationDelivery | null,
  clock: () => Date = () => new Date(),
): EmailVerificationService {
  return {
    async request(email) {
      if (
        !policy ||
        !delivery ||
        !Number.isSafeInteger(policy.challengeLifetimeMs) ||
        policy.challengeLifetimeMs <= 0
      ) {
        throw new EmailVerificationUnavailableError();
      }

      const emailCanonical = canonicalizeEmail(email);
      const client = await database.connect();
      let deliveryEmail: string | null = null;
      let token: string | null = null;
      let tokenHash: string | null = null;

      try {
        await client.query('BEGIN');
        const accountResult = await client.query<{
          account_id: string;
          email: string;
          email_verified_at: Date | null;
        }>(
          `SELECT account_id, email, email_verified_at
           FROM accounts
           WHERE email_canonical = $1
           FOR UPDATE`,
          [emailCanonical],
        );
        const account = accountResult.rows[0];

        if (!account || account.email_verified_at) {
          await client.query('COMMIT');
          return;
        }

        const now = clock();
        token = randomBytes(32).toString('base64url');
        tokenHash = hashToken(token);
        const expiresAt = new Date(now.getTime() + policy.challengeLifetimeMs);

        await client.query(
          `UPDATE email_verification_challenges
           SET consumed_at = $2
           WHERE account_id = $1 AND consumed_at IS NULL`,
          [account.account_id, now],
        );
        await client.query(
          `INSERT INTO email_verification_challenges
           (account_id, token_hash, expires_at)
           VALUES ($1, $2, $3)`,
          [account.account_id, tokenHash, expiresAt],
        );
        await client.query('COMMIT');
        deliveryEmail = account.email;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }

      if (!deliveryEmail || !token || !tokenHash) return;

      try {
        await delivery.sendVerification(deliveryEmail, token);
      } catch {
        try {
          await database.query(
            `UPDATE email_verification_challenges
             SET consumed_at = $2
             WHERE token_hash = $1 AND consumed_at IS NULL`,
            [tokenHash, clock()],
          );
        } catch {
          // The undelivered challenge remains unusable to the user and expires naturally.
        }
        throw new EmailVerificationDeliveryError();
      }
    },

    async getVerifiedEmail(accountId) {
      const result = await database.query<{ email: string }>(
        `SELECT email
         FROM accounts
         WHERE account_id = $1
           AND status = 'active'
           AND email_verified_at IS NOT NULL`,
        [accountId],
      );
      return result.rows[0]?.email ?? null;
    },

    async verify(token) {
      if (!token) return false;

      const client = await database.connect();
      try {
        await client.query('BEGIN');
        const now = clock();
        const tokenHash = hashToken(token);
        const candidate = await client.query<{ account_id: string }>(
          `SELECT account_id
           FROM email_verification_challenges
           WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > $2`,
          [tokenHash, now],
        );
        const accountId = candidate.rows[0]?.account_id;

        if (!accountId) {
          await client.query('COMMIT');
          return false;
        }

        // All challenge operations lock the account before challenge rows to avoid lock-order deadlocks.
        const account = await client.query(
          'SELECT account_id FROM accounts WHERE account_id = $1 FOR UPDATE',
          [accountId],
        );
        if (!account.rowCount) {
          await client.query('COMMIT');
          return false;
        }

        const challenge = await client.query<{ challenge_id: string }>(
          `SELECT challenge_id
           FROM email_verification_challenges
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
          `UPDATE email_verification_challenges
           SET consumed_at = $2
           WHERE account_id = $1 AND consumed_at IS NULL`,
          [accountId, now],
        );
        await client.query(
          `UPDATE accounts
           SET email_verified_at = COALESCE(email_verified_at, $2), updated_at = $2
           WHERE account_id = $1`,
          [accountId, now],
        );
        await client.query('COMMIT');
        return true;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
