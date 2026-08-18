# Phase 4: The Work page

**Goal:** close the single biggest gap on the site. Today rkade.co proves
nothing. A visitor cannot tell whether RKADE has shipped one thing or fifty.
Five real systems exist. They go up.

**Read first:** `docs/BRIEF.md`, the "Case studies: anonymised" section. Those
rules are not negotiable and two of them are about client confidentiality.

**Needs:** phase 2 complete. Runs in parallel with phase 3, separate session.

---

## The rules, before any writing starts

Decided by Raffay, 18-08-2026: **anonymise everything.** No client names, no
logos, no locations specific enough to identify by elimination.

1. **Sector plus outcome, never a name.** "A Dubai gold and diamond trader" is
   fine. Adding a street, a branch count or a founding year is not.
2. **No client financials in any form.** Not a figure, not a percentage, not
   "double digit". One of these five projects is a live forensic audit whose
   central finding is a revenue collapse. That finding belongs to the client and
   it is not marketing material. Use process numbers instead: screens surveyed,
   rows parsed, years covered.
3. **Every number is checkable.** Each one carries a source comment pointing at
   the project folder it came from. If it cannot be sourced it does not ship.
4. **Never claim live when it is not.** Two of the five are not deployed. Say
   so, in plain words. "Built, in client review" is a perfectly good status and
   inventing a deployment is the fastest way to lose a prospect who asks to see
   it.

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Data model and index | Phase 2 | D |
| B: The five studies, written | A | D |
| C: Detail page | A, B | Nothing |
| D: Imagery | Phase 2 | A, B |

## Lanes

**Lane 1:** A → B → C
**Lane 2:** D, inside a USD 20 hard cap (task 4.16)

---

## Unit A: Data model and index page

Owner: `builder`.

### 4.1 The case study shape

`src/data/work.js`. Plain JS, no CMS. Five entries, one shape:

```
slug, sector, title, status, year,
summary          one sentence, under 20 words
problem          what was actually wrong, in the client's terms
whatWeBuilt      3 to 5 bullets, concrete nouns
stats            [{ value, label, source }]   source is a comment for us, never rendered
stack            what it is built with
image            from unit D, or null
```

`source` never renders. It exists so the next person can re-verify a number
without opening five project folders.

### 4.2 The index route

`/work`, added to `routes.jsx` and to the nav. Nav becomes: Work, Services,
About, Contact. **Work goes first**, ahead of Services, because proof sells
harder than a service list.

Layout: full-width editorial rows, alternating tone per `<Section>`. Not a
three-up card grid. Every agency on earth has a three-up card grid, and the
current site already has five of them.

### 4.3 Prerendering

`vite-react-ssg` prerenders at build time. Add `/work` and every
`/work/:slug` to the static route list, or they will render blank to a crawler
while looking fine in a browser. This exact class of bug already bit this repo
once, in the `fix-ssr-prerendering` branch.

---

## Unit B: The five studies

Owner: `ui-builder`, which owns words as well as screens.

Written in the brand guide's voice: direct, specific, warm, confident. One
sentence where others use three. No banned words. No em dashes.

### 4.4 A Dubai gold and diamond trader, custom CRM

Source: `Projects/Jewelry-CRM/`. **Live.**

The strongest study RKADE has. A jewellery business running its entire
operation, stock, sales, customers and cash, in a paper book. Now on a custom
CRM built around how the trade actually works: stock by piece, by carat and by
gram, certified and uncertified stones, custom order workflow, live gold rate,
invoicing.

Verifiable numbers: 28 build phases, 170 tasks, 120 database migrations, live
and in daily use. Deployed to Frankfurt for latency and data residency.

The angle: this was not a CRM bought and configured. Off-the-shelf software has
no concept of selling the same stone by three different units of measure. That
is why it had to be built.

### 4.5 A UAE luxury jewellery retailer, storefront

Source: `Projects/metro-jewellers-website/`. **Built, in client review. Not
deployed. Say so.**

The client's brief was explicit that every competitor site was "a simple webpage
with some nice photos". They wanted scroll cinematics: zoom into a diamond, zoom
out to the mountain it was mined from. That got built.

Also built, and more important commercially: an upload system a non-technical
owner runs himself, five or six products a day, and a UAE gold price that
refreshes on its own.

Verifiable: 13 phases, 12 complete. Nine rounds of client feedback after the
build, all closed.

The angle: the interesting engineering was not the animation, it was making it
so the owner never has to call us to change a price.

### 4.6 A lead sourcing and enrichment platform

Source: `Projects/Lead-Generation-Tool/`. **Live at leadgentool.rkade.co.**

Sources businesses by category and city, enriches them with websites, phone
numbers, social handles and follower counts, email and traffic data, across six
providers, then exports the lot as a spreadsheet.

Verifiable: six data providers, cost estimate shown and confirmed before every
paid action, encrypted key storage, mock mode by default so nothing spends
money until it is told to.

The angle: the discipline, not the data. Every paid action shows its cost first,
and when a provider returns nothing the field is left honestly blank rather than
guessed. Most enrichment tools quietly fill gaps with invention. Say that
plainly, it is a real differentiator and it is true.

### 4.7 A UAE retail group, CRM forensic audit

Source: `Projects/crm-audit/`. **Delivered.**

A business running on a CRM it did not own, could not export from cleanly, and
could not get answers out of. RKADE surveyed the whole system and built the
picture the owner could not get from the supplier.

Verifiable, and all process metrics on purpose: 67 screens captured, 39 data
files, 6,254 rows parsed, 90,048 order rows across two years. Delivered as a
dossier plus an ownership brief setting out what it would take to own the
system outright.

**Hard rule on this one.** The audit's headline finding was a revenue decline
the owner had not spotted. Say that a trend was found that nobody had raised.
**Never publish a figure, a percentage or a date range.** The first draft of any
number here gets deleted, not softened.

### 4.8 Our own CRM

Source: `Projects/rkade-crm/`. **Live at crm.rkade.co.**

Deals through a pipeline, won deals becoming projects, per-project-type SOP
checklists, two founders' task lists, and the money in AED and USD.

Verifiable: eight phases, live, two users, built mobile first because one
founder works from the Gold Souk on a phone.

The angle: we run on our own work. It is the shortest credibility argument
available and nobody else in the category can make it honestly.

### 4.9 What ties them together

A short closing block on the index page. Every one of these is the same three
tiers: understand the work, build the system, keep it running. The Work page
should send people to `/services` having already seen the model in action.

---

## Unit C: The detail page

Owner: `ui-builder`. **Needs A and B.**

### 4.10 `/work/:slug`

One template, five instances. Sections in order: hero with sector and status,
the problem, what we built, the stats row with `<Counter>`, the stack, next
case study.

Framed with `ArchFrame`. Alternating tone. Reuses `CTASection` at the bottom.

### 4.11 Status is always visible

A small label near the title: Live, Delivered, or In client review. Present on
the index and the detail page. This is a credibility feature, not a disclaimer.

### 4.12 Metadata

Per-study `<title>`, description and OG image. Five case study pages that all
share the homepage's social card is a wasted opportunity, and these are the
pages most likely to get shared into a WhatsApp group.

---

## Unit D: Imagery

Owner: `ui-builder`. **This unit stops and asks before it spends anything.**

### 4.13 What is available

Raffay confirmed 18-08-2026 that image generation access was set up during the
Metro Jewellers build and is available here.

| Key | Where it is now | Notes |
|---|---|---|
| `OPENAI_API_KEY` | `Projects/metro-jewellers-website/.env.local` | Project-scoped |
| `GEMINI_API_KEY` | same file | Google AI Studio. See the warning below |
| `HIGGSFIELD_API_KEY` | named in `Desktop/RKADE/SERVICES.md` | Image and video. RKADE account |

**Move, do not copy.** These are account-level capabilities, not Metro
capabilities. They belong in `~/.rkade/.env`, which sits outside every project
folder precisely so a key can never be committed or sent to a client. Copying
them into a second `.env.local` doubles the number of places a secret can leak
from. `SERVICES.md` gets updated in the same change.

**Warning on the Gemini key.** The value currently in Metro's file starts `AQ.`
The instructions written directly above it in that same file say the key should
start `AIzaSy`. Those are different credential types, and the `AQ.` form is
typically short lived. **Test it before planning around it.** If it is dead,
that is a five minute fetch from aistudio.google.com, and it needs the
`env-var-standard` skill to write the steps up properly for Raffay.

### 4.14 Screenshots beat generated images. Start there.

The instinct is to generate art. Resist it for one round.

Four of these five systems run. A real, cropped, anonymised screenshot of the
jewellery CRM's stock screen is worth more than any image a model will produce,
because it is the actual thing and a prospect can tell. Generic AI art is
exactly what is wrong with the current site: two abstract compositions from
`media.base44.com` that could belong to any company on earth.

So the order is:

1. **Real screenshots first.** Boot each project locally, capture the two or
   three screens that best show what it does, then anonymise: seed data only,
   no real client names, no real figures, no real contact details. `builder` can
   already generate demo seed data on request, which is exactly what this needs.
2. **Generate only what cannot be photographed.** Texture, atmosphere, the
   sector-establishing image for the audit project which has no UI worth showing,
   and the OG cards.
3. **Nothing generic.** If a generated image would suit any consultancy, it does
   not go on the site. That test kills most of them and it should.

### 4.15 If we generate, the constraints

- Palette is ink `#2C2218`, gold `#C9A84C`, cream `#F5F0E8` and nothing else.
  The brand guide bans blue, neon and gradient fills outright
- Warm, editorial, physical. Materials and craft, not circuit boards, not glowing
  brains, not robot hands
- Arch geometry where it fits, since it is the site's motif
- Every generated asset is committed to `public/`, served from rkade.co, and
  never hot-linked from a third party. That is one of the specific faults being
  fixed
- Modern formats, `.webp` with a fallback, sized for the container, lazy loaded
  below the fold

### 4.16 The budget

Raffay, 18-08-2026, asked to just set one: "you suggest something, just do what
you need."

**Hard cap: USD 20 across the whole revamp.** Not per phase, not per unit. Total.

The working estimate behind that number: roughly 10 to 12 finished assets are
needed, and getting a usable image typically takes 3 or 4 attempts, so budget
for 35 to 45 generations. At current rates of roughly USD 0.02 to 0.19 per image
depending on provider, size and quality, that lands somewhere near USD 5 to 8.
The cap is set at 20 so a bad run does not need a second conversation, not
because 20 is expected to be spent.

Rules that go with the cap:

- **Log every generation** in `docs/history/image-generation.md`: date, provider,
  prompt, cost, kept or discarded. Running total at the top
- **Stop at USD 20 and report**, even mid-task. Do not round up, do not carry on
  because it is nearly done
- **Generate at draft quality first.** Only re-run the final selects at full
  quality. Most of the spend on this kind of work is high-quality renders of
  images that were never going to be used
- **Screenshots are free.** Exhaust unit 4.14 before spending anything. If the
  screenshot pass goes well the real spend may be close to zero, and that is a
  good outcome, not an underspend

If the work genuinely needs more than USD 20, that is a conversation with a
number attached, not a quiet overrun.

---

## Definition of done

- [ ] `npm run build` and `npm run check:contrast` pass
- [ ] `npm run verify:routes -- /work,/work/<each-slug>` returns 200 and a
      non-blank render for all six
- [ ] Prerendering confirmed: view source on a built page and see the real copy
      in the HTML, not an empty root div
- [ ] Every stat traced to its project folder in a source comment
- [ ] Zero client names, zero logos, zero financial figures. Read every study
      once more against the rules at the top of this file before merging
- [ ] Every status label matches reality, checked against each project's
      `STATE.md` on the day of merging
- [ ] Zero images from a third-party domain
- [ ] Screenshots at 390 and 1440px for the index and one detail page

## Merge checkpoint

`checker`, then `reviewer`. Give the reviewer one instruction above the usual:
**read all five studies as a client would**, and flag anything that overclaims,
anything that could identify a client, and any number that cannot be traced. A
false claim on this page is worse than no page.
