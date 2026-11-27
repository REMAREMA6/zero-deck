# Phase 7 Renewed Pass — Closeout Audit

**Date:** 2026-11-27  
**Status:** Bounded renewed reference-runtime investigation complete  
**Scope:** Owner-authorized non-UI build/test execution for the three exact-pinned Phase 3 prior-art targets, plus explicit evidence/skip dispositions.  
**Does not mean:** ZeroDeck is complete, deployed, or replication-sufficient.

## 1. Authorization and governance

The owner explicitly authorized ordinary inspection, build and test work against:
- Hypatia `c0f98977be935e58849726313635a2459cac3892`
- HypatiaDatabases `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- ClamAV `cad7b18a3e6505195fe08db1412449a18fc9f012`

The owner deliberately made the RE-agent ownership rule absolute as a consult-first safeguard because agents may misread intent and take liberties. The owner must decide whether a scoped exception is authorized; agents must not infer one. This rationale, the exact override and its limits are recorded in `OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md`. The default remains unchanged for all unlisted targets and actions.

## 2. Exit criteria review

| Exit criterion | Result | Evidence |
|---|---|---|
| Exact target revisions pinned and authorized | Satisfied | Owner authorization record; Phase 3 register |
| GitHub Actions runner mechanism proven | Satisfied | Three Playwright runner smoke runs and artifacts |
| Hypatia target build/test path executed | Satisfied with limits | Run #46034540816 (repeat of #46029241394); APK/lint artifact inspected; no test sources exist |
| HypatiaDatabases generator path executed without external feed/publication side effects | Satisfied | Run #46034540816; valid, malformed-input and exclusion fixtures passed; job log and primary Bloom outputs inspected |
| ClamAV target build and test path executed | Satisfied | Run #46029241394; CTest 15/15 targets and Python test artifact inspected |
| Logs/artifacts inspected, not just green statuses | Satisfied | `PHASE-7-RENEWED-ACTIONS-RESULTS.md` |
| All 15 facets mapped with evidence limits | Satisfied | Updated `PHASE-7-RUNTIME-OBSERVATION-MAP.md` |
| All seven ZeroDeck MVP scenarios retain explicit evidence/skip dispositions | Satisfied | Scenario table in runtime observation map |
| Reference evidence not promoted to ZeroDeck runtime rules | Satisfied | Evidence register, traceability and unchanged capture |
| Unavailable paths and reasons recorded | Satisfied | Sections 3–5 below and results report |

## 3. Target execution conclusions

### Hypatia
- Gradle lint/build/debug APK packaging succeeded.
- Unit test task was `NO-SOURCE`; no unit tests ran. A full 354-entry pinned source-tree audit found no test source directories or test-named Kotlin/Java test files.
- Lint report contains one Error-severity issue and additional warnings. The project allows lint errors without failing the Gradle task.
- No emulator launch, real file scan, database update or quarantine action was performed. The pinned app's unit-test source set is empty; app-level runtime behaviour is not inferred from a successful APK build.
- Direct HTTP checksum diagnostic differed from the pinned verification metadata, but Gradle's actual build succeeded. This discrepancy remains unresolved and was not bypassed.

### HypatiaDatabases
- Maven package succeeded; no Maven test sources were present.
- The actual generator ran against deterministic harmless fixtures and accepted three hashes and one domain, with zero invalid lines.
- Follow-up deterministic fixtures confirmed two malformed hashes are rejected (0 valid / 2 invalid) and an excluded valid MD5 is skipped before counting (0 valid / 0 invalid). Both branches passed output assertions in run #46034540816.
- A full 36-entry pinned source-tree audit found no `src/test` directory or test source files. The additional cases are investigation-owned fixture tests, not upstream unit tests.
- Four Bloom-filter files were generated and checked non-empty for the valid fixture.
- Live-feed ingestion, signed-pack generation, signing, branch publication and deployment were deliberately not run because they introduce external inputs or publication side effects outside this bounded test.

### ClamAV
- CMake configure/build succeeded.
- CTest passed 15/15 test targets, 0 failed (781.68 seconds).
- Retained `LastTest.log` reports 416 passed and 2 skipped across 11 pytest invocations, including Valgrind variants. The 416 includes reruns and is not a count of unique test cases.
- This includes reference-project scan/update/signature and quarantine-related test cases. No malware sample was executed by this investigation.
- A duplicate follow-up run was still in progress at the time of audit; it is not needed to support the result because run #46029241394 completed and its logs/artifacts were inspected.

## 4. Explicit skips

- **Hypatia device/emulator and actual scan/quarantine runtime:** no app-specific test source exists in the pinned unit-test source set. A successful APK build alone does not establish scanner behaviour. No test database/signing fixture or app-level emulator scenario was prepared in this bounded pass.
- **HypatiaDatabases live feed pipeline:** avoided external feed downloads and upstream branch publication; deterministic generator path was tested instead.
- **Google Web Risk live API:** no configured credentials/project or separate authorization for URL disclosure/provider costs. Contract documentation remains the evidence.
- **Android storage/SAF/Keystore:** documentation, not executable reference software.
- **Mockup fork UI runtime:** excluded by owner clarification; source-level UI capture is already sufficient.
- **Actual ZeroDeck runtime:** no first-party deployed native app exists to test.
- **Local sandbox execution:** not used for third-party runtime tests because the available container lacked the required toolchains and a verified isolated lab. GitHub-hosted Actions was used for the authorized ordinary builds/tests.

## 5. Facet and scenario boundary

All 15 Software Rules facets have explicit evidence/unknown/conditional dispositions in the runtime map. All seven MVP scenarios have explicit evidence-or-skip dispositions. The new reference-project test evidence may inform future questions about scanner callbacks, signature verification, generator data handling, error paths and quarantine race conditions. It does not establish ZeroDeck policy, implementation or behaviour.

No ZeroDeck runtime observations were added. `capture.json` remains unchanged; its ZeroDeck runtime-observation count remains zero. No prior-art rule was promoted to an owner-declared ZeroDeck rule. The seven ZeroDeck scenarios remain unexecuted against ZeroDeck itself.

## 6. Final assessment

**The bounded renewed Phase 7 reference-runtime investigation is complete.** The three selected executable prior-art targets were exercised through reproducible GitHub Actions builds/tests at their exact pinned revisions, and all remaining paths have explicit skip reasons.

**ZeroDeck remains incomplete and NOT replication-sufficient.** This closeout only completes the bounded reference investigation. Actual product runtime conformance, all unresolved required properties, and implementation-time native UI capture remain future work.
