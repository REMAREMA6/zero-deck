'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error?.message ?? 'Sign-in could not be completed.');
        return;
      }

      setPassword('');
      router.replace('/account');
    } catch {
      setError('The account service could not be reached. Try again later.');
    } finally {
      setSubmitting(false);
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
      <section className="auth-card" aria-labelledby="login-title">
        <p className="eyebrow">ACCOUNT ACCESS</p>
        <h1 id="login-title">Welcome back.</h1>
        <p className="auth-copy">Sign in to your ZeroDeck account.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? (
            <p className="form-message error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-footnote">
          New to ZeroDeck?{' '}
          <Link className="auth-inline-link" href="/register">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
