import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

const issuedSession = {
  sessionToken: 'opaque-session-token',
  sessionId: 'session-id',
  accountId: 'account-id',
  absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Web session cookie boundary', () => {
  it('keeps the API token out of browser-readable response data', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(JSON.stringify(issuedSession), {
            status: 201,
            headers: { 'content-type': 'application/json' },
          }),
      ),
    );

    const request = new Request('https://app.example.test/api/sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'person@example.test', password: 'test-password' }),
    });
    const response = await POST(request);
    const body = await response.json();
    const cookie = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(200);
    expect(body).toEqual({
      accountId: issuedSession.accountId,
      sessionId: issuedSession.sessionId,
      absoluteExpiresAt: issuedSession.absoluteExpiresAt,
    });
    expect(body).not.toHaveProperty('sessionToken');
    expect(cookie).toContain('zerodeck_session=opaque-session-token');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(cookie.toLowerCase()).toContain('samesite=lax');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('Max-Age=2592000');
  });
});
