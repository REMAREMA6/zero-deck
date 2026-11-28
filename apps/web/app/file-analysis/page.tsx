'use client';

import Link from 'next/link';
import { useRef, useState, type ChangeEvent } from 'react';
import { createWebFileAccessHandle, type SelectedWebFile } from '../../lib/file-selection';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileAnalysisPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedWebFile | null>(null);
  const [status, setStatus] = useState('No file selected. Selecting a file does not start a scan.');

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0) ?? null;
    const selected = file ? createWebFileAccessHandle(file) : null;
    setSelectedFile(selected);
    setStatus(
      selected
        ? 'File selected. No scan has started and no file content has been read.'
        : 'No file selected. Selecting a file does not start a scan.',
    );
  }

  function clearSelection() {
    if (inputRef.current) inputRef.current.value = '';
    setSelectedFile(null);
    setStatus('Selection cleared. No file content was read or uploaded.');
  }

  function checkAvailability() {
    setStatus(
      'Analysis is unavailable because no approved local analysis engine is configured. No scan was performed and no file content was read or uploaded.',
    );
  }

  return (
    <main className="shell analysis-shell">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="ZeroDeck home">
          <span className="wordmark-mark">Z</span>
          <span>zerodeck</span>
        </Link>
        <Link className="topbar-action" href="/">
          Back to workspace
        </Link>
      </header>

      <section className="analysis-card" aria-labelledby="analysis-title">
        <p className="eyebrow">MVP-01 · MANUAL FILE ANALYSIS</p>
        <h1 id="analysis-title">Choose a file to review.</h1>
        <p className="analysis-copy">
          Select one file explicitly. ZeroDeck will not start a scan just because a file was
          selected.
        </p>

        <label className="file-picker" htmlFor="analysis-file">
          <input
            ref={inputRef}
            id="analysis-file"
            name="file"
            type="file"
            onChange={handleFileChange}
          />
          <span className="file-picker-action">Choose file</span>
          <span className="file-picker-hint">One file · selected locally in this browser · access can be lost if the browser invalidates the selection</span>
        </label>

        {selectedFile ? (
          <div className="selected-file" aria-label="Selected file details">
            <div className="selected-file-heading">
              <span className="selected-file-label">SELECTED FILE</span>
              <button className="text-action" type="button" onClick={clearSelection}>
                Remove
              </button>
            </div>
            <p className="selected-file-name">{selectedFile.name}</p>
            <dl className="file-metadata">
              <div>
                <dt>Size</dt>
                <dd>{formatFileSize(selectedFile.sizeBytes)}</dd>
              </div>
              <div>
                <dt>Browser-declared type</dt>
                <dd>{selectedFile.declaredType}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="empty-selection">Your selected file will appear here.</p>
        )}

        <div className="analysis-status" role="status" aria-live="polite">
          <span className="status-indicator" aria-hidden="true" />
          <p>{status}</p>
        </div>

        <div className="analysis-actions">
          <button
            className="analysis-submit"
            type="button"
            disabled={!selectedFile}
            onClick={checkAvailability}
          >
            Check analysis availability
          </button>
          <span className="analysis-unavailable">Scanning is not enabled</span>
        </div>

        <p className="analysis-disclaimer">
          Supported formats and size limits are not yet approved. This page reads only the file
          name, size and browser-declared type. It does not read file content, upload the file or
          produce a security verdict.
        </p>
      </section>
    </main>
  );
}
