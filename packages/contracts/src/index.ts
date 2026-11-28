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

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type RegisterAccountInput = z.infer<typeof RegisterAccountInputSchema>;
export type AccountRegistrationAccepted = z.infer<typeof AccountRegistrationAcceptedSchema>;
