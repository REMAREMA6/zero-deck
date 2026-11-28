CREATE TABLE protected_work_items (
  work_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts (account_id) ON DELETE CASCADE,
  permission_key text NOT NULL,
  require_pro boolean NOT NULL DEFAULT false,
  feature_key text,
  status text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'dispatched', 'cancel_requested', 'cancelled', 'completed', 'failed')),
  cancellation_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  dispatched_at timestamptz,
  finished_at timestamptz
);

CREATE INDEX protected_work_items_active_account_idx
  ON protected_work_items (account_id, status)
  WHERE status IN ('queued', 'dispatched', 'cancel_requested');

CREATE OR REPLACE FUNCTION cancel_protected_work(
  target_account_id uuid,
  target_permission_key text,
  target_feature_key text,
  require_protected_entitlement boolean,
  reason text
) RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  affected record;
BEGIN
  FOR affected IN
    UPDATE protected_work_items
    SET status = CASE WHEN status = 'queued' THEN 'cancelled' ELSE 'cancel_requested' END,
        cancellation_reason = reason,
        finished_at = CASE WHEN status = 'queued' THEN now() ELSE finished_at END
    WHERE status IN ('queued', 'dispatched')
      AND (target_account_id IS NULL OR account_id = target_account_id)
      AND (target_permission_key IS NULL OR permission_key = target_permission_key)
      AND (target_feature_key IS NULL OR feature_key = target_feature_key)
      AND (NOT require_protected_entitlement OR require_pro = true)
    RETURNING work_id
  LOOP
    PERFORM pg_notify('zerodeck_protected_work', affected.work_id::text);
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION enforce_protected_work_revocation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_TABLE_NAME = 'accounts' THEN
    IF NEW.status <> 'active' THEN
      PERFORM cancel_protected_work(NEW.account_id, NULL, NULL, false, 'account_disabled');
    END IF;
  ELSIF TG_TABLE_NAME = 'account_permissions' THEN
    IF TG_OP = 'DELETE' THEN
      PERFORM cancel_protected_work(OLD.account_id, OLD.permission_key, NULL, false, 'permission_revoked');
    ELSIF NEW.granted IS DISTINCT FROM true OR NEW.state_status IS DISTINCT FROM 'fresh' THEN
      PERFORM cancel_protected_work(NEW.account_id, NEW.permission_key, NULL, false, 'permission_revoked');
    END IF;
  ELSIF TG_TABLE_NAME = 'account_entitlements' THEN
    IF TG_OP = 'DELETE' THEN
      PERFORM cancel_protected_work(OLD.account_id, NULL, NULL, true, 'entitlement_revoked');
    ELSIF NEW.pro_active IS DISTINCT FROM true OR NEW.state_status IS DISTINCT FROM 'fresh' THEN
      PERFORM cancel_protected_work(NEW.account_id, NULL, NULL, true, 'entitlement_revoked');
    END IF;
  ELSIF TG_TABLE_NAME = 'system_feature_controls' THEN
    IF TG_OP = 'DELETE' THEN
      PERFORM cancel_protected_work(NULL, NULL, OLD.feature_key, false, 'owner_activation_revoked');
    ELSIF NEW.enabled IS DISTINCT FROM true OR NEW.state_status IS DISTINCT FROM 'fresh' THEN
      PERFORM cancel_protected_work(NULL, NULL, NEW.feature_key, false, 'owner_activation_revoked');
    END IF;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER accounts_revoke_protected_work
AFTER UPDATE OF status ON accounts
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION enforce_protected_work_revocation();

CREATE TRIGGER permissions_revoke_protected_work
AFTER INSERT OR UPDATE OR DELETE ON account_permissions
FOR EACH ROW
EXECUTE FUNCTION enforce_protected_work_revocation();

CREATE TRIGGER entitlements_revoke_protected_work
AFTER INSERT OR UPDATE OR DELETE ON account_entitlements
FOR EACH ROW
EXECUTE FUNCTION enforce_protected_work_revocation();

CREATE TRIGGER feature_controls_revoke_protected_work
AFTER INSERT OR UPDATE OR DELETE ON system_feature_controls
FOR EACH ROW
EXECUTE FUNCTION enforce_protected_work_revocation();
