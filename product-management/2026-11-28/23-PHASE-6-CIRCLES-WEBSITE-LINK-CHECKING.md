# Phase 6 — CIRCLES Analysis: MVP-03 Website and Link Checking

**Date:** 2026-11-28  
**Capability:** MVP-03 — Website and link checking  
**Contract:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING` v0.1.0-draft  
**Author:** ZeroDeck Product Management Agent  
**Status:** PM recommendation; not an owner product decision

## C — Comprehend the situation

### Goal

The owner's first-launch business outcome is to validate real market demand for the approved MVP, not to maximize immediate revenue. MVP-03 must therefore provide a credible, bounded website/link-checking capability without creating unbounded provider cost, privacy exposure or security risk. The goal for this capability is to let a user assess one submitted URL and understand the limits of the result while preserving the owner's two independent availability gates.

### Constraints and fixed authority

- Owner-approved MVP scope is recorded as `ZD-SCOPE-001`: MVP-03 requires active Pro entitlement and an enabled owner-controlled activation switch; no provider/API lookup is allowed if either gate is false; Pro is not unlimited.
- Web and Android share one product identity; platform-specific capability differences are permitted.
- Authentication is supporting infrastructure, not another user-facing MVP capability.
- No provider/vendor/API, URL acceptance policy, quota, price, spend ceiling, verdict taxonomy, cache policy, URL/result retention or consent wording is approved.
- The approved feature is website/link checking, not IP investigation, crawling, port scanning, vulnerability scanning or general network reconnaissance.
- Work is product definition only; no implementation, provider integration or Software Rules repository changes are authorized.
- No deployed ZeroDeck runtime or provider integration has been observed.

### Context

The user submits a URL for a bounded lookup. The product must decide whether the request is eligible, validate the input and safety boundary, disclose only necessary data to a selected provider, interpret a provider response without overclaiming, and explain failure or uncertainty. The product may need trusted server-side enforcement because provider credentials, usage budgets and entitlement/activation controls cannot be trusted to a client alone; that is a security inference, not a selected architecture.

### Success measure

A demand-validation measure should distinguish genuine value from a one-time curiosity check: among a defined cohort of first-time users with a real URL-assessment task, measure the proportion who complete a check, correctly understand what was checked and what the result does/does not establish, and indicate credible intent to use the capability again or recommend it. Compare with a pre-defined baseline or alternative workflow. Set sample, target and observation window before testing. No numeric target is justified by current evidence.

### Assumptions

1. A user brings one specific URL they are considering visiting or sharing; the need is not assumed to be continuous website monitoring.
2. The primary customer cohort remains open at the overall product level. For this analysis, an everyday user assessing a specific URL is a working scenario, not a confirmed segment selection.
3. The no-provider-call invariant applies to every outbound request path, including any retry, redirect, queue, batch, refresh or fallback.
4. A provider lookup may expose the full URL, including path/query data; URL sensitivity must be treated conservatively.
5. The implementation may avoid fetching the submitted destination entirely if a provider lookup can satisfy the intended product outcome. Whether direct fetching is needed remains open.

## I — Identify the customer

### Candidate segments

| Segment | Context | Friction / consequence |
|---|---|---|
| Everyday user | Receives or encounters a URL and wants to decide whether to visit it | May not know how to interpret reputation results or distinguish no-match from safety |
| Ethical hacker / penetration tester | Checks URLs during authorized security work | May need richer evidence, scope controls and technical context beyond a consumer lookup |
| Small-business user | Receives links in business communications | A mistaken trust decision may affect work accounts or sensitive information |
| ZeroDeck operator / owner | Controls availability, entitlement and provider spend | Must prevent unauthorized calls, abuse, runaway cost and unsafe disclosure |
| Provider / data subject | Receives lookup requests or has information represented in a URL | Provider terms and URL contents may affect confidentiality and permitted use |

### Working cohort

For this capability analysis, the concrete user scenario is an **individual who has one specific URL and wants to make a better-informed decision before visiting or sharing it**. This is a PM-selected analysis cohort, not a claim that the owner has selected the overall ZeroDeck target segment or that customer research validates demand.

### Stakeholders

The end user is primary for the workflow. The Product Owner controls Pro policy, activation and spend tolerance. ZeroDeck operations must observe usage and failures. The reputation provider receives disclosed URL data and is subject to its own terms. People whose identifiers or private resources appear in a URL may be affected even when they are not the submitting user.

## R — Report the customer's needs

No primary customer interviews, support records or usage analytics were supplied for this phase. The needs below are hypotheses inferred from the approved capability and its risk boundaries, not reported customer statements.

| Stated want / capability request | Underlying job or need | Evidence status |
|---|---|---|
| “Check this link” | I need to make a better-informed decision about one URL before I visit or share it | PM inference from MVP-03 scope |
| “Tell me if it is safe” | I need to understand what evidence exists and what uncertainty remains, without false reassurance | PM inference from trust/result requirements |
| “Why is link checking unavailable?” | I need to understand whether access is unavailable because of my entitlement, owner activation, usage limits or service failure | PM inference from owner-approved gates and bounded Pro |
| “Check links on my phone and web” | I need consistent policy and result meaning across supported platforms | PM inference from shared product identity direction |
| “Remember previous results” | I may want to avoid repeated checks and understand freshness | Hypothesis only; history/cache policy not approved |

### User stories

- As a person considering a specific URL, I want to understand whether a provider has reported a known threat so that I can make a more informed choice before visiting or sharing it.
- As a user who receives an inconclusive result, I want the product to explain what could not be established so that I do not mistake a service failure for a clean result.
- As a Pro user, I want to understand why a check is blocked or limited so that I know whether the restriction is account, owner-activation, usage or service related.
- As a user switching between web and Android, I want the same result meaning and eligibility rules so that platform differences do not change the product's security promise.

All stories are PM-inferred. No claim of measured customer demand is made.

## C — Cut through prioritization

Axes fixed before ranking:
1. **Frequency:** likely occurrence within a user-initiated one-URL workflow; no ZeroDeck usage data exists.
2. **Acuteness:** consequence of a wrong trust decision, a misleading result or unexpected provider disclosure/cost.
3. **Goal alignment:** contribution to validating demand for the approved MVP while keeping the capability bounded and operable.

| Rank | Need | Frequency hypothesis | Acuteness | Goal alignment | Treatment |
|---:|---|---|---|---|---|
| 1 | Make an informed decision about one URL using bounded, accurately explained evidence | Unknown/possibly recurring | High | Very high | Chosen |
| 2 | Understand why a request is blocked and whether it could trigger a provider call | Occasional | Very high because of spend/security boundary | Very high | Must support as a product invariant |
| 3 | Understand uncertainty, provider failure and freshness | Occasional | High | High | Must support as result integrity |
| 4 | Review prior checks and avoid repeated lookup | Unknown | Medium | Medium | Defer; persistence/cache not approved |
| 5 | Inspect a whole site or discover other network resources | Unknown | Outside approved scope | Low | Cut |

**Chosen need:** make a better-informed decision about one submitted URL using bounded evidence and an honest account of uncertainty.

**Explicit cut:** no crawling, linked-page traversal, automated website audit, IP investigation, port scanning, vulnerability scanning, exploitation, bulk checking, scheduled monitoring, background surveillance or arbitrary URL fetching. No standalone history feature is introduced by this contract.

This is a qualitative prioritization hypothesis. Frequency and demand have not been measured.

## L — List solutions

### Option A — Provider-only reputation lookup (quick win)

Submit one validated URL to a selected reputation provider after both gates and usage policy pass. Display provider-backed match/no-match information, timestamp and limitations. ZeroDeck does not fetch the destination itself.

- Smallest network surface and clearest data-flow boundary.
- Directly answers whether the selected provider has a known match.
- Coverage depends on provider data and terms; it cannot establish that a destination is harmless.
- Provider choice and commercial/privacy terms remain prerequisites.

### Option B — Bounded reputation lookup with strict request and result controls (core bet)

Use provider-backed one-URL lookup, plus explicit request lifecycle, independent eligibility checks at dispatch, destination/redirect safety where any product-controlled fetch is used, rate/quota/spend enforcement, redacted observability, provenance/freshness and explicit unknown/inconclusive states.

- Addresses the need while making provider cost, data disclosure and uncertainty visible.
- Preserves provider replaceability and platform-independent product semantics.
- Requires more policy and operational discipline than Option A.
- Does not imply whole-site scanning or direct fetching.

### Option C — Expanded URL inspection service (horizon option)

Fetch and follow redirects, inspect response metadata/content, potentially traverse linked pages and combine multiple intelligence sources.

- Could provide richer signals in some cases.
- Greatly expands SSRF exposure, privacy disclosure, resource consumption, false-positive/false-negative complexity and provider cost.
- Changes MVP-03 toward website auditing/reconnaissance, which is outside current approved scope.
- Requires a separate scope decision and security review; not an MVP option.

## E — Evaluate solutions

Evaluation axes fixed before weighing:
- **Customer value:** does it answer the one-URL decision need?
- **Trust and result integrity:** can the product explain evidence and uncertainty without implying safety?
- **Security/privacy:** destination reachability, SSRF, DNS rebinding, data disclosure and logging exposure.
- **Viability and cost:** provider terms, quotas, usage limits and predictable spend.
- **Feasibility:** can web and Android share the same policy without pretending platform capabilities are identical?
- **Scope discipline and extensibility:** can the capability remain provider-neutral and avoid growing into a general scanner?

| Option | Value / trust | Security / privacy | Cost / operating burden | Feasibility / scope |
|---|---|---|---|---|
| A — Provider-only lookup | Good bounded evidence; result limitations must be explicit | Lowest destination-fetch exposure; still discloses submitted URL to provider | Lowest relative operational complexity; provider costs/terms still unknown | Strongest fit to one-URL scope; depends on provider suitability |
| B — Bounded lookup plus controls | Best overall trust because gates, budgets, provenance and failure semantics are explicit | Strongest product-level control set; no architecture is selected | Medium/high policy and operational burden; numeric budgets still open | Good fit if direct fetch is avoided or narrowly justified; shared semantics are feasible in principle |
| C — Expanded inspection | Potentially richer evidence but harder to explain and validate | Highest SSRF, privacy, resource and abuse exposure | Highest provider/network cost and support burden | Outside current scope; requires separate owner approval |

### Evaluation conclusion

**PM recommendation: Option B**, with the actual network operation constrained to provider-only reputation lookup unless a separately justified, owner-approved product decision authorizes destination fetching. Option B gives a more complete product contract than a bare lookup while preserving the smallest practical network surface.

Option A is the simplest implementation shape but does not by itself specify gate re-evaluation, abuse controls, provenance, privacy and uncertainty sufficiently. Option C is rejected for MVP because it expands scope and risk without evidence that the extra inspection is needed to validate market demand.

The preferred option's drawback is additional product/operational complexity before provider selection: usage budgets, gate propagation, disclosure, result mapping and observability must be decided.

## S — Summarize the recommendation

**One recommendation:** pursue Option B as a provider-neutral, user-initiated, single-URL reputation lookup with fail-closed independent Pro and owner-activation gates, pre-dispatch usage controls, minimal URL disclosure, strict SSRF/redirect protections wherever ZeroDeck itself makes outbound destination requests, and evidence-qualified results. Prefer not to fetch the submitted destination at all unless a later owner decision and threat review justify it.

**Customer benefit:** a clearer, bounded signal for one URL, with honest explanation of what was checked and what remains unknown.  
**Business benefit:** a testable MVP capability with controlled provider exposure and a path to compare demand without committing to a broad website scanner.

**Success metric:** among a defined cohort of first-time users who bring a real URL-assessment task, the proportion who (1) complete an eligible check, (2) correctly explain the result and its limitations, and (3) indicate a credible next-use intent, compared with a pre-defined baseline or current workaround. Define sample, target and time window before validation; no numeric target is asserted.

**Trade-off:** this recommendation gives up whole-site inspection and richer direct-fetch signals. It accepts a narrower answer and provider dependence in exchange for lower network exposure, lower cost uncertainty and a tighter fit to approved scope.

**Anticipated objections**
- *Why not fetch the URL to inspect it directly?* It expands SSRF and privacy risk; provider-only lookup is the safer default unless evidence demonstrates that direct fetching is necessary.
- *Why does Pro still have limits?* The owner explicitly says Pro is not unlimited; provider cost and abuse exposure require bounded usage.
- *Why not cache every result?* Provider terms, freshness, invalidation and the privacy implications of retained URLs are unresolved.
- *Why not show “safe”?* A no-match means only that the selected provider returned no known match within its coverage and time window.
- *Why not crawl the site?* That is outside the approved MVP-03 boundary and would materially change cost, risk and product promise.

**Evidence gaps:** no primary customer research, no selected provider or API terms, no URL acceptance test corpus, no measured provider coverage/freshness, no approved numeric budgets, no gate propagation target, no approved retention/consent policy, and no runtime or security test.

This is the Product Management Agent's recommendation. The owner retains the decision.
