import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  getApiBaseUrl,
  getSessionToken,
} from '../../../../lib/session-proxy';

export async function DELETE(request: NextRequest) {
  const token = getSessionToken(request);
  const apiBaseUrl = getApiBaseUrl();
  let status = 204;

  if (token && !apiBaseUrl) {
    status = 503;
  } else if (token && apiBaseUrl) {
    try {
      const upstream = await fetch(new URL('/v1/sessions/current', apiBaseUrl), {
        method: 'DELETE',
        headers: { authorization: 'Bearer ' + token },
        cache: 'no-store',
      });
      status = upstream.ok || upstream.status === 401 ? 204 : upstream.status;
    } catch {
      status = 503;
    }
  }

  const response = new NextResponse(null, { status });
  clearSessionCookie(response);
  return response;
}
