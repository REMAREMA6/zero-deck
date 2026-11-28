# ZeroDeck OpenSpec Tasks Registry

**Purpose:** Project-level index of architecture and implementation work recorded in OpenSpec. Detailed acceptance criteria and task checkboxes remain in each change's `tasks.md`.

**Current branch:** `automation/openspec-bootstrap`  
**Current change:** `core-product-architecture`  
**Status:** Architecture proposal drafted; awaiting validation and Product Owner review. No application implementation is authorized.

| Work ID | Workstream | OpenSpec location | Status | Owner / next action | Exit evidence |
|---|---|---|---|---|---|
| ZD-ARCH-CORE | Core product architecture and Developer implementation plan | `openspec/changes/core-product-architecture/` | Draft — pending OpenSpec validation and owner review | Architect validates artifacts and presents handoff; Product Owner reviews/approves | Validated proposal/design/tasks, requirement traceability, decision log, open-decision register and owner disposition |
| ZD-CORE-FOUNDATION | Core repository, modular backend boundary and PostgreSQL foundation | `core-product-architecture/tasks.md` §2 | Not started — owner authorization required | Developer after architecture approval | PostgreSQL migrations, CI workflow, real PostgreSQL integration evidence, deterministic test adapters |
| ZD-CORE-IDENTITY | Shared identity, authentication and authorization | `core-product-architecture/tasks.md` §3 | Not started — owner authorization required | Developer after architecture approval | Cross-platform identity/session tests, fail-closed authorization and revocation evidence |
| ZD-CORE-FILE | MVP-01 manual file analysis | `core-product-architecture/tasks.md` §4 | Not started — owner authorization and engine/platform evidence gates | Developer; Architect resolves architectural findings | Local-only analysis evidence, engine evaluation, four-outcome mapping, platform support matrix |
| ZD-CORE-QUARANTINE | MVP-02 quarantine and file disposition | `core-product-architecture/tasks.md` §5 | Not started — owner authorization and cryptographic/platform policy gates | Developer; Architect coordinates unresolved decisions | Verified local encrypted storage, explicit confirmation, restore/deletion/recovery tests |
| ZD-CORE-WEB | MVP-03 website/link checking | `core-product-architecture/tasks.md` §6 | Not started — owner authorization; fake provider only in core stage | Developer; Product Owner approves production provider/cost policy later | Consent and independent gate tests; zero calls when denied; fake provider tests |
| ZD-CORE-ASSURANCE | Cross-platform core exit validation | `core-product-architecture/tasks.md` §7 | Not started — after core implementation | Developer provides continuous evidence; later independent Software Assurance Agent by owner | E2E, security, privacy, performance, recovery and core-stage completion report |
| ZD-INTEGRATIONS | Hosted integrations and deployment (Neon, Vercel, approved providers) | Separate future OpenSpec change — not yet created | Deferred until core is working and tested | Architect updates architecture after core-stage evidence and owner authorization | Integration plan, secrets/configuration, deployment, rollback and live verification |

## Registry rules

- This registry is an index, not a second source of detailed task truth.
- Detailed tasks, acceptance criteria, verification methods and evidence requirements belong in the linked OpenSpec change.
- Status is updated only when supported by repository artifacts or test evidence.
- Developer implementation and its tests are one continuous responsibility; do not create a separate routine test-agent workstream.
- The Architect owns architectural changes discovered during implementation; the Developer raises material conflicts rather than silently changing architecture.
- Hosted integrations do not begin until core-stage exit evidence exists and the owner authorizes the next stage.
- Do not merge the architecture branch to `main` or begin implementation without the owner's explicit authorization.
