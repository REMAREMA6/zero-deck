import type { Pool } from 'pg';
import { hashPassword } from './password-hasher.js';

export interface PasswordPolicy {
  assertAccepted(password: string): Promise<void> | void;
}

export interface AccountRegistrationService {
  register(input: { email: string; password: string }): Promise<void>;
}

export class AccountRegistrationUnavailableError extends Error {
  constructor() {
    super('Account registration is not configured.');
    this.name = 'AccountRegistrationUnavailableError';
  }
}

export class PasswordPolicyRejectedError extends Error {
  constructor() {
    super('The password does not meet the configured account policy.');
    this.name = 'PasswordPolicyRejectedError';
  }
}

export function canonicalizeEmail(email: string): string {
  const trimmed = email.trim();
  const separator = trimmed.lastIndexOf('@');

  if (separator <= 0 || separator === trimmed.length - 1) {
    throw new Error('Email address is invalid.');
  }

  const localPart = trimmed.slice(0, separator);
  const domain = trimmed.slice(separator + 1).toLowerCase();
  return localPart + '@' + domain;
}

export function createAccountRegistrationService(
  database: Pool,
  passwordPolicy: PasswordPolicy | null,
): AccountRegistrationService {
  return {
    async register(input) {
      if (!passwordPolicy) {
        throw new AccountRegistrationUnavailableError();
      }

      await passwordPolicy.assertAccepted(input.password);

      const email = input.email.trim();
      const emailCanonical = canonicalizeEmail(email);
      const passwordHash = await hashPassword(input.password);
      const client = await database.connect();

      try {
        await client.query('BEGIN');
        const inserted = await client.query<{ account_id: string }>(
          `INSERT INTO accounts (email, email_canonical)
           VALUES ($1, $2)
           ON CONFLICT (email_canonical) DO NOTHING
           RETURNING account_id`,
          [email, emailCanonical],
        );

        const accountId = inserted.rows[0]?.account_id;
        if (accountId) {
          await client.query(
            `INSERT INTO account_credentials (account_id, password_hash)
             VALUES ($1, $2)`,
            [accountId, passwordHash],
          );
        }

        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
