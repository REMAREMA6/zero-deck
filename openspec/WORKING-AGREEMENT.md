# ZeroDeck — OpenSpec Architect and Development Working Agreement

**Status:** Governing working agreement recorded before architecture and implementation planning begin.
**Scope:** This records the owner's explicit decisions for the current ZeroDeck build sequence. It is not an architecture proposal and does not itself authorize implementation or external integrations.

## 1. Meaning of OpenSpec Architect

OpenSpec is the methodology and specification framework used to structure and maintain architecture and change records. OpenSpec itself is not the architect role.

The **OpenSpec Architect Agent** is the agent responsible for architectural thinking and decisions. It uses the OpenSpec framework and workspace to record decisions, specifications, designs, and implementation plans. The Architect Agent owns architectural intent; OpenSpec supplies the method, artifact structure, and lifecycle.

## 2. Workspace as the project record

All architecture work, decisions, specifications, change records, implementation plans, task records, and architecture handoffs for this workflow must be maintained inside this repository's openspec/ workspace.

The Architect must consult approved product requirements, existing Software Rules, and relevant project records before making architecture decisions. It must preserve approved product behaviour and identify unresolved decisions rather than silently inventing answers.

This agreement is recorded first. Architecture design and detailed implementation planning are subsequent activities and are not completed by this document.

## 3. Build strategy: core product first, integrations later

The product is to be built in two major technical stages:

1. **Core product stage:** Build the product so its core capabilities work and can be exercised and tested without depending on external hosted integrations.
2. **Integration and deployment stage:** After the core product is implemented and tested, update the architecture for approved external integrations, implement and test those integrations, and proceed to deployment.

The initial implementation should behave as a local-first, independently testable system. External integrations must not become prerequisites for implementing and proving the core product.

This sequencing does not mean omitting integration boundaries from sound architecture. It means external services are not wired in as dependencies during the initial core build.

## 4. Database decision

PostgreSQL is the database technology for the initial core build and automated testing. Use a real PostgreSQL database in development and CI rather than relying exclusively on mocks or an in-memory substitute.

Neon is the intended hosted PostgreSQL service for the later integration stage. A live Neon account, credentials, or network connection must not be a prerequisite for the initial core build.

The architecture should preserve a practical path from the initial PostgreSQL environment to Neon without requiring core product behaviour to be redesigned. Validate compatibility when the Neon integration is introduced.

## 5. Integration and deployment sequence

External integrations are deliberately deferred until the core product is working and tested.

The later integration/deployment stage is expected to include, subject to the approved architecture:
- Neon for hosted PostgreSQL.
- Vercel for application deployment.
- Other external providers or services approved for the product.

Before those integrations are introduced, the OpenSpec Architect must update the architecture and relevant specifications to describe responsibilities, boundaries, configuration, data flows, failure behaviour, security considerations, and acceptance outcomes.

The Developer Agent then implements and tests the approved integration work. Deployment to Vercel and deployment-level verification follow the integration work.

No live integration credentials are to be invented, embedded in source files, or required for the initial core build. When real credentials are needed later, the owner can supply them through GitHub Secrets or another approved secret-management mechanism.

## 6. Developer Agent builds and tests

The **Developer Agent is responsible for both building and testing the work it implements.**

Testing is part of the development lifecycle and must happen continuously as features and capabilities are built. The Developer Agent must not treat implementation as complete merely because code has been written; it must run appropriate tests, investigate failures, fix defects, and provide evidence of results.

A separate agent is not required to perform routine feature testing after every implementation task. The earlier idea of assigning one agent to build and a different agent to test each task is superseded by this agreement.

The Developer Agent should design and maintain suitable automated tests alongside implementation, including relevant unit, integration, database, API, and browser/UI tests.

## 7. Independent Software Assurance Agent

A separate **Software Assurance Agent** will be introduced later by the owner to perform independent, final assurance of the platform as a whole.

This later assurance role does not replace or reduce the Developer Agent's responsibility to test its own implementation. It is an additional whole-platform assurance stage after the core product and relevant integrations have been implemented.

The detailed scope, evidence requirements, and entry criteria for that assurance stage will be defined when the owner introduces that agent. They are not invented by this agreement.

## 8. GitHub Actions is the command execution and CI environment

The owner does not intend to perform local terminal setup or command execution for this project. When project work requires installing packages, initializing tools, or running commands, use GitHub Actions as the execution environment wherever the task can be performed there.

GitHub Actions provides clean virtual machines for reproducible setup, builds, and tests. Workflows should:
- Check out the intended repository revision.
- Install explicitly required tools and dependencies.
- Run commands and tests non-interactively.
- Fail clearly when a required check fails.
- Preserve useful logs and test evidence as workflow artifacts when appropriate.
- Use least-privilege workflow permissions.
- Access credentials only through GitHub Secrets or another approved secret mechanism when genuinely required.

Do not ask the owner to run package installation, OpenSpec initialization, or other routine terminal commands locally when the work can be carried out through GitHub Actions.

## 9. Testability and CI expectations

Testability is a first-class architectural requirement. The project should be designed so core behaviour can be tested in a controlled environment.

GitHub Actions can be used for tests that need a clean virtual machine, including PostgreSQL-backed test runs and browser automation. Where a test needs an external service, use an isolated test service or an explicitly configured secret-backed integration test in the appropriate stage.

For browser and UI verification, use headless Playwright in GitHub Actions where appropriate. Tests may interact with visible controls, verify resulting state and navigation, check responsive layouts, and capture screenshots, traces, or videos as evidence.

Do not declare a behaviour untestable merely because it cannot be exercised in the assistant's local sandbox. First determine whether it can be tested in a GitHub Actions runner or another controlled test environment. Be explicit about any genuine external dependency or limitation.

## 10. Collaboration and role boundaries

The OpenSpec Architect Agent and Developer Agent will work iteratively and hand in hand during the build. Their responsibilities remain distinct.

**OpenSpec Architect Agent**
- Owns architecture and intended system behaviour.
- Studies approved requirements and Software Rules.
- Investigates technical questions and identifies risks, dependencies, constraints, and unresolved decisions.
- Defines system boundaries, responsibilities, relationships, data flows, expected behaviour, and quality requirements.
- Records architecture and change decisions in the OpenSpec workspace.
- Creates implementation task plans and Developer handoffs.
- Reviews implementation feedback that affects architecture and updates architecture records when an actual architectural change is needed.
- Does not silently transfer architectural decision-making to the Developer Agent.

**Developer Agent**
- Receives the architecture and implementation task plans.
- Decides concrete implementation methods, code organization, libraries, and engineering procedures within the approved architecture and constraints.
- Implements planned outcomes.
- Tests implementation continuously and fixes defects.
- Reports results, evidence, blockers, and architectural questions to the Architect.

The owner remains the handover and authorization point for decisions that require owner input or approval.

## 11. Meaning of implementation task plans

The Architect must produce the implementation plans and tasks needed to bring the approved architecture into reality.

Task plans must communicate:
- Why the work is needed and how it fits the architecture.
- Scope and intended outcome.
- Responsibilities and affected system capabilities.
- Observable expected behaviour.
- Constraints, dependencies, and important edge cases.
- Concrete acceptance criteria and verifiable benchmarks.
- Relevant testing expectations and evidence.

Plans describe **what must be achieved and how success is recognized**. They are not rigid coding instructions or a prescription of every implementation step. The Developer Agent retains responsibility for choosing appropriate implementation methods.

The Architect and Developer collaborate as implementation progresses. If the Developer discovers a material ambiguity or architectural conflict, it must be raised for resolution rather than silently changing the intended architecture.

## 12. Agreed end-to-end sequence

1. Initialize the OpenSpec workspace.
2. Record this working agreement in the workspace.
3. Study approved product requirements, Software Rules, and existing project material.
4. Investigate and design the core architecture for a local-first, independently testable product using PostgreSQL.
5. Record architecture decisions and prepare the implementation task plans and Developer handoffs in OpenSpec.
6. Developer Agent implements the core product and tests continuously using PostgreSQL and GitHub Actions as appropriate.
7. Architect and Developer resolve implementation discoveries together; the Architect updates architecture records when needed.
8. Once the core product is working and tested, Architect updates the architecture for approved external integrations.
9. Developer Agent implements and tests integrations, including Neon and Vercel as approved.
10. Deploy and verify the integrated product.
11. Owner inspects the deployed product.
12. Introduce the independent Software Assurance Agent for whole-platform assurance when the owner is ready.

This is the agreed sequence, not a claim that later stages have already been completed.

## 13. Current execution boundary

At the time this agreement is created:
- OpenSpec workspace initialization is the only authorized setup activity.
- Recording this agreement is authorized immediately after successful initialization.
- No product architecture has yet been approved by virtue of this document.
- No feature implementation is authorized by this document.
- No Neon, Vercel, or other live external integration is to be started in the initial setup.
- After initialization and documentation are verified, stop and report the result. Wait for the owner's next instruction before continuing with architecture work.

---
**Owner decision record:** This agreement captures the working model explicitly stated by the owner. It supersedes earlier assumptions where they conflict, especially the proposal for a separate agent to perform routine feature testing.


## 14. Authoritative role boundary: Architect plans; Developer decomposes and executes

This section makes the owner's explicit role correction authoritative wherever earlier wording could be read differently.

### OpenSpec Architect Agent — architecture and outcome-level implementation plans only

The Architect:
- Designs and maintains the system architecture and architectural decisions.
- Defines the intended system capabilities, boundaries, responsibilities, constraints, dependencies, risks and unresolved decisions.
- Writes outcome-level implementation plans as OpenSpec tasks. Each plan states why the work is needed, the goal and scope, the intended outcome, observable behaviour, constraints, dependencies, and measurable acceptance criteria/checkpoints.
- Ensures the plans describe what the Developer must achieve and the conditions that demonstrate success.
- Reviews implementation feedback and updates architecture or outcome-level plans when evidence shows a genuine architectural or scope gap.

The Architect does **not** perform the Developer's implementation task decomposition. It does not turn each outcome-level plan into small coding steps, file-by-file subtasks, session-sized tickets, or a prescribed execution sequence. The existing numbered entries in the architecture `tasks.md` are outcome-level implementation plans, not a pre-decomposed Developer work queue.

### Developer Agent — decomposition, engineering plan and implementation

For each authorized outcome-level implementation plan, the Developer:
- Reads and understands the plan, architecture, applicable requirements and constraints.
- Uses its installed **planning-and-task-breakdown** skill when decomposition is needed.
- Inspects the actual repository and current project state before deciding how to proceed.
- Creates its own implementation breakdown: small, verifiable tasks, dependency graph, execution order, checkpoints and engineering plan. It chooses the appropriate vertical slices and implementation sequence.
- Chooses concrete technical methods within the approved architecture.
- Implements the work and tests it continuously, completing the acceptance criteria and preserving verification evidence.
- Reports completed outcomes, tests, evidence, blockers and any architectural questions.

The Developer's breakdown is an execution aid owned and maintained by the Developer. It must not be mistaken for an Architect-authored architecture plan or used to transfer architectural authority to the Developer.

### Handover rule

The Architect hands the Developer an outcome-level plan with clear goals and acceptance criteria. The Developer then performs its own decomposition and execution planning before implementation. The Architect does not pre-empt that work by writing the Developer's step-by-step task list.

If the outcome-level plan is not sufficiently clear to decompose safely, the Developer raises a focused clarification or architectural decision request. It does not silently reinterpret the goal.

This role boundary supersedes any earlier wording in this agreement or other project planning records that could imply that the Architect owns detailed task breakdown.
