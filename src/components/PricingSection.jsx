import { Fragment, useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { Check, CheckCircle2, CreditCard, Loader2, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { FEATURE_MATRIX, VIP_PRICES, VIPX_EXTRAS } from '../data/linkupData.js';
import { functions, isFirebaseConfigured } from '../lib/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { SectionHeader } from './ui.jsx';

const BILLING = [
  { id: 'monthly', label: 'Monthly', suffix: '/mo' },
  { id: 'yearly', label: 'Yearly', suffix: '/yr', badge: 'Save 17%' },
  { id: 'lifetime', label: 'Lifetime', suffix: ' once', badge: 'Best value' },
];

const fmtUsd = (n) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

function Cell({ value }) {
  if (value === true) return <Check size={18} className="mx-auto text-linkup-success" aria-label="Included" />;
  if (value === false) return <Minus size={18} className="mx-auto text-white/25" aria-label="Not included" />;
  return <span className="text-sm font-semibold">{value}</span>;
}

function BillingToggle({ value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-linkup-bg p-1">
      {BILLING.map((x) => (
        <button
          key={x.id}
          type="button"
          role="radio"
          aria-checked={value === x.id}
          onClick={() => onChange(x.id)}
          className={`rounded-lg py-1.5 text-xs font-semibold transition ${value === x.id ? 'bg-linkup-purple text-white' : 'text-linkup-muted hover:text-white'}`}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
}

function PlanCard({
  name, price, strikePrice, suffix, desc, features, cta, highlight, vipx, badge, busy, onCta, children,
}) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-[1.5px] ${vipx ? 'brand-gradient' : highlight ? 'bg-gradient-to-br from-linkup-orange to-linkup-gold' : 'bg-white/10'}`}
    >
      <div className="flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-linkup-surface p-7">
        {badge && (
          <span className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${vipx ? 'brand-gradient' : 'bg-gradient-to-r from-linkup-orange to-linkup-gold text-black'}`}>
            {badge}
          </span>
        )}
        <h3 className={`text-2xl font-extrabold ${vipx ? 'italic brand-text' : ''}`}>{name}</h3>
        <p className="mt-1 text-sm text-linkup-muted">{desc}</p>
        {children}
        <div className="mt-5 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-5xl font-extrabold">{price}</span>
          <span className="text-linkup-muted">{suffix}</span>
          {strikePrice && (
            <span className="ml-1 text-sm text-linkup-muted line-through">{strikePrice}</span>
          )}
        </div>
        {strikePrice && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-linkup-gold">
            <Sparkles size={12} /> 10% off when purchased on the website
          </p>
        )}
        <ul className="mt-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/85">
              <Check size={16} className={`mt-0.5 shrink-0 ${vipx ? 'text-linkup-magenta' : highlight ? 'text-linkup-orange' : 'text-linkup-muted'}`} />
              {f}
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={busy}
          onClick={onCta}
          className={`mt-7 w-full disabled:opacity-60 ${vipx || highlight ? 'btn-primary' : 'btn-ghost'}`}
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : cta}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection({ onDownload, onOpenAuth }) {
  const { user } = useAuth();
  const [vipBilling, setVipBilling] = useState('yearly');
  const [vipxBilling, setVipxBilling] = useState('yearly');
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  const [statusNotice, setStatusNotice] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('vip');
    if (status === 'success') {
      setStatusNotice({
        type: 'success',
        text: 'Subscription confirmed! Your VIP / VIP-X plan is activating on your LinkUp account now.',
      });
      window.history.replaceState(null, '', `${window.location.pathname}#pricing`);
    } else if (status === 'cancel') {
      setStatusNotice({ type: 'cancel', text: 'Checkout was canceled. No charge was made.' });
      window.history.replaceState(null, '', `${window.location.pathname}#pricing`);
    }
  }, []);

  const vipMeta = BILLING.find((x) => x.id === vipBilling);
  const vipxMeta = BILLING.find((x) => x.id === vipxBilling);
  const vipPrice = VIP_PRICES.vip[vipBilling];
  const vipxPrice = VIP_PRICES.vipX[vipxBilling];

  const handleSubscribe = async (productId) => {
    setError('');
    if (!user) {
      onOpenAuth?.();
      return;
    }
    if (!isFirebaseConfigured || !functions) {
      setError('Web checkout is finishing setup. Please try again shortly.');
      return;
    }
    setBusyId(productId);
    try {
      const createVipCheckout = httpsCallable(functions, 'createWebVipCheckout');
      const res = await createVipCheckout({ productId });
      const url = res?.data?.checkoutUrl;
      if (!url) throw new Error('Could not open Stripe Checkout.');
      window.location.href = url;
    } catch (err) {
      setError(err?.message || 'Could not start subscription checkout. Please try again.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <section id="pricing" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="VIP & pricing"
          title={<>Free to join. <span className="brand-text">10% off VIP on the web.</span></>}
          subtitle="Everyone can talk, connect, and share for free. Upgrade on the website for 10% off Monthly, Yearly, or Lifetime VIP & VIP-X plans."
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

        {error && (
          <div role="alert" className="mb-6 rounded-2xl border border-linkup-error/40 bg-linkup-error/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <PlanCard
            name="Free"
            price="$0"
            suffix=""
            desc="Everything you need to get started."
            features={[
              '5 AI translations a day',
              '2 hours of room time a day',
              '1 learning language',
              'Moments, Shorts & messages',
              'Earn diamonds at 10%',
            ]}
            cta="Download free"
            onCta={onDownload}
          />
          <PlanCard
            name="VIP"
            price={fmtUsd(vipPrice.web)}
            strikePrice={fmtUsd(vipPrice.inApp)}
            suffix={vipMeta.suffix}
            desc="For regulars and creators."
            highlight
            badge={vipMeta.badge ? `${vipMeta.badge} · 10% Off Web` : 'Best for creators · 10% Off'}
            features={[
              'Unlimited AI translation',
              'Unlimited room time & 5× room exposure',
              '3 learning languages',
              'See and hide profile visits',
              'Custom chat backgrounds & premium gifts',
              'Creator payouts (up to 60% diamond rate)',
              'Block Unknown Chat & ad-free',
            ]}
            cta={user ? `Get VIP (${fmtUsd(vipPrice.web)}${vipMeta.suffix})` : 'Sign in for 10% off VIP'}
            busy={busyId === vipPrice.webProductId}
            onCta={() => handleSubscribe(vipPrice.webProductId)}
          >
            <BillingToggle value={vipBilling} onChange={setVipBilling} label="VIP billing period" />
          </PlanCard>
          <PlanCard
            name="VIP-X"
            price={fmtUsd(vipxPrice.web)}
            strikePrice={fmtUsd(vipxPrice.inApp)}
            suffix={vipxMeta.suffix}
            desc="The full LinkUp experience."
            vipx
            badge={vipxMeta.badge ? `${vipxMeta.badge} · 10% Off Web` : 'Ultimate · 10% Off'}
            features={[
              'Everything in VIP',
              '10× room exposure',
              'Matchmaking',
              ...VIPX_EXTRAS,
            ]}
            cta={user ? `Get VIP-X (${fmtUsd(vipxPrice.web)}${vipxMeta.suffix})` : 'Sign in for 10% off VIP-X'}
            busy={busyId === vipxPrice.webProductId}
            onCta={() => handleSubscribe(vipxPrice.webProductId)}
          >
            <BillingToggle value={vipxBilling} onChange={setVipxBilling} label="VIP-X billing period" />
          </PlanCard>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-linkup-muted">
          <span className="inline-flex items-center gap-1.5">
            <CreditCard size={14} className="text-linkup-cyan" /> Accepts Debit Cards, Apple Pay, Google Pay, WeChat, Alipay &amp; Crypto
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-linkup-success" /> Syncs instantly to your LinkUp iOS &amp; Android account
          </span>
        </div>

        {/* Comparison table */}
        <div className="card mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="p-4 font-display text-lg">Compare plans</th>
                <th scope="col" className="w-32 p-4 text-center font-display">Free</th>
                <th scope="col" className="w-32 p-4 text-center font-display text-linkup-orange">VIP</th>
                <th scope="col" className="w-32 p-4 text-center font-display"><span className="brand-text italic">VIP-X</span></th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_MATRIX.map((row, i) => (
                <Fragment key={row.feature}>
                  <tr className={`border-b border-white/5 ${i % 2 ? 'bg-white/[0.015]' : ''}`}>
                    <th scope="row" className="p-4 text-sm font-medium text-white/85">{row.feature}</th>
                    <td className="p-4 text-center"><Cell value={row.free} /></td>
                    <td className="p-4 text-center"><Cell value={row.vip} /></td>
                    <td className="p-4 text-center"><Cell value={row.vipx} /></td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
