# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27  
**Current phase:** Phase 1 — Mockup inventory  
**Overall status:** Phase 0 governance and handoff setup is complete. The 17-screen inventory has not yet been produced. Existing `re/oss-recon/` research is for an Android Security Scanner project and is not accepted as Zerodek capability coverage.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 1 — Mockup inventory
- **Current task:** Audit and classify the complete Zerodek reference repository before inspecting the individual screens. The repository contains both design handoffs and substantial existing application source.
- **Completed:** Read `REMAREMA6/software-rules/CONTRIBUTING.md`, `PLAN.md`, `TRACKER.md`, `specification/CORE.md`, and `specification/REPLICATION-COMPLETENESS.md). Read this project's `RULES.md`, `re/MISSION.md`, and engagement understanding.
- **Blockers:** None for governance setup. The 17-screen mockup inventory has not started.
- **Next action:** Complete governance setup, then inspect the Zerodek repository tree and all 17 mock screens to build the screen inventory.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [~] In progress | Classify the full reference repository, then inventory all 17 screens and distinguish mockup intent from existing code and demo behaviour. |
| 2 | Capability and facet mapping | [ ] Not started | Map all required capabilities/properties to the 15 Software Rules facets. |
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

Not started.

Required outputs will be stored under `re/zerodek-product-re/2026-11-27/screen-inventory/`. The reference repository contains existing application source and design handoffs as well as screen previews. Classify evidence by origin and maturity. Do not treat placeholder/demo code as implemented product behaviour, and do not treat source code as proof of deployed runtime behaviour.

## Phase 2 — Capability and facet mapping

Not started.

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
