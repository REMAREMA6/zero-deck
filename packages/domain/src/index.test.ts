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
        explanation:
        outcome === 'no_known_threat_found'
          ? 'No known threat was found. This is not a guarantee that the file is safe.'
          : 'The test engine returned this outcome.',
      })),
    };

    const result = await runLocalFileAnalysis(engine, bytes, clock);

    expect(engine.analyze).toHaveBeenCalledWith({ bytes });
    expect(result).toEqual({
      outcome,
      lifecycle: 'completed',
      engineId: 'test-engine',
      engineVersion: 'test-version',
      completedAt,
      explanation:
        outcome === 'no_known_threat_found'
          ? 'No known threat was found. This is not a guarantee that the file is safe.'
          : 'The test engine returned this outcome.',
    });
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
    expect(result.explanation).toBe(
      'No known threat was found. This is not a guarantee that the file is safe.',
    );
  });

  it('does not invent engine identity when metadata is absent', () => {
    expect(
      mapAnalysisEngineResult(
        { outcome: 'no_known_threat_found', explanation: 'No known threat was found.' },
        clock,
      ),
    ).toEqual({
      outcome: 'no_known_threat_found',
      lifecycle: 'completed',
      engineId: null,
      engineVersion: null,
      completedAt,
      explanation: 'No known threat was found. This is not a guarantee that the file is safe.',
    });
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
