import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { createUrlCheckService } from '../src/modules/website/url-checking.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

describe('MVP-03 independent URL-check authorization gates', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for URL-check integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('does not call the provider when either gate is false or unknown', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await pool.query(
      'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
      [accountId, accountId + '@example.test'],
    );
    const lookup = vi.fn(async () => ({
      verdict: 'no_match',
      explanation: 'No known match was returned.',
    }));
    const service = createUrlCheckService(pool, { lookup });

    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'eligibility_unknown',
    });
    expect(lookup).not.toHaveBeenCalled();

    await pool.query(
      'INSERT INTO account_entitlements (account_id, pro_active) VALUES ($1, false)',
      [accountId],
    );
    await pool.query(
      "INSERT INTO system_feature_controls (feature_key, enabled) VALUES ('mvp03_url_check', true)",
    );
    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'pro_required',
    });
    expect(lookup).not.toHaveBeenCalled();

    await pool.query('UPDATE account_entitlements SET pro_active = true WHERE account_id = $1', [
      accountId,
    ]);
    await pool.query(
      `UPDATE system_feature_controls SET enabled = false
       WHERE feature_key = 'mvp03_url_check'`,
    );
    expect(await service.check(accountId, 'https://example.com/path', true)).toEqual({
      status: 'blocked',
      reason: 'activation_disabled',
    });
    expect(lookup).not.toHaveBeenCalled();
  });

  it('calls the provider only after both gates and explicit consent pass', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await pool.query(
      'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
      [accountId, accountId + '@example.test'],
    );
    await pool.query(
      'INSERT INTO account_entitlements (account_id, pro_active) VALUES ($1, true)',
      [accountId],
    );
    await pool.query(
      `INSERT INTO system_feature_controls (feature_key, enabled)
       VALUES ('mvp03_url_check', true)
       ON CONFLICT (feature_key) DO UPDATE SET enabled = true`,
    );
    const lookup = vi.fn(async () => ({
      verdict: 'no_match',
      explanation: 'No known match was returned. This is not a safety guarantee.',
    }));
    const service = createUrlCheckService(pool, { lookup });

    await expect(service.check(accountId, 'https://example.com/path', false)).rejects.toThrow();
    expect(lookup).not.toHaveBeenCalled();

    const result = await service.check(accountId, 'https://example.com/path', true);
    expect(result).toEqual({
      status: 'completed',
      verdict: 'no_match',
      explanation: 'No known match was returned. This is not a safety guarantee.',
    });
    expect(lookup).toHaveBeenCalledTimes(1);
    expect(lookup).toHaveBeenCalledWith({ url: 'https://example.com/path' });
  });

  it('rejects unsupported schemes, malformed URLs and embedded credentials before dispatch', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const lookup = vi.fn();
    const service = createUrlCheckService(pool, { lookup });
    for (const value of [
      'javascript:alert(1)',
      'file:///etc/passwd',
      'https://user:pass@example.com',
    ]) {
      await expect(service.check(randomUUID(), value, true)).rejects.toThrow();
    }
    expect(lookup).not.toHaveBeenCalled();
  });

  it('does not make a provider call when no provider is configured', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await pool.query(
      'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
      [accountId, accountId + '@example.test'],
    );
    await pool.query(
      'INSERT INTO account_entitlements (account_id, pro_active) VALUES ($1, true)',
      [accountId],
    );
    await pool.query(
      `INSERT INTO system_feature_controls (feature_key, enabled)
       VALUES ('mvp03_url_check', true)
       ON CONFLICT (feature_key) DO UPDATE SET enabled = true`,
    );
    const service = createUrlCheckService(pool, null);
    expect(await service.check(accountId, 'https://example.com', true)).toEqual({
      status: 'unavailable',
    });
  });
});
