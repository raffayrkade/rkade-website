# What is wrong with the current rkade.co

Written 18-08-2026, before any code was changed. Every item below was read out
of the live source at `rkade-website/src/`, not guessed. This file is the
evidence the revamp plan is built on. It is not a to-do list: the fixes live in
`docs/plan/`.

---

## 1. The site is off-brand, and it has been the whole time

The brand guide (`docs/brand/RKADE-Brand-Guide-v2.pdf`) is explicit about
typography. The site ignores it.

| | Brand guide says | Site actually uses |
|---|---|---|
| Display / headlines | Baile, digital substitute **Cormorant Garamond**. Serif. Light 300 / Regular 400. "Never bold or heavy." | **Bricolage Grotesque**. Sans-serif. Bold 700 everywhere |
| Body / UI | **Montserrat**. Light 300 body, Medium 500 labels | **Inter** |
| Wordmark | "RKade", RK visually heavier, in the display serif | "RKade" in Bricolage Grotesque, `font-bold` + `font-light` |

Colours are the one thing that is right. `tailwind.config.js` carries ink
`#2C2218`, gold `#C9A84C`, cream `#F5F0E8`, warmgrey `#8A7060`, divider
`#D4C5A9`. All six match the guide exactly.

So the site is half-branded: correct palette, wrong voice in type. The internal
CRM (`rkade-crm`) got this right in phase 1 and the public website never did.
The public one is the one clients see.

## 2. The logo is missing entirely

There is no arch mark anywhere on the site. The brand guide defines a six-part
logo system: light/dark, horizontal/stacked, plus an icon-only version. The site
uses a text wordmark only, in the wrong font, and a favicon that is the letters
"RK" set in **Space Grotesk**, a third font that appears nowhere in the brand
guide (`public/favicon.svg`).

Status of the assets: **resolved as of 18-08-2026.** See
`docs/brand/README.md`. All five lockups were extracted out of the brand guide
PDF at usable resolution and the mark's geometry has been measured off them.
They are JPEG on baked backgrounds, so a transparent SVG still has to be
produced, and Raffay has approved building it from the PDF. Phase 1 unit B does
that and brings it back for sign-off against the extracted reference.

## 3. There is no proof of work. None.

The site makes claims and shows nothing. No case studies, no client logos, no
numbers, no screenshots, no named outcomes. A visitor cannot tell whether RKADE
has shipped one thing or fifty.

What actually exists and is invisible on the site:

- A jewellery CRM, 28 phases, 170 tasks, live and in daily use by a Dubai gold
  and diamond trader
- A lead sourcing and enrichment platform, live, six data providers, cost
  confirmation before every paid action
- A luxury jewellery storefront with scroll-driven product cinematics, built so
  a non-technical owner runs it himself
- A forensic CRM audit: 67 screens surveyed, 39 data files, 90,048 order rows
  across two years, which surfaced a revenue decline the owner had not seen
- RKADE's own internal CRM, deals through pipeline to projects, SOPs, money in
  AED and USD

This is the single biggest gap on the site.

## 4. The two images are stock, generic, and hosted by someone else

`WhyRkade.jsx` and `About.jsx` both load AI-generated art from
`media.base44.com`. Two problems. They are visually meaningless: abstract nodes
and a vaulted ceiling that could belong to any company. And they are a hard
dependency on a third-party CDN nobody at RKADE controls. If base44 changes a
path, two pages break.

## 5. Every section is the same shape

The homepage is seven sections. Five of them are: eyebrow label, heading,
description, then a grid of bordered cards on `bg-cream`. Problem, ServiceTiers,
WhyRkade (partly), HowItWorks, Industries. Same rhythm, same rounded border, same
`bg-divider` gap trick, same `py-24 md:py-28`.

There is no contrast anywhere. Every section of every page sits on `#F5F0E8`.
The guide explicitly supports a dark version (`#2C2218` background, cream text,
gold accents) and the site never once uses it, except inside the small hero art
tile.

The result reads as competent and completely forgettable.

## 6. The copy breaks the brand guide's own voice rules

The guide bans a specific list of words: *leverage, synergy, ecosystem, holistic,
cutting-edge, seamlessly, robust.*

"Leverage" appears three times:

- `Problem.jsx`: "They have a leverage problem"
- `Industries.jsx`: "there's leverage to build"
- `Contact.jsx`: "Let's find your leverage."

Em dashes were cleaned out of body copy in July, but one survives in
`index.html`'s meta description: "eliminate manual work — workflow audits". That
is the description Google shows in search results.

## 7. Contact details do not match the brand guide

| | Brand guide | Site | Correct |
|---|---|---|---|
| Email | contact@rkade.co (primary), help@rkade.co (support) | hello@rkade.co | **The guide.** Site is wrong |
| Booking | calendly.com/kushan-rkade/30min | calendar.app.google/La6EpDjL6HBNR67k7 | **The site.** Guide is stale, confirmed by Raffay 18-08-2026 |
| Social | Instagram @rkade.co, LinkedIn company page | LinkedIn, X/Twitter, GitHub, **all three `href="#"`** | Neither. Pages not set up yet |

So the guide is not automatically right. The Calendly link in it was never the
live booking route and the Google Calendar link on the site is the real one.
Check both sides before "fixing" a mismatch.

Three dead social links in the footer. Two of the three networks are not
channels RKADE uses. Instagram, which the guide names as primary, is not linked
at all. Neither page is set up yet, so phase 1 ships a placeholder that renders
nothing until a real URL is dropped in.

## 8. Small breakages

- Nav "Free Audit" goes to `/contact`. Hero "Free Audit" and CTASection "Free
  Audit" go to the external calendar. Same button, two destinations.
- `ContactForm.jsx` still carries the setup comment telling someone to go create
  a Formspree form, above a live endpoint. The endpoint destination is set to
  hello@rkade.co, which is not the guide's address.
- `rkade-website - Updated Colors/` is tracked in git and is a dead partial
  duplicate. Its `tailwind.config.js` is byte-identical to the live one minus the
  marquee keyframes. Nothing else in it is runnable.
- The project has no house documentation. No `docs/STATE.md`, `GOTCHAS.md`,
  `CONVENTIONS.md`, `ART-DIRECTION.md`. Every other RKADE project has them. This
  folder is the exception.
- The project `CLAUDE.md` says "No local Node/npm available in the Claude Code
  execution environment". **This is now false.** Node v24.18.1 and npm 11.16.0
  are both on PATH as of 18-08-2026. Changes can be built and verified locally
  instead of waiting on a Netlify preview.

---

## What is actually good, and should survive

Not everything needs replacing.

- The stack is right: React, Vite, Tailwind, Framer Motion, Lenis for smooth
  scroll, `vite-react-ssg` for prerendering. No reason to change any of it.
- `components/common/` is a genuinely reusable motion kit: `Reveal`, `Parallax`,
  `Marquee`, `ScrollProgress`, `SmoothScroll`, and a `usePrefersReducedMotion`
  hook that is actually wired up. That is the foundation the new animation work
  builds on, not a rewrite.
- `public/_redirects` fixes SPA routing on Netlify. Leave it alone.
- The Audit / Build / Managed three-tier model is good and it is in the brand
  guide. It stays.
- The arch story on the About page ("arcade comes from the Latin for arch") is
  the best writing on the site. It is buried on page four. It should be the
  organising idea of the entire site.
