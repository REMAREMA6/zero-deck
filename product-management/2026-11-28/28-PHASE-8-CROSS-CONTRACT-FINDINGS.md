# Phase 8 — Contradiction, Ambiguity and Missing-State Register

**Status:** Findings recorded; owner/policy items remain open  
**Severity:** P0 = threatens a core safety/authorization invariant; P1 = blocks reliable traceability or release definition; P2 = material completeness/operational issue

| ID | Severity | Finding | Evidence | Disposition / required action | Status |
|---|---|---|---|---|---|
| P8-F01 | P1 | Authentication structured projection statement drift | AUTH-002, AUTH-006, AUTH-020 and AUTH-021 projection statement text differed from canonical Markdown | Corrected the four projection statements to match canonical Markdown. No Markdown requirement wording or owner decision was changed. Re-run parity check. | Corrected |
| P8-F02 | P1 | Acceptance-criterion ID format violates PM profile | Profile requires ZD-CAPABILITY-AC-NN. 231/259 current criterion IDs use a different pattern; 28 SYS IDs conform. All 259 are unique. | Plan a coordinated identity migration across Markdown, projections, matrices and references. Do not rename IDs piecemeal or silently break references. Owner/PM approval required for the migration scope. | Open |
| P8-F03 | P1 | Cross-cutting dependency metadata is semantically misdirected | SYS-003 points to AUTH-025 rather than core server authorization AUTH-016; SYS-012 points to minimization/cancellation rules rather than FILE-018, QUAR-033 and WEB-024; SYS-020/021 point to unrelated requirements rather than FILE-026, QUAR-034 and WEB-031; SYS-023 omits WEB-020; SYS-028 points to AUTH-007 rather than AUTH-026. | Re-map dependencies according to the profile definition (prerequisites that must be satisfied first or together), then validate the graph. No dangling IDs exist, but semantic traceability is defective. | Open |
| P8-F04 | P1 | Quarantine's dependency on manual analysis is not explicit in structured metadata | QUAR-001 applies eligibility to a completed MVP-01 result; QUAR-014 requires fresh MVP-01 analysis before restore. Their structured dependencies are empty. | Add explicit dependencies to the relevant FILE result/attempt requirements (at minimum FILE-001/012/015 as applicable) and validate the lifecycle graph. Keep the normative boundary unchanged unless review reveals a real policy gap. | Open |
| P8-F05 | P1 | Recovery notification is not fully represented in the normative requirement/facet mapping | Owner decision ZD-DEC-AUTH-2026-11-28 says successful recovery revokes sessions and notifies the account owner. AUTH-021 acceptance criterion says a security notification is sent, but its normative statement omits notification and its facetRefs omit Messaging. Phase 3 Messaging assessment is stale. | Reconcile AUTH-021 against the recorded owner decision; map Messaging where applicable; specify or ask the owner about delivery failure, retry, acknowledgement and duplicate handling. Do not invent channel policy beyond the verified-email decision. | Open |
| P8-F06 | P1 | MVP-03 revocation propagation and in-flight dispatch remain unresolved | WEB-029/030 address activation/entitlement changes; ZD-Q-WEB-011/012 and ZD-Q-SYS-013 ask about propagation and in-flight calls; ZD-Q-AUTH-013 asks the related propagation bound. | Consolidate the shared owner decision or cross-reference the three questions. Define the bound and treatment of already-dispatched, queued and subsequent provider calls. Preserve the no-call invariant whenever either gate is false or unknown. | Open |
| P8-F07 | P1 | Account deletion is not reconciled with backups and immutable audit records | AUTH-026 requires immediate access disable/revocation and scheduled personal-data deletion; ZD-Q-SYS-017 asks how deletion propagates into backups and immutable audit; ZD-Q-SYS-004 asks retention/expiry for backups and audit. | Owner must decide deletion schedule, justified retained categories, backup expiry and audit exception handling as one coherent lifecycle policy. | Open |
| P8-F08 | P1 | Quarantine source-provider remote storage boundary needs an explicit authorization cross-reference | QUAR-029 defaults quarantine content to device-local and forbids upload absent separate owner-approved capability plus explicit user consent. QUAR-036 requires disclosure of remote storage/processing and distinguishes a provider's cloud source from a ZeroDeck upload. | Clarify in the contract that disclosure alone does not authorize remote transfer; the QUAR-029 approval-and-consent gate remains controlling. Confirm behaviour for cloud-backed source providers. | Open |
| P8-F09 | P2 | Related owner questions duplicate the same gate-propagation decision | ZD-Q-AUTH-013, ZD-Q-WEB-011 and ZD-Q-SYS-013 overlap on authorization/entitlement/activation propagation across web, Android and in-flight work. | Keep the three scopes if useful, but link them to one canonical owner decision so conflicting answers cannot be recorded independently. | Open |
| P8-F10 | P2 | Numeric resource and abuse bounds remain unspecified across capabilities | ZD-Q-AUTH-010; ZD-Q-FILE-006; ZD-Q-QUAR-013; ZD-Q-WEB-008–010 (timeout, response/concurrency, rate/quota and spend bounds); ZD-Q-SYS-009. | Record numeric limits only after workload, platform, cost and safety evidence. Do not substitute arbitrary defaults. | Open |
| P8-F11 | P2 | Phase 3 authentication facet assessment is stale after owner decisions | It still describes ZD-Q-AUTH-001–008 as unresolved and Messaging as not applicable/conditional; eight original questions were later resolved and recovery notification was approved. | Preserve the original historical assessment and add a Phase 8 reconciliation note reflecting current owner decisions and the AUTH-021 Messaging gap. | Reconciled by this Phase 8 assessment; contract fix remains open |
| P8-F12 | P2 | Some cross-cutting dependency links do not identify the real capability source | SYS-006/008 use AUTH-007 (authentication abuse); SYS-014/015 use AUTH-025 (step-up authentication) for backend recovery/restore concerns; SYS-022 uses WEB-005 (user initiation) for external dependency lifecycle; SYS-024 uses credential verification/abuse and MVP-03 gates for idempotency; SYS-026 uses step-up authentication and Pro eligibility for compatibility. | Review all SYS-001–028 dependency arrays against their requirement meanings, not merely ID existence. Correct or remove non-prerequisite links and add the actual source requirements. | Open |

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

The review does not approve any PM-proposed requirement or settle any open owner question. The eight authentication decisions and the MVP-03 scope decision remain the only applicable owner-approved policy sources. All other recommendations are returned to the owner for review.
