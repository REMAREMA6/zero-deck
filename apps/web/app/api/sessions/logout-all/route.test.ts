import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Web logout-all boundary', () => {
  it('revokes upstream sessions and clears the browser credential', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: URL, init: RequestInit) => {
        expect(init.method).toBe('POST');
        expect(new Headers(init.headers).get('authorization')).toBe('Bearer session-token');
        return new Response(null, { status: 204 });
      }),
    );
    const request = new NextRequest('https://app.example.test/api/sessions/logout-all', {
      method: 'POST',
      headers: { cookie: 'zerodeck_session=session-token' },
    });

    const response = await POST(request);
    expect(response.status).toBe(204);
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
  });
});
