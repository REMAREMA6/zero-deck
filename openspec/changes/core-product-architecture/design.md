# Design

## Context

See [proposal.md](proposal.md) for the motivation and scope. The architecture is based on the Product-Design Closure and Architecture Handoff, the five product contracts, the eight authentication owner decisions, the Phase 9 owner-decision register, the question-disposition register, and the Software Rules workspace.

The current repository contains planning material, not a first-party ZeroDeck runtime. There are no ZeroDeck runtime observations. The product contracts define intended behaviour but do not prove implementation conformance. Software Rules capture remains incomplete; unknown properties must remain unknown until evidence or an owner decision resolves them.

Authority is not uniform across the product material:

- Explicit owner decisions and the Phase 9 owner decision register are normative product policy.
- The five contracts are the canonical product requirements, but PM-proposed material is adopted only to the extent explicitly accepted or recorded as product-material requirements.
- Software Rules owner rules are owner-declared; product-material rules remain provisional where marked.
- Prior-art projects and platform/provider documentation are evidence for evaluating mechanisms, not automatic ZeroDeck requirements.
- The 49 deferred questions are not silently resolved by architecture.

The owner has explicitly selected PostgreSQL for the initial core build and real PostgreSQL-backed development/CI tests. Neon and Vercel belong to the later integration/deployment stage. The owner does not run local terminal commands; command execution, package installation and CI validation are performed through GitHub Actions.

## Goals / Non-Goals

**Goals:**

- One coherent architecture for the same ZeroDeck account identity across Web and Android.
- Keep file bytes and quarantine contents on the user's device by default.
- Make identity, authorization, entitlement and owner-activation decisions server-authoritative.
- Keep the MVP-03 provider boundary enforceable and testable without a production provider.
- Make the core independently buildable and testable against PostgreSQL without Neon, Vercel or live external credentials.
- Isolate platform-specific file access and storage behind explicit capability boundaries.
- Make security, privacy, failure behaviour, and evidence requirements visible in implementation tasks.
- Preserve portability and an uncomplicated later path to Neon and Vercel without coupling domain logic to either service.

**Non-Goals:**

- Adding or expanding product capabilities beyond the owner-approved MVP.
- Selecting a production malware engine, threat-intelligence feed, URL reputation provider, billing provider, or email delivery provider in this change.
- Introducing cloud file analysis, remote quarantine, arbitrary URL fetching, crawling, or unapproved redirect following.
- Building an admin portal, device privacy audit, scan-history feature, browser extension, automatic/background protection, or IP investigation.
- Defining legal conclusions, numeric abuse limits, retention durations, SLOs, RTO/RPO, or provider spend ceilings without evidence and required owner/specialist approval.
- Deploying to Neon or Vercel during the core build.
- Prescribing a frontend framework, backend framework, language, ORM, or scanner library where the owner has not selected one.

## Architecture at a glance

The recommended shape is a **modular monolith backend with two platform clients and explicit local capability adapters**.

- **Web client:** account and product UI, browser file-selection/access adapter, local analysis adapter where supported, and browser-local quarantine adapter only where its guarantees are demonstrated.
- **Android client:** account and product UI, Android file-access adapter, on-device analysis adapter, and app-private encrypted quarantine adapter.
- **Backend application:** one deployable application organized into bounded modules for identity/session, authorization and entitlements, owner activation, usage controls, URL-check orchestration, and minimal audit/operations.
- **PostgreSQL:** authoritative persistence for account identity, credential/session state, entitlement and activation state, usage-control records, and justified minimal operational/audit records.
- **Provider ports:** interfaces for email delivery, analysis-engine integration where applicable, and URL reputation lookup. During the core build, deterministic test adapters are used; no production provider is called.
- **CI:** GitHub Actions runs application checks, PostgreSQL-backed integration tests, and browser tests. Platform-specific Android tests run in a controlled CI environment.

The modular monolith is a starting topology, not a commitment to a microservice split. Modules must have clear ownership and interfaces so that later extraction is possible only if measured operational needs justify it.

## Decisions

### D1. One product identity, server-authoritative account state

Web and Android authenticate against the same account principal and backend identity boundary. The account principal is not the email address or password. Email/password is the launch sign-in method; phone and social sign-in are not required. Email changes use a verified process.

The backend owns account state, credential verification, recovery challenges, session issuance/revocation, entitlement state, owner activation state and protected-operation authorization. Clients may cache presentation state, but cached state never authorizes a protected operation.

**Rationale:** preserves the cross-platform identity invariant and prevents divergent authorization rules in the clients.

**Alternatives considered:** separate platform accounts (rejected: contradicts one product identity); client-authoritative entitlements (rejected: stale or tampered clients could bypass gates); third-party identity vendor (not selected: no owner/provider approval and it would introduce a deferred external dependency).

The eight approved authentication decisions remain exact: email/password; unverified account creation with restricted use of unverified email; optional MFA; verified-email single-use time-limited recovery; 7-day inactivity and 30-day absolute session limits; current-session logout and logout-all at launch; individual-session revocation supported by the service; fresh authentication before sensitive account changes/deletion. Exact challenge expiry, resend limits, rate thresholds, renewal cadence and deletion schedule remain unresolved.

### D2. Modular monolith for the initial backend

Keep backend modules in one deployable application and one PostgreSQL database for the core build. Define module contracts and prohibit clients from reaching around the backend authorization boundary. Avoid distributed services, queues and event infrastructure unless an accepted requirement or measured test demonstrates a need.

**Rationale:** lowest operational complexity for the initial product while preserving testable domain boundaries and a later extraction path.

**Alternatives considered:** microservices (rejected for initial scale and operational overhead); serverless-per-feature functions (deferred because it complicates shared authorization, local testability and later Vercel integration); client-only product (rejected because account identity and protected URL checks require an authoritative backend).

### D3. PostgreSQL first; hosted database later

Use PostgreSQL as the only relational database for core development and CI. Tests that exercise persistence must run against a real PostgreSQL service, not only mocks or an in-memory substitute. Keep SQL/data-access boundaries portable and avoid Neon-specific APIs or connection assumptions in domain modules.

Neon is deferred until the integration stage. At that point, validate migrations, connection behaviour, pooling compatibility, transaction semantics, backup/recovery and operational controls against the selected Neon configuration.

**Rationale:** directly follows the owner's database and sequencing decisions.

**Alternatives considered:** SQLite-only core (rejected: does not prove PostgreSQL behaviour); Neon from day one (rejected: violates the agreed integration sequence); vendor-specific database APIs (rejected: unnecessary lock-in).

### D4. File analysis is local-first and platform-adapted

File content is acquired through user-initiated platform file access and processed on-device by default. No file bytes are uploaded to the backend or a remote analysis provider in MVP-01. The analysis engine is behind a narrow adapter so that its choice, version, update source and platform packaging can be evaluated independently.

The result model preserves distinct outcomes: confirmed threat, suspicious, no known threat found, and could not decide/inconclusive. A no-known-threat result is not a safety guarantee. Unsupported, unreadable, encrypted, malformed, interrupted or engine-unavailable inputs must not be represented as clean.

Do not choose file formats, limits, engine, threat-intelligence source, fingerprint algorithm, confidence threshold or numeric resource budget in this design. Build a platform/engine evaluation spike and retain a deterministic fake engine for automated tests. A fingerprint is an integrity/content identity aid, never a safety verdict.

**Rationale:** preserves the no-cloud default while allowing the product to prove orchestration and error handling before committing to an engine.

**Alternatives considered:** remote scanning as the default (rejected: contradicts MVP-01 policy); direct engine calls from UI components (rejected: prevents independent testing and platform substitution); treating unsupported input as clean (rejected: unsafe and contradicts result semantics).

### D5. Quarantine is device-local, explicit, encrypted, and capability-scoped

Quarantine contents and their encryption keys remain on the user's device and are excluded from backend backups by default. Quarantine requires explicit user confirmation; automatic quarantine is not enabled in MVP. A verified quarantine copy must exist before the UI offers the separate choice to remove the original. The original is never removed automatically. Restoration requires a fresh analysis and explicit confirmation; integrity binding must be checked. Quarantined content is never executed.

Use platform-specific storage adapters. Android uses app-private storage and an established platform key-protection mechanism, with actual hardware-backed protection capability detected rather than assumed. Web quarantine is enabled only for operations whose browser storage, file permission, persistence, encryption and recovery guarantees have been demonstrated. If a browser cannot provide a promised operation, the client must disclose the limitation and deny that operation rather than imply device-wide isolation.

Do not select a cipher, key lifecycle, retention period, hash algorithm, storage capacity, backup policy for metadata, or secure-erasure claim here. Use established cryptographic libraries/mechanisms; no custom cryptography. Do not promise forensic irrecoverability.

**Rationale:** protects the user's file content while respecting materially different browser and Android storage models.

**Alternatives considered:** backend/cloud quarantine (rejected: contradicts local-only boundary); automatic source deletion (rejected: owner-approved policy requires confirmation); identical Web and Android guarantees (rejected: platform capabilities differ and remain to be proven).

### D6. URL checking is a server-side, fail-closed provider boundary

The client accepts only HTTP/HTTPS URL input. It obtains the required disclosure and explicit consent before URL-related information is sent to a provider. The backend is the only component allowed to dispatch a reputation lookup. It does not fetch the destination, crawl a site, probe arbitrary hosts, or follow arbitrary destination redirects.

Immediately before dispatch, the backend must positively establish both independent gates:
1. The account has active Pro entitlement.
2. The owner-controlled feature activation switch is enabled.

False, missing, stale, unavailable or unknown gate state denies the operation. Pro does not mean unlimited use. Per-account and global usage controls, a hard spend ceiling, monitoring and an emergency stop are release requirements; numeric values require evidence and owner approval.

The core build uses a deterministic fake provider adapter. The production provider remains unselected. Caching is off by default and can be enabled only if provider terms allow it and a defined freshness/expiry policy is approved. The backend stores neither submitted URLs nor full provider responses/check results by default. Logs and audit records exclude full URLs, credentials and sensitive query components.

If protected work is queued, the worker must re-check the authoritative gates immediately before dispatch. After revocation, queued/not-yet-dispatched work is denied. Already-dispatched work is cancelled where supported and must not initiate follow-on provider calls.

**Rationale:** centralizes provider secrets, gates, quotas and disclosure, while ensuring the owner-approved no-call invariant is enforceable.

**Alternatives considered:** direct client-to-provider calls (rejected: exposes credentials and weakens enforcement); destination fetch/proxy (rejected: outside product scope and creates SSRF risk); fail-open on entitlement/activation uncertainty (rejected: directly contradicts owner policy).

### D7. Persist only backend-owned data that needs server authority

PostgreSQL holds the minimum state needed for shared identity, authentication/session revocation, entitlements, owner activation, usage controls and justified minimal audit/operational records. File bytes, quarantine content and keys, submitted URLs, full provider responses and scan/check results are not persisted by default.

Data categories, field-level retention, audit access, backup expiry, deletion propagation and legal exceptions must be documented before release. Account deletion disables access and revokes sessions immediately; personal data follows a documented deletion schedule. Retained records require a legitimate purpose, reason and period. Backup and audit retention must not silently defeat account deletion.

**Rationale:** aligns storage with server authority and data-minimization policy.

**Alternatives considered:** persist all scan/check history (rejected: no approved purpose or retention policy); back up quarantine content (rejected: owner-approved exclusion); unbounded audit logs (rejected: privacy and retention conflict).

### D8. Test ports, not live services, during the core stage

Every external dependency is represented by an interface with deterministic test implementations. Core feature tests must not require a real email provider, billing system, malware feed, scanning SaaS, URL reputation provider, Neon database, Vercel deployment or live API credentials.

Use real PostgreSQL for repository/integration tests. Test authorization and dispatch using controlled entitlement/activation fixtures and a fake provider that records whether it was called. Test local file operations using platform-specific test fixtures and controlled file adapters. Use Playwright for browser-visible flows and responsive behaviour where applicable.

The Developer Agent owns implementation and continuous testing. Each task group lands its own tests and documentation. A separate Software Assurance Agent is reserved for later independent whole-platform assurance.

### D9. Platform differences are explicit architecture contracts

Web and Android share product identity, server authorization rules, result vocabulary and product-level policy. File access, quarantine storage, encryption/key protection, persistence, cancellation and background execution are platform adapters with independently tested capability matrices.

No unsupported browser permission persistence or Android hardware-backed key support is assumed. The product must disclose material differences. A platform operation is unavailable where its required guarantees cannot be established.

### D10. GitHub Actions is the execution environment

All package installation, OpenSpec commands, database setup, builds, tests, Playwright runs and validation execute in GitHub Actions. Workflows use least privilege and pinned/reviewed actions where practical. PostgreSQL is provisioned as a CI service for integration suites. Test reports, screenshots, traces and other useful evidence are retained as artifacts.

No local terminal instructions are assigned to the owner. Live credentials are not needed for core work and must not be invented or committed. Later integration credentials are supplied through GitHub Secrets or an owner-approved secret store.

## System boundaries and data ownership

| Boundary | Owns | Must not own |
|---|---|---|
| Web client | UI state, user consent capture, browser file handles and browser capability reporting | Authoritative Pro/activation decisions, provider secrets, remote file storage |
| Android client | UI state, Android URI permissions, local analysis orchestration, app-private quarantine | Authoritative Pro/activation decisions, provider secrets, remote file storage |
| Identity/session module | Account principal, password credential verification, recovery challenges, sessions and revocation | Product-specific file bytes or URL payloads |
| Authorization/entitlement module | Server-authoritative permission, Pro status, owner activation, quota/dispatch decisions | Client-trusted authorization claims |
| Analysis module/adapter | Scan orchestration, result mapping, progress/cancellation semantics | Cloud upload of file content in MVP |
| Quarantine adapter | Local encrypted content, integrity metadata, lifecycle operations | Backend backup of file content or keys |
| URL-check module | URL validation, disclosure/consent state, gate evaluation, quota check, provider dispatch and result mapping | Destination fetching, crawling, arbitrary redirects, default result persistence |
| PostgreSQL | Minimal authoritative account and operational state | File bytes, quarantine content/keys, raw URLs and full provider payloads |
| External provider adapters | Translate approved internal requests/responses | Policy decisions or bypassing backend gates |

## Core request flows

### Account sign-in and protected action

1. Client submits credentials over a protected transport.
2. Backend verifies the credential and issues a session with server-enforced inactivity and absolute expiry.
3. Each protected backend operation validates the session and current authoritative account/permission state.
4. Client state is presentation only; an expired, revoked, missing or unverifiable session denies the operation.
5. Recovery, password change, verified recovery-email change and deletion require fresh authentication according to the approved policy.

### Manual file analysis

1. User explicitly selects a file through the platform's supported file-access mechanism.
2. Client checks that the file is accessible and supported by the current tested capability matrix.
3. The platform adapter streams/reads bytes locally into the analysis adapter; it does not upload them.
4. Engine outcome maps to one of the approved distinct result classes.
5. Cancellation, process interruption, permission loss, read failure or engine failure produces an honest incomplete/unavailable outcome, never a clean result by default.
6. Any later retention of result metadata requires a documented purpose and policy; file content is not retained after active analysis by default.

### Quarantine and disposition

1. User chooses quarantine for an eligible item and explicitly confirms.
2. Client checks storage capacity and permission; content is copied into protected app-controlled local storage.
3. Client verifies the stored artifact against its integrity metadata before declaring quarantine successful.
4. Only after verified copy completion does the client ask separately whether the original should be removed.
5. If the user declines, the original remains. If removal is attempted and fails, the record reports failure and the original is not represented as removed.
6. Restore requires fresh analysis, explicit confirmation and integrity verification. Ineligible or inconclusive results block restoration.
7. Purge reports only what the platform confirms; no secure-erasure guarantee is made.

### Website/link check

1. Client validates HTTP/HTTPS syntax and presents the approved disclosure of information, purpose and recipient.
2. User explicitly consents to provider disclosure.
3. Backend validates session and positively checks active Pro entitlement and owner activation independently.
4. Backend applies approved account/global usage controls and emergency stop.
5. Immediately before provider dispatch, backend revalidates gates and cancellation state.
6. Fake provider is used in the core stage. Production provider integration is a later owner-approved stage.
7. Result mapping preserves confirmed match, no-known-match, suspicious/ambiguous and unavailable/inconclusive outcomes. No-match is not described as safe.
8. Raw URL and full provider payload are not persisted by default; diagnostics are redacted.

## Failure and security posture

- **Unknown authorization state:** deny protected work.
- **Session revocation:** immediately deny newly evaluated operations; block queued work; cancel dispatched work where supported; do not start follow-on provider requests.
- **Database unavailable:** fail closed for operations requiring authoritative account, entitlement, activation or quota state. Do not trust cached client state as fallback.
- **Provider unavailable/quota exceeded:** return unavailable/inconclusive; never imply a clean result.
- **Analysis engine unavailable or input inaccessible:** return could-not-decide/inconclusive; do not classify as clean.
- **Quarantine storage full, permission lost or integrity check failed:** do not claim success; preserve the original; report exact outcome.
- **Sensitive diagnostics:** exclude passwords, secrets, file contents, full URLs, credentials and sensitive URL query components.
- **Dependency compromise/update:** release process must verify provenance, support rollback and emergency withdrawal before production.
- **No arbitrary network destinations:** URL-check code may call only the configured provider endpoint through its adapter; it must not fetch user-supplied URLs.

Threat modelling must cover account takeover, session replay, stale entitlement, activation bypass, client tampering, malicious/malformed files, archive bombs/resource exhaustion, parser/engine compromise, quarantine escape, key loss, local storage loss, URL parser confusion, SSRF, provider credential exposure, quota/spend abuse, logging leakage, dependency compromise and deletion/backup retention conflicts.

## Risks / Trade-offs

- **[Browser file/quarantine guarantees differ by browser]** → Gate each operation behind a tested capability matrix; disable unsupported operations and disclose differences.
- **[No production analysis engine is selected]** → Build stable engine contracts and deterministic fakes first; block claims of detection quality or release readiness until representative corpus validation.
- **[No URL provider is selected]** → Build the server-side port and fake adapter; keep production dispatch disabled until provider review, consent copy, cost controls and owner activation.
- **[Modular monolith may need scaling later]** → Keep module boundaries explicit and measure before considering service extraction.
- **[PostgreSQL outages block protected actions]** → Fail closed; define operational recovery targets and verify recovery before launch.
- **[Device loss/uninstall may destroy quarantine content and keys]** → Warn users clearly; do not back up content/keys by default; test and document actual platform behaviour.
- **[Deferred numeric limits could cause resource or cost exposure]** → Keep release gates closed until representative performance, abuse and cost tests establish values and the owner approves required ceilings.
- **[Incomplete Software Rules capture]** → Maintain requirement/evidence traceability and preserve unknowns; do not claim replication completeness.

## Migration Plan

There is no existing ZeroDeck application runtime to migrate. Implementation proceeds in gated increments:

1. Establish repository/application scaffolding and PostgreSQL-backed CI.
2. Implement shared identity and authoritative authorization.
3. Implement platform file access and local analysis behind testable adapters.
4. Implement local quarantine and disposition behind platform capability checks.
5. Implement the gated URL-check orchestration with a fake provider only.
6. Complete cross-platform, security, performance, privacy and failure validation; resolve all release-blocking deferred questions.
7. Only after the core product is working and tested, prepare a separate architecture change for approved hosted integrations, including Neon and Vercel. That change must document configuration, data flows, secrets, failure behaviour, security, acceptance criteria and rollback before implementation.
8. Developer implements and tests those approved integrations; deploy and verify only after the owner authorizes that stage.

Rollback during core development is a normal code/database migration concern. Each database migration must have a documented safe rollback or forward-repair strategy; destructive production migration policy is a later operations decision. No production deployment is authorized by this change.

## Open Questions

The following remain intentionally open because their exact values do not change the selected boundaries, but they must be resolved before the affected capability is released:

- Exact email verification/recovery challenge expiry, resend limits, rate thresholds and session renewal cadence.
- Supported browser/Android versions and device capability matrix.
- Supported file types, file size/count/archive limits, encrypted-file handling and resource budgets.
- Analysis engine, threat-intelligence source, verdict thresholds, update trust and representative validation corpus.
- Quarantine cipher/key lifecycle, integrity identifier algorithm, retention period/start event, capacity, metadata backup and platform recovery details.
- URL parser/canonicalization details, provider choice/terms, URL length, timeouts, concurrency, quota/reset values, hard spend ceiling and alert thresholds.
- Data classification, audit fields/access/retention, backup expiry, deletion schedule/legal exceptions, RTO/RPO, availability targets, incident roles and support commitments.
- Launch jurisdictions and qualified legal/privacy review.
- Frontend/backend language and framework choices, selected by the Developer within these architecture boundaries and documented before implementation locks them in.

These questions are tracked in the architecture open-decision register and the relevant tasks. If investigation shows that an answer changes an owner-approved product policy or this architecture's boundaries, stop and return the issue to the Product Owner rather than silently changing the contract.
