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

**Description:** Establish one Fastify modular-monolith API process with validated configuration, health/readiness and safe error handling.

**Acceptance criteria**
- [ ] Missing/invalid required configuration prevents startup with field names/codes but no secret values.
- [ ] Liveness does not depend on PostgreSQL; readiness performs a real database check.
- [ ] Database outage returns unavailable and never reports ready.
- [ ] Unhandled errors return a generic structured response and do not expose stack/database details.

**Verification**
- [ ] Unit tests cover liveness, readiness success/failure and configuration validation.
- [ ] API build and typecheck pass.

**Dependencies:** A1.  
**Files likely touched:** apps/api/src/config.ts, app.ts, server.ts, db/pool.ts, tests.  
**Estimated scope:** Medium (3–5 files).

### A3. PostgreSQL migration and repository foundation

**Description:** Establish a versioned SQL migration runner and real PostgreSQL integration test path.

**Acceptance criteria**
- [ ] Fresh PostgreSQL can initialize the migration ledger and apply ordered SQL migrations.
- [ ] Applied migration checksums are immutable; a changed applied migration fails closed.
- [ ] Each migration runs transactionally and failure rolls back.
- [ ] Core CI uses PostgreSQL 17, not SQLite or an in-memory substitute.

**Verification**
- [ ] Integration test connects to the PostgreSQL service and proves readiness.
- [ ] Migration runner is exercised in CI.
- [ ] Later migration tests cover idempotency, checksum mismatch and failure rollback.

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
- [ ] A1–A4 evidence is green in GitHub Actions.
- [ ] Lockfile is committed and CI uses frozen installation.
- [ ] Real PostgreSQL integration evidence exists.
- [ ] Web and Android shells build.

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

**Description:** Implement single-use verification challenges and a delivery port with a deterministic fake adapter only.

**Acceptance criteria**
- [ ] New accounts may remain explicitly unverified.
- [ ] Unverified addresses cannot be used for recovery or security notifications.
- [ ] Challenges are single-use and time-limited.
- [ ] No real email provider is called in core CI.
- [ ] Challenge expiry/resend values are required policy configuration, not invented production defaults.

**Verification**
- [ ] Tests cover success, expiry, replay, altered challenge and fake delivery failure.
- [ ] Logs and API responses contain no challenge secret.

**Dependencies:** B1.  
**Files likely touched:** apps/api/src/modules/identity/verification*, delivery port/adapters, migrations, contracts, tests.  
**Estimated scope:** Medium.

### B3. Sign-in and session lifecycle

**Description:** Authenticate credentials at the trusted API boundary and issue revocable server-backed sessions shared across Web and Android account identity.

**Acceptance criteria**
- [ ] Valid credentials resolve to the same stable principal across clients.
- [ ] Session credentials are unguessable and only their hashes are persisted.
- [ ] Server enforces 7-day inactivity and 30-day absolute expiry.
- [ ] Concurrent sessions across devices are allowed.
- [ ] Web credentials use HttpOnly/Secure cookies with an explicit SameSite policy; Android credentials use platform secure storage.
- [ ] Database/auth dependency failure denies protected access.

**Verification**
- [ ] PostgreSQL tests cover valid/invalid sessions, inactivity expiry and absolute expiry.
- [ ] Cookie attributes and Android secure-storage failure paths are tested.
- [ ] Cross-platform tests prove one account principal.

**Dependencies:** B1, A3, A4.  
**Files likely touched:** apps/api/src/modules/sessions/*, apps/api/migrations/*, apps/web auth client, apps/android auth client, tests.  
**Estimated scope:** Large; split API, Web and Android work.

### B4. Logout, rotation and revocation

**Description:** Implement current-session logout, logout-all, individual-session revocation service support and credential rotation at trust-boundary changes.

**Acceptance criteria**
- [ ] Logout immediately revokes the current session and clears/discards its client credential.
- [ ] Logout-all revokes all sessions for the principal.
- [ ] Superseded credentials cannot authorize requests.
- [ ] Individual-session revocation exists in the service without adding a detailed session-management screen.
- [ ] Revocation checks are server-authoritative.

**Verification**
- [ ] Replay tests cover current logout, logout-all and rotation.
- [ ] Concurrent requests cannot use stale session state to regain access.

**Dependencies:** B3.  
**Files likely touched:** session services/repositories/routes, Web and Android auth state, integration tests.  
**Estimated scope:** Medium.

### B5. Recovery and fresh-authentication boundaries

**Description:** Implement verified-email recovery, fake security notifications and fresh authentication for sensitive account-security actions.

**Acceptance criteria**
- [ ] Recovery uses a single-use, time-limited verified-email challenge.
- [ ] Successful recovery revokes existing sessions and emits a security notification through the fake delivery adapter.
- [ ] Unverified email is never used for recovery or security notifications.
- [ ] Fresh authentication is required before password/passkey changes, verified recovery-email changes and account deletion.
- [ ] Ordinary use does not trigger unnecessary repeated authentication.
- [ ] Expiry, resend, rate and notification retry policy values are not invented.

**Verification**
- [ ] Tests cover invalid/expired/consumed challenges, replay, revocation, notification failure and step-up authentication.
- [ ] No challenge/token is exposed in logs or URLs.

**Dependencies:** B2–B4.  
**Files likely touched:** recovery module, challenge migrations, notification port, Web/Android security settings, tests.  
**Estimated scope:** Large; split challenge, recovery, step-up and UI slices.

### B6. Entitlement, permission and owner-activation gates

**Description:** Implement server-owned authorization state and reusable fail-closed guards.

**Acceptance criteria**
- [ ] Pro entitlement and owner activation are independent gates.
- [ ] False, unknown, stale, revoked or unavailable state denies protected work.
- [ ] Client-supplied role/Pro/activation flags never authorize an operation.
- [ ] Revocation prevents new/queued work and stops follow-on provider calls from dispatched work where supported.

**Verification**
- [ ] PostgreSQL truth-table tests cover all gate combinations.
- [ ] Tampered client-state and revocation race tests pass.

**Dependencies:** A3, A4, B1.  
**Files likely touched:** authorization/entitlement modules, migrations, API guards, tests.  
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

**Description:** Add explicit user-selected file access for Web and Android and truthfully handle revoked/unreadable/unsupported inputs.

**Acceptance criteria**
- [ ] Analysis starts only after explicit user action.
- [ ] Original file is not modified.
- [ ] Permission loss, unreadable and unsupported files produce could-not-decide outcomes.
- [ ] File bytes never cross the backend/network boundary.

**Verification:** Web/Android adapter tests, permission-loss tests and network-boundary tests.  
**Dependencies:** A1, A4.  
**Likely files:** apps/web file adapter, apps/android platform adapter, shared domain tests.  
**Estimated scope:** Medium.

### C2. Analysis engine port and result mapping

**Description:** Define the platform-independent engine boundary and deterministic fake used only for tests.

**Acceptance criteria**
- [ ] Four result outcomes remain distinct.
- [ ] No-match is not described as safe.
- [ ] Engine failure never becomes a clean result.
- [ ] Fake engine is never activated as a production scanner.

**Verification:** Engine contract tests and mapping tests.  
**Dependencies:** A4.  
**Likely files:** packages/domain analysis port, apps/* adapters, tests.  
**Estimated scope:** Small/Medium.

### C3. Local analysis orchestration

**Description:** Orchestrate analysis lifecycle, cancellation where supported, interruption, retry and local-only processing.

**Acceptance criteria**
- [ ] File bytes are never uploaded or backend-persisted.
- [ ] Cancellation/interruption are represented only when observed.
- [ ] Inconclusive/failure remains distinct from no-known-threat.
- [ ] No default scan history or content persistence is introduced.

**Verification:** lifecycle, cancellation, interruption and network-boundary tests.  
**Dependencies:** C1, C2.  
**Likely files:** packages/domain, Web/Android local orchestration, tests.  
**Estimated scope:** Medium.

### C4. Analysis client surfaces

**Description:** Build the Web and Android file-selection and result experiences with honest engine-unavailable states.

**Acceptance criteria**
- [ ] Both clients present the same four outcome meanings.
- [ ] No fake result is shown as a real scan.
- [ ] Unsupported formats/capabilities are disclosed.
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
