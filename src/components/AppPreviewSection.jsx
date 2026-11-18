import { useState } from 'react';
import {
  Check, Heart, Languages, MapPin, MessageCircle, Mic, Play, Radio, Sparkles, User, Gift, Lock, Timer, Eye,
} from 'lucide-react';
import { APP_TABS, LANGUAGES, ROOM_TOPICS } from '../data/linkupData.js';
import { Avatar, Phone, SectionHeader } from './ui.jsx';

const TAB_ICONS = { rooms: Radio, connect: Heart, moments: Sparkles, messages: MessageCircle, profile: User };

function ScreenShell({ title, children }) {
  return (
    <div className="flex h-full flex-col px-3 pb-12 pt-9 text-white">
      <p className="mb-3 text-center font-display text-sm font-bold">{title}</p>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function RoomsScreen() {
  const rooms = [
    { t: 'Tokyo ⇄ LA Language Café', topic: 'Language Exchange', n: 248, s: 0 },
    { t: 'Late Night Lo-Fi 🎧', topic: 'Music', n: 131, s: 2 },
    { t: 'Debate Club: AI & Jobs', topic: 'Debate', n: 87, s: 4 },
    { t: 'K-Drama Trivia Night', topic: 'Trivia', n: 64, s: 5 },
    { t: 'Bedtime Storytelling', topic: 'Storytelling', n: 42, s: 6 },
  ];
  return (
    <ScreenShell title="Voice Rooms">
      <div className="mb-3 flex gap-1.5">
        <span className="rounded-full bg-linkup-purple px-3 py-1 text-[10px] font-semibold">Voice</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px]">Live</span>
      </div>
      <div className="space-y-2">
        {rooms.map((r) => (
          <div key={r.t} className="flex items-center gap-2 rounded-xl bg-linkup-surface p-2">
            <Avatar seed={r.s} size="h-10 w-10" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold">{r.t}</p>
              <p className="text-[9px] text-linkup-muted">{r.topic}</p>
            </div>
            <span className="flex items-center gap-0.5 text-[9px] text-linkup-cyan">
              <Mic size={9} /> {r.n}
            </span>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

function ConnectScreen() {
  return (
    <ScreenShell title="Connect">
      <div className="mb-3 flex gap-1.5 overflow-hidden text-[9px]">
        {['All', 'Serious Learners', 'Nearby', 'City'].map((f, i) => (
          <span key={f} className={`shrink-0 rounded-full px-2.5 py-1 ${i === 0 ? 'bg-linkup-purple font-semibold' : 'bg-white/10'}`}>
            {f}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl bg-linkup-surface">
        <div className="relative h-44 bg-gradient-to-br from-linkup-cyan via-linkup-purple to-linkup-magenta">
          <span className="absolute left-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px]">🇯🇵 Osaka · 3 km</span>
          <span className="absolute right-2 top-2 rounded-full bg-linkup-success/80 px-2 py-0.5 text-[9px]">● Online</span>
          <div className="absolute bottom-2 left-2">
            <p className="font-display text-lg font-bold">Sana, 24</p>
            <p className="text-[10px] text-white/80">INFP · ♓ Pisces · Designer</p>
          </div>
        </div>
        <div className="space-y-2 p-3 text-[10px]">
          <div className="flex items-center justify-between">
            <span>🇯🇵 Japanese</span>
            <span className="text-linkup-muted">Native</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🇺🇸 English</span>
            <span className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`h-1.5 w-3 rounded-full ${n <= 3 ? 'bg-linkup-cyan' : 'bg-white/15'}`} />
              ))}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {['Travel', 'Anime', 'Coffee', 'K-Pop'].map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[9px]">{t}</span>
            ))}
          </div>
          <p className="text-[9px] text-linkup-muted">Looking for: Friendship · Long-term</p>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg">✕</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-linkup-magenta to-linkup-orange">
          <Heart size={18} className="fill-white" />
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linkup-blue">
          <MessageCircle size={18} />
        </span>
      </div>
    </ScreenShell>
  );
}

function MomentsScreen() {
  return (
    <ScreenShell title="Moments">
      <div className="mb-3 flex justify-center gap-4 text-[11px]">
        <span className="border-b-2 border-linkup-purple pb-1 font-semibold">For You</span>
        <span className="text-linkup-muted">Following</span>
        <span className="text-linkup-muted">Shorts</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl bg-linkup-surface p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <Avatar seed={3} size="h-7 w-7" />
            <div>
              <p className="text-[10px] font-semibold">Lucía 🇪🇸</p>
              <p className="text-[8px] text-linkup-muted">2h · learning Japanese</p>
            </div>
          </div>
          <p className="mb-2 text-[10px]">Finally ordered ramen in Japanese without switching to English! 🍜</p>
          <div className="h-24 rounded-lg bg-gradient-to-br from-linkup-orange to-linkup-magenta" />
          <div className="mt-2 flex gap-4 text-[9px] text-linkup-muted">
            <span>❤️ 214</span><span>💬 38</span><span>🎁 12 gifts</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-linkup-surface p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <Avatar seed={6} size="h-7 w-7" />
            <p className="text-[10px] font-semibold">Dmitri 🇷🇺 <span className="ml-1 rounded bg-linkup-gold px-1 text-[8px] text-black">VIP</span></p>
          </div>
          <div className="flex h-20 flex-col items-center justify-center rounded-lg bg-white/5 text-[10px] backdrop-blur">
            <Lock size={16} className="mb-1 text-linkup-gold" />
            Unlock for 🪙 20
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function MessagesScreen() {
  return (
    <ScreenShell title="Jiho 🇰🇷">
      <div className="flex h-full flex-col gap-2 text-[10px]">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-linkup-surface p-2">
          <p>내일 같이 영어 연습할래요?</p>
          <p className="mt-1 flex items-center gap-1 border-t border-white/10 pt-1 text-[9px] text-linkup-cyan">
            <Languages size={9} /> Want to practice English together tomorrow?
          </p>
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-linkup-purple p-2">
          Yes! Let&apos;s meet in the Language Café room 🎙️
        </div>
        <div className="max-w-[85%] rounded-2xl border border-linkup-purple/40 bg-linkup-purple/10 p-2">
          <p className="flex items-center gap-1 font-semibold"><Radio size={10} /> Room invite</p>
          <p className="text-[9px] text-linkup-muted">Tokyo ⇄ LA Language Café · 248 listening</p>
        </div>
        <div className="ml-auto flex max-w-[80%] items-center gap-1 rounded-2xl rounded-tr-sm bg-white/10 p-2 text-white/70">
          <Timer size={10} className="text-linkup-orange" /> Self-destructs in 10s
        </div>
        <div className="mx-auto mt-1 rounded-full bg-white/5 px-3 py-1 text-[9px] text-linkup-muted">
          🎁 Unknown chats need a gift first
        </div>
      </div>
    </ScreenShell>
  );
}

function ProfileScreen() {
  return (
    <ScreenShell title="">
      <div className="-mt-6 text-center">
        <div className="relative mx-auto h-24 w-24">
          <div className="brand-gradient absolute inset-0 animate-spin rounded-full [animation-duration:6s]" />
          <div className="absolute inset-1 flex items-center justify-center rounded-full bg-linkup-bg">
            <Avatar seed={0} size="h-20 w-20" />
          </div>
        </div>
        <p className="mt-2 font-display text-base font-bold">Mika 🇯🇵</p>
        <p className="text-[10px] text-linkup-muted">@mika.voice</p>
        <div className="mt-2 flex justify-center gap-1.5">
          <img src="/assets/levels/gift/gift_lv_50-59.png" alt="Gift level 52" className="h-5" />
          <img src="/assets/levels/room/room_lv_12.png" alt="Room level 12" className="h-5" />
          <span className="rounded-full bg-gradient-to-r from-linkup-blue via-linkup-magenta to-linkup-orange px-2 text-[9px] font-bold leading-5">VIP-X</span>
        </div>
        <div className="mt-3 grid grid-cols-3 text-[10px]">
          <div><p className="font-bold">1.2k</p><p className="text-linkup-muted">Followers</p></div>
          <div><p className="font-bold">318</p><p className="text-linkup-muted">Following</p></div>
          <div><p className="flex items-center justify-center gap-0.5 font-bold"><Eye size={10} />96</p><p className="text-linkup-muted">Visitors</p></div>
        </div>
      </div>
      <p className="mb-1.5 mt-4 text-[10px] font-semibold">Gift Wall</p>
      <div className="grid grid-cols-5 gap-1.5">
        {['🚀', '🐉', '🌹', '👑', '🦄', '🎆', '💎', '🏰', '🌈', '🎸'].map((e, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-linkup-surface text-base">{e}</div>
        ))}
      </div>
      <p className="mb-1.5 mt-3 text-[10px] font-semibold">LINKs</p>
      <div className="flex gap-2">
        <span className="rounded-full bg-[#FF3CAC]/20 px-2 py-0.5 text-[9px] text-[#FF85A2]">💕 Couple · LV4</span>
        <span className="rounded-full bg-[#3B82F6]/20 px-2 py-0.5 text-[9px] text-[#93C5FD]">⭐ Bestie · LV2</span>
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
              {/* Bottom nav — mirrors LinkUpBottomNav order */}
              <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-white/10 bg-linkup-surface/95 py-2">
                {NAV_ORDER.map((id) => {
                  const Icon = TAB_ICONS[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setActive(id)}
                      aria-label={APP_TABS.find((t) => t.id === id).title}
                      className={active === id ? 'text-linkup-purple-light' : 'text-linkup-muted'}
                    >
                      <Icon size={18} />
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
