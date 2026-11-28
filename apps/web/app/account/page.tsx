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

  async function signOut(path: '/api/sessions/current' | '/api/sessions/logout-all', method: 'DELETE' | 'POST') {
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
        {loading ? <p className="account-loading">Loading your session…</p> : null}
        {!loading && profile ? (
          <>
            <p className="account-email">{profile.email}</p>
            <span className={'account-state' + (profile.emailVerified ? '' : ' unverified')}>
              {profile.emailVerified ? 'EMAIL VERIFIED' : 'EMAIL NOT VERIFIED'}
            </span>
            <div className="account-actions">
              <button className="primary" type="button" disabled={busy} onClick={() => signOut('/api/sessions/current', 'DELETE')}>
                {busy ? 'Signing out…' : 'Sign out'}
              </button>
              <button type="button" disabled={busy} onClick={() => signOut('/api/sessions/logout-all', 'POST')}>
                Sign out all devices
              </button>
            </div>
          </>
        ) : null}
        {error ? <p className="form-message error" role="alert">{error}</p> : null}
        <p className="auth-footnote">
          Sessions expire after seven days of inactivity or thirty days from sign-in. The server
          enforces both limits.
        </p>
      </section>
    </main>
  );
}
