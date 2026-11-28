import type { FastifyInstance } from 'fastify';
import {
  RequestEmailVerificationInputSchema,
  VerifyEmailInputSchema,
} from '@zerodeck/contracts';
import {
  EmailVerificationDeliveryError,
  EmailVerificationUnavailableError,
  type EmailVerificationService,
} from './email-verification.js';

export function registerEmailVerificationRoutes(
  app: FastifyInstance,
  service: EmailVerificationService | undefined,
): void {
  app.post('/v1/email-verification-challenges', async (request, reply) => {
    const parsed = RequestEmailVerificationInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The email address is invalid.' },
      });
    }
    if (!service) {
      return reply.code(503).send({
        error: { code: 'VERIFICATION_UNAVAILABLE', message: 'Email verification is unavailable.' },
      });
    }

    try {
      await service.request(parsed.data.email);
      return reply.code(202).send({ status: 'accepted' });
    } catch (error) {
      if (
        error instanceof EmailVerificationUnavailableError ||
        error instanceof EmailVerificationDeliveryError
      ) {
        return reply.code(503).send({
          error: { code: 'VERIFICATION_UNAVAILABLE', message: 'Email verification is unavailable.' },
        });
      }
      throw error;
    }
  });

  app.post('/v1/email-verification', async (request, reply) => {
    const parsed = VerifyEmailInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The verification token is invalid.' },
      });
    }
    if (!service) {
      return reply.code(503).send({
        error: { code: 'VERIFICATION_UNAVAILABLE', message: 'Email verification is unavailable.' },
      });
    }

    const verified = await service.verify(parsed.data.token);
    if (!verified) {
      return reply.code(400).send({
        error: {
          code: 'INVALID_OR_EXPIRED_CHALLENGE',
          message: 'The verification request is invalid or expired.',
        },
      });
    }
    return reply.code(200).send({ verified: true });
  });
}
