# Timings

Measured build-unit durations, kept so future estimates are based on history
rather than guesswork. `recorder` appends one row per work unit. Under 10
measured units, estimates stay "not enough history yet" rather than being
invented.

| Date | Phase | Unit | Tasks | Duration | Notes |
|---|---|---|---|---|---|

| 18-08-2026 | Phase 1, units A + B + C | 1 session | Type and tokens, identity, truth fixes. Units A and C were launched in parallel and lost to a session exit; A was rebuilt in the main conversation, C's work survived on disk and was completed. |
| 18-08-2026 | Phase 2, units A + B + C | 1 session | Arch primitives, motion kit, surfaces, and a dev-only /kit route. Three real bugs found by looking at the kit rather than by reading the code. |
| 18-08-2026 | Phase 3, units A + B + C | 1 session | Hero, proof strip, tier centrepiece, problem, process, why, industries, close. Unit D's Selected Work deferred: it needs phase 4's case studies. |
| 18-08-2026 | Phase 4, units A + B + C | 1 session | Case study data model, Work index, detail template, prerendering for all six new routes. Unit D, imagery, not started. |
| 18-08-2026 | Phase 3 unit D, phase 4 unit D, phase 5 units A-D, phase 6 units A-C | mixed | 32 tasks | 1 session | Selected Work section, a re-shot demo-seed imagery pass (USD 1.88), Services/About/Contact rebuilt, nav/footer/404 rebuilt, header-tone bug and reduced-motion bug found and fixed, accessibility taken to 100 on every route, fonts self-hosted, per-route SEO, robots/sitemap/JSON-LD, real-device pass at four widths, pre-deploy cleanup of unreferenced public/ files and dead-calendar-link routing. Phases 1 to 6 now fully done, only phase 7 (deploy) remains. |
| 18-08-2026 | Phase 7, deploy | integration | 8 tasks | under 1 hour | Branch, PR #9 via `gh` CLI (the missing `GITHUB_TOKEN` never mattered), Netlify preview reviewed, a working Google booking link and the Instagram URL wired in and verified signed out just before merge, approved in chat, merged `--no-ff` to `main` as 6cb9429, both build branches deleted, five routes and every CTA verified live on rkade.co. One launch, no debug rounds. |
| 29-08-2026 | Post-launch, /links | UI | 6 tasks | roughly 1.5 hours | New page `Links.jsx`, route, `CTAButtons.jsx` constants, vite prerender list, `verify-routes.mjs` per-route text floor, QR generated at error correction M and decoded-verified. One mid-preview correction (two WhatsApp buttons to one, logged in `docs/PREFERENCES-INBOX.md`), no debug rounds. Branch `links-page`, PR #13, merged `--no-ff` to `main` as 4a7a57b, verified live. |
