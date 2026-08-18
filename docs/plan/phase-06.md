# Phase 6: Polish and proof

**Goal:** prove the whole thing works, on real devices, for real people, before
anyone sees it. This is the merge checkpoint for phases 3, 4 and 5.

**Needs:** 3, 4 and 5 all landed. Do not start it early on a partial site.

This phase does not add features. If something is missing, it goes on a list for
after launch, not into this phase.

---

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Correctness and accessibility | 3, 4, 5 | B |
| B: Performance and SEO | 3, 4, 5 | A |
| C: The real-device pass | A and B done | Nothing |

## Lanes

**Lane 1:** Unit A
**Lane 2:** Unit B

Both in the same message. Unit C last, and it is the one that actually decides
whether this ships.

---

## Unit A: Correctness and accessibility

Owner: `ui-builder`.

### 6.1 Contrast, measured

Run `npm run check:contrast` across every token pair in use, including the dark
surfaces which phase 1 could not check because they did not exist yet.

Then check what the script cannot: text over images, text over the arch
backgrounds, the nav in its transitional state between dark and cream. Those are
composited at runtime and a static token check will pass them while they fail on
screen.

**The specific trap:** gold text on cream is 2.7:1 and fails. It is legal on ink
at 7.0:1. Six phases of work is plenty of time for one to have slipped through.

### 6.2 Reduced motion, properly

Set the OS preference and walk the entire site. Every page, every section.

Passing means the site is **correct and legible**, not merely still. Arches
fully drawn. Counters showing final numbers. Marquee stopped somewhere sensible.
Lenis off. The tier section readable without any scroll linkage at all, which is
the hardest one and the most likely to fail.

Screenshot every page in this mode.

### 6.3 Keyboard and screen reader

- Tab through every page. Visible focus everywhere, logical order, no traps
  except the intentional one in the mobile menu
- Every image has real alt text, or `alt=""` if it is decorative. Decorative
  arches are decorative. Say so
- Headings in order, one `h1` per page
- Form fields have real labels, not just placeholders
- The `/work` cards are links, not divs with click handlers

### 6.4 Content sweep

One pass over every word on the site:

- Zero banned words: leverage, synergy, ecosystem, holistic, cutting-edge,
  seamlessly, robust
- Zero em dashes, including in meta descriptions and alt text
- "RKade" in prose, never "RKADE", except in the logo and the guide's own
  tagline
- Every claim true, every number sourced, every status current

---

## Unit B: Performance and SEO

Owner: `builder`.

### 6.5 Weight

The redesign adds arches, motion and images. Budget it.

- Fonts: Cormorant 300/400/600 plus two italics, Montserrat 300/500. Nothing
  more. `font-display: swap`, and preload the two used above the fold
- Images: `.webp`, correctly sized, lazy loaded below the fold, explicit width
  and height so nothing shifts
- Framer Motion is already a dependency and is not small. Check nothing is being
  imported that is not used
- Look at the built bundle and say what is in it. Do not guess

### 6.6 Lighthouse

Run it on `/`, `/work`, `/services`, mobile profile, throttled.

Target 90+ on all four scores. **Report the actual numbers**, including the ones
that miss. A phase that reports "good performance" without numbers has reported
nothing.

Cumulative layout shift is the one this design is most likely to fail, because
of the web fonts and the scroll-linked arches.

### 6.7 SEO and metadata

- Unique title and description on all nine routes. No em dashes
- OG image on every route. Per-case-study cards from phase 4
- `sitemap.xml` and `robots.txt`. Neither exists today
- Organization structured data: name, URL, logo, Dubai, the two social profiles
- Canonical URLs
- Confirm the prerendered HTML actually contains the copy. View source on the
  built output. `vite-react-ssg` has silently produced empty pages on this repo
  before

### 6.8 The `/kit` route

Exclude it from the sitemap and from the prerendered routes, or ship it
deliberately. Do not leave it discoverable by accident.

---

## Unit C: The real-device pass

Owner: `checker`. **This is the one that decides whether it ships.**

### 6.9 Real glass

Open the site on an actual phone. Not an emulator, not a throttled desktop
profile. A real phone, held in a hand, scrolled at real speed.

`metro-jewellers-website` shipped a pinned section that measured fine and was
clipped on a real phone, and the client found it. The tier section in phase 3 is
the same shape of risk.

Check: nothing clipped, nothing scrolling horizontally, scroll is smooth under a
finger, every tap target at least 44px, the mobile menu usable one-handed.

### 6.10 Browsers

Chrome, Safari, Firefox, and Safari on iOS, which is its own browser regardless
of what the label says.

Safari is where this design will break. `clipPath` on scroll, `backdrop-filter`
on the nav, and SVG `stroke-dashoffset` animation are all things Safari renders
differently or expensively.

### 6.11 Routes

`npm run verify:routes` across all nine. Then reload each one directly rather
than navigating to it, because that is what `_redirects` exists to fix and a
regression there breaks every link anyone has ever shared.

### 6.12 The before and after

Full-page screenshots of every route, old and new, at 390 and 1440px, side by
side. This is what Raffay approves against, and it is the record of what the
revamp actually changed.

---

## Definition of done

- [ ] Lighthouse 90+ on all four scores for `/`, `/work`, `/services`, mobile,
      **with the numbers pasted in**
- [ ] `check:contrast` passes, plus manual checks on composited text
- [ ] Full reduced-motion walkthrough, screenshotted
- [ ] Keyboard pass on every route, no traps
- [ ] Real phone pass, screenshotted, no clipping
- [ ] Four browsers, no visual breakage
- [ ] All nine routes 200, non-blank, and correct on direct reload
- [ ] Prerendered HTML contains real copy, verified by view source
- [ ] Zero banned words, zero em dashes, every number sourced
- [ ] Before and after screenshots for every route

## Merge checkpoint

`checker`, then `reviewer` for the whole revamp, not just this phase. Then
`harvester`, which has real material this time: the contrast checker, the arch
motion system, and the case-study-as-proof pattern are all candidates for
`Templates/modules/`.

**Then stop.** Phase 7 does not run until Raffay types `deploy`.
