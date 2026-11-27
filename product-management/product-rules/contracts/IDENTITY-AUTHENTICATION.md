# ZeroDeck Identity and Authentication Product Requirements

**Contract ID:** `ZD-CONTRACT-AUTH`  
**Contract version:** `0.1.0-draft`  
**Capability:** `AUTH` — supporting account infrastructure  
**Author / issuer:** ZeroDeck Product Management Agent  
**Lifecycle:** Draft; all requirements are PM-proposed and none are owner-approved by this document  
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
- **Unresolved:** identifier and sign-in methods, verification channel, MFA/passkey policy, recovery method, session durations, account deletion policy, and exact assurance target.

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

When an account identifier is used as a unique sign-in or recovery identifier, the system MUST enforce uniqueness according to one documented canonicalization policy and MUST NOT create two accounts that resolve to the same canonical identifier.

- Priority: P0
- Facets: identity-authentication, data, persistence, errors-recovery
- Rationale: identifier ambiguity can route authentication or recovery to the wrong principal.
- Acceptance:
  - Given an existing account identifier, when another account attempts to claim an identifier that canonicalizes to the same value, then the second claim is rejected without changing the first account.
  - Given identifiers that differ only in forms the documented canonicalization treats as equivalent, when submitted, then the uniqueness check treats them consistently.
- Basis: PM inference.
- Open dependency: identifier type and canonicalization policy are not selected.

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

#### Requirement ZD-AUTH-006 — Apply safe password acceptance rules if passwords are supported

If password authentication is offered, the system MUST require a minimum of 15 characters for a password used as a single-factor authenticator and a minimum of 8 characters when the password is used only as part of multi-factor authentication; MUST permit passwords of at least 64 characters; MUST accept Unicode and whitespace; MUST NOT silently truncate passwords or impose other character-composition rules; MUST compare new or changed passwords against a blocklist of commonly used, expected or compromised passwords; and MUST NOT require periodic password changes unless there is evidence of compromise.

- Priority: P1
- Facets: identity-authentication, interface, security-controls, errors-recovery
- Acceptance:
  - Given password authentication is offered without MFA, when a password shorter than 15 characters is submitted, then it is rejected; when a password of at least 15 characters is submitted, it is eligible for further checks.
  - Given password authentication is offered only as one factor in MFA, when a password shorter than 8 characters is submitted, then it is rejected.
  - Given a password of at least 64 characters containing Unicode or whitespace, when submitted within the product's documented input limit, then it is accepted for evaluation and is not silently truncated.
  - Given a password on the blocklist, when submitted for creation or change, then it is rejected with an actionable reason.
  - Given no evidence of compromise, when the account remains in good standing, then the system does not force a periodic password change.
- Basis: external research; NIST SP 800-63B-4 and OWASP Authentication Cheat Sheet.
- Open dependency: the sign-in method is not yet selected. If passwords are not supported, this requirement is not applicable with a recorded rationale.

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
- Basis: external research; OWASP Session Management Cheat Sheet; NIST SP 800-63B-4 session management.
- Open dependency: actual durations, renewal rules and any remembered-device policy are unresolved and must be set before release.

#### Requirement ZD-AUTH-012 — Revoke sessions

The system MUST provide a trusted mechanism to revoke an individual session and all sessions associated with an account, and MUST ensure revoked credentials cannot authorize subsequent protected requests.

- Priority: P0
- Facets: identity-authentication, security-controls, api, persistence, errors-recovery
- Acceptance:
  - Given a session is revoked, when its credential is replayed, then the request is denied.
  - Given all sessions for an account are revoked, when any previously issued session credential for that account is replayed, then each is denied.
- Basis: external research; OWASP Session Management Cheat Sheet.
- Product decision required: whether users receive a session/device management interface in the MVP or whether account-wide revocation is initially exposed only through recovery/security events.

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

#### Requirement ZD-AUTH-020 — Provide a secure authenticator recovery path

The system MUST provide a documented recovery process for users who lose access to a supported authenticator, and MUST verify recovery authority using a one-time, time-bounded challenge or an equivalently secure recovery mechanism before changing authenticators or restoring account access.

- Priority: P0
- Facets: identity-authentication, security-controls, api, errors-recovery, data
- Acceptance:
  - Given a valid recovery challenge, when it is successfully used, then it cannot be used again.
  - Given an expired, invalid, already-used or altered recovery challenge, when submitted, then no authenticator or account security state is changed.
  - Given a recovery attempt for an identifier, when the requester is unauthenticated, then the response does not reveal whether the account exists.
- Basis: external research; OWASP Forgot Password Cheat Sheet.
- Open dependency: recovery channel and assurance method are unresolved. Do not assume email or SMS is approved.

#### Requirement ZD-AUTH-021 — Invalidate affected sessions after credential recovery or replacement

When an authenticator is reset, replaced, or confirmed compromised through an authorized security process, the system MUST revoke sessions that are no longer trusted and MUST require fresh authentication before protected access resumes.

- Priority: P0
- Facets: identity-authentication, security-controls, errors-recovery, persistence
- Acceptance:
  - Given a password or authenticator is reset, when the reset completes, then sessions selected by the documented revocation policy no longer authorize protected operations.
  - Given a former session is replayed after required revocation, then access is denied.
- Basis: external research; OWASP Authentication and Forgot Password Cheat Sheets.

## 4. Deliberately not specified in this contract

The following are not silently decided by this draft:

- Sign-in identifier: email, username, phone number, passkey or a combination.
- Whether passwords are offered, and whether passkeys or other authenticators are offered at launch.
- Email/phone ownership verification, its timing and channel.
- Mandatory or optional MFA and the required assurance level.
- Recovery channel, recovery delay, notification and identity-proofing requirements.
- Session idle and absolute durations, renewal policy, concurrent-session limits and user-facing session management.
- Account suspension, closure, deletion, data-retention and post-deletion handling.
- Whether step-up authentication is required for destructive or high-risk actions.
- Numeric throttling thresholds, anti-automation controls and alerting.
- Exact token/session representation, cryptographic algorithms, libraries, database tables and deployment topology.

These are tracked as open questions, not implicit permission to choose defaults during implementation.

## 5. PM recommendations for owner review

1. **Keep the account model minimal.** Use a stable internal principal and a separately changeable authenticator/identifier. Do not require legal identity proofing for an ordinary consumer security utility without a demonstrated need.
2. **Do not make social login/federation an MVP dependency.** It conflicts with the current first-party direction unless the owner later chooses otherwise.
3. **Choose the sign-in and recovery channel together.** An email-based account is not operationally complete until deliverability, ownership verification, recovery and abuse controls are designed. Do not assume SMS is preferable; it adds number lifecycle and SIM-swap considerations.
4. **Offer phishing-resistant authentication as a considered enhancement.** Evaluate passkeys and optional MFA against target-user usability, device coverage and recovery burden before deciding. This draft does not mandate them.
5. **Set session durations and revocation policy before release.** They are security policy decisions, not values to leave as hidden library defaults.
6. **Keep authorization and Pro checks server-side.** Authentication must not be conflated with entitlement or feature activation.

## 6. Open questions requiring owner decisions or later evidence

| ID | Question | PM recommendation | Why it remains open |
|---|---|---|---|
| ZD-Q-AUTH-001 | Which account identifier(s) and sign-in method should launch support? | Compare email/password and passkey-capable options; avoid phone-only identity as a default. | Affects onboarding, verification, recovery, support and platform coverage. |
| ZD-Q-AUTH-002 | Must users verify an email address or phone number, and before which account actions? | Require verification before relying on a contact point for recovery or security notifications; decide whether limited account creation can precede it. | No verified contact channel or provider has been selected. |
| ZD-Q-AUTH-003 | Is MFA/passkey support required at MVP launch, optional, or deferred? | Evaluate passkeys and optional additional factors; do not impose mandatory MFA without user-risk evidence. | Assurance target and recovery burden are not yet assessed. |
| ZD-Q-AUTH-004 | What recovery mechanism and channel are supported? | Prefer a recovery path resistant to account enumeration, replay and takeover; design it alongside sign-in. | Email/SMS/passkey recovery has different operational and threat implications. |
| ZD-Q-AUTH-005 | What idle and absolute session durations, renewal rules and concurrent-session policy apply? | Define explicit server-enforced limits and revocation semantics before release; choose durations through threat/usability review. | Numeric values require product risk and support decisions. |
| ZD-Q-AUTH-006 | Does MVP need user-visible device/session management and per-session revocation? | At minimum support account-wide revocation; assess a session list as a separate UI feature. | Could expand UI scope and support expectations. |
| ZD-Q-AUTH-007 | What account closure/deletion and retention behaviour is promised? | Specify with the broader data lifecycle and applicable launch-market obligations. | Cross-cutting system phase and launch jurisdiction are unresolved. |
| ZD-Q-AUTH-008 | What assurance level and step-up events are appropriate for ZeroDeck? | Start with a documented risk assessment; require stronger re-authentication for account-security changes and other high-impact actions where justified. | NIST AALs are a useful framework, not an automatic product mandate. |

## 7. Evidence and limitations

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

## 8. Phase 2 exit statement

Phase 2 is complete when this draft is committed with a matching declared-contract projection and retained evidence record, all requirements have observable acceptance criteria and explicit provenance, and unresolved product choices remain visible. Authentication coverage validation across the full relevant facet set is Phase 3; owner approval and implementation conformance are later activities.

**Phase 2 status at authoring:** requirements drafted; awaiting structural, semantic and cross-reference validation before phase close.
