# ZeroDeck Product Rules

**Product:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Profile:** [Product Requirements Contract Profile](PROFILE.md)  
**Status:** Profile complete; feature contracts not yet authored.

## Contracts

| Contract | Capability | Status |
|---|---|---|
| Identity and authentication contract | Supporting account/authentication infrastructure | Not started; create in Phase 2 |
| Manual file-analysis contract | MVP-01 | Not started; create in Phase 4 |
| Quarantine and disposition contract | MVP-02 | Not started; create in Phase 5 |
| Website and link-checking contract | MVP-03 | Not started; create in Phase 6 |
| Cross-cutting system contract | Shared product/system requirements | Not started; create in Phase 7 |

## Authoring and validation

- The canonical profile is in [PROFILE.md](PROFILE.md).
- Validate each complete PM declared contract with [the PM record schema](schemas/zero-deck-pm-declared-contract.schema.json), and validate its nested metadata with [the PM extension schema](schemas/zero-deck-pm-requirements-extension.schema.json).
- See the [Phase 1 validation report](VALIDATION-REPORT.md) for the format fixture checks and their limitations.
- Use [the declared-contract template](templates/declared-contract.template.json), [the evidence template](templates/declared-contract-evidence.template.json), and [the format-only example](examples/declared-contract-format-example.json).
- Requirements are represented as Software Rules declared contracts, not runtime rules or source-derived rules.
- Every contract explicitly identifies **ZeroDeck Product Management Agent** as issuer/author.
- Owner approval is recorded separately and is never inferred.

## Format example

The example under `examples/` is only a schema/format fixture. It is not a ZeroDeck product decision, an approved requirement, or evidence of implemented behaviour.

## Current phase

Phase 1 — PM contract profile design: **complete**. Next: Phase 2 — research and author authentication/account requirements.
