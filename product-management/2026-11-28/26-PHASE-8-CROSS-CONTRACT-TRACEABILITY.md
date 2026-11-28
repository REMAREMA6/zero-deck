# Phase 8 — Cross-Contract Traceability Matrix

**Status:** Completed review artifact  
**Review baseline:** Five canonical PM contracts, their declared-contract projections and evidence records, plus Phases 3–7 facet and failure/recovery assessments  
**Scope:** Product Management only; no implementation or Software Rules repository changes

## 1. Package inventory

| Contract | Requirement IDs | Requirements | Acceptance criteria | Owner-approved status |
|---|---|---:|---:|---|
| Identity and authentication | ZD-AUTH-001–021, 025–028 | 25 | 66 | 4 owner-approved; 21 PM-proposed |
| MVP-01 manual file analysis | ZD-FILE-001–028 | 28 | 56 | 28 PM-proposed |
| MVP-02 quarantine and disposition | ZD-QUAR-001–038 | 38 | 68 | 38 PM-proposed |
| MVP-03 website and link checking | ZD-WEB-001–041 (039 is intentionally out of sequence) | 41 | 41 | 4 owner-approved scope encodings; 37 PM-proposed |
| Cross-cutting system requirements | ZD-SYS-001–028 | 28 | 28 | 28 PM-proposed |
| **Total** | **160 stable requirement IDs** | **160** | **259** | **8 owner-approved requirement records; 152 PM-proposed** |

The 8 owner-approved requirement records are ZD-AUTH-025–028 and ZD-WEB-001–004. This does not mean every owner decision is represented only by those eight records: some approved policy consequences also appear in acceptance criteria or supporting text of older PM-proposed requirements. See the findings register.

## 2. Owner questions

| Contract | Recorded questions | Resolved | Open |
|---|---:|---:|---:|
| Authentication | 13 | 8 | 5 |
| MVP-01 | 9 | 0 | 9 |
| MVP-02 | 14 | 0 | 14 |
| MVP-03 | 18 | 0 | 18 |
| Cross-cutting | 18 | 0 | 18 |
| **Total** | **72** | **8** | **64** |

The eight resolved authentication questions are retained in the structured contract with status resolved. They must not be counted as open. The remaining 64 are unresolved owner or operational decisions; their existence does not by itself invalidate the review, but several block release readiness.

## 3. Official 15-facet mapping across the package

Counts below are requirement-to-facet references in the five structured projections, not counts of unique requirements. One requirement can map to multiple facets.

| Official facet | Mapped requirements | Contracts represented | Phase 8 assessment |
|---|---:|---|---|
| interface | 42 | AUTH, FILE, QUAR, WEB, SYS | Present; visual/interface runtime rules are outside these PM contracts |
| behavior | 69 | FILE, QUAR, WEB, SYS | Present across features; AUTH has a known missing Behaviour facet-reference mapping |
| business-rules | 32 | AUTH, FILE, QUAR, WEB | Present; SYS cross-cutting invariants are represented under other facets |
| data | 62 | AUTH, FILE, QUAR, WEB, SYS | Present; lifecycle, purpose, retention and deletion decisions remain open |
| persistence | 33 | AUTH, FILE, QUAR, WEB, SYS | Present; recovery, atomicity, retention and backup policies remain partial |
| api | 20 | AUTH, WEB, SYS | Present where service/API boundaries apply; provider/API contract remains unselected |
| messaging | 1 | SYS | Thin/conditional mapping; AUTH-021 acceptance criteria require a security notification but do not map Messaging |
| identity-authentication | 25 | AUTH, SYS | Present; AUTH is the primary contract |
| authorization-permissions | 25 | AUTH, FILE, QUAR, WEB, SYS | Present; detailed authorization matrix and revocation propagation remain open |
| security-controls | 82 | AUTH, FILE, QUAR, WEB, SYS | Broadly represented; no implementation effectiveness or security audit is claimed |
| background-processing | 1 | QUAR | Conditional and thin; scheduled expiry/async execution details remain dependent on policy and implementation choices |
| errors-recovery | 66 | AUTH, FILE, QUAR, WEB, SYS | Present; several cross-feature recovery dependencies need stronger explicit links |
| integrations | 33 | AUTH, FILE, QUAR, WEB, SYS | Present; external providers and production dependency ownership remain open |
| configuration | 34 | AUTH, FILE, QUAR, WEB, SYS | Present; operational values and activation/limit controls remain open |
| performance-resource-behavior | 7 | FILE, QUAR, WEB, SYS | Present; numeric bounds and representative workload targets remain open |

**Facet conclusion:** all 15 official facet identifiers occur in the package. That is a presence check, not proof that every property within every facet is complete. The three most visible coverage weaknesses are the known AUTH Behaviour metadata gap, the unclassified AUTH security-notification behaviour in Messaging, and the thin/conditional Background Processing mapping.

## 4. Cross-contract traceability

| Product/system concern | Source requirements | Cross-contract/system requirements | Traceability result |
|---|---|---|---|
| One account identity across web and Android | AUTH-001, AUTH-017 | SYS-001 | Linked and semantically aligned |
| Trusted current authorization | AUTH-016 | SYS-003, SYS-005 | Dependency metadata points to AUTH-025 instead of the core AUTH-016 authorization rule |
| MVP-01 result semantics | FILE-012, FILE-015, FILE-018 | QUAR-001, QUAR-014; SYS-012 | Product text links the workflows, but QUAR requirements omit explicit prerequisite dependency IDs; SYS-012 has misdirected dependencies |
| Quarantine eligibility and source disposition | FILE-012, FILE-015; QUAR-001–009 | SYS-006, SYS-027 | Conceptual relationship is present; structured dependency links are incomplete |
| Fresh scan before restore | FILE-001, FILE-012, FILE-015 | QUAR-014 | Normative cross-capability rule exists; structured dependency links to MVP-01 are missing |
| Independent MVP-03 gates and no-call invariant | WEB-001–004 | SYS-003, SYS-004, SYS-005 | Gate relationship is explicit; SYS-004 is well-linked; revocation dependencies in SYS-005 need correction |
| Gate changes and provider dispatch | WEB-025, WEB-029, WEB-030 | SYS-005 | Newly evaluated operations are covered; in-flight/queued work propagation remains an explicit open question |
| External provider response trust | WEB-020 and WEB-024 | SYS-023, SYS-012 | SYS-023 dependencies do not point to the provider-response validation requirement |
| Shared resource bounds and overload | FILE-026, QUAR-034, WEB-031 | SYS-020, SYS-021 | Cross-cutting rules exist, but current dependency IDs point to unrelated requirements |
| Data purpose, minimization and lifecycle | AUTH-026; FILE-020, FILE-022; QUAR-022, QUAR-023, QUAR-030, QUAR-037; WEB-033, WEB-034 | SYS-006–008, SYS-017, SYS-028 | Normative coverage exists; several dependency links are semantically mismatched and deletion/backup policy remains open |
| Security notifications after recovery | AUTH-020, AUTH-021 and owner decision ZD-DEC-AUTH-2026-11-28 | SYS-016 only partly addresses audit of administrative changes | Notification outcome appears in AUTH-021 acceptance criteria and owner decision, but is absent from AUTH-021 normative statement and Messaging facet mapping |
| Account deletion and retained records | AUTH-026 | SYS-008, SYS-014, SYS-017, SYS-028; SYS-Q-017 | Lifecycle intent is linked conceptually; backup/audit propagation is unresolved |
| Platform-specific capability limits | FILE-002–003, QUAR-010–012, QUAR-035–036, WEB-037 | SYS-002 | Explicit and aligned |

## 5. Dependency semantics

The PM profile defines dependencies as requirements that must be satisfied first or together. All referenced dependency IDs resolve to an existing requirement, but existence alone does not establish a valid dependency.

Examples of semantic mismatches requiring correction:
- SYS-003 (authoritative authorization) depends on AUTH-025 (fresh authentication for sensitive changes), but does not depend on AUTH-016 (current server-side authorization).
- SYS-005 (authorization revocation) depends on AUTH-025 and WEB-001–003, but omits AUTH-016 and the explicit activation/entitlement change requirements WEB-029–030.
- SYS-008 (data lifecycle transparency) depends on AUTH-007 (authentication abuse throttling), which does not define data lifecycle.
- SYS-012 (dependency failure truthfulness) depends on FILE-020 (data minimization), QUAR-030 (metadata minimization) and WEB-026 (cancellation), rather than the feature-specific failure rules FILE-018, QUAR-033 and WEB-024.
- SYS-020 and SYS-021 (resource bounds and overload) depend on FILE-023 (no standalone scan history), QUAR-035 (platform capability) and URL identity/credential requirements, rather than FILE-026, QUAR-034 and WEB-031.
- SYS-023 (external response trust) depends on WEB-026/027 (cancellation and quota), not WEB-020 (provider response validation).
- SYS-028 (data portability/account closure) depends on AUTH-007 (abuse throttling), not AUTH-026 (account deletion/retention).
- QUAR-001 and QUAR-014 have no explicit structured dependencies on the MVP-01 analysis/result requirements they consume.

These are traceability metadata defects, not proof that the normative requirements themselves are contradictory. Proposed remapping is recorded in the findings register; no dependency metadata was silently rewritten in Phase 8.

## 6. Traceability conclusion

All 160 requirements have a canonical Markdown heading, a structured statement record and at least one acceptance criterion. All 259 criteria have Given/When/Then and verification-method fields. Requirement IDs and criterion IDs are unique in the current structured package; no dangling dependency IDs were found.

The package is not fully profile-clean: 231 of 259 acceptance-criterion IDs do not match the profile's required pattern. The finding is recorded separately because a safe migration must preserve cross-document references and stable identity.
