#!/usr/bin/env node
// Writes public/sitemap.xml from the same route list vite.config.js prerenders,
// so a new case study or a new page never has to be added to the sitemap by
// hand in a second place and drift out of sync with what actually ships.
//
// Deliberately excludes /kit: it is dev-only (see routes.jsx and
// docs/plan/phase-02.md) and was never in ssgOptions.includedRoutes either.
// Also excludes /404, which vite.config.js does prerender but which must
// never be offered to a crawler as a real page.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { slugs } from '../src/data/work.js'

const here = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://rkade.co'

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  ...slugs.map((slug) => ({ path: `/work/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

const urlEntry = ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(urlEntry).join('\n')}
</urlset>
`

const outPath = join(here, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`\n  Wrote ${routes.length} routes to public/sitemap.xml\n`)
