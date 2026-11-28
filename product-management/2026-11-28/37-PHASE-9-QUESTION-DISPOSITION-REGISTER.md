# Phase 9 — Question Disposition Register

**Decision reference:** ZD-DEC-PHASE9-2026-11-28  
**Total Phase 8 questions:** 64  
**Disposition:** 15 resolved at product-policy level; 49 deferred to architecture, evidence or specialist review.

### AUTH

| Question | Disposition | Owner-approved product direction / remaining handoff | Next stage |
|---|---|---|---|
| ZD-Q-AUTH-009 | deferred | Email policy: trim surrounding whitespace, compare the domain case-insensitively, preserve local-part semantics, and do not strip plus tags/dots or apply provider-specific alias rules globally. Verification challenge expiry, resend limits and delivery operations remain to be specified with the chosen identity workflow. | Architecture/security review |
| ZD-Q-AUTH-010 | deferred | Apply rate limits, progressive delays and temporary restrictions; do not use permanent lockouts as the normal abuse control. Numeric thresholds require security and usability testing. | Architecture/security testing |
| ZD-Q-AUTH-011 | deferred | Renewal credentials must rotate securely and replay must not restore a revoked session. Preserve the owner-approved 7-day inactivity and 30-day absolute limits. Exact cadence and edge cases require architecture design and testing. | Architecture |
| ZD-Q-AUTH-012 | deferred | User-initiated deletion immediately revokes sessions and disables account access. Personal data is deleted on a documented schedule; only justified records may be retained, with reason and period recorded. Exact schedules and statutory categories require legal review and architecture design. | Architecture/legal review |
| ZD-Q-AUTH-013 | deferred | One shared invariant applies across web and Android: newly evaluated operations and queued/not-yet-dispatched provider work are denied after authoritative revocation; already-dispatched work is cancelled where supported and must not trigger follow-on calls. Exact propagation bounds require architecture and measured tests. | Architecture |

### FILE

| Question | Disposition | Owner-approved product direction / remaining handoff | Next stage |
|---|---|---|---|
| ZD-Q-FILE-001 | deferred | Publish a tested support matrix covering file types and input constraints. Unsupported inputs are rejected truthfully. Exact size/count/archive/encrypted-file limits depend on engine and platform evidence. | Architecture/platform testing |
| ZD-Q-FILE-002 | deferred | Prefer on-device/local analysis. No cloud analysis or remote file-content transfer is part of MVP-01 unless a separate capability is explicitly approved. Select an engine and threat-intelligence sources only after accuracy, privacy, licensing, update trust and cost review. | Architecture/provider evaluation |
| ZD-Q-FILE-003 | deferred | Keep the four distinct result classes. Suspicious, partial, unavailable or inconclusive evidence must never be represented as safe. Exact evidence thresholds and confidence calibration require a representative validation corpus and engine evaluation. | Security validation |
| ZD-Q-FILE-004 | deferred | Optional cloud analysis is not part of MVP-01. Any future cloud-analysis capability requires separate owner approval, disclosure of data/purpose/recipient and explicit user consent before transmission. | Future scope / separate owner approval |
| ZD-Q-FILE-005 | deferred | Minimize file content and metadata processing. Do not retain file content after the active scan by default; any retained result/metadata requires a documented purpose, retention rule and user deletion path. Exact durations remain for policy/legal review. | Architecture/privacy review |
| ZD-Q-FILE-006 | deferred | Set device/server resource budgets, concurrency and workload targets only after representative benchmarks on intended platforms. Do not invent numeric limits. | Architecture/performance testing |
| ZD-Q-FILE-007 | deferred | Maintain a tested web/Android support matrix and disclose material capability differences. Exact browser, OS and device versions depend on compatibility testing and owner scope confirmation. | Architecture/platform testing |
| ZD-Q-FILE-008 | deferred | Use a file fingerprint only where needed for content identity or integrity; it is not evidence that a file is safe. Algorithm, encoding and exact uses remain architecture decisions. | Architecture |
| ZD-Q-FILE-009 | deferred | Show progress only when the analysis engine provides meaningful progress. Cancellation must stop safely at supported boundaries; exact progress granularity and cancellation guarantees depend on engine/platform capabilities. | Architecture/platform testing |

### QUAR

| Question | Disposition | Owner-approved product direction / remaining handoff | Next stage |
|---|---|---|---|
| ZD-Q-QUAR-001 | resolved | MVP-02 quarantine requires explicit user confirmation. Automatic quarantine is not enabled in MVP. | Owner-approved MVP policy |
| ZD-Q-QUAR-002 | deferred | Only an MVP-01 result that meets a documented, validated confirmed-threat policy may qualify. Suspicious, inconclusive, unsupported or unanalysed items are not confirmed threats. Exact evidence thresholds require engine validation. Even qualifying threats require explicit user confirmation in MVP. | Security validation |
| ZD-Q-QUAR-003 | deferred | Quarantine is local/app-controlled by default. Platform-specific isolation, copy/move semantics and provider capability checks belong to architecture. Remote transfer remains prohibited without a separate owner-approved capability and explicit user consent. | Architecture/platform design |
| ZD-Q-QUAR-004 | resolved | After a verified quarantine copy is created, ask the user before attempting to remove the original. Do not automatically delete the source file. | Owner-approved MVP policy |
| ZD-Q-QUAR-005 | deferred | A fresh MVP-01 analysis is required before restore. Threat-found, suspicious, inconclusive, incomplete or unavailable results do not authorize restore. Exact freshness window and allowed clean-result class require validation and architecture definition. | Architecture/security validation |
| ZD-Q-QUAR-006 | deferred | The product requires integrity binding between the original, quarantined artifact and restored output. Exact identifier algorithm and metadata representation are architecture decisions; no algorithm is selected in product design. | Architecture |
| ZD-Q-QUAR-007 | resolved | Describe deletion only according to what the platform/provider confirms. Do not promise secure erasure, forensic irrecoverability or removal from every storage layer without verified evidence. | Owner-approved product policy |
| ZD-Q-QUAR-008 | deferred | A retention period and start event must be documented before release. Do not assume a 30-day period. Provide advance expiry notice where supported and report purge failures truthfully; exact period and exceptions require owner/legal review. | Owner/legal review |
| ZD-Q-QUAR-009 | resolved | User-configurable retention is out of MVP-02. Provide manual purge controls and clear notice before expiry; exact notice timing follows the approved retention policy. | Owner-approved MVP policy |
| ZD-Q-QUAR-010 | deferred | Quarantined content must be protected at rest using encryption. Exact algorithm, platform key protection, rotation, recovery and hardware-support requirements belong to architecture; use established mechanisms, not custom cryptography. | Architecture/security design |
| ZD-Q-QUAR-011 | deferred | Do not back up quarantined file contents or their keys by default. Clearly warn about consequences of uninstall, data clearing, device transfer and device loss. Metadata backup and recovery behaviour require architecture/privacy review. | Architecture |
| ZD-Q-QUAR-012 | deferred | Web quarantine/restore supports only operations demonstrably available within browser file permissions. Do not promise device-wide isolation or deletion. Exact browser capability matrix requires testing. | Architecture/platform testing |
| ZD-Q-QUAR-013 | deferred | Set file-size and aggregate capacity limits from device/platform testing. Never automatically evict existing quarantined items to make room; reject or safely defer new work when capacity is insufficient. | Architecture/performance testing |
| ZD-Q-QUAR-014 | deferred | Retain only minimal lifecycle outcome records for quarantine, restore, deletion and expiry. Do not log file content. Exact fields, access roles and retention periods require architecture and legal review. | Architecture/legal review |

### WEB

| Question | Disposition | Owner-approved product direction / remaining handoff | Next stage |
|---|---|---|---|
| ZD-Q-WEB-001 | resolved | MVP-03 accepts HTTP and HTTPS URLs only. Other schemes and non-URL input forms are rejected. | Owner-approved MVP policy |
| ZD-Q-WEB-002 | resolved | MVP-03 uses a selected provider's URL-lookup service only. It is not a direct destination fetcher, crawler or arbitrary network probe. | Owner-approved MVP policy |
| ZD-Q-WEB-003 | deferred | Normalize scheme and hostname consistently while preserving meaningful path/query semantics. Exact parsing, IDN and canonicalization behaviour must be set during architecture against the selected provider contract. | Architecture/provider integration |
| ZD-Q-WEB-004 | resolved | Do not follow arbitrary destination redirects. Provider-reported redirect information may be displayed; any future outbound redirect request requires an explicit policy and fresh destination/gate checks. | Owner-approved MVP policy |
| ZD-Q-WEB-005 | deferred | Select a provider only after reviewing detection accuracy, licensing, commercial terms, geography, privacy/data processing, availability, cost and exit options. No provider is selected in Phase 9. | Architecture/provider evaluation |
| ZD-Q-WEB-006 | resolved | Preserve distinct confirmed-match, no-known-match, suspicious/ambiguous and unavailable/inconclusive outcomes where provider evidence supports them. No match is not a safety guarantee. | Owner-approved product policy |
| ZD-Q-WEB-007 | deferred | Set maximum URL length and input complexity from selected-provider and platform constraints; reject over-limit input before provider dispatch. | Architecture/provider testing |
| ZD-Q-WEB-008 | deferred | Apply bounded timeout, response-size and concurrency controls. Numeric values must be derived from provider contracts, workload and cost tests. | Architecture/performance testing |
| ZD-Q-WEB-009 | deferred | Apply both per-account and global rate/quota controls. Numeric limits and reset semantics require capacity, abuse and cost evidence and owner confirmation. | Architecture/cost review |
| ZD-Q-WEB-010 | deferred | Set a hard provider-spend ceiling, usage monitoring/alerts and an emergency stop before production activation. The numeric ceiling requires a cost model and owner approval. | Architecture/cost review |
| ZD-Q-WEB-011 | deferred | Use the shared revocation invariant in ZD-Q-AUTH-013 and ZD-Q-SYS-013. A false or unknown gate blocks dispatch; queued/not-yet-dispatched calls are denied after revocation. Exact propagation bounds require architecture tests. | Architecture |
| ZD-Q-WEB-012 | deferred | Queued/not-yet-dispatched work is cancelled or blocked after gate revocation. Already-dispatched calls are cancelled where supported; no subsequent provider call may be initiated. Exact cancellation mechanics are architecture-specific. | Architecture |
| ZD-Q-WEB-013 | resolved | Do not persist submitted URLs, full provider responses or check results by default beyond completing the requested operation. Any future persistence requires a separate documented purpose and retention policy. | Owner-approved MVP policy |
| ZD-Q-WEB-014 | resolved | Before provider disclosure, tell the user what URL-related information is sent, the purpose and recipient/processor, and obtain the required explicit consent. | Owner-approved MVP policy |
| ZD-Q-WEB-015 | deferred | Keep audit metadata minimal; exclude full URLs, credentials and sensitive query parameters. Exact fields, access roles and retention are set in architecture/privacy review. | Architecture/privacy review |
| ZD-Q-WEB-016 | deferred | Publish a tested browser/Android compatibility matrix and disclose capability differences. Exact browser/OS versions require platform testing and owner scope confirmation. | Architecture/platform testing |
| ZD-Q-WEB-017 | resolved | Caching is off by default. Enable it only if provider terms permit it and an explicit freshness/expiry policy is defined. | Owner-approved MVP policy |
| ZD-Q-WEB-018 | resolved | Explain each verdict and its limitations. Never describe a no-known-match result as proof that a URL is safe or harmless. | Owner-approved product policy |

### SYS

| Question | Disposition | Owner-approved product direction / remaining handoff | Next stage |
|---|---|---|---|
| ZD-Q-SYS-001 | deferred | Set internal availability targets before launch, but do not publish uptime commitments until reliability and operating-cost evidence supports them. | Architecture/operations |
| ZD-Q-SYS-002 | deferred | Define RTO/RPO for backend-managed account, entitlement, activation and audit state after data criticality and recovery analysis. No numeric values are selected in product design. | Architecture/operations |
| ZD-Q-SYS-003 | resolved | Back up only necessary backend-managed data. User file bytes and quarantine content/keys are not included in backend backups by default. | Owner-approved product policy |
| ZD-Q-SYS-004 | deferred | Maintain separate retention/expiry policies for backups, audit events, diagnostics and incident records. Exact durations and statutory exceptions require legal and architecture review. | Architecture/legal review |
| ZD-Q-SYS-005 | deferred | Classify account, file-derived, URL-derived and operational data by sensitivity and define least-privilege access. Exact classification taxonomy and role mapping belong to architecture/security design. | Architecture/security design |
| ZD-Q-SYS-006 | deferred | Confirm launch jurisdictions and applicable privacy/legal obligations with qualified review before release. No jurisdiction-specific legal conclusion is made in Phase 9. | Legal review |
| ZD-Q-SYS-007 | deferred | Log only necessary operational/security events. Exclude passwords, secrets, file contents and sensitive URL components from ordinary diagnostics. Exact event fields and access permissions belong to architecture. | Architecture/security design |
| ZD-Q-SYS-008 | deferred | Define incident severity, accountable escalation owners and user/regulatory notification rules before production. Exact roles, response times and statutory duties require operations/legal review. | Operations/legal review |
| ZD-Q-SYS-009 | deferred | Set concurrency, request, storage, timeout and resource limits from workload, platform, safety and cost testing. No arbitrary numeric defaults are approved. | Architecture/performance testing |
| ZD-Q-SYS-010 | deferred | Publish a tested compatibility matrix and end-of-support policy. Exact browser, Android OS/device and backend version windows require testing and owner scope confirmation. | Architecture/platform testing |
| ZD-Q-SYS-011 | deferred | Production updates must have verifiable provenance, signed release artifacts, rollback capability and emergency withdrawal procedures. Trust roots, release channels and operational mechanisms are architecture decisions. | Architecture/security design |
| ZD-Q-SYS-012 | deferred | Approve external dependencies individually only after purpose, terms, privacy/security, cost, failure impact and exit options are reviewed; each production-critical dependency must have a named accountable owner. Specific vendors remain unselected. | Architecture/provider evaluation |
| ZD-Q-SYS-013 | deferred | Use the shared gate-revocation invariant in ZD-Q-AUTH-013 and ZD-Q-WEB-011/012. Newly evaluated and queued/not-yet-dispatched protected work is denied after revocation; already-dispatched work is cancelled where supported. Exact propagation bounds require architecture testing. | Architecture |
| ZD-Q-SYS-014 | resolved | A dedicated account-data export feature is out of MVP unless a confirmed legal requirement makes it necessary. This does not remove any applicable legal access right. | Owner-approved MVP scope |
| ZD-Q-SYS-015 | deferred | Server-authoritative account, entitlement and activation state prevails over stale client state. Conflict/version resolution and synchronization mechanics are architecture decisions. | Architecture |
| ZD-Q-SYS-016 | resolved | Give users advance notice of planned maintenance where practical. Exact windows, channels and notice periods are deferred to operations planning. | Owner-approved product policy |
| ZD-Q-SYS-017 | deferred | Account deletion must propagate through backup lifecycle. Immutable audit data may be retained only where justified, minimized and documented with reason and retention period. Exact expiry and legal exceptions require legal/architecture review. | Architecture/legal review |
| ZD-Q-SYS-018 | deferred | Do not promise a support SLA until a real support channel, accountable owner and operating capacity exist. Define the channel and realistic response expectations before production commitments. | Operations/owner review |

## Reading the dispositions

- **Resolved:** the owner-approved product policy answers the product-level question. Implementation details may still be deferred elsewhere.
- **Deferred:** the accepted product direction is recorded, but an exact value, mechanism, platform matrix, provider choice, legal conclusion or later owner confirmation remains necessary.
- A deferred question is not a blocker to closing product design; it remains a visible input to architecture or specialist review and may remain a release gate where the contract says so.
