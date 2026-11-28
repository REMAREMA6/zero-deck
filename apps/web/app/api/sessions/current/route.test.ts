import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { DELETE } from './route';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Web current-session logout boundary', () => {
  it('revokes upstream and clears the HttpOnly browser cookie', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: URL, init: RequestInit) => {
        expect(init.method).toBe('DELETE');
        expect(new Headers(init.headers).get('authorization')).toBe('Bearer session-token');
        return new Response(null, { status: 204 });
      }),
    );
    const request = new NextRequest('https://app.example.test/api/sessions/current', {
      method: 'DELETE',
      headers: { cookie: 'zerodeck_session=session-token' },
    });

    const response = await DELETE(request);
    expect(response.status).toBe(204);
    const cookie = response.headers.get('set-cookie') ?? '';
    expect(cookie).toContain('zerodeck_session=');
    expect(cookie).toContain('Max-Age=0');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
  });

  it('clears the local cookie but reports when upstream revocation cannot be confirmed', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('network unavailable');
      }),
    );
    const request = new NextRequest('https://app.example.test/api/sessions/current', {
      method: 'DELETE',
      headers: { cookie: 'zerodeck_session=session-token' },
    });

    const response = await DELETE(request);
    expect(response.status).toBe(503);
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
  });
});
