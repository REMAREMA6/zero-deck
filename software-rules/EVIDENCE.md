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
| Runtime-observed | No ZeroDeck runtime evidence currently exists. |
| Unknown | Not established; cannot be treated as false, absent, safe, or not applicable. |

## Primary ZeroDeck decision records

| Evidence ID | Artifact | Immutable blob SHA | Use |
|---|---|---|---|
| EVD-ZD-SCOPE-001 | `re/zerodek-product-re/2026-11-27/MVP-SCOPE-DECISION.md` | `7666e50f29f47913724e1321f9edb006ed885283` | Owner-approved three-capability MVP, exclusions and IP future-candidate boundary. |
| EVD-ZD-PRO-001 | `re/zerodek-product-re/2026-11-27/PRO-GATED-LINK-CHECK-DECISION.md` | `8887085dfc323c3f304ef29a74bfecb1a361f751` | Pro entitlement and separate owner activation gate, no-call conditions, usage/budget-control requirement. |
| EVD-ZD-CAP-001 | `re/zerodek-product-re/2026-11-27/CAPABILITY-INVENTORY.md` | `fef4184fdf32ecf68fd5f2df76c8bc3f2f1e4695` | Evidence-backed capability workflows and provisional product-material requirements; traces back to the inspected scanner product-decision source. |
| EVD-ZD-MAP-001 | `re/zerdek-product-re/2026-11-27/CAPABILITY-FACET-MAPPING.md` | `436be0bd1348447f3888aa8a9ee5e1ec791ad144` | Seven MVP scenarios, 15-facet applicability and required-property questions. |
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

No runtime evidence from a deployed ZeroDeck build was available in Phases 1–4. The product reference repository is a mock-screen/source-material repository, not a verified running target. The machine-readable capture therefore contains no runtime observations or runtime rules. It records declared scope and explicitly incomplete coverage.

## Provenance constraints

- Source-derived rules from Hypatia/HypatiaDatabases describe those pinned repositories only.
- Android and Google documentation are mutable public documents; access date and page/section provenance are recorded in the Phase 4 report, not a fabricated immutable commit.
- The Google Web Risk provider is not a selected production dependency.
- No real user file, URL, API key, malware sample, or ZeroDeck production environment was used in this synthesis.
