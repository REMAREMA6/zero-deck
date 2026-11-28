export type SecurityNotificationKind =
  | 'password_changed'
  | 'primary_email_changed'
  | 'account_recovery_completed';

export interface VerifiedEmailLookup {
  getVerifiedEmail(accountId: string): Promise<string | null>;
}

export interface SecurityNotificationDelivery {
  sendSecurityNotification(
    email: string,
    notification: SecurityNotificationKind,
  ): Promise<void>;
}

export function createVerifiedEmailSecurityNotifier(
  lookup: VerifiedEmailLookup,
  delivery: SecurityNotificationDelivery,
) {
  return {
    async notify(
      accountId: string,
      notification: SecurityNotificationKind,
    ): Promise<boolean> {
      const verifiedEmail = await lookup.getVerifiedEmail(accountId);
      if (!verifiedEmail) return false;
      await delivery.sendSecurityNotification(verifiedEmail, notification);
      return true;
    },
  };
}
