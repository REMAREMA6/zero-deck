# ZeroDeck Software Rules

**Maturity:** Draft — product-specific synthesis, Phase 5  
**Governing specification:** Software Rules 0.3.0 Draft  
**Governing schema:** 0.2.0 Draft (JSON Schema 2020-12; reserved v1 namespace)  
**Declared scope:** ZeroDeck first MVP — exactly three capabilities  
**Status:** In progress; not replication-sufficient

## Purpose

This directory contains the product-specific, technology-independent rule specification for the owner-approved ZeroDeck MVP. It is a separate deliverable from the reverse-engineering evidence workspace.

The specification describes the properties that an independent implementation must reproduce. It does not prescribe a programming language, framework, database, deployment model, or vendor unless an owner-approved decision or adequate evidence requires it.

## Start here

1. [Scope and authority](SCOPE.md)
2. [Capability scenarios](SCENARIOS.md)
3. [Owner-declared rules](OWNER-RULES.md)
4. [Product-material workflow rules](PRODUCT-MATERIAL-RULES.md)
5. [15-facet property map](FACET-MAP.md)
6. [Typed facet payload mapping](PAYLOAD-MAPPING.md)
7. [Scenario-level property inventory](PROPERTY-INVENTORY.md)
8. [Evidence and provenance register](EVIDENCE.md)
9. [Open required properties](OPEN-PROPERTIES.md)
10. [Rule traceability register](RULE-TRACEABILITY.md)
11. [Machine-readable capture](capture.json)

## Authority and evidence classes

- **Owner-declared:** explicit owner decisions defining the MVP and link-checking gate.
- **Product-material:** requirements/workflow details in the inspected ZeroDeck scanner materials; only adopted to the extent explicitly recorded in the Phase 2 inventory and scenario map.
- **Source-derived prior art:** inspected implementations used to understand possible rule patterns. These are not automatically ZeroDeck requirements.
- **Platform/provider contract:** official Android and Google Web Risk documentation. These constrain possible implementations but do not prove ZeroDeck behaviour or select a production provider.
- **Runtime-observed:** none yet. No deployed ZeroDeck target was available or exercised in Phases 1–4.
- **Unknown:** any property not established by the evidence. Unknown is not false, absent, safe, or not applicable.

## Governing rules

This deliverable follows the governing core model's separation of scenarios, executions, observations, runtime rules, source-derived rules, declared contracts, evidence, coverage, and replication completeness. See [Software Rules core model](https://github.com/REMAREMA6/software-rules/blob/main/specification/CORE.md), [evidence and provenance](https://github.com/REMAREMA6/software-rules/blob/main/specification/EVIDENCE-AND-PROVENANCE.md), [source-derived rules](https://github.com/REMAREMA6/software-rules/blob/main/specification/SOURCE-DERIVED-RULES.md), and [Replication Completeness Rule](https://github.com/REMAREMA6/software-rules/blob/main/specification/REPLICATION-COMPLETENESS.md).

## Scope guardrails

- MVP-01: manual file security analysis.
- MVP-02: quarantine and file disposition.
- MVP-03: website and link checking, restricted to Pro entitlement and separately gated by an owner-controlled activation switch.
- IP address tracking/investigation is a future candidate and explicitly excluded from this MVP.
- Do not add account management, admin portal, scan history, automatic/background protection, browser extension, device privacy audit, or other unapproved candidates as MVP requirements.
- Do not turn Hypatia, Android SAF, or Web Risk implementation details into ZeroDeck rules without explicit product adoption.
- Do not claim replication sufficiency while required properties remain unknown, unobserved, source-inferred only, conflicting, or otherwise unresolved.

## Phase 5 status

The initial product scope and owner rules are being synthesized. Scenario definitions and the facet/property inventory are being mapped to the governing schema. Phase 6 will independently audit completeness and conformance; this directory currently makes no claim of completeness.
