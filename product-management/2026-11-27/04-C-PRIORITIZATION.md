# C — Cut Through Prioritization

**CIRCLES step:** C — Cut through prioritization  
**Date:** 2026-11-27  
**Status:** Completed as a provisional evidence-weighted prioritization; customer validation and owner cohort decision remain outstanding  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)  
**Preceding step:** [03-R-NEEDS.md](03-R-NEEDS.md)

## 1. Decision boundary

The business outcome is owner-declared: **launch and validate real market demand/adoption**. Segment B remains a provisional discovery cohort, not an owner-approved target market. The practitioner segment remains a credible alternative.

This prioritization:
- ranks customer needs, not implementation tasks;
- uses the CIRCLES three-axis scaffold: **frequency of pain, acuteness (cost/consequence to the user), and alignment with the business goal**;
- distinguishes evidence from inference;
- does not change the owner-approved three-capability MVP;
- does not approve a feature, provider, architecture, launch market, or commercial model.

The evidence base is secondary research only. No direct ZeroDeck customer interviews or product usage data exist in the reviewed record. Scores are therefore qualitative and confidence-limited; they are not measured market demand.

## 2. Criteria and scoring rules

The CIRCLES source material recommends comparing needs on frequency, acuteness and alignment with the business goal. For this product, the following ordinal scale makes the judgement inspectable:

| Score | Frequency | Acuteness | Goal alignment |
|---|---|---|---|
| 3 | Repeated/common in the relevant workflow, supported by direct evidence | High consequence, material risk, cost or disruption | Directly helps test whether the approved product solves a real problem |
| 2 | Recurs for a meaningful subset, or supported indirectly | Meaningful uncertainty, friction or avoidable effort | Useful evidence about demand, but not the clearest demand test |
| 1 | Occasional, niche, or weakly evidenced | Limited or speculative consequence | Indirectly related to demand validation |
| 0 | No supporting basis or not relevant | No meaningful consequence established | Does not advance the stated goal |

**Confidence labels**
- **Medium:** supported by relevant external research or an established platform/provider contract, but not ZeroDeck customer evidence.
- **Low:** mostly inferred, adjacent evidence, or missing frequency/consequence data.
- **Very low:** important hypothesis with little direct support.

No composite arithmetic is used. Multiplying ordinal scores would create false precision. Needs are ranked by the rationale and by whether a critical safety prerequisite exists.

## 3. Provisional ranking — Segment B

| Rank | Need | Frequency | Acuteness | Goal alignment | Confidence | Rationale |
|---|---|---:|---:|---:|---|---|
| 1 | **B-N1 — Assess an unfamiliar link before opening, without relying solely on sender trust.** | 3 | 2 | 2 | Medium–low | Mobile messaging research reports frequent link clicking/forwarding and reliance on sender relationships; device-context research also finds different risk-avoidance behaviour. This gives a concrete decision moment to investigate. The actual frequency and unmet need in ZeroDeck's eventual market remain unknown. The owner-controlled activation gate also means this need cannot be tested through provider-backed usage until the owner enables the capability after the revenue-funding condition is met. |
| 2 | **B-N2 — Understand what a file/app check did and did not establish.** | 2 | 3 | 3 | Low–medium | A mistaken decision about a file/app can have serious consequences, and historical Android research shows technical permission information was poorly noticed/understood. But Play Protect is a substantial built-in substitute, so incremental demand is unproven. |
| 3 | **B-N3 — Take a safe, recoverable next action after a concerning file result.** | 1 | 3 | 2 | Very low | A false positive can cause loss or disruption, while a false negative can expose the user to harm. However, the reviewed sources do not establish how often this cohort wants quarantine or what disposition they prefer. Treat recoverability as a safety prerequisite, not yet a validated adoption driver. |
| 4 | **B-N4 — Get a proportionate, understandable security decision without added security fatigue.** | 2 | 2 | 3 | Medium–low | NIST describes security fatigue and Android permission research demonstrates comprehension problems in an older model. This is a cross-cutting requirement for any candidate solution, not a standalone reason to install ZeroDeck. |
| 5 | **B-N5 — Know whether an additional tool adds value beyond existing protection.** | 2 | 2 | 3 | Medium | The existence and breadth of Play Protect make differentiation essential. This is primarily a product adoption question/validation criterion rather than a separate customer job. |

### Highest-priority need

**B-N1 is the provisional first need to validate:** a person receives an unfamiliar link in a social or digital context and wants to make a better decision before opening it.

Why it ranks first:
1. It has a concrete, observable trigger and decision point.
2. External mobile messaging research directly reports frequent link interactions and reliance on sender trust, although the sample is small and not market-specific.
3. It maps to the approved link-check capability without assuming a full-site audit.
4. It offers a specific demand hypothesis that can be tested through recent-behaviour interviews and a real workflow test.

**Important constraint:** link checking is available only when both Pro entitlement and the owner-controlled activation switch are true. No provider/API call may occur if either gate is false. The need's high priority does not authorize enabling the capability, selecting a provider, relaxing the gates or making it free. The gating model may reduce how many users can experience this value and must be included in later viability evaluation.

## 4. Practitioner comparison

If Segment A is ultimately selected, the current practitioner needs rank differently:

| Rank | Need | Frequency | Acuteness | Goal alignment | Confidence | Rationale |
|---|---|---:|---:|---:|---|---|
| 1 | **A-N2 — Preserve sample confidentiality and know exactly what data leaves the device.** | 2 | 3 | 3 | Medium–low | A sensitive sample disclosure can create a serious secondary incident. Provider terms demonstrate that data access and commercial use constraints vary. Direct practitioner interviews are needed to establish how often this is decisive. |
| 2 | **A-N1 — Triage without overstating certainty.** | 2 | 3 | 3 | Medium–low | The SOC study reports burdensome alarm validation and the importance of reliable/explainable/contextual signals. This is adjacent evidence, not a direct sample of independent penetration testers. |
| 3 | **A-N3 — Reduce validation work rather than generate more alerts.** | 2 | 2 | 2 | Low–medium | Supported for SOC workflows, but whether it maps to the proposed practitioner cohort and a lightweight manual scanner is not established. |

The practitioner segment may have sharper technical needs, but the approved MVP does not include a complete analyst lab, dynamic sandbox, reverse engineering, detailed reports or integrations. This creates a risk that the product's current depth will not meet practitioner expectations. A small number of targeted practitioner interviews should be used as a challenge test to the provisional Segment B recommendation.

## 5. Must-have prerequisites versus adoption drivers

Prioritization must not confuse a safety prerequisite with a feature users have demonstrated they want.

### Trust and safety prerequisites

These apply regardless of which need ranks first:
- A result must distinguish detected, not detected, unsupported and inconclusive states; absence of a known match must not be described as proof of safety.
- Explain what was actually checked, its limits and whether any data was sent to a provider.
- A false-positive disposition must be recoverable or otherwise deliberately confirmed; do not irreversibly delete a file based only on an uncertain verdict.
- A failed or unavailable scan must not silently appear successful.
- A link lookup must not be presented as a full website audit.
- Pro entitlement and owner activation remain separate gates; no lookup occurs unless both are true.

These are safety requirements and constraints from product scope/evidence, not claims of validated user preference.

### Candidate adoption drivers to validate

- A repeated situation in which existing link protections or social trust do not resolve uncertainty.
- A file/app source or file-handling situation not adequately served by the user's existing protection.
- A meaningful benefit from a manual, user-initiated check rather than another always-on security product.
- A clear and trusted next action after a concerning result.
- A privacy advantage users understand and actually value, if the product can substantiate it.

## 6. What is not prioritised as a standalone need

The current evidence does not justify treating these as standalone first-MVP priorities:
- full-device continuous monitoring or always-on antivirus;
- central business fleet administration, employee policy enforcement or security operations reporting;
- dynamic malware sandboxing, reverse engineering or analyst lab workflows;
- IP address tracking/investigation (already excluded from MVP);
- scan history, admin portal/user management, threat-indicator administration, help CMS or service-health dashboard;
- a full website audit from a single URL lookup.

Some may be future opportunities, but they are not required by the ranked needs or owner-approved MVP scope on current evidence.

## 7. Dependencies and unresolved trade-offs

1. **Link-check availability vs demand learning:** the top-ranked Segment B need maps to a Pro-gated and owner-activated capability. Later solution evaluation must assess whether the gating arrangement allows a meaningful market test without violating owner decisions or exposing uncontrolled provider cost.
2. **File-analysis differentiation vs Play Protect:** a manual file checker must demonstrate a specific situation that built-in protection does not already resolve. No such gap is proven yet.
3. **Quarantine safety vs user demand:** quarantine/disposition may be necessary to make a concerning file result actionable, but user demand and preferred semantics are unvalidated. Its lifecycle and recovery risks are significant.
4. **Consumer simplicity vs practitioner depth:** a simple verdict may be accessible to non-technical users but inadequate for practitioners. Trying to serve both equally may weaken both experiences.
5. **Local-first privacy vs detection coverage:** local processing may reduce disclosure but could constrain analysis or freshness. Neither the exact technical trade-off nor user preference is settled.
6. **Geography and channel:** research samples are mainly non-Nigerian; launch geography and acquisition channel are unknown. No local-market prevalence or market size is inferred.

## 8. Recommended validation sequence

This is a research sequence, not an implementation plan.

1. Interview people in provisional Segment B about their last real unfamiliar-link and unfamiliar-file incidents. Capture trigger, frequency, current action, failure, consequence and whether they sought help.
2. Ask them to walk through their current Play Protect/browser/messaging workflow. Do not tell them ZeroDeck is better or imply that built-in protection is inadequate.
3. Test whether link uncertainty and file uncertainty occur in the same person's repeated workflow or represent separate jobs.
4. Ask what they do with a flagged file today; test whether quarantine is actually desired, and what restore/delete control they expect.
5. Interview a small practitioner comparison group about sample confidentiality, triage evidence and current tool friction. Use this to test whether Segment A has materially higher pain or a clearer unmet need.
6. Only after these observations, set a measurable demand-validation metric and threshold. Candidate measures may include repeated use for a real incident, completion of the relevant check, subsequent action taken, and voluntary return for another real incident. Do not set a numerical target from the current evidence.

## 9. Owner decisions still required

No owner decision is requested by this report, but these remain open:
- whether Segment B or Segment A should be the first target cohort;
- whether the product is intended to launch in Nigeria or another market;
- whether the current Pro + owner-activation gate is intended to apply to all launch users or only a controlled test cohort;
- what exact customer-demand signal should count as validation;
- whether any proposed change to the approved three-capability scope is acceptable.

## 10. C exit status

C is complete as a provisional prioritization. B-N1 is the highest-ranked need for initial discovery, with B-N2 next; B-N3 is a safety-critical prerequisite whose demand is not established. Practitioner needs are retained as a competing segment hypothesis.

**This ranking is not a market finding or owner-approved target decision.** It must be revisited when direct customer evidence becomes available.
