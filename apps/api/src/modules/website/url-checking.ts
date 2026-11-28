import type { Pool } from 'pg';
import { URLCheckProviderResultSchema } from '@zerodeck/contracts';

export type UrlCheckVerdict = 'known_threat' | 'suspicious' | 'no_match' | 'inconclusive';

export interface UrlCheckProvider {
  lookup(input: { url: string }): Promise<unknown>;
}

export type UrlCheckDecision =
  | { status: 'blocked'; reason: 'pro_required' | 'activation_disabled' | 'eligibility_unknown' }
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
  database: Pick<Pool, 'query'>,
  provider: UrlCheckProvider | null,
): { check(accountId: string, submittedUrl: string, consent: boolean): Promise<UrlCheckDecision> } {
  return {
    async check(accountId, submittedUrl, consent) {
      if (!consent) throw new UrlInputError();
      const parsed = parseSubmittedUrl(submittedUrl);

      const gates = await database.query<{
        pro_active: boolean | null;
        activation_enabled: boolean | null;
      }>(
        'SELECT entitlement.pro_active, control.enabled AS activation_enabled\n' +
          'FROM (SELECT $1::uuid AS account_id) AS requester\n' +
          'LEFT JOIN account_entitlements AS entitlement ON entitlement.account_id = requester.account_id\n' +
          "LEFT JOIN system_feature_controls AS control ON control.feature_key = 'mvp03_url_check'",
        [accountId],
      );

      const state = gates.rows[0];
      if (!state || state.pro_active === null || state.activation_enabled === null) {
        return { status: 'blocked', reason: 'eligibility_unknown' };
      }
      if (state.pro_active !== true) {
        return { status: 'blocked', reason: 'pro_required' };
      }
      if (state.activation_enabled !== true) {
        return { status: 'blocked', reason: 'activation_disabled' };
      }

      // The raw URL is never persisted or logged. Core runtime has no production provider.
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
