# ZeroDeck Product Planning Plan

**Project:** ZeroDeck — ethical-hacking and penetration-testing tools/platform  
**Repository:** REMAREMA6/zero-deck  
**Workspace:** `product-management/`  
**Plan date:** 2026-11-27  
**Method:** Product Management Agent CIRCLES (exactly seven steps)  
**Status:** All seven CIRCLES steps completed as a provisional secondary-research recommendation on 2026-11-27. A first `PRODUCT-BLUEPRINT-DRAFT.md` and supporting research have been created. Owner has since selected everyday non-technical users as the first target audience and confirmed web + Android platforms. Platform/integration follow-up, independent review, validation and remaining owner decisions remain open. A PM-authored Product Requirements Contract workstream has also started; it uses Software Rules declared contracts with explicit PM authorship. See TRACKER.md for current status.

## 1. Assignment

Plan ZeroDeck's product direction and first launch MVP using the completed reverse-engineering work, the product-specific Software Rules capture, owner decisions, prior-art research, and additional external research.

The objective is to produce a product blueprint that is sufficiently reasoned and explicit to guide later product design and engineering without repeatedly redesigning the product because important product decisions, user needs, workflows, dependencies, or failure states were missed.

This is product management and product definition. It is not implementation, architecture execution, or permission to change the product.

## 2. Product boundary and current authority

ZeroDeck is the broader startup/product direction for people involved in ethical hacking and penetration testing. The current scanner-oriented reference materials describe one capability area; they do not define the entire startup or its future product universe.

The owner-approved first MVP scope is exactly:

1. **MVP-01 — Manual file security analysis.**
2. **MVP-02 — Quarantine and file disposition.**
3. **MVP-03 — Website and link checking.**

MVP-03 is subject to two independent gates:
- the user must have Pro entitlement; and
- the owner-controlled activation switch must be enabled.

No provider/API lookup may occur when either gate is false. Pro does not imply unlimited usage. Exact quotas, budget limits, provider selection, pricing, and activation threshold remain unresolved.

IP address tracking/investigation (CAP-13) is a future candidate and is excluded from MVP. The other exclusions in `software-rules/SCOPE.md` remain in force unless the owner changes them.

The Software Rules capture is a product evidence input, not a claim that product design is complete. It remains Draft, incomplete, and not replication-sufficient. Open required properties must be preserved as unknowns or turned into explicit product decisions only when justified.

## 3. Authority and evidence handling

Use this authority order:

1. Current explicit owner decisions in the repository, especially `MVP-SCOPE-DECISION.md` and `PRO-GATED-LINK-CHECK-DECISION.md`.
2. Current ZeroDeck-specific Software Rules: scope, owner rules, scenarios, evidence, facet map, property inventory, payload mapping, and open properties.
3. Reverse-engineering records: screen inventory, capability inventory, source-level extraction, prior-art register, runtime investigation and closeout reports.
4. Existing product-management work, treated as historical working material and revalidated against later owner decisions.
5. External primary sources and credible independent research.
6. Product-management inference, clearly labelled as inference or hypothesis.

Every material claim or recommendation must be classified as one of:
- owner-declared decision;
- source/design evidence;
- runtime-observed evidence;
- platform/provider contract;
- external research;
- product inference/hypothesis;
- unresolved/unknown.

Do not upgrade source-derived prior art, mockup intent, provider documentation, or assumptions into observed ZeroDeck behaviour.

## 4. CIRCLES work sequence

The method is exactly these seven steps. Do not merge, add, rename, or reorder them.

### C — Comprehend the situation
Establish the product goal, the business outcome, success metric, product maturity, current context, constraints, dependencies, and assumptions. Reconcile prior product plans with the latest owner-approved scope. Ask one clarifying question only if its answer materially changes the product recommendation.

**Deliverable:** `2026-11-27/01-C-COMPREHEND.md`

### I — Identify the customer
Segment plausible customers by context and friction, identify relevant stakeholders and market sides, choose one primary cohort for the first MVP, and defend that choice with evidence. Acknowledge other affected sides.

**Deliverable:** `2026-11-27/02-I-IDENTIFY.md`

### R — Report customer needs
Translate feature wants into underlying customer jobs and needs. Separate reported needs from inferred hypotheses, identify current alternatives and workarounds, and link each need to evidence.

**Deliverable:** `2026-11-27/03-R-NEEDS.md`

### C — Cut through prioritization
Prioritize needs and capabilities against explicit criteria tied to the goal. Resolve dependencies, distinguish MVP necessities from standalone features, state what is cut/deferred, and preserve owner-approved scope unless a reasoned change is presented for owner approval.

**Deliverable:** `2026-11-27/04-C-PRIORITIZATION.md`

### L — List solutions
Create two or three genuinely different product approaches to the prioritized need, spanning an appropriately bounded quick win, core bet, and horizon option. Describe product behaviour and user value without prematurely choosing a technical stack.

**Deliverable:** `2026-11-27/05-L-SOLUTION-OPTIONS.md`

### E — Evaluate solutions
Fix evaluation axes before scoring options. Evaluate customer value, viability, desirability/lovability, feasibility as a floor, cost, operating burden, security/privacy, reliability, error consequences, integration dependency, commercial model and future extensibility. State drawbacks for every option, including the preferred one.

**Deliverable:** `2026-11-27/06-E-EVALUATION.md`

### S — Summarize recommendation
Provide one argued product recommendation, the proposed MVP and its exclusions, one testable success metric linked to the goal, named trade-offs, assumptions, open questions, and anticipated objections. The recommendation belongs to the owner to accept, reject, or change.

**Deliverable:** `2026-11-27/07-S-RECOMMENDATION.md`

## 5. Research programme

Research is supporting evidence within CIRCLES, not an eighth CIRCLES step. Research questions will be selected as they become relevant to the active step.

### A. Customer, market and alternatives
- Define candidate customer segments for ZeroDeck's stated ethical-hacking/penetration-testing direction and the approved scanner MVP.
- Examine consumer Android security tools, mobile antivirus/scanners, file reputation tools, URL reputation tools, and relevant professional security workflows.
- Compare what alternatives do, who they serve, how users access them, pricing/monetization, trust/privacy posture, limitations and switching friction.
- Distinguish direct competitors, substitutes, adjacent products, infrastructure providers and open-source components.
- Seek primary product documentation/pricing and independent reviews or user discussions; avoid treating vendor marketing as independent proof.

### B. File analysis and detection
- Compare on-device, server-side and hybrid analysis models.
- Examine detection approaches and their limits: hash/reputation matching, signatures, static analysis, heuristic/behavioural analysis, local engines, cloud reputation and multi-engine services.
- Investigate supported file formats, archives, encrypted files, size limits, resource usage, update/freshness, false positives/negatives, inconclusive outcomes and explainability.
- Assess safe parsing, isolation, malicious-file handling, supply-chain/licensing, update integrity and operational ownership.
- Do not select an engine solely because prior art was inspected.

### C. Quarantine and file disposition
- Verify Android platform constraints and supported-version implications for file selection, URI permissions, storage access, app-private storage, backup/uninstall lifecycle and user-controlled files.
- Compare safe quarantine models, atomicity, integrity, encryption/key management, restore, deletion, retention, crash recovery and auditability.
- Analyse false-positive harm and recovery paths.
- Separate what Android permits from what the product should promise.

### D. Website and link checking
- Compare threat-intelligence providers and permissible use: coverage, categories, freshness, latency, pricing, quotas, caching, attribution, commercial terms, privacy and data disclosure.
- Evaluate URL validation/normalization, internationalized domains, redirects, credentials, fragments, timeouts, offline states, cache semantics and inconclusive outcomes.
- Model Pro entitlement and owner activation as separate gates; evaluate spend caps, usage limits, rate limits, alerts, kill switch and abuse resistance.
- Preserve provider independence in the product contract unless evidence justifies coupling.

### E. Product experience and trust
- Review the 17-screen baseline and additional routes only as evidence; do not assume all screens or routes are MVP scope.
- Map complete journeys and states: selection, permission denied, scanning, each verdict, quarantine, review, restore, deletion, errors, offline, Pro locked, feature disabled, quota exhausted and provider failure.
- Evaluate accessible language, honest-result semantics, safe next actions, privacy disclosures, user control, reversibility and destructive-action confirmation.
- Treat a no-match as absence of a known match, not proof of safety.
- Identify which product promises can be reliably fulfilled.

### F. Commercial, operational and regulatory context
- Investigate viable monetization, free/Pro boundaries, willingness-to-pay evidence, API cost exposure and support burden.
- Examine privacy/data protection obligations and app-store/platform policy implications for relevant launch jurisdictions. Identify applicable law from authoritative sources; do not provide legal conclusions beyond evidence.
- Assess distribution, onboarding, update operations, telemetry minimization, incident handling, customer support and service continuity.
- Keep geography and launch-market assumptions explicit until confirmed.

### G. Product and system boundaries
- Determine whether the approved MVP requires accounts, a backend, database, admin portal, remote workers, telemetry, billing, feature flags, content service or other infrastructure. Do not assume any exist.
- For each proposed integration, record purpose, required data, data recipient, trigger, failure behaviour, cost model, privacy/security implications, alternatives, replaceability and whether it is required for MVP.
- Distinguish product requirements from implementation choices; do not select a technology stack during CIRCLES unless a verified constraint makes it necessary.

### H. Platform and integration architecture (supporting work after CIRCLES)

**Current assessment:** `2026-11-27/10-PLATFORM-INTEGRATION-ARCHITECTURE.md` records the initial security-first recommendation. It remains a recommendation for owner review, not an approved implementation architecture.
- Design the same product across web and Android without assuming identical capabilities.
- Compare client frameworks, backend/auth/database, private storage, hosting, media/content services, payments/entitlements and operational tooling.
- For security-sensitive files, assess local-only, remote and hybrid handling; specify trust boundaries, encryption/key management, retention, deletion, backups, access control and breach impact.
- Reject integrations that add cost or expose sensitive data without a demonstrated MVP need. Distinguish public content/media from private user files and quarantine artifacts.
- Produce a recommended minimum architecture with explicit trade-offs, alternatives, pricing evidence, platform limitations and unresolved decisions. This is a product/technical recommendation for owner review, not an implementation order.

### I. Product Manager-authored product rules (supporting work after CIRCLES)\n\nA dedicated workstream is recorded in [2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md](2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md). The Product Management Agent will author technology-independent product requirements for ZeroDeck. These are normative declared product contracts, not runtime observations or source-derived rules. The current Software Rules 0.3.0 Draft provides a `declaredContract` record and `declared-contract` evidence class; use that existing model unless a separate, justified extension is approved. The PM author/issuer must be explicit.\n\nThe workstream covers authentication as supporting infrastructure, then manual file analysis, quarantine/disposition, website/link checking and cross-cutting system requirements. It must map requirements to relevant Software Rules facets, preserve unknowns, and define observable acceptance criteria. It does not modify the Software Rules repository or approve implementation architecture.\n\n## 6. Product blueprint expected at completion

The final recommendation should be detailed enough to hand to later design and engineering work. Subject to evidence and owner approval, it should cover:

- Product vision, positioning, target cohort, problem and value proposition.
- Business goal, success metric, guardrails and validation plan.
- MVP scope, explicit exclusions, deferred roadmap and scope-change rules.
- Capability/module map and boundaries.
- User journeys, workflows, states, edge cases and recovery paths.
- Product rules, decision tables, entitlements, configuration and permissions.
- Data concepts, lifecycle, retention, deletion, privacy and audit needs.
- Required system boundaries and integration register.
- Security, safety, trust, reliability and performance expectations.
- Operational model, support and cost drivers.
- Screen/interaction inventory and design requirements, linked to existing evidence.
- Risks, dependencies, assumptions, unresolved questions and owner decisions.
- Traceability from customer need → product requirement → workflow/state → Software Rules property/evidence → validation criterion.

This blueprint is a product specification/recommendation, not an implementation architecture or build ticket set.

## 7. Quality gates — prevent expensive redesign

A recommendation is not ready to hand over until:

1. **Scope consistency:** no conflict with owner-approved scope or explicit exclusions is hidden.
2. **Customer clarity:** one primary cohort is selected and defended; stakeholders and affected sides are named.
3. **Need traceability:** every MVP capability addresses a prioritized need; every major need has evidence or a visible hypothesis label.
4. **Workflow completeness:** each capability includes normal, alternate, denied, failure, recovery and terminal states where relevant.
5. **Cross-facet coverage:** product requirements are checked against all relevant Software Rules facets, preserving the 15-facet taxonomy and conditional applicability.
6. **Integration clarity:** each proposed integration has a justified need, data-flow boundary, cost, failure mode, privacy/security assessment and fallback/replaceability assessment.
7. **Trust and safety:** no unsupported safety guarantee; false-positive and false-negative consequences and user recovery are addressed.
8. **Commercial viability:** cost-to-serve and monetization assumptions are explicit; provider costs cannot silently exceed intended revenue.
9. **Evidence integrity:** facts, owner decisions, external research, inference and unknowns remain distinguishable with sources.
10. **Decision readiness:** trade-offs, unresolved owner decisions and consequences are visible; no major decision is buried as an implementation detail.
11. **Validation readiness:** success metric and testable acceptance/validation criteria distinguish genuine value from novelty or mere usage.
12. **Independent review:** conduct a contradiction/gap review against the blueprint and source records before recommending handoff.

A gate may be marked complete only with a cited artifact or evidence record. Unknowns are not converted to passes.

## 8. Working rules and boundaries

- Work only inside `product-management/` for product-management records.
- Preserve prior dated work; do not overwrite historical records.
- The current plan and tracker are the operational source of truth for this product-planning assignment.
- Read the relevant source records before relying on them; record exact paths and revisions.
- Do not change the Software Rules repository or reverse-engineering records.
- Do not build, ship, change product configuration, create tickets, or execute integrations.
- The product manager must lead deliberation: research options, compare trade-offs, and present a reasoned recommendation before asking the owner for an opinion. Do not make the owner supply technical answers they are not equipped to research.
- The owner retains final authority. Recommendations and proposed decisions must be labelled as such.
- Never invent customer research, competitor capabilities, costs, performance figures or platform guarantees.
- If evidence is unavailable, state the gap and its effect on the recommendation.
- Update `TRACKER.md` whenever a step starts, changes status, becomes blocked, or completes.
- Ask the owner only for decisions that genuinely require owner authority or cannot be resolved through evidence. Prefer one focused decision at a time over long questionnaires.

## 9. Historical-work reconciliation

The prior `plan-2026-11-24.md` and `circles-2026-11-24.md` are preserved historical records, not current authority where they conflict with later decisions.

In particular, the earlier CIRCLES record assumed scan history, admin panel and help content in MVP, an 18-screen design, an Android-only user framing, a backend shape, and other details that are not established by the current owner-approved scope. The 2026-11-27 owner decisions and current Software Rules scope supersede those assumptions. Reuse earlier reasoning only after revalidation.

## 10. Completion definition

Product planning is complete when all seven CIRCLES deliverables are reviewed, the final blueprint passes the quality gates, key risks and unknowns are visible, and the owner has received one coherent recommendation with explicit decisions requested.

The owner retains final authority. Completion of this planning assignment does not authorize implementation.
