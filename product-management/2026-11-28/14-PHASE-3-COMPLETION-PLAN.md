# Phase 3 Completion Plan — Authentication Coverage Validation

**Project:** ZeroDeck  
**Workstream:** PM-authored product rules  
**Phase:** 3 — validate authentication coverage  
**Status:** Awaiting owner approval  
**Scope:** Product Management artifacts under `product-management/` only

## Requested outcome

Complete the Phase 3 exit condition recorded in `TRACKER.md`: a cross-facet authentication coverage assessment, including negative, failure and recovery scenarios, with gaps classified rather than silently treated as requirements.

## Work plan

1. **Re-establish the baseline.** Read the current tracker, Phase 2 contract, structured projection, evidence, validation report, Phase 1 profile and the exact pinned Software Rules specification, schemas, facet taxonomy, property inventory and relevant conformance cases. Record immutable revisions.
2. **Build a complete coverage matrix.** Assess all 15 official Software Rules facets against the 21 authentication requirements and their acceptance criteria. For each relevant property, record requirement IDs, platform scope, evidence/source, coverage status and rationale. Do not assume every facet/property applies to ZeroDeck.
3. **Classify every uncovered or ambiguous property.** Use explicit categories: required (covered or proposed addition), not applicable (with reason), deferred (with consequence/trigger), or unresolved (owner decision or missing evidence). Separate Software Rules properties from ZeroDeck-specific product needs.
4. **Exercise negative, failure and recovery coverage.** Create a traceable scenario matrix for invalid credentials, fabricated client state, enumeration, throttling/abuse, session tampering/expiry/revocation, cross-platform identity, credential change, recovery abuse, backend/provider/database unavailability, partial writes, stale entitlement/activation state, and fail-closed behaviour. Mark each as covered, partially covered or missing; do not invent implementation observations.
5. **Review cross-facet interactions.** Check identity ↔ authorization, sessions ↔ persistence, recovery ↔ security controls, web ↔ Android, account state ↔ entitlement, and API/configuration/error behaviour for contradictions, missing transitions and ambiguous normative language.
6. **Make bounded PM recommendations.** Where the contract has a genuine omission, propose a narrowly scoped requirement or acceptance-criteria change with rationale and provenance. Preserve all unresolved owner decisions. Do not silently promote recommendations to owner-approved requirements or expand the MVP.
7. **Validate and report.** Check stable IDs, contract/metadata parity, facet references, platform values, acceptance criteria, evidence references and revision/digest consistency. Run negative checks against the coverage artifacts. Clearly state validator limits; do not claim full upstream CI or runtime conformance unless actually executed.
8. **Close Phase 3 records.** Write the coverage matrix, scenario matrix and validation report; update the Phase 3 row, tracker, workstream summary and plan only when all exit criteria pass. Verify the committed files and links.

## Boundaries

- Do not modify `REMAREMA6/software-rules`; use its pinned version as the compatibility baseline unless the evidence reveals a version issue, which must be reported rather than silently changed.
- Do not modify product implementation, architecture, UI, backend or runtime configuration.
- Authentication remains supporting infrastructure, not a fourth MVP capability.
- Preserve the three approved MVP capabilities and the Pro + owner-controlled activation gate for MVP-03.
- Do not decide sign-in method, verification, MFA/passkeys policy, recovery channel, session durations, account deletion/retention or assurance target on the owner's behalf.
- Do not claim all 15 facets require authentication-specific rules. Applicability must be justified.
- PM recommendations remain PM-proposed until the owner explicitly decides otherwise.

## Phase 3 exit criteria

- All 15 official facets are explicitly assessed, including justified not-applicable facets.
- Every applicable authentication-related property is mapped to existing requirements, proposed additions, or an explicit unresolved/deferred status.
- Negative, failure and recovery scenarios are traceable to requirements and have no unlabelled coverage gaps.
- Cross-facet and cross-platform interactions are reviewed.
- Any proposed contract changes retain stable IDs/versioning and have complete acceptance criteria, basis and metadata parity.
- Evidence, artifact revisions and digests are consistent.
- Validation results and limitations are recorded.
- Tracker and workstream accurately mark Phase 3 complete only after these conditions pass.

**Approval gate:** No Phase 3 analysis or artifact changes will begin until the owner explicitly approves this plan.
