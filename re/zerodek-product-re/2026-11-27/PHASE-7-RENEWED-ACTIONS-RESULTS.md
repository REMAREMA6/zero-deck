# Phase 7 Renewed GitHub Actions — Target Execution Results

**Date:** 2026-11-27  
**Status:** Partial target execution completed; one ClamAV rerun remains in progress  
**Scope:** Exact-pinned reference-project build and test evidence only. These results do not constitute ZeroDeck runtime conformance.

## 1. Owner authorization

The owner explicitly authorized ordinary inspection, build and test work for the three pinned prior-art repositories. The rationale for the absolute consult-first rule and the exact scope/limits of the owner's override are recorded in [OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md](OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md). This scoped exception does not weaken the default for other targets or actions.

## 2. Run summary

| Target | Exact source revision | GitHub Actions run | Result |
|---|---|---|---|
| Hypatia | `c0f98977be935e58849726313635a2459cac3892` | [#46029241394](https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394) | Gradle build, lint task and debug APK packaging completed successfully; unit-test task was `NO-SOURCE`. |
| HypatiaDatabases | `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` | [#46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) | Maven package and three deterministic fixture branches succeeded: valid hashes/domain, malformed hash rejection, and excluded-hash filtering. |
| ClamAV | `cad7b18a3e6505195fe08db1412449a18fc9f012` | [#46028645716](https://github.com/REMAREMA6/zero-deck/actions/runs/46028645716) | CMake configure/build succeeded; CTest 9/9 passed. The retained CTest log reports 201 Python tests passed and 2 skipped across its test groups. |

A further run, [#46029241394](https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394), also completed Hypatia and HypatiaDatabases successfully and rebuilt ClamAV; its ClamAV CTest job was still running at the time of this report. The earlier completed ClamAV run is the source for the 9/9 CTest result.

## 3. Hypatia — Android build evidence

- Repository: https://github.com/MaintainTeam/Hypatia
- Pinned source SHA: `c0f98977be935e58849726313635a2459cac3892`
- Runner: GitHub-hosted Ubuntu 24.04; Temurin JDK 17; Android SDK platform 36 / build tools 36.0.0; Gradle wrapper 8.13.
- Command: `./gradlew --no-daemon --stacktrace lint testDebugUnitTest assembleDebug`
- Result: `BUILD SUCCESSFUL`, 46 actionable tasks executed.
- Debug APK produced: `app-debug.apk`; metadata reports application ID `org.maintainteam.hypatia.debug.HEAD`, version name `3.18`, version code `318`, min SDK 21.
- `testDebugUnitTest` reported `NO-SOURCE`; do not describe this as unit tests passing.
- Lint task completed, but the retained lint report contains one severity-Error finding (`MissingSuperCall` in `NotificationPromptActivity.kt:158`) and warnings including inconsistent translated array lengths, implicit default-locale conversion, target SDK 34 and outdated Gradle/Android plugin recommendations. The successful Gradle exit does not erase those reported findings.
- A diagnostic direct HTTP fetch of the Kotlin Android plugin marker POM produced SHA-256 `9d841037c59644dc5bbe814e792ed8774eb48646f0b3a779604ee5c1b307f969`, while the pinned verification metadata lists `61ffa87244c72230adcfc32279d4a1cc41712c2bc5eb50971b630ed880de485f`. In the same run, Gradle's actual dependency resolution and build succeeded. The direct-fetch discrepancy is unresolved and is not proof of compromise or proof that Gradle accepted a mismatched artifact. Do not alter or disable the target's dependency-verification metadata; investigate the repository/redirect/content path if this becomes material.
- Artifact `phase7-hypatia-build-evidence` from the final repeat (ID `15216296601`, SHA-256 `13b14fbec9f61d33ef567899356dca178ab3ab38f7a2d7010a446024d3cb7714`) contains the debug APK, output metadata and lint reports; no unit-test result files were present. The earlier artifact `15213297838` was also inspected.
- This is build/static-analysis evidence, not emulator/device execution, real file scanning, quarantine testing or performance evidence.

## 4. HypatiaDatabases — deterministic generator execution

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Pinned source SHA: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- Runner: GitHub-hosted Ubuntu 24.04; Temurin JDK 17; Maven.
- Command: `mvn --batch-mode --no-transfer-progress clean test package`; Maven package succeeded. The project reported no test sources/tests, so this is not a passing unit-test suite.
- The actual `org.maintainteam.hypatiadatabases.App` generator was then run against deterministic harmless fixture inputs: one MD5, one SHA-1, one SHA-256 and one domain.
- Generator output: **3 valid lines, 0 invalid**; read and added counts were MD5 1, SHA-1 1, SHA-256 1, domains 1. Approximate counts were also 1 for each category.
- Four non-empty Bloom-filter files were verified: domain, MD5, SHA-1 and SHA-256.
- This validates the bounded fixture path and output generation at the pinned revision. It does not validate real feed accuracy, threat classification quality, false-positive/negative rates, scheduled workflow reliability, signing, key custody or publication.
- No live feeds were downloaded; no branch was pushed; no signing or deployment occurred.
- Artifact `phase7-hypatiadatabases-maven-evidence` (ID `15216505853`, SHA-256 `f903678afc226cb39e92383c65c4ddc917c932cd642595eb37df6c8c2b0d988e`) includes the Maven package and primary valid-fixture outputs. The malformed-input and exclusion branch logs are retained in the same run's job log, not in the artifact.

## 5. ClamAV — build and test evidence

- Repository: https://github.com/Cisco-Talos/clamav
- Pinned source SHA: `cad7b18a3e6505195fe08db1412449a18fc9f012`
- Runner: GitHub-hosted Ubuntu 24.04; CMake/Ninja/GCC, Rust/Cargo and required development packages installed.
- CMake configure and full build succeeded.
- CTest completed **9/9 test targets passed, 0 failed**, total CTest time **64.89 seconds** in run #46028645716.
- Retained `LastTest.log` further reports:
  - `clamscan`: 170 passed, 1 skipped.
  - `clamd`: 15 passed.
  - `freshclam`: 10 passed, 1 skipped.
  - `sigtool`: 6 passed.
  - Aggregate across those Python groups: **201 passed, 2 skipped**.
- The tests include bounded cases for CVD verification, signature tooling, update handling, scan callbacks, archive/resource limits and quarantine copy/move/remove TOCTOU behaviour. These are tests in ClamAV's own suite, not ZeroDeck's implementation.
- Artifact `phase7-clamav-build-test-evidence` (ID `15213342485`) was downloaded and inspected; its `LastTest.log` contains the detailed test output.
- No malware sample was executed by this investigation, no live threat-feed operation was performed, and no product-specific performance benchmark was run.

## 6. Initial failed attempts and corrections

- Run [#46028542224](https://github.com/REMAREMA6/zero-deck/actions/runs/46028542224) exposed Android SDK licence-pipe handling and an unavailable Ubuntu package name. Those runner setup issues were corrected.
- Run [#46028645716](https://github.com/REMAREMA6/zero-deck/actions/runs/46028645716) exposed an escaped-newline error in the first HypatiaDatabases fixture: the generator correctly rejected three malformed hash lines. The fixture format was corrected; the next completed generator execution reported 3 valid / 0 invalid and all expected output files.
- The first Hypatia attempt stopped at Gradle dependency verification. A subsequent run completed the actual Gradle tasks successfully. The separate direct-fetch checksum discrepancy is recorded above without bypassing verification.

## 7. Facet relevance and evidence limits

These are reference-implementation observations only. Potentially relevant evidence includes:
- **Behaviour / errors and recovery:** ClamAV scan callback, signature verification failure/success, update and parser tests.
- **Security controls:** Hypatia's signed-database-related build path and ClamAV signature verification/signing tool tests. Passing test cases do not establish ZeroDeck enforcement.
- **Data / background processing:** HypatiaDatabases parsing, counting and Bloom-filter generation from fixture inputs.
- **Persistence / configuration:** generated local Bloom-filter artifacts and generator command-line inputs.
- **Quarantine-related behaviour:** ClamAV's own quarantine TOCTOU test cases.

Do not transfer these findings into ZeroDeck's product rules without an explicit capability mapping and evidence classification. They do not prove ZeroDeck's manual scan, quarantine, URL checking, Pro gating, owner activation switch, persistence, APIs, identity, authorization or UI behaviour.

## 8. Remaining work

1. Finish and inspect the latest ClamAV rerun; retain its terminal status and artifacts.
2. Inspect Hypatia's lint findings and build artifact as source-derived reference evidence; do not repair the third-party source as part of this investigation.
3. Decide whether additional Hypatia test coverage exists beyond the observed `NO-SOURCE` unit-test task; do not invent tests or alter its code merely to manufacture coverage.
4. Consider bounded additional HypatiaDatabases tests only where they avoid external feeds and publication.
5. Update the Phase 7 runtime map, evidence register, tracker and plan with the verified results.
6. Keep Google Web Risk live calls separately gated. Keep the mockup fork out of runtime scope. Actual ZeroDeck runtime conformance remains unavailable until the first-party app exists.

**Assessment:** This renewed pass has executed the selected pinned prior-art builds and bounded tests using GitHub Actions. It increases reference-runtime evidence but does not make ZeroDeck's Software Rules capture complete or replication-sufficient.
