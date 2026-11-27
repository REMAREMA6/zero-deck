# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27
**Phase 1 inventory commit:** 5bd7ca93c4c300a2f72b26d324758c542c668957
**Phase 2 candidate inventory (scope-finalized) commit:** 2bdfe18b5f6568b366fb702600cce4eddf1b3d6a
**Phase 2 facet mapping (scope-finalized) commit:** d0a8e834b36da917ab26b8781d234c31e7a00c29
**Phase 2 owner decision commit:** 281eae0327d772f8b2c787edb9eda38ab0131c89
**Repository audit closeout commit:** a9ef68819d2793f524bea752f2ccd0ac541981f9  
**Current phase:** Phase 3 — Prior-art discovery and selection (in progress)  
**Overall status:** Phases 0–2 are complete. The owner-approved MVP is manual file security analysis, quarantine/file disposition, and website/link checking. IP address tracking/investigation is recorded as a future candidate and excluded from MVP.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 3 — Prior-art discovery and selection
- **Current task:** Complete the prior-art source-selection audit for manual file security analysis, quarantine/file disposition, and website/link checking. See `re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md`.
- **Completed:** Phase 1 and Phase 2. Phase 3 initial audit of `re/oss-recon/`, source screening, and pinned-source verification recorded in `PHASE-3-PRIOR-ART-REGISTER.md` (commit `164246d7a96636cb7c8a6599ecc66ac7cd2bac48`).
- **Blockers:** No execution blocker. Phase 3 has open verification gates: Web Risk contract/privacy/terms; threat-feed rights; file-engine choice and data rights; Android quarantine feasibility and source selection.
- **Next action:** Verify the Web Risk Lookup API contract, commercial terms, privacy, quotas and response semantics; then finish feed-rights and file-engine/quarantine candidate checks. Keep IP tracking outside MVP research.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [x] Complete | 17-screen baseline inventory and route/source mapping committed; Screen 18 and extra routes/assets recorded separately. See SCREEN-INVENTORY.md. |
| 2 | Capability and facet mapping | [x] Complete | Owner selected manual file security analysis, quarantine/file disposition, and website/link checking. IP tracking is recorded as a future candidate and excluded from MVP. Scope decision, scenarios, exclusions and 15-facet map recorded. |
| 3 | Prior-art discovery and selection | [~] In progress | Initial audit and candidate screening recorded; commercial URL provider, data rights, engine choice and quarantine feasibility remain open. See PHASE-3-PRIOR-ART-REGISTER.md. |
| 4 | Source-level rule extraction | [ ] Not started | Inspect source code and record auditable source-derived rules. |
| 5 | Software Rules synthesis | [ ] Not started | Create separate product-specific `software-rules/` deliverable. |
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

[~] In progress — initial audit and candidate screening recorded in `re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md`.

The prior `re/oss-recon/` records are from a separate Android Security Scanner engagement. Relevant leads were independently re-opened and pinned; unrelated admin/later-release work was excluded. No source is yet approved for direct code adoption. Web Risk commercial contract/API verification, indicator-feed rights, file-engine selection, and Android quarantine feasibility remain open. The Phase 3 exit gate has not been met.

## Phase 4 — Source-level rule extraction

Not started.

Every adopted rule must carry source provenance and a clear evidence class. Source-derived rules must not be represented as runtime-verified Zerodek behaviour.

## Phase 5 — Software Rules synthesis

Not started.

The deliverable belongs in the separately designated `software-rules/` folder and must follow the current governing Software Rules format/schema version. Do not copy the governing specification wholesale or alter its source repository.

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
