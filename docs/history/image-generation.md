# Image generation log, phase 4 unit D

**Running total spent: approximately USD 1.88.** Budget note from Raffay,
18-08-2026: the USD 20 cap from the written plan was lifted ("you have free
hand to generate whatever, the website needs to look good"), replaced with a
soft ceiling of USD 40 and a plain report of the real number. Actual spend
came in far under either figure because the screenshot pass covered most of
what was needed.

Provider used: **OpenAI** (`gpt-image-1`), key verified working 18-08-2026.
Gemini was also verified working (see `~/.rkade/.env` for the key note) but
wasn't needed once OpenAI's first drafts landed on-brief.

Cost figures below are computed from the token usage each API response
reported, at OpenAI's published `gpt-image-1` rates (text input $5/1M tokens,
image output $40/1M tokens). Every draft ran at `quality: low`, and only
images that were going to ship were re-run at `quality: high`. No image was
generated more than twice.

---

## Kept

| # | Asset | Prompt (short) | Draft cost | Final cost | Kept |
|---|---|---|---|---|---|
| 1 | `crm-audit-lead.webp` | Open antique ledger, brass magnifying glass, loose receipts, warm raking light, ink/gold/cream only, no legible numbers | $0.017 | $0.249 | Yes, one shot each stage |
| 2 | `jewelry-crm-lead.webp` | Overhead flat lay: brass balance scale weighing loose faceted gemstones and gold nuggets, loupe, tweezers, open ledger, ink/gold/cream only | $0.017 | $0.249 | Yes. Draft 1 had ambiguous "gemstones" that read like dried fruit, prompt tightened before the final run, no extra generation needed |
| 3 | `texture-arch-ink.webp` | Close-up carved stone archway, warm gold raking light on one edge, deep ink shadow, no text | $0.017 | $0.249 | Yes, one shot each stage |
| 4 | `texture-paper-cream.webp` | Macro aged cream paper grain, single fine gold arch line in one corner, no other marks | $0.017 | $0.249 | Yes, one shot each stage |
| 5 | `og-arch-ink.webp` | Flat graphic, ink background, three nested gold arch outlines right-aligned, left two-thirds empty for text, no letters | $0.017 | $0.249 | Yes, one shot each stage |
| 6 | `og-arch-cream.webp` | Same composition, cream background, gold linework | $0.017 | $0.249 | Yes, one shot each stage |

**Total generated images: 12 (6 concepts, draft + final each). Zero discarded
concepts.** Every draft cleared the "would this suit any consultancy on
earth" test on the first attempt, which is why nothing needed a second round.
That test was applied deliberately before ever running the high-quality pass,
specifically to avoid paying for a keeper of something generic.

## Regenerated, 18-08-2026 (later session)

`jewelry-crm-lead.webp`'s original render (row 2 above) carried garbled
lettering ("TRIEL...") on the jeweller's loupe in the frame, the single most
recognisable tell of a generated image. Cropping was tried first per the
task instruction but the loupe sat too close to the tweezers and ledger to
cut cleanly without losing the rest of the composition, so the image was
regenerated instead with the loupe removed from the prompt entirely (scale,
diamonds, gold nuggets, tweezers, open ledger only) and the gemstone
description tightened to "clear and sparkling cut diamonds... visible facet
edges" after a first attempt again read ambiguous, same failure mode as the
original row 2 draft.

| # | Asset | Prompt (short) | Draft cost | Final cost | Kept |
|---|---|---|---|---|---|
| 7 | `jewelry-crm-lead.webp` (replaces row 2) | Same flat lay, loupe removed from prompt entirely, gemstones specified as faceted cut diamonds | $0.017 + $0.017 (two drafts, first still ambiguous) | $0.249 | Yes, second draft on-brief, no garbled text anywhere in frame |

Total this pass: USD 0.28 (two drafts at $0.017 each, one final at $0.249).

## Discarded

None kept-and-discarded in the sense of wasted final-quality spend. Six
draft-then-final concepts from the first pass all kept; one extra draft in
the regeneration pass above (still low-quality, ~$0.017) was superseded by a
tightened prompt before any final-quality run.

## Free / near-free calls, not counted above

- OpenAI `GET /v1/models`: free, used only to confirm the key authenticates.
- Gemini `GET /v1/models` and one `generateContent` call ("reply OK"): free
  and effectively free respectively, used only to confirm the key
  authenticates. See the key note in `~/.rkade/.env` for why this needed
  checking: the value has the unusual `AQ.` prefix flagged in the phase plan,
  not the normal `AIzaSy` one, but it worked both times it was tested.

---

## Why generation was small

Screenshots came first, per task 4.14, and covered four of the five case
studies without spending anything:

- **rkade-crm**: `login.png` and a cropped KPI-header strip of
  `pipeline-board.png` (cropped to remove a card showing a real client name,
  "Altin Jewellers", not fit to publish per the phase's anonymisation rule).
- **Jewelry-CRM**: three existing QA screenshots already using placeholder
  data (`Your Shop Name`, `g-check-owner-...@example.com`), no crop needed.
- **metro-jewellers-website**: three crops of existing screenshots with the
  top navigation bar (which shows the client's real trading name and logo)
  cut out, keeping only the product photography and editorial copy bands.

Generation covered only what the phase plan says should be generated: the
crm-audit case study, which has no UI worth showing, plus two reusable
texture images and two OG card backgrounds (textless, ready for a later
compositing pass to add per-page titles).

Full detail on which screenshots were used, why live browser capture wasn't
possible this session, and what's still open, is in the builder's report for
this work unit (not duplicated here to keep this file focused on spend).

## Wiring pass, 18-08-2026 (stage two)

No new generation, so no new spend. This pass wired the assets above into
`src/data/work.js` and the Work pages, plus two pieces of local, free
compositing:

- **Per-case-study OG cards.** `scripts/generate-og-cards.mjs` composites
  each case study's own title over `og-arch-ink.webp` (already generated,
  logged above) using `sharp`, run locally, zero API cost. Output in
  `public/work/og/`.
- **Two derivative crops.** `scripts/generate-work-image-crops.mjs`, also
  local and free. `metro-storefront-certified.webp` had a scroll-transition
  ghosting artefact in its lower half, cropped out. `rkade-crm-pipeline.webp`
  had its deal board (company and contact names, invented for the capture)
  dropped entirely, keeping only the KPI header strip: this project already
  had one real client name slip into an earlier capture (the "Altin
  Jewellers" redaction noted above), so this crop does not trust a second
  read of names that look like seed data.

`sharp` was added as a devDependency for both scripts.
