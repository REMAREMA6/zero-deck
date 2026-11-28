# Developer Implementation Tracker — ZeroDeck Core

**Owner:** Developer Agent  
**Branch:** `main`  
**Last reconciled:** 2026-11-28  
**Purpose:** This is the Developer Agent's own implementation and verification tracker. It is maintained in `developer-workspace/` and does not edit, replace, or control Architect-owned OpenSpec documents.

## Tracking authority

- The Architect defines outcome-level requirements and acceptance criteria.
- The Developer independently tracks implementation, decomposition, test coverage, evidence, blockers and completion here.
- Product source code stays in `apps/` and `packages/`; this tracker contains status and evidence references only.
- An item is **Done** only when its applicable acceptance criteria are implemented and verified by reproducible tests/evidence. Code existing by itself is not enough.
- **Partial** means some implementation or tests exist, but at least one material acceptance criterion or verification item remains.
- **Blocked** means progress depends on an unresolved owner/security/platform/provider decision. Safe preparatory work may still proceed.
- **Not started** means no meaningful implementation/evidence has been verified yet.
- All 51 numbered outcomes in the Architect's plan are tracked as Developer work. The first five are included; they are not excluded as Architect-only references.

## Current reconciliation

These counts cover **all 51 numbered Architect outcomes (1.1–7.7)**. They are Developer's independent assessment of implementation evidence, not a transcription of the Architect's checkbox state.

| Status | Count |
|---|---:|
| Done | 12 |
| Partial | 15 |
| Blocked | 5 |
| Not started | 19 |
| **Total Architect outcomes tracked** | **51** |

**Important:** Twelve outcomes currently meet the Done definition: 2.2, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2 and 4.4. Partial items have some implementation and/or evidence, but do not yet satisfy the full acceptance contract. The 51 are all Architect-defined implementation outcomes; none are excluded from Developer tracking.

## Section 1 — Architecture baseline and requirement authority

These are the first five of the 51 Architect-defined outcomes. The Architect's source document remains untouched. Existing architecture artifacts provide partial evidence, but the Developer must verify traceability, convert relevant decisions into implementation constraints and record its own evidence.

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 1.1 | Requirement-authority and traceability matrix across five contracts | **Partial** | Architecture traceability artifacts exist under `openspec/` and product-management contracts. Developer still needs to verify every requirement maps to a module/work package/test or is explicitly unresolved/out of scope, and link that evidence in the Developer workspace. |
| 1.2 | Reconcile Phase 9 dispositions with open-decision register | **Partial** | Phase 9 disposition and architecture decision/open-question records exist. Developer must verify all 15 resolved and 49 deferred questions have consistent authority, owner/stage and release gates, without inventing values. |
| 1.3 | Architecture decision log with alternatives and evidence | **Partial** | Architecture decision log and handoff artifacts exist. Developer must verify the decisions relevant to implementation cite authority, alternatives and limitations, and preserve unresolved decisions as blockers. |
| 1.4 | Supported-platform investigation plan and reproducible experiments | **Not started** | No Developer-owned experiment plan/evidence records verified for file access, permissions, quarantine, key protection, cancellation and storage persistence on Web and Android. |
| 1.5 | Product Owner review and disposition of architecture conflicts | **Not started** | No explicit recorded Product Owner review/disposition verified in the Developer workspace. Do not infer approval from implementation authorization. |

## Section 2 — Core repository and backend foundation

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 2.1 | Application workspace and module boundaries | **Partial** | pnpm monorepo and Web, Android, API, contracts and domain boundaries exist. Client/API dependency rules and complete platform adapter boundaries still need verification. |
| 2.2 | Environment/configuration separation and safe startup validation | **Done** | `apps/api/src/config.ts`, `apps/api/test/config.test.ts`; missing/invalid configuration and secret redaction tests passed in CI run [46138912170](https://github.com/REMAREMA6/zero-deck/actions/runs/46138912170). |
| 2.3 | PostgreSQL schema, migrations and data-access boundaries | **Partial** | Real PostgreSQL 17 migration runner, checksum enforcement and transactional rollback tests exist. Identity/session and URL gate migrations exist; complete account, entitlement, operational data boundaries and recovery/forward-repair evidence remain. |
| 2.4 | Repeatable GitHub Actions CI with real PostgreSQL | **Done** | `.github/workflows/core-ci.yml` completed a clean end-to-end run [46145316979](https://github.com/REMAREMA6/zero-deck/actions/runs/46145316979): frozen dependency install, formatting, typecheck, unit tests, PostgreSQL 17 integration tests and API/Web/Android builds all passed. The URL-check test fixture now uses an idempotent feature-control upsert. |
| 2.5 | Deterministic adapters and fixtures for external boundaries | **Partial** | Fake email delivery and injected URL-check provider/test doubles exist. Full deterministic adapters/fixtures for every external boundary and proof of no live calls remain. |
| 2.6 | Module contracts, CI-based development and environment documentation | **Partial** | Workspace README, Developer execution plan and migration notes exist. Reproducible module/API/environment documentation and independent handover validation remain. |

## Section 3 — Identity and authorization

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 3.1 | Stable account principal and email/password registration | **Done** | Account registration service/routes, PostgreSQL migration, Argon2id password hashing, Web and Android registration surfaces, duplicate/canonical-email and secret-storage tests. CI [46138520229](https://github.com/REMAREMA6/zero-deck/actions/runs/46138520229). Public registration remains gated by owner-approved policy. |
| 3.2 | Password protection, verification state and verified-email change/recovery boundaries | **Done** | Argon2id credential hashing/verification and explicit unverified-account state remain in the identity service; unverified accounts are not blocked from ordinary sign-in. `EmailVerificationService.getVerifiedEmail(accountId)` is the authoritative verified-only lookup. Added `createVerifiedEmailSecurityNotifier` and `createVerifiedEmailRecoveryBoundary`; fake-delivery tests prove unverified addresses receive neither recovery challenges nor security notices, and only the lookup result is used for verified recipients. PostgreSQL integration test verifies an account's address becomes eligible only after its single-use verification challenge succeeds. No unapproved password policy or extra feature gate was inferred. Full clean CI passed [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089). |
| 3.3 | Single-use verified-email recovery challenges and fake security notification | **Done** | `apps/api/src/modules/identity/account-recovery.ts`, `account-recovery-routes.ts`, `apps/api/migrations/0005_account_recovery.sql`, `packages/contracts/src/index.ts` and `apps/api/test/account-recovery.integration.test.ts`. Recovery requests return an enumeration-neutral response; only active accounts with verified email receive a challenge; random challenge secrets are stored only as SHA-256 hashes; configured lifetime is explicit (no production default invented); replacement challenges consume prior outstanding challenges; delivery failure consumes the undelivered challenge; recovery atomically consumes the challenge, changes the password and revokes every active session; notification resolves the verified address through the 3.2 lookup. PostgreSQL tests cover unverified recipient denial, token-hash-only persistence, expiry, replay/consumption, session revocation, fake recovery-delivery failure and verified-recipient notification. Full clean CI [46152754260](https://github.com/REMAREMA6/zero-deck/actions/runs/46152754260) passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. Fresh-authentication/step-up remains 3.5; no real email provider is configured. |
| 3.4 | Session expiry, rotation, logout and revocation across clients | **Done** | Server enforces seven-day inactivity and thirty-day absolute expiry. `SessionService.rotateCurrent` atomically replaces the token hash under a row lock, preserves session identity/absolute expiry, and rejects superseded-token replay and concurrent duplicate rotation. Web BFF replaces only the HttpOnly/Secure/SameSite=Lax cookie and never exposes the new token in JSON; Android persists the replacement in SecureStore and attempts server revocation if secure persistence fails. Current logout, logout-all and individual-session revocation are server-authoritative. Tests cover cross-client stable account principal, database/auth outage denial, rotation, concurrent replay, logout/revocation and client credential clearing. Full clean CI passed [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089). |
| 3.5 | Fresh-authentication for sensitive security actions | **Done** | `apps/api/src/modules/identity/fresh-authentication.ts` provides transaction-bound current-password verification with account/credential row locks; invalid credentials and disabled accounts cannot execute the protected action, and protected mutations roll back if the action fails. `apps/api/test/fresh-authentication.integration.test.ts` covers valid/invalid credentials, disabled-account denial and rollback. It is operation-scoped, not imposed on ordinary session use. Future password/passkey, verified recovery-email and account-deletion mutation routes must call this guard; passkeys remain deferred and deletion execution is tracked under 3.8. Full clean CI [run 46154392546](https://github.com/REMAREMA6/zero-deck/actions/runs/46154392546) passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. |
| 3.6 | Authoritative permission, entitlement and owner-activation evaluation | **Done** | Added `apps/api/src/modules/authorization/authorization.ts` as a reusable PostgreSQL-backed authorization service and `apps/api/migrations/0006_account_permissions.sql` for explicit per-account permission grants. Each permission, Pro-entitlement and owner-activation record has an explicit `fresh`/`stale`/`unknown` state; new and existing rows default to `unknown`, which denies. Authorization re-reads server-owned records on every evaluation, locks the account and applicable gate rows for the transaction, and denies missing, stale, unknown, false, disabled-account or unavailable-database states. Client-supplied role/Pro/activation flags are not inputs to the authorization decision. MVP-03 URL checks now require the explicit `website.check` permission in addition to independent Pro and owner-activation gates. PostgreSQL tests cover all 125 combinations of permission, entitlement and activation state, disabled/unknown accounts, tampered client flags, permission revocation and database unavailability. No freshness TTL, role hierarchy, entitlement defaults or provider was invented. Full clean CI [run 46180414239](https://github.com/REMAREMA6/zero-deck/actions/runs/46180414239) passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. Queued/dispatched-work revocation remains task 3.7. |
| 3.7 | Shared revocation invariant for queued/dispatched work | **Done** | Added `protected_work_items` with atomic authorization-gated admission and dispatch, PostgreSQL revocation triggers for account disablement, permission, Pro entitlement and owner activation, and transactional `NOTIFY` cancellation events. `createProtectedWorkService` subscribes before queue admission, revalidates gates at dispatch, aborts dispatched operations through `AbortSignal`, and never returns a result after cancellation. URL-check provider boundary now receives the signal and maps cancellation to an explicit 409 response. Deterministic PostgreSQL integration tests prove revocation in the queue/dispatch gap prevents operation invocation, dispatched provider work is aborted, no result is returned and no follow-on provider call occurs; trigger tests cover each independent gate. Full CI [run 46182003289](https://github.com/REMAREMA6/zero-deck/actions/runs/46182003289) passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. Cancellation is cooperative: future provider adapters must honor the AbortSignal before every outbound request; no production provider is configured or activated. |
| 3.8 | User-initiated account deletion and retention boundary | **Partial** | Owner-approved policy is implemented: personal data is deleted 30 days after request; minimal deletion audit evidence is retained for 12 calendar months after deletion. API, Web and Android flows and PostgreSQL execution are covered by tests. A daily 02:00 UTC GitHub Actions scheduler is configured; production execution still requires the repository `DATABASE_URL` Actions secret and legal review for applicable markets. |
| 3.9 | Authentication/authorization abuse and cross-platform security tests | **Partial** | Registration enumeration-equivalence, password hash protection, session expiry/revocation and verification replay/concurrency tests exist. Full abuse, stale-client, outage, rotation, recovery and cross-platform security coverage remains. |

## Section 4 — MVP-01 local file analysis

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 4.1 | Web/Android file-selection and access adapters | **Done** | Web file input and Android Expo `File.pickFileAsync` are wired to local access adapters. Selection retains metadata only; byte reads are explicit and local. Adapters handle cancellation, unavailable/revoked handles, unreadable reads and changed file snapshots; both report support as `not_evaluated` rather than inventing formats or limits. The domain source boundary refuses to read unassessed/unsupported files and maps revoked/unreadable access to failed `could_not_decide`. Tests prove originals are not modified by these read-only adapters and no network fetch is initiated. Full clean CI passed [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089). |
| 4.2 | Analysis engine port and canonical result mapping | **Done** | `packages/domain/src/index.ts` defines `LocalAnalysisEnginePort` and canonical mapping for all four outcomes. `packages/domain/src/index.test.ts` uses a deterministic fake engine and verifies all four outcomes remain distinct, malformed/unsupported output and engine exceptions fail closed, metadata is not invented, and no-known-threat is never presented as proof of safety. Full CI passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds in [run 46146977405](https://github.com/REMAREMA6/zero-deck/actions/runs/46146977405). No production engine is selected or activated. Related implementation/test commits: `3f93b72d`, `950ac03a`, `20040887`, `41b2c932`. |
| 4.3 | Evidence-led production engine/threat-intelligence evaluation | **Blocked** | No production engine/source is approved. Evaluation and owner approval are required before selection. |
| 4.4 | Local-only analysis orchestration | **Done** | `runLocalFileAnalysis` emits queued/analyzing/completed/failed/cancelled/interrupted lifecycle events, reads only explicitly supported local byte sources, fails closed for unsupported/unassessed/unreadable files, and never treats engine failure as a clean verdict. Cancellation is reported only when observed from a cancellation-capable engine; unsignalled abort is interruption; retry is a new invocation. Optional progress is accepted only from engines declaring support and only when valid, monotonic and unit-consistent. Domain and Web/Android adapter tests stub `fetch` and prove local orchestration/file reads do not initiate network calls. No production engine is selected, so no fabricated progress or security verdict is shown. Full clean CI passed [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089). |
| 4.5 | Safe parsing, resource isolation and bounded processing | **Blocked** | Supported formats and resource budgets are not established. Do not invent limits or claim file-execution isolation. |
| 4.6 | Platform tests and published file support matrix | **Not started** | No verified file support matrix or reproducible browser/OS/file-type coverage. |
| 4.7 | Scan-result and diagnostic data minimization | **Not started** | No file-analysis persistence/network-boundary or diagnostic redaction evidence yet. |

## Section 5 — MVP-02 quarantine and file disposition

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 5.1 | Web/Android quarantine platform feasibility | **Not started** | No verified browser/Android storage, persistence, uninstall or key-protection experiments. |
| 5.2 | Quarantine cryptographic/key, integrity, retention and capacity decisions | **Blocked** | Requires security evidence and owner approval. No algorithm, retention period or recovery guarantee is assumed. |
| 5.3 | Android app-private encrypted quarantine adapter | **Not started** | No approved storage/key policy or verified adapter. |
| 5.4 | Web quarantine within proven browser capabilities | **Not started** | No browser feasibility evidence or adapter. |
| 5.5 | Explicit confirmation and verified-copy-before-source-disposition | **Not started** | No quarantine lifecycle implementation. Original removal must remain separately confirmed. |
| 5.6 | Restore eligibility, fresh analysis and integrity checks | **Not started** | No restore implementation or failure-preservation tests. |
| 5.7 | Manual purge and retention-aligned lifecycle records | **Not started** | No approved retention policy or purge implementation. |
| 5.8 | Quarantine idempotency, concurrency and recovery tests | **Not started** | No quarantine operations exist to verify. |

## Section 6 — MVP-03 website/link checking

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 6.1 | HTTP/HTTPS validation and explicit disclosure/consent | **Partial** | API parser rejects unsupported schemes, malformed URLs and embedded credentials; service requires consent. UI disclosure/consent flow, normalization policy and sensitive-component redaction evidence remain. Tests: `apps/api/test/url-checking.integration.test.ts`. |
| 6.2 | Provider port and deterministic fake; no destination fetching/crawling | **Partial** | Provider interface and injected fake lookup tests exist; no production provider is configured. Verify API composition and network boundary; complete call-recording/no-destination-fetch guarantees. |
| 6.3 | Independent Pro and owner-activation gates | **Partial** | Server-side independent PostgreSQL gates exist; tests cover unknown, Pro false and activation false plus successful both-true dispatch. Exhaustive unavailable/stale/revoked matrix and race coverage remain. |
| 6.4 | Dispatch-time revalidation, revocation, usage controls and emergency stop | **Not started** | Initial gate check exists, but no dispatch-time revalidation, queued cancellation, usage controls or emergency-stop evidence. |
| 6.5 | Production provider evaluation and owner approval | **Blocked** | No production provider, terms, quotas or spend ceiling selected. Production dispatch remains disabled. |
| 6.6 | Owner-approved URL/provider operating limits | **Blocked** | URL length, timeout, response size, concurrency, quota, caching and spend values must come from evidence and owner approval. |
| 6.7 | Result mapping and outage/inconclusive behaviour | **Partial** | API distinguishes blocked, unavailable and completed responses; provider schema validation maps unsupported responses to inconclusive. Broader provider failure and client explanation tests remain. |
| 6.8 | Minimal audit/diagnostic redaction and default non-persistence | **Partial** | Current service does not persist submitted URL/provider response and contains no URL logging path. Explicit log/trace/database redaction and persistence regression tests remain. |
| 6.9 | Adversarial parser, consent, gate-race, quota and provider-failure tests | **Partial** | Tests cover unsupported schemes, malformed URLs, embedded credentials, consent and zero provider calls for false/unknown gates. Gate races, quota, cancellation, failure and broader SSRF/network boundary tests remain. |

## Section 7 — Cross-platform verification and core exit

| ID | Outcome | Status | Implementation / verification evidence and remaining work |
|---|---|---|---|
| 7.1 | Evidence-backed Web/Android capability and compatibility matrix | **Not started** | No tested platform capability matrix. |
| 7.2 | Web Playwright end-to-end and responsive verification | **Not started** | No verified Playwright journeys, viewport evidence or screenshots/traces. |
| 7.3 | Android end-to-end/instrumentation verification | **Not started** | Expo export is not Android device/instrumentation verification. |
| 7.4 | Security, privacy, performance, resource and cost validation | **Not started** | No complete core security/privacy/performance evidence pack. |
| 7.5 | Backup/restore, deletion, migration recovery and operational runbooks | **Not started** | Migration tests exist, but full backend recovery/runbook and exclusion evidence for file/quarantine data remain. |
| 7.6 | Developer core-stage completion report | **Not started** | This tracker is progress accounting, not a core completion report. Requires all core outcomes and evidence. |
| 7.7 | Owner review before hosted integrations | **Not started** | Hosted integration stage remains deferred; owner review has not been requested or recorded. |

## CI and evidence ledger

| Run | Result | Evidence |
|---|---|---|
| 46138520229 | Success | Account registration, Argon2id, PostgreSQL tests and client builds |
| 46138912170 | Success | Configuration, migration idempotency/checksum/rollback and builds |
| 46139448216 | Success | Email verification lifecycle, replay/concurrency/delivery failure and builds |
| 46145316979 | Success | Full CI: formatting, typecheck, unit tests, PostgreSQL 17 integration tests and API/Web/Android builds. |
| 46145669565 | Success | Full CI including Web session-cookie security regression test; browser-readable JSON excludes token and production cookie is HttpOnly, Secure and SameSite=Lax. |
| 46145945402 | Cancelled | Run was cancelled before quality verification; no test/build evidence claimed. |
| 46146024978 | Failed (formatting only) | CI stopped at Prettier because `packages/domain/src/index.ts` needed formatting; typecheck, tests, PostgreSQL integration and builds were skipped. |
| 46146507604 | Failed (two stale assertions) | Formatting and typecheck passed. Domain tests exposed two expected-value assertions that did not reflect the canonical no-known-threat safety wording. Updated in commit `20040887`; rerun pending. |
| 46146627115 | Failed (test formatting) | CI stopped at Prettier in `packages/domain/src/index.test.ts`; formatting corrections continued in `962e0b7c` and `882a8ebc`. |
| 46146759071 | Failed (test formatting) | CI again stopped at Prettier in the domain test file before typecheck/tests/builds. Simplified expected-value helper in commit `882a8ebc`; formatting still failed. |
| 46146869648 | Failed (test formatting) | CI stopped at Prettier in `packages/domain/src/index.test.ts`; the diagnostic step was present in the workflow but did not provide usable formatted output. Assertions were simplified further in `41b2c932`; replacement CI pending. |
| 46147320751 | Failed (test formatting) | CI stopped at Prettier in `packages/domain/src/index.test.ts`; lifecycle test formatting corrected in `2c91bd0a`. |
| 46147448494 | Failed (test formatting) | Temporary formatter diagnostic confirmed Prettier's expected single-line invocation formatting; corrected in `f07aa8db` and removed the temporary workflow step in `61b3680e`. |
| 46147168375 | Failed (test formatting) | CI stopped at Prettier in `apps/api/test/health.test.ts` before typecheck/tests/builds; formatting corrected in `2fafa2e1`. |
| 46146977405 | Success | Full core CI passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. Verifies MVP-01 engine port and canonical result mapping. |
| 46147584370 | Success | Full core CI passed after local analysis cancellation/interruption/retry tests and API exception-log redaction regression: formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. |
| 46150614089 | Success | Clean core CI on the restored least-privilege workflow: frozen dependency install, formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds all passed. Verifies completed outcomes 3.2, 3.4, 4.1 and 4.4. |
| 46152754260 | Success | Full core CI passed for account recovery: formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds. Verifies 3.3 challenge issuance, verified-email boundary, expiry, replay/consumption, session revocation and fake delivery-failure paths. |

## Next execution queue

1. Implement 3.8 account deletion with immediate access disablement and session revocation, retaining the approved deletion/retention policy boundaries.
2. Continue MVP-01 by completing 4.3 evidence-led production-engine and threat-intelligence evaluation; do not select or activate a production engine without owner approval. Keep file analysis unavailable while no approved engine/support matrix exists.
3. Implement safe parsing/resource isolation and bounded processing only after supported formats and resource budgets are established; preserve the current fail-closed behavior.
4. Complete MVP-03 consent UI, dispatch-time gate revalidation, cancellation/usage controls, redaction evidence and adversarial tests while keeping the production provider disabled.
5. Continue MVP-02 quarantine feasibility only within owner-approved security boundaries and verified platform capabilities.
## Maintenance rule

Update this tracker in the same implementation increment that changes status. Every transition to **Done** must cite product source paths and passing GitHub Actions evidence. Every **Blocked** item must state the decision/evidence needed to unblock it. Do not use Architect checklist checkbox state as a proxy for Developer implementation progress.
