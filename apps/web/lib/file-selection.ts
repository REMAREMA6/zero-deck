export interface SelectedFileMetadata {
  name: string;
  sizeBytes: number;
  declaredType: string;
}

export function summarizeSelectedFile(
  file: Pick<File, 'name' | 'size' | 'type'> | null,
): SelectedFileMetadata | null {
  if (!file) return null;

  return {
    name: file.name,
    sizeBytes: file.size,
    declaredType: file.type || 'Not reported by the browser',
  };
}
