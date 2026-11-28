# Phase 6 — MVP-03 Website and Link Checking: Validation Report

**Contract:** `ZD-CONTRACT-WEBSITE-LINK-CHECKING` v0.1.0-draft  
**Canonical Markdown revision:** `8f0aeecee5b97a7fbfe98c4e048e6b40f436df60`  
**Canonical Markdown SHA-256:** `sha256:c17303dc66e34aca21729edc3d971b554254ceec73de10000f4a1611e9e44fc5`  
**Validation date:** 2026-11-28  
**Status:** Targeted authoring-session checks passed; limitations remain explicit.

## 1. Contract inventory

| Item | Result |
|---|---:|
| Normative requirements | 39 |
| Acceptance criteria | 39 |
| Owner-approved requirements directly encoding `ZD-SCOPE-001` | 4 |
| PM-proposed requirements | 35 |
| Open product/owner questions | 18 |
| Official Software Rules facets assessed | 15 |
| Negative/failure/recovery scenarios | 75 |

The four owner-approved statements are ZD-WEB-001–004: active Pro gate, independent owner activation gate, no-provider-call invariant, and Pro is not unlimited. The remaining 35 requirements are PM-proposed. None of the 18 questions was silently resolved.

## 2. Targeted structural and semantic checks

**17/17 checks passed.**

1. Markdown requirement statements and structured projection are present and in the same order.
2. Markdown statement IDs and structured requirement metadata have one-to-one parity.
3. Requirement IDs are unique.
4. Acceptance-criterion IDs are unique.
5. Every requirement has at least one Given/When/Then acceptance criterion.
6. Every referenced facet is one of the 15 official facet IDs.
7. Every requirement declares web and Android applicability.
8. Decision-status split is exactly four owner-approved and 35 PM-proposed.
9. Every owner-approved requirement references `ZD-SCOPE-001`.
10. All 18 open questions remain open.
11. Evidence source URI and source revision match the structured artifact identity.
12. All 15 facets appear in the coverage assessment.
13. The failure matrix contains 75 scenario rows.
14. All scenario requirement references resolve to canonical requirement IDs.
15. The CIRCLES artifact contains all seven steps in order.
16. The PM extension and declared-contract schema files parse as JSON and expose the expected definitions.
17. The structured projection contains a pinned SHA-256 digest and immutable Markdown revision.

Five malformed in-memory fixtures were rejected: missing acceptance criteria, invalid facet ID, duplicate requirement ID, owner-approved requirement without a decision reference, and conditional requirement without explicit conditions (**5/5 rejected**).

## 3. Gate/no-call coverage review

The failure matrix separately covers:
- Pro inactive, expired, revoked, stale, unknown and unavailable;
- owner activation disabled, unavailable, changed while work is pending;
- either gate false while the other is true, both false, and either gate changing between validation and dispatch;
- retries, queued work, redirects, cache refresh, fallback, batching and concurrency;
- account and service usage limits, spend ceiling and abuse attempts.

The intended invariant is explicit: no provider/API call unless both independent gates are positively established for that dispatch. Every subsequent dispatch boundary must re-evaluate eligibility. A request already sent cannot be truthfully described as recalled; future calls must be blocked.

## 4. Facet and scenario traceability

All 15 official Software Rules facets were assessed. Messaging is deferred because MVP-03 does not include user messaging. Persistence, API and background processing are conditional on later product/implementation choices; their conditional status does not waive assessment if those behaviours are introduced.

The 75 scenario rows map to one or more of the 39 canonical requirement IDs. This is a designed conformance matrix, not an executed runtime test suite.

## 5. Provenance and owner authority

- Canonical author/issuer: ZeroDeck Product Management Agent.
- Owner-approved source: `ZD-SCOPE-001` (2026-11-27).
- Four direct scope requirements reference that decision.
- Other requirements are explicitly PM-proposed and based on PM inference.
- No primary customer interviews, product analytics, provider contract, platform runtime evidence or selected provider were available for this phase.
- Provider selection, URL policy, quotas, budgets, result mapping, caching, retention, consent and operational thresholds remain open.

## 6. Explicit validation limitations

The following were **not** performed and are not claimed:
- independent full JSON Schema Draft 2020-12 validation against the upstream Software Rules capture and records schemas;
- full containing Software Rules capture validation or upstream Software Rules CI;
- runtime/browser/Android conformance tests;
- provider/API integration, response-contract or provider-outage tests;
- SSRF, DNS-rebinding, IPv4/IPv6, redirect, TLS or penetration testing;
- security audit, abuse test, cost/load benchmark or provider coverage/false-positive/false-negative benchmark;
- customer interviews, usability research, legal/privacy review or production-readiness assessment.

The local checks were targeted structural and semantic checks performed against the repository artifacts. Passing them establishes artifact consistency for the checked properties only; it does not prove requirement completeness, implementation conformance or security.

## 7. Phase 6 validation conclusion

The planned Phase 6 authoring deliverables exist and their targeted structural/traceability checks pass. Phase 6 may be marked complete as a **PM requirements-authoring phase**, with 39 requirements, 39 acceptance criteria, 18 open questions, 15-facet assessment and 75 failure/recovery scenarios.

The contract remains draft. Only four requirements directly encode the existing owner-approved scope decision; 34 remain PM-proposed. The Product Owner must review the open policy questions before implementation decisions are treated as settled.
