import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Pool } from 'pg';

export async function applyMigrations(pool: Pool, migrationsDirectory: string): Promise<void> {
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    migration_name text PRIMARY KEY,
    checksum text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);

  const migrationNames = (await readdir(migrationsDirectory)).filter((name) => name.endsWith('.sql')).sort();
  for (const migrationName of migrationNames) {
    const sql = await readFile(join(migrationsDirectory, migrationName), 'utf8');
    const checksum = createHash('sha256').update(sql).digest('hex');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const existing = await client.query<{ checksum: string }>(
        'SELECT checksum FROM schema_migrations WHERE migration_name = $1', [migrationName],
      );
      if (existing.rowCount) {
        if (existing.rows[0]?.checksum !== checksum) {
          throw new Error('Applied migration checksum changed: ' + migrationName);
        }
        await client.query('COMMIT');
        continue;
      }
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (migration_name, checksum) VALUES ($1, $2)', [migrationName, checksum]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
