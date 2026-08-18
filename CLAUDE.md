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
│   ├── src/pages/          Home, About, Services, Contact, NotFound
│   ├── src/components/     home/, layout/, contact/, common/
│   ├── public/_redirects   SPA routing fix for Netlify (see Session Log)
│   └── package.json, vite.config.js, tailwind.config.js
├── rkade-website - Updated Colors/     <- OPEN QUESTION, see below
└── .claude/                            <- Claude Code tooling config, not site content
    ├── launch.json      dev server config (npm run dev, port 5173)
    └── settings.json    permission allowlist (narrow, read-only Bash patterns)
```

**Open question, not yet resolved:** `rkade-website - Updated Colors/` is tracked in git but is
an *incomplete* project (no `package.json`, `App.jsx`, `main.jsx`, or `vite.config.js` — not
runnable standalone). Its purpose and whether to keep, finish, or delete it hasn't been decided.
Separately, `Desktop\RKADE\` (outside this repo entirely) holds older reference copies
(`rkade-website - OLD`, another `rkade-website - Updated Colors`) — not part of git, not touched.

## Environment notes

- **Local Node/npm are available** in the Claude Code execution environment: Node v24.18.1 and
  npm 11.16.0, both on PATH, verified 18-08-2026. `npm install` and `npm run dev` work.
  `.claude/launch.json` runs the dev server on port 5173. This means changes can be built and
  loaded locally first, before anything is pushed. The Netlify deploy preview stays as the
  **approval gate** in the workflow below, not as the only way to see a change.
- **`GITHUB_TOKEN` env var** is set (persisted via Windows `setx`, fine-grained PAT scoped to just
  this repo, Contents + Pull requests read/write). This lets PRs be created directly via GitHub's
  API — no manual "click to create PR" step needed.
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

## Open items (not yet done, don't start without asking)

- **Inline booking widget**: currently "Free Audit" CTAs link out to an external Google Calendar
  link. User wants this replaced with something embedded directly on the site for a smoother
  experience. Explicitly deferred — scope out the calendar/scheduling provider situation
  (Calendly vs raw Google Calendar link vs something else) before starting.
- **Decide the fate of `rkade-website - Updated Colors/`** — keep, finish, or delete.

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
