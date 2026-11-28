# Developer Workspace

This workspace belongs exclusively to the ZeroDeck Developer Agent.

It records the Developer's task briefs, repository observations, implementation breakdowns, execution plans, verification notes and completion reports. It does not replace Architect-owned outcome-level plans under openspec/.

**Boundary rule:** this workspace is for agent evidence artifacts, not the product's source-code home. The actual ZeroDeck implementation belongs in the product repository's normal application and package directories. The working software is a product deliverable; it is not a Developer workspace artifact. A deliverable may be inside or outside an agent workspace depending on its nature. See [Workspace and Deliverable Separation](notes/workspace-and-deliverable-separation.md).

## Structure

- briefs/ — one brief per authorized implementation outcome.
- notes/ — repository state, dependencies, technical findings and verification notes.
- plans/ — Developer-owned decomposition and engineering execution plans.
- tasks/ — executable task checklist and checkpoints.
- reports/ — factual implementation and verification reports.

The Architect owns architecture and outcome-level acceptance contracts. The Developer owns the detailed breakdown, implementation method, code and continuous testing.
