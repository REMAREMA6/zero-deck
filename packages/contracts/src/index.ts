import { z } from 'zod';

export const HealthResponseSchema = z.object({ status: z.enum(['ok', 'ready', 'not_ready']) });
export const ApiErrorSchema = z.object({ error: z.object({ code: z.string().min(1), message: z.string().min(1) }) });
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
