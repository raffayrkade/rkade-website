# State

**Hard cap: 8 KB.** Read this first, every session.

Last updated: 18-08-2026

---

## Status

```
Right now:     Phases 1 to 4 are BUILT AND VERIFIED LOCALLY, on a branch,
               not pushed. Phase 4's imagery unit is not started.
               rkade.co still serves the OLD site. Nothing has been deployed.
To see it:     cd rkade-website && npm run dev
Local link:    http://localhost:5173
Live link:     https://rkade.co  (Netlify, repo raffayrkade/rkade-website)
Last deployed: 12-07-2026, commit 88da91d, arch parallax centering fix
Since you last looked: Phase 1 fixed the ground: real typefaces, corrected
               tokens, 2px corners, a contrast checker gating the build. Phase
               2 built the arch system every later phase assembles from, plus
               a dev-only /kit route. No real page changed in phase 2, which
               was the point. The arch mark is traced and waiting on sign-off.
```

## Progress

```
PHASE    [#############       ]  Phases 1 to 4 done   (60%)
TASKS    [#############       ]  49 of ~70 done
```

Phases 1 and 2 each took one session. Two measured units is still well under
the ten needed, so the estimate stays "not enough history yet" rather than
being invented. `docs/history/timings.md` has both entries.

## Next up

1. **Phase 5**: Services, About and Contact. They are the last three pages
   still carrying the old shape.
2. **Phase 3's Selected Work section** on the homepage. Phase 4's case studies
   now exist, so it is unblocked.
3. **Phase 4 unit D, imagery.** Screenshots of the real systems first, then
   generate only what cannot be photographed. USD 20 hard cap, nothing spent.
4. Everything is committed locally and **not pushed**. It goes to a branch, PR
   and Netlify preview when you type `deploy`.

## Blockers

**None.** Nothing is waiting on anyone to start phase 2.

Two things need Raffay, neither blocking:

| Thing | Effect while it waits |
|---|---|
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
- **There is a component kit now.** `/kit` in dev renders every arch and motion
  primitive in both tones. It is the fastest way to see a change, and it is
  where all three of phase 2's bugs were caught.
- **`<Section>` owns tone.** No page picks a background by hand any more, and
  two same-tone sections touching warns in dev.

## Known, still open

- **Selected Work**, homepage section 5, is still not built. Phase 4's case
  studies now exist, so nothing blocks it.
- **Every case study has `image: null`.** Phase 4 unit D is not started. The
  pages read fine without imagery, they are just plainer than they will be.

## Known, deliberately left for later

The homepage is rebuilt. Services, About and Contact are not, and they still
carry the phase 1 problems:

- **`PageHeader` eats the whole first screen.** On Contact at 1440x769 the
  heading and intro fill the viewport and every piece of real content starts
  below the fold. Phase 5.
- **Services, About and Contact are still all cream**, with no alternation and
  none of the arch system on them. Phase 5.
- **The header bar over a mid-page dark section** reads as a washed light bar.
  It is correct and consistent, but phase 6 should look at it.

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
