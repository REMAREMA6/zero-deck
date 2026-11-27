# Phase 4 — Source-level rule extraction

**Engagement:** ZeroDeck product reverse engineering  
**Date opened:** 2026-11-27  
**Status:** In progress — Hypatia file-analysis first pass recorded; Android quarantine and Web Risk extraction pending.

## 1. Purpose and evidence boundary

This document records source-derived rules from selected Phase 3 references. It does not turn reference implementation behaviour into ZeroDeck requirements. Each finding is classified as:

- **SRC — source-derived:** directly supported by the inspected source at the pinned revision.
- **DOC — documented contract:** directly supported by an official platform/provider document.
- **OWNER — declared product intent:** recorded separately in the owner decision records.
- **UNKNOWN — unresolved:** the available evidence does not establish the property.

No ZeroDeck runtime was available or exercised during this pass. Therefore, none of the rules below is labelled runtime-observed or runtime-verified. The Hypatia source is a prior-art implementation, not the ZeroDeck product source.

## 2. Source provenance

### SRC-01 — MaintainTeam/Hypatia

- Repository: https://github.com/MaintainTeam/Hypatia
- Immutable revision: `c0f98977be935e58849726313635a2459cac3892`
- Licence recorded in Phase 3: AGPL-3.0; the embedded verifier has its own Arduino GPL-2.0-or-later notice and exception.
- Inspection date: 2026-11-27.
- Files inspected:
  - `app/src/main/java/us/spotco/malwarescanner/MalwareScanner.kt` — blob SHA `d3a7e04b73c99bbe2aa50d8db61667ad4495aa97`
  - `app/src/main/java/us/spotco/malwarescanner/Database.kt` — blob SHA `586536236cebfd4a4576118ab985f56d462dc1b7`
  - `app/src/main/java/us/spotco/malwarescanner/GPGDetachedSignatureVerifier.java` — blob SHA `9f7673a33763ef8f298a674bbaac0deac9681930`

The Phase 3 register remains the authoritative source-selection/licence record. No dependency adoption or code copying is authorized by this extraction.

## 3. Extracted source-derived rules — manual file analysis

The following rules describe what the inspected Hypatia implementation does, not what ZeroDeck must do.

| Rule ID | Facet(s) | Source-derived rule | Evidence |
|---|---|---|---|
| HYP-FILE-001 | Behaviour, Data, Performance | The scan input is expanded recursively into a de-duplicated ordered set of files before hashing. | `MalwareScanner.kt`, `doInBackground`, lines 217–229. |
| HYP-FILE-002 | Behaviour, Configuration, Errors and Recovery | The scanner attempts database loading only when database files are available, and bounds the load attempt with a 90-second timeout. | `MalwareScanner.kt`, lines 245–258. |
| HYP-FILE-003 | Behaviour, Data | For each readable file, the implementation computes MD5, SHA-1 and SHA-256 digests in one streaming pass using a 4,096-byte buffer. | `MalwareScanner.kt`, `getFileHashes`, lines 397–438. |
| HYP-FILE-004 | Data, Business Rules | Hash strings are rendered as lowercase, zero-padded hexadecimal values with widths 32, 40 and 64 respectively. | `MalwareScanner.kt`, `getFileHashes`, lines 418–437. |
| HYP-FILE-005 | Behaviour, Errors and Recovery | Hashing exceptions are caught and printed; this method does not propagate a typed per-file failure result to its caller. | `MalwareScanner.kt`, `getFileHashes`, lines 397–438. |
| HYP-FILE-006 | Business Rules, Behaviour | Empty-file digest constants are excluded from signature matching. | `MalwareScanner.kt`, `checkSignature`, lines 354–359. |
| HYP-FILE-007 | Business Rules, Data | Signature matching uses Bloom-filter `mightContain` checks for the corresponding digest set; an extended MD5 set is checked only when loaded. | `MalwareScanner.kt`, `checkSignature`, lines 340–392. |
| HYP-FILE-008 | Behaviour, Errors and Recovery | A positive Bloom-filter membership result is surfaced as a **“Potential match”**, not as a definitive confirmed-malware verdict. | `MalwareScanner.kt`, lines 354–380. |
| HYP-FILE-009 | Business Rules | A scan with no matched signatures is reported as no detections in the loaded signature data; it does not establish that a file is safe or free of malware. | `MalwareScanner.kt`, lines 306–312 and 340–392. Interpretation is bounded by the implemented hash-list lookup. |
| HYP-FILE-010 | Behaviour, Errors and Recovery | If the required signature databases are not loaded, the scanner emits a database-unavailable message instead of performing the signature checks. | `MalwareScanner.kt`, lines 260–261 and 330–338 (verify exact surrounding lines in the pinned source before downstream adoption). |
| HYP-FILE-011 | Behaviour, Background Processing, Errors and Recovery | Cancellation is checked while iterating files; on cancellation the scan marks itself not running and returns without continuing the remaining files. | `MalwareScanner.kt`, lines 278–286 (line range to be rechecked against the full pinned file before final synthesis). |
| HYP-DB-001 | Data, Configuration | The default configured signature pack comprises MD5, SHA-1 and SHA-256 Bloom filters; extended MD5 and domain filters are conditional preferences. | `Database.kt`, `listDatabases`, lines 310–321. |
| HYP-DB-002 | Persistence, Configuration | Downloaded database artifacts are stored under the application's private files directory in a `signatures` subdirectory. | `Database.kt`, `initDatabase`, lines 323–331. |
| HYP-DB-003 | Integrations, Behaviour, Configuration | Database downloads use HTTP connections, a 90-second connect timeout, a 30-second read timeout, and a Hypatia User-Agent; optional Tor routing uses a local SOCKS proxy. | `Database.kt`, lines 65–86. |
| HYP-DB-004 | Behaviour, Errors and Recovery | A download is written to a `.new` temporary file; the implementation then attempts to rename that file into place. On caught download failure it deletes the temporary file. | `Database.kt`, lines 68–74 and 204–213; replacement at lines 216–230. |
| HYP-DB-005 | Behaviour, Persistence, Security Controls | A database file is loaded only when the public key, database file and detached-signature file all exist and signature verification returns true. | `Database.kt`, `loadDatabase`, lines 366–398. |
| HYP-DB-006 | Data, Security Controls | Verified Bloom-filter files are deserialized using an ASCII string funnel. | `Database.kt`, `loadDatabases`, lines 333–365. |
| HYP-DB-007 | Behaviour, Errors and Recovery | Missing files, failed signature validation or verification exceptions prevent that individual database from being loaded; the implementation logs a warning for verification failure. | `Database.kt`, lines 366–398. |
| HYP-DB-008 | Behaviour, Data | The implementation considers the core signature database loaded only when MD5, SHA-1 and SHA-256 filters are all non-null and have a positive approximate element count. | `Database.kt`, lines 246–254. |
| HYP-DB-009 | Behaviour, Security Controls | The detached-signature verifier parses a PGP signature list, reads a public key matching a configured key-ID suffix, initializes signature verification with that key, streams the signed file bytes into the verifier, and returns the cryptographic verification result. | `GPGDetachedSignatureVerifier.java`, `verify` and `readPublicKey`, lines 59–127. |
| HYP-DB-010 | Errors and Recovery | A non-signature-list first PGP object or an I/O error while reading that first object returns false; a PGP exception is converted to IOException; absence of a matching key raises an IllegalArgumentException. | `GPGDetachedSignatureVerifier.java`, lines 59–107 and 109–127. |

**Line-range caution:** The source files are pinned and their blob SHAs are recorded above. Before Phase 5 consumes any rule, recheck the marked approximate ranges and the exact source context. HYP-FILE-010 and HYP-FILE-011 are intentionally provisional pending that line audit.

## 4. Important interpretation limits

1. **Bloom-filter positives are candidates.** The source uses probabilistic `mightContain` membership and labels matches “Potential match”. It does not establish a definitive threat verdict or confidence threshold.
2. **No match is bounded.** A no-match result means no queried digest matched the loaded signature filters. It does not prove the file is benign, comprehensively covered, or absent from all threat intelligence.
3. **Coverage is unknown.** The inspected scanner code does not establish the completeness, freshness, provenance, licensing rights or false-positive/false-negative rate of the underlying signature datasets.
4. **File errors are under-specified.** The hashing method catches broad exceptions and prints stack traces. This source does not establish a user-facing typed error, retry policy or reliable per-file terminal status for all failures.
5. **Database readiness is a gate.** The core scanner requires all three primary digest filters to be considered loaded. Exact UX and product policy when the database is unavailable are not transferable to ZeroDeck.
6. **Signature verification is not a complete supply-chain policy.** The inspected code establishes detached-signature verification against a selected key ID. It does not by itself establish key rotation, rollback protection, trust-root provisioning, freshness policy, algorithm policy or compromise recovery.
7. **No ZeroDeck adoption is implied.** These are prior-art patterns to evaluate against the owner-approved manual file-analysis workflow, not requirements.

## 5. MVP and facet mapping

- **MVP-01 manual file security analysis:** HYP-FILE-001 through HYP-FILE-011 are reference patterns for file selection/expansion, hashing, database availability, matching and result limitations.
- **MVP-02 quarantine/file disposition:** no quarantine rule is extracted from these files. Hypatia's notification actions include deletion/uninstall/ignore paths, but these are not equivalent to the owner-approved quarantine, restore and permanent-delete lifecycle. Do not treat them as such.
- **MVP-03 website/link checking:** no URL-checking rule is extracted from Hypatia's file scanner/database files.
- **IP address investigation:** outside MVP; no extraction performed.

Applicable facets evidenced in this first pass: Behaviour, Business Rules, Data, Persistence, Integrations, Security Controls, Configuration, Background Processing, Errors and Recovery, and Performance and Resource Behaviour. This is not a complete facet audit; facets not directly evidenced here remain open rather than being treated as not applicable.

## 6. Unresolved properties handed forward

### Manual file analysis
- Supported file types, URI/SAF input handling, maximum file size/count, recursion boundaries and symlink behaviour.
- Whether files are read locally or uploaded; remote analysis is not established by this source.
- Required hash algorithms and canonical representation for ZeroDeck.
- Detection source selection, dataset rights, coverage, freshness, provenance, confidence and false-positive policy.
- Explicit states for inaccessible, corrupt, encrypted, unsupported, changing, interrupted and partially scanned files.
- Typed errors, retry policy, cancellation semantics, progress semantics and terminal-state guarantees.
- Whether a Bloom filter is appropriate; no accuracy or benchmark evidence is established here.

### Quarantine and disposition
- No quarantine implementation was inspected in this first pass.
- SAF URI grants, scoped-storage constraints, atomic isolation, encryption, integrity, retention, restore, deletion, process death and uninstall remain unexamined.

### Website/link checking
- Web Risk request schema, threat-type selection, result interpretation, `expireTime`, cache obligations, URL disclosure, timeouts, quota and provider error semantics remain to be extracted in the next work package.
- Owner-declared Pro entitlement and owner-controlled activation gates remain authoritative product intent; they are not implemented or proven by Web Risk documentation.

## 7. Next extraction work

1. Audit the exact line references and inspect the full relevant method context for every HYP rule.
2. Inspect official Android Storage Access Framework, storage and Keystore documentation; derive quarantine constraints without claiming an implementation exists.
3. Extract Google Web Risk Lookup API request/response, threat-type and cache contracts; distinguish provider contract from ZeroDeck product policy.
4. Add a separate source-derived rule register for each capability and maintain unresolved-property coverage across all 15 facets.
5. Update the tracker after each verified work package. Phase 4 remains incomplete until all selected reference sources have been traced and all extracted claims are auditable.
