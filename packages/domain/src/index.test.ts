import { describe, expect, it } from 'vitest';
import { isPositiveThreatOutcome } from './index.js';

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
