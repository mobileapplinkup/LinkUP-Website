import { useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { CheckCircle2, Coins, CreditCard, Loader2, LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { WEB_TOKEN_PACKAGES } from '../data/linkupData.js';
import { functions, isFirebaseConfigured } from '../lib/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { SectionHeader, fmt } from './ui.jsx';

export default function TokenStoreSection({ onOpenAuth }) {
  const { user, profile, tokens } = useAuth();
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  const [statusNotice, setStatusNotice] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('topup');
    if (status === 'success') {
      const added = Number(params.get('tokens')) || 0;
      setStatusNotice({
        type: 'success',
        text: added > 0
          ? `Payment received! ${fmt(added)} LINK tokens are being credited to your wallet.`
          : 'Payment received! Your LINK tokens are being credited to your wallet.',
      });
      window.history.replaceState(null, '', `${window.location.pathname}#topup`);
    } else if (status === 'cancel') {
      setStatusNotice({ type: 'cancel', text: 'Checkout was canceled. No charge was made.' });
      window.history.replaceState(null, '', `${window.location.pathname}#topup`);
    }
  }, []);

  const handleBuy = async (pack) => {
    setError('');
    if (!user) {
      onOpenAuth?.();
      return;
    }
    if (!isFirebaseConfigured || !functions) {
      setError('Web checkout is finishing setup. Please try again shortly.');
      return;
    }
    setBusyId(pack.id);
    try {
      const createCheckout = httpsCallable(functions, 'createWebTokenCheckout');
      const res = await createCheckout({ productId: pack.id, quantity: 1 });
      const url = res?.data?.checkoutUrl;
      if (!url) throw new Error('Could not open Stripe Checkout.');
      window.location.href = url;
    } catch (err) {
      setError(err?.message || 'Could not start checkout. Please try again.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <section id="topup" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Web token top-up"
          title={<>Get <span className="brand-text">+10% more tokens</span> on the web.</>}
          subtitle="Sign in with your LinkUp account and top up globally using Debit Cards, Apple Pay, Google Pay, WeChat, Alipay, or Crypto. Tokens credit directly to your app wallet."
        />

        {statusNotice && (
          <div
            role="status"
            className={`mb-6 flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm ${
              statusNotice.type === 'success'
                ? 'border-linkup-success/40 bg-linkup-success/10 text-green-200'
                : 'border-white/15 bg-white/5 text-white/80'
            }`}
          >
            {statusNotice.type === 'success' && <CheckCircle2 size={18} className="shrink-0 text-linkup-success" />}
            <span>{statusNotice.text}</span>
          </div>
        )}

        {/* Account / balance bar */}
        <div className="card mb-8 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          {user ? (
            <div className="flex items-center gap-3">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-linkup-purple" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linkup-purple font-display text-sm font-bold">
                  {(profile?.name || user.email || 'U').slice(0, 2).toUpperCase()}
                </span>
              )}
              <div>
                <p className="font-display text-base font-bold">
                  {profile?.name || user.displayName || user.email}
                  {profile?.username && <span className="ml-2 text-xs font-normal text-linkup-muted">@{profile.username}</span>}
                </p>
                <p className="text-xs text-linkup-muted">Tokens purchased here credit straight to this account in the LinkUp app.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linkup-purple/20 text-linkup-purple-light">
                <Coins size={22} />
              </span>
              <div>
                <p className="font-display text-base font-bold">Sign in to top up your LinkUp wallet</p>
                <p className="text-xs text-linkup-muted">Supports Apple, Google, and Email — the exact same login as the mobile app.</p>
              </div>
            </div>
          )}

          {user ? (
            <a
              href="#topup-packs"
              className="flex items-center gap-2.5 rounded-2xl border border-linkup-gold/30 bg-linkup-surface-light px-4 py-2.5 transition hover:border-linkup-gold/60 hover:bg-white/10"
            >
              <span className="text-xs text-linkup-muted">Your balance</span>
              <span className="font-display text-xl font-extrabold text-linkup-gold">🪙 {fmt(tokens)}</span>
              <span className="rounded-lg bg-linkup-gold px-2 py-0.5 text-[11px] font-bold text-black">+ Top Up</span>
            </a>
          ) : (
            <button onClick={onOpenAuth} className="btn-primary px-5 py-2.5 text-sm">
              <LogIn size={16} /> Sign In
            </button>
          )}
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-2xl border border-linkup-error/40 bg-linkup-error/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* 6 Web Token Packs (+10% bonus over in-app) */}
        <div id="topup-packs" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WEB_TOKEN_PACKAGES.map((p) => {
            const extra = p.tokens - p.inAppTokens;
            const isBusy = busyId === p.id;
            return (
              <div
                key={p.id}
                className="card relative flex flex-col justify-between p-6 transition hover:-translate-y-1 hover:border-linkup-gold/40"
              >
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-linkup-gold/15 px-2.5 py-1 text-[11px] font-bold text-linkup-gold">
                  <Sparkles size={11} /> +10% Web Bonus (+{fmt(extra)})
                </span>
                <div>
                  <p className="text-3xl">🪙</p>
                  <p className="mt-3 font-display text-3xl font-extrabold">{fmt(p.tokens)} <span className="text-base font-semibold text-linkup-muted">tokens</span></p>
                  <p className="mt-1 text-xs text-linkup-muted">In-app pack: {fmt(p.inAppTokens)} tokens</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="font-display text-2xl font-bold">${p.usd}</span>
                  <button
                    type="button"
                    disabled={Boolean(busyId)}
                    onClick={() => handleBuy(p)}
                    className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60"
                  >
                    {isBusy ? <Loader2 size={15} className="animate-spin" /> : user ? 'Buy Now' : 'Sign In to Buy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-linkup-muted">
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-linkup-cyan" /> Accepts Debit Cards, Apple Pay, Google Pay, WeChat, Alipay &amp; Crypto
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-linkup-success" /> Instant sync to your LinkUp app wallet
          </span>
        </div>
      </div>
    </section>
  );
}
