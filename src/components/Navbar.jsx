import { useEffect, useState } from 'react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Logo, fmt } from './ui.jsx';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#links', label: 'LINK & Fanclubs' },
  { href: '#topup', label: 'Top Up' },
  { href: '#pricing', label: 'VIP & Pricing' },
  { href: '#safety', label: 'Safety' },
];

export default function Navbar({ onDownload, onOpenAuth }) {
  const { user, profile, tokens, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-white/70 transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 sm:flex">
              <span className="max-w-[110px] truncate text-xs font-semibold text-white">
                {profile?.name || user.displayName || user.email}
              </span>
              <span className="rounded-lg bg-linkup-gold/15 px-2 py-0.5 text-xs font-bold text-linkup-gold">
                🪙 {fmt(tokens)}
              </span>
              <button
                onClick={signOut}
                title="Sign out"
                aria-label="Sign out"
                className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn-ghost hidden px-4 py-2 text-sm sm:inline-flex">
              <LogIn size={15} /> Sign In
            </button>
          )}
          <button onClick={onDownload} className="btn-primary hidden px-5 py-2 text-sm sm:inline-flex">
            Get the App
          </button>
          <button
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass border-x-0 px-5 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-white/80 hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="btn-ghost w-full justify-between text-sm"
              >
                <span className="truncate">{profile?.name || user.email} · 🪙 {fmt(tokens)}</span>
                <span className="inline-flex items-center gap-1 text-xs text-white/70"><LogOut size={14} /> Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenAuth();
                }}
                className="btn-ghost w-full"
              >
                <LogIn size={16} /> Sign In
              </button>
            )}
            <button
              onClick={() => {
                setOpen(false);
                onDownload();
              }}
              className="btn-primary w-full"
            >
              Get the App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
