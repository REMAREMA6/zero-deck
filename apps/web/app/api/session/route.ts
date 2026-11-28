import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  getApiBaseUrl,
  getSessionToken,
  unavailableResponse,
} from '../../lib/session-proxy';

export async function GET(request: NextRequest) {
  const token = getSessionToken(request);
  if (!token) {
    return NextResponse.json(
      { error: { code: 'UNAUTHENTICATED', message: 'Sign-in is required.' } },
      { status: 401, headers: { 'cache-control': 'no-store' } },
    );
  }

  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return unavailableResponse('Session access is unavailable.');

  try {
    const upstream = await fetch(new URL('/v1/session', apiBaseUrl), {
      headers: { authorization: 'Bearer ' + token },
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => null);
    const response = NextResponse.json(
      data ?? { error: { code: 'UPSTREAM_ERROR', message: 'Session access is unavailable.' } },
      { status: upstream.status, headers: { 'cache-control': 'no-store' } },
    );
    if (upstream.status === 401) clearSessionCookie(response);
    return response;
  } catch {
    return unavailableResponse('Session access is unavailable.');
  }
}
