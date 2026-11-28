# Phase 5 — MVP-02 Negative, Failure and Recovery Matrix

**Contract:** `ZD-CONTRACT-QUARANTINE-DISPOSITION` v0.1.0-draft  
**Status:** PM-proposed scenarios; no ZeroDeck runtime execution is claimed.

Each row is a distinct scenario. Branches must be tested independently; one successful quarantine operation does not establish restore, delete, retention, or recovery behaviour.

| ID | Scenario / stimulus | Expected product behaviour | Requirement trace | Class |
|---|---|---|---|---|
| QF01 | No completed MVP-01 result exists | No quarantine eligibility is inferred | QUAR-001–002 | Negative |
| QF02 | Result is confirmed threat but policy/threshold is not approved | No assumed automatic quarantine; follow only explicit approved policy | QUAR-001–002 | Policy boundary |
| QF03 | Confirmed-threat result and approved automatic policy apply | Quarantine occurs only if platform permits; actual outcome shown | QUAR-001–002 | Positive control |
| QF04 | Confirmed-threat result but user confirmation is required and user declines | No quarantine action occurs | QUAR-002 | Consent denial |
| QF05 | Result is Suspicious | No automatic permanent deletion; route to review policy | QUAR-003 | Classification |
| QF06 | Result is Could not decide / Could not analyse | No automatic destructive action; expose uncertainty | QUAR-003 | Classification |
| QF07 | Result is No known threat found | Original remains untouched by disposition | QUAR-004 | Negative control |
| QF08 | Quarantine UI record is created but artifact write has not completed | Do not display successful Quarantined state | QUAR-005, 031 | State integrity |
| QF09 | Quarantine copy is written but integrity verification fails | No successful quarantine state; preserve source | QUAR-005, 007, 009 | Integrity failure |
| QF10 | Copy is verified but source remains in place | Report copy-based quarantine and disclose original remains | QUAR-005, 008, 024 | Partial disposition |
| QF11 | Source removal fails after verified copy | Retain quarantine artifact; report original still present and source-removal failure | QUAR-008–010, 031 | Partial failure |
| QF12 | Source removal is attempted before artifact verification | Block source removal | QUAR-007, 009 | Safety boundary |
| QF13 | Process dies during copy before verification | Reconcile actual partial artifact; no success claim; source preserved where possible | QUAR-005, 009, 033 | Interruption |
| QF14 | Process dies after copy verification but before source disposition | Reconcile both source and artifact; disclose partial state | QUAR-005, 008–009, 033 | Interruption |
| QF15 | Two source files have identical names | Keep their item/artifact identities distinct | QUAR-006 | Identity |
| QF16 | Quarantine operation targets an unrelated or stale item reference | Reject; do not act on a different file | QUAR-006, 010 | Authorization |
| QF17 | User revokes source URI permission before quarantine | Reject or stop operation without bypass | QUAR-010 | Permission failure |
| QF18 | Provider does not support delete | Do not request/claim source deletion; disclose source remains | QUAR-008, 010–011 | Capability boundary |
| QF19 | Provider does not support write or required byte access | Report unsupported quarantine path; do not claim isolation | QUAR-010–012 | Capability boundary |
| QF20 | Selected document is virtual or lacks a normal byte representation | Do not assume ordinary copy/restore semantics | QUAR-011 | Unsupported input |
| QF21 | Source provider is cloud-backed | Distinguish provider-side remote source access from ZeroDeck upload | QUAR-029, 036 | Privacy boundary |
| QF22 | Provider disconnects or removable storage disappears mid-operation | Preserve record and report failure/recovery-required state | QUAR-010, 012, 033 | Dependency failure |
| QF23 | Quarantined artifact is selected for preview/open | Do not execute or auto-open content | QUAR-013 | Security control |
| QF24 | Restore is requested without a fresh scan | Require fresh MVP-01 analysis; do not restore | QUAR-014 | Restore gate |
| QF25 | Fresh scan is Threat found | Restore remains blocked under policy | QUAR-014 | Restore eligibility |
| QF26 | Fresh scan is Suspicious or inconclusive | Do not treat as restore clearance | QUAR-014 | Restore eligibility |
| QF27 | Fresh scan is interrupted or engine unavailable | Do not report restore complete | QUAR-014, 018 | Dependency failure |
| QF28 | Fresh scan meets approved restore policy but user cancels confirmation | Keep artifact quarantined | QUAR-015 | Consent denial |
| QF29 | Restore destination already contains another file | Do not overwrite; present conflict outcome | QUAR-017 | Boundary |
| QF30 | Restore destination is unavailable or permission is revoked | Restore fails safely; quarantine artifact/record retained where possible | QUAR-010, 018 | Permission failure |
| QF31 | Restored bytes differ from recorded integrity identity | Do not report successful restore; preserve quarantine copy where possible | QUAR-016, 018 | Integrity failure |
| QF32 | Restore fails during partial write or process death | Reconcile actual destination and artifact; no false restored state | QUAR-018, 033 | Interruption |
| QF33 | User requests permanent delete and cancels confirmation | No deletion occurs | QUAR-019 | Consent denial |
| QF34 | User confirms deletion of one item while another item is selected | Delete only the specifically confirmed item | QUAR-006, 019 | Identity |
| QF35 | Provider rejects permanent deletion | Report failure; retain record and actual artifact state | QUAR-020, 031, 037 | Failure |
| QF36 | Provider reports deletion success but does not guarantee secure erasure | Report provider deletion only; no forensic-erasure claim | QUAR-020–021 | Claim boundary |
| QF37 | Delete operation outcome is indeterminate after interruption | Mark pending/recovery-required; do not claim success | QUAR-020, 031, 033 | Interruption |
| QF38 | Proposed 30-day retention value is present but no owner policy approves it | Do not treat 30 days as effective policy | QUAR-022 | Policy boundary |
| QF39 | Item reaches expiry but purge fails | Retain accurate pending/failed record; do not claim deletion | QUAR-022–023, 037 | Cleanup failure |
| QF40 | Item reaches expiry and purge succeeds | Record actual purge result under approved policy | QUAR-022–023, 037 | Positive control |
| QF41 | User is about to rely on quarantine as the only copy | Disclose source, retention, restore, uninstall and key-loss consequences known for that platform | QUAR-024–026 | Disclosure |
| QF42 | App is uninstalled while quarantine uses Android app-specific storage | Apply documented lifecycle; do not claim data survives uninstall | QUAR-025 | Lifecycle |
| QF43 | App data is cleared or device is reset | Apply documented consequences; no false recoverability claim | QUAR-025–026 | Lifecycle |
| QF44 | Backup restores metadata but not artifact bytes or usable key | Mark item unavailable/recovery-required; do not imply recoverability | QUAR-026, 028, 031 | Backup mismatch |
| QF45 | Encryption is selected but device lacks the claimed hardware-backed key capability | Do not claim StrongBox/TEE protection that was not established | QUAR-027 | Capability boundary |
| QF46 | Encryption key is invalidated or unavailable | Do not claim decrypt/restore; report inaccessible/recovery-required state | QUAR-028 | Key failure |
| QF47 | A remote upload is attempted without separate owner approval and explicit consent | Do not transmit quarantine content | QUAR-029 | Privacy boundary |
| QF48 | Diagnostic event includes a file path/name or content fragment not needed for operation | Apply minimization/redaction policy; no unnecessary content disclosure | QUAR-030 | Privacy |
| QF49 | Two quarantine requests for same item arrive concurrently | Prevent duplicate artifacts and conflicting source operations | QUAR-032 | Concurrency |
| QF50 | Restore is retried after it already succeeded | Return established outcome or safely reject duplicate; do not create duplicate file | QUAR-032 | Idempotency |
| QF51 | Storage becomes full during quarantine write | Stop safely; preserve existing artifacts and source where possible; report failure | QUAR-034 | Resource failure |
| QF52 | New item exceeds approved file-size/capacity limit | Reject with specific limit; no unbounded operation | QUAR-034 | Boundary |
| QF53 | Existing quarantined item is present when storage is exhausted | Do not evict/corrupt it to make room for a new item | QUAR-034 | Resource protection |
| QF54 | Web browser has no usable file handle or permission | Mark operation unsupported/denied; do not claim device quarantine | QUAR-010, 035 | Platform boundary |
| QF55 | Browser file handle permission is revoked before restore/delete | Stop operation and explain permission requirement | QUAR-010, 035 | Permission failure |
| QF56 | Web supports only a subset of requested operations | Offer only supported operations and disclose limitations | QUAR-035 | Compatibility |
| QF57 | User asks for general scan history/search across all past scans | Do not introduce standalone scan-history capability under MVP-02 | QUAR-038 | Scope boundary |
| QF58 | A disposition operation fails or partially succeeds | Retain the minimal audit outcome under the approved policy | QUAR-031, 037 | Auditability |

## Coverage notes

- QF01–QF07 cover classification and eligibility branches.
- QF08–QF23 cover quarantine commit, source disposition, identity, permissions, provider support and non-execution.
- QF24–QF32 cover restore gating, confirmation, integrity, conflicts and recovery.
- QF33–QF37 cover permanent deletion, truthful result semantics and interruption.
- QF38–QF44 cover retention, purge, disclosure, uninstall and backup lifecycle.
- QF45–QF48 cover conditional encryption/key protection and privacy.
- QF49–QF53 cover idempotency, concurrency and resource limits.
- QF54–QF57 cover web capability differences and MVP scope.
- QF58 covers audit outcome retention.

## Explicitly not covered in Phase 5

MVP-01 scan-engine implementation and detection thresholds; MVP-03 URL checking, Pro/activation gates and provider budgets; standalone scan history; automatic/background protection; browser extension; device-wide file management; a specific storage engine, encryption algorithm, key-recovery mechanism or deletion implementation.
