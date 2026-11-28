# Phase 4 — MVP-01 Manual File Analysis: 15-Facet Coverage

**Date:** 2026-11-28  
**Contract:** `ZD-CONTRACT-FILE-ANALYSIS` v0.1.0-draft  
**Authority:** Software Rules 0.3.0 Draft 15-facet catalogue; this is a PM applicability assessment, not runtime capture.

## Assessment summary

All 15 official facets were assessed. The assessment classifies product relevance, not whether an implementation currently exists. The current ZeroDeck capture has no deployed runtime evidence. Conditional facets must be revisited when the actual implementation boundary is selected.

| # | Official facet ID | MVP-01 status | Why / required product treatment | Contract links |
|---:|---|---|---|---|
| 1 | `interface` | Applicable | File selection, eligibility disclosure, lifecycle, verdicts, uncertainty, explanations, cancellation and next-step guidance are user-visible. Visual geometry and exact screens are outside this requirements phase. | FILE-001, 004, 010–017, 024–025 |
| 2 | `behavior` | Applicable | Explicit initiation, access checks, analysis lifecycle, cancellation, terminal outcomes, retries and side-effect boundaries are central workflow behaviour. | FILE-001–003, 006, 010–013, 015, 017–020, 023–024 |
| 3 | `business-rules` | Applicable | Supported-input eligibility, verdict meanings, no-known-threat semantics, incomplete-result handling and MVP boundary are product rules. | FILE-001, 004–005, 012–013, 015, 017–018, 023–025 |
| 4 | `data` | Applicable | File identity/input metadata, result classes, scan-attempt identity, provenance, uncertainty, minimization and diagnostic redaction require defined data semantics. | FILE-004–006, 012, 014–016, 020–022, 025 |
| 5 | `persistence` | Conditional | Persistence is not required by the current manual workflow definition. If scan results/history are retained, retention and deletion must be specified separately from MVP-02 quarantine. No standalone history feature is approved. | FILE-022–023 |
| 6 | `api` | Conditional | No ZeroDeck API or backend exchange is established for MVP-01. If a selected implementation introduces a client/server API, request/response, authorization, errors, data exposure and retry semantics must be specified in cross-cutting work. | FILE-007–009, 018, 020–021 (conditional on remote boundary) |
| 7 | `messaging` | Conditional / currently unestablished | No message broker or event-delivery architecture is selected. If analysis or updates use asynchronous messages, delivery, duplication, ordering, acknowledgement and failure semantics must be defined. | FILE-010–011, 018–019, 027 |
| 8 | `identity-authentication` | Conditional | The existing account/authentication contract is supporting infrastructure. MVP-01 does not currently require account creation or sign-in to select and analyse a file. Reassess only if an approved policy introduces an identity dependency. | No direct MVP-01 identity requirement; dependency note in contract §8 |
| 9 | `authorization-permissions` | Applicable | The user-selected file and active platform grant define what the application may read. Revoked, expired or insufficient access must be rejected without bypass. | FILE-002–003, 024 |
| 10 | `security-controls` | Applicable | Safe file handling, no execution, non-destructive analysis, privacy boundaries, data minimization, diagnostic redaction and conditional update integrity are essential controls. | FILE-002, 006–009, 013, 020–021, 027 |
| 11 | `background-processing` | Not applicable to approved product behaviour; implementation remains unknown | Automatic/background scanning is explicitly excluded. This does not forbid internal asynchronous work during a user-requested scan; if an implementation introduces a background worker/job, its lifecycle is a conditional system facet to assess later. | FILE-001, 010–011; explicit exclusion |
| 12 | `errors-recovery` | Applicable | Permission loss, invalid/unsupported inputs, engine failure, interruption, cancellation and retry must produce truthful states and recovery behaviour. | FILE-003, 005, 010–011, 015, 018–019, 021, 026–027 |
| 13 | `integrations` | Conditional | The analysis engine, threat-intelligence source and cloud processor are not selected. If any external dependency is introduced, its identity, data flow, failure behaviour, licensing and trust boundary must be specified. | FILE-007–009, 018, 027 |
| 14 | `configuration` | Applicable | Supported formats, limits, resource budgets and any optional retained-result policy require explicit effective configuration or published policy. Actual values and precedence remain open. | FILE-004, 007, 022, 026–028 |
| 15 | `performance-resource-behavior` | Applicable | Manual analysis can consume device/service CPU, memory, storage, network and time. Supported workloads and resource limits must be established before release; no numeric targets are invented here. | FILE-004–005, 026 |

## Cross-facet relationships

1. **Selection and access:** Interface → Behaviour → Authorization/Permissions → Errors/Recovery. A visible selection is not proof of continuing read access.
2. **Eligibility:** Data and Configuration feed Business Rules; an unsupported input must be rejected before it can produce a successful verdict.
3. **Classification:** Business Rules determine the outcome; Data records the result/provenance; Interface communicates it; Security Controls constrain claims and handling.
4. **Privacy:** Security Controls, Data, Integrations and Configuration must agree on whether content leaves the device, what is collected, and what diagnostics may expose.
5. **Interruption:** Behaviour, Background Processing (only if used), Errors/Recovery and Performance must agree on terminal state and whether a partial result exists.
6. **Cross-platform semantics:** Interface, Behaviour, Business Rules and Authorization/Permissions share outcome meaning while allowing different platform access capabilities.
7. **Optional persistence:** Data, Persistence, Configuration and Privacy must agree on purpose, retention and deletion if records are retained.

## Not-applicable and deferred discipline

- Background Processing is not part of the approved product behaviour because automatic/background protection is excluded. Internal job execution, if later selected as an implementation mechanism for a manual request, is not thereby a new user-facing feature and must be separately assessed.
- Messaging, API, Integrations and Identity/Authentication are not asserted to be absent from the eventual system. They are conditional because no relevant MVP-01 boundary has been selected.
- Persistence is conditional because no scan-history feature is approved and durable scan-result retention is unresolved.
- No facet is declared globally irrelevant to ZeroDeck. These classifications apply only to the MVP-01 product contract.

## Coverage gaps remaining

The contract defines product obligations but does not resolve:
- exact file formats, limits, archive recursion and encrypted-file handling;
- engine, detection-source, licensing, update and freshness policy;
- verdict thresholds and confidence semantics;
- optional cloud-analysis existence and its data flow;
- retention/deletion details;
- exact resource budgets and workload profile;
- browser and Android OS support matrix;
- implementation-specific API, messaging, worker, persistence and integration facets if selected.

These are open product decisions or conditional implementation-dependent facets, not passed completeness claims.
