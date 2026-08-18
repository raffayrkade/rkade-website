# Phase 1: Foundation and brand truth

**Goal:** make the ground correct before anything is redesigned on top of it.
Right fonts, right tokens, right contact details, right house documents. When
this phase is done the site will look *slightly different and noticeably more
expensive*, and nothing will have been rebuilt yet.

Do not start any visual redesign in this phase. That is phase 3.

**Read first:** `docs/ART-DIRECTION.md` in full, and `docs/brand/README.md`.

---

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Type and tokens | Nothing | C |
| B: Identity | A (fonts must exist) | Nothing |
| C: Truth fixes | Nothing | A |

## Lanes

**Lane 1:** Unit A → Unit B
**Lane 2:** Unit C

Launch A and C **in the same message**. B starts when A is done. Merge
checkpoint after B and C have both landed, then checker.

---

## Unit A: Type and tokens

Owner: `ui-builder`.

### 1.1 Swap the fonts

`src/index.css`. Out: Inter, Bricolage Grotesque. In: Cormorant Garamond and
Montserrat, from Google Fonts.

Load **only** these weights. Every extra weight is bytes for nothing.

- Cormorant Garamond: 300, 400, 600, plus 300 italic and 400 italic
- Montserrat: 300, 500

Set `--font-display` and `--font-body`. Rename the existing `--font-heading` to
`--font-display` project-wide so the name matches the brand guide's own word for
the role. `font-heading` / `font-body` Tailwind families follow.

**Trap:** Cormorant Garamond renders visually smaller than most serifs at the
same point size, and its thin strokes disappear under 18px. Nothing below 18px
uses the display family. If a heading needs to be small, it is a label, and
labels are Montserrat.

### 1.2 Rewrite `tailwind.config.js`

Replace the seven-colour block with the full token set from
`docs/ART-DIRECTION.md`. Named tokens only. No component in this codebase should
ever carry a raw hex again.

Colours: `cream`, `cream-raised`, `ink`, `ink-deep`, `gold`, `gold-dark`,
`muted`, `muted-on-ink`, `line`, `line-strong`.

**Three of these are corrections, not preferences.** The current `warmgrey`
`#8A7060` is 4.07:1 on cream and fails WCAG AA for normal text, and it is used
in nearly every secondary paragraph on the site. `divider` `#D4C5A9` is 1.50:1
and is doing two different jobs. Both were measured and fixed in `rkade-crm`
phase 8 after Raffay said the colours were "blending in with the background". He
was right there and the same values are wrong here.

Rename as you go: `warmgrey` → `muted`, `divider` → `line`, `offcream` →
delete (it appears in two hover states and `line-strong` replaces it).

### 1.3 Port the contrast checker

`rkade-crm` has `npm run check:contrast`, which measures every declared token
pair and fails the build on a regression. Port it. It is the reason this class
of bug cannot come back.

Wire it into `npm run build` so a bad colour cannot ship.

This is the **second sighting on a second project** of the same lesson, so it
also qualifies for promotion into `Templates/modules/`. Flag it for `harvester`
at the phase boundary rather than doing it here.

### 1.4 Corners and spacing

- Global corner radius drops to **2px**. Find every `rounded-xl`, `rounded-2xl`,
  `rounded-md`, `rounded-full` and decide each one. The only genuinely round
  things on this site are arches and the small status dots.
- Section padding moves from `py-24 md:py-28` to `py-28 md:py-36`.
- Add the type scale from `docs/ART-DIRECTION.md` as named `fontSize` tokens
  (`hero`, `section`, `card`, `stat`, `body-lg`, `body`, `label`, `button`) so
  later phases stop writing `text-4xl sm:text-5xl lg:text-6xl` by hand.

### 1.5 Apply the type roles

Sweep every existing component. Headings become Cormorant 300 or 400, never
bold. `font-bold` on a heading is now a bug. Labels and eyebrows become
Montserrat 500 at 0.3em tracking. Body becomes Montserrat 300.

This will look wrong in places, because the current layout was built around a
chunky sans. Do not fix the layout here. Note what breaks and let phase 3 fix
it properly.

---

## Unit B: Identity

Owner: `ui-builder`. **Needs unit A finished.**

### 1.6 The wordmark component

`src/components/brand/Wordmark.jsx`. Replaces the inline `Wordmark` currently
living inside `SiteLayout.jsx`.

- Renders **RKade**: capital R, capital K, lowercase "ade"
- Cormorant Garamond. `RK` at weight 600, `ade` at weight 300
- Two tones: `light` (on cream: RK in `ink`, ade in `muted`) and `dark` (on ink:
  RK in `cream`, ade in `muted-on-ink`)
- Size prop, not hardcoded classes, because the footer uses it larger than the
  nav

The RK/ade weight split is a brand rule, not a style choice. Any reproduction
must keep it.

### 1.7 Favicon and social card

The current favicon is "RK" set in **Space Grotesk**, a font that appears
nowhere in the brand guide. Rebuild it in Cormorant, gold on ink, matching the
wordmark exactly.

Also missing entirely: an OG image. `index.html` declares `og:title` and
`og:description` and no `og:image`, so every link shared to WhatsApp, LinkedIn
or Slack renders as a bare text card. Build one at 1200×630, ink background,
gold arch mark or wordmark, one line of copy.

### 1.8 Build the arch mark

**Approved by Raffay 18-08-2026**: "everything is in the pdf, get what you want
from the brand guide". Without that, the guide's "never redraw the arch mark"
rule would forbid this. With it, build it.

Trace `public/brand/arch-mark.svg` from
`docs/brand/extracted/arch-mark-icon.jpg`, against the measurements in
`docs/brand/README.md`:

- Three concentric hairpin arches, straight legs, semicircular crowns, open at
  the bottom, no baseline bar
- **Five legs, not six.** The outermost arch has a left leg only. Its crown
  sweeps past the apex and tapers to a point at roughly one o'clock
- Half-spans 98.5 / 65.75 / 33, stroke 17, gap 15.75, pitch 32.75, at the
  reference size. Normalise into a `viewBox` and scale from there
- One gold `currentColor` version covers both light and dark backgrounds

**It does not ship until Raffay signs it off.** Render the trace at 625×666
directly beside the extracted reference, save that comparison image, and put it
in front of him. Building it is approved. Shipping an inaccurate one is not.

Then:

- `src/components/brand/ArchMark.jsx` renders the SVG
- `src/components/brand/Logo.jsx` is the lockup: arch mark plus `<Wordmark>`,
  with clear space equal to the height of the K, per the guide
- Until sign-off, `Logo` renders the wordmark alone. The slot is already there,
  so approval is a one-line change, not a rebuild

Copy the structure from `rkade-crm/components/ui/logo.tsx`, which solved this
same problem and documented it well.

**When it is signed off, hand the SVG to `rkade-crm`.** Its open item O.1 has
been blocked on exactly this file since 16-08-2026.

---

## Unit C: Truth fixes

Owner: `builder`. Independent of A and B. Mostly find-and-replace, all of it
verifiable.

### 1.9 Contact details

`src/components/common/CTAButtons.jsx` is the single source. Fix it there.

| What | From | To |
|---|---|---|
| Email | `hello@rkade.co` | `contact@rkade.co` |
| Booking | `calendar.app.google/La6EpDjL6HBNR67k7` | **no change** |

**The booking link is already correct. Do not "fix" it.** The brand guide names
a Calendly URL and that is the stale one. Raffay confirmed on 18-08-2026 that
the Google Calendar link on the site is the real, monitored route. This trap is
recorded because the guide looks authoritative and it is wrong here.

Verify the email change end to end: send a test through the contact form and
confirm it arrives at contact@rkade.co. Load the booking link and confirm it
still resolves. If either fails, stop and report rather than shipping a broken
CTA. A dead booking link is worse than an ugly one.

The Formspree endpoint in `ContactForm.jsx` is configured to deliver to
hello@rkade.co. Repoint it, and delete the stale setup comment sitting above it
telling someone to go create the form. It exists.

### 1.10 Social links

The footer has three links, all `href="#"`, all dead. Two of the three are
networks RKADE does not use.

- Delete X/Twitter and GitHub outright
- Keep LinkedIn, add Instagram. Those are the two the brand guide names

**Neither page is set up yet.** Raffay, 18-08-2026: "just leave it as a
placeholder and I'll fill it with proper links when ready."

So build it so a placeholder cannot ship as a dead link. In
`CTAButtons.jsx`:

```js
// Set these to the real URLs when the pages exist. While a value is
// still PLACEHOLDER the footer does not render that icon at all, so an
// unfinished profile never ships as a dead link.
export const INSTAGRAM_LINK = 'PLACEHOLDER';
export const LINKEDIN_LINK = 'PLACEHOLDER';
```

The footer filters out anything still set to `PLACEHOLDER`. Today that renders
no social icons, which is correct: no icons is better than three dead ones.
When Raffay pastes a URL in, the icon appears on its own with no other change.

Write those two blanks up to the `env-var-standard` house standard, in
`docs/SETUP.md`: what it is, where to get it, the literal clicks, what it should
look like. It is a thing Raffay has to go and do himself, which is exactly what
that standard covers.

### 1.11 The banned words

"Leverage" is on the brand guide's banned list and appears three times:

| File | Line reads | Suggested |
|---|---|---|
| `Problem.jsx` | "They have a leverage problem" | "They have a systems problem" |
| `Industries.jsx` | "there's leverage to build" | "there's a system to build" |
| `Contact.jsx` | "Let's find your leverage." | "Let's find what to automate first." |

Also: one em dash survives, in the `index.html` meta description. That is the
sentence Google prints under the search result. Kill it.

Then grep the whole site for the rest of the banned list (synergy, ecosystem,
holistic, cutting-edge, seamlessly, robust) and for `—`, and report the count
even if it is zero.

### 1.12 One CTA, one destination

"Free Audit" currently goes to `/contact` from the nav and to the external
calendar from the hero and the CTA section. Same words, two destinations.

Point all three at the calendar. The nav button was the odd one out.

**And the words are now load-bearing.** Raffay confirmed 18-08-2026 that the
audit is genuinely free: Tier 1 is the free way in, and RKADE makes its money on
Build and Manage. So "Free Audit" is not marketing softening, it is the offer.
Keep the wording exactly, everywhere, and never water it down to "Get in touch"
or "Learn more". Phase 5 unit A restructures the Services page around this.

### 1.13 House documents

This project is the only RKADE project without them.

- `docs/STATE.md`, from the template. Cap 8 KB
- `docs/GOTCHAS.md`. Seed it with the two real ones already known: `_redirects`
  must exist or every route 404s on reload, and `vite-react-ssg` prerenders at
  build time so anything touching `window` at module scope breaks the build
- `docs/CONVENTIONS.md`. Seed with the branch/PR/preview/approval workflow,
  the named-token rule, and the no-raw-hex rule
- `docs/history/` with `timings.md` and `session-log.md`

### 1.14 Correct the project CLAUDE.md

It says "No local Node/npm available in the Claude Code execution environment,
`npm install` / `npm run dev` fail with command not found."

**This is false as of 18-08-2026.** Node v24.18.1 and npm 11.16.0 are both on
PATH. Verified. Correct the file, and correct the consequence it draws: changes
no longer have to be verified through a Netlify preview, they can be built and
loaded locally first. The preview stays as the approval gate, not as the only
way to see anything.

### 1.15 Retire the dead duplicate

`rkade-website - Updated Colors/` is tracked in git, is not runnable, has no
`package.json`, and its `tailwind.config.js` is the live one minus the marquee
keyframes. It has been an open question since July.

Move it to `docs/history/updated-colors-experiment/`. **Nothing is ever deleted,
only moved.** Log it in `docs/DECISIONS.md` so it can be recovered.

---

## Definition of done

- [ ] `npm run build` passes
- [ ] `npm run check:contrast` passes, and fails if a token is regressed on
      purpose as a test
- [ ] `npm run verify:routes -- /,/services,/about,/contact` returns 200 and a
      non-blank render for each
- [ ] No `font-bold` on any element using the display family
- [ ] Zero raw hex values in `src/`, verified by grep
- [ ] Zero banned words, zero em dashes, verified by grep
- [ ] Every CTA on the site resolves to a live page, checked by loading it
- [ ] Zero dead links anywhere, including the footer. A placeholder social URL
      renders no icon, verified
- [ ] `arch-mark.svg` traced, and the side-by-side comparison against
      `docs/brand/extracted/arch-mark-icon.jpg` saved and put in front of Raffay
- [ ] Screenshots of all four routes at 390px and 1440px, before and after

## Merge checkpoint

After B and C land: `checker`, then `reviewer` for the phase, then `harvester`.
Tell `harvester` specifically about the contrast checker: it is now the second
sighting on a second project and qualifies for `Templates/modules/`.
