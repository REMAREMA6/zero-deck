import { describe, expect, it, vi } from 'vitest';
import { createWebFileAccessHandle, summarizeSelectedFile, WebFileAccessError } from './file-selection';

describe('Web file selection and access', () => {
  it('returns no selection when the user has not chosen a file', () => {
    expect(summarizeSelectedFile(null)).toBeNull();
  });

  it('keeps selection metadata only until explicit readBytes is called', async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const file = {
      name: 'sample.pdf',
      size: bytes.byteLength,
      type: 'application/pdf',
      arrayBuffer: vi.fn(async () => bytes.buffer.slice(0)),
    };
    const selected = createWebFileAccessHandle(file);
    expect(selected).toMatchObject({
      name: 'sample.pdf',
      sizeBytes: 3,
      declaredType: 'application/pdf',
      supportStatus: 'not_evaluated',
    });
    expect(file.arrayBuffer).not.toHaveBeenCalled();
    await expect(selected.readBytes()).resolves.toEqual(bytes);
    expect(file.arrayBuffer).toHaveBeenCalledOnce();
  });

  it('does not infer a file type when the browser reports none', () => {
    expect(
      summarizeSelectedFile({ name: 'sample.unknown', size: 12, type: '' }),
    ).toEqual({
      name: 'sample.unknown',
      sizeBytes: 12,
      declaredType: 'Not reported by the browser',
      supportStatus: 'not_evaluated',
    });
  });

  it('reports revoked or unreadable browser file access without leaking details', async () => {
    const file = {
      name: 'sample.bin',
      size: 10,
      type: '',
      arrayBuffer: vi.fn(async () => {
        throw new Error('private browser file-system detail');
      }),
    };
    const selected = createWebFileAccessHandle(file);
    await expect(selected.readBytes()).rejects.toEqual(new WebFileAccessError());
  });

  it('detects a file snapshot that no longer matches its selected metadata', async () => {
    const file = {
      name: 'sample.bin',
      size: 10,
      type: '',
      arrayBuffer: vi.fn(async () => new Uint8Array([1, 2]).buffer),
    };
    const selected = createWebFileAccessHandle(file);
    await expect(selected.readBytes()).rejects.toEqual(new WebFileAccessError());
  });
});
