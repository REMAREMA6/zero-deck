# ZeroDeck — ethical-hacking and penetration-testing platform

ZeroDeck is a startup building a tool/platform for people involved in ethical hacking and penetration testing. This repository is the project record and agent working environment for reverse-engineering its declared product scope.

The current reference repository contains Security Scanner materials. Security scanning is one candidate service/capability area within ZeroDeck; it does not define the whole startup or automatically determine the launch MVP. The product scope is intentionally constrained for an MVP and should expand based on market observation.

Agent definitions (identities, skills, frameworks, and mental models) are intentionally kept outside this repository and provided to agents at runtime.

## Project navigation

- [Project plan](PLAN.md) — mission, phases, deliverables, and exit gates.
- [Project tracker](TRACKER.md) — current phase, active task, blockers, and next action.
- [Contribution and handoff guide](CONTRIBUTING.md) — required workflow for every contributor and resumed chat.
- [Standing project rules](RULES.md) — workspace ownership and deliverable boundaries.

## Workspaces

- `re/zerodek-product-re/` — ZeroDeck reverse-engineering engagement records.
  - [Engagement understanding](re/zerodek-product-re/2026-11-27/ENGAGEMENT-UNDERSTANDING.md).
  - [Phase 1 screen inventory](re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md).
  - [Phase 2 candidate capability inventory](re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md).
  - [Phase 2 capability-to-15-facet mapping](re/zerodek-product-re/2026-11-27/CAPABILITY-FACET-MAPPING.md).
  - [Owner-approved MVP scope decision](re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md).
  - [Pro-gated link-checking decision](re/zerodek-product-re/2026-11-27/PRO-GATED-LINK-CHECK-DECISION.md).
  - [Phase 3 prior-art audit and source-selection register](re/zerodek-product-re/2026-11-27/PHASE-3-PRIOR-ART-REGISTER.md).
  - [Phase 4 source-level rule extraction](re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md).
  - [Reference repository audit](re/zerodek-product-re/2026-11-27/REPOSITORY-AUDIT.md).
- [ZeroDeck-specific Software Rules](software-rules/README.md) — Phase 5 synthesis complete; the product capture remains incomplete and not replication-sufficient pending Phase 6.
- `re/oss-recon/` — earlier reconnaissance records. These were created for a separate Android Security Scanner engagement and must be audited before any content is reused for ZeroDeck.
- `product-management/` — product-management agent workspace and its own records.

## Product and specification references

- Product/reference repository: https://github.com/lordwhitefire/Zerodek
- Governing Software Rules specification: https://github.com/REMAREMA6/software-rules
- The ZeroDeck-specific Software Rules draft is maintained separately in this repository's `software-rules/` folder; see its README for maturity and completeness status.

## Resuming work

Read `README.md`, `RULES.md`, `PLAN.md`, and `TRACKER.md` first, then follow the active-task links in the tracker. The tracker is the operational source of truth for progress; the plan is the source of truth for scope and sequence.
