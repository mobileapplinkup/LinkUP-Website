import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqData.js';
import { SectionHeader } from './ui.jsx';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Everything about <span className="brand-text">LinkUp.</span></>}
          subtitle="Answers about live voice rooms, gift rooms, video streaming, international & local dating, and language exchange."
        />
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="card overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="text-base font-bold sm:text-lg">{item.q}</h3>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-linkup-muted transition-transform ${isOpen ? 'rotate-180 text-white' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.06] px-6 pb-5 pt-4 text-sm leading-relaxed text-linkup-muted">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
