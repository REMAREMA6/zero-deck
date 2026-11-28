CREATE TABLE account_entitlements (
  account_id uuid PRIMARY KEY REFERENCES accounts (account_id) ON DELETE CASCADE,
  pro_active boolean NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE system_feature_controls (
  feature_key text PRIMARY KEY,
  enabled boolean NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- No row means unknown/disabled. The application never seeds an enabled value.
