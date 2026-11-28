import type { FastifyInstance } from 'fastify';
import {
  CompleteAccountRecoveryInputSchema,
  RequestAccountRecoveryInputSchema,
} from '@zerodeck/contracts';
import {
  AccountRecoveryUnavailableError,
  type AccountRecoveryService,
} from './account-recovery.js';
import { PasswordPolicyRejectedError } from './account-registration.js';

export function registerAccountRecoveryRoutes(
  app: FastifyInstance,
  service: AccountRecoveryService | undefined,
): void {
  app.post('/v1/account-recovery-challenges', async (request, reply) => {
    const parsed = RequestAccountRecoveryInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The recovery request is invalid.' },
      });
    }
    if (!service) {
      return reply.code(503).send({
        error: { code: 'RECOVERY_UNAVAILABLE', message: 'Account recovery is unavailable.' },
      });
    }
    try {
      await service.request(parsed.data.email);
      return reply.code(202).send({ status: 'accepted' });
    } catch (error) {
      if (error instanceof AccountRecoveryUnavailableError) {
        return reply.code(503).send({
          error: { code: 'RECOVERY_UNAVAILABLE', message: 'Account recovery is unavailable.' },
        });
      }
      throw error;
    }
  });

  app.post('/v1/account-recovery', async (request, reply) => {
    const parsed = CompleteAccountRecoveryInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The recovery details are invalid.' },
      });
    }
    if (!service) {
      return reply.code(503).send({
        error: { code: 'RECOVERY_UNAVAILABLE', message: 'Account recovery is unavailable.' },
      });
    }
    try {
      const recovered = await service.recover(parsed.data.token, parsed.data.newPassword);
      if (!recovered) {
        return reply.code(400).send({
          error: {
            code: 'INVALID_OR_EXPIRED_CHALLENGE',
            message: 'The recovery request is invalid or expired.',
          },
        });
      }
      return reply.code(200).send({ recovered: true });
    } catch (error) {
      if (error instanceof AccountRecoveryUnavailableError) {
        return reply.code(503).send({
          error: { code: 'RECOVERY_UNAVAILABLE', message: 'Account recovery is unavailable.' },
        });
      }
      if (error instanceof PasswordPolicyRejectedError) {
        return reply.code(422).send({
          error: { code: 'PASSWORD_POLICY_REJECTED', message: 'The new password is not accepted.' },
        });
      }
      throw error;
    }
  });
}
