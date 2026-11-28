import { describe, expect, it } from 'vitest';
import { summarizeSelectedFile } from './file-selection';

describe('metadata-only Web file selection', () => {
  it('returns no selection when the user has not chosen a file', () => {
    expect(summarizeSelectedFile(null)).toBeNull();
  });

  it('keeps only the selected file name, size and browser-declared type', () => {
    expect(
      summarizeSelectedFile({
        name: 'sample.pdf',
        size: 2048,
        type: 'application/pdf',
      }),
    ).toEqual({
      name: 'sample.pdf',
      sizeBytes: 2048,
      declaredType: 'application/pdf',
    });
  });

  it('does not infer a file type when the browser reports none', () => {
    expect(
      summarizeSelectedFile({
        name: 'sample.unknown',
        size: 12,
        type: '',
      }),
    ).toEqual({
      name: 'sample.unknown',
      sizeBytes: 12,
      declaredType: 'Not reported by the browser',
    });
  });
});
