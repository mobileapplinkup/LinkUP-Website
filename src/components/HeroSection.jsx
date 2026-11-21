import {
  Captions, ChevronLeft, Gift, Heart, LayoutGrid, Mic, MicOff, MoreVertical, ShoppingBag, Trophy, Users,
} from 'lucide-react';
import { STATS } from '../data/linkupData.js';
import { Avatar, Phone, Soundwave } from './ui.jsx';
import { StoreButtons } from './Download.jsx';

function Seat({ seed, label, speaking, muted, empty, host, role, mod, fan }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {empty ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-linkup-muted/30 text-sm text-linkup-muted">
            +
          </div>
        ) : (
          <Avatar
            seed={seed}
            size={host ? 'h-12 w-12' : 'h-10 w-10'}
            ring={
              speaking
                ? 'ring-2 ring-linkup-cyan ring-offset-2 ring-offset-[#0A0A1A]'
                : ''
            }
          />
        )}
        {!empty && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#121228] ring-1 ring-white/15">
            {muted ? <MicOff size={8} className="text-linkup-error" /> : <Mic size={8} className="text-linkup-success" />}
          </span>
        )}
      </div>
      <div className="mt-1 flex max-w-[60px] items-center justify-center gap-0.5">
        {mod && !empty && (
          <span className="rounded bg-[#3B82F6] px-1 text-[6.5px] font-bold leading-tight text-white">MOD</span>
        )}
        <span className={`truncate ${empty ? 'text-[7.5px] text-linkup-muted' : 'text-[8.5px] font-medium text-white/90'}`}>
          {empty ? 'Open Seat' : label}
        </span>
      </div>
      {role && !empty && (
        <span className="mt-0.5 text-[7.5px] font-semibold text-linkup-purple-light">{role}</span>
      )}
      {fan && !empty && (
        <span className="mt-0.5 rounded-full bg-linkup-pink/25 px-1.5 text-[6.5px] font-bold text-linkup-pink">
          {fan}
        </span>
      )}
    </div>
  );
}

function VoiceRoomScreen() {
  const guests = [
    { seed: 2, label: 'Jiho', speaking: true, mod: true },
    { seed: 3, label: 'Lucía', muted: true },
    { seed: 4, label: 'Ravi', fan: '💜 Lv3' },
    { seed: 5, label: 'Sana', speaking: true },
    { seed: 6, label: 'Dmitri', muted: true },
    { seed: 7, label: 'Emma' },
    { empty: true },
    { empty: true },
  ];
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1A1A3E] via-[#0A0A1A] to-[#08081A] pt-9 text-white">
      {/* Header — mirrors voiceroom_screen.dart */}
      <div className="px-2.5 pb-1.5">
        {/* Top row: back, title pill, fanclub | top gifters, trophy, menu */}
        <div className="flex items-center gap-1">
          <ChevronLeft size={14} className="shrink-0 text-white/80" />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <span className="truncate rounded-full bg-white/10 px-2 py-0.5 font-display text-[10px] font-semibold">
              Tokyo ⇄ LA Café
            </span>
            <span className="shrink-0 rounded-full bg-gradient-to-r from-[#FF8FAB] to-[#FF3CAC] px-1.5 py-0.5 text-[8px] font-bold">
              💕 +
            </span>
          </div>
          <div className="flex shrink-0 items-center -space-x-1.5">
            <Avatar seed={4} size="h-4 w-4" ring="ring-1 ring-[#FFD700]" />
            <Avatar seed={5} size="h-4 w-4" ring="ring-1 ring-white/50" />
          </div>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Trophy size={10} className="text-linkup-gold" />
          </span>
          <MoreVertical size={13} className="shrink-0 text-white/80" />
        </div>

        {/* Sub-row: room level badge, host gift level badge, language chip, purple listener count */}
        <div className="mt-1 flex items-center gap-1.5 pl-4 text-[8.5px]">
          <img src="/assets/levels/room/room_lv_12.png" alt="Room level 12" className="h-4" />
          <img src="/assets/levels/gift/gift_lv_50-59.png" alt="Host gift level" className="h-3.5" />
          <span className="rounded-lg bg-white/10 px-1.5 py-0.5 font-bold text-white/75">EN</span>
          <span className="flex items-center gap-0.5 rounded-lg bg-linkup-purple/20 px-1.5 py-0.5 font-semibold text-linkup-purple">
            <Users size={9} /> 248
          </span>
        </div>
      </div>

      {/* Stage: Host & Co-Host top row (mirrors voiceroom_screen.dart) */}
      <div className="mt-2 flex items-start justify-evenly px-6">
        <Seat seed={0} label="Mika" role="Host" speaking host />
        <Seat seed={1} label="Alex" role="Co-Host" host />
      </div>

      {/* Guest seats: 4x2 grid */}
      <div className="mt-3 grid grid-cols-4 gap-x-1 gap-y-2.5 px-2">
        {guests.map((g, i) => (
          <Seat key={i} {...g} />
        ))}
      </div>

      {/* AI Live Captions overlay */}
      <div className="mx-2.5 mt-3 rounded-xl border border-linkup-cyan/30 bg-linkup-cyan/10 px-2 py-1.5">
        <p className="mb-0.5 flex items-center gap-1 text-[8.5px] font-semibold text-linkup-cyan">
          <Captions size={9} /> AI Live Captions · EN
        </p>
        <p className="text-[9.5px] leading-snug">今日はどこから来ましたか？</p>
        <p className="text-[9.5px] leading-snug text-white/65">Where are you joining from today?</p>
      </div>

      {/* Chat overlay */}
      <div className="mx-2.5 mt-2 flex flex-1 flex-col justify-end gap-1 overflow-hidden pb-1.5 text-[9.5px]">
        <p className="rounded-lg bg-black/25 px-2 py-0.5">
          <span className="mr-1 rounded bg-linkup-pink/30 px-1 text-[7.5px] font-bold">💜 Lv3</span>
          <span className="font-semibold text-linkup-pink">Sana:</span> Hi from Osaka! 👋
        </p>
        <p className="rounded-lg bg-black/25 px-2 py-0.5">
          <span className="font-semibold text-linkup-cyan">Emma:</span> Can I hop on stage?
        </p>
        <p className="px-1 text-[9px] text-linkup-gold">✨ Dmitri entered the room</p>
      </div>

      {/* Bottom RoomControls bar — mirrors room_controls.dart (#1A1040 rounded top) */}
      <div className="flex items-center gap-1 rounded-t-2xl bg-[#1A1040]/95 px-2 py-2">
        <div className="min-w-0 flex-1 truncate rounded-full bg-white/10 px-2.5 py-1 text-[9px] text-white/50">
          Comment…
        </div>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
          <Mic size={11} className="text-linkup-success" />
        </span>
        <span className="flex h-6 shrink-0 items-center justify-center rounded-full bg-linkup-cyan/20 px-1.5 text-[8px] font-bold text-linkup-cyan">
          CC
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
          <ShoppingBag size={11} className="text-white/80" />
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
          <LayoutGrid size={11} className="text-white/80" />
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-linkup-magenta to-linkup-orange">
          <Gift size={11} />
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
            <p className="font-display text-xl font-bold text-linkup-diamond">💎 up to 60%</p>
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
