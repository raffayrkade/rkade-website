# Brief: rkade.co revamp

Written 18-08-2026.

## Client

RKADE itself. Two founders, Raffay Ali and Kushan Naresh, Dubai. This is the
public marketing site, live at rkade.co on Netlify. It is the first thing a
prospect sees, and it is currently the weakest artefact the company owns.

## The problem in Raffay's words

> "RKADE was made back when we had absolutely no idea what we wanted to do with
> our AI agency. We were just wanting to do automations and just keep it as
> normal as possible. Right now, if you look at the website of RKADE, it's
> pretty mediocre. There is nothing really that screams what we do, how we do
> it, and all that stuff."

The site was built for a company that did not exist yet. Since then RKADE has
shipped five substantial systems, settled a real brand guide, and found out what
it is actually good at. The website has not moved.

## Positioning

Raffay's answer, 18-08-2026:

> "Yes, it's true that we are an AI consultancy, but our eventual goal is to
> make workflows for people easier, optimize their workflows in any way, and
> help them with tech, build websites, and stuff like that. I think we want to
> lead with something like AI, something like an automation consultancy, but we
> audit, build, and manage CRM systems and stuff like that."

So the headline stays **AI automation consultancy**, which is also what the
brand guide says on its cover. What changes is everything under it. Today the
site sells three abstract nouns. It should sell the specific things RKADE
actually builds, with the work shown.

**Audit, Build, Manage stays.** It is good, it is in the brand guide, and it is
a real progression. It just needs to stop being three cards of adjectives and
start being three tiers with named deliverables and finished work attached.

### The commercial facts, settled 18-08-2026

These were the open questions. They are answered, and the whole site is written
against them. Full reasoning in `docs/DECISIONS.md`.

- **The audit is genuinely free.** RKADE does the mapping and the written report
  at no charge and makes its money on Build and Manage. The live site currently
  puts "Free Audit" on every button while also presenting Audit as a priced
  tier. That contradiction goes.
- **How it is charged, not how much.** Audit free, Build quoted per project once
  the audit has shown what needs building, Manage on a monthly retainer. No
  numbers on the site, because none are decided.
- **Nothing about who owns the code or the data.** Handled on the call. The site
  says nothing either way.
- **Manage has no client example yet.** Nobody is on an ongoing arrangement, so
  it is written as an offer and never as a track record.
- **The founders are named:** Raffay Ali and Kushan Naresh. No photos. This
  reverses the July decision to anonymise the About page.

The line to hold: RKADE is an AI automation consultancy that **builds the
systems**, not one that advises about them. CRMs, internal tools, data
platforms, websites, workflow automation. Dubai first, UAE next.

## What the revamp has to do

1. **Show the work.** The site's biggest failure is that it proves nothing.
   Five real projects exist. They go on the site.
2. **Get on brand.** Right palette, wrong everything else. Cormorant Garamond
   and Montserrat replace Bricolage Grotesque and Inter. The arch mark appears
   for the first time.
3. **Stop looking like every other AI agency.** Seven identical card grids on
   one flat cream background is the house style of the entire category. The arch
   is the way out of it and RKADE already owns it.
4. **Be worth scrolling.** Scroll-linked motion that explains the business
   rather than decorating it.
5. **Make the CTA work.** One "Free Audit" button, one destination, ideally an
   inline booking widget rather than a link off to someone else's page. This was
   already an open item before the revamp.

## Case studies: anonymised

Decided by Raffay, 18-08-2026: **anonymise all of it.** Sector plus outcome, no
client names, no logos. Revisit later if a client gives written consent.

Two hard rules on top of that, taken rather than asked:

- **No client financials on the site, in any form.** Not even anonymised, not
  even as a percentage. One of the five projects is a live forensic audit whose
  central finding is a revenue collapse. That finding belongs to the client. The
  case study uses process numbers instead: screens surveyed, rows parsed, years
  of data covered.
- **Nothing that could identify a client by elimination.** "A Dubai gold and
  diamond trader" is fine. "A Dubai gold and diamond trader on Gold Souk with
  three branches" is not.

## Constraints

- Stack stays: React, Vite, Tailwind, Framer Motion, Lenis, `vite-react-ssg`.
  No rewrite. This is a redesign, not a re-platform.
- Every change goes branch, PR, Netlify preview, explicit approval in chat,
  merge. No exceptions, even for typos. That rule exists because a direct push
  to main once had to be reverted live.
- Nothing goes to `main` until Raffay says so, in chat, having seen a preview.
- The site must be completely usable with animation switched off.

## Out of scope

- Blog, CMS, newsletter, gated content. Nothing that needs feeding weekly.
- Client login or portal.
- Multi-language. English only, as today.
- Renaming, re-logoing, or changing the brand guide. The guide is settled and
  the site's job is to obey it.
