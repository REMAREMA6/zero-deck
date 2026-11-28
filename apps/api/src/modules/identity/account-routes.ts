import type { FastifyInstance } from 'fastify';
import { RegisterAccountInputSchema } from '@zerodeck/contracts';
import {
  AccountRegistrationUnavailableError,
  PasswordPolicyRejectedError,
  type AccountRegistrationService,
} from './account-registration.js';

export function registerAccountRoutes(
  app: FastifyInstance,
  service: AccountRegistrationService | undefined,
): void {
  app.post('/v1/accounts', async (request, reply) => {
    const parsed = RegisterAccountInputSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The account details are invalid.' },
      });
    }

    if (!service) {
      return reply.code(503).send({
        error: { code: 'REGISTRATION_UNAVAILABLE', message: 'Account registration is unavailable.' },
      });
    }

    try {
      await service.register(parsed.data);
      return reply.code(202).send({ status: 'accepted' });
    } catch (error) {
      if (error instanceof AccountRegistrationUnavailableError) {
        return reply.code(503).send({
          error: {
            code: 'REGISTRATION_POLICY_NOT_CONFIGURED',
            message: 'Account registration is not enabled in this environment.',
          },
        });
      }

      if (error instanceof PasswordPolicyRejectedError) {
        return reply.code(422).send({
          error: { code: 'PASSWORD_POLICY_REJECTED', message: 'The password does not meet the account policy.' },
        });
      }

      throw error;
    }
  });
}
