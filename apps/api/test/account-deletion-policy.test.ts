import { describe, expect, it } from 'vitest';
import {
  ACCOUNT_DELETION_AUDIT_RETENTION_MONTHS,
  ACCOUNT_DELETION_GRACE_PERIOD_DAYS,
  createApprovedAccountDeletionPolicy,
} from '../src/modules/identity/account-deletion.js';

describe('approved account deletion policy', () => {
  it(
    'deletes personal data 30 days after request and retains minimal audit evidence for 12 calendar months after deletion',
    async () => {
      const requestedAt = new Date('2026-11-28T12:34:56.789Z');
      const schedule = await createApprovedAccountDeletionPolicy().resolveSchedule(
        'account-1',
        requestedAt,
      );

      expect(ACCOUNT_DELETION_GRACE_PERIOD_DAYS).toBe(30);
      expect(ACCOUNT_DELETION_AUDIT_RETENTION_MONTHS).toBe(12);
      expect(schedule.deletionDueAt.toISOString()).toBe('2026-12-28T12:34:56.789Z');
      expect(schedule.auditRetention.retainUntil.toISOString()).toBe('2027-12-28T12:34:56.789Z');
      expect(schedule.auditRetention.purpose).toContain('account-deletion');
      expect(schedule.auditRetention.reason).toContain('12 months');
    },
  );

  it('clamps month-end retention dates instead of overflowing into the following month', async () => {
    const requestedAt = new Date('2026-01-29T00:00:00.000Z');
    const schedule = await createApprovedAccountDeletionPolicy().resolveSchedule(
      'account-2',
      requestedAt,
    );

    expect(schedule.deletionDueAt.toISOString()).toBe('2026-02-28T00:00:00.000Z');
    expect(schedule.auditRetention.retainUntil.toISOString()).toBe('2027-02-28T00:00:00.000Z');
  });
});
