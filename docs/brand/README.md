# RKADE brand assets

## What is in here

| File | What it is |
|---|---|
| `RKADE-Brand-Guide-v2.pdf` | The master brand guide, August 2026. Copied from `Desktop/RKADE/` on 18-08-2026 |
| `brand-guide-v2-text.txt` | Full text of the guide, extracted. Read this instead of the PDF, it costs a fraction as much |
| `extracted/*.jpg` | The five logo lockups, pulled out of the PDF's embedded images |

## The logo assets, and where they came from

The brand guide describes six logo versions but ships none of them as files. The
`rkade-crm` project has been blocked on this since 16-08-2026 (its open item
O.1) and this site was blocked on the same thing.

**Resolved 18-08-2026.** The PDF has the lockups embedded as JPEGs. They were
extracted with `pypdf` and are in `extracted/`:

| File | Size | Guide's name for it |
|---|---|---|
| `lockup-light-horizontal.jpg` | 1080×795 | Light, Horizontal. Primary version |
| `lockup-dark-horizontal.jpg` | 1080×795 | Dark, Horizontal |
| `lockup-light-stacked.jpg` | 813×865 | Light, Portrait (Stacked) |
| `lockup-dark-stacked.jpg` | 813×865 | Dark, Portrait (Stacked) |
| `arch-mark-icon.jpg` | 625×666 | Icon, Profile Picture. The arch mark alone |

**These are JPEGs on solid baked backgrounds, not transparent SVGs.** Good enough
to see the mark and to check any reproduction against. Not good enough to put in
a website header at arbitrary size on arbitrary backgrounds.

## The arch mark, measured

Measured off `arch-mark-icon.jpg` by sampling pixels, so a reproduction can be
checked rather than eyeballed. Do not treat this as permission to redraw it, see
the rule below.

- **Three concentric hairpin arches.** Straight vertical legs, semicircular
  crowns, flat open bottoms, no baseline bar.
- **Five legs at the baseline, not six.** The outermost arch has a left leg only.
  Its crown sweeps over and terminates in a taper that comes to a point at
  roughly one o'clock. That taper is the flourish that stops the mark being a
  plain rainbow.
- **Uniform rhythm.** Stroke width 17px at the extracted size, gap 15.75px,
  pitch 32.75px between arches.
- **All three share one centre**, and the half-spans step down cleanly: 98.5,
  65.75, 33. Each is exactly one pitch narrower than the last.
- Rendered in gold `#C9A84C` on both light and dark backgrounds.

The geometry is regular, which means a faithful reproduction is achievable. It
also means an unfaithful one is obvious.

## The rule that governs all of this

The brand guide says, verbatim:

> Never recreate the logo in a different font or redraw the arch mark.
> The original AI file is the master, never edit anything else.

**Raffay's answer, 18-08-2026:** "everything is in the pdf, get what you want
from the brand guide". That is approval to reproduce the mark from the PDF, and
it is the only approval that makes reproducing it legitimate. Recorded in
`docs/DECISIONS.md` so it is not something a later agent has to guess at.

So the path is:

1. **Trace it from `extracted/arch-mark-icon.jpg`** against the measurements
   above. The geometry is regular, so this is achievable to a high standard.
   Built in phase 1 unit B as `public/brand/arch-mark.svg`.
2. **Prove it, then sign it off.** Render the trace at 625×666 next to the
   extracted reference, side by side, and put that comparison in front of
   Raffay. It ships when he looks at it and says yes, not when it builds.
3. **If the master ever turns up**, it replaces the trace, no questions. A
   supplied file always beats a reproduced one.

**Until the trace is signed off, the site ships the wordmark alone**, set
correctly in Cormorant Garamond with the RK/ade weight split. Never an
unapproved arch.

The same SVG unblocks `rkade-crm`'s open item O.1. Hand it over when it is
signed off.

## Brand facts worth not re-reading the PDF for

- Written **RKade**. Capital R, capital K, lowercase "ade". Never Rkade, rkade,
  R-Kade, or RKADE in body copy.
- **RK is visually heavier than ade.** Those are the founders' initials sitting
  inside a real word. Any reproduction keeps that split.
- Colours: ink `#2C2218`, gold `#C9A84C`, cream `#F5F0E8`, warm muted `#8A7060`,
  border `#D4C5A9`, deep black `#110F0D`.
- Gold is an accent. Never a large background fill.
- No electric blue, no neon, no gradient fills. Explicitly off-brand.
- Type: Cormorant Garamond for display, light and regular only, never bold.
  Montserrat for body and UI, light 300 body, medium 500 labels.
- Italic Cormorant is a feature. Use it for headline emphasis.
- All-caps labels get 0.2em letter spacing or more.
- Banned words: leverage, synergy, ecosystem, holistic, cutting-edge,
  seamlessly, robust.
- No em dashes.
- Email contact@rkade.co and help@rkade.co. Outreach goes out of
  sales@kres-labs.com, a separate domain, never rkade.co.
- Booking: **the guide is stale here.** It says
  calendly.com/kushan-rkade/30min. The real, monitored link is the Google
  Calendar one already on the site,
  `calendar.app.google/La6EpDjL6HBNR67k7`. Confirmed by Raffay 18-08-2026.
- Instagram @rkade.co, LinkedIn company page. Nothing else. **Neither is set up
  yet**, so both ship as placeholders that render nothing until a real URL is
  dropped in.
