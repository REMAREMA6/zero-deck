# Phase 2 CIRCLES Analysis — Identity and Authentication

**Project:** ZeroDeck  
**Date:** 2026-11-27  
**Workstream:** PM-authored product rules — Phase 2  
**Author:** ZeroDeck Product Management Agent  
**Status:** PM recommendation; not an owner decision  
**Canonical contract:** [IDENTITY-AUTHENTICATION.md](../product-rules/contracts/IDENTITY-AUTHENTICATION.md)  
**Structured projection:** [IDENTITY-AUTHENTICATION.declared-contract.json](../product-rules/contracts/IDENTITY-AUTHENTICATION.declared-contract.json)

This record applies the seven Product Management skills in order. It recommends product behaviour; it does not approve a sign-in method, select an implementation, or change ZeroDeck.

## C — Comprehend the situation

### Goal

Provide secure, dependable account access across ZeroDeck's web and Android surfaces so users can return to their account and the trusted service can make correct authorization decisions. Authentication is enabling infrastructure for the approved MVP, not a fourth user-facing capability.

The business outcome is dependable account continuity and protected access without avoidable friction for the first target cohort. This is not yet a retention or revenue experiment: no validated authentication baseline or production account telemetry was available for this phase.

**Proposed success measure:** cross-platform account-access task success during a target-user pilot. The final metric and target are stated in S — Summarize.

### Constraints and existing decisions

- Owner-approved MVP capabilities remain manual file security analysis, quarantine/file disposition, and website/link checking.
- MVP-03 requires BOTH active Pro entitlement and owner-controlled activation. Authentication alone grants neither; no provider/API request may occur when either gate is false.
- The first target cohort is everyday non-technical users.
- The product identity spans web and Android; platform-specific capabilities and session controls are permitted.
- Owner direction prefers first-party authentication and backend services, Neon as the managed database, mature security libraries, and no custom cryptographic primitives.
- Owner direction is to avoid hosted identity providers by default. This is a direction, not final implementation-architecture approval.
- No user interviews, usability-test results, production authentication telemetry, or validated sign-in preference were found in the Phase 2 evidence. Customer needs below are therefore explicitly labelled as hypotheses/inferences.
- Authentication method, contact verification, MFA/passkeys policy, recovery channel, session durations, account deletion and assurance target remain unresolved.

### Context and assumptions

This is a greenfield account capability, not a replacement of an existing ZeroDeck authentication service. The contract describes externally observable product outcomes and deliberately does not prescribe a language, framework, token format, cryptographic algorithm, database schema or provider.

Assumption carried forward: users will need to return to their ZeroDeck account from either supported platform. This follows the owner-confirmed web + Android product identity, but frequency of cross-platform switching has not been measured.

## I — Identify the customer

### Segments considered

1. **Everyday non-technical users returning to ZeroDeck on web and Android.** They need to recognize their account, regain access when they lose an authenticator, and avoid confusing account access with paid-feature eligibility.
2. **Technical security practitioners.** They may value stronger or more configurable authentication, but they are not the owner-selected first cohort.
3. **Product operators and support staff.** They need trusted account state, safe recovery and the ability to resolve access problems without weakening controls.
4. **The product owner and security/operations stakeholders.** They carry account-takeover, privacy, abuse, service availability and support consequences.

### Chosen cohort

**Primary cohort:** everyday non-technical users who create a ZeroDeck account and later return to it from either web or Android.

This is the owner-selected first audience, not a cohort independently proven by customer research. It is the right cohort for this phase because account access is a shared prerequisite for the approved product surfaces, while the user's technical skill should not be assumed.

The customer side is the end user. Operators, support, the owner, and any future payment/entitlement service are affected stakeholders. They are not substitutes for the user's need.

## R — Report the customer's needs

There is no direct customer interview or usage evidence in this phase. The following are PM hypotheses grounded in the owner-approved product shape and the security consequences documented by NIST and OWASP. They must not be presented as reported customer statements.

| Stated want / likely request | Underlying need (inferred) | Why it matters | Evidence status |
|---|---|---|---|
| “Let me sign in on either platform.” | Preserve one recognizable account identity and continuity across supported surfaces. | A device-specific or mutable-identifier identity would fragment account resources and entitlement state. | Inferred from owner-confirmed web + Android identity. |
| “Keep me signed in.” | Return to protected work without repeatedly proving identity, while preventing stolen or expired credentials from remaining authoritative. | Session credentials can impersonate the account; expiry, rotation and revocation are security boundaries. | Inferred; OWASP session guidance. |
| “Let me reset access if I lose my sign-in method.” | Recover account control without allowing an attacker to use recovery as an easier account-takeover path. | Recovery must resist enumeration, replay and unauthorized changes, and must address existing sessions. | Inferred; OWASP recovery guidance and NIST authenticator lifecycle. |
| “Show my Pro access correctly.” | Have account permissions and entitlement determined from trusted current state, not editable client values. | A client-side Pro flag or activation flag must not bypass the owner-controlled MVP-03 gates. | Owner direction plus PM interpretation of server-side enforcement. |
| “Tell me why I cannot sign in.” | Understand a safe next step without exposing secrets, account existence or internal security details. | Ambiguous errors create support burden; overly detailed errors can disclose sensitive state. | Inferred; OWASP authentication and recovery guidance. |

**Primary need selected for the next step:** users need to regain and maintain legitimate access to one account across web and Android with low avoidable friction, while unauthorized clients and stale/revoked credentials cannot obtain protected access.

## C — Cut through prioritization

Axes are the CIRCLES skill's frequency of pain, acuteness when it occurs, and alignment with the goal. Scores are qualitative PM judgement, not measured demand.

| Need | Frequency | Acuteness | Goal alignment | Confidence |
|---|---|---|---|---|
| Secure, dependable account access and continuity | Medium (unmeasured) | High when access is lost or compromised | High | Medium-low |
| Safe recovery after authenticator loss | Unknown | High; recovery failure can lock out a legitimate user or enable takeover | High | Medium-low |
| Correct server-side authorization and entitlement | Every protected operation by design | High if bypassed | High, explicitly required by owner direction | High |
| User-visible device/session management | Unknown | Medium-high after device loss or suspected compromise | Medium | Low |
| Advanced assurance controls (mandatory MFA, step-up, multiple authenticators) | Unknown | Potentially high for higher-risk events | Medium-high | Low |

### The cut

**Choose:** the minimum complete account lifecycle needed for trusted cross-platform access: stable principal, trusted authentication verification, protected secrets where applicable, abuse resistance, session issue/rotation/expiry/revocation/logout, platform-specific credential protection, server-side authorization, safe failure, and a secure recovery path.

**Defer, not silently discard:**
- The exact identifier and sign-in method.
- Mandatory MFA, a particular passkey policy, and numeric assurance level.
- User-facing device/session inventory and session-management UI.
- Exact session durations, renewal and concurrent-session policy.
- Account closure/deletion and data-retention promises.
- Numeric throttling thresholds and step-up triggers.

These deferred decisions need product, risk, usability and launch-market evidence. Deferring a visible session list does not remove the requirement for trusted revocation mechanisms. Deferring a specific recovery channel does not remove the need for a secure recovery process.

**Explicitly outside this phase:** building an authentication UI, choosing a vendor/library, selecting a token format, designing database tables, or treating authentication as a new MVP capability.

## L — List materially different approaches

All options answer the selected need, but differ in where the authentication burden and trust boundary sit.

### Option A — First-party password-first account

Use a ZeroDeck-operated account service with a familiar password-based sign-in, a verified contact channel for recovery, and optional additional factors later.

- **Quick-win shape:** familiar to users and compatible with mature password-verification libraries.
- **Main cost:** password creation, reuse, phishing, credential stuffing, reset support and secure verifier storage remain ongoing product responsibilities.
- **Owner fit:** consistent with first-party direction.

### Option B — First-party passkey-capable account with a fallback authenticator

Use a ZeroDeck-operated account principal and session service that supports passkeys as a primary or preferred authenticator, with a clearly designed fallback/recovery route. Do not force mandatory MFA at launch without a documented risk case.

- **Core-bet shape:** can reduce password memorization and phishing exposure while preserving ZeroDeck control of account identity and authorization.
- **Main cost:** authenticator enrollment, device/platform compatibility, fallback and recovery design are more involved. Passkeys do not eliminate account recovery or session security work.
- **Owner fit:** consistent with first-party direction, provided the fallback and recovery experience is understandable on both platforms.

### Option C — Managed identity provider

Delegate sign-in, authenticator management and much of recovery to an external identity service while ZeroDeck retains its own account principal and authorization rules.

- **Horizon/comparator shape:** can reduce the amount of authentication machinery ZeroDeck must initially operate.
- **Main cost:** provider dependency, recurring pricing, data-flow and availability considerations, integration boundaries, migration risk and less direct control of the user authentication experience.
- **Owner fit:** conflicts with the stated preference to avoid hosted identity providers by default; it remains a comparison option, not a presumed choice.

## E — Evaluate the options

Evaluation axes were fixed before scoring: user friction for the chosen cohort; resistance to common account attacks; cross-platform consistency; recovery quality; operational ownership and ongoing cost; alignment with the owner's first-party direction. Feasibility is treated as a floor, not the deciding test.

| Axis | A — Password-first | B — Passkey-capable first-party | C — Managed identity provider |
|---|---|---|---|
| Everyday-user usability | Familiar, but passwords and reset flows add friction. | Potentially low-friction after enrollment; fallback can confuse users if poorly designed. | Often familiar, but redirects/provider-specific screens can interrupt the product flow. |
| Security potential | Depends heavily on password policy, storage, throttling, phishing resistance and recovery. | Strong phishing-resistance potential for passkeys; fallback/recovery remains a critical attack surface. | Depends on provider controls and configuration; transfers part of the trust boundary to the provider. |
| Web + Android | Broadly supportable with mature libraries. | Supportable, but platform/browser compatibility and cross-device recovery must be tested. | Usually supports multiple platforms, but exact behaviour depends on provider SDKs and configuration. |
| Recovery | Familiar email/contact recovery, but mailbox compromise and enumeration are risks. | More complex if the user loses all enrolled authenticators; recovery must be designed, not assumed away. | Provider supplies recovery mechanisms, but ZeroDeck inherits their limits and support path. |
| Ownership and operations | Maximum control, but ZeroDeck operates password and recovery security. | Maximum account control, with greater design/testing burden. | Less initial implementation burden, more external dependency and commercial/operational coupling. |
| Owner-direction fit | High. | High. | Low without a change to the current direction. |
| Principal drawback | Password abuse and recovery become a continuing security/support burden. | Higher initial complexity and risk of confusing users during device loss or fallback. | Provider dependency, pricing, data-flow and reduced direct control. |

### Evaluation

- **Option A is the fastest credible baseline**, but it leaves the product carrying the password and recovery burden indefinitely. It is the fallback benchmark, not the strongest long-term fit for a security-oriented product.
- **Option B is the best balance to investigate first.** It aligns with first-party ownership and offers a route to phishing-resistant sign-in without making mandatory MFA an unsupported launch assumption. Its recovery and cross-platform usability risks are real and must be tested before owner approval.
- **Option C may reduce early build effort**, but it conflicts with the owner's stated preference and introduces an external identity dependency. It should only be reconsidered if a concrete cost, security or delivery case outweighs that conflict.

No option is proven lovable or commercially validated by current customer evidence. Option B is a PM recommendation for a small prototype/usability test, not a final architecture selection.

## S — Summarize the recommendation

### Recommendation

**Recommend Option B: a first-party, passkey-capable account service with a usable fallback authenticator and a deliberately designed recovery path.** Keep ZeroDeck's account principal, session lifecycle and authorization decisions under ZeroDeck control. Do not require mandatory MFA at launch until the assurance target and risk case are documented.

This is the best current fit for the owner-selected non-technical cohort and the owner direction for first-party authentication. It supports one account identity across web and Android while allowing different platform session controls.

### One testable success metric

**Cross-platform account-access task success:** the percentage of first-time, non-technical pilot participants who can create an account on one supported platform and successfully authenticate to the same account on the other platform, without assistance, within five minutes.

- **Proposed target:** at least 90%.
- **Comparison:** run the same task with a password-first baseline and compare completion rate and time. The target is a PM hypothesis, not an owner-approved launch KPI.
- This measures whether the recommended experience works beyond one-time trial. Security acceptance criteria remain release gates and are not traded away for a higher usability score.

### Trade-off

Choosing Option B costs more early design and testing time than password-first. It gives up the fastest possible sign-in implementation in exchange for a stronger long-term authentication direction. The managed-provider shortcut is not recommended because it conflicts with the current first-party preference and would transfer part of the trust boundary.

### Objections and answers

- **“Passkeys are too unfamiliar for non-technical users.”** That is a testable usability risk, not a reason to assume failure. Keep a clear fallback and test the task with the selected cohort before owner approval.
- **“Password-first is simpler.”** It is simpler to launch, but password abuse and recovery remain permanent operating responsibilities. Option A remains the comparison baseline.
- **“Passkeys remove account recovery problems.”** They do not. Lost devices/authenticators and fallback recovery still require explicit, tested controls.
- **“Using Neon means authentication is solved.”** It does not. A database preference is not an authentication, session or authorization design.
- **“A signed-in user should automatically get Pro.”** No. Authentication identifies the principal; server-side entitlement and the owner-controlled activation switch independently govern MVP-03.

### Open decisions returned to the owner

The eight questions in the structured contract remain open: sign-in identifier/method; contact verification; MFA/passkey launch policy; recovery channel; session durations/renewal/concurrency; user-visible session management; account closure/deletion/retention; and assurance/step-up policy. The PM recommendations in the contract are advice, not decisions.

### Evidence limitations

- No direct customer research or production account telemetry was available for this phase.
- NIST SP 800-63B-4 is authoritative guidance for digital identity services, but its federal-agency scope does not automatically make every assurance requirement mandatory for ZeroDeck.
- OWASP cheat sheets are security guidance, not product-specific owner decisions.
- The Software Rules identity/authentication corpus contains bounded JWT verification and Express session-lifecycle cases. Those cases do not prove complete authentication coverage or ZeroDeck implementation conformance.

## Sources

- NIST, [SP 800-63B-4 — Authentication and Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html), final 2025.
- OWASP, [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).
- OWASP, [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
- OWASP, [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- OWASP, [Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html).
- Android, [Security Tips](https://developer.android.com/privacy-and-security/security-tips) and [Android Keystore system](https://developer.android.com/privacy-and-security/keystore).
- Owner-approved ZeroDeck product boundaries and directions recorded in the current product-management tracker and platform/integration assessment.

---

**Authority:** This document is a Product Management recommendation. It does not approve Option B, close the eight owner questions, or authorize implementation.
