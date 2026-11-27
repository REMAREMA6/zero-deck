# R — Report Customer Needs

**CIRCLES step:** R — Report customer needs  
**Date:** 2026-11-27  
**Status:** Completed as an evidence-based secondary-research synthesis; primary customer validation remains outstanding  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)  
**Preceding step:** [02-I-IDENTIFY.md](02-I-IDENTIFY.md)

## 1. Purpose and evidence boundary

This step translates the provisional cohort's situations into customer jobs and needs. It does not select features, redesign the approved MVP, or claim that ZeroDeck has demonstrated demand.

The first-launch outcome remains owner-declared as **validating real market demand**. Segment B from Identify remains a provisional discovery cohort, not an owner-approved target market:

> Non-technical individuals who regularly receive or download unfamiliar files/apps and links from channels they do not fully trust, and who want a simple manual check and safe next action before opening them.

Security practitioners remain a comparison cohort because the original ZeroDeck direction came from penetration testing/ethical hacking.

**Evidence limitation:** no ZeroDeck customer interviews, surveys, product analytics, usage observations, waitlist data or willingness-to-pay data were available. External studies provide contextual evidence about user behaviour; they do not establish that the provisional cohort wants ZeroDeck. Consequently, this report distinguishes:
- **Externally reported evidence:** findings actually reported by cited research or product documentation.
- **Need interpretation:** a product-management interpretation of what that evidence may mean.
- **Unvalidated hypothesis:** a proposition that must be tested with target users.
- **Owner-declared scope:** the three capabilities approved for the MVP; these are not proof of customer demand.

## 2. Evidence reviewed

### E1 — Mobile instant-messaging link behaviour

Ahmad and Terzis' 2022 study, *Understanding phishing in mobile instant messaging: a study into user behaviour toward shared links*, surveyed 111 mobile instant-messaging users. Participants frequently clicked and forwarded links. Sender relationship and group context influenced behaviour; many relied on trust in friends, family and colleagues as a risk-reduction strategy. The authors note that this raises questions about the effectiveness and reliability of that strategy.

Source: https://strathprints.strath.ac.uk/81832/  
Publication: https://doi.org/10.1007/978-3-031-12172-2_15

**What it supports:** links are encountered in social messaging contexts, and trust in the sender/network can shape behaviour.

**What it does not support:** a claim that most Nigerian users behave the same way, that users want a separate link checker, or that a checker would change behaviour.

### E2 — Mobile versus PC phishing-risk behaviour

Carnegie Mellon University's summary of a 2025 *International Journal of Information Management* study reports analysis of URL-request records from 30 US networks over one week in 2020, plus two online experiments with more than 250 participants each. Mobile users were less likely than PC users to click phishing-like URLs for lower-risk URLs; for higher-risk URLs, mobile and PC users showed similar risk-avoidance tendencies. The authors suggest device context affects risk assessment and avoidance. They also state that the experiments could not fully mimic a real phishing attack.

Source: https://www.heinz.cmu.edu/media/2025/July/in-study-of-cybercrime-users-responded-to-phishing-differently-based-on-what-kind-of-device-they-used

**What it supports:** risk behaviour varies by device and context; mobile behaviour should not simply be assumed to mirror desktop behaviour.

**What it does not support:** that mobile users are necessarily safer overall, that avoiding a link is the desired product outcome, or that a manual checker is the best intervention.

### E3 — Android permissions comprehension

Google Research's 2012 study of Android permissions included an internet survey of 308 Android users and a lab study with 25 users. In both, 17% paid attention to permission information during installation; only 3% of internet-survey respondents answered all three comprehension questions correctly.

Source: https://research.google/pubs/android-permissions-user-attention-comprehension-and-behavior/

**What it supports:** users may not reliably notice or understand technical security information presented during an app-installation decision.

**Limitations:** this is a 2012 study of an older Android permission model, not a current study of ZeroDeck users or current Play Protect warnings. Use it as historical usability evidence, not a current prevalence estimate.

### E4 — Existing Android protection and its data flows

Google states that Play Protect checks apps before download from Google Play, checks apps from other sources, warns about potentially harmful apps, and may deactivate or remove harmful apps. Google also documents that users may be asked to send unknown apps to Google for code-level evaluation; Google may receive device network connections, potentially harmful URLs, OS information and installed-app information for protection purposes.

Sources:
- https://support.google.com/googleplay/answer/2812853?hl=en
- https://developers.google.com/android/play-protect/client-protections

**What it supports:** Android users already have a built-in substitute for important parts of app security scanning. Some protection workflows involve information being sent to Google.

**What it does not support:** that Play Protect is ineffective, that it does not inspect a given user's file, or that ZeroDeck's local analysis would be more accurate. Those claims require direct evidence and a defined comparison.

### E5 — Security fatigue and usable security

NIST's 2020 article, *Is Usable Security an Oxymoron?*, describes users feeling overwhelmed by the volume and complexity of security decisions and discusses security fatigue. It argues for security mechanisms that fit users' mental models and are usable in context.

Source: https://csrc.nist.gov/CSRC/media/Projects/usable-cybersecurity/images-media/Is%20Usable%20Security%20an%20Oxymoron.pdf

**What it supports:** adding another security tool or another decision is not automatically helpful; excessive complexity can undermine correct security behaviour.

**What it does not support:** a measured demand for ZeroDeck or a quantified level of security fatigue in its target cohort.

### E6 — Practitioner alarm validation

The USENIX Security 2022 study *99% False Positives: A Qualitative Study of SOC Analysts' Perspectives on Security Alarms* surveyed 20 SOC practitioners and conducted a qualitative investigation with 21 practitioners. It reports that alarm validation is tedious and can cause burnout/desensitization. It distinguishes false positives from true alarms explained by benign activity, and identifies reliable, explainable, analytical, contextual and transferable alarm properties as useful for validation.

Source: https://www.usenix.org/conference/usenixsecurity22/presentation/alahmadi

**What it supports:** professional security users need useful context and explainability to validate findings; raw alert volume or a simple label can create work rather than remove it.

**Limitations:** this is SOC alarm research, not a direct study of independent penetration testers using a mobile file scanner. Apply it as adjacent practitioner evidence only.

### E7 — VirusTotal API use constraints

VirusTotal documents that its Public API is for non-commercial or academic use, with a rate limit of four interactions per minute. Commercial or government use is allowed under its paid Private API, with custom rate limits and pricing by quote.

Source: https://docs.virustotal.com/docs/difference-public-private

**What it supports:** a familiar reputation service cannot be assumed to be a free commercial backend for ZeroDeck. Provider terms and cost are part of viability, not an implementation detail.

**What it does not support:** whether ZeroDeck should use VirusTotal or whether its users would accept any particular provider.

## 3. Customer situations and underlying jobs

### Segment B — Individuals with recurring unfamiliar-file/link exposure

| Situation / trigger | Underlying job | Need implied by evidence | Evidence status |
|---|---|---|---|
| A link arrives in a one-to-one or group messaging conversation. | Decide whether to open the link without relying only on who sent it. | A way to assess a link when social trust is not enough, with a result understandable at the moment of decision. | Link-sharing and sender/group effects reported in E1; need is an interpretation. |
| A person encounters a link on a website, email or other channel. | Decide whether to proceed, wait, or avoid it. | A quick, low-friction way to check a specific URL, without implying that a single lookup audits an entire website. | General job is plausible; specific demand is unvalidated. |
| A person downloads an app package or file from outside a familiar source. | Decide whether to install/open, keep, or remove the item. | Understand what was checked, what the result means, and what remains unknown. | Existing Play Protect coverage documented in E4; demand for an additional checker is unvalidated. |
| A scan produces a warning or uncertain result. | Decide what to do next without accidentally losing an important file or exposing themselves to risk. | Clear severity/uncertainty, safe next action, and a recoverable disposition where appropriate. | Need interpretation; no direct ZeroDeck user evidence. |
| A result is unclear or too technical. | Understand the practical meaning of the result. | Plain-language explanation that does not overstate certainty or force the user to interpret engine jargon. | Supported indirectly by E3 and E5; specific wording and format need testing. |
| A person already uses built-in protection or another scanner. | Decide whether an additional product offers enough value to justify installing and using it. | A demonstrable unmet job, not another generic promise of security. | Substitute existence documented in E4; switching motivation unknown. |

**Important qualification:** the research supports the existence of link-sharing and app-protection workflows. It does not show that the target user is repeatedly blocked by these situations, is dissatisfied with current protection, or would install a separate tool.

### Segment A — Independent security practitioners / penetration testers

| Situation / trigger | Underlying job | Need implied by evidence | Evidence status |
|---|---|---|---|
| A practitioner receives a suspicious artifact during assessment or research. | Triage the artifact while preserving the ability to investigate it further. | Reliable, interpretable findings and clarity about analysis depth/limitations. | Adjacent practitioner evidence E6; direct interview evidence absent. |
| A suspicious sample or client artifact may contain confidential material. | Assess risk without creating an unintended disclosure. | Know exactly what data leaves the device and under what conditions; avoid accidental public submission. | Provider/API distinctions E7; privacy concern is a hypothesis to validate with practitioners. |
| A scanner produces an alert. | Decide whether the alert is meaningful and what action to take. | Contextual evidence and a way to validate the finding, rather than an unsupported binary label. | E6 supports validation burden in SOCs; application to penetration testers is an inference. |
| A result is inconclusive or disagrees with other tools. | Continue investigation without treating one result as authoritative. | Explicit uncertainty, evidence provenance and a clear handoff to deeper tools. | Product-management inference grounded in E6; direct needs research required. |

The approved MVP does not currently include dynamic sandboxing, reverse engineering, IOC extraction, YARA/Sigma authoring, detailed analyst reports or lab workflows. Do not imply those capabilities are required or already approved. Practitioner interviews may nevertheless reveal that the current MVP is too shallow for this cohort.

## 4. Need statements

The following are candidate need statements, not user quotations.

### B-cohort candidate needs

**B-N1 — Make a better link decision.**  
When an unfamiliar link arrives in a social or digital context, I need to assess its known risk before opening it, so that I do not have to rely solely on sender trust or guesswork.

- Evidence: E1, with E2 as contextual evidence.
- Confidence: Medium that this situation exists; low that a separate ZeroDeck checker is demanded.
- Open question: what do people currently do when uncertain, and what makes that method insufficient?

**B-N2 — Understand a file/app check.**  
When I am considering opening or installing an unfamiliar file or app package, I need to understand what was checked and what the result does and does not establish, so that I can make an informed decision.

- Evidence: E3 and E4.
- Confidence: Medium for the comprehension need; low for demand for an additional manual scanner.
- Open question: which file types and acquisition contexts occur often enough to matter?

**B-N3 — Take a safe, reversible next action.**  
When a file is flagged or uncertain, I need a clear way to keep it from being opened accidentally while preserving a way to recover or deliberately dispose of it, so that a mistaken warning does not cause unnecessary loss.

- Evidence: inferred from the approved quarantine/disposition capability and general usability/safety principles; no direct customer evidence found.
- Confidence: Low.
- Open question: do users actually need quarantine, or would they prefer to delete, leave untouched, move elsewhere, or seek expert help?

**B-N4 — Avoid another confusing security burden.**  
When using a security tool, I need the check and next step to be understandable and proportionate, so that the tool does not add more confusing decisions than it removes.

- Evidence: E3 and E5.
- Confidence: Medium as a usability principle; low as a differentiated purchase/adoption need.
- Open question: what level of explanation is useful without overwhelming users?

**B-N5 — Know when existing protection is enough.**  
When I already have built-in or third-party protection, I need to understand whether a separate manual check adds meaningful coverage for my particular situation, so that I do not install redundant software.

- Evidence: E4 establishes a substantial default substitute; need is an inference.
- Confidence: High that differentiation must be demonstrated; unknown whether users articulate this need.
- Open question: which uncovered situation, if any, occurs often enough to motivate switching?

### A-cohort candidate needs

**A-N1 — Triage without overstating certainty.**  
When reviewing a suspicious artifact, I need a result whose evidence and analysis limits are clear, so that I can decide whether deeper investigation is necessary.

- Evidence: adjacent SOC evidence E6.
- Confidence: Medium as a practitioner workflow need; low for independent penetration testers specifically.

**A-N2 — Preserve sample confidentiality.**  
When handling client or otherwise sensitive samples, I need control and transparency over whether file content or metadata is transmitted to an external provider, so that triage does not create a second security/privacy incident.

- Evidence: provider terms and data-flow implications E7; supported by prior-art research, but not by direct interviews.
- Confidence: Medium as a plausible professional requirement; must be validated for the target practitioner cohort.

**A-N3 — Reduce validation work, not just generate alerts.**  
When a tool flags an artifact, I need enough context to validate the finding quickly, so that I am not left with another stream of unqualified alerts.

- Evidence: E6.
- Confidence: Medium for SOC analysts; lower for the specific practitioner cohort.

## 5. Current alternatives and workarounds

These are evidenced alternatives, not an exhaustive competitor inventory.

| User job | Current alternative / workaround | What is established | Unanswered gap |
|---|---|---|---|
| Assess an Android app or APK | Google Play Protect and Android's existing app safety mechanisms | Google documents pre-download checks, checks for apps from other sources, warnings and possible removal/deactivation (E4). | Does the user's actual file/source fall outside what they believe Play Protect covers? Does manual selection add meaningful value? |
| Assess an unfamiliar link | Browser warnings, platform protections, built-in messaging/email warnings, asking the sender, avoiding the link, or searching independently | E1 reports reliance on sender relationships and group context; E2 finds device-context differences in risk avoidance. | Which workaround is most common in the intended market, and where does it fail? |
| Assess a suspicious file professionally | Hash/reputation lookups, local inspection, specialist sandboxes and commercial services | VirusTotal's API model and restrictions are documented in E7; specialist alternatives were identified in I. | Which specific workflow gap remains for a lightweight tool, and what data can be shared? |
| Respond to a suspicious result | Ignore, delete, uninstall, isolate manually, or escalate to a knowledgeable person | These are plausible actions, not directly measured for the provisional cohort in the sources reviewed. | What action do users actually take, and what makes it difficult or risky? |

## 6. Cross-capability coherence

The three approved capabilities may form one coherent job, but this has not been demonstrated.

**Possible coherent job hypothesis:** "Help me make a safer decision about a specific unfamiliar digital item before I open it, install it or visit it, and give me a safe next action if the result is concerning."

- Manual file analysis addresses the file/app decision.
- Quarantine/disposition addresses the next action after a concerning file result.
- Website/link checking addresses the URL decision, subject to Pro entitlement and owner activation.

**Alternative interpretation:** these may be adjacent utilities rather than one repeated customer workflow. A user may need link checking frequently but never quarantine files, or may need specialist file triage but not a consumer-facing URL check.

The next prioritization step must not assume that the three capabilities have equal customer importance or that one cohort needs all three. The owner-approved scope remains the authority; prioritization should identify dependencies and recommend sequencing/experience emphasis without silently removing an approved capability.

## 7. Risks and consequences that shape the need

1. **False negative:** a user may open/install/visit something harmful after an overly reassuring result. A result must not equate "not detected" or "no known match" with "safe".
2. **False positive:** a legitimate file may be blocked, quarantined or deleted. Disposition must be recoverable and transparent; the product must not make irreversible decisions from an uncertain verdict.
3. **Inconclusive result:** a tool may not support a format, may lack a current reputation result, or may be offline. The user needs to know that the check did not establish safety.
4. **Privacy disclosure:** remote checking may disclose a URL, file hash, file content, metadata or other information. The exact data flow must be explicit before a user submits anything.
5. **Security fatigue:** adding a tool with complicated settings or repeated warnings can worsen rather than solve the user's decision burden (E5).
6. **Duplicate protection:** built-in Android protection is already a meaningful substitute; ZeroDeck must prove a specific gap rather than imply users are unprotected (E4).
7. **Provider/commercial constraints:** third-party API use can have rate, licensing and pricing conditions. Do not build a customer promise around a provider contract that does not permit the intended commercial use (E7).

## 8. What we still do not know

### Customer and demand
- Frequency of unfamiliar-file and link encounters in the intended launch market.
- Which channels and file types are common.
- What people do today and which part is genuinely painful.
- Whether users understand or trust existing protection.
- Whether a new manual checker changes behaviour or merely adds friction.
- Whether users value local-first processing, and what trade-offs they accept.
- Whether quarantine is understood, desired and trusted.
- Whether users will install, retain or recommend a separate product.
- Whether practitioners have a more urgent unmet need than the provisional consumer cohort.
- Any willingness-to-pay or Pro conversion evidence.

### Product behaviour and scope
- Initial platform and supported file types remain unconfirmed.
- Exact scan method, verdict categories and detection coverage remain open.
- The quarantine storage, restore, deletion, retention and recovery model remains open.
- Link-check provider, data sent, caching, quotas, limits and failure states remain open.
- Pro entitlement and owner activation are separate gates; pricing and activation economics remain unresolved.

### Research limitations
- The reviewed mobile messaging study had 111 participants; geography and sampling do not establish the behaviour of ZeroDeck's eventual launch market.
- The CMU study's observed network traffic came from 30 US networks over one week in 2020; its experiments cannot fully reproduce real phishing attacks.
- The Android permission study is from 2012 and concerns an older permission interface.
- The SOC alarm study is about SOC practitioners, not a direct sample of independent penetration testers.
- Vendor documentation establishes the vendor's described product behaviour, not independent efficacy.

## 9. Recommended discovery questions (not feature requests)

Use recent, concrete behaviour rather than asking whether someone likes the idea of a security app.

### For provisional Segment B
1. Tell me about the last time you received a file, app or link and were unsure whether to open it.
2. Where did it come from, what did you do, and what happened next?
3. What made you trust or distrust it?
4. What protection or tool did you use, if any? How did you know it had checked that item?
5. What did you do when the result was unclear?
6. Have you ever kept, deleted or lost a file because you were unsure about its safety?
7. Have you ever avoided a link or download because checking it felt too difficult?
8. What would make you trust a result enough to act on it? What would make you reject it?
9. When a file is flagged, what do you want to happen to it, and what would make that action feel safe?
10. What is the most recent example where your current approach failed or cost you time, money or access?

### For practitioners
1. Describe the last suspicious artifact you triaged and the sequence of tools/actions used.
2. Which steps were slow, unreliable or risky?
3. What sample data could not be sent to an external service?
4. What evidence must a first-pass tool provide before you trust or act on a result?
5. What would make a lightweight manual checker useful alongside your existing workflow?
6. What would make it irrelevant or dangerously misleading?

Do not treat positive reactions to a concept or hypothetical willingness to install as evidence of demand. Seek examples of recent behaviour, repeated frequency, current workaround and actual consequences.

## 10. Handoff to C — Cut through prioritization

Carry forward these candidate needs:
- B-N1: assess a specific unfamiliar link without relying solely on sender trust.
- B-N2: understand what a file/app check did and did not establish.
- B-N3: take a safe, recoverable next action after a concerning file result.
- B-N4: get a proportionate, understandable security decision without added security fatigue.
- B-N5: know whether an additional tool adds value beyond existing protection.
- A-N1/A-N2/A-N3: practitioner triage clarity, sample confidentiality and useful validation context.

The prioritization step should:
1. Fix explicit criteria tied to the owner-declared goal of validating real demand.
2. Compare frequency, consequence, current workaround failure, MVP fit, evidence strength and ability to validate.
3. Identify capability dependencies and safety prerequisites.
4. Separate a need that must be met for a trustworthy MVP from an optional standalone feature.
5. Preserve owner-approved scope and exclusions; present any proposed scope change as a recommendation requiring owner approval.
6. Keep the provisional cohort provisional until the owner decides.

## 11. R exit status

R is complete as a secondary-research needs report: candidate jobs and needs are stated, externally reported findings are distinguished from inference, alternatives are recorded, and evidence gaps are explicit.

**R is not primary customer validation.** No need should be described as directly reported by a ZeroDeck customer, and no demand or willingness-to-pay claim has been established.
