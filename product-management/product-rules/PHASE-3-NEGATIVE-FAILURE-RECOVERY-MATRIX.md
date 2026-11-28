# Phase 3 — Negative, failure and recovery scenario matrix

**Project:** ZeroDeck  
**Date:** 2026-11-28  
**Contract:** `ZD-CONTRACT-AUTH` v`0.1.0-draft`  
**Status:** Contract-level assessment complete; runtime tests not performed

## Interpretation

- **Covered:** the PM-proposed contract contains a direct, observable acceptance criterion for the scenario.
- **Partial:** a related requirement exists, but a stated edge or failure condition is not explicit.
- **Missing:** no current acceptance criterion covers the scenario.
- **Deferred / unresolved:** the scenario depends on a later contract, architecture or owner decision.

These labels assess requirement coverage only. They do not mean the current ZeroDeck implementation passed a test. The upstream Software Rules cases are bounded examples, not ZeroDeck runtime evidence.

## Scenario traceability

| # | Scenario | Relevant requirement / criterion | Coverage | Gap or required follow-up |
|---:|---|---|---|---|
| 1 | Invalid or incorrect authenticator | `ZD-AUTH-004` (trusted verification; fabricated client state denied); `ZD-AUTH-007` (repeated failures) | **Partial** | The criteria do not explicitly state that a real but incorrect authenticator produces no session. Candidate `ZD-AUTH-022` proposes two direct negative criteria. |
| 2 | Fabricated client-side authenticated state, role, Pro flag or activation flag | `ZD-AUTH-004-AC-01`; `ZD-AUTH-016-AC-01` | **Covered** | Explicitly denies client-only proof and uses trusted server-side state. Runtime verification remains outstanding. |
| 3 | Existing vs unknown identifier enumeration | `ZD-AUTH-008-AC-01`; `ZD-AUTH-020-AC-03` | **Covered** | Equivalent unauthenticated responses must not reveal account existence. Timing/response-behaviour equivalence is stated in the contract. |
| 4 | Repeated/distributed authentication and recovery abuse | `ZD-AUTH-007-AC-01`–`AC-03` | **Partial** | Server-side account/context controls and distributed attempt coverage are required, but numeric thresholds, delay policy and recovery thresholds are unresolved. |
| 5 | Random/fabricated session credential and superseded credential replay | `ZD-AUTH-009-AC-02`; `ZD-AUTH-010-AC-02`; `ZD-AUTH-012-AC-01` | **Covered** | Contract-level denial is explicit. Signature/claim tampering cases are not separately stated in ZeroDeck criteria; upstream JOSE evidence is not a ZeroDeck test. |
| 6 | Session inactivity and absolute expiry | `ZD-AUTH-011-AC-01`, `ZD-AUTH-011-AC-02` | **Covered** | Both limits must be enforced. Durations and renewal policy remain open under `ZD-Q-AUTH-005`. |
| 7 | Session revocation, account-wide revocation and logout replay | `ZD-AUTH-012-AC-01`, `AC-02`; `ZD-AUTH-013-AC-01`, `AC-02`; `ZD-AUTH-021-AC-01`, `AC-02` | **Covered** | Current and previously issued credentials must stop authorizing after required revocation. Whether users receive session-management UI remains open under `ZD-Q-AUTH-006`. |
| 8 | Same account authenticated on web and Android | `ZD-AUTH-001-AC-01`, `ZD-AUTH-017-AC-01`, `AC-02` | **Covered** | Shared principal and account-level authorization are required; platform-specific credentials are allowed. |
| 9 | Credential replacement while preserving principal and revoking affected sessions | `ZD-AUTH-003-AC-01`; `ZD-AUTH-021-AC-01`, `AC-02` | **Covered** | The principal must remain stable and affected sessions must cease authorizing. Interruption/partial-write behaviour is not explicit (see scenario 12). |
| 10 | Recovery challenge invalid, altered, expired, already used or replayed | `ZD-AUTH-020-AC-01`–`AC-03` | **Covered** | Invalid/replayed challenge must not change authenticator or account security state. Recovery channel and assurance method remain unresolved. |
| 11 | Authentication/session/account-state dependency unavailable or returns invalid state | `ZD-AUTH-018-AC-01`, `AC-02` | **Partial** | Generic fail-closed outcome exists. Provider/database-specific failures, timeouts, partial responses and recovery of service are not differentiated. |
| 12 | Partial persistence write or interruption during credential replacement plus session revocation | `ZD-AUTH-020`, `ZD-AUTH-021`; no direct criterion | **Missing** | No current criterion guarantees atomic or safely recoverable cross-record trust state. Candidate `ZD-AUTH-023` proposes the required outcomes. |
| 13 | Stale entitlement or owner-controlled activation state | `ZD-AUTH-016-AC-02`; `ZD-AUTH-017-AC-02` | **Partial** | Latest applicable state is required within a documented propagation bound, but the bound and the exact MVP-03 provider-call gate must be defined in the link-check contract. |
| 14 | Android protected-storage key unavailable or invalidated | `ZD-AUTH-015-AC-03` | **Covered** | App must fail closed and require safe re-authentication/recovery. Supported Android versions and device test matrix remain engineering validation. |
| 15 | Web cookie exposure and cross-site forged state-changing request | `ZD-AUTH-014-AC-01`, `AC-02` | **Covered** | Secure transport, script-access restriction, explicit cookie policy and CSRF rejection are required. Concrete policy depends on eventual web architecture. |
| 16 | Password/one-time code/session/recovery secret appears in logs, URLs or diagnostics | `ZD-AUTH-005-AC-01`, `AC-02`; `ZD-AUTH-019-AC-01`, `AC-02` | **Covered** | Plaintext password and credential leakage are forbidden. Actual log/crash/analytics inspection has not been performed. |
| 17 | External identity provider or email/SMS provider failure | `ZD-AUTH-018`; `ZD-AUTH-020` | **Deferred / unresolved** | First-party authentication is the owner preference; no external identity or recovery delivery provider has been selected. Any selected provider needs integration-specific outage and retry criteria. |
| 18 | Renewable session credential refresh, concurrent renewal and replay | `ZD-AUTH-010`; open question `ZD-Q-AUTH-005` | **Deferred / unresolved** | No refresh/renewal design is selected. Candidate `ZD-AUTH-024` applies only if renewal credentials are used. |
| 19 | MFA/passkey enrollment, loss and fallback | `ZD-AUTH-006`, `ZD-AUTH-020`; `ZD-Q-AUTH-003`, `ZD-Q-AUTH-004`, `ZD-Q-AUTH-008` | **Unresolved** | Authenticator type, mandatory/optional status, fallback and assurance policy remain owner decisions. |
| 20 | Account suspension, closure, deletion and retained data | `ZD-Q-AUTH-007`; `ZD-AUTH-001`, `ZD-AUTH-012` | **Unresolved / deferred** | Account lifecycle and retention policy are not selected. Do not infer deletion semantics or session treatment. |
| 21 | Account state change concurrent with an in-flight protected request | `ZD-AUTH-016-AC-02` | **Partial** | Authorization freshness is required within a documented bound, but race semantics and propagation limit are not defined. |
| 22 | Asynchronous recovery-message delivery failure, duplication or delay | `ZD-AUTH-020`; messaging facet | **Not applicable now / conditional** | No out-of-band channel is selected. If introduced, delivery, expiry, duplicate and acknowledgement outcomes need a Messaging contract. |
| 23 | Authentication latency, burst load, resource exhaustion and saturation | `ZD-AUTH-007`; performance facet | **Deferred** | Abuse controls are required, but no quantitative authentication workload or service target is available. |

## Negative and recovery conclusions

1. The contract explicitly covers fabricated client state, enumeration, session expiry/revocation/logout, recovery challenge replay, platform-specific credential protection and generic fail-closed dependency behaviour.
2. It does **not** yet explicitly cover invalid credentials as a standalone negative acceptance case or partial persistence/interruption during a coupled credential-and-session state change.
3. Rate-limiting, authorization freshness and dependency-failure outcomes are directionally required but need operational values and more specific failure boundaries.
4. Refresh rotation, account lifecycle, MFA/passkey policy and recovery channel are not safe for PM to decide. They remain open or conditional.
5. No implementation, endpoint, database, mobile build, log stream or production service was tested during this phase.

## Proposed follow-up

Review candidates `ZD-AUTH-022`–`024` in [the 15-facet assessment](PHASE-3-15-FACET-COVERAGE.md). Do not treat them as additions to the canonical contract until the owner reviews the recommendation and a versioned Markdown/JSON projection update is made with exact statement/metadata parity.
