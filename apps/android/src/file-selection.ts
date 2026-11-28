export interface AndroidPickedFileHandle {
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly uri: string;
  readonly exists: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
}

export interface AndroidFilePickerPort {
  pickFileAsync(): Promise<
    { canceled: true; result: null } | { canceled: false; result: AndroidPickedFileHandle }
  >;
}

export interface SelectedAndroidFile {
  name: string;
  sizeBytes: number;
  declaredType: string;
  supportStatus: 'not_evaluated';
  readBytes(): Promise<Uint8Array>;
}

export type AndroidFileAccessFailure = 'unavailable' | 'unreadable' | 'changed';

export class AndroidFileAccessError extends Error {
  constructor(readonly reason: AndroidFileAccessFailure) {
    super(
      reason === 'unavailable'
        ? 'File access is no longer available. Select the file again.'
        : reason === 'changed'
          ? 'The selected file changed after selection. Select it again.'
          : 'The selected file could not be read. Select it again or choose another file.',
    );
    this.name = 'AndroidFileAccessError';
  }
}

export function createAndroidFileSelectionAdapter(picker: AndroidFilePickerPort) {
  return {
    async select(): Promise<SelectedAndroidFile | null> {
      const result = await picker.pickFileAsync();
      if (result.canceled) return null;

      const handle = result.result;
      if (!handle.name || !handle.uri || !handle.exists) {
        throw new AndroidFileAccessError('unavailable');
      }

      const selectedSize = handle.size;
      return {
        name: handle.name,
        sizeBytes: selectedSize,
        declaredType: handle.type || 'Not reported by Android',
        supportStatus: 'not_evaluated',
        async readBytes() {
          try {
            if (!handle.exists) throw new AndroidFileAccessError('unavailable');
            const buffer = await handle.arrayBuffer();
            if (buffer.byteLength !== selectedSize) {
              throw new AndroidFileAccessError('changed');
            }
            return new Uint8Array(buffer);
          } catch (error) {
            if (error instanceof AndroidFileAccessError) throw error;
            throw new AndroidFileAccessError('unreadable');
          }
        },
      };
    },
  };
}
