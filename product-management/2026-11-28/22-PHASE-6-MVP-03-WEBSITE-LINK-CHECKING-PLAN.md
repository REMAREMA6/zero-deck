# Phase 6 — MVP-03 Website and Link Checking: Execution Plan

**Plan date:** 2026-11-28  
**Workstream:** PM-authored product rules  
**Phase:** 6 of 9  
**Status:** Approved by Product Owner; execution complete  
**Scope:** MVP-03 — Website and link checking only  
**Workspace boundary:** `product-management/`

## 1. Requested outcome

Author a complete, implementation-ready, technology-independent product requirements contract for ZeroDeck's MVP-03 website and link-checking capability. Define observable product behaviour, security boundaries, entitlement and activation gates, provider interaction conditions, failure handling, privacy, and platform limitations while preserving unresolved owner policy as unresolved.

The Product Management Agent recommends and documents requirements. It does not make owner policy decisions, select implementation technology or providers, or change product implementation.

## 2. One-line work plan

After approval, read and follow all seven Product Management Agent CIRCLES skills; inspect the approved MVP scope, PM contract profile, authentication contract, MVP-01/MVP-02 contracts for dependency traceability only, relevant ZeroDeck source/evidence and platform constraints; then produce the MVP-03 canonical contract, synchronized structured projection and evidence, CIRCLES analysis, 15-facet coverage assessment, negative/failure/recovery matrix, and targeted validation. Update indexes and tracker only after checks pass.

## 3. Fixed product authority and hard gates

The following are existing owner-approved product constraints and must be preserved:

- MVP-03 is website and link checking.
- A request is eligible only when BOTH conditions are true:
  1. the requesting user has an active Pro entitlement; and
  2. the owner-controlled activation switch is enabled.
- No external provider/API call may occur if either condition is false.
- Pro entitlement does not imply unlimited usage.
- Web and Android share one product identity; platform-specific capability differences are allowed.
- Authentication is supporting infrastructure, not a fourth user-facing MVP capability.

The contract must model the two gates independently, including their evaluation timing, denial behaviour, state changes, revocation, stale authorization/entitlement state, and race conditions. It must not weaken the no-call rule through caching, retries, redirects, background work, fallback providers, prefetching, or any other path.

## 4. In-scope analysis

Define product requirements and observable outcomes, to the extent supported by owner decisions, source evidence, provider/platform contracts, or clearly labelled PM inference, for:

- **Request intent and input:** user-initiated website/link checks; accepted URL forms; malformed, ambiguous, unsupported, empty, oversized, or disallowed inputs; safe parsing and normalization semantics without prematurely choosing a parser/library.
- **URL identity and normalization:** scheme handling, host representation, internationalized domains, ports, paths, query strings, fragments, credentials embedded in URLs, canonicalization boundaries, duplicate/equivalent URLs, and preservation of the submitted value for user explanation/audit where justified.
- **Entitlement gate:** active Pro evaluation, inactive/expired/cancelled/revoked entitlement, entitlement lookup failure, stale state, account changes, and authorization boundaries. Reference the authentication contract only where identity/session dependencies are required.
- **Owner-controlled activation gate:** enabled/disabled state, propagation, changes during a request, operational failure, and the product's fail-closed behaviour.
- **Provider-call gate:** exact preconditions for every outbound provider/API call; prove no-call behaviour when either gate fails; cover retries, redirects, asynchronous work, batching, fallback, cached results, duplicate submissions, and race conditions.
- **Provider boundary and unresolved selection:** provider capabilities and limitations, result provenance/freshness, data sent, retention, regional processing, contractual terms, availability, replaceability and cost drivers. Provider/vendor/API selection remains unresolved.
- **Network and provider failures:** timeout, DNS failure, TLS/certificate errors, connection reset, rate limiting, quota exhaustion, provider outage, malformed/untrusted provider responses, partial results, and retry safety.
- **Redirect handling:** redirect limits and semantics, cross-origin changes, scheme downgrade, redirect loops, and re-evaluation of security policy and gates before any subsequent request.
- **Server-side request forgery and network reachability:** private, loopback, link-local, reserved, multicast and internal destinations; DNS resolution changes/rebinding; IPv4/IPv6 and alternate address forms; metadata services; proxy behaviour; and prevention of unintended access to internal infrastructure. Treat these as product security outcomes, not a selected implementation design.
- **Fetch and resource bounds:** response size, time, redirect depth, concurrency, request frequency, decompression/expansion, content types, streaming/partial bodies, and cancellation. Numeric thresholds remain open unless established by evidence or owner decision.
- **TLS and certificate outcomes:** invalid, expired, mismatched, untrusted, or unavailable certificate information; avoid implying that certificate validity proves a site is safe.
- **Rate limits, quotas and budgets:** per-user and system-level controls, abuse prevention, cost ceilings, exhaustion, reset semantics, and user communication. Exact values and commercial limits remain unresolved.
- **Result semantics:** safe/known threat/suspicious/unknown or equivalent outcome classes only where defensible; evidence and provider provenance; timestamps/freshness; confidence and limitations; false positives/false negatives; unavailable and inconclusive states; no absolute safety guarantees.
- **Privacy and data handling:** submitted URLs and potentially sensitive query/path data, provider disclosure, logs, analytics, diagnostics, retention, redaction, deletion, and consent/notice requirements. No assumption that URLs are non-sensitive.
- **Abuse and misuse:** automated/bulk probing, arbitrary internal-network targeting, enumeration, repeated requests, account sharing, and attempts to bypass Pro or activation gates.
- **Platform behaviour:** shared web/Android semantics, platform-specific input and network limitations, parity gaps, unsupported states, and consistent user-facing explanations.
- **User-visible lifecycle:** queued/processing/completed/partial/failed/cancelled/blocked states where applicable; progress and cancellation truthfulness; duplicate submissions; result presentation and safe next steps.
- **Persistence and history:** whether results are retained, for how long, user access/deletion, and cross-platform availability. Do not assume history or retention is in scope; record unresolved policy.
- **Observability and operations:** auditable gate decisions, provider-call accounting, failure visibility, abuse signals, incident handling, and redaction without collecting unnecessary URL content.
- **Cross-feature boundaries:** link checking must not silently trigger MVP-01 file analysis or MVP-02 quarantine/disposition. Reference those contracts only for explicit dependencies, not to re-author their requirements.

The analysis must distinguish required product outcomes from the implementation mechanism used to achieve them.

## 5. Explicit exclusions

Phase 6 will not author or change requirements for:

- MVP-01 file analysis or scanning engines, except a reference where a future shared result surface is relevant.
- MVP-02 quarantine, restore, file disposition, retention or file storage, except dependency traceability where necessary.
- Authentication/account lifecycle beyond referencing the existing authentication contract for identity, session and authorization dependencies.
- IP address tracking/investigation or general-purpose network reconnaissance.
- Port scanning, vulnerability scanning, exploitation, crawling the web, automated site audits, penetration testing, or arbitrary HTTP client functionality unless already explicitly approved as MVP-03 scope.
- A specific provider/vendor/API, threat-intelligence feed, pricing plan, quota value, budget amount, scoring algorithm, reputation threshold, or commercial contract.
- A specific URL parser, HTTP client, DNS resolver, proxy, network library, cloud service, database schema, language, framework, deployment topology, or architecture.
- Automatic/background checking, bulk checking, scheduled monitoring, or continuous rechecking unless an existing owner decision explicitly authorizes it.
- UI replication, product implementation, provider integration, deployment, or configuration changes.
- Security certification, penetration testing, runtime conformance, or production-readiness claims.

Do not silently import behaviour from reference products, provider documentation, platform examples, or a proposed architecture as an owner-approved ZeroDeck decision. Do not broaden MVP-03 into a general website scanner or reconnaissance product.

## 6. Planned deliverables

1. `product-management/2026-11-28/22-PHASE-6-MVP-03-WEBSITE-LINK-CHECKING-PLAN.md` — this plan and approval/execution record.
2. `product-management/2026-11-28/23-PHASE-6-CIRCLES-WEBSITE-LINK-CHECKING.md` — seven-step CIRCLES analysis with evidence/inference distinctions, ranked needs, materially different alternatives, recommendation, trade-offs and open questions.
3. `product-management/product-rules/contracts/WEBSITE-LINK-CHECKING.md` — canonical PM-authored MVP-03 requirements contract.
4. `product-management/product-rules/contracts/WEBSITE-LINK-CHECKING.declared-contract.json` — structured projection synchronized to the canonical contract.
5. `product-management/product-rules/evidence/website-link-checking-contract.evidence.json` — provenance and retained evidence.
6. `product-management/product-rules/PHASE-6-MVP-03-FACET-COVERAGE.md` — assessment of all 15 official Software Rules facets, with applicability/deferment/unresolved classifications and rationale.
7. `product-management/product-rules/PHASE-6-MVP-03-NEGATIVE-FAILURE-RECOVERY-MATRIX.md` — concrete negative, boundary, gate-denial, no-call, network/provider failure, interruption, abuse and recovery scenarios.
8. `product-management/product-rules/PHASE-6-MVP-03-VALIDATION.md` — structural, semantic, parity, traceability, provenance and negative-fixture validation results and limitations.
9. Updates to `product-management/product-rules/README.md`, `product-management/2026-11-27/11-PM-AUTHORED-PRODUCT-RULES.md`, `product-management/TRACKER.md`, and `product-management/PLAN.md` to record the phase outcome and next phase.

Names may be adjusted only where existing repository conventions require it; deliverable substance and scope must remain unchanged.

## 7. Completion and quality gates

Phase 6 may be marked complete only when:

- Every normative requirement has a stable unique ID, explicit PM authorship/provenance, relevant official facet mapping, and observable acceptance criteria.
- Each material requirement traces to an owner decision, source/design/provider/platform evidence, or clearly labelled PM inference.
- The two independent Pro and owner-activation gates are explicit, testable, and fail closed.
- The no-provider-call invariant is covered for every path where either gate is false, unknown, stale, unavailable, revoked, disabled, or changes during processing; retries, redirects, queues, background tasks, caching, batching and fallback cannot bypass it.
- URL parsing/normalization and destination validation have observable boundaries and do not silently equate different URLs or erase security-relevant distinctions.
- SSRF, private/internal destinations, DNS rebinding, IPv4/IPv6 variants, redirect transitions and metadata-service access are addressed as explicit security outcomes.
- Provider calls disclose only the minimum justified data; URL privacy, logs, diagnostics, retention and deletion are explicit or remain open.
- TLS/certificate failures, provider uncertainty and stale results do not produce unsupported safety assurances.
- Time, size, redirect, concurrency, rate and cost bounds are explicit or recorded as unresolved; no unsupported numeric limits are invented.
- Normal, alternate, invalid, unsupported, denied, interrupted, failed, repeated, abusive and recoverable/irrecoverable paths are covered where applicable.
- Web and Android shared semantics and platform-specific capability limits are both assessed.
- All 15 official Software Rules facets are assessed. Not-applicable and deferred classifications include rationale and consequence.
- Negative/failure/recovery scenarios are traceable to contract requirements and exercise meaningful boundaries, especially gate denial and zero outbound calls.
- Markdown, structured projection, and evidence agree on requirement IDs, order, statements, criteria, authorship, revision, and digest.
- Validation reports exactly what was checked. Targeted checks must not be represented as full JSON Schema Draft 2020-12 validation, upstream Software Rules CI, runtime testing, security audit, penetration test, provider integration test, or production readiness unless actually performed.
- MVP-01 and MVP-02 remain their own contracts; no unrelated capability is pulled into MVP-03.
- Tracker and indexes link to exact artifacts and preserve the distinction between PM-proposed requirements and owner-approved decisions.

Unknown policy must remain open or be represented as conditional requirements. In particular, do not invent provider/vendor, URL acceptance policy, numeric thresholds, quotas, budget ceilings, result taxonomy/scoring thresholds, result retention, consent wording, or activation propagation guarantees.

## 8. Execution boundary

Execution begins only after the Product Owner explicitly approves this exact written plan. Once approved, all seven CIRCLES skills must be read and followed. All created or modified files must remain under `product-management/`. No product implementation files and no Software Rules repository files may be changed. Any scope expansion or material owner decision must be surfaced for approval rather than silently incorporated.

## 9. Approval and completion record

**Approval status:** Approved.  
**Approval record:** On 2026-11-28 the Product Owner stated: “I have looked the plan, start now. Finish, start and finish phase 6.” This explicitly approved execution of this written plan.  
**Execution status:** Complete.  
**Completion record:** The Phase 6 deliverables are committed under `product-management/`. The canonical contract contains 39 requirements / 39 acceptance criteria / 18 open questions. Four requirements directly encode owner-approved scope decision `ZD-SCOPE-001`; 35 remain PM-proposed. All 15 facets were assessed; 75 negative/failure/recovery scenarios were authored; 19/19 targeted checks and 5/5 malformed-fixture checks passed. See `product-management/product-rules/PHASE-6-MVP-03-VALIDATION.md` for validation scope and limitations. No implementation, provider integration, or Software Rules repository changes were made.

Owner approval of this plan will authorize the Phase 6 product-management analysis and contract-authoring work only. It will not approve the resulting PM-proposed requirements, settle open product policies, select a provider or implementation architecture, or authorize implementation/deployment.
