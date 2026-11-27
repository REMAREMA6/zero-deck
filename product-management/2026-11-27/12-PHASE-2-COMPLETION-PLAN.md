# Phase 2 Completion Plan — Identity and Authentication

**Prepared:** 2026-11-27  
**Status:** Awaiting owner approval  
**Scope:** Complete Phase 2 of the ZeroDeck PM-authored product-rules workstream. Work only inside `product-management/`.

## Requested outcome

A research-backed, traceable, structurally valid draft identity/authentication requirements contract, with unresolved product decisions clearly separated from PM recommendations and owner-approved directions. Phase 2 must not be marked complete until its documented exit criteria are met.

## Work to perform after approval

1. **Re-establish the phase baseline**
   - Read the current tracker, plan, Phase 1 profile, Phase 2 workstream, and current contract/evidence artifacts.
   - Verify the current ZeroDeck and Software Rules revisions and relevant identity/authentication facet definitions.
   - Reconcile the contract with the owner's approved MVP boundaries and architecture directions.

2. **Apply the Product Management agent's CIRCLES method**
   - Comprehend the goal, constraints and context for the authentication capability.
   - Identify the customer and affected product side.
   - Report underlying needs, distinguishing evidence from PM inference.
   - Cut and state what is in/out of the Phase 2 requirement scope.
   - List materially different approaches where the sign-in/recovery design is unresolved.
   - Evaluate trade-offs and produce one PM recommendation without deciding for the owner.
   - Summarize with a testable success metric, trade-off and open decisions.
   - Preserve the existing phase deliverables where valid; correct or supplement gaps rather than silently treating the existing draft as validated.

3. **Complete the requirements contract**
   - Review every requirement for necessity, stack neutrality, testability, normative force, conditions, priority, platform scope, provenance, acceptance criteria and facet mapping.
   - Separate owner-approved constraints, external-source-derived guidance, PM inference, and unresolved questions.
   - Do not turn unknown authentication methods, verification channels, MFA/passkeys, recovery methods or session durations into owner-approved decisions.

4. **Validate the Software Rules projection**
   - Validate the full declared-contract record against the Phase 1 PM record schema and extension schema, and the upstream Software Rules record schema at the pinned revision.
   - Check statement/metadata one-to-one parity, stable IDs, valid facet references, evidence references, artifact revision/digest, conditional requirements, provenance, acceptance criteria, and owner-decision status.
   - Run negative checks for malformed records and document any validator limitations honestly.

5. **Retain evidence and close the phase**
   - Ensure the evidence record matches the exact committed artifact revision and digest.
   - Write a Phase 2 validation report with passed/failed checks and limitations.
   - Update the Phase 2 workstream, `PLAN.md`, and `TRACKER.md` only after the exit criteria are actually satisfied.
   - Verify the committed files and final tracker state.

## Explicit boundaries

- Authentication remains supporting infrastructure, not a fourth user-facing MVP capability.
- The three approved MVP capabilities and the MVP-03 Pro-plus-owner-activation gate remain unchanged.
- First-party authentication/backend and Neon as the preferred managed database are owner directions; exact sign-in, verification, recovery and session policies remain open unless the owner decides them.
- Do not modify the product implementation or files outside `product-management/`.
- Do not claim implementation conformance or complete coverage of the upstream identity/authentication facet.

## Exit criteria

Phase 2 may be marked complete only when:
- the CIRCLES recommendation and supporting analysis are recorded;
- the authentication requirements contract and structured Software Rules declared-contract projection are complete and mutually traceable;
- every normative requirement has a valid acceptance criterion and explicit basis/status;
- unresolved owner decisions remain explicit;
- the contract and evidence pass the documented structural and semantic checks;
- the exact evidence revision/digest is verified; and
- the tracker and plan accurately reflect the result and remaining work.

**Approval required:** The owner must explicitly approve this plan before the remaining Phase 2 work proceeds.
