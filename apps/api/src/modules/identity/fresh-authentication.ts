import type { Pool, PoolClient } from 'pg';
import { verifyPassword } from './password-hasher.js';

export type FreshAuthenticationAction<T> = (client: PoolClient) => Promise<T>;

export interface FreshAuthenticationGuard {
  execute<T>(accountId: string, currentPassword: string, action: FreshAuthenticationAction<T>): Promise<
    { authenticated: false } | { authenticated: true; value: T }
  >;
}

/**
 * Verifies the current password inside the same database transaction as a sensitive action.
 * The account and credential rows stay locked until the action commits, so a password change
 * cannot race between the fresh-authentication check and the protected mutation.
 *
 * Callers must use this guard for password/passkey changes, recovery-email changes and
 * account deletion. It intentionally defines no reusable time window or client-held proof.
 */
export function createFreshAuthenticationGuard(database: Pool): FreshAuthenticationGuard {
  return {
    async execute(accountId, currentPassword, action) {
      const client = await database.connect();
      try {
        await client.query('BEGIN');
        const result = await client.query<{ password_hash: string }>(
          `SELECT credential.password_hash
           FROM accounts AS account
           INNER JOIN account_credentials AS credential
             ON credential.account_id = account.account_id
           WHERE account.account_id = $1
             AND account.status = 'active'
           FOR UPDATE OF account, credential`,
          [accountId],
        );
        const passwordHash = result.rows[0]?.password_hash;
        if (!passwordHash || !(await verifyPassword(passwordHash, currentPassword))) {
          await client.query('ROLLBACK');
          return { authenticated: false };
        }

        const value = await action(client);
        await client.query('COMMIT');
        return { authenticated: true, value };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
