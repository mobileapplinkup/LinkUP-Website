import { useMemo, useState } from 'react';
import { Crown, Gem, Mic2, ShoppingBag, Ticket, Package, TrendingUp } from 'lucide-react';
import {
  DIAMOND_RATES, GIFT_LEVEL_TIERS, GIFT_PASSES, GOODIE_BAGS, TREASURE_CHESTS, roomHoursForLevel,
} from '../data/linkupData.js';
import { SectionHeader, fmt } from './ui.jsx';

function Toggle({ checked, onChange, disabled, label, sub }) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-linkup-surface-light p-3.5 ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}>
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-linkup-muted">{sub}</span>
      </span>
      <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-white/15 transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:bg-linkup-purple peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-linkup-cyan" />
    </label>
  );
}

function DiamondCalculator() {
  const [tokens, setTokens] = useState(20000);
  const [vip, setVip] = useState(true);
  const [host, setHost] = useState(true);
  const [spend, setSpend] = useState(false);

  // Mirrors lib/models/currency.dart: bonuses only apply while VIP is active.
  const rate = useMemo(() => {
    if (!vip) return DIAMOND_RATES.free;
    return DIAMOND_RATES.vip + (host ? DIAMOND_RATES.moderatorBonus : 0) + (spend ? DIAMOND_RATES.spendBonus : 0);
  }, [vip, host, spend]);

  const diamonds = Math.floor(tokens * rate);
  const pct = (rate * 100).toFixed(1).replace(/\.0$/, '');

  return (
    <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-bold">
          <Gem className="text-linkup-diamond" /> Diamond earnings calculator
        </h3>
        <p className="mt-2 text-sm text-linkup-muted">
          When someone sends you a gift, you earn diamonds worth a share of its token value. See how your plan and role change that share.
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="tokens" className="text-sm font-semibold">Gift tokens received</label>
            <span className="font-display text-lg font-bold text-linkup-gold">🪙 {fmt(tokens)}</span>
          </div>
          <input id="tokens" type="range" min={0} max={100000} step={500} value={tokens} onChange={(e) => setTokens(Number(e.target.value))} className="slider w-full" />
          <div className="mt-1 flex justify-between text-[11px] text-linkup-muted"><span>0</span><span>100,000</span></div>
        </div>

        <div className="mt-6 space-y-2.5">
          <Toggle checked={vip} onChange={setVip} label="VIP or VIP-X member" sub="15% instead of the free 10%" />
          <Toggle checked={host} onChange={setHost} disabled={!vip} label="Room host or moderator" sub="+2.5% on gifts in your room" />
          <Toggle checked={spend} onChange={setSpend} disabled={!vip} label="VIP Diamond Bonus" sub={`+10% after $${DIAMOND_RATES.spendBonusThresholdUsd} in lifetime token purchases`} />
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-linkup-diamond/20 via-linkup-purple/20 to-linkup-magenta/20 p-6 text-center">
        <p className="text-sm text-linkup-muted">Your diamond rate</p>
        <p className="font-display text-6xl font-extrabold brand-text">{pct}%</p>
        <div className="mx-auto my-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
          <div className="brand-gradient h-full rounded-full transition-all duration-500" style={{ width: `${(rate / 0.275) * 100}%` }} />
        </div>
        <p className="text-sm text-linkup-muted">You&apos;d earn</p>
        <p className="font-display text-4xl font-bold text-linkup-diamond">💎 {fmt(diamonds)}</p>
        <p className="mt-6 text-xs text-linkup-muted">
          Cash-outs need an active VIP plan and a verified age. Final amounts are calculated by LinkUp&apos;s servers.
        </p>
      </div>
    </div>
  );
}

const SHOP_TABS = [
  { id: 'goodie', label: 'Goodie Bags', icon: ShoppingBag },
  { id: 'pass', label: 'Gift Passes', icon: Ticket },
  { id: 'chest', label: 'Treasure Chests', icon: Package },
];

function GiftingShowcase() {
  const [tab, setTab] = useState('goodie');
  const [season, setSeason] = useState(0);

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-2xl font-bold">More ways to gift</h3>
        <div role="tablist" className="flex flex-wrap gap-1.5 rounded-xl bg-linkup-bg p-1">
          {SHOP_TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`tab flex items-center gap-1.5 ${tab === id ? 'tab-active' : ''}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'goodie' && (
        <div className="animate-fadeup">
          <p className="mb-4 text-sm text-linkup-muted">Drop a Goodie Bag in a room and its gifts are shared among the people there. Each season has three sizes.</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {GOODIE_BAGS.map((s, i) => (
              <button key={s.season} onClick={() => setSeason(i)} className={`pill transition ${season === i ? 'border-linkup-magenta bg-linkup-magenta/20 text-white' : 'hover:text-white'}`}>
                {s.season}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {GOODIE_BAGS[season].tiers.map((t) => (
              <div key={t.name} className="rounded-2xl bg-linkup-surface-light p-5 text-center">
                <p className="text-5xl">{t.emoji}</p>
                <p className="mt-3 font-display font-bold">{t.name}</p>
                <p className="mt-1 text-lg font-bold text-linkup-gold">🪙 {fmt(t.tokens)}</p>
                <p className="text-xs text-linkup-muted">Shared with up to {t.people} people</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'pass' && (
        <div className="animate-fadeup">
          <p className="mb-4 text-sm text-linkup-muted">Buy a Gift Pass and claim a new gift every day. Each day&apos;s gift has to be claimed that day.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GIFT_PASSES.map((p) => (
              <div key={`${p.days}-${p.tier}`} className={`rounded-2xl p-5 ${p.tier === 'Premium' ? 'bg-gradient-to-br from-linkup-purple/40 to-linkup-magenta/30' : 'bg-linkup-surface-light'}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-linkup-muted">{p.tier}</p>
                <p className="mt-1 font-display text-lg font-bold">{p.name}</p>
                <p className="mt-3 font-display text-3xl font-extrabold">${p.usd}</p>
                <span className="mt-3 inline-block rounded-full bg-linkup-success/20 px-2.5 py-0.5 text-xs font-semibold text-linkup-success">{p.value}</span>
                <p className="mt-2 text-xs text-linkup-muted">{p.days} daily gifts</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'chest' && (
        <div className="animate-fadeup">
          <p className="mb-4 text-sm text-linkup-muted">Open a Treasure Chest during limited-time events to fill the room with premium gifts and LINK tokens.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {TREASURE_CHESTS.map((c) => (
              <div key={c.key} className="rounded-2xl bg-linkup-surface-light p-5" style={{ boxShadow: `inset 0 0 0 1px ${c.color}40` }}>
                <p className="font-display text-xl font-bold" style={{ color: c.color }}>{c.name}</p>
                <p className="mt-1 text-lg font-bold text-linkup-gold">🪙 {fmt(c.tokens)}</p>
                <ul className="mt-4 grid grid-cols-2 gap-1.5 text-sm text-white/80">
                  {c.rewards.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LevelExplorer() {
  const [tier, setTier] = useState(5);
  const [roomLv, setRoomLv] = useState(12);
  const t = GIFT_LEVEL_TIERS[tier];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-2xl font-bold"><Crown className="text-linkup-gold" /> Gift Level · 1–100</h3>
        <p className="mt-2 text-sm text-linkup-muted">Send gifts to earn gift EXP. Your badge changes color every 10 levels.</p>
        <div className="my-6 flex items-center justify-center gap-5">
          <img src={`/assets/levels/gift/${t.file}`} alt={`${t.name} gift level badge`} className="h-16 drop-shadow-xl" />
          <div>
            <p className="font-display text-2xl font-bold">{t.name}</p>
            <p className="text-sm text-linkup-muted">Levels {t.range}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {GIFT_LEVEL_TIERS.map((g, i) => (
            <button
              key={g.name}
              onClick={() => setTier(i)}
              aria-label={`${g.name} tier, levels ${g.range}`}
              className={`flex h-10 items-center justify-center rounded-lg text-[11px] font-bold transition ${tier === i ? 'ring-2 ring-white ring-offset-2 ring-offset-linkup-surface' : 'opacity-70 hover:opacity-100'}`}
              style={{ background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`, color: [2, 4, 9].includes(i) ? '#2B2F3A' : '#fff' }}
            >
              {g.range}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-2xl font-bold"><Mic2 className="text-linkup-cyan" /> Room Level · 1–30</h3>
        <p className="mt-2 text-sm text-linkup-muted">Host rooms to level up your room. Each level takes more hosting time than the last.</p>
        <div className="my-6 flex items-center justify-center gap-5">
          <img src={`/assets/levels/room/room_lv_${roomLv}.png`} alt={`Room level ${roomLv} badge`} className="h-16 drop-shadow-xl" />
          <div>
            <p className="font-display text-2xl font-bold">Level {roomLv}</p>
            <p className="flex items-center gap-1 text-sm text-linkup-muted"><TrendingUp size={14} /> {fmt(roomHoursForLevel(roomLv))} hosting hours</p>
          </div>
        </div>
        <input type="range" min={1} max={30} value={roomLv} onChange={(e) => setRoomLv(Number(e.target.value))} className="slider w-full" aria-label="Room level" />
        <div className="mt-1 flex justify-between text-[11px] text-linkup-muted"><span>Lv 1</span><span>Lv 30 · 13,000 h</span></div>
      </div>
    </div>
  );
}

export default function CreatorEconomySection() {
  return (
    <section id="economy" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
        <SectionHeader
          eyebrow="Creator economy"
          title={<>Gifts become <span className="brand-text">diamonds.</span></>}
          subtitle="Fans buy tokens and send gifts. Creators earn diamonds on every gift they receive, from 10% up to 27.5%."
        />
        <DiamondCalculator />
        <GiftingShowcase />
        <LevelExplorer />
      </div>
    </section>
  );
}
