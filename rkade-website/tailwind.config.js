/** @type {import('tailwindcss').Config} */

// Colour lives in brand-tokens.json so Tailwind and
// scripts/check-contrast.mjs read the exact same values. This package is
// "type": "module", so the config below only loads through Tailwind's own
// jiti loader, which is why the checker cannot simply import it.
// No component in src/ may carry a raw hex.
//
// Three values are corrections, not preferences. The old muted #8A7060
// measured 4.07:1 on cream and failed AA. The old divider #D4C5A9 measured
// 1.50:1 and was doing two different jobs. Both are gone.
const colors = require('./brand-tokens.json')

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      // Named roles so later phases stop hand-writing
      // `text-4xl sm:text-5xl lg:text-6xl`. Sizes, line heights and tracking
      // come from docs/ART-DIRECTION.md and are not invented here.
      fontSize: {
        hero: ['clamp(3.25rem, 8.5vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '300' }],
        section: ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '300' }],
        card: ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.2', fontWeight: '400' }],
        stat: ['clamp(2.75rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '300' }],
        'body-lg': ['17px', { lineHeight: '1.75', fontWeight: '300' }],
        body: ['15px', { lineHeight: '1.8', fontWeight: '300' }],
        label: ['11px', { lineHeight: '1.4', letterSpacing: '0.3em', fontWeight: '500' }],
        button: ['13px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      // Corners are 2px. The only genuinely round things on this site are
      // arches and the small status dots, which keep `rounded-full`.
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        '3xl': '2px',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      transitionTimingFunction: {
        passage: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
