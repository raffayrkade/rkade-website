# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 19-08-2026

---

## Status

```
Right now:     LIVE. rkade.co serves the new site, all seven phases done.
               A copy and audit pass is built and waiting on Raffay's yes:
               branch cofounder-copy-pass-and-audit-fixes, PR open, NOT merged.
To see it:     https://rkade.co, or cd rkade-website && npm run dev for local
               changes
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 18-08-2026, commit 6cb9429, merged from site-revamp-2026 (PR #9)
Since you last looked: Kushan's homepage copy review and a full audit of
               preview #9 were both worked through. Two real blockers fixed
               (the header was transparent over dark sections, and unknown
               URLs returned 200 with the homepage), the homepage copy
               repositioned off headcount-reduction language, and /privacy
               and /terms written and shipped. Four of their items turned out
               to be already done or wrong, see docs/DECISIONS.md.
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

- **A copy and audit pass is built but not live.** Branch
  `cofounder-copy-pass-and-audit-fixes`. The hero, the final CTA, the footer
  and the problem section no longer sell headcount reduction; the tagline is
  "AI Consultants"; the impossible "fall by around 400%" claim is now the 4x
  increase the study actually found; the Industries band is gone; `/privacy`
  and `/terms` exist. Verified locally, waiting on the Netlify preview and an
  explicit yes.
- **The site had no real 404 and nobody noticed, because the browser check
  passed.** A bad URL rendered the 404 page after hydration while returning
  HTTP 200 and the homepage's own HTML and canonical. Fixed by prerendering
  `dist/404.html` and pointing `_redirects` at it with a 404 status. The
  lesson is in `docs/DECISIONS.md`: a rendered page is not a status code.

- **The site is live.** Merged `--no-ff` to `main` as commit 6cb9429, PR #9,
  after Raffay approved the Netlify preview in chat. Verified on the real
  site: all five routes 200 with correct per-route titles, the new booking
  link the only calendar link present, the Instagram icon rendering, zero
  requests to `fonts.googleapis.com`, a bad URL rendering the 404 page.
- **Both build branches are gone.** `site-revamp-2026` and
  `phase-1-foundation-and-brand-truth` deleted, locally and remotely.
- **The booking link works again.** Raffay supplied
  `calendar.app.google/waHYAngJttZ25BbL7`, checked signed out before being
  trusted. `CALENDAR_LIVE` in `src/components/common/CTAButtons.jsx` is `true`.
- **Instagram is live in the footer**, `https://www.instagram.com/rkade.co`.
  LinkedIn stays `PLACEHOLDER`, so only one icon renders, which is correct.
- **`GITHUB_TOKEN` was never actually needed.** The `gh` CLI opened PR #9
  directly while still authenticated as `raffayrkade`. `docs/SETUP.md` marks
  that section optional now.

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
