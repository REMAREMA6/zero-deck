# Standing rules

## Rule 1 — Evidence lives in its owning agent's workspace (added 2026-11-24, per owner)

Every piece of evidence must be stored in the workspace of the agent that produced it. No cross-workspace mixing; reference other workspaces by path/link instead of copying.

| Agent | Workspace | What belongs there |
|---|---|---|
| RE (reverse-engineering) agent | `re/<engagement>/<date>/` — e.g. `re/scanner-prior-art/2026-11-24/` | scope, samples, raw evidence (`evidence/`), analysis, engagement report |
| Product management agent | `product-management/` — e.g. `plan-2026-11-24.md`, `circles-2026-11-24.md` | plans, CIRCLES working records, recommendations, reasoning, decision records |

Consequences:
- RE findings cited in a PM document stay in `re/...`; the PM document cites the path, it does not duplicate the evidence.
- PM reasoning/method records never go into `re/...`.
- Outputs the owner designates as deliverables leave the workspace only on the owner's word (Rule 2).
- Anything found outside its workspace must be moved or re-referenced before a task is considered done.

## Rule 2 — The owner determines deliverables (added 2026-11-24; corrected per owner after initial draft)

A **deliverable** is anything the owner designates as such. The owner — never the agent — decides when, what, and whether something leaves the workspace.

- Until the owner says so, everything stays in its workspace: nothing is moved to `download/` (or anywhere else) on the agent's own judgment — not even polished, "deliverable-looking" outputs.
- When the owner names something as a deliverable, that specific thing is handed over (in this sandbox: placed in `download/`, or pushed to a GitHub repo when the owner asks).
- Workspaces hold records of how and why (evidence, analysis, reasoning, plans); deliverable-worthy outputs stay put inside them until the owner points at them.
- Distinguish deliverable code from tooling: code the owner asked for is a deliverable candidate; scripts that only generate documents or artifacts are tooling and stay in `scripts/` for re-running and patching.
- Test applied to every output: "Has the owner designated this as a deliverable?" No → it stays in its workspace. Yes → hand over exactly what was named.
