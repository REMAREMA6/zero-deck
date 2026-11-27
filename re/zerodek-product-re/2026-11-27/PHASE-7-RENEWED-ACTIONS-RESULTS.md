# Phase 7 Renewed GitHub Actions — Target Execution Results

**Date:** 2026-11-27  
**Status:** Bounded renewed target execution and follow-up fixture checks complete  
**Scope:** Exact-pinned reference-project build and test evidence only. These results do not constitute ZeroDeck runtime conformance.

## 1. Owner authorization

The owner explicitly authorized ordinary inspection, build and test work for the three pinned prior-art repositories. The rationale for the absolute consult-first rule and the exact scope/limits of the owner's override are recorded in [OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md](OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md). This scoped exception does not weaken the default for other targets or actions.

## 2. Run summary

| Target | Exact source revision | GitHub Actions run | Result |
|---|---|---|---|
| Hypatia | `c0f98977be935e58849726313635a2459cac3892` | [#46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) | Gradle lint/build and debug APK packaging succeeded; unit-test task was `NO-SOURCE`. Pinned source tree contains no test sources. |
| HypatiaDatabases | `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` | [#46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) | Maven package and three deterministic fixture branches succeeded: valid hashes/domain, malformed hash rejection, and excluded-hash filtering. |
| ClamAV | `cad7b18a3e6505195fe08db1412449a18fc9f012` | [#46029241394](https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394) | CMake configure/build succeeded; CTest 15/15 targets passed, 0 failed. Retained `LastTest.log` reports 416 Python tests passed and 2 skipped, including Valgrind reruns. |

The follow-up run [#46034540816](https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816) completed the Hypatia and HypatiaDatabases jobs successfully. Its ClamAV job is a duplicate verification run; the completed ClamAV evidence used here is run #46029241394.

## 3. Hypatia — Android build evidence

- Repository: https://github.com/MaintainTeam/Hypatia
- Pinned source SHA: `c0f98977be935e58849726313635a2459cac3892`
- Runner: GitHub-hosted Ubuntu 24.04; Temurin JDK 17; Android SDK platform 36 / build tools 36.0.0; Gradle wrapper 8.13.
- Command: `./gradlew --no-daemon --stacktrace lint testDebugUnitTest assembleDebug`
- Result: `BUILD SUCCESSFUL`, 46 actionable tasks executed.
- Debug APK produced: `app-debug.apk`; metadata reports application ID `org.maintainteam.hypatia.debug.HEAD`, version name `3.18`, version code `318`, min SDK 21.
- `testDebugUnitTest` reported `NO-SOURCE`; do not describe this as unit tests passing. A recursive audit of all 354 entries at the pinned revision found no test source directories or test-named `.kt`/`.java` files; both `app/src/test` and `app/src/androidTest` are absent. No upstream Hypatia test suite exists at this revision.
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
- Follow-up malformed-input fixture: `not-a-hash` and `abcd` were both rejected; generator reported 0 valid / 2 invalid and zero hashes read/added.
- Follow-up exclusion fixture: a valid MD5 also present in the exclusions directory was skipped; generator reported 0 valid / 0 invalid and zero hashes read/added.
- A recursive audit of all 36 entries at the pinned revision found no `src/test` tree or test source files. These additional cases are investigation-owned deterministic fixtures, not upstream unit tests.
- No live feeds were downloaded; no branch was pushed; no signing or deployment occurred. The extra fixture logs are retained in the Actions job log; the artifact retains the primary valid-fixture outputs.
- Artifact `phase7-hypatiadatabases-maven-evidence` (ID `15216505853`, SHA-256 `f903678afc226cb39e92383c65c4ddc917c932cd642595eb37df6c8c2b0d988e`) includes the Maven package and primary valid-fixture outputs. The malformed-input and exclusion branch logs are retained in the same run's job log, not in the artifact.

## 5. ClamAV — build and test evidence

- Repository: https://github.com/Cisco-Talos/clamav
- Pinned source SHA: `cad7b18a3e6505195fe08db1412449a18fc9f012`
- Runner: GitHub-hosted Ubuntu 24.04; CMake/Ninja/GCC, Rust/Cargo and required development packages installed.
- CMake configure and full build succeeded.
- CTest completed **15/15 test targets passed, 0 failed**, total CTest time **781.68 seconds** in run #46029241394. The expanded suite includes Valgrind variants for core library, hash-fetch failure, scan, daemon, updater and signature-tool paths.
- Retained `LastTest.log` reports **416 Python tests passed and 2 skipped** across 11 pytest invocations. This total includes Valgrind reruns and must not be read as 416 unique test cases. Standard groups include clamscan 170 passed/1 skipped, clamd 15 passed, freshclam 10 passed/1 skipped, and sigtool 6 passed.
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

## 8. Remaining paths and dispositions

1. **ClamAV:** the completed run #46029241394 provides final CMake/build and 15/15 CTest evidence; its artifact and detailed `LastTest.log` were downloaded and inspected.
2. **Hypatia tests:** no upstream test sources exist at the pinned revision. The full source-tree audit confirmed this; no tests were invented or added to the third-party repository.
3. **HypatiaDatabases tests:** no upstream test sources exist. Investigation-owned harmless fixtures exercised valid, malformed and excluded-hash paths; all assertions passed. Their job logs are retained, and the artifact contains the primary valid-fixture outputs.
4. **Google Web Risk live API:** skipped because no configured credentials/project or separate authorization for URL disclosure and provider costs were available. Its documented contract remains the evidence.
5. **Android storage/SAF/Keystore:** documentation, not an executable prior-art repository.
6. **Mockup fork UI runtime:** excluded by the corrected owner scope; source-derived UI rules remain separate.
7. **Actual ZeroDeck runtime:** not required to complete this reference-prior-art investigation and not available as a deployed runtime target.

**Assessment:** all three authorized executable reference targets have been exercised at their exact pinned revisions. The remaining paths are either unsupported by the pinned source trees, documentation-only, or separately gated. This completes the bounded Phase 7 reference investigation; it does not turn reference-project evidence into ZeroDeck rules or close the separate unresolved product-property register.
