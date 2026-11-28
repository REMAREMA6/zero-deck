import { randomUUID } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

describe('PostgreSQL migration guarantees', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for migration integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });

  afterAll(async () => {
    await pool?.end();
  });

  it('applies the same migration only once', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const id = randomUUID().replaceAll('-', '');
    const directory = await mkdtemp(join(tmpdir(), 'zerodeck-migration-idempotency-'));
    const migrationName = '001_' + id + '.sql';
    const tableName = 'migration_idempotency_' + id;

    try {
      await writeFile(
        join(directory, migrationName),
        'CREATE TABLE ' + tableName + ' (id integer PRIMARY KEY);',
      );

      await applyMigrations(pool, directory);
      await applyMigrations(pool, directory);

      const relation = await pool.query<{ relation: string | null }>(
        'SELECT to_regclass($1) AS relation',
        [tableName],
      );
      const ledger = await pool.query<{ count: string }>(
        'SELECT count(*)::text AS count FROM schema_migrations WHERE migration_name = $1',
        [migrationName],
      );

      expect(relation.rows[0]?.relation).toBe(tableName);
      expect(ledger.rows[0]?.count).toBe('1');
    } finally {
      await pool.query('DROP TABLE IF EXISTS ' + tableName);
      await pool.query('DELETE FROM schema_migrations WHERE migration_name = $1', [migrationName]);
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('refuses to change an already-applied migration checksum', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const id = randomUUID().replaceAll('-', '');
    const directory = await mkdtemp(join(tmpdir(), 'zerodeck-migration-checksum-'));
    const migrationName = '002_' + id + '.sql';
    const tableName = 'migration_checksum_' + id;

    try {
      await writeFile(
        join(directory, migrationName),
        'CREATE TABLE ' + tableName + ' (id integer PRIMARY KEY);',
      );
      await applyMigrations(pool, directory);

      await writeFile(
        join(directory, migrationName),
        'CREATE TABLE ' + tableName + ' (id text PRIMARY KEY);',
      );

      await expect(applyMigrations(pool, directory)).rejects.toThrow(
        'Applied migration checksum changed:',
      );
    } finally {
      await pool.query('DROP TABLE IF EXISTS ' + tableName);
      await pool.query('DELETE FROM schema_migrations WHERE migration_name = $1', [migrationName]);
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('rolls back a failed migration and does not record it as applied', async () => {
    if (!pool) throw new Error('PostgreSQL test dependency is unavailable.');

    const id = randomUUID().replaceAll('-', '');
    const directory = await mkdtemp(join(tmpdir(), 'zerodeck-migration-rollback-'));
    const migrationName = '003_' + id + '.sql';
    const tableName = 'migration_rollback_' + id;

    try {
      await writeFile(
        join(directory, migrationName),
        'CREATE TABLE ' + tableName + ' (id integer PRIMARY KEY); THIS IS NOT VALID;',
      );

      await expect(applyMigrations(pool, directory)).rejects.toThrow();

      const relation = await pool.query<{ relation: string | null }>(
        'SELECT to_regclass($1) AS relation',
        [tableName],
      );
      const ledger = await pool.query<{ count: string }>(
        'SELECT count(*)::text AS count FROM schema_migrations WHERE migration_name = $1',
        [migrationName],
      );

      expect(relation.rows[0]?.relation).toBeNull();
      expect(ledger.rows[0]?.count).toBe('0');
    } finally {
      await pool.query('DROP TABLE IF EXISTS ' + tableName);
      await pool.query('DELETE FROM schema_migrations WHERE migration_name = $1', [migrationName]);
      await rm(directory, { recursive: true, force: true });
    }
  });
});
