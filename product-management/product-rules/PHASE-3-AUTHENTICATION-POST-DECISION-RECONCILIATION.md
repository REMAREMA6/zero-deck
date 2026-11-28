# Phase 3 Authentication Facet Assessment — Post-Decision Reconciliation

**Status:** Phase 8 reconciliation addendum  
**Original assessment:** PHASE-3-15-FACET-COVERAGE.md, authored before the eight authentication owner decisions  
**Authority:** Owner decision record ZD-DEC-AUTH-2026-11-28

## 1. Why this addendum exists

The original Phase 3 assessment correctly described the authentication contract at the time it was written. The owner later resolved the original eight authentication policy questions. The original assessment is retained as historical evidence; this addendum records the changed current state without rewriting that history.

## 2. Resolved questions

ZD-Q-AUTH-001 through ZD-Q-AUTH-008 are resolved by the owner decision record:
- email/password is the launch sign-in method; email is primary; phone/social sign-in are not required at launch;
- account creation may occur with an explicitly unverified email; verified email is required for recovery/security notifications and actions that explicitly require it;
- MFA is optional at launch; passkeys are deferred;
- recovery uses a single-use, time-limited verified-email challenge; successful recovery revokes existing sessions and notifies the account owner; no security questions;
- session expiry is 7 days inactivity and 30 days absolute; secure credential rotation; concurrent sessions permitted;
- current-session logout and logout-all-devices at launch; detailed session/device list deferred; backend individual-session revocation supported;
- user-initiated deletion, immediate session revocation/access disable, documented personal-data deletion schedule and justified retained records;
- risk-based assurance and fresh authentication before sensitive account-security changes/deletion, without repeated re-authentication for ordinary use.

Five operational questions remain open: ZD-Q-AUTH-009–013.

## 3. Messaging facet changed

The original Phase 3 assessment classified Messaging as not applicable/conditional because no asynchronous message channel or notification requirement had been selected.

The later owner decision now requires:
- verified email before the address is used for recovery or security notifications; and
- a security notification to the account owner after successful recovery.

Therefore Messaging is relevant to authentication notification delivery. The original Phase 3 classification is stale for the current policy state.

The current AUTH-021 acceptance criterion states that a security notification is sent, but:
- AUTH-021's normative requirement statement does not include the notification outcome;
- AUTH-021's facetRefs do not include the official Messaging facet;
- the contract does not define delivery failure, retry, acknowledgement, duplicate suppression or delivery-status behaviour.

These gaps are recorded in Phase 8 finding P8-F05. This addendum does not invent those policies or silently amend the canonical contract.

## 4. Behaviour facet mapping remains open

The original Phase 3 assessment identified a Behaviour facet-reference gap for AUTH-001–021 and recorded a metadata-only amendment proposal. That proposal remains unaccepted. Phase 8 confirms the gap; no facetRefs were changed in the canonical authentication contract.

## 5. Current assessment status

| Facet | Current post-decision status |
|---|---|
| Interface | Required, partial; exact screens, copy, accessibility and platform interaction remain elsewhere |
| Behaviour | Required, partial; facetRefs amendment remains unaccepted |
| Business rules | Required, partial; Pro/activation and entitlement policy remain in MVP-03/system contracts |
| Data | Required, partial; email canonicalization and data lifecycle remain open |
| Persistence | Required, partial; atomicity, recovery, deletion and retention remain open |
| API | Required, partial; concrete endpoint/error contracts remain architecture/feature work |
| Messaging | Relevant for verified-email recovery and security notification; delivery semantics incomplete |
| Identity and authentication | Required, partial; five operational questions remain open |
| Authorization and permissions | Required, partial; broader role/resource policy and propagation remain open |
| Security controls | Required, partial; no implementation effectiveness or audit is claimed |
| Background processing | Conditional; no worker/queue architecture is selected |
| Errors and recovery | Required, partial; recovery notification failure and atomicity remain incomplete |
| Integrations | Conditional/applicable to email delivery; provider/operational details remain unselected |
| Configuration | Required, partial; exact abuse and expiry thresholds remain open |
| Performance/resource behavior | Required, partial; numeric abuse and service limits remain open |

## 6. Boundary

This is a requirements/facet reconciliation only. It does not prove that email delivery exists, that notifications are delivered, that authentication is implemented, or that any security control is effective.
