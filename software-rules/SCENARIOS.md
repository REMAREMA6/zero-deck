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

## Cross-scenario requirements

- Each branch in MVP-FILE-002 and MVP-LINK-002 is a separate scenario execution; do not collapse distinct outcomes into one average result.
- Capture actor, initial state, target/build, environment, effective configuration, inputs, trigger, ordered actions, actual result, timing, side effects, and evidence.
- Link observations across facets where one operation affects multiple perspectives.
- Record expected outcomes only when supported by an owner-approved requirement or an independently identified contract. A test expectation alone is not runtime evidence.
- No scenario for IP address investigation is permitted in this MVP catalogue.
