import type { FastifyInstance } from 'fastify';
import { URLCheckInputSchema } from '@zerodeck/contracts';
import type { SessionService } from '../identity/sessions.js';
import { UrlInputError } from './url-checking.js';

interface UrlCheckService {
  check(
    accountId: string,
    submittedUrl: string,
    consent: boolean,
  ): Promise<
    | {
        status: 'blocked';
        reason:
          'pro_required' | 'activation_disabled' | 'permission_required' | 'eligibility_unknown';
      }
    | { status: 'unavailable' }
    | { status: 'cancelled' }
    | { status: 'completed'; verdict: string; explanation: string }
  >;
}

function bearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith('Bearer ')) return null;
  const token = authorization.slice('Bearer '.length).trim();
  return token || null;
}

export function registerUrlCheckRoutes(
  app: FastifyInstance,
  sessions: SessionService | undefined,
  service: UrlCheckService | undefined,
): void {
  app.post('/v1/url-checks', async (request, reply) => {
    const token = bearerToken(request.headers.authorization);
    if (!token || !sessions) {
      return reply.code(sessions ? 401 : 503).send({
        error: {
          code: sessions ? 'UNAUTHENTICATED' : 'AUTHENTICATION_UNAVAILABLE',
          message: sessions ? 'Authentication is required.' : 'URL checking is unavailable.',
        },
      });
    }

    const principal = await sessions.authenticateToken(token);
    if (!principal) {
      return reply.code(401).send({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication is required.' },
      });
    }

    const parsed = URLCheckInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(422).send({
        error: { code: 'VALIDATION_ERROR', message: 'A URL and explicit consent are required.' },
      });
    }

    if (!service) {
      return reply.code(503).send({
        error: { code: 'URL_CHECK_UNAVAILABLE', message: 'URL checking is not configured.' },
      });
    }

    try {
      const result = await service.check(principal.accountId, parsed.data.url, parsed.data.consent);
      if (result.status === 'blocked') {
        return reply.code(403).send({
          error: {
            code: 'URL_CHECK_NOT_ELIGIBLE',
            message:
              result.reason === 'pro_required'
                ? 'An active Pro entitlement is required.'
                : result.reason === 'activation_disabled'
                  ? 'Website checking is not currently activated by the owner.'
                  : result.reason === 'permission_required'
                    ? 'This account is not permitted to check websites.'
                    : 'Website-check eligibility is not available for this account.',
          },
        });
      }
      if (result.status === 'cancelled') {
        return reply.code(409).send({
          error: {
            code: 'URL_CHECK_CANCELLED',
            message: 'This check was cancelled because authorization changed.',
          },
        });
      }
      if (result.status === 'unavailable') {
        return reply.code(503).send({
          error: {
            code: 'URL_PROVIDER_UNAVAILABLE',
            message: 'No approved website reputation provider is configured.',
          },
        });
      }
      return reply.code(200).send({
        verdict: result.verdict,
        explanation: result.explanation,
      });
    } catch (error) {
      if (error instanceof UrlInputError) {
        return reply.code(422).send({
          error: { code: 'INVALID_URL', message: error.message },
        });
      }
      throw error;
    }
  });
}
