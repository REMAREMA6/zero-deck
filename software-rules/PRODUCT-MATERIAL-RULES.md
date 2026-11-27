# ZeroDeck MVP — Product-Material Workflow Rules

**Maturity:** Draft / provisional pending owner confirmation  
**Evidence class:** Product-material-derived; not runtime-observed  
**Authority boundary:** These rules are extracted from the inspected scanner product decisions and Phase 2 capability mapping. The owner-approved MVP decision selects the three capabilities; it does not automatically approve every implementation detail or unstated threshold in the scanner material.

## MVP-01 — Manual file security analysis

| Rule ID | Product-material rule | Current status / gap |
|---|---|---|
| PM-FILE-001 | A user selects a file and explicitly requests a manual security scan. | Workflow is in MVP scope; supported file types, size limits, access mechanism and platform scope remain unknown. |
| PM-FILE-002 | The result model must distinguish confirmed threat, suspicious, no known threat and unable-to-decide/inconclusive outcomes where supported by the product material. | Exact taxonomy, criteria, confidence and evidence remain unresolved. Do not substitute Hypatia's “Potential match” as ZeroDeck's verdict taxonomy. |
| PM-FILE-003 | The result must not claim that a file is safe merely because no known indicator matched. | Product-material safety boundary; exact wording and detection coverage remain unresolved. |
| PM-FILE-004 | Unsupported, inaccessible, interrupted and engine-failure cases must not be reported as successful scans. | Scenario branches are required for investigation; exact state model and recovery remain unresolved. |

## MVP-02 — Quarantine and file disposition

| Rule ID | Product-material rule | Current status / gap |
|---|---|---|
| PM-QUAR-001 | A confirmed threat is eligible for quarantine when the platform permits the required isolation operation. | Confirmation criteria and actual isolation mechanism remain unresolved. |
| PM-QUAR-002 | Suspicious or inconclusive files must follow a review/rescan path rather than an unsupported destructive action. | Exact user choice, confirmation and policy remain unresolved. |
| PM-QUAR-003 | Restore requires the documented fresh-scan and user-confirmation preconditions. | Exact fresh-scan meaning, timing, provider and failure behaviour remain unresolved. |
| PM-QUAR-004 | Permanent deletion must report the actual operation outcome truthfully. | Provider deletion guarantees, secure-delete semantics and verification remain unresolved. |
| PM-QUAR-005 | A failed or partial quarantine/restore/delete operation must not be represented as completed successfully. | Recovery state, rollback/compensation and audit effect remain unresolved. |

## MVP-03 — Website and link checking

| Rule ID | Product-material rule | Current status / gap |
|---|---|---|
| PM-LINK-001 | A user submits a URL/link for a security or reputation check. | Accepted schemes, parsing and normalization remain unresolved. |
| PM-LINK-002 | The result must distinguish likely dangerous, no known threat and unable-to-decide/inconclusive outcomes where supported by product material. | Exact taxonomy and provider-to-product mapping remain unresolved. |
| PM-LINK-003 | A no-known-threat result is not a guarantee that the URL or website is safe. | Product-material safety boundary; exact user-facing wording remains unresolved. |
| PM-LINK-004 | A single URL check must not be described as a complete inspection of the entire website unless the actual workflow establishes that scope. | Redirect handling and inspection scope remain unresolved. |
| PM-LINK-005 | Invalid input, redirect, timeout and unavailable-provider outcomes must be distinguishable from a successful no-threat result. | Exact state and error mapping remain unresolved. |

## Important separation

- These are workflow-level product-material rules, not runtime rules.
- The Phase 4 Hypatia implementation is prior art only. Its hash algorithms, Bloom filters, database readiness rules and “Potential match” text are not ZeroDeck requirements.
- The Android SAF and Keystore documents constrain possible quarantine implementations but do not select one.
- Google Web Risk is a provider-contract reference only; no production provider is approved.
- The owner-declared Pro and activation rules are in [OWNER-RULES.md](OWNER-RULES.md), not inferred from provider documentation.
