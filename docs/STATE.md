# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 22-08-2026

---

## Status

```
Right now:     LIVE. rkade.co serves the audit pass 2 fixes and the iPhone
               work. Nothing is in flight and no branch is open.
To see it:     https://rkade.co, or cd rkade-website && npm run dev for local
               changes
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 22-08-2026, commit 5a99ce1, merged from
               audit-pass-2-fixes (PR #12)
Since you last looked: audit pass 2 shipped, PR #12, and so did the iPhone
               work that had been sitting unshipped since 19-08-2026. Two of
               Kushan's findings were checked and dropped rather than
               actioned, including the one he called urgent. Three problems no
               document had found were fixed on the way. See docs/DECISIONS.md.
```

## Progress

```
PHASE    [████████████████████]  Phase 7 of 7 done      (100%)
TASKS    [████████████████████]  87 of 87 done          (100%)
```

Build time left: not enough history yet, I have 6 units measured. There is
nothing left to build. Phase 7 (branch, PR, preview, merge, live-site
verification) took under an hour with no debug rounds, `docs/history/timings.md`
row 6.

Realistically: nothing left to build. Because: the two things still open are
Raffay's to do himself, not building, see Blockers below.

`docs/history/timings.md` has all six entries.

## Next up

There is no phase 8 planned. What comes after launch:

0. **Read /privacy and /terms on the preview, then approve or reject the PR.**
   They are the only pages on the site written as legal text rather than
   marketing, so they are the only ones nobody else can sign off.
1. **Get Formspree's delivery address repointed to `contact@rkade.co`.** This
   is now the one thing that actually matters, see Blockers.
2. **Get the LinkedIn company page URL** once it exists, paste it into
   `CTAButtons.jsx`'s `LINKEDIN_LINK`.
3. **Watch the live site for real-world issues** now that real visitors are on
   it: the contact form actually reaching an inbox, the booking link staying
   up, any route returning something other than 200.
4. **No further phases are currently planned.** Wait for Raffay's direction on
   what the site needs next before starting anything new.
5. **Keep logging new work units to `docs/history/timings.md`** as they
   happen, so a future estimate has real history behind it rather than a
   guess.

## Blockers

**One real item, and it matters more now the site is live:** repoint
Formspree's delivery address from `hello@rkade.co` to `contact@rkade.co`. The
contact form on rkade.co is live today, real visitors can submit it right now,
and every submission until this is changed lands in an inbox Raffay may not be
watching. Steps in `docs/SETUP.md`.

The only other open item, and it blocks nothing: paste the LinkedIn company
page URL into `CTAButtons.jsx` once that page exists. The footer simply shows
no LinkedIn icon until then, Instagram already renders on its own.

Two new rows in `docs/BLOCKED.md`, neither of them code: the copy review for
the other four pages has to come from Kushan, and the lead-sourcing case study
still needs one screenshot before it has any image at all.

Resolved 18-08-2026: the dead Google booking link, replaced with a working
schedule and verified signed out. Instagram, now live in the footer. The
missing `GITHUB_TOKEN`, which turned out not to matter because the `gh` CLI
is still authenticated and opened the PR directly.

## Things that are true and were not last session

- **Audit pass 2 is live**, commit 5a99ce1 (PR #12), merged `--no-ff` after
  Raffay approved the preview in chat. Both branches deleted, locally and
  remotely. Verified on rkade.co after the deploy: 12 routes 200 with a bad
  URL returning a real 404, `/.vite/ssr-manifest.json` now a 404, the stats
  serving 3 / 28 / 170 / 90,048, zero elements under 24px at 390 and 1440,
  no horizontal scroll, no console errors, and the header still 73px so the
  `/#how-it-works` offset is intact.

- **Two of the audit's findings were wrong, and checking first is why we know.**
  N1, reported as the only urgent item, claimed three stat values had silently
  dropped. Source says otherwise: those four numbers were written once and
  never edited. The counter animates them up over 1.4 seconds and the audit
  read the DOM mid-animation, which is why every reported value was slightly
  under the real one and the only one that matched was the only one small
  enough to finish counting instantly. S3 was the same shape: the honeypot's
  `aria-hidden` was on the wrapper, not the input, and hiding a container
  hides its subtree. Both are written up in `docs/DECISIONS.md`.

- **The homepage is a full screen shorter, measured not assumed.** Desktop
  9,306px to 8,386px, 10.1 screens to 9.1. Mobile 10,883px to 10,153px, 13.0
  to 12.0. Empty space 34% to 23%. The lever was `Section.jsx`'s padding
  scale, which six other components were hard-coding rather than importing;
  all six now match.

- **`dist/.vite/ssr-manifest.json` was being published.** 29KB naming every
  source path in the project, reachable at `/.vite/ssr-manifest.json`. Found
  while fixing the audit's smaller version of the same problem. `npm run
  build` now strips it. Third time this trap has bitten: anything in `dist/`
  or `public/` is a live URL whether or not the site links to it.

- **The site is live and has been since 19-08-2026**, commit e601ae2 (PR #10),
  on top of the 18-08-2026 launch (6cb9429, PR #9). Both go-lives verified on
  rkade.co at the time. The detail of what each one shipped and what it fixed
  has moved to `docs/history/state-go-live-entries.md`, so this file stays
  under its cap.

## Known, still open

- **`rkade-website - Updated Colors/` question is resolved, not open.** It
  moved to `docs/history/updated-colors-experiment/`, logged in
  `docs/DECISIONS.md`.
- Nothing from the build itself is known-incomplete. What remains is the two
  items in Blockers above, both on Raffay's side, not code.

## Session protocol for this project

- Open it with `rkade rkade-website`. **Never by opening `Desktop/RKADE` and
  changing folder**, which silently loses this project's permissions.
- `.claude/settings.json` still allows only one scoped GitHub `curl` pattern.
  A write to widen it was refused by the permission classifier on 18-08-2026,
  so expect prompts on `npm`, `node` and `git`. Widening it needs Raffay.
- Read `docs/GOTCHAS.md` and `docs/CONVENTIONS.md` before writing any code.
- **Nothing reaches `main` without an explicit yes in chat, having seen a
  Netlify preview.** Standing exception to every other permission rule. This
  still applies to any future change, the site being live does not relax it.

## The files

| File | What is in it |
|---|---|
| `docs/PLAN.md` | Index of the seven phases, all done. **Never read it for task detail** |
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
