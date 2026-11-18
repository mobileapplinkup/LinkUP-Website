export function Logo({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label="LinkUp home">
      <img src="/assets/linkup_icon.png" alt="" className="h-9 w-auto rounded-lg" />
      <span className="font-display text-2xl font-extrabold tracking-tight">
        Link<span className="up-text">Up</span>
      </span>
    </a>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-linkup-cyan">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-linkup-muted">{subtitle}</p>}
    </div>
  );
}

/** Animated soundwave bars, echoing the logo's center mark. */
export function Soundwave({ bars = 5, className = '', barClass = 'w-1.5 bg-white' }) {
  const heights = [40, 70, 100, 70, 40, 60, 90, 55, 80, 45];
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`animate-wave origin-center rounded-full ${barClass}`}
          style={{ height: `${heights[i % heights.length]}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

/** Phone frame used for app screen mockups. */
export function Phone({ children, className = '' }) {
  return (
    <div
      className={`relative mx-auto w-[280px] rounded-[2.75rem] border border-white/15 bg-black p-2.5 shadow-2xl shadow-linkup-purple/30 ${className}`}
    >
      <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative h-[560px] overflow-hidden rounded-[2.25rem] bg-linkup-bg">{children}</div>
    </div>
  );
}

export function Avatar({ seed = 0, size = 'h-10 w-10', ring = '' }) {
  const palettes = [
    ['#00D4FF', '#1E90FF'], ['#FF3CAC', '#FF8C42'], ['#7C3AED', '#A855F7'],
    ['#22C55E', '#00D4FF'], ['#FF8C42', '#FFD700'], ['#A855F7', '#FF3CAC'],
    ['#1E90FF', '#7C3AED'], ['#FF85A2', '#FF3CAC'],
  ];
  const initials = ['MK', 'AY', 'JS', 'LC', 'RT', 'SN', 'DV', 'EO', 'HP', 'BW'];
  const [a, b] = palettes[seed % palettes.length];
  return (
    <div
      className={`${size} ${ring} flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      {initials[seed % initials.length]}
    </div>
  );
}

export const fmt = (n) => n.toLocaleString('en-US');
