# Supporting Research — File Analysis, Quarantine and Link Checking

**Date:** 2026-11-27  
**Workspace:** product-management/  
**Status:** Secondary research captured; no engine/provider/architecture selected  
**Related CIRCLES:** C, R, C, E  
**Scope authority:** ZD-SCOPE-001 and ZD-DEC-2026-11-27-02

## 1. Purpose and evidence boundary

This research deepens the technical, trust, platform and commercial questions that affect the three owner-approved MVP capabilities:
1. Manual file security analysis.
2. Quarantine and file disposition.
3. Website and link checking.

It is product research, not an architecture decision. The owner-approved MVP scope remains authoritative. The ZeroDeck Software Rules capture remains Draft, incomplete and not replication-sufficient. No deployed ZeroDeck runtime has been observed.

The findings distinguish official platform/provider contracts, independent or academic research, prior-art implementation evidence, product-management inference and unresolved product/owner decisions.

## 2. MVP-01 — Manual file security analysis

### 2.1 Existing protection and the differentiation problem

Google documents that Play Protect:
- checks apps before download from Google Play;
- checks potentially harmful apps from other sources;
- warns about potentially harmful apps;
- may deactivate or remove harmful apps;
- performs daily and on-demand scans;
- performs real-time checks for non-Play installs.

Sources:
- https://support.google.com/googleplay/answer/2812853?hl=en
- https://developers.google.com/android/play-protect/client-protections

**Product implication:** if ZeroDeck is eventually an Android product, the value proposition cannot simply be "scan Android apps for malware". A meaningful unmet situation must be demonstrated. Examples to investigate (not approved feature requirements) include a user wanting to inspect one downloaded file, wanting an explicit manual result, or wanting a controlled disposition workflow. Play Protect is a substantial existing substitute; this research does not establish that it is ineffective or that ZeroDeck can outperform it.

### 2.2 Detection coverage and honest verdicts

NIST SP 800-83 Rev. 1 explains that antivirus is effective at identifying known malware but less effective against highly customised threats; it also notes that no indicator is completely reliable and defines false negatives as cases where a security tool fails to detect a threat.

Source: https://csrc.nist.gov/pubs/sp/800/83/r1/final  
PDF: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-83r1.pdf

The ZeroDeck prior-art register inspected Hypatia, an Android hash/signature scanner using multiple hashes and Bloom-filter-based signature databases. It is relevant prior art for file fingerprinting, signed database loading and update integrity. Its own register explicitly warns that hash/signature matching is not comprehensive malware detection and Bloom-filter membership can produce false positives. Hypatia is AGPL-3.0 and remains reference-only, not an adopted dependency.

Source register: https://github.com/REMAREMA6/zero-deck/blob/main/re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md  
Project: https://github.com/MaintainTeam/Hypatia

**Product implications:**
- Do not represent a hash/reputation match as comprehensive file analysis.
- A "no known threat found" result must not become "safe".
- Threat found, suspicious, no known threat found and inconclusive/unsupported need distinct criteria and wording.
- A scan result needs to state the analysis boundary: file type, method, source/database freshness and any unsupported parts.
- The product must not execute quarantined files to determine whether they are malicious.
- Confidence thresholds and false-positive/false-negative treatment remain open; they cannot be invented from prior-art behaviour.

### 2.3 Engine and licensing candidates

**ClamAV**
- Official documentation describes ClamAV as an open-source GPLv2 anti-virus toolkit, designed especially for email scanning on mail gateways.
- It provides a shared-library engine, command-line scanner and automatic database updates.
- It supports many archive/document formats and signed signature databases, but its documentation expressly warns that it cannot unpack every version or variant.
- The official tested-platform list focuses on desktop/server operating systems; it does not establish an Android-native supported ZeroDeck deployment.
- Its documented minimum recommended RAM for standard scanner/daemon use is 3 GiB+, a warning against assuming it is a lightweight mobile component.

Sources:
- https://docs.clamav.net/
- https://github.com/Cisco-Talos/clamav

**Product implication:** ClamAV is a reference candidate if a server-side engine is justified later. It is not automatically suitable for an on-device mobile scanner. GPLv2 obligations, integration form, distribution model, signature-data rights, device/resource cost and operational responsibility require a separate legal and engineering review before adoption.

**Hypatia**
- Android-focused prior art for hash scanning and signed database updates.
- Its source repository is AGPL-3.0.
- The prior-art review inspected source at a pinned revision but did not run the app or test detection efficacy.

**Product implication:** Hypatia's patterns can inform a technology-independent requirements discussion; its code and datasets must not be copied or redistributed without explicit licence and source-rights review.

### 2.4 Unresolved customer and product questions

- Which actual file types do the selected customers need to check?
- Are they checking APKs, documents, archives, scripts, executables or something else?
- Where do they obtain those files?
- How often does the problem occur, and what do they currently do?
- Do they need a local scan, a reputation lookup, a deeper analysis or simply a trustworthy next action?
- What is an acceptable delay and device-resource cost?
- What is the minimum useful coverage for a first launch?
- What happens for encrypted/password-protected files, malformed files, archives, unsupported formats, oversized files and files that cannot be read?
- What source provides threat intelligence, and what are its freshness, licensing, update integrity and redistribution terms?
- Which verdict thresholds and confidence semantics can be supported by measured test data?

No engine is selected. No file-type matrix or performance target is approved.

## 3. MVP-02 — Quarantine and file disposition

### 3.1 Android storage model

Android's official storage overview distinguishes:
- **App-specific storage:** files intended for the app, inaccessible to other apps by default. Android documents that app-specific files are removed when the app is uninstalled.
- **Shared storage:** files intended to be accessible to other apps.
- **Documents and other files:** normally accessed through the Storage Access Framework (SAF) and the system file picker.
- **Cloud-hosted storage:** a separate storage category where cloud data persists independently of the app's local files.

Source: https://developer.android.com/training/data-storage

The SAF allows the user to select a document and grant the app access to its URI. The app can persist the granted URI permission where the provider and returned grant support it. The provider determines which document operations are supported. For example, Android's document API requires the selected document to advertise the SUPPORTS_DELETE flag before the client can request deletion. SAF also supports virtual documents that may not have a normal byte representation.

Source: https://developer.android.com/training/data-storage/shared/documents-files

Android 11 introduced additional file/directory access restrictions for the system picker, including restrictions around Android/data and Android/obb locations.

Source: https://developer.android.com/about/versions/11/privacy/storage

**Product implications:**
- A file picker selection is not equivalent to unrestricted filesystem access.
- URI permission lifecycle and provider availability are part of the product workflow.
- A provider may not support every operation the product wants; do not promise arbitrary move/delete/restore across all storage locations.
- A remote/cloud document provider may serve the file through its own infrastructure. A product statement that ZeroDeck does not upload the file must not imply that the source provider itself is local.
- Copying a file into app-private quarantine is a distinct operation from moving or deleting the original. Source deletion may fail or be unsupported.
- Quarantine must record whether the original was copied, moved, left in place or successfully deleted. A success message cannot hide a partial operation.
- Virtual documents and files with unknown size/metadata require explicit handling.

### 3.2 Encrypted quarantine and key management

Android Keystore protects key material from extraction; key operations can occur in a system process, and supported devices may bind keys to secure hardware such as a TEE or StrongBox. Hardware support depends on the device and the particular algorithm/mode/padding/digest combination.

Source: https://developer.android.com/privacy-and-security/keystore

Android's storage overview separately documents that app-specific files are removed on app uninstall. The sources reviewed here do not establish a complete ZeroDeck uninstall/key-loss lifecycle, nor do they prove that encryption alone makes quarantine recoverable or permanently erased.

**Product implications:**
- Keystore can be a key-protection primitive; it does not define the quarantine design.
- The product must decide what happens if the app is uninstalled, data is cleared, a device is replaced, a key becomes unavailable, or a user restores from backup.
- If encrypted quarantine becomes unreadable after uninstall/key loss, the user must be told before relying on it as their only copy.
- If quarantined files are copied into app-private storage, uninstall may remove those files. This must be reconciled with the approved retention and user-notification policy.
- Cipher/mode, key lifecycle, backup policy, rotation, recovery and device compatibility remain unresolved.

### 3.3 Quarantine state and failure semantics

The Software Rules open-properties register preserves the working-draft baselines:
- confirmed malware is automatically quarantined when permitted and when the operation succeeds;
- suspicious files go to user review;
- clean files remain untouched;
- unknown/inconclusive files are rescanned or reviewed;
- restoration requires a fresh security scan and user confirmation;
- restored content is checked against its recorded hash;
- failed deletion retains the record and reports failure;
- quarantined files are never executed;
- unrelated user files are not overwritten.

These are documented product-material baselines, not runtime-observed ZeroDeck behaviour. Their thresholds and exact semantics remain unverified.

**Product implications:**
- "Quarantined" must represent a real, verified storage state, not just a database label.
- The product needs explicit states for selection, read, copy/write, verification, source disposition, quarantine confirmation, restore, delete, failure and interrupted recovery.
- A crash between copying and deleting the source must not result in a false success or accidental loss.
- Restore must not blindly overwrite a file created at the original path after quarantine.
- Duplicate or concurrent actions must not corrupt state.
- Deletion failure must remain visible and auditable.
- A false positive must not trap a legitimate file without a recoverable path.

### 3.4 Unresolved customer and product questions

- Does the customer want the file isolated, moved, copied, deleted or simply marked for review?
- Is automatic quarantine of confirmed threats acceptable, or does the user expect confirmation first?
- What exactly does "confirmed malware" mean, and what confidence is required?
- How should a suspicious or inconclusive file be handled?
- Should the original remain in place until the quarantine copy is verified?
- How long should quarantine retain files? The 30-day value in the working draft is proposed, not final.
- What happens after uninstall, app data clear, storage removal, key loss or device migration?
- What restore action is expected if the original location is no longer available?
- What happens if the source provider does not support deletion or the permission is revoked?

No retention period, storage implementation, encryption algorithm or key-recovery policy is selected by this research.

## 4. MVP-03 — Website and link checking

### 4.1 Google Web Risk Lookup API reference

The Phase 3 prior-art register selected Google Web Risk Lookup API as a prior-art reference, not a final production-provider procurement decision.

Official sources:
- Overview: https://cloud.google.com/web-risk/docs/overview
- Lookup API: https://cloud.google.com/web-risk/docs/lookup-api
- REST contract: https://cloud.google.com/web-risk/docs/reference/rest/v1/uris/search
- Caching: https://cloud.google.com/web-risk/docs/caching
- Pricing: https://cloud.google.com/web-risk/pricing

The prior-art contract records:
- one URL per Lookup API request;
- the actual submitted URL is sent to Google, not only a hash;
- requested threat categories can include malware, social engineering and unwanted software;
- an empty response means no match on the requested lists, not proof that the URL is safe;
- positive-match caching must respect the returned expiry time;
- Google warns that coverage is not comprehensive and false positives/false negatives can occur;
- Lookup API has no response-time guarantee.

Current pricing page retrieved during this research states:
- Lookup API uris.search is free for up to 100,000 calls per month;
- usage above 100,000 is USD $0.50 per 1,000 calls;
- the Google Cloud project and billing-enabled setup requirements still need to be considered; a free tier is not proof of zero operational exposure.

**Product implications:**
- Do not call one URL lookup a website audit.
- The submitted URL may contain private path/query data; privacy disclosure and redaction/logging rules are required.
- Positive and negative caching are different policy questions; preserve provider expiry and avoid stale positives.
- No-match, provider unavailable, invalid URL, unsupported scheme, timeout and quota exhausted must be distinguishable.
- Usage limits and spend controls are mandatory before owner activation.
- Do not select the Update API or combine it with Lookup without a separate cost/privacy/engineering review.

### 4.2 URLhaus / abuse.ch

URLhaus Community API documentation says it is provided free under fair-use principles, but commercial or for-profit use may require a paid enhanced abuse.ch commercial API subscription. The terms say access limits are intended for non-commercial/non-profit use; continued excessive usage may require paid subscription. The terms also describe best-effort availability and limit liability.

Sources:
- https://urlhaus.abuse.ch/api/
- https://abuse.ch/terms-of-use/
- Commercial API information: https://www.spamhaus.com/data-access/abusech-api/

URLhaus describes its dataset as focused on URLs directly used to distribute malware. This is not a general all-purpose URL safety service.

**Product implication:** do not assume the free community API is approved for a commercial ZeroDeck service. Commercial terms, permitted use, coverage fit, reliability, attribution, data freshness and support need confirmation. URLhaus may be a supplemental threat feed, but it is not automatically a substitute for a broad URL-reputation provider.

### 4.3 VirusTotal public/private distinction

VirusTotal documents:
- Public API is for non-commercial or academic use and is rate-limited to four interactions per minute.
- Private API supports commercial/government use, with custom rate limits and paid pricing by quote.
- Private Scanning is a separate paid service. It analyses submitted files/URLs on VirusTotal infrastructure, keeps the submitted content and reports private to the organisation for a retention period (usually 24 hours by default), but its output does not include multi-antivirus partner verdicts.

Sources:
- https://docs.virustotal.com/docs/difference-public-private
- https://docs.virustotal.com/docs/private-scanning

The VirusTotal public upload page states that submitting a sample agrees to sharing that sample with the security community:
- https://www.virustotal.com/

**Product implications:**
- Do not build a commercial product on the Public API without an agreement permitting the use.
- Do not assume "private scanning" means on-device processing; files/URLs still go to VirusTotal infrastructure.
- Private Scanning's absence of multi-antivirus verdicts is a material product trade-off.
- Any remote file-analysis option must be separately disclosed and opt-in if adopted; the current working baseline is no upload by default.
- Provider branding, data handling, retention and commercial agreement need review.

### 4.4 Unresolved customer and product questions

- Do users want a one-off lookup or a broader site assessment?
- Which threat categories matter for the actual user job?
- How should redirects, internationalised domains, credentials, fragments, ports and URL shorteners be treated?
- Does the product check only the submitted URL or any redirect destination?
- Which provider has the right combination of coverage, commercial terms, privacy, cost and reliability?
- What quota and spend limits are needed before activation?
- What happens when the Pro entitlement is revoked, a subscription expires, the owner switch is disabled, or a cached result exists?
- Should cache hits be allowed while the owner switch is off, and do cache hits count against Pro usage? This requires an owner decision.
- What data is logged, redacted, retained or shared?

No provider is selected for production and no API calls have been made.

## 5. Cross-capability product requirements emerging from research

These are product-level requirements to carry into the blueprint, subject to owner review and Software Rules evidence:

1. **Honest result semantics:** distinguish threat found, suspicious, no known threat found, unsupported and inconclusive. Never promise safety from absence of a match.
2. **Bounded analysis disclosure:** tell users what was actually inspected, what method/provider was used at the appropriate level, and what was not inspected.
3. **Data-flow transparency:** distinguish local processing, source-provider retrieval, remote lookup and remote file upload. Name the data recipient and data type before any optional upload.
4. **Recoverable disposition:** do not report quarantine/restore/delete as complete until the underlying operation is verified. Preserve failure state and record.
5. **No execution of quarantined content:** quarantined files must not be launched or executed.
6. **Permission-aware handling:** file access and disposition must follow actual platform/provider capabilities and grants.
7. **Provider independence:** keep user-facing capability and result semantics separate from a specific threat-intelligence vendor.
8. **Cost controls:** provider calls require entitlement and activation checks, per-user limits, rate limits and a global budget/kill-switch policy before activation.
9. **Explicit failure states:** unsupported file, unreadable source, revoked permission, corrupt input, provider outage, timeout, offline state, quota exhaustion and storage failure must not masquerade as a clean result.
10. **Uninstall and retention clarity:** state what remains, what is deleted and what becomes unrecoverable after uninstall, data clearing, key loss or expiry.

These statements do not resolve the open Software Rules properties. They are candidate product requirements to reconcile with the final product blueprint and owner decisions.

## 6. Research source register

| ID | Source | Type | Main contribution | Limitation |
|---|---|---|---|---|
| RSR-01 | Android storage overview — https://developer.android.com/training/data-storage | Official platform documentation | App-specific files are removed on uninstall; storage classes and permissions differ. | Does not determine ZeroDeck's target platform or implementation. |
| RSR-02 | Android SAF — https://developer.android.com/training/data-storage/shared/documents-files | Official platform documentation | URI grants, provider-supported operations, delete flags and virtual documents. | Actual provider behaviour must be tested. |
| RSR-03 | Android 11 storage changes — https://developer.android.com/about/versions/11/privacy/storage | Official platform documentation | Restrictions on picker access to some directories. | Version-specific; platform support remains unknown. |
| RSR-04 | Android Keystore — https://developer.android.com/privacy-and-security/keystore | Official platform documentation | Key material extraction protection and hardware-backed options. | Does not define full key lifecycle, uninstall recovery or ZeroDeck quarantine. |
| RSR-05 | NIST SP 800-83 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/83/r1/final | Government guidance | Antivirus limits, malware incident handling and false-negative vocabulary. | Desktop/laptop guidance; not a mobile detection benchmark. |
| RSR-06 | Google Play Protect — https://developers.google.com/android/play-protect/client-protections | Official platform documentation | Daily, on-demand and non-Play app protection. | Vendor-described capability; not an independent efficacy test. |
| RSR-07 | ClamAV documentation — https://docs.clamav.net/ | Official project documentation | GPLv2 toolkit, formats, archive limits and resource guidance. | Not established as an Android-native ZeroDeck engine. |
| RSR-08 | Hypatia prior-art record — https://github.com/REMAREMA6/zero-deck/blob/main/re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md | Project source review | Hash/signature and signed-database patterns, AGPL-3.0. | Static source review only; not ZeroDeck runtime or detection proof. |
| RSR-09 | Google Web Risk pricing — https://cloud.google.com/web-risk/pricing | Official provider pricing | Lookup API monthly free tier and overage pricing. | Reconfirm before procurement/activation; pricing can change. |
| RSR-10 | URLhaus API — https://urlhaus.abuse.ch/api/ | Official provider documentation | Malware-URL feed scope and commercial-use warning. | Commercial terms/coverage must be confirmed. |
| RSR-11 | abuse.ch terms — https://abuse.ch/terms-of-use/ | Official provider terms | Fair-use limits and potential paid subscription for commercial use. | Requires current contract confirmation. |
| RSR-12 | VirusTotal API comparison — https://docs.virustotal.com/docs/difference-public-private | Official provider documentation | Public vs Private API use, rate limits and paid commercial access. | Quote and contract needed for exact commercial cost. |
| RSR-13 | VirusTotal Private Scanning — https://docs.virustotal.com/docs/private-scanning | Official provider documentation | Private remote-analysis data handling and missing multi-AV verdicts. | Paid service; not local-only processing. |

## 7. Next research actions

1. Reconcile these findings with the full 15-facet Software Rules property inventory without closing any open property by inference.
2. Build a product workflow/state blueprint for manual file analysis and quarantine, including permissions, provider failure, crash recovery, restore, deletion and uninstall.
3. Build a separate URL-check state and entitlement matrix, preserving Pro and owner activation as independent gates.
4. Obtain direct customer evidence about file types, link contexts, quarantine expectations, privacy concerns and current workarounds.
5. Compare file-engine/provider candidates only after supported file types, target platform, local/remote processing boundary and licensing requirements are established.
6. Keep launch geography, platform, stack, backend, identity, database and vendor choices unresolved until evidence or owner decisions justify them.
