import { useState } from 'react';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function AppleSvg() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GoogleSvg() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.8-2.1-6.8-5H1.2v3.1C3.2 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.2 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V6.7H1.2C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.7l4 3.1c1-2.9 3.6-5 6.8-5z" />
    </svg>
  );
}

function friendlyError(err) {
  const code = err?.code || '';
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Incorrect email or password. Please use the same credentials as your LinkUp app account.';
  }
  if (code === 'auth/popup-closed-by-user') return 'Sign-in window was closed before completing.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Please try again in a few minutes.';
  return err?.message || 'Sign-in failed. Please try again.';
}

export default function AuthModalContent({ onSuccess }) {
  const { signInWithEmail, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const handleOAuth = async (provider, fn) => {
    setError('');
    setBusy(provider);
    try {
      await fn();
      onSuccess?.();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy('');
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setBusy('email');
    try {
      await signInWithEmail(email, password);
      onSuccess?.();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy('');
    }
  };

  return (
    <div>
      <p className="mb-5 text-sm text-linkup-muted">
        Sign in with the same account you use in the LinkUp app to view your balance and top up tokens with +10% web bonus.
      </p>

      <div className="space-y-2.5">
        <button
          type="button"
          disabled={Boolean(busy)}
          onClick={() => handleOAuth('apple', signInWithApple)}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-3 font-display text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
        >
          {busy === 'apple' ? <Loader2 size={18} className="animate-spin" /> : <AppleSvg />}
          Continue with Apple
        </button>

        <button
          type="button"
          disabled={Boolean(busy)}
          onClick={() => handleOAuth('google', signInWithGoogle)}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-linkup-surface-light px-4 py-3 font-display text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          {busy === 'google' ? <Loader2 size={18} className="animate-spin" /> : <GoogleSvg />}
          Continue with Google
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-linkup-muted">
        <span className="h-px flex-1 bg-white/10" />
        <span>or sign in with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleEmail} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-white/75">Email</span>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-linkup-bg px-3.5 py-2.5 focus-within:border-linkup-purple">
            <Mail size={16} className="text-linkup-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full bg-transparent text-sm text-white placeholder:text-linkup-muted focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-white/75">Password</span>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-linkup-bg px-3.5 py-2.5 focus-within:border-linkup-purple">
            <Lock size={16} className="text-linkup-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-transparent text-sm text-white placeholder:text-linkup-muted focus:outline-none"
            />
          </div>
        </label>

        {error && (
          <p role="alert" className="rounded-xl border border-linkup-error/40 bg-linkup-error/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={Boolean(busy)} className="btn-primary mt-1 w-full py-3 text-sm disabled:opacity-60">
          {busy === 'email' ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-linkup-muted">
        New to LinkUp? Create your account inside the iOS or Android app first.
      </p>
    </div>
  );
}
