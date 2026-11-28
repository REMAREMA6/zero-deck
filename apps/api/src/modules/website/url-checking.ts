
import type { Pool } from 'pg';
import { URLCheckProviderResultSchema } from '@zerodeck/contracts';
import { createAuthorizationService } from '../authorization/authorization.js';

export type UrlCheckVerdict = 'known_threat' | 'suspicious' | 'no_match' | 'inconclusive';

export interface UrlCheckProvider {
  lookup(input: { url: string }): Promise<unknown>;
}

export type UrlCheckDecision =
  | {
      status: 'blocked';
      reason:
        'pro_required' | 'activation_disabled' | 'permission_required' | 'eligibility_unknown';
    }
  | { status: 'unavailable' }
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

export function createUrlCheckService(
  database: Pick<Pool, 'connect'>,
  provider: UrlCheckProvider | null,
): {
  check(accountId: string, submittedUrl: string, consent: boolean): Promise<UrlCheckDecision>;
} {
  const authorization = createAuthorizationService(database);

  return {
    async check(accountId, submittedUrl, consent) {
      if (!consent) throw new UrlInputError();
      const parsed = parseSubmittedUrl(submittedUrl);
      const decision = await authorization.authorize({
        accountId,
        permission: 'website.check',
        requirePro: true,
        featureKey: 'mvp03_url_check',
      });

      if (!decision.allowed) {
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

      // Raw URLs are neither persisted nor logged; the production provider remains unconfigured.
      if (!provider) return { status: 'unavailable' };

      const rawResult = await provider.lookup({ url: parsed.toString() });
      const result = URLCheckProviderResultSchema.safeParse(rawResult);
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
