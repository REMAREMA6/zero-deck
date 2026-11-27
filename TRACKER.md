# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27
**Phase 1 inventory commit:** 5bd7ca93c4c300a2f72b26d324758c542c668957
**Phase 2 candidate inventory commit:** 1be6140cf7a892dc5577c603086edc6a625eabac
**Phase 2 facet mapping commit:** 93448290f9c0bf1d7ae47867a26035bc2671c8dc
**Repository audit closeout commit:** a9ef68819d2793f524bea752f2ccd0ac541981f9  
**Current phase:** Phase 2 — Capability and facet mapping (in progress; exit gate pending owner decision) (owner decision required)  
**Overall status:** Phase 0 and Phase 1 are complete. Phase 2 candidate inventory and 15-facet mapping are documented. Phase 2 exit is pending the owner's explicit selection of ZeroDeck's first launch MVP capability and workflows.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 2 — Capability and facet mapping
- **Current task:** Obtain the owner's decision on which evidence-backed candidate service/capability is the first ZeroDeck launch MVP and which workflows are included. Then freeze the replication scope and complete the required-property inventory.
- **Completed:** Phase 1 screen inventory is complete. Phase 2 evidence-backed candidate capability inventory committed at `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md`; candidate workflows and dependencies are documented. The 15-facet mapping, candidate scenario set, cross-facet dependencies, required-property questions and unknowns are committed at `re/zerodek-product-re/2026-11-27/CAPABILITY-FACET-MAPPING.md`.
- **Blockers:** Owner has not explicitly selected ZeroDeck's launch MVP. The Android Security Scanner working draft proposes its own scanner MVP (manual file scanning, quarantine and link checking), but owner instruction forbids inferring that this is ZeroDeck's first MVP from repository contents. No other capability area is described in the supplied product materials.
- **Next action:** Ask the owner to select the first launch capability/service and included workflows. Once decided, freeze scope/exclusions and mark applicable required properties for Phase 2 exit.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [x] Complete | 17-screen baseline inventory and route/source mapping committed; Screen 18 and extra routes/assets recorded separately. See SCREEN-INVENTORY.md. |
| 2 | Capability and facet mapping | [~] In progress — owner decision required | Candidate inventory and 15-facet mapping are complete; declared ZeroDeck MVP and included workflows are not selected. See CAPABILITY-INVENTORY.md and CAPABILITY-FACET-MAPPING.md. |
| 3 | Prior-art discovery and selection | [ ] Not started | Audit prior work; identify and verify relevant open-source sources. |
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
- [x] Map candidate workflows and required properties to the 15 Software Rules facets.
- [x] Record cross-facet dependencies, scenario definitions, unknowns and scope guardrails.
- [?] Freeze the ZeroDeck launch MVP, included workflows, and exclusions after explicit owner selection.

**Status:** Investigation/mapping work complete; formal phase exit is pending the owner's MVP selection. The scanner document's proposed MVP is not assumed to be ZeroDeck's approved MVP.

Artifacts: `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md`; `re/zerodek-product-re/2026-11-27/CAPABILITY-FACET-MAPPING.md`.

Use the 15 Software Rules facets as the investigation taxonomy. The six labels UI, Data, Business logic, Functionality, UX, and System are not a parallel taxonomy for this engagement.

## Phase 3 — Prior-art discovery and selection

Not started.

Existing `re/oss-recon/` records are from a separate Android Security Scanner engagement. Audit their relevance; do not count them as Zerodek research without evidence that a specific source/capability is applicable.

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
