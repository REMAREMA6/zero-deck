import { describe, expect, it, vi } from 'vitest';
import {
  createVerifiedEmailSecurityNotifier,
  type SecurityNotificationDelivery,
} from '../src/modules/identity/verified-email-notifications';

describe('verified-email security notification boundary', () => {
  it('does not send security notifications when the account email is unverified', async () => {
    const lookup = { getVerifiedEmail: vi.fn(async () => null) };
    const delivery: SecurityNotificationDelivery = {
      sendSecurityNotification: vi.fn(async () => undefined),
    };
    const notifier = createVerifiedEmailSecurityNotifier(lookup, delivery);

    await expect(notifier.notify('account-1', 'account_recovery_completed')).resolves.toBe(false);
    expect(lookup.getVerifiedEmail).toHaveBeenCalledWith('account-1');
    expect(delivery.sendSecurityNotification).not.toHaveBeenCalled();
  });

  it('sends only to the address returned by the verified-email lookup', async () => {
    const lookup = {
      getVerifiedEmail: vi.fn(async () => 'verified@example.test'),
    };
    const delivery: SecurityNotificationDelivery = {
      sendSecurityNotification: vi.fn(async () => undefined),
    };
    const notifier = createVerifiedEmailSecurityNotifier(lookup, delivery);

    await expect(notifier.notify('account-1', 'primary_email_changed')).resolves.toBe(true);
    expect(delivery.sendSecurityNotification).toHaveBeenCalledExactlyOnceWith(
      'verified@example.test',
      'primary_email_changed',
    );
  });

  it('propagates delivery failure without substituting an unverified address', async () => {
    const lookup = { getVerifiedEmail: vi.fn(async () => 'verified@example.test') };
    const delivery: SecurityNotificationDelivery = {
      sendSecurityNotification: vi.fn(async () => {
        throw new Error('delivery unavailable');
      }),
    };
    const notifier = createVerifiedEmailSecurityNotifier(lookup, delivery);

    await expect(notifier.notify('account-1', 'password_changed')).rejects.toThrow(
      'delivery unavailable',
    );
    expect(delivery.sendSecurityNotification).toHaveBeenCalledWith(
      'verified@example.test',
      'password_changed',
    );
  });
});
