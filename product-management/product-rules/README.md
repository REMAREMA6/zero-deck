# ZeroDeck Product Rules

**Product:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Profile:** [Product Requirements Contract Profile](PROFILE.md)  
**Status:** PM contract profile and Phases 2–6 are complete. The owner approved and recorded eight authentication policy decisions. MVP-01 is a v0.1.0-draft contract with 28 PM-proposed requirements / 56 criteria / 9 open questions. MVP-02 is a v0.1.0-draft contract with 38 PM-proposed requirements / 68 criteria / 14 open questions. MVP-03 is drafted in v0.1.0-draft; Phase 7 cross-cutting contract remains open.

## Contracts

| Contract | Capability | Status |
|---|---|---|
| [Identity and authentication contract](contracts/IDENTITY-AUTHENTICATION.md) | Supporting account/authentication infrastructure | Draft v0.2.0; eight owner decisions recorded; 25 requirements / 66 criteria; five operational questions remain open |
| [Manual file-analysis contract](contracts/MANUAL-FILE-ANALYSIS.md) | MVP-01 | Draft v0.1.0; 28 PM-proposed requirements / 56 criteria; 9 open questions; Phase 4 complete |
| [Quarantine and file-disposition contract](contracts/QUARANTINE-FILE-DISPOSITION.md) | MVP-02 | Draft v0.1.0; 38 PM-proposed requirements / 68 criteria; 14 open questions; Phase 5 complete |
| [Website and link-checking contract](contracts/WEBSITE-LINK-CHECKING.md) | MVP-03 | Draft v0.1.0; 39 requirements / 39 criteria; 4 owner-approved scope encodings / 35 PM-proposed; 18 open questions; Phase 6 complete |
| Cross-cutting system contract | Shared product/system requirements | Not started; create in Phase 7 |

## Authoring and validation

- The canonical profile is in [PROFILE.md](PROFILE.md).
- Validate each complete PM declared contract with [the PM record schema](schemas/zero-deck-pm-declared-contract.schema.json), and validate its nested metadata with [the PM extension schema](schemas/zero-deck-pm-requirements-extension.schema.json).
- See the [Phase 1 validation report](VALIDATION-REPORT.md), [Phase 2 validation report](PHASE-2-VALIDATION.md), [Phase 3 validation report](PHASE-3-VALIDATION.md), [authentication owner-decision validation](PHASE-4-AUTH-DECISION-VALIDATION.md), and [MVP-01 Phase 4 validation](PHASE-4-MVP-01-VALIDATION.md), and [MVP-02 Phase 5 validation](PHASE-5-MVP-02-VALIDATION.md).
- The seven-step [Phase 2 CIRCLES analysis](../2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md) records the original authentication recommendation. Accepted owner choices are in the [dated decision record](../2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md).
- The structured projection and retained evidence for authentication are in `contracts/IDENTITY-AUTHENTICATION.declared-contract.json` and `evidence/identity-authentication-contract.evidence.json`. The MVP-01 projection and evidence are in `contracts/MANUAL-FILE-ANALYSIS.declared-contract.json` and `evidence/manual-file-analysis-contract.evidence.json`. The MVP-02 projection and evidence are in `contracts/QUARANTINE-FILE-DISPOSITION.declared-contract.json` and `evidence/quarantine-file-disposition-contract.evidence.json`.
- Use [the declared-contract template](templates/declared-contract.template.json), [the evidence template](templates/declared-contract-evidence.template.json), and [the format-only example](examples/declared-contract-format-example.json).
- Requirements are represented as Software Rules declared contracts, not runtime rules or source-derived rules.
- Every contract explicitly identifies **ZeroDeck Product Management Agent** as issuer/author.
- Owner approval is recorded separately and is never inferred.

## Format example

The example under `examples/` is only a schema/format fixture. It is not a ZeroDeck product decision, an approved requirement, or evidence of implemented behaviour.

## Current phase

Phase 1 — PM contract profile design: **complete**. Phase 2 — authentication/account requirements: **complete**. Phase 3 — authentication coverage across all 15 facets: **complete**. Phase 4 — MVP-01 manual file-analysis requirements: **complete** (28 requirements, 56 criteria, nine open questions; all remain PM-proposed). Phase 5 — MVP-02 quarantine and file disposition: **complete** (38 requirements, 68 criteria, 14 open questions; all remain PM-proposed). Phase 6 — MVP-03 website and link checking: **complete** (39 requirements, 39 criteria, four direct encodings of owner-approved scope, 35 PM-proposed requirements, 18 open questions, all 15 facets assessed, 75 failure/recovery scenarios and 19/19 targeted checks). See the [CIRCLES analysis](../2026-11-28/23-PHASE-6-CIRCLES-WEBSITE-LINK-CHECKING.md), [facet assessment](PHASE-6-MVP-03-FACET-COVERAGE.md), [failure matrix](PHASE-6-MVP-03-NEGATIVE-FAILURE-RECOVERY-MATRIX.md) and [validation](PHASE-6-MVP-03-VALIDATION.md). Next: Phase 7 — cross-cutting system requirements.
