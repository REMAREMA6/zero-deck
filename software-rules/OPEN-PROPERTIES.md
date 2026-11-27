# ZeroDeck MVP — Open Required Properties

**Maturity:** Draft  
**Status:** Blocking gaps for Phase 6 replication-completeness assessment.

These gaps are deliberately preserved. They must not be converted into defaults, implementation choices, or negative findings without evidence or an owner decision.

## MVP-01 — Manual file security analysis

1. Supported file types, size/count limits, container/archive recursion, encrypted/password-protected files, symlinks and malformed input.
2. File selection mechanism, supported platforms, URI/permission grant lifecycle and inaccessible-file handling.
3. Whether analysis is entirely on-device or can transfer file contents/metadata externally; consent and disclosure if any transfer is possible.
4. Detection engine/algorithm, threat-intelligence sources, source licensing/redistribution, update/freshness and trust verification.
5. Meaning and criteria for confirmed threat, suspicious, no known threat, inconclusive, unsupported, inaccessible, interrupted and engine failure.
6. Confidence/threshold policy, false-positive/false-negative treatment, explainability and user-facing wording.
7. Hash algorithms and canonical input representation if hashes are used; Hypatia's MD5/SHA-1/SHA-256 implementation is prior art only.
8. Progress granularity, cancellation semantics, partial-result policy, retry and terminal state.
9. Scan history/result persistence, retention and deletion only if the selected implementation provides or requires them.
10. Safe parsing/isolation: whether files are ever executed, mounted, unpacked or sent to another process/service; threat model and containment boundaries.
11. Error taxonomy and recovery for permission denial, read errors, corrupt input, storage pressure, engine/database unavailable, update failure and process interruption.
12. Performance/resource limits across supported devices and representative file workloads.

## MVP-02 — Quarantine and file disposition

1. Quarantine strategy: app-private copy, provider-side move, platform-specific facility or other explicitly selected mechanism.
2. Eligibility rules and the exact meaning of a confirmed threat; no automatic destructive action for suspicious/inconclusive files unless separately approved.
3. Copy/move/delete semantics; source and destination provider capabilities; behaviour when deletion/write is unsupported.
4. Integrity identity and verification before/after isolation and restoration.
5. Atomicity/commit protocol and crash consistency for interrupted copy, delete, restore or purge.
6. Encryption requirement and, if selected, cipher/mode, key generation, Android Keystore security level, authentication, rotation, recovery and key-loss behaviour.
7. URI permission persistence, revocation, provider disconnect, removable storage loss and app-private storage lifecycle.
8. Restore eligibility, fresh-scan requirements, user confirmation, destination conflict policy and overwrite handling.
9. Permanent deletion semantics, verification, secure-delete guarantees (if any), and truthful reporting where provider deletion cannot be guaranteed.
10. Quarantine metadata/data model, item identity, status lifecycle, timestamps and audit/history side effects.
11. Retention duration, purge policy, user controls, backup/restore, uninstall and storage-pressure behaviour.
12. Recovery after process death, device restart, disk-full, partial writes, permission loss, provider failure and inconsistent metadata.
13. Concurrency/duplicate requests/idempotency for simultaneous or repeated quarantine/restore/delete actions.
14. Performance/resource limits for large files and storage capacity.

## MVP-03 — Website and link checking

1. Final provider procurement/selection; Web Risk is a reference contract only.
2. Accepted schemes, URL parsing, canonicalization, normalization, internationalized domains, ports, credentials, fragments and invalid-input policy.
3. Redirect policy: whether redirects are followed, maximum hops, loop detection and which URL(s) are checked.
4. Exact threat categories requested and mapping to user-facing likely-dangerous/no-known-threat/inconclusive states.
5. Result confidence/freshness, positive and negative caching, cache key, expiry and invalidation.
6. URL disclosure, consent, sensitive URL handling, logging/redaction, storage, retention and access controls.
7. Provider authentication, secret storage/rotation, request construction and error response mapping.
8. Timeout, retry, cancellation, offline/provider outage, quota exhaustion and partial/inconclusive behaviour.
9. Pro principal/entitlement source, verification point, subscription lifecycle, grace period, revocation, refund and downgrade handling.
10. Owner activation authority, feature-switch default, change audit, propagation and kill-switch behaviour.
11. Per-user allowance, rate limit, global spend cap, budget threshold, alerts and over-limit response.
12. Whether cache hits are allowed while provider switch is disabled and whether cached outcomes count toward Pro usage; owner decision needed.
13. User-facing disclosure and wording: a no-match is not a guarantee of safety and a single URL lookup is not a whole-site inspection.
14. Performance/availability targets and actual measurements.

## Cross-cutting properties

- Actual product boundary, supported platforms/OS versions, build/release identity and environment.
- Complete runtime interface hierarchy, visual properties, geometry, assets, accessibility and states for the seven MVP scenarios.
- Effective configuration defaults, precedence, scope and change behaviour.
- Identity/authentication model and authorization enforcement, especially Pro entitlement and file/document access.
- Whether backend APIs, messaging, workers, remote services or durable stores exist and are relevant.
- Security threat model, trust boundaries, secure update/dependency process, secrets, privacy and data minimization.
- Error taxonomy and recovery consistency across all capabilities.
- Required performance/resource budgets and workload definitions.
- Property inventory review for omissions; schema validity alone cannot establish completeness.

## Exclusions that must remain excluded

IP address tracking/investigation (CAP-13), account/admin portal as standalone features, scan history as a standalone capability, automatic/background protection, browser extension, device privacy audit, threat-indicator administration, help CMS, and health/audit dashboard remain outside the owner-approved MVP unless separately approved. Necessary cross-cutting properties are not excluded merely because a related standalone feature is excluded.
