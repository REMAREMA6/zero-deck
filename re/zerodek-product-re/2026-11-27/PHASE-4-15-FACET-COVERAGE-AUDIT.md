# Phase 4 — 15-facet coverage audit

**Project:** ZeroDeck reverse engineering  
**Date:** 2026-11-27  
**Status:** Complete for source-level evidence classification and unresolved-property handoff.  
**Companion:** [PHASE-4-SOURCE-RULE-EXTRACTION.md](PHASE-4-SOURCE-RULE-EXTRACTION.md)

## Method

The governing Software Rules 0.3.0 Draft facet catalogue defines 15 observation perspectives. A facet is not a code module and must not be marked absent merely because a selected reference does not exercise it. This audit checks all 15 facets against each owner-approved MVP capability.

Evidence classes:
- **E:** source-derived or documented platform/provider evidence exists; not ZeroDeck runtime proof.
- **O:** owner-declared product intent exists.
- **U:** unresolved/not established.
- **C:** conditional on a product or architecture decision.

## Coverage matrix

| # | Facet | MVP-01 Manual file analysis | MVP-02 Quarantine/disposition | MVP-03 Website/link checking |
|---:|---|---|---|---|
| 1 | Interface | U — design inventory only; no runtime capture. | U — no runtime quarantine/restore/delete states. | U — no runtime input/result states or wording. |
| 2 | Behaviour | E/U — Hypatia file expansion, hashing, readiness, matching and cancellation patterns; ZeroDeck workflow unknown. | E/U — SAF operations and provider capabilities documented; ZeroDeck transitions unknown. | E/O/U — Lookup request/result/cache and owner gates known; ZeroDeck workflow unknown. |
| 3 | Business rules | E/U — hash/Bloom matching semantics in reference; ZeroDeck verdict policy unknown. | E/U — platform constraints documented; quarantine eligibility and restore/delete policy unknown. | E/O/U — threat-list semantics, expiry and Pro/activation intent; result mapping and quotas unknown. |
| 4 | Data | E/U — digest formats, feed data and Bloom structures; ZeroDeck schema unknown. | E/U — URI/document ID/capability flags; quarantine record schema unknown. | E/U — URI, threatTypes, ThreatUri, expireTime; ZeroDeck URL/result schema unknown. |
| 5 | Persistence | E/U — reference stores signature packs privately; ZeroDeck scan/quarantine persistence unknown. | E/U — Android storage/uninstall lifecycle documented; ZeroDeck isolation durability unknown. | E/U — positive cache contract; ZeroDeck cache/history store unknown. |
| 6 | API | C/U — no ZeroDeck API established. | C/U — no ZeroDeck quarantine API established. | E/U — provider REST contract known; ZeroDeck integration/backend contract unselected. |
| 7 | Messaging | U/C — no asynchronous message transport established. | U/C — no asynchronous message transport established. | U/C — Lookup is synchronous; no message contract established. |
| 8 | Identity/authentication | C/U — account/authentication not established as necessary for this workflow. | C/U — OS document grants are not app identity; user account model unselected. | O/U — Pro entitlement declared; principal/entitlement verification and lifecycle unknown. |
| 9 | Authorization/permissions | E/U — platform file access exists in reference; ZeroDeck grant/denial handling unknown. | E/U — SAF grants and provider operation flags documented; ZeroDeck enforcement unknown. | O/U — Pro and owner gates declared; enforcement and bypass resistance unknown. |
| 10 | Security controls | E/U — signature verification and digest matching in prior art; ZeroDeck threat model/trust policy unknown. | E/U — Keystore and storage boundaries documented; quarantine protection design unknown. | E/O/U — provider disclosure and gates known; privacy, secret and abuse controls unknown. |
| 11 | Background processing | E/U — Hypatia asynchronous scan/cancellation and generator workflow; ZeroDeck model unknown. | C/U — no deferred quarantine mechanism selected. | C/U — no background lookup/job model selected. |
| 12 | Errors/recovery | E/U — source catches/logs errors and handles unavailable DB/cancellation; ZeroDeck typed outcomes unknown. | E/U — provider capability/access failures are possible; rollback and recovery unknown. | E/U — response/no-match semantics known; timeout/retry/offline/quota mapping unknown. |
| 13 | Integrations | E/U — feed ingestion and database download reference; ZeroDeck feeds unselected. | E/U — SAF providers and Keystore documented; ZeroDeck platform integration unverified. | E/U — Web Risk provider contract; production provider unselected/not deployed. |
| 14 | Configuration | E/U — Hypatia preferences/capacities; ZeroDeck settings unknown. | E/U — Android SDK/storage conditions documented; supported ZeroDeck OS/SDK unknown. | E/O/U — threatTypes and separate gates; effective quota/activation settings unknown. |
| 15 | Performance/resource behaviour | E/U — buffer/timeouts/Bloom parameters in source; no ZeroDeck benchmark. | U — no quarantine workload benchmark or target. | E/U — single URL/request/cache constraints; no ZeroDeck performance measurement. |

## Required unresolved handoff

### MVP-01
- Runtime interface and complete states.
- Supported file types, URI access, file size/count, recursion and symlink rules.
- Local/remote analysis boundary and any consent.
- Selected threat intelligence, source rights, freshness and provenance.
- Verdict classes, confidence, false-positive policy and unsupported/inconclusive states.
- Persistence/history decision, typed errors, retry/cancel/progress semantics.
- Actual performance targets and measurements.

### MVP-02
- Quarantine storage strategy and isolation boundary.
- Copy/move/delete semantics and source-provider capability handling.
- Integrity verification and atomic commit/rollback.
- Encryption and key lifecycle, if required.
- Restore eligibility, re-scan, destination conflicts and user confirmation.
- Retention, purge, uninstall, backup and key-loss behaviour.
- Recovery from permission revocation, provider loss, process death, disk full and partial writes.

### MVP-03
- Provider procurement and exact threatTypes.
- URL validation/normalization, redirect and accepted-scheme policy.
- User disclosure/consent and sensitive URL treatment.
- Provider authentication, timeouts, retries, offline/provider/quota errors.
- Positive cache implementation and expiry; negative cache policy.
- Pro entitlement verification/lifecycle and owner activation authority.
- Per-user allowance, rate limits, global spend cap and alerts.
- User-facing result taxonomy and non-guarantee language.

## Interpretation

This audit establishes that every facet was considered and that evidence and unknowns were separated. It does not assert that every facet is applicable to every implementation, nor that a missing observation means a capability is absent. The Phase 4 exit gate is satisfied for source extraction; the unresolved properties remain mandatory inputs to Phase 5 synthesis and Phase 6 completeness/conformance.
