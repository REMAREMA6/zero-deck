# ZeroDeck MVP — Product-Material Workflow Rules

**Maturity:** Draft / provisional product requirements  
**Primary source:** `lordwhitefire/Zerodek/upload/android_security_scanner_product_decisions.txt`  
**Source revision:** `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`  
**Source blob:** `c0b247ab3ba990890f5ebce2e161fed08fc801f3`  
**Source document status:** Working draft  
**Evidence class:** Declared product material; not owner-approved scope by itself and not runtime-observed.

The owner separately approved the three-capability MVP. The working-draft source supplies workflow-level product requirements only to the extent documented. Preserve its labels: **MVP**, **Later release**, **Open decision**, **planned direction**, and **proposed**. Do not promote proposed/open items to settled requirements.

## MVP-01 — Manual file security analysis

| Rule ID | Product-material statement | Source status / unresolved detail |
|---|---|---|
| PM-FILE-001 | Users manually choose a file and request a scan. | Marked MVP in §4; exact selection UI/path remains open in §7. |
| PM-FILE-002 | The result model distinguishes Threat found, Suspicious, No threat found, and Could not decide. | Described in proposed data flow §9 and UI result requirements §10; exact engine, criteria, confidence and thresholds remain open in §7. |
| PM-FILE-003 | A no-known-threat result must not be presented as a guarantee that the file is safe. | Explicit privacy/result wording in §§4, 9 and 10. |
| PM-FILE-004 | Unsupported, inaccessible, interrupted and engine-failure cases must not be represented as successful scans. | Failure cases are identified in §7; exact error taxonomy and recovery remain open. |
| PM-FILE-005 | The phone is the default file-analysis location; files stay on the device by default and must not be uploaded to the cloud by default. | Explicit default in §§6 and 9. This is product-material intent; no runtime data-flow verification exists. |
| PM-FILE-006 | Any cloud-based file analysis must be a separate, clearly explained feature with appropriate user consent; disclosure identifies what is sent, why, recipient/processor and the user's choice. | Explicit privacy rule in §6. Whether such a feature will exist is open; no cloud-analysis capability is approved by this record. |
| PM-FILE-007 | SHA-256 is the stated planned direction for file fingerprints and integrity checks. | Planned technology direction in §5, not proof of implemented hashing or a final algorithm decision. |
| PM-FILE-008 | Supported file types, file sizes, scanning engine and local detection method remain open decisions. | Explicitly listed in §7. |

## MVP-02 — Quarantine and file disposition

| Rule ID | Product-material statement | Source status / unresolved detail |
|---|---|---|
| PM-QUAR-001 | Confirmed malware is automatically quarantined when permitted and when the operation succeeds. | Described as the agreed baseline in §3 and MVP direction in §4. The meaning/threshold of confirmed malware remains open. |
| PM-QUAR-002 | Suspicious files are presented for user review; clean files are left untouched; unknown/inconclusive files are rescanned or presented for review and are not assumed malicious. | Baseline in §3. Exact decision criteria and UI remain open. |
| PM-QUAR-003 | The stated storage baseline is encrypted, app-private storage on the user's device. | Baseline in §3. Actual implementation, cipher, key lifecycle, platform version and enforcement are not verified. |
| PM-QUAR-004 | A proposed retention baseline is a 30-day default, user-configurable, with automatic expiry and manual deletion. | Explicitly **proposed** in §3, not a settled final value. Notify the user before automatic expiry where practical. |
| PM-QUAR-005 | Restoration requires a fresh security scan and user confirmation. | Baseline in §3. Exact definition, timing and scan mechanism remain open. |
| PM-QUAR-006 | A restored file is verified against its recorded hash. | Baseline in §3. Hash algorithm and exact record representation are not confirmed by this statement; SHA-256 is separately only a planned direction in §5. |
| PM-QUAR-007 | If deletion fails, retain the record and report the failure accurately; never report quarantine or deletion as successful when the operation failed. | Baseline in §3. Exact terminal states, retry and rollback semantics remain open. |
| PM-QUAR-008 | Quarantine, restoration and deletion must be auditable. | Baseline in §3. Audit record fields, storage, retention and access policy remain open. |
| PM-QUAR-009 | Quarantined files must never be executed. | Explicit baseline in §3. Runtime enforcement and safe parsing/isolation implementation remain unverified. |
| PM-QUAR-010 | Protect encryption keys with Android Keystore. | Baseline in §3. Device support, security level, key authorization, rotation and recovery remain open. This does not make ZeroDeck globally Android-only. |
| PM-QUAR-011 | Do not overwrite unrelated user files during quarantine or restoration. | Explicit baseline in §3. Destination conflict and atomicity details remain open. |
| PM-QUAR-012 | Explain what happens to quarantined data if the app is uninstalled. | Explicit baseline in §3. Actual retention/deletion consequences remain unverified. |
| PM-QUAR-013 | Manage scan history separately from quarantine retention. | Explicit baseline in §3; scan history is not thereby approved as a standalone MVP capability. |

## MVP-03 — Website and link checking

| Rule ID | Product-material statement | Source status / unresolved detail |
|---|---|---|
| PM-LINK-001 | Users provide a website link for checking; the exact input method (paste, Android share menu or another path) remains open. | MVP direction in §§4 and 7. |
| PM-LINK-002 | The result model distinguishes Likely dangerous, No known threat found, and Could not decide. | Proposed data flow in §9 and screen/result brief in §10. |
| PM-LINK-003 | A no-known-threat result must not be presented as a guarantee that the website is safe. | Explicit MVP/result requirement in §§4, 9 and 10. |
| PM-LINK-004 | Do not claim that the whole website was inspected if the workflow only checked the submitted link. | Explicit UI/result requirement in §10. |
| PM-LINK-005 | The user must receive a clear explanation when a link looks dangerous, suspicious or cannot be checked confidently. | MVP statement in §4. Exact taxonomy and wording remain open. |
| PM-LINK-006 | The link-checking detection method/provider and whether checking occurs on-device, on a ZeroDeck backend or through a third party remain open. | Explicit open decisions in §§7 and 9. |

## Proposed data-flow material — not promoted to settled implementation rules

Section 9 describes a proposed input → transformation → output flow:
- File: select file → read only as Android permits → scanning engine (not selected) → result → quarantine policy → report actual outcome. A scan record may be saved, but its fields and retention are open.
- Link: submit URL → validate input → check using an unselected method → return bounded result.
- App versus website: the Android app may request Android permissions within platform limits; a website does not inherit those permissions. Browser extension support is later release.

These are planning descriptions. They do not prove that the flow is implemented or that backend/provider architecture has been selected.

## Other technology/service directions — not adopted as ZeroDeck requirements

The source lists Expo + React Native Development Build, TypeScript, a local database, PostgreSQL, possible Supabase or Neon, possible Cloudflare services and possible Sanity CMS. It explicitly leaves provider/service choices and several roles open. These are not frozen stack requirements and must not constrain the technology-independent Software Rules deliverable.

## Transfer boundary

- This file records declared product material and its maturity, not observed runtime rules.
- Owner-approved MVP scope and Pro/activation gates are in [OWNER-RULES.md](OWNER-RULES.md).
- Hypatia algorithms and database behaviour are prior art only.
- Android SAF/Keystore documents constrain possible implementation choices but do not supersede the product material or select every detail.
- Google Web Risk is a provider-contract reference only.
