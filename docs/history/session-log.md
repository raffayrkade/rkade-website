# Session log

Checkpoint-style, one entry per meaningful change, not a full transcript.
Newest last.

---

## 18-08-2026, phase 1: foundation and brand truth

Built and verified locally. Not pushed, not deployed.

- Fonts swapped to Cormorant Garamond and Montserrat, old Inter and Bricolage
  removed. Weights limited to 300/400/600 and 300/500.
- Colour moved into `rkade-website/brand-tokens.json`, the single source read
  by both Tailwind and the contrast checker. Zero raw hex left in `src/`.
- `warmgrey` to `muted`, `divider` split into `line` and `line-strong`,
  `offcream` deleted, `cream-elevated` to `cream-raised`.
- `npm run check:contrast` added and wired into `npm run build`. Proved it
  fails on a deliberate regression and passes when restored.
- `npm run verify:routes` added. All four routes prerender to real HTML.
- Corners to 2px everywhere except the two status dots. Section padding to
  `py-28 md:py-36`. Named type scale added and applied.
- Six illegal gold-on-cream text usages fixed, two by re-solving them as
  italic and as gold underlines rather than flattening the accent.
- Arch mark traced from the PDF and measured to under a pixel. Comparison at
  `docs/brand/arch-mark-trace-comparison.png`, waiting on sign-off.
- Favicon rebuilt with real Cormorant outlines. First ever OG image added.
- `rkade-website - Updated Colors/` retired into `docs/history/`.
- Screenshots of all four routes at 390px and 1440px in `docs/brand/shots/`.

## 18-08-2026, phase 2: the arch system

Built and verified locally. Not pushed, not deployed. No real page changed.

- `geometry.js` holds the arch maths in one place, measured off the reference
  rather than eyeballed. It reproduces the traced logo path exactly.
- `<Arch>` is the parametric primitive: legs, semicircular crown, open bottom,
  optional taper. Filled, not stroked, because a taper changes width.
- `<ArchTrio>` composes three of them. Deliberately not called ArchMark.
- `useArchDraw` binds draw progress to scroll, in `once` and `linked` modes,
  and returns a constant 1 under reduced motion.
- `<ArchFrame>` and `<ArchPassage>`. The passage is capped at three uses site
  wide and phase 3 picks them.
- `Reveal` now rises into an arch-shaped opening, with the same call signature,
  so its thirty-odd call sites needed no edits.
- `<Counter>` and `<RuleSweep>` added. `ScrollProgress` and `Marquee` now
  handle reduced motion properly, which they did not.
- `<Section>` owns tone, gutter and padding, and warns in dev when two sections
  of the same tone touch.
- Header now reads on ink as well as cream, via a tone declared by the page.
- A dev-only `/kit` route at three widths, in both tones, with and without
  reduced motion. Production still builds exactly four pages.

Three real bugs, all found by looking at the rendered kit:

1. A bare `-60px` in-view margin insets all four sides, so a narrow element in
   the mobile gutter never triggered. It stranded a counter at 0 forever.
2. `ArchFrame` was sized off container width, so it overflowed its own section
   and bled into the one above.
3. A `1 1` dash pattern left a one-pixel tick at draw progress 0.

## 18-08-2026, phase 3: homepage

Built and verified locally. Not pushed, not deployed.

- The homepage is a passage now: ink hero, ink proof strip, cream problem, ink
  tiers, cream why, cream industries, ink-deep process, ink close. Two of those
  adjacencies share a tone on purpose, because the strip is the hero's evidence
  and industries is a footnote to why, not new arguments.
- Hero is dark for the first time, with the arch trio full bleed behind it on
  three parallax layers. The old HeroArt tile is gone.
- The proof strip publishes four numbers, each sourced to a project folder in a
  comment. A fifth was dropped rather than guessed.
- The tier centrepiece: the mark builds itself one arch at a time as you scroll,
  each arch labelling one tier, and the free audit says so on the first arch.
- The problem is rows with large numerals, not a card grid.
- How it works is on ink-deep, used exactly once, with a gold rail that draws.
- Both base44 CDN images deleted. Zero third-party images remain.

Still open: Selected Work needs phase 4's case studies, and the hero's "See the
work" link points at /work, which phase 4 creates.
