import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './ui.jsx';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#links', label: 'LINK & Fanclubs' },
  { href: '#pricing', label: 'VIP & Pricing' },
  { href: '#safety', label: 'Safety' },
];

export default function Navbar({ onDownload }) {
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
          <button
            onClick={() => {
              setOpen(false);
              onDownload();
            }}
            className="btn-primary mt-3 w-full"
          >
            Get the App
          </button>
        </div>
      )}
    </header>
  );
}
