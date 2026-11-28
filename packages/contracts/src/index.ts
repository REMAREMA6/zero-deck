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
