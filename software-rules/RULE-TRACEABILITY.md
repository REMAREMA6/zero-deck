# ZeroDeck MVP — Rule Traceability Register

**Maturity:** Draft  
**Purpose:** Connect every adopted owner-declared or product-material workflow rule to its authority and evidence. Prior-art source rules remain contextual and are not silently promoted to ZeroDeck requirements.

## 1. ZeroDeck product rules

| Rule IDs | Evidence class | Evidence references | Interpretation |
|---|---|---|---|
| ZD-OWNER-001–002 | Owner-declared | EVD-ZD-SCOPE-001 | The three-capability MVP and IP exclusion are explicit owner decisions. |
| ZD-OWNER-003–006 | Owner-declared | EVD-ZD-PRO-001 | Pro entitlement, separate owner activation, no-call conditions and need for usage/budget controls are explicit owner decisions. |
| PM-FILE-001–004 | Product-material-derived | EVD-ZD-CAP-001; EVD-ZD-MAP-001 | Manual file selection, result branches and truthful non-success outcomes are described by the product-material workflow inventory and scenario map. Detailed thresholds/implementation remain unknown. |
| PM-QUAR-001–005 | Product-material-derived | EVD-ZD-CAP-001; EVD-ZD-MAP-001; EVD-ZD-P4-001 | Confirmed-threat quarantine, non-destructive suspicious/inconclusive review, restore preconditions and truthful disposition outcomes are workflow-level material. Android constraints inform feasibility but do not select an implementation. |
| PM-LINK-001–005 | Product-material-derived | EVD-ZD-CAP-001; EVD-ZD-MAP-001; EVD-ZD-P4-001 | User-submitted URL and bounded result/failure branches are product-material workflow requirements. Web Risk informs one possible provider contract only. |

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
- The owner decisions establish intended scope/policy, not that the implementation enforces them.

## 4. Traceability rule for subsequent edits

Every new ZeroDeck rule MUST identify one of: owner decision, product-material artifact, runtime observation, source-derived inference about ZeroDeck source, or external declared contract. Every prior-art fact MUST remain explicitly attributed to its originating project/provider. A rule with no support remains proposed or unknown; it must not be presented as supported.
