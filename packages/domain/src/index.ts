export type FileAnalysisOutcome =
  'confirmed_threat' | 'suspicious' | 'no_known_threat_found' | 'could_not_decide';
export type AnalysisLifecycle =
  'queued' | 'analyzing' | 'completed' | 'cancelled' | 'interrupted' | 'failed';

export interface FileAnalysisResult {
  outcome: FileAnalysisOutcome;
  lifecycle: AnalysisLifecycle;
  engineId: string | null;
  engineVersion: string | null;
  completedAt: string | null;
  explanation: string;
}

export interface AnalysisProgress {
  completed: number;
  total: number;
  unit: string;
}

export interface LocalAnalysisObserver {
  onLifecycleChange?: (lifecycle: AnalysisLifecycle) => void;
  onProgress?: (progress: AnalysisProgress) => void;
}

export interface LocalAnalysisEnginePort {
  supportsCancellation?: boolean;
  supportsProgress?: boolean;
  analyze(input: {
    bytes: Uint8Array;
    signal?: AbortSignal;
    onProgress?: (progress: AnalysisProgress) => void;
  }): Promise<unknown>;
}

const fileAnalysisOutcomes: readonly FileAnalysisOutcome[] = [
  'confirmed_threat',
  'suspicious',
  'no_known_threat_found',
  'could_not_decide',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalMetadata(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function isAbortError(value: unknown): boolean {
  return isRecord(value) && value.name === 'AbortError';
}

function createAnalysisLifecycleResult(
  lifecycle: 'cancelled' | 'interrupted',
  explanation: string,
): FileAnalysisResult {
  return {
    outcome: 'could_not_decide',
    lifecycle,
    engineId: null,
    engineVersion: null,
    completedAt: null,
    explanation,
  };
}

export function isPositiveThreatOutcome(outcome: FileAnalysisOutcome): boolean {
  return outcome === 'confirmed_threat' || outcome === 'suspicious';
}

export function createAnalysisFailureResult(): FileAnalysisResult {
  return {
    outcome: 'could_not_decide',
    lifecycle: 'failed',
    engineId: null,
    engineVersion: null,
    completedAt: null,
    explanation: 'The file could not be analysed by the available local engine.',
  };
}

export function mapAnalysisEngineResult(
  value: unknown,
  clock: () => Date = () => new Date(),
): FileAnalysisResult {
  if (
    !isRecord(value) ||
    !fileAnalysisOutcomes.includes(value.outcome as FileAnalysisOutcome) ||
    typeof value.explanation !== 'string' ||
    value.explanation.trim().length === 0
  ) {
    return createAnalysisFailureResult();
  }

  return {
    outcome: value.outcome as FileAnalysisOutcome,
    lifecycle: 'completed',
    engineId: optionalMetadata(value.engineId),
    engineVersion: optionalMetadata(value.engineVersion),
    completedAt: clock().toISOString(),
    explanation:
      value.outcome === 'no_known_threat_found'
        ? 'No known threat was found. This is not a guarantee that the file is safe.'
        : value.explanation,
  };
}

function notifyLifecycle(
  observer: LocalAnalysisObserver | undefined,
  lifecycle: AnalysisLifecycle,
) {
  try {
    observer?.onLifecycleChange?.(lifecycle);
  } catch {
    // Observer failures must never change the analysis outcome.
  }
}

export async function runLocalFileAnalysis(
  engine: LocalAnalysisEnginePort,
  bytes: Uint8Array,
  clock: () => Date = () => new Date(),
  signal?: AbortSignal,
  observer?: LocalAnalysisObserver,
): Promise<FileAnalysisResult> {
  notifyLifecycle(observer, 'queued');
  if (signal?.aborted) {
    notifyLifecycle(observer, 'cancelled');
    return createAnalysisLifecycleResult(
      'cancelled',
      'The analysis was cancelled before a reliable result was available.',
    );
  }

  notifyLifecycle(observer, 'analyzing');
  let lastProgress: AnalysisProgress | null = null;
  const reportProgress = (progress: AnalysisProgress) => {
    if (
      !engine.supportsProgress ||
      !observer?.onProgress ||
      !isRecord(progress) ||
      !Number.isFinite(progress.completed) ||
      !Number.isFinite(progress.total) ||
      progress.total <= 0 ||
      progress.completed < 0 ||
      progress.completed > progress.total ||
      typeof progress.unit !== 'string' ||
      !progress.unit.trim()
    ) {
      return;
    }
    if (
      lastProgress &&
      (progress.unit !== lastProgress.unit ||
        progress.total !== lastProgress.total ||
        progress.completed < lastProgress.completed)
    ) {
      return;
    }
    lastProgress = progress;
    try {
      observer.onProgress(progress);
    } catch {
      // Progress observers are presentation-only and cannot affect the result.
    }
  };

  try {
    const response = await engine.analyze(
      engine.supportsCancellation || engine.supportsProgress
        ? {
            bytes,
            ...(engine.supportsCancellation && signal ? { signal } : {}),
            ...(engine.supportsProgress && observer?.onProgress
              ? { onProgress: reportProgress }
              : {}),
          }
        : { bytes },
    );
    const result = mapAnalysisEngineResult(response, clock);
    notifyLifecycle(observer, result.lifecycle);
    return result;
  } catch (error) {
    if (engine.supportsCancellation && signal?.aborted && isAbortError(error)) {
      notifyLifecycle(observer, 'cancelled');
      return createAnalysisLifecycleResult(
        'cancelled',
        'The analysis was cancelled before a reliable result was available.',
      );
    }
    if (isAbortError(error)) {
      notifyLifecycle(observer, 'interrupted');
      return createAnalysisLifecycleResult(
        'interrupted',
        'The analysis was interrupted before a reliable result was available.',
      );
    }
    notifyLifecycle(observer, 'failed');
    return createAnalysisFailureResult();
  }
}
