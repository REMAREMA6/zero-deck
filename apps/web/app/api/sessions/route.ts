import { NextResponse } from 'next/server';
import { getApiBaseUrl, setSessionCookie, unavailableResponse } from '../../lib/session-proxy';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_JSON', message: 'The request body is invalid.' } },
      { status: 400, headers: { 'cache-control': 'no-store' } },
    );
  }

  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return unavailableResponse('Sign-in is unavailable.');

  try {
    const upstream = await fetch(new URL('/v1/sessions', apiBaseUrl), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return NextResponse.json(
        data ?? { error: { code: 'UPSTREAM_ERROR', message: 'Sign-in could not be completed.' } },
        { status: upstream.status, headers: { 'cache-control': 'no-store' } },
      );
    }

    if (typeof data?.sessionToken !== 'string') {
      return NextResponse.json(
        { error: { code: 'INVALID_UPSTREAM_RESPONSE', message: 'Sign-in could not be completed.' } },
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
    return unavailableResponse('Sign-in is unavailable.');
  }
}
