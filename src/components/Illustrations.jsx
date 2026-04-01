export function WorkerIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="artwork-svg" aria-hidden="true">
      <defs>
        <linearGradient id="workerBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#2cc766" />
          <stop offset="100%" stopColor="#0b8f44" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" rx="36" fill="url(#workerBg)" />
      <circle cx="260" cy="56" r="52" fill="rgba(255,255,255,.14)" />
      <circle cx="74" cy="170" r="86" fill="rgba(255,255,255,.08)" />
      <path d="M158 68c16 0 29 13 29 29v17c0 7-3 14-8 19l-16 16h-30l-16-16a27 27 0 0 1-8-19V97c0-16 13-29 29-29Z" fill="#f1c38e" />
      <path d="M132 155h32c28 0 50 22 50 50v15H82v-15c0-28 22-50 50-50Z" fill="#113823" />
      <path d="M118 90c3-24 18-36 42-36 17 0 30 6 39 18l-6 10-9-8c-7 6-18 10-35 11l-8 14-23-9Z" fill="#0d2015" />
      <circle cx="205" cy="149" r="26" fill="#ffffff" fillOpacity=".94" />
      <path d="m194 152 11-11 4 4-11 11Z" fill="#0b8f44" />
      <path d="m208 138 8 8-4 4-8-8Z" fill="#164c2e" />
      <path d="M201 154 188 167" stroke="#164c2e" strokeWidth="6" strokeLinecap="round" />
      <rect x="38" y="28" width="88" height="28" rx="14" fill="rgba(255,255,255,.16)" />
      <text x="54" y="46" fill="#ffffff" fontSize="14" fontWeight="700" fontFamily="Avenir Next, sans-serif">
        Tez yordam
      </text>
    </svg>
  );
}

export function SupportIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="artwork-svg" aria-hidden="true">
      <defs>
        <linearGradient id="supportBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#dff4e5" />
          <stop offset="100%" stopColor="#f8fbf8" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" rx="34" fill="url(#supportBg)" />
      <circle cx="256" cy="48" r="42" fill="#22c55e" fillOpacity=".12" />
      <circle cx="62" cy="34" r="24" fill="#ff8b7c" fillOpacity=".18" />
      <circle cx="160" cy="94" r="44" fill="#ffffff" />
      <path d="M122 152c9-28 29-42 60-42s51 14 60 42" fill="#3e5f49" fillOpacity=".18" />
      <path d="M144 72c5-19 17-28 35-28s30 9 35 28l-8 13v18c0 6-5 11-11 11h-46c-6 0-11-5-11-11V85Z" fill="#f0c18b" />
      <path d="M141 80c8-24 23-36 45-36 20 0 35 11 43 33l-12 8-12-10c-8 6-20 9-37 11l-8 13-19-19Z" fill="#41525d" />
      <path d="M122 95a15 15 0 0 1 15-15h4v40h-4a15 15 0 0 1-15-15v-10Zm76-15h4a15 15 0 0 1 15 15v10a15 15 0 0 1-15 15h-4" fill="#22c55e" fillOpacity=".26" />
      <rect x="182" y="112" width="22" height="14" rx="7" fill="#22c55e" />
      <path d="M193 119c6 0 11 5 11 11v7" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function MapArtwork() {
  return (
    <svg viewBox="0 0 320 180" className="artwork-svg" aria-hidden="true">
      <rect width="320" height="180" rx="28" fill="#edf2ed" />
      <path d="M0 138 62 92l54 18 65-44 54 40 85-68" fill="none" stroke="#d2dbd2" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-10 114 46 78l62 22 70-40 58 38 98-74" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="185" cy="86" r="28" fill="#ffffff" />
      <path d="M185 112s24-21.7 24-44a24 24 0 1 0-48 0c0 22.3 24 44 24 44Z" fill="#9aa99d" />
      <circle cx="185" cy="68" r="9" fill="#ffffff" />
      <rect x="18" y="140" width="128" height="24" rx="12" fill="#ffffff" />
      <text x="32" y="156" fill="#5d6d62" fontSize="12" fontWeight="700" fontFamily="Avenir Next, sans-serif">
        HOZIRGI JOYLASHUV: TOSHKENT
      </text>
    </svg>
  );
}

export function PortraitAvatar({ size = 76, variant = 'emerald' }) {
  const palettes = {
    emerald: { background: '#122118', face: '#d3a06d', collar: '#1c6f3e', accent: '#f0f7f1' },
    amber: { background: '#151e28', face: '#cb9967', collar: '#72512c', accent: '#fbf3de' },
    slate: { background: '#1a252f', face: '#d3a97a', collar: '#355f73', accent: '#eef5f8' },
  };
  const palette = palettes[variant] ?? palettes.emerald;

  return (
    <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="48" fill={palette.background} />
      <path d="M31 74c5-16 16-24 33-24 16 0 27 8 32 24" fill={palette.collar} />
      <path d="M36 33c2-14 11-21 28-21 12 0 22 4 30 14l-6 8-8-6c-6 5-14 7-28 8l-6 9-10-12Z" fill="#0b1115" />
      <path d="M51 24c12 0 21 9 21 21v8c0 9-7 16-16 16H46c-9 0-16-7-16-16v-8c0-12 9-21 21-21Z" fill={palette.face} />
      <circle cx="73" cy="27" r="10" fill={palette.accent} fillOpacity=".12" />
    </svg>
  );
}
