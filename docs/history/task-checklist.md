# Task checklist

The full task list for the rkade.co revamp, one line per task. Source of truth
for what is actually done versus what `docs/plan/phase-NN.md` merely describes.
First written 18-08-2026, backfilled for phases 1 to 6 from the plan files and
`docs/history/session-log.md` since this file did not exist before. Nothing is
ever deleted, only moved. Newest at the bottom of each phase.

---

## Phase 1: foundation and brand truth

- [x] 1.1 Swap the fonts
- [x] 1.2 Rewrite `tailwind.config.js`
- [x] 1.3 Port the contrast checker
- [x] 1.4 Corners and spacing
- [x] 1.5 Apply the type roles
- [x] 1.6 The wordmark component
- [x] 1.7 Favicon and social card
- [x] 1.8 Build the arch mark
- [x] 1.9 Contact details
- [x] 1.10 Social links
- [x] 1.11 The banned words
- [x] 1.12 One CTA, one destination
- [x] 1.13 House documents
- [x] 1.14 Correct the project CLAUDE.md
- [x] 1.15 Retire the dead duplicate

## Phase 2: the arch system

- [x] 2.1 `<Arch>`, the parametric primitive
- [x] 2.2 `<ArchMark>` / `<ArchTrio>`, the three-arch composition
- [x] 2.3 The scroll-linked draw
- [x] 2.4 `<ArchFrame>` and `<ArchPassage>`
- [x] 2.5 Replace the generic fade-up
- [x] 2.6 `<Counter>`
- [x] 2.7 `<RuleSweep>`
- [x] 2.8 Reduced-motion audit
- [x] 2.9 `<Section>`
- [x] 2.10 Dark surfaces across the common kit

## Phase 3: homepage

- [x] 3.1 The hero
- [x] 3.2 The proof strip
- [x] 3.3 The idea (three arches, three tiers)
- [x] 3.4 The build
- [x] 3.5 Mobile
- [x] 3.6 Link out
- [x] 3.7 The problem, reshaped
- [x] 3.8 How it works
- [x] 3.9 Why RKade
- [x] 3.10 Selected work. Finished this session, was waiting on phase 4's case
      study data. Full-width editorial rows on cream, read live from
      `src/data/work.js`
- [x] 3.11 Industries. Moved directly beneath Selected Work on the same
      surface as part of this session's homepage section reorder
- [x] 3.12 The close

## Phase 4: the Work page

- [x] 4.1 The case study shape
- [x] 4.2 The index route
- [x] 4.3 Prerendering
- [x] 4.4 Dubai gold and diamond trader, custom CRM
- [x] 4.5 UAE luxury jewellery retailer, storefront
- [x] 4.6 Lead sourcing and enrichment platform
- [x] 4.7 UAE retail group, CRM forensic audit
- [x] 4.8 Our own CRM
- [x] 4.9 What ties them together
- [x] 4.10 `/work/:slug`
- [x] 4.11 Status is always visible
- [x] 4.12 Metadata
- [x] 4.13 What is available. Finished this session: screenshots re-shot
      against a repeatable demo-seed script (`Jewelry-CRM/scripts/demo-seed.mts`)
      after the first pass produced visually empty systems
- [x] 4.14 Screenshots beat generated images. Real screens used wherever a
      system could be booted; `lead-sourcing-platform` ships with no image
      deliberately, it could not be booted and a mockup would fail the site's
      own honesty test
- [x] 4.15 If we generate, the constraints. One generated image redone after
      garbled AI lettering on a jeweller's loupe
- [x] 4.16 The budget. Total spend USD 1.88, logged in
      `docs/history/image-generation.md`, well under the lifted cap

## Phase 5: Services, About, Contact

- [x] 5.1 Reshape the three tiers
- [x] 5.2 The audit is free, and the page says so ("Audit. Free." in the
      heading)
- [x] 5.3 Make each tier concrete, case study links on Audit and Build, none
      on Manage
- [x] 5.4 The FAQ, one-column accordion, cost question answered as a model
      not a number
- [x] 5.5 The arch story becomes the page (About, large Cormorant, arch mark)
- [x] 5.6 The founders, named: Raffay Ali and Kushan Naresh, both credited
      for the RK reveal
- [x] 5.7 How RKade works, new section on About
- [x] 5.8 The inline booking widget. Google embed proven impossible
      (`AppointmentBookingService/GetAppointmentServiceDefinition` returns
      400 even outside an iframe); shipped as a styled overlay with focus
      trap instead, keeping the outbound link
- [x] 5.9 The contact form, real inline validation, honeypot, success state
      with no reply-time promise
- [x] 5.10 The three routes in (form, WhatsApp, email) on the Contact page
- [x] 5.11 Navigation: Work added, order fixed, Process dropped, mobile menu
      rebuilt as a full-height overlay with its own focus trap
- [x] 5.12 Footer: tagline added, zero social icons rendered while the URLs
      are still placeholders
- [x] 5.13 404: an arch you walk back through

## Phase 6: polish and proof

- [x] 6.1 Contrast, measured. Header contrast bug found: it flipped to the
      cream bar at a fixed 72px scroll regardless of hero height, putting nav
      text at 3.10:1 over dark. Fixed, then the header was rewritten again to
      read `data-header-tone` from whatever section sits under it
- [x] 6.2 Reduced motion, properly. Found the homepage's three service tiers
      were PERMANENTLY INVISIBLE with reduced motion on. Fixed
- [x] 6.3 Keyboard and screen reader
- [x] 6.4 Content sweep, stat labels fixed where they wrapped to three or four
      lines
- [x] 6.5 Weight. Fonts self-hosted, zero third-party requests on any route
- [x] 6.6 Lighthouse. Accessibility 79 (home) / 87 (most case studies) taken
      to 100 on every route. LCP improved 37% home, 24% Services, 17% Work,
      measured throttled against a real before-build. CLS 0.00 everywhere
- [x] 6.7 SEO and metadata. Per-route titles, descriptions, canonicals, OG and
      Twitter cards, replacing one shared title across all ten routes.
      robots.txt, sitemap.xml, Organization JSON-LD, eslint wired to
      `npm run lint`
- [x] 6.8 The `/kit` route
- [x] 6.9 Real glass. Real-device pass at 390/768/1024/1440 across every
      route. Found and fixed gallery images rendering smaller at 768px than
      at 390px
- [x] 6.10 Browsers
- [x] 6.11 Routes
- [x] 6.12 The before and after

## Pre-deploy review fixes (not numbered tasks, logged here and in DECISIONS.md)

- [x] Unreferenced files removed from `public/`: an uncropped case-study
      screenshot, a garbled uncropped storefront capture, two unused textures
      and two OG background plates moved to `docs/history/`
- [x] Every Free Audit button now routes to `/contact` via a single
      `CALENDAR_LIVE` switch in `src/components/common/CTAButtons.jsx`,
      because the Google booking link is confirmed dead

## Phase 7: deploy

- [x] Branch, commit, push. Branch `site-revamp-2026`
- [x] Open the PR via the GitHub API. PR #9. `gh` CLI still authenticated as
      `raffayrkade`, so the missing `GITHUB_TOKEN` never actually blocked
      anything
- [x] Poll for and visit the Netlify deploy preview
- [x] Wire in Raffay's last-minute supplies before merge: a working Google
      booking link (verified signed out first) and the Instagram URL, commit
      9818fd2
- [x] Show Raffay the preview link, wait for an explicit yes in chat. Approved
      18-08-2026
- [x] Merge to `main` on approval, `--no-ff`, commit 6cb9429. Both
      `site-revamp-2026` and `phase-1-foundation-and-brand-truth` deleted
      locally and remotely
- [x] Post-deploy checklist verified live on rkade.co: /, /work, /services,
      /about, /contact all 200 with their own per-route titles, the new
      booking link is the only calendar link present anywhere (old dead one
      appears zero times), the Instagram icon renders, zero requests to
      fonts.googleapis.com, a bad URL renders the 404 page with tab title
      "Page Not Found | RKade"

**Phases 1 to 7 are all done. The site is live.**

## Post-launch: the business card QR chain

- [x] `/links` built and shipped: page, route, WhatsApp/booking/website/email
      buttons, hallmark footer, QR generated at error correction M and
      decoded-verified. PR #13, merged `--no-ff` as 4a7a57b, 29-08-2026
- [x] Demo CRM (separate project, `Jewelry-Demo`) built, checked and deployed
      to `demo.rkade.co` as a Cloudflare Worker, 29-08-2026
- [x] `DEMO_LINK` set to `https://demo.rkade.co`, the previously hidden Demos
      button on `/links` turned on and relabelled. PR #14, merged `--no-ff`
      as 782d58f, 29-08-2026. Card chain now complete end to end: QR to
      `rkade.co/links` to Demos to `demo.rkade.co/jewelry`
