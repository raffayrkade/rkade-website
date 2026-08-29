# RKADE Website — Project Context

Read this file at the start of every session in this repo. It exists so a fresh chat can pick up
work on this project without the user re-explaining everything from scratch.

## Project overview

- **RKADE**: an AI automation consultancy. This repo is their marketing site.
- Stack: React + Vite + Tailwind CSS + Framer Motion + react-router-dom.
- **Hosted on Netlify**, live at **rkade.co**. (Not Vercel — the original README said Vercel, but
  that was never actually true in production; corrected during this project's first session.)
- GitHub repo: `raffayrkade/rkade-website`, default branch `main`.

## Repo structure

```
rkade-website/                          <- repo root (this file's location)
├── rkade-website/                      <- the LIVE site source (this is what deploys)
│   ├── src/pages/          Home, Work, Services, About, Contact, NotFound
│   ├── src/components/     home/, layout/, contact/, common/, services/, brand/, arch/
│   ├── src/data/work.js    the five case studies behind /work
│   ├── public/_redirects   SPA routing fix for Netlify (see Session Log)
│   ├── public/fonts/       self-hosted .woff2 files (zero third-party font requests)
│   └── package.json, vite.config.js, tailwind.config.js
├── docs/                                <- STATE.md, GOTCHAS.md, DECISIONS.md, PLAN.md, history/
└── .claude/                            <- Claude Code tooling config, not site content
    ├── launch.json      dev server config (npm run dev, port 5173)
    └── settings.json    permission allowlist (narrow, read-only Bash patterns)
```

**Resolved 18-08-2026:** `rkade-website - Updated Colors/`, previously an open question in this
file, was retired to `docs/history/updated-colors-experiment/` (`git mv`, nothing deleted). It no
longer exists at repo root. Logged in `docs/DECISIONS.md`. Separately, `Desktop\RKADE\` (outside
this repo entirely) holds older reference copies (`rkade-website - OLD`, another
`rkade-website - Updated Colors`), not part of git, not touched.

## Environment notes

- **Local Node/npm are available** in the Claude Code execution environment: Node v24.18.1 and
  npm 11.16.0, both on PATH, verified 18-08-2026. `npm install` and `npm run dev` work.
  `.claude/launch.json` runs the dev server on port 5173. This means changes can be built and
  loaded locally first, before anything is pushed. The Netlify deploy preview stays as the
  **approval gate** in the workflow below, not as the only way to see a change.
- **`GITHUB_TOKEN` is optional, not required.** It was gone from this machine for the phase 7
  deploy and turned out not to matter: the `gh` CLI was still authenticated as `raffayrkade` and
  opened PR #9 directly. Steps to set `GITHUB_TOKEN` up as a fallback are in `docs/SETUP.md`, but
  nothing waits on it.
- **`.claude/settings.json`** holds a narrow allowlist (currently just scoped GitHub API `curl`
  reads) to cut down on repeated permission prompts for safe, read-only commands.

## Established workflow for making changes

This was explicitly requested by the user after an early incident where a direct-to-`main` commit
went live, the user disliked it, and it had to be reverted live. Follow this every time:

1. Create a new branch for the change (e.g. `git checkout -b <descriptive-name>`).
2. Make the edit(s), commit, push the branch.
3. **Open the PR via GitHub's API** (using `GITHUB_TOKEN`) — don't ask the user to click a link
   unless the API approach is somehow unavailable.
4. Poll for the Netlify deploy preview URL (appears as a commit status /
   `netlify[bot]` PR comment within ~10–60s), then actually visit it with the browser tool and
   confirm the change rendered correctly — don't just assume the diff is right.
5. Show the user the preview link (and a screenshot/summary) and **wait for explicit approval**
   ("ship it" / "make it live" / "yes"). This is the one checkpoint that always requires a live
   chat confirmation, even though the user has said they trust the workflow — publishing to the
   live site is treated as a standing exception to "stop asking permission."
6. On approval: merge to `main` (`--no-ff`, descriptive merge commit), push, then **delete the
   branch** both remotely and locally without asking — this is pre-approved cleanup.
7. If the user rejects the preview: delete the branch without merging, `main` was never touched.

## Standing preferences (from explicit user feedback)

- **No em dashes anywhere in site copy.** The user considers them a tell for AI-generated writing
  and had all 22 existing instances rewritten with periods/commas/colons. Don't reintroduce them
  in new copy — write natural sentences instead.
- **Never merge to `main` without an explicit "yes" in chat first**, regardless of how much
  standing trust has been granted for everything else in the pipeline.
- **Auto-delete merged branches** without asking (see workflow step 6).
- Keep copy tight and non-corporate/non-"AI-sounding" generally — the user is sensitive to this
  and has pushed back on generic-sounding phrasing before.
- Don't touch `rkade-website - Updated Colors/` without asking — its purpose is unresolved (see
  Open Items).

## Open items

Both prior open items are resolved as of 18-08-2026, see Session Log. Nothing is currently
outstanding that needs a decision before starting. What remains is on Raffay's side, not code, and
is written up in `docs/SETUP.md`: repointing Formspree's delivery address to `contact@rkade.co`
(now the top item, since the site is live and the form is live), and pasting in the LinkedIn URL
when that page exists.

## Session Log

Checkpoint-style, one entry per meaningful change — not a full transcript. Newest last.

- **2026-07-12**: Corrected README/hosting docs from Vercel to Netlify (actual host, verified via
  response headers).
- **2026-07-12**: Established the branch → PR → Netlify preview → chat approval → merge → delete
  workflow, after a direct-to-main founder-name edit had to be reverted live.
- **2026-07-12**: Founder card labels changed from "The Builder" / "The Operator" placeholders to
  real names, Raffay Ali and Kushan Naresh (About page).
- **2026-07-12**: Fixed a 404-on-reload bug — added `public/_redirects` (`/* /index.html 200`) so
  Netlify serves `index.html` for all paths, letting React Router (BrowserRouter) handle routing
  client-side. Previously reloading any route other than `/` hit Netlify's static 404 page.
- **2026-07-12**: Shortened "Book a Free Audit" CTA copy to "Free Audit" across header nav, Hero,
  CTASection, and Contact page.
- **2026-07-12**: Set up `GITHUB_TOKEN` (fine-grained PAT) so PRs can be created via the GitHub
  API directly, removing the manual "click to create PR" step from the workflow.
- **2026-07-12**: Homepage/site-wide copy pass — removed WhatsApp CTA from Hero and CTASection
  (kept on the dedicated Contact page), rewrote the "Manual processes slow everything" line with a
  concrete stat, changed the WhyRkade headline to "We build the system. You close the clients.",
  minor wording tweaks ("shipped it" → "built it", "ship" → "build" for consistency), "Discover" →
  "Discovery" in the How It Works steps, and removed all em dashes site-wide.
- **2026-07-12**: Repo relocated from `Documents\GitHub\rkade-website` to
  `Desktop\Personal Claude\GIT\rkade-website` for easier access. Note: this required a **copy**,
  not a move — the original path's directory entry stayed locked by the running Claude Code host
  process even after its contents were cleared, so an empty folder shell may still exist at the
  old path; harmless, safe to delete manually once confirmed unused.
- **18-08-2026**: The whole site was rebuilt this session, phases 1 through 6 of the plan in
  `docs/PLAN.md`. Full detail lives in `docs/STATE.md` and `docs/history/session-log.md`. Built
  and verified locally on branch `phase-1-foundation-and-brand-truth`, not merged to `main`, not
  deployed. This entry closes both open items above: the booking widget is now a styled overlay
  with a focus trap on the Contact page (the Google embed itself was proven impossible, so the
  fallback is the existing outbound link, not an iframe), and `rkade-website - Updated Colors/`
  was retired to `docs/history/updated-colors-experiment/`, not kept or finished.
- **18-08-2026**: Homepage, Work page (five case studies plus imagery), Services, About and
  Contact all rebuilt around the arch motif. Nav, footer and 404 rebuilt too: Work added to the
  primary nav, Process dropped, mobile menu rebuilt as a full-height overlay.
- **18-08-2026**: Two real bugs found and fixed in the accessibility pass: the header was
  flipping to its cream bar at a fixed 72px of scroll regardless of hero height, putting nav text
  at 3.10:1 contrast on some pages, and the homepage's three service tiers were permanently
  invisible whenever reduced motion was on. Accessibility is now 100 on every route, was 79 on
  the homepage and 87 on most case studies.
- **18-08-2026**: Fonts self-hosted, so the site now makes zero third-party requests on any
  route. Every route has its own title, description, canonical, OG and Twitter card, where all
  ten routes previously shared one identical title. LCP improved 37% on the homepage, 24% on
  Services, 17% on Work, measured throttled against a real before-build.
- **18-08-2026**: Pre-deploy review found and fixed two issues: six unreferenced files were still
  sitting in `public/`, which still deploys and is still a live URL even with nothing in `src/`
  linking to it, so they were moved to `docs/history/`. And the Google booking link
  (`calendar.app.google/La6EpDjL6HBNR67k7`) was confirmed dead in a real signed-out browser check,
  so every "Free Audit" button now routes to `/contact` via a single `CALENDAR_LIVE` switch in
  `src/components/common/CTAButtons.jsx`, currently `false`.
- **18-08-2026**: `GITHUB_TOKEN` was found to be gone from this machine (contradicts the
  Environment notes above, which still describe it as set). Steps to recreate it are in
  `docs/SETUP.md`. Only needed at deploy: if still missing then, the branch gets pushed and
  Raffay clicks the create-PR link himself. Phases 1 to 6 are done. Phase 7, deploy, is the only
  phase left and only runs on the word `deploy`.
- **18-08-2026, the site went live**: branch `site-revamp-2026` opened as PR #9, using the `gh`
  CLI directly (still authenticated as `raffayrkade`), so the missing `GITHUB_TOKEN` never actually
  blocked anything. Before merge, Raffay supplied a working Google booking link
  (`calendar.app.google/waHYAngJttZ25BbL7`, checked signed out first, since the old one looked fine
  to him and returned "Appointment not found" to everyone else) and the Instagram URL
  (`https://www.instagram.com/rkade.co`); both wired in and verified, commit 9818fd2. Raffay
  reviewed the Netlify preview and approved it in chat. Merged `--no-ff` to `main` as 6cb9429.
  Both `site-revamp-2026` and `phase-1-foundation-and-brand-truth` deleted, locally and remotely.
  Verified live on rkade.co: all five routes 200 with their own titles, the new booking link the
  only calendar link present anywhere, the Instagram icon rendering, zero requests to
  fonts.googleapis.com, a bad URL rendering the 404 page. **This closes both prior Open items**:
  the inline booking widget was scoped and built as a focus-trapped overlay around the existing
  link, not a true embed, because Google's own API returned `400 Precondition check failed` for
  the embed even outside an iframe (see `docs/DECISIONS.md`, session 6); and
  `rkade-website - Updated Colors/` was retired to `docs/history/`, not kept or finished. All
  seven phases of `docs/PLAN.md` are now done. What is left is on Raffay's side, not code:
  repointing Formspree's delivery address (now the priority, since the form is live) and pasting
  in the LinkedIn URL. Full detail in `docs/STATE.md`.
- **19-08-2026**: Kushan sent a homepage copy review and a full audit of deploy preview #9. Both
  worked through against the code first, which mattered: the em dash sweep, the nav contrast fix
  and the honeypot `aria-hidden` were already done, and two more items were wrong (the stats band
  "leading zeros" is the screen-reader span being scraped, not a render fault, and the audit's
  own `netlify.toml` fix for the 404 would have handed a 404 to real pages). What was real and is
  now fixed: the header was fully transparent over dark sections, so content scrolled through the
  nav; and unknown URLs returned HTTP 200 with a byte-identical homepage, because the prerendered
  fallback was `index.html`. The homepage copy was repositioned off headcount-reduction language
  throughout (hero, subhead, final CTA, footer, the first problem label), the tagline became "AI
  Consultants", the impossible "fall by around 400%" became the 4x increase the study actually
  found, the Industries band was retired to `docs/history/`, and `/privacy` and `/terms` were
  written and shipped, which closes the one thing the site was collecting form data without.
  Raffay approved the preview in chat and it went live the same session: PR #10, merged
  `--no-ff` as e601ae2, branch deleted both sides. Verified on rkade.co, including the one thing
  that can only be checked in production: a bad URL now returns a real HTTP 404 with the 404 page,
  where it previously returned 200 and a byte-identical copy of the homepage. Full detail in
  `docs/DECISIONS.md`. Two things stay open and neither is code: the same copy pass on the other
  four pages, which needs Kushan, and one screenshot for the lead-sourcing case study, which needs
  Raffay. Both are rows in `docs/BLOCKED.md`.

- **22-08-2026**: Kushan's audit pass 2 (of production, not a preview) worked through and shipped as
  PR #12, merged `--no-ff` as 5a99ce1, both branches deleted. **Two of its findings were checked
  against source and deliberately not actioned.** N1, the only item the report called urgent,
  claimed three homepage stat values had silently dropped: they had not. `ProofStrip.jsx` still
  reads 3 / 28 / 170 / 90,048 and git shows those were written once and never edited. `Counter.jsx`
  animates each figure up from zero over 1,400ms and the audit scraped the DOM mid-animation, which
  is why every reported value was under the real one and the only match was the only number small
  enough to finish counting instantly. S3, the honeypot, already had `aria-hidden` on its wrapper,
  and hiding a container hides its subtree; the attribute was added to the input anyway to stop a
  third pass reporting it. What was real is fixed: the homepage is a full screen shorter on both
  desktop (10.1 to 9.1 screens) and mobile (13.0 to 12.0), empty space 34% to 23%, achieved by
  tightening `Section.jsx`'s padding scale and the six components that were hard-coding it instead
  of importing it. **Three problems no document had found** were fixed on the way:
  `dist/.vite/ssr-manifest.json`, 29KB naming every source path in the project, was publicly
  downloadable and is now stripped by `scripts/strip-build-artifacts.mjs`; the header nav links were
  20px tall, missed by the audit because it measured at phone width where they sit behind the mobile
  menu; and `/services` still described tier 2 with the list the homepage had already retired, so
  the two pages contradicted each other on the same product. This release also carried 253575d, the
  iPhone scroll and viewport work written on 19-08-2026 and never shipped, bundled so it got checked
  on a real phone in the same preview. Still open, neither is code: the lead-sourcing screenshot
  (Raffay) and the copy pass on the other four pages (Kushan). Full detail in `docs/DECISIONS.md`.

- **29-08-2026**: `/links` shipped, the permanent destination behind the QR code printed on RKade's
  business cards. Built on branch `links-page`, opened as PR #13, Raffay approved the Netlify
  preview in chat, merged `--no-ff` to `main` as commit 4a7a57b, branch deleted both sides. Verified
  live: `https://rkade.co/links` returns HTTP 200 with the prerendered page, one WhatsApp button
  ("Message the team", wa.me/971505502465, routed to Kushan since he is the one in the field), the
  Google booking link, website and email buttons, and the hallmark footer. One mid-preview
  correction from Raffay: the page shipped with two WhatsApp buttons and he asked for one, logged in
  `docs/PREFERENCES-INBOX.md`. New files: `src/pages/Links.jsx`, a route in `routes.jsx`, two new
  constants in `CTAButtons.jsx` (`WHATSAPP_CARD`, `DEMO_LINK`), the route added to the vite
  prerender list, and a per-route text-length floor in `scripts/verify-routes.mjs` since the page is
  terse by design. The QR files themselves live at `docs/brand/qr/`, error correction M, decoded and
  verified to read exactly `https://rkade.co/links` before anything went to print. The page is
  noindexed and left out of the sitemap: it is for someone holding a card, not for search. Also
  scoped the same day, as a new and separate project: the demo CRM, folder `Jewelry-Demo`, will live
  at `demo.rkade.co` as a hub listing one card per industry demo, jewellery demo at
  `demo.rkade.co/jewelry`, private per-visitor seed data in `localStorage`, no shared database, 24h
  reset, no "coming soon" tiles ever. Nothing in this repo depends on it existing yet: `/links`'s
  demo button ("See the system") stays hidden until `DEMO_LINK` in `CTAButtons.jsx` stops being
  `PLACEHOLDER`. Full detail in `docs/DECISIONS.md` and `docs/STATE.md`.
