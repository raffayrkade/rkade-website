# Phase 2: The arch system

**Goal:** build the motif and the motion primitives that every later phase is
assembled from. Nothing user-facing changes in this phase. At the end of it
there is a component kit and a demo route, and the homepage still looks like it
did.

This is the phase that decides whether the redesign is distinctive or is another
agency template. Do not rush it.

**Read first:** `docs/ART-DIRECTION.md`, especially "The idea: the site is a
passage" and "Motion". And `docs/brand/README.md` for the arch geometry.

**Needs:** phase 1 complete.

---

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Arch primitives | Phase 1 | B |
| B: Motion kit | Phase 1 | A |
| C: Surfaces | A | Nothing |

## Lanes

**Lane 1:** Unit A → Unit C
**Lane 2:** Unit B

Launch A and B **in the same message**. C follows A. Merge checkpoint after C
and B, then checker.

---

## Unit A: Arch primitives

Owner: `ui-builder`.

### 2.1 `<Arch>`, the parametric primitive

`src/components/arch/Arch.jsx`. One hairpin arch as an SVG path. Everything else
in the system is built from this.

Props: `span` (half-width), `legHeight`, `strokeWidth`, `taper` (boolean),
`tone`, `drawProgress` (0 to 1).

Shape: two straight vertical legs, a semicircular crown, **open at the bottom**.
No baseline bar. When `taper` is on, the right leg is omitted and the crown
sweeps past the apex and comes to a point at roughly one o'clock. That taper is
the detail that stops the mark reading as a rainbow, and it is the outermost
arch of the real logo.

`drawProgress` drives `stroke-dasharray` and `stroke-dashoffset`, so any arch
anywhere on the site can be drawn on, at any speed, from any trigger.

### 2.2 `<ArchMark>`, the three-arch composition

`src/components/arch/ArchMark.jsx`. Three `<Arch>`s, concentric, stepping in by
one pitch each. This is the geometry of the real logo:

- Half-spans step 98.5 → 65.75 → 33 at the reference size, one pitch apart
- Stroke 17, gap 15.75, pitch 32.75, at the same reference size. Normalise to a
  `viewBox` and scale from there
- Five legs at the baseline, not six. The outermost has `taper` on
- Gold on both light and dark

**This is a system component for animation and layout, not a replacement for the
logo.** It never appears in the header or the footer, and it is never called the
logo. The real mark ships as a supplied SVG when Raffay provides it. If those
two ever look different, that is a bug to raise, not to quietly reconcile.

Verify it by rendering it at 625×666 next to
`docs/brand/extracted/arch-mark-icon.jpg` and comparing. Save that comparison as
a screenshot for the phase review.

### 2.3 The scroll-linked draw

`src/hooks/useArchDraw.js`. Wraps Framer Motion's `useScroll` +
`useTransform` and returns a `drawProgress` bound to an element's position in
the viewport.

Two modes: `once` (draws on first entry, then stays) and `linked` (follows the
scroll both ways, for the hero and the tier section).

**Reduced motion:** returns a constant 1. Fully drawn, immediately, always.

### 2.4 `<ArchFrame>` and `<ArchPassage>`

`ArchFrame` wraps a block of content in an arch silhouette: a large, low-opacity
arch sitting behind it, scaled to the content. Used to frame the hero and each
case study.

`ArchPassage` is the section transition. As one section ends and the next
begins, the content passes through an arch-shaped `clipPath`. This is the
literal expression of the whole idea and it is easy to overdo. **Three uses
maximum across the entire site.** Pick them in phase 3 and hold the line.

---

## Unit B: Motion kit upgrade

Owner: `ui-builder`. Independent of A.

The existing kit in `src/components/common/` is good and stays. This unit
sharpens it rather than replacing it.

### 2.5 Replace the generic fade-up

`Reveal.jsx` currently does opacity plus 16px translate, which is the default
motion of every website built since 2020.

New behaviour: content rises 24px **into an arch-shaped mask**, so the reveal
itself is part of the motif. Easing `cubic-bezier(0.16, 1, 0.3, 1)`, 600ms.

Keep the existing `delay` prop and the existing call signature, so the ~30
places already using `<Reveal>` do not all need editing.

### 2.6 `<Counter>`

For the proof strip and the case study stats. Counts a real number up once, on
first view, never again on re-entry.

Rules: tabular figures so the layout does not jitter, Cormorant 300 at
`stat` size, and under reduced motion it renders the final number with no
animation at all. Never animate a number that is not real.

### 2.7 `<RuleSweep>`

A gold hairline that draws left to right under a section's eyebrow label as the
section enters. One line of motion that gives every section heading the same
signature without another card grid.

### 2.8 Reduced-motion audit

Go through the whole kit, old and new: `Reveal`, `Parallax`, `Marquee`,
`ScrollProgress`, `SmoothScroll`, `Counter`, `RuleSweep`, `useArchDraw`.

`usePrefersReducedMotion` already exists and is already used. Confirm every one
of them consumes it, and that with motion off the site is **completely correct
and completely legible**, not merely static. Arches fully drawn, counters at
final value, marquee stopped mid-list rather than at a torn frame.

Test it by actually setting the OS preference, not by reading the code.

Also confirm Lenis is disabled under reduced motion. Smooth scroll is a motion
effect and it makes some people ill.

---

## Unit C: Surfaces

Owner: `ui-builder`. **Needs unit A.**

### 2.9 `<Section>`

`src/components/layout/Section.jsx`. Every section on the site goes through it.

Props: `tone` (`cream` | `ink` | `ink-deep`), `id`, `padding`.

It owns: background, the correct text tones for that background, the gutter, the
max width, and the top rule. Once this exists, no page component chooses a
background colour by hand, which is how the current site ended up with seven
identical cream sections.

**It enforces the alternation.** Two sections of the same tone must not touch.
Make that a development-time console warning, not a silent allowance.

### 2.10 Dark surfaces across the common kit

Every shared component gets a correct dark rendering: `SectionHeading`,
`PageHeader`, buttons, cards, form fields, the nav, the footer.

The nav is the interesting one. It is currently `bg-cream/70` with a backdrop
blur, which will be invisible over the new dark hero. It needs to read on both
tones and transition between them as you scroll past the hero boundary.

**Gold rule, again, because it will be got wrong here:** gold is legal as text
on ink and illegal as text on cream. On cream, gold is a fill behind ink text, a
rule, or an icon. `check:contrast` will catch it, but know it first.

---

## Definition of done

- [ ] A `/kit` dev-only route rendering every primitive in both tones, at three
      widths. Not linked in the nav, excluded from the sitemap
- [ ] `<ArchMark>` screenshotted next to the extracted reference JPEG, side by
      side, for review
- [ ] `npm run build` passes and `npm run check:contrast` passes
- [ ] The whole `/kit` route verified with OS reduced motion **on**, screenshotted
- [ ] Lenis confirmed off under reduced motion
- [ ] No visual change to any real page. If the homepage looks different, this
      phase did too much

## Merge checkpoint

`checker`, then `reviewer`. The reviewer's specific job here: confirm the arch
primitives are actually reusable rather than three hardcoded shapes wearing a
props interface, because phases 3 and 4 both build on them and a bad foundation
gets expensive twice.
