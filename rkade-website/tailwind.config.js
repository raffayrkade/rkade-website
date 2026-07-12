/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-elevated': '#EDE4D3',
        ink: '#2C2218',
        gold: '#C9A84C',
        warmgrey: '#8A7060',
        divider: '#D4C5A9',
        offcream: '#C4B5A0',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
