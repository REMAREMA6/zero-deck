# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27  
**Current phase:** Phase 2 — Capability and facet mapping (next)  
**Overall status:** Phase 0 governance and Phase 1 screen inventory are complete. ZeroDeck is the broader ethical-hacking and penetration-testing startup; Security Scanning is one candidate capability, not the startup definition or automatic launch scope.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 2 — Capability and facet mapping
- **Current task:** Derive ZeroDeck's candidate capability inventory from the screen inventory and owner context; distinguish the startup direction, candidate service areas, declared MVP selection, later candidates, and unresolved scope before mapping properties to the 15 Software Rules facets.
- **Completed:** Phase 1 screen inventory committed at `re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md`; all 17 baseline screens mapped to route/preview/source handoffs and assigned stable IDs. Screen 18 and two additional routes are separately recorded. Uploaded images were inspected and classified. Product scope labels are bounded to the scanner working draft; ZeroDeck's actual MVP selection remains open.
- **Blockers:** ZeroDeck's actual MVP capability boundary is not yet explicitly selected. Do not infer it from the scanner screens or assume every ethical-hacking/penetration-testing capability is in scope.
- **Next action:** Begin Phase 2 by building the startup-wide candidate capability inventory and recording which capabilities are confirmed for MVP, later candidates, or unresolved.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [x] Complete | 17-screen baseline inventory and route/source mapping committed; Screen 18 and extra routes/assets recorded separately. See SCREEN-INVENTORY.md. |
| 2 | Capability and facet mapping | [ ] Not started | Next phase: establish ZeroDeck candidate capability inventory and MVP boundary, then map required properties to the 15 Software Rules facets. |
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

[x] Complete — 17-screen baseline inventory, route/source mapping, asset review, scope labels, and limitations recorded.

Audit: `re/zerodek-product-re/2026-11-27/REPOSITORY-AUDIT.md`. Inventory: `re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md`.

The inspected tree contains 20 Next.js page files (19 named subroutes plus the root welcome route), 19 named Screen.tsx components, 20 Preview components, scanner product decisions, screen handoffs, and a separate Expo source tree. The canonical first 17 numbered screens are inventoried. Screen 18 (System Health/Audit Logs) and two extra routes (Real-Time Protection and Privacy Audit) are separately recorded. The scanner working draft's MVP labels are not treated as ZeroDeck startup MVP approval.

## Phase 2 — Capability and facet mapping

Not started. Next: derive the ZeroDeck-wide candidate capability inventory and establish the explicit MVP boundary before mapping to the 15 Software Rules facets.

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
