# Zerodek Reverse-Engineering Plan

**Project:** ZeroDeck — ethical-hacking and penetration-testing tool/platform (startup)  
**Repository:** REMAREMA6/zero-deck  
**Product reference:** https://github.com/lordwhitefire/Zerodek  
**Governing format:** https://github.com/REMAREMA6/software-rules  
**Plan version:** 1.2  
**Last updated:** 2026-11-27

## 1. Mission

Reverse-engineer the declared ZeroDeck MVP scope represented by the available product materials and produce an evidence-backed, technology- and stack-independent Software Rules specification. ZeroDeck is the broader ethical-hacking and penetration-testing startup; the Security Scanner materials represent one candidate service/capability area, not the startup's complete identity or scope. Do not assume every candidate capability belongs in the MVP.

The objective is not merely to reproduce the screens. The rules must describe all in-scope properties needed to reproduce the declared product scope. Do not begin application implementation as part of this engagement.

## 2. Repository roles

- **lordwhitefire/Zerodek:** product mock-screen/design reference. Treat the 17 screens as design evidence, not as a running application.
- **REMAREMA6/zero-deck:** agent workspaces, investigation records, plan, and tracker. Respect `RULES.md`; keep RE evidence in `re/`.
- **REMAREMA6/software-rules:** governing specification, schemas, evidence model, facet definitions, and validation/conformance requirements.
- **zero-deck/software-rules/:** final Zerodek-specific Software Rules deliverable, separate from RE working evidence, as explicitly designated by the owner.

## 3. Governing method

Follow the contribution and handoff pattern in the Software Rules repository. Before each resumed work session, read:

1. `REMAREMA6/software-rules/README.md`
2. `REMAREMA6/software-rules/PLAN.md`
3. `REMAREMA6/software-rules/TRACKER.md`
4. `REMAREMA6/software-rules/CONTRIBUTING.md`
5. The relevant active-task specifications, facet definitions, schemas, and conformance guidance named in this project's tracker.

Use the Software Rules 15 facets directly as the investigation and rule-organization structure. Do not create a parallel six-category taxonomy.

## 4. Evidence rules

- Mock screens establish visible design facts and may suggest intended interactions; they do not prove runtime, persistence, API, security, or backend behaviour.
- Source code supports source-derived claims about the inspected implementation; it does not prove Zerodek runtime behaviour.
- Keep runtime observations, source-derived inferences, declared intent, assumptions, and unknowns distinct.
- Every adopted rule must link to evidence and explain its relevance to the Zerodek capability.
- Record source repository, immutable commit/revision, file path, symbol or line range where available, licence, and inspection date.
- Do not infer that a capability is absent because it is not visible in a mockup.
- Do not claim replication sufficiency while relevant required properties remain unknown, unobserved, source-inferred only, conflicting, or otherwise unresolved.
- Respect the project ownership/authorization scope and the uploaded RE-agent safety constraints.

## 5. Work phases and exit gates

### Phase 0 — Governance and handoff
- [x] Read the Software Rules contribution workflow and adopt its plan/tracker/resumption pattern.
- [x] Establish this project plan, tracker, and contribution guide.
- [x] Link governance documents from the project README.
- [x] Record the current engagement understanding and active task.
**Exit gate:** a new chat can resume from repository records alone, without relying on private chat history.

### Phase 1 — Mockup inventory
- [x] Inspect and reconcile the 17-screen baseline, numbered Screen 18 extension, and additional routes/assets.
- [x] Record screen content, controls, stated states/interactions, navigation clues, responsive/layout details, and evidence limits.
- [x] Distinguish design intent, reference-image observations, source implementation, local/demo interactions, and unknowns.
- [x] Record source paths, route/preview/component mappings, asset dispositions, and stable screen evidence IDs.
**Exit gate: satisfied for the 17-screen baseline.** All 17 screens are inventoried and mapped; Screen 18 and two additional routes are separately recorded. Scanner-draft MVP/later/open labels were distinguished from ZeroDeck's startup MVP selection; the owner later approved a bounded three-capability MVP in Phase 2. See re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md. This completes inventory only, not capability-level reverse engineering.

### Phase 2 — Capability and facet mapping
- [x] Derive the evidence-backed candidate capabilities and workflows from the complete screen inventory; preserve the broader startup direction separately. See CAPABILITY-INVENTORY.md and MVP-SCOPE-DECISION.md. The owner-approved MVP is frozen.
- [x] Map candidate capabilities and required properties to all 15 Software Rules facets. See CAPABILITY-FACET-MAPPING.md.
- [x] Identify cross-facet relationships, dependencies, scenario branches, and missing information. See CAPABILITY-FACET-MAPPING.md.
- [x] Freeze the owner-selected MVP, included workflows, deferred candidates and exclusions in `MVP-SCOPE-DECISION.md`.
- [x] Finalize the required-property investigation map against the selected MVP across all 15 Software Rules facets.
**Exit gate: satisfied.** The owner explicitly selected manual file security analysis, quarantine/file disposition, and website/link checking as the first ZeroDeck MVP. IP address tracking/investigation is recorded as future candidate CAP-13 and explicitly excluded. The bounded workflow set, scenario branches, exclusions, cross-facet dependencies and 15-facet required-property questions are recorded in `MVP-SCOPE-DECISION.md`, `CAPABILITY-INVENTORY.md`, and `CAPABILITY-FACET-MAPPING.md`. This closes scope definition only; it does not claim that the MVP has been fully reverse-engineered or is replication-sufficient.

**Supplemental UI source review (2026-11-27):** extracted 11 bounded source-derived UI rules from the pinned Expo/React Native screen source in `re/zerodek-product-re/2026-11-27/UI-SOURCE-DERIVED-RULES.md`. These are source findings, not runtime observations or a complete UI specification.

### Phase 3 — Prior-art discovery and selection
- [x] Audit existing reconnaissance records for relevance to the three selected MVP capabilities only.
- [x] Search for and screen prior-art implementations and official platform/provider documentation for manual file security analysis, quarantine/file disposition, and website/link checking.
- [x] Verify selected candidate repositories, immutable source revisions, licences, maintenance signals, security posture, and feature fit to the extent documented in the register.
- [x] Record select/reference/reject decisions with reasons; keep IP tracking and all other deferred candidates out of MVP source selection.
- [x] Record owner-approved Pro entitlement and owner-activation gate for link checking; map its cross-facet implications.
**Exit gate: satisfied 2026-11-27.** Every selected Phase 4 reference has a documented capability mapping and provenance. Commercial, privacy, technical and runtime gaps are explicitly handed to Phase 4; no direct third-party dependency adoption or runtime verification is implied. See `PHASE-3-PRIOR-ART-REGISTER.md` and `PRO-GATED-LINK-CHECK-DECISION.md`.

### Phase 4 — Source-level rule extraction
- [x] Inspect and trace the selected Hypatia scanner, database, verifier, and HypatiaDatabases generator/workflow at pinned revisions.
- [x] Extract manual file-analysis, signature database, feed-generation, and signed-artifact rules with file/line provenance.
- [x] Inspect Android storage, SAF, and Keystore documentation; extract quarantine-related platform constraints and explicitly retain implementation unknowns.
- [x] Inspect Web Risk Lookup, REST schema, threat types, caching, and pricing; separate provider contracts from ZeroDeck owner policy.
- [x] Record the Pro entitlement and owner-activation requirements as separate owner-declared rules.
- [x] Audit all 15 Software Rules facets against each approved MVP capability and record evidence, conditional applicability, and unknowns.
- [x] Separate source-derived/documented/owner-declared claims from runtime-verified claims; no ZeroDeck runtime behaviour is claimed.
**Exit gate: satisfied 2026-11-27 for source-level extraction.** Every extracted rule has an evidence class, provenance and applicable facet mapping; all 15 facets were reviewed across the three approved MVP capabilities; unsupported behaviour and required unknowns are explicitly retained. This closes extraction only, not product completeness or replication sufficiency. See `PHASE-4-SOURCE-RULE-EXTRACTION.md` and `PHASE-4-15-FACET-COVERAGE-AUDIT.md`.

### Phase 5 — Software Rules synthesis
- [x] Re-read and apply the current Software Rules 0.3.0 Draft core model, terminology, principles, evidence/provenance, source-derived-rule requirements, 15 facet specifications, schema 0.2.0 Draft and versioning policy.
- [x] Create the separate `software-rules/` deliverable with scope, owner rules, product-material workflow rules, scenarios, evidence register, open-property register and typed payload map.
- [x] Express the three MVP capabilities in technology-independent terms using the common record model and typed facet payloads. The capture contains three declared contracts and remains explicitly incomplete.
- [x] Include scope, seven scenarios, all 15 facets and their semantic payload dimensions, 757 property entries, 12 evidence records, individual rule traceability, unknowns, exclusions and cross-facet links.
**Exit gate: SATISFIED 2026-11-27 for synthesis readiness.** Individual rule/evidence traceability, scenario-level property inventory, all 15 semantic facet mappings, cross-facet consistency, governing Draft 2020-12 schema validation, governing completeness/integrity suites and ZeroDeck-specific reference checks passed. See `software-rules/PHASE-5-SYNTHESIS-AUDIT.md` and [CI run #45997192513](https://github.com/REMAREMA6/zero-deck/actions/runs/45997192513). This closes synthesis only: the capture remains incomplete and is not replication-sufficient; Phase 6 must independently assess completeness and conformance.

### Phase 6 — Completeness and conformance
- [x] Independently review all 15 facets and their semantic dimension sets against the three-capability MVP; record applicability and scenario coverage in the Phase 6 audit.
- [x] Review the capability/facet and scenario/dimension inventory for omissions and inconsistent applicability; correct missing quarantine Configuration coverage and conditional API/Integrations overstatement.
- [x] Validate the corrected capture against governing schemas, completeness/integrity checks and ZeroDeck cross-reference checks in [CI run #46000308895](https://github.com/REMAREMA6/zero-deck/actions/runs/46000308895).
- [x] Explicitly retain all unresolved properties, scenario-definition gaps, conditional facets, evidence limitations and runtime access gaps in `OPEN-PROPERTIES.md` and the Phase 6 audit.
- [x] Produce the bounded completeness/conformance assessment and state exactly what is and is not replication-sufficient in `software-rules/PHASE-6-COMPLETENESS-AUDIT.md`.
**Exit gate: SATISFIED 2026-11-27 for the bounded completeness/conformance review.** The deliverable is explicitly **incomplete and not replication-sufficient**, with all known unresolved properties and evidence gaps retained. This is not approval of product completeness or faithful replication.

### Phase 7 — Non-UI runtime investigation of selected prior-art implementations

**Corrected scope (owner clarification, 2026-11-27):** Phase 7 does not run the ZeroDeck mockup repository. lordwhitefire/Zerodek is the owner's fork of Felix's product-intent repository. It is used for screen/design intent and source-level UI inspection only. REMAREMA6/zero-deck is the actual ZeroDeck product repository being built. The selected prior-art implementations from Phase 3 are the runtime-investigation targets.

- [ ] Complete target-specific RE triage and record the permission/licence basis before any execution.
- [ ] Pin each selected implementation to its Phase 3 immutable revision and inspect entry points, build scripts, dependencies, install hooks, tests and runtime prerequisites before execution.
- [ ] Investigate only non-UI behaviour relevant to the approved MVP and 15 facets: file scanning/verdicts, threat-data generation and integrity, quarantine-relevant file/storage semantics where implemented, errors/recovery, security controls, resource behaviour, and documented API/provider contracts.
- [ ] Runtime targets: SRC-01 Hypatia (Android file scanner), SRC-02 HypatiaDatabases (database-generation pipeline), and SRC-06 ClamAV (comparison engine only; not an adopted dependency).
- [ ] Do not perform runtime UI inspection or derive UI rules from runtime. UI is handled from the existing mockup/screens and source code; its eventual runtime rules are a later implementation-stage task for the developer agent.
- [ ] SRC-04 Web Risk is a remote provider contract. Do not make external provider calls, create accounts, obtain secrets, or incur costs; record its runtime behaviour as unverified unless the owner separately approves a properly scoped integration test.
- [ ] SRC-07 Android storage/SAF/Keystore are platform documents, not executable repositories; use them as documented constraints, not runtime targets.
- [ ] Do not run malware samples or suspicious files. Use only benign, controlled test fixtures where execution is authorized and a suitable lab exists.
- [ ] Capture reproducible scenario-level evidence: exact revision, environment, commands, initial state, inputs, ordered actions, outputs, logs, resulting state, and stop criteria.
- [ ] Map each observation to relevant ZeroDeck scenarios/facets while preserving evidence class. Reference-project runtime observations are never described as ZeroDeck production behaviour.
- [ ] Update the capture, evidence, property inventory, traceability and open-property register only where supported; rerun governing validation.

**Execution gate:** no target code is run until both target-specific authorization/permission and a genuinely suitable named isolated environment are established. A normal container, folder, process or user account is not sufficient. If either gate fails, continue with safe source/document analysis and record runtime as blocked/unverified.

**Environment preflight (2026-11-27):** the available container runs as root; Docker, Podman, Android Debug Bridge, Gradle and ClamAV executables were not found. No named isolated lab or its no-host-share/no-bridged-network/snapshot-and-destroy properties have been verified. Runtime execution is therefore **blocked at preflight**; this is not a completed runtime investigation.

**UI source work is separate:** extract source-derived UI rules from the owner's mockup fork and screen source without calling them runtime observations. Later, when the actual ZeroDeck React/TypeScript native app is implemented, the developer agent may capture UI runtime rules and complete the UI evidence.

**Exit gate:** every eligible non-UI runtime scenario has reproducible evidence or a precise authorization/environment/integration blocker; all 15 facets have evidence-backed dispositions; source/runtime/intent evidence remain distinct; capture and validation are reconciled; replication sufficiency is explicitly assessed. A blocked runtime gate does not count as runtime completion.

## 6. Target project structure

```text
zero-deck/
├── README.md
├── RULES.md
├── PLAN.md
├── TRACKER.md
├── CONTRIBUTING.md
├── re/
│   └── zerodek-product-re/
│       └── YYYY-MM-DD/
│           ├── ENGAGEMENT-UNDERSTANDING.md
│           ├── screen-inventory/
│           ├── capability-mapping/
│           ├── source-research/
│           ├── source-analysis/
│           └── reports/
└── software-rules/
    └── ... # final product-specific rules, following the governing format
```

This is a target structure, not a requirement to create empty directories. Add files only when they have defined content and purpose. Keep evidence in the RE workspace; keep the final rules in the designated deliverable folder.

## 7. Change and decision control

- Update `TRACKER.md` whenever work starts, changes status, becomes blocked, or is completed.
- Update `PLAN.md` only when scope, phase sequence, deliverables, or exit gates change.
- Record consequential Zerodek investigation decisions in the RE workspace with stable IDs and evidence.
- Do not edit the separate Software Rules specification repository as part of this product engagement.
- Preserve existing project workspaces; do not copy another agent's evidence into the RE workspace.
- Do not mark a phase complete based only on a partial sample, successful tool call, or green validation run.

## 8. Resuming in a new chat

The repository is the persistent project record. A new chat must read, in order:

1. `README.md` and `RULES.md`.
2. `PLAN.md` for mission, phase sequence, and exit gates.
3. `TRACKER.md` for current phase, active task, completed work, blockers, and the single next action.
4. `re/zerodek-product-re/2026-11-27/ENGAGEMENT-UNDERSTANDING.md`.
5. The active-task files and the corresponding Software Rules documents named in the tracker.

If chat history conflicts with repository records, inspect the repository and resolve the discrepancy explicitly. The tracker is the operational source of truth for progress; the plan is the source of truth for intended scope and sequence.
