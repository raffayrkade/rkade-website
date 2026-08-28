import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { slugs } from './src/data/work.js'

/**
 * The comments in index.html explain why the <head> is deliberately almost
 * empty, and they name real source paths to do it. Those paths are useful in
 * the repo and pointless in production, where they were being copied verbatim
 * into all twelve prerendered pages and showing up in view-source. Flagged in
 * the 19-08-2026 audit, item S5.
 *
 * Stripped at build time rather than deleted from the source, so the
 * explanation stays where the next person editing index.html will read it.
 * Dev is left alone: the comments are the whole point while working.
 */
const stripHtmlComments = () => ({
  name: 'strip-html-comments',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml: (html) => html.replace(/<!--[\s\S]*?-->/g, ''),
})

export default defineConfig({
  plugins: [react(), stripHtmlComments()],
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
      // The business card QR destination. Prerendered so a scan gets a real
      // 200 with its own OG tags (WhatsApp's link preview never runs JS).
      // Deliberately absent from generate-sitemap.mjs and noindexed: it is
      // for people holding a card, not for search.
      '/links',
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
