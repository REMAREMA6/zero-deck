import { describe, expect, it, vi } from 'vitest';
import {
  rotateSessionCredential,
  SessionRotationError,
  type SessionTokenStorage,
} from '../src/session-client';

function createStorage() {
  const values = new Map<string, string>();
  const storage: SessionTokenStorage = {
    write: vi.fn(async (token: string) => {
      values.set('session', token);
    }),
    clear: vi.fn(async () => {
      values.delete('session');
    }),
  };
  return { storage, values };
}

describe('Android session rotation client', () => {
  it('stores the replacement token in secure storage and returns only session metadata', async () => {
    const { storage, values } = createStorage();
    const fetcher = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            sessionToken: 'new-token',
            accountId: 'account-1',
            sessionId: 'session-1',
            absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
          }),
          { status: 200 },
        ),
    );

    const result = await rotateSessionCredential(
      'https://api.example.test/',
      'old-token',
      storage,
      fetcher,
    );

    expect(values.get('session')).toBe('new-token');
    expect(result).toEqual({
      accountId: 'account-1',
      sessionId: 'session-1',
      absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
    });
    expect(result).not.toHaveProperty('sessionToken');
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('does not replace local credentials when the server rejects the old token', async () => {
    const { storage, values } = createStorage();
    values.set('session', 'old-token');
    const fetcher = vi.fn(async () => new Response(null, { status: 401 }));

    await expect(
      rotateSessionCredential('https://api.example.test', 'old-token', storage, fetcher),
    ).rejects.toBeInstanceOf(SessionRotationError);
    expect(values.get('session')).toBe('old-token');
    expect(storage.write).not.toHaveBeenCalled();
  });

  it('revokes the new server credential if secure persistence fails', async () => {
    const storage: SessionTokenStorage = {
      write: vi.fn(async () => {
        throw new Error('secure store unavailable');
      }),
      clear: vi.fn(async () => undefined),
    };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            sessionToken: 'new-token',
            accountId: 'account-1',
            sessionId: 'session-1',
            absoluteExpiresAt: '2026-12-28T00:00:00.000Z',
          }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    await expect(
      rotateSessionCredential('https://api.example.test', 'old-token', storage, fetcher),
    ).rejects.toMatchObject({ reason: 'secure_storage' });
    expect(fetcher).toHaveBeenNthCalledWith(
      2,
      'https://api.example.test/v1/sessions/current',
      expect.objectContaining({
        method: 'DELETE',
        headers: { authorization: 'Bearer new-token' },
      }),
    );
    expect(storage.clear).toHaveBeenCalledOnce();
  });

  it('fails closed when the server response does not contain a replacement token', async () => {
    const { storage } = createStorage();
    await expect(
      rotateSessionCredential(
        'https://api.example.test',
        'old-token',
        storage,
        vi.fn(async () => new Response(JSON.stringify({ accountId: 'a' }), { status: 200 })),
      ),
    ).rejects.toMatchObject({ reason: 'invalid_response' });
    expect(storage.write).not.toHaveBeenCalled();
  });
});
