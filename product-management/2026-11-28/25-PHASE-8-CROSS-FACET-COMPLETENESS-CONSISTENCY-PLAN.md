# Phase 8 — Cross-Facet Completeness and Consistency Review Plan

**Project:** ZeroDeck  
**Workstream:** PM-authored product rules  
**Phase:** 8  
**Status:** Plan drafted; awaiting explicit owner approval  
**Author:** ZeroDeck Product Management Agent  
**Workspace boundary:** `product-management/` only

## 1. Requested outcome

Review the complete ZeroDeck PM-authored requirements package across authentication, MVP-01, MVP-02, MVP-03 and cross-cutting system requirements. Establish whether the contracts are mutually consistent, traceable, complete across their stated scope and testable as a coherent product definition.

Phase 8 is a requirements-quality review. It does not implement the product, select technical architecture or providers, approve PM-proposed requirements, or claim runtime conformance.

## 2. Inputs in scope

Canonical contracts:
- `product-rules/contracts/IDENTITY-AUTHENTICATION.md`
- `product-rules/contracts/MANUAL-FILE-ANALYSIS.md`
- `product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md`
- `product-rules/contracts/WEBSITE-LINK-CHECKING.md`
- `product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md`

Supporting inputs:
- Each contract's synchronized declared-contract projection and retained evidence record.
- Existing 15-facet assessments and negative/failure/recovery matrices for Phases 3–7.
- Existing validation reports, CIRCLES analyses, owner-decision record, product-rules profile/schemas, contract index, tracker and workstream plan.
- Owner-approved scope and authentication decisions, distinguished from PM proposals and unresolved questions.

## 3. Review procedure

1. **Establish a pinned baseline.** Record the exact repository revisions/digests and current counts for all five canonical contracts, projections and evidence records. Confirm which requirements are owner-approved, PM-proposed, conditional, deferred or unresolved.
2. **Build cross-contract traceability.** Map shared actors, account/entitlement/activation state, platform boundaries, data ownership, lifecycle states, persistence/retention, errors/recovery, privacy/security controls, observability and external interactions to the requirements that define them.
3. **Audit the 15 official Software Rules facets across the package.** Check both individual-contract coverage and cross-contract interactions; distinguish not applicable, deferred, conditional and genuinely uncovered properties.
4. **Test consistency.** Identify direct contradictions, incompatible definitions, duplicated or conflicting ownership, inconsistent state transitions, incompatible timing/retention rules, mismatched terminology/identifiers, and conflicting web/Android expectations.
5. **Test completeness and testability.** Identify missing actors/triggers/preconditions/inputs/outcomes, boundary and failure states, recovery paths, authorization checks, observable acceptance criteria, and traceability gaps. Check normal and negative paths across feature boundaries.
6. **Reconcile projections and evidence.** Verify each canonical Markdown contract against its structured projection and evidence metadata, including IDs, normative text, counts, revision/digest and provenance, using the existing PM profile.
7. **Classify findings.** For each finding record severity, affected contracts/requirements/facets, evidence, consequence, recommended disposition and authority required. Separate mechanical corrections from product-policy decisions. Do not silently settle an owner question.
8. **Validate the review artifacts.** Run repeatable targeted checks for complete ID/criterion coverage, reference integrity, projection parity, evidence freshness, cross-contract links, finding closure/status and malformed fixtures. Report exact checks and limitations.
9. **Update the product-management tracker and workstream record.** Mark Phase 8 complete only if its exit criteria are met; otherwise record blockers and remaining findings precisely.

## 4. Required deliverables

- Cross-contract traceability matrix covering all five contracts and relevant cross-facet dependencies.
- Cross-facet completeness assessment across all 15 official facets.
- Contradiction, ambiguity, duplication and missing-state register.
- Cross-feature lifecycle and failure/recovery interaction matrix.
- Projection/evidence synchronization audit.
- Phase 8 validation report with exact test counts, results and limitations.
- Phase 8 completion/recommendation record, plus updated tracker, plan and product-rules index/workstream status where warranted.

All deliverables must remain under `product-management/`.

## 5. Decision and change controls

- Owner-approved decisions remain authoritative and must be traced exactly.
- PM-proposed requirements remain proposals. This review cannot promote them to owner-approved.
- Existing open owner questions remain open unless the owner has already decided them in a recorded source.
- If a finding requires a product-policy choice, record alternatives, consequences and a PM recommendation; do not choose on the owner's behalf.
- Do not rewrite canonical requirements or their structured projections merely to make the package appear consistent. Record proposed amendments separately unless an existing mechanical correction is clearly authorized by the approved review scope.
- No changes to product implementation, provider integrations, deployment, or the separate Software Rules repository.
- No claim of runtime correctness, security assurance, full independent JSON Schema Draft 2020-12 validation, legal/privacy approval or production readiness without the corresponding evidence.

## 6. Exit criteria

Phase 8 may be marked complete only when:
- All five canonical contracts and their projections/evidence have a pinned, reconciled baseline.
- Every requirement and acceptance criterion has a stable traceable identity and status.
- All 15 official facets have a package-level classification and evidence-backed assessment.
- Cross-contract contradictions and missing states are either corrected within authority or explicitly recorded as unresolved with owner action required.
- Cross-feature lifecycle, authorization, platform and failure/recovery interactions are traced.
- Projection/evidence synchronization is checked and any mismatch is corrected or explicitly blocked.
- Targeted validation results are reproducible and limitations are stated.
- The tracker and workstream record accurately reflect what is complete and what remains open.

A complete review does not mean every product question is decided. Explicitly unresolved owner decisions may remain, provided their scope and consequences are visible and do not make the contract package internally contradictory.

## 7. Approval boundary

Owner approval of this plan authorizes Phase 8 analysis, review-artifact authoring and updates inside `product-management/` only. It does not approve PM-proposed requirements, settle open product decisions, authorize implementation, or authorize changes to the Software Rules repository.

**Approval requested:** approve this Phase 8 plan so execution can begin.
