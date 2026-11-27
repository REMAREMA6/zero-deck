# Phase 7 — Target and Environment Preflight

**Date:** 2026-11-27  
**Phase:** 7 — Non-UI runtime investigation of selected prior-art implementations  
**Status:** Preflight started; runtime execution blocked  
**Scope authority:** corrected ZD-DEC-2026-11-27-03 and Phase 3 prior-art register

## 1. Correct target boundary

The runtime targets are the selected working prior-art implementations from Phase 3, not lordwhitefire/Zerodek.

The repository-role check found:
- GitHub reports lordwhitefire/Zerodek as a fork with parent felixik21/Zerodek.
- Both repositories' main branches resolve to commit 86908bff1aa1bbf85a231ba0d47b8fe9fff148c6 at inspection time.
- The owner clarified that this repository is only a limited product-intent/screen source. Its Expo screen code can support source-derived UI rules; it is not a Phase 7 runtime target.
- GitHub repository metadata confirms lordwhitefire/Zerodek is a fork whose parent is felixik21/Zerodek. Both main branches pointed to commit 86908bff1aa1bbf85a231ba0d47b8fe9fff148c6 when checked; the inspected screen source is pinned to that shared revision.
- REMAREMA6/zero-deck is the actual product repository being built.

## 2. Target-by-target preflight

### SRC-01 — MaintainTeam/Hypatia

**Pinned revision:** c0f98977be935e58849726313635a2459cac3892  
**Licence recorded in Phase 3:** AGPL-3.0; the embedded GPG verifier has separate Arduino-origin GPL-2.0-or-later notice and exception.  
**Source inspected in this preflight:**
- .github/workflows/ci.yml — blob c930ecca1e58c82da7e8ced87e83451810b560aa
- gradlew — blob f5feea6d6b116baaca5a2642d4d9fa1f47d574a7
- app/build.gradle — blob 8c785f3d517f5bf45193397c3173288e639baee6

**Observed build path:** the CI workflow checks out the repository, sets up Temurin JDK 17, then runs:
- ./gradlew assembleDebug lintDebug testDebugUnitTest --stacktrace -DskipFormatKtlint
- It hashes the resulting debug APK and uploads the APK artifact.

The app Gradle file sets compile SDK 36, min SDK 21, target SDK 34, Java/Kotlin target 17, and declares AndroidX document-file, AppCompat, core-ktx, Guava, Bouncy Castle and Commons IO dependencies.

**Preflight disposition:** not runnable in the current environment. Java exists, but Gradle/Gradle wrapper distribution is not installed locally, Android SDK/ADB and an Android emulator/device are not verified or present in the checked PATH. The workflow's hosted GitHub runner is not an execution environment we control for this investigation. Do not trigger it as a substitute for an approved local lab.

**Runtime status:** NOT RUN. No scanner runtime behaviour is newly observed in Phase 7.

### SRC-02 — MaintainTeam/HypatiaDatabases

**Pinned revision:** 3c35f52e1a847caed46d8e1ad34968bfa3c8b10a  
**Licence recorded in Phase 3:** generator source states AGPL-3.0-or-later; GitHub metadata reports NOASSERTION.  
**Source inspected in this preflight:**
- .github/workflows/generate_stable.yml — blob 570e11b6a4110c56e91c103d320b595d7095f3b7
- pom.xml — blob 0f02c69adba68a362b571f0a7b2b264f09ba0801
- src/main/java/org/maintainteam/hypatiadatabases/App.java — blob fd67153e7b8f8ff6d4b20cd18eccd4d74e4f4a19

**Observed pipeline path from source:**
- Workflow is manually dispatchable and scheduled every two days.
- Installs Maven, unzip, Git and dos2unix; starts a ClamAV daemon with main/daily databases.
- Copies static sources and downloads/collects multiple external indicator feeds, including ESET, Signature Base, ThreatView, ThreatFox, MalwareBazaar, Stalkerware, Sanesecurity, Avast and Targeted Threats.
- Runs Maven to execute the Java generator, creates Bloom-filter database files and a generation report.
- Publishes generated output to the unsigned branch using the GitHub Actions token.
- The repository README states that a separate self-hosted CI checks out the unsigned branch, signs the output with the project's key, and pushes it to gh-pages. That signing step is not performed by the inspected generate_stable workflow itself.

**Preflight disposition:** skip runtime execution. Running the workflow would contact numerous external feed providers, start a ClamAV service, process downloaded third-party datasets and publish generated artifacts. The local environment lacks Maven and ClamAV, and there is no isolated lab. No external feed integration or publication action is authorized for this investigation.

**Runtime status:** NOT RUN. No generation timing, feed freshness, dataset correctness, signing result or publication behaviour is claimed as runtime-observed.

### SRC-06 — Cisco-Talos/ClamAV

**Pinned revision:** cad7b18a3e6505195fe08db1412449a18fc9f012  
**Licence recorded in Phase 3:** GPL-2.0.  
**Source inspected in this preflight:**
- .github/workflows/cmake.yml — blob 841ec359746560924caa1cf47006b07df6347d50
- CMakeLists.txt — blob ff60833fab8a9a8e9c9a31d9e71668c4cca0429b

**Observed build/test path from source:** the CI matrix builds on Windows, macOS and Ubuntu. The Linux path installs Bison, Flex, Valgrind, pytest and development libraries, configures CMake, builds, and runs CTest. CMake requires Rust and configures multiple optional engine components. The repository contains unit-test input fixtures; no fixture was executed or opened as a sample in this preflight.

**Preflight disposition:** no clamscan, freshclam or sigtool executable is installed. CMake, Ninja, GCC, Clang and Make are present, but required dependencies and Rust availability were not fully established. More importantly, no genuine isolated lab is verified; ClamAV test suites can process potentially malicious test inputs. Do not build/run its test suite here.

**Runtime status:** NOT RUN. ClamAV remains a comparison reference, not a ZeroDeck dependency decision.

## 3. Non-executable references and integration limits

- **SRC-04 Google Web Risk Lookup:** remote provider API. No requests, API keys, accounts, paid services or external provider traffic are used in this phase. Request/response and pricing details remain documented-contract evidence from Phase 4, not runtime evidence.
- **SRC-07 Android storage, Storage Access Framework and Keystore:** official platform documentation, not an executable repository. Continue treating its statements as documented platform constraints.
- **SRC-03 Safe Browsing v4:** rejected for default commercial use; not a runtime target.
- **SRC-05 muety/safe-browse-url-lookup:** old wrapper for the rejected Safe Browsing v4 API; not a runtime target.

## 4. Available execution environment

Observed by command inspection on 2026-11-27:
- Linux x86_64; current process identity is root.
- Present: Java, Git, Node.js, npm, Python, CMake, Ninja, GCC, Clang and Make.
- Not found: Docker, Podman, ADB, Gradle, Maven, clamscan, freshclam and sigtool.
- The container exposes Linux network and mount namespaces, but their existence alone does not prove network isolation or absence of host mounts.
- No named lab, no-host-share verification, no-bridged-network verification, snapshot rollback or destroy/revert capability is documented.

**Lab decision:** this environment does not meet the uploaded RE-agent dynamic-lab requirements. A root-run container is not accepted as a lab. Runtime execution is blocked.

## 5. Authorization and permission status

The owner authorized execution of the owner's personal repository, but Phase 7 targets are third-party projects. The Phase 3 register records their public repositories and licences; it does not record written maintainer permission for reverse-engineering execution. No target-specific written permission or approved lab scope has been added to this preflight.

**Decision:** do not execute third-party target code until the target-specific permitted action is recorded and a genuine isolated lab is verified. This report does not offer a legal conclusion about the licences.

## 6. Phase 7 status and next action

- Phase 7 is started.
- Target and environment preflight has been performed.
- No Phase 7 runtime execution has occurred.
- UI source-derived rules are separately recorded in UI-SOURCE-DERIVED-RULES.md; UI runtime is excluded from this phase.
- External provider/feed execution is skipped.
- The ZeroDeck Software Rules capture remains incomplete and not replication-sufficient.

**Next action:** resolve whether a suitable isolated lab and target-specific execution permission can be provided. Until then, continue only non-executing source/document analysis and retain runtime properties as unknown/unobserved.
