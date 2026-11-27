# E — Evaluate Solution Trade-offs

**CIRCLES step:** E — Evaluate solutions  
**Date:** 2026-11-27  
**Status:** Completed; comparison is evidence-limited and recommendation is deferred to S  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)  
**Preceding step:** [05-L-SOLUTION-OPTIONS.md](05-L-SOLUTION-OPTIONS.md)

## 1. Evaluation boundary

The three options are evaluated against the provisional highest-priority need B-N1:

> Assess an unfamiliar link before opening, without relying solely on sender trust.

The provisional cohort is Segment B (non-technical individuals with recurring unfamiliar-file/link exposure). It is not an owner-approved target market. The business outcome is owner-declared: validate real market demand/adoption after launch.

No direct ZeroDeck customer interviews, product usage data, willingness-to-pay evidence, provider selection, or launch-market decision exists in the reviewed evidence. Therefore:
- no option can be declared proven valuable, lovable or commercially viable;
- no numerical market or revenue estimates are fabricated;
- feasibility is treated as a floor/check, not the main discriminator;
- all options are judged against the same axes;
- drawbacks are stated for every option;
- this step evaluates, but does not make the final recommendation.

## 2. Axes fixed before comparison

These axes are set before weighing the options.

| Axis | Question | Why it matters |
|---|---|---|
| **Value / need fit** | Does it help the user make a better decision about an unfamiliar link at the actual moment of uncertainty? | The option must solve B-N1, not merely expose a scanner feature. |
| **Lovability / workflow fit** | Does it fit where the user already encounters links, without asking for a new habit or unnecessary app switching? | The skill emphasises fit with existing behaviour. |
| **Viability** | Is this a problem people will pay to have solved at scale, and can the product serve it within its commercial/operational constraints? | The owner wants evidence of real market demand. |
| **Trust, privacy and safety** | Does it avoid misleading certainty, unintended inspection, undisclosed data transfer and unsafe action? | A wrong or opaque security result can cause harm. |
| **Cost and operating burden** | What provider calls, support, maintenance, permissions, integrations and abuse controls does it require? | A link-check service may incur per-lookup costs and has a Pro + owner-activation gate. |
| **Feasibility floor** | Is there a credible path to deliver it on a supported platform without assuming unverified APIs or permissions? | Buildability must be checked, but it should not outweigh value and viability. |
| **Strategic alignment and learning** | Does it test the owner-declared demand-validation goal and preserve the approved MVP boundaries? | A launch test should produce interpretable evidence without expanding scope. |

All four product risks are considered: valuable, usable, feasible and viable. The terms “lovable” and “fits existing workflow” are evaluation lenses from the PM agent's skill; they are not claims of proven customer preference.

## 3. Comparative evaluation

| Axis | Option 1 — Manual destination check | Option 2 — Point-of-sharing check | Option 3 — Cross-context decision layer |
|---|---|---|---|
| **Value / need fit** | **Medium.** Provides a direct answer to the selected need when the user remembers to copy/share the link into ZeroDeck. | **High potential.** Delivers the check at the point the link is already being handled, reducing friction between uncertainty and assessment. | **High potential, unproven.** Could cover more moments, but may solve more than the evidence supports. |
| **Lovability / workflow fit** | **Low–medium.** Familiar manual action, but app switching and copying may interrupt the existing task. | **Medium–high.** Uses a native share action and preserves user intent. Still adds an explicit step and may not be available consistently in every context. | **Unknown / potentially low.** Broader integration could fit naturally, but prompts, permissions or background behaviour may feel intrusive. |
| **Viability** | **Unknown.** Cheapest way to test whether users value a manual check, but a separate app and Pro gate may suppress use. Willingness to pay is unproven. | **Unknown.** Better workflow fit may improve repeated use, but no evidence establishes that users will pay for this improvement. | **Very uncertain.** Broader potential value is offset by higher costs and unclear willingness to grant permissions or adopt a more integrated security layer. |
| **Trust, privacy and safety** | **Strongest control surface.** User explicitly submits one URL. Must still disclose provider lookup and avoid “safe” claims. | **Strong if explicit.** User deliberately shares the URL. Must show the exact submitted destination and not imply the original message/sender was verified. | **Highest risk.** Cross-context operation raises consent, permission, scope and accidental inspection concerns. Must not silently read messages or inspect links. |
| **Cost / operating burden** | **Lowest relative burden.** One explicit user action per lookup; provider costs still require quota and spend controls. | **Low–medium.** Similar lookup volume if user-initiated, plus platform integration, testing and support across share sources. | **Highest.** More integration surfaces, edge cases, support and potential lookup volume; cost exposure increases if checks are triggered more often. |
| **Feasibility floor** | **Likely straightforward** once provider, URL contract and platform are selected; details remain unverified. | **Plausible but platform-dependent.** Share handling and return flow must be verified on the actual target platform. | **Unproven / high dependency.** Cross-app interception or background inspection may be restricted or inconsistent. |
| **Strategic learning** | **High for a low-cost test.** Can test whether a user-initiated lookup solves a real problem, but app-switching friction may understate the need. | **High.** Tests both the need and whether removing a specific workflow friction increases completion/repeat use. | **Lower initially.** Tests a broader, more expensive concept before the underlying need and permission acceptance are established. |

### Option 1 — Manual destination check

**What it gains**
- Narrowest and most explicit user action.
- Lowest relative integration and operating burden.
- Useful baseline for testing whether people actually want to check a URL before opening it.
- Easier to explain what data is submitted and when.

**What it gives up**
- The user must leave the current context and return.
- It may fail precisely when the user is moving quickly through a message or group conversation.
- Low adoption could reflect friction rather than lack of underlying need.
- The Pro + activation gate may limit exposure to the capability during validation.

**Risk if selected:** a weak manual workflow could produce a false negative about market demand. A user may value the outcome but not tolerate the steps.

### Option 2 — Point-of-sharing check

**What it gains**
- Fits an existing user action: sharing a link.
- Reduces manual copying and app switching.
- Keeps the user in control of when a link is submitted.
- Tests whether a workflow improvement changes real completion and repeat use.

**What it gives up**
- It still requires the user to recognise a risk and intentionally invoke the check.
- Share-sheet behaviour and destination handoff vary by platform/app; compatibility cannot be assumed.
- More integration and test burden than a basic manual flow.
- A user may misunderstand the result as validating the sender, message or whole page rather than the submitted URL.

**Risk if selected:** the product may optimise a workflow that users do not need often enough, and the Pro gate may still prevent meaningful usage. This option is not proven to be more lovable until tested with real users.

### Option 3 — Cross-context link decision layer

**What it gains**
- Potentially reduces the effort required to assess a link in different contexts.
- Could address the moment before the user proceeds, rather than asking them to remember a separate tool.
- May support broader future product differentiation if users repeatedly encounter the problem.

**What it gives up**
- Requires broader platform support, permissions, integration and ongoing maintenance.
- Risks becoming intrusive or being perceived as monitoring private activity.
- May generate more checks and provider costs.
- Creates more failure modes and user expectations than the evidence currently justifies.
- Risks expanding beyond the approved MVP and its explicit user-initiated link-check scope.

**Risk if selected:** building the broadest concept first may consume resources and trust before proving that the underlying problem is frequent, acute or worth paying to solve.

## 4. Viability analysis

No willingness-to-pay evidence exists for any option. The fact that link checking is in the owner-approved MVP does not prove that users will pay for it.

Specific viability constraints:
- Link checking requires both Pro entitlement and owner-controlled activation.
- No provider/API request may occur unless both gates are true.
- Pro is not unlimited; per-user limits, global spend controls and abuse prevention remain unresolved.
- VirusTotal's documented Public API is non-commercial/academic only and limited to four interactions per minute; commercial use requires its paid Private API with custom terms/pricing. This demonstrates why a provider cannot be selected by popularity alone.
  Source: https://docs.virustotal.com/docs/difference-public-private
- The exact provider, commercial rights, coverage, pricing and data handling remain unresolved.
- The eventual launch market, acquisition channel, conversion model and support capacity are unknown.

**Finding:** Option 1 is the least expensive way to learn whether the need exists; Option 2 has the strongest plausible workflow fit; Option 3 has the weakest current viability case because it asks the product to carry more operational and privacy burden before demand is proven.

## 5. Value and usability risks

1. **Wrong reassurance:** a no-match or clean-looking result may be misinterpreted as proof of safety. All options need honest uncertainty language.
2. **Wrong alarm:** a legitimate URL may be flagged or unavailable. The user needs a clear, non-alarmist explanation and a way to decide what to do.
3. **Context loss:** Option 1 may interrupt the original conversation and make the user lose the source/context of the link.
4. **Scope misunderstanding:** none of the options verifies the sender or message; a single lookup does not audit an entire website.
5. **Permission fatigue:** Option 3 may require broader access than users expect and add another security decision.
6. **Gated availability:** if Pro or owner activation is false, the product must not call the provider. A validation experiment must not misrepresent the capability as universally available.

## 6. Feasibility check

| Option | Feasibility status | What must be verified |
|---|---|---|
| Option 1 | **Plausible; not yet verified** | Platform and URL input path, provider contract, normalization, timeout/error states, cache and quota behaviour. |
| Option 2 | **Plausible; platform-dependent** | Actual target platform, share intent support, return-to-source flow, supported apps and URL handling. |
| Option 3 | **Unproven; substantial dependency** | Whether the desired cross-context behaviour is allowed and reliable on the target platform, consent/permissions, data minimisation, and provider-call control. |

No technology stack is selected. Feasibility is a floor; this is not a technical architecture decision.

## 7. Evaluation result (not final recommendation)

The evidence supports the following provisional interpretation:

- **Option 1 is the safest low-cost learning baseline.** It can test whether users value a manual URL check with the least integration burden, but its friction may suppress usage.
- **Option 2 is the strongest candidate for a core user workflow.** It appears to fit an existing action better, but its value and platform feasibility need direct testing.
- **Option 3 should remain a horizon concept.** Its incremental value is not established, and its privacy, platform and operating risks are materially higher.

No option wins on proven demand. Option 2 has the strongest *hypothesised* user workflow fit; Option 1 has the strongest *learning-cost* advantage. This is a genuine trade-off, not a tie disguised as certainty.

## 8. What the next step must decide

S — Summarize recommendation must make one recommendation and state:
- whether to recommend Option 1 as a first demand test or Option 2 as the initial core experience;
- how the Pro + owner-activation gates affect the validity of the test;
- one testable demand/adoption metric, with a threshold only if evidence supports setting one;
- what is being traded away;
- whether the provisional Segment B cohort remains justified or practitioner evidence should change it.

## 9. E exit status

E is complete. The axes were fixed before comparison; all three options were evaluated on the same criteria; each option's drawbacks, risks, viability constraints and feasibility status are explicit. No solution has been selected.
