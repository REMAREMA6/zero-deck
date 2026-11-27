# Phase 2 — Identity and Authentication Contract Validation

**Workstream:** PM-authored ZeroDeck Product Requirements Contracts  
**Phase:** 2 — research and author authentication requirements  
**Date:** 2026-11-27  
**Status:** [x] Phase 2 authoring and targeted validation complete; Phase 3 coverage assessment remains outstanding  
**Contract:** `ZD-CONTRACT-AUTH` v`0.1.0-draft`  
**Author / issuer:** ZeroDeck Product Management Agent

## 1. Deliverables

- Canonical requirement contract: [IDENTITY-AUTHENTICATION.md](contracts/IDENTITY-AUTHENTICATION.md)
- Software Rules declared-contract projection: [IDENTITY-AUTHENTICATION.declared-contract.json](contracts/IDENTITY-AUTHENTICATION.declared-contract.json)
- Retained declared-contract evidence record: [identity-authentication-contract.evidence.json](evidence/identity-authentication-contract.evidence.json)
- Authoring profile: [PROFILE.md](PROFILE.md)
- Pinned upstream Software Rules compatibility target: commit `5591a2e62287afc29bde002369eaf659673ec59b`

The Markdown contract is canonical. The JSON file is its structured projection and must not be independently edited.

## 2. Contract contents

- 21 stable requirements: `ZD-AUTH-001` through `ZD-AUTH-021`.
- 21 matching PM metadata records, each with a priority, decision status, facet mapping, platform scope, rationale, basis and acceptance criterion.
- 8 explicit unresolved questions, all marked as requiring owner decisions.
- Web and Android platform applicability; platform-specific session protection is separated.
- Every requirement remains `pm-proposed`. No requirement is represented as owner-approved.
- Authentication remains supporting infrastructure, not a fourth user-facing MVP capability.
- Pro entitlement and the owner-controlled link-check activation switch remain separate trusted-server authorization conditions.

## 3. Research used

The contract draws on:
- NIST SP 800-63B-4 (final): authenticator/verifier requirements, password guidance, rate limiting, authenticator lifecycle, recovery and sessions.
- OWASP Authentication Cheat Sheet.
- OWASP Password Storage Cheat Sheet.
- OWASP Session Management Cheat Sheet.
- OWASP Forgot Password Cheat Sheet.
- Android Security Tips.
- Android Keystore system documentation.

It also inspected the Software Rules `identity-authentication` facet and bounded cases `JOSE-AUTH-001` and `SESSION-EXPRESS-001`. Those cases are not treated as complete identity-provider or authentication coverage.

## 4. Targeted validation results

| Check | Result |
|---|---|
| Contract JSON parses | Pass |
| PM issuer matches extension author | Pass |
| Declared statements and PM metadata have exact one-to-one ID parity | Pass — 21 / 21 |
| Statement IDs are unique | Pass |
| All facet references belong to the pinned 15-facet taxonomy | Pass |
| Requirement types and priorities use profile enumerations | Pass |
| All requirements have at least one basis and acceptance criterion | Pass |
| Conditional requirement has explicit conditions | Pass — password controls only apply if passwords are offered |
| Platform scopes use only web and/or Android | Pass |
| All requirements remain PM-proposed | Pass |
| Contract evidence reference resolves to the retained evidence record | Pass |
| Evidence class is `declared-contract` | Pass |
| Artifact revision matches the retained artifact source revision | Pass |
| SHA-256 digest matches the exact canonical Markdown bytes | Pass |
| All 8 open questions remain explicitly unresolved and owner-decision-required | Pass |

## 5. Validation boundary

These are targeted JSON parsing, profile-enumeration, identifier-parity, reference-integrity and digest checks performed during authoring. They are **not** a full independent JSON Schema Draft 2020-12 validator run, an upstream Software Rules CI run, a complete capture validation, or runtime conformance testing.

Before engineering automation consumes this record:
1. Run the complete containing capture through a conformant Draft 2020-12 validator against the pinned upstream schemas.
2. Validate the declared-contract record against the PM complete-record schema and nested extension schema with all references registered.
3. Run cross-record integrity checks across all contracts, evidence and decision records.
4. Keep semantic review and owner-authority checks; schema validity does not establish completeness or approval.

## 6. Known scope gaps carried to Phase 3

The authentication contract is authored, but this phase does not establish that every relevant Software Rules facet has been completely assessed. Phase 3 must evaluate identity/authentication, authorization/permissions, security controls, API, data, persistence, configuration, errors/recovery and integrations, with other facets marked applicable or not applicable with rationale.

The following remain product decisions or later requirements:
- sign-in identifier and supported authenticators;
- contact verification and timing;
- MFA/passkey launch policy and assurance target;
- recovery channel and detailed recovery policy;
- idle/absolute session durations, renewal and concurrent-session policy;
- user-facing session/device management;
- account closure/deletion and retention;
- numeric abuse-control thresholds and step-up events.

The contract deliberately does not invent these values or mechanisms.

## 7. Phase 2 exit decision

**Phase 2 is complete.** The stack-agnostic authentication/account contract, structured declared-contract projection, retained evidence record, external research references, acceptance criteria and unresolved decisions are present and passed the targeted checks above.

**Phase 3 is next:** validate authentication coverage and cross-facet applicability. Phase 2 completion does not mean the identity/authentication facet is universally complete, that ZeroDeck's requirements are owner-approved, or that any implementation conforms.
