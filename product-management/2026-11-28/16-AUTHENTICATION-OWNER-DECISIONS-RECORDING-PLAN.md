# Authentication Owner Decisions — Recording Plan

**Project:** ZeroDeck  
**Workstream:** PM-authored product requirements contracts  
**Prepared:** 2026-11-28  
**Status:** Owner-approved — 2026-11-28; recording task completed  
**Scope:** The eight decisions in `product-management/product-rules/contracts/IDENTITY-AUTHENTICATION.md`, section 6

## 1. Owner input received

The owner stated: “I go with ur recommendations”, referring to the Product Management Agent's eight recommendations for the eight open identity/authentication decisions.

This is treated as owner acceptance of the recommended choices below. It is not treated as blanket approval of every PM-proposed security requirement, the separate Phase 3 candidate additions, the Behaviour facet metadata proposal, or any implementation.

## 2. Decisions to record

| Decision | Recommended choice accepted by owner |
|---|---|
| `ZD-Q-AUTH-001` — Sign-in identifier and method | Launch with email + password. Email is the primary account/sign-in identifier. Do not require phone or social sign-in at launch. Keep the account principal separate from the email address and password. Support email changes only through a verified process. Passkeys may be added later. |
| `ZD-Q-AUTH-002` — Contact verification | Permit account creation in an explicitly unverified state. Require email verification before relying on that address for account recovery or security notifications, and before any feature/action whose policy explicitly requires a verified email. Do not infer additional feature gates that have not been specified. |
| `ZD-Q-AUTH-003` — MFA/passkeys | MFA is optional, not mandatory, at launch. Passkeys are a later enhancement, not a launch dependency. |
| `ZD-Q-AUTH-004` — Recovery | Use the verified email address for recovery, with a single-use, time-limited link or challenge. Expired or consumed challenges must fail. Successful recovery revokes existing sessions and notifies the account owner. Do not use security questions. |
| `ZD-Q-AUTH-005` — Session policy | Propose a 7-day inactivity limit and 30-day absolute maximum session lifetime. Use secure session/renewal credential rotation. Allow concurrent sessions on multiple devices. Logout immediately revokes the current session. The values are product policy choices, not assumptions about framework defaults. |
| `ZD-Q-AUTH-006` — Session management | At launch provide logout from the current device/session and logout from all devices. Defer a detailed device/session-management screen. The service must support individual-session revocation so that a management UI can be added later. |
| `ZD-Q-AUTH-007` — Account deletion and retention | Provide user-initiated account deletion. Revoke sessions immediately and disable account access. Delete personal data on a documented schedule; retain only records with a legitimate requirement, with the reason and retention period documented. Exact schedules and any legally required exceptions remain to be established before release. |
| `ZD-Q-AUTH-008` — Assurance and step-up | Use risk-based assurance rather than imposing a complex formal assurance tier at launch. Require fresh authentication before sensitive security/account actions, including password or passkey changes, recovery-email changes, and account deletion. Do not require repeated authentication for ordinary use. |

## 3. Planned repository changes

After this plan is approved:

1. Read and follow all seven Product Management Agent CIRCLES skills before carrying out the decision-recording work.
2. Create a dated owner-decision record that preserves the owner's acceptance, the eight choices, their scope, and the decisions that remain unresolved.
3. Update the canonical Markdown authentication contract:
   - replace the eight open questions with the accepted decisions;
   - make the email/password launch choice and its verification/recovery/session consequences explicit;
   - add the 7-day inactivity and 30-day absolute session limits as proposed product policy;
   - clarify current-session logout, logout-all, individual revocation support, and the absence of a launch device-management screen;
   - specify account deletion outcomes while preserving unresolved exact retention schedules and legally required exceptions;
   - add step-up authentication triggers;
   - preserve stack-agnostic, externally observable requirements.
4. Update the structured declared-contract projection from the canonical Markdown only. Keep statement text, requirement IDs, metadata, acceptance criteria, owner-decision references, artifact revision, and digest in sync.
5. Update the retained evidence record to point to the new canonical contract revision.
6. Add a decision-recording validation report covering:
   - all eight questions resolved as accepted owner decisions;
   - exact parity between Markdown statements and structured projection;
   - applicable acceptance criteria and requirement metadata;
   - session duration, renewal, logout/revocation, recovery, deletion and step-up consistency;
   - fresh artifact revision and independently recomputed SHA-256 digest;
   - explicit remaining unknowns and validation limits.
7. Update the product-rules README, PM workstream record, PLAN.md and TRACKER.md to show the owner decisions are recorded and identify the next phase accurately.

## 4. Boundaries and items that remain open

- Do not mark all 21 authentication requirements owner-approved merely because the owner accepted these eight recommendations. Only the eight decision outcomes and directly supported policy choices become owner-decided; other requirements remain PM-proposed unless separately approved.
- Do not accept or merge Phase 3 candidate requirements `ZD-AUTH-022`–`ZD-AUTH-024` as part of this decision.
- Do not apply the separate Behaviour facet-reference amendment as part of this decision.
- Keep the exact retention/deletion schedule, lawful retention categories, abuse-control thresholds, entitlement propagation bound, and other previously unlisted operational values unresolved where no recommendation was accepted.
- Do not select an authentication library, framework, token format, database schema, or implementation architecture.
- Do not modify product implementation, the Software Rules repository, or any file outside `product-management/`.
- Do not claim runtime conformance, security testing, or production readiness.

## 5. Exit criteria

This recording task is complete only when:
- all eight owner decisions are explicitly recorded and linked to their original question IDs;
- the canonical Markdown contract and structured projection agree exactly;
- evidence revision and digest match the updated canonical contract;
- validation results and limitations are recorded;
- tracker, plan, workstream and contract index agree on status;
- remaining unknowns and non-approved Phase 3 proposals remain visible.

**Approval gate:** Owner approved this plan on 2026-11-28. The planned repository updates are recorded in [17-AUTHENTICATION-OWNER-DECISIONS.md](17-AUTHENTICATION-OWNER-DECISIONS.md) and validated in [PHASE-4-AUTH-DECISION-VALIDATION.md](../product-rules/PHASE-4-AUTH-DECISION-VALIDATION.md).
