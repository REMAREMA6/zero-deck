# Zerodek Reverse-Engineering Engagement — Understanding and Direction

**Recorded:** 2026-11-27  
**Workspace:** `re/zerodek-product-re/`  
**Status:** Engagement understanding recorded; investigation not yet completed.

## 1. Assignment

This engagement is the reverse-engineering work for the Zerodek product. The agent's task is to determine, from the supplied mockup screens and carefully selected open-source implementations, the complete software rules needed to build the product.

The agent is **not being asked to build another reverse-engineering agent**, and this engagement is **not application implementation**. The agent is to perform the reverse-engineering work and produce a Software Rules deliverable.

The Whitefire Zerodek repository is a **mock-screen/design reference**. It is not an already implemented product whose backend or runtime behaviour can be inspected. Do not describe its mock screens as a functioning application or claim that backend behaviour has been observed there.

## 2. The three repositories and their distinct roles

| Repository | Role in this engagement |
|---|---|
| [lordwhitefire/Zerodek](https://github.com/lordwhitefire/Zerodek) | Primary product reference. Inspect the mock screens, screen structure, visible elements, and intended feature set. Derive what capabilities the complete product needs. |
| [REMAREMA6/zero-deck](https://github.com/REMAREMA6/zero-deck) | Project repository and home of this agent's working records under `re/`. It also contains earlier reverse-engineering work that must be inspected and continued where valid, not blindly repeated. |
| [REMAREMA6/software-rules](https://github.com/REMAREMA6/software-rules) | Governing specification for the final Software Rules deliverable. Follow its terminology, evidence model, facet structure, schemas, completeness requirements, and validation/conformance guidance. |

These repositories are not interchangeable. The Whitefire repository supplies the product's mockup reference; the Remarema6 Zerodek repository holds the project and investigation records; Software Rules defines the required form and standard for the deliverable.

## 3. Required investigation pipeline

The work proceeds in this order:

1. **Inspect the mockup completely.** Inventory all screens and their visible elements. Record navigation, controls, displayed information, states, and interactions that can be established from the mockup. Distinguish what is visibly present from what is inferred.
2. **Build the feature and capability inventory.** Determine the underlying capabilities required to make the represented product work, not merely reproduce its static appearance. Use the facets defined by the governing Software Rules specification as the investigation structure. Do not introduce a separate six-layer taxonomy alongside those facets.
3. **Review existing engagement work.** Inspect the existing `re/` records, including `re/MISSION.md` and `re/oss-recon/`. Validate what has already been done, preserve useful evidence, identify gaps, and update the work record. Do not assume an earlier status statement is still accurate without checking.
4. **Find relevant open-source prior art.** Search for repositories that implement the identified capabilities. Select sources based on actual feature relevance and inspect their real source files, not just repository descriptions or README claims.
5. **Reverse-engineer the implementations.** For each relevant capability, trace the implementation sufficiently to recover its rules: conditions, decisions, state transitions, workflows, data constraints, failure handling, security boundaries, and other applicable properties. Record exact source references (repository, path, and symbol or line range where available).
6. **Synthesize product rules.** Use the mockup to establish the intended product scope and the investigated implementations as evidence for how capabilities work. Organize investigation and rule extraction through the Software Rules facets. Do not use the separate six-category list (UI, Data, Business logic, Functionality, UX, System) as a second investigation framework; it would duplicate the facet structure. Do not copy an open-source product's unrelated design or assume every implementation detail is a Zerodek requirement.
7. **Produce the Software Rules deliverable.** Create a separate `software-rules/` folder in the project repository, following the governing Software Rules specification. Keep the final rules technology- and stack-independent.
8. **Validate completeness and traceability.** Check that the rules cover the declared product scope, have evidence and provenance, identify unresolved questions, and satisfy the applicable Software Rules validation and completeness requirements.

Pipeline:

```text
Whitefire mock screens
        ↓
Screen and visible-element inventory
        ↓
Product feature/capability inventory
        ↓
Open-source repository discovery and selection
        ↓
Source-level investigation with traceable references
        ↓
Evidence-backed, technology-independent software rules
        ↓
Completeness / schema / conformance review
        ↓
software-rules/ deliverable in REMAREMA6/zero-deck
```

## 4. What the investigation must and must not claim

- A mock screen establishes visible design information and may imply intended interactions; it does not prove backend implementation, persistence, network behaviour, security controls, or runtime outcomes.
- An open-source repository is a research source. Its code can support a **source-derived** rule about that implementation; it does not, by itself, prove that the same behaviour has been observed in a running Zerodek product.
- Keep evidence classes distinct. In particular, do not present source-derived findings as runtime-verified behaviour.
- Every adopted rule must be traceable to its evidence and explain its relevance to the Zerodek capability being specified.
- Record uncertainty, gaps, assumptions, and unverified behaviour explicitly. Do not silently turn an inference into a requirement or a verified fact.
- Investigate the complete software represented by the screens, not only the UI. The target is a sufficiently complete specification of the declared product scope.
- Do not select a technology stack or begin implementing the application as part of this reverse-engineering engagement.

## 5. Workspace and deliverable separation

The reverse-engineering workspace is for the investigation record: scope, screen inventory, feature mapping, repository selection rationale, source references, raw evidence, analysis, decisions, unresolved questions, and progress records.

The final Software Rules are a **separate, explicitly designated deliverable** in the project repository:

```text
zero-deck/
├── re/
│   └── zerodek-product-re/
│       └── 2026-11-27/
│           └── ENGAGEMENT-UNDERSTANDING.md
└── software-rules/
    └── ...  # to be created according to REMAREMA6/software-rules
```

Do not mix working evidence into the deliverable folder. Reference workspace evidence from the deliverable using stable paths or source identifiers. Do not move or duplicate other agents' records into this workspace.

## 6. Governing Software Rules requirements

The deliverable must follow the current specification in [REMAREMA6/software-rules](https://github.com/REMAREMA6/software-rules), rather than inventing a local documentation format.

At the time this engagement record was written, that repository identifies Software Rules **0.3.0 Draft** and schema **0.2.0 Draft**. This is a pre-stable specification; record the exact specification/schema version used when the deliverable is created.

Apply, at minimum, the specification's requirements for:

- technology-independent rule descriptions;
- facet-specific representation rather than one undifferentiated prose document;
- scenario, execution, observation, rule, and evidence distinctions;
- evidence provenance and source-derived versus runtime evidence classification;
- explicit coverage, unknowns, and limitations;
- replication completeness for the declared scope; and
- structural validation and conformance checks supported by the selected specification version.

A collection of screenshots, screen descriptions, selected code snippets, or a few matching properties is not sufficient to claim that the complete product scope has been captured.

## 7. Existing work to reconcile

The project repository already contains:

- `re/MISSION.md` — an earlier owner directive describing the mockup → feature list → open-source implementations → tool-agnostic rules pipeline.
- `re/oss-recon/oss-recon-decision-report.md` and `re/oss-recon/recon-extract-raw.txt` — prior open-source reconnaissance records.

These are existing work products, not proof that the full engagement is complete. Inspect their contents, verify their conclusions and source references, and determine which parts can be carried forward. Maintain a clear record of what is accepted, rejected, stale, or still unverified.

## 8. Completion criteria

This engagement is complete only when:

- every mockup screen has been inventoried;
- the product's in-scope capabilities have been identified and investigated through the relevant Software Rules facets;
- relevant open-source implementations have been selected with documented reasons;
- the selected source code has been investigated deeply enough to support the rules claimed;
- every rule has traceable evidence and an explicit evidence classification;
- unresolved properties and out-of-scope areas are visible rather than concealed;
- the separate `software-rules/` deliverable follows the governing specification and passes the applicable validation;
- the deliverable is assessed against replication completeness for the declared scope; and
- no claim of complete replication sufficiency is made while required properties remain unresolved.

## 9. Immediate next actions

1. Inspect all 17 mockup screens in the Whitefire repository and produce a screen inventory.
2. Read and audit the existing OSS reconnaissance report and raw extract.
3. Read the relevant Software Rules specification documents and schemas before designing the deliverable structure.
4. Build a screen-to-capability-to-Software-Rules-facet investigation matrix.
5. Identify capability gaps not covered by the existing OSS research, then search for and inspect additional source repositories.
6. Begin rule extraction only when the supporting evidence and provenance can be recorded.

---

**This document records the owner's assignment and the agent's operating understanding. It is not a claim that the mockup inventory, source investigations, or Software Rules deliverable have already been completed.**

## 10. Clarification: investigation taxonomy

**Owner clarification, 2026-11-27**

The reverse-engineering agent must use the facets defined in `REMAREMA6/software-rules` as its investigation and rule-organization structure.

The following six categories are **not** a second taxonomy for this engagement:

1. UI
2. Data
3. Business logic
4. Functionality
5. UX
6. System

Using that list alongside the Software Rules facets would create a redundant parallel classification. The RE agent should not organize its investigation, capability mapping, or rule extraction around those six categories. It should work directly through the applicable Software Rules facets, using the specification's own definitions and requirements.

The owner may revise or remove the six-category list later. Until then, this clarification governs the Zerodek RE engagement. It does not authorize the agent to independently change the separate `REMAREMA6/software-rules` specification repository.
