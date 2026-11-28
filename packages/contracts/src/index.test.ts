import { describe, expect, it } from 'vitest';
import {
  AccountRegistrationAcceptedSchema,
  ApiErrorSchema,
  HealthResponseSchema,
  RegisterAccountInputSchema,
} from './index.js';

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

  it('validates registration input without embedding an unapproved password threshold', () => {
    expect(
      RegisterAccountInputSchema.safeParse({ email: 'owner@example.com', password: 'test' }).success,
    ).toBe(true);
    expect(
      RegisterAccountInputSchema.safeParse({ email: 'not-an-email', password: 'test' }).success,
    ).toBe(false);
    expect(RegisterAccountInputSchema.safeParse({ email: 'owner@example.com', password: '' }).success)
      .toBe(false);
  });

  it('accepts only the generic registration acknowledgement', () => {
    expect(AccountRegistrationAcceptedSchema.safeParse({ status: 'accepted' }).success).toBe(true);
  });
});
