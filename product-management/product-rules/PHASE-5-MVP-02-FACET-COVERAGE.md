# Phase 5 — MVP-02 Quarantine and File Disposition: 15-Facet Coverage

**Date:** 2026-11-28  
**Contract:** `ZD-CONTRACT-QUARANTINE-DISPOSITION` v0.1.0-draft  
**Authority:** Software Rules 0.3.0 Draft 15-facet catalogue; PM applicability assessment only  
**Evidence boundary:** No ZeroDeck quarantine runtime was exercised. This document assesses required product coverage, not implementation existence or runtime conformance.

## Assessment summary

All 15 official Software Rules facets were assessed. Ten are applicable to the MVP-02 product contract; five remain conditional on implementation/platform boundaries. No facet is declared globally irrelevant to ZeroDeck. Conditional does not mean absent; reassess when the actual implementation and supported platform/provider set are established.

| # | Official facet ID | MVP-02 status | Why / required product treatment | Contract links |
|---:|---|---|---|---|
| 1 | `interface` | Applicable | Users must understand eligibility, actual source disposition, quarantine state, restore/delete confirmation, limitations, retention and failure states. This is product communication, not pixel-level UI replication. | QUAR-001–004, 008, 014–015, 017, 019–025, 029, 031, 035 |
| 2 | `behavior` | Applicable | Eligibility, quarantine, source disposition, restore, deletion, expiry, retries, idempotency and interruption are explicit stateful workflows. | QUAR-001–005, 008–020, 023, 031–035 |
| 3 | `business-rules` | Applicable | Classification-to-disposition mapping, restore eligibility, destructive-action confirmation, retention and MVP boundaries are product rules. | QUAR-001–004, 014–015, 017, 019, 021–024, 038 |
| 4 | `data` | Applicable | Source/artifact identity, integrity references, lifecycle states, source disposition, metadata minimization and audit outcomes require defined data semantics. | QUAR-005–008, 016, 020, 030–031, 037–038 |
| 5 | `persistence` | Required | Quarantined bytes and item lifecycle records must survive the defined operation lifecycle; retention, purge, uninstall and backup consequences must be explicit. | QUAR-005–009, 016, 018, 022–023, 025–028, 031–034, 037–038 |
| 6 | `api` | Conditional | No ZeroDeck API or remote quarantine service is selected. If a future implementation uses an API for metadata, sync, backup or file transfer, its authorization, data exposure, consistency, retries and failure semantics must be specified. | Conditional dependency for QUAR-026, 029–030, 036–037 |
| 7 | `messaging` | Conditional | No broker, queue or event-delivery architecture is established. If asynchronous disposition/expiry jobs or notifications use messages, duplication, ordering, acknowledgement and retry semantics must be captured. | Conditional dependency for QUAR-023, 031–033, 037 |
| 8 | `identity-authentication` | Conditional | Local file selection and device-local quarantine do not by themselves require an account. If account-linked sync, cloud backup or remote management is introduced, use the separate authentication contract and establish principal/session lifecycle. | Conditional dependency for QUAR-026, 029–030, 037 |
| 9 | `authorization-permissions` | Applicable | File reads/writes/deletes depend on user grants, provider capabilities and the exact target artifact. Quarantine records/metadata also need an access boundary. | QUAR-010–011, 017, 019, 030, 035, 037 |
| 10 | `security-controls` | Applicable | Containment, no execution, integrity, safe source-removal order, key protection if encrypted, local-first handling, metadata protection and truthful deletion claims are central security controls. | QUAR-003–010, 013–017, 021, 024–030, 034–037 |
| 11 | `background-processing` | Conditional | Automatic/background protection is excluded. A user-requested operation or retention expiry may use an internal worker, but no queue, scheduler or autonomous scan is assumed. If used, lifecycle and recovery must be captured. | Conditional dependency for QUAR-023, 032–034 |
| 12 | `errors-recovery` | Applicable | Provider failure, revoked permission, partial copy, integrity mismatch, restore conflict, delete failure, key loss, process death, storage exhaustion and interrupted purge need truthful recoverable states. | QUAR-005, 007–012, 016–018, 020, 023, 025–028, 032–034 |
| 13 | `integrations` | Conditional | Android SAF and browser file-system APIs are platform interfaces; exact provider and browser integration choices/capabilities are not selected. Reassess each supported provider/browser and any remote storage dependency. | Conditional dependency for QUAR-010–012, 027–029, 035–036 |
| 14 | `configuration` | Applicable | Eligibility thresholds, retention, encryption choice, file/capacity limits, platform support and operation policy need documented effective values and owner-approved defaults before release. | QUAR-001–002, 022–023, 027, 029, 034–035 |
| 15 | `performance-resource-behavior` | Applicable | Copy, verification, encryption if selected, restore and purge consume storage, I/O, CPU, memory and time. Capacity and workload limits must be measured; no numeric target is invented. | QUAR-027–028, 032–034 |

## Cross-facet relationships

1. **Eligibility:** MVP-01 result/data → Business Rules → Configuration → Behaviour → Interface. An analysis label must not independently authorize an action unless the approved policy says so.
2. **Quarantine commit:** Authorization/Permissions → Data identity → Persistence write → Security/integrity verification → separate source disposition → Behaviour state → Interface result.
3. **Restore:** fresh MVP-01 analysis → restore eligibility → user confirmation → destination permission/conflict → integrity verification → persistence/state update → user communication.
4. **Deletion:** item-specific confirmation → authorization/provider capability → delete operation → provider outcome → record retention/update → truthful wording. Deletion is not synonymous with secure erasure.
5. **Interruption:** Behaviour + Persistence + Errors/Recovery must reconcile actual source/artifact/metadata state after process death; conditional Background Processing applies only if a worker/job is selected.
6. **Privacy and key lifecycle:** Data + Security Controls + Persistence + Configuration + conditional Integrations must agree on content location, metadata, keys, backup and deletion.
7. **Cross-platform boundary:** Interface, Behaviour, Authorization and Errors must share product semantics while exposing only operations supported by each platform/provider.
8. **Resource constraints:** Performance/Resource Behaviour and Configuration must define capacity and size limits; failure must not evict or corrupt existing quarantined items.

## Coverage limitations

- Facet coverage does not prove the implementation exists or behaves as specified.
- No Android device/provider matrix or browser capability matrix was tested.
- No actual file-copy, move, delete, restore, integrity, key-loss, uninstall, backup, or crash-recovery runtime test was performed.
- API, Messaging, Identity/Authentication, Background Processing and Integrations remain conditional because no such ZeroDeck implementation boundary is selected. They must not be marked absent merely because no implementation was inspected.
- Interface coverage concerns observable product communication and action states; visual hierarchy, exact styles and geometry belong to separate interface reverse-engineering work.
