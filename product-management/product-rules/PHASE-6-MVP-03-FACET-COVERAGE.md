# Phase 6 — MVP-03 Website and Link Checking: 15-Facet Coverage Assessment

**Contract:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING` v0.1.0-draft  
**Scope:** MVP-03 only. Facet IDs are the official Software Rules identifiers.

| Official facet | Classification | Requirement coverage | Assessment and consequence |
|---|---|---|---|
| `interface` | Applicable | WEB-005, 006, 021, 022, 032, 037 | User submission, bounded target description, result wording, lifecycle and platform explanation are observable product behaviour. |
| `behavior` | Applicable | WEB-005, 006, 008, 021, 022, 025, 026, 032, 037 | Request lifecycle, result interpretation, retry/cancellation and platform semantics are central. |
| `business-rules` | Applicable | WEB-001, 004, 027, 030 | Pro eligibility, bounded usage, quota and entitlement revocation define product eligibility. |
| `data` | Applicable | WEB-008, 016–019, 021, 023, 033–035 | Submitted/normalized URL identity, provider payload, provenance, freshness, stored results and accounting data require definition. |
| `persistence` | Conditional / policy unresolved | WEB-023, 033, 034 | Durable history/cache is not approved. If any URL/result is persisted, retention, deletion, freshness and cross-platform access require an owner-approved policy before enablement. |
| `api` | Conditional / integration-dependent | WEB-007, 009–016, 019, 020, 024, 035 | A provider API is expected by the current capability description but provider and API contract are not selected. If provider-backed lookup is enabled, request/response, authentication, errors and limits must be captured. |
| `messaging` | Deferred / not established | WEB-032, 036 | No email, push or user-to-user messaging capability is in MVP-03. Operational alerts may be internal signals, not a product messaging feature. Reassess only if notifications are approved. |
| `identity-authentication` | Applicable dependency | WEB-001, 003, 004, 028, 030 | The existing authentication contract supplies account identity/session context. This contract does not redefine credentials, recovery or session lifecycle. |
| `authorization-permissions` | Applicable | WEB-001–004, 028–030 | Both eligibility gates and usage permissions must be enforced for every dispatch; client-side state is insufficient evidence of authorization. |
| `security-controls` | Applicable | WEB-003, 007, 009–018, 025, 028–031, 038 | No-call invariant, URL validation, credential stripping, SSRF/private-network protection, DNS rebinding, redirects, TLS, redaction and resource/abuse controls are essential. |
| `background-processing` | Conditional / implementation-dependent | WEB-003, 013, 025, 029–032 | Scheduled/background checking is excluded. If the implementation queues or asynchronously retries a user-initiated request, every dispatch boundary must re-evaluate both gates and safety controls. |
| `errors-recovery` | Applicable | WEB-020, 024–026, 029–032, 036 | Provider/network failure, malformed responses, cancellation, retries, gate changes and accurate lifecycle states are required. |
| `integrations` | Applicable | WEB-003, 010–016, 019, 020, 024, 035, 036, 038 | Provider selection, disclosure, provenance, failure, accounting and replaceability are central; provider selection remains open. |
| `configuration` | Applicable | WEB-002, 027, 029, 031, 035, 036 | Owner activation, quotas, budgets and operational bounds require controlled configuration. Exact values and propagation are open. |
| `performance-resource-behavior` | Applicable | WEB-024–027, 031, 035 | Time, response size, redirect, concurrency, request rate and cost bounds must be defined before release; numeric thresholds are unresolved. |

## Coverage conclusion

All 15 official facets are assessed. No facet is declared globally irrelevant to ZeroDeck. Messaging is deferred because MVP-03 does not include user messaging; persistence, API and background processing are conditional on later policy or implementation choices. Conditional/deferred does not mean the facet may be ignored if the relevant behaviour is introduced.

The most important cross-facet invariant is WEB-003: no provider/API call unless active Pro entitlement and owner-controlled activation are both positively established. WEB-025, WEB-029 and WEB-030 extend that invariant to retries, pending work, activation disablement and entitlement revocation. This is a product requirement; the exact architecture that enforces it remains undecided.

This assessment is a PM coverage analysis, not evidence that an implementation or all 15 facets have been runtime-tested.
