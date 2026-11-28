# Requirement-to-Architecture Traceability

**Status:** Architecture planning baseline; not a product-contract amendment.  
**Change:** `core-product-architecture`  
**Canonical handoff:** `product-management/2026-11-28/40-ARCHITECTURE-HANDOFF.md`

## Authority rules

This matrix maps the five canonical contracts to architecture responsibilities and implementation work. It does **not** blanket-approve every requirement in those contracts.

1. The eight choices in `17-AUTHENTICATION-OWNER-DECISIONS.md`, the owner-decision register and explicit owner rules are owner-approved within their recorded scope.
2. The Phase 9 register identifies exactly which of the 64 carried questions were resolved at product-policy level (15) and which remain deferred (49).
3. Every contract's own requirement-status/evidence labels remain controlling. A PM-proposed requirement is not upgraded to owner-approved merely because it appears in a canonical contract.
4. Product-material requirements are adopted only to the extent Phase 9 records their adoption. Prior-art and platform/provider evidence can inform mechanisms but does not automatically become ZeroDeck policy.
5. Unknown, unavailable, unobserved or conflicting properties remain explicit unknowns until supported by evidence or owner decision.

## Contract mapping

| Contract requirement family | Architecture responsibility | Primary work groups | Verification evidence |
|---|---|---|---|
| Identity/authentication: `ZD-AUTH-001–021`, `ZD-AUTH-025–028` | Stable account principal; credential and verified-email boundaries; recovery; session lifecycle; cross-platform identity; authorization; sensitive actions and deletion | 3 | Auth contract tests; PostgreSQL integration tests; cross-client session/revocation tests; security tests |
| MVP-01: `ZD-FILE-001–028` | Explicit user selection; platform file permissions; local-only analysis; safe processing; lifecycle, cancellation, outcomes, provenance, privacy, limits and update trust | 4 | Web/Android file-access tests; fake-engine tests; engine evaluation/corpus report; resource and failure tests |
| MVP-02: `ZD-QUAR-001–038` | Eligibility; explicit confirmation; verified local artifact; source disposition; restore; deletion/retention; encryption/key lifecycle; backup boundary; lifecycle integrity and platform capability | 5 | Platform feasibility report; storage/key tests; integrity and interruption tests; restore/delete outcome tests |
| MVP-03: `ZD-WEB-001–041` | Pro and owner-activation gates; consent; URL input and safe boundary; provider adapter; result mapping; revocation; quotas, spend and privacy controls | 6 | Gate truth-table tests; fake-provider call-record tests; adversarial URL tests; consent and redaction tests; provider evaluation and cost evidence |
| Cross-cutting: `ZD-SYS-001–028` | Shared identity and platform policy; authoritative authorization; data purpose/minimization; secrets/configuration; failure/degradation; recovery; audit; resource bounds; dependency lifecycle; release provenance and compatibility | 2, 3, 7 | Architecture and dependency tests; PostgreSQL recovery tests; audit/redaction tests; CI/security/performance evidence |

The exact acceptance criterion text and per-requirement authority label remain in the source contracts. This table is a navigation and ownership map, not a replacement contract.

## Explicit owner-approved invariants carried into architecture

- MVP scope is exactly manual file security analysis, quarantine/file disposition, and website/link checking. IP address investigation is excluded.
- MVP-03 requires active Pro entitlement **and** owner-controlled activation. Both must be positively established before provider dispatch; false or unknown denies. Pro is not unlimited.
- One account identity spans Web and Android. Material platform capability differences are disclosed.
- Server-authoritative account, entitlement and activation state prevails over stale client state.
- Newly evaluated and queued/not-yet-dispatched protected work is denied after authoritative revocation. Already-dispatched work is cancelled where supported and must not initiate follow-on provider calls.
- MVP-01 is on-device/local by default. Cloud analysis is not in MVP; a future cloud capability requires separate owner approval and explicit consent.
- MVP-02 quarantine requires explicit user confirmation. Automatic quarantine is not enabled. Ask before attempting to remove the original. Do not promise secure/forensic erasure. Quarantine contents and keys are excluded from backend backup by default.
- MVP-03 accepts HTTP/HTTPS only, uses a provider lookup boundary rather than destination fetching/crawling, does not follow arbitrary destination redirects, requires disclosure/consent before provider disclosure, and does not persist raw URLs/results by default.
- Ordinary diagnostics exclude passwords, secrets, file contents and sensitive URL components.
- Account deletion disables access and revokes sessions immediately; personal data follows a documented schedule and retained records require a justified purpose, reason and period.

## Authentication decision trace

The following eight decisions are owner-approved; they do not approve unrelated PM-proposed authentication requirements:

| Decision | Architecture mapping |
|---|---|
| ZD-Q-AUTH-001 | Email/password at launch; account principal separate from email/password; verified email-change flow |
| ZD-Q-AUTH-002 | Permit unverified account creation; restrict recovery/security-notification use until verified and apply only explicitly approved feature gates |
| ZD-Q-AUTH-003 | MFA optional; passkeys deferred |
| ZD-Q-AUTH-004 | Verified-email, single-use, time-limited recovery; revoke sessions and notify after successful recovery |
| ZD-Q-AUTH-005 | Server-enforced 7-day inactivity and 30-day absolute expiry; secure rotation; concurrent sessions |
| ZD-Q-AUTH-006 | Current-session logout and logout-all at launch; service supports individual-session revocation |
| ZD-Q-AUTH-007 | User deletion; immediate session revocation/access disablement; documented deletion schedule and justified retention |
| ZD-Q-AUTH-008 | Fresh authentication before password/passkey changes, verified recovery-email changes and account deletion; no repeated challenge for ordinary use |

## Phase 9 question disposition index

**Resolved at product-policy level (15):**

- Quarantine: `ZD-Q-QUAR-001`, `004`, `007`, `009`.
- Website/link checking: `ZD-Q-WEB-001`, `002`, `004`, `006`, `013`, `014`, `017`, `018`.
- Cross-cutting: `ZD-Q-SYS-003`, `014`, `016`.

**Deferred (49):** see [open-decision-register.md](open-decision-register.md) for all IDs, next-stage owners and release gates.

## Out-of-scope and non-adopted material

- IP address tracking/investigation remains excluded from MVP.
- Do not add standalone account/admin portal, scan history, automatic/background protection, browser extension, device privacy audit, threat-indicator administration, help CMS or health/audit dashboard without separate owner approval.
- Authentication candidate additions ZD-AUTH-022–024 and the separate Behaviour facet-reference amendment are not approved by the eight authentication decisions.
- Requirements in `WEBSITE-LINK-CHECKING.md` marked PM-proposed are not blanket owner-approved. Only the exact Phase 9 adopted/resolved decisions and explicit owner rules may be treated as owner policy.
- No production malware engine, threat-intelligence source, URL provider, billing provider, email provider, cryptographic algorithm, framework, ORM, hosting topology or numeric resource threshold is selected by this matrix.

## Change control

If implementation reveals a conflict with an owner-approved product invariant, stop the affected work and return the conflict to the Product Owner. The Architect may revise technical mechanisms within the existing product boundary; it may not silently change product scope, user-visible policy, consent, data transfer, retention or access gates.
