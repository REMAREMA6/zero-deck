# Phase 7 — Available Runtime Evidence and Execution Disposition

**Date:** 2026-11-27  
**Phase:** 7 — Non-UI runtime investigation of selected prior-art implementations  
**Status:** Partial runtime evidence collected; unavailable execution paths skipped  
**Owner instruction:** Do every runtime investigation that can reasonably be completed. If one target or scenario cannot be run, record the specific limitation, skip it, and continue with the remaining targets. Do not stop the whole phase because one target is blocked. Do not spend excessive time trying to force unavailable execution paths.

## 1. Execution approach adopted

The owner explicitly instructed:

> The ones that can be done, do them. The ones that cannot be done, leave them. If any one is not possible, skip it and continue. Only stop after trying everything that can be done, then provide the report.

Accordingly:
- Use reproducible runtime/build/test evidence already available from the exact pinned upstream CI revisions where this environment cannot run the project locally.
- Inspect CI job steps and logs where available; distinguish actual execution evidence from source inspection.
- Do not treat an upstream CI run as an execution personally initiated in this investigation.
- Do not block all other targets because one target or scenario is unavailable.
- Skip and record local execution paths that cannot be completed in the current environment without disproportionate setup or a suitable execution environment.
- Do not call remote paid/provider APIs or download/execute malware samples. Record those as skipped/unverified.
- Continue to use benign, bounded test evidence; no malware sample was run in this investigation.

## 2. Runtime evidence collected

### SRC-01 — MaintainTeam/Hypatia

**Pinned revision:** `c0f98977be935e58849726313635a2459cac3892`  
**Upstream CI run:** [CI run #26000483662](https://github.com/MaintainTeam/Hypatia/actions/runs/26000483662)  
**Run date:** 2026-05-17  
**Verified run head SHA:** exact match to the pinned revision  
**Conclusion:** success

The GitHub Actions run metadata confirms that the successful run tested the exact pinned commit. The workflow/job metadata identifies the job as `build` and the workflow as `CI`. The source workflow defines the Android debug build, lint and JVM unit-test tasks.

**Evidence classification:** upstream CI runtime/build evidence for the pinned implementation. This is not a local execution by this investigation.

**Not established by the accessible run record:** interactive launch on an emulator/device, real file scanning against controlled files, scanner result branches, storage/quarantine operations, or measured runtime performance. The job log endpoint for this historical run returned HTTP 410, so individual test counts/results could not be independently extracted from the retained log.

**Disposition:** use the successful exact-revision CI result as bounded build/test evidence; skip local Android emulator/device execution in this environment.

### SRC-02 — MaintainTeam/HypatiaDatabases

**Pinned revision:** `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`  
**Successful upstream CI run:** [Generate Stable Database run #37898012266](https://github.com/MaintainTeam/HypatiaDatabases/actions/runs/37898012266)  
**Run date:** 2026-10-09  
**Verified run head SHA:** exact match to the pinned revision  
**Conclusion:** success

The successful job record confirms completion of all listed pipeline steps:
- Dependency setup and ClamAV daemon startup
- Preparation of ClamAV, ESET, Signature Base, ThreatView, ThreatFox, MalwareBazaar, Stalkerware, Sanesecurity, Avast, targeted-threat and domain sources
- Java signature database generation
- Output selection
- Deployment to the unsigned branch

The job log confirms Maven was installed and the Java generator was invoked with `org.maintainteam.hypatiadatabases.App`.

**Evidence classification:** upstream CI runtime evidence for a successful end-to-end generation workflow at the pinned revision. This does not establish current feed availability, correctness/completeness of every feed, signing by the separate self-hosted workflow, or ZeroDeck production behaviour.

**Current failure also checked:** [run #45974623484](https://github.com/MaintainTeam/HypatiaDatabases/actions/runs/45974623484), dated 2026-11-27, failed at the ThreatFox feed preparation step because the download endpoint returned HTTP 410 Gone. Earlier feed-preparation steps succeeded; generation and publication steps were skipped. This is evidence of a current external feed failure in that workflow run, not proof that the Java generator is broken.

**Disposition:** successful generator runtime path is evidenced by the October exact-revision run. Skip attempting the full current feed workflow locally; it downloads multiple third-party feeds and publishes generated artifacts, and the current environment lacks Maven/ClamAV and an isolated lab. Record the ThreatFox 410 as a live pipeline dependency failure.

### SRC-06 — Cisco-Talos/ClamAV

**Pinned revision:** `cad7b18a3e6505195fe08db1412449a18fc9f012`  
**Upstream CI run:** [CMake Build run #45055471772](https://github.com/Cisco-Talos/clamav/actions/runs/45055471772)  
**Run date:** 2026-11-22  
**Verified run head SHA:** exact match to the pinned revision  
**Conclusion:** success

The upstream CI run completed successful build/test jobs on macOS, Ubuntu and Windows. The Ubuntu job log confirms:
- CMake configuration and build succeeded.
- CTest completed with 17/17 tests passed.
- The example test group ran 9 tests, all passed.

The nine example tests covered CVD unpack verification success/failure and scan-callback handling of ClamAV verification, ZIP abort, add-alert, basic scan, one-match and ignore-alert cases.

**Evidence classification:** upstream CI runtime/build/test evidence for the pinned implementation. This is not a local execution by this investigation.

**Not established:** ZeroDeck-specific file-scan scenarios, quarantine behaviour, Android integration, or performance/resource behaviour under ZeroDeck workloads.

**Disposition:** use the successful exact-revision build/test evidence. Skip rebuilding/running the full ClamAV suite locally in the current environment; its dependencies are incomplete and its broader test fixtures have not been vetted for this environment.

## 3. Paths skipped or not executable

| Target/path | Disposition | Reason |
|---|---|---|
| Local Hypatia Android build/device run | Skipped | Android SDK/ADB/emulator and Gradle distribution are not available in the current environment; exact-pinned upstream CI build/test succeeded. |
| Local HypatiaDatabases full pipeline | Skipped | Maven and ClamAV are absent; workflow downloads many external feeds and publishes an unsigned branch; current ThreatFox endpoint returned HTTP 410 in the latest checked run. |
| Local ClamAV full build/test | Skipped | Required dependencies are incomplete and a suitable isolated lab is not verified; exact-pinned upstream CI build/test succeeded. |
| Google Web Risk live API call (SRC-04) | Skipped | Requires a configured project/credentials and sends submitted URLs to an external provider; no provider call, account, secret or cost was authorized for this investigation. Documented API contract remains separate evidence. |
| Android platform docs (SRC-07) | Not applicable | Documentation, not an executable implementation. Continue using as documented platform constraints. |
| Malware/suspicious sample execution | Skipped | No malware samples were executed. |

## 4. What this evidence supports

The collected runs demonstrate that:
- The pinned Hypatia revision passed its upstream CI workflow.
- The pinned HypatiaDatabases revision successfully completed its upstream generation pipeline in October 2026.
- The pinned ClamAV revision built and passed its upstream CI tests, including 17/17 Ubuntu CTest tests.
- The current HypatiaDatabases feed workflow has a reproducible external dependency failure at ThreatFox (HTTP 410) in the checked November 27 run.

These are runtime observations about the selected reference implementations and their CI pipelines. They are not direct observations of the ZeroDeck product and do not automatically become ZeroDeck requirements.

## 5. Remaining Phase 7 work

Runtime evidence is partial, not complete. The upstream CI runs exercise project-maintained build/test suites, not every scenario needed for ZeroDeck replication. The following remain unknown/unverified unless separately supported by later evidence:
- Hypatia scanner behaviour for each relevant benign file/result branch and its actual Android runtime environment.
- Hypatia file access, result lifecycle, database update and recovery behaviour beyond what the CI suite proves.
- HypatiaDatabases individual feed normalization, malformed-input handling, generated database properties, integrity/signing and failure/recovery behaviour beyond the successful pipeline steps.
- ClamAV specific file-scan/result/error branches and performance/resource characteristics relevant to ZeroDeck.
- Web Risk live provider responses and cache expiry behaviour.
- Quarantine/restore/delete behaviour on the actual Android target.
- ZeroDeck implementation runtime conformance and all remaining required properties across the 15 facets.

Continue with any further non-invasive, available evidence extraction and scenario mapping. If a specific execution requires unavailable infrastructure, credentials, external service access or an unverified lab, record the exact blocker and move on to the next eligible target. Do not hold up the entire investigation for a skipped item.

**Phase 7 is not complete. The ZeroDeck Software Rules capture remains incomplete and not replication-sufficient.**
