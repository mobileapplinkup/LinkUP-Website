/** @type {import('tailwindcss').Config} */
// Colors mirror LinkUpColors in voiceroom/lib/config/theme.dart
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linkup: {
          bg: '#0A0A1A',
          surface: '#121228',
          'surface-light': '#1A1A3E',
          muted: '#7A8199',
          purple: '#7C3AED',
          'purple-light': '#A855F7',
          cyan: '#00D4FF',
          blue: '#1E90FF',
          magenta: '#FF3CAC',
          pink: '#FF85A2',
          orange: '#FF8C42',
          gold: '#FFD700',
          diamond: '#60A5FA',
          success: '#22C55E',
          error: '#EF4444',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slidein: {
          '0%': { transform: 'translateX(-110%)', opacity: '0' },
          '15%, 85%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(110%)', opacity: '0' },
        },
        fadeup: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        wave: 'wave 1.2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        slidein: 'slidein 5s ease-in-out infinite',
        fadeup: 'fadeup 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
