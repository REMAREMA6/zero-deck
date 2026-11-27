# ZeroDeck Product Planning Tracker

**Plan:** [PLAN.md](PLAN.md)  
**Workspace:** `product-management/`  
**Started:** 2026-11-27  
**Method:** CIRCLES — seven steps  
**Overall status:** [~] In progress  
**Current step:** S — Summarize recommendation

> This tracker is the operational source of truth for product-planning progress. Update it whenever work starts, changes status, becomes blocked, or completes. A new session must be able to resume from this file and the linked records without relying on chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs owner decision or verification

## Current position

- **Owner authorization:** [x] Owner explicitly instructed: document the plan, add a tracker, and start the product planning/research.
- **Plan:** [x] `PLAN.md` created and committed.
- **Tracker:** [x] Created.
- **Current step:** R — Report customer needs.
- **Current product scope authority:** Owner-approved three-capability MVP (manual file security analysis; quarantine/file disposition; website/link checking subject to Pro entitlement AND owner activation).
- **Current product evidence status:** ZeroDeck-specific Software Rules remains Draft, incomplete and not replication-sufficient. Product planning must preserve unknowns.
- **Primary business outcome:** Validate real market demand, per the owner's clarification on 2026-11-27. No final owner-approved target cohort has been selected. Segment B is provisionally recommended for needs discovery; practitioner and business/licensed segments remain alternatives.
- **I — Identify result:** Three candidate segments were compared. Segment B (non-technical individuals who regularly receive/download unfamiliar files and links) is recommended as a provisional cohort for needs discovery, not an owner-approved target market. Segment A (security practitioners) and Segment C (businesses/licensed organisations) remain alternatives.
- **Next action:** Begin R completed as a secondary-research needs synthesis in `2026-11-27/03-R-NEEDS.md`; primary customer interviews remain outstanding. C completed as a provisional evidence-weighted prioritization in `2026-11-27/04-C-PRIORITIZATION.md`. B-N1 ranks first for Segment B discovery; B-N2 ranks second. L completed in `2026-11-27/05-L-SOLUTION-OPTIONS.md`. E completed in `2026-11-27/06-E-EVALUATION.md`: Option 1 is the lowest-cost learning baseline, Option 2 has the strongest hypothesised workflow fit, and Option 3 remains a high-risk horizon concept. S — Summarize recommendation is next. No option or cohort is owner-approved.

## CIRCLES progress

| Step | Name | Status | Deliverable | Exit condition |
|---|---|---|---|---|
| C | Comprehend the situation | [x] Completed | `2026-11-27/01-C-COMPREHEND.md` | Goal, success-measure approach, constraints, context, assumptions and scope reconciled. Exact metric threshold is deferred to I/R after customer discovery. |
| I | Identify the customer | [x] Completed | `2026-11-27/02-I-IDENTIFY.md` | Three behavior/context-based segments assessed; one provisional cohort recommended and defended; stakeholders/other sides acknowledged. Owner has not approved a final target market. |
| R | Report customer needs | [x] Completed* | `2026-11-27/03-R-NEEDS.md` | Secondary research synthesised needs/jobs; reported vs inferred distinguished; alternatives and gaps linked. *Primary customer validation remains outstanding. |
| C | Cut through prioritization | [x] Completed* | `2026-11-27/04-C-PRIORITIZATION.md` | Ranked on frequency, acuteness and goal alignment; prerequisites, dependencies, cuts and deferrals recorded. *Provisional pending primary validation. |
| L | List solutions | [x] Completed | `2026-11-27/05-L-SOLUTION-OPTIONS.md` | Three materially different approaches span quick win, core bet and longer horizon; no option selected. |
| E | Evaluate solutions | [x] Completed | `2026-11-27/06-E-EVALUATION.md` | Axes fixed before comparison; all options weighed on common criteria; drawbacks and risks recorded. No option selected. |
| S | Summarize recommendation | [~] In progress | `2026-11-27/07-S-RECOMMENDATION.md` | One recommendation, testable success metric, trade-off, business-goal link, objections and owner decisions. |

## Research workstreams

These are supporting research streams within CIRCLES, not additional method steps.

| Workstream | Status | Key questions | Evidence location |
|---|---|---|---|
| Customer, market and alternatives | [~] In progress | Which customer has the strongest need? Direct competitors/substitutes? Existing workflows, pricing, adoption friction? | `2026-11-27/02-I-IDENTIFY.md`; continue in R |
| File analysis and detection | [ ] Not started | Detection approaches, engine choices, coverage limits, privacy, false positives/negatives, licensing and cost. | To be linked |
| Quarantine and file disposition | [ ] Not started | Android/platform constraints, isolation, integrity, restore, deletion, retention, recovery and key lifecycle. | To be linked |
| Website/link checking | [ ] Not started | Provider contracts, commercial rights, costs, freshness, quotas, URL handling, privacy and failure semantics. | To be linked |
| Product experience and trust | [ ] Not started | End-to-end journeys, verdict states, permissions, safety language, accessibility, reversibility and errors. | To be linked |
| Commercial, operational and regulatory | [ ] Not started | Monetization, cost-to-serve, app distribution/policy, privacy obligations, support and operations. | To be linked |
| Product/system boundaries | [ ] Not started | Whether accounts, backend, data store, billing, workers, telemetry, admin tools or integrations are actually required. | To be linked |

## Quality-gate tracking

| Gate | Status | Evidence required |
|---|---|---|
| Scope consistency | [ ] | Explicit reconciliation with owner decisions and exclusions |
| Customer clarity | [ ] | Primary cohort, rationale and stakeholder map |
| Need traceability | [ ] | Need-to-evidence mapping; hypotheses labelled |
| Workflow completeness | [ ] | Normal, alternate, denied, failure, recovery and terminal states |
| Cross-facet coverage | [ ] | Requirements checked against relevant 15 Software Rules facets |
| Integration clarity | [ ] | Purpose, data flow, costs, failure modes, privacy/security and alternatives |
| Trust and safety | [ ] | False-positive/negative consequences, recovery, honest-result language |
| Commercial viability | [ ] | Cost-to-serve, revenue assumptions, usage controls and commercial evidence |
| Evidence integrity | [ ] | Claims classified and source-linked |
| Decision readiness | [ ] | Trade-offs, unknowns and owner decisions explicit |
| Validation readiness | [ ] | Testable metric and validation criteria |
| Independent review | [ ] | Contradiction/gap review recorded |

## Owner decisions and unresolved items

| ID | Question / decision | Current status | Consequence |
|---|---|---|---|
| PM-OPEN-001 | Primary business outcome for first MVP | [x] Resolved: validate real market demand, per owner's stated view | Success-measure approach is recorded; exact metric/threshold follows I/R |
| PM-OPEN-002 | Primary customer cohort for initial release | [ ] To be evaluated in Identify | Determines product experience and positioning |
| PM-OPEN-003 | Launch geography/distribution market | [ ] Unknown | Affects customer evidence, legal/app-store research and go-to-market |
| PM-OPEN-004 | Product boundary/platform beyond the current scanner MVP | [ ] Unknown | Avoids assuming Android-only or prematurely expanding platform scope |
| PM-OPEN-005 | Commercial model details beyond Pro-gated link checking | [ ] Unknown | Affects packaging, entitlements, cost and activation policy |
| PM-OPEN-006 | Final link intelligence provider and activation economics | [ ] Unknown | Blocks activation of paid API checking, not MVP planning |
| PM-OPEN-007 | File-analysis engine/licensing and final detection approach | [ ] Unknown | Affects coverage, offline operation, privacy and costs |
| PM-OPEN-008 | Whether optional remote analysis is ever permitted | [ ] Unknown | Affects privacy promise, architecture boundary and cost |
| PM-OPEN-009 | Product accounts/backend/data persistence needs | [ ] Unknown | Must be justified by workflows; no system component assumed |
| PM-OPEN-010 | Retention and quarantine lifecycle policy | [ ] Unknown | Affects trust, recovery, storage and support obligations |

## Historical records and authority notes

- `plan-2026-11-24.md` and `circles-2026-11-24.md` are preserved historical work. Revalidate before reuse.
- The 2026-11-24 CIRCLES record assumed scan history, admin panel, help content, an 18-screen design and an Android-first consumer cohort as MVP design facts. The later 2026-11-27 owner-approved scope and Software Rules scope do not support treating those as current MVP requirements.
- Current scope authority: `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md`, `PRO-GATED-LINK-CHECK-DECISION.md`, and `software-rules/SCOPE.md`.
- Current uncertainty register: `software-rules/OPEN-PROPERTIES.md`.
- Product planning does not close Software Rules open properties or change the Software Rules capture.

## Session log

| Date | Work | Result |
|---|---|---|
| 2026-11-27 | Reviewed ZeroDeck README, scope decision, capability inventory, Software Rules scope/scenarios/open properties, and prior PM artifacts. | Confirmed three-capability MVP; identified stale 2026-11-24 assumptions requiring reconciliation. |
| 2026-11-27 | Created current product-planning plan and tracker. | Planning authorized; C — Comprehend started. |
| 2026-11-27 | Recorded owner's clarification that the first launch goal is to validate real market demand; no customer cohort is preselected. | C completed. I — Identify is next; practitioner, non-technical and business/licensed segments remain candidates. |
| 2026-11-27 | Compared practitioner, non-technical individual and business/licensed segments using workflow context, MVP fit and current alternatives. | I completed. Segment B recommended provisionally for needs discovery; no final owner-approved target market or validated demand claim. |\n| 2026-11-27 | Researched mobile messaging/link behaviour, device-context phishing behaviour, Android permission comprehension, Play Protect protections/data flows, usable-security fatigue, SOC alert validation and VirusTotal API constraints. Created `2026-11-27/03-R-NEEDS.md`. | R completed as a secondary-research synthesis. Primary customer interviews and demand validation remain open. |\n| 2026-11-27 | Applied the CIRCLES three-axis prioritization scaffold (frequency, acuteness, business-goal alignment) to candidate needs; recorded safety prerequisites, dependencies and cuts in `2026-11-27/04-C-PRIORITIZATION.md`. | C completed provisionally. B-N1 ranks first for Segment B discovery; B-N2 second. |\n| 2026-11-27 | Created three materially different link-check approaches in `2026-11-27/05-L-SOLUTION-OPTIONS.md`: manual destination check, point-of-sharing check, and cross-context link decision layer. | L completed without selecting an option. |\n| 2026-11-27 | Evaluated all three options in `2026-11-27/06-E-EVALUATION.md` after fixing common axes: need fit, workflow fit, viability, trust/privacy/safety, cost, feasibility and strategic learning. | E completed. Option 1 is lowest-cost for learning; Option 2 has strongest hypothesised workflow fit; Option 3 remains a horizon concept. S started. |
