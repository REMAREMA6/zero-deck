# Repository Baseline — Developer Inspection

**Inspection date:** 2026-11-28  
**Branch inspected:** automation/openspec-bootstrap  
**Implementation branch:** developer/core-product

## Observed state

- The repository is a project-record and agent-workspace repository, not an existing application repository.
- Root contains governance/project records, product-management/, software-rules/, re/, openspec/, scripts/ and GitHub Actions workflows.
- No existing application source tree, package manifest, workspace manifest, lockfile, backend, Web app, Android app or PostgreSQL migration set was present at the root or in the inspected project directories.
- Existing GitHub Actions workflows cover OpenSpec preparation/validation and prior reverse-engineering/Software Rules work; no first-party application CI existed.
- The product design reference and prior-art repositories are evidence sources, not first-party runtime code and not automatic permission to copy third-party implementation.

## Authoritative architecture constraints read

- openspec/changes/core-product-architecture/design.md
- openspec/changes/core-product-architecture/tasks.md
- openspec/changes/core-product-architecture/architecture/developer-handoff.md
- openspec/changes/core-product-architecture/architecture/requirement-traceability.md
- openspec/changes/core-product-architecture/architecture/decision-log.md
- openspec/changes/core-product-architecture/architecture/open-decision-register.md
- openspec/WORKING-AGREEMENT.md

## Product authority sources read

- product-management/2026-11-28/40-ARCHITECTURE-HANDOFF.md
- product-management/2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md
- Five canonical contracts under product-management/product-rules/contracts/
- Phase 9 owner-decision and question-disposition registers
- RULES.md, README.md, PLAN.md and TRACKER.md

## Important authority distinction

The eight authentication decisions and explicit owner-approved MVP invariants are authoritative within their recorded scope. The five contracts contain mixed authority: many requirements are PM-proposed. Do not implement PM-proposed user-visible policy as if it were owner-approved. Use the architecture traceability and decision registers for authority. Deferred questions remain release gates.

## Implementation baseline

The Developer is starting from an empty first-party application surface. The first vertical slice must establish a reproducible monorepo, backend boundary, PostgreSQL migrations and CI before user-facing capabilities are built.
