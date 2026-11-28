# Product Manager-Authored Product Rules Workstream

**Project:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Owner authority:** Product owner retains final authority  
**Opened:** 2026-11-27  
**Status:** [x] Phases 0–9 complete; product-design contracts owner-reviewed; technical architecture handoff prepared  
**Tracker:** [../TRACKER.md](../TRACKER.md)

## Purpose

ZeroDeck needs precise, testable, technology-independent product requirements before implementation. The Product Management Agent will author them, following the separate Software Rules specification so implementation agents can use the same requirements across languages, frameworks and stacks.

This is a supporting workstream after CIRCLES. It does not restart the seven CIRCLES steps, change the approved MVP, or authorize implementation.

## Evidence class and authorship

The current Software Rules 0.3.0 Draft README distinguishes runtime rules and source-derived rules. Its global record schema also contains a `declaredContract` record and the `declared-contract` evidence class.

PM-authored requirements state what ZeroDeck is required to do. They are **declared product contracts**, not runtime observations and not source-derived rules.

Current compatibility findings from the repository inspected on 2026-11-27:

- Current Software Rules release and schema are Draft 0.3.0 / 0.2.0 respectively.
- `declaredContract` supports `contractId`, `contractType`, `title`, `issuer`, `artifact`, `scope`, `statements`, `retrievedAt`, `evidenceRefs` and `extensions`.
- Each statement supports `statementId`, `text` and optional `location`.
- `issuer` is available but not required; our contracts will explicitly set it to **ZeroDeck Product Management Agent**.
- PM-specific structured metadata may be mapped through `extensions`, subject to a documented profile and validation. Do not add arbitrary fields to strict core objects.
- The identity/authentication facet is Draft and says its conceptual inventory does not prove exhaustive capture.
- The Phase 6 24-case corpus validates the method, not universal facet completeness.

**Decision for this workstream:** use the existing declared-contract evidence class. Do not invent a fourth evidence class or modify the Software Rules repository/core schema without a separate justified proposal and owner approval. Owner decisions and PM recommendations must remain distinguishable.

## Authoring rules

Every requirement must:
1. Have a stable unique ID.
2. Identify its capability and applicable Software Rules facet(s).
3. State one normative behaviour in stack-independent language.
4. Define scope, actor, trigger, preconditions, relevant inputs, outcomes and state transitions.
5. Cover normal, boundary, denied, failure, interruption and recovery cases where applicable.
6. State forbidden and conditional behaviour explicitly.
7. Include observable, independently testable acceptance criteria.
8. Record rationale, priority, dependencies, assumptions and constraints.
9. Trace to owner decisions, source evidence, external research or clearly labelled inference.
10. Preserve unknowns; do not guess missing product decisions.
11. Avoid framework, language, database or provider choices unless a verified platform contract requires them.
12. Distinguish required, optional/permitted, forbidden, conditional and unresolved behaviour.

## Planned phases

| Phase | Work | Exit condition | Status |
|---|---|---|---|
| 0 | Baseline and boundaries | Software Rules model inspected; product scope and PM author identity recorded | [x] |
| 1 | Design PM contract profile | Exact mapping, complete-record and extension schemas, ID convention, author identity, and validation approach documented and checked without unauthorized core changes | [x] |
| 2 | Research and author authentication requirements | Stack-agnostic account/auth contract, structured projection, retained evidence, sources, acceptance criteria and unresolved owner decisions | [x] |
| 3 | Validate authentication coverage | [15-facet assessment](../product-rules/PHASE-3-15-FACET-COVERAGE.md), [23-scenario matrix](../product-rules/PHASE-3-NEGATIVE-FAILURE-RECOVERY-MATRIX.md), [structured proposals](../product-rules/proposals/PHASE-3-AUTHENTICATION-COVERAGE-ADDITIONS.json), [CIRCLES analysis](15-PHASE-3-CIRCLES-COVERAGE.md), and [validation](../product-rules/PHASE-3-VALIDATION.md); all 15 facets assessed, 23 scenarios classified, three candidate additions recorded; eight owner questions remain open | [x] |
| 4 | Author manual file-analysis requirements | [MVP-01 contract](../product-rules/contracts/MANUAL-FILE-ANALYSIS.md), structured projection/evidence, 15-facet assessment, 35-scenario negative/failure/recovery matrix, CIRCLES analysis and validation; 28 requirements / 56 criteria / 9 open questions | [x] |
| 5 | Author quarantine/disposition requirements | [MVP-02 contract](../product-rules/contracts/QUARANTINE-FILE-DISPOSITION.md), structured projection/evidence, 15-facet assessment, 58-scenario negative/failure/recovery matrix, CIRCLES analysis and validation; 38 requirements / 68 criteria / 14 open questions | [x] |
| 6 | Author website/link-check requirements | [MVP-03 contract](../product-rules/contracts/WEBSITE-LINK-CHECKING.md), projection/evidence, 15 facets, 81 scenarios, CIRCLES and validation; 41 requirements / 41 criteria / 18 questions | [x] |
| 7 | Author cross-cutting system requirements | [Cross-cutting contract](../product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md), projection/evidence, 15 facets, 58 scenarios, CIRCLES and validation; 28 requirements / 28 criteria / 18 questions | [x] |
| 8 | Cross-facet completeness and consistency review | [Traceability](../2026-11-28/26-PHASE-8-CROSS-CONTRACT-TRACEABILITY.md), [15-facet assessment](../2026-11-28/27-PHASE-8-CROSS-FACET-COMPLETENESS.md), [findings](../2026-11-28/28-PHASE-8-CROSS-CONTRACT-FINDINGS.md), [lifecycle/failure matrix](../2026-11-28/29-PHASE-8-CROSS-FEATURE-LIFECYCLE-FAILURE-MATRIX.md), [projection/evidence audit](../2026-11-28/30-PHASE-8-PROJECTION-EVIDENCE-AUDIT.md), [validation](../2026-11-28/31-PHASE-8-VALIDATION.md), [CIRCLES](../2026-11-28/32-PHASE-8-CIRCLES-CROSS-FACET-REVIEW.md), [completion](../2026-11-28/33-PHASE-8-COMPLETION-RECOMMENDATION.md) | [x] |
| 9 | Owner review and product-design closure | Owner decisions recorded; all 64 Phase 8 questions dispositioned; five contracts/projections/evidence synchronized; architecture handoff prepared | [x] |

Phases 0–3 are complete. On 2026-11-28 the owner accepted all eight PM recommendations for identity/authentication decisions. The dated decision record is 2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md; the canonical contract is now v0.2.0-draft with 25 requirements and 66 acceptance criteria in the synchronized structured projection/evidence. The original 21 requirements remain PM-proposed; only ZD-AUTH-025 through ZD-AUTH-028 directly encode owner-approved decisions and are marked owner-approved. The eight original questions are resolved; five additional operational questions remain open. Phase 3 candidate additions (ZD-AUTH-022–024) and the Behaviour facet-reference amendment remain unaccepted proposals. Decision recording validation is in product-rules/PHASE-4-AUTH-DECISION-VALIDATION.md. Phase 4 and Phase 5 are complete. The MVP-01 and MVP-02 contracts remain PM-proposed drafts; plan approval authorizes authoring but does not approve their normative statements. MVP-01 has nine open questions. MVP-02 has 38 PM-proposed requirements, 68 acceptance criteria and 14 open questions; see the Phase 5 validation report for its exact checks and limitations. Phase 6 and Phase 7 are complete as PM requirements-authoring phases. Phase 7 has 28 PM-proposed requirements / 28 criteria / 18 open questions, 15 facets, 58 failure/recovery scenarios, synchronized projection/evidence, CIRCLES analysis, 30/30 targeted checks and 5/5 malformed fixtures rejected. Phase 8 cross-facet completeness/consistency review is complete. The review covered 160 requirements, 259 acceptance criteria, 72 questions (8 resolved / 64 open), all 15 facets and five projection/evidence pairs. Four authentication projection statement mismatches were corrected. Remaining findings are recorded for Phase 9 owner review; no product requirements were approved by this review.

## Recorded authentication owner decisions

The owner approved email/password launch sign-in; verified-email rules; optional MFA and later passkeys; verified-email recovery; 7-day inactivity and 30-day absolute session limits; current-session/logout-all controls without a launch session list; user-initiated account deletion with documented retention; and risk-based step-up authentication. Exact email verification operations, abuse thresholds, renewal cadence, deletion/retention schedule and authorization propagation bounds remain open. See 2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md and product-rules/PHASE-4-AUTH-DECISION-VALIDATION.md.

## Phase 8 completion record

Phase 8 is complete as a cross-contract PM review. Deliverables are the 26–33 review package under 2026-11-28, plus the Phase 3 authentication post-decision reconciliation at product-rules/PHASE-3-AUTHENTICATION-POST-DECISION-RECONCILIATION.md. The audit found 160 requirements / 259 criteria, 15/15 facets represented, 72 owner questions (8 resolved / 64 open), no duplicate IDs or dangling dependency IDs, and 231 acceptance-criterion ID profile deviations. Four authentication projection statement mismatches were corrected. Semantic dependency, quarantine-to-analysis, recovery notification, gate revocation, deletion/backup/audit and remote-provider boundary findings remain open and are explicitly carried to Phase 9. Phase 8 does not approve PM-proposed requirements or claim runtime conformance.

## Feature order

1. **Authentication/account infrastructure** — supporting capability, not a fourth user-facing MVP feature.
2. **MVP-01:** Manual file security analysis.
3. **MVP-02:** Quarantine and file disposition.
4. **MVP-03:** Website and link checking.
5. Cross-cutting system requirements.

For MVP-03, both gates are mandatory: Pro entitlement is active AND the owner-controlled activation switch is enabled. No provider/API call may occur if either gate is false. Pro is not unlimited. Provider, quotas, spend limits and activation economics remain unresolved. IP address tracking/investigation is outside MVP.

## Authentication baseline

The Software Rules identity/authentication facet inventories principal establishment, credential verification, token claims/signature, expiry, refresh, revocation, logout, session lifecycle, MFA/recovery and identity-provider errors.

The Phase 6 corpus has bounded JWT verification and Express session-lifecycle cases. The inventory explicitly leaves credential verification, provider login/logout, refresh rotation, revocation lists, MFA/recovery, distributed sessions, rolling expiry, secure-cookie deployment, provider outages and principal provisioning uncovered.

This is a coverage checklist, not a decision that ZeroDeck requires every mechanism. For each property decide: required, not applicable with rationale, deferred with consequence, or unresolved. Authorization is a separate facet. Also assess relevant security, API, data, persistence, configuration, errors/recovery and integration facets.

## First-party authentication direction

Owner direction already recorded in the platform assessment:
- Neon is preferred as managed database.
- ZeroDeck should own its authentication and backend.
- Avoid hosted identity providers by default.
- Use established security libraries for password hashing, cryptography, secure randomness, session/cookie handling and validation.
- Do not invent cryptographic primitives or protocols.
- Enforce identity, authorization, Pro entitlement and activation on the trusted server side.

These are architecture directions, not a complete authentication contract. Do not assume MFA, social login, federation, email/phone verification or a particular recovery mechanism until research and owner decisions establish the requirement.

## Deliverable layout

- `2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md` — this workstream plan.
- `product-rules/README.md` — contract index, version, scope and status.
- `product-rules/VALIDATION-REPORT.md` — Phase 1 fixture checks, negative tests and validation limitations.
- `product-rules/PROFILE.md` — completed PM authoring profile and validation rules.
- `product-rules/schemas/zero-deck-pm-declared-contract.schema.json` — complete PM declared-contract profile schema.
- `product-rules/schemas/zero-deck-pm-requirements-extension.schema.json` — PM extension schema.
- `product-rules/templates/` — declared-contract and evidence templates.
- `product-rules/examples/declared-contract-format-example.json` — format-only fixture, not an approved product requirement.
- `product-rules/contracts/IDENTITY-AUTHENTICATION.md` — Phase 2 canonical draft.
- `product-rules/contracts/IDENTITY-AUTHENTICATION.declared-contract.json` — structured Software Rules projection.
- `product-rules/evidence/identity-authentication-contract.evidence.json` — retained declared-contract evidence.
- `product-rules/PHASE-2-VALIDATION.md` — Phase 2 structural/semantic validation, corrections, negative tests and limitations.
- `product-rules/PHASE-3-15-FACET-COVERAGE.md` — Phase 3 assessment of all 15 facets and classification of uncovered properties.
- `product-rules/PHASE-3-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — Phase 3 scenario traceability for negative, failure, recovery, conditional and deferred cases.
- `product-rules/proposals/PHASE-3-AUTHENTICATION-COVERAGE-ADDITIONS.json` — machine-readable metadata and acceptance criteria for three PM-proposed candidate additions; not yet part of the canonical contract.
- `product-rules/proposals/PHASE-3-BEHAVIOUR-FACET-REFERENCE.json` — metadata-only proposal to add the missing Behaviour facet reference to all 21 authentication requirements; not yet applied to the canonical contract.
- `product-rules/PHASE-3-VALIDATION.md` — Phase 3 checks, integrity and validation limitations.
- `2026-11-28/14-PHASE-3-COMPLETION-PLAN.md` — owner-approved Phase 3 plan.
- `2026-11-28/15-PHASE-3-CIRCLES-COVERAGE.md` — seven-step Phase 3 CIRCLES analysis and recommendation.
- `2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md` — the seven-step CIRCLES analysis, alternatives, trade-offs and PM recommendation.
- `product-rules/contracts/MANUAL-FILE-ANALYSIS.md` — Phase 4 canonical draft (28 requirements / 56 criteria).
- `product-rules/contracts/MANUAL-FILE-ANALYSIS.declared-contract.json` — synchronized Software Rules projection.
- `product-rules/evidence/manual-file-analysis-contract.evidence.json` — retained declared-contract provenance.
- `product-rules/PHASE-4-MVP-01-FACET-COVERAGE.md` — all 15 facets assessed.
- `product-rules/PHASE-4-MVP-01-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — 35 distinct scenarios.
- `product-rules/PHASE-4-MVP-01-VALIDATION.md` — targeted checks and limitations.
- `2026-11-28/19-PHASE-4-CIRCLES-MANUAL-FILE-ANALYSIS.md` — seven-step CIRCLES analysis.
- `product-rules/contracts/QUARANTINE-DISPOSITION.md`
- `product-rules/contracts/WEBSITE-LINK-CHECKING.md` — Phase 6 canonical draft (41 requirements / 41 criteria; four owner-approved scope encodings, 37 PM-proposed; 18 open questions).
- `product-rules/contracts/WEBSITE-LINK-CHECKING.declared-contract.json` — synchronized structured projection.
- `product-rules/evidence/website-link-checking-contract.evidence.json` — retained declared-contract provenance.
- `product-rules/PHASE-6-MVP-03-FACET-COVERAGE.md` — all 15 facets assessed.
- `product-rules/PHASE-6-MVP-03-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — 81 distinct scenarios.
- `product-rules/PHASE-6-MVP-03-VALIDATION.md` — 19 targeted checks and limitations.
- `2026-11-28/23-PHASE-6-CIRCLES-WEBSITE-LINK-CHECKING.md` — seven-step CIRCLES analysis and PM recommendation.
- `product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md` — Phase 7 canonical draft (28 PM-proposed requirements / 28 criteria / 18 open questions).\n- `product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.declared-contract.json` — synchronized structured projection.\n- `product-rules/evidence/cross-cutting-system-requirements-contract.evidence.json` — retained declared-contract provenance.\n- `product-rules/PHASE-7-CROSS-CUTTING-FACET-COVERAGE.md` — all 15 official facets assessed.\n- `product-rules/PHASE-7-CROSS-CUTTING-FAILURE-RECOVERY-MATRIX.md` — 58 negative/failure/recovery scenarios.\n- `product-rules/PHASE-7-CROSS-CUTTING-VALIDATION.md` — 30 targeted checks and limitations.\n- `2026-11-28/24-PHASE-7-CIRCLES-CROSS-CUTTING-SYSTEM-REQUIREMENTS.md` — seven-step CIRCLES analysis.
- `product-rules/TRACEABILITY.md`

These remain ZeroDeck PM artifacts mapped to Software Rules declared contracts. Do not write them into the separate Software Rules repository unless the owner approves that contribution.

## Phase 2 completion record

Phase 2 is complete. The canonical authentication/account contract contains 21 stable PM-proposed requirements and 46 concrete Given/When/Then acceptance criteria. The structured declared-contract projection contains 21 matching metadata records, valid provenance enums, exact Markdown statement parity, valid facet/platform values and four explicitly conditional requirements. Eight product decisions remain open and every requirement remains PM-proposed.

The seven-step CIRCLES analysis records the chosen user cohort, inferred needs, prioritization cut, three materially different approaches, evaluation trade-offs, and one PM recommendation with a testable pilot metric. The recommendation is not an owner decision.

Validation is recorded in product-rules/PHASE-2-VALIDATION.md. The PM contract schema and extension schema were checked together with the pinned upstream Software Rules declared-contract definition; the retained evidence record was checked against the upstream evidence definition. Five malformed-record negative tests were detected. The exact canonical Markdown SHA-256 digest, artifact revision, evidence URI and evidence revision match. The validator is targeted to the relevant schema definitions; it is not a general-purpose Draft 2020-12 engine, full capture validation, upstream CI or runtime conformance test. Phase 3 will assess cross-facet completeness; it is not implied by Phase 2 completion.

## Phase 1 completion record

Phase 1 is complete. The exact upstream Software Rules commit is pinned; the PM profile maps to the existing `declaredContracts[]` record; the author/issuer, artifact revision/digest, normative statements, requirement metadata, official facet IDs, IDs/versioning, and owner-approval states are specified. Separate JSON Schemas validate the complete PM declared-contract record and its namespaced extension. A format-only fixture was checked against the upstream declared-contract/evidence definitions and PM extension constraints; statement/metadata parity, evidence linkage, and issuer/author identity passed. Negative checks detected missing author identity, invalid facet IDs, missing conditions on conditional requirements, and missing acceptance criteria. This was a targeted authoring-session validation, not an upstream Software Rules CI run or a claim of runtime conformance.

## Completion criteria

All in-scope capabilities have structured, versioned contracts; author/issuer is explicit; requirements have stable IDs, unambiguous normative statements and observable acceptance criteria; relevant facets are assessed; unknowns and owner decisions are visible; evidence is traceable; implementation details are not unnecessarily prescribed; and cross-facet contradictions and lifecycle/failure/recovery gaps are reviewed.

A complete product contract does not prove that an implementation conforms. Runtime verification is a later engineering/testing activity.


## Phase 3 completion record

Phase 3 is complete for the PM-authored authentication coverage assessment. All 15 official Software Rules facets were assessed against the 21-requirement/46-criterion contract; 23 negative, failure, recovery, conditional and deferred scenarios were classified; cross-facet and web/Android interactions were reviewed; and three candidate additions were documented with stable IDs, six complete acceptance criteria and structured metadata. The canonical Phase 2 Markdown/JSON/evidence revision and digest were left unchanged. Targeted structural and traceability checks passed. A full independent Draft 2020-12 validator, upstream Software Rules CI and ZeroDeck runtime testing were not run. Eight owner questions remain open. See `product-rules/PHASE-3-VALIDATION.md` for the exact boundary. Phase 4 is next.


## Phase 6 completion record

Phase 6 is complete as a PM requirements-authoring phase. The canonical MVP-03 website/link-checking contract is v0.1.0-draft with 41 requirements, 41 acceptance criteria and 18 open questions. Four requirements directly encode owner-approved scope decision ZD-SCOPE-001 (independent active Pro and owner-activation gates, no provider call unless both pass, and Pro is not unlimited); the remaining 37 are PM-proposed. The structured declared-contract projection and retained evidence match the final canonical Markdown revision `1210f236d80972a4c877ee042cce1963da872d62` and SHA-256 `sha256:d38382a6f9f90a7abdf15df243be357cdac9a2b36b0cf2a7d2e97352badc3fd6`. The phase includes the seven-step CIRCLES recommendation, all 15 official facets, 81 negative/failure/recovery scenarios and 21/21 targeted checks with five malformed fixtures rejected. Full independent Draft 2020-12 validation, upstream Software Rules CI, runtime/provider tests, security audit, customer research, legal/privacy review and production-readiness assessment were not performed. No product implementation or Software Rules repository files were changed. Phase 7 is complete; see the Phase 7 completion record.


## Phase 7 completion record

Phase 7 is complete as a PM requirements-authoring phase. The canonical cross-cutting system contract `product-rules/contracts/CROSS-CUTTING-SYSTEM-REQUIREMENTS.md` is v0.1.0-draft with 28 PM-proposed requirements, 28 Given/When/Then acceptance criteria and 18 open owner questions. The matching structured projection and declared-contract evidence are synchronized to canonical revision `4b4d32b939e627fe84b4120ab43df6b5c733d421` and SHA-256 `sha256:f0b491d4ce97b7286ad9f56d35f61761204fffb36e0700f1778eae27da7dc06a`. The phase includes all seven CIRCLES steps, an assessment of all 15 official facets, 58 negative/failure/recovery scenarios and 30/30 targeted checks with 5/5 malformed fixtures rejected. Full independent Draft 2020-12 validation, upstream Software Rules CI, runtime/security tests, customer research, legal/privacy review and production-readiness assessment were not performed. All 28 requirements remain PM-proposed; owner approval of the plan did not approve the product requirements. Phase 8 cross-facet completeness/consistency review is complete; Phase 9 owner review and product-design closure is complete; technical architecture is next.


## Phase 9 completion record

Phase 9 is complete as product-design closure. The owner approved the product-level recommendations under `ZD-DEC-PHASE9-2026-11-28`; this does not approve technical architecture. All 64 Phase 8 questions have explicit dispositions (15 resolved / 49 deferred). The five contracts contain 160 requirements / 259 acceptance criteria across all 15 official facets. Their Markdown, structured projections and evidence records are synchronized; targeted checks confirm unique IDs, capability-scoped criterion IDs, statement/criterion parity, evidence revision/URI/digest parity and no dangling dependencies. Phase 8 findings have explicit closure or handoff status. See `2026-11-28/39-PHASE-9-CLOSURE-VALIDATION.md` and `2026-11-28/40-ARCHITECTURE-HANDOFF.md`. The next agent/workstream is technical architecture. Product implementation, runtime conformance and production readiness are not claimed.
