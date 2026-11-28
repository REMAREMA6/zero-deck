import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadConfig } from '../config.js';
import { createDatabasePool } from './pool.js';
import { applyMigrations } from './migrate.js';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = resolve(currentDirectory, '../../migrations');
const config = loadConfig();
const pool = createDatabasePool(config.DATABASE_URL);

try {
  await applyMigrations(pool, migrationsDirectory);
  process.stdout.write('Database migrations applied successfully.\n');
} finally {
  await pool.end();
}
