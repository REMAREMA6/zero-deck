# Phase 4 — MVP-01 Manual File Security Analysis: Completion Plan

**Plan date:** 2026-11-28  
**Workstream:** PM-authored product rules  
**Phase:** 4 of 9  
**Status:** Owner-approved; Phase 4 execution completed  
**Scope:** MVP-01 — Manual file security analysis only  
**Workspace boundary:** `product-management/`

## 1. Requested outcome

Author a complete, implementation-ready, technology-independent product requirements contract for ZeroDeck's MVP-01 manual file security analysis capability, aligned with the current PM contract profile and the Software Rules declared-contract model.

The Product Management Agent will recommend requirements and preserve evidence. It will not decide unresolved owner policy, choose implementation technology, or change product implementation.

## 2. One-line work plan

Apply the seven CIRCLES skills to MVP-01, inspect the relevant approved product scope and existing product-rule profile, then produce a canonical requirements contract, structured declared-contract projection, retained evidence, facet/negative-case coverage, CIRCLES record, and validation report; update the phase tracker and indexes only after the artifacts pass their stated checks.

## 3. In-scope analysis

The Phase 4 analysis will define observable product behaviour for:

- **Manual initiation and file selection:** user intent, selection boundaries, supported selection sources and platform-specific capability differences, without assuming a particular platform API.
- **Input eligibility:** file identity and metadata needed to decide whether an item can be analysed; supported/unsupported, empty, corrupt, inaccessible, encrypted/password-protected, oversized, and otherwise unreadable inputs.
- **Analysis lifecycle:** accepted, rejected, queued/in progress, completed, cancelled, interrupted, timed out, and failed states where applicable.
- **Security outcomes:** verdict vocabulary and meaning; known detection, no known detection, suspicious/inconclusive, and unable-to-analyse outcomes must not be conflated. A clean/no-match result must not be represented as proof that a file is safe.
- **Result communication:** evidence and explanation shown to the user, limitations, uncertainty, timestamps or freshness where required, and safe next-step guidance.
- **User control and recovery:** cancellation, retry, duplicate/repeated requests, interrupted work, and recoverable versus terminal errors.
- **Privacy and data handling:** what file content and metadata may be accessed, transmitted, retained, exposed in logs or diagnostics, and deleted; distinguish owner-declared policy from unresolved choices.
- **Resource and reliability expectations:** bounded resource use, responsiveness, deterministic result handling, and failure behaviour, without inventing numeric targets.
- **Cross-platform consistency:** shared product semantics across web and Android while recording capability differences and unsupported states explicitly.

The analysis will distinguish product requirements from engine/provider behaviour and from implementation decisions.

## 4. Explicit exclusions

Phase 4 will not author requirements for:

- MVP-02 quarantine, restore, deletion/disposition, or quarantine retention.
- MVP-03 URL/website checking, providers, Pro entitlement, owner activation, quotas, or provider budgets.
- Authentication/account lifecycle beyond referencing already-recorded supporting requirements where a dependency must be noted.
- A specific scanning engine, antivirus vendor, API, file-format library, programming language, framework, database schema, storage architecture, or hosting provider.
- Product UI screen replication or implementation tasks.
- Security certification, penetration testing, runtime conformance, or production-readiness claims.

Do not silently import assumptions from reference-product behaviour into ZeroDeck requirements.

## 5. Planned deliverables

1. `product-management/2026-11-28/18-PHASE-4-MVP-01-MANUAL-FILE-ANALYSIS-PLAN.md` — this approved plan.
2. `product-management/2026-11-28/19-PHASE-4-CIRCLES-MANUAL-FILE-ANALYSIS.md` — seven-step CIRCLES reasoning, including explicit evidence/inference distinctions.
3. `product-management/product-rules/contracts/MANUAL-FILE-ANALYSIS.md` — canonical PM-authored requirements contract.
4. `product-management/product-rules/contracts/MANUAL-FILE-ANALYSIS.declared-contract.json` — structured projection synchronized to the canonical contract.
5. `product-management/product-rules/evidence/manual-file-analysis-contract.evidence.json` — provenance and retained evidence for the declared contract.
6. `product-management/product-rules/PHASE-4-MVP-01-FACET-COVERAGE.md` — assessment across all 15 official Software Rules facets, with applicable, not-applicable, deferred, and unresolved classifications justified.
7. `product-management/product-rules/PHASE-4-MVP-01-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — concrete negative, boundary, failure, recovery, interruption, and inconclusive-result scenarios.
8. `product-management/product-rules/PHASE-4-MVP-01-VALIDATION.md` — structural, semantic, parity, traceability, provenance, and negative-fixture validation results and limitations.
9. Updates to `product-management/product-rules/README.md`, `product-management/2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md`, `product-management/TRACKER.md`, and `product-management/PLAN.md` to record the completed phase and the next phase.

File names may be adjusted only if the existing repository conventions require it; the scope and deliverable substance must remain unchanged.

## 6. Completion and quality gates

Phase 4 may be marked complete only when:

- Every requirement has a stable unique ID, explicit PM authorship/provenance, relevant facet mapping, and observable acceptance criteria.
- Every material requirement is traceable to the MVP-01 scope, an owner decision, source evidence, or a clearly labelled product inference.
- The contract covers normal, alternate, invalid, unsupported, inconclusive, failure, cancellation, interruption, and recovery behaviour where applicable.
- Verdicts distinguish a known detection from no known detection and from inability to analyse; no requirement implies a guarantee of safety.
- File-content access, transmission, retention, diagnostics, and deletion are explicit or recorded as unresolved owner decisions; no privacy policy is invented.
- Web and Android semantics are reconciled without pretending their file-access capabilities are identical.
- All 15 Software Rules facets are assessed; non-applicability and deferral are reasoned rather than omitted.
- The negative/failure/recovery matrix is traceable to requirements and includes meaningful boundary cases.
- Markdown, structured projection, and evidence agree on requirement IDs, order, statements, criteria, authorship, revision, and digest.
- Validation reports exactly what was checked and what was not. Targeted checks must not be described as full JSON Schema Draft 2020-12 validation, upstream Software Rules CI, runtime testing, security audit, or production readiness unless those checks were actually performed.
- MVP-02 and MVP-03 remain outside the contract.
- Tracker and indexes point to the exact artifacts and identify Phase 5 as next.

Unknown values must remain open or be represented as conditional requirements. Do not invent numeric thresholds, file limits, supported formats, verdict confidence thresholds, retention periods, or engine guarantees.

## 7. Execution record

The Product Owner explicitly approved this written plan on 2026-11-28. The seven CIRCLES skills were read and followed. The MVP-01 contract, structured projection, retained evidence, 15-facet assessment, negative/failure/recovery matrix, CIRCLES analysis and validation report were authored under `product-management/`. The repository artifacts and synchronized revision/digest were verified. No implementation or Software Rules repository files were changed.

Phase 4 is complete. Phase 5 requires its own written plan and separate owner approval.

## 8. Approval record

**Status: approved by the Product Owner on 2026-11-28.**
