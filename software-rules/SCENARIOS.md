# ZeroDeck MVP Scenario Catalogue

**Maturity:** Draft  
**Status:** Scenario definitions for evidence collection; none of these scenarios has been executed against a deployed ZeroDeck target.

The IDs and workflow boundaries follow the owner-approved scope and Phase 2 capability/facet mapping. These are investigation scenarios, not claims about actual implementation outcomes. Expected outcomes are intentionally not populated where no independent oracle/contract establishes them.

| Scenario ID | Capability | Trigger and initial condition | Observable questions / dimensions |
|---|---|---|---|
| MVP-FILE-001 | MVP-01 | User selects a supported, accessible file and requests a manual scan. | Accepted/rejected input; file identity and permission result; scan start/progress/termination; result class; user-facing explanation; side effects; terminal state. |
| MVP-FILE-002 | MVP-01 | Execute separate branches for confirmed threat, suspicious, no known threat, inconclusive, unsupported/inaccessible file, interruption, and engine failure. | Classification basis where exposed; exact result and wording; next actions; whether quarantine is triggered; no unsupported safety guarantee; truthful failure state. |
| MVP-QUAR-001 | MVP-02 | Scan result is classified as a confirmed threat and the platform permits an isolation operation. | Eligibility decision; trigger; isolation operation; original and quarantined artifact identity; integrity verification; notification; failure/partial state. |
| MVP-QUAR-002 | MVP-02 | Scan result is suspicious or inconclusive. | Review/rescan choices; confirmation; whether destructive action is prevented; state transition and user messaging. |
| MVP-QUAR-003 | MVP-02 | User requests restore or permanent deletion of a quarantined item. | Confirmation; restore preconditions and fresh-scan rule where applicable; integrity; destination conflicts; actual operation outcome; retention/audit side effects if present; recovery after failure. |
| MVP-LINK-001 | MVP-03 | User submits a URL/link for checking. | Input path; accepted schemes; parsing/normalization; independent Pro and owner-switch gate results; whether a provider request occurs; request/response; disclosure; bounded result. |
| MVP-LINK-002 | MVP-03 | Execute separate likely-dangerous, no-known-threat, inconclusive, invalid URL, redirect, timeout, and provider-unavailable cases. | Result taxonomy and evidence; requested threat coverage; cache/expiry; exact wording; no guarantee of safety; no claim of whole-site inspection from a URL-only lookup; failure state. |


Each scenario's governing facet dimensions are enumerated in [PROPERTY-INVENTORY.md](PROPERTY-INVENTORY.md), with the semantic payload mapping in [PAYLOAD-MAPPING.md](PAYLOAD-MAPPING.md).

## Conditional facet applicability

- API and Integrations remain conditional in MVP-LINK-001 and MVP-LINK-002 until the actual checking architecture establishes whether a synchronous provider/API exchange or external provider relationship exists.
- Integrations remains conditional in MVP-QUAR-001 until the actual quarantine storage/provider boundary establishes whether an external-system integration is present.
- Keep the related observable questions, but do not treat conditional dimensions as mandatory implementation properties or as evidence that an API/provider exists. If the runtime shows the facet applies, promote the relevant dimensions to required and capture them.

## Cross-scenario requirements

- Each branch in MVP-FILE-002 and MVP-LINK-002 is a separate scenario execution; do not collapse distinct outcomes into one average result.
- Capture actor, initial state, target/build, environment, effective configuration, inputs, trigger, ordered actions, actual result, timing, side effects, and evidence.
- Link observations across facets where one operation affects multiple perspectives.
- Record expected outcomes only when supported by an owner-approved requirement or an independently identified contract. A test expectation alone is not runtime evidence.
- No scenario for IP address investigation is permitted in this MVP catalogue.


## Phase 6 scenario-definition completeness

The seven scenario records currently establish scenario identity, capability/subject, purpose, trigger, facet IDs and observable questions. They do not yet fully instantiate the governing conceptual scenario model. Before runtime execution, record (or explicitly mark unknown/unavailable) for each scenario:

- Actor/principal and relevant identity context.
- Target build, system boundary, platform, environment and effective configuration.
- Initial state and preconditions.
- Exact input values/variants and ordered user/system actions.
- Expected outcomes only where supported by an owner-declared rule or independent contract; keep expected and actual outcomes separate.
- Stop/settling condition and terminal-state criteria.
- Evidence capture method, tool/version, timing and correlation plan.

MVP-FILE-002 and MVP-LINK-002 contain branch families, not single aggregate tests. Every listed branch must be executed and recorded separately. MVP-QUAR-003 contains restore and permanent-delete paths; treat them as separate executions with their own success, denial and failure variants. No execution is currently recorded.
