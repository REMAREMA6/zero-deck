# ZeroDeck MVP-02 — Quarantine and File Disposition Product Requirements

**Contract ID:** `ZD-CONTRACT-QUARANTINE-DISPOSITION`  
**Version:** `0.1.0-draft`  
**Capability:** `MVP-02` — Quarantine and file disposition  
**Author / issuer:** ZeroDeck Product Management Agent  
**Lifecycle:** Draft; all normative requirements are PM-proposed, not owner-approved  
**Platforms:** Web and Android; operation availability may differ by platform  
**Scope authority:** Owner-approved MVP scope decision `ZD-SCOPE-001`  
**Canonical source:** This Markdown document; the JSON file is a synchronized Software Rules declared-contract projection.

## 1. Purpose and boundary

This contract defines intended, externally observable product behaviour for managing a file after MVP-01 manual analysis: eligibility for quarantine, verified handling of a quarantined artifact, review, restore, permanent deletion, retention, and failure/recovery. It is technology-independent. It does not select a storage engine, filesystem API, encryption algorithm, key hierarchy, database, backend, browser API, Android API, library, or deployment architecture.

MVP-02 is a distinct capability from MVP-01 analysis. MVP-01 determines and communicates an analysis result; MVP-02 manages a file disposition. This contract references MVP-01 result classes only as inputs to eligibility and restore policy. It does not redefine scan detection criteria or outcomes.

The owner-approved MVP includes MVP-02. It does not approve every behaviour in the source working draft. The owner has not decided whether quarantine is automatic, whether the original is removed, the exact isolation boundary, the retention duration, the encryption design, the key lifecycle, or web operation parity. These remain open.

## 2. Authority and evidence labels

- **Owner-declared:** MVP-02 is included in the first MVP; standalone scan history, automatic/background protection, browser extension, and other excluded capabilities remain outside scope.
- **Source/product-material baseline (not owner-approved):** confirmed threats may be quarantined when permitted and when the operation succeeds; suspicious items go to review; clean items remain untouched; unknown/inconclusive items are rescanned or reviewed; restore requires a fresh scan and confirmation; restored content is checked against its recorded hash; failed deletion retains a record and reports failure; quarantined files are never executed; unrelated user files are not overwritten.
- **Platform contract:** Android SAF grants access to user-selected documents and exposes provider-specific operation capabilities; app-specific files are removed on uninstall; Android Keystore protects key material subject to device/algorithm capabilities. Browser file APIs are permission/handle based and do not imply arbitrary filesystem access.
- **External security guidance:** OWASP recommends bounded file handling, access controls, safe storage boundaries, and established cryptographic storage mechanisms selected against a threat model.
- **PM inference:** explicit state, integrity, idempotency, partial-failure, privacy, lifecycle, and truthful-claim requirements needed to make the product baselines testable.
- **Unknown:** exact confirmed-threat threshold; automatic versus confirmed user action; quarantine storage/isolation mechanism; source removal semantics; hash algorithm/format; retention; encryption/key design; backup/migration/uninstall policy; supported browser/device versions; numeric capacity limits.

No source-derived mockup action is treated as implemented behaviour. The reference quarantine screen's restore/delete actions are explicitly placeholders. No deployed ZeroDeck runtime or quarantine service was tested in this phase.

## 3. Normative language and state vocabulary

MUST/MUST NOT statements are binding only within this PM-proposed draft if the owner approves them. Approval of the Phase 5 plan authorizes authoring; it does not approve the requirements below.

Product state terms used in this draft:

- **Quarantine artifact:** the file content held within the product's documented quarantine boundary. Its storage location and isolation mechanism remain design decisions.
- **Quarantined:** a verified artifact exists in that boundary, required integrity checks passed, and the actual source-file disposition is recorded. This label alone does not mean the original was removed.
- **Source disposition:** whether the selected original remains in place, was copied, moved, or was successfully removed.
- **Restore:** copying or returning a quarantined artifact to a user-accessible destination after the required fresh analysis, confirmation, and integrity checks.
- **Permanent deletion:** a requested delete operation against the quarantine artifact. It is distinct from retention expiry, source deletion, and secure erasure.
- **Recovery-required:** the actual artifact/source state cannot yet be reconciled to a completed terminal state.

## 4. Product workflow

1. MVP-01 produces an analysis result for a user-selected file. MVP-02 receives the result and its file identity/provenance; it does not invent or upgrade the result.
2. The system evaluates the result against the documented quarantine eligibility policy and the active platform's actual permissions/capabilities.
3. Where quarantine is authorized, the system performs the documented isolation operation and verifies the resulting artifact before declaring quarantine complete.
4. The system records source disposition separately. A verified copy does not imply that the original was moved or deleted.
5. Suspicious/inconclusive items follow review policy; clean items remain untouched.
6. Restore requires a fresh MVP-01 analysis, user confirmation, destination conflict handling, and integrity verification.
7. Permanent deletion requires item-specific confirmation and truthful reporting of the platform/provider result.
8. Retention expiry, interruption, storage exhaustion, key unavailability, and provider failure follow explicit states and recovery paths.

## 5. Canonical requirements

### Requirement ZD-QUAR-001 — Apply a documented quarantine eligibility policy

**Normative statement:** The system MUST apply an explicit, versioned quarantine-eligibility policy to the result of a completed MVP-01 analysis and MUST communicate whether the item is eligible, ineligible, or awaiting review before performing a disposition operation.

**Type:** business-rule | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, data, configuration, interface
**Platforms:** web, android
**Subject:** Quarantine eligibility
**Rationale:** The existing working draft distinguishes confirmed threats, suspicious/inconclusive items and clean files, but the confirmed-threat threshold and automatic-versus-confirmation trigger remain unresolved.
**Basis:** source-evidence — The working product material and open-properties register describe confirmed-threat quarantine, suspicious review and clean-file non-interference as provisional baselines. [EVD-SRC-QUAR-001, EVD-PM-QUAR-RESEARCH-001]; pm-inference — A published eligibility policy is needed so a scan label alone cannot silently authorize destructive file handling. [EVD-SRC-QUAR-003]

**Acceptance criteria:**
- ZD-QUAR-001-AC-01 — Given A completed scan result exists and the eligibility policy is available, when The system evaluates the item for quarantine, then The system exposes the policy outcome and does not perform a disposition outside the policy. Verification: automated-test.
- ZD-QUAR-001-AC-02 — Given The scan result is suspicious, inconclusive or otherwise not eligible for destructive handling, when The system evaluates quarantine eligibility, then The item is marked for review or another explicitly permitted non-destructive path; it is not silently treated as confirmed malware. Verification: automated-test.

### Requirement ZD-QUAR-002 — Keep automatic quarantine policy explicit

**Normative statement:** The system MUST perform automatic quarantine only when an owner-approved policy explicitly authorizes automatic handling for the applicable confirmed-threat class and the active platform permits the operation; otherwise it MUST require the policy-defined user action or leave the item unchanged.

**Type:** business-rule | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, authorization-permissions, configuration, security-controls
**Platforms:** web, android
**Subject:** Automatic quarantine trigger
**Rationale:** The source working draft describes automatic quarantine when permitted, but the owner has not approved its trigger or confirmed-threat threshold.
**Basis:** source-evidence — The Software Rules open-properties register labels automatic quarantine of confirmed malware as a documented working-draft baseline while leaving threshold and permission semantics open. [EVD-SRC-QUAR-001]; pm-inference — An explicit policy gate prevents a provisional draft statement from becoming an assumed owner decision. [EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-002-AC-01 — Given No owner-approved automatic-quarantine policy applies, when A confirmed-threat result is produced, then The system does not infer authorization for automatic quarantine from the draft baseline alone. Verification: inspection.
- ZD-QUAR-002-AC-02 — Given An owner-approved automatic-quarantine policy applies and the platform permits the operation, when A qualifying confirmed-threat result is produced, then The system follows that policy and reports the actual operation outcome. Verification: operational-test.

### Requirement ZD-QUAR-003 — Keep suspicious and inconclusive items non-destructive

**Normative statement:** The system MUST NOT automatically delete, overwrite, or permanently dispose of a suspicious, inconclusive, unsupported, or unanalysed item; any review or quarantine action for such an item MUST follow an explicit policy and preserve a recoverable path where the platform permits one.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, security-controls, errors-recovery, interface
**Platforms:** web, android
**Subject:** Suspicious and inconclusive disposition
**Rationale:** A false positive or incomplete analysis must not trap or destroy a legitimate file.
**Basis:** source-evidence — The capability inventory and working-draft baselines route suspicious items to review and unknown/inconclusive items to rescan or review. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-002]

**Acceptance criteria:**
- ZD-QUAR-003-AC-01 — Given The analysis result is suspicious or inconclusive, when A disposition decision is evaluated, then No automatic permanent deletion or irreversible disposition occurs. Verification: automated-test.
- ZD-QUAR-003-AC-02 — Given The item cannot be analysed reliably, when The user opens its available actions, then The system identifies the uncertainty and offers only policy-permitted actions. Verification: manual-test.

### Requirement ZD-QUAR-004 — Leave clean items untouched

**Normative statement:** When an MVP-01 result is No known threat found, the system MUST NOT quarantine, move, rename, overwrite, or delete the selected original as a consequence of that result.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, security-controls
**Platforms:** web, android
**Subject:** No-known-threat disposition
**Rationale:** A no-match result is not a reason to alter a user's file and must not be presented as a guarantee of safety.
**Basis:** source-evidence — The working-draft quarantine baseline says clean files remain untouched; MVP-01 contract keeps no-known-threat distinct from safety. [EVD-SRC-QUAR-001, EVD-SRC-FILE-001]

**Acceptance criteria:**
- ZD-QUAR-004-AC-01 — Given A completed analysis returns No known threat found, when The system evaluates disposition, then The original file remains untouched by quarantine/disposition processing. Verification: automated-test.

### Requirement ZD-QUAR-005 — Define quarantine as a verified artifact state

**Normative statement:** The system MUST NOT report an item as Quarantined until the quarantine artifact has been successfully created in the documented quarantine boundary, its required integrity checks have passed, and the source-file disposition status has been recorded separately.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, data, persistence, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** Quarantine completion state
**Rationale:** A database label or UI list entry alone does not isolate a file; copying, moving and deleting the source are separate operations.
**Basis:** source-evidence — The research report says Quarantined must represent a real verified storage state and requires explicit states for copy/write, verification and source disposition. [EVD-PM-QUAR-RESEARCH-001]; platform-contract — SAF exposes provider-mediated document operations rather than a universal atomic move contract. [EVD-DOC-ANDROID-SAF-001]

**Acceptance criteria:**
- ZD-QUAR-005-AC-01 — Given The quarantine artifact has not been fully written or verified, when The system attempts to update the item state, then The item is not shown as successfully Quarantined. Verification: automated-test.
- ZD-QUAR-005-AC-02 — Given The artifact is written and verified but the original remains in place, when The system reports the quarantine outcome, then The system states that the quarantined copy exists and separately discloses that the source remains in its original location. Verification: manual-test.

### Requirement ZD-QUAR-006 — Preserve source and quarantine artifact identity

**Normative statement:** The system MUST maintain an unambiguous association between each quarantine record, the source item selected by the user, the quarantined artifact, and every subsequent restore or deletion operation.

**Type:** data | **Priority:** P0 | **Status:** PM-proposed
**Facets:** data, persistence, behavior, security-controls
**Platforms:** web, android
**Subject:** File and artifact identity
**Rationale:** Ambiguous identity risks acting on the wrong file, confusing a copy with its source, or restoring/deleting an unrelated item.
**Basis:** source-evidence — The MVP-QUAR-001 scenario requires original and quarantined artifact identity; the open-properties register calls for a quarantine metadata/data model. [EVD-SRC-QUAR-003, EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-006-AC-01 — Given Two different source items are quarantined, when Their records are created, then Each record remains associated with the correct source and artifact identity. Verification: automated-test.
- ZD-QUAR-006-AC-02 — Given A restore or delete request is made for one record, when The operation resolves its target, then Only the artifact associated with that record is targeted. Verification: automated-test.

### Requirement ZD-QUAR-007 — Verify content integrity before quarantine completion

**Normative statement:** The system MUST verify that the quarantined artifact matches the selected source content under a documented integrity method before it reports successful quarantine or proceeds with any source-removal step.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** data, behavior, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** Quarantine integrity verification
**Rationale:** Partial or altered copies must not be treated as a valid quarantine artifact; SHA-256 is a working-draft direction, not a finalized algorithm decision.
**Basis:** source-evidence — The working-draft baseline requires integrity verification and a recorded hash, while the open-properties register says SHA-256 and exact encoding/use remain to be confirmed. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-007-AC-01 — Given A quarantine copy is created, when Integrity verification runs, then A mismatch or unavailable verification prevents a successful quarantine state and is reported. Verification: automated-test.
- ZD-QUAR-007-AC-02 — Given The selected integrity method is documented and verification passes, when The quarantine operation reaches its commit point, then The record stores the identity of the verified artifact and the verification result. Verification: inspection.

### Requirement ZD-QUAR-008 — Separate quarantine copy creation from source disposition

**Normative statement:** The system MUST record whether the original source was left in place, copied, moved, or successfully removed, and MUST NOT describe a copy as a move or a quarantine copy as proof that the original was removed.

**Type:** data | **Priority:** P0 | **Status:** PM-proposed
**Facets:** data, behavior, interface, business-rules
**Platforms:** web, android
**Subject:** Source disposition semantics
**Rationale:** The platform may permit copying while refusing deletion; users need to know whether the original still exists.
**Basis:** source-evidence — The research report explicitly distinguishes copying into app-private quarantine from moving or deleting the original and requires recording the source disposition. [EVD-PM-QUAR-RESEARCH-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-008-AC-01 — Given A quarantine copy succeeds but source deletion is unsupported or fails, when The operation completes its available steps, then The item is reported as a verified quarantined copy with the original still present, not as moved. Verification: manual-test.
- ZD-QUAR-008-AC-02 — Given The source is successfully removed after a verified quarantine artifact exists, when The operation status is published, then The source-removal outcome is recorded separately from quarantine-copy verification. Verification: automated-test.

### Requirement ZD-QUAR-009 — Do not remove the source before verified quarantine

**Normative statement:** If the applicable disposition policy requires removing the source after quarantine, the system MUST NOT attempt source removal until the quarantine artifact is complete and its required integrity verification has succeeded.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** Safe operation ordering
**Rationale:** A crash or failure between source deletion and quarantine-copy completion could cause irreversible data loss.
**Basis:** pm-inference — The source research identifies the copy-then-delete crash window as a data-loss hazard and requires a verified commit before source disposition. [EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-009-AC-01 — Given The quarantine artifact is incomplete or integrity verification failed, when A source-removal step would otherwise run, then The original source is not removed. Verification: automated-test.
- ZD-QUAR-009-AC-02 — Given The quarantine artifact is complete and verified, when A policy-authorized source-removal step begins, then Source removal occurs only after the verification point. Verification: inspection.

### Requirement ZD-QUAR-010 — Respect active file and provider permissions

**Normative statement:** The system MUST perform file reads, writes, deletes, and other disposition operations only within the permissions and capabilities actually granted by the active platform and source provider, and MUST stop or reject an operation when the required access is absent or revoked.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** authorization-permissions, behavior, security-controls, errors-recovery, integrations
**Platforms:** web, android
**Subject:** File permission boundary
**Rationale:** A selected URI does not confer unrestricted filesystem access, and permissions may expire or be revoked.
**Basis:** platform-contract — Android SAF mediates user-selected document access and exposes provider-supported operations and URI grants. [EVD-DOC-ANDROID-SAF-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-010-AC-01 — Given The user has not granted the permission required for an operation, when The system attempts that operation, then The operation is denied without bypassing platform controls. Verification: automated-test.
- ZD-QUAR-010-AC-02 — Given A previously granted URI permission is revoked or unavailable, when A later restore/delete operation is requested, then The operation fails safely and its record remains available for recovery or explanation. Verification: operational-test.

### Requirement ZD-QUAR-011 — Check provider support before requesting an operation

**Normative statement:** On platforms that expose per-item operation capabilities, the system MUST verify that the selected source or destination supports the required operation before requesting it and MUST handle unsupported operations without claiming success.

**Type:** compatibility | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, authorization-permissions, integrations, errors-recovery
**Platforms:** web, android
**Subject:** Provider capability checks
**Rationale:** Android document providers advertise operations such as write and delete; virtual documents may not expose ordinary file bytes.
**Basis:** platform-contract — Android SAF document flags determine supported read/write/delete operations; SAF also supports virtual documents. [EVD-DOC-ANDROID-SAF-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-011-AC-01 — Given A provider does not advertise the required delete or write capability, when The system evaluates a requested operation, then It does not issue an unsupported operation and explains the limitation. Verification: automated-test.
- ZD-QUAR-011-AC-02 — Given The selected item is a virtual document or has no usable byte representation, when A byte-copy quarantine path is requested, then The system reports unsupported or uses only a separately documented supported path. Verification: manual-test.

### Requirement ZD-QUAR-012 — Do not claim universal atomic move behaviour

**Normative statement:** The system MUST treat quarantine and restore as potentially multi-step operations and MUST expose partial or indeterminate outcomes when the platform/provider does not guarantee an atomic operation.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, errors-recovery, integrations, persistence
**Platforms:** web, android
**Subject:** Multi-step operation atomicity
**Rationale:** SAF is provider-mediated and does not define a universal atomic move across every provider.
**Basis:** platform-contract — The ZeroDeck source extraction records the absence of a universal SAF atomic-move contract as a bounded inference. [EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-012-AC-01 — Given A multi-step operation fails after one side effect has succeeded, when The system reconciles the operation state, then It reports partial/indeterminate state and does not claim an all-or-nothing success. Verification: operational-test.

### Requirement ZD-QUAR-013 — Keep quarantined content from normal execution

**Normative statement:** The system MUST NOT execute, launch, preview through an active-content handler, or automatically open quarantined content as part of quarantine, review, restore, or deletion processing.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, behavior, authorization-permissions
**Platforms:** web, android
**Subject:** Quarantined content handling
**Rationale:** Quarantined content must not be activated by the product while it is being contained or managed.
**Basis:** source-evidence — The owner working-draft material explicitly states quarantined files are never executed. [EVD-SRC-QUAR-001, EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-013-AC-01 — Given A quarantined item is listed or inspected, when The system renders its details, then The system does not execute or automatically open the file content. Verification: inspection.
- ZD-QUAR-013-AC-02 — Given A restore or deletion operation is initiated, when The system processes the quarantined artifact, then The operation does not launch the content as part of processing. Verification: automated-test.

### Requirement ZD-QUAR-014 — Require fresh analysis before restore

**Normative statement:** The system MUST require a fresh MVP-01 security analysis before restoring a quarantined item, and MUST NOT offer a completed restore when the fresh analysis is unavailable, incomplete, interrupted, or outside the documented freshness policy.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** business-rules, behavior, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** Restore eligibility
**Rationale:** The working-draft baseline and source-derived intent both place a fresh scan before restore; exact acceptable result classes and freshness window remain open.
**Basis:** source-evidence — The source-derived UI rule records an intended fresh-scan restore guard; OPEN-PROPERTIES repeats fresh analysis as a baseline and leaves timing/criteria open. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-005]

**Acceptance criteria:**
- ZD-QUAR-014-AC-01 — Given A quarantined item has no fresh analysis result, when The user requests restore, then The system requires a fresh analysis and does not restore the item yet. Verification: automated-test.
- ZD-QUAR-014-AC-02 — Given Fresh analysis is interrupted or inconclusive, when The user requests restore, then The restore is blocked or remains pending review; it is not reported as completed. Verification: automated-test.

### Requirement ZD-QUAR-015 — Require user confirmation for restore

**Normative statement:** The system MUST obtain an explicit user confirmation immediately before restoring a quarantined item to a user-accessible location.

**Type:** usability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** interface, behavior, business-rules
**Platforms:** web, android
**Subject:** Restore confirmation
**Rationale:** Restore changes the item's exposure and can reintroduce a potentially harmful file to normal user access.
**Basis:** source-evidence — The working-draft baseline and source UI-derived intent require confirmation before restore. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-005]

**Acceptance criteria:**
- ZD-QUAR-015-AC-01 — Given The item meets the documented restore eligibility policy, when The user initiates restore, then The system presents a confirmation and does not restore until the user confirms. Verification: manual-test.
- ZD-QUAR-015-AC-02 — Given The user cancels the restore confirmation, when The confirmation is dismissed, then The quarantined artifact remains quarantined and unchanged. Verification: automated-test.

### Requirement ZD-QUAR-016 — Verify restored content integrity

**Normative statement:** Before reporting a restore as successful, the system MUST verify the restored content against the integrity identity recorded for the quarantined artifact using the documented integrity method.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** data, behavior, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** Restore integrity
**Rationale:** A restore must not silently produce altered or incomplete content; the working draft requires hash verification but the algorithm remains open.
**Basis:** source-evidence — The open-properties register states that restored content is checked against its recorded hash and leaves the algorithm/format unresolved. [EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-016-AC-01 — Given The restored content does not match the recorded integrity identity, when The system verifies the restore, then The system does not report successful restore and preserves the quarantined artifact where possible. Verification: automated-test.
- ZD-QUAR-016-AC-02 — Given The restored content matches the recorded integrity identity, when The restore reaches completion, then The system records the successful verification and restore outcome. Verification: inspection.

### Requirement ZD-QUAR-017 — Prevent restore from overwriting unrelated files

**Normative statement:** The system MUST NOT overwrite an existing destination file during restore unless the user has explicitly selected and confirmed a separately documented replacement action for that exact destination.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, business-rules, authorization-permissions, errors-recovery
**Platforms:** web, android
**Subject:** Restore destination conflict
**Rationale:** A file may have been created at the original path after quarantine; blind restoration could destroy unrelated user data.
**Basis:** source-evidence — The working-draft baseline prohibits overwriting unrelated user files; the research report identifies restore destination conflicts as a required branch. [EVD-SRC-QUAR-001, EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-017-AC-01 — Given A file already exists at the intended restore destination, when Restore is requested, then The system does not overwrite it and offers a non-destructive conflict outcome. Verification: automated-test.
- ZD-QUAR-017-AC-02 — Given A replacement action is separately supported and documented, when The user selects and confirms replacement for the exact destination, then Only the confirmed destination is affected and the outcome is reported. Verification: manual-test.

### Requirement ZD-QUAR-018 — Preserve quarantine state after restore failure

**Normative statement:** If restore fails or is interrupted before successful completion, the system MUST retain the quarantined artifact and its record whenever the platform/storage state permits, and MUST NOT mark the item as restored.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, persistence, errors-recovery, data
**Platforms:** web, android
**Subject:** Restore failure recovery
**Rationale:** A failed restore must not lose the only recoverable quarantine copy or misstate its location.
**Basis:** pm-inference — The failure matrix and platform evidence require explicit recovery for partial writes, provider failure and process interruption. [EVD-SRC-QUAR-003, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-018-AC-01 — Given Restore fails during writing or verification, when The operation terminates, then The item remains recorded as quarantined, failed, or recovery-required according to its actual state; it is not marked restored. Verification: operational-test.

### Requirement ZD-QUAR-019 — Require confirmation for permanent deletion

**Normative statement:** The system MUST require an explicit, item-specific user confirmation before permanently deleting a quarantined artifact.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** interface, behavior, business-rules, authorization-permissions
**Platforms:** web, android
**Subject:** Permanent deletion confirmation
**Rationale:** Permanent deletion is destructive and must not be triggered by an ambiguous or accidental action.
**Basis:** source-evidence — The source-derived UI interaction pattern shows destructive confirmation for permanent deletion; the product working draft includes permanent deletion as a user action. [EVD-SRC-QUAR-005, EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-019-AC-01 — Given A quarantined artifact is selected for permanent deletion, when The user invokes delete, then The system presents a clear item-specific destructive confirmation before deletion. Verification: manual-test.
- ZD-QUAR-019-AC-02 — Given The user cancels the confirmation, when The confirmation is dismissed, then The artifact and record remain unchanged. Verification: automated-test.

### Requirement ZD-QUAR-020 — Report deletion according to actual provider outcome

**Normative statement:** The system MUST report permanent deletion as successful only when the targeted deletion operation has returned a successful outcome under the documented platform/provider contract; failures and indeterminate results MUST remain distinguishable.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, data, errors-recovery, interface
**Platforms:** web, android
**Subject:** Deletion result semantics
**Rationale:** A UI removal or confirmation dialog does not prove that underlying file bytes were deleted.
**Basis:** source-evidence — The open-properties register requires failed deletion to retain its record and report failure; source UI evidence explicitly says a placeholder action is not real deletion. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-005]; platform-contract — SAF deletion depends on provider capability and provider operation outcome. [EVD-DOC-ANDROID-SAF-001]

**Acceptance criteria:**
- ZD-QUAR-020-AC-01 — Given The provider rejects deletion or reports failure, when The deletion request ends, then The system reports failure and retains the quarantine record with its actual state. Verification: automated-test.
- ZD-QUAR-020-AC-02 — Given The provider reports a successful delete operation, when The deletion request ends, then The system records the provider-confirmed outcome without claiming secure erasure unless separately guaranteed. Verification: operational-test.

### Requirement ZD-QUAR-021 — Do not promise secure or forensic erasure

**Normative statement:** The system MUST NOT describe a delete operation as secure erasure, forensic irrecoverability, or guaranteed removal from every storage layer unless the selected platform/provider contract and verified implementation establish that guarantee.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, business-rules, interface, data
**Platforms:** web, android
**Subject:** Deletion assurance wording
**Rationale:** Provider deletion and ordinary file deletion do not establish that all underlying copies, snapshots, backups or flash-storage remnants are irrecoverable.
**Basis:** pm-inference — The reviewed Android and OWASP sources do not establish a universal secure-erasure guarantee for the supported storage providers; the product must avoid claims beyond the evidence. [EVD-DOC-ANDROID-SAF-001, EVD-DOC-OWASP-002]

**Acceptance criteria:**
- ZD-QUAR-021-AC-01 — Given A delete action completes on a provider that does not guarantee secure erasure, when The system communicates the outcome, then The wording describes the operation as deleted/removed according to provider semantics, not securely erased or irrecoverable. Verification: inspection.

### Requirement ZD-QUAR-022 — Define retention policy before release

**Normative statement:** Before MVP-02 release, the product MUST define and disclose the effective quarantine-retention period, its start point, expiry behaviour, any user-configurable choices, and the treatment of items that cannot be purged; the system MUST apply only that documented policy.

**Type:** policy | **Priority:** P0 | **Status:** PM-proposed
**Facets:** business-rules, configuration, persistence, interface, security-controls
**Platforms:** web, android
**Subject:** Quarantine retention policy
**Rationale:** The 30-day period is explicitly proposed rather than approved; retention affects data loss, device capacity and user expectations.
**Basis:** source-evidence — The open-properties register marks 30-day default retention and configurability as proposed, not final. [EVD-SRC-QUAR-001, EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-022-AC-01 — Given No owner-approved retention policy has been recorded, when The product is prepared for release, then The release gate remains unmet and no default duration is silently selected. Verification: inspection.
- ZD-QUAR-022-AC-02 — Given A retention policy is approved and effective, when A quarantined item approaches or reaches its expiry condition, then The system applies the documented timing and outcome and communicates the result. Verification: operational-test.

### Requirement ZD-QUAR-023 — Handle expiry without silent data loss

**Normative statement:** When an approved retention policy causes a quarantined item to expire, the system MUST apply the documented expiry action, preserve an accurate outcome record for the required period, and MUST NOT silently discard an item when the purge operation fails.

**Type:** reliability | **Priority:** P1 | **Status:** PM-proposed
**Facets:** persistence, behavior, errors-recovery, data, configuration
**Platforms:** web, android
**Subject:** Retention expiry and purge
**Rationale:** Expiry and physical deletion are distinct; cleanup can fail because of permissions, provider availability or storage state.
**Basis:** pm-inference — The open-properties register identifies automatic expiry, purge guarantees and notifications as unresolved; truthful failure handling is required. [EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-023-AC-01 — Given An item reaches an approved expiry point but purge fails, when The expiry process runs, then The item is marked expiry/purge failed or pending and is not reported as deleted. Verification: operational-test.
- ZD-QUAR-023-AC-02 — Given An item expires and purge succeeds, when The expiry process completes, then The record reflects the actual purge outcome and any required retained audit metadata. Verification: operational-test.

### Requirement ZD-QUAR-024 — Explain retention and destructive consequences before reliance

**Normative statement:** Before a user relies on quarantine as the only available copy or confirms a destructive action, the system MUST disclose the applicable retention, source-file, restore, deletion, and data-loss consequences that are known for that platform and operation.

**Type:** usability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** interface, business-rules, data, security-controls
**Platforms:** web, android
**Subject:** User disclosure
**Rationale:** Users must understand whether the original remains, what restore requires, and whether uninstall, data clear or key loss can remove access.
**Basis:** source-evidence — The research report and open-properties register require clear consequences for uninstall, key loss, source disposition and restore. [EVD-PM-QUAR-RESEARCH-001, EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-024-AC-01 — Given The source remains in place after a copy-based quarantine, when The user views the completed operation, then The interface states that the original remains at its source location. Verification: manual-test.
- ZD-QUAR-024-AC-02 — Given The user is about to confirm deletion or a policy-driven expiry, when The confirmation is shown, then The applicable irreversible or unrecoverable consequences are disclosed before confirmation. Verification: manual-test.

### Requirement ZD-QUAR-025 — Disclose app uninstall and app-data-clear consequences

**Normative statement:** Before release, the product MUST define and disclose what happens to quarantined content and its metadata when the application is uninstalled, app data is cleared, the device is reset, or app-specific storage becomes unavailable.

**Type:** policy | **Priority:** P0 | **Status:** PM-proposed
**Facets:** persistence, security-controls, interface, errors-recovery, data
**Platforms:** web, android
**Subject:** Uninstall and data-clear lifecycle
**Rationale:** Android removes app-specific files on uninstall; this directly affects whether the user can rely on quarantine as retained storage.
**Basis:** platform-contract — Android documents that app-specific files are removed when the application is uninstalled. [EVD-DOC-ANDROID-APPSTORAGE-001]; source-evidence — The open-properties register requires explicit uninstall consequences and says the actual lifecycle remains to be specified and tested. [EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-025-AC-01 — Given Quarantined content is stored in app-specific storage, when The product describes its lifecycle, then The uninstall/data-clear consequences are stated without implying post-uninstall retention. Verification: inspection.
- ZD-QUAR-025-AC-02 — Given The product has not established the lifecycle for an applicable platform, when A release candidate is reviewed, then The release gate remains unmet rather than assuming the data survives. Verification: inspection.

### Requirement ZD-QUAR-026 — Define backup, restore and device-migration treatment

**Normative statement:** Before release, the product MUST define whether quarantined content, encryption keys, and quarantine metadata are included in backup, device transfer, synchronization, or restore operations, and MUST disclose any mismatch that could make restored metadata refer to unavailable or undecryptable content.

**Type:** policy | **Priority:** P0 | **Status:** PM-proposed
**Facets:** persistence, data, security-controls, configuration, errors-recovery
**Platforms:** web, android
**Subject:** Backup and migration lifecycle
**Rationale:** Backing up ciphertext without usable keys, or restoring metadata without its artifact, can create inaccessible or misleading quarantine records.
**Basis:** source-evidence — The open-properties register lists backup/restore, device migration and key-loss consequences as unresolved. [EVD-SRC-QUAR-001]; pm-inference — The system must define the relation between artifact, key and metadata to avoid false recoverability claims. [EVD-DOC-ANDROID-003]

**Acceptance criteria:**
- ZD-QUAR-026-AC-01 — Given Backup or device migration is available or enabled for relevant data, when The product defines its backup policy, then The policy separately accounts for quarantine bytes, metadata and keys and discloses what is not recoverable. Verification: inspection.

### Requirement ZD-QUAR-027 — Protect encryption keys when encrypted quarantine is used

**Normative statement:** If the approved quarantine design encrypts stored file content, the system MUST protect the required key material using an established platform-appropriate key-protection mechanism and MUST NOT store recoverable plaintext key material alongside the quarantined content.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, persistence, configuration, errors-recovery
**Platforms:** web, android
**Subject:** Conditional encryption key protection
**Condition:** The approved quarantine design encrypts stored file content.
**Rationale:** The working-draft baseline proposes encrypted quarantine and Android Keystore protection, but encryption requirement, algorithm and key design remain open.
**Basis:** platform-contract — Android Keystore can protect non-exportable key material and perform key operations in a system process; hardware backing is device/algorithm dependent. [EVD-DOC-ANDROID-KEYSTORE-001, EVD-SRC-QUAR-004]; pm-inference — Use mature platform mechanisms rather than inventing key protection; do not infer that Keystore alone defines the file-encryption design. [EVD-DOC-OWASP-CRYPTO-001]

**Acceptance criteria:**
- ZD-QUAR-027-AC-01 — Given The approved design uses encrypted quarantine, when A key is created or used, then The implementation uses the approved platform key-protection mechanism and does not place recoverable plaintext key material beside the artifact. Verification: inspection.
- ZD-QUAR-027-AC-02 — Given The device does not support a stated hardware-backed security level, when The encryption design is evaluated, then The product does not claim StrongBox/TEE protection that the device has not established. Verification: operational-test.

### Requirement ZD-QUAR-028 — Handle unavailable or invalid encryption keys

**Normative statement:** If encrypted quarantine is used and a required key becomes unavailable, invalidated, or unusable, the system MUST report the affected item as inaccessible or recovery-required and MUST NOT claim that it can restore or decrypt the item.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, errors-recovery, persistence, data
**Platforms:** web, android
**Subject:** undefined
**Condition:** The approved quarantine design encrypts stored file content.
**Rationale:** A key-loss path can make the only quarantined copy unrecoverable; a success claim would mislead users.
**Basis:** source-evidence — The product research identifies key loss and device migration as unresolved lifecycle cases. [EVD-PM-QUAR-RESEARCH-001, EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-028-AC-01 — Given Encrypted quarantine content exists but its required key is unavailable, when The user requests restore or inspection, then The system reports that the item is inaccessible and does not claim a successful decrypt/restore. Verification: operational-test.

### Requirement ZD-QUAR-029 — Prevent unapproved cloud transfer of quarantined content

**Normative statement:** By default, the system MUST keep quarantined file content on the user's device and MUST NOT upload that content to ZeroDeck services, third-party services, or remote storage unless a separate owner-approved capability and explicit user consent authorize the specific transfer.

**Type:** privacy | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, data, integrations, interface, configuration
**Platforms:** web, android
**Subject:** Quarantine content data flow
**Rationale:** The working product direction is local-first; suspicious files may contain highly sensitive data, and cloud transfer would change the privacy and operational boundary.
**Basis:** source-evidence — The product working draft and architecture assessment state local/on-device handling and no cloud upload by default; this is not a final implementation decision. [EVD-SRC-QUAR-001, EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-029-AC-01 — Given No separate owner-approved cloud-transfer capability and user consent exist, when A quarantine operation runs while network access is available, then Quarantined file content is not uploaded to ZeroDeck or a third party. Verification: inspection.
- ZD-QUAR-029-AC-02 — Given A future cloud-transfer capability has been separately approved and consented to, when A user initiates that transfer, then Only the disclosed data and recipient are used for the approved purpose. Verification: manual-test.

### Requirement ZD-QUAR-030 — Minimize and protect quarantine metadata

**Normative statement:** The system MUST collect and retain only the quarantine metadata needed to identify, verify, display, restore, delete, and audit the item under the approved policy, and MUST protect that metadata from unauthorized access or disclosure.

**Type:** privacy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** data, persistence, security-controls, authorization-permissions
**Platforms:** web, android
**Subject:** Quarantine metadata minimization
**Rationale:** File names, paths, hashes and verdict details may be sensitive; standalone scan history is outside the MVP.
**Basis:** source-evidence — The capability inventory excludes scan history as a standalone capability and the platform assessment recommends minimal local metadata by default. [EVD-SRC-QUAR-002, EVD-PM-QUAR-RESEARCH-001]

**Acceptance criteria:**
- ZD-QUAR-030-AC-01 — Given A quarantine record is created, when The system persists its metadata, then Only fields justified by the documented item lifecycle and audit purpose are stored. Verification: inspection.
- ZD-QUAR-030-AC-02 — Given An unauthorized principal or process attempts to access quarantine metadata, when The access is evaluated, then The metadata is not disclosed beyond the approved access boundary. Verification: operational-test.

### Requirement ZD-QUAR-031 — Maintain an accurate quarantine lifecycle record

**Normative statement:** The system MUST maintain an item-level lifecycle record that distinguishes pending, quarantined, review-required, restore-pending, restored, delete-pending, deleted, failed, expired, and recovery-required states where those states apply, and MUST update the record only when the corresponding operation outcome is established.

**Type:** data | **Priority:** P0 | **Status:** PM-proposed
**Facets:** data, persistence, behavior, errors-recovery, interface
**Platforms:** web, android
**Subject:** Quarantine item state model
**Rationale:** A durable state model is required to prevent the interface and stored metadata from diverging from actual file operations.
**Basis:** source-evidence — The source research requires explicit operation states and auditable quarantine/restore/delete outcomes; the MVP-QUAR scenarios separate the workflows. [EVD-PM-QUAR-RESEARCH-001, EVD-SRC-QUAR-003]

**Acceptance criteria:**
- ZD-QUAR-031-AC-01 — Given A quarantine, restore or delete operation changes its real state, when The lifecycle record is updated, then The record reflects the established operation outcome and does not jump to a success state early. Verification: automated-test.
- ZD-QUAR-031-AC-02 — Given An operation is partial or its outcome cannot be determined, when The system reconciles lifecycle state, then The record uses a partial, failed, or recovery-required state rather than a false terminal success. Verification: operational-test.

### Requirement ZD-QUAR-032 — Make disposition actions idempotent and concurrency-safe

**Normative statement:** The system MUST prevent repeated or concurrent quarantine, restore, and deletion requests for the same item from producing duplicate artifacts, conflicting terminal states, or unintended repeated source-file operations.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, data, persistence, errors-recovery
**Platforms:** web, android
**Subject:** Duplicate and concurrent actions
**Rationale:** Repeated taps, retries and concurrent processes can otherwise create duplicate copies or race destructive actions.
**Basis:** pm-inference — The open-properties register identifies duplicate requests, concurrency and idempotency as unresolved product requirements. [EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-032-AC-01 — Given The same action is submitted repeatedly while an operation is active, when The system processes the requests, then Only one effective operation is applied or duplicates are safely recognized without duplicate side effects. Verification: automated-test.
- ZD-QUAR-032-AC-02 — Given A terminal action is retried after success, when The same logical operation is submitted again, then The system returns the established result or safely rejects the duplicate without repeating destructive effects. Verification: automated-test.

### Requirement ZD-QUAR-033 — Recover truthfully after interruption or process death

**Normative statement:** If a quarantine, restore, deletion, or expiry operation is interrupted by process termination, device restart, storage removal, or loss of provider access, the system MUST reconcile the actual artifact and source state before resuming or reporting a terminal outcome.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, persistence, errors-recovery, background-processing, performance-resource-behavior
**Platforms:** web, android
**Subject:** Interrupted disposition recovery
**Rationale:** A crash may occur between copy, verification, source deletion and record update; recovery must not assume the last step succeeded.
**Basis:** source-evidence — The open-properties register explicitly identifies process death, restart, disk-full, partial writes and provider failure as recovery cases. [EVD-SRC-QUAR-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-033-AC-01 — Given The app process ends during a multi-step disposition operation, when The app or service resumes, then It inspects the actual source/artifact/record state and reports a truthful recovered or recovery-required outcome. Verification: operational-test.
- ZD-QUAR-033-AC-02 — Given The source provider or removable storage is unavailable during recovery, when The operation is reconciled, then The system does not claim completion or remove the record needed to explain the unresolved item. Verification: operational-test.

### Requirement ZD-QUAR-034 — Handle storage exhaustion and resource limits safely

**Normative statement:** The system MUST enforce documented quarantine storage and file-size/resource limits, and MUST fail or defer an operation safely when capacity or resource constraints prevent completion without corrupting existing quarantined items.

**Type:** performance | **Priority:** P0 | **Status:** PM-proposed
**Facets:** performance-resource-behavior, configuration, errors-recovery, persistence
**Platforms:** web, android
**Subject:** Storage capacity and resource limits
**Rationale:** Large files and limited device storage can cause partial writes, device pressure or loss of existing quarantined items; numeric limits remain open.
**Basis:** source-evidence — The open-properties register identifies large-file performance and storage-capacity limits as unresolved. [EVD-SRC-QUAR-001]; external-research — OWASP recommends file-size limits and secure storage boundaries for file handling. [EVD-DOC-OWASP-FILE-001]

**Acceptance criteria:**
- ZD-QUAR-034-AC-01 — Given Insufficient storage is detected before or during quarantine, when A new quarantine operation is attempted, then The operation is rejected or safely stopped and existing quarantine artifacts remain intact. Verification: operational-test.
- ZD-QUAR-034-AC-02 — Given A file exceeds the documented quarantine limit, when The user requests quarantine, then The system reports the applicable limit and does not begin an unbounded operation. Verification: automated-test.

### Requirement ZD-QUAR-035 — Expose platform-specific quarantine capability

**Normative statement:** The system MUST communicate the actual quarantine, restore, and deletion capabilities available on the active platform and MUST NOT claim web and Android can perform identical file operations when their permission and storage boundaries differ.

**Type:** compatibility | **Priority:** P0 | **Status:** PM-proposed
**Facets:** interface, behavior, authorization-permissions, configuration, integrations
**Platforms:** web, android
**Subject:** Cross-platform capability boundary
**Rationale:** Android SAF and browser file APIs expose user-mediated capabilities; neither grants arbitrary access to every file, and the web product cannot promise native Android quarantine semantics.
**Basis:** platform-contract — Android SAF operations depend on provider grants/capabilities; browser File System APIs require user-granted handles/permissions. [EVD-DOC-ANDROID-SAF-001, EVD-DOC-WEB-FS-001]

**Acceptance criteria:**
- ZD-QUAR-035-AC-01 — Given The active platform cannot perform the requested isolation or source operation, when The user requests quarantine, then The system states the unsupported capability and does not imply that the original has been isolated or removed. Verification: manual-test.
- ZD-QUAR-035-AC-02 — Given The platform supports only a subset of the product operation, when The user views available actions, then Only the supported subset is offered and its limitations are disclosed. Verification: manual-test.

### Requirement ZD-QUAR-036 — Keep quarantine local unless transfer is separately authorized

**Normative statement:** The system MUST disclose any remote storage or processing boundary before it is used for quarantine content and MUST NOT treat a source document provider's own cloud hosting as a ZeroDeck upload or imply that the source file is stored locally.

**Type:** privacy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** data, security-controls, integrations, interface
**Platforms:** web, android
**Subject:** Source-provider and ZeroDeck data-flow distinction
**Rationale:** A user-selected document may originate from a cloud provider; ZeroDeck must distinguish source-provider transfer from its own transfer.
**Basis:** source-evidence — The research report explicitly warns that a remote/cloud document provider may serve the file through its own infrastructure. [EVD-PM-QUAR-RESEARCH-001, EVD-SRC-QUAR-004]

**Acceptance criteria:**
- ZD-QUAR-036-AC-01 — Given The selected file originates from a remote document provider, when The system explains its data handling, then It does not imply the source provider is local or claim that no remote source-provider transfer occurred. Verification: inspection.

### Requirement ZD-QUAR-037 — Retain an auditable disposition outcome

**Normative statement:** The system MUST retain a privacy-minimized record of each quarantine, restore, permanent-delete, and expiry outcome for the period required by the approved retention and legal policy, including failures and partial operations.

**Type:** operational | **Priority:** P1 | **Status:** PM-proposed
**Facets:** data, persistence, security-controls, errors-recovery, configuration
**Platforms:** web, android
**Subject:** Disposition audit record
**Rationale:** The working draft requires quarantine, restore and deletion to be auditable, while exact audit fields, access and retention remain unresolved.
**Basis:** source-evidence — The open-properties register records auditable quarantine, restore and deletion as a baseline and leaves record fields/retention open. [EVD-SRC-QUAR-001]

**Acceptance criteria:**
- ZD-QUAR-037-AC-01 — Given A disposition operation succeeds, fails, or is partial, when The operation reaches a reportable state, then A privacy-minimized outcome record is retained under the approved policy. Verification: inspection.
- ZD-QUAR-037-AC-02 — Given An unauthorized user requests an audit record, when The record is accessed, then The system denies access outside the approved authorization boundary. Verification: operational-test.

### Requirement ZD-QUAR-038 — Do not create a standalone scan-history capability

**Normative statement:** MVP-02 MUST retain only the quarantine and disposition records necessary for the item lifecycle and MUST NOT expand those records into a standalone searchable scan-history capability without a separate owner-approved scope change.

**Type:** policy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** business-rules, data, persistence, configuration
**Platforms:** web, android
**Subject:** MVP boundary for records
**Rationale:** The owner-approved MVP excludes scan history as a standalone feature; quarantine records remain necessary to manage quarantined artifacts.
**Basis:** owner-decision — Owner-approved scope excludes scan history as a standalone capability. [ZD-SCOPE-001, EVD-OWNER-SCOPE-001]

**Acceptance criteria:**
- ZD-QUAR-038-AC-01 — Given A quarantine item requires a lifecycle record, when The record is created, then The record contains only lifecycle/disposition information needed for MVP-02 and does not introduce standalone scan-history browsing. Verification: inspection.

## 6. Cross-capability dependencies and boundaries

- MVP-01 is the source of analysis outcomes. MVP-02 must not reinterpret a Suspicious, No known threat found, or Could not decide result as confirmed malware. See `MANUAL-FILE-ANALYSIS.md` and `ZD-FILE-012`–`ZD-FILE-015`.
- The existing authentication contract is supporting infrastructure. MVP-02 does not require sign-in merely because a file is selected or quarantined locally; any account-linked sync, cloud backup, or remote management requires a separately justified and approved boundary.
- The MVP excludes standalone scan history. Quarantine item lifecycle records are limited to the state and operation information needed to manage the quarantined artifact.
- Automatic/background protection remains excluded. An implementation may use internal asynchronous work for a user-requested operation, but that does not authorize autonomous scanning or disposition.
- MVP-03 website/link checking, its Pro entitlement gate, owner activation gate, providers, quotas, and budgets are outside this contract.

## 7. Open product and owner questions

These questions remain open. The PM recommendations are not owner decisions.

### ZD-Q-QUAR-001 — Should confirmed threats be quarantined automatically when platform capabilities permit, or only after explicit user confirmation?

**Impact:** Determines trigger, consent, user control, false-positive exposure and the relationship between MVP-01 scan completion and MVP-02 action.
**Owner decision required:** yes
**PM recommendation (not approved):** Prefer explicit user confirmation for the first release unless the owner specifically accepts automatic quarantine after a rigorously defined confirmed-threat threshold and false-positive recovery path.

### ZD-Q-QUAR-002 — What exact evidence threshold and analysis outcomes qualify as confirmed threats eligible for automatic or user-initiated quarantine?

**Impact:** Affects eligibility, false-positive risk, automatic action authorization and safe handling of suspicious/inconclusive outcomes.
**Owner decision required:** yes
**PM recommendation (not approved):** Do not authorize automatic handling until the MVP-01 verdict policy and measured evidence threshold are approved.

### ZD-Q-QUAR-003 — What does quarantine mean operationally on each platform: copy into an app-controlled area, move through a provider, or another isolation boundary?

**Impact:** Determines whether the original remains accessible, the strength of isolation, storage lifetime, web feasibility and user-facing promises.
**Owner decision required:** yes
**PM recommendation (not approved):** Prefer a verified local quarantine copy with an explicit source-disposition step, but treat this as a recommendation pending engineering proof and owner approval.

### ZD-Q-QUAR-004 — After a verified quarantine copy is created, should ZeroDeck attempt to remove the original, leave it in place, or ask the user?

**Impact:** Affects data-loss risk, duplicate copies, platform support, permissions and whether the original remains exposed.
**Owner decision required:** yes
**PM recommendation (not approved):** Keep source removal separate and require an explicit policy/confirmation; never delete before copy verification.

### ZD-Q-QUAR-005 — What exact fresh-scan age/window and result classes make a quarantined item eligible for restore?

**Impact:** Determines restore safety, scan dependency, result freshness and whether suspicious/inconclusive/no-known-threat results permit restoration.
**Owner decision required:** yes
**PM recommendation (not approved):** Require a new successful scan at restore time; do not treat Suspicious, Threat found, or Could not decide as restore clearance. Define acceptable result classes and age with the MVP-01 detection policy.

### ZD-Q-QUAR-006 — Which integrity identifier/algorithm and metadata format should bind the original, quarantine artifact and restored output?

**Impact:** Determines compatibility, corruption detection, exact content identity and upgrade/migration behaviour.
**Owner decision required:** yes
**PM recommendation (not approved):** Evaluate SHA-256 as the leading candidate because it appears in the working draft, but approve exact use, encoding, metadata and migration separately; this is not selected here.

### ZD-Q-QUAR-007 — What does permanent deletion guarantee across app storage, document providers, backups, snapshots and flash storage?

**Impact:** Determines truthful UI wording, legal/security expectations, verification and whether secure-erasure claims are supportable.
**Owner decision required:** yes
**PM recommendation (not approved):** Promise only the deletion operation the selected platform/provider confirms; do not claim forensic or secure erasure without proof.

### ZD-Q-QUAR-008 — What quarantine retention duration, start event, expiry action and exception policy should launch use?

**Impact:** Determines user data lifetime, storage pressure, automatic cleanup and recoverability.
**Owner decision required:** yes
**PM recommendation (not approved):** Do not adopt the proposed 30-day value by default. Choose duration only after owner review of false-positive recovery, storage cost and legal needs.

### ZD-Q-QUAR-009 — Should retention be user-configurable, and what expiry warnings or manual purge controls are required?

**Impact:** Changes configuration, interface, notification, storage and accidental-loss risk.
**Owner decision required:** yes
**PM recommendation (not approved):** Prefer a simple owner-defined retention policy and user-initiated deletion for launch; add configurable retention only if user research justifies the complexity.

### ZD-Q-QUAR-010 — Is encryption mandatory for all quarantine content, and what key protection, rotation, recovery and hardware-support policy is required?

**Impact:** Determines the security boundary, supported devices, key loss behaviour, backup/migration and recovery.
**Owner decision required:** yes
**PM recommendation (not approved):** If encryption is selected, use established authenticated encryption and platform-backed key protection; do not invent primitives. Exact algorithms and lifecycle require a security design review.

### ZD-Q-QUAR-011 — What should happen to quarantined content and keys during backup, device transfer, app uninstall, app-data clear and device loss?

**Impact:** Can determine whether the only quarantined copy is lost or becomes undecryptable; affects user warnings and recovery promises.
**Owner decision required:** yes
**PM recommendation (not approved):** Do not back up or synchronize quarantine bytes/keys by implication. Define and test an explicit lifecycle before release, and warn users about irreversible loss.

### ZD-Q-QUAR-012 — Which quarantine and restore operations should the web client support, given browser file-handle and permission limits?

**Impact:** Determines MVP web parity, user-visible capability, storage lifetime and whether the browser can truthfully provide isolation.
**Owner decision required:** yes
**PM recommendation (not approved):** Do not promise device-wide or arbitrary-file quarantine on web. Expose only operations demonstrated with user-granted browser capabilities; otherwise mark the operation unsupported.

### ZD-Q-QUAR-013 — What file size, aggregate quarantine capacity, per-device limits and low-storage behaviour should launch enforce?

**Impact:** Determines supported workloads, storage exhaustion behaviour, responsiveness and user data protection.
**Owner decision required:** yes
**PM recommendation (not approved):** Measure representative files on supported devices before setting numeric limits; fail safely without evicting existing quarantined items.

### ZD-Q-QUAR-014 — What audit-record fields, access rules and retention period are required for disposition operations?

**Impact:** Determines data model, privacy exposure, dispute resolution and whether user-visible history becomes a separate feature.
**Owner decision required:** yes
**PM recommendation (not approved):** Retain a minimal item lifecycle record and operation outcomes; avoid a separate searchable scan-history feature in MVP.

## 8. Evidence register

| Evidence ID | Source / location | What it supports | Limitation |
|---|---|---|---|
| EVD-OWNER-SCOPE-001 | software-rules/SCOPE.md and software-rules/OWNER-RULES.md — owner-approved MVP scope and exclusions. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-QUAR-001 | software-rules/OPEN-PROPERTIES.md — MVP-02 provisional working-draft baselines and unresolved policy. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-QUAR-002 | re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md — CAP-02 workflows and dependencies. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-QUAR-003 | software-rules/SCENARIOS.md — MVP-QUAR-001, MVP-QUAR-002 and MVP-QUAR-003 investigation scenarios. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-QUAR-004 | re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md — AND-STO-001–005, AND-SAF-001–006 and AND-KEY-001–005 platform rules and unknowns. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-QUAR-005 | re/zerodek-product-re/2026-11-27/UI-SOURCE-DERIVED-RULES.md — UI-SRC-007–009; confirmation and fresh-scan restore intent; mockup actions are placeholders. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-PM-QUAR-RESEARCH-001 | product-management/2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md §3 — secondary research and product implications. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-SRC-FILE-001 | product-management/product-rules/contracts/MANUAL-FILE-ANALYSIS.md — MVP-01 result vocabulary and boundary only. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-ANDROID-SAF-001 | https://developer.android.com/training/data-storage/shared/documents-files and https://developer.android.com/guide/topics/providers/document-provider — Android SAF, URI grants and provider capabilities. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-ANDROID-APPSTORAGE-001 | https://developer.android.com/training/data-storage/app-specific — app-specific storage lifecycle and uninstall behaviour. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-ANDROID-KEYSTORE-001 | https://developer.android.com/privacy-and-security/keystore — Android Keystore security properties and hardware-dependent support. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-WEB-FS-001 | https://developer.mozilla.org/en-US/docs/Web/API/File_System_API and https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle/requestPermission — browser file handles and user-mediated permissions. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-OWASP-FILE-001 | https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html — secure file handling, storage boundaries and resource limits. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |
| EVD-DOC-OWASP-CRYPTO-001 | https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html — threat-model-led storage protection and established cryptographic mechanisms. | Basis for the cited requirement(s). | Evidence is source/product material or platform documentation; it is not proof of ZeroDeck runtime behaviour. |

## 9. Release gates and implementation-independent completion conditions

Before MVP-02 release, the owner must resolve or explicitly accept the consequences of the open questions affecting automatic handling, eligibility, source disposition, restore policy, retention, deletion, encryption/key lifecycle, backup/uninstall behaviour, and platform capability. The implementation must demonstrate the accepted policy on each supported platform/provider. The contract itself does not select the implementation.

Numeric retention, size, capacity, freshness, resource and timing values must not be inferred from prior art. A 30-day retention period appears in the working draft only as a proposal and is not selected by this contract.

## 10. Source references

- Owner scope: `software-rules/SCOPE.md`, `software-rules/OWNER-RULES.md`, and `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md`.
- Existing product research: `product-management/2026-11-27/08-RESEARCH-FILE-QUARANTINE-LINK.md`, §3.
- Capability/scenario evidence: `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md`; `software-rules/SCENARIOS.md`; `software-rules/OPEN-PROPERTIES.md`.
- Platform source extraction: `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md`, §4.
- Source-derived UI limitations and restore intent: `re/zerodek-product-re/2026-11-27/UI-SOURCE-DERIVED-RULES.md`, UI-SRC-007–009.
- Android SAF: https://developer.android.com/guide/topics/providers/document-provider and https://developer.android.com/training/data-storage/shared/documents-files.
- Android app-specific storage: https://developer.android.com/training/data-storage/app-specific.
- Android Keystore: https://developer.android.com/privacy-and-security/keystore.
- Browser File System API: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API and https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle/requestPermission.
- OWASP File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html.
- OWASP Cryptographic Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html.

## 11. Authorship and status

**Author / issuer:** ZeroDeck Product Management Agent.
**Lifecycle:** Draft; all 38 requirements are PM-proposed. The owner approved the Phase 5 authoring plan, not these normative statements.
**Implementation status:** Not assessed. No product implementation was changed or tested by this phase.