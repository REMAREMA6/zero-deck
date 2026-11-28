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

export interface LocalAnalysisEnginePort {
  supportsCancellation?: boolean;
  analyze(input: { bytes: Uint8Array; signal?: AbortSignal }): Promise<unknown>;
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

export async function runLocalFileAnalysis(
  engine: LocalAnalysisEnginePort,
  bytes: Uint8Array,
  clock: () => Date = () => new Date(),
  signal?: AbortSignal,
): Promise<FileAnalysisResult> {
  if (signal?.aborted) {
    return createAnalysisLifecycleResult(
      'cancelled',
      'The analysis was cancelled before a reliable result was available.',
    );
  }

  try {
    const response = await engine.analyze(
      engine.supportsCancellation && signal ? { bytes, signal } : { bytes },
    );
    if (engine.supportsCancellation && signal?.aborted) {
      return createAnalysisLifecycleResult(
        'cancelled',
        'The analysis was cancelled before a reliable result was available.',
      );
    }
    return mapAnalysisEngineResult(response, clock);
  } catch (error) {
    if (engine.supportsCancellation && signal?.aborted) {
      return createAnalysisLifecycleResult(
        'cancelled',
        'The analysis was cancelled before a reliable result was available.',
      );
    }
    if (isAbortError(error)) {
      return createAnalysisLifecycleResult(
        'interrupted',
        'The analysis was interrupted before a reliable result was available.',
      );
    }
    return createAnalysisFailureResult();
  }
}
