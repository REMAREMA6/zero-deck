export interface SessionTokenStorage {
  write(token: string): Promise<void>;
  clear(): Promise<void>;
}

export interface RotatedSession {
  accountId: string;
  sessionId: string;
  absoluteExpiresAt: string;
}

export class SessionRotationError extends Error {
  constructor(readonly reason: 'unauthenticated' | 'unavailable' | 'invalid_response' | 'secure_storage') {
    super(
      reason === 'unauthenticated'
        ? 'The session is no longer valid. Sign in again.'
        : reason === 'secure_storage'
          ? 'The rotated session could not be saved securely on this device.'
          : 'The session could not be rotated. Try again later.',
    );
    this.name = 'SessionRotationError';
  }
}

export async function rotateSessionCredential(
  apiBaseUrl: string,
  token: string,
  storage: SessionTokenStorage,
  fetcher: typeof fetch = fetch,
): Promise<RotatedSession> {
  let response: Response;
  try {
    response = await fetcher(apiBaseUrl.replace(/\/+$/, '') + '/v1/sessions/current/rotate', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + token },
    });
  } catch {
    throw new SessionRotationError('unavailable');
  }

  if (response.status === 401) throw new SessionRotationError('unauthenticated');
  if (!response.ok) throw new SessionRotationError('unavailable');

  const payload: unknown = await response.json().catch(() => null);
  if (
    typeof payload !== 'object' ||
    payload === null ||
    typeof (payload as Record<string, unknown>).sessionToken !== 'string' ||
    typeof (payload as Record<string, unknown>).accountId !== 'string' ||
    typeof (payload as Record<string, unknown>).sessionId !== 'string' ||
    typeof (payload as Record<string, unknown>).absoluteExpiresAt !== 'string'
  ) {
    throw new SessionRotationError('invalid_response');
  }

  const data = payload as {
    sessionToken: string;
    accountId: string;
    sessionId: string;
    absoluteExpiresAt: string;
  };

  try {
    await storage.write(data.sessionToken);
  } catch {
    try {
      await fetcher(apiBaseUrl.replace(/\/+$/, '') + '/v1/sessions/current', {
        method: 'DELETE',
        headers: { authorization: 'Bearer ' + data.sessionToken },
      });
    } catch {
      // The rotated token is not retained by this client; server-side cleanup may require expiry.
    }
    try {
      await storage.clear();
    } catch {
      // The secure storage adapter will report its own failure on subsequent access.
    }
    throw new SessionRotationError('secure_storage');
  }

  return {
    accountId: data.accountId,
    sessionId: data.sessionId,
    absoluteExpiresAt: data.absoluteExpiresAt,
  };
}
