# Plan: rkade.co revamp

Index only. **Never read this file for task detail.** Read the one
`docs/plan/phase-NN.md` you are working on.

Written 18-08-2026. Nothing here is built yet. This plan waits on Raffay's
green light.

---

## Read these first

| File | Why |
|---|---|
| `docs/BRIEF.md` | What we are doing and why. Positioning, scope, what is out |
| `docs/AUDIT.md` | What is wrong with the current site, with the evidence |
| `docs/ART-DIRECTION.md` | The settled visual system. **Before any UI work** |
| `docs/brand/README.md` | The logo assets, the arch mark measurements, the rules |
| `docs/DECISIONS.md` | Every call taken without asking, and how to reverse it |

## The phases

| # | Phase | What it delivers | Units | Est. |
|---|---|---|---|---|
| 1 | [Foundation and brand truth](plan/phase-01.md) | Right fonts, right tokens, right contact details. No redesign yet | 3 | ~1 session |
| 2 | [The arch system](plan/phase-02.md) | The motif and motion primitives everything else is built from | 3 | ~1 session |
| 3 | [Homepage](plan/phase-03.md) | The new homepage, including the three-arch tier centrepiece | 4 | ~2 sessions |
| 4 | [The Work page](plan/phase-04.md) | Five anonymised case studies. The biggest single gap on the site | 4 | ~2 sessions |
| 5 | [Services, About, Contact](plan/phase-05.md) | The three inner pages, plus inline booking | 4 | ~1 session |
| 6 | [Polish and proof](plan/phase-06.md) | Contrast, reduced motion, performance, SEO, real-browser checks | 3 | ~1 session |
| 7 | [Deploy](plan/phase-07.md) | Branch, PR, Netlify preview, approval, merge. **Only on the word `deploy`** | 1 | ~30 min |

Estimates are ranges with no measured history behind them, because this project
has never had `docs/history/timings.md`. Treat them as shape, not schedule.
`recorder` starts measuring at phase 1 unit 1.

## Dependencies

```
Phase 1 ──┬── Phase 2 ──┬── Phase 3 ──┐
          │             │             ├── Phase 6 ── Phase 7
          └── Phase 5A/B┴── Phase 4 ──┘
```

- **Phase 2 cannot start before phase 1 finishes.** The arch primitives are
  drawn in brand type and brand tokens. Building them first means building them
  twice.
- **Phase 3 and phase 4 both depend on phase 2** and are independent of each
  other. They can run in parallel in separate sessions.
- **Phase 5's copy rewrites (units A and B) only depend on phase 1**, so they can
  start early if a session is otherwise blocked. Its contact/booking work
  (unit C) is independent of everything.
- **Phase 6 is a merge checkpoint.** It runs after 3, 4 and 5 have all landed,
  never before.
- **Phase 7 is not a build phase.** It runs when Raffay types `deploy`, and
  never as part of the normal loop.

## Status

| Phase | Status |
|---|---|
| 1 | **Done, uncommitted to `main`.** Built and verified locally 18-08-2026 |
| 2 | **Done, uncommitted to `main`.** Built and verified locally 18-08-2026 |
| 3 | **Units A, B, C done.** Unit D's Selected Work waits on phase 4 |
| 4 | Not started |
| 5 | Not started |
| 6 | Not started |
| 7 | Not started |

## Nothing is blocked

Every open question was answered by Raffay on 18-08-2026. The answers are
written into the phase files and logged in `docs/DECISIONS.md`. Do not re-ask
them. The short version is in `docs/STATE.md`'s Blockers table.

The two that most change the build:

1. **The arch mark is approved for tracing** from the brand guide PDF, which has
   been extracted and measured (`docs/brand/README.md`). Phase 1 task 1.8 builds
   it and brings it back for sign-off before it ships. The same file closes
   `rkade-crm`'s open item O.1, which has been blocked since 16-08-2026.
2. **Image generation has a USD 20 hard cap** for the whole revamp, with
   screenshots of the real systems taking priority over generated art. Phase 4
   task 4.16.

Two things need Raffay later, and neither stops any work: approving the traced
arch mark when phase 1 shows it to him, and pasting in the Instagram and
LinkedIn URLs once those pages exist.
