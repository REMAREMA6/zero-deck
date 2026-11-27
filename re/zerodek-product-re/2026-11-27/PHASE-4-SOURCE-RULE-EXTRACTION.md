# Phase 4 — Source-level rule extraction

**Engagement:** ZeroDeck product reverse engineering  
**Opened:** 2026-11-27  
**Completed:** 2026-11-27  
**Status:** Complete — source and documented-contract extraction recorded for all three owner-approved MVP capabilities; 15-facet evidence/unknown audit attached below and in the companion audit.  
**Evidence boundary:** No ZeroDeck runtime was available or exercised. Nothing in this report is a runtime observation of ZeroDeck.

## 1. Purpose and classification

This report records evidence-backed source rules and documented platform/provider contracts from the references selected in Phase 3. Prior-art behaviour is not automatically a ZeroDeck requirement.

Classification:
- **SRC** — directly supported by inspected source code at an immutable repository revision.
- **DOC** — directly supported by an official platform/provider document. The cited web documentation is mutable; access date and page section/anchor are recorded rather than inventing a source commit.
- **OWNER** — explicit owner-declared product intent, cited to the project decision record.
- **UNKNOWN** — property not established by the available evidence.
- **INFERENCE** — bounded interpretation derived from cited source facts; it is not presented as a direct statement from the source.

No rule in this report is runtime-verified for ZeroDeck.

## 2. Provenance register

### SRC-01 — MaintainTeam/Hypatia

- Repository: https://github.com/MaintainTeam/Hypatia
- Revision: `c0f98977be935e58849726313635a2459cac3892`
- Licence: AGPL-3.0; embedded GPG verifier has its own Arduino GPL-2.0-or-later notice and exception, as recorded in the Phase 3 register.
- Inspected files and blob SHAs:
  - `app/src/main/java/us/spotco/malwarescanner/MalwareScanner.kt` — `d3a7e04b73c99bbe2aa50d8db61667ad4495aa97`
  - `app/src/main/java/us/spotco/malwarescanner/Database.kt` — `586536236cebfd4a4576118ab985f56d462dc1b7`
  - `app/src/main/java/us/spotco/malwarescanner/GPGDetachedSignatureVerifier.java` — `9f7673a33763ef8f298a674bbaac0deac9681930`
- Inspected: 2026-11-27.
- Role: prior-art reference for manual file analysis and signed signature-database loading. No code/dependency adoption is approved.

### SRC-02 — MaintainTeam/HypatiaDatabases

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Revision: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- Licence: generator repository declares AGPL-3.0-or-later; individual upstream feeds and datasets retain their own rights.
- Inspected files and blob SHAs:
  - `README.md` — `c40ca305e7595c04812b1599550653123ea6c96a`
  - `src/main/java/org/maintainteam/hypatiadatabases/App.java` — `fd67153e7b8f8ff6d4b20cd18eccd4d74e4f4a19`
  - `.github/workflows/generate_stable.yml` — `570e11b6a4110c56e91c103d320b595d7095f3b7`
  - `src/main/java/org/maintainteam/hypatiadatabases/scripts/0genbloom.sh` — `c7fbf6cb2e36f76fb472bbba9d4d00b70df24533`
- Inspected: 2026-11-27.
- Role: reference for feed aggregation, parsing, exclusions, Bloom-filter generation and publication workflow. The README states that GitHub is a manual mirror/backup of Codeberg; the pinned GitHub snapshot is the inspected evidence, not proof of all current upstream operation.

### DOC-01 — Android storage and Storage Access Framework

- Official pages:
  - https://developer.android.com/training/data-storage
  - https://developer.android.com/guide/topics/providers/document-provider
- Sections inspected: “Categories of storage locations”, “Permissions and access to external storage”, “Scoped storage”, SAF “Overview”, “Control flow”, and “Write a client app”.
- Accessed: 2026-11-27.
- These are mutable official platform documents, not immutable source revisions.

### DOC-02 — Android Keystore

- Official page: https://developer.android.com/privacy-and-security/keystore
- Sections inspected: “Security features”, “Extraction prevention”, “StrongBox KeyMint secure element”, “Key use authorizations”, and “Require user authentication for key use”.
- Accessed: 2026-11-27.
- Mutable official platform document; no immutable revision identifier was exposed.

### DOC-03 — Google Web Risk Lookup API

- Official pages:
  - https://cloud.google.com/web-risk/docs/lookup-api
  - https://cloud.google.com/web-risk/docs/reference/rest/v1/uris/search
  - https://cloud.google.com/web-risk/docs/reference/rest/v1/ThreatType
  - https://cloud.google.com/web-risk/docs/caching
  - https://cloud.google.com/web-risk/pricing
- Sections inspected: Lookup overview/checking URLs/example; REST HTTP request/query parameters/request body/response body/authorization scopes/ThreatUri; ThreatType enum; Lookup API caching; pricing overview and pricing tables.
- Accessed: 2026-11-27. The REST method page displayed last updated 2025-05-03 UTC; ThreatType displayed 2026-05-11 UTC; caching displayed 2026-11-10 UTC. Pricing was checked on the access date.
- This is a selected provider-contract reference, not a procurement decision or deployed ZeroDeck integration.

### OWNER-01 — Pro-gated link-check decision

- Decision: `ZD-DEC-2026-11-27-02`
- Record: [PRO-GATED-LINK-CHECK-DECISION.md](PRO-GATED-LINK-CHECK-DECISION.md)
- Blob SHA at Phase 4 inspection: `8887085dfc323c3f304ef29a74bfecb1a361f751`
- Classification: owner-declared product intent, not observed implementation.

### Comparison-only / non-transferred references

- **SRC-06 ClamAV** remains a comparison reference only. No ZeroDeck engine, server deployment, file-upload flow or ClamAV dependency was selected. Its architecture and licence/operational implications remain separate decisions.
- **SRC-05 muety/safe-browse-url-lookup** remains rejected for adoption; it wraps the non-commercial Safe Browsing v4 API and its old boolean mapping does not define the ZeroDeck result contract.
- No code, data feed, provider account, SDK or third-party dependency is approved by this extraction.

## 3. Extracted rules — manual file analysis

The following 21 rules were recorded in the first extraction pass and retained after review. They describe Hypatia, not ZeroDeck.

| Rule ID | Facets | Source-derived rule | Evidence |
|---|---|---|---|
| HYP-FILE-001 | Behaviour, Data, Performance | The scan input is expanded recursively into a de-duplicated ordered set of files before hashing. | `MalwareScanner.kt`, `doInBackground`, lines 217–229. |
| HYP-FILE-002 | Behaviour, Configuration, Errors and Recovery | The scanner attempts database loading only when database files are available, and bounds the load attempt with a 90-second timeout. | `MalwareScanner.kt`, lines 245–258. |
| HYP-FILE-003 | Behaviour, Data | For each readable file, the implementation computes MD5, SHA-1 and SHA-256 digests in one streaming pass using a 4,096-byte buffer. | `MalwareScanner.kt`, `getFileHashes`, lines 469–471. |
| HYP-FILE-004 | Data, Business Rules | Hash strings are rendered as lowercase, zero-padded hexadecimal values with widths 32, 40 and 64 respectively. | `MalwareScanner.kt`, `getFileHashes`, lines 418–437. |
| HYP-FILE-005 | Behaviour, Errors and Recovery | Hashing exceptions are caught and printed; this method does not propagate a typed per-file failure result to its caller. | `MalwareScanner.kt`, `getFileHashes`, lines 397–438. |
| HYP-FILE-006 | Business Rules, Behaviour | Empty-file digest constants are excluded from signature matching. | `MalwareScanner.kt`, `checkSignature`, lines 389–390. |
| HYP-FILE-007 | Business Rules, Data | Signature matching uses Bloom-filter `mightContain` checks for the corresponding digest set; an extended MD5 set is checked only when loaded. | `MalwareScanner.kt`, `checkSignature`, lines 382–430. |
| HYP-FILE-008 | Behaviour, Errors and Recovery | A positive Bloom-filter membership result is surfaced as “Potential match”, not as a definitive confirmed-malware verdict. | `MalwareScanner.kt`, lines 390–414. |
| HYP-FILE-009 | Business Rules | A scan with no matched signatures is reported as no detections in the loaded signature data; it does not establish that a file is safe or free of malware. | `MalwareScanner.kt`, lines 317–320 and 382–430. Interpretation is bounded by implemented hash-list lookup. |
| HYP-FILE-010 | Behaviour, Errors and Recovery | If required signature databases are not loaded, the scanner emits a database-unavailable message instead of performing signature checks. | `MalwareScanner.kt`, lines 366–368. |
| HYP-FILE-011 | Behaviour, Background Processing, Errors and Recovery | Cancellation is checked while iterating files; on cancellation the scan marks itself not running and returns without continuing remaining files. | `MalwareScanner.kt`, lines 286–291. |
| HYP-DB-001 | Data, Configuration | The default configured signature pack comprises MD5, SHA-1 and SHA-256 Bloom filters; extended MD5 and domain filters are conditional preferences. | `Database.kt`, `listDatabases`, lines 310–321. |
| HYP-DB-002 | Persistence, Configuration | Downloaded database artifacts are stored under the application's private files directory in a `signatures` subdirectory. | `Database.kt`, `initDatabase`, lines 323–331. |
| HYP-DB-003 | Integrations, Behaviour, Configuration | Database downloads use HTTP connections, a 90-second connect timeout, a 30-second read timeout, and a Hypatia User-Agent; optional Tor routing uses a local SOCKS proxy. | `Database.kt`, lines 65–86. |
| HYP-DB-004 | Behaviour, Errors and Recovery | A download is written to a `.new` temporary file; the implementation then attempts to rename that file into place. On caught download failure it deletes the temporary file. | `Database.kt`, lines 68–74 and 204–230. |
| HYP-DB-005 | Behaviour, Persistence, Security Controls | A database file is loaded only when the public key, database file and detached-signature file all exist and signature verification returns true. | `Database.kt`, `loadDatabase`, lines 366–398. |
| HYP-DB-006 | Data, Security Controls | Verified Bloom-filter files are deserialized using an ASCII string funnel. | `Database.kt`, `loadDatabases`, lines 333–365. |
| HYP-DB-007 | Behaviour, Errors and Recovery | Missing files, failed signature validation or verification exceptions prevent that individual database from being loaded; the implementation logs a warning for verification failure. | `Database.kt`, lines 366–398. |
| HYP-DB-008 | Behaviour, Data | The implementation considers the core signature database loaded only when MD5, SHA-1 and SHA-256 filters are all non-null and have a positive approximate element count. | `Database.kt`, lines 246–254. |
| HYP-DB-009 | Behaviour, Security Controls | The detached-signature verifier parses a PGP signature list, reads a public key matching a configured key-ID suffix, initializes verification with that key, streams signed file bytes into the verifier, and returns the cryptographic verification result. | `GPGDetachedSignatureVerifier.java`, `verify` and `readPublicKey`, lines 59–127. |
| HYP-DB-010 | Errors and Recovery | A non-signature-list first PGP object or an I/O error while reading that first object returns false; a PGP exception is converted to IOException; absence of a matching key raises IllegalArgumentException. | `GPGDetachedSignatureVerifier.java`, lines 59–107 and 109–127. |

### 3.1 Additional rules — signature-database generation

These 10 rules extend the manual file-analysis evidence chain into the upstream database-generation pipeline.

| Rule ID | Facets | Source-derived rule | Evidence |
|---|---|---|---|
| HYP-GEN-001 | Configuration, Background Processing | The stable generation workflow can be started manually and is scheduled by cron at 01:00 UTC on every second day-of-month pattern expressed as `0 1 */2 * *`. | `generate_stable.yml`, lines 1–6. |
| HYP-GEN-002 | Integrations, Data | The workflow combines multiple separately sourced indicator feeds, including ClamAV-extracted signatures, ESET, Signature-Base, ThreatView, ThreatFox, MalwareBazaar, Stalkerware, SaneSecurity, Avast COVID-19 indicators, Targeted Threats and Divest domain data. | `generate_stable.yml`, lines 22–27 and 37–177; README “Databases”. |
| HYP-GEN-003 | Data, Behaviour | The generator accepts multiple feed formats, including ClamAV `.hdb/.hsb/.hdu/.hsu`, one-hash-per-line formats, Loki semicolon formats, and best-effort text files; gzip inputs are decompressed before parsing. | `App.java`, lines 143–198. |
| HYP-GEN-004 | Data, Business Rules | Candidate indicators are lowercased, checked for hexadecimal form and accepted only at lengths 32, 40 or 64; other parsed lengths and non-hex values are counted as invalid. | `App.java`, lines 263–307. |
| HYP-GEN-005 | Business Rules, Data | Exclusion files are parsed into a set of valid 32-, 40- and 64-character hexadecimal hashes; matching entries are skipped during generation. | `App.java`, lines 95–117 and 263–269. |
| HYP-GEN-006 | Configuration, Performance and Resource Behaviour | Bloom filters are created with configured capacity estimates and a requested expected false-positive probability of 0.00001; MD5 capacity differs in extended mode. | `App.java`, lines 69–82. These are generator parameters, not measured runtime accuracy. |
| HYP-GEN-007 | Behaviour, Data | Domain indicators are loaded only when the non-extended invocation supplies a second argument; domain lines are lowercased and comment lines are skipped. | `App.java`, lines 119–141. |
| HYP-GEN-008 | Behaviour, Data | The generator sorts input file names before processing and optionally combines an extras directory in non-extended mode. | `App.java`, lines 143–150. |
| HYP-GEN-009 | Data, Performance and Resource Behaviour | The generator reports approximate element counts, configured capacities, fill percentages and Bloom-filter expected false-positive probabilities. | `App.java`, lines 201–212. These reported values are not independent validation of feed correctness or real-world detection rates. |
| HYP-GEN-010 | Persistence, Behaviour | The generator serializes separate MD5, SHA-1, SHA-256 and domain Bloom-filter artifacts to named binary files. | `App.java`, lines 234–252. |

The workflow also records a build report and selects the generated database artifacts for deployment to an unsigned branch (`generate_stable.yml`, lines 179–217). The README describes a subsequent self-hosted CI signing/deployment process. The inspected pinned workflow alone does not establish the complete signing pipeline's operational reliability, key custody, rollback protection or data-feed licensing.

### 3.2 Interpretation limits — file analysis

1. Bloom-filter positives are candidates. Hypatia labels matches “Potential match”; it does not establish a definitive threat verdict or confidence threshold.
2. A no-match result means only that queried digests did not match the loaded filters. It does not prove benignness or complete coverage.
3. Feed completeness, freshness, provenance quality, false-positive/false-negative rates and rights to redistribute each feed are not established by the scanner source.
4. The hashing method catches broad exceptions and prints stack traces. It does not define a reliable typed per-file error contract.
5. The core database readiness check requires all three primary digest filters to be loaded. ZeroDeck is not required to copy that readiness policy.
6. Detached-signature verification does not by itself establish key rotation, rollback prevention, freshness, root-key provisioning or compromise recovery.
7. The generator's expected false-positive parameter is a Bloom-filter design input, not an empirical malware detection rate.
8. Feed sources in the workflow include mutable upstream branch URLs and live downloads. The pinned workflow revision does not pin every feed snapshot used at each run; reproducible feed provenance is therefore not demonstrated.
9. Source names and aggregation do not establish that the resulting feed data may be redistributed commercially. Rights must be evaluated per feed before any adoption.
10. No malware samples were executed, no live threat feeds were consumed for a ZeroDeck implementation, and no ZeroDeck detection accuracy/performance test was run.

## 4. Extracted rules — quarantine and file disposition platform constraints

These rules describe Android platform contracts, not a completed ZeroDeck quarantine implementation.

| Rule ID | Facets | Documented platform rule / bounded implication | Evidence |
|---|---|---|---|
| AND-STO-001 | Persistence, Security Controls | Android distinguishes app-specific storage from shared storage. Internal app-specific storage is private to the app and does not require storage permission for access by that app. | DOC-01, “Categories of storage locations” and storage comparison table. |
| AND-STO-002 | Persistence, Behaviour | App-specific files are removed when the app is uninstalled. A quarantine design relying only on app-specific storage therefore does not provide post-uninstall retention. | DOC-01, storage comparison table. |
| AND-STO-003 | Persistence, Errors and Recovery | External app-specific storage may be unavailable when removable storage is removed; internal storage is described as always available on devices. | DOC-01, “Categories of storage locations”. |
| AND-STO-004 | Authorization and Permissions, Security Controls | For apps targeting Android 10/API 29 or higher, scoped storage is the default; access is limited to app-specific directories and specific media created by the app unless a supported access path is used. | DOC-01, “Scoped storage”. |
| AND-STO-005 | Authorization and Permissions, Security Controls | Android 11/API 30's MANAGE_EXTERNAL_STORAGE provides broad file access outside app-specific directories and MediaStore, but Android documentation says most apps do not need it for their use cases. | DOC-01, “Permissions and access to external storage”. This is not a recommendation to request it for ZeroDeck. |
| AND-SAF-001 | Interface, Behaviour, Authorization and Permissions | SAF client apps invoke system document-picker actions such as ACTION_OPEN_DOCUMENT, ACTION_CREATE_DOCUMENT or ACTION_OPEN_DOCUMENT_TREE; the system picker mediates user selection across providers. | DOC-01, SAF “Overview” and “Control flow”. |
| AND-SAF-002 | Authorization and Permissions, Persistence | SAF can grant long-term persistent access to provider-owned documents; persistent URI access must be explicitly retained by the client using the platform's persistable-grant mechanism where offered. | DOC-01, SAF “Overview” and “Write a client app”. |
| AND-SAF-003 | Data, Integrations | A document provider exposes unique document IDs that remain stable once issued and are used for persistent URI grants across device reboots. | DOC-01, SAF “Overview”. |
| AND-SAF-004 | Behaviour, Authorization and Permissions, Errors and Recovery | Document capabilities are provider-specific and exposed through flags such as FLAG_SUPPORTS_WRITE and FLAG_SUPPORTS_DELETE. The client must not assume every provider document supports writing or deletion. | DOC-01, SAF “Overview”. |
| AND-SAF-005 | Integrations, Errors and Recovery | SAF abstracts provider storage; a provider may represent local, cloud or transient/removable storage. A selected document can therefore depend on an external provider and its availability. | DOC-01, SAF “Overview” and “Control flow”. |
| AND-SAF-006 | Behaviour, Persistence, Errors and Recovery | A SAF-selected document is accessed through the provider/URI interface; provider capabilities and granted operations determine whether the client can read, write or delete it. The platform does not establish a universal atomic move operation across all providers. | DOC-01, SAF “Control flow” and “Overview”. The absence of a universal atomic-move contract is a bounded inference from the documented provider-mediated operations, not a claim that no provider can implement one. |
| AND-KEY-001 | Security Controls, Configuration | Android Keystore stores cryptographic keys so key material is non-exportable from the application process; cryptographic operations are performed by the system process. | DOC-02, “Security features” and “Extraction prevention”. |
| AND-KEY-002 | Security Controls | Keystore can restrict key usage, including cryptographic mode and whether user authentication is required. | DOC-02, “Key use authorizations” and “Require user authentication for key use”. |
| AND-KEY-003 | Security Controls, Errors and Recovery | Hardware-backed key storage is conditional on device support and the algorithm/mode/padding/digest combination; the app must query key security level rather than assume StrongBox/TEE backing. | DOC-02, “Extraction prevention” and “StrongBox KeyMint secure element”. |
| AND-KEY-004 | Security Controls | Non-exportability does not prevent a compromised app process from invoking permitted operations with the key while it remains authorized. | DOC-02, “Extraction prevention”. |
| AND-KEY-005 | Security Controls, Persistence | Keystore protects key material; it does not itself define quarantine-file encryption, file lifecycle, backup, retention, recovery or deletion semantics. Those are separate design requirements not established by DOC-02. | Bounded scope statement from DOC-02; corresponding ZeroDeck properties remain UNKNOWN. |

### 4.1 Quarantine-specific unknowns

The Android sources establish access constraints, not ZeroDeck's isolation strategy. The following remain product/implementation decisions:
- Whether quarantine is a copy into app-private storage, provider-side relocation, or another isolation mechanism.
- Whether the original is removed after verified isolation, and what constitutes a verified commit.
- How the app verifies copied content identity/integrity before declaring quarantine successful.
- Whether encrypted quarantine is required; cipher, key generation, key protection, rotation and recovery.
- Behaviour when the source provider does not support deletion, loses access, disconnects or revokes permission.
- Atomicity, crash consistency, partial copy, disk-full and process-death recovery.
- Restore preconditions, whether a fresh scan is mandatory, destination conflict policy and integrity re-verification.
- Permanent deletion semantics and whether provider deletion can be guaranteed.
- Retention duration, user-initiated purge, backup/restore, app uninstall and key-loss consequences.
- Exact user confirmation, audit/history and terminal state after each partial or failed operation.
- Supported Android versions, target SDK, file types, size limits and storage-pressure policy.

No source in this work package demonstrates that ZeroDeck currently implements quarantine.

## 5. Extracted rules — website and link checking

These rules describe the selected Google Web Risk Lookup API contract and the separate owner gate. They do not establish that ZeroDeck has selected or deployed Google as its production provider.

### 5.1 Provider contract

| Rule ID | Facets | Documented contract | Evidence |
|---|---|---|---|
| WR-API-001 | API, Integrations | Lookup uses HTTP GET on `https://webrisk.googleapis.com/v1/uris:search`. | DOC-03, Lookup API “Checking URLs”; REST “HTTP request”. |
| WR-API-002 | API, Data | Each Lookup request checks exactly one URL; checking multiple URLs requires separate requests. | DOC-03, Lookup API “Checking URLs”. |
| WR-API-003 | API, Data | The request requires a `uri` string and one or more `threatTypes`; multiple threat types are expressed by repeating the `threatTypes` query parameter. The request body is empty. | DOC-03, REST “Query parameters” and “Request body”; Lookup API “Checking URLs”. |
| WR-API-004 | Data, Business Rules | The provider documents that the submitted URL must be valid under RFC 2396 but need not be canonicalized. REST query parameters, including the URI, must be URL-encoded. | DOC-03, Lookup API “Checking URLs”. |
| WR-API-005 | API, Data | A successful response may contain a `threat` object with matching threat types and an `expireTime`; the `threat` field may be empty when no requested list matches. | DOC-03, REST “Response body” and “ThreatUri”. |
| WR-API-006 | Business Rules, Data | The documented ThreatType enum includes MALWARE, SOCIAL_ENGINEERING, UNWANTED_SOFTWARE and SOCIAL_ENGINEERING_EXTENDED_COVERAGE; THREAT_TYPE_UNSPECIFIED is unused and should not be requested as a threat category. | DOC-03, ThreatType reference. |
| WR-API-007 | Business Rules | A response match identifies the requested threat list(s) in which the URL matched. A no-match response means no match in the requested threat lists; it is not a general guarantee that the URL or website is safe. | DOC-03, Lookup API example and REST method description. The non-guarantee is the bounded meaning of the documented list lookup. |
| WR-API-008 | Data, Persistence, Behaviour | The returned match's `expireTime` is an RFC3339 UTC timestamp and is the maximum cache lifetime for that match; clients must not cache the match beyond that timestamp. | DOC-03, REST “ThreatUri”. |
| WR-API-009 | Persistence, Behaviour, Integrations | Lookup clients should cache each returned ThreatUrl item until its `expireTime` and consult that cache before sending a subsequent `uris.search` request. | DOC-03, Caching “Lookup API”. |
| WR-API-010 | Security Controls, Integrations | The actual submitted URI is included in the request's `uri` query parameter sent to the Google Web Risk endpoint. Therefore the URL is disclosed to the provider when a lookup is performed. | DOC-03, REST “Query parameters” and Lookup API request example. The disclosure statement is a direct inference from the documented request. |
| WR-API-011 | Identity and Authentication, API | The REST method documents the `cloud-platform` OAuth scope; the Lookup guide's REST example also shows an API key query parameter. The final authentication mechanism and secret-handling model for a ZeroDeck integration are not selected by this reference. | DOC-03, REST “Authorization Scopes” and Lookup API example. |
| WR-API-012 | Errors and Recovery | The inspected Lookup contract does not define ZeroDeck's timeout, retry, cancellation, offline, quota-exhaustion, provider-outage or user-facing error mapping. These remain UNKNOWN. | DOC-03, inspected Lookup API and REST method sections. |

### 5.2 Pricing and operational constraints

- As checked 2026-11-27, the Web Risk pricing page lists up to 100,000 Lookup API `uris.search` calls per month as free, then USD $0.50 per 1,000 calls at/above the free tier.
- The same pricing page states that using `threatLists.computeDiff` changes the price of `uris.search` calls to the Lookup + Update confirmation price of USD $50.00 per 1,000 calls; `hashes.search` is also listed at USD $50.00 per 1,000 calls. The Phase 3 selected reference is Lookup-only; this report does not select the Update API.
- Other Google Cloud resources used by the project may incur separate charges.
- These figures are time-sensitive provider pricing, not a ZeroDeck cost guarantee. Recheck provider terms, prices, billing eligibility and account configuration before procurement and activation.
- The source does not provide a ZeroDeck budget, user allowance or API quota. Those are owner/product configuration decisions.

Evidence: DOC-03, https://cloud.google.com/web-risk/pricing (pricing overview, free usage and pricing tables), checked 2026-11-27.

### 5.3 Owner-declared access and activation rules

| Rule ID | Facets | Owner-declared rule | Evidence |
|---|---|---|---|
| ZD-LINK-OWNER-001 | Business Rules, Authorization and Permissions | Website/link checking remains in MVP-03 but access is restricted to users with the Pro entitlement. | OWNER-01, decision ZD-DEC-2026-11-27-02. |
| ZD-LINK-OWNER-002 | Configuration, Behaviour | The owner-controlled feature switch must remain off until the owner activates link checking when paid-user revenue can fund its operating/API costs. | OWNER-01. |
| ZD-LINK-OWNER-003 | Behaviour, Integrations, Security Controls | No paid provider lookup may be made for a non-Pro user or while the owner-controlled feature switch is off. | OWNER-01. |
| ZD-LINK-OWNER-004 | Business Rules, Configuration | Pro entitlement does not imply unlimited checks; usage limits/quotas and budget controls must be decided separately before activation. | OWNER-01. The need for controls is declared; exact limits are UNKNOWN. |
| ZD-LINK-OWNER-005 | Errors and Recovery, Business Rules | Paid entitlement does not mean a check succeeded; provider outcomes and failures must be reported accurately. | OWNER-01. |

The Pro entitlement gate and owner activation switch are two independent conditions. They must not be collapsed into one flag. Neither gate changes MVP membership.

### 5.4 Link-checking unknowns

- Production provider selection and commercial procurement.
- Exact threat types to request and the product's mapping from provider categories to user-facing outcomes.
- URL parsing/normalization policy, accepted schemes, hostnames, ports, credentials, fragments and invalid-input handling.
- Redirect handling and whether the product checks only the submitted URL or follows redirects.
- Consent/disclosure language and policy for sensitive URLs containing tokens, identifiers or private query/path data.
- Whether any URL is logged, persisted or retained, and redaction/access/retention policy.
- Authentication credential type, storage and rotation.
- Timeout, retry, cancellation, concurrency and provider-failure mapping.
- Cache key/normalization, cache storage location, invalidation, expiry enforcement and negative-cache policy. The inspected Lookup caching page specifies caching of returned positive ThreatUrl matches; it does not establish a negative-cache policy for Lookup.
- Rate limit, Pro allowance, per-user/day/month quota, global spend cap, alert threshold and owner kill-switch semantics.
- Pro entitlement source, subscription lifecycle, grace period, revocation, refunds and account identity mechanism.
- Activation threshold, launch date and who is authorized to switch the feature on.
- Availability, latency and accuracy targets; none was measured or specified here.

No production Web Risk key was used, and no real URL was submitted by or on behalf of ZeroDeck during this extraction.

## 6. Owner MVP capability mapping

| Approved capability | Extracted evidence | What this establishes | What it does not establish |
|---|---|---|---|
| MVP-01 Manual file security analysis | HYP-FILE-001–011; HYP-DB-001–010; HYP-GEN-001–010 | A concrete prior-art hash-scanning, signed-database-loading and feed-generation pipeline, including its decision boundaries and limitations. | ZeroDeck's algorithm, source feeds, file support, verdict policy, scan locality, UI, accuracy, runtime or performance. |
| MVP-02 Quarantine and file disposition | AND-STO-001–005; AND-SAF-001–006; AND-KEY-001–005 | Android storage/URI access constraints, provider-specific operation capabilities, app storage lifecycle and key-protection capabilities. | A complete quarantine, restore, deletion, integrity, encryption, retention or recovery implementation. |
| MVP-03 Website and link checking | WR-API-001–012; ZD-LINK-OWNER-001–005 | A provider lookup contract and owner-declared Pro/activation gates, with caching, disclosure and pricing constraints. | Production provider selection, final request types, user result policy, URL privacy policy, quotas, auth, runtime integration or actual availability. |

IP address tracking/investigation remains a future candidate explicitly excluded from MVP. No extraction or implementation requirement is created for it.

## 7. Fifteen-facet audit

The Software Rules facet catalogue defines facets as observation perspectives, not code modules. The audit therefore records evidence and gaps per capability; it does not force every facet to have an extracted source rule.

Legend:
- **E** — evidence exists in this phase, but is prior-art/platform/provider evidence, not ZeroDeck runtime proof.
- **O** — owner-declared intent exists.
- **U** — unresolved or not established.
- **C** — conditional; applicability depends on an unselected product/architecture choice.
- Multiple markers may apply.

| # | Software Rules facet | MVP-01 file analysis | MVP-02 quarantine | MVP-03 link checking |
|---:|---|---|---|---|
| 1 | Interface | U — no runtime UI capture; screens are design evidence only. | U — no runtime UI or complete disposition states. | U — no runtime UI/result wording evidence. |
| 2 | Behaviour | E — file expansion, hashing, database readiness, match and cancellation patterns. | E/U — SAF/provider operation boundaries documented; ZeroDeck state machine unknown. | E/O/U — provider request/result/cache contract and owner gates documented; ZeroDeck workflow unknown. |
| 3 | Business rules | E/U — hash lengths, Bloom membership and potential-match semantics in reference; ZeroDeck verdict criteria unknown. | E/U — platform capability constraints; quarantine eligibility and restore/delete policy unknown. | E/O/U — provider list matching/expiry and Pro/activation rules; ZeroDeck result mapping and quota policy unknown. |
| 4 | Data | E/U — digest formats, Bloom structures and generated feed artifacts; ZeroDeck schema unknown. | E/U — URI/document IDs and provider capability flags; quarantine metadata/schema unknown. | E/U — URI, threatTypes, ThreatUri and expireTime; ZeroDeck URL/result schema unknown. |
| 5 | Persistence | E/U — Hypatia stores signature artifacts in app-private files; ZeroDeck scan/quarantine persistence unknown. | E/U — Android storage and uninstall lifecycle documented; ZeroDeck quarantine location/durability unknown. | E/U — provider positive-cache requirement documented; ZeroDeck cache store and user history persistence unknown. |
| 6 | API | C/U — no ZeroDeck API established; optional remote analysis not selected. | C/U — no ZeroDeck API established for quarantine. | E/U — Web Risk REST contract documented; ZeroDeck's provider-facing API/backend contract and integration unselected. |
| 7 | Messaging | U/C — no evidence of a message broker/event transport for manual scanning. | U/C — no message/event contract established. | U/C — synchronous lookup is documented; no asynchronous message contract established. |
| 8 | Identity and authentication | C/U — account/authentication is not established as a required workflow. | C/U — device document grants are not app user authentication; account identity remains unselected. | O/U — Pro entitlement is required by owner decision, but principal and entitlement verification mechanism/lifecycle are unknown. |
| 9 | Authorization and permissions | E/U — source reads files; ZeroDeck file-picker and runtime access-grant behaviour unknown. | E/U — SAF grants and provider capability flags documented; ZeroDeck permission handling and enforcement unknown. | O/U — Pro gate and owner activation gate declared; enforcement location and anti-bypass controls unknown. |
| 10 | Security controls | E/U — signed database verification and hash matching in reference; ZeroDeck threat model, trust roots and file isolation unknown. | E/U — Keystore and Android permission constraints documented; encryption/isolation design unknown. | E/O/U — provider disclosure and owner gates documented; URL privacy, secret handling and abuse controls unknown. |
| 11 | Background processing | E/U — Hypatia async scan/cancellation and database generation workflow; ZeroDeck execution model unknown. | C/U — no selected background quarantine mechanism. | C/U — no background lookup or queue selected. |
| 12 | Errors and recovery | E/U — reference catches/logs errors and has database-unavailable/cancel paths; ZeroDeck typed errors/recovery unknown. | E/U — provider-dependent access and capability failures are relevant; ZeroDeck rollback/recovery unknown. | E/U — provider response semantics known; ZeroDeck timeout, retry, offline and quota failure handling unknown. |
| 13 | Integrations | E/U — signature feeds and database download integration in reference; ZeroDeck feeds/providers unselected. | E/U — Android SAF/document providers and Keystore platform contracts; ZeroDeck integration behaviour unknown. | E/U — Web Risk provider contract and URL disclosure; production integration not selected or deployed. |
| 14 | Configuration | E/U — Hypatia preferences and generator capacities; ZeroDeck defaults/limits unknown. | E/U — Android API/target-SDK storage rules; ZeroDeck supported OS/configuration unknown. | E/O/U — requested threat types and separate Pro/owner feature gates; effective configuration, quotas and activation values unknown. |
| 15 | Performance and resource behaviour | E/U — streaming buffer, timeouts and Bloom parameters in source; no ZeroDeck benchmark or target. | U — no quarantine workload, storage/CPU benchmark or performance target. | E/U — single-URL request and cache constraints; no ZeroDeck latency, throughput, quota or availability measurement. |

### 7.1 Facet audit conclusion

- All 15 facets have been explicitly reviewed for each of the three approved capabilities.
- Evidence exists in multiple facets, but source-derived evidence is not a substitute for ZeroDeck runtime capture.
- Messaging is not demonstrated by the selected sources for these MVP workflows; this is not evidence that the whole ZeroDeck product has no messaging.
- Identity/authentication, APIs, background processing and persistence remain conditional where no owner-approved architecture or runtime implementation establishes them.
- Interface remains unresolved at runtime for all three capabilities. The mockup inventory is retained as design evidence, not upgraded into runtime proof.
- Required unknowns are carried forward rather than filled with assumptions.

The companion file `PHASE-4-15-FACET-COVERAGE-AUDIT.md` records the same matrix and the evidence sufficiency boundary for phase handoff.

## 8. Phase 4 exit-gate assessment

The Phase 4 plan's exit gate is: each rule claim is auditable and linked to the ZeroDeck capability and applicable facet; unsupported claims are removed or marked unresolved.

| Exit criterion | Result | Evidence |
|---|---|---|
| Selected source references traced for MVP-01 | **Satisfied as source extraction** | Hypatia scanner/database/verifier and HypatiaDatabases generator/workflow traced at pinned revisions; 31 SRC rules recorded. |
| Android quarantine platform constraints traced for MVP-02 | **Satisfied as platform-contract extraction** | Storage, SAF and Keystore official documents inspected; 16 DOC rules recorded; no false claim that these implement quarantine. |
| Web Risk contract traced for MVP-03 | **Satisfied as provider-contract extraction** | Lookup, REST method, ThreatType, caching and pricing docs inspected; 12 DOC rules recorded. |
| Owner Pro/activation decisions represented separately | **Satisfied** | 5 OWNER rules linked to ZD-DEC-2026-11-27-02. |
| Every extracted rule has source provenance and facet mapping | **Satisfied for this report** | Rule tables include rule IDs, facets and file/line or official document section provenance. |
| All 15 facets reviewed for all three capabilities | **Satisfied as an evidence/gap audit** | Section 7 and companion audit. |
| Unsupported behaviour and required unknowns made visible | **Satisfied as handoff record** | Sections 3.2, 4.1, 5.4, 6 and 7. |
| ZeroDeck runtime behaviour verified | **Not satisfied / not claimed** | No deployed ZeroDeck target was available. This is outside what source-level extraction can prove. |
| Replication sufficiency established | **Not satisfied / not claimed** | Interface, business rules, schemas, runtime state transitions, errors, persistence and performance still contain required unknowns. Phase 6 must assess these. |

**Phase 4 exit gate: SATISFIED for source-level extraction and evidence/unknown mapping.** This closes the extraction phase only. It does not establish that the MVP is fully specified, that the selected references should be adopted, or that ZeroDeck is replication-sufficient.

## 9. Handoff to Phase 5

Phase 5 may now synthesize a technology-independent Software Rules deliverable, while preserving the following constraints:

1. Treat SRC rules as reference patterns, DOC rules as platform/provider contracts, and OWNER rules as declared product intent. Do not collapse their evidence classes.
2. Do not copy Hypatia's algorithms, feeds, timeouts, hash choices, Bloom parameters or error behaviour into ZeroDeck requirements without an explicit product decision.
3. Do not assume Android SAF provides universal move/delete/atomicity. Quarantine policy and lifecycle need owner/product decisions.
4. Preserve the bounded meaning of Web Risk results. A no-match is not “safe”; a match is constrained by requested threat types and `expireTime`.
5. Preserve URL disclosure as a product privacy decision. Do not silently log or persist full URLs.
6. Keep Pro entitlement and owner activation as separate gates. No paid lookup when either gate denies it. Exact entitlement lifecycle, usage allowance, quota and spend cap remain unresolved.
7. Do not create IP investigation requirements; it remains excluded from MVP.
8. Keep the 15-facet map and every unknown linked to a scenario and evidence record.
9. No runtime observations, malware execution, production provider calls or performance claims may be invented.

**Next phase:** Phase 5 — Software Rules synthesis. Create the product-specific deliverable in the designated `software-rules/` directory, following the current governing Software Rules model and schemas. Do not begin application implementation.
