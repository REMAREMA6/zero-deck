# Phase 2 — Identity and Authentication Contract Validation

**Workstream:** PM-authored ZeroDeck Product Requirements Contracts  
**Phase:** 2 — research and author authentication requirements  
**Completed:** 2026-11-27  
**Status:** [x] Phase 2 exit criteria passed; Phase 3 coverage assessment remains outstanding  
**Contract:** `ZD-CONTRACT-AUTH` v`0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent  
**CIRCLES analysis:** [13-PHASE-2-CIRCLES-AUTHENTICATION.md](../2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md)

## 1. Deliverables

- Canonical requirement contract: [IDENTITY-AUTHENTICATION.md](contracts/IDENTITY-AUTHENTICATION.md)
- Software Rules declared-contract projection: [IDENTITY-AUTHENTICATION.declared-contract.json](contracts/IDENTITY-AUTHENTICATION.declared-contract.json)
- Retained declared-contract evidence record: [identity-authentication-contract.evidence.json](evidence/identity-authentication-contract.evidence.json)
- CIRCLES analysis and PM recommendation: [13-PHASE-2-CIRCLES-AUTHENTICATION.md](../2026-11-27/13-PHASE-2-CIRCLES-AUTHENTICATION.md)
- Authoring profile: [PROFILE.md](PROFILE.md)
- Pinned upstream Software Rules compatibility target: commit `5591a2e62287afc29bde002369eaf659673ec59b`

The Markdown contract is canonical. The JSON file is its structured projection and must not be independently authored.

## 2. Contract and CIRCLES result

- 21 stable normative requirements: `ZD-AUTH-001` through `ZD-AUTH-021`.
- 21 matching PM metadata records with exact one-to-one statement ID parity.
- 46 concrete Given/When/Then acceptance criteria extracted from the canonical contract; no generic placeholder criteria remain.
- Four explicitly conditional requirements: reusable-secret storage (`ZD-AUTH-005`), password controls (`ZD-AUTH-006`), browser-managed web sessions (`ZD-AUTH-014`), and Android-persisted session credentials (`ZD-AUTH-015`).
- 8 explicit unresolved questions, all marked as requiring owner decisions.
- All 21 requirements remain `pm-proposed`; none is represented as owner-approved.
- Authentication remains supporting infrastructure, not a fourth user-facing MVP capability.
- Pro entitlement and owner-controlled link-check activation remain separate trusted-server authorization conditions.
- CIRCLES produced one PM recommendation: investigate a first-party passkey-capable account service with a fallback authenticator and designed recovery path. This is not an owner decision or implementation approval.

## 3. Research used and checked

The canonical contract and CIRCLES analysis draw on:
- NIST SP 800-63B-4 final (2025): password verifier guidance, authenticator lifecycle, rate limiting, recovery, and session management. The password requirement records the final guidance in §3.1.1.2.
- OWASP Authentication Cheat Sheet.
- OWASP Password Storage Cheat Sheet.
- OWASP Session Management Cheat Sheet.
- OWASP Forgot Password Cheat Sheet.
- Android Security Tips and Android Keystore system documentation.
- The pinned Software Rules identity/authentication material and bounded cases `JOSE-AUTH-001` and `SESSION-EXPRESS-001`.

The NIST and OWASP materials are security guidance, not ZeroDeck owner decisions. The Software Rules cases are bounded conformance evidence, not proof of complete authentication coverage.

## 4. Structural and semantic validation

| Check | Result |
|---|---|
| Canonical Markdown contains 21 unique requirement headings | Pass |
| Structured JSON parses | Pass |
| PM declared-contract profile schema, with pinned upstream record definition registered | Pass |
| Nested PM requirements-extension schema | Pass |
| Upstream Software Rules `declaredContract` definition at pinned commit | Pass |
| Upstream Software Rules `evidence` definition for retained evidence record | Pass |
| Statement text matches canonical Markdown one-to-one | Pass — 21 / 21 |
| Requirement metadata matches declared statements one-to-one | Pass — 21 / 21 |
| Stable statement IDs are unique | Pass |
| Every requirement has at least one basis using an allowed provenance enum | Pass |
| Every requirement has concrete acceptance criteria | Pass — 46 |
| Conditional requirements include explicit non-empty conditions | Pass — 4 |
| Facet references belong to the pinned 15-facet taxonomy | Pass |
| Platform scopes use only web and/or Android | Pass |
| All requirements remain PM-proposed | Pass — 21 / 21 |
| All 8 open questions remain open and owner-decision-required | Pass |
| Contract evidence reference resolves to the retained evidence record | Pass |
| Evidence class is `declared-contract` | Pass |
| Evidence source URI and source revision match the contract artifact | Pass |
| Artifact revision points to the exact canonical Markdown commit | Pass — `db93a19fcbd4d7197be852a0cadd395c9af5a977` |
| SHA-256 of exact UTF-8 Markdown bytes matches the declared artifact digest | Pass — `sha256:9f6759de0dd81f4d7d3a5e9af0b2c5ee148cfb895ebc3492770f1ce698a679a2` |

### Negative checks

Five malformed-record tests were deliberately introduced into copies of the projection. The validator detected:
1. Missing required issuer.
2. Unknown facet identifier.
3. Conditional requirement without conditions.
4. Missing acceptance criteria.
5. Invalid provenance enum.

Separate semantic checks detect statement/metadata parity failures, duplicate IDs, stale evidence references, and evidence revision/URI mismatch.

### Correction made during this completion pass

The earlier structured projection had two defects that the original targeted check did not catch: provenance values were placed in the wrong basis fields, and many acceptance criteria were generic placeholders rather than the canonical contract's actual scenarios. Those defects have been corrected. The projection now uses the profile's allowed `basisType` values and contains the 46 concrete criteria from the Markdown contract. The validation above was run against the corrected committed projection.

## 5. Validation boundary

The structural checks used a targeted schema-constraint evaluator for the PM profile, extension, and pinned upstream record definitions. It exercised the keywords used by those definitions, including references, required properties, types, enums, constants, patterns, conditional clauses, array constraints and additional-property restrictions.

This is **not** a general-purpose independent JSON Schema Draft 2020-12 validator run, a complete containing-capture validation, an upstream Software Rules CI run, or runtime conformance testing. The Phase 1 profile still requires a full containing capture to be validated separately when a complete capture is assembled.

The evidence digest was independently recomputed from the exact canonical Markdown bytes returned at the referenced artifact revision. It matches the digest in the structured projection. The evidence record's source revision and URI match that same artifact revision and URI.

## 6. Decisions deliberately left open

- Sign-in identifier(s) and supported authentication method.
- Whether and when email/phone contact verification is required.
- Whether passkeys/MFA are required, optional or deferred at launch.
- Recovery mechanism and channel.
- Idle/absolute session durations, renewal and concurrent-session policy.
- Whether users receive device/session management UI.
- Account closure/deletion and retention behaviour.
- Assurance target and step-up events.

Numeric abuse-control thresholds and entitlement propagation bounds also remain to be specified in later requirements. These are not silently defaulted by Phase 2.

## 7. Phase 2 exit decision

**Phase 2 is complete.** The research-backed, stack-agnostic identity/authentication contract, structured Software Rules declared-contract projection, retained evidence, seven-step CIRCLES recommendation, concrete acceptance criteria, and unresolved owner decisions are recorded. Structural and semantic checks pass within the validation boundary above.

**Phase 3 is next:** assess authentication coverage across identity/authentication, authorization/permissions, security controls, API, data, persistence, configuration, errors/recovery and integrations. Phase 2 completion does not imply Phase 3 coverage completeness, upstream facet completeness, owner approval, or implementation conformance.
