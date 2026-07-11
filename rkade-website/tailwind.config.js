/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#0A0A0F',
        'graphite-elevated': '#14141A',
        cobalt: '#1E5EFF',
        'cool-gray': '#8A8A93',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
