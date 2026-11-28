# Authentication Owner Decision Recording — Validation

**Project:** ZeroDeck  
**Date:** 2026-11-28  
**Decision reference:** ZD-DEC-AUTH-2026-11-28  
**Status:** Targeted structural, semantic and traceability checks passed  
**Canonical contract:** [IDENTITY-AUTHENTICATION.md](contracts/IDENTITY-AUTHENTICATION.md) v0.2.0-draft  
**Owner decision record:** [17-AUTHENTICATION-OWNER-DECISIONS.md](../2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md)

## 1. Recorded outcome

- Eight original owner questions (ZD-Q-AUTH-001–ZD-Q-AUTH-008) are marked resolved and point to ZD-DEC-AUTH-2026-11-28.
- Five additional operational questions (ZD-Q-AUTH-009–ZD-Q-AUTH-013) remain open.
- The contract contains 25 requirements and 66 acceptance criteria.
- ZD-AUTH-025 through ZD-AUTH-028 directly encode owner-approved step-up authentication, account deletion, email/password launch sign-in and email-verification boundaries. They are marked owner-approved.
- The original 21 requirements remain PM-proposed; no blanket approval was applied.
- Phase 3 proposals ZD-AUTH-022–ZD-AUTH-024 and the Behaviour facet-reference amendment remain separate and unaccepted.

## 2. Validation results

| Check | Result |
|---|---|
| All eight original decision IDs appear in the canonical owner-decision section | PASS |
| All eight original questions resolved with the same decision reference | PASS |
| Five additional operational questions remain open | PASS |
| Structured JSON parses | PASS |
| Canonical statements and structured metadata have exact ordered ID parity | PASS — 25/25 |
| Statement IDs unique | PASS |
| Requirement IDs unique | PASS |
| Acceptance-criterion IDs unique | PASS — 66/66 |
| Every requirement has at least one acceptance criterion | PASS |
| Original 21 requirements remain PM-proposed | PASS — 21/21 |
| Only the four new directly owner-approved requirements are marked owner-approved | PASS |
| Email/password requirement is no longer conditional | PASS |
| Contract version updated | PASS — 0.2.0-draft |
| Evidence revision and URI point to the new canonical Markdown revision | PASS |
| SHA-256 digest recomputed from exact canonical Markdown UTF-8 content | PASS — 94424bd0bf5fb8d2a4f7f923d64e8475a9a65c5f68292e9026681f77f916fd55 |

## 3. Policy consistency reviewed

- Email/password is the launch sign-in method; phone/social sign-in is not required.
- Email may remain unverified after account creation; unverified email is not used for recovery or security notifications.
- MFA is optional; passkeys are deferred.
- Recovery uses a single-use, time-limited challenge sent to verified email; successful recovery revokes existing sessions and sends a notification.
- Session expiry is 7 days of inactivity and 30 days absolute; secure rotation is required and concurrent devices are allowed.
- Current-session logout and logout-all-devices are launch capabilities; a detailed session list is deferred while individual revocation remains supported.
- Fresh authentication is required before password/passkey changes, recovery-email changes and account deletion.
- Account deletion immediately revokes sessions and disables access; personal-data deletion follows a documented schedule with only justified, documented retention exceptions.

## 4. Artifact integrity

- Canonical contract revision: 9d92423cdf801df7d6d2ec3fabf0b86ee562965c
- Canonical contract SHA-256: c44844872e6c70a1f50c17286cd9c35cd27ae0397cd09ede1c62a7135d6267ac
- Structured projection and retained evidence reference this exact revision and digest.

## 5. Validation boundary

This was a targeted structural, semantic and traceability validation of the edited artifacts. It is not:
- a full independent JSON Schema Draft 2020-12 validator run;
- an upstream Software Rules CI or conformance workflow;
- runtime testing of a ZeroDeck authentication implementation;
- a security audit, penetration test, legal review, or production-readiness assessment.

The exact deletion schedule, lawful retention categories, email verification operations, numeric abuse thresholds, session renewal cadence and authorization propagation bound remain unresolved. These must not be inferred from the accepted eight decisions.

**Conclusion:** the eight owner decisions are recorded consistently in the canonical Markdown, structured projection, evidence and decision register within the stated validation boundary.
