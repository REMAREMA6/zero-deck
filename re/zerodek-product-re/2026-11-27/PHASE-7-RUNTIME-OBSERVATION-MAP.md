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

**Phase 7 remains in progress. ZeroDeck's Software Rules capture remains incomplete and not replication-sufficient.**


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
