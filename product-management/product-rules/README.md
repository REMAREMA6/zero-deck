# ZeroDeck Product Rules

**Product:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Profile:** [Product Requirements Contract Profile](PROFILE.md)  
**Status:** PM contract profile and Phase 3 authentication coverage are complete. The owner approved and recorded eight authentication policy decisions; the canonical authentication contract is v0.2.0-draft. Remaining operational questions, PM-proposed requirements and later capability contracts remain open.

## Contracts

| Contract | Capability | Status |
|---|---|---|
| [Identity and authentication contract](contracts/IDENTITY-AUTHENTICATION.md) | Supporting account/authentication infrastructure | Draft v0.2.0; eight owner decisions recorded; 25 requirements / 66 criteria; five operational questions remain open |
| Manual file-analysis contract | MVP-01 | Not started; create in Phase 4 |
| Quarantine and disposition contract | MVP-02 | Not started; create in Phase 5 |
| Website and link-checking contract | MVP-03 | Not started; create in Phase 6 |
| Cross-cutting system contract | Shared product/system requirements | Not started; create in Phase 7 |

## Authoring and validation

- The canonical profile is in [PROFILE.md](PROFILE.md).
- Validate each complete PM declared contract with [the PM record schema](schemas/zero-deck-pm-declared-contract.schema.json), and validate its nested metadata with [the PM extension schema](schemas/zero-deck-pm-requirements-extension.schema.json).
- See the [Phase 1 validation report](VALIDATION-REPORT.md), [Phase 2 validation report](PHASE-2-VALIDATION.md), [Phase 3 validation report](PHASE-3-VALIDATION.md), and [owner-decision recording validation](PHASE-4-AUTH-DECISION-VALIDATION.md).
- The seven-step [Phase 2 CIRCLES analysis](../2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md) records the original authentication recommendation. Accepted owner choices are in the [dated decision record](../2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md).
- The structured projection and retained evidence record for authentication are in `contracts/IDENTITY-AUTHENTICATION.declared-contract.json` and `evidence/identity-authentication-contract.evidence.json`.
- Use [the declared-contract template](templates/declared-contract.template.json), [the evidence template](templates/declared-contract-evidence.template.json), and [the format-only example](examples/declared-contract-format-example.json).
- Requirements are represented as Software Rules declared contracts, not runtime rules or source-derived rules.
- Every contract explicitly identifies **ZeroDeck Product Management Agent** as issuer/author.
- Owner approval is recorded separately and is never inferred.

## Format example

The example under `examples/` is only a schema/format fixture. It is not a ZeroDeck product decision, an approved requirement, or evidence of implemented behaviour.

## Current phase

Phase 1 — PM contract profile design: **complete**. Phase 2 — authentication/account requirements: **complete**. Phase 3 — authentication coverage across all 15 facets: **complete**. Eight owner decisions are recorded; five operational questions remain open. Next: Phase 4 — author MVP-01 manual file-analysis requirements.
