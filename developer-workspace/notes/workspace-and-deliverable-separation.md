# Workspace and Deliverable Separation

**Status:** Owner correction — governing Developer Agent working rule  
**Recorded:** 2026-11-28  
**Applies to:** ZeroDeck Developer Agent and its future implementation work

## Owner's correction

An agent's workspace is the agent's own working area. It exists to hold evidence artifacts documenting the agent's work. It is not the product's source-code home and must not be confused with the product being built.

A deliverable is the tangible outcome produced by the work. A deliverable may be located inside an agent workspace or outside it, depending on the nature of the deliverable.

## Required separation

### Developer Agent workspace

Use `developer-workspace/` for evidence and accountability artifacts, including:

- task briefs and implementation breakdowns;
- repository observations and technical investigations;
- engineering plans and decision records;
- progress notes and checkpoints;
- test reports, verification evidence and known limitations;
- completion and handover reports.

These artifacts explain what the Developer did, why, and what evidence supports claims of completion.

### ZeroDeck product repository

The actual product implementation belongs in the product's normal source locations, including (as applicable):

- `apps/api/`
- `apps/web/`
- `apps/android/`
- `packages/`
- product-level configuration, migrations, tests and deployment assets in their appropriate project locations.

Do not place the main application source code or product components inside `developer-workspace/` merely because the Developer Agent created them.

### Deliverables

The working ZeroDeck software is the primary product deliverable. It belongs in the ZeroDeck product repository and its intended release/deployment locations, not inside the Developer Agent's evidence workspace.

Other deliverables may be documents, reports, packages or other outputs. Their correct location depends on the deliverable itself; they are not automatically workspace artifacts.

## Operating rule

Keep the three concepts distinct:

1. **Workspace:** where the agent works and leaves evidence of its work.
2. **Product:** the software or other thing being built; its implementation belongs in the product's own project structure.
3. **Deliverable:** the completed output handed over to the owner; it may be inside or outside the agent workspace.

Before creating a file, identify whether it is:
- an agent evidence artifact;
- part of the product implementation; or
- a final deliverable.

Place it accordingly. Do not use the Developer Agent workspace as a substitute for the product repository, and do not claim a deliverable exists merely because a workspace report describes it.

## Required compliance

- Maintain evidence artifacts in `developer-workspace/`.
- Keep product source code in the ZeroDeck project directories.
- Link evidence reports to the relevant product paths, commits and CI runs where available.
- Report deliverables separately from workspace evidence.
- Never merge into `main` without explicit owner approval.
