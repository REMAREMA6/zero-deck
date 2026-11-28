'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

type RegistrationState = 'idle' | 'submitting' | 'accepted';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<RegistrationState>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setState('submitting');

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json().catch(() => null);

      if (response.status === 202) {
        setState('accepted');
        setPassword('');
        return;
      }

      setState('idle');
      setError(payload?.error?.message ?? 'Account registration could not be completed.');
    } catch {
      setState('idle');
      setError('The account service could not be reached. Try again later.');
    }
  }

  return (
    <main className="shell auth-shell">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="ZeroDeck home">
          <span className="wordmark-mark">Z</span>
          <span>zerodeck</span>
        </Link>
        <Link className="topbar-action" href="/">
          Back to home
        </Link>
      </header>

      <section className="auth-card" aria-labelledby="register-title">
        <p className="eyebrow">ACCOUNT ACCESS</p>
        <h1 id="register-title">Create your account.</h1>
        <p className="auth-copy">
          One account for ZeroDeck on Web and Android. Your email remains unverified until the
          verification flow is enabled.
        </p>

        {state === 'accepted' ? (
          <div className="form-message success" role="status">
            Your request was accepted. New account creation remains disabled until the
            owner-approved password policy is configured.
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error ? (
              <p className="form-message error" role="alert">
                {error}
              </p>
            ) : null}
            <button className="auth-submit" type="submit" disabled={state === 'submitting'}>
              {state === 'submitting' ? 'Submitting…' : 'Create account'}
            </button>
          </form>
        )}

        <p className="auth-footnote">
          Registration stays disabled until the owner-approved password policy is configured.
        </p>
        <p className="auth-footnote">
          Already have an account?{' '}
          <Link className="auth-inline-link" href="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
