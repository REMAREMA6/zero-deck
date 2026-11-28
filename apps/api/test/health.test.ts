import { describe, expect, it, vi } from 'vitest';
import { buildApp } from '../src/app.js';

describe('health endpoints', () => {
  it('reports liveness without depending on the database', async () => {
    const app = buildApp({ database: { query: vi.fn() } as never });
    const response = await app.inject({ method: 'GET', url: '/health/live' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
    await app.close();
  });

  it('reports readiness only when PostgreSQL responds', async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ '?column?': 1 }], rowCount: 1 });
    const app = buildApp({ database: { query } as never });
    const response = await app.inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ready' });
    expect(query).toHaveBeenCalledWith('SELECT 1');
    await app.close();
  });

  it('fails readiness closed and hides database details', async () => {
    const query = vi.fn().mockRejectedValue(new Error('private connection detail'));
    const app = buildApp({ database: { query } as never });
    const response = await app.inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(503);
    expect(response.body).not.toContain('private connection detail');
    expect(response.json()).toEqual({ status: 'not_ready', reason: 'database_unavailable' });
    await app.close();
  });
});
