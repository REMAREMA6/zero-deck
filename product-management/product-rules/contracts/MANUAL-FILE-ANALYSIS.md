# ZeroDeck MVP-01 — Manual File Security Analysis Product Requirements

**Contract ID:** `ZD-CONTRACT-FILE-ANALYSIS`  
**Version:** `0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent  
**Lifecycle:** Draft; all requirements are PM-proposed, not owner-approved  
**Capability:** MVP-01 — Manual file security analysis  
**Platforms:** Web and Android, with platform-specific access differences  
**Scope authority:** Owner-approved MVP decision `ZD-SCOPE-001`  
**Canonical source:** This Markdown document; the JSON file is a synchronized structured projection.

## 1. Purpose and boundary

This contract defines product-level behaviour when a user manually selects a file and requests security analysis. It is technology-independent: it does not select an engine, algorithm, provider, API, storage design, framework, database or deployment model.

MVP-01 is limited to manual file analysis and a bounded result. It does not define quarantine, restoration, permanent deletion, URL checking, provider selection, entitlement gates or a standalone scan-history feature.

The owner-approved product platforms are web and Android. Shared product-level outcome semantics apply to both, but file access, permissions, supported inputs and resource capabilities may differ by platform.

## 2. Authority and evidence labels

- **Owner-declared:** MVP-01 is manual file security analysis within the three-capability MVP; web and Android are selected product platforms; standalone scan history and automatic/background protection are excluded.
- **Product-material (working draft):** manual file selection; four proposed outcome classes; no-known-threat is not a safety guarantee; unsupported/interrupted/engine-failure cases are not successful scans; on-device/no-upload-by-default; separate consent/disclosure if cloud analysis is ever introduced; SHA-256 is a planned direction only.
- **Platform contract:** file access is bounded by platform-granted capability. Android SAF is a constraint reference, not a decision to use a particular API.
- **PM inference:** additional requirements for non-destructive analysis, no execution, minimization, truthful partial results, retry identity, resource bounds and update integrity. These are recommendations, not owner-approved policies.
- **Unknown:** supported formats/limits, engine, detection criteria, confidence thresholds, update/freshness, optional cloud feature existence, retention, resource budgets, and exact platform/browser support.

No reference implementation, source-derived rule or platform/provider document is treated as proof of ZeroDeck runtime behaviour. No deployed ZeroDeck runtime was tested by this phase.

## 3. Normative language

MUST/MUST NOT are binding within this PM-proposed draft only if the owner approves the requirement. Conditional requirements apply only when their stated condition is true. Approval of the Phase 4 authoring plan authorizes this work; it does not approve these product statements.

## 4. Product-level workflow

1. The user explicitly selects or identifies one file through the platform's supported file-access mechanism.
2. The system checks whether the selected file is accessible and within the documented supported-input boundary.
3. The user explicitly requests analysis.
4. The system accepts or rejects the request and exposes the attempt lifecycle.
5. If accepted, the system analyses the selected content within documented coverage and resource limits.
6. The system returns one of the defined outcome classes, or an explicit failure/incomplete state.
7. The system communicates the result, available evidence, limitations and safe next steps.
8. A retry, if requested, is a distinguishable new attempt.

This is a product workflow, not an implementation sequence. No worker, queue, network service or specific scanning algorithm is implied.

## 5. Outcome model

| Outcome | Meaning | Must not be confused with |
|---|---|---|
| **Threat found** | Available analysis evidence meets documented confirmed-threat criteria. | Suspicious or absolute certainty. |
| **Suspicious** | Available evidence warrants caution but does not meet confirmed-threat criteria. | Confirmed malware or a clean result. |
| **No known threat found** | Available analysis found no match under documented detection coverage. | Proof that the file is safe, harmless or free of all malware. |
| **Could not decide / Could not analyse** | Analysis could not reach a reliable outcome because of insufficient coverage, unsupported input, failure, interruption or another documented limitation. | No known threat found. |

Exact detection criteria, confidence thresholds, source coverage and wording remain open. The system must not fabricate certainty, evidence, engine identity, source version or freshness.

## 6. Canonical requirements

### Requirement ZD-FILE-001 — Require an explicit manual scan request

**Normative statement:** The system MUST initiate file security analysis only after the user explicitly selects or identifies a file and requests a scan.

**Type:** functional | **Priority:** P0 | **Status:** PM-proposed
**Facets:** interface, behavior, business-rules
**Platforms:** web, android
**Subject:** User-initiated scan trigger
**Rationale:** MVP-01 is expressly manual; automatic/background protection is excluded.
**Basis:** owner-decision — Owner-approved MVP scope defines manual file security analysis (ZD-SCOPE-001).

**Acceptance criteria:**
- ZD-FILE-AC-01 — Given no scan request exists, when a file becomes available, then no analysis is initiated. Verification: automated-test.
- ZD-FILE-AC-02 — Given an eligible file is selected, when the user requests a scan, then one scan attempt is initiated and its accepted or rejected state is communicated. Verification: automated-test.

### Requirement ZD-FILE-002 — Respect the selected file's access boundary

**Normative statement:** The system MUST analyse only the file selected by the user and only to the extent that the active platform grants the application access to that file.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** authorization-permissions, behavior, security-controls, errors-recovery
**Platforms:** web, android
**Subject:** File access boundary
**Rationale:** Web and Android expose different file-access capabilities; selection is not blanket permission to read unrelated files.
**Basis:** platform-contract — Platform file selection and Android SAF grant access to selected resources subject to platform permissions (EVD-DOC-ANDROID-001).

**Acceptance criteria:**
- ZD-FILE-AC-03 — Given the user selected one file and access was granted, when the scan reads input, then no unrelated file is read as part of that scan. Verification: inspection.
- ZD-FILE-AC-04 — Given the platform has not granted access to a selected file, when analysis is requested, then the system does not bypass the platform boundary and reports the access failure. Verification: manual-test.

### Requirement ZD-FILE-003 — Reject revoked or unavailable file access

**Normative statement:** If access to the selected file is unavailable, revoked, expired, or insufficient when required for analysis, the system MUST stop or reject the affected operation and MUST NOT report a completed scan.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** authorization-permissions, behavior, errors-recovery
**Platforms:** web, android
**Subject:** File permission lifecycle
**Rationale:** A file reference is not proof that its content remains readable.
**Basis:** pm-inference — PM inference based on platform-controlled file access and MVP-FILE-001/002.

**Acceptance criteria:**
- ZD-FILE-AC-05 — Given access to the selected file has been revoked, when the scan attempts to read it, then the attempt ends as an access failure and no completed verdict is presented. Verification: automated-test.
- ZD-FILE-AC-06 — Given access is restored through a valid user/platform action, when the user retries, then a new attempt may proceed using the newly granted access. Verification: manual-test.

### Requirement ZD-FILE-004 — Publish the supported-input boundary

**Normative statement:** Before release, the product MUST define and communicate the file types and input constraints accepted for MVP-01, including applicable size, count, archive, encryption, and malformed-input limits.

**Type:** policy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, business-rules, configuration, data
**Platforms:** web, android
**Subject:** Supported file and input boundary
**Rationale:** Supported formats and limits are explicitly open; users need an authoritative eligibility boundary.
**Basis:** source-evidence — PM-FILE-008 and OPEN-PROPERTIES identify these constraints as unresolved (EVD-SRC-PRODUCT-001).

**Acceptance criteria:**
- ZD-FILE-AC-07 — Given the supported-input policy is published, when the user views or invokes file selection, then accepted types and applicable limits are discoverable before a scan is accepted. Verification: inspection.
- ZD-FILE-AC-08 — Given an input is outside a documented constraint, when analysis is requested, then the system rejects it with a specific unsupported-input outcome. Verification: automated-test.

### Requirement ZD-FILE-005 — Reject unreadable and invalid inputs truthfully

**Normative statement:** The system MUST classify empty, malformed, corrupt, encrypted or password-protected, oversized, unsupported, and unreadable inputs according to the documented input policy, and MUST NOT represent an input that was not successfully analysed as a successful scan.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** business-rules, data, behavior, errors-recovery
**Platforms:** web, android
**Subject:** Input validation and rejection
**Rationale:** A failure to analyse must remain distinct from a threat verdict.
**Basis:** source-evidence — PM-FILE-004 and OPEN-PROPERTIES enumerate unsupported, inaccessible, malformed, encrypted, oversized and unreadable cases.

**Acceptance criteria:**
- ZD-FILE-AC-09 — Given an input is invalid under the published policy, when analysis is requested, then the system returns the corresponding invalid-input outcome without a successful verdict. Verification: automated-test.
- ZD-FILE-AC-10 — Given an encrypted input has no approved analysis path, when analysis is requested, then the system reports that it could not analyse the file rather than inferring a threat or clean result. Verification: manual-test.

### Requirement ZD-FILE-006 — Preserve the original file during analysis

**Normative statement:** The system MUST NOT modify, replace, rename, move, or delete the user-selected original file as a side effect of manual analysis.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** behavior, data, security-controls
**Platforms:** web, android
**Subject:** Original file integrity during scan
**Rationale:** Scanning is distinct from MVP-02 disposition; analysis must not silently alter the source file.
**Basis:** pm-inference — PM inference from the owner-approved separation of MVP-01 analysis and MVP-02 disposition (ZD-SCOPE-001).

**Acceptance criteria:**
- ZD-FILE-AC-11 — Given a readable file is selected, when the scan completes or fails, then the original file content and location remain unchanged by the scan. Verification: inspection.
- ZD-FILE-AC-12 — Given a scan is cancelled or interrupted, when the user inspects the original file, then the scan has not deleted or replaced it. Verification: manual-test.

### Requirement ZD-FILE-007 — Keep file analysis on-device by default

**Normative statement:** By default, the system MUST perform MVP-01 file analysis without uploading the selected file's content to a cloud service.

**Type:** privacy | **Priority:** P0 | **Status:** Owner-approved
**Facets:** security-controls, integrations, data, configuration
**Platforms:** web, android
**Subject:** Default file-content data flow
**Rationale:** The working product material states on-device analysis and no cloud upload by default; this remains PM-proposed because the source is a working draft.
**Basis:** source-evidence — PM-FILE-005 records on-device analysis and no cloud upload by default (EVD-SRC-PRODUCT-001).

**Acceptance criteria:**
- ZD-FILE-AC-13 — Given a user starts a scan under default configuration, when the system analyses the file, then file content is not transmitted to a cloud service. Verification: inspection.
- ZD-FILE-AC-14 — Given a network connection is available, when a default local analysis is performed, then network availability alone does not cause file-content upload. Verification: automated-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-008 — Gate any future cloud analysis behind separate consent

**Normative statement:** If a future, separately approved cloud-analysis capability is introduced, the system MUST obtain explicit user consent after disclosing the data sent, purpose, recipient or processor, and the choice to proceed or decline.

**Type:** privacy | **Priority:** P1 | **Status:** Owner-approved | **Normative kind:** conditional
**Condition:** Only if a separate cloud-analysis capability is approved and made available; none is approved by this contract.
**Facets:** interface, behavior, data, integrations, security-controls
**Platforms:** web, android
**Subject:** Optional future cloud analysis
**Rationale:** The working product material specifies disclosure and consent if cloud analysis exists, while its existence remains open.
**Basis:** source-evidence — PM-FILE-006 specifies separate disclosure and consent; cloud analysis is not approved by this contract.

**Acceptance criteria:**
- ZD-FILE-AC-15 — Given a separately approved cloud-analysis option is offered, when the user is asked to enable it, then the disclosure identifies data sent, purpose and recipient or processor. Verification: inspection.
- ZD-FILE-AC-16 — Given the user declines or has not consented, when a scan is requested, then no file content is sent to the cloud. Verification: automated-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-009 — Do not execute selected files as part of analysis

**Normative statement:** The system MUST NOT execute a user-selected file as part of manual security analysis.

**Type:** security | **Priority:** P0 | **Status:** PM-proposed
**Facets:** security-controls, behavior, integrations
**Platforms:** web, android
**Subject:** File execution boundary
**Rationale:** Executing potentially malicious input creates avoidable risk; this is a PM safety recommendation, not an observation.
**Basis:** pm-inference — PM inference; safe parsing/isolation and execution boundaries remain open in OPEN-PROPERTIES.

**Acceptance criteria:**
- ZD-FILE-AC-17 — Given a user-selected file is submitted, when the analysis workflow processes it, then the file is not launched or executed as a program, script, macro or active document. Verification: inspection.
- ZD-FILE-AC-18 — Given the selected engine would require execution to produce a result, when execution would be required, then the system does not silently execute the file and reports the limitation. Verification: analysis.

### Requirement ZD-FILE-010 — Expose an honest scan lifecycle

**Normative statement:** The system MUST expose whether a requested scan is rejected, accepted, in progress, completed, cancelled, interrupted, or failed, using states that distinguish active attempts from terminal outcomes.

**Type:** functional | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, behavior, data
**Platforms:** web, android
**Subject:** Scan attempt lifecycle
**Rationale:** Failure, cancellation and interruption must not collapse into completion.
**Basis:** source-evidence — MVP-FILE-001/002 require scan start, progress, termination and truthful terminal state (software-rules/SCENARIOS.md).

**Acceptance criteria:**
- ZD-FILE-AC-19 — Given a scan is accepted and processing has begun, when the user checks its state, then it is distinguishable from rejected and terminal attempts. Verification: manual-test.
- ZD-FILE-AC-20 — Given a scan reaches cancellation, interruption or failure, when the attempt terminates, then its terminal state is not reported as completed. Verification: automated-test.

### Requirement ZD-FILE-011 — Support truthful cancellation

**Normative statement:** While a scan is active, the system MUST provide a cancellation action when the selected platform and analysis process support cancellation, and MUST communicate whether cancellation completed or could not be completed.

**Type:** functional | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, behavior, errors-recovery
**Platforms:** web, android
**Subject:** Active scan cancellation
**Rationale:** Cancellation guarantees and progress granularity are open; do not promise engine-specific interruption guarantees.
**Basis:** pm-inference — PM inference; cancellation and interruption are explicit open dimensions in OPEN-PROPERTIES.

**Acceptance criteria:**
- ZD-FILE-AC-21 — Given a scan is active and cancellation is supported, when the user requests cancellation, then the system stops further analysis as soon as the process can safely stop and reports cancellation. Verification: manual-test.
- ZD-FILE-AC-22 — Given cancellation is unavailable or cannot stop an operation, when the user requests cancellation, then the system does not claim cancellation succeeded and communicates the actual state. Verification: manual-test.

### Requirement ZD-FILE-012 — Use distinct security-analysis outcome classes

**Normative statement:** The system MUST distinguish at least the outcomes Threat found, Suspicious, No known threat found, and Could not decide or Could not analyse.

**Type:** business-rule | **Priority:** P0 | **Status:** Owner-approved
**Facets:** business-rules, data, interface, behavior
**Platforms:** web, android
**Subject:** File scan result taxonomy
**Rationale:** These four result classes are in the product-material draft; exact detection criteria remain open.
**Basis:** source-evidence — PM-FILE-002 defines the four-way result model (EVD-SRC-PRODUCT-001).

**Acceptance criteria:**
- ZD-FILE-AC-23 — Given evidence meets documented confirmed-threat criteria, when the result is presented, then it is classified as Threat found. Verification: automated-test.
- ZD-FILE-AC-24 — Given analysis is incomplete, unsupported or lacks sufficient evidence, when the result is presented, then it is Could not decide or Could not analyse rather than No known threat found. Verification: automated-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-013 — Do not equate no known threat with safety

**Normative statement:** When no matching threat is identified, the system MUST describe the outcome as No known threat found or equivalent wording and MUST NOT claim or imply that the file is safe, harmless, or guaranteed free of malware.

**Type:** policy | **Priority:** P0 | **Status:** Owner-approved
**Facets:** interface, business-rules, security-controls
**Platforms:** web, android
**Subject:** No-known-threat result semantics
**Rationale:** This is explicit product-material wording and a core trust boundary.
**Basis:** source-evidence — PM-FILE-003 prohibits presenting a no-known-threat result as a guarantee that the file is safe.

**Acceptance criteria:**
- ZD-FILE-AC-25 — Given available analysis finds no known threat, when the result is displayed, then wording communicates only that no known threat was found. Verification: inspection.
- ZD-FILE-AC-26 — Given the result is No known threat found, when summary or follow-up text is rendered, then no part guarantees safety or absence of all malware. Verification: manual-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-014 — Record result provenance and analysis context

**Normative statement:** For each completed analysis result, the system MUST make available the scan-attempt identity and the analysis context needed to interpret the result, including detection-source or engine identity and version when that information exists.

**Type:** data | **Priority:** P1 | **Status:** PM-proposed
**Facets:** data, behavior, security-controls
**Platforms:** web, android
**Subject:** Result provenance
**Rationale:** A result without its analysis context cannot be meaningfully interpreted; the engine and update source remain unselected.
**Basis:** pm-inference — PM inference for explainability and reproducibility; engine and feed details remain open.

**Acceptance criteria:**
- ZD-FILE-AC-27 — Given a completed scan has a known engine or detection-source identity and version, when its result is retrieved, then that provenance is associated with the result. Verification: inspection.
- ZD-FILE-AC-28 — Given a provenance field is unavailable, when the result is presented, then the system does not fabricate an engine, source or version. Verification: inspection.

### Requirement ZD-FILE-015 — Represent uncertainty and partial analysis explicitly

**Normative statement:** If analysis is partial, interrupted, inconclusive, or based on unavailable detection data, the system MUST communicate the limitation and MUST NOT present the result as a complete analysis.

**Type:** reliability | **Priority:** P0 | **Status:** Owner-approved
**Facets:** business-rules, data, interface, errors-recovery
**Platforms:** web, android
**Subject:** Incomplete and uncertain result semantics
**Rationale:** Partial-result policy and confidence are unresolved; uncertainty must not silently become a clean verdict.
**Basis:** pm-inference — PM inference grounded in MVP-FILE-002's inconclusive/interruption branches and OPEN-PROPERTIES.

**Acceptance criteria:**
- ZD-FILE-AC-29 — Given only part of a file was analysed or required detection data was unavailable, when a result is returned, then the result is marked partial or inconclusive and the limitation is explained. Verification: automated-test.
- ZD-FILE-AC-30 — Given analysis is interrupted before its completion condition, when the attempt terminates, then no complete verdict is issued from the incomplete attempt. Verification: automated-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-016 — Explain detections without inventing evidence

**Normative statement:** For a Threat found or Suspicious outcome, the system MUST provide the available finding explanation and MUST distinguish observed detection evidence from interpretation or uncertainty.

**Type:** usability | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, data, business-rules
**Platforms:** web, android
**Subject:** User-facing result explanation
**Rationale:** The workflow needs understandable explanations without overstating the underlying evidence.
**Basis:** source-evidence — MVP-FILE-002 requires classification basis where exposed and a user-facing explanation.

**Acceptance criteria:**
- ZD-FILE-AC-31 — Given a Threat found or Suspicious result includes detection evidence, when the user opens the result, then available evidence or detection reason is presented without inventing unavailable detail. Verification: inspection.
- ZD-FILE-AC-32 — Given the engine cannot provide a meaningful explanation, when the result is displayed, then the system states the limitation rather than fabricating a reason. Verification: manual-test.

### Requirement ZD-FILE-017 — Provide outcome-consistent next-step guidance

**Normative statement:** The system MUST provide next-step guidance consistent with the returned outcome and MUST NOT direct users to treat Suspicious, inconclusive, or No known threat found as a confirmed safety determination.

**Type:** usability | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, business-rules, behavior
**Platforms:** web, android
**Subject:** Post-result user guidance
**Rationale:** Guidance must preserve the distinction between detection and assurance.
**Basis:** pm-inference — PM inference grounded in the four-way result model and no-guarantee rule.

**Acceptance criteria:**
- ZD-FILE-AC-33 — Given a Suspicious or Could not decide result is shown, when the user views its guidance, then the guidance preserves uncertainty and does not label the file confirmed safe or malicious. Verification: manual-test.
- ZD-FILE-AC-34 — Given a Threat found result is shown, when the user views its guidance, then it explains the result and does not instruct execution of the file. Verification: manual-test.

### Requirement ZD-FILE-018 — Keep engine failures separate from verdicts

**Normative statement:** If the analysis engine, detection data, or a required dependency is unavailable or fails, the system MUST return a failure or Could not decide outcome and MUST NOT convert the failure into Threat found or No known threat found.

**Type:** reliability | **Priority:** P0 | **Status:** PM-proposed
**Facets:** integrations, errors-recovery, business-rules, behavior
**Platforms:** web, android
**Subject:** Analysis dependency failure
**Rationale:** Engine/database unavailability and update failures are explicit failure cases; absence cannot be treated as a clean result.
**Basis:** source-evidence — PM-FILE-004 and OPEN-PROPERTIES identify engine/database unavailable and update failure.

**Acceptance criteria:**
- ZD-FILE-AC-35 — Given a required analysis engine or detection source is unavailable, when a scan is requested, then the system reports unavailable or inconclusive and does not issue a clean verdict. Verification: automated-test.
- ZD-FILE-AC-36 — Given a dependency returns an invalid or unusable response, when the result is evaluated, then the attempt fails safely and the response is not treated as detection evidence. Verification: automated-test.

### Requirement ZD-FILE-019 — Make retry a distinguishable new attempt

**Normative statement:** When a scan attempt fails or is interrupted, the system MUST allow the user to initiate a new attempt when the input remains accessible and eligible, and MUST keep the new attempt distinguishable from the prior attempt.

**Type:** functional | **Priority:** P1 | **Status:** PM-proposed
**Facets:** behavior, data, errors-recovery
**Platforms:** web, android
**Subject:** Retry and attempt identity
**Rationale:** Distinct attempts prevent stale or partial results being mistaken for the new result.
**Basis:** pm-inference — PM inference based on explicit retry/interruption gaps in OPEN-PROPERTIES.

**Acceptance criteria:**
- ZD-FILE-AC-37 — Given a prior attempt failed or was interrupted and the file remains eligible, when the user requests a retry, then a new attempt is created and distinguishable from the prior attempt. Verification: automated-test.
- ZD-FILE-AC-38 — Given a prior attempt produced a partial result, when a retry begins, then the prior result is not relabelled as the retry's completed result. Verification: automated-test.

### Requirement ZD-FILE-020 — Minimize file and metadata collection

**Normative statement:** The system MUST access and process only the file content and metadata necessary to perform the requested analysis and communicate its result.

**Type:** privacy | **Priority:** P0 | **Status:** Owner-approved
**Facets:** data, security-controls, behavior
**Platforms:** web, android
**Subject:** File and metadata minimization
**Rationale:** File content can contain sensitive information; no broader collection purpose is established for MVP-01.
**Basis:** pm-inference — PM privacy recommendation; no separate analytics or remote-processing feature is approved by MVP scope.

**Acceptance criteria:**
- ZD-FILE-AC-39 — Given a file is selected for analysis, when the system reads content and metadata, then access is limited to information necessary for analysis and result communication. Verification: inspection.
- ZD-FILE-AC-40 — Given a metadata field is not required for analysis or result interpretation, when the scan is processed, then that field is not collected solely by default. Verification: inspection.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-021 — Protect file data in diagnostics

**Normative statement:** The system MUST NOT expose file content, secrets extracted from files, or sensitive file metadata in ordinary logs, analytics, crash reports, or user-visible error details unless a separately documented and consented diagnostic purpose authorizes that specific disclosure.

**Type:** privacy | **Priority:** P0 | **Status:** Owner-approved
**Facets:** security-controls, data, errors-recovery
**Platforms:** web, android
**Subject:** Diagnostic disclosure boundary
**Rationale:** Diagnostics must not become an unintended disclosure channel for selected file contents.
**Basis:** pm-inference — PM privacy/security recommendation based on the on-device default and minimization principle.

**Acceptance criteria:**
- ZD-FILE-AC-41 — Given a scan encounters a parsing or engine error, when diagnostic information is recorded, then file contents and sensitive metadata are absent from ordinary diagnostic output. Verification: inspection.
- ZD-FILE-AC-42 — Given a diagnostic workflow requests additional file data, when no specific disclosure purpose and consent exist, then that data is not transmitted or retained for diagnostics. Verification: manual-test.

- Owner decision: ZD-DEC-PHASE9-2026-11-28.
### Requirement ZD-FILE-022 — Separate retained scan-result policy from quarantine retention

**Normative statement:** If the product retains a scan result or scan history, it MUST define and apply a separate retention and deletion policy for that record rather than inheriting MVP-02 quarantine retention.

**Type:** privacy | **Priority:** P1 | **Status:** PM-proposed | **Normative kind:** conditional
**Condition:** Only if scan results are retained beyond the active analysis interaction; scan history is not a standalone MVP feature.
**Facets:** data, persistence, configuration, security-controls
**Platforms:** web, android
**Subject:** Optional scan-result persistence
**Rationale:** Product material separates scan history from quarantine retention; actual persistence remains conditional and unresolved.
**Basis:** source-evidence — PM-FILE-009 and PM-QUAR-013 state separate retention; OPEN-PROPERTIES makes persistence conditional.

**Acceptance criteria:**
- ZD-FILE-AC-43 — Given scan results are persisted beyond the active interaction, when the retention policy is applied, then scan-result retention is documented separately from quarantine-item retention. Verification: inspection.
- ZD-FILE-AC-44 — Given a scan record reaches its documented deletion condition, when the record is deleted, then the policy does not imply deletion or modification of a separate quarantine artifact. Verification: manual-test.

### Requirement ZD-FILE-023 — Do not require a standalone scan-history feature

**Normative statement:** The MVP-01 workflow MUST NOT require a standalone scan-history feature as a prerequisite for selecting a file, requesting a scan, or viewing the current result.

**Type:** policy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** business-rules, behavior, interface
**Platforms:** web, android
**Subject:** MVP boundary for scan history
**Rationale:** Standalone scan history is explicitly excluded from the approved MVP.
**Basis:** owner-decision — The approved MVP exclusions list scan history as a standalone capability (ZD-SCOPE-001).

**Acceptance criteria:**
- ZD-FILE-AC-45 — Given a user opens the MVP-01 workflow, when the user selects, scans and views a result, then those actions do not depend on a standalone scan-history feature. Verification: manual-test.
- ZD-FILE-AC-46 — Given a minimal record is required for another in-scope operation, when the record is retained, then it is not expanded into standalone history without owner approval. Verification: inspection.

### Requirement ZD-FILE-024 — Maintain shared outcome semantics across platforms

**Normative statement:** The system MUST use the same product-level scan outcome meanings and no-guarantee semantics on web and Android, while communicating platform-specific file-access limitations and supported-input differences.

**Type:** compatibility | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, behavior, business-rules, authorization-permissions
**Platforms:** web, android
**Subject:** Cross-platform MVP-01 semantics
**Rationale:** The owner selected web and Android; platform-specific capability differences are allowed.
**Basis:** owner-decision — Owner selected web and Android platforms with platform-specific capability differences allowed (product-management/TRACKER.md).

**Acceptance criteria:**
- ZD-FILE-AC-47 — Given equivalent analysis evidence is available on web and Android, when each platform presents the result, then the same product-level outcome class and safety limitation are communicated. Verification: manual-test.
- ZD-FILE-AC-48 — Given a file cannot be accessed on one platform due to platform constraints, when the user requests a scan, then that platform reports its limitation rather than pretending to provide equivalent analysis. Verification: manual-test.

### Requirement ZD-FILE-025 — Disclose unsupported analysis coverage

**Normative statement:** The system MUST communicate when a file type, file size, archive structure, encryption state, or platform access condition is outside the documented analysis coverage.

**Type:** policy | **Priority:** P1 | **Status:** PM-proposed
**Facets:** interface, business-rules, data
**Platforms:** web, android
**Subject:** Coverage disclosure
**Rationale:** Coverage must not be implied beyond what the selected engine actually supports.
**Basis:** source-evidence — OPEN-PROPERTIES lists these coverage questions as unresolved.

**Acceptance criteria:**
- ZD-FILE-AC-49 — Given a file exceeds a documented analysis boundary, when the user requests analysis, then the system identifies the applicable limitation. Verification: manual-test.
- ZD-FILE-AC-50 — Given an archive or nested content is only partially covered, when a result is presented, then the uncovered portion is disclosed and the result is not represented as complete coverage. Verification: inspection.

### Requirement ZD-FILE-026 — Define and enforce bounded resource limits

**Normative statement:** Before release, the product MUST define the resource and workload limits under which MVP-01 analysis is supported, and the system MUST handle an exceeded limit as a bounded rejection or failure rather than exhausting resources without control.

**Type:** performance | **Priority:** P1 | **Status:** PM-proposed
**Facets:** performance-resource-behavior, configuration, errors-recovery
**Platforms:** web, android
**Subject:** Scan resource and workload bounds
**Rationale:** Numeric file and resource limits are not established; do not invent them.
**Basis:** source-evidence — OPEN-PROPERTIES identifies file limits and performance/resource targets as unresolved.

**Acceptance criteria:**
- ZD-FILE-AC-51 — Given supported workload and resource limits are documented, when an input or concurrent workload exceeds a limit, then the system rejects, defers or terminates the scan with an explicit bounded outcome. Verification: operational-test.
- ZD-FILE-AC-52 — Given the system is under resource pressure, when a scan cannot safely continue, then it fails or pauses according to documented policy without reporting a completed verdict. Verification: operational-test.

### Requirement ZD-FILE-027 — Verify integrity of conditional engine or detection updates

**Normative statement:** If MVP-01 relies on updateable detection data or an updateable analysis engine, the system MUST verify the authenticity and integrity of each update before it is used for file classification.

**Type:** security | **Priority:** P1 | **Status:** PM-proposed | **Normative kind:** conditional
**Condition:** Only if the selected analysis approach consumes updateable engine components or detection data.
**Facets:** integrations, security-controls, configuration, errors-recovery
**Platforms:** web, android
**Subject:** Conditional engine and detection-data updates
**Rationale:** Engine and update mechanisms are unresolved; this does not select a particular update design.
**Basis:** pm-inference — PM security recommendation; OPEN-PROPERTIES identifies update/freshness and trust verification as open.

**Acceptance criteria:**
- ZD-FILE-AC-53 — Given an updateable engine or detection dataset is selected, when an update is received, then its authenticity and integrity are verified before activation. Verification: inspection.
- ZD-FILE-AC-54 — Given update verification fails or the update is incomplete, when a scan would depend on that update, then the invalid update is not used and the scan is unavailable or inconclusive as applicable. Verification: automated-test.

### Requirement ZD-FILE-028 — Disclose known detection-data freshness

**Normative statement:** If a result depends on updateable detection data, the system MUST make relevant detection-data freshness or update status available to the user when that information is known and material to interpreting the result.

**Type:** data | **Priority:** P2 | **Status:** PM-proposed | **Normative kind:** conditional
**Condition:** Only if the selected engine uses updateable detection data and supplies reliable freshness information.
**Facets:** data, interface, configuration
**Platforms:** web, android
**Subject:** Detection-data freshness disclosure
**Rationale:** Freshness should be disclosed only when the selected engine supplies reliable information.
**Basis:** pm-inference — PM inference; detection-source freshness remains unresolved in OPEN-PROPERTIES.

**Acceptance criteria:**
- ZD-FILE-AC-55 — Given a scan uses detection data with a known update timestamp or freshness state, when the result is displayed, then the known relevant freshness information is available with the result. Verification: inspection.
- ZD-FILE-AC-56 — Given no reliable freshness information exists, when the result is displayed, then the system does not invent an update date or freshness guarantee. Verification: inspection.

## 7. Open product questions

### ZD-Q-FILE-001 — Which file types, size/count limits, archive recursion depth, and encrypted/password-protected inputs will MVP-01 support?

- **Impact:** Determines eligibility, disclosure, test boundaries and workload limits.
- **PM recommendation:** Publish a versioned support matrix before release; reject unsupported inputs truthfully.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-002 — Which analysis engine, detection method and threat-intelligence sources will be used, and what licensing, redistribution and update constraints apply?

- **Impact:** Determines coverage, privacy, offline behaviour, update trust, cost and operational ownership.
- **PM recommendation:** Compare local and remote approaches against coverage, privacy, licensing, update trust, false positives/negatives and cost.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-003 — What evidence thresholds and confidence policy distinguish the four result classes?

- **Impact:** Without explicit criteria, verdict labels cannot be tested consistently.
- **PM recommendation:** Define a documented classification policy and representative validation set before release.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-004 — Will a separately approved optional cloud-analysis capability ever be offered, and what consent, processor, data, purpose and retention policy would apply?

- **Impact:** The default is no cloud upload; optional cloud analysis is not approved and would change the data boundary.
- **PM recommendation:** Keep cloud analysis absent unless separately approved; require explicit disclosure and consent before transmission.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-005 — What file content, metadata or result data may be retained after the active scan, for what purpose and duration, and how can users delete it?

- **Impact:** Affects privacy, persistence, diagnostics and user expectations.
- **PM recommendation:** Minimize by default; document any necessary retention separately from quarantine retention.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-006 — What device/server resource budgets, concurrency limits and representative workload targets define supported scanning?

- **Impact:** Needed to define bounded performance and safe failure behaviour.
- **PM recommendation:** Benchmark representative supported workloads on intended platforms before setting numeric limits.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-007 — Which web browsers, Android versions and file-selection/access capabilities are in launch scope?

- **Impact:** Determines platform-specific access and eligibility boundaries.
- **PM recommendation:** Publish a tested platform support matrix; do not infer parity where capabilities differ.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-008 — What file fingerprint/hash algorithm, encoding and exact purpose will the product use, if any?

- **Impact:** SHA-256 is only a planned direction in product material; integrity and identity semantics depend on final policy.
- **PM recommendation:** Keep algorithm-specific claims out until purpose and exact policy are approved.
- **Status:** Open; owner decision or evidence required.

### ZD-Q-FILE-009 — What progress granularity and cancellation guarantee can the chosen engine provide?

- **Impact:** Affects lifecycle UI and user expectations.
- **PM recommendation:** Expose only progress and cancellation guarantees the selected engine can substantiate.
- **Status:** Open; owner decision or evidence required.


## 8. Explicit exclusions and dependencies

Excluded: MVP-02 quarantine/restore/permanent deletion/disposition/retention; MVP-03 website/link checking, providers, Pro entitlement, owner activation, quotas and budgets; standalone scan history; account/admin portal; automatic/background protection; browser extension; IP investigation; device privacy audit; threat-indicator administration; help CMS; health/audit dashboard; and any specific engine, algorithm, feed, vendor, parser, API, cloud processor, framework, language, database, storage architecture or hosting provider.

The existing identity/authentication contract is supporting infrastructure only. This Phase 4 contract does not require account creation or authentication as a prerequisite for MVP-01 unless a later owner-approved policy establishes that dependency. MVP-02 may consume a scan outcome in a later contract, but no quarantine action or state transition is specified here.

If a future implementation introduces an API, messaging, worker, external engine or cloud processor, the relevant conditional Software Rules facets must be revisited during cross-cutting work.

## 9. Approval and conformance status

This is a PM-authored declared product contract in Draft status. All 28 requirements are PM-proposed. The owner approved the plan to author this contract, not the normative product statements. No implementation was changed or tested. This contract does not establish runtime conformance, security certification, production readiness or complete replication of a reference application.


## Phase 9 owner-approved policy and deferred details

- On-device/local analysis is the default. Optional cloud analysis is not part of MVP-01; a future capability requires separate owner approval and explicit user consent before transmission.
- Keep the four result classes distinct. Suspicious, partial, unavailable and inconclusive results must not be presented as safe; no-known-threat is not a safety guarantee.
- Minimize file content and metadata. Do not retain file content after the active scan by default; any retained result data requires a documented purpose, retention policy and deletion path.
- Publish a tested support matrix and reject unsupported inputs. Engine selection, exact file types/limits, verdict thresholds, numeric resource budgets, hash algorithms and progress/cancellation mechanics remain deferred to architecture and evidence-led testing.

Detailed question dispositions: [Phase 9 owner decision register](../../2026-11-28/35-PHASE-9-OWNER-DECISION-REGISTER.md).
