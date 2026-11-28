import type { Pool } from 'pg';
import { URLCheckProviderResultSchema } from '@zerodeck/contracts';
import {
  createAuthorizationService,
  type AuthorizationDecision,
  type AuthorizationRequest,
} from '../authorization/authorization.js';
import { createProtectedWorkService } from '../authorization/protected-work.js';

export type UrlCheckVerdict = 'known_threat' | 'suspicious' | 'no_match' | 'inconclusive';

export interface UrlCheckProvider {
  lookup(input: { url: string; signal: AbortSignal }): Promise<unknown>;
}

export type UrlCheckDecision =
  | {
      status: 'blocked';
      reason:
        | 'pro_required'
        | 'activation_disabled'
        | 'permission_required'
        | 'eligibility_unknown';
    }
  | { status: 'unavailable' }
  | { status: 'cancelled' }
  | { status: 'completed'; verdict: UrlCheckVerdict; explanation: string };

export class UrlInputError extends Error {
  constructor() {
    super('Enter a valid HTTP or HTTPS URL without embedded credentials.');
    this.name = 'UrlInputError';
  }
}

function parseSubmittedUrl(value: string): URL {
  if (!value || value.trim() !== value) throw new UrlInputError();

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new UrlInputError();
  }

  if (
    (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') ||
    !parsed.hostname ||
    parsed.username.length > 0 ||
    parsed.password.length > 0
  ) {
    throw new UrlInputError();
  }

  return parsed;
}

function blockedDecision(decision: AuthorizationDecision): UrlCheckDecision {
  if (decision.allowed) return { status: 'unavailable' };
  if (decision.reason === 'pro_required') {
    return { status: 'blocked', reason: 'pro_required' };
  }
  if (decision.reason === 'activation_disabled') {
    return { status: 'blocked', reason: 'activation_disabled' };
  }
  if (decision.reason === 'unavailable') return { status: 'unavailable' };
  if (decision.reason === 'permission_denied' || decision.reason === 'permission_stale') {
    return { status: 'blocked', reason: 'permission_required' };
  }
  return { status: 'blocked', reason: 'eligibility_unknown' };
}

const URL_CHECK_AUTHORIZATION: AuthorizationRequest = {
  accountId: '',
  permission: 'website.check',
  requirePro: true,
  featureKey: 'mvp03_url_check',
};

export function createUrlCheckService(
  database: Pick<Pool, 'connect'>,
  provider: UrlCheckProvider | null,
): {
  check(accountId: string, submittedUrl: string, consent: boolean): Promise<UrlCheckDecision>;
} {
  const authorization = createAuthorizationService(database);
  const protectedWork = createProtectedWorkService(database);

  return {
    async check(accountId, submittedUrl, consent) {
      if (!consent) throw new UrlInputError();
      const parsed = parseSubmittedUrl(submittedUrl);
      const request = { ...URL_CHECK_AUTHORIZATION, accountId };

      // A missing provider never creates a work item or attempts dispatch.
      if (!provider) {
        const decision = await authorization.authorize(request);
        return decision.allowed ? { status: 'unavailable' } : blockedDecision(decision);
      }

      const work = await protectedWork.execute(request, (signal) =>
        provider.lookup({ url: parsed.toString(), signal }),
      );
      if (work.status === 'blocked') return blockedDecision(work.decision);
      if (work.status === 'cancelled') return { status: 'cancelled' };
      if (work.status === 'unavailable') return { status: 'unavailable' };
      if (work.status === 'failed') {
        return {
          status: 'completed',
          verdict: 'inconclusive',
          explanation: 'The reputation service could not complete this check.',
        };
      }

      const result = URLCheckProviderResultSchema.safeParse(work.value);
      if (!result.success) {
        return {
          status: 'completed',
          verdict: 'inconclusive',
          explanation: 'The reputation service returned an unsupported response.',
        };
      }

      return {
        status: 'completed',
        verdict: result.data.verdict,
        explanation: result.data.explanation,
      };
    },
  };
}
