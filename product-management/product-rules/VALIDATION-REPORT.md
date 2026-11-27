# Phase 1 Profile Validation Record

**Workstream:** PM-authored ZeroDeck Product Requirements Contracts  
**Profile:** `zero-deck.pm-product-requirements` 1.0.0-draft  
**Date:** 2026-11-27  
**Status:** Targeted profile fixture checks passed

## Inputs pinned for this check

- Software Rules repository: `REMAREMA6/software-rules`
- Software Rules commit: `5591a2e62287afc29bde002369eaf659673ec59b`
- Specification release: 0.3.0 Draft
- Schema version: 0.2.0 Draft
- Upstream files: `schemas/v1/records.schema.json` and `schemas/v1/capture.schema.json`
- PM schemas:
  - `schemas/zero-deck-pm-declared-contract.schema.json`
  - `schemas/zero-deck-pm-requirements-extension.schema.json`
- Fixture: `examples/declared-contract-format-example.json`

## Checks performed

| Check | Result |
|---|---|
| PM schema files parse as JSON | Pass |
| Example declared contract satisfies the upstream `declaredContract` record constraints | Pass |
| Example evidence satisfies the upstream evidence record constraints | Pass |
| Example declared contract satisfies the ZeroDeck PM declared-contract profile constraints | Pass |
| Every declared statement has exactly one matching PM metadata entry | Pass |
| Contract evidence reference resolves to the example evidence record with `evidenceClass: declared-contract` | Pass |
| Declared contract issuer matches the explicit extension author | Pass |
| Wrong issuer mutation is rejected | Pass |
| Malformed SHA-256 digest mutation is rejected | Pass |
| Unknown facet ID mutation is rejected | Pass |
| Conditional requirement without conditions is rejected | Pass |
| Requirement without acceptance criteria is rejected | Pass |
| Owner-approved requirement without a decision reference is rejected | Pass |

## Validation boundary

This was a targeted structural and semantic validation pass against the exact upstream record definitions and the PM profile schemas. The validation harness used for this authoring check was not a full, independently installed JSON Schema Draft 2020-12 implementation and was not an upstream Software Rules CI run.

Before these contracts are used in an automated engineering pipeline:
1. Run the complete capture through a conformant Draft 2020-12 validator using the pinned upstream schemas.
2. Validate every PM declared-contract record with the PM profile schema and register both referenced schemas.
3. Run cross-record integrity checks for IDs, evidence, decisions, and statement/metadata parity.
4. Run the semantic checks in [PROFILE.md](PROFILE.md).

No complete Software Rules capture has been generated for ZeroDeck yet because feature requirements have not been authored. This check validates the PM record format, not product requirements, implementation behaviour, or runtime conformance.

The example is format-only and must never be interpreted as an approved ZeroDeck requirement.
