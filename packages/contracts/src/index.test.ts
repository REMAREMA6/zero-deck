import { describe, expect, it } from 'vitest';
import {
  AccountRegistrationAcceptedSchema,
  ApiErrorSchema,
  HealthResponseSchema,
  RegisterAccountInputSchema,
  RequestEmailVerificationInputSchema,
  VerifyEmailInputSchema,
  CreateSessionInputSchema,
  SessionCreatedSchema,
  SessionProfileSchema,
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
      RegisterAccountInputSchema.safeParse({ email: 'owner@example.com', password: 'test' })
        .success,
    ).toBe(true);
    expect(
      RegisterAccountInputSchema.safeParse({ email: 'not-an-email', password: 'test' }).success,
    ).toBe(false);
    expect(
      RegisterAccountInputSchema.safeParse({ email: 'owner@example.com', password: '' }).success,
    ).toBe(false);
  });

  it('validates email verification inputs without exposing challenge details', () => {
    expect(
      RequestEmailVerificationInputSchema.safeParse({ email: 'owner@example.com' }).success,
    ).toBe(true);
    expect(RequestEmailVerificationInputSchema.safeParse({ email: 'invalid' }).success).toBe(false);
    expect(VerifyEmailInputSchema.safeParse({ token: 'opaque-token' }).success).toBe(true);
    expect(VerifyEmailInputSchema.safeParse({ token: '' }).success).toBe(false);
  });

  it('validates session credentials and public session response contracts', () => {
    expect(
      CreateSessionInputSchema.safeParse({ email: 'owner@example.com', password: 'test' }).success,
    ).toBe(true);
    expect(
      SessionCreatedSchema.safeParse({
        sessionToken: 'opaque-token',
        sessionId: '123e4567-e89b-42d3-a456-426614174000',
        accountId: '123e4567-e89b-42d3-a456-426614174001',
        absoluteExpiresAt: '2026-12-28T12:00:00.000Z',
      }).success,
    ).toBe(true);
    expect(
      SessionProfileSchema.safeParse({
        accountId: '123e4567-e89b-42d3-a456-426614174001',
        sessionId: '123e4567-e89b-42d3-a456-426614174000',
        email: 'owner@example.com',
        emailVerified: false,
      }).success,
    ).toBe(true);
  });

  it('accepts only the generic registration acknowledgement', () => {
    expect(AccountRegistrationAcceptedSchema.safeParse({ status: 'accepted' }).success).toBe(true);
  });
});
