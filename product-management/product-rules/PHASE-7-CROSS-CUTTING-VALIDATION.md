# Phase 7 — Cross-Cutting System Requirements Validation

**Status:** Targeted validation passed  
**Contract:** `ZD-CONTRACT-CROSS-CUTTING-SYSTEM` v0.1.0-draft  
**Canonical Markdown revision:** `8ad461896994f58632a570faee9b2c82c9945806`  
**Canonical Markdown SHA-256:** `sha256:6de28670247210f80ae7835633d9fdadf771db926af26ad102c76a3afd9b34c4`  
**Validation scope:** Structural, semantic, traceability, facet, failure-matrix and provenance checks against the PM profile and existing contract projections.

## 1. Artifact counts

| Item | Verified count |
|---|---:|
| Normative requirements | 28 |
| Acceptance criteria | 28 |
| Open owner questions | 18 |
| Official Software Rules facets assessed | 15 |
| Negative/failure/recovery scenarios | 58 |
| Owner-approved new Phase 7 requirements | 0 |
| PM-proposed new Phase 7 requirements | 28 |

## 2. Targeted validation

**29/29 checks passed.**

1. Contract ID, contract type and issuer match the PM profile.
2. Profile ID, version and pinned Software Rules compatibility match the project profile.
3. SHA-256 recomputed from the exact canonical Markdown bytes matches the structured artifact digest.
4. Artifact revision has the expected immutable Git commit SHA format.
5. Markdown statements and structured requirement metadata have identical IDs, count and order.
6. Structured statement text matches canonical Markdown statements.
7. Exactly 28 canonical requirement headings exist.
8. Every requirement has at least one acceptance criterion; criterion IDs are unique.
9. Acceptance criteria contain Given, When, Then and a supported verification method.
10. Requirement IDs are unique.
11. All new requirements remain `pm-proposed`.
12. No owner-approval metadata is fabricated.
13. Requirement types match the PM extension profile's allowed values.
14. Priority values match the PM extension profile.
15. Normative kinds match the PM extension profile.
16. Every requirement references one or more official facets.
17. Every requirement applies to the declared web and Android product platforms.
18. Every requirement has a non-empty, classified basis.
19. Cross-contract dependencies resolve to requirement IDs in the four existing contract projections.
20. All 18 open question IDs are unique and remain open.
21. All 15 official facets appear exactly once in the facet assessment.
22. Conditional Messaging and Background Processing facets have explicit applicability conditions and rationale.
23. The failure/recovery matrix contains exactly 58 scenarios.
24. Every matrix requirement reference resolves to a Phase 7 requirement.
25. Every Phase 7 requirement is represented by at least one matrix scenario.
26. The projection references the matching evidence record.
27. Evidence source revision matches the structured artifact revision.
28. Evidence source URI matches the structured artifact URI.
29. Scope checks confirm the contract does not introduce product implementation files or claim implementation completion.

## 3. Malformed-fixture checks

**5/5 malformed fixtures rejected by targeted in-memory profile checks:**

- Requirement with no acceptance criteria.
- Requirement with an invalid facet ID.
- Conditional requirement with no condition.
- Duplicate requirement ID.
- Owner-approved requirement with no decision reference.

These are targeted local profile-rule checks, not a substitute for a full JSON Schema validator.

## 4. Explicit limitations

The following were **not** performed and are not claimed:

- Independent full JSON Schema Draft 2020-12 validation of the complete declared-contract record and its upstream Software Rules references.
- Validation of a containing Software Rules capture against the pinned upstream capture schema.
- Upstream Software Rules CI or changes to the Software Rules repository.
- Product runtime, browser, Android, backend, API, database, backup/restore or integration tests.
- Security audit, threat-model review, penetration test, vulnerability assessment or incident exercise.
- Resource, load, capacity, cost, availability, RPO/RTO or performance benchmark.
- Customer interviews, usability research, product analytics or market validation.
- Legal/privacy review or jurisdiction-specific compliance assessment.
- Production-readiness or architecture approval.

## 5. Result

The Phase 7 PM-authored contract, structured projection, evidence record, CIRCLES analysis, 15-facet assessment and 58-scenario failure/recovery matrix are internally consistent under the targeted checks listed above.

**Phase 7 status:** Complete as a PM requirements-authoring phase. The 28 requirements remain recommendations pending Product Owner review. This completion does not mean the product is implemented, tested, secure, legally reviewed, production-ready, or architecturally approved.
