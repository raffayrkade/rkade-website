# Phase 3: Homepage

**Goal:** rebuild the homepage as a passage. Dark to light to dark, arches
throughout, and the three-arch tier section as the centrepiece.

The current homepage is seven sections and five of them are the same shape:
eyebrow, heading, description, grid of bordered cards on cream. This phase
replaces that rhythm entirely.

**Read first:** `docs/ART-DIRECTION.md`. **Needs:** phase 2 complete.

Runs in parallel with phase 4, in a separate session.

---

## The new shape

| # | Section | Tone | Replaces |
|---|---|---|---|
| 1 | Hero | `ink` | `Hero` + `HeroArt` |
| 2 | Proof strip | `ink` (continues hero) | Nothing. New |
| 3 | The problem | `cream` | `Problem` |
| 4 | Three arches, three tiers | `ink` | `ServiceTiers` |
| 5 | Selected work | `cream` | Nothing. New |
| 6 | How it works | `ink-deep` | `HowItWorks` |
| 7 | Why RKade | `cream` | `WhyRkade` |
| 8 | Industries | `cream` (continues) | `Industries` |
| 9 | Close | `ink` | `CTASection` |

Nine sections, but only four of them are card grids and no two are the same
grid. The alternation is the structure.

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Hero and proof | Phase 2 | B, C |
| B: The tier centrepiece | Phase 2 | A, C |
| C: Problem, process, why | Phase 2 | A, B |
| D: Work teaser, industries, close | Phase 2, and phase 4 unit A for real data | Nothing |

## Lanes

**Lane 1:** Unit A
**Lane 2:** Unit B
**Lane 3:** Unit C

All three in the same message. Unit D last, on its own, because it pulls case
study data from phase 4.

---

## Unit A: Hero and proof strip

Owner: `ui-builder`.

### 3.1 The hero

Dark. `ink` background, cream type, gold accents. This is the first time the
site uses the brand's dark version and it should feel like walking into
somewhere expensive.

- Headline in Cormorant 300 at `clamp(3.25rem, 8.5vw, 7.5rem)`, line height
  0.95. One phrase in italic Cormorant for emphasis, which the brand guide calls
  out as a feature
- The current headline, "We build AI systems that do the work of extra
  employees", is the best line on the site. Keep the idea. Reset it in the new
  type and it will land twice as hard at half the weight
- Eyebrow: `AI AUTOMATION CONSULTANCY · DUBAI` in Montserrat 500, 0.3em
  tracking. The brand guide's own tagline, verbatim
- One primary CTA: Free Audit. One secondary: See the work, pointing at `/work`,
  which is new in phase 4
- **Delete the current `HeroArt`.** Its nested-arch idea was right and its
  execution is a dark tile floating in a cream page. The whole hero is dark now,
  so the arches live in the background of the section itself, full bleed, drawn
  in as the page loads, with the three-layer parallax kept

### 3.2 The proof strip

New, and the most important 100 pixels on the site. Sits directly under the
hero, still on `ink`, no section break. Four real numbers, counted up once via
`<Counter>`.

Candidates, all true and all verifiable from the project folders:

| Number | Label |
|---|---|
| 5 | systems shipped |
| 3 | live in production |
| 28 | build phases on the largest one |
| 90,048 | rows of client data migrated and audited |

**Every number on this strip must be checkable against a project folder.** If a
number cannot be sourced, it does not go up. Put the source next to each one in
a code comment so the next person can re-check it. No rounding up, no "100+", no
"trusted by".

---

## Unit B: Three arches, three tiers

Owner: `ui-builder`. **This is the centrepiece of the entire redesign.** If only
one thing in this phase is done well, it is this.

### 3.3 The idea

The arch mark is three nested arches. The service model is three tiers. They are
the same object. Scroll through this section and the logo builds itself one arch
at a time, each arch labelling one tier.

| Arch | Tier | Line |
|---|---|---|
| Outermost, widest | **Audit**, free | The widest view. We map everything, then tell you where the time is going. It costs nothing |
| Middle | **Build** | Narrower. The systems that actually get made |
| Innermost | **Manage** | Closest in. We keep it running so you never touch it |

By the end of the section a visitor has been told what RKADE sells, in what
order, and why the logo looks like that, without one sentence of explanation.

**The audit is genuinely free**, confirmed by Raffay 18-08-2026, and the first
arch says so out loud. It is the strongest fact on the homepage and the current
site manages to bury it while putting "Free Audit" on every button. A visitor
should reach the second arch already knowing the first one costs nothing.

Manage carries no client example anywhere on the site. Nobody is on an ongoing
arrangement yet. Write it as an offer, never as a track record.

### 3.4 The build

- Section is pinned or tall enough that scroll drives the sequence. Prefer tall
  and scroll-linked over pinned. Pinned sections break in ways that are painful
  to debug on real phones, which `metro-jewellers-website` learned the hard way
  in its round 9 client feedback: a 664px pinned section holding 903px of
  content, clipped, on a phone, in front of a client
- `useArchDraw` in `linked` mode. The outer arch draws across the first third of
  the section, the middle across the second, the inner across the third
- Each arch's copy fades in as its arch completes, and stays
- At the end all three are drawn and the composition is the mark

### 3.5 Mobile

**Design mobile first here, not last.** A scroll-linked three-stage sequence is
exactly the kind of thing that works beautifully at 1440px and is unusable at
390px.

If it cannot be made to work on a phone, the fallback is three stacked arches
that each draw on entry, one per screen, no linked scroll. That fallback is
acceptable and it is much better than a clipped mess. Decide by testing, not by
hoping.

### 3.6 Link out

One link to `/services` for the full breakdown. Not three.

---

## Unit C: Problem, process, why

Owner: `ui-builder`.

### 3.7 The problem, reshaped

Four cards on cream becomes something with rhythm. Suggested: a numbered list
where each item is a full-width row with a large Cormorant number, the problem,
and the cost of it. Rows, not a grid, so it reads as an argument rather than a
menu.

Keep the one genuinely good line: the 5-minutes-to-10-minutes response time
statistic. It is the only specific number in the current copy and the brand
guide asks for exactly that kind of specificity. **Source it in a comment.** An
unsourced statistic on a consultancy site is a liability.

Fix the banned word if phase 1 unit C somehow missed it.

### 3.8 How it works

Discovery, Design, Build, Manage. Currently four cards with a hairline behind
them.

New: `ink-deep`, the darkest surface on the site, used once. Four steps as a
vertical passage, each one framed by a small arch, connected by a gold rule that
draws as you scroll. Walking through it.

### 3.9 Why RKade

Keep the three points, they are good and on-voice: operators not talkers, built
for your workflow, measured by output.

**Delete the base44 image.** It is generic AI-generated abstract art loaded from
a third-party CDN nobody at RKADE controls. Replace it with either real
imagery from phase 4 unit D, or an `ArchFrame` composition, or nothing. Nothing
is better than generic.

Change "Meet the founders" to point somewhere that says something. The About
page currently describes two anonymous roles.

---

## Unit D: Work teaser, industries, close

Owner: `ui-builder`. **Needs phase 4 unit A** for the case study data.

### 3.10 Selected work

New section, on cream. Three case studies from `/work`, as large editorial
cards, not a grid of tiles. Each one: sector, one-line outcome, one real number,
link through.

This is the section that fixes the site's biggest problem. Give it room.

### 3.11 Industries

The marquee stays. It is one of the few things on the current site with any
motion personality. Restyle in the new type and put it directly under Selected
work on the same cream surface, so it reads as a footnote to the work rather
than as its own section.

### 3.12 The close

`CTASection`, on ink. Keep the decorative arch, which is already the right idea,
and scale it up: the whole section sits inside one large arch. Single CTA. One
destination.

Note it is reused verbatim on `/services` and `/about`. Keep it reusable.

---

## Definition of done

- [ ] `npm run build` and `npm run check:contrast` both pass
- [ ] `npm run verify:routes -- /` returns 200 and a non-blank render
- [ ] Screenshots at 390, 768, 1024 and 1440px, full page
- [ ] The tier section tested on a real phone or a throttled emulation, scrolled
      end to end, **with a screenshot proving nothing is clipped**
- [ ] Full page verified with reduced motion on. Every arch drawn, every counter
      at its final number
- [ ] No two touching sections share a tone
- [ ] Every number on the page traceable to a project folder, in a comment
- [ ] Zero images loaded from a third-party domain

## Merge checkpoint

`checker`, then `reviewer` at the end of the phase. The reviewer checks one
thing above all: **that this is not the same site with a serif font.** If the
section rhythm still reads as heading-plus-card-grid seven times, the phase
failed regardless of what passed.
