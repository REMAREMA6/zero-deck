# ZeroDeck Authentication — Owner Decision Record

**Decision reference:** ZD-DEC-AUTH-2026-11-28  
**Decision date:** 2026-11-28  
**Authority:** Product Owner  
**Status:** Eight recommendations explicitly accepted  
**Canonical contract:** [Identity and Authentication v0.2.0-draft](../product-rules/contracts/IDENTITY-AUTHENTICATION.md)

## Owner approval

The owner stated: “I go with ur recommendations”, referring to the Product Management Agent's eight recommendations for the eight authentication questions. This record preserves that approval and its exact scope.

The owner approved the eight policy choices below. This does not approve every existing PM-proposed authentication requirement, the Phase 3 candidate additions ZD-AUTH-022–ZD-AUTH-024, the separate Behaviour facet-reference amendment, or any implementation/architecture.

## 1. Approved decisions

| Question | Owner-approved decision |
|---|---|
| ZD-Q-AUTH-001 — Sign-in | Launch with email + password. Email is the primary sign-in identifier. Phone and social sign-in are not required at launch. Keep the account principal separate from the email address/password. Email changes require a verified process. Passkeys may be added later. |
| ZD-Q-AUTH-002 — Verification | Permit account creation in an explicitly unverified state. Verify email before using it for recovery or security notifications, and before a feature/action whose policy explicitly requires a verified email. Do not infer other feature gates. |
| ZD-Q-AUTH-003 — MFA/passkeys | MFA is optional, not mandatory, at launch. Passkeys are deferred as a later enhancement and are not a launch dependency. |
| ZD-Q-AUTH-004 — Recovery | Use verified email for a single-use, time-limited recovery link/challenge. Expired or consumed challenges fail. Successful recovery revokes existing sessions and notifies the account owner. Do not use security questions. |
| ZD-Q-AUTH-005 — Session policy | Enforce 7-day inactivity expiry and 30-day absolute session lifetime. Rotate session/renewal credentials securely. Allow concurrent sessions across devices. Logout immediately revokes the current session. |
| ZD-Q-AUTH-006 — Session management | Launch with current-session logout and logout-all-devices. Defer a detailed device/session-management screen. The service must support individual-session revocation for later use. |
| ZD-Q-AUTH-007 — Deletion/retention | Provide user-initiated account deletion. Revoke sessions immediately and disable account access. Delete personal data on a documented schedule; retain only records with a legitimate requirement and document the reason and retention period. Exact schedules and legal exceptions remain open. |
| ZD-Q-AUTH-008 — Assurance/step-up | Use risk-based assurance rather than a complex formal tier at launch. Require fresh authentication before password/passkey changes, recovery-email changes and account deletion. Do not require repeated authentication for ordinary use. |

## 2. Canonical contract consequences

- Email/password is the selected launch sign-in method; phone or social sign-in is not required.
- Email may be unverified at account creation, but an unverified address cannot be used for recovery or security notifications.
- MFA is optional; passkeys are a later enhancement.
- Recovery is verified-email based, single-use and time-limited; successful recovery revokes all existing sessions and triggers a security notification.
- Session expiry is 7 days of inactivity and 30 days absolute. The server enforces both.
- Current-session logout and logout-all-devices are launch capabilities. A detailed session/device list is deferred; individual revocation remains supported by the service.
- Fresh authentication is required before password/passkey changes, verified recovery-email changes and account deletion.
- User-initiated account deletion immediately revokes sessions and disables access; personal-data deletion follows a documented schedule with justified retention exceptions.

## 3. CIRCLES record — decision-recording task

This application of CIRCLES concerns how to preserve the owner's choices as usable product requirements. It does not reopen or replace the owner's decisions.

### C — Comprehend

**Goal:** make the eight accepted authentication choices unambiguous and traceable for later product definition and engineering.  
**Constraints:** retain stack-agnostic observable behaviour; work only under product-management/; do not alter product implementation or the Software Rules repository; do not silently approve unrelated requirements.  
**Context:** authentication supports the same ZeroDeck account identity across web and Android. It is not a fourth MVP capability.  
**Success measure:** all eight question IDs resolve to this decision record and the canonical contract/projection agree.

### I — Identify

**Primary cohort:** everyday non-technical ZeroDeck account holders who sign in on web and/or Android and need to keep access to the same account.  
**Friction:** unclear sign-in, recovery, session and deletion policy creates inconsistent expectations and insecure or confusing account lifecycle behaviour.  
**Affected stakeholders:** account holders, product owner, support/operations and engineering. No primary user research was performed for this documentation task.

### R — Report

**Underlying job (PM inference):** as a ZeroDeck account holder, I need to access, recover, secure and close my account predictably across supported platforms so that I can remain in control of my account and data.  
This is a product-management inference, not a user-research finding. The accepted eight decisions are owner choices, not claims about measured user preference.

### C — Cut

**Chosen need:** preserve clear, testable account-lifecycle policy for the launch scope.  
**Cut/deferred:** provider/library selection, exact retention schedules, jurisdiction-specific retention categories, numeric abuse thresholds, exact renewal cadence and authorization propagation bounds. These require later evidence or decisions and are not guessed here.

### L — List

1. **Quick win:** keep the eight choices only in a decision log. Fast, but implementers would still have to translate them into the canonical contract.
2. **Core bet:** maintain a dated owner decision register and update the canonical Markdown contract, structured projection and retained evidence together. This makes choices traceable and testable without choosing a stack.
3. **Longer horizon:** expand into provider-specific architecture, data schemas and operational runbooks. That exceeds this task's authority and would prematurely constrain implementation.

### E — Evaluate

Evaluation axes fixed before comparison: decision traceability, implementation clarity, stack independence, scope discipline and maintenance cost.

- Option 1 is cheap but leaves the canonical requirements ambiguous and invites divergence.
- Option 2 has moderate documentation/validation cost but connects each decision to contract behaviour and evidence while preserving implementation freedom.
- Option 3 may later help engineering but is not viable within this product-requirements task; it would turn product policy into an unapproved architecture decision.

**Preferred option's drawback:** it requires coordinated updates and validation across multiple artifacts. That cost is accepted to prevent the owner decision and implementable contract from drifting apart.

### S — Summarize

**PM recommendation:** use the owner decision register plus synchronized canonical Markdown, structured projection and evidence. The owner has already approved the eight policy choices; this recommendation concerns their faithful recording, not whether to accept them.

**Testable completion metric:** 8/8 original question IDs are marked resolved with the same decision reference; every canonical statement has one matching structured metadata record; evidence revision/digest match the canonical Markdown; no unrelated PM proposal is promoted.

**Trade-off:** exact operational values and implementation choices remain open rather than being guessed. This delays those details but preserves stack independence and owner authority.

## 4. Still unresolved

The eight decisions are resolved. These additional details remain open and must be specified before relevant release gates:

- Email canonicalization, verification challenge expiry/resend and notification operations.
- Numeric authentication/recovery rate limits and progressive delay policy.
- Exact session renewal cadence and edge-case policy within the approved lifetime limits.
- Exact deletion schedule, legitimate retention categories and applicable legal obligations.
- Authorization propagation bound for entitlement, permissions and owner-controlled activation.

These are tracked as ZD-Q-AUTH-009 through ZD-Q-AUTH-013 in the canonical contract projection.

## 5. Explicit exclusions

- No blanket approval of the 21 original PM-proposed requirements.
- No acceptance of Phase 3 candidate requirements ZD-AUTH-022–ZD-AUTH-024.
- No application of the separate Behaviour facet-reference amendment.
- No auth library, framework, token format, schema or provider selection.
- No implementation, security audit, runtime conformance or production-readiness claim.
