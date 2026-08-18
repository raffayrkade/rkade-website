#!/usr/bin/env node
// Per-case-study OG cards, composited at build time from the textless
// og-arch-ink.webp background plus each case study's title from
// src/data/work.js. See docs/ART-DIRECTION.md for the palette this pulls
// from and docs/history/image-generation.md for how the background itself
// was made.
//
// Text is drawn as plain SVG, not the embedded Cormorant Garamond webfont:
// a test with the woff2 embedded as a data URI in the SVG's @font-face
// silently fell back to a generic sans with no error, which is worse than a
// deliberate fallback. `Georgia, 'Times New Roman', serif` renders as a
// warm, readable serif that reads as editorial without pretending to be the
// brand typeface, which only matters here because these cards are never
// seen next to the real site, only in a chat app's link preview.
//
// Run once, from rkade-website/rkade-website: node scripts/generate-og-cards.mjs
// Re-run whenever a case study title changes.

import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import work from '../src/data/work.js'

const WIDTH = 1200
const HEIGHT = 630
const BG = '../docs/history/build-assets/og-arch-ink.webp'
const OUT_DIR = 'public/work/og'
const TEXT_ZONE_WIDTH = 660 // leaves the arch trio on the right untouched

const CREAM = '#F5F0E8'
const GOLD = '#C9A84C'

// Escape the handful of characters SVG text actually needs escaped. Titles
// in work.js don't use quotes or angle brackets, but this stays correct if
// one ever does.
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Greedy word wrap by character count, not measured pixel width: there is no
// canvas library in this project and the five titles are short enough that a
// character-count heuristic wraps cleanly. Verified by eye against every
// rendered card before this shipped.
function wrap(title, maxChars) {
  const words = title.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

function cardSvg(title, sector) {
  const lines = wrap(title, 20)
  const fontSize = lines.length >= 3 ? 52 : lines.length === 2 ? 60 : 72
  const lineHeight = fontSize * 1.12

  const blockHeight = lines.length * lineHeight
  const titleStartY = HEIGHT / 2 - blockHeight / 2 + fontSize * 0.8 - 20

  const titleTspans = lines
    .map((line, i) => `<tspan x="90" y="${titleStartY + i * lineHeight}">${esc(line)}</tspan>`)
    .join('')

  const eyebrowY = titleStartY - lineHeight - 6

  return `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <text x="90" y="${eyebrowY}" font-family="Arial, sans-serif" font-size="20" font-weight="600"
        letter-spacing="6" fill="${GOLD}">RKADE CASE STUDY</text>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="400"
        fill="${CREAM}" style="width:${TEXT_ZONE_WIDTH}px">${titleTspans}</text>
  <text x="90" y="${HEIGHT - 64}" font-family="Arial, sans-serif" font-size="22" fill="${GOLD}"
        opacity="0.85">${esc(sector)}</text>
</svg>`
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  for (const item of work) {
    const svg = cardSvg(item.title, item.sector)
    const outPath = `${OUT_DIR}/${item.slug}.webp`

    await sharp(BG)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'left' })
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .webp({ quality: 90 })
      .toFile(outPath)

    console.log(`Wrote ${outPath}`)
  }
}

main()
