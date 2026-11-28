# ZeroDeck — Cross-Cutting System Requirements

**Contract ID:** `ZD-CONTRACT-CROSS-CUTTING-SYSTEM`  
**Version:** `0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent  
**Lifecycle:** Draft; all 28 requirements are PM-proposed, not owner-approved  
**Capability:** Cross-cutting product and supporting-system requirements  
**Platforms:** Web and Android; shared product identity with platform-specific capabilities permitted  
**Canonical source:** This Markdown document; the JSON is its synchronized structured projection.

## 1. Purpose and boundary

This contract defines shared product/system outcomes spanning authentication and multiple ZeroDeck MVP capabilities. It is technology-independent. It specifies observable obligations, not architecture, infrastructure, implementation, runtime capture, or proof of conformance.

It complements rather than replaces the Identity and Authentication, MVP-01 Manual File Security Analysis, MVP-02 Quarantine and File Disposition, and MVP-03 Website and Link Checking contracts. Capability-specific policies remain in their owning contracts.

## 2. Authority and evidence labels

- **Owner-declared:** one ZeroDeck product identity across web and Android; platform-specific capability differences are allowed; MVP scope is manual file analysis, quarantine/disposition, and website/link checking; MVP-03 requires independent active Pro and owner-controlled activation gates and no provider/API call unless both pass; first-party auth/backend is preferred; Neon is the preferred managed database; mature security libraries are preferred over custom cryptography.
- **Owner-approved authentication decisions:** `ZD-DEC-AUTH-2026-11-28` records eight accepted policy choices. They do not approve unrelated PM requirements or implementation architecture.
- **Existing contract requirements:** capability-specific requirements and open questions remain in their canonical contracts and are referenced as dependencies.
- **PM inference:** all new requirements below are recommendations inferred from shared cross-platform, privacy, security, reliability and operational needs. They are not owner-approved.
- **Unknown:** architecture, deployment topology, providers, data schemas, retention schedules, legal categories, numeric service targets, recovery objectives, update mechanism, supported-version window and operational tooling.

No deployed ZeroDeck runtime was inspected or tested for this phase. No external service, implementation, or architecture is selected.

## 3. Normative language

MUST/MUST NOT statements are binding only if the Product Owner separately approves the requirement. Approval of the Phase 7 execution plan authorizes requirements analysis and drafting; it does not approve these product statements.

## 4. Scope and cross-contract boundaries

Included: shared product identity, platform capability boundaries, service-side authorization, independent MVP-03 gates, data-purpose/lifecycle governance, privacy and secret boundaries, configuration safety, environment separation, dependency failure handling, recovery integrity, audit/observability, bounded resource use, external dependency lifecycle, idempotency, release provenance, compatibility, and truthful status semantics.

Excluded: detailed authentication rules; file-analysis detection semantics; quarantine storage/restore/delete mechanics; URL parsing, SSRF and provider request mechanics; provider selection; pricing; implementation architecture; deployment topology; legal determinations; numeric SLOs/RPO/RTO/quotas; implementation and security testing.

### 4.1 Cross-contract dependencies

| Existing contract | Phase 7 relationship |
|---|---|
| Identity and Authentication | Shared account identity and authorization boundary; preserves eight owner decisions and five unresolved operational questions. |
| MVP-01 Manual File Analysis | Data minimization, diagnostic privacy, truthful dependency outcomes and bounded resources complement its 28 requirements. |
| MVP-02 Quarantine and File Disposition | Data lifecycle, restore integrity, resource limits and failure truthfulness complement its 38 requirements; local quarantine is not backend backup. |
| MVP-03 Website and Link Checking | Independent Pro/owner-activation gates and no-provider-call invariant are preserved; provider/URL-specific rules remain there. |

No existing capability contract is modified by Phase 7.

## 5. Canonical requirements

### Requirement ZD-SYS-001 — Shared account identity

**Normative statement:** The system MUST resolve the same ZeroDeck account principal across supported web and Android sessions when the user signs into the same account.

**Type:** policy | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** identity-authentication,authorization-permissions,behavior  
**Platforms:** web, android  
**Basis:** owner-decision — Owner direction: one product identity across web and Android; detailed session policy remains in authentication contract.  
**Must not:** The system MUST NOT create unrelated account principals for the same ZeroDeck account solely because the user is on a different supported platform.

**Dependencies:** ZD-AUTH-001

**Acceptance criterion — ZD-SYS-AC-01**

- **Given** Same account is used on both platforms
- **When** User signs in on each platform
- **Then** Both sessions resolve to the same account principal; session credentials remain independently controlled.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-002 — Platform capability boundary

**Normative statement:** The system MUST communicate material differences in capability, permission, availability, or data access between web and Android before the user relies on an affected operation.

**Type:** compatibility | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** interface,behavior,configuration  
**Platforms:** web, android  
**Basis:** pm-inference — Owner permits platform-specific differences; truthful disclosure is a PM inference.  
**Must not:** The system MUST NOT imply identical platform capability or permission where a material difference exists.

**Dependencies:** ZD-AUTH-017;ZD-FILE-024;ZD-QUAR-035;ZD-WEB-037

**Acceptance criterion — ZD-SYS-AC-02**

- **Given** A capability differs by platform
- **When** User encounters or attempts it
- **Then** The platform limitation and consequence are clear; unsupported parity is not implied.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-003 — Authoritative authorization

**Normative statement:** The system MUST enforce protected account, entitlement, owner-activation, and administrative authorization decisions at a trusted service boundary rather than relying solely on client-supplied state.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** api,authorization-permissions,security-controls  
**Platforms:** web, android  
**Basis:** pm-inference — Cross-platform security inference; MVP-03 requires independent eligibility checks.  
**Must not:** A client-supplied entitlement, activation, role, or permission claim MUST NOT by itself authorize a protected operation.

**Dependencies:** ZD-AUTH-016;ZD-WEB-001;ZD-WEB-002;ZD-WEB-003

**Acceptance criterion — ZD-SYS-AC-03**

- **Given** A protected operation is requested
- **When** Request reaches the authorization boundary
- **Then** Operation is allowed only after applicable authoritative checks pass.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-004 — Independent MVP-03 gates

**Normative statement:** The system MUST preserve active Pro entitlement and owner-controlled activation as independent prerequisites for every MVP-03 provider/API call.

**Type:** business-rule | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** authorization-permissions,integrations,security-controls  
**Platforms:** web, android  
**Basis:** owner-decision — Owner-approved scope invariant ZD-SCOPE-001 and MVP-03 ZD-WEB-001..003.  
**Must not:** The system MUST NOT infer one eligibility gate from the other or dispatch a provider/API call while either gate is false or unknown.

**Dependencies:** ZD-WEB-001;ZD-WEB-002;ZD-WEB-003

**Acceptance criterion — ZD-SYS-AC-04**

- **Given** MVP-03 provider/API call is considered
- **When** Request is prepared for dispatch
- **Then** Both gates are independently positive; neither substitutes for the other.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-005 — Authorization revocation

**Normative statement:** The system MUST deny newly evaluated protected operations and MUST prevent queued or not-yet-dispatched provider work after the authoritative service records revocation of the relevant access, entitlement, permission, or owner activation. Already-dispatched work MUST be cancelled where supported and MUST NOT initiate subsequent provider calls.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** authorization-permissions,behavior,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Propagation timing and in-flight treatment remain open in ZD-Q-AUTH-013 and ZD-Q-WEB-011/012.  
**Must not:** A newly evaluated protected operation MUST NOT be authorized solely by stale client-side state after authoritative revocation.

**Dependencies:** ZD-AUTH-012;ZD-WEB-029;ZD-WEB-030

**Acceptance criterion — ZD-SYS-AC-05**

- **Given** Relevant authorization state is revoked
- **When** A subsequent protected operation is evaluated
- **Then** Operation is denied according to updated authoritative state.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-006 — Cross-capability data purpose

**Normative statement:** The system MUST associate each category of personal, file-derived, URL-derived, account, and operational data it processes with a documented product purpose and authorized access boundary.

**Type:** data | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** data,security-controls,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — Inferred from shared data handling across authentication and the three capability contracts.  
**Must not:** The system MUST NOT collect, generate, or retain a data category without a documented product purpose and access boundary.

**Dependencies:** ZD-AUTH-026;ZD-FILE-020;ZD-QUAR-030;ZD-WEB-016;ZD-WEB-017

**Acceptance criterion — ZD-SYS-AC-06**

- **Given** A data category is collected, generated, or retained
- **When** Its handling is defined or changed
- **Then** Its purpose and authorized access boundary are documented.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-007 — Minimum necessary disclosure

**Normative statement:** The system MUST disclose data to an external service only to the extent required for the user-requested operation and permitted by the applicable product contract and user notice.

**Type:** privacy | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** data,security-controls,integrations  
**Platforms:** web, android  
**Basis:** pm-inference — Complements MVP-01 no-upload-by-default and MVP-03 minimum disclosure.  
**Must not:** The system MUST NOT disclose unrelated account data, file contents, credentials, or diagnostics to an external service.

**Dependencies:** ZD-FILE-007;ZD-QUAR-029;ZD-WEB-016;ZD-WEB-017

**Acceptance criterion — ZD-SYS-AC-07**

- **Given** An operation uses an external service
- **When** Outbound payload is prepared
- **Then** Only required and permitted data is disclosed.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-008 — Data lifecycle transparency

**Normative statement:** The system MUST provide a documented lifecycle policy for each category of system-managed user data, including purpose, retention trigger, deletion behaviour, and exceptions.

**Type:** privacy | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** data,persistence,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — Exact schedules and lawful retention categories remain unresolved in existing contracts.  
**Must not:** The system MUST NOT retain system-managed user data indefinitely by omission or without documented lifecycle rules.

**Dependencies:** ZD-AUTH-026;ZD-FILE-022;ZD-QUAR-022;ZD-QUAR-023;ZD-WEB-033;ZD-WEB-034

**Acceptance criterion — ZD-SYS-AC-08**

- **Given** System-managed user data is persisted
- **When** Category is introduced or lifecycle changes
- **Then** A reviewable lifecycle policy records purpose, trigger, deletion behaviour and exceptions.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-009 — Secret isolation

**Normative statement:** The system MUST prevent private credentials, signing material, provider secrets, and other server-only secrets from exposure through public client configuration, user-facing responses, or ordinary diagnostics.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** security-controls,data,configuration  
**Platforms:** web, android  
**Basis:** pm-inference — Security boundary inference; owner prefers mature security libraries and first-party backend.  
**Must not:** Server-only secrets MUST NOT be shipped in public client configuration or exposed in ordinary responses or diagnostics.

**Dependencies:** 

**Acceptance criterion — ZD-SYS-AC-09**

- **Given** A server-only secret is configured or used
- **When** Client artifact, response, or diagnostic is produced
- **Then** The secret is not disclosed through that channel.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-010 — Configuration validation

**Normative statement:** The system MUST validate required operational configuration before enabling the affected capability and fail closed when that configuration is missing, malformed, or inconsistent.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** configuration,security-controls,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — MVP-03 owner activation is a protected control; no configuration mechanism selected.  
**Must not:** A missing, malformed, or inconsistent required configuration value MUST NOT be treated as enabled or valid.

**Dependencies:** ZD-WEB-002

**Acceptance criterion — ZD-SYS-AC-10**

- **Given** Capability depends on required configuration
- **When** Capability initializes or operation is attempted
- **Then** Unsafe operation is blocked and an actionable operator signal is produced.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-011 — Environment separation

**Normative statement:** The system MUST keep development, test, and production credentials, data, and operational controls distinguishable and prevent non-production values from authorizing production operations.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** configuration,security-controls,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — Cross-cutting operational safeguard; deployment topology remains undecided.  
**Must not:** Non-production credentials or operational controls MUST NOT authorize production operations.

**Dependencies:** 

**Acceptance criterion — ZD-SYS-AC-11**

- **Given** Multiple environments exist
- **When** Configuration or credentials are applied
- **Then** Each environment uses only its intended authority and values.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-012 — Dependency failure truthfulness

**Normative statement:** The system MUST NOT report a dependent operation as successful when a required service or dependency has failed, timed out, or returned unusable data.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** errors-recovery,integrations,api  
**Platforms:** web, android  
**Basis:** pm-inference — Capability contracts distinguish unknown/failure from successful outcomes.  
**Must not:** A failed, timed-out, or unusable required dependency MUST NOT be represented as a successful operation.

**Dependencies:** ZD-FILE-018;ZD-QUAR-033;ZD-WEB-024

**Acceptance criterion — ZD-SYS-AC-12**

- **Given** Operation depends on a service
- **When** Dependency fails or returns unusable data
- **Then** Operation is reported failed, incomplete, or unavailable with known limitation.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-013 — Degraded capability isolation

**Normative statement:** The system MUST limit the user-visible impact of a failed optional or independent dependency to capabilities that require that dependency.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** errors-recovery,behavior,interface  
**Platforms:** web, android  
**Basis:** pm-inference — Product-level outcome; does not prescribe microservices or topology.  
**Must not:** A failure in one capability's optional or independent dependency MUST NOT by itself disable an unrelated capability.

**Dependencies:** ZD-FILE-018;ZD-QUAR-033;ZD-WEB-024

**Acceptance criterion — ZD-SYS-AC-13**

- **Given** Capability-specific dependency fails
- **When** User accesses another capability
- **Then** Unaffected capability remains available if its own dependencies permit.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-014 — Recoverable backend state

**Normative statement:** The system MUST define which backend-managed records are recoverable from service or storage failure and identify consequences when recovery is not possible.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** persistence,data,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Account, entitlement, activation and audit state; RPO/RTO and backup policy remain open.  
**Must not:** The system MUST NOT assume that every data category is backed up or recoverable; recovery coverage and limitations must be explicit.

**Dependencies:** ZD-AUTH-001;ZD-SYS-008

**Acceptance criterion — ZD-SYS-AC-14**

- **Given** Backend-managed state is operationally important
- **When** Recovery policy is defined or failure occurs
- **Then** Recoverable records and limitations are documented for operators.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-015 — Restore integrity

**Normative statement:** The system MUST verify integrity and authorization context of restored backend-managed state before using it to authorize protected operations.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** persistence,security-controls,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — No integrity mechanism or recovery topology selected.  
**Must not:** Unverified restored state MUST NOT authorize protected operations.

**Dependencies:** ZD-SYS-003;ZD-SYS-014;ZD-AUTH-016

**Acceptance criterion — ZD-SYS-AC-15**

- **Given** Backend-managed state has been restored
- **When** Protected operations resume
- **Then** Restored authorization state is verified before use.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-016 — Audit security-sensitive changes

**Normative statement:** The system MUST retain an appropriately access-controlled record of administrative changes affecting account access, entitlement, owner activation, or protected capability availability.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** behavior,messaging,security-controls  
**Platforms:** web, android  
**Basis:** pm-inference — Owner-controlled activation and entitlement affect provider dispatch; exact fields/retention remain open.  
**Must not:** A security-sensitive administrative change MUST NOT become unreviewable because no attributable record was retained.

**Dependencies:** ZD-AUTH-012;ZD-WEB-029;ZD-WEB-030;ZD-SYS-005

**Acceptance criterion — ZD-SYS-AC-16**

- **Given** Security-sensitive administrative change occurs
- **When** Change is accepted
- **Then** Actor, action, target, time and outcome are reviewable subject to approved minimization and retention.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-017 — Diagnostic minimization

**Normative statement:** The system MUST exclude raw credentials, secret values, unnecessary file contents, and unredacted sensitive URL components from ordinary application diagnostics.

**Type:** privacy | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** data,security-controls,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — Complements explicit MVP-01 and MVP-03 diagnostic privacy requirements.  
**Must not:** Ordinary diagnostics MUST NOT contain raw credentials, secrets, unnecessary file contents, or unredacted sensitive URL components.

**Dependencies:** ZD-FILE-021;ZD-WEB-018;ZD-SYS-009

**Acceptance criterion — ZD-SYS-AC-17**

- **Given** Sensitive data is present in operation context
- **When** Diagnostic is emitted
- **Then** Only minimized or redacted fields are included.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-018 — Operational health visibility

**Normative statement:** The system MUST expose sufficient operational health information for an authorized operator to distinguish service unavailability, dependency failure, and capability-specific degradation without exposing user content or secrets.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** behavior,configuration,performance-resource-behavior  
**Platforms:** web, android  
**Basis:** pm-inference — No monitoring vendor, topology or numeric SLO selected.  
**Must not:** Operational health output MUST NOT expose user content or secrets, and MUST NOT conceal the affected failure class.

**Dependencies:** ZD-FILE-018;ZD-QUAR-033;ZD-WEB-024

**Acceptance criterion — ZD-SYS-AC-18**

- **Given** Service or dependency is unhealthy
- **When** Authorized operator checks health
- **Then** Affected capability and failure class are distinguishable with privacy-safe detail.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-019 — Incident record

**Normative statement:** The system MUST support recording the scope, timeline, affected capabilities, containment action, and resolution status of a material security or availability incident.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** security-controls,behavior,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Incident severity, notification duties and retention require owner/legal review.  
**Must not:** A material security or availability incident MUST NOT be closed without a record of its scope, timeline, containment and resolution status.

**Dependencies:** ZD-SYS-016;ZD-SYS-018

**Acceptance criterion — ZD-SYS-AC-19**

- **Given** Material security or availability incident is identified
- **When** Incident is handled
- **Then** A reviewable record captures scope, timeline, containment and resolution.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-020 — Bounded shared resource use

**Normative statement:** The system MUST enforce documented bounds for resource-consuming operations and storage categories before enabling them for general use.

**Type:** performance | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** performance-resource-behavior,errors-recovery,configuration  
**Platforms:** web, android  
**Basis:** pm-inference — MVP contracts contain resource/usage constraints; numeric limits remain open.  
**Must not:** A resource-consuming operation MUST NOT be enabled for general use without a documented applicable resource bound.

**Dependencies:** ZD-FILE-026;ZD-QUAR-034;ZD-WEB-031

**Acceptance criterion — ZD-SYS-AC-20**

- **Given** Capability consumes compute, memory, network, provider quota, or storage
- **When** Limits are configured and operation is used
- **Then** Operation respects an explicit applicable bound.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-021 — Overload behaviour

**Normative statement:** The system MUST respond to resource exhaustion or overload with an explicit bounded rejection, deferral, or degraded state rather than silently accepting work it cannot safely complete.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** performance-resource-behavior,errors-recovery,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — No queue architecture or numeric limit chosen.  
**Must not:** The system MUST NOT silently drop accepted work or report work as complete when overload prevented safe completion.

**Dependencies:** ZD-FILE-026;ZD-QUAR-034;ZD-WEB-031

**Acceptance criterion — ZD-SYS-AC-21**

- **Given** System reaches documented capacity limit
- **When** New operation is requested
- **Then** Request receives explicit non-success or bounded queue state; it is not falsely completed.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-022 — External dependency lifecycle

**Normative statement:** The system MUST identify each production-critical external dependency, its purpose, owner, failure impact, and replacement or exit consideration before production reliance.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** integrations,errors-recovery,configuration  
**Platforms:** web, android  
**Basis:** pm-inference — MVP-03 provider remains unselected; no vendor/procurement choice made.  
**Must not:** A production-critical external dependency MUST NOT be adopted without an identified purpose, responsible owner, failure impact and exit consideration.

**Dependencies:** ZD-FILE-018;ZD-QUAR-011;ZD-WEB-019;ZD-WEB-024

**Acceptance criterion — ZD-SYS-AC-22**

- **Given** External provider becomes production-critical
- **When** Dependency is adopted or materially changed
- **Then** Role, failure impact, responsible owner and exit consideration are documented.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-023 — External response trust

**Normative statement:** The system MUST treat data returned by an external dependency as untrusted input and validate it before using it to affect account state, security outcomes, or subsequent operations.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** integrations,security-controls,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Provider-specific schema and verdict mapping remain in MVP-03.  
**Must not:** Unvalidated external response data MUST NOT override trusted account state, authorization policy, or local security policy.

**Dependencies:** ZD-WEB-020;ZD-QUAR-011;ZD-FILE-027

**Acceptance criterion — ZD-SYS-AC-23**

- **Given** External dependency returns data
- **When** Response is consumed
- **Then** Response is validated and cannot override trusted local policy.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-024 — Idempotent state-changing operations

**Normative statement:** The system MUST define duplicate-request behaviour for each cross-platform state-changing operation so retries do not create unintended duplicate effects.

**Type:** functional | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** api,behavior,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Idempotency format and endpoint-specific rules remain implementation/API decisions.  
**Must not:** A retry or duplicate submission MUST NOT create unintended duplicate state changes or side effects.

**Dependencies:** ZD-AUTH-026;ZD-QUAR-012;ZD-QUAR-032;ZD-WEB-025

**Acceptance criterion — ZD-SYS-AC-24**

- **Given** State-changing operation is retried or concurrent
- **When** Same logical operation is received more than once
- **Then** Documented duplicate-request policy prevents unintended duplicate effects.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-025 — Release provenance

**Normative statement:** The system MUST make provenance and intended release identity of production software artifacts verifiable before accepting them as product updates.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed  
**Facets:** security-controls,configuration,behavior  
**Platforms:** web, android  
**Basis:** pm-inference — Signing, distribution channels, CI/CD and rollback design are not selected.  
**Must not:** An artifact with unverifiable or mismatched release provenance MUST NOT be accepted as a trusted product update.

**Dependencies:** 

**Acceptance criterion — ZD-SYS-AC-25**

- **Given** Production software update is offered or installed
- **When** Artifact is verified
- **Then** Only artifacts satisfying the approved release policy are accepted.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-026 — Version compatibility

**Normative statement:** The system MUST identify and handle unsupported or incompatible client/service version combinations before executing operations with unsupported semantics or security assumptions.

**Type:** compatibility | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** behavior,configuration,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Supported-version windows and upgrade deadlines remain open.  
**Must not:** An incompatible client/service version MUST NOT silently execute an operation whose semantics or security assumptions are unsupported.

**Dependencies:** ZD-AUTH-017;ZD-FILE-024;ZD-QUAR-035;ZD-WEB-037

**Acceptance criterion — ZD-SYS-AC-26**

- **Given** Client/service versions are incompatible
- **When** Protected or data-changing operation is requested
- **Then** Operation is blocked or safely constrained with actionable compatibility guidance.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-027 — Truthful cross-capability status

**Normative statement:** The system MUST communicate whether a requested capability is available, unavailable, degraded, incomplete, or completed without implying another capability was also performed.

**Type:** usability | **Priority:** P1 | **Status:** PM-proposed  
**Facets:** interface,behavior,errors-recovery  
**Platforms:** web, android  
**Basis:** pm-inference — Existing capability result taxonomies remain authoritative in their owning contracts.  
**Must not:** The product MUST NOT imply a broader scan, service success, or completed action than actually occurred.

**Dependencies:** ZD-FILE-012;ZD-FILE-015;ZD-QUAR-031;ZD-WEB-021;ZD-WEB-032

**Acceptance criterion — ZD-SYS-AC-27**

- **Given** User requests or views capability result
- **When** Capability has known lifecycle or dependency state
- **Then** Status accurately describes only the operation and scope that occurred.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).

### Requirement ZD-SYS-028 — Data portability and account closure

**Normative statement:** The system MUST identify which system-managed account data can be exported or made available to the account holder and which categories are excluded with a documented reason.

**Type:** operational | **Priority:** P2 | **Status:** PM-proposed  
**Facets:** data,persistence,security-controls  
**Platforms:** web, android  
**Basis:** pm-inference — No export feature is added to launch scope; exact export policy remains open.  
**Must not:** An account-data response MUST NOT expose another user's data or omit eligible categories without a documented reason.

**Dependencies:** ZD-AUTH-026;ZD-SYS-008

**Acceptance criterion — ZD-SYS-AC-28**

- **Given** Account holder requests data or account closure
- **When** Request is handled
- **Then** Category-level disclosure policy is followed without exposing secrets or another user's data.
- **Verification:** mixed (automated test, manual test, inspection or analysis as appropriate).


## 6. Open product and owner questions

| ID | Unresolved question | Impact |
|---|---|---|
| ZD-Q-SYS-001 | What availability objective, if any, is required for the MVP and each capability? | Cannot define service acceptance or commitments without an agreed target. |
| ZD-Q-SYS-002 | What recovery time and recovery point objectives apply to backend-managed account, entitlement, activation and audit state? | Determines backup frequency, recovery design and user impact. |
| ZD-Q-SYS-003 | Which backend-managed data categories require backup, and which must never be backed up? | Prevents assuming user file bytes or quarantine contents belong in backend backups. |
| ZD-Q-SYS-004 | What retention and expiry rules apply to backups, audit events, diagnostics and incident records? | Requires policy and legal review. |
| ZD-Q-SYS-005 | What data classification scheme and access roles govern account, file-derived, URL-derived and operational data? | Determines access boundaries and handling obligations. |
| ZD-Q-SYS-006 | Which jurisdictions and legal/privacy obligations apply at launch? | Legal basis, notice, retention and notification depend on geography and service model. |
| ZD-Q-SYS-007 | Which operational events may be logged, at what detail, and who may access them? | Balances debugging/audit needs against privacy and abuse risk. |
| ZD-Q-SYS-008 | What incident severity levels, escalation owners and notification rules are required? | Cannot define response timing or notification commitments. |
| ZD-Q-SYS-009 | What numeric limits apply to concurrency, request rates, storage, timeouts and resource consumption? | Bounded behaviour is required, but values are not invented. |
| ZD-Q-SYS-010 | What supported browser, Android OS/device and backend compatibility windows apply? | Determines safe compatibility and end-of-support behaviour. |
| ZD-Q-SYS-011 | What release/update channels, provenance trust roots, rollback policy and emergency withdrawal process are approved? | Concrete trust and recovery policy remains unresolved. |
| ZD-Q-SYS-012 | Which external dependencies are approved for production, and who owns provider review/exit decisions? | Production reliance, commercial exposure and data processing cannot be assumed. |
| ZD-Q-SYS-013 | What authorization/entitlement/activation propagation bound applies across web, Android and in-flight operations? | Explicitly unresolved in authentication and MVP-03 contracts. |
| ZD-Q-SYS-014 | What account-data export categories and formats, if any, are in launch scope? | No unapproved export feature is added. |
| ZD-Q-SYS-015 | How should conflicting cross-platform updates to shared account state be resolved? | Avoids inconsistent account, subscription or settings state. |
| ZD-Q-SYS-016 | What maintenance windows and user-notice expectations apply? | Affects availability communication. |
| ZD-Q-SYS-017 | How does account deletion propagate into backups and immutable audit records? | Must reconcile deletion, justified retention and recoverability. |
| ZD-Q-SYS-018 | What service ownership and support response expectations apply after launch? | Determines operational accountability and support promises. |

## 7. Applicability and implementation neutrality

This contract does not imply microservices, an API gateway, a specific database schema, queue, monitoring product, secret manager, cloud provider, cryptographic protocol, or deployment topology.

Local user-selected files and quarantine artifacts remain distinct from backend-managed account and operational data. This contract does not require uploading, backing up, or centrally retaining user file contents.

## 8. Approval status

**Phase 7 execution plan:** owner-approved for PM analysis and drafting.  
**Requirement status:** 28 PM-proposed; none owner-approved by this document.  
**Product requirement approval:** not granted by execution-plan approval.

This contract does not establish runtime conformance, production readiness, legal compliance, security assurance, or approved architecture.


## Phase 9 owner-approved policy and deferred details

- Authorization, entitlement and owner-controlled activation share one revocation policy across web and Android. False or unknown gates deny new work; queued/not-yet-dispatched provider calls are denied after revocation; already-dispatched calls are cancelled where supported and cannot initiate follow-on calls. Exact propagation bounds remain for architecture testing.
- Back up necessary backend-managed data only. User file bytes and quarantine content/keys are not backed up by default. Deletion must propagate through backup lifecycle; legally justified audit retention must be minimized and documented.
- Ordinary diagnostics exclude passwords, secrets, file contents and sensitive URL components. Exact data classifications, event fields, access roles and retention remain architecture/legal review.
- Dedicated account-data export is out of MVP unless a confirmed legal requirement applies. Planned maintenance notice is provided in advance where practical. No support SLA is promised until an actual support channel, accountable owner and operating capacity exist.
- Numeric resource, availability, RTO/RPO, compatibility, incident-response and update-trust details remain deferred to evidence-led architecture and operations.

Detailed question dispositions: [Phase 9 owner decision register](../../2026-11-28/35-PHASE-9-OWNER-DECISION-REGISTER.md).
