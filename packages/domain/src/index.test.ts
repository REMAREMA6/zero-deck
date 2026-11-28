import { describe, expect, it, vi } from 'vitest';
import {
  createAnalysisFailureResult,
  isPositiveThreatOutcome,
  mapAnalysisEngineResult,
  runLocalFileAnalysis,
  type FileAnalysisOutcome,
} from './index.js';

const completedAt = '2026-11-28T12:00:00.000Z';
const clock = () => new Date(completedAt);
const noKnownThreatExplanation =
  'No known threat was found. This is not a guarantee that the file is safe.';

function expectedEngineExplanation(outcome: FileAnalysisOutcome): string {
  return outcome === 'no_known_threat_found'
    ? noKnownThreatExplanation
    : 'The test engine returned this outcome.';
}

describe('file analysis outcome semantics', () => {
  it('treats confirmed threat and suspicious as threat-positive outcomes', () => {
    expect(isPositiveThreatOutcome('confirmed_threat')).toBe(true);
    expect(isPositiveThreatOutcome('suspicious')).toBe(true);
  });

  it('does not treat no-known-threat or inconclusive as threat-positive', () => {
    expect(isPositiveThreatOutcome('no_known_threat_found')).toBe(false);
    expect(isPositiveThreatOutcome('could_not_decide')).toBe(false);
  });
});

describe('local analysis engine boundary', () => {
  it.each<FileAnalysisOutcome>([
    'confirmed_threat',
    'suspicious',
    'no_known_threat_found',
    'could_not_decide',
  ])('maps the %s outcome without changing its meaning', async (outcome) => {
    const bytes = new Uint8Array([1, 2, 3]);
    const engine = {
      analyze: vi.fn(async () => ({
        outcome,
        engineId: 'test-engine',
        engineVersion: 'test-version',
        explanation: expectedEngineExplanation(outcome),
      })),
    };

    const result = await runLocalFileAnalysis(engine, bytes, clock);

    expect(engine.analyze).toHaveBeenCalledWith({ bytes });
    expect(result).toMatchObject({
      outcome,
      lifecycle: 'completed',
      engineId: 'test-engine',
      engineVersion: 'test-version',
      completedAt,
    });
    expect(result.explanation).toBe(expectedEngineExplanation(outcome));
  });

  it('never presents no-known-threat as proof that the file is safe', () => {
    const result = mapAnalysisEngineResult(
      {
        outcome: 'no_known_threat_found',
        explanation: 'The file is safe.',
      },
      clock,
    );

    expect(result.outcome).toBe('no_known_threat_found');
    expect(result.explanation).toBe(noKnownThreatExplanation);
  });

  it('does not invent engine identity when metadata is absent', () => {
    const result = mapAnalysisEngineResult(
      { outcome: 'no_known_threat_found', explanation: 'No known threat was found.' },
      clock,
    );

    expect(result).toMatchObject({
      outcome: 'no_known_threat_found',
      lifecycle: 'completed',
      engineId: null,
      engineVersion: null,
      completedAt,
    });
    expect(result.explanation).toBe(noKnownThreatExplanation);
  });

  it('does not start an analysis when cancellation was requested before start', async () => {
    const controller = new AbortController();
    controller.abort();
    const engine = { supportsCancellation: true, analyze: vi.fn(async () => null) };

    const bytes = new Uint8Array([1]);
    const lifecycle: string[] = [];
    const result = await runLocalFileAnalysis(engine, bytes, clock, controller.signal, {
      onLifecycleChange: (state) => lifecycle.push(state),
    });

    expect(engine.analyze).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      outcome: 'could_not_decide',
      lifecycle: 'cancelled',
      completedAt: null,
    });
    expect(lifecycle).toEqual(['queued', 'cancelled']);
  });

  it('reports cancellation only when the engine supports and receives an abort signal', async () => {
    const controller = new AbortController();
    const engine = {
      supportsCancellation: true,
      analyze: vi.fn(
        ({ signal }: { bytes: Uint8Array; signal?: AbortSignal }) =>
          new Promise<unknown>((_resolve, reject) => {
            signal?.addEventListener(
              'abort',
              () => {
                const error = new Error('engine cancelled');
                error.name = 'AbortError';
                reject(error);
              },
              { once: true },
            );
          }),
      ),
    };

    const lifecycle: string[] = [];
    const pending = runLocalFileAnalysis(engine, new Uint8Array([1]), clock, controller.signal, {
      onLifecycleChange: (state) => lifecycle.push(state),
    });
    controller.abort();
    const result = await pending;

    expect(engine.analyze).toHaveBeenCalledWith({
      bytes: new Uint8Array([1]),
      signal: controller.signal,
    });
    expect(result).toMatchObject({
      outcome: 'could_not_decide',
      lifecycle: 'cancelled',
      completedAt: null,
    });
    expect(lifecycle).toEqual(['queued', 'analyzing', 'cancelled']);
  });

  it('does not relabel a completed engine result as cancelled by a late abort request', async () => {
    const controller = new AbortController();
    const engine = {
      supportsCancellation: true,
      analyze: vi.fn(async () => ({
        outcome: 'suspicious',
        explanation: 'The engine completed before cancellation could take effect.',
      })),
    };

    const pending = runLocalFileAnalysis(engine, new Uint8Array([1]), clock, controller.signal);
    controller.abort();
    const result = await pending;

    expect(result.lifecycle).toBe('completed');
    expect(result.outcome).toBe('suspicious');
  });

  it('does not report cancellation for an unrelated engine failure after an abort request', async () => {
    const controller = new AbortController();
    const engine = {
      supportsCancellation: true,
      analyze: vi.fn(async () => {
        controller.abort();
        throw new Error('unrelated engine failure');
      }),
    };

    const result = await runLocalFileAnalysis(
      engine,
      new Uint8Array([1]),
      clock,
      controller.signal,
    );

    expect(result.lifecycle).toBe('failed');
    expect(result.outcome).toBe('could_not_decide');
  });

  it('reports an engine AbortError without a user cancellation as interrupted', async () => {
    const engine = {
      analyze: vi.fn(async () => {
        const error = new Error('engine process interrupted');
        error.name = 'AbortError';
        throw error;
      }),
    };

    const result = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock);

    expect(result).toMatchObject({
      outcome: 'could_not_decide',
      lifecycle: 'interrupted',
      completedAt: null,
    });
  });

  it('treats retry as a new invocation and never reuses a failed result', async () => {
    let attempts = 0;
    const engine = {
      analyze: vi.fn(async () => {
        attempts += 1;
        if (attempts === 1) throw new Error('temporary engine failure');
        return {
          outcome: 'suspicious',
          explanation: 'The second attempt returned suspicious evidence.',
        };
      }),
    };

    const first = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock);
    const second = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock);

    expect(engine.analyze).toHaveBeenCalledTimes(2);
    expect(first.lifecycle).toBe('failed');
    expect(first.outcome).toBe('could_not_decide');
    expect(second.lifecycle).toBe('completed');
    expect(second.outcome).toBe('suspicious');
  });

  it('does not call the network while running the local analysis orchestrator', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    try {
      const engine = {
        analyze: vi.fn(async () => ({
          outcome: 'suspicious',
          explanation: 'The local test engine returned suspicious evidence.',
        })),
      };

      const result = await runLocalFileAnalysis(engine, new Uint8Array([1, 2, 3]), clock);

      expect(result.outcome).toBe('suspicious');
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('reports lifecycle changes and only forwards meaningful engine-supported progress', async () => {
    const lifecycle: string[] = [];
    const progress: Array<{ completed: number; total: number; unit: string }> = [];
    const engine = {
      supportsProgress: true,
      analyze: vi.fn(
        async ({
          onProgress,
        }: {
          bytes: Uint8Array;
          onProgress?: (value: { completed: number; total: number; unit: string }) => void;
        }) => {
          onProgress?.({ completed: 1, total: 4, unit: 'files' });
          onProgress?.({ completed: 0, total: 4, unit: 'files' });
          onProgress?.({ completed: 2, total: 4, unit: 'files' });
          onProgress?.({ completed: 5, total: 4, unit: 'files' });
          onProgress?.({ completed: 3, total: 4, unit: 'bytes' });
          return {
            outcome: 'suspicious',
            explanation: 'The local engine returned suspicious evidence.',
          };
        },
      ),
    };

    const result = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock, undefined, {
      onLifecycleChange: (state) => lifecycle.push(state),
      onProgress: (value) => progress.push(value),
    });

    expect(result.lifecycle).toBe('completed');
    expect(lifecycle).toEqual(['queued', 'analyzing', 'completed']);
    expect(progress).toEqual([
      { completed: 1, total: 4, unit: 'files' },
      { completed: 2, total: 4, unit: 'files' },
    ]);
  });

  it('does not expose progress when the engine does not declare progress support', async () => {
    const onProgress = vi.fn();
    const engine = {
      analyze: vi.fn(async () => ({
        outcome: 'suspicious',
        explanation: 'The engine returned suspicious evidence.',
      })),
    };

    await runLocalFileAnalysis(engine, new Uint8Array([1]), clock, undefined, { onProgress });

    expect(engine.analyze).toHaveBeenCalledWith({ bytes: new Uint8Array([1]) });
    expect(onProgress).not.toHaveBeenCalled();
  });

  it('keeps observer failures separate from analysis results', async () => {
    const engine = {
      analyze: vi.fn(async () => ({
        outcome: 'no_known_threat_found',
        explanation: 'No known threat was found.',
      })),
    };
    const result = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock, undefined, {
      onLifecycleChange: () => {
        throw new Error('UI observer failed');
      },
    });

    expect(result.lifecycle).toBe('completed');
    expect(result.outcome).toBe('no_known_threat_found');
  });

  it('maps malformed engine output to a failed inconclusive result', () => {
    expect(mapAnalysisEngineResult({ outcome: 'safe', explanation: 'Safe.' }, clock)).toEqual(
      createAnalysisFailureResult(),
    );
    expect(mapAnalysisEngineResult({ outcome: 'suspicious', explanation: '  ' }, clock)).toEqual(
      createAnalysisFailureResult(),
    );
  });

  it('maps engine exceptions to a failed inconclusive result without exposing error details', async () => {
    const engine = {
      analyze: vi.fn(async () => {
        throw new Error('private parser detail');
      }),
    };

    const result = await runLocalFileAnalysis(engine, new Uint8Array([1]), clock);

    expect(result).toEqual(createAnalysisFailureResult());
    expect(result.explanation).not.toContain('private parser detail');
  });
});
