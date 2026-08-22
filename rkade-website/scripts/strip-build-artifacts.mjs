import { rm, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

/**
 * Removes build-time artefacts from dist/ before it is deployed.
 *
 * Netlify serves whatever is in dist/, so anything left there is a live URL
 * whether or not the site links to it. That is the same trap as the unused
 * files found in public/ on 18-08-2026, see docs/GOTCHAS.md.
 *
 * `dist/.vite/ssr-manifest.json` is a 29KB map naming every source file in
 * the project. It is consumed by the prerenderer during the build and by
 * nothing at all in the browser, but it was being published at
 * /.vite/ssr-manifest.json. Found 22-08-2026 while fixing audit item S5,
 * which had spotted the smaller version of the same problem: two developer
 * comments in the prerendered <head>.
 */

const dist = path.resolve(fileURLToPath(new URL('../dist', import.meta.url)))

// Build-time only. Nothing the browser requests may go on this list.
const ARTEFACTS = ['.vite']

let removed = 0
for (const entry of ARTEFACTS) {
  const target = path.join(dist, entry)
  try {
    await access(target)
  } catch {
    continue
  }
  await rm(target, { recursive: true, force: true })
  console.log(`[strip-build-artefacts] removed dist/${entry}`)
  removed += 1
}

if (removed === 0) console.log('[strip-build-artefacts] nothing to remove')
