# Phase 5 — MVP-02 Quarantine and File Disposition: Validation Report

**Date:** 2026-11-28  
**Contract:** `ZD-CONTRACT-QUARANTINE-DISPOSITION` v0.1.0-draft  
**Canonical Markdown revision:** `ef98e91d6bc72bf09840d9fbd67175ea2e868b90`  
**Canonical Markdown SHA-256:** `sha256:e76291f7635b89221a785056af0912858225d278ee431495c1f118e96e508e9e`  
**Validation status:** Targeted structural, semantic, traceability and provenance checks passed; independent JSON Schema and runtime validation were not performed.

## 1. Deliverable inventory

| Artifact | Purpose |
|---|---|
| `contracts/QUARANTINE-FILE-DISPOSITION.md` | Canonical PM-authored MVP-02 product requirements |
| `contracts/QUARANTINE-FILE-DISPOSITION.declared-contract.json` | Structured Software Rules declared-contract projection |
| `evidence/quarantine-file-disposition-contract.evidence.json` | Retained declared-contract provenance record |
| `2026-11-28/21-PHASE-5-CIRCLES-QUARANTINE-DISPOSITION.md` | Seven-step CIRCLES analysis and PM recommendation |
| `PHASE-5-MVP-02-FACET-COVERAGE.md` | Assessment of all 15 official Software Rules facets and explicit requirement traceability |
| `PHASE-5-MVP-02-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` | 58 distinct negative, boundary, failure, interruption and recovery scenarios |
| This report | Validation outcomes, evidence and limitations |

## 2. Contract counts and status

- **38** unique normative requirements: `ZD-QUAR-001` through `ZD-QUAR-038`.
- **68** unique Given/When/Then acceptance criteria.
- **14** open product/owner questions: `ZD-Q-QUAR-001` through `ZD-Q-QUAR-014`.
- **15/15** official facets assessed.
- **58** distinct negative/failure/recovery scenarios: `QF01`–`QF58`.
- All 38 requirements remain **PM-proposed**.
- Contract lifecycle remains **draft**; no owner-approval metadata is present.

The owner approved the Phase 5 authoring plan. That approval does not approve the 38 product requirements, the CIRCLES recommendation, or any unresolved policy.

## 3. Targeted validation results

<badge color="success">16/16 checks passed</badge>

The following checks were run against the committed Markdown contract, structured projection, evidence record, facet assessment, scenario matrix and CIRCLES analysis:

1. SHA-256 digest of the exact canonical Markdown bytes matches the projection.
2. Canonical revision in the projection matches the immutable Markdown revision.
3. Markdown, projection and extension contain the same 38 requirement IDs in the same order.
4. Every projected normative statement exactly matches the canonical Markdown statement.
5. Every statement location matches its canonical requirement heading.
6. Requirement IDs are unique.
7. Acceptance-criterion IDs are unique.
8. All 38 requirements have acceptance criteria; total is 68.
9. Every requirement status is `pm-proposed`; contract lifecycle is `draft`.
10. Every facet reference is one of the 15 official IDs.
11. Every conditional requirement has an explicit condition.
12. Every verification method is in the PM profile's permitted method set.
13. Every requirement has a non-empty basis record using a permitted basis type.
14. The 14 open-question IDs are unique and all remain open.
15. The evidence reference, evidence ID, source revision and source URI agree with the declared contract.
16. All 15 facets are named in the assessment; all 38 requirement IDs are explicitly traceable to at least one facet; all scenario-matrix requirement references resolve; the matrix has 58 unique rows; the CIRCLES document contains all seven ordered steps.

### Negative-fixture checks

<badge color="success">5/5 rejected</badge>

Five malformed in-memory fixtures were checked against the targeted PM-profile constraints:

- Requirement with no acceptance criteria — rejected.
- Requirement with an invalid facet ID — rejected.
- Conditional requirement without a condition — rejected.
- Duplicate requirement ID — rejected.
- Owner-approved requirement without a decision reference — rejected.

These are targeted semantic/fixture checks, not a claim that a JSON Schema validator executed.

## 4. Evidence basis

### ZeroDeck owner and project material

- Owner-approved scope: `software-rules/SCOPE.md`, `software-rules/OWNER-RULES.md`, and `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md`.
- Product research: `product-management/2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`, §3.
- Capability and scenario boundaries: `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md`; `software-rules/SCENARIOS.md`; `software-rules/OPEN-PROPERTIES.md`.
- Platform/source extraction: `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md`, §4.
- UI source limitations and restore intent: `re/zerodek-product-re/2026-11-27/UI-SOURCE-DERIVED-RULES.md`, UI-SRC-007–009.

### External platform and security documentation consulted

- Android Storage Access Framework: https://developer.android.com/guide/topics/providers/document-provider and https://developer.android.com/training/data-storage/shared/documents-files
- Android app-specific storage: https://developer.android.com/training/data-storage/app-specific
- Android Keystore: https://developer.android.com/privacy-and-security/keystore
- MDN File System API and permission handling: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API and https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle/requestPermission
- OWASP File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP Cryptographic Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html

External sources establish platform/security constraints and guidance only. They do not establish ZeroDeck runtime behaviour, final implementation choices, or owner policy.

## 5. Known limitations — checks not performed

The following were **not** performed and must not be inferred from this report:

- Independent JSON Schema Draft 2020-12 validation of the declared-contract record and PM extension against the pinned upstream records/capture schemas.
- Full containing Software Rules capture validation or upstream Software Rules CI.
- Runtime/browser/Android tests of a ZeroDeck quarantine service.
- Real SAF provider tests across supported Android versions and devices.
- Browser file-handle permission, persistence, restore or deletion tests across browsers.
- Copy/move/delete/restore atomicity, crash-consistency, concurrency or idempotency tests.
- Cryptographic design review, key-loss/rotation/backup tests, security audit or penetration test.
- Malware corpus evaluation, false-positive/false-negative benchmark, or validation of the confirmed-threat threshold.
- Storage/performance/resource benchmarks or supported file-size/capacity measurements.
- Customer interviews, usability research, legal review, privacy review or production-readiness assessment.

The PM profile schema and pinned Software Rules compatibility target were inspected, and the projection was checked against their stated field/enum constraints. A schema validator was not available in this execution, so no full schema-validity claim is made.

## 6. Unresolved owner decisions and release implications

The 14 open questions remain open, especially:
- automatic quarantine versus user confirmation;
- confirmed-threat threshold;
- exact quarantine/isolation mechanism and source disposition;
- restore eligibility/freshness policy;
- integrity algorithm/metadata;
- permanent-deletion guarantee;
- retention period and configuration;
- encryption and key lifecycle;
- backup, uninstall, app-data-clear and device-migration behaviour;
- web quarantine capability;
- supported file sizes and storage capacity;
- audit fields/access/retention.

The 30-day retention value remains a proposal and was not adopted. No cipher, key hierarchy, storage mechanism, API, browser/Android library or implementation architecture was selected.

## 7. Completion conclusion

Phase 5 authoring deliverables are complete within the approved plan's product-management boundary. The contract is a technology-independent PM draft with explicit evidence and unresolved decisions. It is not an owner-approved product contract, implementation, runtime capture, security certification or proof that ZeroDeck can currently quarantine files.

No product implementation files and no Software Rules repository files were changed.
