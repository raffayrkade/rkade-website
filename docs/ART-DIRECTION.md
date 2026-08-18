# Art direction

The settled visual system for rkade.co. **Every agent building UI reads this
first, in full.** Hence it is short. **Keep it under 8 KB.** No task invents a
colour, a font size or a motion curve. If it is not here it does not exist yet:
add it to `tailwind.config.js` and to this file, in the same change.

Governed by `docs/brand/RKADE-Brand-Guide-v2.pdf`. Where this file and the brand
guide disagree, the guide wins and this file is the bug.

---

## The idea: the site is a passage

RKADE is arcade is *arcus* is arch. An arcade is a series of arches that holds a
building up while making a way through it. That is the whole positioning, and on
the current site it is a paragraph buried on page four.

On the new site it is the structure. **You scroll through arches.** Sections are
framed by them, transitions pass through them, the palette moves dark to light
to dark like walking under a colonnade and back out.

And the mark itself does the explaining. The arch mark is **three nested
arches**. The service model is **three tiers**. They are the same object:

| Arch | Tier | What it means |
|---|---|---|
| Outermost | **Audit** | The widest view. Everything, mapped |
| Middle | **Build** | Narrower. The systems that get made |
| Innermost | **Manage** | Closest in. The thing that keeps running |

The tier section builds the logo one arch at a time as you scroll. By the time
all three are drawn, the visitor has been told what RKADE sells and why the logo
looks like that, without a single sentence of explanation. Nothing else on the
site gets to be this literal. Use it once, on the homepage, and let it carry.

## Colour

Six brand colours, plus four working values the guide does not define. Warm only.
No blue, no neon, **no gradient fills**, all three explicitly off-brand.

### Surfaces

| Token | Hex | What it is for |
|---|---|---|
| `cream` | `#F5F0E8` | Light sections. The default canvas |
| `cream-raised` | `#EDE4D3` | A card or tile lifted off cream. Hover states |
| `ink` | `#2C2218` | Dark sections. Hero, case studies, footer |
| `ink-deep` | `#110F0D` | The deepest dark. Passage transitions only, used sparingly |

### Text and line

| Token | Hex | On | Ratio | For |
|---|---|---|---|---|
| `ink` | `#2C2218` | cream | 13.6 | Body and headings on light |
| `muted` | `#6F5A48` | cream | 5.7 | Secondary text, captions, nav |
| `cream` | `#F5F0E8` | ink | 13.6 | Body and headings on dark |
| `muted-on-ink` | `#A89179` | ink | 5.4 | Secondary text on dark |
| `gold` | `#C9A84C` | ink | 7.0 | **Gold as text works on ink only** |
| `gold-dark` | `#B3903A` | cream | 2.7 | Fills and rules. **Never text on cream** |
| `line` | `#C0AC89` | cream | 1.5 | Decorative hairlines inside a card |
| `line-strong` | `#9C8259` | cream | 3.2 | The actual edge of a component. WCAG 1.4.11 |

Three of these values are corrections carried over from `rkade-crm`, which
measured its palette in phase 8 and found the shared brand values failing. The
old `#8A7060` muted is **4.07:1 on cream, which fails AA for normal text**, and
this site uses it in roughly every secondary paragraph. The old `#D4C5A9`
divider is 1.50:1 and was doing two different jobs at once. Do not reintroduce
either. `npm run check:contrast` will fail the build.

**Gold rules, from the guide.** Gold is an accent. Never a large background
fill. It is legal as text on ink, illegal as text on cream. On cream, gold
appears as a fill behind ink text, a rule, an icon, or an underline.

## Type

Two families, from the guide, and never mixed beyond their roles.

**Display: Cormorant Garamond.** Headlines, the wordmark, large numbers. Weight
**300 and 400 only. Never bold.** 600 exists for the wordmark's RK and nothing
else. Italic is a feature: use it for one emphasised phrase in a headline, not
for whole paragraphs.

**Body: Montserrat.** Everything else. 300 for body copy, 500 for labels and
buttons. Never bold body text except to emphasise one word.

Cormorant runs small for its point size and is low contrast at small sizes.
Headlines must be genuinely large or the serif reads as timid rather than
editorial.

| Role | Family | Size | Weight | Notes |
|---|---|---|---|---|
| Hero | display | `clamp(3.25rem, 8.5vw, 7.5rem)` | 300 | Line height 0.95, tracking -0.02em |
| Section heading | display | `clamp(2.25rem, 4.5vw, 4rem)` | 300 | Line height 1.05 |
| Card heading | display | `clamp(1.5rem, 2vw, 2rem)` | 400 | |
| Stat number | display | `clamp(2.75rem, 5vw, 4.5rem)` | 300 | Tabular figures |
| Body large | body | 17px | 300 | Line height 1.75. Intro paragraphs |
| Body | body | 15px | 300 | Line height 1.8 |
| Label / eyebrow | body | 11px | 500 | Uppercase, **tracking 0.3em** |
| Button | body | 13px | 500 | Tracking 0.08em |

Load both once through `src/index.css`, weights 300/400/600 for Cormorant and
300/500 for Montserrat. Nothing else. Every extra weight is bytes for nothing.

## Space, shape, rhythm

- Page gutter `6vw` mobile, `8vw` from `md`. Content max width 1400px. Unchanged
  from the current site, it was already right.
- Section padding: `py-28` mobile, `py-36` from `md`. Bigger than the current
  `py-24`. Cormorant at these sizes needs air or it looks cramped.
- **Corners: 2px.** Almost square. The current site's `rounded-xl` reads as a
  SaaS template and fights the serif. The only round things on the site are
  arches.
- **Section rhythm alternates.** Never two light sections touching, never two
  dark. The passage is the point. Homepage runs: dark hero, cream problem, ink
  tiers, cream proof, ink work, cream process, ink CTA, ink footer.
- Grids keep the 1px-gap trick (`gap-px` on a `line`-coloured parent). It is
  cheap and it looks deliberate. Corners drop to 2px.

## Motion

Framer Motion plus Lenis, both already installed. `usePrefersReducedMotion` is
already wired and every single thing below respects it.

**Principles.** Motion explains structure, it does not decorate. Nothing moves
unless it is telling you something about where you are in the passage. If an
animation would look equally sensible played backwards, cut it.

| Name | Where | What |
|---|---|---|
| Arch draw | Hero, tier section | `stroke-dashoffset` from 1 to 0, scroll-linked. The arches build themselves |
| Passage reveal | Every section entry | Content rises 24px into an arch-shaped mask. Replaces the current generic fade-up |
| Depth parallax | Hero, case study art | Existing `Parallax`. Three layers, speeds 0.05 / 0.15 / 0.3 |
| Counter | Proof strip, case study stats | Real numbers count up once, on first view only |
| Rule sweep | Section headings | A gold hairline draws left to right under the eyebrow label |
| Marquee | Industries | Existing. Keep |

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, 600ms. Scroll-linked
things use no easing, they follow the scroll.

**Reduced motion:** everything above becomes its finished state instantly.
Arches render fully drawn. Counters render the final number. The site must be
completely correct and completely legible with zero animation. Test it.

## Words

From the guide, non-negotiable. Direct, specific, warm, confident.

- **Banned words:** leverage, synergy, ecosystem, holistic, cutting-edge,
  seamlessly, robust. The current site uses "leverage" three times.
- **No em dashes.** Anywhere. Comma, colon, or two sentences.
- **No passive voice.**
- One sentence where others use three.
- Reference real things: real numbers, real situations. "28 phases" beats
  "enterprise-grade".
- Never apologise for what RKADE does. State it plainly.
- The wordmark is **RKade** in prose. Never RKADE in body copy.
