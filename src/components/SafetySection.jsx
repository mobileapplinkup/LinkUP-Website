import { BadgeCheck, CreditCard, FileText, LifeBuoy, ShieldCheck, Smartphone, UserX, Flag } from 'lucide-react';
import { SectionHeader } from './ui.jsx';

const TRUST = [
  { icon: BadgeCheck, color: 'text-linkup-success', title: 'Veriff age verification', body: 'Identity and age checks through Veriff before creators can cash out, plus a verified badge on profiles.' },
  { icon: CreditCard, color: 'text-linkup-diamond', title: 'Secure payouts', body: 'Creator payouts are set up through Stripe. Purchases go through the App Store and Google Play.' },
  { icon: Smartphone, color: 'text-linkup-cyan', title: 'App & device integrity', body: 'Firebase App Check and device checks help stop bots, fake accounts, and tampered apps.' },
  { icon: Flag, color: 'text-linkup-orange', title: 'Reporting & moderation', body: 'Report or block anyone in a room, chat, or profile. Hosts and moderators manage their own rooms.' },
];

const DOC_LINKS = [
  { id: 'privacy', icon: ShieldCheck, label: 'Privacy Policy' },
  { id: 'terms', icon: FileText, label: 'Terms of Service' },
  { id: 'safety', icon: Flag, label: 'Community & Safety' },
  { id: 'support', icon: UserX, label: 'Support & Account Deletion' },
];

export default function SafetySection({ onOpenDoc }) {
  return (
    <section id="safety" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Trust & safety"
          title={<>Safe spaces to <span className="brand-text">speak up.</span></>}
          subtitle="Tools and policies that keep LinkUp friendly, fair, and secure."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linkup-surface-light">
                <Icon className={color} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-linkup-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="card mt-10 flex flex-col items-start justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <LifeBuoy className="mt-1 shrink-0 text-linkup-purple-light" size={28} />
            <div>
              <h3 className="text-xl font-bold">Policies & help center</h3>
              <p className="mt-1 text-sm text-linkup-muted">Read our policies, get support, or request account deletion.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {DOC_LINKS.map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => onOpenDoc(id)} className="btn-ghost px-4 py-2 text-sm">
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
