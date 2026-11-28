# Phase 7 — Cross-Cutting System Requirements Plan

**Project:** ZeroDeck  
**Repository:** REMAREMA6/zero-deck  
**Workspace:** `product-management/`  
**Plan date:** 2026-11-28  
**Author:** ZeroDeck Product Management Agent  
**Status:** Owner-approved — execution complete  
**Workstream:** PM-authored product requirements  
**Dependency:** Phases 0–6 complete

## 1. Purpose

Author a technology-independent contract for system requirements that apply across ZeroDeck's supporting infrastructure and multiple MVP capabilities, rather than belonging exclusively to authentication, MVP-01 file analysis, MVP-02 quarantine/disposition, or MVP-03 website/link checking.

The purpose is to make shared system obligations explicit and testable while preserving the distinction between owner-approved product decisions, existing capability requirements, new PM-proposed cross-cutting requirements, unresolved questions and recommendations. This is product-requirements authoring, not architecture design, implementation, deployment, or a security assessment.

## 2. Fixed authority and constraints

Preserve these existing owner directions and decisions:

- ZeroDeck's first target audience is everyday non-technical users.
- Web and Android share one product identity; platform-specific capability differences are allowed.
- MVP-01 is manual file security analysis; MVP-02 is quarantine and file disposition; MVP-03 is website and link checking.
- MVP-03 requires both active Pro entitlement and independent owner-controlled activation. No provider/API call is permitted unless both gates pass.
- Authentication is supporting infrastructure, not a fourth user-facing MVP capability.
- The owner prefers first-party authentication/backend, Neon as managed database, and mature security libraries rather than custom cryptography.
- Eight authentication policy decisions in `ZD-DEC-AUTH-2026-11-28` remain authoritative within their recorded scope.

These directions do not authorize selection of hosting, runtime, framework, deployment topology, schema, cryptographic protocol, external provider, backup product, monitoring vendor, or numeric service target. Existing architecture material is recommendation, not final architecture approval.

## 3. Scope

The contract addresses shared, cross-capability product/system outcomes only where they are not already fully specified by an existing contract. Each topic must be classified as a distinct normative obligation, already covered, conditional, deferred, or unresolved.

Coverage areas:
1. Product identity and platform boundary: one account/product identity across web and Android; platform-specific capabilities and state; consistent expectations without false feature parity.
2. Trust boundaries and authorization consistency: authoritative service-side identity, permission, entitlement and owner-activation decisions; revocation and propagation. Preserve the open authorization-propagation question.
3. Cross-capability data classification and lifecycle: account data, user file bytes, quarantine artifacts, scan metadata/results, submitted URLs, operational records and diagnostics; purpose, minimization, access, retention, export/deletion and justified exceptions.
4. Security and privacy baseline: sensitive-data protection, least privilege, secret/key boundaries, untrusted input handling, secure defaults and privacy-safe diagnostics.
5. Configuration and secrets: public configuration versus secrets, environment-specific values, owner-controlled switches, invalid/missing/stale configuration, fail-safe behaviour and change traceability.
6. Availability and resilience: dependency isolation, degraded operation, recovery expectations, database/backend/network/provider failure, no false success.
7. Backup, restore and disaster recovery: recoverability of system-managed data, data-loss consequences and open objectives; distinguish local files/quarantine from backend/database data.
8. Observability, audit and incident handling: health, security/admin events, privacy-safe logs, correlation, alerting, containment and incident records.
9. Performance, resource use and capacity: bounded resource use, concurrency, storage growth, request budgets and overload behaviour; numeric targets remain open absent evidence/decision.
10. External dependency lifecycle: availability, security/version updates, provider changes, exit strategy, portability and cost/usage visibility.
11. API and service boundaries: authentication, authorization, input/output, idempotency and safe failure only where genuinely cross-cutting; avoid duplicating MVP-03 provider rules.
12. Release, update and compatibility integrity: release provenance, supported-version policy, cross-platform/backend compatibility, rollback/recovery and interrupted updates.
13. Environment and deployment boundaries: dev/test/production separation, safe fixtures, environment-specific activation and preventing test controls/secrets reaching production.
14. Support and user communication: truthful status, actionable failure communication, escalation, data-loss/recovery-limit/degraded-capability explanation.
15. Cross-capability consistency and dependency management: shared lifecycle/error semantics where justified, explicit contract dependencies and no silent triggering of another capability.

Distinguish product-visible outcomes from internal mechanisms. Keep requirements in capability contracts when they are not genuinely cross-cutting.

## 4. Explicit exclusions

Do not:
- Re-author or silently change authentication, MVP-01, MVP-02 or MVP-03 contracts.
- Promote existing PM proposals to owner-approved status or reopen the eight approved auth decisions.
- Resolve the five remaining auth operational questions (email operations, abuse thresholds, renewal cadence, deletion/legal retention, authorization propagation).
- Resolve quarantine retention, key lifecycle, restore eligibility, provider selection, URL policy, quotas, numeric thresholds or other capability-specific open questions.
- Select language, framework, runtime, schema, hosting/cloud topology, monitoring/analytics vendor, secret manager, cryptographic algorithm/protocol, update mechanism, payment provider or external integration.
- Define implementation architecture, IaC, API schemas, pipelines, runbooks or detailed threat models.
- Implement product features, change product code/configuration, run runtime tests, perform penetration testing or claim production readiness.
- Modify Software Rules or reverse-engineering repositories.
- Invent legal duties, retention periods, recovery objectives, availability/latency/capacity targets, budgets or SLAs.

Record dependencies and open questions wherever a reliable requirement depends on an excluded decision.

## 5. Inputs

Inspect the PM profile, schemas and templates; auth contract and owner decision record; MVP-01, MVP-02 and MVP-03 contracts; Phase 2–6 decisions/evidence/open questions/facet assessments/failure matrices/validation; platform integration architecture recommendations; and the pinned Software Rules profile and official 15-facet inventory. Existing contracts are read-only inputs for overlap/dependency analysis.

## 6. Execution and deliverables

Execution follows the seven CIRCLES skills exactly: Comprehend, Identify, Report, Cut, List, Evaluate, Summarize. The Product Management Agent recommends; it does not decide or act on the product. All work remains under `product-management/`.

Deliver:
- `product-management/product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md`
- `product-management/product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json`
- `product-management/product-rules/evidence/cross-cutting-system-requirements-contract.evidence.json`
- `product-management/2026-11-28/24-PHASE-7-CIRCLES-CROSS-CUTTING-SYSTEM-REQUIREMENTS.md`
- `product-management/product-rules/PHASE-7-CROSS-CUTTING-FACET-COVERAGE.md`
- `product-management/product-rules/PHASE-7-CROSS-CUTTING-FAILURE-RECOVERY-MATRIX.md`
- `product-management/product-rules/PHASE-7-CROSS-CUTTING-VALIDATION.md`
- Reconciled contract index, PM workstream, tracker and overall plan.

## 7. Quality and completion gates

Complete only when:
- Every requirement is genuinely cross-cutting, atomic, uniquely identified, PM-authored and has observable acceptance criteria.
- Basis and dependencies are explicit; PM inference is labelled; owner decisions are faithfully scoped.
- Shared identity is distinguished from identical platform capability.
- MVP-03's independent Pro and owner-activation gates and no-provider-call invariant are preserved.
- Local file/quarantine data is distinguished from backend-managed data.
- Security/privacy/configuration/secrets/resilience/backup/recovery/observability/incident/resource/dependency/release/environment areas are addressed or explicitly conditional/deferred/open with reasons.
- No unsupported target, retention period, legal obligation, vendor, technology or architecture is invented.
- All 15 official facets are assessed with rationale for conditional/deferred/not-applicable classifications.
- Negative/failure/recovery scenarios trace to requirements.
- Markdown, projection and evidence agree on IDs, order, statements, criteria, author, status, revision and digest.
- Existing capability contracts remain unchanged.
- Validation states its real scope and limitations; it is not misrepresented as full Draft 2020-12/upstream CI/runtime/security/legal/production validation.
- All modified/created files remain under `product-management/`.

## 8. Approval and execution record

**Owner approval:** The Product Owner explicitly instructed: “Okay, so the next thing is the next is execution. So you have to finish phase seven. Finish it”.  
**Approval interpretation:** Explicit instruction to proceed with the written Phase 7 plan.  
**Execution status:** Complete.  
**Completion status:** All planned PM-authored deliverables committed; targeted validation passed 30/30 checks and rejected 5/5 malformed fixtures. Product requirements remain PM-proposed and require separate owner review.


## 10. Phase 7 completion record

**Completion date:** 2026-11-28  
**Canonical contract:** [CROSS-CUTTING-SYSTEM-REQUIREMENTS.md](../product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md) — v0.1.0-draft, 28 PM-proposed requirements / 28 acceptance criteria / 18 open questions.  
**Structured projection:** [CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json](../product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json).  
**Evidence:** [cross-cutting-system-requirements-contract.evidence.json](../product-rules/evidence/cross-cutting-system-requirements-contract.evidence.json).  
**CIRCLES:** [seven-step analysis](24-PHASE-7-CIRCLES-CROSS-CUTTING-SYSTEM-REQUIREMENTS.md).  
**Coverage:** [15-facet assessment](../product-rules/PHASE-7-CROSS-CUTTING-FACET-COVERAGE.md), [58-scenario failure/recovery matrix](../product-rules/PHASE-7-CROSS-CUTTING-FAILURE-RECOVERY-MATRIX.md), [validation report](../product-rules/PHASE-7-CROSS-CUTTING-VALIDATION.md).  
**Canonical Markdown revision:** `4b4d32b939e627fe84b4120ab43df6b5c733d421`.  
**Canonical Markdown SHA-256:** `sha256:f0b491d4ce97b7286ad9f56d35f61761204fffb36e0700f1778eae27da7dc06a`.  
**Validation:** 30/30 targeted checks passed; 5/5 malformed fixtures rejected.  
**Limitations:** no independent full Draft 2020-12/capture validation, upstream Software Rules CI, runtime or security tests, legal/privacy review, customer research, or production-readiness assessment. No product implementation, architecture, or Software Rules files were changed.  
**Authority:** the owner's approval authorized this plan's execution only; all 28 requirements remain PM-proposed pending separate owner review.  
**Next:** Phase 8 — cross-facet completeness and consistency review.
