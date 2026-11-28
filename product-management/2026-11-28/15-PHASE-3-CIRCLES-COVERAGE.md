# Phase 3 CIRCLES Analysis — Authentication Coverage

**Project:** ZeroDeck  
**Date:** 2026-11-28  
**Workstream:** PM-authored product rules — Phase 3  
**Author:** ZeroDeck Product Management Agent  
**Status:** PM recommendation; not an owner decision  
**Assessment:** [15-facet coverage](../product-rules/PHASE-3-15-FACET-COVERAGE.md)  
**Scenario matrix:** [negative, failure and recovery scenarios](../product-rules/PHASE-3-NEGATIVE-FAILURE-RECOVERY-MATRIX.md)

## C — Comprehend the situation

### Goal

Determine whether the PM-proposed authentication contract covers the authentication-related properties that matter across the Software Rules facet model, and expose gaps before later product contracts or engineering work depend on it.

This is a requirements-coverage exercise, not a penetration test, implementation audit or claim of complete Software Rules facet coverage.

### Constraints

- Work only in ZeroDeck's `product-management/` workspace.
- Preserve the pinned Software Rules baseline: commit `5591a2e62287afc29bde002369eaf659673ec59b`, specification 0.3.0 Draft, schema 0.2.0 Draft.
- Do not modify the Software Rules repository or ZeroDeck product implementation.
- Authentication remains supporting infrastructure, not a fourth MVP capability.
- Preserve the three approved MVP capabilities and the MVP-03 requirement for both active Pro entitlement and owner-controlled activation before any provider/API call.
- Do not decide sign-in method, verification, MFA/passkeys, recovery channel, session durations, deletion/retention or assurance policy.
- Existing requirements remain PM-proposed until the owner decides otherwise.

### Context and assumptions

The Phase 2 contract contains 21 requirements and 46 Given/When/Then acceptance criteria. Eight owner questions remain open. Its facet references span 10 of the 15 facets. The Software Rules catalogue explicitly says facets are observation perspectives, may overlap, and are not all applicable to every system.

**Assumption:** the owner wants the authentication contract to be sufficiently complete as a product-level statement before engineering begins, but does not want unrelated feature-specific rules or implementation choices silently added.

**Proposed success measure:** all 15 facets assessed; every authentication-relevant property mapped to a requirement or explicitly classified; every negative/failure/recovery gap visible; and no unsupported implementation or owner-decision claim.

## I — Identify the customer and stakeholders

### Segments considered

1. Everyday non-technical users creating or returning to a ZeroDeck account on web or Android.
2. Technical security practitioners who may later require stronger or more configurable controls.
3. Product operators/support personnel who handle account recovery and suspected compromise.
4. Product owner/security stakeholders who absorb account takeover, privacy, availability and operational consequences.

### Chosen cohort

**Everyday non-technical users who need to access the same ZeroDeck account across web and Android.**

This is the owner-selected first audience. The coverage work is primarily for the end user, because account continuity, safe failure and recovery affect their access directly. Operators and the owner are named as affected stakeholders because they carry recovery, abuse, incident and service responsibilities.

No direct user interviews or authentication telemetry were available. The cohort is an existing owner decision, not fresh evidence of customer preference.

## R — Report the underlying need

The feature-level want might be “make sure every authentication facet is covered.” That is not the underlying need.

**Inferred need:** as a non-technical user, I need my account identity, access and recovery to behave consistently across supported platforms, so that I can reach legitimate ZeroDeck capabilities without a client-side state change, stale session or recovery weakness granting access to someone else.

This need is inferred from the owner-approved product shape and security consequences; it is not a verbatim customer statement.

Related stakeholder needs:

- Operators need to recover legitimate accounts without making recovery an easier takeover path.
- The owner needs authorization and entitlement gates to remain enforceable even when authentication dependencies fail.
- Future feature teams need stable identity and authorization boundaries without inheriting contradictory or incomplete product rules.

## C — Cut through prioritization

Axes: frequency of the relevant operation, acuteness of failure, and alignment with the goal of trusted cross-platform access. These are qualitative PM judgments, not measured usage data.

| Need | Frequency | Acuteness | Goal alignment | Confidence |
|---|---|---|---|---|
| Trusted principal and credential verification | Every authentication/protected access | Critical if bypassed | Direct | High (owner/security basis) |
| Session lifecycle and revocation | Every protected session over time | High after theft, expiry or compromise | Direct | High |
| Recovery integrity and abuse resistance | Infrequent/unknown | Critical if abused; severe if legitimate user is locked out | Direct | Medium-low |
| Current authorization/entitlement state | Every protected operation by design | Critical if bypassed | Direct; MVP-03 explicitly gated | High |
| Detailed UI parity, performance and operational telemetry | Depends on later product/launch conditions | Variable | Indirect to this contract | Low |

### The cut

**Prioritize:** trusted identity, server-side authorization, session lifecycle, safe recovery and fail-closed behaviour. These are the minimum trust foundations.

**Do not expand this phase into:** complete interface replication, general API design, all persistence/database guarantees, worker lifecycle, messaging infrastructure or numeric performance targets. Those concerns are either feature-specific, architecture-dependent or belong in later contracts.

This cut does not mean those facets are unimportant to ZeroDeck. It means their authentication-specific relevance is conditional or deferred.

## L — List materially different approaches

### Option A — Accept the Phase 2 contract as-is

Keep the 21 requirements and 46 criteria unchanged, record all gaps as future work, and proceed to the next capability contract.

- Quickest path.
- Preserves the current baseline.
- Leaves some clearly testable authentication edge cases implicit.

### Option B — Add a bounded authentication coverage addendum

Keep the current contract and structured projection intact, but propose narrowly scoped additions for explicit invalid-credential denial, atomic trust-state changes during credential replacement/revocation, and renewal-credential rotation if renewal is selected.

- Closes specific coverage gaps without choosing an authenticator or architecture.
- Keeps owner decisions open.
- Requires a later versioned Markdown/JSON parity update if accepted.

### Option C — Expand authentication into a full identity/security operations specification now

Add account lifecycle states, detailed API contracts, provider-specific integrations, audit events, performance targets, session administration, MFA policy and operational runbooks in this phase.

- Could produce a broader document.
- Would require decisions and architecture that are not yet available.
- Risks turning a supporting capability into a much larger workstream and deciding matters reserved for the owner or later feature/system contracts.

## E — Evaluate the options

Axes fixed before evaluation: coverage of material trust risks, preservation of owner authority, scope discipline, traceability/testability and cost of rework.

| Axis | A — Accept as-is | B — Bounded addendum | C — Full expansion now |
|---|---|---|---|
| Material coverage | Leaves invalid-authenticator and partial-write cases implicit | Makes the specific gaps explicit | Potentially broad, but many decisions would be assumptions |
| Owner authority | Preserved | Preserved; proposals remain unapproved | At risk of prematurely resolving MFA, recovery, retention and architecture |
| Scope discipline | Strong | Strong if additions remain narrow | Weak; expands supporting auth into many system concerns |
| Traceability | Current 21/46 parity stays intact | Proposals have IDs and complete acceptance criteria; canonical contract remains unchanged pending review | High documentation burden and many speculative links |
| Rework risk | Gaps may surface during implementation | Low; explicit decisions can be made at review | High; later architecture/owner decisions may invalidate detail |

### Evaluation

Option A is defensible if speed is the only priority, but it understates two gaps that can be expressed as observable outcomes without choosing technology.

Option C is not justified. It mixes identity requirements with account lifecycle, full API design, system operations and unselected providers. It would also pressure the PM to settle decisions that belong to the owner.

Option B is the strongest balance. Its drawback is an additional owner-review and contract-versioning step. That cost is justified by the improved negative/failure traceability.

## S — Summarize the recommendation

### Recommendation

**Recommend Option B: retain the Phase 2 contract as the canonical draft and submit three bounded candidate additions (`ZD-AUTH-022`–`024`) for owner review.**

The candidates address invalid-authenticator denial, atomic trust state during credential replacement/session revocation, and renewal-credential rotation only if a renewable session design is selected. They are fully described in the 15-facet coverage assessment but are not yet inserted into the canonical contract or structured projection.

This recommendation supports trusted cross-platform account access without expanding the MVP or deciding the eight open owner questions.

### One testable success metric

**Authentication contract coverage closure:** 100% of the authentication-relevant property classes identified in the pinned 15-facet inventory are either linked to a current/candidate requirement or explicitly classified as deferred, unresolved or not applicable, with every negative/failure/recovery scenario assigned a traceable status.

**Result for this phase:** all 15 facets assessed; 23 scenarios classified; 3 candidate additions documented; 8 owner questions remain open. This is a documentation/traceability metric, not a runtime security metric.

### Trade-off

Choosing the bounded addendum over accepting the contract unchanged costs a small amount of additional review and versioning work. It avoids the larger cost and risk of carrying implicit gaps into implementation. It gives up the apparent simplicity of declaring Phase 2 fully sufficient.

### Objections and answers

- **“Why assess facets that are not authentication features?”** Because the Software Rules facets are observation perspectives and cross-facet effects can exist. The assessment explicitly marks messaging/background processing as currently not applicable and other concerns as deferred rather than forcing applicability.
- **“Does this mean all 15 facets need authentication rules?”** No. Only the facets with an authentication-related property are required for this contract; several are conditional, deferred or not applicable.
- **“Does upstream JWT/session evidence prove ZeroDeck is secure?”** No. It is bounded source/replica evidence for particular libraries and behaviours, not a ZeroDeck implementation test.
- **“Can the PM choose passkeys, MFA, email recovery or session durations?”** No. Those remain owner decisions.
- **“Does authentication grant Pro or link checking?”** No. The server must independently enforce active Pro entitlement and owner-controlled activation before any MVP-03 provider call.

### Evidence limitations

No production authentication service, ZeroDeck endpoint, web session, Android build, database, provider integration, audit log or performance workload was tested. No direct customer research or telemetry was available. The assessment is a PM requirements review against the pinned Software Rules taxonomy and property inventory.

**Authority:** PM recommendation only. The owner retains all product decisions and approval authority.
