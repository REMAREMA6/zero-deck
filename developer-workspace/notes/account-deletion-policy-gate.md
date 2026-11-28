# Task 3.8 — Account deletion policy gate and implementation evidence

**Architect outcome:** 3.8 — user-initiated account deletion with immediate access disablement and session revocation.  
**Product authority:** ZD-DEC-AUTH-2026-11-28, decision ZD-Q-AUTH-007.  
**Unresolved policy question:** ZD-Q-AUTH-012 — exact deletion schedule, legitimate retention categories and statutory exceptions remain open for architecture/legal review.  
**Status:** Partial; production activation is intentionally blocked pending policy approval and operational scheduling.

## Implemented

- `apps/api/migrations/0008_account_deletion.sql` creates a PostgreSQL deletion-request ledger. It records the scheduled deletion timestamp and requires a documented audit purpose, reason and retention-until timestamp.
- `apps/api/src/modules/identity/account-deletion.ts` requires an injected schedule policy. The request path uses the existing transaction-bound fresh-authentication guard, then disables the account, revokes all sessions and records the schedule in the same transaction. Account disablement also activates the existing protected-work revocation trigger.
- The due-deletion executor deletes only disabled accounts whose recorded due timestamp has passed. Account foreign-key cascades remove credentials, sessions and associated account data. The deletion ledger's account reference is cleared; its audit row remains until the recorded retention timestamp and is then purged.
- `apps/api/src/modules/identity/account-deletion-routes.ts` exposes `POST /v1/account/deletion`. It requires a valid session, current password and exact `DELETE MY ACCOUNT` confirmation. Its accepted response explicitly sets `personalDataDeleted: false`.
- `apps/api/src/modules/identity/account-deletion-worker.ts` and the API package script expose `pnpm --filter @zerodeck/api account-deletions:execute` for an owner-approved external scheduler. No scheduler cadence is selected.
- Web account settings and Android account settings both expose the confirmation flow. The Web BFF clears its HttpOnly session cookie only after a 202 accepted response; Android clears secure storage only after the server accepts the request.
- PostgreSQL integration tests cover missing-policy denial, wrong-password denial, confirmation enforcement, immediate account disablement/session revocation, no deletion before the due time, account/credential/session deletion after the due time, audit retention and audit expiry.

## Deliberate production gate

The exact schedule and retention categories were explicitly deferred by the Product Owner in ZD-Q-AUTH-012. No duration or legal category is selected in this implementation.

The production API currently does not inject an `AccountDeletionPolicy` into the service. Consequently, the route returns `503 ACCOUNT_DELETION_UNAVAILABLE` before changing account state. This is intentional fail-closed behaviour, not a claim that production account deletion is active.

To activate this capability later, the owner/legal-reviewed policy must provide:
1. The account personal-data deletion due-time rule.
2. The legitimate purpose and reason for retaining the deletion audit record.
3. The audit record's explicit retention-until rule.
4. An owner-approved operational scheduler for the due-deletion worker.

Do not configure example/test policy values in production. Do not claim personal data is deleted until the worker has executed successfully after the approved due time.

## Verification evidence

- Full GitHub Actions CI: [run 46183869945](https://github.com/REMAREMA6/zero-deck/actions/runs/46183869945) — formatting, typecheck, unit tests, PostgreSQL integration tests, API/Web/Android builds all passed.
- The integration suite uses real PostgreSQL in CI; no in-memory or SQLite persistence substitute is used.

## Remaining work

- Obtain the owner/legal disposition for ZD-Q-AUTH-012.
- Inject only the approved deletion policy into the production API.
- Configure and verify the owner-approved scheduler invoking `account-deletions:execute`.
- Add operational evidence for a due deletion and audit expiry in the approved runtime environment.
