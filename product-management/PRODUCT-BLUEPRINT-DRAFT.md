# ZeroDeck Product Blueprint — Draft

**Date:** 2026-11-27  
**Status:** Draft recommendation; not owner-approved beyond the three-capability MVP scope and the separate Pro/activation decision  
**Workspace:** product-management/  
**Authority:** ZD-SCOPE-001, ZD-DEC-2026-11-27-02, current Software Rules and evidence register  
**CIRCLES:** All seven steps complete; this blueprint is post-CIRCLES synthesis, not an eighth CIRCLES step.

## 1. Executive product definition

ZeroDeck is the broader startup/product direction for ethical-hacking and penetration-testing tools. Its first owner-approved MVP is a deliberately constrained three-capability product:

1. Manual file security analysis.
2. Quarantine and file disposition.
3. Website and link checking.

The first launch goal declared by the owner is to build and launch, then validate real market demand/adoption. No final customer cohort, launch geography, platform boundary, pricing model, technology stack, backend or provider has been approved.

The product-management recommendation is to validate non-technical individuals who regularly encounter unfamiliar files and links first, using a user-initiated link check from the point of sharing. This recommendation is provisional and awaits owner decision and direct customer validation. Security practitioners remain a competing cohort hypothesis.

The Software Rules capture remains Draft, incomplete and not replication-sufficient. This document does not close any Software Rules open property or claim runtime equivalence.

## 2. Authority and decision register

### 2.1 Owner-approved decisions

| ID | Decision | Product consequence |
|---|---|---|
| ZD-SCOPE-001 | First MVP contains exactly manual file analysis, quarantine/file disposition, and website/link checking. | No other standalone capability is in MVP. |
| ZD-SCOPE-001 | IP address tracking/investigation is future candidate CAP-13 and excluded from MVP. | Do not add IP investigation, geolocation, attribution or network discovery to MVP. |
| ZD-DEC-2026-11-27-02 | Link checking requires Pro entitlement. | Non-Pro users cannot invoke provider-backed checking. |
| ZD-DEC-2026-11-27-02 | Link checking remains locked until the owner activates the separate owner-controlled switch when paid-user revenue can fund operating/API costs. | Pro entitlement alone does not enable the feature. |
| ZD-DEC-2026-11-27-02 | No provider/API call when either Pro entitlement or owner activation is false. | Both gates must pass before a provider request. |
| ZD-DEC-2026-11-27-02 | Pro does not imply unlimited checks. | Quotas and budget controls are required before activation; values remain open. |

### 2.2 Product-management recommendations, not decisions

- Provisional first discovery cohort: non-technical individuals with recurring unfamiliar-file/link exposure.
- First demand-validation wedge: assess an unfamiliar link before opening, without relying solely on sender trust.
- First interaction approach to evaluate: explicit check invoked from the point of sharing.
- Proposed adoption signal: 30-day qualified repeat link-check rate compared with a manual-check baseline.

These remain recommendations until the owner accepts, rejects or revises them.

### 2.3 Open owner decisions

- Initial target cohort.
- Launch geography and distribution market.
- Platform boundary for first release.
- Pro pricing, entitlement lifecycle and usage allowance.
- Link-provider procurement and activation economics.
- File-analysis engine, coverage and licensing.
- Whether optional remote file analysis will ever exist.
- Account, backend and persistence requirements.
- Quarantine retention, key lifecycle and uninstall behaviour.

## 3. Customer and problem framing

### 3.1 Provisional primary cohort

Non-technical individuals who regularly receive or download unfamiliar files/apps and links from channels they do not fully trust, and who want a simple manual check and safe next action before opening them.

This is behaviour/context-based, not a demographic definition. It is not an owner-approved target market.

### 3.2 Competing cohort

Independent security practitioners and penetration testers who need to triage suspicious artifacts, preserve sample confidentiality and understand evidence/analysis limits. Their needs may exceed the current MVP because the scope does not promise dynamic sandboxing, reverse engineering, IOC extraction, analyst reports or lab workflows. OWASP's Mobile Application Security Testing Guide describes mobile app testing as static and dynamic analysis within a broader client-server/API assessment, with human validation of automated tool output; this is adjacent methodology evidence, not proof about every penetration-testing role or ZeroDeck demand. Sources: https://mas.owasp.org/MASTG/0x04b-Mobile-App-Security-Testing/ and https://mas.owasp.org/MASTG/tools/.

### 3.3 Customer jobs and candidate needs

| Need ID | Customer job / need | Evidence strength |
|---|---|---|
| B-N1 | Assess an unfamiliar link before opening, without relying solely on sender trust. | External mobile messaging research supports the context; ZeroDeck demand unvalidated. |
| B-N2 | Understand what a file/app check did and did not establish. | Historical Android comprehension research and current Play Protect documentation; incremental demand unvalidated. |
| B-N3 | Take a safe, recoverable next action after a concerning file result. | Safety-driven inference; direct user evidence absent. |
| B-N4 | Get an understandable, proportionate decision without added security fatigue. | General usable-security research; product-specific need unvalidated. |
| B-N5 | Know whether an additional tool adds value beyond existing protection. | Play Protect is an established substitute; user switching motivation unknown. |
| A-N1 | Triage an artifact without overstating certainty. | Adjacent SOC alarm research; direct penetration-tester evidence absent. |
| A-N2 | Preserve sample confidentiality and understand data disclosure. | Provider terms and professional workflow inference; direct interviews absent. |
| A-N3 | Reduce validation work rather than generate more alerts. | SOC practitioner research; transfer to independent testers unvalidated. |

Do not treat these as user quotations or confirmed customer requirements. See the needs report for source-by-source evidence and limitations.

## 4. Product scope

### 4.1 Included capabilities

#### MVP-01 — Manual file security analysis

User selects a supported, accessible file and explicitly requests a scan. The system performs the defined analysis and returns a bounded result that explains what was checked and what remains unknown.

Working-draft result classes:
- Threat found.
- Suspicious.
- No known threat found.
- Could not decide / inconclusive.

The exact classification criteria, engine, supported formats, confidence thresholds and wording remain open. A no-known-threat result must not be represented as proof of safety. Unsupported, inaccessible, interrupted and engine-failure cases must not be reported as successful scans.

The working product material says on-device is the default and files are not uploaded by default. Optional cloud analysis is unresolved and is not approved as a default workflow.

#### MVP-02 — Quarantine and file disposition

The working-draft baseline describes:
- confirmed malware is automatically quarantined only when permitted and the operation succeeds;
- suspicious files go to user review;
- clean files remain untouched;
- unknown/inconclusive files are rescanned or reviewed;
- restore requires a fresh security scan and user confirmation;
- restored content is checked against its recorded hash;
- failed deletion retains the record and reports failure accurately;
- quarantined files are never executed;
- unrelated user files are not overwritten.

The storage baseline in the working draft is encrypted app-private on-device storage with Android Keystore key protection. This remains product-material intent and must not be treated as verified runtime implementation or a final platform decision. The 30-day retention proposal is not approved as a final value.

#### MVP-03 — Website and link checking

User submits a specific URL/link for a bounded security/reputation check.

Two independent gates must both pass before any provider/API request:
1. User has Pro entitlement.
2. Owner-controlled activation switch is enabled.

If either gate is false, no provider request may occur. A Pro entitlement is not unlimited usage. Provider, quota, cache rules, URL processing, cost limits, disclosure and activation threshold remain open.

The result must distinguish likely dangerous, no known threat found and could not decide/inconclusive. A no-match is not a guarantee of safety. A single URL lookup must not be described as a whole-site inspection.

### 4.2 Explicit exclusions

- IP address tracking/investigation (CAP-13).
- Standalone scan history.
- User/admin account management as a standalone feature.
- Public admin portal.
- Threat-indicator administration.
- Help-content CMS.
- Service-health/audit dashboard.
- Automatic/background protection.
- Browser extension.
- Device privacy audit.
- Any additional penetration-testing capability not evidenced and approved.

Necessary cross-cutting requirements (permissions, privacy, error recovery, integrity, performance, configuration and security controls) remain in scope where required to deliver the three approved capabilities safely.

## 5. Core user workflows and states

These are product-level workflow definitions for later validation and specification. They are not claims about existing ZeroDeck runtime behaviour.

### 5.1 Manual file analysis workflow

| Stage | User/system activity | Required state or outcome | Open properties |
|---|---|---|---|
| Entry | User chooses manual file scan. | Clear explanation of supported input and limits. | Platform, file selection surface and exact wording. |
| Selection | User selects a file. | Selected identity, metadata and access grant established where supported. | Supported types, file size, provider URI, permission lifecycle. |
| Preflight | System checks readability, type and configured limits. | Accept or reject with explicit reason; no false scan success. | Type detection, limits, encrypted/virtual files, archives. |
| Analysis | System performs the defined scan. | Progress, cancellation and terminal state are accurate. | Engine, database source/freshness, progress granularity, performance. |
| Classification | System returns a bounded result. | Threat found / suspicious / no known threat found / inconclusive. | Criteria, confidence, source, false-positive/negative policy. |
| Explanation | User sees what was checked and limitations. | No guarantee of safety from no match. | Copy, accessibility, evidence details and language. |
| Disposition handoff | Result may lead to quarantine/review. | Quarantine only follows the defined eligibility and permission rules. | Exact confirmed-threat threshold and automatic action semantics. |

Failure/alternate branches to specify separately:
- unsupported format;
- inaccessible file or revoked URI permission;
- file changed during scan;
- corrupt/malformed file;
- encrypted/password-protected file;
- archive recursion or archive bomb limit;
- file too large or storage pressure;
- engine/database unavailable or update failure;
- offline state if analysis depends on a remote service;
- user cancellation;
- process death or device restart;
- partial/inconclusive result.

### 5.2 Quarantine and disposition workflow

| Stage | User/system activity | Required state or outcome | Open properties |
|---|---|---|---|
| Eligibility | Scan result is evaluated against confirmed-threat/suspicious/inconclusive policy. | Correct branch; uncertain files are not silently treated as confirmed malware. | Threshold and decision provenance. |
| Permission | System checks whether isolation operation is allowed. | Denied/unsupported operation is explicit; no false success. | Platform/provider operation support. |
| Capture | System copies or moves content to quarantine according to the approved mechanism. | Original and quarantined artifact identities are linked. | Copy/move semantics, atomicity and source deletion. |
| Protect | Quarantine content is encrypted and isolated under the chosen policy. | Content cannot be executed from quarantine. | Encryption, key lifecycle, isolation and metadata model. |
| Verify | System verifies written content and integrity. | No confirmed quarantine state until verification succeeds. | Hash algorithm, partial-write and crash handling. |
| Notify | User is told what happened to the original and quarantined copy. | Exact operation and any partial outcome are transparent. | Wording, notification and audit fields. |
| Review | User reviews suspicious/inconclusive items. | No destructive action without the required user decision. | Review choices and rescan policy. |
| Restore | User requests restore. | Fresh scan and user confirmation; integrity check; destination conflict handled. | Fresh scan semantics, conflict/overwrite policy. |
| Delete | User requests permanent deletion or retention expires. | Deletion result is truthful; failed deletion retains a record and reports failure. | Retention, purge guarantees, retry and audit policy. |

Required failure/recovery cases:
- source read failure;
- destination write failure;
- disk full;
- interruption between copy and source disposition;
- permission revoked;
- provider removed or cloud drive offline;
- corrupted quarantine content;
- key unavailable or invalidated;
- app data cleared or app uninstalled;
- restore target already exists;
- restore scan fails or is inconclusive;
- delete unsupported or failed;
- duplicate/concurrent quarantine, restore or delete requests.

### 5.3 Website/link checking workflow

| Stage | User/system activity | Required state or outcome | Open properties |
|---|---|---|---|
| Entry | User submits a URL/link. | Exact input is visible and user-initiated. | Paste/share input, accepted schemes, UI. |
| Validation | System parses and validates input. | Invalid/unsupported input is rejected before provider call. | Normalization, IDNs, credentials, ports, fragments. |
| Entitlement gate | System checks Pro entitlement. | Non-Pro request is denied without provider call. | Principal and entitlement source/lifecycle. |
| Owner activation gate | System checks owner-controlled switch. | Disabled feature is unavailable without provider call, even for Pro. | Config source/default, propagation and audit. |
| Usage controls | System checks allowance/rate/budget policy. | Over-limit request is denied without exceeding configured controls. | Quota values, global budget, cache accounting. |
| Provider lookup | If and only if all gates allow, the selected provider is queried. | Request, recipient, result and provider failure are captured accurately. | Provider, URL data disclosure, timeout, retries, cache. |
| Result | System maps provider result to bounded product result. | Likely dangerous / no known threat found / inconclusive. | Threat categories and mapping. |
| Explanation | User sees exact scope and limitations. | No safety guarantee; no whole-site claim. | Wording, expiry/freshness and next action. |

Required failure/alternate cases:
- user not Pro;
- owner switch disabled;
- entitlement service unavailable;
- usage allowance exhausted;
- invalid URL or unsupported scheme;
- redirect or URL shortener;
- timeout, offline or provider outage;
- quota/rate limit response;
- provider response malformed or unrecognised;
- no match on requested lists;
- positive result expired or cache stale;
- Pro revoked or downgraded during session.

**Owner decision still required:** whether cache hits are allowed while the owner activation switch is off and whether they count against Pro usage. Do not infer this behaviour.

## 6. Trust, privacy and safety requirements

1. **Honest verdicts:** no known threat found is not equivalent to safe.
2. **Bounded scope:** identify the file or URL actually checked; do not imply whole-device, whole-site or whole-message analysis unless such coverage is explicitly established.
3. **Analysis transparency:** disclose supported formats, methods and limits in language appropriate to the user.
4. **Data-flow transparency:** distinguish local analysis, source-provider retrieval, URL lookup and remote file upload. State data type, recipient and purpose.
5. **No default file upload:** preserve the working-draft on-device default unless the owner approves a separate optional remote-analysis feature with consent and disclosure.
6. **Quarantine integrity:** quarantined files are never executed; do not mark an item quarantined until the actual operation and verification succeed.
7. **Recoverability:** false-positive handling must not trap or irreversibly delete legitimate files without the required confirmation and recovery path.
8. **Permission honesty:** a user-selected URI is not unrestricted filesystem access; the system must reflect actual provider capabilities.
9. **Link privacy:** URLs can contain sensitive path/query data; logging, caching and provider disclosure need explicit rules.
10. **Gate integrity:** no link provider request when Pro is false, owner switch is false, or configured usage controls deny the request.
11. **No false success:** failures, unsupported states and inconclusive results must not appear as clean scans.
12. **Uninstall clarity:** explain what happens to quarantined data if the app is uninstalled, data is cleared or encryption keys become unavailable.

## 7. System boundary and integration register

No backend, database, cloud service, identity provider, message broker, scanning vendor, billing system or admin portal is assumed.

| Boundary / possible dependency | Why it may be needed | Data crossing boundary | Current status |
|---|---|---|---|
| User device/client | User selects files, requests scans, reviews results and manages disposition. | File URI/content, scan state, results, quarantine state. | Product capability implies a client; platform is not fixed. |
| Operating-system file/document provider | Provides access to selected user files and may support file operations. | URI, permission grant, metadata and file bytes. | Conditional on platform; Android SAF is a reference constraint only. |
| Local detection engine/database | Performs local file analysis and may need signed database updates. | File bytes/hash, signatures/database version, scan result. | Engine/source/update model unresolved. |
| Quarantine storage/key service | Stores isolated files and protects encryption keys. | Quarantined bytes, metadata, keys/cryptographic operations. | Working-draft baseline; actual implementation unresolved. |
| Identity/entitlement authority | Determines whether a user has Pro access. | Privacy-safe principal, entitlement status and expiry. | Required conceptually for Pro gate; mechanism/backend unknown. |
| Owner activation configuration | Determines whether link checking is enabled. | Feature state, effective time, authorized change. | Owner-controlled switch is declared; storage/propagation/audit unknown. |
| URL reputation provider | Returns a bounded threat lookup result after both gates pass. | Submitted URL, requested threat types, provider request metadata/result. | Web Risk is a prior-art reference only; no production provider selected. |
| Billing/commerce service | May establish Pro entitlement and paid-user revenue. | Purchase/subscription/entitlement events. | Not confirmed; do not assume a provider or architecture. |
| Telemetry/support systems | Could support reliability, cost and issue diagnosis. | Minimized operational events and redacted errors. | Not approved as a system component; necessity and privacy remain open. |

### Integration assessment rule

For every integration later proposed, record:
- business/user purpose;
- required trigger and gate;
- data sent/received and recipient;
- protocol and authentication context;
- failure and fallback behaviour;
- latency and availability dependency;
- cost model, quota and abuse controls;
- privacy/security implications;
- logging, retention and deletion;
- alternatives and replaceability;
- whether it is necessary for MVP.

## 8. Data concepts (not a database schema)

Potential conceptual records, only where the workflow requires them:
- selected file reference and metadata;
- scan request and operation status;
- scan result and analysis provenance;
- quarantine item and original/quarantined artifact identity;
- integrity fingerprint and verification outcome;
- disposition action (quarantine, review, restore, delete);
- retention/expiry metadata if approved;
- URL-check request and normalized URL representation;
- entitlement result and owner activation state;
- provider request/result/expiry and quota accounting;
- audit evidence for sensitive state transitions.

No fields, database, local persistence engine, cloud storage or retention values are specified by this list. The Software Rules property inventory remains the source for required capture dimensions.

## 9. Commercial and operating model

Known:
- Link checking is Pro-gated and owner-activated only when paid-user revenue can fund operating/API costs.
- Pro is not unlimited.
- Provider terms can restrict commercial use; for example, VirusTotal Public API is non-commercial/academic, while URLhaus Community API commercial use may require a paid enhanced subscription.
- Google Web Risk Lookup pricing currently lists 100,000 calls/month free and USD $0.50 per 1,000 above that; recheck before procurement.
- No final provider or API agreement is approved.

Unknown:
- Pro price and entitlement lifecycle.
- Which users are eligible for the first launch test.
- Per-user check allowance and global spend cap.
- Provider procurement and commercial terms.
- Cost per active user and support cost.
- Distribution, onboarding, acquisition and customer support channels.
- Launch geography, applicable privacy regime and app distribution policy.

Do not set a revenue forecast, CAC, LTV, conversion target or market size without a chosen geography, channel and evidence.

## 10. Success measurement and validation plan

### 10.1 Business outcome

Validate real market demand/adoption after launch. This is the owner's stated goal; revenue is not the current primary objective.

### 10.2 Provisional primary adoption metric

**30-day qualified repeat link-check rate:** among recruited users in the provisional cohort who encounter unfamiliar links and are legitimately eligible for link checking under both gates, measure the percentage who voluntarily check at least two distinct real-world links on separate days within 30 days.

Compare the point-of-sharing workflow against a manual destination-check baseline under the same eligibility and recruitment conditions.

No numeric threshold is set because there is no baseline, validated exposure frequency or justified sample-size estimate. Define the threshold before the experiment begins.

### 10.3 Guardrails

- Zero provider calls when either Pro entitlement or owner activation is false.
- No false success for provider failures, invalid URLs or inconclusive outcomes.
- No unsupported claim that a no-match means safe or that one URL check audits a site.
- No unconsented remote file upload.
- No loss of unrelated user files through quarantine/restore/delete operations.

### 10.4 Additional learning measures

For file analysis:
- repeated use for real file incidents;
- supported-file acceptance and scan completion;
- user understanding of result limitations;
- next action after each result;
- recovery from false-positive or inconclusive cases.

For quarantine:
- percentage of flagged files for which users choose quarantine/review/delete/restore;
- restore success and data-integrity outcomes;
- user understanding of what happens to original and quarantined copies;
- failure/recovery completion.

These are candidate diagnostic measures, not approved numeric targets.

### 10.5 Primary customer research

Use recent behaviour interviews:
- last real unfamiliar link/file incident;
- trigger channel and source;
- current workaround;
- frequency and consequences;
- trust in existing protection;
- result comprehension;
- disposition expectations;
- privacy tolerance and data-sharing expectations;
- repeated need and willingness to use a separate tool.

Interview a practitioner comparison group to test whether the initial cohort recommendation should change. Do not substitute concept approval or hypothetical interest for observed behaviour.

## 11. Software Rules traceability — 15 facets

The Software Rules facet catalogue contains 15 observation perspectives. They are not product modules or proof that each facet applies in every scenario. Current Phase 6 inventory reports 775 property entries, of which 700 are required and 75 optional; none are ZeroDeck runtime observations.

| # | Facet | Product relevance in this blueprint | Required evidence still missing |
|---:|---|---|---|
| 1 | Interface | File selection, scan progress/result, quarantine review/restore/delete, link submission/result and gated states. | Full rendered hierarchy, content, geometry, responsive states, assets, accessibility and interaction states. |
| 2 | Behaviour | All three workflows and all branches/failures/recovery. | Runtime triggers, ordered actions, transitions, side effects, timing, cancellation and terminal outcomes. |
| 3 | Business rules | Threat classification, quarantine eligibility/disposition, restore rules, Pro + activation gates, usage controls. | Exact thresholds, decision tables, owner-approved result mapping and effective configuration. |
| 4 | Data | File identity, scan result, quarantine metadata, URL input/result, entitlement and provider outcomes. | Actual schemas, field types, nullability, relationships, transformations and serialization. |
| 5 | Persistence | Quarantine artifact lifecycle and any other durable records actually required. | Store identity, transactions, consistency, crash durability, retention, deletion, backup and uninstall behaviour. |
| 6 | API | Conditional on a real backend/provider exchange. | Actual protocol, endpoints, requests/responses, auth, timing, errors and side effects. |
| 7 | Messaging | Conditional; no message broker/event architecture assumed. | Actual channel, envelope, producer/consumer, delivery, ordering, retries and acknowledgement if present. |
| 8 | Identity and authentication | Pro entitlement requires an identifiable principal; other identity use remains conditional. | Actual principal, mechanism, issuer, session/token lifecycle, expiry and revocation. |
| 9 | Authorization and permissions | File URI access, file disposition permission, Pro gate and owner activation gate. | Actual permission grants, enforcement point, allow/deny/indeterminate decisions and reason. |
| 10 | Security controls | Safe parsing, no execution of quarantined files, encryption, key protection, provider disclosure, integrity. | Threat model, actual controls, tested containment, key policy and enforcement evidence. |
| 11 | Background processing | Conditional; manual scanning does not establish worker/queue architecture. | Actual jobs, scheduling, retries, cancellation, timeouts and terminal states if present. |
| 12 | Errors and recovery | File read/scan, quarantine, restore/delete and link/provider failures. | Error taxonomy, propagation, retries, compensation, recovery and terminal outcomes. |
| 13 | Integrations | Conditional on actual OS/provider, detection engine, billing/entitlement or reputation services. | Actual systems, boundaries, protocols, data, resilience, mapping and dependency outcomes. |
| 14 | Configuration | Pro/activation, quotas, file/scan limits, retention and other effective settings. | Defaults, source, precedence, mutability, activation time, reload and audit. |
| 15 | Performance and resource behaviour | File scan resource usage and URL-check latency/availability. | Measured values, workloads, hardware/runtime, concurrency, measurement method and uncertainty. |

Source: https://github.com/REMAREMA6/zero-deck/blob/main/software-rules/FACET-MAP.md  
Completeness audit: https://github.com/REMAREMA6/zero-deck/blob/main/software-rules/PHASE-6-COMPLETENESS-AUDIT.md

**Boundary:** this table maps product questions to Software Rules facets. It does not claim the facets are fully captured or that the product is replication-sufficient. Conditional facets remain conditional until target evidence establishes applicability.

## 12. Product risks and dependencies

| Risk | Consequence | Mitigation / decision needed |
|---|---|---|
| False negative | User trusts a harmful file or link. | Honest result semantics, bounded analysis, measured detection coverage and no safety guarantee. |
| False positive | Legitimate file is quarantined/deleted or link is blocked. | Reversible disposition, user confirmation where required, review and recovery. |
| Unsupported file/source | User thinks a file was scanned when it was not. | Preflight validation and explicit unsupported/inaccessible state. |
| Quarantine data loss | App uninstall/key loss/storage failure makes file unrecoverable. | Decide lifecycle/retention and warn user; test crash and uninstall paths. |
| Privacy disclosure | Sensitive file or URL reaches an external provider. | Local-first default, explicit consent for any optional upload, URL disclosure/redaction and provider review. |
| Provider cost exposure | Lookup spend exceeds paid-user revenue or budget. | Pro + owner gates, quotas, global budget cap, alerts and kill switch. |
| Platform mismatch | File operations or share flow are unsupported on some target devices. | Choose platform boundary and test actual provider capabilities before promising behaviour. |
| Weak differentiation | Play Protect or existing security tools already satisfy the user. | Validate a concrete unmet situation and repeat use before expanding. |
| Overbroad target cohort | Consumer and practitioner expectations conflict. | Choose one cohort with evidence; retain the other as a comparison. |
| Incomplete Software Rules | Later implementation cannot reproduce intended behaviour reliably. | Preserve unknowns, complete evidence and runtime capture before claiming replication-sufficiency. |

## 13. Explicit unknowns — do not fill by assumption

- Final primary customer and launch market.
- Supported platforms and OS versions.
- File types, size limits, archive depth and scan concurrency.
- Detection engine, algorithm, threat feeds, licensing and update policy.
- Verdict criteria, confidence thresholds and result wording.
- Local versus optional remote analysis beyond the existing on-device default.
- Quarantine storage implementation, cipher, key lifecycle, retention, expiry, restore and uninstall behaviour.
- URL normalization, redirect handling, threat categories, cache semantics and provider.
- Pro pricing, entitlement source, quota, budget cap and activation threshold.
- Authentication, backend, database, storage, telemetry, billing and admin components.
- Performance and availability targets.
- Legal/privacy obligations and app distribution policy for the chosen launch jurisdiction.
- Exact UI/screens and responsive behaviour for the MVP.

## 14. Blueprint completion conditions

This draft becomes a decision-ready product blueprint only after:
1. Owner accepts/revises the target cohort and recommendation.
2. Primary customer interviews and workflow observations challenge or confirm the need ranking.
3. Platform and launch geography are decided or explicitly bounded for the first test.
4. File-analysis and quarantine needs are validated, not inferred solely from the working draft.
5. Link provider, commercial terms, privacy disclosure, quota and budget controls are settled before activation.
6. End-to-end workflow states, failures, recovery and data lifecycle are reviewed.
7. Each required product property is traced to owner decision, source evidence, platform/provider contract or explicitly unresolved status.
8. Cross-facet consistency and independent review are completed.
9. Any final product decision is explicitly accepted by the owner.

Until then, this document is a structured recommendation and research synthesis, not a frozen PRD or engineering architecture.
