# Phase 2 — Capability-to-Software-Rules facet mapping

**Date:** 2026-11-27  
**Governing taxonomy:** Software Rules 0.3.0 Draft; schema 0.2.0 Draft.  
**Facet authority:** `REMAREMA6/software-rules/facets/README.md`, `FACET-BOUNDARIES.md`, and the 15 facet specifications.  
**Target evidence:** ZeroDeck owner MVP decision recorded in `MVP-SCOPE-DECISION.md`; candidate inventory in `CAPABILITY-INVENTORY.md`.  
**Status:** Phase 2 mapping and MVP scope freeze complete. This is a declared bounded replication scope, not a claim that the required properties have already been fully captured.

## 1. Mapping rules

- Facets are observation perspectives, not application modules or architecture layers.
- One operation may generate linked observations across several facets.
- A facet marked **applicable** means the candidate workflow would require investigation in that perspective if selected. It does not assert that the implementation exists.
- **Conditional** means applicability depends on a product/architecture decision (for example, accounts, durable history, remote scanning or a job queue).
- **Unknown** means the supplied evidence cannot establish whether the facet applies to the broader ZeroDeck product.
- A scanner handoff or source component is declared/source evidence only. No runtime capture of a deployed ZeroDeck target has been supplied.
- The Software Rules Replication Completeness Rule controls: a scope cannot be called replication-sufficient while required properties remain unknown, unobserved, source-inferred only, conflicting or unresolved.

## 2. Candidate workflow set

| Scenario ID | Candidate workflow | Initial conditions and trigger | Required observable outcomes |
|---|---|---|---|
| SCN-FILE-001 | Select and scan a file | User selects an accessible supported file and requests analysis. | Selection/access outcome; scan start/progress/termination; classified result; truthful explanation; resulting state and any side effects. |
| SCN-FILE-002 | File scan branches | Run separate cases for confirmed threat, suspicious, no known threat, inconclusive, unsupported file, inaccessible file, interrupted scan and engine failure. | Each distinct result and user-facing state; no unsupported safety claim; correct next action; no false success. |
| SCN-QUAR-001 | Automatic quarantine of confirmed threat | A scan produces a confirmed-threat result and platform permits isolation. | Whether quarantine is attempted; isolation result; stored artifact identity/integrity; user notification; failure handling. |
| SCN-QUAR-002 | Suspicious/unknown file review | Scan produces suspicious or inconclusive result. | No automatic destructive action; review/rescan choice; result transitions; user confirmation where required. |
| SCN-QUAR-003 | Restore or permanently delete | User selects quarantined item and requests restore/delete. | Confirmation; fresh scan before restore; integrity verification; actual operation result; audit/history effect; failure leaves accurate state. |
| SCN-LINK-001 | Check submitted website link | User supplies a URL using an approved input path and requests checking. | Input validation/normalization; check execution; result class; scope explanation; timeout/offline/provider-failure outcome. |
| SCN-LINK-002 | Link-check result branches | Run likely-dangerous, no-known-threat, inconclusive, invalid URL, redirect, timeout and unavailable-provider cases. | Correct result and wording; no guarantee of safety; no claim that an entire site was inspected unless it was. |
| SCN-HIST-001 | Review scan history | User opens history and searches/filters/selects a record, if history is selected. | Record contents, ordering, filters, detail navigation, empty state, retention and deletion behaviour. |
| SCN-PRIV-001 | Optional remote analysis consent | A local scan cannot decide and a remote analysis option is offered, if such an option is approved. | Explicit disclosure of what leaves device, recipient/purpose, consent/decline, actual transfer, cancellation and data handling. |
| SCN-ADMIN-001 | Administrative sign-in and access | An authorised administrator attempts sign-in and accesses a protected operation, if admin portal is selected. | Principal/session establishment; denied/allowed access; role enforcement; session lifecycle; audit effects. |
| SCN-IND-001 | Manage threat indicators | Authorised admin creates, searches, updates, disables and removes an indicator, if manual indicator management is selected. | Validation, duplicate handling, provenance/source, status lifecycle, effective detection impact and audit. |
| SCN-CONTENT-001 | Publish help content | Authorised editor creates, previews, publishes and updates support content, if CMS is selected. | Draft/published transitions, role permissions, version/history, rendered user-facing content and failure handling. |
| SCN-HEALTH-001 | Inspect service health/audit | Admin requests health and audit views, if service operations are selected. | Actual health signal source/freshness, event records, filters, access restrictions, retention and unavailable states. |

These are scenario definitions for future evidence collection, not executed tests or statements of actual outcomes.

## 3. Fifteen-facet applicability and required-property inventory

| # | Facet | Applicability to evidence-backed candidates | Required property questions to resolve |
|---:|---|---|---|
| 1 | Interface | **Applicable** to all user/admin workflows represented by screens. | Runtime hierarchy and ordering; exact text/content; resolved visual values and geometry; assets; responsive/platform conditions; accessibility roles/names/states/focus; enabled/disabled affordances; loading/empty/populated/error/confirmation states; dialogs/overlays; keyboard/touch interaction; visual state after each scenario. The 17-screen inventory is design/source evidence, not a runtime interface capture. |
| 2 | Behaviour | **Applicable** to all workflows. | Trigger and actor; preconditions; ordered actions; before/after state; transitions; outputs; side effects; emitted events; cancellation; timing/settling; terminal states; idempotency where relevant. Each branch in SCN-FILE-002 and SCN-LINK-002 must be a separate execution. |
| 3 | Business Rules | **Applicable** to file classification, quarantine policy, link-result interpretation, consent and admin/content policies. | Decision criteria and thresholds; meaning of confirmed/suspicious/inconclusive; quarantine eligibility; restore preconditions; link risk result criteria; confidence/unknown handling; consent conditions; retention/expiry rules; indicator status/precedence; units and calculation details where applicable. Detection criteria and confidence thresholds are currently unknown. |
| 4 | Data | **Applicable** to files, scan results, URLs, indicators, users/admins, settings, history and audit records where those candidates are selected. | Actual runtime fields/types/nullability; file identity and hash algorithm/encoding; URL canonicalization; result/status enumerations; timestamps/time zones; source/provenance; relationships; validation; transformations; redaction; serialization. Do not infer storage schema from screen labels or generic Prisma User/Post tables. |
| 5 | Persistence | **Conditional**: required for durable quarantine, history, indicators, accounts, settings, content or audit records; transient in-memory UI state alone does not establish it. | What is durably written/read/deleted; local versus remote boundary; transaction atomicity; crash/restart survival; consistency/visibility; ordering; concurrency; retention/expiry; deletion semantics; backup/uninstall consequences; integrity. Quarantine file storage and scan-record persistence are not runtime verified. |
| 6 | API | **Conditional** on backend, remote reputation, admin services, CMS or cloud analysis. | Actual request/response method, endpoint/resource, headers, body, status, schema, auth context, pagination, idempotency, timeout/cancellation, rate limits, versioning and error responses. No production API contract or runtime exchange is established by current screens. |
| 7 | Messaging | **Unknown / conditional**: may apply if scanner updates, threat feeds, audit events, background tasks or notifications use asynchronous delivery. | Channels/topics, message schema, producer/consumer, ordering, delivery/acknowledgement, duplication, retry/dead-letter, correlation, retention and delivery guarantees. Do not assume a broker or event architecture. |
| 8 | Identity and Authentication | **Conditional**: depends on whether ZeroDeck MVP includes user accounts, admin portal, subscription or external identity. | Principal identifiers; credential/authentication method; sign-in/out; session/token lifecycle; expiry/refresh/revocation; recovery; MFA; device binding; external identity; lockout and error outcomes. Admin Login mockup alone does not prove authentication exists or is in MVP. |
| 9 | Authorization and Permissions | **Conditional but security-critical wherever privileged actions or protected device resources exist.** | Principal/resource/action; role/capability policy; decision outcomes; enforcement point; least privilege; Android permission grants/denials and revocation; admin role boundaries; tenant isolation; policy mutation effects; unauthorized/forbidden outcomes. Authentication and authorization must remain separate. |
| 10 | Security Controls | **Applicable** to any selected security-analysis service and its own platform boundary. | Threat model and trust boundaries; file handling/isolation; safe parsing/no execution; encryption/key lifecycle; integrity verification; secure transport; secret handling; consent and data minimization; secure update/dependency trust; access enforcement; input/output safety; auditability; abuse/rate limiting; authorized test outcomes. No general security posture is established by a shield UI or scanner product label. |
| 11 | Background Processing | **Conditional**: scan execution may be deferred; automatic download/event monitoring is explicitly a later scanner candidate. | Job creation/start/finish/cancel; scheduler/worker triggers; queue order; progress; retry/backoff; timeout; pause/resume; resource/battery constraints; process death/restart; duplicate execution; terminal failure; notification. Automatic background protection is not part of the scanner draft MVP. |
| 12 | Errors and Recovery | **Applicable** across file access/scanning, quarantine, link checks and any selected service dependencies. | Validation vs operational failure; error categories/codes/messages; origin and propagation; permission denial; unsupported/inaccessible file; corrupt input; engine/provider unavailable; network timeout; partial result; cancellation; retry/backoff; fallback; compensation/rollback; truthful state after failed quarantine/restore/delete. |
| 13 | Integrations | **Conditional**: likely relevant if selected capabilities rely on detection engines, threat-intelligence providers, cloud analysis, CMS, identity, database or platform APIs. | Provider identity and boundary; operation/direction; data shared; credentials context (redacted); request/message references; mapping; freshness; timeout/retry/circuit-breaker; provider failure; dependency substitution; consent and data residency. Supabase/Neon, Cloudflare and Sanity are possibilities in the scanner draft, not selected integrations. |
| 14 | Configuration | **Applicable** for supported file types/limits, detection settings, retention, feature flags, endpoints, provider settings and environment where selected. | Effective values, type/unit, default, source/precedence, scope, secret redaction, mutability, activation/reload, per-user/device/admin scope, and observed effect. Config file declarations are not proof of effective runtime settings. |
| 15 | Performance and Resource Behaviour | **Applicable** to analysis operations and device-resident scanning; scope/thresholds must be declared. | Workload/file size/type; scan duration and progress; throughput; CPU/memory/storage/network/battery; cold/warm conditions; concurrency; device/OS/build; measurement boundary; sample count/distribution; timeouts and saturation. No numeric performance target or benchmark is currently specified. |

### 3.1 Candidate-specific facet cross-links

- **File analysis:** Interface ↔ Behaviour ↔ Business Rules ↔ Data; Security Controls; Errors and Recovery; Configuration; Performance. Persistence, API, Messaging, Background Processing and Integrations apply only if the selected design actually uses those mechanisms.
- **Quarantine:** Behaviour ↔ Business Rules ↔ Data ↔ Persistence; Security Controls; Errors and Recovery; Configuration; Performance. Android permissions/platform integration are linked where used.
- **Link checking:** Interface ↔ Behaviour ↔ Business Rules ↔ Data; API and Integrations if a reputation provider/backend is used; Errors and Recovery; Security Controls; Configuration; Performance.
- **History/admin/content/health:** Interface ↔ Behaviour ↔ Data ↔ Persistence; Identity and Authentication + Authorization for protected operations; API/Integrations where remote services are used; Errors and Recovery; Configuration.
- **Background protection:** Behaviour ↔ Background Processing ↔ Security Controls ↔ Configuration ↔ Performance; Messaging, Persistence, Integrations and Errors and Recovery where supported by actual architecture.

## 4. Cross-facet dependency map

| Dependency | Why it matters | Current unresolved point |
|---|---|---|
| File result → quarantine policy | A classification can trigger a security-sensitive file operation. | Detection thresholds, platform permission outcome and quarantine success criteria. |
| Quarantine → data/persistence/integrity | Quarantined file bytes, metadata, hash and lifecycle must remain consistent. | Storage model, encryption, atomicity, restore verification and uninstall handling. |
| Link check → API/integration/business decision | A reputation result may depend on external intelligence and freshness. | Provider/source, URL normalization, caching, freshness and offline behaviour. |
| Remote analysis → consent/security/integration | Sending a file changes the trust boundary and privacy properties. | Whether remote analysis is offered at all and exact consent/data flow. |
| Admin action → identity/authorization/audit | Privileged indicator/content/user operations require enforceable access boundaries. | Whether admin portal/accounts are in the selected scope and role definitions. |
| Configuration → affected operation | Effective settings can change file limits, retention, provider and detection behaviour. | Defaults, precedence, mutability and user/admin control. |
| Failure → recovery + originating facet | Failure outcomes must preserve correct state and not report false success. | Failure taxonomy, retry/fallback and compensation for each operation. |
| Workload → performance/security | Resource limits affect safe scanning and user-visible completion. | Supported device classes, file limits, budgets and acceptable latency. |

## 5. Explicit exclusions and non-assumptions at this stage

These are not adopted requirements; they are scope guardrails pending the owner MVP decision:

- Do not assume browser extension or automatic background download monitoring in the initial release; the scanner draft labels these later.
- Do not assume a particular scanning engine, URL reputation provider, cloud analysis path, database vendor, CMS, identity provider, message broker or backend architecture.
- Do not assume user accounts, subscriptions, multi-tenancy, collaboration or a public admin portal.
- Do not assume every screen in SCR-01–SCR-18 belongs to the selected MVP.
- Do not assume the scanner capability is ZeroDeck's launch MVP.
- Do not invent additional penetration-testing features from general industry knowledge.
- Do not equate UI affordances, sample data or source declarations with runtime functionality.

## 6. Evidence and verification plan for later phases

For each selected scenario, obtain runtime evidence from an authorized running target wherever possible. Capture target/build, environment, configuration, actor, initial state, trigger, inputs, actual outputs, state changes, timing and raw evidence. Use source-derived rules only when runtime observation cannot establish a relevant fact, and keep them separately labelled with immutable source provenance.

At minimum, later investigation must resolve:
- every outcome branch and failure path in the selected workflows;
- all data fields, constraints and transformations that materially affect the selected scope;
- all durable effects and their lifecycle;
- all external requests/messages and provider dependencies, if any;
- identity and authorization boundaries for privileged operations, if any;
- relevant security controls and authorized test outcomes;
- configuration defaults/effective values;
- performance/resource constraints under representative workloads;
- complete interface states, responsive/platform variants and accessibility properties.

## 7. Owner-selected MVP scope and facet applicability

The declared Phase 2 replication scope is limited to three capabilities:

- **MVP-01 — Manual file security analysis:** select a permitted file, initiate a manual scan, observe progress/termination and receive a bounded classification/result.
- **MVP-02 — Quarantine and file disposition:** isolate a confirmed threat when permitted; handle suspicious/inconclusive cases without unsafe automatic destruction; support the documented restore/delete lifecycle and truthful operation outcomes.
- **MVP-03 — Website and link checking:** submit a URL, validate/normalize it as required, perform the check, and return a bounded risk result with explicit limitations.

**IP address tracking/investigation is CAP-13, a future candidate explicitly outside this MVP.** Its meaning and workflow are not sufficiently defined to create MVP scenarios or requirements. It is recorded for later discovery only.

The MVP includes the cross-cutting properties necessary to reproduce these three capabilities, including relevant interface states, business decisions, data, security controls, errors/recovery, configuration, integrations and performance. A facet is not excluded merely because the implementation architecture is unknown. Conversely, conditional facets (such as persistence, API, messaging, authentication, background processing) become required only where the selected target's actual behaviour establishes their relevance. Do not invent a backend or provider architecture.

### 7.1 MVP scenario set

| Scenario ID | MVP workflow | Required outcome dimensions |
|---|---|---|
| MVP-FILE-001 | Select a supported file and initiate manual scan | Input acceptance/rejection; permissions/access; scan lifecycle; progress; terminal result; side effects; truthful user-facing state. |
| MVP-FILE-002 | File scan result branches | Confirmed threat, suspicious, no known threat, inconclusive, unsupported/inaccessible file, interruption and engine failure; each branch's state, wording and permitted next action. |
| MVP-QUAR-001 | Quarantine a confirmed threat | Eligibility decision; user/system trigger; isolation attempt/result; artifact identity/integrity; notification; failure state. |
| MVP-QUAR-002 | Handle suspicious or inconclusive file | Review/rescan path; no unsupported destructive action; state transitions and confirmation requirements. |
| MVP-QUAR-003 | Restore or permanently delete quarantined file | Confirmation; restore preconditions/fresh scan where specified; integrity; actual outcome; audit/history side effects if present; failure consistency. |
| MVP-LINK-001 | Submit a website URL/link for checking | Input route; validation/normalization; execution; result; scope/limitations; timeout/offline/provider failure. |
| MVP-LINK-002 | Link-check result branches | Likely dangerous, no known threat, inconclusive, invalid URL, redirect, timeout and unavailable source/provider; truthful bounded result, no guarantee of safety. |

The earlier candidate scenarios for history, optional remote file upload, admin sign-in, indicator management, CMS publishing and service health remain outside this MVP unless a selected MVP workflow demonstrably depends on a specific cross-cutting property. They are not independent MVP capabilities.

### 7.2 Required-property inventory disposition across 15 facets

The 15-facet inventory in §3 is now interpreted against MVP-01 through MVP-03, not the entire candidate list. Its status is:

- **Directly applicable to the MVP:** Interface, Behaviour, Business Rules, Data, Security Controls, Errors and Recovery, Configuration, and Performance and Resource Behaviour.
- **Conditional on observed/approved architecture or workflow:** Persistence, API, Messaging, Identity and Authentication, Authorization and Permissions, Background Processing, and Integrations. Security-critical permissions and access controls remain in scope wherever the platform or operation requires them, even if no user account exists.

These applicability labels define what must be investigated; they do not assert that a mechanism exists. Each property question in §3 remains open until supported by runtime evidence or explicitly labelled source-derived evidence. Any relevant unresolved property prevents a completeness claim under the governing Replication Completeness Rule.

## 8. Phase 2 disposition

**Phase 2 exit gate: satisfied.** The owner has selected and bounded the first ZeroDeck MVP to manual file security analysis, quarantine/file disposition, and website/link checking. IP address tracking/investigation is recorded as a future candidate and explicitly excluded from MVP. The three MVP workflows, exclusions, all 15 facet perspectives, scenario branches, cross-facet dependencies, and required-property questions are documented.

This is a scope-and-investigation milestone only. No rules are asserted as runtime-verified, and the selected MVP is not yet replication-sufficient. Phase 3 must select and audit relevant prior-art/source material against these three capabilities; Phases 4–6 must establish and validate the required properties.
