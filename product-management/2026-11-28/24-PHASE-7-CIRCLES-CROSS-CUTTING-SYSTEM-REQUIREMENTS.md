# Phase 7 CIRCLES — Cross-Cutting System Requirements

**Task:** Define shared product/system requirements across ZeroDeck's three MVP capabilities and supporting authentication.  
**Authority:** Product Management Agent recommendation; Product Owner retains decisions.  
**Evidence qualification:** Owner decisions and existing contracts are documentary evidence. No customer interviews, product telemetry, runtime tests, architecture implementation, or legal review were performed for this phase.

## C — Comprehend the situation

**Goal:** Reduce cross-capability inconsistency and prevent system-wide failures, privacy leaks, authorization bypasses, false success states, and unowned operational dependencies as ZeroDeck is delivered on web and Android. This is a PM interpretation of the owner's broader objective to reproduce intended product behaviour reliably across platforms and stacks; it is not a separately measured business goal.

**Success measure candidate:** In a pre-release cross-platform system acceptance suite, measure the proportion of critical shared-system scenarios that produce the intended authorization, data-protection, failure and lifecycle outcome on both web and Android, with zero violations of the MVP-03 independent-gate/no-provider-call invariant. Establish baseline and target before execution.

**Constraints:** Work only under `product-management/`; preserve the three-capability MVP; keep implementation and vendor choices open; preserve the eight authentication decisions; do not resolve operational questions without owner decisions; distinguish local user files/quarantine from backend-managed data; do not implement or modify Software Rules.

**Context:** Four existing contracts cover authentication and MVP-01/02/03. They specify capability behaviour but leave shared operational topics unresolved. Web and Android share product identity, not necessarily identical capabilities. Neon and first-party backend/auth are preferences, not final architecture approval.

**Assumptions:** (1) Shared system obligations should be specified once where multiple contracts depend on them. (2) User trust depends on truthful status and bounded disclosure. (3) Operations must distinguish backend-managed data from local file/quarantine state. These are PM assumptions, not research findings.

## I — Identify the customer and stakeholders

**Segments considered:** (1) everyday non-technical users on one or both platforms; (2) technically advanced security users; (3) Product Owner/operator responsible for activation, entitlement and service health; (4) support personnel handling account, scan, quarantine and URL-check issues; (5) engineers maintaining web, Android and backend components.

**Chosen cohort:** Everyday non-technical ZeroDeck users who rely on the same account across web and Android and expect security operations, data and access controls to behave predictably. Their friction is cross-platform inconsistency, unclear failure states, loss of account/data control, or an operation proceeding after access is revoked.

**Why this cohort:** They are the first owner-selected audience and experience product outcomes directly. There is no evidence here to claim they are the largest or most commercially valuable segment.

**Other stakeholders:** The owner/operator bears cost, activation, security and incident responsibility; support absorbs unclear failures; engineering absorbs ambiguous cross-contract rules. MVP-03 also depends on external providers whose data handling and availability affect users. The primary design side is the end-user; operational and provider stakeholders are acknowledged.

## R — Report the underlying need

**Feature wants, not needs:** shared backend, unified dashboard, centralized logs, automatic backups, microservices, one database, monitoring platform, or a single API. These are mechanisms and are not assumed to be required.

**Underlying job (PM inference):** As a ZeroDeck account holder using supported platforms, I need my identity, permissions, data handling and operation outcomes to remain understandable and trustworthy across the capabilities I use, so that I can make decisions without hidden platform differences, silent failures, unauthorized actions or unexpected disclosure.

**Operational stakeholder need (secondary PM inference):** As the owner/operator, I need to know whether shared services and protected controls are functioning, and what happened when they fail, so that I can contain incidents and restore service without exposing user data.

**Evidence:** Owner's shared-identity/platform direction; owner-approved authentication decision record; MVP-03 independent-gate invariant; existing contracts' privacy, error, resource and lifecycle requirements/open questions. No user-reported quote or observed usage evidence exists in this phase. Confidence is moderate that cross-contract obligations exist, low for exact priority and numeric service levels.

## C — Cut through prioritization

**Axes fixed before ranking:** (1) frequency of cross-capability exposure; (2) acuteness of harm if failure occurs; (3) alignment with predictable, trustworthy cross-platform operation. Scores are qualitative PM judgments, not measured data.

| Need | Frequency | Acuteness | Goal alignment | Priority |
|---|---|---|---|---|
| Correct identity, authorization and independent protected gates | Medium–high | Critical | Direct | 1 |
| Safe data purpose, minimization, lifecycle and secret handling | High | High | Direct | 2 |
| Truthful dependency failure, degraded state and recovery | High | High | Direct | 3 |
| Operational visibility, incident records and support | Medium | High | Strong | 4 |
| Bounded resource use and overload handling | Medium | High | Strong | 5 |
| Release provenance and version compatibility | Medium | High | Strong | 6 |
| Export, maintenance windows and formal support promises | Variable | Medium | Indirect | 7 |

**The cut:** Prioritize the shared trust-and-continuity baseline: authorization boundaries, independent gates, data minimization/lifecycle, secret/configuration safety, truthful dependency failure, recoverability and operational visibility. Defer numeric SLO/RPO/RTO/quotas, legal retention schedules, provider selection, export feature scope, maintenance windows and support SLAs until evidence or owner decisions exist. This does not reject those needs; it refuses to invent their policy now.

## L — List materially different options

1. **Quick win — Contract-level shared baseline:** Define a concise cross-cutting contract and link to capability contracts. Low effort and immediate clarity, but risks leaving important operational obligations abstract.
2. **Core bet — Outcome-based shared system contract plus traceability:** Define testable shared obligations, 15-facet applicability, cross-contract dependencies, failure/recovery scenarios and open questions. It avoids stack choices while giving design and implementation a consistent target.
3. **Longer horizon — Full operational assurance framework:** Add owner-approved SLOs, data classification, threat/incident model, disaster recovery objectives, release governance, support commitments and periodic assurance. It could support a mature service but depends on product scale, jurisdiction, costs and operational capacity not yet known.

Additional ideas considered but not promoted: choose microservices now; select a monitoring vendor; centralize all file/quarantine data; require identical platform feature parity. Each is an implementation prescription or contradicts existing product boundaries rather than solving the underlying need independently.

## E — Evaluate trade-offs

**Axes fixed before comparison:** viability (does it protect a product outcome users/operators depend on?), lovability (does it reduce uncertainty in existing workflows rather than add work?), risk reduction, operating burden/cost, and alignment with owner authority and product maturity. Feasibility is a floor, not the differentiator.

| Option | Viability | Lovability | Risk/operating burden | Short/long-term consequence |
|---|---|---|---|---|
| Quick win | Moderate: creates shared vocabulary | Moderate: little user-facing change | Low immediate cost; high ambiguity risk if abstract | Fast, but implementers still infer acceptance details |
| Core bet | High: addresses authorization, data, failure and operational outcomes | High: makes existing capabilities predictable without adding a workflow | Moderate documentation/validation cost; requires cross-contract maintenance | Gives implementation a stack-neutral acceptance target; numeric policies still need later decisions |
| Longer horizon | Potentially high at scale | Unclear before users and operations exist | Highest cost and risk of over-specification | Stronger mature operations, but premature commitments may be discarded |

**Preferred option drawback:** The core bet creates maintenance burden: shared changes must be reconciled across contracts, and some requirements cannot be fully accepted until the owner chooses targets/policies. It may also be too much documentation before product usage validates assumptions.

## S — Summarize the recommendation

**One PM recommendation:** Adopt the outcome-based cross-cutting system contract with explicit cross-contract traceability, all-15-facet assessment, failure/recovery scenarios and an unresolved-decision register. Keep every new requirement PM-proposed. Do not select architecture or numeric operational targets in this phase.

**One testable success metric:** Before first production release, run an agreed cross-platform acceptance suite covering every critical shared-system scenario in the failure matrix; measure the percentage producing the specified outcome on both platforms, with zero MVP-03 provider/API calls when either gate is false. Compare web and Android scenario-by-scenario; set threshold and baseline before execution. No runtime suite was run in Phase 7.

**Trade-off:** This chooses a rigorous shared contract over a quick, vague baseline and over a full operational-assurance programme. It delays numeric commitments and architecture decisions but avoids unsupported promises and premature stack lock-in.

**Objections:** (1) “This duplicates existing contracts.” Capability-specific rules remain in their source contracts; this contract covers shared outcomes and links dependencies. (2) “Why no RTO/SLO values?” No operational evidence or owner decision supports values yet. (3) “Why not choose architecture?” The approved task is product requirements; architecture is not approved. (4) “Does this mean files are backed up centrally?” No; local files/quarantine are distinct from backend-managed state.

**Unknowns:** No customer research, production telemetry, cost model, architecture proof, security audit, legal review or runtime test was performed. The owner must decide open policy values and whether to accept any PM-proposed requirement.
