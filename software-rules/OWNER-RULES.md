# Owner-Declared ZeroDeck Rules

**Maturity:** Draft  
**Authority:** Owner decisions recorded 2026-11-27  
**Evidence class:** Declared contract / owner-declared intent, not runtime observation

These are the only normative product decisions in this file. Product-material workflows and prior-art implementation details are kept separate.

| Rule ID | Facet(s) | Owner-declared rule | Authority |
|---|---|---|---|
| ZD-OWNER-001 | Behaviour, Business Rules, Configuration | The first ZeroDeck MVP contains exactly MVP-01 manual file security analysis, MVP-02 quarantine/file disposition, and MVP-03 website/link checking. | ZD-SCOPE-001 |
| ZD-OWNER-002 | Scope / Configuration / Behaviour | IP address tracking/investigation is a future candidate and is excluded from MVP requirements, scenarios, implementation, and completeness obligations. | ZD-SCOPE-001 |
| ZD-OWNER-003 | Identity and Authentication, Business Rules, Authorization and Permissions | Website/link checking requires the user to have Pro entitlement. | ZD-DEC-2026-11-27-02 |
| ZD-OWNER-004 | Configuration, Behaviour | Website/link checking remains disabled until the owner explicitly activates the owner-controlled feature switch when paid-user revenue can fund its operating/API costs. | ZD-DEC-2026-11-27-02 |
| ZD-OWNER-005 | Behaviour, Integrations, Security Controls | No provider/API lookup for link checking may occur when the user lacks Pro entitlement or while the owner-controlled feature switch is disabled. Both gates must allow the operation. | ZD-DEC-2026-11-27-02 |
| ZD-OWNER-006 | Business Rules, Configuration | Pro entitlement does not provide unlimited link checks. Usage allowances/quotas and budget controls are required, but exact values and policies remain unresolved. | ZD-DEC-2026-11-27-02 |

## Interpretation

- The Pro entitlement and owner activation switch are separate conditions; one must not be treated as a proxy for the other.
- The gate decision does not establish the account/principal model, entitlement source, enforcement location, subscription lifecycle, quota values, pricing, activation threshold, or activation date.
- The owner decisions establish intended product scope and access policy, not actual runtime enforcement.
- The owner has not approved a production link-reputation provider. Google Web Risk remains a researched reference only.
