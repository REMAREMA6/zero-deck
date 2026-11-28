import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Web session credential rotation boundary', () => {
  it('replaces the HttpOnly cookie and never exposes the rotated token in JSON', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: URL, init: RequestInit) => {
        expect(new Headers(init.headers).get('authorization')).toBe('Bearer old-token');
        return new Response(
          JSON.stringify({
            sessionToken: 'rotated-token',
            sessionId: 'same-session-id',
            accountId: 'same-account-id',
            absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
          }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        );
      }),
    );

    const request = new NextRequest('https://app.example.test/api/sessions/current/rotate', {
      method: 'POST',
      headers: { cookie: 'zerodeck_session=old-token' },
    });
    const response = await POST(request);
    const body = await response.json();
    const cookie = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(200);
    expect(body).toEqual({
      accountId: 'same-account-id',
      sessionId: 'same-session-id',
      absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
    });
    expect(body).not.toHaveProperty('sessionToken');
    expect(cookie).toContain('zerodeck_session=rotated-token');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(cookie.toLowerCase()).toContain('samesite=lax');
  });

  it('clears the browser cookie when the server rejects the old credential', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 401 })));

    const request = new NextRequest('https://app.example.test/api/sessions/current/rotate', {
      method: 'POST',
      headers: { cookie: 'zerodeck_session=revoked-token' },
    });
    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
  });
});
