# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27  
**Current phase:** Phase 1 — Mockup inventory  
**Overall status:** Phase 0 governance and handoff setup is complete. Phase 1 repository audit is underway. The reference repository contains Android Security Scanner materials. The owner has clarified that Security Scanning is one candidate service/capability within the broader ZeroDeck ethical-hacking and penetration-testing startup, not the definition of the startup.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 1 — Mockup inventory
- **Current task:** Inventory the canonical 17 screens and map each to its reference assets, handoff documents, routes, and implementation components. Classify scanner-related findings as one capability area and do not equate them with the full startup or assume all are MVP scope.
- **Completed:** Re-read this project's governance and current tracker/plan/contribution guide; inspected the reference repository metadata, complete recursive tree (284 paths), route/component counts, `package.json`, Prisma schema, sample route files, and scanner-specific handoff/product-decision documents. Recorded findings in `REPOSITORY-AUDIT.md`. Owner clarified ZeroDeck's broader startup identity and the scanner materials' place within it; recorded in `ENGAGEMENT-UNDERSTANDING.md`.
- **Blockers:** No identity blocker remains. The explicit MVP capability boundary has not yet been established; do not silently treat every scanner screen or every possible penetration-testing capability as MVP scope.
- **Next action:** Complete the evidence-based 17-screen inventory, then map candidate capabilities to the Software Rules facets and explicitly separate MVP scope from later candidates and unresolved scope decisions.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [~] In progress | Repository audit recorded; owner clarified that scanner materials are one ZeroDeck capability area, not the startup definition; proceed with screen-by-screen inventory and keep MVP scope distinct. |
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

[~] In progress — preliminary repository audit completed; product identity confirmation pending.

Audit: `re/zerodek-product-re/2026-11-27/REPOSITORY-AUDIT.md`.

The reference repository contains 19 route page files and 19 named screen components, plus scanner-specific product decisions, handoff documents, and a separate Expo source tree. Owner clarification: these materials concern a Security Scanner capability within the broader ZeroDeck ethical-hacking/penetration-testing startup. They do not define the startup or establish MVP scope. Inventory the canonical 17 screens and distinguish mockup intent, source implementation, demo/local state, connected behaviour, later candidates, MVP status, and unknowns.

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
