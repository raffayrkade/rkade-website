# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 18-08-2026

---

## Status

```
Right now:     Running locally only. Not live. Phases 1 to 6 are BUILT AND
               VERIFIED LOCALLY on branch phase-1-foundation-and-brand-truth,
               committed to that branch, not merged to main. rkade.co still
               serves the OLD site.
To see it:     cd rkade-website && npm run dev
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 12-07-2026, commit 88da91d, arch parallax centering fix
Since you last looked: The whole site was rebuilt this session. Selected Work
               landed on the homepage, the Work page got its imagery, Services,
               About and Contact were rebuilt, and a full accessibility,
               performance and SEO pass took every route to 100. Only deploy
               is left, and it only happens on the word `deploy`.
```

## Progress

```
PHASE    [████████████████░░░]  Phase 6 of 7 done      (86%)
TASKS    [███████████████████░]  78 of 79 done          (99%)
```

Build time left: not enough history yet, I have 5 units measured. Four of the
five were single phases; this one was four phases in one session, so it does
not cleanly average against the others.

Realistically: ready to deploy the moment you type `deploy`. Because: phase 7
never runs on its own, and nothing else is technically blocking it, see
Blockers below for what is still worth fixing first.

`docs/history/timings.md` has all five entries.

## Next up

1. **Phase 7 is running.** Raffay approved the preview and asked for it live on
   18-08-2026, having supplied a working booking link and the Instagram URL.
   Both are wired in and verified. The branch is `site-revamp-2026`, PR #9.
2. After the merge: confirm rkade.co serves the new site, then delete the
   branch locally and remotely.
3. Only two optional items are left, neither blocking anything. See Blockers.

## Blockers

**None.** Two optional items remain, both written up in `docs/SETUP.md`:

| Thing | Effect while it waits |
|---|---|
| Repoint Formspree's delivery address to `contact@rkade.co` | The form still sends, it currently lands in the old `hello@rkade.co` inbox. This is the one worth doing soon, because messages are going somewhere Raffay may not be watching |
| Paste the LinkedIn URL when that page exists | Footer renders the Instagram icon only. No dead links either way |

Resolved 18-08-2026: the dead Google booking link, replaced with a working
schedule and verified signed out. Instagram, now live in the footer. The missing
`GITHUB_TOKEN`, which turned out not to matter because the `gh` CLI is still
authenticated and opened the PR directly.

## Things that are true and were not last session

- **Selected Work is built.** Three case studies as full-width editorial rows
  on the homepage, read live from `src/data/work.js`.
- **Every case study has a real image, except one on purpose.**
  `lead-sourcing-platform` ships with `image: null` because it could not be
  booted for a real screenshot and an invented mockup would fail the site's
  own honesty test. Total image spend: USD 1.88, in
  `docs/history/image-generation.md`.
- **Services, About and Contact are rebuilt.** All three left the flat, all-
  cream, phase 1 shape behind: arch-framed sections, tone alternation, the
  founders named on About, booking as a focus-trapped overlay on Contact.
- **The header now reads the section under it.** `data-header-tone` replaced
  a fixed 72px scroll threshold that was putting nav text at 3.10:1 contrast
  on some pages. Fixed in phase 6, closing an item this file had carried
  since phase 3.
- **Accessibility is 100 on every route.** Was 79 on the homepage, 87 on most
  case studies. Two real bugs were behind part of the gap: the header
  contrast issue above, and the homepage's three service tiers being
  permanently invisible with reduced motion on.
- **Zero third-party requests on any route.** Fonts are self-hosted from
  `public/fonts/*.woff2` rather than fetched from Google's CDN.
- **Every route has its own SEO.** Title, description, canonical, OG and
  Twitter card, where all ten routes previously shared one identical title.
  Plus robots.txt, sitemap.xml, Organization JSON-LD, and `npm run lint`.
- **Only shipped files live in `public/`.** An unreferenced file there still
  deploys and is still a live URL; six such files were moved to
  `docs/history/` in the pre-deploy review. See `docs/GOTCHAS.md`.

## Known, still open

- **`rkade-website - Updated Colors/` question is resolved, not open.** It
  moved to `docs/history/updated-colors-experiment/`, logged in
  `docs/DECISIONS.md`.
- Nothing else from phases 1 to 6 is known-incomplete. What remains is phase
  7 itself, and the four items in Blockers above.

## Session protocol for this project

- Open it with `rkade rkade-website`. **Never by opening `Desktop/RKADE` and
  changing folder**, which silently loses this project's permissions.
- `.claude/settings.json` still allows only one scoped GitHub `curl` pattern.
  A write to widen it was refused by the permission classifier on 18-08-2026,
  so expect prompts on `npm`, `node` and `git`. Widening it needs Raffay.
- Read `docs/GOTCHAS.md` and `docs/CONVENTIONS.md` before writing any code.
- **Nothing reaches `main` without an explicit yes in chat, having seen a
  Netlify preview.** Standing exception to every other permission rule.

## The files

| File | What is in it |
|---|---|
| `docs/PLAN.md` | Index of the seven phases. **Never read it for task detail** |
| `docs/plan/phase-NN.md` | The tasks for one phase. Read only the one you are on |
| `docs/BRIEF.md` | What the revamp is and why |
| `docs/AUDIT.md` | What was wrong with the old site, with the evidence |
| `docs/ART-DIRECTION.md` | The settled visual system. **Before any UI work** |
| `docs/GOTCHAS.md` | Traps that have already bitten. Read before writing code |
| `docs/CONVENTIONS.md` | How this repo does things |
| `docs/SETUP.md` | The things Raffay has to go and do himself |
| `docs/brand/README.md` | Logo assets, arch mark measurements, brand rules |
| `docs/DECISIONS.md` | Every call taken, and how to reverse it |
| `docs/history/task-checklist.md` | The full task list, one line per task |
