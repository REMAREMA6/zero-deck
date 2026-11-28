import Fastify, { type FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import type { AccountRegistrationService } from './modules/identity/account-registration.js';
import { registerAccountRoutes } from './modules/identity/account-routes.js';
import type { EmailVerificationService } from './modules/identity/email-verification.js';
import { registerEmailVerificationRoutes } from './modules/identity/email-verification-routes.js';
import type { SessionService } from './modules/identity/sessions.js';
import { registerSessionRoutes } from './modules/identity/session-routes.js';
import { registerUrlCheckRoutes } from './modules/website/url-check-routes.js';
import { createUrlCheckService, type UrlCheckProvider } from './modules/website/url-checking.js';

export interface AppDependencies {
  database: Pick<Pool, 'query'>;
  accountRegistration?: AccountRegistrationService;
  emailVerification?: EmailVerificationService;
  sessionService?: SessionService;
  urlCheckProvider?: UrlCheckProvider | null;
  logger?: boolean;
}

export function buildApp(dependencies: AppDependencies): FastifyInstance {
  const app = Fastify({ logger: dependencies.logger ?? false });
  app.get('/health/live', async () => ({ status: 'ok' }));
  app.get('/health/ready', async (_request, reply) => {
    try {
      await dependencies.database.query('SELECT 1');
      return reply.code(200).send({ status: 'ready' });
    } catch {
      return reply.code(503).send({ status: 'not_ready', reason: 'database_unavailable' });
    }
  });
  registerAccountRoutes(app, dependencies.accountRegistration);
  registerEmailVerificationRoutes(app, dependencies.emailVerification);
  registerSessionRoutes(app, dependencies.sessionService, dependencies.database);
  registerUrlCheckRoutes(
    app,
    dependencies.sessionService,
    createUrlCheckService(dependencies.database, dependencies.urlCheckProvider ?? null),
  );
  app.setErrorHandler((error, _request, reply) => {
    app.log.error({ err: error }, 'Unhandled request error');
    return reply.code(500).send({
      error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' },
    });
  });
  return app;
}
