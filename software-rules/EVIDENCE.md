# ZeroDeck Software Rules — Evidence and Provenance Register

**Maturity:** Draft  
**Evidence location rule:** Raw RE evidence remains in `re/zerodek-product-re/2026-11-27/`. This deliverable links to it and does not duplicate it.

## Evidence classes

| Class | Meaning in this deliverable |
|---|---|
| Owner-declared | Explicit owner decision; defines intended scope/policy, not runtime enforcement. |
| Product-material | Supplied product decision/material; supports only the content actually documented. |
| Source-derived prior art | Inspected source implementation; describes that source, not ZeroDeck. |
| Platform/provider contract | Official documentation; defines a platform/provider contract or constraint, not ZeroDeck implementation. |
| Runtime-observed (ZeroDeck) | No deployed ZeroDeck runtime evidence currently exists. |
| Runtime-observed (reference project) | Directly observed behaviour in an upstream CI execution of a pinned prior-art project; applies only to that project and run. |
| Unknown | Not established; cannot be treated as false, absent, safe, or not applicable. |

## Primary ZeroDeck decision and product-material records

| Evidence ID | Artifact | Immutable revision / blob | Use |
|---|---|---|---|
| EVD-SRC-PRODUCT-001 | `lordwhitefire/Zerodek/upload/android_security_scanner_product_decisions.txt` | Commit `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`; blob `c0b247ab3ba990890f5ebce2e161fed08fc801f3` | Working-draft product material for file scanning, quarantine, privacy, link checking, proposed retention, and unresolved design choices. Preserve its draft/proposed/open labels. |

## Primary ZeroDeck decision records

| Evidence ID | Artifact | Immutable blob SHA | Use |
|---|---|---|---|
| EVD-ZD-SCOPE-001 | `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md` | `7666e50f29f47913724e1321f9edb006ed885283` | Owner-approved three-capability MVP, exclusions and IP future-candidate boundary. |
| EVD-ZD-PRO-001 | `re/zerodek-product-re/2026-11-27/PRO-GATED-LINK-CHECK-DECISION.md` | `8887085dfc323c3f304ef29a74bfecb1a361f751` | Pro entitlement and separate owner activation gate, no-call conditions, usage/budget-control requirement. |
| EVD-ZD-CAP-001 | `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md` | `fef4184fdf32ecf68fd5f2df76c8bc3f2f1e4695` | Evidence-backed capability workflows and provisional product-material requirements; traces back to the inspected scanner product-decision source. |
| EVD-ZD-MAP-001 | `re/zerodek-product-re/2026-11-27/CAPABILITY-FACET-MAPPING.md` | `436be0bd1348447f3888aa8a9ee5e1ec791ad144` | Seven MVP scenarios, 15-facet applicability and required-property questions. |
| EVD-ZD-P4-001 | `re/zerodek-product-re/2026-11-27/PHASE-4-SOURCE-RULE-EXTRACTION.md` | `7cc66f225f82a23a2b94bc53c3364c200f990f64` | Source-derived prior-art rules and official Android/Web Risk contracts with provenance. |
| EVD-ZD-P4-002 | `re/zerodek-product-re/2026-11-27/PHASE-4-15-FACET-COVERAGE-AUDIT.md` | `3b32ea7b60d90c30b1511a2e878a411cacc3a648` | 15-facet evidence/gap audit across the three MVP capabilities. |

## Prior-art evidence — not ZeroDeck requirements

| Evidence ID | Source and immutable revision | Inspected material | Permitted use |
|---|---|---|---|
| EVD-SRC-HYP-001 | MaintainTeam/Hypatia `c0f98977be935e58849726313635a2459cac3892` | MalwareScanner.kt, Database.kt, GPGDetachedSignatureVerifier.java; Phase 4 report records file blob SHAs and locations. | Prior-art hash scanning, Bloom membership, signature verification and failure semantics. No dependency adoption. |
| EVD-SRC-HYPDB-001 | MaintainTeam/HypatiaDatabases `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` | README, App.java, stable-generation workflow, Bloom-generation script. | Prior-art feed parsing, filtering, Bloom generation and publication. No feed redistribution or dependency approval. |
| EVD-DOC-ANDROID-001 | Android official storage documentation, accessed 2026-11-27 | Storage categories, scoped storage, SAF overview/control flow/client app. | Platform constraints for file access/quarantine design; does not establish ZeroDeck platform choice or behaviour. |
| EVD-DOC-KEYSTORE-001 | Android Keystore official documentation, accessed 2026-11-27 | Key non-exportability, hardware backing, usage authorizations and limitations. | Key-protection capability reference; does not select ZeroDeck encryption/key policy. |
| EVD-DOC-WEBRISK-001 | Google Web Risk official Lookup/REST/ThreatType/caching/pricing docs, accessed 2026-11-27 | Single-URL Lookup contract, threat types, response/expiry, cache guidance and price. | Provider contract/prior art only; no production provider procurement or runtime call. |

## Runtime evidence status

No runtime evidence from a deployed ZeroDeck build is available. The product reference repository is a mock-screen/source-material repository, not a verified running target. The machine-readable capture therefore contains no ZeroDeck runtime observations or runtime rules. It records declared scope and explicitly incomplete coverage.

### Reference-project runtime evidence (not ZeroDeck runtime)

| Evidence ID | Artifact | Execution provenance | Permitted use |
|---|---|---|---|
| EVD-RT-REF-001 | `re/zerodek-product-re/2026-11-27/PHASE-7-RUNTIME-OBSERVATION-MAP.md` | Exact-pinned upstream CI runs: Hypatia `26000483662` at `c0f98977be935e58849726313635a2459cac3892`; HypatiaDatabases `37898012266` at `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a` and current failure `45974623484`; ClamAV `45055471772` at `cad7b18a3e6505195fe08db1412449a18fc9f012`. | Contextual reference-runtime observations only: generator feed counts and unsigned publication, ClamAV CVD/signature/callback tests, and bounded CI completion. Not ZeroDeck behaviour, not automatic product requirements, and not dependency approval. Raw logs and scenario/facet mapping remain in the RE workspace. |

The Phase 7 investigation did not execute ZeroDeck or transfer reference-project behaviour into the ZeroDeck capture. All seven ZeroDeck MVP scenarios have an evidence-or-skip disposition; none was run against a deployed ZeroDeck target. The capture's runtime-observation count remains zero by design.

## Provenance constraints

- Source-derived rules from Hypatia/HypatiaDatabases describe those pinned repositories only.
- Android and Google documentation are mutable public documents; access date and page/section provenance are recorded in the Phase 4 report, not a fabricated immutable commit.
- The Google Web Risk provider is not a selected production dependency.
- No real user file, URL, API key, malware sample, or ZeroDeck production environment was used in this synthesis.

## Additional renewed Phase 7 reference-runtime evidence (not ZeroDeck runtime)

| Evidence ID | Artifact | Execution provenance | Permitted use |
|---|---|---|---|
| EVD-RT-REF-002 | `re/zerodek-product-re/2026-11-27/PHASE-7-RENEWED-ACTIONS-RESULTS.md` and `PHASE-7-RUNTIME-OBSERVATION-MAP.md` renewed section | Investigation-initiated GitHub Actions runs at exact pinned revisions: Hypatia `46034540816` (`c0f98977be935e58849726313635a2459cac3892`); HypatiaDatabases `46034540816` (`3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`); ClamAV `46029241394` (`cad7b18a3e6505195fe08db1412449a18fc9f012`). Workflow commits: `0234ea7b99d7c9db44f6fbba076df6de84a94b8a` and `31ea0904840ef0572641ec73052d7da8d0f42c2a`. | Contextual reference evidence only: Hypatia Android build/APK/lint (NO-SOURCE; pinned source tree contains no test source paths); HypatiaDatabases normal, malformed-input and exclusion fixture runs (Maven test sources absent); ClamAV CMake build and CTest 15/15 targets, 0 failed, with 416 Python tests passed and 2 skipped. HDB artifact `15216505853` SHA-256 `f903678afc226cb39e92383c65c4ddc917c932cd642595eb37df6c8c2b0d988e`; ClamAV artifact `15214502404` SHA-256 `861109e76bc61ddb4ff3f4e6baaadc3ad6d8158f985661e2a36f41f33b92c944`. No ZeroDeck runtime behaviour, automatic product requirement, or dependency approval. |

The renewed runs do not change the ZeroDeck runtime-observation count. Hypatia and HypatiaDatabases build/test outcomes and ClamAV's own test suite remain attributed to their pinned source projects. The follow-up HypatiaDatabases invalid-hash and exclusion branches were verified from the run's job log; the artifact currently retains the primary valid-fixture outputs.
