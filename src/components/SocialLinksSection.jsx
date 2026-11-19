import { useState } from 'react';
import { Lock, Users } from 'lucide-react';
import { FANCLUB, LINK_EXP_RULES, LINK_LEVELS, LINK_TYPES } from '../data/linkupData.js';
import { SectionHeader, fmt } from './ui.jsx';

function LinkExplorer() {
  const [typeId, setTypeId] = useState('couple');
  const [level, setLevel] = useState(4);
  const type = LINK_TYPES.find((t) => t.id === typeId);
  const totalSlots = LINK_TYPES.reduce((n, t) => n + t.slots, 0);

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold">LINK relationships</h3>
          <p className="mt-2 text-sm text-linkup-muted">
            Make it official with the people who matter. Send a special LINK gift to ask, then level up your LINK together to unlock matching effects.
          </p>

          <div role="tablist" className="mt-6 grid grid-cols-3 gap-2">
            {LINK_TYPES.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={typeId === t.id}
                onClick={() => setTypeId(t.id)}
                className="rounded-xl border p-3 text-center transition"
                style={{
                  borderColor: typeId === t.id ? t.color : 'rgba(255,255,255,0.08)',
                  background: typeId === t.id ? `${t.color}22` : 'transparent',
                }}
              >
                <span className="block text-2xl">{t.emoji}</span>
                <span className="mt-1 block font-display font-bold">{t.label}</span>
                <span className="block text-xs text-linkup-muted">{t.slots} {t.slots === 1 ? 'slot' : 'slots'}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm font-semibold">Your {totalSlots} LINK slots</p>
          <div className="mt-2 flex gap-1.5">
            {LINK_TYPES.flatMap((t) => Array.from({ length: t.slots }).map((_, i) => (
              <span
                key={`${t.id}-${i}`}
                className="h-3 flex-1 rounded-full transition"
                style={{ background: t.color, opacity: t.id === typeId ? 1 : 0.25 }}
                title={t.label}
              />
            )))}
          </div>

          <p className="mt-6 text-sm font-semibold">{type.label} LINK gifts</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {type.gifts.map((g, i) => (
              <div key={g.name} className="rounded-xl bg-linkup-surface-light p-3 text-center">
                <span className="text-3xl">{g.emoji}</span>
                <p className="mt-1 text-xs font-semibold">{g.name}</p>
                <p className="text-xs text-linkup-gold">🪙 {fmt(g.tokens)}</p>
                <p className="text-[10px] text-linkup-muted">Tier {i + 1}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${type.color}26, transparent 70%)` }}>
          <p className="text-sm font-semibold">LINK levels (0–6) &amp; EXP rules</p>
          <p className="text-xs text-linkup-muted">No daily XP cap. Earn base EXP together in rooms or by gifting, multiplied up to 1.75× as your LINK levels up.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {LINK_EXP_RULES.map((r) => (
              <div key={r.label} className="rounded-xl bg-black/25 px-3 py-2">
                <p className="text-[11px] font-semibold text-white">{r.label}</p>
                <p className="text-[10px] text-linkup-muted">{r.detail}</p>
              </div>
            ))}
          </div>
          <ol className="mt-4 space-y-2">
            {LINK_LEVELS.map((l) => {
              const unlocked = l.level <= level;
              const title = l.typePrefixed ? `${type.label} ${l.reward}` : l.reward;
              return (
                <li key={l.level}>
                  <button
                    onClick={() => setLevel(l.level)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${unlocked ? 'bg-white/[0.06]' : 'bg-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold"
                      style={{ background: unlocked ? type.color : 'rgba(255,255,255,0.08)' }}
                    >
                      {l.level}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{title}</span>
                      <span className="block text-[11px] text-linkup-muted">
                        {fmt(l.xp)} XP · {l.detail}
                      </span>
                    </span>
                    {!unlocked && <Lock size={14} className="text-linkup-muted" />}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function FanclubShowcase() {
  return (
    <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-bold"><Users className="text-linkup-pink" /> Host fanclubs</h3>
        <p className="mt-2 text-sm text-linkup-muted">
          Hosts name their fanclub and pick a badge. Fans join to support them and get perks in every room that host runs.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-linkup-surface-light p-4">
            <p className="text-xs text-linkup-muted">Monthly</p>
            <p className="font-display text-2xl font-bold">🪙 {FANCLUB.monthly}</p>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-br from-[#FF8FAB]/30 to-linkup-magenta/30 p-4">
            <span className="absolute right-2 top-2 rounded-full bg-linkup-magenta px-2 py-0.5 text-[10px] font-bold">Save 17%</span>
            <p className="text-xs text-linkup-muted">Yearly</p>
            <p className="font-display text-2xl font-bold">🪙 {FANCLUB.yearly}</p>
          </div>
        </div>
        <p className="mt-6 text-sm font-semibold">Fan tasks earn fan XP</p>
        <ul className="mt-2 space-y-1.5">
          {FANCLUB.tasks.map((t) => (
            <li key={t.name} className="flex items-center justify-between rounded-lg bg-linkup-surface-light px-3 py-2 text-sm">
              <span>{t.emoji} {t.name}</span>
              <span className="font-semibold text-linkup-pink">+{t.xp} XP</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold">Fanclub perks</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {FANCLUB.perks.map((p) => (
            <div key={p.name} className="flex flex-col items-center justify-center rounded-2xl bg-linkup-surface-light p-5 text-center transition hover:bg-white/10">
              <span className="text-4xl">{p.emoji}</span>
              <span className="mt-2 text-sm font-semibold">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SocialLinksSection() {
  return (
    <section id="links" className="relative py-24">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-linkup-magenta/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl space-y-6 px-5 lg:px-8">
        <SectionHeader
          eyebrow="Relationships"
          title={<>More than followers. <span className="brand-text">Real LINKs.</span></>}
          subtitle="Show who your partner, best friends, and family are, and give your favorite hosts a fanclub to be proud of."
        />
        <LinkExplorer />
        <FanclubShowcase />
      </div>
    </section>
  );
}
