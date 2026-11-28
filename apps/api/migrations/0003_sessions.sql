CREATE TABLE sessions (
  session_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts (account_id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL,
  absolute_expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  CONSTRAINT sessions_absolute_expiry_after_creation CHECK (absolute_expires_at > created_at)
);

CREATE INDEX sessions_account_revocation_idx
  ON sessions (account_id, revoked_at);
