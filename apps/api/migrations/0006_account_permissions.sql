CREATE TABLE account_permissions (
  account_id uuid NOT NULL REFERENCES accounts (account_id) ON DELETE CASCADE,
  permission_key text NOT NULL CHECK (permission_key ~ '^[a-z][a-z0-9]*(\.[a-z0-9]+|_[a-z0-9]+|-[a-z0-9]+)*$'),
  granted boolean NOT NULL,
  state_status text NOT NULL DEFAULT 'unknown' CHECK (state_status IN ('fresh', 'stale', 'unknown')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, permission_key)
);

ALTER TABLE account_entitlements
  ADD COLUMN state_status text NOT NULL DEFAULT 'unknown'
  CHECK (state_status IN ('fresh', 'stale', 'unknown'));

ALTER TABLE system_feature_controls
  ADD COLUMN state_status text NOT NULL DEFAULT 'unknown'
  CHECK (state_status IN ('fresh', 'stale', 'unknown'));

-- Freshness is an explicit server-owned state, not an invented age/TTL.
-- All existing and newly-created gate records default to unknown and deny.
-- No account, role, Pro entitlement or feature activation is seeded or inferred.