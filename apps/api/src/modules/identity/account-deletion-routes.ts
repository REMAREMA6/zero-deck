import type { FastifyInstance } from 'fastify';
import {
  ACCOUNT_DELETION_CONFIRMATION,
  AccountDeletionUnavailableError,
  type AccountDeletionService,
} from './account-deletion.js';
import type { SessionService } from './sessions.js';

function bearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith('Bearer ')) return null;
  const token = authorization.slice('Bearer '.length).trim();
  return token || null;
}

export function registerAccountDeletionRoutes(
  app: FastifyInstance,
  sessions: SessionService | undefined,
  deletion: AccountDeletionService | undefined,
): void {
  app.post('/v1/account/deletion', async (request, reply) => {
    const token = bearerToken(request.headers.authorization);
    if (!token || !sessions) {
      return reply.code(401).send({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication is required.' },
      });
    }

    const principal = await sessions.authenticateToken(token);
    if (!principal) {
      return reply.code(401).send({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication is required.' },
      });
    }

    const body = request.body as {
      currentPassword?: unknown;
      confirmation?: unknown;
    } | null;
    if (
      !body ||
      typeof body.currentPassword !== 'string' ||
      !body.currentPassword ||
      body.confirmation !== ACCOUNT_DELETION_CONFIRMATION
    ) {
      return reply.code(422).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Enter your current password and the exact account-deletion confirmation.',
        },
      });
    }

    if (!deletion) {
      return reply.code(503).send({
        error: {
          code: 'ACCOUNT_DELETION_UNAVAILABLE',
          message: 'Account deletion is unavailable until its retention policy is approved.',
        },
      });
    }

    try {
      const result = await deletion.requestDeletion({
        accountId: principal.accountId,
        currentPassword: body.currentPassword,
        confirmation: body.confirmation,
      });
      if (!result) {
        return reply.code(401).send({
          error: {
            code: 'FRESH_AUTHENTICATION_REQUIRED',
            message: 'The current password is incorrect.',
          },
        });
      }
      return reply.code(202).send({
        status: 'deletion_scheduled',
        accessDisabled: true,
        sessionsRevoked: true,
        deletionDueAt: result.deletionDueAt.toISOString(),
        personalDataDeleted: false,
      });
    } catch (error) {
      if (error instanceof AccountDeletionUnavailableError) {
        return reply.code(503).send({
          error: {
            code: 'ACCOUNT_DELETION_UNAVAILABLE',
            message: 'Account deletion is unavailable until its retention policy is approved.',
          },
        });
      }
      throw error;
    }
  });
}
