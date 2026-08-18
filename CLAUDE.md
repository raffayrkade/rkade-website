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
