# Developer Task Breakdown — ZeroDeck Core Product

This is the Developer-owned executable breakdown of the Architect's outcome-level implementation plans. The Architect's OpenSpec task plan remains the source of outcome goals and acceptance contracts. This file is the Developer's execution tracker.

## Phase A — Foundation

### A1. Monorepo and toolchain

**Status: Complete — frozen-lockfile CI, typecheck, formatting, Web build and Android export passed in run 46138639267.**

**Description:** Establish the TypeScript workspace and buildable Web, Android and API package boundaries.

**Acceptance criteria**
- [x] pnpm resolves one workspace and one committed lockfile from a clean checkout.
- [x] TypeScript strict configuration is shared without merging platform-specific build settings.
- [x] Web, Android, API, contracts and domain packages each expose their own build/typecheck commands.
- [x] No hosted integration credentials are required.

**Verification**
- [x] Clean GitHub Actions dependency install succeeds with frozen lockfile.
- [x] Workspace typecheck and formatting pass.
- [x] Next.js production build and Expo Android export pass.

**Dependencies:** None.  
**Files likely touched:** package.json, pnpm-workspace.yaml, pnpm-lock.yaml, tsconfig.base.json, apps/*/package.json, app entry points.  
**Estimated scope:** Large (scaffold spans multiple packages).

### A2. Backend bootstrap and safe configuration

**Status: Complete — configuration validation and readiness tests passed in CI run 46138912170.**

**Description:** Establish one Fastify modular-monolith API process with validated configuration, health/readiness and safe error handling.

**Acceptance criteria**
- [x] Missing/invalid required configuration prevents startup with field names/codes but no secret values.
- [x] Liveness does not depend on PostgreSQL; readiness performs a real database check.
- [x] Database outage returns unavailable and never reports ready.
- [x] Unhandled errors return a generic structured response and do not expose stack/database details.

**Verification**
- [x] Unit tests cover liveness, readiness success/failure and configuration validation.
- [x] API build and typecheck pass.

**Dependencies:** A1.  
**Files likely touched:** apps/api/src/config.ts, app.ts, server.ts, db/pool.ts, tests.  
**Estimated scope:** Medium (3–5 files).

### A3. PostgreSQL migration and repository foundation

**Status: Complete — PostgreSQL 17 migration idempotency, checksum mismatch and rollback tests passed in CI run 46138912170.**

**Description:** Establish a versioned SQL migration runner and real PostgreSQL integration test path.

**Acceptance criteria**
- [x] Fresh PostgreSQL can initialize the migration ledger and apply ordered SQL migrations.
- [x] Applied migration checksums are immutable; a changed applied migration fails closed.
- [x] Each migration runs transactionally and failure rolls back.
- [x] Core CI uses PostgreSQL 17, not SQLite or an in-memory substitute.

**Verification**
- [x] Integration test connects to the PostgreSQL service and proves readiness.
- [x] Migration runner is exercised in CI.
- [x] Later migration tests cover idempotency, checksum mismatch and failure rollback.

**Dependencies:** A1, A2.  
**Files likely touched:** apps/api/src/db/*, apps/api/migrations/*, apps/api/test/*.test.ts, core-ci.yml.  
**Estimated scope:** Medium.

### A4. Shared contracts and domain semantics

**Status: Complete — contract/domain semantics and unit tests passed in CI run 46138520229.**

**Description:** Establish shared runtime-validated contracts and canonical domain result types consumed by Web, Android and API.

**Acceptance criteria**
- [x] API error and health response shapes are validated.
- [x] File-analysis outcomes remain distinct: confirmed threat, suspicious, no known threat found, could not decide.
- [x] Inconclusive or no-match outcomes are never converted into a claim of safety.
- [x] Both clients and API use the same shared package boundaries.

**Verification**
- [x] Contract and domain unit tests pass.
- [x] All workspace packages typecheck.

**Dependencies:** A1.  
**Files likely touched:** packages/contracts/src/*, packages/domain/src/*.  
**Estimated scope:** Small/Medium.

**Checkpoint A**

**Status: Complete — frozen-lockfile CI, formatting, typecheck, unit/integration tests and Web/Android builds passed in run 46138912170.**
- [x] A1–A4 evidence is green in GitHub Actions.
- [x] Lockfile is committed and CI uses frozen installation.
- [x] Real PostgreSQL integration evidence exists.
- [x] Web and Android shells build.

## Phase B — Identity and authorization

### B1. Account creation and stable identity

**Status: Complete — API, PostgreSQL integration tests, Web and Android registration surfaces built and verified in CI run 46138520229.**

**Description:** Implement the shared account principal and email/password registration path across the API and both clients. Apply only the approved email canonicalization: trim surrounding whitespace, compare the domain case-insensitively, preserve local-part semantics and do not apply provider-specific alias rules.

**Acceptance criteria**
- [x] A successful registration creates one stable account principal separate from email and password credentials.
- [x] Duplicate canonical email identifiers cannot create a second account.
- [x] Only an Argon2id verifier is stored; plaintext passwords never enter database records or logs.
- [x] Registration does not require phone, social login, MFA or passkeys.
- [x] Account creation can leave the email explicitly unverified.
- [x] Public registration remains disabled unless the owner-approved password acceptance and abuse-control policy is configured; tests use isolated policy fixtures, not production defaults.

**Verification**
- [x] PostgreSQL integration tests cover account creation, duplicate canonical email, case-sensitive local part and domain normalization.
- [x] Security tests inspect persisted records and captured logs for plaintext password absence.
- [x] Web and Android registration journeys call the same API contract.

**Dependencies:** A1–A4.  
**Files likely touched:** apps/api/src/modules/identity/*, apps/api/migrations/*, packages/contracts/src/auth*, packages/domain/src/identity*, apps/web/app/(auth)/*, apps/android/src/auth/*.  
**Estimated scope:** Large; split into service, API and client subtasks before coding.

### B2. Email verification boundary and fake delivery

**Status: Complete — verified-only recovery/security-notification boundaries, challenge lifecycle, response-secret assertions and captured-log redaction are covered by unit and PostgreSQL tests. Clean full CI passed in [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089). The full recovery challenge flow remains the separate B5 outcome.**

**Description:** Implement single-use verification challenges and a delivery port with a deterministic fake adapter only.

**Acceptance criteria**
- [x] New accounts may remain explicitly unverified.
- [x] Recovery and security-notification boundaries consume only `EmailVerificationService.getVerifiedEmail`; fake-delivery tests verify unverified addresses are never recipients. Full recovery challenge consumption remains in B5.
- [x] Challenges are single-use and time-limited.
- [x] No real email provider is called in core CI.
- [x] Challenge expiry/resend values are required policy configuration, not invented production defaults.

**Verification**
- [x] Tests cover success, expiry, replay, altered challenge, concurrent verification and fake delivery failure.
- [x] API responses contain no challenge secret (request-response body assertions passed in PostgreSQL integration run 46145316979).
- [x] Logs contain no challenge secret (API error handler logs a fixed code without exception details; captured-log regression test passed in CI run 46147584370).

**Dependencies:** B1.  
**Files likely touched:** apps/api/src/modules/identity/verification*, delivery port/adapters, migrations, contracts, tests.  
**Estimated scope:** Medium.

### B3. Sign-in and session lifecycle

**Status: Complete — shared principal, server-backed sessions, expiry and fail-closed auth/database outage behavior are verified across the Web/Android API boundary. Clean full CI passed in [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089).**

**Description:** Authenticate credentials at the trusted API boundary and issue revocable server-backed sessions shared across Web and Android account identity.

**Acceptance criteria**
- [x] Valid credentials resolve to the same stable principal across Web/Android sign-in sessions (PostgreSQL integration test verifies identical `accountId` with independent session IDs).
- [x] Session credentials are unguessable and only their hashes are persisted (32-byte random opaque token; PostgreSQL stores SHA-256 hash, verified in `apps/api/test/sessions.integration.test.ts`).
- [x] Server enforces 7-day inactivity and 30-day absolute expiry (PostgreSQL clock-controlled integration test).
- [x] Multiple active sessions are allowed for one account (integration test creates two active sessions and independently revokes one).
- [x] Web credentials use an HttpOnly/Secure production cookie with explicit `SameSite=Lax` policy and no token in browser-readable JSON (verified in `apps/web/app/api/sessions/route.test.ts`, full green CI run 46145669565).
- [x] Android credentials use Expo SecureStore; read/write/clear fail closed when secure storage is unavailable (unit tests in `apps/android/test/session-storage.test.ts`).
- [x] Database/auth dependency failure denies protected access (injected authentication-service outage returns a generic 500 and no principal/session data).

**Verification**
- [x] PostgreSQL tests cover valid/invalid credentials, token persistence, inactivity expiry, absolute expiry, logout and revocation in `apps/api/test/sessions.integration.test.ts` (full green CI run 46145669565).
- [x] Web cookie attributes and token non-disclosure are tested in `apps/web/app/api/sessions/route.test.ts` (full green CI run 46145669565).
- [x] Android secure-storage failure paths are tested in `apps/android/test/session-storage.test.ts`.
- [x] Cross-client API integration test proves both client sign-ins resolve to the same stable account principal.

**Dependencies:** B1, A3, A4.  
**Files likely touched:** apps/api/src/modules/sessions/*, apps/api/migrations/*, apps/web auth client, apps/android auth client, tests.  
**Estimated scope:** Large; split API, Web and Android work.

### B4. Logout, rotation and revocation

**Status: Complete — current logout, logout-all, individual revocation, atomic credential rotation and client credential replacement/clearing are implemented and tested. Concurrent rotation replay is rejected. Clean full CI passed in [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089).**

**Description:** Implement current-session logout, logout-all, individual-session revocation service support and credential rotation at trust-boundary changes.

**Acceptance criteria**
- [x] Logout immediately revokes the current session at the API; Web clears the HttpOnly cookie and Android clears SecureStore. If upstream revocation is unavailable, clients report that server revocation was not confirmed.
- [x] Logout-all revokes all sessions for the principal through the API route; PostgreSQL integration test replays prior credentials.
- [x] Superseded credentials cannot authorize requests after atomic rotation.
- [x] Individual-session revocation exists in the service without adding a detailed session-management screen.
- [x] Revocation checks are server-authoritative.

**Verification**
- [x] Replay tests cover current logout, logout-all and rotation.
- [x] Concurrent rotation of the same old credential permits only one successful rotation; stale replay is rejected.

**Dependencies:** B3.  
**Files likely touched:** session services/repositories/routes, Web and Android auth state, integration tests.  
**Estimated scope:** Medium.

### B5. Recovery and fresh-authentication boundaries

**Recovery sub-slice (Architect outcome 3.3): Complete.** Verified-email challenge issuance, expiry, one-time consumption, password replacement, session revocation and fake security notification are implemented and passed full CI run [46152754260](https://github.com/REMAREMA6/zero-deck/actions/runs/46152754260). **Fresh-authentication guard (Architect outcome 3.5): Complete and verified** for transaction-bound current-password verification, account/credential row locks, invalid/valid credential handling, disabled-account denial and rollback on protected-action failure. Full clean CI passed in [run 46154392546](https://github.com/REMAREMA6/zero-deck/actions/runs/46154392546). The guard is the required boundary for future password/passkey changes, verified recovery-email changes and account deletion endpoints; passkeys remain deferred and account-deletion execution belongs to 3.8.

**Description:** Implement verified-email recovery, fake security notifications and fresh authentication for sensitive account-security actions.

**Acceptance criteria**
- [x] Recovery uses a single-use, time-limited verified-email challenge; challenge lifetime is explicitly injected and no production expiry default is invented.
- [x] Successful recovery revokes existing sessions and emits a security notification through the fake delivery adapter.
- [x] Unverified email is never used for recovery or security notifications.
- [x] A transaction-bound fresh-authentication guard verifies the current password before a sensitive mutation. Future sensitive action routes must invoke it; passkeys remain deferred and account-deletion execution is tracked separately under 3.8. PostgreSQL tests cover valid/invalid credentials, disabled-account denial and transaction rollback.
- [x] Fresh authentication is operation-scoped and is not added to ordinary session authentication or routine requests.
- [ ] Expiry, resend, rate and notification retry policy values are not invented.

**Verification**
- [x] PostgreSQL integration tests cover expiry, consumed/replayed challenges, revocation, verified-recipient notification and recovery-delivery failure.
- [x] Fake notification transport failure does not undo completed recovery; PostgreSQL step-up tests cover invalid/valid password, disabled account and rollback on protected-action failure. Full CI run 46154392546 passed.
- [ ] No challenge/token is exposed in logs or URLs.

**Dependencies:** B2–B4.  
**Files likely touched:** recovery module, challenge migrations, notification port, Web/Android security settings, tests.  
**Estimated scope:** Large; split challenge, recovery, step-up and UI slices.

### B6. Entitlement, permission and owner-activation gates

**Status: Complete — Architect outcome 3.6 implemented and verified in [full CI run 46180414239](https://github.com/REMAREMA6/zero-deck/actions/runs/46180414239).**

**Description:** Implement server-owned authorization state and reusable fail-closed guards.

**Acceptance criteria**
- [x] Pro entitlement and owner activation are independent gates; MVP-03 additionally requires the explicit `website.check` permission.
- [x] False, unknown, stale or unavailable permission/entitlement/activation state denies protected work. Gate records use explicit `fresh`/`stale`/`unknown` state; new and existing records default to unknown. No numeric freshness TTL is invented.
- [x] Client-supplied role/Pro/activation flags never authorize an operation; only the authenticated account principal and server-owned PostgreSQL records are evaluated.
- [x] Each authorization evaluation reads current server state and locks the account and applicable gate rows for the transaction. Permission revocation is observed on the next evaluation. Queued/dispatched-work revocation and follow-on-call cancellation remain Architect outcome 3.7, not part of 3.6.

**Verification**
- [x] PostgreSQL tests cover all 125 combinations of permission, Pro-entitlement and owner-activation values/freshness states.
- [x] Tests cover missing, false, stale, unknown, disabled-account and unavailable-database denial.
- [x] Tampered client flags are ignored; permission revocation is denied on the next authorization evaluation.
- [x] Full CI passed formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds in run 46180414239.

**Dependencies:** A3, A4, B1.  
**Files implemented:** `apps/api/src/modules/authorization/authorization.ts`, `apps/api/migrations/0006_account_permissions.sql`, `apps/api/src/modules/website/url-checking.ts`, `apps/api/src/modules/website/url-check-routes.ts`, `apps/api/test/authorization.integration.test.ts`, `apps/api/test/url-checking.integration.test.ts`.  
**Estimated scope:** Medium/Large.

### B6.7. Shared revocation invariant for queued and dispatched work

**Status: Implementation in place; full CI verification pending. Architect outcome 3.7.**

**Description:** Make protected work admission, queueing, dispatch and in-flight cancellation share the same server-authoritative permission/entitlement/activation gates. Revocation must prevent queued work from dispatching and signal dispatched work to cancel where its provider transport supports cancellation.

**Acceptance criteria**
- [x] Protected work is admitted only after the current account and applicable authorization gates are positively established under row locks in the same transaction that creates its queued record.
- [x] Dispatch re-evaluates the same gates and atomically transitions only still-queued work to dispatched.
- [x] PostgreSQL revocation triggers cancel queued work and request cancellation for dispatched work when an account is disabled or its required permission, Pro entitlement or owner activation becomes false, stale, unknown or is removed.
- [x] Revocation events are delivered through transactional PostgreSQL notifications; the application subscribes before queue admission so the admission/dispatch gap cannot lose a revocation event.
- [x] Dispatched work receives an AbortSignal; URL-check provider adapters are contractually required to honor it before each outbound call and pass it to cancellable transports.
- [x] A cancelled operation never returns a provider result to the caller; URL-check cancellation is exposed as an explicit conflict response.
- [ ] Deterministic PostgreSQL integration tests and full GitHub Actions verification pass on main.

**Verification**
- [x] Deterministic race test revokes permission after queue admission but before dispatch; operation is never invoked and queued work is cancelled.
- [x] Dispatched-provider test revokes permission, observes AbortSignal, rejects provider work and proves no result is returned.
- [x] PostgreSQL trigger tests cover account disablement, permission revocation, Pro-entitlement revocation and owner-activation revocation for queued and dispatched work.
- [ ] Full CI: formatting, typecheck, unit tests, PostgreSQL integration tests and API/Web/Android builds.

**Dependencies:** B6.  
**Files implemented:** `apps/api/migrations/0007_protected_work_revocation.sql`, `apps/api/src/modules/authorization/authorization.ts`, `apps/api/src/modules/authorization/protected-work.ts`, `apps/api/src/modules/website/url-checking.ts`, `apps/api/src/modules/website/url-check-routes.ts`, `apps/api/test/url-checking.integration.test.ts`.  
**Estimated scope:** Medium/Large.

### B7. Account deletion

**Description:** Implement user-confirmed account closure with immediate access disablement and session revocation; keep personal-data deletion schedule behind an approved policy.

**Acceptance criteria**
- [ ] Fresh authentication and explicit confirmation are required.
- [ ] Account access is disabled and sessions revoked immediately.
- [ ] Personal data is not falsely reported deleted before the documented schedule executes.
- [ ] Any retained record requires a documented reason and retention period.
- [ ] No deletion schedule or legal category is invented.

**Verification**
- [ ] PostgreSQL tests prove immediate disable/revocation.
- [ ] Retention-policy gate tests prevent premature deletion-complete claims.

**Dependencies:** B3–B6.  
**Files likely touched:** account lifecycle module, migrations, Web/Android account UI, tests.  
**Estimated scope:** Medium/Large.

## Phase C — MVP-01 local file analysis

### C1. File access and capability adapters

**Status: Complete — Web and Android selectors/access adapters, cancellation, unavailable/revoked handles, unreadable access, unsupported/unassessed input handling and network-boundary tests are verified. File-type support remains `not_evaluated`; the product does not invent formats or limits and does not start a scan on selection. Clean full CI passed in [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089).**

**Description:** Add explicit user-selected file access for Web and Android and truthfully handle revoked/unreadable/unsupported inputs.

**Acceptance criteria**
- [x] Analysis does not start on file selection; a scan can only be initiated by a later explicit user action when a supported engine is configured.
- [x] Original file is not modified; adapters expose read-only access and contain no write/move/delete operation.
- [x] Permission loss/unreadable reads map to failed `could_not_decide`; unsupported and `not_evaluated` sources fail closed without reading bytes.
- [x] File bytes never cross the backend/network boundary in the current local path; Web/Android adapter and domain tests stub `fetch` and assert no request.

**Verification:** Web/Android adapter tests, permission-loss tests and network-boundary tests.  
**Dependencies:** A1, A4.  
**Likely files:** apps/web file adapter, apps/android platform adapter, shared domain tests.  
**Estimated scope:** Medium.

### C2. Analysis engine port and result mapping

**Status: Complete — local engine port, canonical four-outcome mapping and deterministic fake-engine tests passed full CI run [46146977405](https://github.com/REMAREMA6/zero-deck/actions/runs/46146977405), including formatting, typecheck, unit tests, PostgreSQL integration and API/Web/Android builds. No production engine is selected or activated.**

**Description:** Define the platform-independent engine boundary and deterministic fake used only for tests.

**Acceptance criteria**
- [x] Four result outcomes remain distinct.
- [x] No-match is not described as safe.
- [x] Engine failure never becomes a clean result.
- [x] Fake engine is never activated as a production scanner.

**Verification:** Engine contract tests and mapping tests in `packages/domain/src/index.test.ts`; full CI run 46146977405.  
**Dependencies:** A4.  
**Likely files:** packages/domain analysis port, apps/* adapters, tests.  
**Estimated scope:** Small/Medium.

### C3. Local analysis orchestration

**Status: Complete — local orchestration emits lifecycle events, accepts only engine-supported valid progress, handles cancellation/interruption/retry truthfully, and fails closed for unassessed, unsupported or unreadable file sources. Domain and both platform adapter tests verify no network fetch is initiated. No production engine is selected, so the UI does not fabricate progress or a verdict. Clean full CI passed in [run 46150614089](https://github.com/REMAREMA6/zero-deck/actions/runs/46150614089).**

**Description:** Orchestrate analysis lifecycle, cancellation where supported, interruption, retry and local-only processing.

**Acceptance criteria**
- [x] File bytes are never uploaded or backend-persisted by the local orchestration path; source and platform adapter tests assert no network fetch.
- [x] Cancellation/interruption are represented only when observed (pre-start cancellation, engine-supported cancellation and unsignalled `AbortError` interruption are tested).
- [x] Inconclusive/failure remains distinct from no-known-threat (engine exceptions and malformed output map to failed/could-not-decide).
- [x] No default scan history or content persistence is introduced by the domain orchestrator.

**Verification:** lifecycle, cancellation, interruption and network-boundary tests.  
**Dependencies:** C1, C2.  
**Likely files:** packages/domain, Web/Android local orchestration, tests.  
**Estimated scope:** Medium.

### C4. Analysis client surfaces

**Status: Partial — Web file-selection surface now explains engine-unavailable and unsupported-format/limit states without presenting a fake scan result. Android parity and browser accessibility/responsive interaction tests remain. CI verification is pending in run [46147873294](https://github.com/REMAREMA6/zero-deck/actions/runs/46147873294).**

**Description:** Build the Web and Android file-selection and result experiences with honest engine-unavailable states.

**Acceptance criteria**
- [ ] Both clients present the same four outcome meanings.
- [x] No fake result is shown as a real scan (Web explicitly states that no scan was performed).
- [x] Unsupported formats/capabilities are disclosed (Web states supported formats and size limits are not yet approved).
- [ ] Responsive/accessibility behavior is verified.

**Verification:** Playwright and Android UI tests.  
**Dependencies:** C1–C3.  
**Likely files:** Web analysis routes/components, Android analysis screens, tests.  
**Estimated scope:** Large; split Web and Android slices.

## Phase D — MVP-02 quarantine and disposition

### D1. Platform feasibility experiments

**Description:** Prove storage, permission, persistence, uninstall/data-clear and key-protection capabilities on Web and Android using non-sensitive fixtures.

**Acceptance criteria:** capability differences are documented; no device-wide isolation or secure-erasure guarantee is claimed.  
**Verification:** browser capability tests and Android instrumentation.  
**Dependencies:** C1.  
**Likely files:** platform adapter probes, capability matrix, tests.  
**Estimated scope:** Medium.

### D2. Quarantine domain lifecycle

**Description:** Define eligibility, explicit confirmation, verified-copy ordering, restore and purge state transitions behind interfaces.

**Acceptance criteria:** automatic quarantine is impossible; original is never automatically removed; failed copy/integrity preserves source; suspicious/inconclusive items are not eligible for restore.  
**Verification:** state-machine and failure-injection tests.  
**Dependencies:** C2, D1.  
**Likely files:** packages/domain quarantine model and tests.  
**Estimated scope:** Medium.

### D3. Approved quarantine storage operations

**Description:** Implement only platform storage guarantees whose cryptographic/key lifecycle, integrity, retention and capacity decisions have been approved.

**Acceptance criteria:** unsupported actions are disabled; contents/keys are not backed up by default; no secure erase is promised.  
**Verification:** platform storage, interruption, disk-full, key-unavailable and restore tests.  
**Dependencies:** D1, D2 and owner/security policy approval.  
**Likely files:** Android native adapter, Web capability adapter, storage tests.  
**Estimated scope:** Large; blocked until release gates clear.

## Phase E — MVP-03 website/link checking

### E1. URL input and consent

**Description:** Implement HTTP/HTTPS-only URL validation, disclosure and explicit consent before sending data to a provider.

**Acceptance criteria:** unsupported schemes reject; credentials/sensitive URL components are redacted; no provider call before consent.  
**Verification:** adversarial parser, consent and redaction tests.  
**Dependencies:** A4.  
**Likely files:** URL contracts, API input validator, Web/Android UI, tests.  
**Estimated scope:** Medium.

### E2. Independent Pro and owner-activation gates

**Description:** Add server-owned gate evaluation and dispatch-time revalidation.

**Acceptance criteria:** both gates must be positively true; unknown/false/stale/unavailable/revoked denies; client state cannot override.  
**Verification:** exhaustive truth-table and race/revocation tests.  
**Dependencies:** B6.  
**Likely files:** authorization module, URL service, DB migrations, tests.  
**Estimated scope:** Medium.

### E3. Deterministic fake provider boundary

**Description:** Implement a fake provider port with response validation and call recording; prohibit destination fetching/crawling.

**Acceptance criteria:** denied cases record zero provider calls; only adapter dispatches; raw URLs/full responses/results are not persisted by default; failure is inconclusive.  
**Verification:** zero-call tests, SSRF/network-boundary tests and provider-failure tests.  
**Dependencies:** E1, E2.  
**Likely files:** provider port, fake adapter, URL service, tests.  
**Estimated scope:** Medium.

### E4. URL-check client surfaces

**Description:** Implement Web and Android single-URL flow with visible consent, Pro/activation states and honest results.

**Acceptance criteria:** no-match is not safe; no whole-site inspection claim; unavailable/denied/inconclusive states are clear.  
**Verification:** Playwright and Android UI tests.  
**Dependencies:** E1–E3, B3/B6.  
**Likely files:** Web URL pages, Android URL screens, tests.  
**Estimated scope:** Large; split per client.

## Phase F — Cross-platform verification and core exit

### F1. Web end-to-end and responsive verification

**Description:** Exercise identity, analysis, quarantine capability and URL gates through visible browser journeys.

**Acceptance criteria:** accessible controls, visible state transitions, failure states and responsive layouts are verified.  
**Verification:** Playwright with semantic locators, no fixed sleeps, screenshots/traces.  
**Dependencies:** B, C, D and E.  
**Likely files:** apps/web/e2e, Playwright config and fixtures.  
**Estimated scope:** Large.

### F2. Android end-to-end verification

**Description:** Exercise authentication, file access, local analysis and quarantine capability boundaries on representative Android emulators/devices.

**Acceptance criteria:** permission revocation, process interruption and secure session storage are verified or explicitly marked unsupported.  
**Verification:** Android instrumentation/E2E artifacts.  
**Dependencies:** B, C, D and E.  
**Likely files:** Android tests, platform adapters and CI workflow.  
**Estimated scope:** Large.

### F3. Security, privacy and recovery validation

**Description:** Validate authorization, redaction, failure handling, concurrency, dependency security, DB recovery and operational boundaries.

**Acceptance criteria:** no high-risk unresolved issue is silently accepted; all release gates have evidence or explicit blockers.  
**Verification:** automated tests, CI security checks and evidence report.  
**Dependencies:** all feature slices.  
**Likely files:** tests, workflows, security checklist and runbooks.  
**Estimated scope:** Large.

### F4. Core-stage completion report

**Description:** Reconcile all 51 Architect outcomes to completed, blocked or not applicable with links to implementation and test evidence.

**Acceptance criteria:** core can be exercised without hosted integrations; production capabilities are not claimed without approval/evidence; known limitations and open decisions are explicit.  
**Verification:** clean CI, PostgreSQL, Web E2E, Android evidence and report review.  
**Dependencies:** F1–F3.  
**Likely files:** developer-workspace/reports/core-stage-completion.md and handoff notes.  
**Estimated scope:** Medium.

## Checkpoint rule

Do not mark a task complete from code existence alone. Require its stated tests and evidence. If a release gate remains unresolved, keep the affected capability disabled and mark the task blocked rather than inventing a policy. Hosted integrations and deployment remain a separate later stage.
