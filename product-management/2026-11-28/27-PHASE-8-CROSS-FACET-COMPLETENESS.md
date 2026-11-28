# Phase 8 — Cross-Facet Completeness Assessment

**Status:** Review completed; several completeness findings remain explicitly open  
**Compatibility baseline:** Software Rules 0.3.0 Draft, 15 official facets, as pinned in the PM profile  
**Evidence basis:** Five PM contracts, structured projections, Phase 3–7 facet assessments and failure/recovery matrices

## 1. Overall result

All 15 official facet identifiers are represented across the five contracts. The assessment is not a claim that every property of every facet is specified. Coverage remains partial where policy, operational values, implementation boundaries or platform behaviour are intentionally unresolved.

The package is a product-requirements layer. It does not capture runtime interface layout, source-derived implementation rules, architecture, or implementation conformance.

## 2. Facet-by-facet assessment

| Facet | Applicability | Cross-contract coverage | Remaining completeness concern |
|---|---|---|---|
| Interface | Applicable | Scan, quarantine, URL-check, account lifecycle, platform differences and truthful status | Exact UI states, copy, accessibility, responsive behaviour and interaction details belong in later feature/interface contracts |
| Behaviour | Applicable | Feature lifecycles, explicit triggers, state transitions, cancellation, retry, restore, deletion and status | Authentication's Phase 3 assessment identifies a missing Behaviour facetRefs mapping for AUTH-001–021; metadata proposal remains unaccepted |
| Business rules | Applicable | Result classes, eligibility, retention, Pro usage, owner activation, account lifecycle | Several policy values remain open; no automatic quarantine policy is owner-approved |
| Data | Applicable | Account, file-derived, quarantine, URL-derived and operational data purpose/minimization | Data classifications, exact fields, retention and export/deletion treatment remain incomplete |
| Persistence | Applicable | Account/session state, quarantine lifecycle, result retention and backend state | Transaction atomicity, backups, recovery objectives, deletion propagation and audit retention remain open |
| API | Applicable where service/provider boundaries exist | Authentication trust boundary, MVP-03 provider dispatch and shared system contracts | Provider not selected; endpoint/request/response contracts and error taxonomy not fully specified |
| Messaging | Conditional but now relevant to authentication recovery notification | Owner-approved recovery decision requires notifying account owner; AUTH-021 acceptance criterion says a security notification is sent | AUTH-021 normative statement and facetRefs omit the notification; delivery channel/retry/failure/acknowledgement semantics are not specified |
| Identity and authentication | Applicable | Shared account principal, credentials, sessions, recovery and account deletion | Five operational auth questions remain open; broader role/tenant authorization deferred |
| Authorization and permissions | Applicable | Server-side current-state checks, file/provider permissions, Pro and activation gates | Propagation bound, queued/in-flight work and complete role/resource policy remain open |
| Security controls | Applicable | Secret handling, file safety, quarantine integrity, URL/SSRF/TLS, release provenance and external response trust | No implementation test, penetration test, control effectiveness review or independent security audit is claimed |
| Background processing | Conditional | Quarantine interruption/recovery; possible expiry, backup, queue and asynchronous provider operations | Only QUAR-033 has an explicit Background Processing facet reference; actual scheduled/queued work model remains unselected |
| Errors and recovery | Applicable | Invalid input, permission loss, engine/provider failure, restore, deletion, overload and degraded capability | Cross-contract dependency links are misdirected in SYS-012 and related system rules |
| Integrations | Applicable | File providers, security engine, reputation provider and service dependencies | Engine/provider selection, contracts, ownership, data processing and exit policy remain open |
| Configuration | Applicable | Activation, quotas, retention, environment separation and fail-closed configuration | Exact limits, operational controls, alerting and emergency-stop policy remain open |
| Performance/resource behavior | Applicable | File limits, quarantine storage, provider limits, quotas and overload behaviour | Numeric bounds, workload targets, concurrency, timeout and storage capacity are unresolved |

## 3. Facet-specific reconciliation

### Behaviour — authentication

The Phase 3 assessment explicitly records a metadata mapping gap: authentication requirements define triggers, preconditions, transitions, outputs and side effects, but AUTH-001–021 do not include the official Behaviour facet reference. A proposed metadata-only amendment exists and was not accepted. Phase 8 preserves that status; it does not silently apply the proposal.

### Messaging — authentication recovery

The original Phase 3 Messaging assessment said no out-of-band message channel was selected and classified Messaging as not applicable/conditional. The later owner decision changed the situation: successful recovery revokes existing sessions and notifies the account owner; the owner decision also says verified email must be verified before it is used for security notifications. The Phase 3 statement is therefore stale for the current contract state.

AUTH-021's acceptance criterion includes a security notification, but its normative statement and facetRefs omit that outcome. The owner decision establishes the notification outcome, but the contract does not define delivery failure, retry, acknowledgement, duplicate suppression or user-facing delivery status. This is a traceability/completeness finding, not permission to invent those policies.

### Background processing

The facet is conditional, not absent. QUAR-033 covers recovery after interruption/process death; retention expiry and possible asynchronous operations may also touch this facet depending on the selected lifecycle. The package does not require a particular worker, scheduler or queue architecture.

## 4. Cross-feature completeness verdict

- **Identity and authorization:** core policy is represented; propagation and some revocation semantics remain open.
- **File analysis and quarantine:** the user-visible workflow is described, but explicit structured prerequisite links from quarantine eligibility/restore to analysis result requirements are missing.
- **MVP-03 provider dispatch:** the two independent owner-approved gates and no-call invariant are explicit; in-flight work after gate revocation remains unresolved.
- **Data lifecycle:** retention, deletion, backup, audit and export are represented at policy level; the exact lifecycle decisions are not complete.
- **Failure and recovery:** feature-specific failure outcomes exist; several cross-cutting dependency links point to unrelated requirements and should be corrected.
- **Platform differences:** web and Android capability differences are explicitly permitted and must be disclosed; exact supported platform matrices remain open.

## 5. Conclusion

Facet presence is complete at the package level (15/15). Semantic completeness is partial and has been made explicit in the findings register. Phase 8 can close as a review phase because each unresolved gap has an identified requirement, evidence and required owner/PM action. The product contract package is not thereby ready for implementation release or production.
