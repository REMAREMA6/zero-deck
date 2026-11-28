# Phase 8 — Structured Projection and Evidence Audit

**Status:** Targeted audit completed  
**Canonical authority:** Each contract's Markdown file; JSON is its synchronized declared-contract projection

## 1. Artifact baseline

| Contract | Markdown blob SHA | Pinned artifact revision | Pinned revision resolves to current Markdown blob | Evidence origin revision matches |
|---|---|---|---|---|
| Authentication | b6f9746e635c75647572b0e15796b7495153dfd3 | 9d92423cdf801df7d6d2ec3fabf0b86ee562965c | Yes | Yes |
| MVP-01 | f44dae71e0368d7ffea9f0435cfdac587fd8aa99 | 298ba0e6b31ff8ebdc3163a2c6366dcf31ae06f3 | Yes | Yes |
| MVP-02 | 14e4727e8ce747d4f2682d40b92d093d499b11bc | ef98e91d6bc72bf09840d9fbd67175ea2e868b90 | Yes | Yes |
| MVP-03 | 51b6654a0b37c3450a1e5bbc6dd9ee9c633bdcd5 | 1210f236d80972a4c877ee042cce1963da872d62 | Yes | Yes |
| Cross-cutting | d56767d88c052d6f4f1e548f188b1f02d54d5fe2 | 4b4d32b939e627fe84b4120ab43df6b5c733d421 | Yes | Yes |

For all five contracts, the declared artifact revision resolves to the same Markdown blob currently on the default branch. Each retained evidence record's sourceRevision and source URI match its declared artifact revision and canonical location.

The digest values remain those recorded in the projections and prior phase validation reports. Phase 8 verified revision-to-blob identity and evidence-origin alignment; it did not independently re-run a full SHA-256 implementation or independent JSON Schema Draft 2020-12 validation.

## 2. Statement parity

Initial review found four authentication projection statement texts that did not exactly match the canonical Markdown:
- ZD-AUTH-002 — email identifier/canonicalization scope;
- ZD-AUTH-006 — ZeroDeck launch email/password applicability;
- ZD-AUTH-020 — verified-email recovery and prohibition on security questions;
- ZD-AUTH-021 — all existing sessions revoked after successful recovery.

The canonical Markdown was treated as authoritative. The four structured statement texts were updated to match it in commit cdfc35972261eab4249166a22cf81b8a0f0befb8. No Markdown requirement text, acceptance criterion, owner decision or product implementation was changed.

Post-correction verification found no remaining statement-text mismatch across the five projections.

## 3. Structural parity results

| Check | Result |
|---|---:|
| Canonical contracts | 5 |
| Requirement headings | 160 |
| Structured statement records | 160 |
| Requirement heading/statement ID mismatches | 0 |
| Requirements without acceptance criteria | 0 |
| Acceptance criteria | 259 |
| Acceptance criteria missing Given/When/Then or verification method | 0 |
| Duplicate requirement IDs | 0 |
| Duplicate acceptance-criterion IDs | 0 |
| Dangling dependency IDs | 0 |
| Invalid facet IDs | 0 |
| Official facets represented across package | 15/15 |
| Evidence records | 5 |
| Evidence origin revision/location mismatches | 0 |

## 4. Profile deviation

The PM profile specifies acceptance criterion ID pattern ZD-CAPABILITY-AC-NN, unique within the workspace. 231 of 259 criterion IDs do not match that pattern; 28 cross-cutting SYS criterion IDs do. The current IDs are unique, but the profile-format deviation remains open as P8-F02.

The authentication Markdown records its acceptance criteria as Given/When/Then bullets without inline criterion IDs; the structured projection supplies stable criterion IDs. This preserves count-level alignment but makes criterion-level Markdown-to-projection traceability less direct than in the other contracts. Include this in the coordinated ID migration.

## 5. Validation boundary

This audit does not claim:
- independent full JSON Schema Draft 2020-12 validation;
- upstream Software Rules CI execution;
- runtime/browser/Android/API/provider testing;
- cryptographic/security-control effectiveness;
- production readiness, legal/privacy approval or customer validation.

Those require separate evidence and authorization.
