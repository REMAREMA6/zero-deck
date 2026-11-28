import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  getApiBaseUrl,
  getSessionToken,
  setSessionCookie,
  unavailableResponse,
} from '../../../../../lib/session-proxy';

export async function POST(request: NextRequest) {
  const token = getSessionToken(request);
  if (!token) {
    return NextResponse.json(
      { error: { code: 'UNAUTHENTICATED', message: 'Sign-in is required.' } },
      { status: 401, headers: { 'cache-control': 'no-store' } },
    );
  }

  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return unavailableResponse('Session rotation is unavailable.');

  try {
    const upstream = await fetch(new URL('/v1/sessions/current/rotate', apiBaseUrl), {
      method: 'POST',
      headers: { authorization: 'Bearer ' + token },
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => null);

    if (upstream.status === 401) {
      const response = NextResponse.json(
        { error: { code: 'UNAUTHENTICATED', message: 'Sign-in is required.' } },
        { status: 401, headers: { 'cache-control': 'no-store' } },
      );
      clearSessionCookie(response);
      return response;
    }
    if (!upstream.ok) {
      return NextResponse.json(
        data ?? { error: { code: 'UPSTREAM_ERROR', message: 'Session rotation failed.' } },
        { status: upstream.status, headers: { 'cache-control': 'no-store' } },
      );
    }
    if (typeof data?.sessionToken !== 'string') {
      return NextResponse.json(
        { error: { code: 'INVALID_UPSTREAM_RESPONSE', message: 'Session rotation failed.' } },
        { status: 502, headers: { 'cache-control': 'no-store' } },
      );
    }

    const response = NextResponse.json(
      {
        accountId: data.accountId,
        sessionId: data.sessionId,
        absoluteExpiresAt: data.absoluteExpiresAt,
      },
      { status: 200, headers: { 'cache-control': 'no-store' } },
    );
    setSessionCookie(response, data.sessionToken);
    return response;
  } catch {
    return unavailableResponse('Session rotation is unavailable.');
  }
}
