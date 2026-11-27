# Zerodek Reverse-Engineering Plan

**Project:** ZeroDeck — ethical-hacking and penetration-testing tool/platform (startup)  
**Repository:** REMAREMA6/zero-deck  
**Product reference:** https://github.com/lordwhitefire/Zerodek  
**Governing format:** https://github.com/REMAREMA6/software-rules  
**Plan version:** 1.3  
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

**Supplemental UI source review (2026-11-27):** extracted 12 bounded source-derived UI rules from the pinned Expo/React Native screen source in `re/zerodek-product-re/2026-11-27/UI-SOURCE-DERIVED-RULES.md`. These are source findings, not runtime observations or a complete UI specification.

### Phase 2 — Capability and facet mapping
- [x] Derive the evidence-backed candidate capabilities and workflows from the complete screen inventory; preserve the broader startup direction separately. See CAPABILITY-INVENTORY.md and MVP-SCOPE-DECISION.md. The owner-approved MVP is frozen.
- [x] Map candidate capabilities and required properties to all 15 Software Rules facets. See CAPABILITY-FACET-MAPPING.md.
- [x] Identify cross-facet relationships, dependencies, scenario branches, and missing information. See CAPABILITY-FACET-MAPPING.md.
- [x] Freeze the owner-selected MVP, included workflows, deferred candidates and exclusions in `MVP-SCOPE-DECISION.md`.
- [x] Finalize the required-property investigation map against the selected MVP across all 15 Software Rules facets.
**Exit gate: satisfied.** The owner explicitly selected manual file security analysis, quarantine/file disposition, and website/link checking as the first ZeroDeck MVP. IP address tracking/investigation is recorded as future candidate CAP-13 and explicitly excluded. The bounded workflow set, scenario branches, exclusions, cross-facet dependencies and 15-facet required-property questions are recorded in `MVP-SCOPE-DECISION.md`, `CAPABILITY-INVENTORY.md`, and `CAPABILITY-FACET-MAPPING.md`. This closes scope definition only; it does not claim that the MVP has been fully reverse-engineered or is replication-sufficient.

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

### Phase 7 — Final planned phase: reference-runtime investigation and evidence reconciliation

**Corrected scope (owner clarification, 2026-11-27):** The task is to extract the rules and properties needed to build the approved ZeroDeck MVP by studying the approved product materials, selected working reference software and official platform/provider contracts. The ZeroDeck first-party application does not need to exist for this reverse-engineering work to be completed. `lordwhitefire/Zerodek` is a product-intent/mock-screen source, not a runtime target. The selected Phase 3 prior-art implementations are the runtime-investigation targets. Software Rules must remain technology- and stack-independent.

**Owner execution instruction (2026-11-27):** Complete all ordinary inspection/build/test work that can reasonably be performed against the three explicitly authorized pinned open-source targets. If a test path does not exist or cannot be safely run, record the reason, skip it, and continue. Do not invent upstream tests or modify third-party source to manufacture coverage.

**Authorized executable targets:**
- Hypatia `c0f98977be935e58849726313635a2459cac3892`
- HypatiaDatabases `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- ClamAV `cad7b18a3e6505195fe08db1412449a18fc9f012`

- [x] Complete target/environment preflight and owner authorization; preserve the consult-first default for every other target/action.
- [x] Verify the GitHub Actions runner and artifact mechanism using three first-party Playwright smoke runs.
- [x] Build/lint Hypatia at its pinned revision; inspect APK and lint artifact. `testDebugUnitTest` is `NO-SOURCE`; recursive audit of 354 tree entries found no test sources or test directories.
- [x] Build/package HypatiaDatabases at its pinned revision and run deterministic valid hash/domain, malformed-hash and exclusion fixture branches. All fixture assertions passed. Recursive audit of 36 tree entries found no `src/test` or upstream test sources.
- [x] Build and test ClamAV at its pinned revision. CTest passed 15/15 targets, 0 failed; retained test logs report 416 passed and 2 skipped across standard and Valgrind pytest invocations (not 416 unique cases).
- [x] Inspect the final logs and artifacts; record exact target revisions, workflow commits, run IDs, artifact IDs/digests, lint findings, test outcomes, side effects and limits in `PHASE-7-RENEWED-ACTIONS-RESULTS.md`.
- [x] Record additional observations in `PHASE-7-RUNTIME-OBSERVATION-MAP.md` and map evidence to all 15 facets and seven MVP scenarios with explicit boundaries.
- [x] Record unavailable paths and reasons: Web Risk live calls require configured credentials/project plus separate approval for URL disclosure/costs; Android storage/SAF/Keystore are documentation; mockup UI runtime is out of scope; no malware/suspicious samples or external feed/publication operations were performed.
- [x] Reconcile `EVIDENCE.md`, `RULE-TRACEABILITY.md` and `capture.json`. Register reference-runtime reports as supporting context only; keep ZeroDeck executions, observations and runtime rules at zero.
- [x] Validate the machine capture and cross-references after adding EVD-RT-REF-001/002. [Final validation run #46035518643](https://github.com/REMAREMA6/zero-deck/actions/runs/46035518643) passed after EVD-RT-REF-001/002 were added to the machine capture.
- [x] Complete the renewed closeout audit and reconcile the tracker.

**Phase 7 exit gate: satisfied for the bounded reference-runtime investigation.** All three authorized executable reference targets have exact-pinned build/test evidence; the 15 facets and seven ZeroDeck MVP scenarios have explicit evidence-or-skip dispositions; provenance classes remain separate; evidence registers and machine capture are reconciled; and unavailable paths have reasons. See `PHASE-7-RENEWED-CLOSEOUT-AUDIT.md`.

**Important boundary:** Phase 7 completion does not mean the ZeroDeck-specific Software Rules are complete. `software-rules/OPEN-PROPERTIES.md` still contains unresolved required product properties and owner decisions. Those remain visible and cannot be guessed or silently defaulted. This is not a reason to create Phase 8. Phase 7 is the final planned phase. A first-party ZeroDeck runtime is not required for this RE specification; the implementation agent will use the completed rules after product decisions are resolved.

**Deferred / separately gated:** Web Risk live API calls require owner-configured credentials/project and explicit approval for URL disclosure and provider costs. Live feed ingestion, signing, upstream publication and deployment remain outside this authorization.

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


## 9. GitHub Actions execution procedure and renewed Phase 7

The owner approved GitHub Actions hosted runners as the remote execution path whenever the ChatGPT sandbox lacks required tools, operating systems, browsers, emulators, services, or test capabilities. Follow `re/zerodek-product-re/2026-11-27/GITHUB-ACTIONS-EXECUTION-PROCEDURE.md`.

Use the sandbox when suitable; otherwise create a pinned, reproducible GitHub Actions workflow, inspect its logs and artifacts, fix and rerun as necessary, and record exact evidence and limitations. Playwright is the browser UI path for browser-rendered targets (including screenshot comparison, traces and video); native mobile UI requires an appropriate emulator/device automation path. Use Actions for API, database, persistence, integration, build, and other supported tests.

**Final renewed Phase 7 execution results (2026-11-27):** The scoped owner authorization is recorded in `OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md`. The pinned-target workflow `.github/workflows/phase7-prior-art-tests.yml` produced the following evidence:
- Hypatia at `c0f98977be935e58849726313635a2459cac3892`: Gradle lint/build/debug APK succeeded in [run #46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816); the unit-test task was `NO-SOURCE`, and the pinned source tree has no test source files. Lint reports one Error-severity finding plus warnings.
- HypatiaDatabases at `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`: Maven package and valid, malformed-hash and exclusion fixture branches succeeded in [run #46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816). No upstream test sources exist. No live feeds, signing or publication occurred.
- ClamAV at `cad7b18a3e6505195fe08db1412449a18fc9f012`: CMake build and CTest 15/15 targets passed, 0 failed in [run #46029241394](https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394); retained `LastTest.log` reports 416 passed and 2 skipped across standard and Valgrind pytest invocations (not 416 unique cases).
- Detailed commands, artifacts, digests, findings and limits are recorded in `PHASE-7-RENEWED-ACTIONS-RESULTS.md`; contextual evidence is mapped in `PHASE-7-RUNTIME-OBSERVATION-MAP.md`.

These are reference-project observations, not ZeroDeck runtime observations or automatic ZeroDeck requirements. The renewed Phase 7 investigation is complete within the authorized scope; see `PHASE-7-RENEWED-CLOSEOUT-AUDIT.md`. The machine capture registers EVD-RT-REF-001/002 as supporting context and retains zero ZeroDeck executions, observations and runtime rules. The ZeroDeck-specific capture remains incomplete because the open required properties and owner decisions in `software-rules/OPEN-PROPERTIES.md` are unresolved. A first-party ZeroDeck runtime is not required to complete this reverse-engineering specification. Phase 7 is the final planned phase; no Phase 8 is defined.


## Final agent closeout and successor handoff (2026-11-27)

The outgoing reverse-engineering agent's assignment is **closed**. All phases in this plan (0–7) are complete, and Phase 7 was the final planned phase. No Phase 8 is defined.

This closeout records completion of the outgoing agent's assigned work; it does **not** change the evidence-based maturity assessment of the Software Rules deliverable. The capture remains incomplete and not replication-sufficient while required properties and owner decisions remain open in software-rules/OPEN-PROPERTIES.md. These are handed to the successor agent, which must continue from the existing repository evidence under a separately defined assignment. Do not invent owner decisions or claim replication sufficiency without evidence.

See re/zerodek-product-re/2026-11-27/RE-AGENT-FINAL-CLOSEOUT.md for the final status and start-here handoff.
