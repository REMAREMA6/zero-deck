# L — List Solution Options

**CIRCLES step:** L — List solutions  
**Date:** 2026-11-27  
**Status:** Completed; options are intentionally unevaluated  
**Plan:** [../PLAN.md](../PLAN.md)  
**Tracker:** [../TRACKER.md](../TRACKER.md)  
**Preceding step:** [04-C-PRIORITIZATION.md](04-C-PRIORITIZATION.md)

## 1. Need being addressed

The provisional highest-priority need from C is:

> **B-N1 — Assess an unfamiliar link before opening, without relying solely on sender trust.**

The user receives a link in a social or digital context and wants to make a better decision before opening it.

This is a provisional need for Segment B (non-technical individuals with recurring unfamiliar-file/link exposure). Segment B is not an owner-approved target market, and B-N1 has not been validated through ZeroDeck customer interviews.

The owner-approved MVP includes website/link checking, but this capability has two independent mandatory gates:
1. The user has Pro entitlement.
2. The owner-controlled activation switch is enabled.

No provider/API call may occur if either gate is false. Pro does not mean unlimited use. The options below do not change these rules, choose a provider, or assume a launch platform.

## 2. Options

### Option 1 — Manual destination check

<badge>Quick win</badge>

The user deliberately copies or shares a link into a dedicated ZeroDeck check flow. ZeroDeck returns a concise result describing whether the submitted URL matches known threat intelligence, what was checked, and what the result cannot establish. The user decides whether to proceed.

**How it addresses B-N1**
- Gives the user a deliberate check at the moment they are uncertain.
- Does not require the user to understand security terminology.
- Keeps the action explicit and user-initiated.

**What makes it distinct**
- The user leaves the current messaging/browser context and initiates a separate check.
- It is a narrow, pull-based utility rather than an in-context protection layer.

**Boundaries**
- A single URL lookup is not a full website audit.
- No result must not be described as proof of safety.
- Provider calls remain prohibited unless both Pro and owner-activation gates are true.
- When either gate is false, the flow must not call the provider; the product's permitted response/availability messaging remains a later design decision.

**Main drawback to carry forward**
- Copying, switching apps and returning to the original conversation may create enough friction that users do not use it when the decision occurs.

### Option 2 — Check at the point of sharing

<badge>Core bet</badge>

The user invokes ZeroDeck from the operating system's explicit share action when a link is received or encountered. The link is passed into a focused check flow, and the result is returned in a way that helps the user decide what to do next without manually copying and pasting.

**How it addresses B-N1**
- Moves the check closer to the trigger event.
- Reduces transcription and app-switching friction.
- Preserves an intentional user action rather than silently inspecting every link.

**What makes it distinct**
- Changes the interaction surface and trigger: the user starts from the app where the link already exists.
- The value proposition is lower friction at the moment of uncertainty, not a different threat-intelligence verdict.

**Boundaries**
- It remains an explicit user-initiated check.
- It must preserve the two independent Pro/owner-activation gates and must not call a provider if either is false.
- It must make clear that only the submitted URL was checked; it does not certify the sender, message, page content or entire website.
- Platform support and share-intent behaviour must be verified before treating this as feasible.

**Main drawback to carry forward**
- It still requires the user to recognise uncertainty and initiate the action. It may not help when the user does not suspect a link is risky or does not know how to invoke sharing.

### Option 3 — Cross-context link decision layer

<badge>Longer horizon</badge>

A broader link-safety experience that can be invoked or surfaced across supported contexts, helping users assess a destination before proceeding. It would aim to reduce the need to leave a messaging/browser workflow and could explain redirects or destination changes where the underlying service can reliably inspect them.

**How it addresses B-N1**
- Attempts to meet the user at the decision point across multiple contexts.
- Could reduce reliance on memory, manual copying and app switching.
- Could make link checking a more natural part of an existing behaviour.

**What makes it distinct**
- Changes the intervention from a standalone manual utility to a cross-context decision layer.
- Its scope and integration surface are materially broader than a one-link manual check.

**Boundaries**
- This is a future concept, not an approved MVP requirement.
- It must not silently read private messages or inspect links without a clear user action and permission model.
- It cannot promise universal interception or protection across every app.
- Any remote lookup must still respect the Pro entitlement and owner-controlled activation gates.
- It would require a separate privacy, platform, abuse, provider-cost and user-control assessment.

**Main drawback to carry forward**
- Broader permissions, integration and operating complexity may create more privacy concern and adoption friction than the original problem warrants. It may be infeasible or undesirable on some platforms.

## 3. Ideas considered but not retained as separate options

These were considered during divergence but are not independent solution approaches:
- Different colours, labels or wording for the same scan result: presentation variations, not a different solution.
- More threat-intelligence providers behind the same manual check: provider/coverage choices for a solution, not a distinct customer approach.
- A browser extension alone: a platform-specific variant of the cross-context approach, not a separate product strategy.
- Automatic scanning of every incoming message: not retained because it changes the privacy/permission model substantially and assumes a need not established by the evidence.

## 4. Common requirements and non-negotiable constraints

Regardless of which option is evaluated:
- A check must be explicit about the exact URL submitted and what was actually inspected.
- A negative or missing reputation result must not be translated into “safe”.
- Unsupported, failed, unavailable and inconclusive checks must remain distinguishable from a clean result.
- Any provider disclosure must be transparent.
- No provider/API call may occur unless both Pro entitlement and owner-controlled activation are true.
- Pro is not unlimited use; quotas, cost limits and provider selection remain unresolved.
- The link-checking capability remains one of the three owner-approved MVP capabilities; this list does not add IP investigation or a full website scanner.

## 5. Carry forward to E — Evaluate solutions

Evaluate all three options without treating this list as a recommendation. In particular, test:
1. Whether the manual flow is sufficiently low-friction to change real behaviour.
2. Whether the share-triggered flow materially improves completion and adoption over manual copy/paste.
3. Whether the cross-context approach's incremental user value justifies its platform, permission, privacy, provider-cost and operational burden.
4. Whether any option permits a valid demand test under the existing Pro + owner-activation gates.
5. Whether Segment B remains the right cohort after practitioner comparison and direct customer research.

## 6. L exit status

L is complete: three materially different options have been described across quick-win, core-bet and longer-horizon approaches. They are traced to B-N1, remain stack-agnostic, preserve owner-approved constraints, and have not been evaluated or selected.
