# Phase 5: Services, About, Contact

**Goal:** bring the three inner pages up to the homepage's standard, and finally
close the inline booking item that has been open since July.

**Needs:** phase 2 for units A, B and D. Unit C needs nothing and can run any
time a session is otherwise blocked.

---

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Services | Phase 2 | B, C |
| B: About | Phase 2 | A, C |
| C: Contact and booking | Phase 1 only | A, B |
| D: Nav, footer, 404 | Phase 2, plus phase 4 unit A for the Work link | Nothing |

## Lanes

**Lane 1:** Unit A
**Lane 2:** Unit B
**Lane 3:** Unit C

All three in the same message. Unit D last, alone.

---

## Unit A: Services

Owner: `ui-builder`.

### 5.1 Reshape the three tiers

The page is currently three stacked rows of description plus a tick list. The
content is decent. The presentation is a pricing table without prices.

New: one full section per tier, alternating tone, each framed by its own arch
from the `ArchMark` set. The homepage builds all three arches together as one
mark. This page takes them apart and gives each one a page-section of its own.
Same visual language, opposite direction.

### 5.2 The audit is free, and the page has to say so

Confirmed by Raffay 18-08-2026. **Tier 1 Audit is genuinely free.** RKADE does
the workflow mapping and the written report at no charge, and makes its money on
Build and Manage.

This resolves a real contradiction on the current site, where "Free Audit" is
the button everywhere and "Audit" is simultaneously presented as a priced tier.

It is also the single strongest thing on the page and it is currently buried.
The brand guide asks for specificity over adjectives, and "the audit is free" is
about as specific as it gets. So:

- Tier 1 is presented as **the way in**, not as the cheapest of three products.
  Same visual weight as the others, different role
- The word **free** appears in the tier's own heading, not in small print
- The deliverables list stays exactly as it is. It is good, and it is more
  convincing once the reader knows it costs nothing
- Every "Free Audit" CTA on the site points here or at the calendar. Never
  soften the wording

### 5.3 Make each tier concrete

Each tier gets, under the deliverables, **an example from the work**, linked to
the relevant case study. Audit points at the CRM forensic audit. Build points at
the jewellery CRM.

**Manage gets no example.** Raffay confirmed 18-08-2026 that nobody is on an
ongoing management arrangement yet. So Manage is written as what RKADE offers,
not as something it has done, and it carries no case study link and no implied
client. Do not stretch another project to fill the slot. An empty slot is
honest and a fabricated one is the kind of thing a prospect checks.

This is what turns a service list into evidence, and it is why phase 4 comes
first.

### 5.4 The FAQ

Five questions, currently a two-column card grid. Make it an accordion, one
column, generous type.

**Add one question: what does it cost.** Raffay's answer, 18-08-2026: explain
the model, no numbers. So:

> The audit is free. A build is quoted per project once the audit has shown
> what needs building. Ongoing management is a monthly retainer.

That is the whole answer. It tells a prospect how they will be charged without
committing to a number, and it stops the most common reason someone closes the
tab. **Do not add a range, a "from" price or a "typical project" figure.** Those
are not decided.

**Do not add an ownership or IP question.** Raffay's call, 18-08-2026: keep it
off the site and handle it on the call. Write nothing about who owns the code or
the data, in the FAQ or anywhere else.

---

## Unit B: About

Owner: `ui-builder`.

### 5.5 The arch story becomes the page

The best writing on the entire site is the "Why RKADE" paragraph explaining that
arcade comes from the Latin for arch, a structure that holds up a passageway. It
is currently three short paragraphs beside a stock image, on page four.

Make it the top of the About page, in large Cormorant, with the arch mark
drawing alongside it. The whole site is built on this idea and this is where it
gets explained.

Add the part the site never says: **RK is Raffay and Kushan.** The founders'
initials sit inside the word. That is a genuinely good piece of naming and
hiding it is a waste.

### 5.6 The founders, named

Confirmed by Raffay 18-08-2026: **Raffay Ali and Kushan Naresh.** Names on the
page, no photos.

Note this reverses the July change that stripped the names out, on the
`about-anonymize-founder-cards` branch. Two icon cards with no names and no
faces read as evasive, which was the opposite of the intent. The About page of a
two-person consultancy is where a prospect decides whether these are real
people.

Attach the existing copy to the right person. It is good copy and it is
currently attached to nobody:

- **Raffay Ali**, the build side. Lives in the tools, the APIs and the edge
  cases. Turns a scoped process into a working system.
- **Kushan Naresh**, operations. Deals and operations background: sourcing and
  closing acquisitions, standardising diligence process at a private equity
  firm. Leans into client conversations and scoping, turning a messy process
  into something worth automating.

Keep the honest framing already on the page: they both build, they both sit with
clients, these are just where each spends more time.

And say the thing the site has never said: **RK is Raffay and Kushan.** Their
initials sit inside the word RKade. That belongs next to the founders, or next
to the name story in 5.4, whichever reads better.

Delete the second base44 stock image.

### 5.7 How RKade works

New, short section. Not the client process, which is on the homepage, but how
the work actually gets done: phased builds, every phase verified before the
next, nothing shipped that has not been loaded in a real browser, the client
sees a preview before anything goes live.

This is true, it is unusual, and it is the reason the work is good. It is worth
one section.

---

## Unit C: Contact and inline booking

Owner: `integrator`. Independent of everything visual.

### 5.8 The inline booking widget

**This has been an open item since 12-07-2026.** Free Audit currently sends
people off to an external calendar page. Raffay asked for something embedded.

**The link is settled.** Raffay confirmed 18-08-2026 that the Google Calendar
appointment link already on the site is the real, monitored one:
`calendar.app.google/La6EpDjL6HBNR67k7`. The brand guide's Calendly URL is
stale. Do not switch providers to make embedding easier, that would move
bookings into a calendar nobody is watching.

So the job is to embed **that** schedule.

- Google Calendar appointment schedules expose an embeddable iframe from the
  same booking page. Find it from the schedule's own share options rather than
  hand-building a URL. **Confirm the embed shows real availability and takes a
  real booking before building anything around it.** Some Google appointment
  schedules do not embed cleanly depending on how the calendar is configured
- Lazy load it. It must not block first paint and it must not load at all until
  the visitor scrolls to it
- **It is third-party content**, which breaks the site's rule that nothing loads
  from someone else's domain. That rule was written about decorative images and
  a booking widget is a different trade. Make the exception knowingly, log it in
  `docs/DECISIONS.md`, and keep it to this one place
- Give it a real fallback. If the iframe is blocked, by a privacy extension or a
  strict browser, the visitor must still see a working link through to the
  booking page. An empty box is worse than the link the site has today

**If the Google schedule will not embed properly**, do not switch to Calendly to
solve it. Keep the outbound link, open it in a properly styled overlay, and
report that the embed was not possible. A smaller win on the right calendar
beats a nicer widget on the wrong one.

Verify by making a real booking through the embed and watching it land. Then
cancel it.

### 5.9 The contact form

Keep Formspree, it works. Fix around it:

- Repoint to `contact@rkade.co` if phase 1 unit C has not already
- Real inline validation, not just an HTML `required` attribute
- A success state that says what happens next and by when. "We reply within one
  working day" if that is true. Ask before writing a time
- An error state offering WhatsApp as the fallback, since that is the channel
  Raffay says is fastest
- Honeypot field for spam. The form is currently unprotected

### 5.10 The three routes in

WhatsApp, calendar, email. Keep all three, restyle them, and keep the honest
framing about which is fastest. That copy is on-voice and it is one of the
better things on the current site.

---

## Unit D: Nav, footer, 404

Owner: `ui-builder`. **Needs phase 4 unit A.**

### 5.11 Navigation

Add Work, first. Final order: Work, Services, About, Contact, then the Free
Audit button.

The nav sits over a dark hero on the homepage and over cream elsewhere. It has
to read on both and transition cleanly at the boundary. Currently it is
`bg-cream/70` with a blur, which will be invisible over the new hero.

Rebuild the mobile menu. It is currently an inline block that pushes the page
down. Make it a proper full-height overlay with the arch motif and a focus trap.

### 5.12 Footer

- The wordmark, correctly set, at last, with the arch mark if it is signed off
- Social: Instagram and LinkedIn only. Twitter and GitHub are gone. Both
  remaining ones use the placeholder pattern from phase 1 task 1.10, so **while
  the pages do not exist the footer renders no social icons at all**. That is
  correct. No icons beats three dead ones, and each appears on its own the
  moment Raffay pastes a URL in
- Add the tagline the brand guide specifies: AI Automation Consultancy,
  Dubai, UAE
- The existing "Systems, not hype." line is good. Keep it

### 5.13 404

Currently a placeholder. Make it an arch you walk through to get back. It is the
one page where the motif can be playful, and it costs nothing.

---

## Definition of done

- [ ] `npm run build` and `npm run check:contrast` pass
- [ ] `verify:routes -- /services,/about,/contact,/404` all 200 and non-blank
- [ ] A test booking made through the widget, landing in the real calendar,
      **screenshotted**. Not "the embed rendered"
- [ ] A test message sent through the contact form, arriving at the real inbox,
      screenshotted
- [ ] Mobile menu keyboard-navigable, focus trapped, closes on Escape
- [ ] Screenshots at 390 and 1440px for all four routes
- [ ] Zero third-party images. The booking script is the one logged exception

## Merge checkpoint

`checker`, then `reviewer`. This phase touches live contact routes, so the
reviewer's specific job is to confirm every route in and out of the site
actually works, by using it, not by reading it.
