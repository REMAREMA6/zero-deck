export interface SelectedFileMetadata {
  name: string;
  sizeBytes: number;
  declaredType: string;
  supportStatus: 'not_evaluated';
}

export interface WebFileHandle {
  readonly name: string;
  readonly size: number;
  readonly type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
}

export class WebFileAccessError extends Error {
  constructor() {
    super('The selected file is no longer readable. Select it again or choose another file.');
    this.name = 'WebFileAccessError';
  }
}

export interface SelectedWebFile extends SelectedFileMetadata {
  readBytes(): Promise<Uint8Array>;
}

export function summarizeSelectedFile(
  file: Pick<WebFileHandle, 'name' | 'size' | 'type'> | null,
): SelectedFileMetadata | null {
  if (!file) return null;

  return {
    name: file.name,
    sizeBytes: file.size,
    declaredType: file.type || 'Not reported by the browser',
    supportStatus: 'not_evaluated',
  };
}

export function createWebFileAccessHandle(file: WebFileHandle): SelectedWebFile {
  const metadata = summarizeSelectedFile(file);
  if (!metadata) throw new WebFileAccessError();

  return {
    ...metadata,
    async readBytes() {
      try {
        const buffer = await file.arrayBuffer();
        if (buffer.byteLength !== metadata.sizeBytes) throw new WebFileAccessError();
        return new Uint8Array(buffer);
      } catch {
        throw new WebFileAccessError();
      }
    },
  };
}
