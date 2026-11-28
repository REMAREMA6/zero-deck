CREATE TABLE accounts (
  account_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  email_canonical text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  email_verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT accounts_email_canonical_unique UNIQUE (email_canonical)
);

CREATE TABLE account_credentials (
  account_id uuid PRIMARY KEY REFERENCES accounts (account_id) ON DELETE CASCADE,
  password_hash text NOT NULL,
  password_changed_at timestamptz NOT NULL DEFAULT now()
);
