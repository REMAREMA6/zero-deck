import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Web account-deletion proxy', () => {
  it('forwards fresh-authentication and explicit confirmation without exposing the token in the body', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: URL, init: RequestInit) => {
        expect(url.toString()).toBe('https://api.example.test/v1/account/deletion');
        expect(init.method).toBe('POST');
        expect(new Headers(init.headers).get('authorization')).toBe('Bearer session-token');
        expect(JSON.parse(String(init.body))).toEqual({
          currentPassword: 'current-password',
          confirmation: 'DELETE MY ACCOUNT',
        });
        return Response.json(
          {
            status: 'deletion_scheduled',
            accessDisabled: true,
            sessionsRevoked: true,
            deletionDueAt: '2026-12-28T12:00:00.000Z',
            personalDataDeleted: false,
          },
          { status: 202 },
        );
      }),
    );
    const request = new NextRequest('https://app.example.test/api/account/deletion', {
      method: 'POST',
      headers: { cookie: 'zerodeck_session=session-token' },
      body: JSON.stringify({
        currentPassword: 'current-password',
        confirmation: 'DELETE MY ACCOUNT',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(202);
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('does not clear the session when retention policy blocks deletion', async () => {
    vi.stubEnv('API_INTERNAL_URL', 'https://api.example.test');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json(
          {
            error: {
              code: 'ACCOUNT_DELETION_UNAVAILABLE',
              message: 'Account deletion is unavailable until its retention policy is approved.',
            },
          },
          { status: 503 },
        ),
      ),
    );
    const request = new NextRequest('https://app.example.test/api/account/deletion', {
      method: 'POST',
      headers: { cookie: 'zerodeck_session=session-token' },
      body: JSON.stringify({
        currentPassword: 'current-password',
        confirmation: 'DELETE MY ACCOUNT',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(503);
    expect(response.headers.get('set-cookie')).toBeNull();
  });
});
