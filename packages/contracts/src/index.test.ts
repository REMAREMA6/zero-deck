import { describe, expect, it } from 'vitest';
import { ApiErrorSchema, HealthResponseSchema } from './index.js';

describe('shared API contracts', () => {
  it('accepts known health states', () => {
    expect(HealthResponseSchema.safeParse({ status: 'ready' }).success).toBe(true);
    expect(HealthResponseSchema.safeParse({ status: 'unknown' }).success).toBe(false);
  });
  it('requires a machine-readable API error and message', () => {
    expect(
      ApiErrorSchema.safeParse({ error: { code: 'DENIED', message: 'Not allowed' } }).success,
    ).toBe(true);
    expect(ApiErrorSchema.safeParse({ error: { message: 'Not allowed' } }).success).toBe(false);
  });
});
