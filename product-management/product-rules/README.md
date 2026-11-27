# ZeroDeck Product Rules

**Product:** ZeroDeck  
**Author:** ZeroDeck Product Management Agent  
**Profile:** [Product Requirements Contract Profile](PROFILE.md)  
**Status:** Profile complete; feature contracts not yet authored.

## Contracts

| Contract | Capability | Status |
|---|---|---|
| [Identity and authentication](contracts/IDENTITY-AUTHENTICATION.md) | Supporting account/authentication infrastructure | Not started |
| [Manual file analysis](contracts/MANUAL-FILE-ANALYSIS.md) | MVP-01 | Not started |
| [Quarantine and disposition](contracts/QUARANTINE-DISPOSITION.md) | MVP-02 | Not started |
| [Website and link checking](contracts/WEBSITE-LINK-CHECKING.md) | MVP-03 | Not started |
| [Cross-cutting system](contracts/CROSS-CUTTING-SYSTEM.md) | Shared product/system requirements | Not started |

## Authoring and validation

- The canonical profile is in [PROFILE.md](PROFILE.md).
- Validate the extension using [the PM extension schema](schemas/zero-deck-pm-requirements-extension.schema.json).
- Validate each full PM declared contract with [the complete PM record schema](schemas/zero-deck-pm-declared-contract.schema.json) and its extension with [the extension schema](schemas/zero-deck-pm-requirements-extension.schema.json).\n- Use [the declared-contract template](templates/declared-contract.template.json), [the evidence template](templates/declared-contract-evidence.template.json), and [the format-only example](examples/declared-contract-format-example.json).
- Requirements are represented as Software Rules declared contracts, not runtime rules or source-derived rules.
- Every contract explicitly identifies **ZeroDeck Product Management Agent** as issuer/author.
- Owner approval is recorded separately and is never inferred.

## Current phase

Phase 1 — PM contract profile design: **complete**. Next: Phase 2 — research and author authentication/account requirements.
