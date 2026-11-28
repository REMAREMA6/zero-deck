import { createHash, randomBytes } from 'node:crypto';
import type { Pool } from 'pg';
import { canonicalizeEmail } from './account-registration.js';
import { hashPassword, verifyPassword } from './password-hasher.js';

export const SESSION_INACTIVITY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
export const SESSION_ABSOLUTE_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;

export interface SessionPrincipal {
  accountId: string;
  sessionId: string;
}

export interface IssuedSession extends SessionPrincipal {
  sessionToken: string;
  absoluteExpiresAt: Date;
}

export interface SessionService {
  authenticate(email: string, password: string): Promise<IssuedSession | null>;
  authenticateToken(token: string): Promise<SessionPrincipal | null>;
  revokeCurrent(token: string): Promise<void>;
  revokeAll(accountId: string): Promise<void>;
  revokeSession(accountId: string, sessionId: string): Promise<void>;
}

function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function createSessionService(
  database: Pool,
  clock: () => Date = () => new Date(),
): SessionService {
  const dummyPasswordHash = hashPassword(randomBytes(32).toString('base64url'));

  return {
    async authenticate(email, password) {
      const emailCanonical = canonicalizeEmail(email);
      const result = await database.query<{
        account_id: string;
        status: string;
        password_hash: string;
      }>(
        `SELECT account.account_id, account.status, credential.password_hash
         FROM accounts AS account
         INNER JOIN account_credentials AS credential
           ON credential.account_id = account.account_id
         WHERE account.email_canonical = $1`,
        [emailCanonical],
      );
      const account = result.rows[0];
      const encodedHash =
        account?.status === 'active' ? account.password_hash : await dummyPasswordHash;
      const passwordMatches = await verifyPassword(encodedHash, password);

      if (!account || account.status !== 'active' || !passwordMatches) {
        return null;
      }

      const now = clock();
      const sessionToken = randomBytes(32).toString('base64url');
      const tokenHash = hashSessionToken(sessionToken);
      const absoluteExpiresAt = new Date(now.getTime() + SESSION_ABSOLUTE_LIFETIME_MS);
      const inserted = await database.query<{ session_id: string }>(
        `INSERT INTO sessions (account_id, token_hash, last_seen_at, absolute_expires_at)
         VALUES ($1, $2, $3, $4)
         RETURNING session_id`,
        [account.account_id, tokenHash, now, absoluteExpiresAt],
      );
      const sessionId = inserted.rows[0]?.session_id;

      if (!sessionId) {
        throw new Error('Session creation did not return a session identifier.');
      }

      return {
        accountId: account.account_id,
        sessionId,
        sessionToken,
        absoluteExpiresAt,
      };
    },

    async authenticateToken(token) {
      if (!token) return null;

      const result = await database.query<{ session_id: string; account_id: string }>(
        `UPDATE sessions AS session
         SET last_seen_at = $2
         FROM accounts AS account
         WHERE session.token_hash = $1
           AND session.account_id = account.account_id
           AND account.status = 'active'
           AND session.revoked_at IS NULL
           AND session.last_seen_at > $2 - INTERVAL '7 days'
           AND session.absolute_expires_at > $2
         RETURNING session.session_id, session.account_id`,
        [hashSessionToken(token), clock()],
      );
      const session = result.rows[0];

      return session ? { accountId: session.account_id, sessionId: session.session_id } : null;
    },

    async revokeCurrent(token) {
      await database.query(
        `UPDATE sessions
         SET revoked_at = $2
         WHERE token_hash = $1 AND revoked_at IS NULL`,
        [hashSessionToken(token), clock()],
      );
    },

    async revokeAll(accountId) {
      await database.query(
        `UPDATE sessions
         SET revoked_at = $2
         WHERE account_id = $1 AND revoked_at IS NULL`,
        [accountId, clock()],
      );
    },

    async revokeSession(accountId, sessionId) {
      await database.query(
        `UPDATE sessions
         SET revoked_at = $3
         WHERE account_id = $1 AND session_id = $2 AND revoked_at IS NULL`,
        [accountId, sessionId, clock()],
      );
    },
  };
}
