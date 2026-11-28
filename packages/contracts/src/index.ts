import { z } from 'zod';

export const HealthResponseSchema = z.object({ status: z.enum(['ok', 'ready', 'not_ready']) });
export const ApiErrorSchema = z.object({
  error: z.object({ code: z.string().min(1), message: z.string().min(1) }),
});
export const RegisterAccountInputSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
export const AccountRegistrationAcceptedSchema = z.object({ status: z.literal('accepted') });
export const RequestEmailVerificationInputSchema = z.object({ email: z.string().trim().email() });
export const VerifyEmailInputSchema = z.object({ token: z.string().min(1) });
export const EmailVerificationRequestAcceptedSchema = z.object({ status: z.literal('accepted') });
export const EmailVerificationResultSchema = z.object({ verified: z.boolean() });
export const CreateSessionInputSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
export const SessionCreatedSchema = z.object({
  sessionToken: z.string().min(1),
  sessionId: z.string().uuid(),
  accountId: z.string().uuid(),
  absoluteExpiresAt: z.string().datetime(),
});
export const SessionProfileSchema = z.object({
  accountId: z.string().uuid(),
  sessionId: z.string().uuid(),
  email: z.string().email(),
  emailVerified: z.boolean(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type RegisterAccountInput = z.infer<typeof RegisterAccountInputSchema>;
export type AccountRegistrationAccepted = z.infer<typeof AccountRegistrationAcceptedSchema>;
export type RequestEmailVerificationInput = z.infer<typeof RequestEmailVerificationInputSchema>;
export type VerifyEmailInput = z.infer<typeof VerifyEmailInputSchema>;
export type EmailVerificationRequestAccepted = z.infer<
  typeof EmailVerificationRequestAcceptedSchema
>;
export type EmailVerificationResult = z.infer<typeof EmailVerificationResultSchema>;
export type CreateSessionInput = z.infer<typeof CreateSessionInputSchema>;
export type SessionCreated = z.infer<typeof SessionCreatedSchema>;
export type SessionProfile = z.infer<typeof SessionProfileSchema>;
