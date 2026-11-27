# Contributing to the Zerodek Reverse-Engineering Project

This guide adapts the working and handoff process in [REMAREMA6/software-rules/CONTRIBUTING.md](https://github.com/REMAREMA6/software-rules/blob/main/CONTRIBUTING.md) to this product investigation. The Software Rules repository remains the governing specification; this file governs changes to the Zerodek project records and deliverable.

## 1. Before making a change

1. Read this repository's `README.md`, `RULES.md`, `PLAN.md`, and `TRACKER.md`.
2. Read `re/zerodek-product-re/2026-11-27/ENGAGEMENT-UNDERSTANDING.md`.
3. Read the active task's relevant Software Rules specifications, facet documents, schemas, and conformance guidance.
4. Check existing evidence and decisions before repeating work.
5. Keep work within the active phase unless a dependency requires an explicit plan update.
6. Do not turn an unverified assumption into a product requirement.

## 2. Evidence and investigation

- Distinguish mockup-visible facts, declared product intent, source-derived inferences, runtime observations, assumptions, and unknowns.
- A mock screen does not prove backend or runtime behaviour.
- Source code supports claims about the inspected source implementation; it does not prove Zerodek runtime behaviour.
- Record exact source repository, immutable revision, file path, symbol/line range where available, licence, and the capability/facet the source supports.
- Use the 15 Software Rules facets directly; do not create a parallel six-category taxonomy.
- Preserve the distinction between runtime rules, source-derived rules, and declared contracts.
- Do not claim replication completeness while in-scope required properties remain unresolved.

## 3. Workspace and deliverable boundaries

- Keep reverse-engineering evidence and analysis under `re/zerodek-product-re/`.
- Keep the final product-specific Software Rules deliverable under the separately designated root `software-rules/` folder.
- Respect `RULES.md`: do not mix or relocate another agent's workspace records; cross-reference them where relevant.
- Do not edit the separate `REMAREMA6/software-rules` specification repository as part of this engagement.

## 4. Recording progress and decisions

- Update `TRACKER.md` whenever work starts, changes status, becomes blocked, or is completed.
- Keep the current phase, active task, completed work, blockers, and one next action explicit.
- Update `PLAN.md` only when scope, phase sequence, deliverables, or exit gates change.
- Record consequential investigation decisions in the owning RE workspace with stable identifiers and supporting evidence.
- Do not mark a phase complete until its documented exit gate is met.
- Verify GitHub writes and links before reporting success.

## 5. Review checklist

Before treating a task as complete, check:

- Does the work satisfy the active task and its exit gate?
- Are facts, inferences, assumptions, and unknowns distinguishable?
- Are all claims traceable to evidence?
- Are source revisions and licences recorded?
- Are applicable Software Rules facets and cross-facet relationships addressed?
- Are limitations, unresolved questions, and exclusions explicit?
- Are repository paths and links correct?
- Has the tracker been updated?

## 6. Handoffs between chats or contributors

The repository is the persistent project record. A new contributor or chat must be able to resume by reading `README.md`, `RULES.md`, `PLAN.md`, `TRACKER.md`, the engagement understanding, and the active-task documents named by the tracker. Do not rely on chat history as the progress record.

At the end of a session, update the tracker with the exact current state and a single clear next action.
