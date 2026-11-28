# Owner-approved account deletion and audit retention policy

**Decision date:** 2026-11-28  
**Authority:** Explicit approval from the ZeroDeck Product Owner in the project conversation.  
**Implementation scope:** Core account-deletion outcome, Task 3.8.

## Approved initial policy

1. A confirmed account-deletion request disables account access and revokes all sessions immediately.
2. Personal account data is scheduled for deletion **30 calendar days after the confirmed request**.
3. Retain only the minimal account-deletion security/audit record for **12 calendar months after personal-data deletion**.
4. The retained record must include its purpose, reason, request/deletion timestamps and explicit retention-until timestamp.
5. Expired deletion audit records are automatically purged by the scheduled worker.
6. The worker is scheduled to run daily at **02:00 UTC** through .github/workflows/account-deletion-scheduler.yml.

## Implementation safeguards

- The API uses the approved schedule when accepting account deletion.
- Account disablement and session revocation remain immediate and transactional.
- The API reports deletion as scheduled, not completed, until the due worker has actually deleted the account data.
- The deletion ledger contains no account reference after personal-data deletion.
- The worker uses PostgreSQL row locking with SKIP LOCKED so concurrent runs do not process the same scheduled deletion twice.
- The worker emits aggregate completion counts only; it does not print account identifiers or personal data.
- The workflow requires the repository Actions secret DATABASE_URL; it fails explicitly if the secret is missing.

## Production-readiness qualification

This is the Product Owner's approved initial product policy, not legal advice or a claim that 30 days/12 months satisfies every jurisdiction. Complete applicable-market legal review before production activation. Configure the repository Actions secret DATABASE_URL and verify a successful scheduled/manual run against the intended production database before relying on the scheduler operationally.

No additional retention categories or exceptions are created by this decision. Any legally required exception must be separately justified, documented and time-bounded.
