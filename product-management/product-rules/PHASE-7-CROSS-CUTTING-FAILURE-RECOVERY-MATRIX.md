# Phase 7 — Cross-Cutting Negative, Failure and Recovery Matrix

**Scenario count:** 58  
**Coverage:** shared identity, authorization, data, privacy, configuration, environment, dependencies, resilience, backup/restore, audit, observability, capacity, release, compatibility and support.

| ID | Failure/boundary | Given | When | Required outcome | Requirement traceability |
|---|---|---|---|---|---|
| SYS-F01 | identity principal mismatch | same account is used on web and Android | one platform resolves a different account principal | operation denied/corrected; no cross-account data exposure | ZD-SYS-001 |
| SYS-F02 | platform capability unsupported | capability is unavailable on one platform | user attempts it | limitation and alternative shown; no false parity | ZD-SYS-002 |
| SYS-F03 | forged client entitlement | client claims Pro when server says inactive | MVP-03 call requested | server denies; no provider dispatch | ZD-SYS-003; ZD-SYS-004 |
| SYS-F04 | owner switch disabled | owner-controlled activation is off | MVP-03 call requested | no provider dispatch | ZD-SYS-004 |
| SYS-F05 | gate state unknown | entitlement or activation cannot be positively checked | MVP-03 dispatch considered | fail closed; no provider dispatch | ZD-SYS-004; ZD-SYS-010 |
| SYS-F06 | one gate inferred | one eligibility gate is positive and the other unchecked | provider call considered | no call until both independently pass | ZD-SYS-004 |
| SYS-F07 | stale client permission | client retains old permission after revocation | new protected operation evaluated | authoritative service denies | ZD-SYS-005 |
| SYS-F08 | unmapped data category | new personal or file-derived data is introduced | processing begins | purpose/access boundary documented first | ZD-SYS-006 |
| SYS-F09 | unnecessary provider payload | external call includes unrelated account metadata | payload assembled | unnecessary data excluded | ZD-SYS-007 |
| SYS-F10 | missing retention policy | new system-managed data is persisted | lifecycle reviewed | policy required; no indefinite implicit retention | ZD-SYS-008 |
| SYS-F11 | secret in client bundle | server-only credential included in client artifact | release inspected | release blocked or secret rotated; no exposure | ZD-SYS-009 |
| SYS-F12 | secret in error log | secret appears in thrown error/trace | diagnostic emitted | redaction prevents disclosure | ZD-SYS-009; ZD-SYS-017 |
| SYS-F13 | missing activation config | required owner activation value absent | MVP-03 initializes | MVP-03 fails closed | ZD-SYS-010 |
| SYS-F14 | malformed config | activation/service config is malformed | capability initializes | affected operation unavailable; operator signal | ZD-SYS-010 |
| SYS-F15 | test credential in production | test key presented to production service | protected operation requested | credential rejected | ZD-SYS-011 |
| SYS-F16 | test activation leaks | non-production enabled switch copied into production | MVP-03 request received | production authority decides; test value cannot authorize | ZD-SYS-011 |
| SYS-F17 | database outage | required database unavailable | account operation requested | explicit unavailable/failure; no false success | ZD-SYS-012 |
| SYS-F18 | provider timeout | required provider times out | URL check in progress | unknown/failed result, not clean/success | ZD-SYS-012 |
| SYS-F19 | partial dependency failure | optional URL provider down | user uses file analysis | unrelated capability remains available if dependencies permit | ZD-SYS-013 |
| SYS-F20 | shared dependency failure | shared identity service down | user requests protected capability | affected operations unavailable; status truthful | ZD-SYS-012; ZD-SYS-013 |
| SYS-F21 | backend backup missing | critical backend record has no recovery coverage | recovery policy reviewed | gap and consequence documented | ZD-SYS-014 |
| SYS-F22 | local files assumed backed up | backup plan includes file/quarantine content without product decision | backup scope defined | no implicit central file backup; local artifacts distinguished | ZD-SYS-014 |
| SYS-F23 | corrupt restored state | restored entitlement record is corrupt | protected operation resumes | integrity check blocks authorization | ZD-SYS-015 |
| SYS-F24 | stale activation restored | restore reintroduces stale enabled state | MVP-03 request evaluated | authoritative activation reconciled before dispatch | ZD-SYS-004; ZD-SYS-015 |
| SYS-F25 | admin change unaudited | owner activation changed with no record | change completes | access-controlled audit record available | ZD-SYS-016 |
| SYS-F26 | audit includes secret | audit event serializes secret value | event retained | secret excluded/redacted | ZD-SYS-016; ZD-SYS-017 |
| SYS-F27 | URL query leaked | sensitive URL query written to ordinary log | diagnostic emitted | sensitive component redacted | ZD-SYS-017 |
| SYS-F28 | file bytes in diagnostics | file content included in error report | diagnostic emitted | file content excluded | ZD-SYS-017 |
| SYS-F29 | health endpoint leaks user data | health output includes account data | operator inspects health | privacy-safe health summary only | ZD-SYS-018 |
| SYS-F30 | dependency failure invisible | provider outage has no health signal | operator checks status | affected dependency/failure class visible | ZD-SYS-018 |
| SYS-F31 | incident unrecorded | security incident resolved without record | post-incident review | scope/timeline/containment/resolution retained | ZD-SYS-019 |
| SYS-F32 | incident retention undefined | incident logs lack retention policy | retention review | open policy escalated; no invented schedule | ZD-SYS-008; ZD-SYS-019 |
| SYS-F33 | unbounded scan resources | file analysis has no documented resource bound | large file submitted | operation bounded by capability limit | ZD-SYS-020 |
| SYS-F34 | unbounded storage | quarantine/metadata storage grows without bound | capacity limit approached | documented storage policy/limit applies | ZD-SYS-020 |
| SYS-F35 | quota exhaustion | MVP-03 provider usage limit reached | new URL check requested | explicit bounded rejection; no provider call beyond allowance | ZD-SYS-020; ZD-SYS-021 |
| SYS-F36 | overload silent loss | service at capacity accepts request then drops it | new request arrives | explicit rejected/deferred state | ZD-SYS-021 |
| SYS-F37 | retry storm | clients retry repeated failures aggressively | dependency unavailable | bounded retry/acceptance policy; no unbounded resource use | ZD-SYS-020; ZD-SYS-021 |
| SYS-F38 | unknown provider owner | new external API introduced | production reliance proposed | owner/failure impact/exit path documented | ZD-SYS-022 |
| SYS-F39 | provider outage cascade | external provider outage disables unrelated capabilities | unrelated operation invoked | failure isolated to dependent capability | ZD-SYS-013; ZD-SYS-022 |
| SYS-F40 | malformed provider response | provider returns unexpected fields | response parsed | invalid response rejected or shown as unknown | ZD-SYS-023 |
| SYS-F41 | provider policy override | provider response indicates user entitlement | authorization evaluated | provider data cannot override trusted entitlement/activation | ZD-SYS-003; ZD-SYS-023 |
| SYS-F42 | duplicate deletion request | same logical account deletion submitted twice | retry occurs | no unintended duplicate effects; defined result | ZD-SYS-024 |
| SYS-F43 | duplicate activation change | admin retries after uncertain response | same change received again | idempotent or explicitly reconciled outcome | ZD-SYS-016; ZD-SYS-024 |
| SYS-F44 | tampered update artifact | update payload altered | verification occurs | artifact rejected | ZD-SYS-025 |
| SYS-F45 | wrong release identity | artifact metadata mismatches intended release | update accepted | artifact rejected | ZD-SYS-025 |
| SYS-F46 | unsupported client version | old Android client calls changed operation | request reaches service | safe compatibility response; no unsafe operation | ZD-SYS-026 |
| SYS-F47 | web/backend incompatibility | new backend semantics incompatible with deployed web client | operation requested | operation blocked or compatibility path applied | ZD-SYS-026 |
| SYS-F48 | status overclaims completion | file scan interrupted but UI says complete | result shown | truthful incomplete state shown | ZD-SYS-027 |
| SYS-F49 | scope overclaim | one URL checked but product implies whole site scanned | result shown | scope limited to one submitted URL | ZD-SYS-027 |
| SYS-F50 | export leaks another account | export request references another account | data returned | authorization prevents cross-account disclosure | ZD-SYS-003; ZD-SYS-028 |
| SYS-F51 | export reveals secret | account export includes server-only secret | export generated | secret excluded | ZD-SYS-009; ZD-SYS-028 |
| SYS-F52 | backup/deletion conflict | account deletion and backup retention overlap | deletion processed | documented exception/expiry policy applied; schedule remains open | ZD-SYS-008; ZD-SYS-014 |
| SYS-F53 | cross-platform stale settings | web and Android show conflicting shared account state | user views settings | authoritative state used; conflict surfaced | ZD-SYS-001; ZD-SYS-005 |
| SYS-F54 | maintenance unknown | planned maintenance affects a capability | user invokes operation | truthful unavailable/maintenance status where known | ZD-SYS-027 |
| SYS-F55 | support asks for raw data | support workflow requests full file/URL unnecessarily | incident diagnosed | minimum necessary redacted diagnostic used | ZD-SYS-007; ZD-SYS-017 |
| SYS-F56 | restore before auth check | service restored from snapshot | protected operation resumes | authorization-sensitive state validated first | ZD-SYS-015 |
| SYS-F57 | provider contract silently changes | provider changes response contract | response consumed | validation prevents unsafe downstream use; operator can identify change | ZD-SYS-022; ZD-SYS-023 |
| SYS-F58 | missing version support policy | unsupported version not identified | protected action attempted | unsupported semantics are not silently accepted | ZD-SYS-026 |

## Coverage check

Every Phase 7 requirement ID ZD-SYS-001 through ZD-SYS-028 is referenced by at least one scenario. Scenarios describe product-level expected outcomes; they are not evidence that runtime tests have passed.
