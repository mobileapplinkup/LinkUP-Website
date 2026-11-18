import { APP } from '../data/linkupData.js';

function AppleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GooglePlayIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#00D4FF" d="M2.2 1.8C1.9 2.1 1.7 2.7 1.7 3.4v17.2c0 .7.2 1.3.5 1.6l.1.1L12 12.6v-.2L2.3 1.7l-.1.1z" />
      <path fill="#FFD86B" d="M15.2 15.8L12 12.6v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.6 0 2.2l-3.8 2.2-.1-.1z" />
      <path fill="#FF3CAC" d="M15.3 15.7L12 12.5 2.2 22.2c.4.4 1 .5 1.7.1l11.4-6.6z" />
      <path fill="#22C55E" d="M15.3 8.3L3.9 1.7c-.7-.4-1.3-.3-1.7.1L12 11.5l3.3-3.2z" />
    </svg>
  );
}

function AndroidApkIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#3DDC84"
        d="M17.523 15.341a.999.999 0 0 1-.999-1 .999.999 0 0 1 1-1 .999.999 0 0 1 .999 1 .999.999 0 0 1-1 1zm-11.046 0a.999.999 0 0 1-.999-1 .999.999 0 0 1 1-1 .999.999 0 0 1 .999 1 .999.999 0 0 1-1 1zm11.405-6.02 1.997-3.46a.416.416 0 0 0-.152-.567.416.416 0 0 0-.568.152L17.122 8.98a12.143 12.143 0 0 0-5.122-1.106c-1.844 0-3.59.403-5.122 1.106L4.841 5.446a.416.416 0 0 0-.568-.152.416.416 0 0 0-.152.567l1.997 3.46C2.688 11.186.343 14.658 0 18.76h24c-.344-4.102-2.688-7.574-6.118-9.439z"
      />
    </svg>
  );
}

export function StoreButtons({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={APP.appStoreUrl}
        className="inline-flex h-[54px] min-w-[180px] items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2 text-white shadow-lg transition hover:border-white/50 hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-linkup-cyan"
      >
        <AppleIcon className="h-7 w-7 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium tracking-tight text-white/85">Download on the</span>
          <span className="block font-display text-lg font-semibold leading-none tracking-tight">App Store</span>
        </span>
      </a>
      <a
        href={APP.playStoreUrl}
        className="inline-flex h-[54px] min-w-[180px] items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2 text-white shadow-lg transition hover:border-white/50 hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-linkup-cyan"
      >
        <GooglePlayIcon className="h-7 w-7 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-white/85">GET IT ON</span>
          <span className="block font-display text-lg font-semibold leading-none tracking-tight">Google Play</span>
        </span>
      </a>
      <a
        href={APP.apkUrl}
        download={APP.apkFilename}
        className="inline-flex h-[54px] min-w-[180px] items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2 text-white shadow-lg transition hover:border-[#3DDC84]/60 hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-linkup-cyan"
      >
        <AndroidApkIcon className="h-7 w-7 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-white/85">DIRECT DOWNLOAD</span>
          <span className="block font-display text-lg font-semibold leading-none tracking-tight">Android APK</span>
        </span>
      </a>
    </div>
  );
}

export function DownloadContent() {
  return (
    <div className="text-center">
      <img src="/assets/linkup_logo.jpg" alt="LinkUp logo" className="mx-auto mb-5 h-40 w-40 rounded-3xl" />
      <p className="mb-6 text-linkup-muted">
        LinkUp is available for iPhone and Android. Join voice rooms, meet people worldwide, and start sharing.
      </p>
      <StoreButtons className="justify-center" />
      <p className="mt-6 text-xs text-linkup-muted">
        Android package: <code className="text-white/70">{APP.androidPackage}</code>
      </p>
    </div>
  );
}
