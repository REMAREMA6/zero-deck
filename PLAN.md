# Zerodek Reverse-Engineering Plan

**Project:** ZeroDeck — ethical-hacking and penetration-testing tool/platform (startup)  
**Repository:** REMAREMA6/zero-deck  
**Product reference:** https://github.com/lordwhitefire/Zerodek  
**Governing format:** https://github.com/REMAREMA6/software-rules  
**Plan version:** 1.0  
**Last updated:** 2026-11-27

## 1. Mission

Reverse-engineer the declared ZeroDeck MVP scope represented by the available product materials and produce an evidence-backed, technology- and stack-independent Software Rules specification. ZeroDeck is the broader ethical-hacking and penetration-testing startup; the Security Scanner materials represent one candidate service/capability area, not the startup's complete identity or scope. Do not assume every candidate capability belongs in the MVP.

The objective is not merely to reproduce the screens. The rules must describe all in-scope properties needed to reproduce the declared product scope. Do not begin application implementation as part of this engagement.

## 2. Repository roles

- **lordwhitefire/Zerodek:** product mock-screen/design reference. Treat the 17 screens as design evidence, not as a running application.
- **REMAREMA6/zero-deck:** agent workspaces, investigation records, plan, and tracker. Respect `RULES.md`; keep RE evidence in `re/`.
- **REMAREMA6/software-rules:** governing specification, schemas, evidence model, facet definitions, and validation/conformance requirements.
- **zero-deck/software-rules/:** final Zerodek-specific Software Rules deliverable, separate from RE working evidence, as explicitly designated by the owner.

## 3. Governing method

Follow the contribution and handoff pattern in the Software Rules repository. Before each resumed work session, read:

1. `REMAREMA6/software-rules/README.md`
2. `REMAREMA6/software-rules/PLAN.md`
3. `REMAREMA6/software-rules/TRACKER.md`
4. `REMAREMA6/software-rules/CONTRIBUTING.md`
5. The relevant active-task specifications, facet definitions, schemas, and conformance guidance named in this project's tracker.

Use the Software Rules 15 facets directly as the investigation and rule-organization structure. Do not create a parallel six-category taxonomy.

## 4. Evidence rules

- Mock screens establish visible design facts and may suggest intended interactions; they do not prove runtime, persistence, API, security, or backend behaviour.
- Source code supports source-derived claims about the inspected implementation; it does not prove Zerodek runtime behaviour.
- Keep runtime observations, source-derived inferences, declared intent, assumptions, and unknowns distinct.
- Every adopted rule must link to evidence and explain its relevance to the Zerodek capability.
- Record source repository, immutable commit/revision, file path, symbol or line range where available, licence, and inspection date.
- Do not infer that a capability is absent because it is not visible in a mockup.
- Do not claim replication sufficiency while relevant required properties remain unknown, unobserved, source-inferred only, conflicting, or otherwise unresolved.
- Respect the project ownership/authorization scope and the uploaded RE-agent safety constraints.

## 5. Work phases and exit gates

### Phase 0 — Governance and handoff
- [x] Read the Software Rules contribution workflow and adopt its plan/tracker/resumption pattern.
- [x] Establish this project plan, tracker, and contribution guide.
- [x] Link governance documents from the project README.
- [x] Record the current engagement understanding and active task.
**Exit gate:** a new chat can resume from repository records alone, without relying on private chat history.

### Phase 1 — Mockup inventory
- [x] Inspect and reconcile the 17-screen baseline, numbered Screen 18 extension, and additional routes/assets.
- [x] Record screen content, controls, stated states/interactions, navigation clues, responsive/layout details, and evidence limits.
- [x] Distinguish design intent, reference-image observations, source implementation, local/demo interactions, and unknowns.
- [x] Record source paths, route/preview/component mappings, asset dispositions, and stable screen evidence IDs.
**Exit gate: satisfied for the 17-screen baseline.** All 17 screens are inventoried and mapped; Screen 18 and two additional routes are separately recorded. Scanner-draft MVP/later/open labels are distinguished from ZeroDeck's still-unconfirmed startup MVP selection. See re/zerodek-product-re/2026-11-27/SCREEN-INVENTORY.md. This completes inventory only, not capability-level reverse engineering.

### Phase 2 — Capability and facet mapping
- [ ] Derive candidate capabilities and workflows from the complete screen inventory; separately establish which capabilities are selected for the MVP. Do not use the scanner repository materials to define the whole startup.
- [ ] Map each capability and required property to the applicable Software Rules facets.
- [ ] Identify cross-facet relationships, dependencies, states, and missing information.
- [ ] Define the declared Zerodek replication scope, exclusions, scenarios, and required-property inventory.
**Exit gate:** the startup direction, candidate capability set, and explicitly selected MVP scope are distinct; the MVP scenarios and property inventory are detailed enough to determine what evidence and source research are required.

### Phase 3 — Prior-art discovery and selection
- [ ] Audit existing reconnaissance records for relevance to Zerodek.
- [ ] Search for open-source implementations of the inventoried capabilities.
- [ ] Verify candidate repositories, source revisions, licences, maintenance, and feature fit.
- [ ] Record adopt/adapt/reference/reject decisions with reasons.
**Exit gate:** every selected source has a documented capability mapping and provenance; gaps are visible.

### Phase 4 — Source-level rule extraction
- [ ] Inspect relevant source files and trace each selected capability through its implementation.
- [ ] Extract conditions, decisions, state transitions, workflows, data constraints, persistence, interfaces, errors/recovery, security, integrations, configuration, and performance properties as applicable.
- [ ] Record exact repository, immutable revision, file path, symbol/line references, and evidence classification for every finding.
- [ ] Separate source-derived rules from any runtime-verified rules.
**Exit gate:** each rule claim is auditable and linked to the Zerodek capability and applicable facet; unsupported claims are removed or marked unresolved.

### Phase 5 — Software Rules synthesis
- [ ] Read and apply the current Software Rules core model, terminology, principles, evidence/provenance, source-derived-rule requirements, and facet specifications.
- [ ] Create the separate `software-rules/` deliverable.
- [ ] Express rules in technology-independent terms using the required common record model and typed facet payloads.
- [ ] Include scope, scenarios, coverage, evidence, provenance, unknowns, exclusions, and cross-facet links.
**Exit gate:** the deliverable follows the governing format and all rules remain traceable to evidence.

### Phase 6 — Completeness and conformance
- [ ] Review every facet applicable to the declared Zerodek scope.
- [ ] Review the required-property inventory for omissions, not merely completion percentages.
- [ ] Validate schemas, references, evidence links, and supported conformance checks.
- [ ] Resolve or explicitly retain every required unknown, conflict, and evidence gap.
- [ ] Produce a bounded completeness assessment and state exactly what is and is not replication-sufficient.
**Exit gate:** all in-scope required properties are sufficiently specified and supported, or the deliverable is explicitly marked incomplete with unresolved gaps. Never claim complete replication sufficiency prematurely.

## 6. Target project structure

```text
zero-deck/
├── README.md
├── RULES.md
├── PLAN.md
├── TRACKER.md
├── CONTRIBUTING.md
├── re/
│   └── zerodek-product-re/
│       └── YYYY-MM-DD/
│           ├── ENGAGEMENT-UNDERSTANDING.md
│           ├── screen-inventory/
│           ├── capability-mapping/
│           ├── source-research/
│           ├── source-analysis/
│           └── reports/
└── software-rules/
    └── ... # final product-specific rules, following the governing format
```

This is a target structure, not a requirement to create empty directories. Add files only when they have defined content and purpose. Keep evidence in the RE workspace; keep the final rules in the designated deliverable folder.

## 7. Change and decision control

- Update `TRACKER.md` whenever work starts, changes status, becomes blocked, or is completed.
- Update `PLAN.md` only when scope, phase sequence, deliverables, or exit gates change.
- Record consequential Zerodek investigation decisions in the RE workspace with stable IDs and evidence.
- Do not edit the separate Software Rules specification repository as part of this product engagement.
- Preserve existing project workspaces; do not copy another agent's evidence into the RE workspace.
- Do not mark a phase complete based only on a partial sample, successful tool call, or green validation run.

## 8. Resuming in a new chat

The repository is the persistent project record. A new chat must read, in order:

1. `README.md` and `RULES.md`.
2. `PLAN.md` for mission, phase sequence, and exit gates.
3. `TRACKER.md` for current phase, active task, completed work, blockers, and the single next action.
4. `re/zerodek-product-re/2026-11-27/ENGAGEMENT-UNDERSTANDING.md`.
5. The active-task files and the corresponding Software Rules documents named in the tracker.

If chat history conflicts with repository records, inspect the repository and resolve the discrepancy explicitly. The tracker is the operational source of truth for progress; the plan is the source of truth for intended scope and sequence.
