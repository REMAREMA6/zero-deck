# ZeroDeck MVP — Rule Traceability Register

**Maturity:** Draft  
**Purpose:** Connect every adopted owner-declared or product-material workflow rule to its authority and evidence. Prior-art source rules remain contextual and are not silently promoted to ZeroDeck requirements.

## 1. ZeroDeck product rules

| Rule IDs | Evidence class | Evidence references | Interpretation |
|---|---|---|---|
| ZD-OWNER-001–002 | Owner-declared | EVD-ZD-SCOPE-001 | The three-capability MVP and IP exclusion are explicit owner decisions. |
| ZD-OWNER-003–006 | Owner-declared | EVD-ZD-PRO-001 | Pro entitlement, separate owner activation, no-call conditions and need for usage/budget controls are explicit owner decisions. |
| PM-FILE-001–008 | Product-material-derived | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001; EVD-ZD-MAP-001 | Manual file selection, result branches, on-device default, no silent cloud upload, consent boundary and SHA-256 planned direction are described in the pinned working draft. Engine, supported formats and thresholds remain open. |
| PM-QUAR-001–013 | Product-material-derived | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001; EVD-ZD-MAP-001; EVD-ZD-P4-001 | Quarantine policy, encrypted app-private storage baseline, proposed 30-day retention, fresh-scan/confirmation, hash verification, auditability, no execution, Keystore, no overwrite and uninstall disclosure are recorded with their draft/proposed maturity preserved. Android constraints inform feasibility but do not prove implementation. |
| PM-LINK-001–006 | Product-material-derived | EVD-SRC-PRODUCT-001; EVD-ZD-CAP-001; EVD-ZD-MAP-001; EVD-ZD-P4-001 | User-submitted URL, bounded result categories, no safety guarantee, no whole-site claim and unresolved input/provider/execution choices are recorded from the working draft. Web Risk informs one possible provider contract only. |

## 2. Prior-art and platform/provider rule families

| Rule family | Evidence reference | Source class | Transfer rule |
|---|---|---|---|
| HYP-FILE-001–011 | EVD-SRC-HYP-001 | Source-derived prior art | Describes Hypatia's scan input, hashing, Bloom matching, candidate verdict, cancellation and failure behaviour. Not a ZeroDeck algorithm or verdict policy. |
| HYP-DB-001–010 | EVD-SRC-HYP-001 | Source-derived prior art | Describes Hypatia's database loading and detached-signature verification. Not a ZeroDeck trust-root or update policy. |
| HYP-GEN-001–010 | EVD-SRC-HYPDB-001 | Source-derived prior art | Describes one signature-feed generation pipeline. Does not approve feed redistribution, vendor selection or generator adoption. |
| AND-STO-001–006 | EVD-DOC-ANDROID-001 | Platform documentation | Android storage/SAF constraints only. Do not infer ZeroDeck Android-only scope or universal move/delete/atomicity. |
| AND-KEY-001–005 | EVD-DOC-KEYSTORE-001 | Platform documentation | Android key-protection capabilities/limitations only. Does not select ZeroDeck encryption, cipher or key lifecycle. |
| WR-API-001–012 | EVD-DOC-WEBRISK-001 | Provider documentation | Web Risk Lookup contract/pricing/caching reference only. Not production-provider procurement or actual ZeroDeck integration. |

## 3. Evidence not yet available

- No ZeroDeck runtime observation, execution, API trace, persisted record, background job, authentication event, authorization decision, security-control test or performance measurement exists in this engagement.
- The product mockup/source repository does not establish runtime screen equivalence.
- The actual ZeroDeck build, target environment and deployed system boundary remain unidentified.
- The owner decisions establish intended scope/policy, not that the implementation enforces them. The pinned scanner product document is a Working draft; proposed retention and open design choices are not promoted to settled requirements.

## 4. Traceability rule for subsequent edits

Every new ZeroDeck rule MUST identify one of: owner decision, product-material artifact, runtime observation, source-derived inference about ZeroDeck source, or external declared contract. Every prior-art fact MUST remain explicitly attributed to its originating project/provider. A rule with no support remains proposed or unknown; it must not be presented as supported.
