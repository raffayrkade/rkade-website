# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 29-08-2026

---

## Status

```
Right now:     LIVE. rkade.co serves the site, and the full card chain now
               works end to end: QR -> /links -> Demos -> demo.rkade.co
               /jewelry. Nothing is in flight and no branch is open.
To see it:     https://rkade.co/links, or cd rkade-website && npm run dev for
               local changes
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 29-08-2026, commit 782d58f, merged from demos-button (PR #14)
Since you last looked: the demo CRM (separate project, folder Jewelry-Demo)
               was built and deployed the same day it was scoped, live at
               demo.rkade.co. The Demos button on /links, which shipped
               hidden, now renders and links to it.
```

## Progress

```
PHASE    [████████████████████]  Phase 7 of 7 done      (100%)
TASKS    [████████████████████]  87 of 87 done          (100%)
```

Build time left: not enough history yet for `rkade-website`, I have 8 units
measured. There is nothing left to build in this repo. The demos-button unit
took roughly 30 minutes with no debug rounds, `docs/history/timings.md` row 8.

Realistically: nothing left to build in `rkade-website` itself. Because: the
whole card chain is live end to end. What remains is the two items still open
on Raffay's side, see Blockers below.

`docs/history/timings.md` has all eight entries.

## Next up

1. **Get Formspree's delivery address repointed to `contact@rkade.co`.** Still
   the one thing that actually matters here, see Blockers.
2. **Get the LinkedIn company page URL** once it exists, paste it into
   `CTAButtons.jsx`'s `LINKEDIN_LINK`.
3. **Watch the live site for real-world issues**: the contact form reaching an
   inbox, the booking link staying up, `/links` and the Demos button actually
   getting used off a printed card, `demo.rkade.co` staying up, any route
   returning something other than 200.
4. **Action Kushan's copy pass and the lead-sourcing screenshot** as soon as
   either arrives, both rows in `docs/BLOCKED.md`.
5. **Keep logging new work units to `docs/history/timings.md`** as they
   happen, so estimates keep being real history, not a guess.

## Blockers

**One real item, and it matters more now the site is live:** repoint
Formspree's delivery address from `hello@rkade.co` to `contact@rkade.co`. The
contact form on rkade.co is live today, real visitors can submit it right now,
and every submission until this is changed lands in an inbox Raffay may not be
watching. Steps in `docs/SETUP.md`.

The only other open item, and it blocks nothing: paste the LinkedIn company
page URL into `CTAButtons.jsx` once that page exists. The footer simply shows
no LinkedIn icon until then, Instagram already renders on its own.

Two rows stand in `docs/BLOCKED.md`, neither of them code: the copy review for
the other four pages has to come from Kushan, and the lead-sourcing case study
still needs one screenshot before it has any image at all.

Resolved 18-08-2026: the dead Google booking link, replaced with a working
schedule and verified signed out. Instagram, now live in the footer. The
missing `GITHUB_TOKEN`, which turned out not to matter because the `gh` CLI
is still authenticated and opened the PR directly.

## Things that are true and were not last session

- **`/links` is live**, commit 4a7a57b (PR #13), merged `--no-ff` after Raffay
  approved the preview in chat. Branch `links-page` deleted both sides.
  Verified live: `https://rkade.co/links` returns HTTP 200 with the
  prerendered page, one WhatsApp button ("Message the team", to Kushan's
  number), the Google booking link, website and email buttons, the hallmark
  footer. Noindexed, excluded from the sitemap, on purpose: it is for someone
  holding a card, not for search. Full detail, including the mid-preview
  correction from two WhatsApp buttons to one, in `docs/DECISIONS.md`.

- **The QR code itself is generated and verified, not just linked to.**
  `docs/brand/qr/rkade-links-qr.svg` and `-2000px.png`, error correction M,
  decoded back and confirmed to read exactly `https://rkade.co/links` before
  anything went to print. Do not drop below M for a printed card.

- **The demo CRM (separate project, folder `Jewelry-Demo`) was scoped, built,
  checked and deployed all in one day, 29-08-2026.** Live at `demo.rkade.co`,
  a hub listing one card per industry demo, jewellery demo at
  `demo.rkade.co/jewelry`, no "coming soon" tiles ever. Each visitor gets a
  private seed-data copy in their own browser (`localStorage`), no shared
  database, 24h reset. Deployed as a Cloudflare Worker with a custom domain
  route, not Netlify, see `docs/DECISIONS.md`.

- **The Demos button on `/links` is live, PR #14, merged `--no-ff` as
  782d58f.** `DEMO_LINK` in `CTAButtons.jsx` now reads
  `https://demo.rkade.co`, so the button that shipped hidden with `/links`
  now renders, relabelled "Demos" / "Live systems you can try". The card
  chain is complete end to end: QR on both business cards, to
  `rkade.co/links`, to Demos, to `demo.rkade.co/jewelry`. Verified live.

- **Audit pass 2 and the earlier go-lives are still true, just moved out of
  this file to stay under the 8 KB cap.** Full detail in
  `docs/history/state-go-live-entries.md` and `docs/DECISIONS.md`.

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
