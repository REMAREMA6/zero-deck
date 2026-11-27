# Phase 7 Decision — Local Runtime Investigation

**Decision ID:** ZD-DEC-2026-11-27-03  
**Recorded:** 2026-11-27  
**Status:** Owner-approved approach; execution preflight not yet cleared  
**Workspace:** `re/zerodek-product-re/2026-11-27/`

## Decision

Proceed from the completed Phase 6 bounded completeness audit to a Phase 7 investigation of locally executable parts of the ZeroDeck reference repository. The purpose is to replace unsupported source-only assumptions with reproducible runtime evidence wherever the available target and environment genuinely permit it.

This is an investigation of the reference repository's executable implementation. The repository has previously been classified as a mock-screen/design reference with a separate Expo source tree; running it does **not** automatically establish behaviour of a deployed or production ZeroDeck product.

## Approved investigation boundary

- Target: the user-designated reference repository, `lordwhitefire/Zerodek`, using a pinned immutable commit recorded before execution.
- Work on a separate clone/copy. Do not modify the original repository or its history.
- Run only locally executable components that pass pre-execution inspection.
- Observe behaviour through reproducible commands, tests, local HTTP/API exchanges, process output, logs, and local data/state where available.
- Compare supported observations with the existing ZeroDeck Software Rules capture and all 15 facets.
- Correct or add rules only when the evidence supports the change.
- Keep browser-based inspection, browser automation, and visual/UI parity work out of scope.
- Do not build a replacement application.
- Do not provision external accounts, purchase services, create paid subscriptions, or obtain new secrets solely for this investigation.
- Do not send requests to external providers or production services. If a feature requires credentials, external infrastructure, or an unavailable dependency, record it as unverified.
- Do not infer product requirements from incidental implementation details. Retain the existing evidence classes and distinguish reference-runtime observations from production ZeroDeck behaviour.

## Required pre-execution gates

The user has approved this investigation approach. That approval is not, by itself, a verified ownership or third-party permission record for every file in the reference repository.

Before executing repository code:

1. Complete the RE triage scope record with the target, question, owner/authorization basis, mode, allowed actions, and exclusions. Confirm ownership or obtain the required written permission for code not owned by the user.
2. Pin and record the exact repository commit; preserve the original and record the clone provenance.
3. Inspect package scripts, install lifecycle hooks, dependencies, build configuration, Dockerfiles, and executable entry points before running install/build/start commands.
4. Name and verify the actual execution environment. Do not call an ordinary folder, chroot, privileged container, or separate process an isolated lab.
5. If the work requires the RE agent's isolated-lab gate, verify actual isolation, absence of host filesystem shares and bridged networking, a pre-run snapshot, and the ability to revert or destroy the environment. If those conditions are unavailable, do not execute; continue only with permitted static/read-only inspection.
6. Keep external network access disabled by default. Any required local loopback traffic must be explicitly scoped; no external provider traffic is permitted under this decision.

The uploaded RE-agent triage and dynamic-lab instructions remain applicable. Their prohibition on executing suspicious samples/APKs/bundles/firmware is not to be confused with permission to run this ordinary application repository: application execution is permitted only after the separate scope, authorization, and environment gates above are satisfied.

## Evidence handling

For each execution, record:
- scenario ID and exact question;
- pinned source revision and relevant file/symbol;
- environment identity and isolation properties;
- exact command or request, inputs, initial state, and ordered actions;
- stdout/stderr, logs, HTTP/API response, test output, and relevant local state;
- expected versus observed result and settling/stop criteria;
- evidence hash/path and any reproduction steps;
- limitations, failed attempts, and properties that remain unknown.

Classify evidence as reference-runtime-observed, source-derived, documented contract, owner-declared, inference, or unknown. Never relabel reference-runtime observations as production observations.

## Phase 7 completion criteria

Phase 7 is complete only when:
- the authorization and execution-environment gates have a documented pass/fail disposition;
- every executable in-scope scenario that can safely be run has reproducible evidence, or a precise reason it could not be run;
- the relevant 15 facets have evidence-backed dispositions, including explicit not-applicable, conditional, and unknown states;
- affected rules, property inventory, evidence register, traceability, and open-property records are reconciled;
- validation is rerun and its exact result recorded; and
- the report states whether the resulting capture is replication-sufficient. A successful local run or green CI alone does not establish replication sufficiency.

## Current state and next action

**Phase 7 status:** Preflight pending. No runtime execution has started.

**Next action:** Complete the ownership/permission and environment preflight, then pin and inspect the reference repository before deciding whether any local component can be executed safely.

