# ZeroDeck Identity and Authentication Product Requirements

**Contract ID:** `ZD-CONTRACT-AUTH`  
**Contract version:** `0.2.0-draft`  
**Capability:** `AUTH` — supporting account infrastructure  
**Author / issuer:** ZeroDeck Product Management Agent  
**Lifecycle:** Draft; the eight owner decisions in Section 4 are approved and recorded. Requirements ZD-AUTH-025 through ZD-AUTH-028 directly encode owner-approved account-security and launch sign-in/verification decisions; the other requirements remain PM-proposed.  
**Platforms:** Web and Android  
**Software Rules compatibility target:** `REMAREMA6/software-rules` commit `5591a2e62287afc29bde002369eaf659673ec59b`, specification 0.3.0 Draft, schema 0.2.0 Draft

## 1. Purpose and boundary

This contract defines the product-level identity, authentication and session behaviours required to support ZeroDeck accounts and protected account capabilities, including server-side Pro entitlement enforcement.

Authentication is supporting infrastructure. It is **not a fourth user-facing MVP capability** and does not expand the owner-approved MVP of manual file security analysis, quarantine/file disposition, and website/link checking.

The contract states externally observable outcomes. It does not prescribe a programming language, framework, database schema, token format, cryptographic algorithm, hosting provider or authentication library. The owner has directed ZeroDeck to own its authentication and backend, use Neon as its preferred managed database, use mature security libraries, and avoid hosted identity providers by default. Those are owner directions; this contract does not claim a final implementation architecture has been approved.

Identity establishes who is acting. Authorization determines what that identity may do. Pro entitlement and the owner-controlled link-check activation switch are separate server-controlled conditions; successful authentication alone MUST NOT grant Pro access or enable link checking.

## 2. Authority and requirement status

- **Owner direction:** first-party authentication/backend; Neon preferred as managed database; use established security libraries and do not invent cryptographic primitives.
- **Owner-approved product boundary:** authentication is supporting infrastructure; MVP-03 link checking requires both active Pro entitlement and owner-controlled activation.
- **External research:** NIST SP 800-63B-4; OWASP Authentication, Password Storage, Session Management and Forgot Password Cheat Sheets; Android Security Tips and Android Keystore documentation.
- **PM inference:** the requirements below translate those security principles into testable product outcomes for a consumer product serving web and Android.
- **Owner-approved decisions:** email/password sign-in; verified-email use and verification boundaries; optional MFA with passkeys deferred; verified-email recovery; 7-day inactivity and 30-day absolute session limits; current-session and logout-all controls with no launch session-list UI; user-initiated account deletion with a documented retention schedule; and risk-based step-up authentication for sensitive account actions.
- **Still unresolved:** exact email canonicalization, verification message/expiry details, numeric abuse-control thresholds, session renewal cadence and concurrency edge cases, exact deletion/retention schedule and legally required retention categories, entitlement/activation propagation bounds, and operational assurance thresholds.

Every requirement below is **PM-proposed**, not owner-approved. Normative language expresses the proposed product contract, not a claim about current implementation behaviour.

## 3. Normative requirements

### Account identity and lifecycle

#### Requirement ZD-AUTH-001 — Establish a stable account principal

When an account is successfully created, the system MUST establish one stable, unique account principal that remains the identity reference for that account across supported platforms and subsequent authentication sessions.

- Priority: P0
- Facets: identity-authentication, data, persistence
- Rationale: a stable principal prevents identity from being coupled to a device, session or mutable sign-in identifier.
- Acceptance:
  - Given a successful account creation, when the account is retrieved through an authenticated session, then the same stable principal is returned.
  - Given two distinct accounts, when their principal references are compared, then they are distinct.
- Basis: PM inference; OWASP Authentication Cheat Sheet (user IDs).

#### Requirement ZD-AUTH-002 — Prevent duplicate account identifiers

When an email address is used as the primary sign-in or recovery identifier, the system MUST enforce uniqueness according to one documented email canonicalization policy and MUST NOT create two accounts that resolve to the same canonical identifier.

- Priority: P0
- Facets: identity-authentication, data, persistence, errors-recovery
- Rationale: identifier ambiguity can route authentication or recovery to the wrong principal.
- Acceptance:
  - Given an existing account identifier, when another account attempts to claim an identifier that canonicalizes to the same value, then the second claim is rejected without changing the first account.
  - Given identifiers that differ only in forms the documented canonicalization treats as equivalent, when submitted, then the uniqueness check treats them consistently.
- Basis: PM inference.
- Owner decision: email is the primary sign-in identifier. The exact canonicalization policy remains to be documented and tested before launch.

#### Requirement ZD-AUTH-003 — Keep account identity separate from credentials

The system MUST keep the account principal distinct from the credential or authenticator used to prove control of that account, so that changing or replacing an authenticator does not silently create a different account.

- Priority: P1
- Facets: identity-authentication, data, persistence
- Acceptance:
  - Given an account with an existing principal, when its supported authenticator is changed, then the principal remains unchanged.
- Basis: PM inference; NIST SP 800-63B-4 authenticator lifecycle model.

### Credential verification and protection

#### Requirement ZD-AUTH-004 — Verify credentials at the trusted service boundary

When a user attempts to authenticate, the system MUST verify the presented authenticator through a trusted service-side process before establishing an authenticated session or granting access to protected account data.

- Priority: P0
- Facets: identity-authentication, api, security-controls, authorization-permissions
- Forbidden: treating a client-side success flag, locally stored role, or client-supplied entitlement claim as proof of identity.
- Acceptance:
  - Given an unauthenticated client, when it submits fabricated client-side authentication state without valid server-verifiable proof, then protected operations are denied.
  - Given valid credentials, when the trusted verifier accepts them, then an authenticated session may be established for the corresponding principal.
- Basis: owner direction for first-party backend; PM inference; Android Security Tips.

#### Requirement ZD-AUTH-005 — Protect stored authentication secrets

If the system stores a password or other reusable authenticator secret, it MUST store only a verifier representation produced by a currently accepted, purpose-appropriate password/authenticator storage mechanism and MUST NOT store or log the recoverable plaintext secret.

- Priority: P0
- Facets: identity-authentication, security-controls, data, persistence
- Acceptance:
  - Given a newly registered password, when persisted records and application logs are inspected, then the plaintext password is absent and only the approved verifier representation is present.
  - Given a credential verification request, when the verifier checks the credential, then it does not need to retrieve a plaintext password.
- Basis: external research; OWASP Password Storage Cheat Sheet.
- Constraint: use a maintained security library; do not design a password-hashing or cryptographic primitive in product code.

#### Requirement ZD-AUTH-006 — Apply safe password acceptance rules for launch password authentication

For ZeroDeck's email-and-password launch authentication, the system MUST require a minimum of 15 characters for a password used as a single-factor authenticator and a minimum of 8 characters when the password is used only as part of multi-factor authentication; MUST permit passwords of at least 64 characters; MUST accept Unicode and whitespace; MUST NOT silently truncate passwords or impose other character-composition rules; MUST compare new or changed passwords against a blocklist of commonly used, expected or compromised passwords; and MUST NOT require periodic password changes unless there is evidence of compromise.

- Priority: P1
- Facets: identity-authentication, interface, security-controls, errors-recovery
- Acceptance:
  - Given password authentication is offered without MFA, when a password shorter than 15 characters is submitted, then it is rejected; when a password of at least 15 characters is submitted, it is eligible for further checks.
  - Given password authentication is offered only as one factor in MFA, when a password shorter than 8 characters is submitted, then it is rejected.
  - Given a password of at least 64 characters containing Unicode or whitespace, when submitted within the product's documented input limit, then it is accepted for evaluation and is not silently truncated.
  - Given a password on the blocklist, when submitted for creation or change, then it is rejected with an actionable reason.
  - Given no evidence of compromise, when the account remains in good standing, then the system does not force a periodic password change.
- Basis: external research; NIST SP 800-63B-4 and OWASP Authentication Cheat Sheet.
- Applicability: email-and-password authentication is an owner-approved launch choice. The password-length and verifier controls in this requirement remain PM-proposed security requirements based on the cited guidance.

#### Requirement ZD-AUTH-007 — Resist automated authentication abuse

The system MUST limit repeated failed authentication and recovery attempts using server-enforced controls that consider the account and relevant request context, and MUST provide a bounded, user-recoverable response to throttling.

- Priority: P0
- Facets: identity-authentication, security-controls, api, errors-recovery, configuration
- Acceptance:
  - Given repeated failed attempts against one account, when the configured threshold is reached, then further attempts are delayed or rejected according to the documented policy.
  - Given throttling is active, when a legitimate user attempts authentication, then the response communicates the restriction without revealing whether another person's account exists.
  - Given a distributed attempt pattern, when requests originate from multiple clients, then per-account protection remains effective.
- Basis: external research; NIST SP 800-63B-4 rate limiting; OWASP Authentication Cheat Sheet.
- Open dependency: numeric thresholds, progressive delay, and any temporary lockout duration require a risk and usability decision. Avoid permanent lockout that enables denial of service.

#### Requirement ZD-AUTH-008 — Avoid account enumeration

The system MUST NOT reveal through authentication, registration or recovery responses whether an arbitrary account identifier exists, except where disclosure is necessary after the requester has established sufficient authority to access that account.

- Priority: P1
- Facets: identity-authentication, interface, api, security-controls, errors-recovery
- Acceptance:
  - Given an identifier that exists and one that does not, when equivalent unauthenticated sign-in or recovery requests are submitted, then externally observable responses do not disclose account existence through message content or materially distinguishable response behaviour.
- Basis: external research; OWASP Authentication and Forgot Password Cheat Sheets.

### Session and authenticated-state lifecycle

#### Requirement ZD-AUTH-009 — Issue protected authenticated sessions

When credential verification succeeds, the system MUST establish an authenticated session bound to the verified principal using an unguessable session credential and a trusted server-side session state or equivalent revocable server-controlled mechanism.

- Priority: P0
- Facets: identity-authentication, security-controls, api, persistence
- Acceptance:
  - Given successful authentication, when the client accesses a protected operation with the issued session credential, then the server resolves it to the authenticated principal.
  - Given a random or fabricated session credential, when presented, then it does not resolve to an authenticated principal.
- Basis: external research; OWASP Session Management Cheat Sheet.

#### Requirement ZD-AUTH-010 — Rotate session credentials at trust-boundary changes

The system MUST replace the active session credential when authentication is established and when a security-sensitive re-authentication or privilege transition requires a new session boundary, and MUST prevent the superseded credential from continuing to authorize the session.

- Priority: P0
- Facets: identity-authentication, security-controls, api, errors-recovery
- Acceptance:
  - Given an unauthenticated session, when authentication succeeds, then the prior unauthenticated session credential cannot be used as the authenticated session.
  - Given a session is rotated, when the superseded credential is replayed, then it is rejected.
- Basis: external research; OWASP Authentication and Session Management Cheat Sheets; bounded SESSION-EXPRESS-001 evidence.

#### Requirement ZD-AUTH-011 — Enforce session expiry

The system MUST enforce both an inactivity-based expiry policy and an absolute maximum session lifetime, and MUST reject an expired session even if the client continues presenting its former credential.

- Priority: P0
- Facets: identity-authentication, security-controls, configuration, errors-recovery
- Acceptance:
  - Given a session exceeds its configured inactivity limit, when its credential is presented, then protected access is denied.
  - Given a session exceeds its configured absolute lifetime despite continued activity, when its credential is presented, then protected access is denied.
  - Given an authenticated session has had no qualifying activity for 7 days, when its credential is presented, then protected access is denied.
  - Given an authenticated session reaches 30 days from establishment, when its credential is presented, then protected access is denied even if it has remained active.
- Basis: external research; OWASP Session Management Cheat Sheet; NIST SP 800-63B-4 session management.
- Owner-approved duration policy: inactivity expiry is 7 days; absolute session lifetime is 30 days. The system must enforce both limits server-side. Exact renewal cadence and remembered-device behaviour remain unresolved and must be specified before release.

#### Requirement ZD-AUTH-012 — Revoke sessions

The system MUST provide a trusted mechanism to revoke an individual session and all sessions associated with an account, and MUST ensure revoked credentials cannot authorize subsequent protected requests.

- Priority: P0
- Facets: identity-authentication, security-controls, api, persistence, errors-recovery
- Acceptance:
  - Given a session is revoked, when its credential is replayed, then the request is denied.
  - Given all sessions for an account are revoked, when any previously issued session credential for that account is replayed, then each is denied.
  - Given an account holder selects logout all devices, when the operation completes, then every active session for that account is revoked.
  - Given the launch account interface is inspected, when session-management capabilities are reviewed, then current-session logout and logout-all-devices are available but a detailed device/session list is not required.
- Basis: external research; OWASP Session Management Cheat Sheet.
- Owner-approved launch policy: provide current-session logout and a logout-all-devices action. Do not include a detailed device/session-management screen at launch. The service must still support individual-session revocation so a management screen can be added later.

#### Requirement ZD-AUTH-013 — End the current session on logout

When a user logs out, the system MUST invalidate the current session at the trusted service boundary and clear or discard the corresponding client-held session credential.

- Priority: P0
- Facets: identity-authentication, security-controls, api, errors-recovery
- Acceptance:
  - Given an authenticated session, when logout completes, then replaying its former credential does not authorize a protected request.
  - Given logout is repeated or the session has already expired, when the request is processed, then the operation completes safely without restoring the session.
- Basis: external research; bounded SESSION-EXPRESS-001 evidence.

#### Requirement ZD-AUTH-014 — Protect web session credentials

When web authentication uses browser-managed sessions, the system MUST transmit session credentials only over secure transport, MUST prevent access to session cookies from ordinary client scripts, MUST apply an explicit cross-site cookie policy, and MUST protect state-changing requests against cross-site request forgery.

- Priority: P0
- Facets: identity-authentication, security-controls, api, configuration
- Acceptance:
  - Given a production web session, when its cookie attributes are inspected, then secure transport and script-access restrictions are applied and the cross-site policy is explicit.
  - Given a cross-site forged state-changing request without the required anti-CSRF proof, when it reaches the service, then it is rejected.
- Basis: external research; OWASP Session Management Cheat Sheet and ASVS.
- Constraint: cookie attributes and CSRF mechanism must be selected to fit the eventual web architecture; this contract does not prescribe a framework.

#### Requirement ZD-AUTH-015 — Protect Android-held session credentials

When Android must retain a session credential between requests, the application MUST store it using platform-appropriate protected storage, MUST NOT store it in ordinary shared preferences or unprotected application files, and MUST NOT expose it through logs, backups or exported interfaces.

- Priority: P0
- Facets: identity-authentication, security-controls, data, persistence
- Acceptance:
  - Given an Android user has authenticated, when the app persists the credential, then it is stored using a protected mechanism appropriate to the supported Android versions.
  - Given ordinary application data or logs are inspected, when the credential is at rest or after an error, then the raw credential is not exposed there.
  - Given protected storage becomes unavailable or its key is invalidated, when the app attempts to use the credential, then it fails closed and requires a safe re-authentication or recovery path.
- Basis: platform contract; Android Security Tips and Android Keystore documentation.
- Constraint: Android Keystore protects key material and does not automatically make every token-storage design secure. The concrete design and supported-device behaviour require engineering validation.

### Authorization boundary and cross-platform consistency

#### Requirement ZD-AUTH-016 — Enforce authorization independently of client identity state

For every protected operation, the trusted service MUST determine the principal and evaluate the principal's current authorization from trusted state; it MUST NOT accept client-supplied role, permission, Pro status or activation status as authoritative.

- Priority: P0
- Facets: authorization-permissions, identity-authentication, api, security-controls, business-rules
- Acceptance:
  - Given a client alters a local role, Pro flag or activation flag, when it requests a protected operation, then the trusted service applies the server-side state and denies any unauthorized action.
  - Given a user's entitlement or permission is revoked, when an existing session requests a protected operation, then the latest applicable authorization state is enforced within the documented propagation bound.
- Basis: owner direction for first-party backend and MVP-03 gates; PM inference.
- Dependency: entitlement and activation policy will be fully specified in later cross-cutting and link-check contracts.

#### Requirement ZD-AUTH-017 — Preserve one account identity across web and Android

When the same account is authenticated on web and Android, the system MUST resolve both sessions to the same account principal and apply the same account-level authorization and entitlement state, while allowing platform-specific session credentials and security controls.

- Priority: P1
- Facets: identity-authentication, authorization-permissions, api, data
- Acceptance:
  - Given one account authenticates on both platforms, when each session accesses account-scoped resources, then both resolve to the same principal.
  - Given account-level authorization or entitlement changes, when either platform next performs a protected operation, then the same current policy is applied.
- Basis: owner decision: web and Android are the same product identity, though capabilities may differ.

#### Requirement ZD-AUTH-018 — Handle authentication dependency failures safely

When a required authentication, session or account-state dependency is unavailable or returns an invalid response, the system MUST fail closed for protected operations, MUST NOT create an authenticated session from an unverified result, and MUST provide a recoverable error outcome without exposing secrets or internal security details.

- Priority: P0
- Facets: identity-authentication, api, integrations, errors-recovery, security-controls
- Acceptance:
  - Given the trusted authentication state cannot be verified, when a protected request is processed, then access is denied rather than granted from stale client state.
  - Given an authentication dependency fails, when the user receives the result, then it explains that authentication is temporarily unavailable and does not expose tokens, credentials or internal stack details.
- Basis: PM inference; owner direction to own backend; NIST and OWASP security guidance.

#### Requirement ZD-AUTH-019 — Avoid unnecessary credential exposure

The system MUST request only the credential information required for the current authentication or recovery action, MUST NOT place secrets in URLs, and MUST NOT expose passwords, one-time codes, session credentials or recovery secrets in logs, analytics, crash reports or user-visible error details.

- Priority: P0
- Facets: identity-authentication, security-controls, api, data
- Acceptance:
  - Given authentication and recovery flows are exercised with instrumented logs, when records are inspected, then credential and session secrets are absent.
  - Given a secret-bearing request is generated, when its URL and diagnostic output are inspected, then the secret is not included.
- Basis: external research; Android Security Tips and OWASP guidance.

#### Requirement ZD-AUTH-020 — Provide a secure verified-email recovery path

The system MUST provide a documented recovery process for users who lose access to a supported authenticator. At launch, it MUST deliver a single-use, time-limited recovery link or challenge to the account's verified email address and MUST verify recovery authority before changing authenticators or restoring account access. The system MUST NOT use security questions as a recovery factor.

- Priority: P0
- Facets: identity-authentication, security-controls, api, errors-recovery, data
- Acceptance:
  - Given a valid recovery challenge delivered to the account's verified email address, when it is successfully used, then it cannot be used again.
  - Given an account has no verified email address, when recovery is requested, then the unverified address is not used as the recovery channel.
  - Given an expired, invalid, already-used or altered recovery challenge, when submitted, then no authenticator or account security state is changed.
  - Given a recovery attempt for an identifier, when the requester is unauthenticated, then the response does not reveal whether the account exists.
- Basis: external research; OWASP Forgot Password Cheat Sheet.
- Owner decision: verified email is the recovery channel at launch. Exact challenge expiry/resend limits and operational notification details remain unresolved.

#### Requirement ZD-AUTH-021 — Invalidate sessions after credential recovery or replacement

When an authenticator is reset, replaced, or confirmed compromised through an authorized security process, the system MUST revoke all existing sessions after successful account recovery, MUST notify the account owner of successful recovery, and MUST require fresh authentication before protected access resumes.

- Priority: P0
- Facets: identity-authentication, security-controls, errors-recovery, persistence, messaging
- Acceptance:
  - Given account recovery succeeds, when the recovery operation completes, then all existing sessions for that account are revoked and a security notification is sent to the account owner.
  - Given a password or authenticator is reset outside account recovery, when the reset completes, then sessions selected by the documented revocation policy no longer authorize protected operations.
  - Given a former session is replayed after required revocation, then access is denied.
- Basis: external research; OWASP Authentication and Forgot Password Cheat Sheets.



### Sensitive account actions and account deletion

#### Requirement ZD-AUTH-025 — Require fresh authentication for sensitive account-security changes

The system MUST require fresh authentication before a user changes their password or passkey, changes the verified recovery email address, or confirms account deletion. It MUST NOT require repeated fresh authentication for ordinary account use.

- Priority: P0
- Facets: identity-authentication, security-controls, authorization-permissions, errors-recovery
- Rationale: sensitive changes can transfer control of an account or permanently remove it; a recent proof of account control reduces the impact of a stolen or unattended session.
- Acceptance:
  - Given an authenticated session, when the user attempts to change the password or a passkey, then fresh authentication is required before the change is accepted.
  - Given an authenticated session, when the user attempts to change the verified recovery email address, then fresh authentication is required before the change is accepted.
  - Given an authenticated session, when the user confirms account deletion, then fresh authentication is required before deletion proceeds.
  - Given an authenticated session, when the user performs ordinary account actions that are not designated sensitive, then the system does not repeatedly require fresh authentication solely because the session is active.
- Basis: owner decision; PM recommendation accepted by the owner.
- Decision reference: ZD-DEC-AUTH-2026-11-28.

#### Requirement ZD-AUTH-026 — Support user-initiated account deletion with documented retention

The system MUST provide a user-initiated account deletion process that immediately revokes the account's active sessions and disables further account access. It MUST delete personal data according to a documented retention schedule and MUST retain only records for which a legitimate requirement exists, with the reason and retention period documented.

- Priority: P0
- Facets: interface, behavior, data, persistence, errors-recovery
- Rationale: account holders need a clear way to end their relationship with the product, while retained records must be limited, justified and time-bounded.
- Acceptance:
  - Given an authenticated account holder who completes the required fresh authentication, when account deletion is confirmed, then all active sessions are revoked and account access is disabled immediately.
  - Given account deletion has been confirmed, when the documented deletion schedule is applied, then personal data is deleted according to that schedule.
  - Given a record must be retained for a legitimate requirement, when deletion is processed, then the record, retention reason and retention period are documented and access is restricted to the justified purpose.
- Basis: owner decision; PM recommendation accepted by the owner.
- Decision reference: ZD-DEC-AUTH-2026-11-28.
- Open dependency: exact retention schedules, lawful retention categories and launch-market obligations must be established before release.



#### Requirement ZD-AUTH-027 — Support email-and-password sign-in at launch

At launch, the system MUST allow a user to create and access a ZeroDeck account using an email address and password, with the email address as the primary sign-in identifier. The launch sign-in journey MUST NOT require a phone number or a social-login account.

- Priority: P0
- Facets: identity-authentication, interface, api, behavior
- Rationale: the owner selected a direct email-and-password launch path and did not make phone or social sign-in prerequisites.
- Acceptance:
  - Given a person does not yet have a ZeroDeck account, when they register with a valid email address and password, then an account is created with a stable account principal.
  - Given an account has been created with an email address and password, when the user submits valid credentials, then the system authenticates the corresponding account.
  - Given a person is completing the launch registration or sign-in journey, when the flow is used, then a phone number or social-login account is not required to complete it.
- Basis: owner decision; PM recommendation accepted by the owner.
- Decision reference: ZD-DEC-AUTH-2026-11-28.

#### Requirement ZD-AUTH-028 — Apply the approved email-verification boundaries

The system MUST allow account creation while the email address is explicitly unverified. It MUST verify the email address before relying on it for account recovery or security notifications, and before any feature or action whose documented policy requires a verified email. A change to the account's primary email address MUST complete the documented verification process before the new address becomes the verified primary address.

- Priority: P0
- Facets: identity-authentication, interface, api, security-controls, errors-recovery
- Rationale: allowing initial account creation without verification reduces onboarding friction while preventing an unverified address from being treated as a trusted recovery or security channel.
- Acceptance:
  - Given a person registers with a valid email address and password, when account creation completes before email verification, then the account is explicitly marked as having an unverified email address.
  - Given an account's email address is unverified, when recovery or a security notification must be sent, then the system does not rely on that unverified address as the trusted channel.
  - Given a feature or action has a documented verified-email precondition, when an account with an unverified email attempts it, then the precondition is not satisfied.
  - Given an account holder changes the primary email address, when the new address has not completed verification, then it is not treated as the verified primary address.
- Basis: owner decision; PM recommendation accepted by the owner.
- Decision reference: ZD-DEC-AUTH-2026-11-28.

## 4. Owner decisions and remaining open questions

The owner explicitly accepted the Product Management Agent's eight recommendations on 2026-11-28. The decisions are recorded in the [owner decision record](../2026-11-28/17-AUTHENTICATION-OWNER-DECISIONS.md). This approval resolves these eight questions only; it does not approve every PM-proposed requirement or the separate Phase 3 proposals.

| ID | Owner-approved decision | Recorded outcome |
|---|---|---|
| ZD-Q-AUTH-001 | Sign-in identifier and method | Launch with email + password. Email is the primary sign-in identifier. Phone and social sign-in are not required at launch. The stable account principal remains separate from the email address and password. Email changes require a verified process; passkeys may be added later. |
| ZD-Q-AUTH-002 | Contact verification | Account creation may complete in an explicitly unverified state. Verify email before using it for recovery or security notifications, and before any feature/action whose policy explicitly requires a verified email. No additional feature gate is inferred. |
| ZD-Q-AUTH-003 | MFA/passkeys | MFA is optional, not mandatory, at launch. Passkeys are a later enhancement and are not a launch dependency. |
| ZD-Q-AUTH-004 | Recovery | Use the verified email address for a single-use, time-limited recovery link or challenge. Expired or consumed challenges fail. Successful recovery revokes existing sessions and notifies the account owner. Security questions are not used. |
| ZD-Q-AUTH-005 | Session policy | Enforce a 7-day inactivity limit and a 30-day absolute maximum session lifetime. Rotate session/renewal credentials securely. Allow concurrent sessions across devices. Logout immediately revokes the current session. |
| ZD-Q-AUTH-006 | Session management | At launch provide current-session logout and logout-all-devices. Defer a detailed device/session-management screen. The service must support individual-session revocation for later use. |
| ZD-Q-AUTH-007 | Account deletion and retention | Provide user-initiated account deletion, immediate session revocation and account-access disablement. Delete personal data on a documented schedule; retain only records with a legitimate requirement, documenting the reason and period. Exact schedules and legal exceptions remain open. |
| ZD-Q-AUTH-008 | Assurance and step-up | Use risk-based assurance rather than imposing a complex formal assurance tier at launch. Require fresh authentication before password/passkey changes, recovery-email changes and account deletion. Do not require repeated authentication for ordinary use. |

### Remaining questions and operational values

These items were not resolved by the eight approved recommendations and remain open:

| ID | Open item | Required resolution |
|---|---|---|
| ZD-Q-AUTH-009 | Email canonicalization and verification operations | Document email normalization, verification challenge expiry/resend limits, and the exact notification policy. |
| ZD-Q-AUTH-010 | Authentication and recovery abuse thresholds | Set numeric rate limits, progressive delays and temporary restriction behaviour through risk/usability review. |
| ZD-Q-AUTH-011 | Session renewal details | Specify renewal cadence, rotation/replay handling and edge cases without exceeding the approved 7-day inactivity and 30-day absolute limits. |
| ZD-Q-AUTH-012 | Deletion/retention schedule and legal categories | Determine exact deletion timelines, legitimate retention categories, jurisdictional obligations and evidence of deletion before release. |
| ZD-Q-AUTH-013 | Authorization propagation bound | Specify how quickly entitlement, permission and owner-controlled activation changes must affect protected operations. |

The owner decisions do not select an authentication library, framework, token format, database schema or implementation architecture. The three Phase 3 candidate additions (ZD-AUTH-022–ZD-AUTH-024) and the Behaviour facet-reference amendment remain separate PM proposals and are not accepted by this decision.

## 6. Evidence and limitations

### External sources

- **NIST SP 800-63B-4 (final, 2025):** authenticator and verifier requirements, password rules (Section 3.1.1.2: 15-character single-factor minimum, 8-character minimum when used only as part of MFA, at least 64-character maximum-length recommendation, no composition rules, blocklist checks and no periodic changes absent compromise), rate limiting, authenticator lifecycle, recovery and session management. https://pages.nist.gov/800-63-4/sp800-63b.html
- **OWASP Authentication Cheat Sheet:** identifier handling, password controls, account-enumeration resistance, recovery and re-authentication. https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- **OWASP Password Storage Cheat Sheet:** safe password verifier storage and implementation guidance. https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- **OWASP Session Management Cheat Sheet:** session identifiers, rotation, expiry, revocation, cookie protections and client-side storage risks. https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- **OWASP Forgot Password Cheat Sheet:** recovery challenge generation, use, expiry and safe responses. https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- **Android Security Tips:** minimizing credential exposure, avoiding persistent passwords on device, short-lived tokens, secure communication and rate limiting. https://developer.android.com/privacy-and-security/security-tips
- **Android Keystore:** non-exportable key material and key-use authorization capabilities. https://developer.android.com/privacy-and-security/keystore

### Software Rules mapping context

The upstream `identity-authentication` facet is Draft and explicitly includes principal reference, authentication mechanism, credential type (never secret value), issuer/audience where relevant, session/token lifecycle metadata, challenges, outcomes, claims, expiry, refresh and revocation. It explicitly excludes authorization decisions after identity is established.

Existing bounded conformance cases:
- `JOSE-AUTH-001`: eleven HMAC JWT verification scenarios; does not cover a full identity provider, credential login, refresh, revocation or authorization.
- `SESSION-EXPRESS-001`: nine sequential Express MemoryStore session transitions; does not cover credential verification, distributed stores, expiry/rolling renewal, production secure-cookie deployment, CSRF or MFA.

These cases inform the test vocabulary only. They do not prove ZeroDeck behaviour or complete the upstream facet.

### Limitations

This is a product requirement proposal, not a security audit, legal opinion, architecture approval, or implementation verification. No ZeroDeck authentication implementation was tested. NIST is a government digital-identity standard and its assurance levels should be applied proportionately, not copied wholesale into this consumer product. OWASP material is security guidance, not a ZeroDeck owner decision. Platform guidance establishes Android capabilities and constraints, not a complete token-storage design.

## 7. Phase 2 and Phase 3 exit statement

Phase 2 and Phase 3 are complete. The eight owner decisions are recorded in Section 4 and the linked owner decision record. Remaining operational questions are explicit. Owner approval of those eight decisions does not imply blanket approval of the remaining PM-proposed requirements, Phase 3 candidate additions, or implementation conformance.

**Phase 2 status at authoring:** requirements drafted; awaiting structural, semantic and cross-reference validation before phase close.


## Phase 9 owner-approved policy and deferred details

- Email identifier policy: trim surrounding whitespace, compare the domain case-insensitively, preserve local-part semantics, and do not apply provider-specific alias rules globally. Challenge expiry/resend mechanics remain deferred.
- Authentication/recovery abuse controls use rate limits, progressive delays and temporary restrictions; permanent lockout is not the default. Numeric thresholds remain deferred to security testing.
- Session renewal credentials rotate securely and replay must not revive revoked sessions; the owner-approved 7-day inactivity and 30-day absolute limits remain controlling. Exact cadence is deferred.
- Successful recovery revokes existing sessions and notifies the account owner. Delivery failure, retry, acknowledgement and duplicate-notification mechanics remain deferred.
- Account deletion immediately revokes sessions and disables access; personal-data deletion follows a documented schedule and justified retention exceptions. Exact schedule and legal categories remain deferred.
- Gate revocation follows the shared Phase 9 invariant recorded in ZD-DEC-PHASE9-2026-11-28; propagation timing and implementation are deferred.

Detailed question dispositions: [Phase 9 owner decision register](../../2026-11-28/35-PHASE-9-OWNER-DECISION-REGISTER.md).
