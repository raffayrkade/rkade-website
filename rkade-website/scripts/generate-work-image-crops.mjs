#!/usr/bin/env node
// One-off derivative crops for two of the phase 4 unit D screenshots.
//
// metro-storefront-certified.webp was captured mid scroll-transition: the
// bottom half has two layers of overlay copy ghosted on top of each other
// (see the source file), which reads as garbled text once shrunk to card
// size. The top half, three clean grading-report cards, is exactly the part
// the case study needs and has no overlap.
//
// rkade-crm-pipeline.webp's deal board (the cards below the KPI row) carries
// invented-but-plausible company and contact names. The image-generation log
// already flags one earlier capture that had to be redone for exactly this
// reason (a real client name, "Altin Jewellers"), so this crop keeps only
// the KPI header strip, RKade's own pipeline numbers, and drops every deal
// card rather than trust a second read of names that look like seed data.
//
// Run once, from rkade-website/rkade-website: node scripts/generate-work-image-crops.mjs

import sharp from 'sharp'
import { existsSync } from 'node:fs'

const jobs = [
  {
    in: '../docs/history/build-assets/metro-storefront-certified.webp',
    out: 'public/work/metro-storefront-certified-card.webp',
    crop: { left: 0, top: 0, width: 1440, height: 410 },
  },
  {
    // Source lives outside public/ on purpose. An unreferenced file in public/
    // still deploys and is still a live URL, so the uncropped capture was moved
    // to docs/history/retired-images/ rather than left sitting next to the crop.
    in: '../docs/history/retired-images/rkade-crm-pipeline-uncropped.webp',
    out: 'public/work/rkade-crm-pipeline-card.webp',
    crop: { left: 0, top: 0, width: 1360, height: 320 },
  },
]

for (const job of jobs) {
  if (!existsSync(job.in)) {
    console.error(`Missing source: ${job.in}`)
    process.exit(1)
  }
  await sharp(job.in).extract(job.crop).webp({ quality: 92 }).toFile(job.out)
  console.log(`Wrote ${job.out} (${job.crop.width}x${job.crop.height})`)
}
