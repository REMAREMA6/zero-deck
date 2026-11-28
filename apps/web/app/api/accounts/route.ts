import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'INVALID_JSON', message: 'The request body is invalid.' } },
      { status: 400 },
    );
  }

  const apiBaseUrl = process.env.API_INTERNAL_URL;
  if (!apiBaseUrl) {
    return NextResponse.json(
      { error: { code: 'API_NOT_CONFIGURED', message: 'Account registration is unavailable.' } },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(new URL('/v1/accounts', apiBaseUrl), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    const responseBody = await upstream.json().catch(() => null);

    return NextResponse.json(
      responseBody ?? {
        error: { code: 'UPSTREAM_ERROR', message: 'The request could not be completed.' },
      },
      { status: upstream.status, headers: { 'cache-control': 'no-store' } },
    );
  } catch {
    return NextResponse.json(
      { error: { code: 'API_UNAVAILABLE', message: 'Account registration is unavailable.' } },
      { status: 503 },
    );
  }
}
