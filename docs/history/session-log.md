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

## 18-08-2026, arch mark approved, and phase 4

- **Arch mark approved by Raffay.** The full lockup now ships in the header and
  footer, the favicon is the mark, and the SVG was handed to rkade-crm, closing
  its open item O.1 which had been blocked since 16-08-2026.
- **Phase 4 units A, B and C.** `src/data/work.js` holds five anonymised case
  studies, each number sourced to a project folder in a comment that never
  renders. `/work` is a set of full-width editorial rows on alternating tones,
  not a card grid. `/work/:slug` is one template, five instances.
- Every status was checked against that project's own STATE.md on the day: two
  of the five are not deployed and both say so.
- Prerendering extended from 4 routes to 10. Verified: zero client names, zero
  logos, zero financial figures in the rendered HTML.
- Unit D, imagery, is not started. No money was spent.

## 18-08-2026, closing phase 3, phase 4 unit D, phase 5, phase 6

The whole site was rebuilt in this session. Built and verified locally on
branch `phase-1-foundation-and-brand-truth`. Not pushed, not deployed.

**Phase 3 leftover, Selected Work.** The homepage's fifth section is now
three case studies as full-width editorial rows on cream, read live from
`src/data/work.js` rather than hardcoded. The Industries marquee moved
directly beneath it onto the same cream surface, and the homepage's section
order was adjusted so tones keep alternating with the new section in place.

**Phase 4 unit D, imagery.** The first screenshot pass came back technically
anonymised but visually empty: a pipeline reading AED 0.00 across every KPI,
an org literally named "Opening Balance Test Org". Screens were re-shot
against invented demo seed data instead. A repeatable seed script now lives
at `Jewelry-CRM/scripts/demo-seed.mts`, so the same clean state can be
regenerated any time. Generated art filled in what could not be photographed;
one generated image was redone because the first had garbled AI lettering on
a jeweller's loupe. Everything is wired into `/work` and all five case study
pages with real alt text, plus per-case-study OG cards composited at build
time. `lead-sourcing-platform` ships with no image at all, deliberately: it
could not be booted, and an invented mockup of it would fail the site's own
honesty test. Total image spend: USD 1.88, logged line by line in
`docs/history/image-generation.md`.

**Phase 5, all four units.** Services is now three full sections, each framed
by one arch, "Audit. Free." in the heading, case study links on Audit and
Build and none on Manage, and a one-column FAQ accordion that answers the
cost question as a model rather than a number. About opens with the
arch/arcade name story in large Cormorant next to the arch mark, reveals that
RK is Raffay and Kushan, names both founders, and adds a new section on how
the work actually gets done. Contact ships booking as a styled overlay with
its own focus trap after the Google embed was proven impossible (see
`docs/DECISIONS.md`, session 6), real inline validation, a honeypot, and a
success state that makes no reply-time promise. Nav, footer and 404 were
rebuilt together: Work added to the primary nav, order fixed, Process
dropped, the mobile menu rebuilt as a full-height overlay with its own focus
trap, a footer tagline added, the footer renders zero social icons while the
Instagram/LinkedIn URLs are still placeholders, and 404 is now an arch you
walk back through.

**Phase 6, all three units.** Two real bugs were found and fixed, not just
polish: the header was flipping to its cream bar at a fixed 72px scroll
regardless of hero height, which put nav text at 3.10:1 contrast over a dark
background; and the homepage's three service tiers were permanently invisible
whenever reduced motion was on. Accessibility went from 79 on the homepage and
87 on most case study pages to 100 on every route. Fonts are now self-hosted,
so the site makes zero third-party requests on any route. Every route has its
own title, description, canonical, OG and Twitter card, where previously all
ten routes shared one identical title. LCP improved 37% on the homepage, 24%
on Services, 17% on Work, measured on a throttled phone against a real
before-build; CLS is 0.00 everywhere. Added robots.txt, sitemap.xml,
Organization JSON-LD, and eslint wired to `npm run lint`. The header was then
rewritten a second time to read `data-header-tone` from whichever section is
physically underneath it, closing the "washed grey bar over mid-page dark
sections" item STATE.md had been carrying since phase 3. Several stat labels
that were wrapping to three or four lines were fixed. A real-device pass at
390/768/1024/1440 across every route found gallery images rendering smaller
at 768px than at 390px, and that was fixed too.

**Pre-deploy review fixes**, already logged in `docs/DECISIONS.md`, restated
here for the record: unreferenced files were removed from `public/` (an
unreferenced file still deploys and is still a live URL, six files moved to
`docs/history/`), and every Free Audit button now routes to `/contact` via a
single `CALENDAR_LIVE` switch in `CTAButtons.jsx`, because the Google booking
link is confirmed dead.

Phases 1 to 6 are now fully done. Phase 7, deploy, is the only phase left, and
it only runs on the word `deploy`.
