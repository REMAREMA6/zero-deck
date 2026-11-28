# Phase 8 — Contradiction, Ambiguity and Missing-State Register

**Status:** Findings recorded; owner/policy items remain open  
**Severity:** P0 = threatens a core safety/authorization invariant; P1 = blocks reliable traceability or release definition; P2 = material completeness/operational issue

| ID | Severity | Finding | Evidence | Disposition / required action | Status |
|---|---|---|---|---|---|
| P8-F01 | P1 | Authentication structured projection statement drift | AUTH-002, AUTH-006, AUTH-020 and AUTH-021 projection statement text differed from canonical Markdown | Corrected in Phase 8; Phase 9 revalidated canonical statement/projection parity. | Closed |
| P8-F02 | P1 | Acceptance-criterion ID format violated PM profile | The 231 AUTH/FILE/QUAR/WEB IDs used legacy requirement-scoped forms; 28 SYS IDs already conformed. | Migrated all 231 legacy IDs to unique capability-scoped IDs across canonical Markdown and structured projections; updated the Phase 3 authentication matrix; retained a 231-row old/new crosswalk. Revalidated 259/259 IDs against the PM profile. | Closed |
| P8-F03 | P1 | Cross-cutting dependency metadata was semantically misdirected | Phase 8 identified incorrect SYS prerequisite links, including authorization, dependency-failure, resource-bound, external-response and account-closure dependencies. | Re-mapped SYS-001–028 dependencies to the relevant capability requirements and prerequisite relationships; validated all references and graph integrity. | Closed |
| P8-F04 | P1 | Quarantine's dependency on manual analysis was not explicit in structured metadata | QUAR-001 and QUAR-014 consume MVP-01 scan results. | Added dependencies from QUAR-001 and QUAR-014 to FILE-001, FILE-010, FILE-012 and FILE-015 in both canonical Markdown and structured metadata. | Closed |
| P8-F05 | P1 | Recovery notification was not fully represented in the normative requirement/facet mapping | AUTH-021 statement omitted the notification outcome and its facetRefs omitted Messaging. | Updated AUTH-021 normative statement to require owner notification after successful recovery, added Messaging facet and owner decision reference. Delivery failure/retry/acknowledgement/duplicate mechanics remain deferred to architecture. | Closed at product-policy level; delivery mechanics deferred |
| P8-F06 | P1 | MVP-03 revocation propagation and in-flight dispatch required one shared product policy | WEB-029/030 and AUTH/WEB/SYS questions overlapped on gate revocation. | Owner approved one shared invariant: false/unknown gates deny new work; queued/not-yet-dispatched provider calls are denied after revocation; already-dispatched calls are cancelled where supported and cannot initiate follow-on calls. Exact propagation bounds and cancellation mechanics are deferred to architecture. | Closed at product-policy level; timing deferred |
| P8-F07 | P1 | Account deletion needed reconciliation with backups and immutable audit records | AUTH-026 and SYS-004/017 cover account deletion, backup expiry and retained audit data. | Owner approved immediate access disable/session revocation, documented personal-data deletion, and only justified retained records with reason/period. Backup propagation, exact schedules and statutory categories remain deferred to architecture/legal review. | Closed at product-policy level; schedule/legal details deferred |
| P8-F08 | P1 | Quarantine source-provider remote storage boundary needed an explicit authorization cross-reference | QUAR-029 already required separate owner approval plus explicit consent; QUAR-036 distinguished a cloud source provider from ZeroDeck upload. | Updated QUAR-036 to state that disclosure alone never authorizes remote transfer; the separate owner-approved capability and explicit-consent gate remains controlling. Platform-specific cloud-provider handling remains architecture work. | Closed at product-policy level; platform handling deferred |
| P8-F09 | P2 | Related owner questions duplicated the same gate-propagation decision | ZD-Q-AUTH-013, ZD-Q-WEB-011 and ZD-Q-SYS-013 overlap. | All three now reference the shared Phase 9 owner decision ZD-DEC-PHASE9-2026-11-28. They retain their domain-specific subquestions without independent conflicting policy. | Closed at product-policy level; timing deferred |
| P8-F10 | P2 | Numeric resource and abuse bounds remain unspecified across capabilities | Authentication, file analysis, quarantine, website checking and shared-system resource values require evidence. | Explicitly deferred to architecture/performance/security/cost testing. No arbitrary numeric defaults were inserted. This is a valid handoff item, not an unresolved product-design decision. | Deferred to architecture/evidence |
| P8-F11 | P2 | Phase 3 authentication facet assessment was stale after owner decisions | Historical assessment predated eight owner decisions and recovery notification. | Preserved the original assessment and updated its post-decision addendum in Phase 9 to reflect resolved original questions, AUTH-021 Messaging requirement and deferred delivery mechanics. | Closed |
| P8-F12 | P2 | Some cross-cutting dependency links did not identify the real capability source | SYS-006/008, SYS-014/015, SYS-022, SYS-024, SYS-026 and related dependencies were semantically reviewed. | Reconciled SYS-001–028 dependency arrays against requirement meanings, removed unrelated links and added actual prerequisite sources. | Closed |

## 1. Contradictions

No direct contradiction was found between the owner-approved MVP-03 two-gate/no-call invariant and the current cross-cutting gate rule. Both require independent positive Pro entitlement and owner activation before a provider call. The unresolved in-flight case is a missing policy boundary, not a proven contradiction.

No direct contradiction was found between MVP-01's default on-device analysis and MVP-02's default device-local quarantine policy. The remote source-provider boundary in QUAR-036 is an ambiguity that must remain subordinate to QUAR-029's explicit owner-approval and user-consent requirement.

The review did identify projection drift (P8-F01), corrected during Phase 8.

## 2. Missing states and policy boundaries

The following remain explicitly unresolved rather than silently inferred:
- gate revocation after provider dispatch, including queued and in-flight work;
- notification delivery failure after successful recovery;
- account deletion propagation to backups, retained audit records and restored state;
- remote/cloud-backed source-provider handling for quarantine;
- quarantine expiry when purge fails, storage is unavailable or app data is removed;
- exact retention, resource, rate, timeout and concurrency limits;
- cross-record atomicity and crash recovery during authentication/account lifecycle changes.

## 3. Authority

Phase 9 records owner approval of the product-level recommendations in ZD-DEC-PHASE9-2026-11-28. Technical/provider/legal details remain deferred; unrelated PM-proposed requirements retain their original status. No blanket approval of every PM-authored requirement or architecture choice is implied.
