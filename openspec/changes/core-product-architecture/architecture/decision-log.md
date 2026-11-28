# Core Product Architecture — Decision Log

**Change:** `core-product-architecture`  
**Status:** Proposed by Architect; pending Product Owner review. No implementation authorization is implied.  
**Decision detail:** [design.md](../design.md)  
**Requirement mapping:** [requirement-traceability.md](requirement-traceability.md)  
**Deferred questions:** [open-decision-register.md](open-decision-register.md)

| ID | Decision | Status | Authority / rationale | Revisit condition |
|---|---|---|---|---|
| ZD-ARCH-001 | One shared account principal and server-authoritative identity/session state for Web and Android | Proposed | Owner-approved cross-platform identity and eight authentication decisions | Only if Product Owner changes shared identity policy |
| ZD-ARCH-002 | Modular monolith backend with explicit bounded modules | Proposed | Architecture choice to reduce MVP operational complexity while retaining testable boundaries | Measured scale, isolation or deployment evidence justifies extraction |
| ZD-ARCH-003 | PostgreSQL for core development and CI; Neon deferred | Owner-directed | Explicit working agreement | Separate integration-stage architecture and compatibility evidence |
| ZD-ARCH-004 | Local/on-device file analysis by default; no file-content upload in MVP | Owner-directed | Phase 9 owner-approved product direction | Separate Product Owner approval for any cloud-analysis capability |
| ZD-ARCH-005 | Analysis engine behind a platform-independent port; deterministic fake in core CI | Proposed | Enables local-first testing without selecting an unapproved engine/provider | Engine evaluation and owner approval |
| ZD-ARCH-006 | Device-local encrypted quarantine with platform-specific adapters; no content/key backup by default | Owner-directed boundary; mechanisms unresolved | Phase 9 product decisions and cross-platform capability constraints | Evidence or owner policy changes |
| ZD-ARCH-007 | Quarantine requires explicit confirmation; original removal is a separate user choice after verified copy | Owner-directed | Resolved Phase 9 questions QUAR-001 and QUAR-004 | Only a new owner decision |
| ZD-ARCH-008 | Web quarantine is enabled only for operations demonstrated by browser capability tests | Proposed implementation constraint | Web capability is not established by product documents; unknown is not assumed | Platform experiments prove or disprove a capability |
| ZD-ARCH-009 | URL reputation lookup is server-side through a provider port; no destination fetching/crawling | Owner-directed boundary | Resolved WEB-001, WEB-002, WEB-004 and owner link-checking gate rules | New Product Owner approval |
| ZD-ARCH-010 | Pro and owner activation are independent fail-closed gates checked immediately before provider dispatch | Owner-directed | Owner rules ZD-OWNER-003–006 and Phase 9 revocation invariant | Only a new owner decision |
| ZD-ARCH-011 | Deterministic fake provider in core stage; production provider selected later after terms/privacy/cost review | Proposed sequencing | No provider approved; external integrations deliberately deferred | Provider evaluation and owner approval |
| ZD-ARCH-012 | Raw URLs, file bytes, quarantine content/keys and full provider responses are not persisted by default | Owner-directed product boundary | Phase 9 adopted data-minimization decisions | Separate approved purpose/retention policy |
| ZD-ARCH-013 | Real PostgreSQL-backed CI; no SQLite/in-memory-only proof for persistence behaviour | Owner-directed | Working agreement requires PostgreSQL in development and CI | None for core stage |
| ZD-ARCH-014 | GitHub Actions is the command/test execution environment | Owner-directed | Owner does not run local terminal commands | None unless owner changes workflow |
| ZD-ARCH-015 | Developer Agent builds and tests continuously; no separate routine testing agent | Owner-directed | Working agreement | Independent Software Assurance Agent is a later whole-platform stage |

## Decision limitations

- "Owner-directed" means the boundary is explicitly present in the working agreement or an owner decision. It does not imply approval of every technical detail described nearby.
- "Proposed" means an Architect technical recommendation awaiting review. It is not a Product Owner decision until accepted.
- Framework, language, ORM, production analysis engine, provider, cryptographic algorithm, exact retention/quotas/resource budgets, legal obligations, SLOs, RTO/RPO and hosting details remain unselected.
- If an implementation choice would change a user-visible policy, data transfer, retention, authorization gate or product scope, it is not a routine Developer choice; return it to the Product Owner.
