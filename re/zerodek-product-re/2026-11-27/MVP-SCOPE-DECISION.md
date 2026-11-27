# ZeroDeck MVP Scope Decision

**Decision ID:** ZD-SCOPE-001  
**Decision date:** 2026-11-27  
**Status:** Owner-approved  
**Authority:** Explicit owner instruction in the Phase 2 working session.  
**Applies to:** First ZeroDeck launch MVP and this reverse-engineering engagement's declared replication scope.

## Decision

ZeroDeck's first MVP is limited to exactly these three capabilities:

1. **Manual file security analysis** — a user selects a file and requests a manual security scan.
2. **Quarantine and file disposition** — handle confirmed threats and the associated review, restore and deletion workflows defined by the approved requirements.
3. **Website and link checking** — a user submits a website URL/link for a security/reputation check and receives a bounded result.

This adopts the three-capability slice from the scanner working draft as the first MVP. It does not redefine ZeroDeck as only an Android scanner. ZeroDeck remains the broader ethical-hacking and penetration-testing startup/platform; this is its deliberately constrained starting product scope.

## Deferred candidate: IP address tracking

A stakeholder stated that IP tracking should be a feature. The owner wants it recorded for future consideration, but explicitly does not want it in the MVP. The exact intended capability is not yet understood or specified. Possible meanings include observing source/destination IPs in assessment traffic, recording IPs associated with events, or investigating IP ownership/reputation; none is approved as the intended product behaviour.

Therefore:
- Record IP address tracking/investigation as future candidate CAP-13.
- Exclude it from MVP requirements, scenarios, implementation and completeness obligations.
- Do not silently interpret it as IP scanning, geolocation, attribution of a person, or network discovery.
- Revisit only during later product discovery with a defined user, purpose, authorized data source, boundaries, outputs and privacy/security constraints.

## Explicit MVP exclusions

The following are not independent MVP capabilities: scan history as a standalone feature; user/admin account management; public admin portal; threat-indicator administration; help-content CMS; service health/audit dashboard; automatic/background protection; browser extension; device privacy audit; and IP address tracking. Cross-cutting requirements necessary to safely and faithfully deliver the three selected capabilities remain applicable where evidenced (for example, permission handling, privacy disclosure, error recovery and performance).

## Scope interpretation and evidence limits

- The broader ZeroDeck product direction remains open for future capability discovery.
- The current product reference repository and scanner working draft are evidence sources, not runtime proof.
- The scanner working draft is an adopted requirements source for the selected three capabilities only to the extent of what it actually documents.
- Unspecified thresholds, engines, providers, persistence, APIs, data fields, security mechanisms, configuration values and performance targets remain unknown until investigated.
- The decision freezes scope; it does not claim that the three capabilities have been fully reverse-engineered or that the current materials are sufficient to reproduce them.

## Consequences for project phases

- Phase 2 may exit with the bounded MVP scope, exclusions and 15-facet investigation map recorded.
- Phase 3 selects prior art only for the three MVP capabilities and their evidenced dependencies.
- Phases 4–6 must resolve the required property inventory and evidence gaps. The MVP cannot be called replication-sufficient while relevant required properties remain unresolved.


## Subsequent owner decision — Pro-gated link checking

**Related decision:** [ZD-DEC-2026-11-27-02](PRO-GATED-LINK-CHECK-DECISION.md).

Website and link checking remains in MVP-03, but access is restricted to users with the Pro entitlement. The owner will keep the feature locked/disabled until paid-user revenue can fund its operating and API costs, then explicitly activate it. Do not make link-check API calls for non-Pro users or while the owner-controlled feature switch is off. The Pro entitlement and feature activation switch are separate conditions.

This changes the capability's availability and commercial activation conditions; it does not remove website/link checking from the MVP scope. Pro pricing, entitlement lifecycle, usage allowance, activation threshold and final provider procurement remain unspecified.

This is owner-declared product intent, not observed runtime behaviour. See the Phase 3 prior-art register for the selected Web Risk Lookup API reference and its cost/privacy constraints.
