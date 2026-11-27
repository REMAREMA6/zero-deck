# ZeroDeck MVP — Rule Traceability Register

**Maturity:** Draft  
**Purpose:** Connect every adopted owner-declared and product-material rule to its authority and evidence. Prior-art source rules remain contextual and are not silently promoted to ZeroDeck requirements.

## 1. Owner-declared rules

| Rule ID | Evidence class | Evidence references | Traceable statement |
|---|---|---|---|
| ZD-OWNER-001 | Owner-declared | EVD-ZD-SCOPE-001 | First MVP contains exactly manual file security analysis, quarantine/file disposition, and website/link checking. |
| ZD-OWNER-002 | Owner-declared | EVD-ZD-SCOPE-001 | IP address tracking/investigation is a future candidate and explicitly excluded from MVP. |
| ZD-OWNER-003 | Owner-declared | EVD-ZD-PRO-001 | Website/link checking requires Pro entitlement. |
| ZD-OWNER-004 | Owner-declared | EVD-ZD-PRO-001 | Link checking remains disabled until the owner explicitly activates the separate owner-controlled switch when paid-user revenue can fund operating/API costs. |
| ZD-OWNER-005 | Owner-declared | EVD-ZD-PRO-001 | No provider/API lookup may occur when Pro entitlement is absent or the owner switch is disabled; both gates must allow the operation. |
| ZD-OWNER-006 | Owner-declared | EVD-ZD-PRO-001 | Pro does not mean unlimited checks; usage allowances/quotas and budget controls are required, while exact values remain unresolved. |

## 2. Product-material rules

All rows below derive from the pinned working-draft document EVD-SRC-PRODUCT-001. The source labels itself Working draft. Rule maturity remains provisional; proposed values and open decisions are not promoted to final owner requirements.

### MVP-01 — Manual file security analysis

| Rule ID | Evidence references | Traceable statement |
|---|---|---|
| PM-FILE-001 | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001; EVD-ZD-MAP-001 | User manually chooses a file and requests a scan. |
| PM-FILE-002 | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001 | Result classes distinguish Threat found, Suspicious, No threat found, and Could not decide. |
| PM-FILE-003 | EVD-SRC-PRODUCT-001 | No-known-threat must not be presented as a guarantee that the file is safe. |
| PM-FILE-004 | EVD-SRC-PRODUCT-001 | Unsupported, inaccessible, interrupted and engine-failure cases must not be represented as successful scans. |
| PM-FILE-005 | EVD-SRC-PRODUCT-001 | On-device is the default analysis location; files are not uploaded to cloud by default. |
| PM-FILE-006 | EVD-SRC-PRODUCT-001 | Any future cloud file analysis must be separate, clearly explained and subject to appropriate user consent and data disclosure. |
| PM-FILE-007 | EVD-SRC-PRODUCT-001 | SHA-256 is a planned direction for fingerprints/integrity, not a verified or frozen implementation. |
| PM-FILE-008 | EVD-SRC-PRODUCT-001; EVD-ZD-MAP-001 | Supported file types/sizes, engine and local detection method remain open. |

### MVP-02 — Quarantine and file disposition

| Rule ID | Evidence references | Traceable statement |
|---|---|---|
| PM-QUAR-001 | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001 | Confirmed malware is automatically quarantined only when permitted and the operation succeeds; confirmation threshold remains open. |
| PM-QUAR-002 | EVD-SRC-PRODUCT-001 | Suspicious files are reviewed; clean files remain untouched; unknown/inconclusive files are rescanned or reviewed and not assumed malicious. |
| PM-QUAR-003 | EVD-SRC-PRODUCT-001; EVD-DOC-ANDROID-001; EVD-ZD-P4-001 | Encrypted app-private on-device storage is the working-draft baseline; actual implementation and guarantees are unverified. |
| PM-QUAR-004 | EVD-SRC-PRODUCT-001 | 30-day default retention, configurability, automatic expiry and manual deletion are proposed, not final. |
| PM-QUAR-005 | EVD-SRC-PRODUCT-001 | Restoration requires a fresh security scan and user confirmation; exact scan mechanism/timing remain open. |
| PM-QUAR-006 | EVD-SRC-PRODUCT-001 | Restored file is checked against its recorded hash; exact algorithm is not fixed by this rule. |
| PM-QUAR-007 | EVD-SRC-PRODUCT-001; EVD-DOC-ANDROID-001; EVD-ZD-P4-001 | Failed deletion retains the record and is reported accurately; exact partial-operation/recovery semantics remain open. |
| PM-QUAR-008 | EVD-SRC-PRODUCT-001 | Quarantine, restoration and deletion must be auditable; audit fields/storage/retention/access remain open. |
| PM-QUAR-009 | EVD-SRC-PRODUCT-001 | Quarantined files must never be executed. |
| PM-QUAR-010 | EVD-SRC-PRODUCT-001; EVD-DOC-KEYSTORE-001; EVD-ZD-P4-001 | Android Keystore is the working-draft key-protection direction; device support, key policy and runtime enforcement remain unverified. |
| PM-QUAR-011 | EVD-SRC-PRODUCT-001; EVD-DOC-ANDROID-001 | Do not overwrite unrelated user files during quarantine or restoration; atomicity/conflict policy remain open. |
| PM-QUAR-012 | EVD-SRC-PRODUCT-001; EVD-DOC-ANDROID-001 | Explain what happens to quarantined data on app uninstall; actual lifecycle consequences remain unverified. |
| PM-QUAR-013 | EVD-SRC-PRODUCT-001 | Manage scan history separately from quarantine retention; this does not approve scan history as a standalone MVP capability. |

### MVP-03 — Website and link checking

| Rule ID | Evidence references | Traceable statement |
|---|---|---|
| PM-LINK-001 | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001; EVD-ZD-MAP-001 | User supplies a website link; exact input method remains open. |
| PM-LINK-002 | EVD-SRC-PRODUCT-001 | Result classes distinguish Likely dangerous, No known threat found, and Could not decide. |
| PM-LINK-003 | EVD-SRC-PRODUCT-001; EVD-ZD-P4-001 | No-known-threat is not a guarantee that the website is safe; provider lookup semantics are bounded to requested threat lists. |
| PM-LINK-004 | EVD-SRC-PRODUCT-001 | Do not claim whole-site inspection when only the submitted link was checked. |
| PM-LINK-005 | EVD-SRC-PRODUCT-001 | Explain clearly when a link appears dangerous, suspicious or cannot be checked confidently; exact taxonomy/wording remain open. |
| PM-LINK-006 | EVD-SRC-PRODUCT-001; EVD-ZD-P4-001 | Detection method/provider and execution location remain open; Web Risk is a reference contract only. |

## 3. Prior-art and platform/provider rule families

| Rule family | Evidence reference | Source class | Transfer boundary |
|---|---|---|---|
| HYP-FILE-001–011 | EVD-SRC-HYP-001 | Source-derived prior art | Hypatia's scan input, hashing, Bloom matching, candidate verdict, cancellation and failure behaviour; not a ZeroDeck algorithm or verdict policy. |
| HYP-DB-001–010 | EVD-SRC-HYP-001 | Source-derived prior art | Hypatia database loading and detached-signature verification; not a ZeroDeck trust-root or update policy. |
| HYP-GEN-001–010 | EVD-SRC-HYPDB-001 | Source-derived prior art | One signature-feed generation pipeline; does not approve feed redistribution, vendor selection or generator adoption. |
| AND-STO-001–006 | EVD-DOC-ANDROID-001 | Platform documentation | Android storage/SAF constraints only; no universal move/delete/atomicity guarantee. |
| AND-KEY-001–005 | EVD-DOC-KEYSTORE-001 | Platform documentation | Android key-protection capabilities/limitations only; no ZeroDeck cipher/key lifecycle selected. |
| WR-API-001–012 | EVD-DOC-WEBRISK-001 | Provider documentation | Web Risk Lookup contract/pricing/caching reference only; no production-provider procurement or actual ZeroDeck integration. |

## 4. Evidence not available

- No ZeroDeck runtime observation, execution, API trace, persisted record, background job, authentication event, authorization decision, security-control test or performance measurement exists.
- The product mockup/source repository does not establish runtime screen equivalence.
- Actual ZeroDeck build, target environment and deployed system boundary remain unidentified.
- Owner decisions establish intended scope/policy, not runtime enforcement. The pinned scanner product document is a Working draft; proposed retention and open design choices remain provisional.

## 5. Traceability rule for future edits

Every new ZeroDeck rule must identify an owner decision, product-material artifact, runtime observation, source-derived inference about ZeroDeck source, or external declared contract. Every prior-art fact remains attributed to its originating project/provider. Unsupported propositions remain proposed or unknown.


## 6. Phase 7 reference-runtime observations — contextual only

| Evidence ID | Evidence reference | Source class | Traceability disposition |
|---|---|---|---|
| EVD-RT-REF-001 | `re/zerodek-product-re/2026-11-27/PHASE-7-RUNTIME-OBSERVATION-MAP.md` | Runtime-observed behaviour of pinned reference projects in upstream CI | Contextual evidence only. It records Hypatia CI completion, HypatiaDatabases generation/feed/publication outcomes, and ClamAV verification/signature/callback tests. No ZeroDeck rule is traced to this record because the executions were not ZeroDeck runtime and no owner decision adopts those reference behaviours. |

The Phase 7 evidence does not change the adopted owner-declared or product-material rule rows above. The ZeroDeck capture therefore retains zero runtime observations and zero runtime-derived ZeroDeck rules. The reference evidence remains in the RE workspace; this register points to it without copying raw logs or promoting reference implementation details into requirements.
