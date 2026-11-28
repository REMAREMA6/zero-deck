# Database migrations

Versioned SQL migrations are stored in this directory and applied in lexical order by the API migration runner.

- Migration names are immutable after application.
- The runner records a SHA-256 checksum and refuses to continue if an applied migration changes.
- Each migration is applied in its own transaction.
- Persistence tests use the PostgreSQL service in GitHub Actions.
- Schema rollback or forward-repair behaviour must be documented with each migration; destructive production rollback is not implied.

No product tables are created in the initial bootstrap slice. Account/session and capability tables are added alongside their domain implementation.

## Account deletion (0008)

Migration `0008_account_deletion.sql` adds a policy-gated deletion schedule. The account-deletion request retains only the account reference until scheduled deletion and an audit purpose, reason and explicit retention-until timestamp. The account reference is cleared when the account row is deleted; the audit row is purged when its declared retention period expires. No default deletion or audit-retention duration is supplied. The API must remain unavailable until an owner/legal-reviewed policy supplies those values.

The due-deletion executor is exposed as `pnpm --filter @zerodeck/api account-deletions:execute`. Invoke it from an owner-approved operational scheduler after a deletion policy has been configured. No scheduler cadence or retention duration is selected by this repository. The worker processes only requests whose recorded `deletion_due_at` has passed and purges each completion audit row only after its recorded `audit_retain_until` timestamp.
