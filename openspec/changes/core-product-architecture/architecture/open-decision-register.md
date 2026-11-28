# Architecture Open-Decision Register

**Status:** Open; no values or providers are selected by this register.  
**Authority:** Phase 9 question disposition register and owner-decision register.  
**Rule:** A deferred question is not an implied approval. Resolve it with evidence and the named authority before the affected release gate. Do not invent numeric defaults.

## AUTH — identity, authentication and account lifecycle

| Question | Deferred decision / evidence required | Next owner/stage | Gate |
|---|---|---|---|
| ZD-Q-AUTH-009 | Email normalization boundaries are recorded; challenge expiry, resend limits and delivery operations need the chosen workflow and security review | Architecture/security | Before recovery/verification release |
| ZD-Q-AUTH-010 | Rate limits, progressive delays and temporary restrictions; numeric thresholds need security/usability testing | Architecture/security testing | Before public authentication release |
| ZD-Q-AUTH-011 | Secure renewal rotation/replay handling is required; exact cadence and edge cases need architecture/tests | Architecture | Before session renewal release |
| ZD-Q-AUTH-012 | Personal-data deletion schedule, statutory categories and justified retention exceptions | Architecture + qualified legal review | Before account deletion production release |
| ZD-Q-AUTH-013 | Revocation propagation bounds and cancellation mechanics across clients and queued/dispatched work | Architecture + measured tests | Before protected async/provider work release |

## FILE — manual file analysis

| Question | Deferred decision / evidence required | Next owner/stage | Gate |
|---|---|---|---|
| ZD-Q-FILE-001 | Supported file types, size/count/archive limits, encrypted/password-protected inputs | Engine/platform evaluation | Before publishing support matrix |
| ZD-Q-FILE-002 | Analysis engine and threat-intelligence sources; accuracy, licensing, redistribution, privacy, update trust and cost | Architecture/provider evaluation + owner approval | Before production scanning capability |
| ZD-Q-FILE-003 | Evidence thresholds/confidence calibration for four result classes; representative validation corpus required | Security validation | Before detection claims/release |
| ZD-Q-FILE-004 | Cloud analysis is not MVP; any future capability requires separate owner approval and explicit consent | Product Owner / future scope | Prohibited in current MVP |
| ZD-Q-FILE-005 | Retained content/metadata/result purpose, duration and deletion path | Architecture/privacy/legal | Before any post-scan retention |
| ZD-Q-FILE-006 | Device/server budgets, concurrency and representative workloads | Architecture/performance testing | Before supported workload/limits published |
| ZD-Q-FILE-007 | Web browser, Android OS/device and file-access support matrix | Architecture/platform testing + owner scope confirmation | Before platform capability claims |
| ZD-Q-FILE-008 | Fingerprint/hash algorithm, encoding and exact purpose, if needed | Architecture/security review | Before integrity/fingerprint contract |
| ZD-Q-FILE-009 | Meaningful progress granularity and cancellation guarantees of selected engine/platform | Architecture/platform testing | Before progress/cancellation promises |

## QUAR — quarantine and file disposition

| Question | Deferred decision / evidence required | Next owner/stage | Gate |
|---|---|---|---|
| ZD-Q-QUAR-002 | Validated confirmed-threat threshold; suspicious/inconclusive/unanalysed items remain ineligible; explicit confirmation still required | Security validation | Before quarantine eligibility is released |
| ZD-Q-QUAR-003 | Platform-specific isolation, copy/move semantics and provider capability checks | Architecture/platform design | Before each platform's quarantine release |
| ZD-Q-QUAR-005 | Fresh-analysis window and exact eligible restore result classes | Architecture/security validation | Before restore release |
| ZD-Q-QUAR-006 | Integrity identifier/algorithm and metadata binding | Architecture/security | Before quarantine/restore implementation is finalized |
| ZD-Q-QUAR-008 | Retention duration, start event, expiry action and exceptions; no assumed 30-day value | Product Owner + legal/architecture | Before quarantine release |
| ZD-Q-QUAR-010 | Encryption algorithm, key protection, rotation, recovery and hardware-support policy; established mechanisms only | Architecture/security | Before storing quarantined content |
| ZD-Q-QUAR-011 | Backup metadata, uninstall/data-clear, transfer and device-loss consequences; contents/keys not backed up by default | Architecture/privacy | Before quarantine release |
| ZD-Q-QUAR-012 | Web quarantine/restore operations proven by browser file permissions and storage capabilities | Architecture/platform testing | Before Web quarantine is enabled |
| ZD-Q-QUAR-013 | File and aggregate capacity limits, low-storage behaviour; no automatic eviction of existing items | Architecture/performance testing | Before capacity policy is published |
| ZD-Q-QUAR-014 | Minimal audit fields, access roles and retention period | Architecture/legal review | Before lifecycle audit is enabled in production |

## WEB — website and link checking

| Question | Deferred decision / evidence required | Next owner/stage | Gate |
|---|---|---|---|
| ZD-Q-WEB-003 | URL scheme/host normalization, IDN, port, path/query/fragment semantics against selected provider contract | Architecture/provider integration | Before production provider dispatch |
| ZD-Q-WEB-005 | Provider selection after accuracy, licensing, commercial terms, geography, privacy/data processing, availability, cost and exit review | Architecture/provider evaluation + owner approval | Before any production provider call |
| ZD-Q-WEB-007 | Maximum URL length and input complexity from provider/platform constraints | Architecture/provider testing | Before production provider dispatch |
| ZD-Q-WEB-008 | Timeout, response-size and concurrency bounds from provider/workload evidence | Architecture/performance testing | Before production provider dispatch |
| ZD-Q-WEB-009 | Per-account/global rate limits, quota and reset semantics; evidence and owner confirmation | Architecture/cost review + owner approval | Before production provider activation |
| ZD-Q-WEB-010 | Hard spend ceiling, monitoring/alerts and emergency stop; numeric ceiling needs cost model and owner approval | Architecture/cost review + owner approval | Before production provider activation |
| ZD-Q-WEB-011 | Gate-revocation propagation bounds across clients and queued work | Architecture + measured tests | Before production provider dispatch |
| ZD-Q-WEB-012 | Cancellation mechanics for queued and already-dispatched provider requests | Architecture/provider tests | Before production provider dispatch |
| ZD-Q-WEB-015 | Minimal audit fields, access roles and retention excluding raw URL/credentials/sensitive query | Architecture/privacy review | Before production audit |
| ZD-Q-WEB-016 | Web/Android compatibility matrix for link input and request lifecycle | Architecture/platform testing + owner scope confirmation | Before platform release |

## SYS — shared system qualities and operations

| Question | Deferred decision / evidence required | Next owner/stage | Gate |
|---|---|---|---|
| ZD-Q-SYS-001 | Internal availability targets based on reliability and cost evidence | Architecture/operations | Before production readiness |
| ZD-Q-SYS-002 | RTO/RPO for backend account, entitlement, activation and audit state | Architecture/operations | Before production data is relied upon |
| ZD-Q-SYS-004 | Separate expiry/retention for backups, audit, diagnostics and incident records; legal exceptions | Architecture/legal | Before production data retention |
| ZD-Q-SYS-005 | Data classification and least-privilege role/access model | Architecture/security | Before production data access |
| ZD-Q-SYS-006 | Launch jurisdictions and applicable privacy/legal obligations | Qualified legal review | Before public launch |
| ZD-Q-SYS-007 | Exact diagnostic/security event fields and access permissions; exclude passwords, secrets, file contents and sensitive URL components | Architecture/security | Before production logging |
| ZD-Q-SYS-008 | Incident severity, escalation ownership and user/regulatory notification rules | Operations/legal | Before production launch |
| ZD-Q-SYS-009 | Concurrency, request, storage, timeout and resource limits from workload/safety/cost testing | Architecture/performance | Before supported scale is published |
| ZD-Q-SYS-010 | Compatibility matrix and end-of-support policy | Architecture/platform testing + owner scope confirmation | Before platform release |
| ZD-Q-SYS-011 | Signed release artifacts, provenance, rollback and emergency withdrawal; trust roots and channels | Architecture/security/operations | Before production release |
| ZD-Q-SYS-012 | Per-dependency purpose, terms, privacy/security, cost, failure impact, exit plan and accountable owner | Architecture/provider evaluation + owner approval | Before any production-critical dependency |
| ZD-Q-SYS-013 | Shared authorization revocation propagation and cancellation bounds | Architecture + measured tests | Before protected asynchronous work |
| ZD-Q-SYS-015 | Conflict/version resolution and synchronization for server-authoritative state | Architecture | Before offline/stale client behaviour is relied upon |
| ZD-Q-SYS-017 | Backup lifecycle interaction with account deletion and justified immutable audit retention | Architecture/legal | Before production retention/backup |
| ZD-Q-SYS-018 | Real support channel, accountable owner and realistic response expectations; no SLA promise before capacity exists | Operations/owner review | Before support commitments |

## Resolved questions that must not be reopened by implementation

The following are resolved at product-policy level and are not implementation defaults to reinterpret:

- `ZD-Q-QUAR-001`: explicit user confirmation; automatic quarantine is not MVP.
- `ZD-Q-QUAR-004`: ask before attempting original removal after verified copy.
- `ZD-Q-QUAR-007`: no secure/forensic erasure promise.
- `ZD-Q-QUAR-009`: user-configurable retention is out of MVP; manual purge and notice follow approved policy.
- `ZD-Q-WEB-001`: HTTP/HTTPS only.
- `ZD-Q-WEB-002`: provider URL lookup only; not destination fetching/crawling/probing.
- `ZD-Q-WEB-004`: no arbitrary destination redirect following.
- `ZD-Q-WEB-006`: preserve distinct outcomes; no-match is not a safety guarantee.
- `ZD-Q-WEB-013`: no default persistence of submitted URLs, full provider responses or check results.
- `ZD-Q-WEB-014`: disclose URL-related information, purpose and recipient and obtain required explicit consent before provider disclosure.
- `ZD-Q-WEB-017`: caching off by default; enable only if terms allow and freshness/expiry is defined.
- `ZD-Q-WEB-018`: explain verdict limitations; no safe/harmless claim for no-match.
- `ZD-Q-SYS-003`: back up only necessary backend-managed data; file bytes and quarantine contents/keys excluded by default.
- `ZD-Q-SYS-014`: standalone data export out of MVP unless a confirmed legal requirement applies.
- `ZD-Q-SYS-016`: give advance notice of planned maintenance where practical.

## Resolution protocol

1. Identify the question and the contract/owner-decision source.
2. Gather technical evidence and test the relevant platform/provider behaviour.
3. State alternatives, failure modes, privacy/security/cost implications and the effect on user-visible policy.
4. Obtain Product Owner approval where the disposition requires it; obtain qualified legal/security/operations review where indicated.
5. Update this register, the relevant architecture decision record and the affected task acceptance criteria.
6. If the answer changes product policy or scope, return to Product Management/Product Owner and amend the canonical contract before implementation proceeds.
