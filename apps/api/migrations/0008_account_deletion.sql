CREATE TABLE account_deletion_requests (
  deletion_request_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid UNIQUE REFERENCES accounts (account_id) ON DELETE SET NULL,
  requested_at timestamptz NOT NULL DEFAULT now(),
  deletion_due_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'completed')),
  audit_retention_purpose text NOT NULL,
  audit_retention_reason text NOT NULL,
  audit_retain_until timestamptz NOT NULL,
  completed_at timestamptz,
  CONSTRAINT account_deletion_audit_retention_after_deletion
    CHECK (audit_retain_until > deletion_due_at),
  CONSTRAINT account_deletion_completion_consistency
    CHECK ((status = 'completed') = (completed_at IS NOT NULL))
);

CREATE INDEX account_deletion_due_idx
  ON account_deletion_requests (deletion_due_at)
  WHERE status = 'scheduled';

CREATE INDEX account_deletion_audit_expiry_idx
  ON account_deletion_requests (audit_retain_until)
  WHERE status = 'completed';
