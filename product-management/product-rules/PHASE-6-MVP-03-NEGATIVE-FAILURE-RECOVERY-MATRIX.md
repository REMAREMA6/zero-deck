# Phase 6 — MVP-03 Website and Link Checking: Negative, Failure and Recovery Matrix

**Contract:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING` v0.1.0-draft  
**Scope:** MVP-03 only. Scenarios describe required product outcomes, not implementation tests already executed.

| ID | Scenario / trigger | Expected outcome | Requirement trace |
|---|---|---|---|
| W01 | Pro entitlement inactive | Block; zero provider calls | WEB-001, 003 |
| W02 | Pro entitlement expired | Block; zero provider calls | WEB-001, 030 |
| W03 | Pro entitlement revoked while request is pending | Block every subsequent dispatch | WEB-030 |
| W04 | Entitlement service unavailable or response indeterminate | Fail closed; zero provider calls | WEB-003, 030 |
| W05 | Entitlement state is stale at dispatch | Re-evaluate or block; zero provider calls until positive | WEB-003, 030 |
| W06 | Owner activation disabled | Block; zero provider calls | WEB-002, 003 |
| W07 | Owner activation disabled after queueing but before dispatch | Cancel/block queued work; zero provider calls | WEB-003, 029 |
| W08 | Owner activation service unavailable | Fail closed; zero provider calls | WEB-003, 029 |
| W09 | Activation disabled during a multi-hop workflow | No subsequent outbound request | WEB-013, 029 |
| W10 | Both gates false | Block; zero provider calls | WEB-001–003 |
| W11 | Pro true, activation false | Block; zero provider calls | WEB-001–003 |
| W12 | Pro false, activation true | Block; zero provider calls | WEB-001–003 |
| W13 | Either gate unknown, stale or unavailable | Block; zero provider calls | WEB-003 |
| W14 | Either gate changes between validation and dispatch | Re-evaluate at dispatch; block if no longer positive | WEB-003, 029, 030 |
| W15 | Retry starts after entitlement expires | Block retry; zero additional provider calls | WEB-025, 030 |
| W16 | Retry starts after activation is disabled | Block retry; zero additional provider calls | WEB-025, 029 |
| W17 | Redirect would trigger another provider/destination request after a gate changes | Do not dispatch next request | WEB-013, 029, 030 |
| W18 | Fallback provider is considered after a gate denial | No fallback call | WEB-003 |
| W19 | Cache refresh/prefetch is attempted while either gate fails | No provider refresh or prefetch call | WEB-003 |
| W20 | Batch path is attempted for a single-user request while gate fails | No batch provider call | WEB-003 |
| W21 | Pro user exceeds configured allowance | Block before dispatch; communicate limit | WEB-004, 027 |
| W22 | Service-level spend ceiling reached | Block before dispatch | WEB-027, 035 |
| W23 | Concurrent duplicate submissions exceed request policy | Enforce account/service limits; no bypass | WEB-027, 028 |
| W24 | Automated repeated submissions attempt to bypass controls | Rate/abuse controls apply server-side | WEB-028 |
| W25 | Empty URL | Reject; zero provider calls | WEB-007 |
| W26 | Malformed URL | Reject; zero provider calls | WEB-007 |
| W27 | Unsupported scheme | Reject according to configured input policy; zero provider calls | WEB-007 |
| W28 | URL contains username/password | Strip or reject; never disclose credentials | WEB-009 |
| W29 | URL contains query token or personal identifier | Treat as sensitive; minimize disclosure and redact logs | WEB-017, 018 |
| W30 | Normalization changes case, host form, port, path, query or fragment | Preserve submitted value separately and do not silently erase material distinctions | WEB-008 |
| W31 | IDN or alternate hostname representation | Apply documented canonicalization and destination policy | WEB-012 |
| W32 | IPv4-mapped IPv6 or alternate numeric IP form targets private range | Block before destination network access | WEB-010, 012 |
| W33 | Host resolves to loopback/private/link-local/reserved address | Block before destination network access | WEB-010 |
| W34 | Host resolves to cloud metadata destination | Block before destination network access | WEB-010 |
| W35 | DNS answer changes to prohibited address before connect | Block prohibited connection | WEB-011 |
| W36 | DNS answer changes between redirect hops | Revalidate and block prohibited destination | WEB-011, 013 |
| W37 | Redirect loop | Stop at policy boundary; bounded failure | WEB-013, 031 |
| W38 | Redirect exceeds configured hop limit | Stop; no further request | WEB-013, 031 |
| W39 | Redirect crosses to disallowed destination | Block before request | WEB-010, 013 |
| W40 | HTTPS redirects to HTTP | Reject downgrade; no insecure request | WEB-014 |
| W41 | Provider TLS certificate is invalid/expired/mismatched | Fail lookup; do not disable verification | WEB-015, 024 |
| W42 | Provider DNS lookup fails | Failed/inconclusive; never no-match | WEB-024 |
| W43 | Provider times out or resets connection | Failed/inconclusive; retry only under policy | WEB-024, 025 |
| W44 | Provider returns rate limit or quota exhaustion | Report unavailable/limited; account for usage correctly | WEB-024, 027, 035 |
| W45 | Provider is unavailable | Failed/inconclusive; do not report clean | WEB-024 |
| W46 | Provider returns malformed or unexpected payload | Reject or mark inconclusive | WEB-020 |
| W47 | Provider response includes unknown threat category | Do not map to safe; preserve unknown/inconclusive semantics | WEB-020, 021 |
| W48 | Provider reports no known match | Say no known match within provider/check scope; no absolute safe claim | WEB-021, 022 |
| W49 | Provider reports a match | Show supported match evidence and provenance; avoid unsupported severity inflation | WEB-019, 021 |
| W50 | Provider returns conflicting signals | Use approved mapping or inconclusive state; do not invent composite score | WEB-020, 021 |
| W51 | Result is older than allowed freshness policy | Mark stale or require fresh lookup only if both gates still pass | WEB-023, 025 |
| W52 | Cached result is considered but provider terms/freshness are unresolved | Do not imply cache reuse is approved | WEB-023, 033 |
| W53 | User cancels before dispatch | Cancel; zero provider calls | WEB-026 |
| W54 | User cancels after provider request was sent | Stop subsequent work where possible; do not claim sent request was recalled | WEB-026 |
| W55 | Response size or decompressed body exceeds configured bound | Stop safely; bounded failure | WEB-031 |
| W56 | Request duration or concurrency limit reached | Stop/defer according to policy; no unbounded resource use | WEB-027, 031 |
| W57 | Routine logs/analytics attempt to record full URL/query or credentials | Redact; no sensitive URL content in routine telemetry | WEB-018 |
| W58 | Persistent history is offered without approved retention policy | Do not claim or enable unapproved durable history | WEB-033, 034 |
| W59 | User requests deletion of stored URL/result data | Apply only documented owner-approved deletion scope; report limitations | WEB-034 |
| W60 | Web and Android return different eligibility or verdict semantics for same conditions | Treat as conformance failure; align shared product semantics and explain capability differences | WEB-037 |
| W61 | Provider accounting misses a retry or redirected dispatch | Record each actual dispatch; reconcile usage | WEB-035 |
| W62 | Operational alert contains full URL/query | Redact before operator visibility | WEB-018, 036 |
| W63 | Submitted URL causes page traversal or linked-resource crawling | Reject/stop; MVP-03 is not a crawler | WEB-006, 038 |
| W64 | User submits an IP address to investigate or scan | Do not expose IP investigation/port scan behaviour; out of scope | WEB-038 |
| W65 | Provider returns a valid result but the user-facing request lifecycle says failed | Reconcile status with actual terminal outcome; no contradictory completion state | WEB-032 |
| W66 | App/platform loses connectivity during a check | Failed/inconclusive or cancelled as actually observed; never no-match | WEB-024, 026, 032 |
| W67 | Owner disables activation while provider is already processing a sent request | Do not claim a sent request was recalled; prevent any later dispatch and apply unresolved in-flight policy | WEB-029, 032 |
| W68 | URL/result is stored for debugging by default | Do not persist without approved retention and minimization policy | WEB-017, 018, 034 |
| W69 | Provider terms prohibit submitted URL retention or reuse | Do not persist/reuse contrary to terms; provider enablement remains blocked pending policy | WEB-016, 023, 034 |
| W70 | Platform cannot provide a supported cancellation mechanism | Expose the actual limitation; do not claim cancellation stopped a sent request | WEB-026, 037 |
| W71 | Provider changes response schema without notice | Reject unrecognized response shape or mark inconclusive; surface operational anomaly | WEB-020, 024, 036 |
| W72 | Owner activation changes during duplicate request race | Each dispatch independently checks current gate; no race may bypass activation | WEB-003, 029 |
| W73 | Pro entitlement changes during duplicate request race | Each dispatch independently checks current entitlement; no race may bypass Pro | WEB-003, 030 |
| W74 | User switches platform while a result is available | Apply approved persistence policy; do not imply cross-device history if unsupported | WEB-033, 037 |
| W75 | Resource budget is not configured for a required bound | Do not enable the affected request path until a defensible bound is established | WEB-031 |

## Scenario coverage notes

- 75 distinct scenarios are listed; each maps to one or more canonical requirement IDs.
- Gate/no-call cases are deliberately decomposed so Pro, activation, stale/unknown state, revocation, queued work, retries, redirects, cache refresh, fallback and concurrency are not collapsed into a single happy-path assertion.
- Scenarios involving direct destination fetch are conditional: the preferred PM recommendation is provider-only lookup. If direct fetch is not selected, the corresponding SSRF/redirect requirements still constrain any future fetch path and must not be mistaken for evidence that ZeroDeck currently fetches URLs.
- This matrix is a planned conformance corpus. It has not been executed against a ZeroDeck runtime or provider integration.
