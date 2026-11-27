# Phase 7 Renewal — Target and Test Matrix

**Date:** 2026-11-27  
**Status:** Target builds and bounded tests executed; follow-up runtime exploration in progress  
**Execution model:** ChatGPT sandbox where suitable; GitHub Actions hosted runners when the sandbox lacks the required toolchain  
**Authorization:** See [Owner Authorization Record](OWNER-AUTHORIZATION-PHASE-7-OPEN-SOURCE-TESTING.md)

## 1. Authorization and scope

The owner deliberately made the uploaded RE-agent ownership restriction absolute as a protective default: agents must not infer intent or take liberties. Actions covered by a stop/consult rule require the agent to stop and ask. The owner—not the agent—decides whether to authorize a scoped exception.

On 2026-11-27, the owner explicitly authorized this renewed Phase 7 investigation to inspect, build, run ordinary project tests, and study the following three pinned open-source prior-art targets. This is a specific owner override of the uploaded written-permission default for these repositories and this investigation; it does not weaken the default globally or authorize unrelated targets or higher-risk actions.

- SRC-01 Hypatia: `c0f98977be935e58849726313635a2459cac3892`
- SRC-02 HypatiaDatabases: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- SRC-06 ClamAV: `cad7b18a3e6505195fe08db1412449a18fc9f012`

The exact scope and limits are recorded in the authorization record. Licences still govern code use and redistribution. No malware samples, live attacks, upstream publication, or unapproved provider calls are authorized.

## 2. Target matrix

| Target / path | Planned execution | Status and limits |
|---|---|---|
| SRC-01 Hypatia | Checkout exact SHA on GitHub-hosted Ubuntu; install JDK 17 and Android SDK; run Gradle lint, unit tests and debug APK build; retain reports/APK. | **Executed:** run #46029241394 succeeded. Gradle lint/build and debug APK packaging passed; unit test task was NO-SOURCE. Lint report has one Error-severity finding plus warnings. No malware samples or emulator launch yet. |
| SRC-02 HypatiaDatabases | Checkout exact SHA; install JDK 17/Maven and required safe tooling; run bounded Maven compile/test and deterministic fixture-based generator path if inputs can be isolated. Inspect generated outputs locally as CI artifacts only. | **Executed:** run #46029241394 succeeded. Maven package and deterministic generator fixture passed (3 valid hashes + 1 domain; 4 Bloom-filter outputs). No test sources. No live feeds, signing or publication. |
| SRC-06 ClamAV | Checkout exact SHA; install Ubuntu build dependencies; configure/build with CMake; run CTest and harmless example tests; retain logs/reports. | **Authorized; renewed run pending.** No malware samples or live threat-feed operations. |
| SRC-04 Google Web Risk Lookup | Mock/contract tests can be performed without credentials; live API test requires dedicated owner-provided project/key and explicit approval for URL disclosure, call volume and possible cost. | **Live call not authorized/provisioned.** Keep as documented contract; no live provider calls. |
| SRC-07 Android storage / SAF / Keystore | Documentation-derived constraints only; later test against first-party ZeroDeck app. | Not an executable prior-art target. |
| `lordwhitefire/Zerodek` mockup fork | UI source capture is already sufficient for this phase. | **Out of renewed Phase 7 runtime scope.** Do not spend time browser-testing it. |
| Actual `REMAREMA6/zero-deck` product implementation | Native React/TypeScript app runtime, persistence, API and UI conformance. | Not yet available as a product runtime target. Reassess when implementation/build exists. |
| Supabase / Sanity | Integration tests only if these services are approved as MVP scope and dedicated test credentials/configuration are provided. | Not established as in-scope MVP integrations. Do not invent requirements. |

See [PHASE-7-RENEWED-ACTIONS-RESULTS.md](PHASE-7-RENEWED-ACTIONS-RESULTS.md) for exact runner/toolchain details, lint findings, test names, artifact IDs and limitations.\n\n## 3. Execution order

1. Hypatia exact-revision Android lint, unit tests and debug build.
2. ClamAV exact-revision configure/build and harmless test suite.
3. HypatiaDatabases bounded compile/test and deterministic generator fixture path, without external feed publication.
4. Any remaining independent test paths that can be safely completed without additional credentials or owner decisions.

The order may change to make best use of runner constraints. A failure or unavailable dependency on one target must not stop work on the others.

## 4. Evidence handling

For each run record repository, exact target SHA, workflow commit, runner image, tool versions, commands, test names, result, logs/reports/artifacts, side effects, cleanup, and limitations.

Keep evidence classes distinct:
- newly initiated GitHub Actions execution of a pinned reference project;
- historical upstream CI execution;
- source-derived rules;
- documented external contracts;
- owner-declared product intent;
- inference and unknowns.

Reference-project results are contextual evidence, not automatic ZeroDeck requirements. Reconcile only supported findings to the seven MVP scenarios and 15 facets. Do not populate ZeroDeck runtime observations from reference-project runs.

## 5. Existing runner smoke evidence

The first-party Playwright runner smoke workflow passed three times:
- [Run #46026033625](https://github.com/REMAREMA6/zero-deck/actions/runs/46026033625)
- [Run #46026203672](https://github.com/REMAREMA6/zero-deck/actions/runs/46026203672)
- [Run #46026419660](https://github.com/REMAREMA6/zero-deck/actions/runs/46026419660)

It verified the GitHub-hosted runner, Playwright, screenshot/video/trace capture and artifact upload using a first-party fixture only. It did not test ZeroDeck or the prior-art targets.

## 6. Continuing limitations

- GitHub-hosted runners are ephemeral VMs, not a guarantee of a dedicated malware-analysis lab. Do not execute malware or suspicious samples.
- Live Web Risk calls remain separately gated by credentials and explicit approval.
- No first-party ZeroDeck runtime exists yet; product replication sufficiency remains unproven.
- Do not claim completion until the renewed target runs have been inspected and their results mapped with explicit evidence limits.
