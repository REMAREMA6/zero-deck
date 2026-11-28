# Phase 7 — Cross-Cutting System Requirements Plan

**Project:** ZeroDeck  
**Repository:** REMAREMA6/zero-deck  
**Workspace:** `product-management/`  
**Plan date:** 2026-11-28  
**Author:** ZeroDeck Product Management Agent  
**Status:** Prepared — awaiting explicit Product Owner approval  
**Workstream:** PM-authored product requirements  
**Dependency:** Phases 0–6 complete

## 1. Purpose

Author a technology-independent contract for system requirements that apply across ZeroDeck's supporting infrastructure and multiple MVP capabilities, rather than belonging exclusively to authentication, MVP-01 file analysis, MVP-02 quarantine/disposition, or MVP-03 website/link checking.

The purpose is to make shared system obligations explicit and testable while preserving the distinction between:
- owner-approved product decisions;
- requirements already recorded in the four existing capability contracts;
- new PM-proposed cross-cutting requirements;
- unresolved questions and recommendations; and
- implementation architecture, which this phase must not select.

This is a product-requirements authoring phase. It is not system architecture design, implementation, deployment, or a security assessment.

## 2. Fixed authority and constraints

The following existing owner directions and scope decisions must be preserved:

- ZeroDeck's first target audience is everyday non-technical users.
- Web and Android share one product identity; platform-specific capability differences are allowed.
- MVP-01 is manual file security analysis.
- MVP-02 is quarantine and file disposition.
- MVP-03 is website and link checking.
- MVP-03 requires both an active Pro entitlement and owner-controlled activation; neither gate implies the other, and no provider/API call is permitted unless both pass.
- Authentication is supporting infrastructure, not a fourth user-facing MVP capability.
- The owner prefers first-party authentication and backend, Neon as the managed database, and mature security libraries rather than custom cryptography.
- The eight authentication policy decisions in `ZD-DEC-AUTH-2026-11-28` remain authoritative within their recorded scope.

These directions do not authorize choosing a hosting provider, runtime, framework, deployment topology, database schema, cryptographic protocol, external provider, backup product, monitoring vendor, or numeric service target. Existing architecture material is a recommendation, not final architecture approval.

## 3. Scope

The Phase 7 contract will address shared, cross-capability product/system outcomes where they are not already fully specified by an existing contract. The analysis will assess whether each topic creates a distinct normative obligation, is already covered elsewhere, is conditional, is deferred, or remains unresolved.

Planned coverage areas:

1. **Product identity and platform boundary** — one account/product identity across web and Android; platform-specific capabilities; shared versus platform-specific state and user expectations; consistency without false feature-parity claims.
2. **Trust boundaries and authorization consistency** — authoritative server-side decisions where required; client/server trust boundaries; consistent identity, entitlement, permission and owner-activation evaluation; revocation and propagation. Preserve the unresolved authorization-propagation question in the authentication contract.
3. **Cross-capability data classification and lifecycle** — categories of account data, file bytes, quarantine artifacts, scan metadata/results, submitted URLs, operational records and diagnostics; collection purpose, minimization, access, retention, export/deletion and justified exceptions. Do not settle schedules or legal categories without evidence/owner decision.
4. **Security and privacy baseline** — protection of sensitive data in transit and at rest where applicable; least privilege; secret/key boundaries; safe handling of untrusted inputs; secure defaults; privacy-preserving diagnostics; security-relevant state changes.
5. **Configuration and secrets** — separation of public configuration from secrets; environment-specific configuration; owner-controlled operational switches; validation of missing, malformed or stale configuration; safe failure and change traceability. Do not prescribe a configuration product or secret manager.
6. **Availability and resilience** — dependency failure isolation; degraded operation; recovery expectations; graceful handling of database, backend, network and external-service failures; no false success when a required dependency did not complete its work.
7. **Backup, restore and disaster recovery** — identify which system-managed data requires recoverability, the consequences of losing it, and open recovery objectives/policies. Keep local user-file and quarantine recovery distinct from backend/database backup; do not assume a cloud backup of user files.
8. **Observability, audit and incident handling** — operational health, security events, administrative actions, privacy-safe logs, correlation, alerting, incident containment and post-incident records. Do not log secrets, raw credentials, unnecessary file contents or full sensitive URLs.
9. **Performance, resource use and capacity** — shared service limits, bounded resource consumption, concurrency, storage growth, request budgets and overload behaviour. Numeric targets remain open unless supported by existing owner decisions or evidence.
10. **External dependency lifecycle** — dependency availability, version/security updates, provider changes, failure/exit strategy, data portability and cost/usage visibility. Do not select vendors or add dependencies.
11. **API and service boundaries** — authenticated service-to-service/client boundaries, authorization on protected operations, input/output contracts, idempotency and safe failure where these are genuinely cross-cutting. Avoid duplicating detailed MVP-03 provider-call requirements.
12. **Release, update and compatibility integrity** — trusted release/update provenance, supported-version policy, compatibility across web/Android/backend changes, rollback or recovery expectations, and safe handling of interrupted/failed updates. Do not choose signing, CI/CD or distribution tooling.
13. **Environment and deployment boundaries** — separation of development/test/production data and credentials, safe test fixtures, environment-specific activation, and prevention of test controls or secrets leaking into production. Do not select hosting or deployment topology.
14. **Support and user communication** — truthful service status, actionable failure communication, support escalation and user-facing explanation of data loss, recovery limits or degraded capability where relevant.
15. **Cross-capability consistency and dependency management** — shared lifecycle rules, common error/uncertainty semantics where justified, explicit dependencies among contracts, and prevention of one capability silently triggering another.

The analysis will distinguish product-visible outcomes from internal implementation mechanisms. A topic belongs in this contract only when it expresses a shared obligation not better owned by a capability-specific contract.

## 4. Explicit exclusions

Phase 7 will not:

- Re-author or silently change the authentication, MVP-01, MVP-02 or MVP-03 contracts.
- Promote PM-proposed requirements in existing contracts to owner-approved status.
- Reopen or reinterpret the eight approved authentication decisions.
- Decide the five remaining authentication operational questions, including email operations, abuse thresholds, renewal cadence, deletion schedule/legal retention categories, or authorization propagation bound.
- Decide quarantine retention, key lifecycle, restore eligibility, provider selection, URL policy, quotas, numeric thresholds, or other open capability-specific questions already tracked in their contracts.
- Select a programming language, framework, runtime, database schema, hosting provider, cloud topology, monitoring/analytics vendor, secret manager, cryptographic algorithm/protocol, update mechanism, payment provider, or external integration.
- Define implementation architecture, infrastructure-as-code, API schemas, deployment pipelines, runbooks, or detailed threat models.
- Implement features, change product code/configuration, run runtime tests, conduct penetration testing, or claim production readiness.
- Modify the separate Software Rules repository or reverse-engineering evidence.
- Treat an architecture recommendation or external vendor capability as an owner-approved ZeroDeck requirement.
- Invent legal obligations, retention periods, recovery objectives, availability targets, budgets, latency targets, capacity limits or service-level commitments.

Where a system-level requirement cannot be stated accurately without one of these decisions, record the dependency and leave the question open or conditional.

## 5. Inputs to inspect after approval

After approval, use the following as the authoritative project inputs:

- `product-management/product-rules/PROFILE.md` and its schemas/templates — PM declared-contract authoring and validation profile.
- `product-management/product-rules/contracts/IDENTITY-AUTHENTICATION.md` and `2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md` — account/authentication requirements and owner decisions.
- `product-management/product-rules/contracts/MANUAL-FILE-ANALYSIS.md` — MVP-01 contract.
- `product-management/product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md` — MVP-02 contract.
- `product-management/product-rules/contracts/WEBSITE-LINK-CHECKING.md` — MVP-03 contract and dual-gate invariant.
- `product-management/2026-11-27/10-PLATFORM-INTEGRATION-ARCHITECTURE.md` — architecture recommendations and explicitly unresolved implementation choices.
- Existing product decisions, evidence, open questions, facet assessments, failure matrices and validation reports for Phases 2–6.
- The exact Software Rules profile compatibility pin and official 15-facet inventory already used by this workstream.

Existing contracts are inputs for dependency and duplication analysis, not permission to rewrite them.

## 6. Planned execution and deliverables

Once the owner approves this plan:

1. Read and follow all seven Product Management Agent CIRCLES skills exactly; do not improvise or merge steps.
2. Reconcile the goal, constraints and product context; identify affected users/stakeholders; distinguish underlying needs from requested mechanisms; prioritize; list materially different approaches; evaluate trade-offs; and provide one PM recommendation with one testable success metric. Clearly label inferred needs and evidence limitations.
3. Inspect existing contracts and decisions to build a cross-contract dependency/overlap map. Preserve existing IDs and decision statuses.
4. Author the canonical cross-cutting contract:
   - `product-management/product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md`
5. Author its synchronized structured projection:
   - `product-management/product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json`
6. Retain contract provenance/evidence:
   - `product-management/product-rules/evidence/cross-cutting-system-requirements-contract.evidence.json`
7. Record the seven-step CIRCLES analysis:
   - `product-management/2026-11-28/24-PHASE-7-CIRCLES-CROSS-CUTTING-SYSTEM-REQUIREMENTS.md`
8. Assess all 15 official Software Rules facets, explicitly classifying applicability, conditionality, deferral and rationale:
   - `product-management/product-rules/PHASE-7-CROSS-CUTTING-FACET-COVERAGE.md`
9. Create a negative, failure, interruption, boundary and recovery matrix with traceability to contract requirements:
   - `product-management/product-rules/PHASE-7-CROSS-CUTTING-FAILURE-RECOVERY-MATRIX.md`
10. Validate requirement/criterion structure, uniqueness, facet references, conditionality, cross-contract dependencies, owner-decision provenance, projection/evidence parity, artifact revision/digest and scenario traceability; include malformed-fixture checks and explicit limitations:
   - `product-management/product-rules/PHASE-7-CROSS-CUTTING-VALIDATION.md`
11. Update the contract index, PM workstream, tracker and overall plan only after the deliverables and checks are reconciled.

File names may follow repository conventions if necessary, but the deliverable substance and scope must remain unchanged.

## 7. Quality and completion gates

Phase 7 may be marked complete only when:

- The contract contains only genuinely cross-cutting obligations; capability-specific requirements remain in their existing contracts.
- Every normative requirement is atomic, uniquely identified, explicitly PM-authored, assigned relevant official facet references and supported by one or more observable acceptance criteria.
- Each requirement's basis is traceable to an owner decision, existing contract dependency, source evidence, platform constraint, external research, or clearly labelled PM inference.
- Owner-approved decisions are represented faithfully and only within their approved scope; no recommendation or open question is silently converted into an owner decision.
- Shared product identity is distinguished from identical platform capability.
- Authorization, entitlement and owner-controlled activation dependencies preserve the MVP-03 independent-gate/no-provider-call invariant.
- Data categories and lifecycle obligations distinguish local user files/quarantine from backend-managed account and operational data.
- Security, privacy, configuration, secrets, resilience, backup/recovery, observability, incident handling, resource limits, dependencies, release integrity and environment separation are either addressed, explicitly conditional/deferred, or recorded as unresolved with rationale.
- No unsupported numeric target, retention period, legal requirement, vendor, technology or architecture choice is invented.
- All 15 official Software Rules facets are assessed; conditional, deferred and not-applicable classifications include reasons and consequences.
- Negative/failure/recovery scenarios cover material shared-system boundaries and trace to one or more requirements.
- Markdown, structured projection and evidence agree on IDs, order, statements, criteria, authorship, status, artifact revision and digest.
- Cross-contract dependencies and overlaps are explicit; existing canonical contracts remain unchanged unless a separate owner-approved plan authorizes changes.
- Validation reports exactly what was checked. Targeted validation is not described as full Draft 2020-12 validation, upstream Software Rules CI, runtime testing, security audit, penetration testing, legal review or production readiness unless those activities actually occurred.
- All created or modified files remain under `product-management/`.

## 8. Execution boundary

This plan authorizes no Phase 7 analysis or contract authoring until the Product Owner explicitly approves it. After approval, execution is limited to the deliverables and boundaries above. No product implementation, architecture/configuration changes, or Software Rules repository changes are permitted. Any material scope expansion or new owner decision must be surfaced rather than silently assumed.

## 9. Approval and completion record

**Approval status:** Awaiting explicit Product Owner approval.  
**Approval record:** Not yet approved.  
**Execution status:** Not started.  
**Completion record:** To be completed only after approved execution and validation.

