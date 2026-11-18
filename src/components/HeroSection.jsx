import { Captions, Gift, Mic, MicOff, Users, Heart } from 'lucide-react';
import { STATS } from '../data/linkupData.js';
import { Avatar, Phone, Soundwave } from './ui.jsx';
import { StoreButtons } from './Download.jsx';

function Seat({ seed, label, speaking, muted, empty, host }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        {empty ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5 text-[10px] text-white/40">
            +
          </div>
        ) : (
          <Avatar
            seed={seed}
            size={host ? 'h-12 w-12' : 'h-11 w-11'}
            ring={speaking ? 'ring-2 ring-linkup-cyan ring-offset-2 ring-offset-linkup-bg' : ''}
          />
        )}
        {!empty && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-linkup-surface">
            {muted ? <MicOff size={9} className="text-linkup-error" /> : <Mic size={9} className="text-linkup-success" />}
          </span>
        )}
      </div>
      <span className="max-w-[54px] truncate text-[9px] text-white/70">{label}</span>
    </div>
  );
}

function VoiceRoomScreen() {
  const guests = [
    { seed: 2, label: 'Jiho', speaking: true },
    { seed: 3, label: 'Lucía', muted: true },
    { seed: 4, label: 'Ravi' },
    { seed: 5, label: 'Sana', speaking: true },
    { seed: 6, label: 'Dmitri', muted: true },
    { seed: 7, label: 'Emma' },
    { empty: true, label: 'Empty' },
    { empty: true, label: 'Empty' },
  ];
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1A1A3E] via-[#121228] to-[#0A0A1A] px-3 pb-3 pt-9 text-white">
      {/* Room header */}
      <div className="flex items-center gap-2">
        <Avatar seed={1} size="h-8 w-8" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold">Tokyo ⇄ LA Language Café</p>
          <p className="text-[9px] text-white/60">Language Exchange · Lv. 12</p>
        </div>
        <span className="pill px-2 py-0.5 text-[9px]">
          <Users size={10} /> 248
        </span>
      </div>

      {/* Gift banner */}
      <div className="relative mt-2 h-7 overflow-hidden">
        <div className="animate-slidein absolute inset-y-0 left-0 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-linkup-magenta/90 to-linkup-orange/90 py-1 pl-1 pr-3 text-[10px] font-semibold">
          <Avatar seed={4} size="h-5 w-5" />
          Ravi sent 🚀 Rocket ×3
        </div>
      </div>

      {/* Host seats */}
      <div className="mt-2 flex justify-center gap-8">
        <Seat seed={0} label="Mika · Host" speaking host />
        <Seat seed={1} label="Alex · Host" host />
      </div>

      {/* Guest seats */}
      <div className="mt-3 grid grid-cols-4 gap-y-3">
        {guests.map((g, i) => (
          <Seat key={i} {...g} />
        ))}
      </div>

      {/* Live captions */}
      <div className="mt-3 rounded-xl border border-linkup-cyan/30 bg-linkup-cyan/10 p-2">
        <p className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold text-linkup-cyan">
          <Captions size={10} /> AI live captions · Mika
        </p>
        <p className="text-[10px] leading-snug">今日はどこから来ましたか？</p>
        <p className="text-[10px] leading-snug text-white/60">Where are you joining from today?</p>
      </div>

      {/* Chat */}
      <div className="mt-2 flex flex-1 flex-col justify-end gap-1 overflow-hidden text-[10px]">
        <p>
          <span className="mr-1 rounded bg-linkup-pink/30 px-1 text-[8px]">💜 Lv3</span>
          <span className="font-semibold text-linkup-pink">Sana:</span> Hi from Osaka! 👋
        </p>
        <p>
          <span className="font-semibold text-linkup-cyan">Emma:</span> Can I join the stage?
        </p>
        <p className="text-linkup-gold">✨ Dmitri entered the room</p>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/50">Say something…</div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
          <Mic size={13} />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-linkup-magenta to-linkup-orange">
          <Gift size={13} />
        </span>
      </div>
    </div>
  );
}

export default function HeroSection({ onDownload }) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-36">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-linkup-cyan/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-linkup-magenta/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="pill mb-6">
            <Soundwave bars={4} className="h-3" barClass="w-0.5 bg-linkup-cyan" />
            Live voice rooms · Language exchange · Creators
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            Talk.
            <br />
            Stream.
            <br />
            Meet.
            <br />
            <span className="brand-text">Belong.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-linkup-muted">
            LinkUp is where the world talks. Jump into live voice rooms, find language partners in 19 languages, share
            Moments, and earn diamonds when your audience sends gifts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onDownload} className="btn-primary">
              <Heart size={18} /> Join LinkUp free
            </button>
            <a href="#features" className="btn-ghost">
              See how it works
            </a>
          </div>
          <StoreButtons className="mt-6" />

          <dl className="mt-12 grid max-w-sm grid-cols-2 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold brand-text">{s.value}</dd>
                <dd className="mt-1 text-xs text-linkup-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center">
          <div className="brand-gradient absolute inset-0 m-auto h-80 w-80 rounded-full opacity-30 blur-[90px]" />
          <div className="animate-float relative">
            <Phone>
              <VoiceRoomScreen />
            </Phone>
          </div>
          <div className="glass absolute -left-2 top-16 hidden rounded-2xl px-4 py-3 sm:block lg:-left-6">
            <p className="text-xs text-linkup-muted">Creator diamond rate</p>
            <p className="font-display text-xl font-bold text-linkup-diamond">💎 up to 27.5%</p>
          </div>
          <div className="glass absolute -right-2 bottom-24 hidden rounded-2xl px-4 py-3 sm:block lg:-right-4">
            <p className="text-xs text-linkup-muted">Live translation</p>
            <p className="font-display text-base font-bold">日本語 ⇄ English</p>
          </div>
        </div>
      </div>
    </section>
  );
}
