# Phase 7 — Bounded Runtime Investigation Closeout

**Date:** 2026-11-27  
**Status:** COMPLETE — available reference-runtime evidence collected; remaining paths explicitly skipped  
**Scope:** Non-UI runtime investigation of the selected Phase 3 prior-art implementations. This closeout does not claim ZeroDeck runtime conformance or replication sufficiency.

## 1. Owner execution instruction

The governing instruction was to complete every investigation that can reasonably be completed, record and skip anything that cannot, continue with other targets, and avoid wasting time forcing unavailable paths. That instruction was followed.

## 2. Work completed

1. Corrected the target boundary: the ZeroDeck mockup fork is not a runtime target. The selected working prior-art implementations are the runtime references.
2. Completed target/environment preflight and rechecked the current execution environment.
3. Inspected exact-pinned upstream CI runs for all three selected executable references.
4. Extracted additional retained log evidence:
   - Hypatia: exact-pinned CI job succeeded; detailed logs had expired.
   - HypatiaDatabases: generator processed live feed inputs; reported 1,757,956 valid lines and one invalid line, reported per-type read/added/approximate counts, generated four Bloom-filter artifact classes, and successfully published the unsigned branch.
   - HypatiaDatabases current run: ThreatFox returned HTTP 410, stopping the workflow before generation.
   - ClamAV: exact-pinned macOS, Ubuntu and Windows jobs succeeded; Ubuntu CTest passed 17/17; named CVD verification, signature-tool and scan-callback cases were extracted.
5. Mapped the evidence to all 15 Software Rules facets, retaining the reference-project provenance and limits.
6. Reviewed all seven ZeroDeck MVP scenarios individually and assigned an evidence-or-skip disposition to each.
7. Reconciled the product-specific evidence register and rule traceability without promoting prior-art behaviour to ZeroDeck requirements.
8. Explicitly assessed the remaining replication-sufficiency gaps.

Detailed evidence:
- `PHASE-7-AVAILABLE-RUNTIME-EVIDENCE.md`
- `PHASE-7-RUNTIME-OBSERVATION-MAP.md`
- `PHASE-7-TARGET-PREFLIGHT.md`
- `RUNTIME-INVESTIGATION-DECISION.md`

## 3. Final target dispositions

| Target | Completed evidence | Skipped / unresolved |
|---|---|---|
| SRC-01 Hypatia | Exact-pinned upstream CI build job succeeded. | Detailed job logs returned HTTP 410; no artifacts. No device launch or controlled file scan observed. |
| SRC-02 HypatiaDatabases | Exact-pinned generator pipeline completed; generation metrics, output artifact classes and unsigned-branch publication observed in logs. | Local full pipeline skipped. Current run blocked by ThreatFox HTTP 410. Separate signing pipeline not verified. |
| SRC-06 ClamAV | Exact-pinned cross-platform CI jobs succeeded; Ubuntu CTest 17/17; CVD verification, signature-tool and scan-callback test cases passed. | Local build/test skipped. No ZeroDeck-specific benchmark, Android integration or quarantine behaviour observed. |
| SRC-04 Google Web Risk | Official provider contract remains documented in Phase 4. | Live API request skipped: no configured credentials/project or separate authorization for URL disclosure/provider costs. |
| SRC-07 Android storage/SAF/Keystore | Platform constraints remain documented in Phase 4. | Runtime test not applicable: documentation, not executable software. |

## 4. Seven MVP scenario dispositions

All seven scenarios have an explicit disposition in `PHASE-7-RUNTIME-OBSERVATION-MAP.md`.

- MVP-FILE-001: no ZeroDeck execution; Hypatia CI completion is only bounded build/test evidence.
- MVP-FILE-002: ClamAV reference callback branches provide partial prior-art evidence; ZeroDeck's seven result/failure branches remain unobserved.
- MVP-QUAR-001: no executable quarantine reference; runtime behaviour unobserved.
- MVP-QUAR-002: no runtime review/rescan reference; unobserved.
- MVP-QUAR-003: restore and permanent deletion remain separately unobserved.
- MVP-LINK-001: no live provider request; input, entitlement and activation enforcement remain unobserved.
- MVP-LINK-002: no live provider result branches; all seven link-result branches remain unobserved.

No scenario was executed against a deployed ZeroDeck target.

## 5. Fifteen-facet disposition

The observation map records evidence and gaps for every governing facet:
- Partial reference-runtime evidence exists for Behaviour, Business Rules, Data, Persistence, Security Controls, Background Processing, Errors and Recovery, Integrations, and limited Configuration.
- Interface is excluded from this non-UI runtime phase.
- API, Messaging, product Identity/Authentication, product Authorization/Permissions and measurable Performance/Resource Behaviour remain unobserved or conditional for the ZeroDeck MVP.
- These dispositions do not imply that an unobserved facet is absent from ZeroDeck.

## 6. Execution paths deliberately skipped

The current container was rechecked. Java, Git, Node/npm, Python, CMake, Ninja, GCC, Clang and Make are present. Android SDK/ADB, Gradle, Maven, ClamAV binaries, Docker and Podman are absent from PATH. DNS resolution for github.com failed. The process runs as root, and the available mount/namespace information does not establish the uploaded dynamic-lab requirements.

The uploaded `re-dynamic-lab` skill requires a named, verified isolated lab, no host filesystem shares, no bridged network, a pre-run snapshot and teardown/rollback. Those facts cannot be verified here. Therefore local third-party execution was skipped; no APK, suspicious file, malware sample or unvetted fixture was executed.

No further attempts were made to force:
- local Hypatia Android/device execution;
- local HypatiaDatabases feed download/generation/publication;
- local ClamAV build/test;
- live Web Risk provider calls;
- expired Hypatia job-log retrieval after the HTTP 410 response.

These are recorded as skipped/unverified, not as successful tests.

## 7. Reconciliation with the ZeroDeck Software Rules capture

The Phase 7 runtime evidence is evidence about the pinned reference projects and their upstream CI runs. It does not establish the ZeroDeck implementation's rules. Therefore:

- Added the reference-runtime pointer `EVD-RT-REF-001` to `software-rules/EVIDENCE.md`.
- Added its transfer boundary to `software-rules/RULE-TRACEABILITY.md`.
- Kept the raw evidence in the RE workspace, following `RULES.md`.
- Did not add reference runtime observations to `capture.json`.
- Did not promote Hypatia, HypatiaDatabases or ClamAV behaviours into owner-declared or product-material ZeroDeck requirements.
- Did not mark any of the 775 required/optional property entries as ZeroDeck runtime-observed.
- Kept all unresolved properties in `software-rules/OPEN-PROPERTIES.md`.

The existing Phase 6 schema/completeness validation remains the validation evidence for the unchanged machine-readable capture: [CI run #46000308895](https://github.com/REMAREMA6/zero-deck/actions/runs/46000308895). Phase 7 added evidence pointers and RE reports only; it did not change the capture JSON or its schema payload.

## 8. Replication-sufficiency assessment

**ZeroDeck remains incomplete and is not replication-sufficient.**

Still unavailable:
- a deployed ZeroDeck build and reproducible target environment;
- ZeroDeck runtime executions for the seven MVP scenarios;
- complete interface runtime capture for the actual app;
- runtime state transitions, data schemas, persistence and side effects;
- actual authorization/Pro-gate enforcement;
- quarantine/restore/delete execution and recovery;
- live link-check integration behaviour and provider outcome mapping;
- complete error/recovery behaviour and performance/resource measurements;
- completed actor, target, precondition, input, ordered-action and stop-condition definitions.

The Phase 7 reference investigation is complete only in the bounded sense that all accessible evidence was extracted and mapped, and every unavailable path was explicitly skipped with a reason. It is not a claim that all ZeroDeck runtime rules have been obtained.

## 9. Exit-gate result

| Exit criterion | Result |
|---|---|
| Every selected executable reference checked for accessible exact-pinned CI evidence | **Satisfied** |
| Further accessible non-invasive runtime logs inspected | **Satisfied** |
| All seven MVP scenarios assigned evidence-or-skip dispositions | **Satisfied** |
| All 15 facets assigned evidence-backed or explicit unobserved/conditional dispositions | **Satisfied** |
| Evidence classes and source provenance kept distinct | **Satisfied** |
| Capture and traceability reconciled without unsupported rule promotion | **Satisfied** |
| Skipped paths and exact blockers recorded | **Satisfied** |
| Replication sufficiency explicitly assessed | **Satisfied — NOT SUFFICIENT** |

**Phase 7 exit gate: SATISFIED for the bounded runtime investigation. Phase 7 is complete. The ZeroDeck Software Rules capture remains incomplete and not replication-sufficient.**

## 10. Handoff

No further Phase 7 execution should be attempted unless a previously missing prerequisite becomes available (for example, a named verified lab, a usable Android toolchain/device, accessible Hypatia logs, or separately authorized provider credentials).

When the actual ZeroDeck native app is implemented, the developer agent must capture its runtime behaviour against the seven scenarios and the 15 facets. That is a later product-runtime capture task, not a reason to keep Phase 7 open.
