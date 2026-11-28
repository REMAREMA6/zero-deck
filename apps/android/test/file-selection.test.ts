import { describe, expect, it, vi } from 'vitest';
import {
  AndroidFileAccessError,
  createAndroidFileSelectionAdapter,
  type AndroidPickedFileHandle,
} from '../src/file-selection';

function createHandle(overrides: Partial<AndroidPickedFileHandle> = {}) {
  const bytes = new Uint8Array([1, 2, 3]);
  const handle: AndroidPickedFileHandle = {
    name: 'sample.bin',
    size: bytes.byteLength,
    type: 'application/octet-stream',
    uri: 'content://provider/document/1',
    exists: true,
    arrayBuffer: vi.fn(async () => bytes.buffer.slice(0)),
    ...overrides,
  };
  return handle;
}

describe('Android document access adapter', () => {
  it('treats picker cancellation as no selection', async () => {
    const picker = {
      pickFileAsync: vi.fn(async () => ({ canceled: true as const, result: null })),
    };
    const adapter = createAndroidFileSelectionAdapter(picker);
    await expect(adapter.select()).resolves.toBeNull();
  });

  it('keeps selection metadata only until explicit readBytes is called', async () => {
    const handle = createHandle();
    const adapter = createAndroidFileSelectionAdapter({
      pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
    });
    const selected = await adapter.select();
    expect(selected).toMatchObject({
      name: 'sample.bin',
      sizeBytes: 3,
      declaredType: 'application/octet-stream',
      supportStatus: 'not_evaluated',
    });
    expect(handle.arrayBuffer).not.toHaveBeenCalled();
    await expect(selected!.readBytes()).resolves.toEqual(new Uint8Array([1, 2, 3]));
    expect(handle.arrayBuffer).toHaveBeenCalledOnce();
  });

  it('reads selected bytes locally without initiating a network request', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    try {
      const handle = createHandle();
      const adapter = createAndroidFileSelectionAdapter({
        pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
      });
      const selected = await adapter.select();
      await selected!.readBytes();
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('reports a revoked or missing document handle without reading it', async () => {
    const handle = createHandle({ exists: false });
    const adapter = createAndroidFileSelectionAdapter({
      pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
    });
    await expect(adapter.select()).rejects.toMatchObject({
      name: 'AndroidFileAccessError',
      reason: 'unavailable',
    });
    expect(handle.arrayBuffer).not.toHaveBeenCalled();
  });

  it('reports permission loss after selection as unavailable', async () => {
    let exists = true;
    const handle = createHandle({
      get exists() {
        return exists;
      },
    });
    const adapter = createAndroidFileSelectionAdapter({
      pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
    });
    const selected = await adapter.select();
    exists = false;
    await expect(selected!.readBytes()).rejects.toMatchObject({
      name: 'AndroidFileAccessError',
      reason: 'unavailable',
    });
  });

  it('reports read failures without exposing provider details', async () => {
    const handle = createHandle({
      arrayBuffer: vi.fn(async () => {
        throw new Error('private content-provider path');
      }),
    });
    const adapter = createAndroidFileSelectionAdapter({
      pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
    });
    const selected = await adapter.select();
    await expect(selected!.readBytes()).rejects.toEqual(new AndroidFileAccessError('unreadable'));
  });

  it('detects a file that changed size after selection', async () => {
    const handle = createHandle({
      arrayBuffer: vi.fn(async () => new Uint8Array([1, 2]).buffer),
    });
    const adapter = createAndroidFileSelectionAdapter({
      pickFileAsync: vi.fn(async () => ({ canceled: false as const, result: handle })),
    });
    const selected = await adapter.select();
    await expect(selected!.readBytes()).rejects.toEqual(new AndroidFileAccessError('changed'));
  });
});
