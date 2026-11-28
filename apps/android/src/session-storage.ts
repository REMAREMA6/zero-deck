export const SESSION_STORAGE_KEY = 'zerodeck.session';

export interface SecureStorageAdapter {
  isAvailableAsync(): Promise<boolean>;
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}

export class SecureSessionStorageUnavailableError extends Error {
  constructor() {
    super('Secure session storage is unavailable.');
    this.name = 'SecureSessionStorageUnavailableError';
  }
}

export function createSessionStorage(adapter: SecureStorageAdapter) {
  async function assertAvailable(): Promise<void> {
    if (!(await adapter.isAvailableAsync())) {
      throw new SecureSessionStorageUnavailableError();
    }
  }

  return {
    async read(): Promise<string | null> {
      await assertAvailable();
      return adapter.getItemAsync(SESSION_STORAGE_KEY);
    },

    async write(token: string): Promise<void> {
      if (!token) throw new Error('A session token is required.');
      await assertAvailable();
      await adapter.setItemAsync(SESSION_STORAGE_KEY, token);
    },

    async clear(): Promise<void> {
      await assertAvailable();
      await adapter.deleteItemAsync(SESSION_STORAGE_KEY);
    },
  };
}
