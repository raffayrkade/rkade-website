#!/usr/bin/env node
// Proves every route prerenders to real, readable HTML.
//
// The site uses vite-react-ssg, so each route is written out as a static file
// at build time. If a component touches `window` at module scope the build
// still succeeds but the page renders blank, and nothing else catches that.
// This does.
//
//   npm run verify:routes -- /,/services,/about,/contact

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dist = join(here, '..', 'dist')

const routes = (process.argv[2] || '/,/services,/about,/contact')
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)

const fileFor = (route) =>
  join(dist, route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`)

const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const MIN_TEXT = 400 // a real page, not a shell

let failed = 0
const pad = (s, n) => String(s).padEnd(n)
console.log('\n  Route prerender check\n')

for (const route of routes) {
  const file = fileFor(route)
  const problems = []

  if (!existsSync(file)) {
    problems.push('no prerendered file')
  } else {
    const html = readFileSync(file, 'utf8')
    const text = textOf(html)
    if (text.length < MIN_TEXT) problems.push(`only ${text.length} chars of text`)
    if (!/<h1[\s>]/i.test(html)) problems.push('no <h1>')
    if (!/<title>[^<]+<\/title>/i.test(html)) problems.push('no <title>')
    if (/data-server-rendered-error|Application error/i.test(html)) problems.push('render error marker')
    var chars = text.length
  }

  const ok = problems.length === 0
  if (!ok) failed++
  console.log(
    `  ${pad(ok ? 'PASS' : 'FAIL', 5)} ${pad(route, 12)} ${pad(ok ? `${chars} chars` : '', 14)}${problems.join(', ')}`,
  )
}

if (failed) {
  console.error(`\n  ${failed} route(s) did not prerender to real content.\n`)
  process.exit(1)
}
console.log(`\n  All ${routes.length} routes prerender to real content.\n`)
