import { Fragment, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { FEATURE_MATRIX, VIP_PRICES, VIPX_EXTRAS } from '../data/linkupData.js';
import { SectionHeader } from './ui.jsx';

const BILLING = [
  { id: 'monthly', label: 'Monthly', suffix: '/mo' },
  { id: 'yearly', label: 'Yearly', suffix: '/yr', badge: 'Save 17%' },
  { id: 'lifetime', label: 'Lifetime', suffix: ' once', badge: 'Best value' },
];

function Cell({ value }) {
  if (value === true) return <Check size={18} className="mx-auto text-linkup-success" aria-label="Included" />;
  if (value === false) return <Minus size={18} className="mx-auto text-white/25" aria-label="Not included" />;
  return <span className="text-sm font-semibold">{value}</span>;
}

function PlanCard({ name, price, suffix, desc, features, cta, highlight, vipx, badge, onCta, children }) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-[1.5px] ${vipx ? 'brand-gradient' : highlight ? 'bg-gradient-to-br from-linkup-orange to-linkup-gold' : 'bg-white/10'}`}
    >
      <div className="flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-linkup-surface p-7">
        {badge && (
          <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold ${vipx ? 'brand-gradient' : 'bg-gradient-to-r from-linkup-orange to-linkup-gold text-black'}`}>
            {badge}
          </span>
        )}
        <h3 className={`text-2xl font-extrabold ${vipx ? 'italic brand-text' : ''}`}>{name}</h3>
        <p className="mt-1 text-sm text-linkup-muted">{desc}</p>
        {children}
        <p className="mt-5">
          <span className="font-display text-5xl font-extrabold">{price}</span>
          <span className="text-linkup-muted">{suffix}</span>
        </p>
        <ul className="mt-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/85">
              <Check size={16} className={`mt-0.5 shrink-0 ${vipx ? 'text-linkup-magenta' : highlight ? 'text-linkup-orange' : 'text-linkup-muted'}`} />
              {f}
            </li>
          ))}
        </ul>
        <button onClick={onCta} className={`mt-7 w-full ${vipx || highlight ? 'btn-primary' : 'btn-ghost'}`}>{cta}</button>
      </div>
    </div>
  );
}

export default function PricingSection({ onDownload }) {
  const [billing, setBilling] = useState('yearly');
  const b = BILLING.find((x) => x.id === billing);

  return (
    <section id="pricing" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="VIP & pricing"
          title={<>Free to join. <span className="brand-text">More with VIP.</span></>}
          subtitle="Everyone can talk, connect, and share for free. Upgrade for unlimited translation, more reach, creator payouts, and matchmaking."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <PlanCard
            name="Free"
            price="$0"
            suffix=""
            desc="Everything you need to get started."
            features={['5 AI translations a day', '2 hours of room time a day', '1 learning language', 'Moments, Shorts & messages', 'Earn diamonds at 10%']}
            cta="Download free"
            onCta={onDownload}
          />
          <PlanCard
            name="VIP"
            price={`$${VIP_PRICES.vipMonthly}`}
            suffix="/mo"
            desc="For regulars and creators."
            highlight
            badge="Best for creators"
            features={['Unlimited AI translation & live captions', 'Unlimited room time', '5× room exposure', '3 learning languages', 'See and hide profile visits', 'Creator payouts at 15%–27.5%', 'Block Unknown Chat & no ads']}
            cta="Get VIP in the app"
            onCta={onDownload}
          />
          <PlanCard
            name="VIP-X"
            price={`$${VIP_PRICES.vipX[billing]}`}
            suffix={b.suffix}
            desc="The full LinkUp experience."
            vipx
            badge={b.badge || 'Ultimate'}
            features={['Everything in VIP', '10× room exposure', 'Matchmaking', ...VIPX_EXTRAS]}
            cta="Get VIP-X in the app"
            onCta={onDownload}
          >
            <div role="radiogroup" aria-label="VIP-X billing period" className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-linkup-bg p-1">
              {BILLING.map((x) => (
                <button
                  key={x.id}
                  role="radio"
                  aria-checked={billing === x.id}
                  onClick={() => setBilling(x.id)}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition ${billing === x.id ? 'bg-linkup-purple text-white' : 'text-linkup-muted hover:text-white'}`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </PlanCard>
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
