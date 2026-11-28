# Product Manager-Authored Product Rules Workstream

**Project:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Owner authority:** Product owner retains final authority  
**Opened:** 2026-11-27  
**Status:** [x] Phases 0–3 complete; Phase 4 next  
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
| 4 | Author manual file-analysis requirements | File selection, input scope, verdicts, limitations, privacy, failure and result semantics drafted | [ ] |
| 5 | Author quarantine/disposition requirements | Quarantine, integrity, restore, deletion, retention, key loss, interruption and recovery drafted | [ ] |
| 6 | Author website/link-check requirements | URL handling, privacy, provider failure, inconclusive results, Pro + activation gates, quotas and spend controls drafted | [ ] |
| 7 | Author cross-cutting system requirements | Accounts, entitlement, configuration, platform differences, data lifecycle, security, reliability and operations reconciled | [ ] |
| 8 | Cross-facet completeness and consistency review | Traceability complete; contradictions, missing states and untestable claims resolved or explicitly open | [ ] |
| 9 | Owner review and release | Owner decisions recorded; versioned contract package ready for engineering handoff | [ ] |

Phases 0–3 are complete. Phase 3 assessed all 15 Software Rules facets, classified 23 negative/failure/recovery scenarios, reviewed cross-facet/platform interactions, and documented three structured PM-proposed additions without changing the canonical Phase 2 contract. Eight owner questions remain open. Phase 2 includes the canonical draft contract with 21 PM-proposed requirements, 46 concrete acceptance criteria, 8 unresolved owner questions, a schema-checked structured projection, retained evidence, and the seven-step CIRCLES analysis/recommendation in 2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md. No requirement is owner-approved. Phase 3 is next. Other feature requirement sets have not yet been authored.

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
- `product-rules/PHASE-3-VALIDATION.md` — Phase 3 checks, integrity and validation limitations.
- `2026-11-28/14-PHASE-3-COMPLETION-PLAN.md` — owner-approved Phase 3 plan.
- `2026-11-28/15-PHASE-3-CIRCLES-COVERAGE.md` — seven-step Phase 3 CIRCLES analysis and recommendation.
- `2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md` — the seven-step CIRCLES analysis, alternatives, trade-offs and PM recommendation.
- `product-rules/contracts/MANUAL-FILE-ANALYSIS.md`
- `product-rules/contracts/QUARANTINE-DISPOSITION.md`
- `product-rules/contracts/WEBSITE-LINK-CHECKING.md`
- `product-rules/contracts/CROSS-CUTTING-SYSTEM.md`
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
