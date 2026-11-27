# Phase 3 — Prior-art audit and source-selection register

**Engagement:** ZeroDeck MVP reverse engineering  
**Date opened:** 2026-11-27  
**Status:** Complete — source-selection exit gate satisfied on 2026-11-27. Sources are selected as prior-art references for Phase 4; direct third-party code/dependency adoption remains conditional and is not authorized by this register.  
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

### SRC-04 — Google Web Risk Lookup API

- Official overview: https://cloud.google.com/web-risk/docs/overview
- Lookup contract: https://cloud.google.com/web-risk/docs/lookup-api
- REST method: https://cloud.google.com/web-risk/docs/reference/rest/v1/uris/search
- Threat types: https://cloud.google.com/web-risk/docs/reference/rest/v1/ThreatType
- Cache rules: https://cloud.google.com/web-risk/docs/caching
- Pricing: https://cloud.google.com/web-risk/pricing
- Setup: https://cloud.google.com/web-risk/docs/detect-malicious-urls
- Current official documentation describes Web Risk as an enterprise security product for checking URLs against Google-maintained unsafe-resource lists. It explicitly warns that coverage is not comprehensive/error-free and false positives/false negatives can occur.
- Lookup API contract verified:
  - One URL per request; multiple threat types can be specified in one request.
  - Sends the actual submitted URL to Google, not a hash.
  - Returns a matching threat object containing threat types and `expireTime`; an empty response means no match on the requested lists, not proof that the URL is safe.
  - Threat types include `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, and `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`.
  - Positive match caching must respect the returned `expireTime`; stale cache entries must not be treated as current matches.
  - Google states Lookup API has no response-time guarantee and explicitly identifies URL disclosure as a privacy drawback. The Update API uses local hash lists and can improve privacy but adds implementation complexity.
- Pricing page currently states:
  - Lookup API `uris.search`: first 100,000 calls per month free; calls above 100,000 are USD $0.50 per 1,000 calls.
  - Update API `threatLists.computeDiff` is free, but using Lookup and Update together changes confirmation lookup pricing to the much higher hashes.search price. Therefore the selected Phase 4 reference is **Lookup-only**; do not casually combine the two APIs.
  - Google Cloud project and billing-enabled setup are required by the official quickstart even when the free allowance is expected. Do not assume zero financial exposure merely because the first tier is free.
- Decision: **SELECTED PRIOR-ART REFERENCE FOR PHASE 4 — Web Risk Lookup API only.** It is the strongest documented commercial candidate found for the selected website/link-checking workflow. It is not a deployed dependency or unconditional procurement approval. Reconfirm Google Cloud terms, account/billing setup, pricing, privacy and product obligations before implementation/activation.
- Owner's separate business decision ZD-DEC-2026-11-27-02 gates this capability behind Pro and keeps it disabled until the owner activates it when paid revenue can fund operating costs. The Pro gate is a product entitlement/configuration rule, not a Web Risk API feature.
- Important unresolved product/privacy decision: Lookup sends the actual URL to Google. The ZeroDeck product must decide what user disclosure/consent is required and whether sensitive URL paths/query strings are accepted. Do not log or persist full URLs by default without an explicit rule.
- No API calls were made with a production key and no latency, availability or detection performance was measured.

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
- Storage access framework: https://developer.android.com/guide/topics/providers/document-provider
- Keystore: https://developer.android.com/privacy-and-security/keystore
- Official Android documentation distinguishes app-specific private storage from shared/document storage and describes Android Keystore's non-exportable key material and key-use restrictions.
- Fit: platform-level reference for designing a quarantine boundary and protecting encryption keys.
- Decision: **PLATFORM REFERENCE, not a library selection.** These primitives do not themselves specify a complete quarantine workflow or prove that an app can move/delete every user-selected file. User-granted URI access, scoped-storage restrictions, copy/move semantics, restore integrity, retention, uninstall and failure recovery remain to be specified.

## 4. Preliminary selection matrix

| MVP capability | Selected prior art | Decision | Remaining gap |
|---|---|---|---|
| Manual file security analysis | Hypatia source and HypatiaDatabases generator; ClamAV as an alternative engine reference | Reference/adapt patterns only; no source dependency adopted | Detection coverage and engine selection; format/size limits; signature/data rights; freshness; verdict confidence; offline/failure semantics; supported Android access; no runtime validation |
| Quarantine and file disposition | Android app-specific storage, Storage Access Framework and Keystore docs | Build ZeroDeck-specific workflow using platform primitives; no third-party quarantine project selected | Define source-file ownership/access, confirmed-threat threshold, copy/move/delete guarantees, encrypted storage, key lifecycle, restore integrity/re-scan, retention, uninstall and recovery |
| Website and link checking | Google Web Risk Lookup API; exact request/response, threat types, pricing and cache expiry inspected | Selected prior-art reference for Phase 4; implementation/activation conditional; Pro gate approved | Reconfirm Cloud terms/account at implementation; define URL disclosure/consent and sensitive URL policy; request/redirect validation; quota and budget guard; timeout/offline/inconclusive semantics; result labels and retention |

No source is yet approved for direct code adoption into ZeroDeck. “Reference” means evidence to inform rule extraction, not a mandate to use the same implementation or stack.

## 5. Cross-cutting source-selection risks

1. **Licences:** Hypatia and its generator are AGPL-licensed; ClamAV is GPL-2.0; the Hypatia embedded GPG verifier carries separate Arduino GPL-2.0-or-later terms and an exception; the Node wrapper is MIT. Do not assume the app's top-level licence resolves embedded code, dependencies, signatures or datasets.
2. **Threat-data rights:** indicator feeds have their own terms, attribution and commercial-use constraints. A generator licence does not grant redistribution rights to its inputs or outputs.
3. **Commercial URL intelligence:** Safe Browsing v4 is non-commercial absent a separate agreement. URLhaus community access is limited by fair-use rules for non-profit use; commercial/for-profit use may require a paid Spamhaus subscription. Web Risk is selected as the commercial prior-art reference and has usage-based pricing. The owner has explicitly gated link checking behind Pro until revenue can fund activation.
4. **Privacy:** a URL lookup can disclose the full URL to a third party. A remote file engine would disclose file contents or derived data depending on the design. No such transfer is approved merely because a source supports it.
5. **Detection semantics:** no known signature match must not be equated with proof that a file or URL is safe. Inconclusive, unsupported, stale-data, unavailable-service and parse failures need separate treatment in later rule extraction.
6. **Platform constraints:** Android app-specific storage is private and removed on uninstall; SAF provides user-mediated access to shared documents. Keystore protects keys, not the entire file lifecycle. These details must be mapped into product requirements, not assumed to solve quarantine.

## 6. Excluded research

- IP address tracking/investigation is explicitly outside the MVP and must not be researched as a selected MVP dependency.
- Admin portal, account management, threat-record administration, CMS, scan history as a standalone feature, background protection, browser extension and device privacy audit remain outside the selected source-selection scope.
- APK static/dynamic analysis frameworks are not selected unless later source evidence proves they are required for the approved manual-file workflow.

## 7. Final source-selection decisions and Phase 3 exit

### 7.1 Selected references for Phase 4

| Selected source | Capability mapping | Provenance | Phase 4 use |
|---|---|---|---|
| SRC-01 Hypatia at `c0f98977be935e58849726313635a2459cac3892` | Manual file analysis: content hashing, signature lookup, scan progress/cancellation | Exact repository, pinned revision, source paths and AGPL/embedded verifier licence recorded above | Extract source-derived rules as reference patterns; do not treat as ZeroDeck behaviour or copy code |
| SRC-02 HypatiaDatabases at `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` | Manual file analysis: threat-data ingestion, generation, signing and distribution | Exact repository, pinned revision, README and AGPL-3.0-or-later generator licence recorded above | Extract feed/database lifecycle patterns; no dataset selected for redistribution |
| SRC-07 Android storage, SAF and Keystore official docs | Quarantine: private storage, user-mediated document access, cryptographic key handling | Official Android documentation URLs recorded above; platform documentation, not a third-party implementation | Extract platform constraints and lifecycle properties; design a ZeroDeck-specific disposition workflow |
| SRC-04 Google Web Risk Lookup API | Website/link checking: URL lookup, threat classifications, expiry/caching and commercial cost | Official Google Cloud docs and pricing URLs recorded above; API contract and current pricing inspected 2026-11-27 | Extract provider contract and limits; Pro-gated and disabled until owner activation |
| SRC-06 ClamAV at `cad7b18a3e6505195fe08db1412449a18fc9f012` | Manual file analysis: alternative signature-engine reference if supported file scope requires deeper content scanning | Exact repository, pinned revision and GPL-2.0 metadata recorded above | Comparative reference only; not selected as implementation dependency |

### 7.2 Rejected or non-selected candidates

- **Google Safe Browsing API v4:** reject for commercial ZeroDeck default use because its published terms restrict use to non-commercial purposes absent a separate agreement.
- **URLhaus/abuse.ch community API and feeds:** not selected for a commercial MVP dependency. Its current terms provide free use under fair-use limits for non-profit purposes and state commercial/for-profit use may require a paid Spamhaus subscription. Revisit only after the business has budget and separate commercial terms.
- **muety/safe-browse-url-lookup:** reference only; old wrapper targets Safe Browsing v4 and does not override Google's API terms.
- **ClamAV:** not the primary file-analysis source; retained only as a comparison reference due server-engine architecture, GPL obligations, operational cost and unresolved file-upload/privacy model.
- **LibreAV, YARA, Quark, Androguard and MobSF:** not selected; no evidenced requirement currently justifies their inclusion in the bounded MVP source set.
- No third-party quarantine implementation was selected. Android platform primitives are the selected prior-art basis; the workflow itself remains ZeroDeck-specific.

### 7.3 Explicit unresolved gaps handed to Phase 4

These are visible unknowns, not blockers to Phase 3 source selection:

1. File analysis locality (on-device, remote or hybrid), supported file types/sizes, scan coverage, verdict confidence, false-positive policy, offline operation, and signature-data rights are not established by current owner/product evidence.
2. Hypatia's hash/Bloom-filter model is a reference, not proof of adequate detection for all intended files. Phase 4 must trace its implementation and identify coverage limitations.
3. No quarantine source proves ZeroDeck's required copy/move/delete semantics. URI permissions, scoped storage, atomicity, integrity verification, encryption, key loss, restore, retention, uninstall and interrupted operations remain unknown.
4. Web Risk Lookup discloses the actual URL to Google and has no response-time guarantee. ZeroDeck's user disclosure/consent and sensitive URL handling remain product decisions.
5. Web Risk's published free tier is not equivalent to no billing setup or unlimited free usage. The API requires a billing-enabled Google Cloud project; usage beyond the free tier is billable. The owner-approved Pro gate is necessary but does not replace server-side quotas, cost limits, entitlement checks and kill-switch controls.
6. The exact commercial terms, account eligibility, privacy/data handling and product attribution obligations must be rechecked before implementation/activation; no production credentials or paid calls were tested.
7. Pro plan price, paid entitlement lifecycle, launch/activation threshold and budget are not yet specified. The owner decision says to keep link checking locked until paid revenue can fund it.
8. No source in this phase was executed against malware samples or live threat URLs. No runtime detection accuracy, performance or availability claims are made.

### 7.4 Phase 3 exit gate

**Satisfied on 2026-11-27.** Every selected prior-art source has a documented capability mapping and provenance, and the remaining source/product/technical gaps are explicitly recorded for Phase 4. This closes prior-art discovery and selection only. It does not mean implementation dependencies are approved, runtime behaviour has been verified, or the ZeroDeck MVP is replication-sufficient.

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
- Web Risk Lookup API contract: https://cloud.google.com/web-risk/docs/lookup-api
- Web Risk REST method: https://cloud.google.com/web-risk/docs/reference/rest/v1/uris/search
- Web Risk threat types: https://cloud.google.com/web-risk/docs/reference/rest/v1/ThreatType
- Web Risk caching: https://cloud.google.com/web-risk/docs/caching
- Web Risk overview and Lookup-vs-Update privacy trade-offs: https://cloud.google.com/web-risk/docs/overview
- abuse.ch Terms of Use (effective 2025-11-04; updated 2026-10-21): https://abuse.ch/terms-of-use/
- URLhaus API terms and docs: https://urlhaus.abuse.ch/api/
- muety wrapper pinned commit: https://github.com/muety/safe-browse-url-lookup/tree/d474c51e5ae1033e520c44cfdd6b9d028488b74e
- ClamAV pinned commit: https://github.com/Cisco-Talos/clamav/commit/cad7b18a3e6505195fe08db1412449a18fc9f012
- Android storage: https://developer.android.com/training/data-storage
- Android Keystore: https://developer.android.com/privacy-and-security/keystore
