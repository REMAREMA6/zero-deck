# Proposal

## Why

ZeroDeck's product design is closed, but the product has no first-party implementation or approved technical architecture yet. The project needs one traceable, testable architecture that turns the owner-approved MVP contracts into implementation work without silently converting provisional product material or deferred questions into decisions.

## What Changes

- Establish a platform-neutral system architecture for the shared ZeroDeck identity across Web and Android.
- Define the initial local-first core build around PostgreSQL, real PostgreSQL-backed development/CI tests, and no live hosted integrations.
- Define boundaries for identity and authorization, on-device file analysis, local quarantine, and gated URL reputation lookup.
- Record security, privacy, data ownership, failure, revocation, testing, and operational constraints.
- Map approved product requirements and owner decisions to architecture responsibilities and implementation work.
- Create an ordered Developer implementation plan with acceptance evidence and explicit decision gates.
- Keep unresolved product, platform, provider, security, legal, and operational questions visible; do not silently choose values or vendors.

## Capabilities

### New Capabilities

None. This change establishes the technical architecture and implementation plan for already-defined product behaviour. It does not introduce a new user-visible capability.

### Modified Capabilities

None. The five product contracts and owner decision records remain the authoritative behaviour baseline. Any proposed change to product behaviour must return to the Product Owner.

This change explicitly opts out of OpenSpec delta specs because it does not change product-level behaviour: `skip_specs: true` is set in this change's `.openspec.yaml`.

## Impact

- Planning records under `openspec/changes/core-product-architecture/` and `openspec/tasks-registry.md`.
- Future application modules, PostgreSQL schema, platform adapters, API boundaries, automated tests, and CI workflows, once implementation is separately authorized.
- No application code, production provider, hosted database, deployment target, or live integration is introduced by this architecture change.
