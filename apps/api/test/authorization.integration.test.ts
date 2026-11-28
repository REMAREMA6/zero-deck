import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { createAuthorizationService } from '../src/modules/authorization/authorization.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

describe('server-authoritative authorization gates', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for authorization integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });
  afterAll(async () => { await pool?.end(); });

  it('evaluates permission, Pro entitlement and owner activation independently across all 27 states', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const authorization = createAuthorizationService(pool);
    const states = [true, false, null] as const;
    for (const permission of states) {
      for (const pro of states) {
        for (const activation of states) {
          const accountId = randomUUID();
          await pool.query('INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
            [accountId, accountId + '@example.test']);
          if (permission !== null) await pool.query(
            "INSERT INTO account_permissions (account_id, permission_key, granted) VALUES ($1, 'website.check', $2)",
            [accountId, permission]);
          if (pro !== null) await pool.query(
            'INSERT INTO account_entitlements (account_id, pro_active) VALUES ($1, $2)', [accountId, pro]);
          if (activation !== null) await pool.query(
            "INSERT INTO system_feature_controls (feature_key, enabled) VALUES ('mvp03_url_check', $1) ON CONFLICT (feature_key) DO UPDATE SET enabled = EXCLUDED.enabled",
            [activation]);
          const decision = await authorization.authorize({
            accountId, permission: 'website.check', requirePro: true, featureKey: 'mvp03_url_check',
          });
          expect(decision.allowed).toBe(permission === true && pro === true && activation === true);
          if (permission === null) expect(decision).toEqual({ allowed: false, reason: 'permission_unknown' });
          else if (permission === false) expect(decision).toEqual({ allowed: false, reason: 'permission_denied' });
          else if (pro === null) expect(decision).toEqual({ allowed: false, reason: 'entitlement_unknown' });
          else if (pro === false) expect(decision).toEqual({ allowed: false, reason: 'pro_required' });
          else if (activation === null) expect(decision).toEqual({ allowed: false, reason: 'activation_unknown' });
          else if (activation === false) expect(decision).toEqual({ allowed: false, reason: 'activation_disabled' });
          else expect(decision).toEqual({ allowed: true });
        }
      }
    }
  });

  it('denies disabled and unknown accounts and never trusts caller-supplied authorization flags', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const authorization = createAuthorizationService(pool);
    const missing = randomUUID();
    expect(await authorization.authorize({ accountId: missing, permission: 'website.check' })).toEqual(
      { allowed: false, reason: 'account_unknown' });
    const accountId = randomUUID();
    await pool.query("INSERT INTO accounts (account_id, email, email_canonical, status) VALUES ($1, $2, $2, 'disabled')",
      [accountId, accountId + '@example.test']);
    expect(await authorization.authorize({ accountId, permission: 'website.check' })).toEqual(
      { allowed: false, reason: 'account_disabled' });
    const tampered = { accountId: randomUUID(), permission: 'website.check', proActive: true,
      ownerActivation: true, role: 'admin' } as never;
    expect(await authorization.authorize(tampered)).toEqual(
      { allowed: false, reason: 'account_unknown' });
  });

  it('denies protected operations when the authorization database is unavailable', async () => {
    const authorization = createAuthorizationService({
      connect: async () => { throw new Error('database unavailable'); },
    } as never);
    expect(await authorization.authorize({ accountId: randomUUID(), permission: 'website.check' })).toEqual(
      { allowed: false, reason: 'unavailable' });
  });

  it('rejects malformed permission identifiers without opening a database connection', async () => {
    let connected = false;
    const authorization = createAuthorizationService({
      connect: async () => { connected = true; throw new Error('must not connect'); },
    } as never);
    expect(await authorization.authorize({ accountId: randomUUID(), permission: 'Admin *' })).toEqual(
      { allowed: false, reason: 'permission_unknown' });
    expect(connected).toBe(false);
  });
}