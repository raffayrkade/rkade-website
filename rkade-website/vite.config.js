import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { slugs } from './src/data/work.js'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    includedRoutes: async () => [
      '/',
      '/work',
      ...slugs.map((slug) => `/work/${slug}`),
      '/services',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      // Not a route in routes.jsx: '/404' falls through to the '*' catch-all
      // and so prerenders NotFound to dist/404.html. public/_redirects then
      // serves that file with a real 404 status for any unknown URL. Without
      // it every bad URL returned 200 with a byte-identical copy of the
      // homepage, which Google reads as a soft 404 across an unbounded set
      // of paths. Found in the deploy preview #9 audit, 18-08-2026.
      '/404',
    ],
  },
})
