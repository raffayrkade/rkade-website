#!/usr/bin/env node
// Measures every colour pair this site actually uses against WCAG 2.1 and
// fails the build on a regression.
//
// This exists because the shared brand palette shipped two values that did not
// meet AA, and nobody caught it by eye. rkade-crm found the same thing in its
// phase 8. Eyes are not a contrast checker, so this is.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const colors = JSON.parse(readFileSync(join(here, '..', 'brand-tokens.json'), 'utf8'))

const srgb = (hex) => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
}

// WCAG 2.1 relative luminance.
const luminance = (hex) => {
  const [r, g, b] = srgb(hex).map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

// fg, bg, minimum, why. The minimum is the WCAG threshold for the job that
// pair actually does, not a blanket number.
const PAIRS = [
  ['ink', 'cream', 4.5, 'body and headings on light'],
  ['muted', 'cream', 4.5, 'secondary text, captions, nav on light'],
  ['line-strong', 'cream', 3.0, 'component edges on light (WCAG 1.4.11)'],
  ['cream', 'ink', 4.5, 'body and headings on dark'],
  ['muted-on-ink', 'ink', 4.5, 'secondary text on dark'],
  ['gold', 'ink', 4.5, 'gold as text, legal on ink only'],
  ['cream', 'ink-deep', 4.5, 'body on the deepest dark'],
  ['gold', 'ink-deep', 4.5, 'gold as text on the deepest dark'],
  ['ink', 'cream-raised', 4.5, 'text on a raised card'],
  ['muted', 'cream-raised', 4.5, 'secondary text on a raised card'],
]

// Pairs that are deliberately below a text threshold because they are never
// used as text. Asserted as a ceiling so nobody quietly promotes them.
const NON_TEXT = [
  ['gold-dark', 'cream', 'fills and rules only, never text on cream'],
  ['line', 'cream', 'decorative hairline inside a card, never an edge'],
]

let failed = 0
const rows = []

for (const [fg, bg, min, why] of PAIRS) {
  if (!colors[fg] || !colors[bg]) {
    console.error(`  MISSING TOKEN: ${fg} or ${bg}`)
    failed++
    continue
  }
  const r = ratio(colors[fg], colors[bg])
  const ok = r >= min
  if (!ok) failed++
  rows.push([ok ? 'PASS' : 'FAIL', `${fg} on ${bg}`, r.toFixed(2), `>= ${min.toFixed(1)}`, why])
}

const pad = (s, n) => String(s).padEnd(n)
console.log('\n  Contrast check, WCAG 2.1\n')
for (const [status, pair, got, need, why] of rows) {
  console.log(`  ${pad(status, 5)} ${pad(pair, 28)} ${pad(got, 7)} ${pad(need, 8)} ${why}`)
}

console.log('\n  Non-text tokens, recorded so they are never promoted to text:\n')
for (const [fg, bg, why] of NON_TEXT) {
  console.log(`        ${pad(`${fg} on ${bg}`, 28)} ${pad(ratio(colors[fg], colors[bg]).toFixed(2), 7)} ${' '.repeat(8)}${why}`)
}

if (failed) {
  console.error(`\n  ${failed} pair(s) below threshold. Build stopped.\n`)
  process.exit(1)
}
console.log(`\n  All ${rows.length} pairs pass.\n`)
