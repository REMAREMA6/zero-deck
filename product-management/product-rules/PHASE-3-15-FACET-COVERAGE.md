# Phase 3 — Authentication coverage across all 15 Software Rules facets

**Project:** ZeroDeck  
**Workstream:** PM-authored product rules  
**Author:** ZeroDeck Product Management Agent  
**Status:** Completed as a PM assessment; contract remains a PM-proposed draft  
**Assessment date:** 2026-11-28  
**Compatibility baseline:** `REMAREMA6/software-rules` commit `5591a2e62287afc29bde002369eaf659673ec59b`  
**Specification:** 0.3.0 Draft; schema 0.2.0 Draft; JSON Schema Draft 2020-12  
**Input contract:** `ZD-CONTRACT-AUTH` v`0.1.0-draft`, source revision `db93a19fcbd4d7197be852a0cadd395c9af5a977`, SHA-256 `9f6759de0dd81f4d7d3a5e9af0b2c5ee148cfb895ebc3492770f1ce698a679a2`

## 1. Purpose and interpretation

This assessment answers a narrow question: **does the current PM-proposed identity/authentication contract account for the authentication-related properties that may matter across the 15 Software Rules observation facets?**

A facet is an observation perspective, not a code module or architecture boundary. One authentication flow can legitimately create linked observations in several facets. The 15-facet catalogue does not imply that every facet, or every property class within it, is applicable to every product or capability.

The labels below describe **contract coverage**, not implementation status:

- **Required — covered:** an existing PM-proposed requirement and acceptance criterion express the property.
- **Required — partial:** an existing requirement covers part of the property, but a named gap remains.
- **Deferred:** the property is relevant but depends on a later product contract, architecture, operational policy or measurable target.
- **Unresolved:** an owner decision or missing product evidence materially affects the requirement.
- **Not applicable to this authentication contract:** the property class is outside the declared authentication scope. This does not mean the facet is irrelevant to ZeroDeck overall.

No row claims runtime observation, source-to-replica conformance, production implementation, or owner approval.

## 2. Facet-by-facet matrix

| # | Official facet | Authentication-relevant property classes and contract mapping | Classification and rationale |
|---:|---|---|---|
| 1 | **Interface** | Authentication/recovery feedback and user-visible input constraints: `ZD-AUTH-006`, `ZD-AUTH-008`, `ZD-AUTH-018`, `ZD-AUTH-020`. Password acceptance rules apply only if password authentication is selected. Error responses must avoid account enumeration and secret disclosure. | **Required — partial.** The contract defines observable content/security outcomes but not screen hierarchy, exact copy, accessibility tree, responsive layout, focus states, visual states, or platform-specific interaction. Those are not authentication-contract deliverables and belong in the interface/feature contracts. Password-specific UI remains **unresolved** until sign-in method is chosen. |
| 2 | **Behaviour** | Triggers, preconditions, transitions, outputs and side effects across account creation, credential changes, authentication, session issue/rotation/expiry/revocation/logout, recovery and dependency failure: `ZD-AUTH-001`–`ZD-AUTH-021`. Repeated logout is explicitly safe in `ZD-AUTH-013`; replay after rotation/revocation is covered by `ZD-AUTH-010`, `012`, `020`, `021`. | **Required — partial.** The lifecycle is broadly represented. Concurrency/races, interruption between multi-record updates, repeated recovery initiation, refresh-token rotation and idempotency beyond logout are not fully specified. Session renewal policy is **unresolved** under `ZD-Q-AUTH-005`; cross-record atomicity is a proposed addition in the recommendations. |
| 3 | **Business rules** | Access eligibility versus identity is explicitly separated. Current server-side authorization and the Pro + owner-controlled activation gate map to `ZD-AUTH-016`; account-level consistency across platforms maps to `ZD-AUTH-017`. | **Required — partial.** Authentication must not grant Pro or link-check access. The link-check entitlement/activation decision, precedence, revocation propagation bound and provider-call gate belong to the later MVP-03 and cross-cutting contracts. Pricing, discounts, promotion, tax and other domain calculations are **not applicable** to this authentication contract. |
| 4 | **Data** | Stable principal and uniqueness: `ZD-AUTH-001`, `002`; principal/credential separation: `003`; protected verifier representation and secret minimization: `005`, `019`; Android-held credential handling: `015`; cross-platform principal and recovery challenge state: `017`, `020`. | **Required — partial.** Core identity and secret constraints are covered. The exact identifier, canonicalization, credential types, recovery data shape, account lifecycle/deletion, null/missing semantics, schema evolution and serialization details remain unresolved or deferred. The contract intentionally does not prescribe a schema. |
| 5 | **Persistence** | Stable principal and unique identifier constraints: `ZD-AUTH-001`, `002`; credential verifier storage: `005`; server-side session state/revocation: `009`, `012`, `013`; Android protected credential persistence: `015`; recovery challenge one-time use: `020`; session invalidation after credential replacement: `021`. | **Required — partial.** The durable-state outcomes are stated, but transaction atomicity, concurrent recovery/credential changes, crash interruption, multi-instance consistency, database outage semantics, migrations, retention and deletion are not fully specified. Atomic state transition behaviour is a proposed addition. Account deletion/retention is **unresolved** under `ZD-Q-AUTH-007`. |
| 6 | **API** | Trusted credential verification and protected-operation boundary: `ZD-AUTH-004`; abuse controls and enumeration-safe responses: `007`, `008`; session issue/rotation/expiry/revocation/logout: `009`–`013`; web CSRF and cookie requirements: `014`; server-side authorization and cross-platform identity: `016`, `017`; dependency failure and secret minimization: `018`, `019`; recovery: `020`, `021`. | **Required — partial.** The product-level request/response outcomes are represented. Exact endpoint inventory, HTTP status/error taxonomy, request schemas, header/cookie transport details, idempotency keys, pagination (not expected for this contract), API versioning and numeric rate limits are not specified. Concrete API design is deferred to architecture/feature contracts. |
| 7 | **Messaging** | No asynchronous authentication message channel is selected. Email/SMS verification, recovery delivery, notifications and asynchronous revocation propagation would create messaging concerns if selected. `ZD-AUTH-020` requires a one-time, time-bounded challenge or equivalent, but deliberately does not select a delivery channel. | **Not applicable to the current contract; conditional/deferred.** No email/SMS, event broker, notification queue or asynchronous delivery behaviour is assumed. If the owner selects an out-of-band challenge or asynchronous security notification, delivery, duplication, ordering, expiry, acknowledgement and failure handling must be specified in a later contract. |
| 8 | **Identity and authentication** | Principal establishment, credential verification, credential storage, authentication abuse, enumeration, session issue/rotation/expiry/revocation/logout, web/Android credential handling, dependency failures, recovery and credential replacement: `ZD-AUTH-001`–`015`, `017`–`021`. | **Required — partial.** This is the primary facet and the 21 requirements give it broad proposed coverage. The sign-in identifier/method, verification channel, MFA/passkey launch policy, session renewal/durations/concurrency, recovery channel and assurance/step-up policy remain **unresolved** in `ZD-Q-AUTH-001`–`008`. The upstream corpus's JOSE JWT and Express session cases are bounded evidence only; they do not establish ZeroDeck implementation or full facet coverage. |
| 9 | **Authorization and permissions** | Trusted principal resolution and authorization independent of client state: `ZD-AUTH-004`, `016`; consistent account-level state across web/Android: `017`; recovery/session trust changes: `020`, `021`. | **Required — partial.** The core authentication/authorization separation and server-side decision are covered. Full role/capability matrix, resource/action/property-level authorization, tenant isolation, policy precedence, administrative roles, cache invalidation and enforcement consistency across future services remain deferred to the authorization and feature contracts. |
| 10 | **Security controls** | Trusted verification, secret storage, password policy (conditional), throttling, enumeration resistance, session credential integrity/lifecycle, CSRF/cookie controls, Android protected storage, server-side authorization, dependency fail-closed, secret minimization and recovery: `ZD-AUTH-004`–`021`. | **Required — partial.** The contract contains broad controls. Exact TLS deployment policy, key/secret rotation, security event/audit policy, numeric abuse thresholds, CSRF mechanism, deployment hardening and security monitoring are not fully defined. Some are architecture/operations work; others depend on unresolved authentication choices. No penetration test or control effectiveness is claimed. |
| 11 | **Background processing** | No authentication worker, scheduled task, queue or deferred execution mechanism is selected. Expiry and revocation must be enforced when protected operations are evaluated; they must not depend solely on a cleanup worker. | **Not applicable to the current contract; conditional/deferred.** Background cleanup, asynchronous notifications, risk review or revocation fan-out may become relevant later. If introduced, job scheduling, retries, duplicate handling, cancellation, shutdown and terminal states require their own requirements. |
| 12 | **Errors and recovery** | Invalid/untrusted dependency state and fail-closed response: `ZD-AUTH-018`; throttling outcomes: `007`; enumeration-safe errors: `008`, `020`; expiry/revocation/logout: `010`–`013`; Android key invalidation: `015`; secret-safe diagnostics: `019`; challenge replay/expiry/tampering and authenticator recovery: `020`; session revocation after replacement: `021`. | **Required — partial.** Important failure and recovery outcomes are present. A complete error taxonomy, transient/permanent classification, retry policy, recovery-channel failure, provider/database-specific outage behaviour, partial-write compensation and user-support escalation are not defined. Recovery method remains **unresolved**. |
| 13 | **Integrations** | Required authentication/account dependency failure is addressed by `ZD-AUTH-018`; protected account-state checks and server-side entitlement/activation are addressed by `ZD-AUTH-016`. | **Required — partial / architecture-dependent.** The contract does not assume an external identity provider; the owner prefers first-party authentication. Neon is a preferred managed database, not a final approved integration architecture. Email/SMS, anti-abuse, telemetry, payment/entitlement and other provider boundaries remain unselected. Protocol, credentials, TLS, timeout, retry, circuit-breaker and provider-version details are deferred. |
| 14 | **Configuration** | Server-enforced abuse controls and configurable threshold: `ZD-AUTH-007`; idle/absolute session expiry: `ZD-AUTH-011`; web cookie/CSRF policy: `ZD-AUTH-014`; supported Android protected-storage behaviour: `ZD-AUTH-015`. | **Required — partial.** The contract identifies settings that must govern behaviour, but not their numeric values, precedence, source, validation, reload behaviour, environment separation or secret-manager lifecycle. Session durations and throttling values are **unresolved** or deferred; architecture-specific configuration rules belong in Phase 7. |
| 15 | **Performance and resource behaviour** | Authentication, session lookup, recovery and throttling are operations with measurable latency, throughput and resource use, but the current contract sets no numerical service target or workload. | **Deferred.** No performance target, capacity, concurrency, saturation, cold/warm workload or latency distribution can be justified from current product evidence. Define targets when launch scale, hosting and service boundaries are known. Do not infer performance from passing functional criteria. |

## 3. Requirement-to-facet traceability

The structured contract declares the following facet references. This table preserves that mapping and adds the assessment status:

| Requirement | Declared facets |
|---|---|
| ZD-AUTH-001 | identity-authentication, data, persistence |
| ZD-AUTH-002 | identity-authentication, data, persistence, errors-recovery |
| ZD-AUTH-003 | identity-authentication, data, persistence |
| ZD-AUTH-004 | identity-authentication, api, security-controls, authorization-permissions |
| ZD-AUTH-005 | identity-authentication, security-controls, data, persistence |
| ZD-AUTH-006 | identity-authentication, interface, security-controls, errors-recovery |
| ZD-AUTH-007 | identity-authentication, security-controls, api, errors-recovery, configuration |
| ZD-AUTH-008 | identity-authentication, interface, api, security-controls, errors-recovery |
| ZD-AUTH-009 | identity-authentication, security-controls, api, persistence |
| ZD-AUTH-010 | identity-authentication, security-controls, api, errors-recovery |
| ZD-AUTH-011 | identity-authentication, security-controls, configuration, errors-recovery |
| ZD-AUTH-012 | identity-authentication, security-controls, api, persistence, errors-recovery |
| ZD-AUTH-013 | identity-authentication, security-controls, api, errors-recovery |
| ZD-AUTH-014 | identity-authentication, security-controls, api, configuration |
| ZD-AUTH-015 | identity-authentication, security-controls, data, persistence |
| ZD-AUTH-016 | authorization-permissions, identity-authentication, api, security-controls, business-rules |
| ZD-AUTH-017 | identity-authentication, authorization-permissions, api, data |
| ZD-AUTH-018 | identity-authentication, api, integrations, errors-recovery, security-controls |
| ZD-AUTH-019 | identity-authentication, security-controls, api, data |
| ZD-AUTH-020 | identity-authentication, security-controls, api, errors-recovery, data |
| ZD-AUTH-021 | identity-authentication, security-controls, errors-recovery, persistence |

All 21 requirements are scoped to web and Android except `ZD-AUTH-014` (web only) and `ZD-AUTH-015` (Android only). This is intentional platform-specificity, not a parity defect.

## 4. Gaps classified

### Required — covered or partially covered

- A stable principal distinct from credentials, devices and sessions.
- Trusted service-side authentication and authorization; no trust in client-set role, Pro or activation flags.
- Secret minimization and protected storage for the credential types/platforms actually selected.
- Session issuance, trust-boundary rotation, inactivity and absolute expiry, revocation and logout.
- Recovery challenge one-time use and invalid/expired/replayed challenge rejection.
- Safe handling of dependency failures and credential replacement.
- One account identity across web and Android, with platform-specific session credentials allowed.

### Deferred

- Endpoint inventory, exact API error taxonomy/status mapping and API versioning.
- Full authorization policy matrix and per-resource/per-action coverage.
- Database transaction/concurrency/crash semantics and multi-instance consistency.
- Configuration precedence, runtime reload and secret-manager operations.
- Authentication performance targets and workload baselines.
- Any asynchronous messaging or background processing introduced by a later design.
- Operational audit/monitoring and incident-response detail, to be handled in cross-cutting system requirements.

### Unresolved owner decisions

The eight existing open questions remain open and are not answered by this assessment:

1. `ZD-Q-AUTH-001` — account identifier(s) and sign-in method.
2. `ZD-Q-AUTH-002` — email/phone verification and when it is required.
3. `ZD-Q-AUTH-003` — MFA/passkey launch policy.
4. `ZD-Q-AUTH-004` — recovery mechanism and channel.
5. `ZD-Q-AUTH-005` — idle/absolute session durations, renewal and concurrency.
6. `ZD-Q-AUTH-006` — user-visible session/device management and per-session revocation.
7. `ZD-Q-AUTH-007` — account closure/deletion and retention.
8. `ZD-Q-AUTH-008` — assurance level and step-up events.

### Not applicable to this authentication contract

- UI geometry/assets/animation and complete screen replication; these are not authentication requirements in this phase.
- Domain pricing, tax, discounts and promotion calculations.
- Message broker semantics and worker lifecycle, because no asynchronous auth messaging or worker is selected.
- Non-authentication feature-specific data and persistence properties.

N/A is scoped to this contract, not to ZeroDeck as a whole.

## 5. PM-proposed contract additions for owner review

These are recommendations only. They are **not inserted into the Phase 2 canonical contract or its structured projection**, so the existing 21-statement/46-criterion parity and artifact digest remain unchanged. Their machine-readable metadata and acceptance-criterion IDs are recorded in [the structured proposal](proposals/PHASE-3-AUTHENTICATION-COVERAGE-ADDITIONS.json). The next proposed contract revision is `0.2.0-draft` if the owner accepts any addition. If accepted, all statements and metadata should be added together in a versioned contract revision and revalidated.

### Candidate ZD-AUTH-022 — Reject invalid authenticators without creating a session

- **Normative kind:** required
- **Priority:** P0
- **Decision status:** PM-proposed
- **Facets:** identity-authentication, api, security-controls, errors-recovery
- **Platforms:** web, android
- **Basis:** PM inference; NIST SP 800-63B-4; OWASP Authentication Cheat Sheet.
- **Rationale:** `ZD-AUTH-004` requires trusted verification and tests fabricated client state, but its acceptance criteria do not explicitly exercise a real but incorrect/invalid authenticator. This leaves a testability gap at the core authentication boundary.
- **Acceptance criteria:**
  1. `ZD-AUTH-022-AC-01` — Given an account identifier and an invalid or incorrect authenticator, when an authentication attempt is evaluated, then no authenticated session is issued and protected operations remain denied.
  2. `ZD-AUTH-022-AC-02` — Given an invalid authenticator for an existing identifier and an unknown identifier, when equivalent unauthenticated attempts are made, then the externally observable response does not reveal account existence.
- **Verification:** automated-test and manual-test.

### Candidate ZD-AUTH-023 — Preserve atomic trust state during credential replacement and session revocation

- **Normative kind:** required
- **Priority:** P0
- **Decision status:** PM-proposed
- **Facets:** identity-authentication, persistence, errors-recovery, security-controls
- **Platforms:** web, android
- **Basis:** PM inference; OWASP Session Management and Forgot Password Cheat Sheets; Software Rules persistence property inventory.
- **Rationale:** `ZD-AUTH-020` and `021` describe recovery and session revocation outcomes, but no acceptance criterion covers interruption or partial persistence between credential replacement and the required session revocation. A partial write could leave an old compromised session authoritative.
- **Acceptance criteria:**
  1. Given a credential replacement that requires session revocation, when the state transition is interrupted at any persistence boundary, then the system does not expose a state in which the replaced/compromised credential or a session required to be revoked remains authorized.
  2. Given the transition is retried after an interruption, when the trusted service evaluates the account and its sessions, then the result is a consistent completed or safely recoverable state and no revoked credential is re-authorized.
- **Verification:** automated-test, operational-test and inspection.

### Candidate ZD-AUTH-024 — Rotate renewable session credentials when renewal is supported

- **Normative kind:** conditional
- **Priority:** P1
- **Decision status:** PM-proposed
- **Condition:** only if the selected session design supports renewal using a refresh or renewal credential.
- **Facets:** identity-authentication, api, security-controls, persistence, errors-recovery
- **Platforms:** web, android
- **Basis:** PM inference; OWASP Session Management Cheat Sheet; unresolved `ZD-Q-AUTH-005`.
- **Rationale:** `ZD-AUTH-010` covers rotation at authentication and security-sensitive boundaries, but does not explicitly define renewal-credential rotation and replay handling.
- **Acceptance criteria:**
  1. `ZD-AUTH-024-AC-01` — Given a renewable session, when a valid renewal credential is used, then the service issues the next credential according to the documented policy and rejects the superseded renewal credential.
  2. `ZD-AUTH-024-AC-02` — Given a renewal credential is replayed or reused concurrently, when the service detects the reuse, then it does not silently create additional valid sessions and applies the documented revocation/recovery response.
- **Verification:** automated-test and operational-test.

These candidates are not evidence that the implementation is defective; no implementation was tested. They identify product-contract coverage gaps.

## 6. Cross-facet consistency findings

1. **Identity vs authorization:** `ZD-AUTH-004` establishes trusted identity; `ZD-AUTH-016` makes authorization a separate server-side decision. Keep them separate. A valid principal is not a permission grant.
2. **Authorization vs business rules:** `ZD-AUTH-016` references Pro entitlement and owner-controlled activation. Those are business eligibility gates, not authentication factors or roles. The later MVP-03 contract must define both gates and ensure no provider request occurs if either is false.
3. **Session lifecycle vs persistence:** `ZD-AUTH-009`, `012`, `013` and `021` require revocable state. The contract does not yet guarantee atomicity during multi-record credential/session changes; candidate `ZD-AUTH-023` addresses this.
4. **Recovery vs security controls:** `ZD-AUTH-020` requires one-time, time-bounded proof and `021` requires session revocation after replacement. Recovery-channel choice remains open; do not assume email/SMS.
5. **Web vs Android:** `ZD-AUTH-014` is web-specific (cookie/CSRF); `ZD-AUTH-015` is Android-specific (protected local storage). Shared principal and authorization state are maintained by `001` and `017`. This is compatible platform variation, not a requirement to use identical session mechanisms.
6. **Account state vs entitlement:** `ZD-AUTH-016` requires current trusted state but its propagation bound is not numeric. MVP-03 must define the bound and fail-closed behaviour in its own contract.
7. **API/configuration/errors:** `007`, `011`, `014`, `018` require configured thresholds, expiry, cookie/CSRF policy and safe dependency failures. The values and precedence remain deferred; a configuration default must not silently disable a security gate.
8. **Messaging/background processing:** no channel or worker is currently selected. If a later recovery design introduces asynchronous delivery, its delivery failures and duplicate/replay semantics must be traced back to the recovery requirement.

## 7. Bounded conclusion

The 21-requirement authentication draft has **meaningful proposed coverage across 10 directly applicable facets**, conditional/deferred relevance in messaging and background processing, and deferred performance work. It does not establish completeness of any Software Rules facet, nor does it claim all 15 facets are required for authentication.

Three explicit contract gaps are recommended for owner review: invalid-authenticator denial, atomic credential/session trust-state transition, and renewable-session credential rotation if renewal is selected. Eight owner questions remain open. The contract remains a PM-proposed draft, not an approved product decision or implementation conformance result.
