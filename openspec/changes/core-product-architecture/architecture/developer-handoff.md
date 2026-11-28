# Developer Handoff — Core Product Architecture

**Handoff status:** Prepared by Architect; awaiting Product Owner architecture approval and implementation authorization.  
**Implementation status:** Not started.  
**Canonical plan:** [tasks.md](../tasks.md)  
**Architecture:** [design.md](../design.md)  
**Traceability:** [requirement-traceability.md](requirement-traceability.md)  
**Decision state:** [decision-log.md](decision-log.md) and [open-decision-register.md](open-decision-register.md)

## What the Developer is being asked to build

Build the owner-approved ZeroDeck MVP in the agreed sequence:

1. Shared account identity and authentication across Web and Android.
2. MVP-01 manual file security analysis, local/on-device by default.
3. MVP-02 device-local quarantine and file disposition with explicit confirmation.
4. MVP-03 website/link checking through a server-side provider boundary, using a deterministic fake provider during the core stage.
5. Cross-cutting security, privacy, reliability, compatibility and testability.

The initial core product must be independently buildable and testable against PostgreSQL without Neon, Vercel, production providers, live email/billing services or external credentials.

## Developer decision authority

Within the approved architecture, the Developer chooses concrete implementation methods, code organization, programming language/framework, package selection, ORM/data-access technique, build tooling and engineering procedures.

Before locking a material technology choice, the Developer records:
- the problem it solves;
- alternatives considered;
- compatibility with the architecture and platform constraints;
- security, privacy, licensing, cost and maintenance implications;
- how it will be tested in GitHub Actions;
- any effect on later Neon/Vercel integration.

The Developer does not unilaterally choose or change:
- product scope or user-visible policy;
- identity, entitlement, owner-activation or consent gates;
- whether file bytes, quarantine content, URLs or results are transferred or persisted;
- retention, deletion, backup or secure-erasure guarantees;
- production malware engine, threat-intelligence source or URL provider;
- numeric quota, rate, timeout, resource or spend ceilings where owner approval is required;
- legal obligations, launch jurisdictions or production support commitments.

If a task cannot be completed without one of these decisions, stop that part of the work and raise a concise decision request to the Architect/Product Owner. Do not silently substitute a default.

## Testing responsibility

The Developer builds and tests its own work continuously. Each task must include its own unit/integration/platform/browser tests and relevant documentation. No separate routine test-agent handoff is expected.

Use:
- real PostgreSQL in development/CI for persistence behaviour;
- deterministic fake adapters for external services during the core stage;
- platform tests for Web and Android file access, storage and permission behaviour;
- Playwright for browser-visible flows and responsive behaviour;
- Android instrumentation/end-to-end tests for Android-specific operations;
- GitHub Actions for package installation, command execution, builds and tests.

Test failures are part of implementation work: investigate, fix, and rerun before marking the task complete. Preserve useful logs, reports, screenshots, traces and test summaries.

## Collaboration and reporting

- Raise architecture conflicts to the Architect with the affected task, requirement IDs, observed evidence, alternatives and proposed resolution.
- The Architect owns architectural updates where implementation evidence reveals a real boundary or design gap.
- Product-policy changes return to the Product Owner and canonical product contracts; they are not resolved by a code-level workaround.
- Report completed task IDs, commits, workflow runs, test outcomes, known limitations and remaining open decisions.
- Do not mark a capability complete based only on compilation or a happy-path demo.

## Entry conditions

Implementation may start only after:
1. OpenSpec validation succeeds or any validation findings are resolved.
2. The Product Owner reviews and approves the architecture and task plan.
3. The Product Owner explicitly authorizes the Developer to begin core implementation.

The Developer must not start Neon, Vercel, production-provider or deployment work under this handoff. Those require a later architecture update after the core product is implemented and tested.
