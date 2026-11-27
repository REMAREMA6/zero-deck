# ZeroDeck Product Planning Tracker

**Plan:** [PLAN.md](PLAN.md)  
**Workspace:** `product-management/`  
**Started:** 2026-11-27  
**Method:** CIRCLES — seven steps  
**Overall status:** [~] CIRCLES complete; product blueprint and primary validation work remain open  
**Current step:** Primary validation and blueprint review (post-CIRCLES supporting work; not an eighth CIRCLES step)

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
- **Current step:** Post-CIRCLES blueprint synthesis (supporting work; not an eighth CIRCLES step).
- **Current product scope authority:** Owner-approved three-capability MVP (manual file security analysis; quarantine/file disposition; website/link checking subject to Pro entitlement AND owner activation).
- **Current product evidence status:** ZeroDeck-specific Software Rules remains Draft, incomplete and not replication-sufficient. Product planning must preserve unknowns.
- **Primary business outcome:** Validate real market demand, per the owner's clarification on 2026-11-27. No final owner-approved target cohort has been selected. Segment B is provisionally recommended for needs discovery; practitioner and business/licensed segments remain alternatives.
- **I — Identify result:** Three candidate segments were compared. Segment B (non-technical individuals who regularly receive/download unfamiliar files and links) is recommended as a provisional cohort for needs discovery, not an owner-approved target market. Segment A (security practitioners) and Segment C (businesses/licensed organisations) remain alternatives.
- **Next action:** Independently review blueprint traceability and gaps; obtain primary customer evidence when participants/market are defined; resolve owner decisions without guessing. Critical sequencing dependency: MVP-03 link checking cannot be used for demand validation while the owner switch remains off. If it is off at initial launch, a separate enabled MVP workflow must be selected for launch validation; zero link-check usage is not evidence of no demand.

## CIRCLES progress

| Step | Name | Status | Deliverable | Exit condition |
|---|---|---|---|---|
| C | Comprehend the situation | [x] Completed | `2026-11-27/01-C-COMPREHEND.md` | Goal, success-measure approach, constraints, context, assumptions and scope reconciled. Exact metric threshold is deferred to I/R after customer discovery. |
| I | Identify the customer | [x] Completed | `2026-11-27/02-I-IDENTIFY.md` | Three behavior/context-based segments assessed; one provisional cohort recommended and defended; stakeholders/other sides acknowledged. Owner has not approved a final target market. |
| R | Report customer needs | [x] Completed* | `2026-11-27/03-R-NEEDS.md` | Secondary research synthesised needs/jobs; reported vs inferred distinguished; alternatives and gaps linked. *Primary customer validation remains outstanding. |
| C | Cut through prioritization | [x] Completed* | `2026-11-27/04-C-PRIORITIZATION.md` | Ranked on frequency, acuteness and goal alignment; prerequisites, dependencies, cuts and deferrals recorded. *Provisional pending primary validation. |
| L | List solutions | [x] Completed | `2026-11-27/05-L-SOLUTION-OPTIONS.md` | Three materially different approaches span quick win, core bet and longer horizon; no option selected. |
| E | Evaluate solutions | [x] Completed | `2026-11-27/06-E-EVALUATION.md` | Axes fixed before comparison; all options weighed on common criteria; drawbacks and risks recorded. No option selected. |
| S | Summarize recommendation | [x] Completed* | `2026-11-27/07-S-RECOMMENDATION.md` | One recommendation, repeat-use metric, trade-off, goal link, objections and owner decisions recorded. *Recommendation awaits owner decision and primary validation. |

## Research workstreams

These are supporting research streams within CIRCLES, not additional method steps.

| Workstream | Status | Key questions | Evidence location |
|---|---|---|---|
| Customer, market and alternatives | [~] In progress | Which customer has the strongest need? Direct competitors/substitutes? Existing workflows, pricing, adoption friction? | `2026-11-27/02-I-IDENTIFY.md`; `2026-11-27/03-R-NEEDS.md`; `2026-11-27/09-PRIMARY-RESEARCH-PROTOCOL.md` |
| File analysis and detection | [~] In progress | Detection approaches, engine choices, coverage limits, privacy, false positives/negatives, licensing and cost. | `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`; Phase 3 prior-art register |
| Quarantine and file disposition | [~] In progress | Android/platform constraints, isolation, integrity, restore, deletion, retention, recovery and key lifecycle. | `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`; `software-rules/OPEN-PROPERTIES.md` |
| Website/link checking | [~] In progress | Provider contracts, commercial rights, costs, freshness, quotas, URL handling, privacy and failure semantics. | `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`; Phase 3 prior-art register |
| Product experience and trust | [~] In progress | End-to-end journeys, verdict states, permissions, safety language, accessibility, reversibility and errors. | `2026-11-27/03-R-NEEDS.md`; `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`; open-properties register |
| Commercial, operational and regulatory | [~] In progress | Monetization, cost-to-serve, app distribution/policy, privacy obligations, support and operations. | `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`; provider terms/pricing sources |
| Product/system boundaries | [~] In progress | Whether accounts, backend, data store, billing, workers, telemetry, admin tools or integrations are actually required. | `PRODUCT-BLUEPRINT-DRAFT.md`; `software-rules/FACET-MAP.md`; actual components remain unassumed |

## Quality-gate tracking

| Gate | Status | Evidence required |
|---|---|---|
| Scope consistency | [x] | Explicit reconciliation with owner decisions and exclusions |
| Customer clarity | [?] | Provisional cohort recommended; owner selection and direct validation outstanding |
| Need traceability | [~] | Need-to-evidence mapping; hypotheses labelled |
| Workflow completeness | [~] | Draft journeys and failure/recovery branches documented; exact rules and runtime evidence remain open |
| Cross-facet coverage | [~] | Draft 15-facet crosswalk in PRODUCT-BLUEPRINT-DRAFT.md; Software Rules capture itself remains incomplete |
| Integration clarity | [~] | Candidate boundaries/data flows and provider constraints recorded; final integrations not selected |
| Trust and safety | [~] | Candidate product guardrails and failure consequences documented; test evidence outstanding |
| Commercial viability | [~] | Provider pricing/terms and Pro gates researched; willingness-to-pay and cost model unvalidated |
| Evidence integrity | [~] | Claims classified and source-linked |
| Decision readiness | [~] | Trade-offs, unknowns and owner decisions explicit |
| Validation readiness | [~] | Link-check metric is conditional on activation; interview/experiment protocol drafted; primary evidence and justified thresholds outstanding |
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
| PM-OPEN-011 | Initial launch validation workflow if MVP-03 remains locked pending revenue funding | [?] Needs owner decision | Link-check demand cannot be measured while the owner activation switch is off; a separate enabled MVP workflow must be chosen for the first launch test. |

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
| 2026-11-27 | Compared practitioner, non-technical individual and business/licensed segments using workflow context, MVP fit and current alternatives. | I completed. Segment B recommended provisionally for needs discovery; no final owner-approved target market or validated demand claim. |
| 2026-11-27 | Researched mobile messaging/link behaviour, device-context phishing behaviour, Android permission comprehension, Play Protect protections/data flows, usable-security fatigue, SOC alert validation and VirusTotal API constraints. Created `2026-11-27/03-R-NEEDS.md`. | R completed as a secondary-research synthesis. Primary customer interviews and demand validation remain open. |
| 2026-11-27 | Applied the CIRCLES three-axis prioritization scaffold (frequency, acuteness, business-goal alignment) to candidate needs; recorded safety prerequisites, dependencies and cuts in `2026-11-27/04-C-PRIORITIZATION.md`. | C completed provisionally. B-N1 ranks first for Segment B discovery; B-N2 second. |
| 2026-11-27 | Created three materially different link-check approaches in `2026-11-27/05-L-SOLUTION-OPTIONS.md`: manual destination check, point-of-sharing check, and cross-context link decision layer. | L completed without selecting an option. |
| 2026-11-27 | Evaluated all three options in `2026-11-27/06-E-EVALUATION.md` after fixing common axes: need fit, workflow fit, viability, trust/privacy/safety, cost, feasibility and strategic learning. | E completed. Option 1 is lowest-cost for learning; Option 2 has strongest hypothesised workflow fit; Option 3 remains a horizon concept. |
| 2026-11-27 | Completed `2026-11-27/07-S-RECOMMENDATION.md` with one provisional recommendation (Segment B + point-of-sharing link check), one qualified repeat-use metric, explicit trade-off, owner questions and limitations. | All seven CIRCLES deliverables exist. CIRCLES is complete as a provisional secondary-research recommendation. Product blueprint, primary customer validation and owner decisions remain open. |
| 2026-11-27 | Researched file-analysis limits and prior art, Android SAF/storage/Keystore constraints, quarantine lifecycle risks, Web Risk pricing, URLhaus commercial terms, VirusTotal API/private-scanning distinctions and ClamAV licensing/platform limits. Created `2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`. | First secondary-research pass recorded for the three MVP capabilities. No engine/provider/architecture selected; platform, retention, supported formats, detection criteria and customer needs remain open. |
| 2026-11-27 | Created `PRODUCT-BLUEPRINT-DRAFT.md` with scope, owner decisions, customer needs, workflows, state/failure branches, trust requirements, possible system boundaries, conceptual data, metrics, risk register and a 15-facet crosswalk. | Blueprint is a structured draft, not an approved PRD or architecture. Primary validation, owner decisions, full property traceability and independent review remain open. |
| 2026-11-27 | Added OWASP MASTG practitioner-methodology evidence to the Identify and technical research records. Independent review found an important launch-sequencing dependency: MVP-03 cannot be tested while the owner switch remains off pending paid-user revenue. Updated prioritization, recommendation and blueprint to make the link-check test conditional and added PM-OPEN-011. | No provider gate was bypassed. If MVP-03 remains locked at initial launch, a separate enabled MVP workflow must be selected for initial demand validation; disabled usage cannot be interpreted as lack of demand. |
| 2026-11-27 | Prepared `2026-11-27/09-PRIMARY-RESEARCH-PROTOCOL.md` with segment screeners, behavioural interview guide, evidence-capture template, analysis rules and validation guardrails. | Ready for owner review. No participants recruited or interviewed; cohort and geography remain unselected. |
