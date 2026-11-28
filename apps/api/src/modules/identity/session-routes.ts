import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import { CreateSessionInputSchema } from '@zerodeck/contracts';
import type { SessionService } from './sessions.js';

function bearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith('Bearer ')) return null;
  const token = authorization.slice('Bearer '.length).trim();
  return token || null;
}

function unauthorized(reply: {
  code: (statusCode: number) => { send: (body: unknown) => unknown };
}) {
  return reply.code(401).send({
    error: { code: 'UNAUTHENTICATED', message: 'Authentication is required.' },
  });
}

export function registerSessionRoutes(
  app: FastifyInstance,
  service: SessionService | undefined,
  database: Pick<Pool, 'query'>,
): void {
  app.post('/v1/sessions', async (request, reply) => {
    const parsed = CreateSessionInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'The sign-in details are invalid.' },
      });
    }
    if (!service) {
      return reply.code(503).send({
        error: { code: 'AUTHENTICATION_UNAVAILABLE', message: 'Sign-in is unavailable.' },
      });
    }

    const session = await service.authenticate(parsed.data.email, parsed.data.password);
    if (!session) {
      return reply.code(401).send({
        error: { code: 'INVALID_CREDENTIALS', message: 'Email or password is incorrect.' },
      });
    }

    return reply.code(201).send({
      sessionToken: session.sessionToken,
      sessionId: session.sessionId,
      accountId: session.accountId,
      absoluteExpiresAt: session.absoluteExpiresAt.toISOString(),
    });
  });

  app.get('/v1/session', async (request, reply) => {
    if (!service) {
      return reply.code(503).send({
        error: { code: 'AUTHENTICATION_UNAVAILABLE', message: 'Session access is unavailable.' },
      });
    }
    const token = bearerToken(request.headers.authorization);
    if (!token) return unauthorized(reply);

    const principal = await service.authenticateToken(token);
    if (!principal) return unauthorized(reply);

    const account = await database.query<{
      email: string;
      email_verified_at: Date | null;
    }>(
      `SELECT email, email_verified_at
       FROM accounts
       WHERE account_id = $1 AND status = 'active'`,
      [principal.accountId],
    );
    const row = account.rows[0];
    if (!row) return unauthorized(reply);

    return reply.code(200).send({
      accountId: principal.accountId,
      sessionId: principal.sessionId,
      email: row.email,
      emailVerified: row.email_verified_at !== null,
    });
  });

  app.post('/v1/sessions/current/rotate', async (request, reply) => {
    if (!service) {
      return reply.code(503).send({
        error: { code: 'AUTHENTICATION_UNAVAILABLE', message: 'Session rotation is unavailable.' },
      });
    }
    const token = bearerToken(request.headers.authorization);
    if (!token) return unauthorized(reply);

    const rotated = await service.rotateCurrent(token);
    if (!rotated) return unauthorized(reply);

    return reply.code(200).send({
      sessionToken: rotated.sessionToken,
      sessionId: rotated.sessionId,
      accountId: rotated.accountId,
      absoluteExpiresAt: rotated.absoluteExpiresAt.toISOString(),
    });
  });

  app.delete('/v1/sessions/current', async (request, reply) => {
    if (!service) {
      return reply.code(503).send({
        error: { code: 'AUTHENTICATION_UNAVAILABLE', message: 'Sign-out is unavailable.' },
      });
    }
    const token = bearerToken(request.headers.authorization);
    if (!token) return unauthorized(reply);

    const principal = await service.authenticateToken(token);
    if (!principal) return unauthorized(reply);
    await service.revokeCurrent(token);
    return reply.code(204).send();
  });

  app.post('/v1/sessions/logout-all', async (request, reply) => {
    if (!service) {
      return reply.code(503).send({
        error: { code: 'AUTHENTICATION_UNAVAILABLE', message: 'Sign-out is unavailable.' },
      });
    }
    const token = bearerToken(request.headers.authorization);
    if (!token) return unauthorized(reply);

    const principal = await service.authenticateToken(token);
    if (!principal) return unauthorized(reply);
    await service.revokeAll(principal.accountId);
    return reply.code(204).send();
  });
}
