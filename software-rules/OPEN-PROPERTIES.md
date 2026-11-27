# ZeroDeck MVP — Open Required Properties

**Maturity:** Draft  
**Status:** Blocking gaps for Phase 6 replication-completeness assessment.  
**Source boundary:** The scanner product-decision document is a Working draft. Its stated baselines are retained as product-material requirements; proposed and open items remain provisional.

These gaps must not be converted into defaults or implementation choices without evidence or an owner decision.

## MVP-01 — Manual file security analysis

1. Supported file types, size/count limits, container/archive recursion, encrypted/password-protected files, symlinks and malformed input.
2. File selection mechanism, supported platforms, URI/permission grant lifecycle and inaccessible-file handling.
3. The working draft sets an on-device default: files stay on the phone and are not uploaded by default. Whether an optional cloud-analysis feature will exist remains open; if it does, exact disclosure, recipient/processor, data sent, purpose, consent/decline, cancellation and retention must be established.
4. Detection engine/algorithm, threat-intelligence sources, source licensing/redistribution, update/freshness and trust verification.
5. Meaning and criteria for Threat found/confirmed malware, Suspicious, No known threat found and Could not decide/inconclusive.
6. Confidence/threshold policy, false-positive/false-negative treatment, explainability and user-facing wording.
7. SHA-256 is the working draft's planned direction for file fingerprints and integrity checks; confirm final algorithm, exact use, encoding and runtime behaviour.
8. Progress granularity, cancellation semantics, partial-result policy, retry and terminal state.
9. Scan history/result persistence, retention and deletion only if the selected implementation provides or requires them; scan history is to be managed separately from quarantine retention in the product draft.
10. Safe parsing/isolation: whether files are ever executed, mounted, unpacked or sent to another process/service; threat model and containment boundaries. Quarantined files must not be executed.
11. Error taxonomy and recovery for permission denial, read errors, corrupt input, storage pressure, engine/database unavailable, update failure and process interruption.
12. Performance/resource limits across supported devices and representative file workloads.

## MVP-02 — Quarantine and file disposition

The product working draft already states several requirements. They remain unverified at runtime:

1. **Documented baseline:** encrypted, app-private storage on the user's device. The actual storage implementation, supported platform versions, isolation boundary and enforcement remain to be verified.
2. **Documented baseline:** confirmed malware is automatically quarantined when permitted and when the operation succeeds; suspicious files go to user review; clean files remain untouched; unknown/inconclusive files are rescanned or reviewed. The confirmed-malware threshold and platform-permission semantics remain open.
3. **Documented baseline:** restoration requires a fresh security scan and user confirmation; verify the restored file against its recorded hash. Exact scan meaning, timing, hash algorithm/record format and failure handling remain open.
4. **Documented baseline:** failed deletion retains the record and reports failure accurately; quarantine, restore and deletion are auditable; quarantined files are never executed; unrelated user files are not overwritten.
5. **Documented baseline:** use Android Keystore to protect encryption keys. Cipher/mode, key generation, hardware security level, authentication requirements, rotation, recovery and key-loss behaviour remain open.
6. **Proposed, not final:** 30-day default retention, user configurability, automatic expiry and manual deletion; notify before expiry where practical. The final duration, configuration scope, purge guarantees and notification behaviour require confirmation.
7. **Documented baseline:** explain what happens to quarantined data if the app is uninstalled. Actual uninstall/backup/key-loss consequences must be specified and tested.
8. Provider capabilities and URI permission persistence/revocation, provider disconnect, removable storage loss and app-private storage lifecycle.
9. Copy/move/delete semantics; source/destination capability checks; atomicity/commit protocol and crash consistency for interrupted copy, delete, restore or purge.
10. Quarantine metadata/data model, item identity, status lifecycle, timestamps and audit-record fields, storage, retention and access policy.
11. Recovery after process death, device restart, disk-full, partial writes, permission loss, provider failure and inconsistent metadata.
12. Concurrency/duplicate requests/idempotency for simultaneous or repeated quarantine/restore/delete actions.
13. Performance/resource limits for large files and storage capacity.

## MVP-03 — Website and link checking

1. Final provider procurement/selection; Web Risk is a reference contract only.
2. Accepted schemes, URL parsing, canonicalization, normalization, internationalized domains, ports, credentials, fragments and invalid-input policy.
3. Redirect policy: whether redirects are followed, maximum hops, loop detection and which URL(s) are checked.
4. Exact threat categories requested and mapping to Likely dangerous, No known threat found and Could not decide/inconclusive states.
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

- Actual product boundary, supported platforms/OS versions, build/release identity and environment. The scanner draft describes an Android app; it does not prove that all of ZeroDeck is Android-only.
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
