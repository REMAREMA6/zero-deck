# ZeroDeck MVP-03 — Website and Link Checking Product Requirements

**Contract ID:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING`  
**Version:** `0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent  
**Status:** PM-authored draft; requirements ZD-WEB-001–004 directly encode owner-approved scope constraints; ZD-WEB-005–038 are PM-proposed.  
**Scope:** MVP-03 website and link checking on web and Android.  
**Owner scope decision:** `ZD-SCOPE-001` (2026-11-27).  
**Related contracts:** Identity/authentication (supporting identity/authorization dependency only); MVP-01 and MVP-02 are not re-authored here.

## 1. Purpose and authority

This contract defines observable product behaviour for a user-initiated, bounded website/link reputation check. It is a technology-independent declared product contract, not a runtime observation, source-derived rule, implementation design, security audit, or proof of conformance. ZeroDeck Product Management Agent is the author. The Product Owner retains final authority.

The four requirements ZD-WEB-001–004 directly encode owner-approved MVP scope: active Pro entitlement, independent owner-controlled activation, no provider/API call unless both are positively established, and Pro is not unlimited. These are marked owner-approved with reference `ZD-SCOPE-001`. All remaining requirements are PM-proposed. Plan approval authorizes this analysis; it does not approve those proposed requirements.

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

### Requirement ZD-WEB-001 — Pro eligibility

**P0 · business-rule · business-rules, authorization-permissions**

The system MUST permit an MVP-03 provider-backed check only when the requesting account has an active Pro entitlement at the authorization point.

**Rationale / basis:** Owner decision ZD-SCOPE-001: Pro entitlement is a mandatory independent gate.

**Acceptance criterion — ZD-WEB-AC-001-01**

- **Given** a request is made by an account with active Pro entitlement
- **When** the user submits a website/link check
- **Then** the request is eligible for gate evaluation only in the active case; otherwise it is blocked without a provider call
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-002 — Owner activation

**P0 · business-rule · configuration, authorization-permissions**

The system MUST permit an MVP-03 provider-backed check only when the owner-controlled activation switch is enabled.

**Rationale / basis:** Owner decision ZD-SCOPE-001: owner-controlled activation is a separate mandatory gate.

**Acceptance criterion — ZD-WEB-AC-002-01**

- **Given** the owner activation switch is enabled or disabled
- **When** a user requests an MVP-03 check
- **Then** the switch state is evaluated independently of Pro entitlement
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-003 — No-call invariant

**P0 · security · authorization-permissions, integrations, security-controls**

The system MUST NOT make an external provider/API call unless both active Pro entitlement and enabled owner-controlled activation have been positively established for that request.

**Rationale / basis:** Owner decision ZD-SCOPE-001 establishes the two mandatory gates and no-call rule; PM inference extends this invariant to unknown/unavailable states and every execution path.

**Acceptance criterion — ZD-WEB-AC-003-01**

- **Given** either gate is false, unknown, stale, unavailable, revoked, or disabled before dispatch
- **When** any synchronous, retry, redirect, queued, cached-refresh, batch, fallback, or background path attempts dispatch
- **Then** no provider/API request is emitted; the decision and reason are recorded without sensitive URL content
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-004 — Pro is bounded

**P0 · business-rule · business-rules**

The system MUST apply an explicit usage policy to Pro link checking and MUST NOT represent Pro entitlement as unlimited usage.

**Rationale / basis:** Owner decision ZD-SCOPE-001 explicitly says Pro does not mean unlimited usage.

**Acceptance criterion — ZD-WEB-AC-004-01**

- **Given** a Pro user has reached an applicable usage limit
- **When** the user submits another check
- **Then** the request is denied or deferred according to configured policy; no provider call occurs
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-005 — User initiation

**P1 · functional · interface, behavior**

The system MUST initiate an MVP-03 check only in response to an explicit user action on a supported URL input.

**Rationale / basis:** PM inference from MVP-03 scope; automatic/background checking is excluded by the Phase 6 plan.

**Acceptance criterion — ZD-WEB-AC-005-01**

- **Given** no check is currently running
- **When** the user explicitly submits one URL for checking
- **Then** exactly that submitted URL enters the request lifecycle
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-006 — Single URL scope

**P1 · functional · data, behavior**

The system MUST identify the submitted target as one URL and MUST NOT imply that checking it inspected the entire website, linked pages, files, or other resources.

**Rationale / basis:** PM inference; existing product planning says URL checking is a single-URL lookup unless more scope is approved.

**Acceptance criterion — ZD-WEB-AC-006-01**

- **Given** a user submits a URL on a page with links or embedded resources
- **When** the check completes
- **Then** the result identifies the checked URL only and makes no whole-site inspection claim
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-007 — Input validation

**P0 · security · security-controls, api**

The system MUST reject empty, malformed, unsupported, or structurally ambiguous URL inputs before any provider request.

**Rationale / basis:** PM inference; parser/library and exact accepted URL policy remain open.

**Acceptance criterion — ZD-WEB-AC-007-01**

- **Given** the submitted value is empty, malformed, or unsupported by the currently configured URL policy
- **When** the user submits it
- **Then** the request is rejected with an actionable reason and zero provider calls
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-008 — Submitted and normalized identity

**P1 · data · data, behavior**

The system MUST preserve the submitted URL separately from any normalized lookup representation whenever normalization changes its representation.

**Rationale / basis:** PM inference; exact normalization semantics require evidence and owner policy.

**Acceptance criterion — ZD-WEB-AC-008-01**

- **Given** a submitted URL is transformed for lookup
- **When** the system records or displays the check
- **Then** the original submitted value remains distinguishable from the normalized lookup target, subject to privacy controls
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-009 — URL credentials

**P0 · security · security-controls, data**

The system MUST NOT transmit URL-embedded username or password credentials to a reputation provider as part of an MVP-03 lookup.

**Rationale / basis:** PM inference based on data-minimization and credential-exposure risk.

**Acceptance criterion — ZD-WEB-AC-009-01**

- **Given** the submitted URL contains user-info credentials
- **When** the request is prepared for provider lookup
- **Then** credentials are removed or the URL is rejected; no credentials are disclosed to the provider
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-010 — Destination safety

**P0 · security · security-controls, integrations**

The system MUST prevent MVP-03 processing from causing an external fetch to loopback, private, link-local, reserved, multicast, metadata-service, or otherwise disallowed internal destinations.

**Rationale / basis:** PM inference; precise address classification and policy require security design and validation.

**Acceptance criterion — ZD-WEB-AC-010-01**

- **Given** a URL resolves or redirects to a prohibited destination
- **When** the system considers dispatch or follows a redirect
- **Then** the destination is blocked before network access to that destination
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-011 — DNS rebinding

**P0 · security · security-controls, integrations**

The system MUST ensure destination restrictions remain effective when DNS answers change between validation and connection establishment.

**Rationale / basis:** PM inference; implementation mechanism intentionally unspecified.

**Acceptance criterion — ZD-WEB-AC-011-01**

- **Given** a hostname resolves to an allowed address during initial validation and a prohibited address at connection time, or its answer changes during redirects/retries
- **When** the system attempts a connection
- **Then** no connection is made to the prohibited address
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-012 — Address representation

**P0 · security · security-controls, api**

The system MUST apply destination policy consistently to IPv4, IPv6, IPv4-mapped IPv6, alternate numeric representations, and internationalized hostnames.

**Rationale / basis:** PM inference; precise canonicalization policy remains open.

**Acceptance criterion — ZD-WEB-AC-012-01**

- **Given** the input uses an alternate address or hostname representation
- **When** the URL is validated
- **Then** the same destination policy is applied; ambiguous representations are rejected rather than bypassing controls
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-013 — Redirect control

**P0 · security · security-controls, integrations**

The system MUST apply an explicit redirect policy and revalidate the destination and both MVP-03 gates before any subsequent outbound request caused by a redirect.

**Rationale / basis:** PM inference; redirect support and hop limits remain open.

**Acceptance criterion — ZD-WEB-AC-013-01**

- **Given** a provider or permitted fetch path returns a redirect
- **When** the system considers following it
- **Then** disallowed destinations and gate failures stop the chain before another outbound request
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-014 — Scheme downgrade

**P0 · security · security-controls, integrations**

The system MUST NOT follow a redirect that downgrades a secure URL scheme to an insecure scheme unless a separately owner-approved policy explicitly permits it.

**Rationale / basis:** PM inference; no downgrade exception is currently approved.

**Acceptance criterion — ZD-WEB-AC-014-01**

- **Given** a secure URL redirects to an insecure scheme
- **When** the redirect is evaluated
- **Then** the redirect is rejected and no insecure destination request occurs
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-015 — TLS validation

**P0 · security · security-controls, integrations**

The system MUST treat TLS negotiation or certificate validation failure on any product-controlled provider connection as a failed lookup and MUST NOT silently disable certificate verification.

**Rationale / basis:** PM inference; TLS implementation choice remains open.

**Acceptance criterion — ZD-WEB-AC-015-01**

- **Given** a provider connection presents an invalid, expired, mismatched, or untrusted certificate
- **When** the connection is established
- **Then** the lookup fails safely; certificate verification is not bypassed
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-016 — Minimum disclosure

**P1 · privacy · data, integrations**

The system MUST disclose to an external provider only the URL representation and metadata required for the selected lookup operation, excluding account credentials and unrelated user data.

**Rationale / basis:** PM inference; provider-specific payload cannot be fixed until selection.

**Acceptance criterion — ZD-WEB-AC-016-01**

- **Given** a provider lookup is eligible and a provider contract is selected
- **When** the request payload is assembled
- **Then** only documented minimum required fields are sent
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-017 — URL sensitivity

**P0 · privacy · data, security-controls, integrations**

The system MUST treat submitted URLs, including paths and query parameters, as potentially sensitive user data.

**Rationale / basis:** PM inference; URLs can contain tokens, identifiers or private resource names.

**Acceptance criterion — ZD-WEB-AC-017-01**

- **Given** a URL is submitted or processed
- **When** the system handles, transmits, stores, logs, or displays it
- **Then** the URL receives privacy protections and is not assumed public merely because it is a URL
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-018 — Logging redaction

**P0 · privacy · data, security-controls**

The system MUST NOT place full submitted URLs, query strings, embedded credentials, or provider secrets in routine logs, analytics, or diagnostics unless a separately documented and justified owner-approved exception applies.

**Rationale / basis:** PM inference; detailed telemetry policy remains open.

**Acceptance criterion — ZD-WEB-AC-018-01**

- **Given** a check generates operational telemetry
- **When** the system records the event
- **Then** sensitive URL components and secrets are omitted or redacted
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-019 — Provider provenance

**P1 · data · data, integrations**

The system MUST associate each provider-derived result with the provider identity, lookup time, and provider result/version metadata when supplied by that provider.

**Rationale / basis:** PM inference; provider selection unresolved.

**Acceptance criterion — ZD-WEB-AC-019-01**

- **Given** a provider returns a result
- **When** the result is presented or retained
- **Then** its provenance and lookup timestamp are available to the product's result semantics
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-020 — Provider response validation

**P1 · reliability · integrations, errors-recovery**

The system MUST validate provider responses against the selected provider's documented response contract before using them to produce a user-visible result.

**Rationale / basis:** PM inference; provider schema depends on later provider selection.

**Acceptance criterion — ZD-WEB-AC-020-01**

- **Given** a provider response is malformed, incomplete, unexpected, or contains untrusted fields
- **When** the response is processed
- **Then** the response is rejected or represented as unavailable/inconclusive; it is not treated as a clean result
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-021 — Result uncertainty

**P1 · functional · behavior, interface**

The system MUST distinguish a provider-confirmed match, no known match, suspicious/ambiguous result, and unavailable or inconclusive lookup whenever the selected provider and approved result policy support those distinctions.

**Rationale / basis:** PM inference; exact taxonomy and mapping are unresolved.

**Acceptance criterion — ZD-WEB-AC-021-01**

- **Given** a provider response or lookup failure is received
- **When** the result is classified
- **Then** the user sees the supported outcome and its limitations; absence of a match is not stated as proof of safety
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-022 — No absolute safety claim

**P1 · usability · interface, behavior**

The system MUST NOT describe a URL as absolutely safe, guaranteed harmless, or free of threats solely because a provider reports no known match.

**Rationale / basis:** PM inference grounded in honest, bounded result semantics.

**Acceptance criterion — ZD-WEB-AC-022-01**

- **Given** a provider reports no known match
- **When** the result is displayed
- **Then** the wording states only that no known match was returned within the stated provider/check scope
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-023 — Freshness

**P1 · data · data, persistence**

The system MUST expose the lookup time and any provider-supplied freshness/expiry information used to determine whether a result may be reused.

**Rationale / basis:** PM inference; cache policy and freshness threshold remain open.

**Acceptance criterion — ZD-WEB-AC-023-01**

- **Given** a result is reused or displayed after its original lookup
- **When** the user views the result
- **Then** the lookup time and applicable freshness limitation are visible or otherwise disclosed
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-024 — Provider outage

**P1 · reliability · errors-recovery, integrations**

The system MUST represent provider outage, timeout, DNS failure, connection reset, quota rejection, rate limiting, and service unavailability as failed or inconclusive states rather than a no-threat result.

**Rationale / basis:** PM inference.

**Acceptance criterion — ZD-WEB-AC-024-01**

- **Given** any listed provider/network failure occurs
- **When** the request terminates
- **Then** the result is not converted into a clean/no-match verdict
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-025 — Retry safety

**P1 · reliability · errors-recovery, behavior**

The system MUST apply an explicit retry policy that cannot bypass current entitlement, owner activation, URL safety, rate limits, or request budgets.

**Rationale / basis:** PM inference; retry count/backoff remain open.

**Acceptance criterion — ZD-WEB-AC-025-01**

- **Given** a retry is considered after failure or interruption
- **When** the retry is scheduled or dispatched
- **Then** all gates and safety policies are re-evaluated; if not satisfied, zero provider calls occur
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-026 — Cancellation

**P1 · functional · behavior, errors-recovery**

The system MUST expose cancellation where the active platform and request lifecycle can support it and MUST distinguish a cancelled request from a completed result.

**Rationale / basis:** PM inference; actual cancellation boundary depends on provider/platform.

**Acceptance criterion — ZD-WEB-AC-026-01**

- **Given** a user cancels an in-progress check
- **When** the cancellation is processed
- **Then** no further eligible work is initiated for that request and the state is reported truthfully; already-sent requests are not falsely claimed recalled
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-027 — Rate and quota policy

**P1 · business-rule · business-rules, configuration**

The system MUST enforce configurable per-account and service-level usage limits before provider dispatch, with limit exhaustion producing a no-call outcome.

**Rationale / basis:** PM inference; numeric limits and reset semantics are open.

**Acceptance criterion — ZD-WEB-AC-027-01**

- **Given** a user or service has exhausted an applicable limit
- **When** a new check is requested
- **Then** the request is blocked before provider dispatch and the applicable limit state is communicated
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-028 — Abuse resistance

**P0 · security · security-controls, authorization-permissions**

The system MUST prevent repeated, automated, or bulk requests from bypassing account-level and service-level usage controls or either MVP-03 eligibility gate.

**Rationale / basis:** PM inference; anti-abuse thresholds and controls remain open.

**Acceptance criterion — ZD-WEB-AC-028-01**

- **Given** a client repeats requests, alters request parameters, or attempts concurrent submissions
- **When** the service evaluates requests
- **Then** the applicable gates and limits are enforced server-side for each provider dispatch
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-029 — Activation change

**P0 · configuration · configuration, authorization-permissions**

The system MUST stop initiating new provider requests when owner-controlled activation becomes disabled, including queued, retried, redirected, or not-yet-dispatched work.

**Rationale / basis:** PM inference extending owner-approved activation gate.

**Acceptance criterion — ZD-WEB-AC-029-01**

- **Given** activation is disabled while requests are pending or being prepared
- **When** a pending operation reaches its next dispatch boundary
- **Then** it is cancelled or blocked before any subsequent provider call
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-030 — Entitlement revocation

**P0 · business-rule · business-rules, authorization-permissions**

The system MUST stop initiating new provider requests when Pro entitlement expires, is revoked, or can no longer be positively verified.

**Rationale / basis:** PM inference extending owner-approved Pro gate.

**Acceptance criterion — ZD-WEB-AC-030-01**

- **Given** entitlement expires, is revoked, or becomes unverifiable during a workflow
- **When** a pending operation reaches its next dispatch boundary
- **Then** it is blocked before any subsequent provider call
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-031 — Resource bounds

**P1 · performance · performance-resource-behavior, security-controls**

The system MUST enforce explicit limits for request duration, response size, redirect depth, concurrency, and decompressed/expanded content before those limits can cause unbounded resource consumption.

**Rationale / basis:** PM inference; numeric values must be established before release.

**Acceptance criterion — ZD-WEB-AC-031-01**

- **Given** a request approaches or exceeds a configured resource bound
- **When** the system processes the request
- **Then** processing stops safely at the applicable bound and reports a bounded failure
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-032 — Lifecycle truthfulness

**P1 · functional · interface, errors-recovery**

The system MUST present distinct supported states for blocked, queued, processing, completed, inconclusive, failed, and cancelled requests, without representing a blocked or failed request as completed.

**Rationale / basis:** PM inference.

**Acceptance criterion — ZD-WEB-AC-032-01**

- **Given** a request enters any supported lifecycle state
- **When** the user views its status
- **Then** the displayed state matches the recorded request outcome
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-033 — History policy

**P1 · data · persistence, data**

The system MUST NOT imply that cross-device check history or durable URL retention is available unless an owner-approved retention and persistence policy has been adopted and implemented.

**Rationale / basis:** PM inference; history and retention are unresolved and standalone history is not approved.

**Acceptance criterion — ZD-WEB-AC-033-01**

- **Given** a result is completed or the user views prior checks
- **When** the product offers or describes history
- **Then** only actually supported retention and access are represented; no unapproved history promise is made
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-034 — Retention and deletion

**P1 · privacy · privacy, data**

The system MUST apply a documented owner-approved retention and deletion policy to any stored submitted URL, result, or provider response before persistent storage is enabled.

**Rationale / basis:** PM inference; exact schedule, data classes and deletion obligations remain open.

**Acceptance criterion — ZD-WEB-AC-034-01**

- **Given** the product proposes to persist URL or result data
- **When** persistence is enabled or a deletion request is processed
- **Then** storage is not enabled without the policy; once enabled, deletion follows its documented scope and exceptions
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-035 — Provider accounting

**P1 · operational · integrations, configuration**

The system MUST account for every provider dispatch against the applicable entitlement, usage and service budget, including retries and redirected requests.

**Rationale / basis:** PM inference; provider cost model and limits are unresolved.

**Acceptance criterion — ZD-WEB-AC-035-01**

- **Given** a provider dispatch is attempted
- **When** the system records its accounting event
- **Then** every actual dispatch is counted once and correlated to its request without storing the full URL in routine logs
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-036 — Incident visibility

**P1 · operational · errors-recovery, integrations**

The system MUST make provider outages, abnormal error rates, unexpected usage growth, and repeated gate-denial or abuse patterns observable to authorized operators without exposing full submitted URLs by default.

**Rationale / basis:** PM inference; exact alert thresholds and operator workflow remain open.

**Acceptance criterion — ZD-WEB-AC-036-01**

- **Given** operational anomalies occur
- **When** the system emits operational signals
- **Then** signals identify the anomaly and affected service/account scope while respecting URL redaction
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-037 — Platform semantics

**P1 · compatibility · behavior, interface**

The system MUST preserve the same eligibility, no-call, result-meaning, and privacy semantics on web and Android even when input mechanisms or supported capabilities differ.

**Rationale / basis:** Owner-approved cross-platform identity direction; PM inference applies shared semantics to MVP-03.

**Acceptance criterion — ZD-WEB-AC-037-01**

- **Given** a user performs the same eligible or ineligible check on either platform
- **When** the request is evaluated or a result is displayed
- **Then** both platforms apply the same product policy and explain any platform-specific limitation
- **Verification:** automated test / manual test / inspection as appropriate.

### Requirement ZD-WEB-038 — No arbitrary fetch

**P0 · security · security-controls, integrations**

The system MUST NOT use MVP-03 as a general-purpose URL fetcher, crawler, website auditor, port scanner, or network-reconnaissance interface.

**Rationale / basis:** Owner-approved MVP scope and explicit Phase 6 exclusion; PM inference operationalizes boundary.

**Acceptance criterion — ZD-WEB-AC-038-01**

- **Given** a submitted URL or provider response could trigger crawling or arbitrary resource access
- **When** the request is processed
- **Then** only the bounded, selected MVP-03 lookup occurs; no page traversal or unrelated network probing is initiated
- **Verification:** automated test / manual test / inspection as appropriate.


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

Before enabling provider-backed checks, resolve at least: supported URL forms; whether ZeroDeck fetches destinations or only asks a provider; redirect policy; provider/API and commercial/data terms; verdict taxonomy; rate/quota/spend budgets; gate propagation and in-flight behaviour; URL disclosure/consent; URL/result retention/deletion; and operational audit policy. Numeric resource limits must be established through provider/platform evidence and testing, not invented here.

## 8. Approval status

ZD-WEB-001–004 directly encode owner decision `ZD-SCOPE-001`. ZD-WEB-005–038 are PM-proposed. This contract is draft v0.1.0 and is not blanket owner approval. No implementation or provider integration is authorized by this artifact.
