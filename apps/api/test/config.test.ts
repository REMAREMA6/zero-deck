import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('application configuration', () => {
  it('loads required PostgreSQL configuration and safe defaults', () => {
    const config = loadConfig({
      DATABASE_URL: 'postgresql://zerodeck:test@localhost:5432/zerodeck',
      NODE_ENV: 'test',
    });

    expect(config.DATABASE_URL).toBe('postgresql://zerodeck:test@localhost:5432/zerodeck');
    expect(config.HOST).toBe('0.0.0.0');
    expect(config.PORT).toBe(4000);
    expect(config.NODE_ENV).toBe('test');
  });

  it('rejects missing database configuration', () => {
    expect(() => loadConfig({ NODE_ENV: 'test' })).toThrow('Invalid application configuration:');
  });

  it('rejects invalid ports and does not include secret values in errors', () => {
    const secretDatabaseUrl = 'postgresql://zerodeck:private-value@localhost:5432/zerodeck';

    let message = '';
    try {
      loadConfig({
        DATABASE_URL: secretDatabaseUrl,
        PORT: 'not-a-port',
        NODE_ENV: 'test',
      });
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }

    expect(message).toContain('PORT');
    expect(message).not.toContain('private-value');
    expect(message).not.toContain(secretDatabaseUrl);
  });

  it('rejects ports outside the supported TCP range', () => {
    expect(() =>
      loadConfig({
        DATABASE_URL: 'postgresql://zerodeck:test@localhost:5432/zerodeck',
        PORT: '70000',
      }),
    ).toThrow('Invalid application configuration:');
  });
});
