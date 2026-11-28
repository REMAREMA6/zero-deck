CREATE TABLE account_permissions (
  account_id uuid NOT NULL REFERENCES accounts (account_id) ON DELETE CASCADE,
  permission_key text NOT NULL CHECK (permission_key ~ '^[a-z][a-z0-9]*(\.[a-z0-9]+|_[a-z0-9]+|-[a-z0-9]+)*$'),
  granted boolean NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, permission_key)
);

-- Permissions are explicit grants. No account, role, Pro entitlement or feature
-- activation is seeded or inferred by this migration.