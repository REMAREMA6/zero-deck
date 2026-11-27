# ZeroDeck MVP — Scope and Boundary

**Maturity:** Draft  
**Scope decision:** ZD-SCOPE-001, owner-approved 2026-11-27  
**Related decision:** ZD-DEC-2026-11-27-02, Pro-gated link checking

## 1. Product identity

ZeroDeck is the broader startup/product direction for ethical-hacking and penetration-testing tools. The available product reference is scanner-oriented; it does not define the whole startup. This specification covers only the first owner-approved MVP slice.

## 2. Included scope

The first MVP contains exactly these capabilities:

| ID | Capability | In-scope user outcome |
|---|---|---|
| MVP-01 | Manual file security analysis | User selects a file and requests a manual security scan; the system returns a bounded result. |
| MVP-02 | Quarantine and file disposition | Handle confirmed threats and associated review, restore and deletion workflows defined by the approved product requirements. |
| MVP-03 | Website and link checking | User submits a website URL/link for a security/reputation check and receives a bounded result. Access and execution are subject to the two independent gates below. |

### 2.1 MVP-03 independent gates

1. **Entitlement gate:** the user must have Pro entitlement.
2. **Owner activation gate:** the owner-controlled feature switch must be enabled.

A provider lookup MUST NOT be made if either condition is false. Pro entitlement does not imply unlimited checks. Usage limits and budget controls are required before activation, but their values are not yet specified.

The capability remains part of MVP even while disabled. The activation switch controls availability; it does not change MVP membership.

## 3. Excluded and deferred scope

- **IP address tracking/investigation (CAP-13):** future candidate only; explicitly excluded from MVP. Its purpose, actor, authorized data source, boundaries, outputs, and privacy/security constraints remain undefined. Do not interpret it as IP scanning, geolocation, attribution, or network discovery.
- Scan history as a standalone capability.
- User/admin account management and public admin portal.
- Threat-indicator administration.
- Help-content CMS.
- Service health/audit dashboard.
- Automatic/background protection.
- Browser extension.
- Device privacy audit.
- Any additional penetration-testing capability not evidenced and approved.

Some cross-cutting properties (such as platform permissions, privacy, error handling, security controls, and performance) remain relevant when necessary to reproduce the three included capabilities. An excluded standalone feature does not exclude a necessary cross-cutting property.

## 4. System boundary

The exact deployed boundary is not established. The target may include a client application and any services/providers actually required by the selected workflows, but no backend, cloud service, database, identity provider, message broker, or scanning vendor is assumed by this document.

The Web Risk Lookup API is a Phase 3 prior-art/provider-contract reference only. It is not a final production-provider selection or procurement approval. Android storage/SAF/Keystore documentation is platform constraint evidence, not proof that ZeroDeck is Android-only or that a particular quarantine design is implemented.

## 5. Replication boundary and maturity

The replication target is the three-capability MVP, including all material states, branches, cross-cutting properties, and relevant platform/environment conditions once established. The 15 facets are investigation perspectives; conditional facets become required when the actual target behaviour establishes their relevance.

This scope is frozen. The property inventory is not complete. No ZeroDeck runtime capture, deployed build identity, or independent replica has been examined. Therefore this specification is explicitly **incomplete and not replication-sufficient** pending Phase 6 completeness/conformance review and further evidence collection.
