# Index — scanner product design (2026-11-24)

Product design evidence for the Android Security Scanner, produced by the product-management
agent on the owner's "go". Per the owner's rules: everything here is **workspace evidence** —
nothing is a deliverable and nothing leaves this folder until the owner says so.

## Files, in reading order

| File | What it is |
|---|---|
| 01-decisions-digest.md | Every binding decision (D1–D18) with its source; the contract all other files cite |
| 02-product-brief.md | Product definition, users, goals, success metric, scope (MVP/later/refused), constraints |
| 03-user-journeys.md | Fourteen end-to-end journeys (J1–J14) including the critical threat-found path and the gated restore |
| 04-screens.md | Screen-by-screen designs for all eighteen screens (S1–S18) with states, verdict variations, and edge rules; the verdict contract table |
| 05-design-system.md | Colour (verdict palette), typography, verdict-card anatomy, components, voice rules, accessibility |
| 06-permissions.md | SAF-first permission posture, per-permission honest explanations, declined permissions, owner flags |

## Status

Complete for the MVP scope defined in the decisions digest. Built on: the RE engagement's
decision report (`download/security-scanner-oss-recon.docx`, §2.1/§10 record the owner's design
decisions), the RE engagement record (`re/scanner-prior-art/2026-11-24/`), and this workspace's
CIRCLES recommendation (`product-management/circles-2026-11-24.md`).

## Open items (owner decisions, recorded not assumed)

1. Engine Option A vs B (D9) — no screen impact; About/licence copy waits on it.
2. Google Safe Browsing daily quota — not proven; S14's indicator needs the configured limit.
3. Per-feed commercial-use rights — not proven; surfaced on S16, must be reviewed before launch.
4. Admin password-reset flow (S13) — no decision on record.
5. Audit-log retention length (S18) — no decision on record.
6. Whole-device scanning / distribution channel — flagged in 06-permissions.md.
7. The original design decisions document is not in the workspace; this design follows its
   content as recorded in the recon report. If re-shared, check 01-decisions-digest.md against
   it line by line.
