import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { createAuthorizationService } from '../src/modules/authorization/authorization.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;
const gateStates = [
  { value: true, freshness: 'fresh' },
  { value: false, freshness: 'fresh' },
  { value: true, freshness: 'stale' },
  { value: true, freshness: 'unknown' },
  { value: null, freshness: null },
] as const;

describe('server-authoritative authorization gates', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for authorization integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('evaluates permission, Pro entitlement and owner activation independently across all 125 states', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const authorization = createAuthorizationService(pool);

    for (const permission of gateStates) {
      for (const pro of gateStates) {
        for (const activation of gateStates) {
          const accountId = randomUUID();
          const featureKey = 'test.authorization.' + randomUUID();
          await pool.query(
            'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
            [accountId, accountId + '@example.test'],
          );
          if (permission.freshness !== null) {
            await pool.query(
              'INSERT INTO account_permissions (account_id, permission_key, granted, state_status) VALUES ($1, $2, $3, $4)',
              [accountId, 'website.check', permission.value, permission.freshness],
            );
          }
          if (pro.freshness !== null) {
            await pool.query(
              'INSERT INTO account_entitlements (account_id, pro_active, state_status) VALUES ($1, $2, $3)',
              [accountId, pro.value, pro.freshness],
            );
          }
          if (activation.freshness !== null) {
            await pool.query(
              'INSERT INTO system_feature_controls (feature_key, enabled, state_status) VALUES ($1, $2, $3)',
              [featureKey, activation.value, activation.freshness],
            );
          }
          const decision = await authorization.authorize({
            accountId,
            permission: 'website.check',
            requirePro: true,
            featureKey,
          });
          const permitted = permission.value === true && permission.freshness === 'fresh';
          const proEligible = pro.value === true && pro.freshness === 'fresh';
          const activated = activation.value === true && activation.freshness === 'fresh';
          expect(decision.allowed).toBe(permitted && proEligible && activated);

          if (permission.freshness === null || permission.freshness === 'unknown') {
            expect(decision).toEqual({ allowed: false, reason: 'permission_unknown' });
          } else if (permission.freshness === 'stale') {
            expect(decision).toEqual({ allowed: false, reason: 'permission_stale' });
          } else if (permission.value === false) {
            expect(decision).toEqual({ allowed: false, reason: 'permission_denied' });
          } else if (pro.freshness === null || pro.freshness === 'unknown') {
            expect(decision).toEqual({ allowed: false, reason: 'entitlement_unknown' });
          } else if (pro.freshness === 'stale') {
            expect(decision).toEqual({ allowed: false, reason: 'entitlement_stale' });
          } else if (pro.value === false) {
            expect(decision).toEqual({ allowed: false, reason: 'pro_required' });
          } else if (activation.freshness === null || activation.freshness === 'unknown') {
            expect(decision).toEqual({ allowed: false, reason: 'activation_unknown' });
          } else if (activation.freshness === 'stale') {
            expect(decision).toEqual({ allowed: false, reason: 'activation_stale' });
          } else if (activation.value === false) {
            expect(decision).toEqual({ allowed: false, reason: 'activation_disabled' });
          } else {
            expect(decision).toEqual({ allowed: true });
          }
        }
      }
    }
  });

  it('denies disabled and unknown accounts and ignores client-supplied role or gate flags', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const authorization = createAuthorizationService(pool);
    expect(await authorization.authorize({ accountId: randomUUID(), permission: 'website.check' })).toEqual({
      allowed: false,
      reason: 'account_unknown',
    });

    const disabledId = randomUUID();
    await pool.query(
      "INSERT INTO accounts (account_id, email, email_canonical, status) VALUES ($1, $2, $2, 'disabled')",
      [disabledId, disabledId + '@example.test'],
    );
    expect(await authorization.authorize({ accountId: disabledId, permission: 'website.check' })).toEqual({
      allowed: false,
      reason: 'account_disabled',
    });

    const activeId = randomUUID();
    await pool.query(
      'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
      [activeId, activeId + '@example.test'],
    );
    const tampered = {
      accountId: activeId,
      permission: 'website.check',
      proActive: true,
      ownerActivation: true,
      role: 'admin',
    } as never;
    expect(await authorization.authorize(tampered)).toEqual({
      allowed: false,
      reason: 'permission_unknown',
    });
  });

  it('observes permission revocation on the next authorization evaluation', async () => {
    if (!pool) throw new Error('PostgreSQL is unavailable.');
    const accountId = randomUUID();
    await pool.query(
      'INSERT INTO accounts (account_id, email, email_canonical) VALUES ($1, $2, $2)',
      [accountId, accountId + '@example.test'],
    );
    await pool.query(
      "INSERT INTO account_permissions (account_id, permission_key, granted, state_status) VALUES ($1, 'website.check', true, 'fresh')",
      [accountId],
    );
    const authorization = createAuthorizationService(pool);
    expect(await authorization.authorize({ accountId, permission: 'website.check' })).toEqual({
      allowed: true,
    });
    await pool.query(
      "UPDATE account_permissions SET granted = false, updated_at = now() WHERE account_id = $1 AND permission_key = 'website.check'",
      [accountId],
    );
    expect(await authorization.authorize({ accountId, permission: 'website.check' })).toEqual({
      allowed: false,
      reason: 'permission_denied',
    });
  });

  it('denies protected operations when the authorization database is unavailable', async () => {
    const authorization = createAuthorizationService({
      connect: async () => {
        throw new Error('database unavailable');
      },
    } as never);
    expect(await authorization.authorize({ accountId: randomUUID(), permission: 'website.check' })).toEqual({
      allowed: false,
      reason: 'unavailable',
    });
  });

  it('rejects malformed permission identifiers without opening a database connection', async () => {
    let connected = false;
    const authorization = createAuthorizationService({
      connect: async () => {
        connected = true;
        throw new Error('must not connect');
      },
    } as never);
    expect(await authorization.authorize({ accountId: randomUUID(), permission: 'Admin *' })).toEqual({
      allowed: false,
      reason: 'permission_unknown',
    });
    expect(connected).toBe(false);
  });
});
