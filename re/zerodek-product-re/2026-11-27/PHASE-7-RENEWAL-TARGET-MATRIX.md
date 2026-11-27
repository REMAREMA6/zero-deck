# Phase 7 Renewal — Target and Test Matrix

**Date:** 2026-11-27  
**Status:** Preflight / eligibility assessment  
**Execution model:** GitHub Actions for tests that the ChatGPT sandbox cannot support  
**Governing constraints:** `RULES.md`, the uploaded reverse-engineering-agent instructions, and `GITHUB-ACTIONS-EXECUTION-PROCEDURE.md`

## 1. Important ownership gate

The uploaded reverse-engineering-agent instructions allow analysis only of software the owner wrote/owns or software covered by written permission from its owner. Public availability, an open-source licence, a fork, repository access, or the owner's verbal instruction is not a substitute for written permission.

The selected Phase 3 reference projects are third-party projects. No written permission from their respective owners is recorded in this engagement. Therefore, **we must not execute or continue analysing those third-party targets** unless the required written permission is provided and recorded. GitHub Actions does not override this restriction.

This gate does not prevent us from testing first-party code in `REMAREMA6/zero-deck` that the owner controls, or from using a third-party service as an authorized customer within its terms. It does prevent treating a customer account as permission to reverse-engineer or test the provider's internal software/infrastructure.

## 2. Target matrix

| Target / previously skipped path | What GitHub Actions could technically support | Current eligibility | Disposition / unblock |
|---|---|---|---|
| SRC-01 Hypatia Android build, lint and unit tests | Ubuntu runner, JDK 17, Android SDK, Gradle wrapper, emulator if needed; retain APK/test reports | **Blocked — third-party source; no written permission recorded** | Existing exact-pinned upstream CI success remains usable as historical evidence. Do not create a new workflow that checks out/runs this source until written permission is recorded. |
| SRC-02 HypatiaDatabases generator | Java/Maven, ClamAV service, deterministic fixture feeds, generator tests and artifact inspection | **Blocked — third-party source; no written permission recorded.** Original workflow also downloads multiple live feeds and publishes an unsigned branch. | Existing upstream run evidence remains historical. Written permission plus a safe, non-publishing test plan is required before any new execution. Do not trigger the original workflow or reproduce its external feed/publication side effects. |
| SRC-06 ClamAV comparison engine | CMake toolchain, build dependencies, CTest and approved example fixtures | **Blocked — third-party source; no written permission recorded** | Existing exact-pinned upstream CI evidence remains historical. Written permission and a separately reviewed safe test plan are required before new execution. No suspicious samples. |
| SRC-04 Google Web Risk Lookup | HTTP integration test with a dedicated project/key stored as Actions secrets; controlled test URLs; request/response capture with sensitive URL redaction | **Conditionally eligible as an authorized customer API test; no credentials/project or live-call approval currently recorded** | Owner must provide a dedicated test project/key and explicitly approve URL disclosure, potential billing, test inputs and call volume. Do not call until then. Test the public API contract, not Google's internal software. |
| SRC-07 Android storage / SAF / Keystore | Android SDK/emulator tests against first-party ZeroDeck code once implemented | **Not a runnable prior-art target** | Documentation remains source-derived platform evidence. Test actual ZeroDeck implementation later. |
| `lordwhitefire/Zerodek` reference fork / Next.js preview | Playwright browser render, interaction, screenshots, traces and video | **Blocked for further RE capture — forked third-party source; no written permission from upstream owner recorded** | Existing source-derived UI notes remain historical. Do not run new source-level/runtime capture against this fork until permission is recorded. Once eligible, keep preview evidence distinct from the native Expo UI and from actual ZeroDeck behaviour. |
| Actual `REMAREMA6/zero-deck` product implementation | Playwright for browser surfaces; Android emulator/native automation for native app; API/database/integration tests | **Not yet available as a product runtime target** | Reassess when first-party application code and a reproducible build exist. This is the target that can ultimately establish ZeroDeck runtime rules. |
| Supabase / Sanity integrations | Actions secrets, dedicated test projects, API/SDK integration tests, disposable data and cleanup | **Not currently established as in-scope ZeroDeck MVP integrations; no test credentials/configuration supplied** | Do not invent an integration requirement. Add tests only after the owner approves the integration as in-scope and supplies dedicated test credentials/configuration. |

## 3. First eligible task — runner capability smoke test

Before any target investigation, validate the remote execution mechanism using a tiny first-party HTML fixture generated inside this repository's GitHub Actions job.

The smoke workflow should:
- run on a GitHub-hosted Ubuntu runner;
- install Node dependencies and Playwright Chromium;
- open a locally generated static HTML fixture in headless Chromium;
- assert a known title and visible heading;
- capture a screenshot;
- record a short browser video and Playwright trace;
- upload those artifacts even if the test fails;
- contain no external target, credentials, provider calls, malware, or production side effects.

This proves the runner/tool/artifact path only. It does not count as a ZeroDeck UI observation or Phase 7 reference-project runtime evidence.

## 4. Phase 7 evidence handling

- Keep the original Phase 7 closeout and upstream CI evidence unchanged as historical records.
- Record each new GitHub Actions run separately with workflow revision, target revision (if any), runner image, tool versions, commands, scenarios, results, logs and artifact references.
- Distinguish first-party runner smoke evidence, third-party upstream CI evidence, authorized live API observations, source-derived rules, owner-declared intent and unknowns.
- Do not promote reference-project observations to ZeroDeck requirements automatically.
- Reconcile only supported findings to the seven MVP scenarios and 15 facets.
- If permission, secrets, a target build, hardware, or a safe test fixture is missing, record the blocker and continue with another eligible first-party task.

## 5. Current result

The renewed Phase 7 is reopened. The runner smoke test is the first eligible execution task. New execution against Hypatia, HypatiaDatabases, ClamAV or the reference fork is currently blocked by the uploaded RE-agent ownership rule, not by the ChatGPT sandbox. Web Risk and future first-party integrations are conditional on owner-provided test access and explicit approval. Actual ZeroDeck runtime capture remains pending implementation.


## 6. Runner smoke test result

The first eligible task has passed. A first-party Playwright runner smoke workflow completed successfully three times:

- Run [#46026033625](https://github.com/REMAREMA6/zero-deck/actions/runs/46026033625), commit `3a1a0ff6d13da1df607f7ff50588a409d9a8c2dd`.
- Run [#46026203672](https://github.com/REMAREMA6/zero-deck/actions/runs/46026203672), commit `9e05176b52c312ccb2124d4bac5279c38a34e598`, with the artifact upload action pinned to v4.6.2's immutable commit.
- Run [#46026419660](https://github.com/REMAREMA6/zero-deck/actions/runs/46026419660), commit `d6b0f1ee7680eedd343dc9ecb6c435082bfe5b6f`, with `ubuntu-26.04`, Playwright `1.65.1`, and the artifact upload action pinned.

All three runs installed Playwright/Chromium, rendered a first-party HTML fixture, passed title/heading/click assertions, captured a screenshot, recorded a video and trace, and uploaded all three artifacts. Run A's downloaded screenshot/video/trace files were inspected. See `PHASE-7-RUNNER-SMOKE-REPORT.md` for exact environment, run IDs, artifact IDs, hashes, and limitations.

This proves the runner/artifact mechanism only. It is not a ZeroDeck UI observation or a test of the third-party prior-art targets. Full details and artifact hashes are in `PHASE-7-RUNNER-SMOKE-REPORT.md`.
