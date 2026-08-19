#!/usr/bin/env node
// The iOS home-screen icon, rendered from public/favicon.svg so there is only
// ever one drawing of the arch mark to keep in sync.
//
// iOS ignores <link rel="icon"> SVGs entirely and falls back to a screenshot
// of the page when no apple-touch-icon is declared, which is why this exists
// as a real 180x180 PNG. 180 is the size current iPhones ask for; iOS scales
// it down for every smaller slot itself.
//
// The source SVG already paints its own ink background, so the PNG comes out
// fully opaque. That matters: iOS composites a transparent icon onto black,
// which would put the gold mark on a background that appears nowhere in the
// brand.
//
// Run from rkade-website/rkade-website: node scripts/generate-apple-touch-icon.mjs
// Re-run only if favicon.svg changes.

import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const SIZE = 180
const SRC = 'public/favicon.svg'
const OUT = 'public/apple-touch-icon.png'

const svg = readFileSync(SRC)

const { width, height, channels } = await sharp(svg, { density: 384 })
  .resize(SIZE, SIZE)
  .flatten({ background: '#2C2218' })
  .png({ compressionLevel: 9 })
  .toFile(OUT)
  .then(async (info) => ({ ...info, ...(await sharp(OUT).metadata()) }))

console.log(`\n  Wrote ${OUT} at ${width}x${height}, ${channels} channels\n`)
