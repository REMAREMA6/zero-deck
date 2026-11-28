import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { applyMigrations } from '../src/db/migrate.js';
import { buildApp } from '../src/app.js';

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

describe('PostgreSQL integration', () => {
  beforeAll(async () => {
    if (!pool) throw new Error('DATABASE_URL is required for PostgreSQL integration tests.');
    await applyMigrations(pool, new URL('../migrations/', import.meta.url).pathname);
  });
  afterAll(async () => {
    await pool?.end();
  });
  it('applies migrations to PostgreSQL and serves readiness', async () => {
    if (!pool) throw new Error('DATABASE_URL is required.');
    const app = buildApp({ database: pool });
    const response = await app.inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ready' });
    await app.close();
  });
});
