# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 08-10-2026

---

## Status

```
Right now:     LIVE at rkade.co, including /become-a-bdr and the contact
               form fix, deployed 08-10-2026 (PR #15, merge 27d4218).
To see it:     git checkout bdr-apply, then npm run dev. To try the form
               without the CRM: node scripts/mock-bdr-endpoint.mjs
Local link:    http://localhost:5173/become-a-bdr
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 29-08-2026, commit 782d58f, merged from demos-button (PR #14)
Since you last looked: The Become a BDR page and form are live and post to
               https://crm.rkade.co/api/public/applicants. The contact form
               typing bug is fixed. No real application was submitted.
```

## Progress

```
PHASE    [█████████████████░░░]  Phase 7 of 8 done      (87%)
TASKS    [█████████████████░░░]  92 of 93 done          (98%)
```

Build time left: not enough history yet, I have 9 units measured (the BDR unit
had no time recorded). The code for phase 8 is done, what remains is waiting.

Realistically: ready as soon as the CRM endpoint exists and Raffay types
`deploy`. Because: CRM Lane B1 has not built `crm.rkade.co/api/public/applicants`
yet, so a live form would fail for every applicant.

## Next up

1. **Wait for the CRM endpoint** (CRM Lane B1), then run CRM Unit Z once end to
   end with a photo against this branch.
2. **Check the page copy against the BDR deck** in
   `rkade-crm/docs/bdr-deck-source/`. It came from the CRM brief.
3. **Exercise the error statuses in the UI** (400/413/415/429/403/500) via the
   mock's `?mock=` switch. Add a test script if cheap, none exists.
4. **Raffay types `deploy`** for bdr-apply (commits b789049 and 69ba5d9). It
   also ships the contact-form fix. Needs a Netlify preview first.
5. **Formspree repoint to `contact@rkade.co`** and the LinkedIn URL, as below.

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
