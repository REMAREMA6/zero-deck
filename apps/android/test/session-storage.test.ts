import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createSessionStorage,
  SecureSessionStorageUnavailableError,
  SESSION_STORAGE_KEY,
  type SecureStorageAdapter,
} from '../src/session-storage';

function createFakeAdapter() {
  const values = new Map<string, string>();
  const adapter: SecureStorageAdapter = {
    isAvailableAsync: vi.fn(async () => true),
    getItemAsync: vi.fn(async (key: string) => values.get(key) ?? null),
    setItemAsync: vi.fn(async (key: string, value: string) => {
      values.set(key, value);
    }),
    deleteItemAsync: vi.fn(async (key: string) => {
      values.delete(key);
    }),
  };
  return { adapter, values };
}

describe('secure session storage adapter', () => {
  let fake: ReturnType<typeof createFakeAdapter>;

  beforeEach(() => {
    fake = createFakeAdapter();
  });

  it('writes, reads and clears an opaque session credential', async () => {
    const storage = createSessionStorage(fake.adapter);
    await storage.write('opaque-session-token');

    expect(fake.values.get(SESSION_STORAGE_KEY)).toBe('opaque-session-token');
    expect(await storage.read()).toBe('opaque-session-token');

    await storage.clear();
    expect(await storage.read()).toBeNull();
  });

  it('fails closed when secure storage is unavailable', async () => {
    fake.adapter.isAvailableAsync = vi.fn(async () => false);
    const storage = createSessionStorage(fake.adapter);

    await expect(storage.read()).rejects.toBeInstanceOf(
      SecureSessionStorageUnavailableError,
    );
    await expect(storage.write('opaque-session-token')).rejects.toBeInstanceOf(
      SecureSessionStorageUnavailableError,
    );
    await expect(storage.clear()).rejects.toBeInstanceOf(
      SecureSessionStorageUnavailableError,
    );
  });

  it('propagates secure-store write failures', async () => {
    fake.adapter.setItemAsync = vi.fn(async () => {
      throw new Error('Native secure store failure');
    });
    const storage = createSessionStorage(fake.adapter);

    await expect(storage.write('opaque-session-token')).rejects.toThrow(
      'Native secure store failure',
    );
  });

  it('does not accept an empty session credential', async () => {
    const storage = createSessionStorage(fake.adapter);
    await expect(storage.write('')).rejects.toThrow('A session token is required.');
  });
});
