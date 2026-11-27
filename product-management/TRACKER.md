# ZeroDeck Product Planning Tracker

**Plan:** [PLAN.md](PLAN.md)  
**Workspace:** `product-management/`  
**Started:** 2026-11-27  
**Method:** CIRCLES — seven steps, followed by supporting product-definition work  
**Overall status:** [~] CIRCLES completed provisionally; blueprint, architecture follow-up and validation remain open; PM-authored product-rules workstream has started  
**Current position:** PM-authored rules Phase 1 complete; Phase 2 (authentication requirements) is next  
**Last reconciled:** 2026-11-27

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

**Completed most recently:** PM-authored contract profile (Phase 1). **Next task:** research and draft authentication/account requirements (Phase 2).

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
**Status:** Phases 0–1 complete; Phase 2 next  
**Purpose:** create implementation-ready, technology-independent product requirements aligned with Software Rules.\n\n**Profile:** [product-rules/PROFILE.md](product-rules/PROFILE.md) — Phase 1 complete. **Contract index:** [product-rules/README.md](product-rules/README.md).

The current Software Rules 0.3.0 Draft includes a `declaredContract` record and `declared-contract` evidence class. PM requirements describe what ZeroDeck must do; they are not runtime observations or source-derived rules. We will use this existing class, identify the PM issuer explicitly, and avoid changing the separate Software Rules core without an approved proposal.

### PM-authored rules phases

| Phase | Work | Status | Exit condition |
|---|---|---|---|
| 0 | Establish baseline, boundaries and authorship | [x] | Software Rules model inspected; product scope and PM identity recorded. |
| 1 | Design PM contract profile | [x] | Exact mapping, author identity, ID/version rules, complete-record and extension schemas, and validation procedure documented and checked. |
| 2 | Research and author authentication requirements | [ ] | Stack-agnostic account/auth contract with sources, acceptance criteria and unknowns. |
| 3 | Validate authentication coverage | [ ] | Cross-facet assessment and negative/failure/recovery tests. |
| 4 | Author manual file-analysis requirements | [ ] | File selection, input scope, verdicts, limitations, privacy and failure semantics. |
| 5 | Author quarantine/disposition requirements | [ ] | Quarantine, integrity, restore, deletion, retention and recovery. |
| 6 | Author website/link-check requirements | [ ] | URL semantics, provider failure, privacy, Pro + activation gates, quotas and budget controls. |
| 7 | Author cross-cutting system requirements | [ ] | Accounts, entitlement, configuration, platform differences, data lifecycle, security and operations. |
| 8 | Cross-facet completeness/consistency review | [ ] | Traceability complete; contradictions and missing states resolved or explicitly open. |
| 9 | Owner review and release | [ ] | Owner decisions recorded; versioned contract package ready for engineering handoff. |

### Feature authoring order

1. Authentication/account infrastructure (supporting capability).
2. MVP-01 manual file security analysis.
3. MVP-02 quarantine and file disposition.
4. MVP-03 website and link checking.
5. Cross-cutting system requirements.

**Important:** No ZeroDeck PM-authored requirement set has yet been completed. The Software Rules identity/authentication facet is Draft and not exhaustive. Existing JWT and Express-session cases cover bounded behaviour only. Uncovered properties are a checklist, not proof that ZeroDeck needs every mechanism; each must be classified as required, not applicable, deferred or unresolved.

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

1. Start Phase 2: research and draft authentication/account requirements using the completed PM contract profile.
2. Keep architecture follow-up and blueprint gaps visible; do not mark them complete without evidence.
3. Update this tracker at each phase transition and link every deliverable.
4. Ask the owner only for decisions that evidence and PM deliberation cannot settle.

## 7. Session log

| Date | Work | Result |
|---|---|---|
| 2026-11-27 | Completed seven CIRCLES deliverables and initial recommendation. | CIRCLES complete provisionally; validation and owner review remain open. |
| 2026-11-27 | Created file/quarantine/link research and product blueprint draft. | Initial product definition exists; gaps remain. |
| 2026-11-27 | Owner selected everyday non-technical users and web + Android. | Target and platforms recorded as owner decisions. |
| 2026-11-27 | Completed initial platform/integration assessment; owner directed Neon and first-party auth/backend. | Recommendation updated; native proof, auth threat model, hosting and approval remain open. |
| 2026-11-27 | Owner requested PM-authored product rules aligned to Software Rules with explicit authorship. | New workstream opened. |
| 2026-11-27 | Inspected Software Rules README, declared-contract schema, identity/authentication facet and Phase 6 property inventory. | Phase 0 complete; declared-contract is the current fit. |
| 2026-11-27 | Completed PM contract profile, PM extension schema, full declared-contract schema, templates and format fixture; ran structural/semantic and negative checks. | Phase 1 complete; Phase 2 is next. No ZeroDeck feature requirement has yet been authored or owner-approved. |

## 8. Authority and repository boundaries

- ZeroDeck PM work stays inside `REMAREMA6/zero-deck/product-management/`.
- Software Rules is a specification dependency; do not modify its repository during ordinary ZeroDeck PM authoring.
- Do not modify reverse-engineering evidence or implementation files.
- PM-authored contracts are requirements, not runtime proof.
- Recommendations are not owner approvals.
- Product planning does not authorize implementation or deployment.
