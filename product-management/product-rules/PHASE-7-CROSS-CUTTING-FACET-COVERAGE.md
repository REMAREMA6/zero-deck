# Phase 7 — Cross-Cutting System Requirements: 15-Facet Coverage

**Scope:** Assessment of every official Software Rules facet in the pinned 0.3.0 Draft profile. This is a product-level applicability assessment, not implementation-conformance evidence.

| Official facet ID | Applicability | Assessment |
|---|---|---|
| `interface` | Applicable | Truthful platform differences, capability status, degraded states and user communication. |
| `behavior` | Applicable | Shared identity, authorization, lifecycle, idempotency and failure semantics. |
| `business-rules` | Applicable | Independent eligibility gates, account lifecycle and cross-capability policy invariants. |
| `data` | Applicable | Data purpose, minimization, lifecycle, diagnostics and export policy. |
| `persistence` | Applicable | Backend-managed state, recovery, audit and deletion propagation; local quarantine remains in MVP-02. |
| `api` | Applicable | Trusted authorization boundary, duplicate-request behaviour and external dependency contracts. |
| `messaging` | Conditional | Applies if system notifications, incident notices or cross-platform status messages are introduced; channel/delivery policy remains unresolved. |
| `identity-authentication` | Applicable | Same account principal across platforms; detailed authentication policy remains in its owning contract. |
| `authorization-permissions` | Applicable | Server-side protected decisions and independent Pro/activation gates. |
| `security-controls` | Applicable | Secret isolation, least disclosure, external response validation, release provenance and restore integrity. |
| `background-processing` | Conditional | Applies only if background jobs, scheduled maintenance, asynchronous provider work or backup processes are selected; no background architecture is required here. |
| `errors-recovery` | Applicable | Dependency failure, overload, restore, compatibility and truthful incomplete states. |
| `integrations` | Applicable | External dependency ownership, failure isolation, minimum disclosure and untrusted response handling. |
| `configuration` | Applicable | Fail-closed invalid operational configuration and environment separation. |
| `performance-resource-behavior` | Applicable | Bounded resource consumption and explicit overload response; numeric limits remain open. |

## Coverage integrity

- All 15 official facet IDs are represented exactly once.
- Conditional facets are not silently treated as irrelevant; triggering conditions and unresolved decisions are stated.
- No facet is declared globally not applicable to ZeroDeck.
- Capability-specific requirements remain in their owning contracts; this assessment covers shared obligations only.
- A later implementation must reassess conditional facets against selected architecture and actual behaviour.
