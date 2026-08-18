# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 18-08-2026

---

## Status

```
Right now:     Phase 1 is BUILT AND VERIFIED LOCALLY, on a branch, not pushed.
               rkade.co still serves the OLD site. Nothing has been deployed.
To see it:     cd rkade-website && npm run dev
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 12-07-2026, commit 88da91d, arch parallax centering fix
Since you last looked: Phase 1 landed. The site now uses the real brand
               typefaces, the corrected token set, 2px corners and the brand
               type roles. A contrast checker gates the build. The arch mark
               is traced and waiting on sign-off. The dead duplicate folder is
               retired. All four routes build, prerender and render correctly
               at 390px and 1440px.
```

## Progress

```
PHASE    [###                 ]  Phase 1 of 7 done   (14%)
TASKS    [###                 ]  15 of ~70 done
```

Phase 1 took one session. That is one measured unit, so the estimate stays
"not enough history yet" rather than being invented. `docs/history/timings.md`
has the entry.

## Next up

1. **Approve the arch mark.** Open `docs/brand/arch-mark-trace-comparison.png`.
   If it is right, say so and `Logo.jsx` flips `showMark` to true by default.
2. Phase 2, the arch system. It only needed phase 1, so it can start now.
3. Phase 1 is committed locally and **not pushed**. It goes to a branch, PR and
   Netlify preview when you type `deploy`.

## Blockers

**None.** Nothing is waiting on anyone to start phase 2.

Two things need Raffay, neither blocking:

| Thing | Effect while it waits |
|---|---|
| Approve the traced arch mark | Site ships the wordmark alone. No arch anywhere |
| Paste Instagram and LinkedIn URLs | Footer renders no social icons. No dead links |
| Repoint Formspree delivery to contact@rkade.co | Form still mails the old inbox. See `docs/SETUP.md` |

## Things that are true and were not last session

- **The build has a gate now.** `npm run check:contrast` runs before every
  build and exits non-zero on a regressed token. Proved both ways: restoring
  the old `muted` `#8A7060` fails it at 4.05:1, the corrected `#6F5A48` passes
  at 5.73:1.
- **`npm run verify:routes`** proves all four routes prerender to real HTML,
  which is the one thing that catches a `window`-at-module-scope blank page.
- **Zero raw hex in `src/`.** Colour lives in `rkade-website/brand-tokens.json`,
  read by both Tailwind and the contrast checker.
- **The arch mark is measured, not eyeballed.** Centre (328.75, 341.5) in the
  reference, centreline radii 33 / 66 / 99, stroke 17, five legs. The taper is
  a 40.4 radius arc internally tangent at the apex. Full reasoning is in the
  SVG's own comment.
- **Node and npm work.** The project `CLAUDE.md` no longer claims otherwise.

## Known, deliberately left for phase 3

Phase 1 changed type without touching layout, which was the instruction. These
broke and are phase 3's job, not bugs to fix now:

- **`PageHeader` eats the whole first screen.** On Contact at 1440x769 the
  heading and intro fill the viewport and every piece of real content starts
  below the fold.
- **The hero headline wraps to five lines** at 1440 and crowds `HeroArt`.
- **Every section is still cream.** The art direction wants dark/light
  alternation, the passage. Nothing alternates yet.
- **`HeroArt`'s background gradient was flattened to `fill-ink`**, because the
  guide bans gradient fills and it carried two raw hex values.

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
