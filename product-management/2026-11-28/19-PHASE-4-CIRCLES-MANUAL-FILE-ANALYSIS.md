# Phase 4 CIRCLES — MVP-01 Manual File Security Analysis

**Date:** 2026-11-28  
**Author:** ZeroDeck Product Management Agent  
**Work:** Phase 4 of the PM-authored product-rules workstream  
**Status:** Completed analysis; recommendation only, not owner approval of the contract

## C — Comprehend the situation

**Goal.** Help a user make a more informed decision about a file before trusting or opening it, while protecting the user's data and avoiding false assurance. The first MVP scope establishes MVP-01 as manual file security analysis. A measurable business outcome and launch target have not been owner-defined; product adoption and user trust are working assumptions, not established commercial facts.

**Constraints.**
- The approved MVP includes exactly manual file security analysis, quarantine/disposition, and website/link checking. This phase covers MVP-01 only.
- Web and Android are the selected product platforms; their file-access capabilities may differ.
- Standalone scan history and automatic/background protection are excluded.
- No engine, provider, file-type matrix, file-size limit, verdict threshold, cloud feature, retention schedule or performance target is approved.
- Product work is confined to `product-management/`; no product implementation or Software Rules repository changes are authorized.

**Context.** The supplied product-material working draft describes manual selection and scan request, four proposed result classes, a no-known-threat disclaimer, an on-device/no-cloud-upload default, and truthful unsupported/failure outcomes. It labels engine, file formats, thresholds and several details as open. No deployed ZeroDeck runtime has been observed.

**Assumptions carried forward.** The first useful workflow is a user checking a file they have obtained before deciding whether to trust or handle it. This is an inference from the approved target audience and MVP scope, not a measured usage pattern. Numeric success targets and launch dates are unknown.

## I — Identify the customer

**Candidate cohorts.**
1. Everyday non-technical users who receive or download files and want to assess them before opening or sharing.
2. Technically experienced users who want to inspect unfamiliar files and understand detection coverage.
3. Small teams or operators who need repeatable file triage and records for work.

**Chosen cohort.** Everyday non-technical users who have a specific file in hand and want to decide whether it is prudent to open or otherwise use it.

**Why this cohort.** The owner selected everyday non-technical users as the first target cohort. The manual file-analysis workflow directly addresses a concrete moment of uncertainty without assuming security expertise. This choice is grounded in owner direction, not primary research proving cohort size or demand.

**Stakeholders.** The file owner/user; people who may receive a file the user shares; product owner; support/operations; and any future analysis-engine or data provider. If file content is ever sent to a processor, that processor becomes a material data-handling stakeholder. No such cloud processor is selected or approved.

## R — Report the customer's needs

The stated product want in the working material is a manual file scan. That is a proposed mechanism, not the underlying need.

**Inferred need A — chosen.** As an everyday user handling an unfamiliar file, I need to understand whether available analysis found a known threat and how uncertain or limited that analysis is, so that I can make a more informed decision before trusting the file.

**Inferred need B.** I need the analysis process to avoid silently changing my file or disclosing its contents, so that checking a file does not create a new loss or privacy risk.

**Inferred need C.** I need to understand why a file could not be analysed and what can be retried or is unsupported, so that an error is not mistaken for a clean result.

**Evidence quality.** These are PM-inferred needs. No interviews, surveys, support data, usage analytics or controlled user tests were performed for this phase. The product-material draft and owner-approved cohort/scope establish the workflow context, not the frequency or intensity of customer pain.

## C — Cut through prioritization

**Axes fixed before ranking:** (1) likely frequency of encountering the need in the manual file workflow; (2) acuteness of harm if the need is unmet; (3) alignment with the goal of helping a user make an informed file decision while preserving trust.

| Rank | Need | Frequency (inferred) | Acuteness | Goal alignment | Decision |
|---:|---|---|---|---|---|
| 1 | Understand detection outcome and uncertainty | High within the core scan workflow | High: false reassurance or false alarm can change user action | Direct | Choose |
| 2 | Avoid file alteration or unintended disclosure | Applies to every scan, though harm frequency unknown | Potentially high | Direct trust requirement | Keep as guardrail |
| 3 | Understand unsupported/failure outcomes and recovery | Conditional on edge cases | Medium to high when it blocks the task | Supports task completion | Keep as necessary coverage |

**The cut.** Phase 4 prioritizes an interpretable, bounded analysis outcome. It does not solve broader malware protection, automatic monitoring, quarantine/disposition, whole-device protection, or remote multi-engine coverage. Those are outside this contract or deferred. Privacy and non-destructive handling remain guardrails, not competing standalone capabilities.

**Confidence.** The ranking is a product judgment based on workflow centrality and consequence. It is not a measured frequency ranking.

## L — List solutions

Three materially different product approaches address the chosen need:

1. **Quick win — narrow local verdict.** Offer a tightly bounded local analysis coverage set and communicate a simple, honest result. This minimizes data movement and operating dependencies but may have limited coverage and more inconclusive results.
2. **Core bet — explainable bounded local analysis.** Offer a documented set of supported inputs and detection coverage, four distinct outcome classes, provenance where available, clear limitations, and no cloud upload by default. The user sees what was and was not assessed.
3. **Longer horizon — optional consent-based assisted analysis.** Retain local analysis as the default and add a separately approved cloud-assisted path only after disclosure and explicit consent. This could extend coverage but adds privacy, provider, cost, availability and consent complexity.

These are product approaches, not engine or architecture selections. No named scanning technology is recommended by this list.

## E — Evaluate solutions

**Axes fixed before comparison:** user decision quality; privacy/trust; viability and operating cost; fit with a non-technical user's workflow; false-positive/false-negative consequences; failure resilience; and dependency burden. Technical feasibility is a floor to validate later, not a reason to ignore user value.

| Option | Strengths | Drawbacks and risks | Short/long-term consequence |
|---|---|---|---|
| Quick win | Simple workflow; smallest data boundary; fewer external dependencies; useful first proof | Limited detection coverage may produce frequent inconclusive/no-match results; users may over-trust a simple badge unless wording is careful | Fastest learning, but may not sustain value if coverage is too narrow |
| Core bet | Directly addresses decision quality; explains uncertainty; privacy-preserving default; clear contract boundaries | Requires meaningful supported-input policy, evidence quality, engine validation and ongoing update/resource work; may be more expensive than a narrow check | Best foundation for trust if the actual engine can substantiate its claims |
| Optional assisted analysis | Potentially broader coverage and improved handling of difficult files | Sends sensitive content to another party; requires consent, processor review, cost controls, availability handling and clear opt-out; wrong results still have consequences | Could expand coverage later, but is inappropriate as an unapproved default |

**Evaluation.** Option 2 best addresses the selected need without silently shifting file data to a remote party. Option 1 is a credible proof path but may underserve users if the supported coverage is too narrow. Option 3 is not suitable for the current MVP baseline because cloud analysis is unresolved and would introduce a new trust boundary.

**Preferred option's drawback.** The core bet depends on selecting an engine and supported coverage that can be independently validated. The product must be willing to return Could not decide rather than inflate its coverage. This may make the product appear less decisive, but is preferable to unsupported safety claims.

## S — Summarize the recommendation

**One recommendation.** Proceed with the bounded local-analysis product model: manual user initiation, explicit supported-input boundaries, the four-way outcome taxonomy, provenance and limitation disclosure where available, truthful failure/retry states, and no cloud upload by default. Keep cloud analysis out of the current approved scope unless separately approved.

**One success metric.** In a moderated test with first-time users from the chosen cohort, measure the percentage who correctly interpret the result class and choose an appropriate next action after one scan. Compare against their current file-checking workaround; set a numeric target before running the test. This distinguishes comprehension and decision quality from mere scan usage.

**Trade-off.** This recommendation gives up the immediate breadth and convenience that a remote multi-engine service might offer, and accepts more inconclusive results until a trustworthy local engine and coverage set are established.

**Why this option.** It best protects the selected user's decision quality and privacy while preserving a technology-independent contract. The quick win may be too narrow; the cloud-assisted option is not yet authorized.

**Objections and answers.**
- *Will local analysis detect everything?* No. The product must state its actual coverage and never guarantee safety.
- *Why not upload every file for a broader check?* That would change the privacy boundary and needs a separate product decision, disclosure, consent and processor review.
- *Why are file types and thresholds not fixed here?* The evidence does not establish them; they must be selected with engine and workload evidence, not guessed.

**Unknowns.** Engine, supported formats/limits, classification criteria, false-positive/negative policy, cloud-analysis existence, retention, performance budgets and platform support remain open. No customer research or runtime testing was performed. The recommendation is not an owner decision.
