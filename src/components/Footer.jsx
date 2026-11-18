import { Mail } from 'lucide-react';
import { APP } from '../data/linkupData.js';
import { Logo, Soundwave } from './ui.jsx';
import { StoreButtons } from './Download.jsx';

export default function Footer({ onOpenDoc }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-12 border-t border-white/10">
      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="brand-gradient relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
          <Soundwave bars={10} className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-24 justify-center opacity-20" barClass="w-3 bg-white" />
          <h2 className="relative text-3xl font-extrabold sm:text-5xl">Your voice belongs here.</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/90">Download LinkUp and join a room in seconds. It&apos;s free.</p>
          <StoreButtons className="relative mt-8 justify-center" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-linkup-muted">{APP.tagline} Live voice rooms, language exchange, and a creator economy in one app.</p>
          <a href={`mailto:${APP.supportEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Mail size={15} /> {APP.supportEmail}
          </a>
        </div>
        <FooterCol title="Product" links={[['#features', 'Features'], ['#links', 'LINK & Fanclubs'], ['#pricing', 'VIP & Pricing']]} />
        <FooterCol title="Legal" docs={[['privacy', 'Privacy Policy'], ['terms', 'Terms of Service'], ['safety', 'Community & Safety']]} onOpenDoc={onOpenDoc} />
        <FooterCol title="Support" docs={[['support', 'Help Center'], ['support', 'Delete my account']]} onOpenDoc={onOpenDoc} />
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-linkup-muted">
        © {year} LinkUp. All rights reserved. Apple and the App Store are trademarks of Apple Inc. Google Play is a trademark of Google LLC.
      </div>
    </footer>
  );
}

function FooterCol({ title, links = [], docs = [], onOpenDoc }) {
  return (
    <div>
      <p className="mb-3 font-display font-semibold">{title}</p>
      <ul className="space-y-2 text-sm text-linkup-muted">
        {links.map(([href, label]) => (
          <li key={label}><a href={href} className="hover:text-white">{label}</a></li>
        ))}
        {docs.map(([id, label]) => (
          <li key={label}><button onClick={() => onOpenDoc(id)} className="hover:text-white">{label}</button></li>
        ))}
      </ul>
    </div>
  );
}
