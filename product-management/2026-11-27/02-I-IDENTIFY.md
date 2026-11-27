# I — Identify the Customer

**CIRCLES step:** I — Identify the customer  
**Date:** 2026-11-27  
**Status:** Research synthesis and provisional cohort recommendation  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)  
**Preceding step:** [01-C-COMPREHEND.md](01-C-COMPREHEND.md)

## 1. Purpose and decision boundary

The first-launch business outcome is owner-declared as **validating real market demand**. The owner has not selected a target audience. The original direction came from a penetration tester and focused on tools for penetration testers/ethical hackers; later exploration raised non-technical individuals and businesses/licensed users as possible audiences.

This step compares those candidate segments by their actual context and friction, not by demographic labels. It recommends one provisional cohort for the first round of demand validation. This is a product-management recommendation, not an owner decision and not evidence that the segment has already demonstrated demand.

The approved MVP remains limited to:
1. Manual file security analysis.
2. Quarantine and file disposition.
3. Website and link checking, available only when both Pro entitlement and the owner-controlled activation switch are true.

No additional feature is assumed to make a segment fit.

## 2. Segmentation method

The comparison asks:
- In what situation does the person encounter the problem?
- What task are they trying to complete?
- What creates friction, risk or delay in the current workflow?
- What alternatives do they already use?
- Do the three approved capabilities address the problem directly?
- What important expectations would the MVP fail to meet?
- Can this segment be reached for early validation?

A business buyer and the people using a product inside that business are treated as different stakeholders. A broad label such as "everyone who wants security" is not a useful cohort.

## 3. Candidate segments

### Segment A — Independent security practitioners and penetration testers

**Context and job**
- A practitioner receives or collects suspicious files, APKs, documents, scripts or URLs during security assessments, research, testing or incident triage.
- They need to determine whether an artifact is suspicious, understand what it does, preserve it safely, and decide what to do next.
- Their workflow may include reputation lookups, static inspection, sandbox execution, reverse engineering and evidence collection.

**Friction that could matter**
- Switching between separate file, URL, sandbox and analysis tools.
- Sending sensitive or client-provided samples to a third-party analysis service.
- Needing a quick first-pass result before committing to deeper analysis.
- Keeping an untrusted artifact separate from ordinary files.

**Existing alternatives and evidence**
- VirusTotal positions itself as a service for analysing suspicious files, domains, IPs and URLs and sharing results with its security community: https://www.virustotal.com/.
- Joe Security describes a specialist analyst workflow that includes static triage, dynamic execution, behavioural telemetry, threat correlation, IOCs, detection logic, reports, API integrations and dedicated manual labs. This is vendor-described capability, not independent proof of market share: https://www.joesecurity.org/joe-security-products.
- A Reddit r/netsec discussion explicitly warns that uploading targeted/custom malware to VirusTotal can expose it beyond the submitter. This is practitioner discussion and should be treated as a workflow/privacy concern to validate, not as a universal rule: https://www.reddit.com/r/netsec/comments/15mv0s/1_malware_analysis_protip_or_why_not_to_upload_to/.
- A practitioner asking how to safely collect and upload malware describes malware analysis as a substantial task in its own right: https://www.reddit.com/r/AskNetsec/comments/9xlsc4/how_to_safely_collect_and_upload_malware/.

**MVP fit**
- Manual file analysis and URL checking are directly relevant as first-pass triage.
- Quarantine/disposition could help preserve separation between an untrusted artifact and normal files.
- However, the approved MVP does not currently promise dynamic sandboxing, execution tracing, reverse engineering, IOC extraction, YARA/Sigma rules, detailed investigation reports, API integrations or analyst lab environments. Specialist products already position these as part of a mature practitioner workflow.
- A simple verdict and quarantine action may be too shallow for experienced malware analysts or penetration testers unless the product proves a distinct advantage such as safe local handling, a specific supported artifact workflow, or a useful lightweight workflow between deeper tools.

**Reachability**
- The original product origin gives the team a plausible route to practitioner conversations. This is a reachability hypothesis, not evidence that practitioners want this particular tool.

**Assessment**
- Strong alignment with the product's origin and likely access to informed interviewees.
- Partial fit with the MVP as currently approved; specialist expectations may exceed its scope.
- Demand is unproven.

### Segment B — Non-technical individuals who regularly handle unfamiliar files and links

**Context and job**
- A person receives or downloads an unfamiliar file, app package or link through messaging, email, a browser, a social platform or a third-party download source.
- They want to know whether it is risky before opening/installing it, and want a safe next action if it appears suspicious.
- The useful cohort is not every ordinary phone owner. It is people who encounter unfamiliar files/links often enough to experience uncertainty and take action.

**Friction that could matter**
- They may not know which existing protection is active or what it checks.
- They may not understand a technical scan result or the difference between "not detected" and "safe".
- They may need a simple manual check for a specific file or URL rather than a complex security dashboard.
- If a file is flagged, they need a clear, reversible disposition rather than being left to locate and remove it manually.

**Existing alternatives and evidence**
- Android includes Google Play Protect, which checks apps during installation and regularly scans for potentially harmful apps. Google also documents warnings for unsafe apps and URLs: https://support.google.com/googleplay/answer/2812853?hl=en.
- AV-Comparatives' May 2026 Android Mobile Security Review describes Play Protect and Chrome Safe Browsing as built-in protections, and evaluates third-party Android security apps that offer anti-malware and web protection. Its review also documents differences in third-party app functionality and Android platform restrictions: https://av-comparatives.org/tests/mobile-security-review-2026/.
- The AV-Comparatives review shows that third-party mobile security is an established category; selected-file/folder scanning, web protection and other security functions already exist in the market. This is not an empty market and feature presence alone does not prove differentiation.
- Google Play Protect is an existing default substitute for many supported Android users. Its presence may reduce the perceived need for another scanner, while device, OS, app-store and regional differences can affect the protection available.

**MVP fit**
- This segment maps most directly to the three approved capabilities: check an unfamiliar file, quarantine or otherwise dispose of a suspicious file, and check a website/link.
- The user outcome can be explained without requiring malware-analysis expertise.
- The MVP still needs trustworthy detection, careful false-positive handling, clear uncertainty language, and a safe quarantine lifecycle. A poor verdict could cause a user to open a malicious file or delete something important.
- The product must explain what its scan did and did not inspect. A single URL lookup must not be presented as a full website audit.
- The existence of Play Protect and established third-party apps means the team must identify a specific unmet situation; "more security" is not sufficient positioning.

**Reachability**
- This segment may be reachable through consumer-facing channels, but no launch channel, geography, community or acquisition capability has been established. Broad reach should not be assumed.

**Assessment**
- Best direct fit with the MVP's simple manual-check and disposition workflow.
- Significant competition and default substitutes.
- The segment must be narrowed by behaviour and exposure, not treated as all non-technical people.
- Demand is unproven.

### Segment C — Businesses and organisations buying licensed access

**Context and job**
- A business wants to reduce risk from suspicious files and malicious links encountered by employees or contractors.
- The buyer may be an owner, IT lead or security lead; the user may be an employee or analyst.
- The business needs consistent protection, visibility and a manageable response process across multiple devices or people.

**Friction that could matter**
- Fragmented tools and inconsistent employee behaviour.
- Difficulty monitoring device coverage and enforcing policies.
- Need for central visibility, reporting, investigation and remediation.
- Procurement, privacy, deployment, support and service reliability expectations.

**Existing alternatives and evidence**
- Microsoft describes Defender for Business as an endpoint security product for small businesses, including endpoint detection and response, attack-surface reduction, centralized management and automated investigation/remediation: https://learn.microsoft.com/en-us/defender-business/mdb-overview.
- Microsoft's documentation describes web protection, web threat protection, content filtering and custom indicators as part of its broader business security capabilities: https://learn.microsoft.com/en-us/defender-business/mdb-asr.
- CISA's phishing guidance includes SMB-specific measures such as awareness training and multifactor authentication, indicating that business phishing risk is addressed through a broader set of organisational controls, not only one-off URL lookups: https://www.cisa.gov/sites/default/files/2025-03/Phishing%20Guidance%20-%20Stopping%20the%20Attack%20Cycle%20at%20Phase%20One%20508.pdf.

**MVP fit**
- File and URL checking could be useful as individual utilities within a business workflow.
- The current MVP does not include centralised fleet management, policy enforcement, employee administration, alert aggregation, audit/reporting, endpoint monitoring, automated response or business support commitments.
- A business license does not by itself solve the buyer's operational requirements. The business segment would likely expect more than the approved MVP currently provides.

**Reachability**
- No target business size, buyer, sector, procurement route or sales capability has been established.

**Assessment**
- Plausible future commercial segment, but weak fit as the first primary customer for this MVP.
- "Businesses" is especially broad; the user, buyer and administrator would need separate definition.
- Demand is unproven.

## 4. Comparative assessment

| Criterion | A. Security practitioners | B. Non-technical individuals with recurring file/link exposure | C. Businesses/licensed organisations |
|---|---|---|---|
| Problem context is concrete | High | Medium–high when narrowed by behaviour | Medium; varies by organisation |
| Direct fit with approved MVP | Partial | High | Low–medium |
| Existing substitutes | Specialist analysis platforms and reputation tools | Play Protect, browser protections and third-party mobile security apps | Endpoint security suites and managed security services |
| MVP capability gaps | Dynamic analysis, evidence, reports, integrations and deeper investigation | Detection confidence, understandable results, safe disposition and differentiation | Central management, policy, monitoring, response and reporting |
| Likely first-validation access | Potentially high through original practitioner connection; unverified | Unknown | Unknown |
| Competitive pressure | High and specialist | High and consumer-facing | High and suite/platform-based |
| Demand evidence for ZeroDeck | None yet | None yet | None yet |

This is a qualitative fit assessment based on current scope and the cited alternatives. It is not a market-size estimate, competitor-share analysis or proof of willingness to use/pay.

## 5. Provisional primary cohort recommendation

**Recommend validating Segment B first, narrowed to:**

> Non-technical individuals who regularly receive or download unfamiliar files/apps and links from channels they do not fully trust, and who want a simple manual check and safe next action before opening them.

Why this cohort is the strongest initial validation hypothesis:
1. The three approved MVP capabilities translate into a coherent, understandable job: check a file, safely deal with a suspicious file, and check a link.
2. It does not require the product to pretend it is a full malware-analysis lab or enterprise endpoint platform.
3. The user can describe the trigger event and desired outcome without knowing security terminology.
4. The practitioner segment remains valuable for expert feedback and technical validation, but specialist workflows described by existing tools go well beyond the current MVP.
5. The business segment's expected management and response capabilities exceed the approved MVP scope.

**Important counterargument:** this consumer-facing problem already has default and paid alternatives. Play Protect, Chrome Safe Browsing and third-party Android security apps mean the product cannot assume a gap exists. A simple scan interface is not enough. The recommendation is to test the cohort, not to claim the product has found a market.

**What would overturn this recommendation:** evidence that the selected individuals rarely experience the problem, already feel adequately protected, do not trust or understand a new scanner, or do not use the quarantine/disposition workflow. Conversely, evidence of repeated, costly file/link uncertainty among independent practitioners could justify prioritising Segment A instead.

## 6. Other stakeholders and affected parties

- **Primary user in the provisional cohort:** the individual deciding whether to open, install or keep an unfamiliar file or visit a link.
- **Sender/source of the file or link:** may be legitimate, compromised or malicious; the product should not assume intent based only on unfamiliarity.
- **Person whose file is being checked:** may have privacy interests if the file is uploaded or shared with a provider. Current planning says no upload by default; optional remote analysis remains unresolved.
- **Practitioner/expert reviewer:** can assess whether the verdicts, limitations and file handling are technically credible even if they are not the initial primary customer.
- **Future business buyer/admin:** may have separate licensing, deployment, reporting and governance needs. Not selected as the first buyer.
- **Other product stakeholder/co-originator:** may have a different preferred target segment. This recommendation records the product-management assessment and does not claim agreement from that person.

## 7. Evidence gaps and what is not established

No primary customer interviews, surveys, usage analytics, conversion data, waitlist results or willingness-to-pay evidence were available for this step. The research establishes that alternatives exist and that the candidate segments have different workflows; it does **not** establish ZeroDeck demand.

Still unknown:
- Whether the initial platform is definitively Android/mobile or broader.
- Which file types and sources the MVP will actually support.
- Whether the user needs a pre-open scan, post-download scan, or both.
- Whether quarantine means moving, copying, encrypted storage, blocking access or another defined disposition.
- Whether the user values local-only analysis enough to switch from existing tools.
- Which geographic market and acquisition channel will be used.
- Whether the owner and other stakeholder agree on the provisional first cohort.

These questions must not be filled with demographic assumptions or product features outside the approved MVP.

## 8. Handoff to R — Report customer needs

Carry forward Segment B as the **provisional primary cohort for needs discovery**, not as a final owner-approved target market.

R must investigate:
1. The concrete situations in which this person receives or downloads unfamiliar files/apps and links.
2. What they currently do before opening/installing/visiting.
3. What makes their current approach fail, feel uncertain or take too long.
4. The consequence of a false positive, false negative or unclear result.
5. Whether quarantine/disposition is genuinely needed and what safe action means to them.
6. Whether the three capabilities solve one coherent problem or are merely adjacent utilities.
7. Whether a narrower practitioner cohort shows stronger unmet need after direct comparison.

Do not jump to features or solution designs in R. Report user jobs and needs first, and distinguish reported needs from inference.

## 9. I exit status

I has produced three behavior/context-based candidate segments, compared their workflows and alternatives, named the other affected stakeholders, and recommended one provisional cohort for the next discovery step. No segment has been declared an owner-approved target market and no demand claim has been validated.
