import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE_NAME = 'zerodeck_session';
export const SESSION_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export function getApiBaseUrl(): string | null {
  return process.env.API_INTERNAL_URL ?? null;
}

export function getSessionToken(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function unavailableResponse(message: string): NextResponse {
  return NextResponse.json(
    { error: { code: 'API_UNAVAILABLE', message } },
    { status: 503, headers: { 'cache-control': 'no-store' } },
  );
}
