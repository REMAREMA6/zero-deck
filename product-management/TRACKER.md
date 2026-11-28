# ZeroDeck Product Planning Tracker

**Plan:** [PLAN.md](PLAN.md)  
**Workspace:** `product-management/`  
**Started:** 2026-11-27  
**Method:** CIRCLES — seven steps, followed by supporting product-definition work  
**Overall status:** [~] CIRCLES completed provisionally; blueprint, architecture follow-up, customer validation and owner decisions remain open; PM-authored product-rules Phases 0–7 are complete  
**Current position:** PM-authored rules Phases 0–7 complete; Phase 8 cross-facet completeness/consistency review is next  
**Last reconciled:** 2026-11-28 — Phase 7 complete

> Operational source of truth. Update this tracker whenever work starts, changes status, becomes blocked, or completes. A new session must resume from this file and linked records without relying on chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs owner decision or verification

## 1. Where we are

The original seven CIRCLES deliverables are complete as a **provisional secondary-research recommendation**. We then moved into platform/integration assessment and blueprint synthesis.

During that work, the owner added a distinct requirement: the Product Management Agent must author ZeroDeck's product/software requirements, following the separate Software Rules specification and explicitly identifying the PM as author.

That work is now recorded as a separate workstream. It does not restart CIRCLES or change the three-capability MVP.

**Completed most recently:** Phase 7 cross-cutting system requirements: 28 PM-proposed requirements / 28 acceptance criteria; 18 open questions; all 15 facets assessed; 58 failure/recovery scenarios; synchronized structured projection/evidence; seven-step CIRCLES analysis; 30/30 targeted checks and 5/5 malformed fixtures rejected. Phase 7 is complete as PM requirements authoring only; owner review, implementation and runtime verification remain open. **Next task:** Phase 8 cross-facet completeness/consistency review.

### Current product authority

- [x] MVP: manual file security analysis; quarantine/file disposition; website/link checking.
- [x] MVP-03 requires BOTH active Pro entitlement and owner-controlled activation. No provider call if either gate is false.
- [x] First target audience: everyday non-technical users.
- [x] Platforms: web + Android; platform-specific capability differences are allowed.
- [x] Neon is the preferred managed database.
- [x] Owner direction: first-party authentication and backend, using mature security libraries rather than custom cryptography.
- [x] Authentication is supporting infrastructure, not a fourth user-facing MVP capability.
- [x] PM researches and recommends; owner retains final authority.
- [x] Prefer a simple, inexpensive tangible proof/demo over costly formal recruitment.
- [ ] Launch geography, pricing/packaging, link provider, file-analysis engine, retention policy, hosting/runtime and final architecture approval remain open.

## 2. CIRCLES progress

| Step | Name | Status | Deliverable | Qualification |
|---|---|---|---|---|
| C | Comprehend the situation | [x] | `2026-11-27/01-C-COMPREHEND.md` | Goal, constraints, context and scope reconciled. |
| I | Identify the customer | [x] | `2026-11-27/02-I-IDENTIFY.md` | Owner selected everyday non-technical users; technical users/businesses are later audiences. |
| R | Report customer needs | [x] | `2026-11-27/03-R-NEEDS.md` | Secondary research complete; primary validation remains open. |
| C | Cut through prioritization | [x] | `2026-11-27/04-C-PRIORITIZATION.md` | Provisional prioritization; depends on validation. |
| L | List solutions | [x] | `2026-11-27/05-L-SOLUTION-OPTIONS.md` | Three materially different options documented. |
| E | Evaluate solutions | [x] | `2026-11-27/06-E-EVALUATION.md` | Common axes and trade-offs documented. |
| S | Summarize recommendation | [x] | `2026-11-27/07-S-RECOMMENDATION.md` | Provisional recommendation; owner review and validation remain open. |

**CIRCLES exit:** all seven deliverables exist. Product planning is not finished: blueprint, platform/integration follow-up, validation, independent review and owner decisions remain.

## 3. Platform/integration assessment — post-CIRCLES

**Document:** [10-PLATFORM-INTEGRATION-ARCHITECTURE.md](2026-11-27/10-PLATFORM-INTEGRATION-ARCHITECTURE.md)

| Task | Status | Exit condition |
|---|---|---|
| Initial security-first architecture recommendation | [x] | Recommendation documented; not final architecture approval. |
| Android file access, encrypted quarantine and Keystore proof | [ ] | Working lifecycle prototype and supported-device/version tests. |
| Browser file-analysis feasibility | [ ] | Validate browser-compatible engine and exact web boundary. |
| Neon capacity, region, pricing, backups and hosting comparison | [ ] | Current plan/cost/deployment evidence. |
| First-party authentication threat model and test plan | [ ] | Account lifecycle, credentials, verification decision, sessions, recovery, authorization and abuse controls. |
| Payment provider eligibility | [ ] | Verify actual business onboarding and settlement before selection. |
| Retention, deletion, telemetry, privacy and incident response | [ ] | Document policy and operational consequences. |
| Independent review and owner architecture decision | [ ] | Resolve trade-offs; owner explicitly approves/revises. |

## 4. New workstream — PM-authored product rules

**Workstream:** [11-PM-AUTHORED-PRODUCT-RULES.md](2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md)  
**Author:** ZeroDeck Product Management Agent  
**Status:** [x] Phases 0–7 complete; Phase 8 next  
**Purpose:** create implementation-ready, technology-independent product requirements aligned with Software Rules.

**Profile:** [product-rules/PROFILE.md](product-rules/PROFILE.md) — Phase 1 complete. **Contract index:** [product-rules/README.md](product-rules/README.md). **Validation:** [product-rules/VALIDATION-REPORT.md](product-rules/VALIDATION-REPORT.md).

The current Software Rules 0.3.0 Draft includes a `declaredContract` record and `declared-contract` evidence class. PM requirements describe what ZeroDeck must do; they are not runtime observations or source-derived rules. We will use this existing class, identify the PM issuer explicitly, and avoid changing the separate Software Rules core without an approved proposal.

### PM-authored rules phases

| Phase | Work | Status | Exit condition |
|---|---|---|---|
| 0 | Establish baseline, boundaries and authorship | [x] | Software Rules model inspected; product scope and PM identity recorded. |
| 1 | Design PM contract profile | [x] | Exact mapping, author identity, ID/version rules, complete-record and extension schemas, and validation procedure documented and checked. |
| 2 | Research and author authentication requirements | [x] | [IDENTITY-AUTHENTICATION.md](product-rules/contracts/IDENTITY-AUTHENTICATION.md), structured projection, evidence, [CIRCLES analysis](2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md) and [Phase 2 validation](product-rules/PHASE-2-VALIDATION.md); 25 requirements, 66 acceptance criteria; eight decisions resolved, five operational questions open. |
| 3 | Validate authentication coverage | [x] | [15-facet assessment](product-rules/PHASE-3-15-FACET-COVERAGE.md), [23-scenario matrix](product-rules/PHASE-3-NEGATIVE-FAILURE-RECOVERY-MATRIX.md), [structured proposals](product-rules/proposals/PHASE-3-AUTHENTICATION-COVERAGE-ADDITIONS.json), [Behaviour facet-reference amendment](product-rules/proposals/PHASE-3-BEHAVIOUR-FACET-REFERENCE.json), [CIRCLES analysis](2026-11-28/15-PHASE-3-CIRCLES-COVERAGE.md) and [validation](product-rules/PHASE-3-VALIDATION.md). All 15 facets assessed; 21 existing requirements/46 criteria preserved at Phase 3 close; 8 owner questions were then open. |
| 4 | Author manual file-analysis requirements | [x] | [MVP-01 contract](product-rules/contracts/MANUAL-FILE-ANALYSIS.md), [structured projection](product-rules/contracts/MANUAL-FILE-ANALYSIS.declared-contract.json), [15-facet assessment](product-rules/PHASE-4-MVP-01-FACET-COVERAGE.md), [35-scenario matrix](product-rules/PHASE-4-MVP-01-NEGATIVE-FAILURE-RECOVERY-MATRIX.md), [CIRCLES analysis](2026-11-28/19-PHASE-4-CIRCLES-MANUAL-FILE-ANALYSIS.md), [validation](product-rules/PHASE-4-MVP-01-VALIDATION.md); 28 PM-proposed requirements / 56 criteria; nine open questions. |
| 5 | Author quarantine/disposition requirements | [MVP-02 contract](product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md), structured projection/evidence, 15-facet assessment, 58-scenario matrix, CIRCLES analysis and validation; 38 requirements / 68 criteria / 14 open questions | [x] |
| 6 | Author website/link-check requirements | [x] | [MVP-03 contract](product-rules/contracts/WEBSITE-LINK-CHECKING.md), structured projection/evidence, [CIRCLES](2026-11-28/23-PHASE-6-CIRCLES-WEBSITE-LINK-CHECKING.md), [15 facets](product-rules/PHASE-6-MVP-03-FACET-COVERAGE.md), [81 scenarios](product-rules/PHASE-6-MVP-03-NEGATIVE-FAILURE-RECOVERY-MATRIX.md), [validation](product-rules/PHASE-6-MVP-03-VALIDATION.md); 41 requirements / 41 criteria / 18 open questions. |
| 7 | Author cross-cutting system requirements | [x] | [Cross-cutting contract](product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md), [structured projection](product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json), [evidence](product-rules/evidence/cross-cutting-system-requirements-contract.evidence.json), [CIRCLES](2026-11-28/24-PHASE-7-CIRCLES-CROSS-CUTTING-SYSTEM-REQUIREMENTS.md), [15 facets](product-rules/PHASE-7-CROSS-CUTTING-FACET-COVERAGE.md), [58 scenarios](product-rules/PHASE-7-CROSS-CUTTING-FAILURE-RECOVERY-MATRIX.md), [validation](product-rules/PHASE-7-CROSS-CUTTING-VALIDATION.md); 28 requirements / 28 criteria / 18 open questions. |
| 8 | Cross-facet completeness/consistency review | [ ] | Traceability complete; contradictions and missing states resolved or explicitly open. |
| 9 | Owner review and release | [ ] | Owner decisions recorded; versioned contract package ready for engineering handoff. |

### Feature authoring order

1. Authentication/account infrastructure (supporting capability).
2. MVP-01 manual file security analysis.
3. MVP-02 quarantine and file disposition.
4. MVP-03 website and link checking.
5. Cross-cutting system requirements.

**Important:** The authentication/account contract is a draft supporting-infrastructure contract. The owner approved eight policy decisions; the original 21 requirements remain PM-proposed and only ZD-AUTH-025 through ZD-AUTH-028 are directly owner-approved. Five operational questions remain open. No PM-authored contract for the three user-facing MVP capabilities has yet been completed. The Software Rules identity/authentication facet is Draft and not exhaustive. Existing JWT and Express-session cases cover bounded behaviour only. Uncovered properties are a checklist, not proof that ZeroDeck needs every mechanism; each must be classified as required, not applicable, deferred or unresolved.

## 5. Remaining product-planning work outside the rules workstream

| Work | Status | Completion condition |
|---|---|---|
| Finish product blueprint | [~] | Reconcile owner decisions, requirements, workflows, data, system boundaries, metrics and risks. |
| Customer/market validation | [ ] | Show an inexpensive tangible proof and record actual reactions; do not invent demand evidence. |
| Choose initial validation workflow | [?] | Decide which capability can be demonstrated while MVP-03 remains gated off. |
| Resolve launch geography/distribution | [?] | Owner decision informed by research. |
| Resolve pricing/Pro packaging and activation economics | [ ] | Costed options and owner decision. |
| Select file-analysis approach/provider | [ ] | Compare coverage, privacy, licence, false positives/negatives, cost and operations. |
| Define retention/quarantine policy | [ ] | Owner-reviewed policy with recovery and data-loss consequences. |
| Independent blueprint/requirements review | [ ] | Contradiction, omission, security, trust, commercial and cross-facet review. |
| Final owner review and handoff | [ ] | Coherent approved product definition; implementation remains separately authorized. |

## 6. Immediate next actions

1. [x] Obtain owner approval for the Phase 6 plan and complete MVP-03 authoring.
2. [ ] Prepare the Phase 7 cross-cutting system-requirements plan; wait for explicit owner approval before execution.
3. Keep architecture follow-up and blueprint gaps visible; do not mark them complete without evidence.
4. Update this tracker at each phase transition and link every deliverable.

## 7. Session log

| Date | Work | Result |
|---|---|---|
| 2026-11-27 | Completed seven CIRCLES deliverables and initial recommendation. | CIRCLES complete provisionally; validation and owner review remain open. |
| 2026-11-27 | Created file/quarantine/link research and product blueprint draft. | Initial product definition exists; gaps remain. |
| 2026-11-27 | Owner selected everyday non-technical users and web + Android. | Target and platforms recorded as owner decisions. |
| 2026-11-27 | Completed initial platform/integration assessment; owner directed Neon and first-party auth/backend. | Recommendation updated; native proof, auth threat model, hosting and approval remain open. |
| 2026-11-27 | Owner requested PM-authored product rules aligned to Software Rules with explicit authorship. | New workstream opened. |
| 2026-11-27 | Inspected Software Rules README, declared-contract schema, identity/authentication facet and Phase 6 property inventory. | Phase 0 complete; declared-contract is the current fit. |
| 2026-11-27 | Completed PM contract profile, PM extension schema, full declared-contract schema, templates and format fixture; ran targeted profile checks, recorded in `product-rules/VALIDATION-REPORT.md`. | Phase 1 complete. |
| 2026-11-27 | Researched and authored the 21-requirement identity/authentication contract, structured declared-contract projection, retained evidence and eight open owner questions; ran targeted structural, parity, facet, reference and digest checks. | Phase 2 complete; Phase 3 coverage assessment is next. Requirements remain PM-proposed, not owner-approved. |
| 2026-11-27 | Completed authentication CIRCLES analysis; corrected provenance mapping and replaced generic projection criteria with 46 concrete Markdown-derived scenarios; validated PM/upstream record definitions and evidence, ran five negative checks, and verified the exact SHA-256 digest. | Phase 2 exit criteria pass; sign-in/recovery/session policy questions remain with owner. |
| 2026-11-28 | Owner approved the written Phase 3 plan; completed 15-facet assessment, 23-scenario negative/failure/recovery matrix, cross-facet review, three structured candidate additions and targeted validation. | Phase 3 complete for PM requirements coverage; canonical Phase 2 contract remained unchanged at that point. |
| 2026-11-28 | Owner accepted all eight authentication recommendations; updated contract v0.2.0-draft, structured projection, evidence, decision register, validation, index, tracker and workstream. | Eight original questions resolved; five additional operational questions remain open; original 21 requirements remain PM-proposed. |
| 2026-11-28 | Owner approved Phase 4 plan; completed MVP-01 CIRCLES analysis, 28-requirement contract, 56 acceptance criteria, nine open questions, 15-facet assessment, 35-scenario matrix, structured projection/evidence and targeted validation. | Phase 4 complete within documented scope; all requirements remain PM-proposed; no runtime or full Draft 2020-12 validation claim; Phase 5 plan is next and requires approval. |

## 8. Authority and repository boundaries

- ZeroDeck PM work stays inside `REMAREMA6/zero-deck/product-management/`.
- Software Rules is a specification dependency; do not modify its repository during ordinary ZeroDeck PM authoring.
- Do not modify reverse-engineering evidence or implementation files.
- PM-authored contracts are requirements, not runtime proof.
- Recommendations are not owner approvals.
- Product planning does not authorize implementation or deployment.


| 2026-11-28 | Prepared Phase 5 MVP-02 plan and committed it. | Awaiting explicit owner approval; execution has not started. |

| 2026-11-28 | Owner approved Phase 5 plan; completed MVP-02 CIRCLES analysis, 38-requirement contract, 68 acceptance criteria, 14 open questions, 15-facet assessment, 58-scenario matrix, synchronized projection/evidence and targeted validation. | Phase 5 complete within approved PM scope; all requirements remain PM-proposed; 16/16 targeted checks and 5/5 negative fixtures passed; no full Draft 2020-12, upstream CI, runtime or security-audit claim. Phase 6 plan is next. |


| 2026-11-28 | Prepared and committed the Phase 6 MVP-03 website/link-checking execution plan. | Plan committed as `9b65fd7d9b565cf54b1bd2d924b82e0638b70068`; awaiting explicit owner approval. No CIRCLES analysis or contract authoring has started. |


| 2026-11-28 | Owner instructed: “I have looked the plan, start now. Finish, start and finish phase 6.” | Explicit approval received; Phase 6 execution authorized for PM analysis/contract authoring only. |
| 2026-11-28 | Completed Phase 6 MVP-03 contract, projection/evidence, CIRCLES analysis, 15-facet assessment, 81-scenario matrix and targeted validation. | Phase 6 complete: 41 requirements / 41 criteria; 4 owner-approved scope encodings / 37 PM-proposed; 18 open questions; 19/19 targeted checks and 5/5 malformed fixtures rejected. No implementation or Software Rules repo changes. Phase 7 is next. |
