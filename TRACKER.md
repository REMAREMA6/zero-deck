# Zerodek Project Tracker

**Project:** Zerodek reverse engineering  
**Repository:** REMAREMA6/zero-deck  
**Last updated:** 2026-11-27
**Phase 1 inventory commit:** 5bd7ca93c4c300a2f72b26d324758c542c668957
**Phase 2 candidate inventory (scope-finalized) commit:** 2bdfe18b5f6568b366fb702600cce4eddf1b3d6a
**Phase 2 facet mapping (scope-finalized) commit:** d0a8e834b36da917ab26b8781d234c31e7a00c29
**Phase 2 owner decision commit:** 281eae0327d772f8b2c787edb9eda38ab0131c89
**Repository audit closeout commit:** a9ef68819d2793f524bea752f2ccd0ac541981f9  
**Phase 4 extraction blob:** 7cc66f225f82a23a2b94bc53c3364c200f990f64  
**Phase 4 facet audit blob:** 3b32ea7b60d90c30b1511a2e878a411cacc3a648  
**Phase 4 plan closeout blob:** 71c734f9283e03d32263f75cbc9e46014e1e7e03  
**Phase 7 corrected decision commit:** 6cc99584682becef61dbb7d728d604c24d884b1b  
**Current phase:** Phase 7 — final planned phase; bounded reference-runtime investigation complete (2026-11-27)  
**Overall status:** Phase 7 is the final planned phase and its bounded reference-runtime investigation is complete. The three owner-authorized executable prior-art targets were exercised at exact pinned revisions; remaining paths have explicit evidence/skip dispositions. The Software Rules capture now registers the reference evidence as supporting context but retains zero ZeroDeck runtime observations/rules. The product-specific capture remains incomplete and not replication-sufficient because required product properties/owner decisions remain open in `software-rules/OPEN-PROPERTIES.md`. A first-party ZeroDeck runtime is not required to complete this reverse-engineering specification. No Phase 8 is planned. The owner authorization remains scoped to the three pinned targets; the consult-first default remains for other actions.

> This is the persistent progress and handoff record. Update it whenever work starts, changes status, becomes blocked, or is completed. A new chat must be able to resume from this file and the linked repository records without depending on private chat history.

## Status key

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked
- [?] Needs decision or verification

## Current position

- **Current phase:** Phase 7 — final planned phase; bounded reference-runtime investigation complete (2026-11-27).
- **Owner authorization:** The owner explicitly authorized ordinary inspection/build/test work for the three exact-pinned open-source targets. Rationale and scope are recorded in `re/zerodek-product-re/2026-11-27/OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md`. This is a scoped exception; the absolute consult-first default remains for all unlisted targets/actions.
- **Runner smoke:** First-party Playwright smoke passed three times: [#46026033625](https://github.com/REMAREMA6/zero-deck/actions/runs/46026033625), [#46026203672](https://github.com/REMAREMA6/zero-deck/actions/runs/46026203672), [#46026419660](https://github.com/REMAREMA6/zero-deck/actions/runs/46026419660).
- **Hypatia:** [Run #46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) successfully completed Gradle lint/build and produced a debug APK at the pinned SHA. The unit-test task was `NO-SOURCE`; a full 354-entry source-tree audit found no test source files. Lint report includes one Error-severity finding and warnings; see `PHASE-7-RENEWED-ACTIONS-RESULTS.md`.
- **HypatiaDatabases:** [Run #46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) completed Maven packaging and three harmless fixture branches: valid hashes/domain, malformed hash rejection (2 invalid), and excluded-hash filtering. Four non-empty Bloom-filter outputs were verified for the valid fixture. No upstream test sources, live feeds, signing or publication.
- **ClamAV:** [Run #46029241394](https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394) completed CMake configure/build and CTest 15/15 targets passed, 0 failed. Its retained `LastTest.log` reports 416 passed / 2 skipped across pytest invocations, including Valgrind reruns (not 416 unique tests).
- **Initial failures and corrections:** First attempt exposed runner setup errors and a malformed escaped-newline fixture; corrected. Hypatia's first attempt failed dependency verification; subsequent Gradle build succeeded. A separate direct POM fetch returned a digest different from pinned metadata; unresolved, but Gradle's actual build succeeded and verification was not disabled.
- **Artifacts inspected:** Hypatia APK/lint report, HypatiaDatabases fixture output, and ClamAV detailed CTest/Python logs. Details, exact revisions, commands, artifacts and limitations: `re/zerodek-product-re/2026-11-27/PHASE-7-RENEWED-ACTIONS-RESULTS.md`.
- **Excluded / conditional:** Do not spend Phase 7 runtime effort on the mockup fork; UI source capture is sufficient. Web Risk live calls remain separately gated by credentials and explicit URL-disclosure/cost approval. No actual ZeroDeck app runtime exists yet.
- **Closeout:** The bounded renewed Phase 7 pass is complete. See `re/zerodek-product-re/2026-11-27/PHASE-7-RENEWED-CLOSEOUT-AUDIT.md`. All three selected executable prior-art targets have exact-revision Actions build/test evidence; all 15 facets and seven MVP scenarios retain evidence/skip dispositions. Reference evidence is registered in `capture.json` as supporting context; ZeroDeck executions/observations/runtime rules remain zero. The product-specific capture remains incomplete because required product properties and owner decisions remain open; this is not a requirement to build ZeroDeck first.

## Phase tracking

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Governance and handoff | [x] Complete | Project plan, persistent tracker, contribution guide, README navigation, and resumption pattern established and verified. |
| 1 | Repository and screen inventory | [x] Complete | 17-screen baseline inventory and route/source mapping committed; Screen 18 and extra routes/assets recorded separately. See SCREEN-INVENTORY.md. |
| 2 | Capability and facet mapping | [x] Complete | Owner selected manual file security analysis, quarantine/file disposition, and website/link checking. IP tracking is recorded as a future candidate and excluded from MVP. Scope decision, scenarios, exclusions and 15-facet map recorded. |
| 3 | Prior-art discovery and selection | [x] Complete | Exit gate satisfied. Selected Phase 4 references and provenance recorded; unresolved technical/commercial/privacy gaps handed forward. Link checking is Pro-gated and owner-activation-gated. See PHASE-3-PRIOR-ART-REGISTER.md. |
| 4 | Source-level rule extraction | [x] Complete | 31 source-derived rules, 28 platform/provider contract rules, 5 owner-declared link-gating rules, and a 15-facet audit across all three approved MVP capabilities. No ZeroDeck runtime behaviour or replication sufficiency is claimed. See `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md` and `re/zerodek-product-re/2026-11-27/PHASE-4-15-FACET-COVERAGE-AUDIT.md`. |
| 5 | Software Rules synthesis | [x] Complete | Synthesis exit gate satisfied. Includes 6 owner rules, 27 provisional product-material rules, 3 declared contracts, 12 evidence records, 7 scenarios, 15 facets and 757 property entries. All 15 semantic payload mappings, individual rule/evidence traceability, Draft 2020-12 schema validation, governing completeness/integrity suites and ZeroDeck cross-reference checks passed. Capture remains explicitly incomplete and not replication-sufficient. See `software-rules/PHASE-5-SYNTHESIS-AUDIT.md`. |
| 6 | Completeness and conformance | [x] Complete — bounded review | Exit gate satisfied for an explicitly incomplete product deliverable. All 15 facets reviewed; inventory omissions/applicability inconsistencies corrected; 775 entries reconciled (700 required, 75 optional); CI #46000308895 passed. Product remains not replication-sufficient. See `software-rules/PHASE-6-COMPLETENESS-AUDIT.md`. |
| 7 | Renewed GitHub Actions-enabled runtime investigation | [x] Complete (bounded pass) | Owner-scoped authorization recorded; Hypatia build/lint/APK, HypatiaDatabases fixture generator, and ClamAV CMake/CTest/Python tests executed at exact pinned revisions. Logs/artifacts inspected; 15 facets and seven MVP scenarios reconciled with explicit limits. See `PHASE-7-RENEWED-CLOSEOUT-AUDIT.md`. ZeroDeck runtime conformance remains unproven and the product is not replication-sufficient. |

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

[x] Complete — 17-screen baseline inventory, route/source mapping, asset review, scope labels, source/design divergences, missing handoffs, and limitations recorded. Inventory commit: 5bd7ca93c4c300a2f72b26d324758c542c668957.

Audit: `re/zerodek-product-re/2026-11-27/REPOSITORY-AUDIT.md`. Inventory: `re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md`.

The inspected tree contains 20 Next.js page files (19 named subroutes plus the root welcome route), 19 named Screen.tsx components, 20 Preview components, scanner product decisions, screen handoffs, and a separate Expo source tree. The canonical first 17 numbered screens are inventoried. Screen 18 (System Health/Audit Logs) and two extra routes (Real-Time Protection and Privacy Audit) are separately recorded. The scanner working draft's MVP labels are not treated as ZeroDeck startup MVP approval.

## Phase 2 — Capability and facet mapping

- [x] Build the evidence-backed candidate capability inventory without treating scanner materials as the full startup definition.
- [x] Map the selected MVP workflows and required properties to all 15 Software Rules facets.
- [x] Record cross-facet dependencies, scenario definitions, unknowns and scope guardrails.
- [x] Freeze the owner-approved MVP, included workflows, deferred candidates and exclusions.

**Phase 2 exit gate: satisfied.** The owner selected manual file security analysis, quarantine/file disposition, and website/link checking as ZeroDeck's first MVP. IP address tracking/investigation is recorded as CAP-13, a future candidate explicitly excluded from MVP. This closes scope definition only; detailed rule discovery, evidence collection and replication completeness remain future-phase work.

Artifacts: `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md`; `CAPABILITY-INVENTORY.md`; `CAPABILITY-FACET-MAPPING.md`.

Use the 15 Software Rules facets as the investigation taxonomy. The six labels UI, Data, Business logic, Functionality, UX, and System are not a parallel taxonomy for this engagement.

## Phase 3 — Prior-art discovery and selection

[x] Complete — exit gate satisfied 2026-11-27. See `re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md`.

The separate Android Security Scanner reconnaissance was audited and its relevant leads independently re-opened and pinned. Phase 4 references selected: Hypatia and HypatiaDatabases for file-analysis patterns; Android storage/SAF/Keystore official documentation for quarantine constraints; Google Web Risk Lookup API for URL checking; ClamAV as a comparison reference. Safe Browsing v4 and URLhaus community API were not selected for the commercial default path. No third-party code dependency is approved by this selection. Owner decision ZD-DEC-2026-11-27-02 makes link checking Pro-only and owner-activation-gated until paid revenue can fund costs. Remaining technical, commercial, privacy and runtime gaps are carried into Phase 4.

## Phase 4 — Source-level rule extraction

[x] Complete — exit gate satisfied 2026-11-27 for source-level extraction. See `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md` and `PHASE-4-15-FACET-COVERAGE-AUDIT.md`.

Extracted 31 source-derived rules from pinned Hypatia/HypatiaDatabases references; 28 documented Android/Web Risk platform/provider contract rules; and 5 owner-declared Pro/activation rules. The 15 facets were reviewed for each of the three approved MVP capabilities. Every claim is classified and linked to provenance/facets; unsupported properties remain explicitly unresolved. No ZeroDeck runtime behaviour, production provider call, malware execution, measured performance, or replication sufficiency is claimed.

## Phase 5 — Software Rules synthesis

[x] Complete — synthesis exit gate satisfied 2026-11-27. The deliverable contains 6 owner rules, 27 provisional product-material rules, 7 scenarios, all 15 semantic facet mappings, 757 property inventory entries, 12 evidence records and individual rule/evidence traceability. The ZeroDeck capture passed the governing Draft 2020-12 schema validator, governing completeness tests, governing cross-record integrity tests and ZeroDeck-specific reference checks in CI run #45997192513. Full audit: `software-rules/PHASE-5-SYNTHESIS-AUDIT.md`.

This closes synthesis only. The machine capture has no runtime executions, observations or runtime rules; 712 scenario/facet/dimension entries are marked not-observed; the 45 capability/facet applicability entries retain their unknown status. No runtime observations exist. The product-specific Software Rules remain explicitly incomplete and not replication-sufficient. Phase 6 must independently review omissions, applicability and evidence sufficiency. Preserve source-derived, documented-contract, owner-declared and unknown evidence classes; do not alter the governing specification repository.

## Phase 6 — Completeness and conformance

[x] Complete 2026-11-27 — bounded completeness/conformance review. Exit gate satisfied only because the product-specific deliverable is explicitly marked incomplete with unresolved gaps. See `software-rules/PHASE-6-COMPLETENESS-AUDIT.md`. No runtime conformance or replication sufficiency is claimed.

Review closed 2026-11-27 under the plan's incomplete-deliverable exit branch. The capture remains incomplete and not replication-sufficient; resolve the open product decisions and required properties before a completeness claim. A first-party ZeroDeck runtime is not required to complete this reverse-engineering specification.

## Phase 7 — Final planned phase: reference-runtime investigation and evidence reconciliation

[x] Complete — bounded renewed investigation closed 2026-11-27. Phase 7 is the final planned phase; there is no Phase 8.

- [x] Correct the target scope: Hypatia, HypatiaDatabases and ClamAV are the three authorized executable prior-art targets; Web Risk remains documented-only; Android platform docs are not executable repositories; the mockup fork remains source/design evidence only.
- [x] Complete preflight and exact-revision build/test execution using GitHub Actions hosted runners.
- [x] Audit the pinned Hypatia tree (354 entries): no test source files or test directories exist; Gradle reports `testDebugUnitTest: NO-SOURCE`. Build/APK/lint evidence retained; lint error and warnings disclosed.
- [x] Audit the pinned HypatiaDatabases tree (36 entries): no `src/test` or test source files exist. Run valid hash/domain, malformed-hash and exclusion fixture branches; all assertions passed.
- [x] Execute ClamAV CMake build and CTest at the pinned revision: 15/15 targets passed, 0 failed; 416 pytest test executions passed and 2 skipped across standard and Valgrind invocations (not 416 unique tests).
- [x] Inspect final logs/artifacts and record exact run IDs, revisions, artifact IDs/digests, test outcomes, lint findings and limits in `PHASE-7-RENEWED-ACTIONS-RESULTS.md`.
- [x] Map reference findings to all 15 facets and seven MVP scenarios with explicit evidence boundaries; no reference behaviour promoted to ZeroDeck rules.
- [x] Record Web Risk live-call, live feed, publication, emulator/device and malware-sample skips with reasons; continue all independent safe paths.
- [x] Register EVD-RT-REF-001/002 as supporting-context evidence in `capture.json`, align `EVIDENCE.md`, and retain zero ZeroDeck executions, observations and runtime rules.
- [x] Validate the reconciled machine capture and evidence cross-references; final evidence validation passed: [run #46035518643](https://github.com/REMAREMA6/zero-deck/actions/runs/46035518643).
- [x] Close the renewed Phase 7 audit and reconcile plan/tracker status.

**Phase 7 exit gate:** satisfied for the bounded reference-runtime investigation. This does not claim that the ZeroDeck-specific Software Rules are complete. The remaining required product properties and owner decisions are listed in `software-rules/OPEN-PROPERTIES.md`; they remain visible and unresolved. A first-party ZeroDeck runtime is not required for this reverse-engineering specification, and no first-party runtime behaviour is claimed.

**Deferred, separately gated work (not Phase 7 blockers):** live Web Risk calls require an owner-configured project/credentials and explicit approval for URL disclosure and costs. Live feed ingestion/signing/publication and destructive deployment remain outside the authorization. Native app implementation/runtime tests occur after this RE specification work.

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


## Phase 7 execution details — completed

- [x] Record the owner-approved GitHub Actions execution procedure in `re/zerodek-product-re/2026-11-27/GITHUB-ACTIONS-EXECUTION-PROCEDURE.md`.
- [x] Re-read prior Phase 7 evidence, target pins and uploaded RE-agent ownership/safety constraints.
- [x] Build the target eligibility matrix in `PHASE-7-RENEWAL-TARGET-MATRIX.md`.
- [x] Run the first-party Playwright runner smoke test three times; screenshot/video/trace artifact upload succeeded.
- [x] Execute and inspect the three authorized exact-pinned prior-art targets; Hypatia/HypatiaDatabases follow-up fixture work and ClamAV 15/15 CTest evidence are recorded in `PHASE-7-RENEWED-ACTIONS-RESULTS.md`.
- [x] Keep the mockup fork out of runtime testing; UI source-derived rules remain separate.
- [x] Reconcile evidence to all 15 facets and seven MVP scenarios without promoting reference behaviour into ZeroDeck rules.
- [x] Reconcile `EVIDENCE.md`, `RULE-TRACEABILITY.md` and `capture.json`; retain zero ZeroDeck runtime observations/rules.
- [x] Record all unavailable paths and reasons, and complete the renewed closeout audit.

**Current status:** Phase 7 is complete for its bounded reference-runtime scope. The ZeroDeck-specific Software Rules capture remains incomplete because required product properties and owner decisions remain open. First-party ZeroDeck runtime capture and live provider calls are not Phase 7 prerequisites.