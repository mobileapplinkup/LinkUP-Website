import { useState } from 'react';
import {
  BarChart2, Bell, Bookmark, Check, ChevronDown, ChevronRight, Flame, Gift, Heart, Lock, MapPin, MessageCircle,
  Mic, Play, Plus, Radio, Rocket, Search, Settings, Share2, ShoppingBag, Sparkles, SquarePen, TrendingUp, Trophy,
  User, UserPlus, Users, Zap, Eye,
} from 'lucide-react';
import { APP_TABS, LANGUAGES, ROOM_TOPICS } from '../data/linkupData.js';
import { Avatar, Phone, SectionHeader } from './ui.jsx';

const TAB_ICONS = { rooms: Mic, connect: Users, moments: Sparkles, messages: MessageCircle, profile: User };
const NAV_LABELS = { messages: 'Messages', connect: 'Connect', moments: 'Moments', rooms: 'Voice', profile: 'Profile' };

function ScreenShell({ children }) {
  return (
    <div className="flex h-full flex-col bg-[#0A0A1A] pb-14 pt-8 text-white">
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/** Mirrors voiceroom_list_screen.dart + room_card.dart */
function RoomsScreen() {
  const rooms = [
    {
      boosted: true,
      lang: 'EN',
      tags: ['Language Exchange', 'Japan'],
      title: 'Tokyo ⇄ LA Language Café',
      host: 'Mika',
      n: 248,
      seats: [0, 2, 4, 5],
      grad: 'from-[#1A1A3E] to-[#1E3A5F]',
    },
    {
      lang: 'KR',
      tags: ['Music', 'Lo-Fi'],
      title: 'Late Night Lo-Fi & Chill 🎧',
      host: 'Jiho',
      n: 131,
      seats: [2, 3, 6],
      grad: 'from-[#1E1B4B] to-[#3730A3]',
    },
    {
      lang: 'ES',
      tags: ['Debate', 'Culture'],
      title: 'Debate Club: Travel vs Work',
      host: 'Lucía',
      n: 87,
      seats: [3, 1, 7],
      grad: 'from-[#312E81] to-[#6D28D9]',
    },
  ];
  return (
    <ScreenShell>
      {/* Top bar: Voice | Live ... Trophy + Create Room Mic */}
      <div className="flex items-center justify-between px-3 pb-1.5 pt-1">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-white">Voice</span>
          <span className="font-display text-sm text-linkup-muted">Live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-linkup-gold/40 bg-white/[0.08]">
            <Trophy size={13} className="text-linkup-gold" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-linkup-purple to-linkup-purple-light shadow shadow-linkup-purple/40">
            <Mic size={13} className="text-white" />
          </span>
        </div>
      </div>

      {/* Filter chips: All, English, Japanese, Creators, Friends */}
      <div className="flex gap-1 overflow-hidden px-3 pb-2 text-[9.5px]">
        {['All', 'English', 'Japanese', 'Creators', 'Friends'].map((f, i) => (
          <span
            key={f}
            className={`shrink-0 rounded-2xl px-2.5 py-1 ${i === 0 ? 'bg-linkup-surface font-semibold text-white' : 'text-linkup-muted'}`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Gradient RoomCards */}
      <div className="space-y-2 px-3">
        {rooms.map((r) => (
          <div key={r.title}>
            {r.boosted && (
              <span className="mb-1 inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#E040FB] to-[#AB47BC] px-2 py-0.5 text-[8px] font-bold">
                <Rocket size={8} /> Boosted
              </span>
            )}
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${r.grad} p-2.5`}>
              {/* Top row: language badge + #hashtag pills */}
              <div className="flex flex-wrap items-center gap-1">
                <span className="rounded bg-black/35 px-1.5 py-0.5 text-[8px] font-bold tracking-wide">{r.lang}</span>
                {r.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded bg-black/30 px-1.5 py-0.5 text-[8px] font-semibold text-[#818CF8]">
                    <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#6366F1] text-[7px] font-bold text-white">#</span>
                    {tag}
                  </span>
                ))}
              </div>
              {/* Room title */}
              <p className="mt-1.5 truncate font-display text-[11px] font-bold">{r.title}</p>
              {/* Bottom row: host + participants + listener count */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center -space-x-1.5">
                  {r.seats.map((s) => (
                    <Avatar key={s} seed={s} size="h-5 w-5" ring="ring-1 ring-[#0A0A1A]" />
                  ))}
                  <span className="pl-2.5 text-[8.5px] text-white/75">{r.host}</span>
                </div>
                <span className="flex items-center gap-0.5 rounded-full bg-black/30 px-1.5 py-0.5 text-[8.5px] text-linkup-cyan">
                  <Users size={8} /> {r.n}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

/** Mirrors connect_screen.dart + date_card_widget.dart */
function ConnectScreen() {
  return (
    <ScreenShell>
      {/* Top filter bar: Location ▾ | All Male Female | 🚀 Profile Boost */}
      <div className="flex items-center gap-1.5 overflow-hidden px-3 pb-2 pt-1 text-[9px]">
        <span className="inline-flex shrink-0 items-center gap-0.5 rounded-2xl border border-linkup-surface bg-linkup-surface-light px-2 py-1 text-white">
          Location <ChevronDown size={10} />
        </span>
        <span className="h-3.5 w-px shrink-0 bg-linkup-surface-light" />
        <span className="shrink-0 rounded-2xl bg-linkup-purple px-2 py-1 font-bold text-white">All</span>
        <span className="shrink-0 rounded-2xl bg-linkup-surface-light px-2 py-1 text-white/70">Male</span>
        <span className="shrink-0 rounded-2xl bg-linkup-surface-light px-2 py-1 text-white/70">Female</span>
        <span className="inline-flex shrink-0 items-center gap-0.5 rounded-2xl bg-gradient-to-r from-linkup-purple to-linkup-purple-light px-2 py-1 font-semibold text-white">
          🚀 Boost
        </span>
      </div>

      {/* Rounded DateCardWidget */}
      <div className="mx-3 flex h-[412px] flex-col overflow-hidden rounded-3xl bg-linkup-surface shadow-lg">
        {/* Top 60% Photo area */}
        <div className="relative flex-[6] bg-gradient-to-br from-[#1E90FF] via-[#7C3AED] to-[#FF3CAC]">
          {/* Photo indicator pills */}
          <div className="absolute inset-x-0 top-2.5 flex justify-center gap-1">
            <span className="h-1.5 w-5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          </div>
          {/* Age verification badge */}
          <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-md bg-linkup-blue text-white">
            <Check size={11} strokeWidth={3} />
          </span>
          {/* Center avatar silhouette */}
          <div className="flex h-full items-center justify-center pb-8">
            <Avatar seed={5} size="h-20 w-20" ring="ring-4 ring-white/25" />
          </div>
          {/* Gradient fade into card surface */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-linkup-surface via-linkup-surface/80 to-transparent" />
          {/* Floating Pass & Heart action buttons */}
          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-linkup-surface-light text-sm font-bold text-white/80 shadow">
              ✕
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-linkup-magenta to-linkup-orange shadow-lg shadow-linkup-magenta/40">
              <Heart size={16} className="fill-white text-white" />
            </span>
          </div>
        </div>

        {/* Bottom 40% Bio preview area */}
        <div className="flex-[4] space-y-1.5 px-3 pb-3 pt-1">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-sm font-bold">Sana, 24 <span className="text-[10px] font-normal text-linkup-success">● Online</span></p>
            <span className="text-[9px] text-linkup-muted">🇯🇵 Osaka · 3 km</span>
          </div>
          <p className="text-[9px] text-white/75">INFP · ♓ Pisces · Product Designer</p>
          <div className="flex items-center justify-between text-[9px]">
            <span>🇯🇵 Native · 🇺🇸 English</span>
            <span className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`h-1 w-2.5 rounded-full ${n <= 3 ? 'bg-linkup-cyan' : 'bg-white/15'}`} />
              ))}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {['Travel', 'Anime', 'Coffee', 'Language Exchange'].map((t) => (
              <span key={t} className="rounded-full bg-linkup-surface-light px-2 py-0.5 text-[8.5px] text-white/80">{t}</span>
            ))}
          </div>
          <p className="text-[8.5px] text-linkup-muted">Looking for: Friendship · Long-term</p>
        </div>
      </div>
    </ScreenShell>
  );
}

/** Mirrors moments_screen.dart */
function MomentsScreen() {
  return (
    <ScreenShell>
      {/* Top bar: bar_chart | search pill | orange bolt | bell with badge | edit_note */}
      <div className="flex items-center gap-1.5 px-3 pb-1.5 pt-1">
        <BarChart2 size={15} className="shrink-0 text-linkup-purple" />
        <div className="flex h-7 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-linkup-surface px-2.5 text-[9px] text-linkup-muted">
          <Search size={11} className="shrink-0" />
          <span className="truncate">Search @user, #hashtag</span>
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linkup-orange/15">
          <Zap size={13} className="text-linkup-orange" />
        </span>
        <span className="relative shrink-0">
          <Bell size={15} className="text-white/90" />
          <span className="absolute -right-1 -top-1 flex h-3 min-w-[12px] items-center justify-center rounded-full bg-[#EC4899] px-0.5 text-[7px] font-bold">
            3
          </span>
        </span>
        <SquarePen size={15} className="shrink-0 text-white/90" />
      </div>

      {/* Tab row: For You / Following + Moments/Shorts pill */}
      <div className="flex items-center justify-between border-b border-white/5 px-3 pb-1.5">
        <div className="flex gap-3 text-[11px]">
          <span className="border-b-2 border-white pb-1 font-display font-bold text-white">For You</span>
          <span className="pb-1 font-display text-linkup-muted">Following</span>
        </div>
        <div className="flex rounded-full bg-linkup-surface p-0.5 text-[8.5px]">
          <span className="rounded-full bg-linkup-purple px-2 py-0.5 font-semibold text-white">Moments</span>
          <span className="px-2 py-0.5 text-linkup-muted">Shorts</span>
        </div>
      </div>

      {/* Feed cards */}
      <div className="space-y-2.5 px-3 pt-2.5">
        <div className="rounded-2xl bg-linkup-surface p-2.5">
          <div className="mb-1.5 flex items-center gap-2">
            <Avatar seed={3} size="h-7 w-7" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold">Lucía 🇪🇸</p>
              <p className="text-[8px] text-linkup-muted">2h · EN → JP · #ramen</p>
            </div>
            <span className="rounded-full bg-linkup-purple/20 px-2 py-0.5 text-[8px] font-semibold text-linkup-purple-light">Follow</span>
          </div>
          <p className="mb-2 text-[9.5px] leading-snug text-white/90">
            Finally ordered ramen in Japanese without switching to English! 🍜✨
          </p>
          <div className="h-24 rounded-xl bg-gradient-to-br from-linkup-orange via-linkup-magenta to-linkup-purple" />
          <div className="mt-2 flex items-center justify-between text-[9px] text-linkup-muted">
            <div className="flex gap-3">
              <span>❤️ 214</span>
              <span>💬 38</span>
              <span>🎁 12</span>
            </div>
            <Bookmark size={11} />
          </div>
        </div>

        <div className="rounded-2xl bg-linkup-surface p-2.5">
          <div className="mb-1.5 flex items-center gap-2">
            <Avatar seed={6} size="h-7 w-7" />
            <p className="text-[10px] font-semibold">
              Dmitri 🇷🇺 <span className="ml-1 rounded bg-linkup-gold px-1 text-[7.5px] font-bold text-black">VIP</span>
            </p>
          </div>
          <div className="flex h-16 flex-col items-center justify-center rounded-xl bg-white/5 text-[9.5px]">
            <Lock size={14} className="mb-0.5 text-linkup-gold" />
            Unlock exclusive post · 🪙 20
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

/** Mirrors messages_screen.dart */
function MessagesScreen() {
  const convos = [
    { seed: 2, name: 'Jiho 🇰🇷', msg: '내일 같이 영어 연습할래요?', time: '2m', unread: 2, online: true },
    { seed: 0, name: 'Mika 🇯🇵', msg: '🎙️ Invited you to Tokyo ⇄ LA Café', time: '14m', unread: 1, online: true },
    { seed: 3, name: 'Lucía 🇪🇸', msg: '🎁 Sent you a Rose', time: '1h', unread: 0 },
    { seed: 5, name: 'Japanese Study Group', msg: 'Sana: Anyone free at 8pm?', time: '3h', unread: 5, group: true },
    { seed: 4, name: 'Ravi 🇮🇳', msg: 'Thanks for the practice session!', time: '1d', unread: 0 },
  ];
  return (
    <ScreenShell>
      <div className="relative flex h-full flex-col">
        {/* Search bar + purple + New DM button */}
        <div className="flex items-center gap-2 px-3 pb-2 pt-1">
          <div className="flex h-8 flex-1 items-center gap-1.5 rounded-full bg-linkup-surface px-3 text-[10px] text-linkup-muted">
            <Search size={12} /> Search
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linkup-purple text-white shadow">
            <Plus size={15} />
          </span>
        </div>

        {/* Filter chips: All, Online, Unread, My turn (selected = orange text + purple tint) */}
        <div className="flex gap-1 px-3 pb-2 text-[9.5px]">
          {['All', 'Online', 'Unread', 'My turn'].map((f, i) => (
            <span
              key={f}
              className={`rounded-2xl px-2.5 py-1 ${i === 0 ? 'bg-linkup-purple/15 font-semibold text-linkup-orange' : 'text-linkup-muted'}`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Pinned Following Live tile */}
        <div className="mx-3 mb-1.5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-linkup-magenta/20 to-linkup-purple/20 px-2.5 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-linkup-magenta to-linkup-orange">
            <Radio size={12} className="text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold">Following Live</p>
            <p className="truncate text-[8.5px] text-white/70">Mika &amp; 2 others are live now</p>
          </div>
          <ChevronRight size={12} className="text-white/60" />
        </div>

        {/* Conversation tiles */}
        <div className="flex-1 divide-y divide-white/[0.05] px-3">
          {convos.map((c) => (
            <div key={c.name} className="flex items-center gap-2.5 py-2">
              <div className="relative">
                <Avatar seed={c.seed} size="h-9 w-9" />
                {c.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-linkup-success ring-2 ring-[#0A0A1A]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <p className="truncate text-[10.5px] font-semibold">{c.name}</p>
                  <span className="shrink-0 text-[8.5px] text-linkup-muted">{c.time}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-1">
                  <p className="truncate text-[9px] text-linkup-muted">{c.msg}</p>
                  {c.unread > 0 && (
                    <span className="flex h-4 min-w-[16px] shrink-0 items-center justify-center rounded-full bg-linkup-error px-1 text-[8px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Create Group FAB */}
        <span className="absolute bottom-2 right-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-linkup-purple shadow-lg shadow-linkup-purple/40">
          <UserPlus size={15} className="text-white" />
        </span>
      </div>
    </ScreenShell>
  );
}

/** Mirrors profile_screen.dart */
function ProfileScreen() {
  return (
    <ScreenShell>
      <div className="space-y-2.5 px-3 pt-1">
        {/* Top bar: Tokens | Diamond ... Share | Settings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-linkup-surface px-2 py-0.5 text-[9px] font-semibold text-linkup-gold">
              🪙 1,450
            </span>
            <span className="rounded-full bg-linkup-surface px-2 py-0.5 text-[9px] font-semibold text-linkup-diamond">
              💎 620
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Share2 size={13} />
            <Settings size={13} />
          </div>
        </div>

        {/* Profile header: Avatar + Name/Badges + Chevron */}
        <div className="flex items-center gap-2.5 rounded-2xl bg-linkup-surface p-2.5">
          <div className="relative h-12 w-12 shrink-0">
            <div className="brand-gradient absolute inset-0 rounded-full p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-linkup-bg">
                <Avatar seed={0} size="h-10 w-10" />
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-xs font-bold">Mika 🇯🇵</p>
            <p className="text-[9px] text-linkup-muted">@mika.voice · 1.2k followers</p>
            <div className="mt-1 flex items-center gap-1">
              <img src="/assets/levels/gift/gift_lv_50-59.png" alt="Gift level 52" className="h-3.5" />
              <img src="/assets/levels/room/room_lv_12.png" alt="Room level 12" className="h-3.5" />
              <span className="rounded-full bg-gradient-to-r from-linkup-blue via-linkup-magenta to-linkup-orange px-1.5 text-[7.5px] font-bold">
                VIP-X
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-linkup-muted" />
        </div>

        {/* Stats Row: Login Streak | Visitors */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-linkup-surface p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linkup-orange/15">
              <Flame size={14} className="text-linkup-orange" />
            </span>
            <div>
              <p className="font-display text-xs font-bold">14 days</p>
              <p className="text-[8.5px] text-linkup-muted">Login Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-linkup-surface p-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linkup-cyan/15">
              <Eye size={14} className="text-linkup-cyan" />
            </span>
            <div>
              <p className="font-display text-xs font-bold">96</p>
              <p className="text-[8.5px] text-linkup-muted">Visitors</p>
            </div>
          </div>
        </div>

        {/* Moments & Shorts, Bookmarks, Engagement cards */}
        <div className="space-y-2">
          {[
            { icon: Sparkles, color: 'text-linkup-magenta', bg: 'bg-linkup-magenta/15', title: 'Moments & Shorts', sub: '24 posts · 8 shorts' },
            { icon: Bookmark, color: 'text-linkup-cyan', bg: 'bg-linkup-cyan/15', title: 'Bookmarks', sub: 'Saved posts & clips' },
            { icon: TrendingUp, color: 'text-linkup-success', bg: 'bg-linkup-success/15', title: 'Monthly Engagement', sub: '4.8k views · 612 likes' },
          ].map(({ icon: Icon, color, bg, title, sub }) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl bg-linkup-surface px-2.5 py-2">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                <Icon size={13} className={color} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold">{title}</p>
                <p className="text-[8.5px] text-linkup-muted">{sub}</p>
              </div>
              <ChevronRight size={13} className="text-linkup-muted" />
            </div>
          ))}
        </div>

        {/* Action Cards Row: Profile Boost | Shop */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-linkup-purple to-linkup-purple-light py-2.5 text-[10px] font-bold">
            <Rocket size={12} /> Profile Boost
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-linkup-surface-light py-2.5 text-[10px] font-bold text-linkup-gold">
            <ShoppingBag size={12} /> Shop
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

const SCREENS = { rooms: RoomsScreen, connect: ConnectScreen, moments: MomentsScreen, messages: MessagesScreen, profile: ProfileScreen };
const NAV_ORDER = ['messages', 'connect', 'moments', 'rooms', 'profile'];

export default function AppPreviewSection() {
  const [active, setActive] = useState('rooms');
  const tab = APP_TABS.find((t) => t.id === active);
  const Screen = SCREENS[active];

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Inside the app"
          title={<>Five spaces. <span className="brand-text">One community.</span></>}
          subtitle="Tap through the same five tabs you'll find in LinkUp."
        />

        <div role="tablist" aria-label="App sections" className="mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-2 rounded-2xl bg-linkup-surface p-1.5">
          {APP_TABS.map((t) => {
            const Icon = TAB_ICONS[t.id];
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={`tab flex items-center gap-2 ${active === t.id ? 'tab-active' : ''}`}
              >
                <Icon size={16} /> {t.short}
              </button>
            );
          })}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div key={active} className="animate-fadeup">
            <h3 className="text-3xl font-bold">{tab.title}</h3>
            <p className="mt-3 text-lg text-linkup-muted">{tab.blurb}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {tab.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linkup-purple/20">
                    <Check size={12} className="text-linkup-purple-light" />
                  </span>
                  <span className="text-sm text-white/85">{p}</span>
                </li>
              ))}
            </ul>

            {active === 'rooms' && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-linkup-muted">Room topics</p>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TOPICS.map((t) => <span key={t} className="pill">{t}</span>)}
                </div>
              </div>
            )}
            {active === 'connect' && (
              <div className="mt-8">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-linkup-muted">
                  <MapPin size={14} /> {LANGUAGES.length} languages for your profile
                </p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => <span key={l} className="pill">{l}</span>)}
                </div>
              </div>
            )}
            {active === 'moments' && (
              <div className="card mt-8 flex items-center gap-4 p-4">
                <Play className="text-linkup-magenta" />
                <p className="text-sm text-white/80">Shorts plays vertical videos full screen. Swipe to the next one, like, comment, or send a gift.</p>
              </div>
            )}
            {active === 'messages' && (
              <div className="card mt-8 flex items-center gap-4 p-4">
                <Gift className="text-linkup-orange" />
                <p className="text-sm text-white/80">With <b>Block Unknown Chat</b> on, people you don&apos;t know have to send one of your chosen gifts before they can message you.</p>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="brand-gradient absolute inset-0 m-auto h-72 w-72 rounded-full opacity-25 blur-[90px]" />
            <Phone>
              <div key={active} className="animate-fadeup h-full">
                <Screen />
              </div>
              {/* Bottom nav — mirrors LinkUpBottomNav (bottom_nav_bar.dart) */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-white/10 bg-linkup-surface px-1 py-1.5">
                {NAV_ORDER.map((id) => {
                  const Icon = TAB_ICONS[id];
                  const isSelected = active === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActive(id)}
                      aria-label={APP_TABS.find((t) => t.id === id).title}
                      className="flex w-12 flex-col items-center gap-0.5"
                    >
                      <span
                        className={`relative flex h-6 w-8 items-center justify-center rounded-xl transition ${
                          isSelected ? 'bg-linkup-purple/20 text-linkup-purple' : 'text-linkup-muted'
                        }`}
                      >
                        <Icon size={15} />
                        {id === 'messages' && (
                          <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-linkup-error px-1 text-[7px] font-bold text-white ring-1 ring-linkup-surface">
                            8
                          </span>
                        )}
                      </span>
                      <span className={`text-[7.5px] leading-none ${isSelected ? 'font-semibold text-linkup-purple' : 'text-linkup-muted'}`}>
                        {NAV_LABELS[id]}
                      </span>
                      <span className={`h-1 w-1 rounded-full transition ${isSelected ? 'bg-linkup-purple' : 'bg-transparent'}`} />
                    </button>
                  );
                })}
              </div>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
