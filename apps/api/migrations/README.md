# Database migrations

Versioned SQL migrations are stored in this directory and applied in lexical order by the API migration runner.

- Migration names are immutable after application.
- The runner records a SHA-256 checksum and refuses to continue if an applied migration changes.
- Each migration is applied in its own transaction.
- Persistence tests use the PostgreSQL service in GitHub Actions.
- Schema rollback or forward-repair behaviour must be documented with each migration; destructive production rollback is not implied.

No product tables are created in the initial bootstrap slice. Account/session and capability tables are added alongside their domain implementation.
