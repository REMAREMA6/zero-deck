import { afterEach, describe, expect, it } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  getSessionToken,
  setSessionCookie,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
} from './session-proxy';

const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnvironment(value: string | undefined): void {
  const environment = process.env as unknown as Record<string, string | undefined>;
  if (value === undefined) {
    delete environment.NODE_ENV;
  } else {
    environment.NODE_ENV = value;
  }
}

afterEach(() => {
  setNodeEnvironment(originalNodeEnv);
});

describe('Web session cookie boundary', () => {
  it('stores the session in an HttpOnly, SameSite=Lax cookie with a 30-day cap', () => {
    setNodeEnvironment('development');
    const response = NextResponse.json({ accepted: true });

    setSessionCookie(response, 'opaque-session-token');

    const cookie = response.headers.get('set-cookie') ?? '';
    expect(cookie).toContain(SESSION_COOKIE_NAME + '=opaque-session-token');
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/SameSite=lax/i);
    expect(cookie).toMatch(/Path=\//i);
    expect(cookie).toContain('Max-Age=' + SESSION_COOKIE_MAX_AGE);
    expect(cookie).not.toMatch(/; Secure/i);
  });

  it('marks the session cookie Secure in production', () => {
    setNodeEnvironment('production');
    const response = NextResponse.json({ accepted: true });

    setSessionCookie(response, 'opaque-session-token');

    expect(response.headers.get('set-cookie')).toMatch(/; Secure/i);
  });

  it('clears the cookie after local logout', () => {
    const response = NextResponse.json({ signedOut: true });

    clearSessionCookie(response);

    const cookie = response.headers.get('set-cookie') ?? '';
    expect(cookie).toContain(SESSION_COOKIE_NAME + '=');
    expect(cookie).toContain('Max-Age=0');
    expect(cookie).toMatch(/HttpOnly/i);
  });

  it('reads the opaque credential from the request cookie boundary', () => {
    const request = new NextRequest('http://localhost/api/session', {
      headers: { cookie: SESSION_COOKIE_NAME + '=opaque-session-token' },
    });

    expect(getSessionToken(request)).toBe('opaque-session-token');
  });
});
