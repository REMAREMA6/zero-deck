# Phase 5 — MVP-02 Quarantine and File Disposition: Execution Plan

**Plan date:** 2026-11-28  
**Workstream:** PM-authored product rules  
**Phase:** 5 of 9  
**Status:** Owner-approved; Phase 5 execution completed  
**Scope:** MVP-02 — Quarantine and file disposition only  
**Workspace boundary:** `product-management/`

## 1. Requested outcome

Author a complete, implementation-ready, technology-independent product requirements contract for ZeroDeck's MVP-02 quarantine and file-disposition capability. The contract must define observable user-facing and system-level product behaviour while preserving unresolved owner policy as unresolved.

The Product Management Agent recommends and documents requirements. It does not make owner policy decisions, select implementation technology, or change product implementation.

## 2. One-line work plan

After approval, read and follow all seven installed Product Management Agent CIRCLES skills; inspect the approved MVP scope, PM contract profile, MVP-01 contract for boundary/traceability only, relevant ZeroDeck source/evidence and platform constraints; then produce the MVP-02 canonical contract, synchronized structured projection and evidence, CIRCLES analysis, 15-facet coverage assessment, negative/failure/recovery matrix, and targeted validation. Update indexes and tracker only after checks pass.

## 3. In-scope analysis

The Phase 5 analysis will define product requirements and observable outcomes for the following areas, to the extent supported by owner decisions, source evidence, platform contracts, or clearly labelled PM inference:

- **Quarantine intent and entry:** user-initiated disposition after a file-analysis result; eligibility, confirmation, rejected requests, repeated requests, and clear separation between analysis and disposition.
- **Meaning and guarantees:** what ZeroDeck means by “quarantined”; what protection or isolation the product can truthfully claim; limits where the platform cannot provide a guarantee.
- **File identity and integrity:** identifying the affected original, preserving content, detecting unexpected changes, and avoiding accidental action on a different file.
- **Quarantine lifecycle:** accepted, in progress, quarantined, unavailable, failed, interrupted, restored, and permanently deleted states where applicable; state transitions and user-visible truthfulness.
- **Access and authorization:** file ownership/access boundaries, platform-granted permissions, reauthorization, and preventing unauthorized access or disposition.
- **Restore and recovery:** user-initiated restore, destination conflicts, unavailable destinations, integrity checks, partial failures, interrupted recovery, and truthful reporting. Do not assume restore is always possible.
- **Deletion and retention:** user intent, confirmation, recoverability, retention duration, cleanup, legal/operational exceptions, and consequences of deletion. Record undecided policy rather than choosing it.
- **Key and protected-data lifecycle:** consequences of encryption/protection if a proposed or existing quarantine design uses it, including key loss, rotation, backup, migration, and device loss. These are conditional product concerns, not a decision to encrypt or to use a particular key store.
- **Platform differences:** shared web/Android product semantics and capability-specific limitations, including what happens when a platform cannot safely perform a requested action.
- **Privacy and data handling:** file content, metadata, identifiers, diagnostics, logs, backups, export, and deletion boundaries.
- **Errors, recovery and user communication:** clear failure states, retry safety, duplicate actions, cancellation/interruption, safe next steps, and no false claims that a file is protected, restored, or deleted.
- **Resource and operational boundaries:** bounded storage/resource behaviour, capacity exhaustion, cleanup failures, and measurable targets only where evidence or owner decisions support them.

The analysis must distinguish requirements for product outcomes from the implementation mechanism used to achieve them.

## 4. Explicit exclusions

Phase 5 will not author or change requirements for:

- MVP-01 scanning engines, detection logic, scan outcomes, scan history, or analysis lifecycle, except a minimal input/result dependency needed to define MVP-02 entry.
- MVP-03 website/link checking, URL providers, Pro entitlement, owner activation, quotas, or provider budgets.
- Authentication/account lifecycle beyond referencing the existing authentication contract where identity/authorization dependencies are necessary.
- A specific encryption algorithm, key hierarchy, Android Keystore API, browser storage mechanism, filesystem API, database schema, programming language, framework, library, cloud service, or deployment architecture.
- Automatic/background scanning, automatic quarantine, or other unapproved autonomous file actions.
- UI replication or product implementation tasks.
- Security certification, penetration testing, runtime conformance, or production-readiness claims.

Do not silently import behaviour from reference products, platform examples, or a proposed architecture as an owner-approved ZeroDeck decision. Do not broaden MVP-02 into a general file manager or endpoint-protection suite.

## 5. Planned deliverables

1. `product-management/2026-11-28/20-PHASE-5-MVP-02-QUARANTINE-DISPOSITION-PLAN.md` — this plan and approval/execution record.
2. `product-management/2026-11-28/21-PHASE-5-CIRCLES-QUARANTINE-DISPOSITION.md` — seven-step CIRCLES analysis with evidence/inference distinctions, ranked needs, alternatives, recommendation, trade-offs and open questions.
3. `product-management/product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md` — canonical PM-authored MVP-02 requirements contract.
4. `product-management/product-rules/contracts/QUARANTINE-FILE-DISPOSITION.declared-contract.json` — structured projection synchronized to the canonical contract.
5. `product-management/product-rules/evidence/quarantine-file-disposition-contract.evidence.json` — provenance and retained evidence.
6. `product-management/product-rules/PHASE-5-MVP-02-FACET-COVERAGE.md` — assessment of all 15 official Software Rules facets, with applicability/deferment/unresolved classifications and rationale.
7. `product-management/product-rules/PHASE-5-MVP-02-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — concrete negative, boundary, failure, interruption, restore, deletion, integrity and recovery scenarios.
8. `product-management/product-rules/PHASE-5-MVP-02-VALIDATION.md` — structural, semantic, parity, traceability, provenance and negative-fixture validation results and limitations.
9. Updates to `product-management/product-rules/README.md`, `product-management/2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md`, `product-management/TRACKER.md`, and `product-management/PLAN.md` to record the phase outcome and next phase.

Names may be adjusted only where existing repository conventions require it; deliverable substance and scope must remain unchanged.

## 6. Completion and quality gates

Phase 5 may be marked complete only when:

- Every normative requirement has a stable unique ID, explicit PM authorship/provenance, relevant official facet mapping, and observable acceptance criteria.
- Each material requirement traces to an owner decision, source/design evidence, platform/provider contract, or clearly labelled PM inference.
- Normal, alternate, invalid, unsupported, denied, interrupted, failed, repeated, and recoverable/irrecoverable paths are covered where applicable.
- Quarantine, restore, permanent deletion, retention, and cleanup are distinct states/actions; no one is silently treated as another.
- The contract states what the product can and cannot guarantee about isolation/protection, file identity, and integrity; it must not claim stronger protection than the evidence supports.
- Original-file handling and data-loss consequences are explicit; no destructive behaviour is implied by a vague “quarantine” label.
- Encryption/key lifecycle requirements are conditional on a justified design choice; no cryptographic or key-management policy is invented.
- Restore conflicts, missing/unavailable files, partial failures, and interrupted operations have truthful outcomes and recovery expectations.
- Web and Android shared semantics and platform-specific capability limits are both assessed.
- Retention, deletion timing, backups, diagnostics, and legal exceptions are explicit or recorded as unresolved owner decisions; no retention schedule is invented.
- All 15 official Software Rules facets are assessed. Not-applicable and deferred classifications include rationale and consequence.
- Negative/failure/recovery scenarios are traceable to contract requirements and exercise meaningful boundaries.
- Markdown, structured projection, and evidence agree on requirement IDs, order, statements, criteria, authorship, revision, and digest.
- Validation reports exactly what was checked. Targeted checks must not be represented as full JSON Schema Draft 2020-12 validation, upstream Software Rules CI, runtime testing, security audit, or production readiness unless actually performed.
- MVP-01 remains its own contract; MVP-03 remains outside Phase 5.
- Tracker and indexes link to exact artifacts and preserve the distinction between PM-proposed requirements and owner-approved decisions.

Unknown policy must remain open or be represented as conditional requirements. In particular, do not invent quarantine storage location, encryption requirement/algorithm, key custody/recovery, restore semantics, overwrite behaviour, retention duration, deletion schedule, backup treatment, cross-device availability, or uninstall/device-loss behaviour.

## 7. Execution boundary

Execution begins only after the Product Owner explicitly approves this exact written plan. Once approved, the seven CIRCLES skills must be read and followed. All created or modified files must remain under `product-management/`. No product implementation files and no Software Rules repository files may be changed. Any scope expansion or material owner decision must be surfaced for approval rather than silently incorporated.

## 8. Approval record

**Status: approved by the Product Owner on 2026-11-28.**  
**Approval:** The owner explicitly stated: “I approve finish phase 5.”  
**Execution:** Completed on 2026-11-28 within the approved scope. See the Phase 5 validation report and tracker for the deliverables and exact limitations.

## 9. Completion record

Phase 5 is complete within the approved product-management boundary.

**Canonical contract:** `product-management/product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md`  
**Contract ID/version:** `ZD-CONTRACT-QUARANTINE-DISPOSITION`, `0.1.0-draft`  
**Canonical Markdown revision:** `ef98e91d6bc72bf09840d9fbd67175ea2e868b90`  
**SHA-256:** `sha256:e76291f7635b89221a785056af0912858225d278ee431495c1f118e96e508e9e`

Completed deliverables:
1. Canonical contract: 38 PM-proposed requirements, 68 acceptance criteria, 14 open owner questions.
2. Synchronized Software Rules declared-contract projection and retained evidence.
3. Seven-step CIRCLES analysis and PM recommendation.
4. Assessment of all 15 official Software Rules facets, with explicit requirement-to-facet traceability.
5. 58-scenario negative/failure/recovery matrix.
6. Validation report: 16/16 targeted structural/semantic/traceability/provenance checks passed; 5/5 malformed fixtures rejected.

All requirements remain PM-proposed. Owner approval of this plan is not approval of the product contract or its unresolved policies. The proposed 30-day retention value was not adopted. Automatic quarantine, confirmed-threat threshold, isolation/storage design, source removal, restore policy, deletion guarantee, retention, encryption/key lifecycle, backup/uninstall behaviour, web capability and capacity limits remain open.

No product implementation or Software Rules repository files were changed. No independent Draft 2020-12 validation, upstream Software Rules CI, runtime/browser/Android test, security audit, penetration test, malware benchmark, performance benchmark, or customer research was performed. See `product-management/product-rules/PHASE-5-MVP-02-VALIDATION.md` for the exact validation boundary.

**Phase 5 status: complete. Phase 6 — MVP-03 website and link checking — is next and requires a separate written plan and explicit owner approval.**
