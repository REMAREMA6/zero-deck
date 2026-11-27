# Phase 3 — Prior-art audit and source-selection register

**Engagement:** ZeroDeck MVP reverse engineering  
**Date opened:** 2026-11-27  
**Status:** In progress — initial audit and candidate screening recorded; source-selection exit gate not yet satisfied.  
**Scope authority:** `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md` (ZD-SCOPE-001).

## 1. Scope

This investigation is limited to the owner-approved MVP capabilities:

1. Manual file security analysis.
2. Quarantine and file disposition.
3. Website and link checking.

IP address tracking/investigation and all other deferred capabilities are excluded from source selection. This phase selects prior-art sources for investigation; it does not choose ZeroDeck's final architecture, assert product behaviour, or authorize copying code.

## 2. Audit of existing reconnaissance

### 2.1 Existing materials

The pre-existing `re/oss-recon/` directory contains:

- `oss-recon-decision-report.md` — Android Security Scanner prior-art report, mirrored from a 2026-11-24 DOCX.
- `recon-extract-raw.txt` — raw reconnaissance extract from that separate engagement.

The report explicitly describes its target as an Android Security Scanner with an Expo/React Native app and admin panel. Its scope includes file scanning, link checking, quarantine and an admin panel. It records static source inspection, not execution or runtime tests. It therefore supplies useful leads, not ZeroDeck-verified requirements or automatically accepted source choices.

### 2.2 Relevance decision

| Existing research | ZeroDeck relevance | Treatment |
|---|---|---|
| Hypatia Android file scanner | High for file-hash detection, signature database loading and update verification | Re-opened selected source at a pinned revision; retain as a reference candidate, not an adopted dependency |
| HypatiaDatabases | High for threat-feed aggregation, database generation and signed distribution | Re-opened generator README and licence; retain as reference candidate; data-source rights remain separately unresolved |
| Google Safe Browsing v4 | High technical fit for URL threat lookup, but its permitted-use boundary conflicts with a revenue-generating product absent a separate agreement | Do not select v4 for commercial ZeroDeck use; Web Risk is the commercial candidate to investigate |
| `muety/safe-browse-url-lookup` | Demonstrates a small Node.js wrapper around Safe Browsing v4 | Reference only; old API target and old source; not an adopted integration |
| URLhaus / abuse.ch | Potential supplemental URL and payload intelligence | Not selected for commercial MVP without commercial terms/subscription and source-specific rights verification |
| ClamAV | Relevant mature antivirus engine and signature ecosystem; architecture differs from an on-device manual scanner | Reference candidate only; investigate only if a server-side engine is justified by later evidence |
| LibreAV, YARA, Quark, Androguard, MobSF | Primarily broad engines, rule systems or APK-analysis frameworks, not established as necessary for the three selected workflows | Do not carry forward as MVP dependencies absent a demonstrated capability gap |

The old report's admin-panel, user-management and threat-record-management recommendations are outside the selected MVP and are not part of this source-selection task.

## 3. Independently verified source records

### SRC-01 — MaintainTeam/Hypatia

- Repository: https://github.com/MaintainTeam/Hypatia
- Purpose: Android malware scanner using ClamAV-style signature databases.
- Repository metadata checked: 2026-11-27.
- Default branch: `stable`.
- Pinned branch head inspected: `c0f98977be935e58849726313635a2459cac3892` (commit authored 2026-04-22, committed 2026-05-17).
- Latest published release observed: `v3.18`, published 2026-02-20.
- Repository status: public, not archived; GitHub metadata reports Kotlin, AGPL-3.0, and last push 2026-05-17.
- Licence: AGPL-3.0, verified from repository metadata and source-file headers.
- Inspected paths at the pinned commit:
  - `app/src/main/java/us/spotco/malwarescanner/MalwareScanner.kt`
  - `app/src/main/java/us/spotco/malwarescanner/Database.kt`
  - `app/src/main/java/us/spotco/malwarescanner/GPGDetachedSignatureVerifier.java`
  - `LICENSE`
- Relevant implementation evidence:
  - `MalwareScanner.kt` hashes file contents using MD5, SHA-1 and SHA-256 and checks the resulting hashes against loaded Bloom filters.
  - `Database.kt` loads database files and verifies detached signatures before parsing the database.
  - The GPG verifier source carries its own Arduino-origin GPL-2.0-or-later notice and special exception; this is a distinct provenance/licence item requiring preservation and review if code is reused.
- Fit: strong prior art for an Android file-hash scanning pipeline, signature loading, update integrity and scan cancellation/progress patterns.
- Limits: hash/signature matching is not proof of comprehensive malware detection; Bloom-filter membership can produce false positives; this is an Android implementation and not a technology-agnostic product rule. It does not establish ZeroDeck's supported file types, verdict thresholds, privacy promises, performance targets or required scanning coverage.
- Decision: **REFERENCE / ADAPT PATTERNS ONLY — not adopted as a dependency.** Reuse of code requires an explicit licensing/distribution decision and full notice/dependency audit. Reimplementing a general technique does not grant rights to copy source code or redistribute third-party datasets.
- Runtime status: source inspected only; no binaries executed, no malware samples used, and no performance claims independently tested.

### SRC-02 — MaintainTeam/HypatiaDatabases

- Repository: https://github.com/MaintainTeam/HypatiaDatabases
- Pinned `main` head inspected: `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` (2026-08-04).
- Repository metadata checked: 2026-11-27; GitHub metadata reports last push 2026-10-09 and no declared SPDX licence.
- Inspected paths: `README.md`, `LICENSE`.
- Licence: `LICENSE` explicitly states AGPL-3.0-or-later for the database generator. GitHub metadata says `NOASSERTION`; the repository's explicit licence file is the stronger evidence for the generator source.
- README describes a manual mirror/backup generator; database generation occurs through CI, unsigned generated packs are signed by a self-hosted CI key and published. It lists multiple upstream indicator sources and domain blocklists.
- Fit: reference for feed ingestion, transformation, deduplication, Bloom-filter generation and signed database publication.
- Limits: generator licence is not the same as the licence/terms of every imported feed or generated dataset. Every upstream feed needs separate provenance, redistribution and commercial-use review. The GitHub mirror is not the authoritative source of every generated artifact; README points to Codeberg as the canonical project origin and describes the GitHub repository as a manual mirror/backup.
- Decision: **REFERENCE ONLY; do not adopt the generator or packs yet.** Establish feed-by-feed rights, source freshness, signing-key ownership/rotation and reproducible build controls before any product use.

### SRC-03 — Google Safe Browsing API v4

- Official overview: https://developers.google.com/safe-browsing/v4/
- Usage restrictions: https://developers.google.com/safe-browsing/v4/usage-limits
- Lookup API: https://developers.google.com/safe-browsing/v4/lookup-api
- Current official documentation explicitly limits Safe Browsing API use to non-commercial purposes (not for sale or revenue-generating purposes), absent a separate agreement. Commercial users are directed to Web Risk.
- Lookup sends the actual URL to Google's service; Google documentation identifies URL privacy and network latency limitations. Update API uses local threat lists and hash-prefix checks but requires more complex URL canonicalization and database maintenance.
- Decision: **REJECT Safe Browsing v4 as the default commercial ZeroDeck service candidate.** Do not use it for revenue-generating ZeroDeck without a separate agreement that expressly permits the intended use.

### SRC-04 — Google Web Risk

- Official pricing: https://cloud.google.com/web-risk/pricing
- Official documentation discovered in the Google Cloud Web Risk product documentation.
- Pricing page currently states Lookup API `uris.search` has up to 100,000 calls/month free, then $0.50 per 1,000 calls (USD) above that threshold; pricing and availability must be rechecked at implementation/launch.
- Decision: **PRIMARY COMMERCIAL CANDIDATE FOR FURTHER VERIFICATION**, not yet selected as a dependency. Need verify the current API contract, supported threat types, response fields, privacy/data handling, quotas, regional/availability constraints, billing/account requirements, terms and exact product attribution/warning obligations before adoption.

### SRC-05 — muety/safe-browse-url-lookup

- Repository: https://github.com/muety/safe-browse-url-lookup
- Pinned `master` head inspected: `d474c51e5ae1033e520c44cfdd6b9d028488b74e` (2022-02-13).
- Licence: MIT, verified from `LICENSE`.
- Inspected paths: `lib.js`, `LICENSE`.
- Source calls the Safe Browsing v4 `threatMatches:find` endpoint and maps results to booleans.
- Repository metadata checked 2026-11-27 reports no archive, but last push was 2022-02-13.
- Decision: **REFERENCE ONLY / DO NOT ADOPT.** The client targets the non-commercial v4 API, is old, and its boolean output alone does not implement ZeroDeck's bounded multi-state outcome or uncertainty semantics. MIT licensing does not override Google's API terms.

### SRC-06 — Cisco-Talos/ClamAV

- Repository: https://github.com/Cisco-Talos/clamav
- Default branch: `main`.
- Pinned head inspected: `cad7b18a3e6505195fe08db1412449a18fc9f012` (2026-11-22).
- Repository metadata checked 2026-11-27 reports GPL-2.0, active repository, and recent changes.
- Fit: mature antivirus engine and signature ecosystem; potentially relevant if a server-side content-analysis service is established as necessary.
- Limits: server/engine deployment, GPL obligations, operational/resource costs, file-transfer privacy and supported-format policy have not been resolved. It is not a drop-in replacement for the Android hash-scanning reference.
- Decision: **REFERENCE ONLY; not an MVP dependency at this stage.**

### SRC-07 — Android platform storage and key-management documentation

- Storage overview: https://developer.android.com/training/data-storage
- Keystore: https://developer.android.com/privacy-and-security/keystore
- Official Android documentation distinguishes app-specific private storage from shared/document storage and describes Android Keystore's non-exportable key material and key-use restrictions.
- Fit: platform-level reference for designing a quarantine boundary and protecting encryption keys.
- Decision: **PLATFORM REFERENCE, not a library selection.** These primitives do not themselves specify a complete quarantine workflow or prove that an app can move/delete every user-selected file. User-granted URI access, scoped-storage restrictions, copy/move semantics, restore integrity, retention, uninstall and failure recovery remain to be specified.

## 4. Preliminary selection matrix

| MVP capability | Selected prior art | Decision | Remaining gap |
|---|---|---|---|
| Manual file security analysis | Hypatia source and HypatiaDatabases generator; ClamAV as an alternative engine reference | Reference/adapt patterns only; no source dependency adopted | Detection coverage and engine selection; format/size limits; signature/data rights; freshness; verdict confidence; offline/failure semantics; supported Android access; no runtime validation |
| Quarantine and file disposition | Android app-specific storage, Storage Access Framework and Keystore docs | Build ZeroDeck-specific workflow using platform primitives; no third-party quarantine project selected | Define source-file ownership/access, confirmed-threat threshold, copy/move/delete guarantees, encrypted storage, key lifecycle, restore integrity/re-scan, retention, uninstall and recovery |
| Website and link checking | Google Web Risk as primary commercial candidate; Safe Browsing v4 rejected for commercial default; URLhaus supplemental only if commercial terms allow | Web Risk candidate pending contract/API/security review | Verify contract, privacy, request/redirect handling, quotas/cost, timeout/offline/inconclusive semantics, attribution, caching and data retention |

No source is yet approved for direct code adoption into ZeroDeck. “Reference” means evidence to inform rule extraction, not a mandate to use the same implementation or stack.

## 5. Cross-cutting source-selection risks

1. **Licences:** Hypatia and its generator are AGPL-licensed; ClamAV is GPL-2.0; the Hypatia embedded GPG verifier carries separate Arduino GPL-2.0-or-later terms and an exception; the Node wrapper is MIT. Do not assume the app's top-level licence resolves embedded code, dependencies, signatures or datasets.
2. **Threat-data rights:** indicator feeds have their own terms, attribution and commercial-use constraints. A generator licence does not grant redistribution rights to its inputs or outputs.
3. **Commercial URL intelligence:** Safe Browsing v4 is non-commercial absent a separate agreement. URLhaus community access may require a paid enhanced commercial API for for-profit use. Web Risk is the Google commercial path and has usage-based pricing.
4. **Privacy:** a URL lookup can disclose the full URL to a third party. A remote file engine would disclose file contents or derived data depending on the design. No such transfer is approved merely because a source supports it.
5. **Detection semantics:** no known signature match must not be equated with proof that a file or URL is safe. Inconclusive, unsupported, stale-data, unavailable-service and parse failures need separate treatment in later rule extraction.
6. **Platform constraints:** Android app-specific storage is private and removed on uninstall; SAF provides user-mediated access to shared documents. Keystore protects keys, not the entire file lifecycle. These details must be mapped into product requirements, not assumed to solve quarantine.

## 6. Excluded research

- IP address tracking/investigation is explicitly outside the MVP and must not be researched as a selected MVP dependency.
- Admin portal, account management, threat-record administration, CMS, scan history as a standalone feature, background protection, browser extension and device privacy audit remain outside the selected source-selection scope.
- APK static/dynamic analysis frameworks are not selected unless later source evidence proves they are required for the approved manual-file workflow.

## 7. Open verification tasks and phase status

Phase 3 remains **in progress**. The following work is still required before its exit gate can be passed:

- [ ] Inspect the exact Web Risk Lookup API request/response contract, terms, privacy and billing requirements; verify commercial eligibility for the intended ZeroDeck use.
- [ ] Verify URLhaus current commercial terms and decide whether any supplemental feed is needed at all.
- [ ] Verify each candidate threat-data feed's licence/terms and provenance individually before selecting any dataset.
- [ ] Decide whether file analysis is strictly local, remote, or hybrid from owner-approved product evidence; do not infer it from prior-art architecture.
- [ ] Compare Hypatia hash/Bloom approach against a justified alternative for the actual supported file scope; inspect candidate engine source as needed.
- [ ] Define quarantine technical feasibility against the actual Android version/permissions and user-selected file URI lifecycle; no quarantine implementation has yet been selected.
- [ ] Record exact selected source revision, source paths, applicable licence and capability mapping for every source chosen for Phase 4.
- [ ] Update the capability/facet map only where new evidence changes a required-property question; do not silently turn implementation options into product requirements.

**Phase 3 exit gate:** every selected source has a documented capability mapping and provenance, and all source-selection gaps are visible. This report is an initial audit and screening record, not a declaration that the gate is satisfied.

## 8. Research source links

- Hypatia repository: https://github.com/MaintainTeam/Hypatia
- Hypatia pinned commit: https://github.com/MaintainTeam/Hypatia/commit/c0f98977be935e58849726313635a2459cac3892
- Hypatia MalwareScanner source: https://github.com/MaintainTeam/Hypatia/blob/c0f98977be935e58849726313635a2459cac3892/app/src/main/java/us/spotco/malwarescanner/MalwareScanner.kt
- Hypatia Database source: https://github.com/MaintainTeam/Hypatia/blob/c0f98977be935e58849726313635a2459cac3892/app/src/main/java/us/spotco/malwarescanner/Database.kt
- Hypatia GPG verifier source: https://github.com/MaintainTeam/Hypatia/blob/c0f98977be935e58849726313635a2459cac3892/app/src/main/java/us/spotco/malwarescanner/GPGDetachedSignatureVerifier.java
- HypatiaDatabases repository: https://github.com/MaintainTeam/HypatiaDatabases
- HypatiaDatabases pinned commit: https://github.com/MaintainTeam/HypatiaDatabases/commit/3c35f52e1a847caed46d8e1ad34968bfa3c8b10a
- HypatiaDatabases README: https://github.com/MaintainTeam/HypatiaDatabases/blob/3c35f52e1a847caed46d8e1ad34968bfa3c8b10a/README.md
- Safe Browsing v4 official overview: https://developers.google.com/safe-browsing/v4/
- Safe Browsing v4 usage restrictions: https://developers.google.com/safe-browsing/v4/usage-limits
- Web Risk pricing: https://cloud.google.com/web-risk/pricing
- URLhaus API terms and docs: https://urlhaus.abuse.ch/api/
- muety wrapper pinned commit: https://github.com/muety/safe-browse-url-lookup/tree/d474c51e5ae1033e520c44cfdd6b9d028488b74e
- ClamAV pinned commit: https://github.com/Cisco-Talos/clamav/commit/cad7b18a3e6505195fe08db1412449a18fc9f012
- Android storage: https://developer.android.com/training/data-storage
- Android Keystore: https://developer.android.com/privacy-and-security/keystore
