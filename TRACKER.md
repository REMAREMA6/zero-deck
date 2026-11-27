# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27
**Phase 1 inventory commit:** 5bd7ca93c4c300a2f72b26d324758c542c668957
**Phase 2 candidate inventory (scope-finalized) commit:** 2bdfe18b5f6568b366fb702600cce4eddf1b3d6a
**Phase 2 facet mapping (scope-finalized) commit:** d0a8e834b36da917ab26b8781d234c31e7a00c29
**Phase 2 owner decision commit:** 281eae0327d772f8b2c787edb9eda38ab0131c89
**Repository audit closeout commit:** a9ef68819d2793f524bea752f2ccd0ac541981f9  
**Phase 4 extraction blob:** 7cc66f225f82a23a2b94bc53c3364c200f990f64  
**Phase 4 facet audit blob:** 3b32ea7b60d90c30b1511a2e878a411cacc3a648  
**Phase 4 plan closeout blob:** 71c734f9283e03d32263f75cbc9e46014e1e7e03  
**Current phase:** Phase 6 — Completeness and conformance (not started)  
**Overall status:** Phases 0–4 are complete. The owner-approved MVP is manual file security analysis, quarantine/file disposition, and Pro-gated website/link checking (disabled until owner activation when paid revenue can fund costs). IP address tracking/investigation is a future candidate and excluded from MVP.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 6 — Completeness and conformance (not started)
- **Current task:** Independently assess the Phase 5 synthesis against the declared MVP replication scope: inspect every required property for omissions, evidence sufficiency, facet applicability, unresolved conflicts/unknowns and the need for runtime capture. Do not infer completeness from schema validity.
- **Completed:** Phases 0–5 complete. Phase 5 produced 6 owner rules, 27 provisional product-material rules, 7 scenarios, 15 facets, 757 property entries (45 capability/facet applicability + 712 scenario/facet/dimension entries), 12 evidence records and individual rule-to-evidence traceability. All 15 governing semantic facet payloads are mapped. Governing Draft 2020-12 schema validation, governing completeness tests, governing cross-record integrity tests and ZeroDeck-specific reference validation passed in [CI run #45997192513](https://github.com/REMAREMA6/zero-deck/actions/runs/45997192513). See `software-rules/PHASE-5-SYNTHESIS-AUDIT.md`.
- **Blockers / unresolved product properties:** No deployed ZeroDeck runtime target/build is available. File scan formats/engine/verdict criteria/data locality; quarantine storage/atomicity/recovery/retention/uninstall; URL parsing/disclosure/provider/authentication/entitlement lifecycle/quotas; interface runtime states; error/recovery mappings; actual integrations, configuration and performance targets remain unresolved. Preserve all open items; do not fabricate answers.
- **Next action:** Begin Phase 6 completeness and conformance review against every scenario and property dimension. Keep IP investigation outside MVP.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [x] Complete | 17-screen baseline inventory and route/source mapping committed; Screen 18 and extra routes/assets recorded separately. See SCREEN-INVENTORY.md. |
| 2 | Capability and facet mapping | [x] Complete | Owner selected manual file security analysis, quarantine/file disposition, and website/link checking. IP tracking is recorded as a future candidate and excluded from MVP. Scope decision, scenarios, exclusions and 15-facet map recorded. |
| 3 | Prior-art discovery and selection | [x] Complete | Exit gate satisfied. Selected Phase 4 references and provenance recorded; unresolved technical/commercial/privacy gaps handed forward. Link checking is Pro-gated and owner-activation-gated. See PHASE-3-PRIOR-ART-REGISTER.md. |
| 4 | Source-level rule extraction | [x] Complete | 31 source-derived rules, 28 platform/provider contract rules, 5 owner-declared link-gating rules, and a 15-facet audit across all three approved MVP capabilities. No ZeroDeck runtime behaviour or replication sufficiency is claimed. See `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md` and `re/zerodek-product-re/2026-11-27/PHASE-4-15-FACET-COVERAGE-AUDIT.md`. |
| 5 | Software Rules synthesis | [x] Complete | Synthesis exit gate satisfied. Includes 6 owner rules, 27 provisional product-material rules, 3 declared contracts, 12 evidence records, 7 scenarios, 15 facets and 757 property entries. All 15 semantic payload mappings, individual rule/evidence traceability, Draft 2020-12 schema validation, governing completeness/integrity suites and ZeroDeck cross-reference checks passed. Capture remains explicitly incomplete and not replication-sufficient. See `software-rules/PHASE-5-SYNTHESIS-AUDIT.md`. |
| 6 | Completeness and conformance | [ ] Not started | Validate coverage, traceability, schemas, and replication completeness. |

## Phase 0 — Governance and handoff

- [x] Read Software Rules `CONTRIBUTING.md`.
- [x] Read Software Rules `PLAN.md`.
- [x] Read Software Rules `TRACKER.md`.
- [x] Read Software Rules core model and replication-completeness rule.
- [x] Read this project's `RULES.md` and `re/MISSION.md`.
- [x] Read the Zerodek engagement understanding.
- [x] Create this project's `PLAN.md`.
- [x] Create this project's `TRACKER.md`.
- [x] Create this project's `CONTRIBUTING.md`.
- [x] Update root `README.md` with navigation to governance and active RE workspace.
- [x] Verify all files and links on GitHub.

**Phase 0 exit gate: satisfied.** A new chat can find the mission, current status, active task, blockers, next action, contribution process, and relevant source documents by following repository links.

## Phase 1 — Mockup inventory

[x] Complete — 17-screen baseline inventory, route/source mapping, asset review, scope labels, source/design divergences, missing handoffs, and limitations recorded. Inventory commit: 5bd7ca93c4c300a2f72b26d324758c542c668957.

Audit: `re/zerodek-product-re/2026-11-27/REPOSITORY-AUDIT.md`. Inventory: `re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md`.

The inspected tree contains 20 Next.js page files (19 named subroutes plus the root welcome route), 19 named Screen.tsx components, 20 Preview components, scanner product decisions, screen handoffs, and a separate Expo source tree. The canonical first 17 numbered screens are inventoried. Screen 18 (System Health/Audit Logs) and two extra routes (Real-Time Protection and Privacy Audit) are separately recorded. The scanner working draft's MVP labels are not treated as ZeroDeck startup MVP approval.

## Phase 2 — Capability and facet mapping

- [x] Build the evidence-backed candidate capability inventory without treating scanner materials as the full startup definition.
- [x] Map the selected MVP workflows and required properties to all 15 Software Rules facets.
- [x] Record cross-facet dependencies, scenario definitions, unknowns and scope guardrails.
- [x] Freeze the owner-approved MVP, included workflows, deferred candidates and exclusions.

**Phase 2 exit gate: satisfied.** The owner selected manual file security analysis, quarantine/file disposition, and website/link checking as ZeroDeck's first MVP. IP address tracking/investigation is recorded as CAP-13, a future candidate explicitly excluded from MVP. This closes scope definition only; detailed rule discovery, evidence collection and replication completeness remain future-phase work.

Artifacts: `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md`; `CAPABILITY-INVENTORY.md`; `CAPABILITY-FACET-MAPPING.md`.

Use the 15 Software Rules facets as the investigation taxonomy. The six labels UI, Data, Business logic, Functionality, UX, and System are not a parallel taxonomy for this engagement.

## Phase 3 — Prior-art discovery and selection

[x] Complete — exit gate satisfied 2026-11-27. See `re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md`.

The separate Android Security Scanner reconnaissance was audited and its relevant leads independently re-opened and pinned. Phase 4 references selected: Hypatia and HypatiaDatabases for file-analysis patterns; Android storage/SAF/Keystore official documentation for quarantine constraints; Google Web Risk Lookup API for URL checking; ClamAV as a comparison reference. Safe Browsing v4 and URLhaus community API were not selected for the commercial default path. No third-party code dependency is approved by this selection. Owner decision ZD-DEC-2026-11-27-02 makes link checking Pro-only and owner-activation-gated until paid revenue can fund costs. Remaining technical, commercial, privacy and runtime gaps are carried into Phase 4.

## Phase 4 — Source-level rule extraction

[x] Complete — exit gate satisfied 2026-11-27 for source-level extraction. See `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md` and `PHASE-4-15-FACET-COVERAGE-AUDIT.md`.

Extracted 31 source-derived rules from pinned Hypatia/HypatiaDatabases references; 28 documented Android/Web Risk platform/provider contract rules; and 5 owner-declared Pro/activation rules. The 15 facets were reviewed for each of the three approved MVP capabilities. Every claim is classified and linked to provenance/facets; unsupported properties remain explicitly unresolved. No ZeroDeck runtime behaviour, production provider call, malware execution, measured performance, or replication sufficiency is claimed.

## Phase 5 — Software Rules synthesis

[x] Complete — synthesis exit gate satisfied 2026-11-27. The deliverable contains 6 owner rules, 27 provisional product-material rules, 7 scenarios, all 15 semantic facet mappings, 757 property inventory entries, 12 evidence records and individual rule/evidence traceability. The ZeroDeck capture passed the governing Draft 2020-12 schema validator, governing completeness tests, governing cross-record integrity tests and ZeroDeck-specific reference checks in CI run #45997192513. Full audit: `software-rules/PHASE-5-SYNTHESIS-AUDIT.md`.

This closes synthesis only. The machine capture has no runtime executions, observations or runtime rules; all 757 inventory entries are not observed at runtime. The product-specific Software Rules remain explicitly incomplete and not replication-sufficient. Phase 6 must independently review omissions, applicability and evidence sufficiency. Preserve source-derived, documented-contract, owner-declared and unknown evidence classes; do not alter the governing specification repository.

## Phase 6 — Completeness and conformance

Not started.

Assess completeness against the explicit declared replication scope and required-property inventory. A valid schema or matching subset is not sufficient to claim faithful replication.

## Handoff protocol

At the beginning of every resumed session:

1. Read `README.md` and `RULES.md`.
2. Read `PLAN.md` and this `TRACKER.md`.
3. Read the engagement understanding and the active-task documents named above.
4. Read the relevant current Software Rules specification documents.
5. Verify repository state before relying on historical status notes.

At the end of every work session:

1. Update completed/in-progress/blocked checkboxes.
2. Update current phase, active task, blockers, and one next action.
3. Record new evidence paths and relevant source revisions.
4. Update the plan only if the agreed scope or sequence changed.
5. Verify the committed files and record the commit SHA.
