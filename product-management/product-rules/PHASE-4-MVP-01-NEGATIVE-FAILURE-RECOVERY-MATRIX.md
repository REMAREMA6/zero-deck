# Phase 4 — MVP-01 Negative, Failure and Recovery Matrix

**Contract:** `ZD-CONTRACT-FILE-ANALYSIS` v0.1.0-draft  
**Status:** PM-proposed scenarios; no ZeroDeck runtime execution is claimed.

Each row is a distinct scenario. Branches must be tested separately; a single successful scan does not establish the other outcomes.

| ID | Scenario / stimulus | Expected product behaviour | Requirement trace | Class |
|---|---|---|---|---|
| F01 | File is present but user has not requested a scan | No analysis begins | FILE-001 | Negative |
| F02 | User selects one file while unrelated files are also available | Only the selected file is accessed | FILE-002 | Boundary |
| F03 | Platform denies access at selection | Scan is rejected; access is not bypassed | FILE-002–003 | Denied |
| F04 | Permission is revoked after selection but before reading | Attempt fails; no completed verdict | FILE-003 | Failure |
| F05 | Permission is revoked during reading | Attempt stops/fails; no clean result is issued | FILE-003, 015 | Interruption |
| F06 | Selected file is empty | Input rejected or Could not analyse according to published policy | FILE-004–005 | Boundary |
| F07 | File has malformed structure | Invalid-input outcome; not a completed clean scan | FILE-005 | Negative |
| F08 | File is corrupt or truncated | Could not analyse/failure; no success claim | FILE-005, 018 | Failure |
| F09 | File type is not in published support matrix | Specific unsupported-input outcome | FILE-004–005, 025 | Boundary |
| F10 | File exceeds documented size or count limit | Bounded rejection; no uncontrolled resource use | FILE-004, 026 | Boundary |
| F11 | File is password-protected/encrypted and no approved path exists | Could not analyse; no inferred clean/threat verdict | FILE-005 | Boundary |
| F12 | Archive contains unsupported nested content | Coverage limitation disclosed; no full-archive claim | FILE-004, 025 | Boundary |
| F13 | User cancels an active scan where cancellation is supported | Further work stops safely; terminal state is cancelled | FILE-010–011 | Recovery |
| F14 | User cancels where the engine cannot cancel immediately | System reports actual state; does not falsely claim cancellation | FILE-011 | Boundary |
| F15 | Process is terminated while scan is active | Attempt is interrupted/failed; no completed verdict | FILE-010, 015 | Interruption |
| F16 | Analysis engine is unavailable before scan begins | Unavailable/Could not decide; not a no-known-threat result | FILE-018 | Dependency failure |
| F17 | Engine fails after partial analysis | Partial/inconclusive/failure state; no complete verdict | FILE-015, 018 | Dependency failure |
| F18 | Detection data is unavailable or stale and freshness is known | Limitation/freshness is disclosed; no fabricated freshness | FILE-015, 028 | Inconclusive |
| F19 | Engine returns malformed or unusable response | Fail safely; response is not accepted as detection evidence | FILE-018 | Dependency failure |
| F20 | Evidence meets documented confirmed-threat criteria | Threat found outcome with available explanation | FILE-012, 016 | Positive control |
| F21 | Evidence warrants caution but not confirmed-threat criteria | Suspicious outcome, not confirmed malware or clean | FILE-012, 016–017 | Positive control |
| F22 | No match is found within available coverage | No known threat found; never guarantee safety | FILE-012–013 | Positive control |
| F23 | Evidence is insufficient to decide | Could not decide; not no-known-threat | FILE-012, 015 | Inconclusive |
| F24 | User retries after failure while file remains eligible | New attempt identity; old result remains distinct | FILE-019 | Recovery |
| F25 | User retries while file access remains revoked | New attempt is rejected; no access bypass | FILE-003, 019 | Denied |
| F26 | Scan completes or fails | Original file remains unchanged | FILE-006 | Integrity |
| F27 | Default scan runs while network is available | File content is not uploaded by default | FILE-007 | Privacy |
| F28 | Future cloud option exists but user declines | No file content is sent to cloud | FILE-008 | Consent denial |
| F29 | Diagnostic event is produced after parsing error | File content and sensitive metadata are absent from ordinary diagnostics | FILE-020–021 | Privacy |
| F30 | A persisted scan record reaches its retention/deletion condition | Apply its own documented policy; do not affect quarantine data | FILE-022 | Conditional persistence |
| F31 | Resource limit is reached mid-scan | Bounded pause/failure/rejection; no successful verdict | FILE-026 | Resource failure |
| F32 | Conditional detection-data update fails integrity verification | Invalid update is not activated; dependent scan is unavailable/inconclusive | FILE-027 | Update failure |
| F33 | Engine has no reliable update timestamp | No fabricated freshness date or guarantee | FILE-028 | Data integrity |
| F34 | Same logical file is scanned on web and Android where both can access it | Product-level outcome meanings and disclaimer remain consistent | FILE-024 | Compatibility |
| F35 | Platform cannot access a file that another platform can access | Platform-specific limitation is shown; no parity claim | FILE-002–003, 024 | Compatibility |

## Coverage notes

- F01–F05 cover manual trigger and access boundaries.
- F06–F12 cover invalid, unsupported and boundary inputs.
- F13–F19 cover cancellation, process interruption and dependency failures.
- F20–F23 exercise each distinct outcome class.
- F24–F25 cover retry and access recovery.
- F26–F29 cover integrity, default data flow, consent and diagnostics.
- F30 covers conditional persistence only; quarantine retention is out of scope.
- F31–F33 cover resource and conditional update/freshness behaviour.
- F34–F35 cover shared product semantics with platform-specific access.

## Explicitly not covered in Phase 4

Quarantine, restoration, permanent deletion, quarantine encryption/key lifecycle, uninstall behaviour, URL checking, Pro/activation gates, provider quotas, and provider spend controls are MVP-02/MVP-03 or cross-cutting scope. They must not be inferred from this matrix.

No test execution against a ZeroDeck build is claimed. This is an acceptance-scenario design artifact for later verification.
