import Fastify, { type FastifyInstance } from 'fastify';
import type { Pool } from 'pg';

export interface AppDependencies {
  database: Pick<Pool, 'query'>;
  logger?: boolean;
}

export function buildApp(dependencies: AppDependencies): FastifyInstance {
  const app = Fastify({ logger: dependencies.logger ?? false, disableRequestLogging: true });
  app.get('/health/live', async () => ({ status: 'ok' }));
  app.get('/health/ready', async (_request, reply) => {
    try {
      await dependencies.database.query('SELECT 1');
      return reply.code(200).send({ status: 'ready' });
    } catch {
      return reply.code(503).send({ status: 'not_ready', reason: 'database_unavailable' });
    }
  });
  app.setErrorHandler((error, _request, reply) => {
    app.log.error({ err: error }, 'Unhandled request error');
    return reply.code(500).send({ error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' } });
  });
  return app;
}
