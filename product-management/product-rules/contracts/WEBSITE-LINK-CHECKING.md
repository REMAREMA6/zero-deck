# ZeroDeck MVP-03 — Website and Link Checking Product Requirements

**Contract ID:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING`  
**Version:** `0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent  
**Status:** PM-authored draft; requirements are PM-proposed except the four direct encodings of owner-approved scope constraints.  
**Scope:** MVP-03 website and link checking on web and Android.  
**Owner scope decision:** `ZD-SCOPE-001` (2026-11-27).  
**Related contracts:** Identity/authentication (supporting identity/authorization dependency only); MVP-01 and MVP-02 are not re-authored here.

## 1. Purpose and authority

This contract defines observable product behaviour for a user-initiated, bounded website/link reputation check. It is a technology-independent declared product contract, not a runtime observation, source-derived rule, implementation design, security audit, or proof of conformance. ZeroDeck Product Management Agent is the author. The Product Owner retains final authority.

The four requirements ZD-WEB-001–004 directly encode owner-approved MVP scope: active Pro entitlement, independent owner-controlled activation, no provider/API call unless both are positively established, and Pro is not unlimited. These are marked owner-approved with reference `ZD-SCOPE-001`. All other requirements remain PM-proposed. Plan approval authorizes this analysis; it does not approve those proposed requirements.

## 2. Product boundary and invariants

- MVP-03 is a bounded website/link check, not a crawler, website audit, port scanner, IP investigation or general-purpose fetch service.
- Every provider dispatch requires both active Pro entitlement and enabled owner-controlled activation.
- If either gate is false, unknown, unavailable, stale, revoked or disabled, no provider call may occur.
- Pro entitlement is not unlimited usage; limits and spend policy remain to be decided.
- Web and Android share one product identity and the same eligibility, no-call, privacy and result semantics; platform capabilities may differ.
- Submitted URLs are potentially sensitive. A URL may contain credentials, tokens, personal data or private resource names.
- A no-match is not proof that a URL is safe.
- Provider, API, verdict taxonomy, numeric limits, cache policy, persistence and consent policy remain unresolved.

## 3. Requirement convention

Normative terms: MUST, MUST NOT and MAY. Each requirement is atomic, stack-agnostic and independently testable. Requirement priority does not imply owner approval. Each criterion is Given/When/Then and includes a verification method. Facet IDs are the official Software Rules IDs.

## 4. Requirements

### Requirement ZD-WEB-001 — A request is made by an account without active Pro entitlement.

**P0 · business-rule · business-rules, authorization-permissions**

Pro eligibility

**Rationale / basis:** The system MUST permit an MVP-03 provider-backed check only when the requesting account has an active Pro entitlement at the authorization point.

**Acceptance criteria**

- **ZD-WEB-AC-001-01** — Given Owner decision ZD-SCOPE-001: Pro entitlement is a mandatory independent gate. When A request is made by an account with active Pro entitlement. Then A request is made by an account without active Pro entitlement.: The request is eligible for gate evaluation only in the active case; otherwise blocked without provider call.
- **ZD-WEB-AC-001-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-002 — A user requests an MVP-03 check.

**P0 · business-rule · configuration, authorization-permissions**

Owner activation

**Rationale / basis:** The system MUST permit an MVP-03 provider-backed check only when the owner-controlled activation switch is enabled.

**Acceptance criteria**

- **ZD-WEB-AC-002-01** — Given Owner decision ZD-SCOPE-001: owner-controlled activation is a separate mandatory gate. When The owner activation switch is enabled or disabled. Then A user requests an MVP-03 check.: The switch state is evaluated independently of Pro entitlement.
- **ZD-WEB-AC-002-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-003 — Any synchronous, retry, redirect, queued, cached-refresh, batch, fallback, or background path attempts dispatch.

**P0 · security · authorization-permissions, integrations, security-controls**

No-call invariant

**Rationale / basis:** The system MUST NOT make an external provider/API call unless both active Pro entitlement and enabled owner-controlled activation have been positively established for that request.

**Acceptance criteria**

- **ZD-WEB-AC-003-01** — Given Owner decision ZD-SCOPE-001: no provider/API lookup if either gate is false; PM inference extends this invariant to unknown/unavailable states and every execution path. When Either gate is false, unknown, stale, unavailable, revoked, or disabled before dispatch. Then Any synchronous, retry, redirect, queued, cached-refresh, batch, fallback, or background path attempts dispatch.: No provider/API request is emitted; the decision and reason are recorded without sensitive URL content.
- **ZD-WEB-AC-003-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-004 — The user submits another check.

**P0 · business-rule · business-rules**

Pro is bounded

**Rationale / basis:** The system MUST apply an explicit usage policy to Pro link checking and MUST NOT represent Pro entitlement as unlimited usage.

**Acceptance criteria**

- **ZD-WEB-AC-004-01** — Given Owner decision ZD-SCOPE-001 explicitly says Pro does not mean unlimited usage. When A Pro user has reached an applicable usage limit. Then The user submits another check.: The request is denied or deferred according to the configured policy; no provider call occurs.
- **ZD-WEB-AC-004-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-005 — The user explicitly submits one URL for checking.

**P1 · functional · interface, behavior**

User initiation

**Rationale / basis:** The system MUST initiate an MVP-03 check only in response to an explicit user action on a supported URL input.

**Acceptance criteria**

- **ZD-WEB-AC-005-01** — Given PM inference from MVP-03 scope; automatic/background checking is excluded by the Phase 6 plan. When No check is currently running. Then The user explicitly submits one URL for checking.: Exactly that submitted URL enters the request lifecycle.
- **ZD-WEB-AC-005-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-006 — The check completes.

**P1 · functional · data, behavior**

Single URL scope

**Rationale / basis:** The system MUST identify the submitted target as one URL and MUST NOT imply that checking it inspected the entire website, linked pages, files, or other resources.

**Acceptance criteria**

- **ZD-WEB-AC-006-01** — Given PM inference; existing product planning says URL checking is a single-URL lookup unless more scope is approved. When A user submits a URL on a page with links or embedded resources. Then The check completes.: The result identifies the checked URL only and makes no whole-site inspection claim.
- **ZD-WEB-AC-006-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-007 — The user submits it.

**P0 · security · security-controls, data**

Input validation

**Rationale / basis:** The system MUST reject empty, malformed, unsupported, or structurally ambiguous URL inputs before any provider request.

**Acceptance criteria**

- **ZD-WEB-AC-007-01** — Given PM inference; parser/library and exact accepted URL policy remain open. When The submitted value is empty, malformed, or unsupported by the currently configured URL policy. Then The user submits it.: The request is rejected with an actionable reason and zero provider calls.
- **ZD-WEB-AC-007-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-008 — The system records or displays the check.

**P1 · data · data, behavior**

Submitted and normalized identity

**Rationale / basis:** The system MUST preserve the submitted URL separately from any normalized lookup representation whenever normalization changes its representation.

**Acceptance criteria**

- **ZD-WEB-AC-008-01** — Given PM inference; exact normalization semantics require evidence and owner policy. When A submitted URL is transformed for lookup. Then The system records or displays the check.: The original submitted value remains distinguishable from the normalized lookup target, subject to privacy controls.
- **ZD-WEB-AC-008-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-009 — The request is prepared for provider lookup.

**P0 · security · security-controls, api**

URL credentials

**Rationale / basis:** The system MUST NOT transmit URL-embedded username or password credentials to a reputation provider as part of an MVP-03 lookup.

**Acceptance criteria**

- **ZD-WEB-AC-009-01** — Given PM inference based on data minimization and credential exposure risk. When The submitted URL contains user-info credentials. Then The request is prepared for provider lookup.: Credentials are removed or the URL is rejected; no credentials are disclosed to the provider.
- **ZD-WEB-AC-009-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-010 — The system considers dispatch or follows a redirect.

**P0 · security · security-controls, integrations**

Destination safety

**Rationale / basis:** The system MUST prevent MVP-03 processing from causing an external fetch to loopback, private, link-local, reserved, multicast, metadata-service, or otherwise disallowed internal destinations.

**Acceptance criteria**

- **ZD-WEB-AC-010-01** — Given PM inference; precise address classification and policy require security design and validation. When A URL resolves or redirects to a prohibited destination. Then The system considers dispatch or follows a redirect.: The destination is blocked before network access to that destination.
- **ZD-WEB-AC-010-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-011 — The system attempts a connection.

**P0 · security · security-controls, integrations**

DNS rebinding

**Rationale / basis:** The system MUST ensure destination restrictions remain effective when DNS answers change between validation and connection establishment.

**Acceptance criteria**

- **ZD-WEB-AC-011-01** — Given PM inference; implementation mechanism intentionally unspecified. When A hostname resolves to an allowed address during initial validation and a prohibited address at connection time, or its answer changes during redirects/retries. Then The system attempts a connection.: No connection is made to the prohibited address.
- **ZD-WEB-AC-011-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-012 — The URL is validated.

**P0 · security · security-controls, api**

Address representation

**Rationale / basis:** The system MUST apply destination policy consistently to IPv4, IPv6, IPv4-mapped IPv6, alternate numeric representations, and internationalized hostnames.

**Acceptance criteria**

- **ZD-WEB-AC-012-01** — Given PM inference; precise canonicalization policy remains open. When The input uses an alternate address or hostname representation. Then The URL is validated.: The same destination policy is applied; ambiguous representations are rejected rather than bypassing controls.
- **ZD-WEB-AC-012-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-013 — The system considers following it.

**P0 · security · security-controls, integrations**

Redirect control

**Rationale / basis:** The system MUST apply an explicit redirect policy and revalidate the destination and both MVP-03 gates before any subsequent outbound request caused by a redirect.

**Acceptance criteria**

- **ZD-WEB-AC-013-01** — Given PM inference; redirect support and hop limits remain open. When A provider or permitted fetch path returns a redirect. Then The system considers following it.: Disallowed destinations and gate failures stop the chain before another outbound request.
- **ZD-WEB-AC-013-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-014 — The redirect is evaluated.

**P0 · security · security-controls, integrations**

Scheme downgrade

**Rationale / basis:** The system MUST NOT follow a redirect that downgrades a secure URL scheme to an insecure scheme unless a separately owner-approved policy explicitly permits it.

**Acceptance criteria**

- **ZD-WEB-AC-014-01** — Given PM inference; no downgrade exception is currently approved. When A secure URL redirects to an insecure scheme. Then The redirect is evaluated.: The redirect is rejected and no insecure destination request occurs.
- **ZD-WEB-AC-014-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-015 — The connection is established.

**P0 · security · security-controls, integrations**

TLS validation

**Rationale / basis:** The system MUST treat TLS negotiation or certificate validation failure on any product-controlled provider connection as a failed lookup and MUST NOT silently disable certificate verification.

**Acceptance criteria**

- **ZD-WEB-AC-015-01** — Given PM inference; TLS implementation choice remains open. When A provider connection presents an invalid, expired, mismatched, or untrusted certificate. Then The connection is established.: The lookup fails safely; certificate verification is not bypassed.
- **ZD-WEB-AC-015-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-016 — The request payload is assembled.

**P1 · data · data, integrations**

Minimum disclosure

**Rationale / basis:** The system MUST disclose to an external provider only the URL representation and metadata required for the selected lookup operation, excluding account credentials and unrelated user data.

**Acceptance criteria**

- **ZD-WEB-AC-016-01** — Given PM inference; provider-specific payload cannot be fixed until selection. When A provider lookup is eligible and a provider contract is selected. Then The request payload is assembled.: Only documented minimum required fields are sent.
- **ZD-WEB-AC-016-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-017 — The system handles, transmits, stores, logs, or displays it.

**P0 · privacy · data, security-controls, integrations**

URL sensitivity

**Rationale / basis:** The system MUST treat submitted URLs, including paths and query parameters, as potentially sensitive user data.

**Acceptance criteria**

- **ZD-WEB-AC-017-01** — Given PM inference; URLs can contain tokens, identifiers or private resource names. When A URL is submitted or processed. Then The system handles, transmits, stores, logs, or displays it.: The URL receives privacy protections and is not assumed public merely because it is a URL.
- **ZD-WEB-AC-017-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-018 — The system records the event.

**P0 · privacy · data, security-controls**

Logging redaction

**Rationale / basis:** The system MUST NOT place full submitted URLs, query strings, embedded credentials, or provider secrets in routine logs, analytics, or diagnostics unless a separately documented and justified owner-approved exception applies.

**Acceptance criteria**

- **ZD-WEB-AC-018-01** — Given PM inference; detailed telemetry policy remains open. When A check generates operational telemetry. Then The system records the event.: Sensitive URL components and secrets are omitted or redacted.
- **ZD-WEB-AC-018-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-019 — The result is presented or retained.

**P1 · integrations · integrations, data**

Provider provenance

**Rationale / basis:** The system MUST associate each provider-derived result with the provider identity, lookup time, and provider result/version metadata when supplied by that provider.

**Acceptance criteria**

- **ZD-WEB-AC-019-01** — Given PM inference; provider selection unresolved. When A provider returns a result. Then The result is presented or retained.: Its provenance and lookup timestamp are available to the product's result semantics.
- **ZD-WEB-AC-019-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-020 — The response is processed.

**P1 · reliability · integrations, errors-recovery**

Provider response validation

**Rationale / basis:** The system MUST validate provider responses against the selected provider's documented response contract before using them to produce a user-visible result.

**Acceptance criteria**

- **ZD-WEB-AC-020-01** — Given PM inference; provider schema depends on later provider selection. When A provider response is malformed, incomplete, unexpected, or contains untrusted fields. Then The response is processed.: The response is rejected or represented as unavailable/inconclusive; it is not treated as a clean result.
- **ZD-WEB-AC-020-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-021 — The result is classified.

**P1 · functional · behavior, interface**

Result uncertainty

**Rationale / basis:** The system MUST distinguish a provider-confirmed match, no known match, suspicious/ambiguous result, and unavailable or inconclusive lookup whenever the selected provider and approved result policy support those distinctions.

**Acceptance criteria**

- **ZD-WEB-AC-021-01** — Given PM inference; exact taxonomy and mapping are unresolved. When A provider response or lookup failure is received. Then The result is classified.: The user sees the supported outcome and its limitations; absence of a match is not stated as proof of safety.
- **ZD-WEB-AC-021-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-022 — The result is displayed.

**P1 · usability · interface, behavior**

No absolute safety claim

**Rationale / basis:** The system MUST NOT describe a URL as absolutely safe, guaranteed harmless, or free of threats solely because a provider reports no known match.

**Acceptance criteria**

- **ZD-WEB-AC-022-01** — Given PM inference grounded in the requirement for honest, bounded results. When A provider reports no known match. Then The result is displayed.: The wording states only that no known match was returned within the stated provider/check scope.
- **ZD-WEB-AC-022-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-023 — The user views the result.

**P1 · data · data, persistence**

Freshness

**Rationale / basis:** The system MUST expose the lookup time and any provider-supplied freshness/expiry information used to determine whether a result may be reused.

**Acceptance criteria**

- **ZD-WEB-AC-023-01** — Given PM inference; cache policy and freshness threshold remain open. When A result is reused or displayed after its original lookup. Then The user views the result.: The lookup time and applicable freshness limitation are visible or otherwise disclosed.
- **ZD-WEB-AC-023-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-024 — The request terminates.

**P1 · reliability · errors-recovery, integrations**

Provider outage

**Rationale / basis:** The system MUST represent provider outage, timeout, DNS failure, connection reset, quota rejection, rate limiting, and service unavailability as failed or inconclusive states rather than a no-threat result.

**Acceptance criteria**

- **ZD-WEB-AC-024-01** — Given PM inference. When Any listed provider/network failure occurs. Then The request terminates.: The result is not converted into a clean/no-match verdict.
- **ZD-WEB-AC-024-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-025 — The retry is scheduled or dispatched.

**P1 · reliability · errors-recovery, behavior**

Retry safety

**Rationale / basis:** The system MUST apply an explicit retry policy that cannot bypass current entitlement, owner activation, URL safety, rate limits, or request budgets.

**Acceptance criteria**

- **ZD-WEB-AC-025-01** — Given PM inference; retry count/backoff remain open. When A retry is considered after failure or interruption. Then The retry is scheduled or dispatched.: All gates and safety policies are re-evaluated; if not satisfied, zero provider calls occur.
- **ZD-WEB-AC-025-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-026 — The cancellation is processed.

**P1 · functional · behavior, errors-recovery**

Cancellation

**Rationale / basis:** The system MUST expose cancellation where the active platform and request lifecycle can support it and MUST distinguish a cancelled request from a completed result.

**Acceptance criteria**

- **ZD-WEB-AC-026-01** — Given PM inference; actual cancellation boundary depends on provider/platform. When A user cancels an in-progress check. Then The cancellation is processed.: No further eligible work is initiated for that request and the state is reported truthfully; already-sent requests are not falsely claimed recalled.
- **ZD-WEB-AC-026-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-027 — A new check is requested.

**P1 · business-rule · business-rules, configuration**

Rate and quota policy

**Rationale / basis:** The system MUST enforce configurable per-account and service-level usage limits before provider dispatch, with limit exhaustion producing a no-call outcome.

**Acceptance criteria**

- **ZD-WEB-AC-027-01** — Given PM inference; numeric limits and reset semantics are open. When A user or service has exhausted an applicable limit. Then A new check is requested.: The request is blocked before provider dispatch and the applicable limit state is communicated.
- **ZD-WEB-AC-027-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-028 — The service evaluates requests.

**P0 · security · security-controls, authorization-permissions**

Abuse resistance

**Rationale / basis:** The system MUST prevent repeated, automated, or bulk requests from bypassing account-level and service-level usage controls or either MVP-03 eligibility gate.

**Acceptance criteria**

- **ZD-WEB-AC-028-01** — Given PM inference; anti-abuse thresholds and controls remain open. When A client repeats requests, alters request parameters, or attempts concurrent submissions. Then The service evaluates requests.: The applicable gates and limits are enforced server-side for each provider dispatch.
- **ZD-WEB-AC-028-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-029 — A pending operation reaches its next dispatch boundary.

**P0 · configuration · configuration, authorization-permissions**

Activation change

**Rationale / basis:** The system MUST stop initiating new provider requests when owner-controlled activation becomes disabled, including queued, retried, redirected, or not-yet-dispatched work.

**Acceptance criteria**

- **ZD-WEB-AC-029-01** — Given PM inference extending owner-approved kill-switch gate. When Activation is disabled while requests are pending or being prepared. Then A pending operation reaches its next dispatch boundary.: It is cancelled or blocked before any subsequent provider call.
- **ZD-WEB-AC-029-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-030 — A pending operation reaches its next dispatch boundary.

**P0 · business-rule · business-rules, authorization-permissions**

Entitlement revocation

**Rationale / basis:** The system MUST stop initiating new provider requests when Pro entitlement expires, is revoked, or can no longer be positively verified.

**Acceptance criteria**

- **ZD-WEB-AC-030-01** — Given PM inference extending owner-approved Pro gate. When Entitlement expires, is revoked, or becomes unverifiable during a workflow. Then A pending operation reaches its next dispatch boundary.: It is blocked before any subsequent provider call.
- **ZD-WEB-AC-030-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-031 — The system processes the request.

**P1 · performance · performance-resource-behavior, security-controls**

Resource bounds

**Rationale / basis:** The system MUST enforce explicit limits for request duration, response size, redirect depth, concurrency, and decompressed/expanded content before those limits can cause unbounded resource consumption.

**Acceptance criteria**

- **ZD-WEB-AC-031-01** — Given PM inference; numeric values must be established before release. When A request approaches or exceeds a configured resource bound. Then The system processes the request.: Processing stops safely at the applicable bound and reports a bounded failure.
- **ZD-WEB-AC-031-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-032 — The user views its status.

**P1 · functional · interface, errors-recovery**

Lifecycle truthfulness

**Rationale / basis:** The system MUST present distinct supported states for blocked, queued, processing, completed, inconclusive, failed, and cancelled requests, without representing a blocked or failed request as completed.

**Acceptance criteria**

- **ZD-WEB-AC-032-01** — Given PM inference. When A request enters any supported lifecycle state. Then The user views its status.: The displayed state matches the recorded request outcome.
- **ZD-WEB-AC-032-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-033 — The product offers or describes history.

**P1 · data · persistence, data**

History policy

**Rationale / basis:** The system MUST NOT imply that cross-device check history or durable URL retention is available unless an owner-approved retention and persistence policy has been adopted and implemented.

**Acceptance criteria**

- **ZD-WEB-AC-033-01** — Given PM inference; history and retention are unresolved and standalone history is not approved. When A result is completed or the user views prior checks. Then The product offers or describes history.: Only actually supported retention and access are represented; no unapproved history promise is made.
- **ZD-WEB-AC-033-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-034 — Persistence is enabled or a deletion request is processed.

**P1 · privacy · privacy, data**

Retention and deletion

**Rationale / basis:** The system MUST apply a documented owner-approved retention and deletion policy to any stored submitted URL, result, or provider response before persistent storage is enabled.

**Acceptance criteria**

- **ZD-WEB-AC-034-01** — Given PM inference; exact schedule, data classes and deletion obligations remain open. When The product proposes to persist URL or result data. Then Persistence is enabled or a deletion request is processed.: Storage is not enabled without the policy; once enabled, deletion follows its documented scope and exceptions.
- **ZD-WEB-AC-034-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-035 — The system records its accounting event.

**P1 · operational · integrations, configuration**

Provider accounting

**Rationale / basis:** The system MUST account for every provider dispatch against the applicable entitlement, usage and service budget, including retries and redirected requests.

**Acceptance criteria**

- **ZD-WEB-AC-035-01** — Given PM inference; provider cost model and limits are unresolved. When A provider dispatch is attempted. Then The system records its accounting event.: Every actual dispatch is counted once and correlated to its request without storing the full URL in routine logs.
- **ZD-WEB-AC-035-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-036 — The system emits operational signals.

**P1 · operational · errors-recovery, integrations**

Incident visibility

**Rationale / basis:** The system MUST make provider outages, abnormal error rates, unexpected usage growth, and repeated gate-denial or abuse patterns observable to authorized operators without exposing full submitted URLs by default.

**Acceptance criteria**

- **ZD-WEB-AC-036-01** — Given PM inference; exact alert thresholds and operator workflow remain open. When Operational anomalies occur. Then The system emits operational signals.: Signals identify the anomaly and affected service/account scope while respecting URL redaction.
- **ZD-WEB-AC-036-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-037 — The request is evaluated or a result is displayed.

**P1 · compatibility · behavior, interface**

Platform semantics

**Rationale / basis:** The system MUST preserve the same eligibility, no-call, result-meaning, and privacy semantics on web and Android even when input mechanisms or supported capabilities differ.

**Acceptance criteria**

- **ZD-WEB-AC-037-01** — Given Owner-approved cross-platform identity direction; PM inference applies shared semantics to MVP-03. When A user performs the same eligible or ineligible check on either platform. Then The request is evaluated or a result is displayed.: Both platforms apply the same product policy and explain any platform-specific limitation.
- **ZD-WEB-AC-037-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)

### Requirement ZD-WEB-038 — The request is processed.

**P0 · security · security-controls, integrations**

No arbitrary fetch

**Rationale / basis:** The system MUST NOT use MVP-03 as a general-purpose URL fetcher, crawler, website auditor, port scanner, or network-reconnaissance interface.

**Acceptance criteria**

- **ZD-WEB-AC-038-01** — Given Owner-approved MVP scope and explicit Phase 6 exclusion; PM inference operationalizes boundary. When A submitted URL or provider response could trigger crawling or arbitrary resource access. Then The request is processed.: Only the bounded, selected MVP-03 lookup occurs; no page traversal or unrelated network probing is initiated.
- **ZD-WEB-AC-038-02** — Given a request is being processed When the applicable requirement boundary is reached Then the system preserves the required outcome and does not bypass this requirement. (Verification: automated test / inspection.)


## 5. Open product and owner questions

### ZD-Q-WEB-001 — Which URL schemes and input forms are supported at launch, and are bare domains accepted or normalized?

**Impact:** Defines the user input contract and rejects ambiguity before implementation.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Recommend explicit http/https only; require scheme or clearly specify a safe bare-domain normalization rule.

### ZD-Q-WEB-002 — Does MVP-03 submit URLs to a reputation provider only, or does ZeroDeck itself fetch the submitted destination?

**Impact:** Changes SSRF exposure, privacy disclosure, result meaning, TLS handling and operational cost.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Prefer provider-side reputation lookup without direct destination fetching unless a separately justified requirement emerges.

### ZD-Q-WEB-003 — Which URL normalization rules are acceptable for scheme, host, IDN, port, path, query and fragment?

**Impact:** Affects identity, provider matching, false equivalence and security bypasses.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Define a documented canonicalization policy with test vectors; preserve submitted value separately.

### ZD-Q-WEB-004 — Are redirects followed by ZeroDeck, by the provider, or not followed at all? What hop limit and cross-origin policy apply?

**Impact:** Determines additional outbound calls and SSRF/consent boundary.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Prefer no client-side redirect following unless required by selected provider and separately validated.

### ZD-Q-WEB-005 — What provider/API is approved, under what commercial terms, geography, retention and data-processing conditions?

**Impact:** Required to establish actual coverage, cost, data disclosure and contract compliance.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Select only after a comparative procurement review; retain provider-neutral product contract.

### ZD-Q-WEB-006 — What verdict taxonomy and mapping policy should launch use, including provider categories and conflicting results?

**Impact:** Determines user decisions, false-positive harm and consistency.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Use provider-supported evidence with explicit unknown/inconclusive states; do not invent a composite score.

### ZD-Q-WEB-007 — What maximum URL length and input complexity should launch accept?

**Impact:** Defines parsing, storage, transport and abuse boundaries.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Derive limits from platform/provider constraints and test data; do not invent a numeric value.

### ZD-Q-WEB-008 — What timeout, response-size, redirect-depth and concurrency limits are acceptable?

**Impact:** Needed to bound latency, resource consumption and cost.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Set numeric budgets after provider/platform benchmarking and threat review.

### ZD-Q-WEB-009 — What per-account and global rate limits, quota, reset periods and Pro allowance apply?

**Impact:** Needed to prevent abuse and bound provider cost; Pro is explicitly not unlimited.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Model separate account and service budgets; choose numeric values from provider terms and cost tolerance.

### ZD-Q-WEB-010 — What spend ceiling, alert threshold, emergency stop and over-budget behaviour should apply?

**Impact:** A usage spike could create unplanned provider expense.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Fail closed before dispatch at a configured ceiling; owner must set amounts and alert thresholds.

### ZD-Q-WEB-011 — How quickly must entitlement changes and owner activation changes take effect across web, Android and queued work?

**Impact:** Stale state could cause unauthorized provider calls.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Require authoritative re-evaluation at each dispatch boundary; choose and test a measurable propagation bound.

### ZD-Q-WEB-012 — May an in-flight provider request continue after entitlement revocation or activation disablement, and what can cancellation actually stop?

**Impact:** Distinguishes prevention of future calls from cancellation of a call already sent.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Block all subsequent dispatches immediately; disclose that an already-sent request may not be recallable.

### ZD-Q-WEB-013 — What URL/result data may be persisted, for what purpose, and for how long?

**Impact:** URLs can contain secrets and personal information; persistence changes privacy and deletion obligations.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Default to minimal transient processing until retention and deletion policy is approved.

### ZD-Q-WEB-014 — What user notice/consent is required before disclosing submitted URLs to the selected provider?

**Impact:** Provider disclosure may expose sensitive paths, queries or identifiers.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Provide clear notice before first disclosure and any materially changed provider/data use; obtain consent if required by policy/law.

### ZD-Q-WEB-015 — What operational visibility, audit fields and retention are allowed for gate decisions and provider dispatches?

**Impact:** Needed for cost control and incident response without collecting sensitive URL content.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Log decision outcome, request correlation, provider and accounting metadata; redact URL content.

### ZD-Q-WEB-016 — Which web and Android versions/platform capabilities are supported for link input and request lifecycle?

**Impact:** Determines cancellation, networking, deep-link and parity constraints.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Publish a supported platform matrix after device/browser testing.

### ZD-Q-WEB-017 — Are cached results permitted, and what freshness, invalidation and provider terms govern reuse?

**Impact:** Caching can reduce cost but may mislead users or violate provider terms.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Do not reuse results until provider terms and a freshness policy are approved.

### ZD-Q-WEB-018 — What user-visible recovery and next-action language is approved for malicious, suspicious, no-match and inconclusive outcomes?

**Impact:** Avoids unsafe or misleading advice and unsupported safety guarantees.  
**Owner decision required:** Yes  
**PM recommendation (not a decision):** Use evidence-qualified wording and avoid telling users to open a URL based only on no match.


All 18 questions remain open. No provider, commercial terms, URL policy, numeric threshold, retention schedule, caching rule, result scoring or consent wording is selected by this contract.

## 6. Dependencies and explicit exclusions

- Authentication contract: account identity, session and trusted-server authorization are dependencies; this contract does not re-specify account lifecycle.
- MVP-01 file analysis and MVP-02 quarantine/disposition: separate capabilities; no implicit invocation or requirement transfer.
- Excluded: crawling, page traversal, vulnerability scanning, exploitation, port scanning, IP investigation, bulk checks, scheduled/background monitoring, arbitrary HTTP fetches, implementation/provider selection, pricing commitments and production-readiness claims.

## 7. Release-critical unresolved policy

Before enabling provider-backed checks, the owner/product must resolve at least: supported URL forms; whether ZeroDeck fetches destinations or only asks a provider; redirect policy; provider/API and commercial/data terms; verdict taxonomy; rate/quota/spend budgets; gate propagation and in-flight behaviour; URL disclosure/consent; URL/result retention/deletion; and operational audit policy. Numeric resource limits must be established through provider/platform evidence and testing, not invented here.

## 8. Approval status

The four direct scope requirements reference owner decision `ZD-SCOPE-001`. The remaining 34 requirements are PM-proposed. This contract is draft v0.1.0 and is not blanket owner approval. No implementation or provider integration is authorized by this artifact.
