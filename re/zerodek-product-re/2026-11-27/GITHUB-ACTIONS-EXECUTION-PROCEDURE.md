# GitHub Actions as the Remote Test and Capture Environment

**Date:** 2026-11-27  
**Decision:** Owner-approved working procedure  
**Status:** Adopt for the renewed Phase 7 investigation and future implementation work

## 1. Purpose

Use GitHub Actions hosted runners as the remote, configurable execution environment whenever the current ChatGPT sandbox cannot provide the required operating system, dependency, browser, emulator, service, or test capability.

The owner intends to develop ZeroDeck using an iPhone, ChatGPT, and GitHub as the primary working setup. The phone is the control surface; repository changes, workflows, logs, artifacts, and test results are handled through GitHub.

This is an execution strategy, not a claim that every test is automatically possible or that GitHub-hosted runners have no limits.

## 2. Operating rule

1. First determine whether a test is practical and reliable in the current sandbox.
2. If the sandbox lacks a required capability, do not silently omit the test. Design a GitHub Actions workflow for it.
3. Pin the target revision, toolchain, dependencies, test inputs, and workflow version where practical.
4. Run the workflow on an appropriate GitHub-hosted runner. Install the required dependencies in the workflow rather than relying on the ChatGPT sandbox.
5. Collect and inspect the exit status, logs, test reports, screenshots, videos, traces, network evidence where appropriate, and other artifacts.
6. Diagnose failures, change the test or implementation as evidence warrants, and rerun.
7. Record what was actually tested, what passed or failed, what was not tested, and why.
8. Continue with other feasible targets when one target is blocked. Do not spend excessive time forcing an unavailable path.

A green workflow is evidence only for the tests it actually executed. It is not proof that untested behaviours or all 15 facets are correct.

## 3. Test and capture capabilities

Use the tool that matches the target:

- **Browser UI:** Playwright in headless browsers for navigation, interaction, DOM/accessibility inspection, viewport/responsive states, screenshots, screenshot comparison, traces, and video.
- **API and service behaviour:** HTTP/API integration tests, contract tests, mocked-provider tests, and authorized live integration tests.
- **Data and persistence:** disposable databases/services, migrations, schema checks, state setup, persistence/restart checks, and cleanup.
- **Background work and messaging:** service containers, queues, workers, scheduled jobs, retries, and failure injection where supported.
- **Native mobile:** Android emulator/device workflows and suitable mobile automation where the runner supports the required SDK/emulator setup. Playwright is not a substitute for native-app UI automation.
- **Build, security, and performance:** platform toolchains, static checks, dependency checks, controlled test fixtures, and bounded measurements.
- **Deployment:** explicitly invoked deployment workflows to an approved environment, with post-deployment smoke tests.

The capture should produce evidence usable by the Software Rules model: scenario, target revision/build, environment, actor, preconditions, exact inputs, ordered actions, observed state/transitions, expected-vs-actual result, timestamps, artifacts, provenance, limitations, and unresolved properties.

## 4. UI evidence procedure

For browser-rendered interfaces:

1. Start the application in the workflow.
2. Wait for a defined readiness condition, not an arbitrary assumption.
3. Execute each documented UI scenario and branch.
4. Capture screenshots at specified viewport sizes and relevant states.
5. Capture Playwright traces and videos when they add diagnostic value.
6. Compare screenshots against approved baselines using a declared comparison method and tolerance.
7. Preserve browser console errors, failed requests, and relevant accessibility/DOM observations.
8. Record dynamic regions, fonts, animation, platform differences, and other sources of non-determinism instead of hiding them.

The Next.js preview/source in the product-reference fork may be browser-tested as a rendering of that reference implementation. Such results remain evidence about the reference preview, not proof of the eventual native ZeroDeck application. The Expo/React Native native UI requires an appropriate native test path.

## 5. Integrations and secrets

GitHub Actions may test integrations such as Supabase, Sanity, and external APIs when the owner configures the required credentials and the target environment is authorized.

- The owner supplies secrets through GitHub Actions Secrets or approved environment-scoped secrets. Never request, commit, print, echo, or place secret values in artifacts.
- Use dedicated test projects/accounts and least-privilege credentials, separate from production.
- Prefer disposable test data and deterministic fixtures. Clean up test resources.
- Separate mocked/contract tests from live-provider tests; label the evidence correctly.
- Live calls may incur cost, disclose submitted data to a provider, create records, send messages, or trigger rate limits. Record those effects and obtain owner approval for the specific test when needed.
- Do not run destructive tests against production data or services.
- If secrets or integration access are unavailable, record the exact blocker and continue with tests that do not require them.

The presence of a secret does not itself authorize every use of the connected service.

## 6. Deployment workflow

GitHub Actions can also perform deployment when a workflow and credentials are configured.

- Deployment must be an explicit, auditable workflow action (for example, a manual workflow dispatch or approved release trigger).
- Default testing and pull-request workflows must not deploy to production.
- Use a staging/test environment by default.
- Protect production environments with GitHub environment restrictions and required approvals where available.
- Scope deployment credentials to the minimum required permissions.
- Record the commit, target environment, workflow run, deployment result, and post-deployment smoke-test result.
- Do not claim a deployment succeeded until the workflow reports success and the deployed target is verified.

## 7. Runner limits and safety

GitHub-hosted runners are configurable virtual machines, not unrestricted machines. Available operating systems, hardware, permissions, networking, storage, execution time, concurrency, billing/usage quotas, and emulator support depend on runner type and GitHub plan/policy. Some tests may still require self-hosted hardware, a physical device, a paid service, or a separately provisioned lab.

For third-party software, suspicious files, malware, or security-sensitive dynamic analysis, a hosted runner is not automatically a verified isolated lab. Before execution, assess ownership/authorization, provenance, pinned source, licence, network access, host/runner exposure, secrets, persistence, and teardown. Never execute untrusted samples merely because the job runs in GitHub Actions. Follow the engagement's uploaded reverse-engineering safety constraints and the named-lab requirements for suspicious samples.

Do not expose secrets to untrusted pull-request code. Avoid privileged workflows and broad write permissions. Pin third-party actions to immutable revisions where practical, and review actions and scripts before running them.

## 8. Evidence and reporting rules

Every workflow-based finding must identify:

- repository and exact target commit/ref;
- workflow file revision and run URL/ID;
- runner image/OS and relevant tool versions;
- commands, test scenarios, fixtures, and configuration (excluding secrets);
- result, logs, reports, screenshots/videos/traces and artifact locations;
- whether execution was local, GitHub-hosted, self-hosted, mocked, or against a live provider;
- side effects, cleanup/teardown, limitations, skipped tests, and unresolved questions.

Keep evidence classes distinct: runtime-observed behaviour, source-derived rules, documented external contracts, owner-declared intent, inference, and unknown. Reference-project results do not become ZeroDeck requirements automatically.

## 9. Renewed Phase 7

The previous Phase 7 closeout remains a valid record of the bounded investigation performed under the earlier environment. It is not erased or rewritten as if GitHub Actions had been used then.

The owner has now directed a renewed Phase 7 pass using GitHub Actions for previously skipped execution paths where feasible. The renewed pass must:

1. Re-read the Phase 3 target register, prior Phase 7 preflight, available-runtime-evidence report, observation map, closeout, and governing safety constraints.
2. Reassess each previously skipped target/scenario individually for a suitable hosted-runner workflow.
3. Prioritize the skipped Hypatia Android build/test path, HypatiaDatabases generator path, ClamAV local build/test path, UI/browser capture of the reference preview where useful, and authorized integration/provider paths.
4. Use exact pinned revisions for prior-art targets and preserve upstream CI evidence separately from newly initiated investigation runs.
5. Avoid external feed publication or other side effects unless the workflow can safely isolate them or the owner explicitly authorizes the action.
6. Treat Web Risk live calls as requiring owner-supplied credentials/project and explicit approval for URL disclosure and potential cost.
7. Record any path still blocked by runner limitations, missing credentials, missing authorization, unsupported hardware, or safety constraints; continue with remaining targets.
8. Update the observation map, evidence register, traceability, and Software Rules capture only where the evidence actually supports a ZeroDeck rule. Do not transfer reference-project behaviour into ZeroDeck requirements.
9. Reassess all seven MVP scenarios and all 15 facets. Preserve unknowns where no valid evidence exists.

**Important boundary:** this renewed prior-art investigation can improve reference evidence and test procedures. It still cannot establish actual ZeroDeck runtime behaviour where no ZeroDeck implementation/build exists. Actual product conformance capture must be performed against the implemented ZeroDeck target when available.

## 10. Current status

- This procedure is recorded and adopted.
- The previous bounded Phase 7 closeout is preserved as historical evidence.
- Renewed Phase 7 is the next active task and has not yet been executed under this procedure.
- ZeroDeck remains incomplete and not replication-sufficient until required properties are supported by evidence and the relevant target scenarios are executed.
