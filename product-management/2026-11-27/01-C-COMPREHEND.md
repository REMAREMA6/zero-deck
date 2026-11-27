# C — Comprehend the Situation

**CIRCLES step:** C — Comprehend the situation  
**Date:** 2026-11-27  
**Status:** In progress — one owner clarification is required before C can close.  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)

## 1. What the owner asked us to plan

Plan ZeroDeck as a product, beginning with a carefully reasoned first MVP. The planning must use the completed reverse-engineering research and Software Rules, investigate viable product choices and integrations, and reduce the risk of costly redesign caused by missing product decisions or flawed workflows.

This is a product-definition exercise. It does not authorize implementation, technical-stack selection, deployment, or product changes.

## 2. Established product context

### Product identity

**Owner-declared:** ZeroDeck is the broader startup/product direction for tools and services for people involved in ethical hacking and penetration testing. The current scanner-oriented reference materials represent one capability area; they do not define the whole startup or its future product universe.

### Owner-approved first MVP

**Owner-declared, ZD-SCOPE-001 (2026-11-27):**

1. MVP-01 — Manual file security analysis.
2. MVP-02 — Quarantine and file disposition.
3. MVP-03 — Website and link checking.

MVP-03 has two separate mandatory gates:
- The user has Pro entitlement.
- The owner-controlled activation switch is enabled.

No provider/API lookup is allowed if either gate is false. Pro does not mean unlimited usage. Exact pricing, quota, usage allowance, activation threshold and provider selection are not settled.

**Explicit exclusion:** IP address tracking/investigation (CAP-13) is a future candidate and is not part of this MVP. The other exclusions in `software-rules/SCOPE.md` remain in force.

### Product maturity

- The reverse-engineering assignment is closed, Phases 0–7 complete.
- ZeroDeck-specific Software Rules is still Draft, incomplete and not replication-sufficient.
- No deployed ZeroDeck runtime or first-party runtime observations have been captured.
- The 17-screen reference baseline and extra routes are design evidence, not proof that all screens belong in the launch MVP.
- The first MVP is a declared product scope, not proof that every required product property or implementation choice is settled.

## 3. Historical product-management work — revalidation required

The existing `product-management/circles-2026-11-24.md` and `product-management/scanner-product-design/2026-11-24/` are preserved historical work. They contain useful hypotheses, journeys and design reasoning, but several assumptions are not current authority:

| Historical assumption | Current position |
|---|---|
| Scan history is part of MVP | Current owner-approved scope excludes scan history as a standalone capability. It may only return if necessary as a cross-cutting property or separately approved. |
| Admin panel, user management and threat-information management are MVP scope | Current scope excludes user/admin account management, public admin portal, threat-indicator administration, help CMS and service health/audit dashboard as standalone features. |
| Help content/CMS is an MVP requirement | Not in current approved MVP scope. Necessary explanatory copy/help affordances may still be considered as part of a safe workflow. |
| Eighteen screens define the product design | The screen inventory is evidence; it does not make all eighteen screens mandatory for the current MVP. |
| Everyday Android user is the chosen primary cohort | This was a prior product inference, not a current owner-approved customer decision. The startup's stated direction is ethical-hacking and penetration-testing tools. Customer selection remains open for I. |
| Android-only app, Expo/React Native, Kotlin module, Next.js backend and Sanity are fixed | These are historical product/implementation assumptions, not confirmed current system-boundary decisions. Current Software Rules explicitly says no backend, database, identity provider, provider or stack is assumed. |
| Google Safe Browsing v4 is the link provider | The current RE research says its default API use is non-commercial; Web Risk is the commercial candidate to investigate. No final provider is selected. |
| No file content ever leaves the device under any circumstance | Current open-properties record says on-device/no-upload by default; whether optional cloud analysis will ever exist remains open. Do not turn the historical absolute promise into a current fact without an owner decision. |
| 14-day return-scan rate with 25% target is the success metric | Historical recommendation only. It is not an owner-approved goal or metric and must be re-evaluated after the business goal and customer are established. |

Historical artifacts must not be deleted or rewritten. Reuse only after reconciliation with current owner decisions and evidence.

## 4. Goal and success metric — not yet established

The 2026-11-24 CIRCLES recommendation proposed earning and keeping user trust through honest verdicts and safe next actions. That is a plausible product value hypothesis and aligns with the owner-declared requirement that results be bounded and not promise safety. However:

- the business outcome the first launch is meant to achieve has not been explicitly fixed in current owner decisions;
- the historical 14-day return-scan metric was not approved and may be unsuitable if the chosen customer is a security practitioner rather than a general Android user;
- the Pro-gated link-checking decision shows a commercial-cost concern, but does not by itself establish that immediate revenue is the primary launch goal.

**No success metric is selected at this stage.** It must follow the owner's goal and the customer choice, not be inherited from an old document.

## 5. Constraints and dependencies already visible

### Product and scope constraints
- Keep the first release within the three owner-approved capabilities unless a proposed scope change is explicitly returned to the owner.
- Do not add standalone history, admin portal, background protection, browser extension, device privacy audit, IP investigation or other unapproved capabilities.
- Preserve the Pro entitlement and owner activation as independent link-check gates.
- No API usage may occur while link checking is unavailable; Pro entitlement does not establish unlimited usage.

### File analysis and quarantine
- The product working draft describes an on-device default and no file upload by default; optional cloud analysis is unresolved.
- Supported file types, size/count limits, archive recursion, encrypted files, verdict criteria, confidence policy, detection coverage, performance and error recovery remain open.
- Quarantine storage, encryption/key lifecycle, integrity, source/destination operations, crash recovery, retention, deletion and uninstall behaviour remain open.
- Android SAF is user-selected, URI-based access. Provider capabilities vary; a file/URI grant does not prove that every provider supports every operation needed for quarantine or restore.
- Android app-specific internal files are removed when the app is uninstalled. This has direct implications for the product's quarantine promise and recovery disclosures.
- Android Keystore protects key material from extraction; hardware backing and supported algorithms depend on the device. It is not a complete quarantine design by itself.

### Link checking
- Web Risk Lookup is a commercial candidate, not an approved provider.
- Provider choice must account for cost, commercial terms, threat coverage, freshness, caching, privacy disclosure, request limits, errors, outage and replaceability.
- URL checking is a single-URL lookup unless additional crawling/inspection is deliberately designed. The product must not imply whole-site inspection from one submitted URL.
- URL contents may be sensitive. The user-facing disclosure and retention/logging model must be designed before enabling the service.

### Operating constraints
- Current budget, available development capacity, launch timeline, distribution market, support capacity and cost tolerance are not documented in the current owner-approved decisions.
- The exact supported platform range and distribution channel are not established by the current Software Rules scope.
- No technology stack or backend is assumed by the current product specification.

## 6. Early external research findings

These are context findings, not product decisions.

### Android security alternatives are established and feature-rich
AV-Comparatives' May 2026 Android Mobile Security Review describes Google Play Protect as built into Android and documents third-party products offering on-demand scans, real-time protection, web protection, app auditing and other security features. This means ZeroDeck should not assume it is entering an empty category or that file/link scanning alone is differentiated. The actual unmet need and chosen cohort still require discovery.

Source: [AV-Comparatives — Mobile Security Review 2026](https://av-comparatives.org/tests/mobile-security-review-2026/).

### Android file access constrains product promises
Android's Storage Access Framework gives apps access to user-selected documents through URI permissions. Providers expose different supported operations; persistent grants can be taken where supported. Android app-specific internal files are deleted on uninstall. These platform facts mean product design must specify what happens when access is revoked, a provider cannot delete/move a file, a location disappears, or the app is uninstalled.

Sources:
- [Android — Access documents and other files from shared storage](https://developer.android.com/training/data-storage/shared/documents-files)
- [Android — Data and file storage overview](https://developer.android.com/training/data-storage)
- [Android — Open files using the Storage Access Framework](https://developer.android.com/guide/topics/providers/document-provider)

### Key protection is a mechanism, not a complete security promise
Android Keystore keeps key material non-exportable and may bind keys to secure hardware when the device supports the relevant algorithm/configuration. Product design still has to decide encryption, key lifecycle, recovery, uninstall consequences and what the user can recover.

Source: [Android — Keystore system](https://developer.android.com/privacy-and-security/keystore).

### URL reputation providers have materially different commercial boundaries
- VirusTotal's official comparison says its Public API is for non-commercial/academic use, while commercial use requires its paid Private API agreement.
- URLhaus says its Community API is free under fair-use principles, but commercial or for-profit use may require its enhanced commercial API.
- Google Web Risk Lookup supports one URL per request, can query multiple threat types, and returns matching threat types and cache expiration.
- Google's current Web Risk pricing page states 100,000 free Lookup API calls per month, then USD $0.50 per 1,000 calls above that level. Its separate Update API confirmation calls are priced much higher (USD $50 per 1,000), so the product must distinguish which API mode it is evaluating.

These facts make provider procurement, exact API mode, caching and usage-budget design material product decisions. They do not establish a final provider choice or forecast ZeroDeck's actual bill.

Sources:
- [VirusTotal — Public vs Private API](https://docs.virustotal.com/docs/difference-public-private)
- [URLhaus — Community API](https://urlhaus.abuse.ch/api/)
- [Google Web Risk — Lookup API](https://cloud.google.com/web-risk/docs/lookup-api)
- [Google Web Risk — Pricing](https://cloud.google.com/web-risk/pricing)

### File detection patterns have bounded coverage
The prior-art register records Hypatia as reference-only for hash/signature and Bloom-filter scanning patterns, with known limitations including false positives and the fact that hash matching is not comprehensive malware detection. It also records that upstream code and data licensing must be evaluated separately. ClamAV is a comparison candidate for a different, server-side architecture, not an automatic MVP dependency.

Source: [ZeroDeck Phase 3 Prior-Art Register](../../re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md).

## 7. Assumptions and unknowns carried forward

| ID | Item | Classification | Why it matters |
|---|---|---|---|
| A-C-01 | The three-capability MVP remains the launch scope during this planning exercise. | Owner-declared scope; change only by owner decision | Bounds product design. |
| A-C-02 | Trustworthy, bounded results and safe handling are important product qualities. | Supported product principle; relative business priority unknown | Affects verdicts, messaging, recovery and validation. |
| A-C-03 | A consumer Android user may be a plausible cohort. | Historical inference only | Must be compared with practitioner cohorts in I. |
| A-C-04 | Ethical hackers and penetration testers may be a plausible cohort because of the startup's stated direction. | Owner-declared market direction; exact initial cohort unknown | Could change the product framing and competitive set. |
| U-C-01 | Primary business outcome for the first MVP. | Unknown; owner clarification required | Determines the success metric and evaluation weights. |
| U-C-02 | Initial launch geography/distribution market. | Unknown | Affects customer research, distribution and applicable legal/policy review. |
| U-C-03 | Available budget, build capacity and launch timing. | Unknown | Bounds feasible operating and integration choices. |
| U-C-04 | Primary customer cohort. | Unknown; resolved in I | Determines who the product is designed around. |
| U-C-05 | Whether the product will be positioned as consumer mobile security or as a practitioner tool within ZeroDeck. | Unknown | Changes positioning, customer alternatives and product experience. |

## 8. One owner clarification needed to close C

**What is the primary business outcome you want the first ZeroDeck MVP to achieve?**

Please answer in your own words. For example, is the first priority to validate real demand and adoption, establish trust and credibility with a target user group, generate revenue, or achieve another outcome?

This answer changes the success metric and how we evaluate the product options. I will not substitute the historical 14-day return-scan recommendation for your answer.

## 9. C exit status

C remains open until the primary business outcome is clarified or the owner explicitly asks that it be carried as an assumption. The customer cohort, customer needs, prioritization and solution options belong to the following CIRCLES steps and have not been decided here.
