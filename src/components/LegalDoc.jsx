import { LEGAL_DOCS, LEGAL_META } from '../data/legalContent.js';

export default function LegalDoc({ id, onSwitch }) {
  const doc = LEGAL_DOCS.find((d) => d.id === id) ?? LEGAL_DOCS[0];
  return (
    <div>
      <div role="tablist" className="mb-6 flex flex-wrap gap-1.5 rounded-xl bg-linkup-bg p-1">
        {LEGAL_DOCS.map((d) => (
          <button key={d.id} role="tab" aria-selected={d.id === doc.id} onClick={() => onSwitch(d.id)} className={`tab px-3 py-1.5 text-xs ${d.id === doc.id ? 'tab-active' : ''}`}>
            {d.title}
          </button>
        ))}
      </div>
      <h3 className="text-2xl font-bold">{doc.title}</h3>
      <p className="mb-6 mt-1 text-xs text-linkup-muted">Effective {LEGAL_META.effectiveDate}</p>
      <div className="space-y-6">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h4 className="mb-2 text-base font-semibold">{s.h}</h4>
            {s.p?.map((t) => (
              <p key={t} className="mb-2 whitespace-pre-line text-sm leading-relaxed text-white/75">{t}</p>
            ))}
            {s.list && (
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-white/75 marker:text-linkup-purple-light">
                {s.list.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
