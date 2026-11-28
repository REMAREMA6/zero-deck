import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  getApiBaseUrl,
  getSessionToken,
  unavailableResponse,
} from '../../../../lib/session-proxy';

export async function POST(request: NextRequest) {
  const token = getSessionToken(request);
  if (!token) {
    return NextResponse.json(
      { error: { code: 'UNAUTHENTICATED', message: 'Sign-in is required.' } },
      { status: 401, headers: { 'cache-control': 'no-store' } },
    );
  }

  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return unavailableResponse('Account deletion is unavailable.');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'The deletion request is invalid.' } },
      { status: 422, headers: { 'cache-control': 'no-store' } },
    );
  }

  try {
    const upstream = await fetch(new URL('/v1/account/deletion', apiBaseUrl), {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => null);
    const response = NextResponse.json(
      data ?? { error: { code: 'UPSTREAM_ERROR', message: 'Account deletion is unavailable.' } },
      { status: upstream.status, headers: { 'cache-control': 'no-store' } },
    );
    if (upstream.status === 202) clearSessionCookie(response);
    return response;
  } catch {
    return unavailableResponse('Account deletion could not be confirmed by the account service.');
  }
}
