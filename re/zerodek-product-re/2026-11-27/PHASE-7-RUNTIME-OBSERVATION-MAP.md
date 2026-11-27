# Phase 7 — Runtime Observation Map

**Date:** 2026-11-27  
**Status:** Additional upstream CI evidence inspected and mapped  
**Scope:** Non-UI behaviour of selected Phase 3 prior-art references only. These observations do not describe ZeroDeck runtime behaviour and are not automatically ZeroDeck requirements.

## Evidence records

### RT-HYP-001 — Hypatia exact-revision CI completion

- Repository: https://github.com/MaintainTeam/Hypatia
- Revision: `c0f98977be935e58849726313635a2459cac3892`
- Run: https://github.com/MaintainTeam/Hypatia/actions/runs/26000483662
- Run ID: `26000483662`; job `build`; completed successfully on 2026-05-17.
- The run head SHA exactly matches the Phase 3 pinned revision.
- The pinned workflow source defines `assembleDebug`, `lintDebug`, and `testDebugUnitTest` tasks.
- The job-log endpoint returned HTTP 410 and no workflow artifacts were available. Therefore individual test names, counts, assertions and runtime outputs could not be recovered from this run.
- **Observed:** successful upstream CI job completion at the exact revision.
- **Not observed:** interactive Android launch, real file scans, scanner result branches, quarantine, or device performance.
- **Disposition:** retain as build/test-pipeline evidence only. Do not derive detailed scanner behaviour from the green job status.

### RT-HDB-001 — HypatiaDatabases generator processed live feed inputs

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Revision: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- Run: https://github.com/MaintainTeam/HypatiaDatabases/actions/runs/37898012266
- Run ID: `37898012266`; job `generate`; completed successfully on 2026-10-09.
- The job log records execution of Maven's `clean compile exec:java` with `org.maintainteam.hypatiadatabases.App`, passing the raw-input directory and a Divest domain list.
- The generator log reports:
  - Lines read: **1,757,956 valid; 1 invalid**.
  - Read counts: MD5 **552,201**; SHA-1 **7,884**; SHA-256 **1,197,871**; domains **1,961,942**.
  - Added counts: MD5 **550,263**; SHA-1 **7,420**; SHA-256 **1,181,474**; domains **1,961,852**.
  - Approximate counts: MD5 **550,289**; SHA-1 **7,420**; SHA-256 **1,181,327**; domains **1,961,840**.
- **Observed:** the generator processed the workflow's downloaded inputs, reported one invalid line, and produced distinct digest/domain output sets.
- **Limit:** counts are the generator's own reported values. They do not independently validate source-feed correctness, uniqueness across feeds, threat accuracy, or real-world false-positive/false-negative rates.

### RT-HDB-002 — HypatiaDatabases generated artifacts and published unsigned branch

Same repository, revision and run as RT-HDB-001.

- The job log shows generated Bloom-filter files for domains, MD5, SHA-1 and SHA-256, plus a generation report.
- The deploy step copied the four binary Bloom-filter files, generation report, CI run reference and template into a deployment directory.
- The GitHub Pages action created an orphan commit and force-updated the `unsigned` branch; the push completed successfully.
- The workflow configuration used `force_orphan: true`, `publish_branch: unsigned`, and `keep_files: false`.
- **Observed:** successful generation and publication of unsigned generated artifacts by this workflow.
- **Not established:** signing or verification of these generated artifacts in this run, key custody, rollback protection, retention guarantees, or ZeroDeck deployment behaviour. The separate self-hosted signing workflow is outside this run.

### RT-HDB-003 — Current HypatiaDatabases feed failure

- Run: https://github.com/MaintainTeam/HypatiaDatabases/actions/runs/45974623484
- Date: 2026-11-27; exact pinned revision.
- The feed-preparation workflow failed when the ThreatFox endpoint returned HTTP 410 Gone. Earlier feed preparation steps completed; generation and publication were not reached.
- **Observed:** a feed integration can prevent the scheduled generation workflow from reaching the generator when an upstream endpoint is unavailable.
- **Limit:** this is a failure of that external feed request in that run, not evidence that the generator itself failed.

### RT-CLAM-001 — ClamAV cross-platform CI and Ubuntu CTest

- Repository: https://github.com/Cisco-Talos/clamav
- Revision: `cad7b18a3e6505195fe08db1412449a18fc9f012`
- Run: https://github.com/Cisco-Talos/clamav/actions/runs/45055471772
- Run ID: `45055471772`; jobs `build-macos`, `build-ubuntu`, and `build-windows` all completed successfully on 2026-11-22.
- Ubuntu CMake configuration and build completed. CTest reported **100% tests passed, 0 failed, 17 total**, with total test time **926.22 seconds**.
- Visible CTest groups include `clamd`, `clamd_valgrind`, `freshclam`, `freshclam_valgrind`, `sigtool`, `sigtool_valgrind`, `examples`, and `examples_valgrind`; the available log excerpt does not expose all first nine test names.
- **Observed:** the pinned source built and its upstream Ubuntu test suite passed in the maintainer CI environment.
- **Limit:** this does not measure ZeroDeck performance or establish Android integration, quarantine, or product-specific scan policy.

### RT-CLAM-002 — ClamAV signature, update and scan-callback example cases

Same repository, revision and run as RT-CLAM-001. The Ubuntu CI log names nine example tests; all nine passed:

1. CVD unpack without verification.
2. CVD unpack with verification failure.
3. CVD unpack with verification success.
4. Scan callback ClamAV verification.
5. Scan callback ZIP abort.
6. Scan callback ZIP add-alert.
7. Basic scan callback.
8. Basic scan callback with one match.
9. Scan callback ignore-alert.

The `sigtool` test group also reports successful cases for version output, running cdiff, Rust log messages, signing and verification, diff, and build.

- **Observed:** these named test cases passed in the pinned upstream CI run.
- **Bounded interpretation:** the tests exercise CVD verification success/failure, signature tooling, update-diff handling and scan callback branches. Passing tests establish the tested cases in that CI environment, not every engine path or an external security guarantee.
- No live malware sample was run by this investigation.

## Facet disposition from the newly inspected runtime evidence

| Software Rules facet | Runtime evidence available | Disposition |
|---|---|---|
| Interface | None | No runtime UI evidence; excluded from this phase. |
| Behaviour | ClamAV CVD verification and scan-callback test branches; HypatiaDatabases generation and feed-failure pipeline | Partial reference-runtime evidence only. |
| Business rules | Generator's accepted/invalid counts and ClamAV tested branches | Partial reference implementation evidence; no ZeroDeck policy established. |
| Data | Generator's reported input/read/added/approximate counts and generated Bloom-filter artifact classes | Partial reference-runtime evidence; feed correctness not independently validated. |
| Persistence | HypatiaDatabases generated artifacts and successful unsigned-branch publication | Partial reference pipeline evidence; no ZeroDeck persistence contract. |
| API | No ZeroDeck or Web Risk runtime call | Unobserved. |
| Messaging | No message broker or event-delivery test observed | Unobserved / not demonstrated by these targets. |
| Identity and authentication | CI token used to publish the unsigned branch; no end-user identity/session test | CI automation credential use observed; product identity/authentication unobserved. |
| Authorization and permissions | No product authorization tests | Unobserved. |
| Security controls | ClamAV CVD verification success/failure and sigtool sign/verify tests; Hypatia's job-level CI success only | Partial reference-runtime evidence; no ZeroDeck control enforcement established. |
| Background processing | Upstream scheduled/manual generation workflow completed; no ZeroDeck job model | Partial reference pipeline evidence. |
| Errors and recovery | CVD verification failure case, ZIP abort callback case, and ThreatFox HTTP 410 pipeline stop | Partial reference-runtime failure-path evidence; recovery/retry behaviour not established. |
| Integrations | HypatiaDatabases consumed multiple live feeds and ClamAV-backed inputs in CI | Partial reference integration evidence; no ZeroDeck integration selected/deployed. |
| Configuration | CI invoked the generator with a raw directory and domain-list argument; other configuration behaviour not runtime-tested | Limited evidence only. |
| Performance and resource behaviour | CI test durations and artifact sizes are environment-specific; no controlled benchmark or resource profile | No transferable performance rule established. |

## Execution paths checked and skipped

- Rechecked the current container: Java, Git, Node/npm, Python, CMake, Ninja, GCC, Clang and Make are present; Android SDK/ADB, Gradle, Maven, ClamAV binaries, Docker and Podman are not found on PATH.
- DNS resolution for `github.com` did not return an address in the current container check.
- The process runs as root. The visible mount table and namespace identifiers do not prove the uploaded dynamic-lab requirements (no host shares, no bridged network, snapshot/rollback and teardown). No named, verified lab is available.
- Therefore no third-party project code, APK, suspicious sample or test fixture was executed in this container. This is a deliberate skip under the uploaded `re-dynamic-lab` gate, not a claim that the projects cannot be run elsewhere.
- Hypatia's historical job logs are unavailable (HTTP 410); no artifacts were attached to the checked run. Skip deeper claims from that run.
- HypatiaDatabases' old successful run had no retained workflow artifact; use the job log only. The current feed failure was recorded separately.
- Google Web Risk live calls remain skipped: no configured credentials/project or separate authorization to send URLs or incur provider costs.
- Android storage/SAF/Keystore remain documented platform constraints, not executable targets.

## Phase 7 assessment after this pass

Additional runtime observations have been extracted and mapped to the 15 facets where the logs support them. This improves the reference evidence but does not close the required ZeroDeck property inventory. The evidence remains upstream CI evidence from pinned reference projects, not local execution and not ZeroDeck runtime conformance.

The remaining unobserved items are not being retried in this pass because their blockers are explicit: unavailable local toolchains, no verified isolated lab, expired Hypatia logs, missing provider credentials/approval, or non-executable documentation. Continue only if new accessible evidence or a suitable authorized environment becomes available.

**Phase 7 bounded investigation is complete. The ZeroDeck Software Rules capture remains incomplete and not replication-sufficient.**


## MVP scenario-by-scenario runtime disposition

The scenario definitions below are from `software-rules/SCENARIOS.md`. This table closes the Phase 7 evidence disposition for each defined scenario: it identifies what the reference CI evidence contributes and what remains untested. A reference test is not treated as a ZeroDeck scenario execution.

| Scenario | Relevant available reference evidence | Runtime disposition for the ZeroDeck scenario |
|---|---|---|
| MVP-FILE-001 — select supported file and request manual scan | Hypatia exact-revision CI job succeeded (RT-HYP-001); ClamAV CI built and tested engine components (RT-CLAM-001). | **Not executed against ZeroDeck.** Hypatia job logs expired; no Android device/emulator or verified lab. CI build success does not prove file selection, permission grants, scan start/progress or terminal state. |
| MVP-FILE-002 — separate file result branches | ClamAV scan-callback examples passed for basic scan, one match, alert, ignore-alert and ZIP abort (RT-CLAM-002). Hypatia CI job succeeded but detailed tests are unavailable. | **Reference branches partially exercised; ZeroDeck branches not executed.** Confirmed/suspicious/no-known-threat/inconclusive/unsupported/inaccessible/interruption/engine-failure outcomes remain unobserved for ZeroDeck. No malware samples were run. |
| MVP-QUAR-001 — quarantine confirmed threat | Android storage/SAF documentation only; no selected executable reference supplies a verified ZeroDeck quarantine path. | **Not executed; no runtime reference behaviour to transfer.** Eligibility, move/copy, integrity and partial-failure behaviour remain unknown. |
| MVP-QUAR-002 — suspicious or inconclusive review | Android platform contracts and product-material rules only. | **Not executed.** Review/rescan choices, destructive-action prevention and state transitions remain unobserved. |
| MVP-QUAR-003 — restore or permanently delete | Android storage/SAF/Keystore documentation only. | **Not executed.** Restore and delete are separate untested paths; no runtime evidence establishes fresh-scan enforcement, integrity, deletion guarantees or recovery. |
| MVP-LINK-001 — submit URL for checking | Google Web Risk Lookup contract only; no live provider request. | **Not executed.** No credentials/project or separate authorization to disclose submitted URLs or incur provider costs. Input parsing, Pro gate, owner switch, request and disclosure enforcement remain unobserved. |
| MVP-LINK-002 — separate link result branches | Web Risk response and caching documentation only. | **Not executed.** Dangerous/no-match/inconclusive/invalid/redirect/timeout/provider-unavailable branches and cache expiry remain unobserved at runtime. |

### Scenario-branch completeness disposition

- MVP-FILE-002's seven defined branches are each explicitly unobserved against ZeroDeck; ClamAV's example tests provide only bounded reference evidence for some scan-callback branches.
- MVP-LINK-002's seven defined branches are each unobserved at runtime; live provider testing is skipped.
- MVP-QUAR-003 restore and permanent deletion are separately unobserved.
- Actor/principal, target/build/environment, initial state, exact inputs, ordered actions, expected-outcome oracle and settling/stop criteria remain unknown where no actual ZeroDeck target exists. They are not fabricated to make a test appear executable.

**Scenario disposition conclusion:** all seven ZeroDeck MVP scenarios now have an explicit evidence-or-skip disposition. None has been executed against a deployed ZeroDeck target. The prior-art CI evidence improves reference understanding only; it does not close the product's runtime property gaps.

## Renewed Phase 7 — owner-authorized GitHub Actions executions

These additional executions were initiated by this investigation using the explicit owner authorization recorded in `OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md`. They use the exact Phase 3 pinned revisions and GitHub-hosted Ubuntu 24.04 runners. They are reference-project runtime/build/test evidence only; they do not constitute ZeroDeck runtime observations.

### RT-HYP-002 — Hypatia pinned Android build and lint

- Repository: https://github.com/MaintainTeam/Hypatia
- Revision: `c0f98977be935e58849726313635a2459cac3892`
- Investigation run: https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816 (follow-up repeat; initial successful run #46029241394)
- Command: `./gradlew --no-daemon --stacktrace lint testDebugUnitTest assembleDebug`; Temurin JDK 17, Gradle 8.13, Android SDK platform 36/build tools 36.0.0.
- **Observed:** Gradle reported `BUILD SUCCESSFUL`; 46 actionable tasks executed. A debug APK was produced (version 3.18, version code 318, min SDK 21).
- **Important test limit:** `testDebugUnitTest` was explicitly `NO-SOURCE`; no unit tests were run. No emulator launch, file scan or quarantine action was performed.
- The lint report was retained and inspected. It contains one Error-severity `MissingSuperCall` finding at `NotificationPromptActivity.kt:158`, plus warnings including inconsistent localized array lengths, implicit default-locale conversions, target SDK 34 and older Gradle/Android plugin recommendations. The Gradle task exited successfully because the project sets `abortOnError false`; the lint finding remains.
- The run also recorded a direct HTTP download of the Kotlin Android plugin marker POM with SHA-256 `9d841037c59644dc5bbe814e792ed8774eb48646f0b3a779604ee5c1b307f969`, differing from the value `61ffa87244c72230adcfc32279d4a1cc41712c2bc5eb50971b630ed880de485f` in the pinned verification metadata. The actual Gradle build nevertheless completed successfully. The direct-fetch mismatch is unresolved; it is not proof of compromise or of a Gradle verification bypass. No checksum was changed and verification was not disabled.
- Artifact `phase7-hypatia-build-evidence` (ID `15213297838`) was downloaded and inspected; it contains APK, metadata and lint reports, but no unit-test result files.
- **Disposition:** successful build/package and lint-task execution, with a reported lint error and no unit-test sources. No scanner runtime behaviour inferred.

### RT-HDB-004 — HypatiaDatabases fixture-driven generator execution

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Revision: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- Investigation run: https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394
- Maven command: `mvn --batch-mode --no-transfer-progress clean test package`; package succeeded. Maven reported no test sources, so no Maven unit-test suite ran.
- The actual generator `org.maintainteam.hypatiadatabases.App` was invoked using deterministic harmless fixtures containing one MD5, one SHA-1, one SHA-256 and one domain.
- **Observed generator output:** 3 valid lines, 0 invalid; read and added counts MD5 1, SHA-1 1, SHA-256 1, domains 1. Four non-empty Bloom-filter files (domain, MD5, SHA-1, SHA-256) were verified.
- An earlier fixture attempt had incorrectly emitted literal backslash-n characters and was correctly rejected as three invalid hash lines. The fixture was fixed; the successful result above is from the corrected execution.
- No external feed downloads, signing, publishing or branch pushes occurred.
- **Disposition:** bounded generator parsing/counting/output creation is runtime-observed for this pinned reference project. Feed correctness, threat accuracy, false-positive/negative rates, signature trust and production publication are not established.

### RT-HDB-005 — HypatiaDatabases malformed-input and exclusion branches

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Revision: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- Investigation run: https://github.com/REMAREMA6/zero-deck/actions/runs/46034540816
- The Maven build/package succeeded; Maven reported no test sources. A full 36-entry source-tree audit found no `src/test` directory or test source files.
- The investigation harness ran two additional deterministic harmless fixture branches through the actual `org.maintainteam.hypatiadatabases.App` generator:
  - **Malformed hashes:** `not-a-hash` and `abcd` were both rejected; output was 0 valid / 2 invalid, with zero hashes read or added.
  - **Excluded hash:** a valid MD5 also present in the exclusions directory was skipped; output was 0 valid / 0 invalid, with zero hashes read or added.
- Both branches passed their output assertions. Their detailed logs are retained in the Actions job log for run #46034540816; the uploaded artifact retains the primary valid-fixture output only.
- **Disposition:** bounded runtime evidence for malformed-hash rejection and exclusion filtering in this pinned reference generator. This is not a ZeroDeck policy or requirement and does not establish real-feed accuracy.

### RT-CLAM-003 — ClamAV pinned CMake build and test suite

- Repository: https://github.com/Cisco-Talos/clamav
- Revision: `cad7b18a3e6505195fe08db1412449a18fc9f012`
- Investigation run: https://github.com/REMAREMA6/zero-deck/actions/runs/46029241394
- GitHub-hosted Ubuntu 24.04 runner; CMake/Ninja/GCC, Rust/Cargo and required development dependencies.
- **Observed:** CMake configure and build succeeded. CTest reported **15/15 test targets passed, 0 failed**, total test time 781.68 seconds. The suite includes Valgrind variants for core library, scan, daemon, updater and signature-tool paths.
- Retained CTest `LastTest.log` reports **416 passed and 2 skipped** across 11 pytest invocations (including Valgrind reruns); these are not 416 unique cases. Standard groups include clamscan 170 passed/1 skipped, clamd 15 passed, freshclam 10 passed/1 skipped, and sigtool 6 passed.
- Named test coverage includes scan callback branches, CVD verification success/failure, signature signing/verification and diff operations, update failure cases, archive limits, and quarantine copy/move/remove TOCTOU cases.
- Artifact `phase7-clamav-build-test-evidence` (ID `15214502404`, SHA-256 `861109e76bc61ddb4ff3f4e6baaadc3ad6d8158f985661e2a36f41f33b92c944`) was downloaded and inspected; its `LastTest.log` contains the detailed output.
- **Limits:** these are ClamAV's own tests, not ZeroDeck tests. No malware sample was executed by this investigation; no controlled performance benchmark was run.
- **Disposition:** broad pinned reference build/test evidence for ClamAV scanner, updater, signature-tool and quarantine-related test paths. Do not transfer these results into ZeroDeck requirements without explicit traceability.

### Renewed evidence effect on the 15 facets

| Facet | Additional reference evidence | Boundary |
|---|---|---|
| Behaviour | Hypatia build only; HypatiaDatabases generator; ClamAV scanner/update/signature tests | No ZeroDeck runtime behaviour. |
| Business rules | HypatiaDatabases accepts hash/domain fixture inputs; ClamAV tests exercise explicit test branches | Reference implementation only; no ZeroDeck verdict or quarantine policy. |
| Data | Four Bloom-filter outputs from deterministic fixture | Does not validate real feed accuracy or ZeroDeck data model. |
| Persistence | HypatiaDatabases writes generated Bloom-filter files | Local generator output only; no ZeroDeck persistence contract. |
| Security controls | ClamAV CVD verification and signing tests; Hypatia dependency-verification attempt and lint report | No ZeroDeck enforcement, trust-root or key policy established. |
| Background processing | No new ZeroDeck evidence; CI build/test jobs only | Not evidence of ZeroDeck background job semantics. |
| Errors and recovery | ClamAV updater/parser/quarantine test cases | Reference test branches only; no ZeroDeck recovery semantics. |
| Integrations | No new live provider integration; fixture-only generator path | No ZeroDeck API/provider integration. |
| Configuration | Generator input paths and domain list; build SDK/toolchain settings | Reference CLI/CI configuration only. |
| Performance and resource behaviour | CTest duration and test counts | Not a controlled or transferable benchmark. |
| Interface, API, Messaging, Identity/authentication, Authorization/permissions | No new relevant runtime evidence | Remain unobserved for ZeroDeck. |

### Updated execution disposition

The earlier statement that no third-party project code or fixture was executed applies to the original local-container pass only. In this renewed pass, ordinary project builds/tests and harmless deterministic fixtures were executed on GitHub-hosted runners under explicit owner authorization. No such code or fixture was run in the local ChatGPT container. No malware samples, live attacks, provider calls, external threat-feed ingestion or upstream publication were performed.

The renewed executions improve reference-runtime evidence but do not alter the original scenario conclusion: none of the seven MVP scenarios has been executed against a deployed ZeroDeck target. The machine capture's ZeroDeck runtime-observation count remains zero.
