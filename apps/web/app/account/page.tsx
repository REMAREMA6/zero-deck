'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SessionProfile {
  accountId: string;
  sessionId: string;
  email: string;
  emailVerified: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showDeletionForm, setShowDeletionForm] = useState(false);
  const [deletionPassword, setDeletionPassword] = useState('');
  const [deletionConfirmation, setDeletionConfirmation] = useState('');
  const [deletionDueAt, setDeletionDueAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch('/api/session', { cache: 'no-store' });
        if (response.status === 401) {
          router.replace('/login');
          return;
        }
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          if (active) setError(data?.error?.message ?? 'Your session could not be loaded.');
          return;
        }
        if (active) setProfile(data as SessionProfile);
      } catch {
        if (active) setError('The account service could not be reached.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      active = false;
    };
  }, [router]);

  async function rotateSession() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch('/api/sessions/current/rotate', { method: 'POST' });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error?.message ?? 'The session credential could not be rotated.');
        if (response.status === 401) router.replace('/login');
        return;
      }
      setNotice('Session credential rotated. The previous credential can no longer be used.');
    } catch {
      setError('The session rotation request could not be completed.');
    } finally {
      setBusy(false);
    }
  }

  async function requestAccountDeletion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch('/api/account/deletion', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          currentPassword: deletionPassword,
          confirmation: deletionConfirmation,
        }),
      });
      const data = await response.json().catch(() => null);
      if (response.status !== 202) {
        setError(data?.error?.message ?? 'Account deletion could not be completed.');
        return;
      }
      setDeletionDueAt(data.deletionDueAt as string);
      setProfile(null);
      setDeletionPassword('');
      setDeletionConfirmation('');
      setShowDeletionForm(false);
      setNotice('Account access is disabled and sessions are revoked. Personal data has not yet been deleted; the scheduled deletion is pending.');
    } catch {
      setError('The account deletion request could not be completed.');
    } finally {
      setBusy(false);
    }
  }

  async function signOut(
    path: '/api/sessions/current' | '/api/sessions/logout-all',
    method: 'DELETE' | 'POST',
  ) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(path, { method });
      if (response.status === 204) {
        router.replace('/');
        router.refresh();
      } else {
        setError(
          response.status === 503
            ? 'Your local session was cleared, but server-side revocation could not be confirmed.'
            : 'Sign-out could not be completed.',
        );
      }
    } catch {
      setError('The sign-out request could not be completed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell auth-shell">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="ZeroDeck home">
          <span className="wordmark-mark">Z</span>
          <span>zerodeck</span>
        </Link>
        <span className="environment">ACCOUNT</span>
      </header>
      <section className="account-card" aria-labelledby="account-title">
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1 id="account-title">Account overview.</h1>
        {deletionDueAt ? (
          <p className="form-message success" role="status">
            Account access is disabled. Personal data is scheduled for deletion at{' '}
            {new Date(deletionDueAt).toLocaleString()}; it has not yet been deleted.
          </p>
        ) : null}
        {loading ? <p className="account-loading">Loading your session…</p> : null}
        {!loading && profile ? (
          <>
            <p className="account-email">{profile.email}</p>
            <span className={'account-state' + (profile.emailVerified ? '' : ' unverified')}>
              {profile.emailVerified ? 'EMAIL VERIFIED' : 'EMAIL NOT VERIFIED'}
            </span>
            <div className="account-actions">
              <button type="button" disabled={busy} onClick={rotateSession}>
                {busy ? 'Updating…' : 'Rotate session credential'}
              </button>
              <button
                className="primary"
                type="button"
                disabled={busy}
                onClick={() => signOut('/api/sessions/current', 'DELETE')}
              >
                {busy ? 'Signing out…' : 'Sign out'}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => signOut('/api/sessions/logout-all', 'POST')}
              >
                Sign out all devices
              </button>
              <button type="button" disabled={busy} onClick={() => setShowDeletionForm((open) => !open)}>
                Delete account
              </button>
            </div>
          </>
        ) : null}
        {showDeletionForm && profile && !deletionDueAt ? (
          <form className="auth-form deletion-form" onSubmit={requestAccountDeletion}>
            <h2>Close your ZeroDeck account</h2>
            <p>
              This immediately disables account access and revokes every session. Personal data is
              deleted later under the approved retention schedule. A deletion date is not available
              until that schedule is configured.
            </p>
            <label htmlFor="deletion-password">Current password</label>
            <input
              id="deletion-password"
              type="password"
              autoComplete="current-password"
              required
              value={deletionPassword}
              onChange={(event) => setDeletionPassword(event.target.value)}
            />
            <label htmlFor="deletion-confirmation">Type DELETE MY ACCOUNT to confirm</label>
            <input
              id="deletion-confirmation"
              type="text"
              autoComplete="off"
              required
              value={deletionConfirmation}
              onChange={(event) => setDeletionConfirmation(event.target.value)}
            />
            <button className="auth-submit deletion-submit" type="submit" disabled={busy}>
              {busy ? 'Submitting…' : 'Confirm account deletion'}
            </button>
            <button type="button" disabled={busy} onClick={() => setShowDeletionForm(false)}>
              Cancel
            </button>
          </form>
        ) : null}
        {error ? (
          <p className="form-message error" role="alert">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="form-message success" role="status">
            {notice}
          </p>
        ) : null}
        <p className="auth-footnote">
          Sessions expire after seven days of inactivity or thirty days from sign-in. The server
          enforces both limits.
        </p>
      </section>
    </main>
  );
}
