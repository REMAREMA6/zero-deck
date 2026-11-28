# Outcome-Level Implementation Plans

> **Plan type:** Architect-authored, outcome-level implementation plans. These are goals and acceptance contracts, not Developer execution breakdowns or step-by-step coding tasks.
> **Execution status:** Planning only. All plans are unstarted. Implementation requires the owner's architecture approval and explicit authorization to the Developer Agent.
> **Decomposition ownership:** For each authorized plan, the Developer Agent—not the Architect—uses its planning-and-task-breakdown skill, inspects the repository, and creates its own small executable tasks, dependency graph, sequence and checkpoints. The Developer chooses the implementation method within the approved architecture.
>
> **Developer rule:** The Developer owns detailed task decomposition, engineering execution planning, implementation and continuous testing. Every delivered outcome must have verification evidence; there is no separate routine testing agent or final catch-all testing phase.
>
> **Source authority:** Use the five product contracts, Phase 9 owner-decision register, 64-question disposition register, authentication owner-decision record, Software Rules owner rules and open-properties register. Preserve each source's approval/evidence label. Do not treat every PM-proposed contract requirement as owner-approved.

## 1. Architecture baseline and requirement authority

- [ ] 1.1 Build a requirement-authority and traceability matrix for all five contracts, linking each applicable requirement to an architecture boundary/module, implementation work package, and verification evidence; verify that every contract requirement is either mapped, explicitly out of scope, or marked unresolved.
- [ ] 1.2 Reconcile the 15 resolved and 49 deferred Phase 9 question dispositions with the architecture open-decision register; verify that every deferred question has an owner/stage, a release gate where necessary, and no invented numeric value or vendor.
- [ ] 1.3 Record the architecture decision log, alternatives and evidence for the modular-monolith boundary, shared identity, PostgreSQL, local file processing, local quarantine, URL provider boundary and CI execution model; verify every decision cites its authority and limitations.
- [ ] 1.4 Establish the initial supported-platform investigation plan for Web and Android; verify that each unknown capability (file access, permissions, quarantine, key protection, cancellation and storage persistence) has a reproducible experiment and an evidence-record location.
- [ ] 1.5 Review the architecture baseline with the Product Owner; verify explicit disposition of any conflict that would alter product policy before implementation is authorized.

## 2. Core repository, backend boundary and PostgreSQL foundation

- [ ] 2.1 Create the minimum application workspace and module boundaries for the Web client, Android client, backend application, shared contracts and platform adapters; verify dependency direction prevents clients from bypassing backend authorization and local file boundaries.
- [ ] 2.2 Establish environment/configuration separation and safe startup validation; verify missing or invalid required configuration fails clearly and no secret is committed or exposed in client bundles.
- [ ] 2.3 Establish PostgreSQL schema ownership, migration workflow and data-access boundaries for account/session, entitlement/activation, usage control and minimal operational records; verify a fresh database can migrate up and the documented rollback/forward-repair path is tested.
- [ ] 2.4 Configure GitHub Actions for repeatable package installation, lint/type/static checks and real PostgreSQL-backed integration tests; verify the workflow starts from a clean checkout and fails on a deliberately failing check.
- [ ] 2.5 Add deterministic test adapters and test fixtures for external boundaries; verify core tests run without Neon, Vercel, email delivery, billing, malware feeds, URL reputation services or live credentials.
- [ ] 2.6 Document module contracts, local development through the approved CI workflow, test commands and environment variables; verify another Developer can reproduce the core checks using the documentation without owner-side terminal work.

## 3. Shared identity, authentication and authorization

- [ ] 3.1 Implement the stable account principal and email/password launch flow, preserving account identity separately from credentials; verify the eight approved authentication decisions and only those approved decisions are treated as policy.
- [ ] 3.2 Implement password credential protection, verification state and verified-email change/recovery boundaries; verify unverified email cannot be used for recovery/security notifications and no extra feature gate is inferred.
- [ ] 3.3 Implement single-use, time-limited verified-email recovery challenges and security notification through a test delivery adapter; verify expiry, replay, consumption and delivery failure paths without sending real email.
- [ ] 3.4 Implement server-enforced 7-day inactivity and 30-day absolute session expiry, secure credential rotation, current-session logout, logout-all and service support for individual-session revocation; verify expiry and revocation across both clients.
- [ ] 3.5 Implement fresh-authentication checks for password/passkey changes, verified recovery-email changes and account deletion; verify ordinary use does not trigger unnecessary repeated authentication.
- [ ] 3.6 Implement authoritative permission/entitlement/owner-activation evaluation as independent server-side gates; verify missing, stale, false or unavailable state denies protected operations.
- [ ] 3.7 Implement the shared revocation invariant for newly evaluated and queued work, with cancellation of dispatched work where supported and no follow-on provider calls; verify race cases using deterministic concurrent tests.
- [ ] 3.8 Implement user-initiated account deletion with immediate access disablement and session revocation; verify personal-data deletion/retention behaviour follows the approved documented schedule and justified retained records include reason and period.
- [ ] 3.9 Add authentication/authorization abuse, failure, cross-platform and security tests alongside the implementation; verify account enumeration, credential exposure, replay, stale-client state and database outage cases are handled according to approved policy and documented unresolved thresholds.

## 4. MVP-01 — manual file security analysis

- [ ] 4.1 Implement platform file-selection/access adapters for the initially supported Web and Android environments; verify explicit user initiation, permission loss, revoked handles/URIs, unreadable files and unsupported inputs are handled truthfully.
- [ ] 4.2 Define and test the analysis-engine adapter and canonical result mapping using a deterministic fake engine; verify confirmed threat, suspicious, no-known-threat and could-not-decide outcomes remain distinct and no-match is never presented as proof of safety.
- [ ] 4.3 Run an evidence-led engine and threat-intelligence evaluation covering detection quality, licensing, redistribution, update trust, privacy, supported platforms, resource use and cost; verify the comparison is recorded and obtain owner approval before selecting a production engine/source.
- [ ] 4.4 Implement local analysis orchestration, progress only where meaningful, cancellation, retry and interrupted/inconclusive states; verify selected file bytes never cross the backend/network boundary and failure never becomes a clean verdict.
- [ ] 4.5 Implement safe parsing/resource isolation and bounded processing only after supported formats and budgets are established; verify malformed inputs, archive/resource exhaustion and engine failure cannot execute the selected file or corrupt unrelated data.
- [ ] 4.6 Add platform-specific unit/integration tests and a documented support matrix for the selected file types, sizes, browser/OS versions and engine/data freshness; verify every published capability is supported by reproducible test evidence.
- [ ] 4.7 Verify scan-result and diagnostic data minimization; verify file content is not retained after active analysis by default and diagnostics contain no file content or secrets.

## 5. MVP-02 — quarantine and file disposition

- [ ] 5.1 Complete platform feasibility experiments for Web and Android quarantine storage, permissions, persistence, uninstall/data-clear behaviour and restore destinations; verify unsupported operations are disabled and capability differences are documented.
- [ ] 5.2 Resolve and record the quarantine cryptographic/key lifecycle, integrity identifier, retention start/period, capacity and metadata backup decisions with required security evidence and owner/legal approval; verify no implementation relies on an assumed algorithm, duration or recovery guarantee.
- [ ] 5.3 Implement the Android app-private encrypted quarantine adapter using established platform/library mechanisms; verify key-unavailable, permission-loss, disk-full, process-death and device capability cases fail safely without losing the source.
- [ ] 5.4 Implement Web quarantine only for browser capabilities proven by the approved feasibility matrix; verify no device-wide isolation, permission persistence or secure-erasure guarantee is claimed beyond observed behaviour.
- [ ] 5.5 Implement explicit confirmation, eligibility, verified-copy-before-source-disposition and separate source-removal confirmation; verify the original is never automatically deleted and remains intact after copy/integrity failure.
- [ ] 5.6 Implement restore eligibility, fresh analysis, explicit confirmation, integrity verification and no-overwrite behaviour; verify threat, suspicious, inconclusive, stale or unavailable analysis blocks restore and failure preserves accurate quarantine state.
- [ ] 5.7 Implement manual purge, expiry handling and minimal lifecycle records according to the owner-approved retention policy; verify deletion reports only provider/platform-confirmed outcomes and never promises secure or forensic erasure.
- [ ] 5.8 Add idempotency, concurrency, interruption/recovery and storage-exhaustion tests with platform-specific evidence; verify repeated or interrupted operations cannot silently duplicate, overwrite or lose user data.

## 6. MVP-03 — website and link checking

- [ ] 6.1 Implement HTTP/HTTPS-only URL input validation and the approved disclosure/explicit-consent interaction; verify unsupported schemes are rejected and no provider adapter can be invoked before consent.
- [ ] 6.2 Implement the server-side provider port and deterministic fake provider; verify only the provider adapter can dispatch a lookup and the application never fetches the submitted destination, crawls or follows arbitrary redirects.
- [ ] 6.3 Implement independent Pro-entitlement and owner-activation gates with fail-closed semantics; verify a truth table covering true/false/unknown/unavailable states and that neither gate can substitute for the other.
- [ ] 6.4 Implement dispatch-time revalidation, cancellation/revocation handling, per-account/global usage-control hooks and emergency-stop behaviour; verify queued work is denied after revocation and dispatched work cannot initiate follow-on calls.
- [ ] 6.5 Evaluate production providers against accuracy, categories, terms, geography, data processing, retention, availability, quota, pricing, spend ceiling, cancellation and exit options; verify no provider is selected or activated without owner approval.
- [ ] 6.6 Resolve URL normalization, length, timeout, response-size, concurrency, quota/reset, caching/freshness and spend values from provider contracts and representative tests; verify the final values and hard spend ceiling are owner-approved before production dispatch.
- [ ] 6.7 Implement result mapping, outage/inconclusive behaviour and safe user explanations; verify no-known-match is not described as safe and provider failure is not mapped to a clean result.
- [ ] 6.8 Implement minimal audit/diagnostic redaction and default non-persistence of submitted URLs, full provider responses and check results; verify secrets, credentials and sensitive URL components do not appear in logs, traces or database records.
- [ ] 6.9 Add adversarial URL/parser, consent, gate-race, quota, cancellation, provider-failure and abuse tests using the fake provider; verify the fake records zero calls for every denied case.

## 7. Cross-platform verification and core-stage exit

- [ ] 7.1 Build a Web/Android capability and compatibility matrix from executed tests; verify each advertised capability and difference links to evidence for the tested browser/OS/device/build.
- [ ] 7.2 Complete end-to-end Playwright coverage for browser-visible identity, analysis, quarantine capability states and URL-check gating; verify visible UI state, navigation, failure states and responsive behaviour at the agreed viewport classes.
- [ ] 7.3 Complete Android end-to-end/instrumentation coverage for account, file access, local analysis and quarantine lifecycle; verify permission revocation, process interruption and local-data boundaries on representative devices/emulators.
- [ ] 7.4 Run security, privacy, performance, resource, recovery and cost validation against the approved threat model and representative workloads; verify each release gate has evidence and unresolved high-risk findings are explicitly blocked or accepted by the proper authority.
- [ ] 7.5 Verify backup/restore, account deletion propagation, audit/diagnostic retention, migration recovery and operational runbooks for backend-managed data; verify user file bytes and quarantine content/keys are excluded from backend backups by default.
- [ ] 7.6 Produce the Developer core-stage completion report with test runs, evidence links, known limitations, open risks and architecture questions; verify all core tasks are complete and the product can be exercised without live hosted integrations.
- [ ] 7.7 Obtain owner review of core-stage evidence before starting any hosted integration work; verify Neon, Vercel and production providers remain unused until a separate integration architecture change is approved.

## Workflow follow-up

- Archive this OpenSpec change only after architecture review and owner approval are complete and the task plan is accepted.
- After the core product is implemented and tested, create a separate OpenSpec change for approved hosted integrations; do not expand this change to include Neon, Vercel or live provider deployment.


## Plan interpretation and Developer-owned breakdown

The numbered entries above are the Architect's implementation plans. Each entry defines an outcome, boundaries and acceptance expectations. They are deliberately not decomposed into session-sized coding tasks.

When the owner authorizes implementation, the Developer Agent selects an outcome-level plan, studies its requirements and current repository state, and performs the detailed breakdown using the installed `planning-and-task-breakdown` skill. That Developer-owned breakdown must identify implementable slices, dependencies, order, checkpoints and tests. The Developer determines the concrete engineering approach without changing the approved outcome or architecture.

The Architect must not expand this document into a step-by-step Developer work queue. If implementation evidence reveals an architectural gap, the Developer reports it and the Architect updates the architecture or relevant outcome-level plan.
