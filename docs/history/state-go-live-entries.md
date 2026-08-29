# STATE.md, retired entries: the two go-lives

Moved out of `docs/STATE.md` on 22-08-2026 because that file has a hard 8 KB
cap and the audit pass 2 entries pushed it over. Nothing here is deleted and
nothing here is wrong, it is simply no longer what someone opening STATE.md
needs in the first thirty seconds. The decisions behind all of it are in
`docs/DECISIONS.md`, the narrative is in `docs/history/session-log.md`.

## From "Things that are true and were not last session", 18-08 and 19-08-2026

- **The copy and audit pass is live.** PR #10, merged `--no-ff` as e601ae2
  after Raffay approved the preview in chat, branch deleted both sides.
  Verified on rkade.co: all eight real routes 200, a bad URL returns a real
  404 with the 404 page and no canonical, the four security headers present,
  `apple-touch-icon.png` served, the sitemap carrying /privacy and /terms and
  not /404, zero `fonts.googleapis.com` references, and every one of the six
  retired strings ("extra employees", "AI Automation Consultancy", "fall by
  around 400", "Stop paying people", "vertical-specific", "fewer people")
  returning zero hits on the live homepage.
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

## From "Things that are true and were not last session", 22-08-2026

Moved out on 29-08-2026 to make room for the /links go-live. Superseded, not
wrong.

- **Audit pass 2 is live**, commit 5a99ce1 (PR #12), merged `--no-ff` after
  Raffay approved the preview in chat. Both branches deleted, locally and
  remotely. Verified on rkade.co after the deploy: 12 routes 200 with a bad
  URL returning a real 404, `/.vite/ssr-manifest.json` now a 404, the stats
  serving 3 / 28 / 170 / 90,048, zero elements under 24px at 390 and 1440,
  no horizontal scroll, no console errors, and the header still 73px so the
  `/#how-it-works` offset is intact.
- **Two of the audit's findings were wrong, and checking first is why we
  know.** N1, reported as the only urgent item, claimed three stat values had
  silently dropped. Source says otherwise: those four numbers were written
  once and never edited. The counter animates them up over 1.4 seconds and
  the audit read the DOM mid-animation, which is why every reported value was
  slightly under the real one and the only one that matched was the only one
  small enough to finish counting instantly. S3 was the same shape: the
  honeypot's `aria-hidden` was on the wrapper, not the input, and hiding a
  container hides its subtree. Both are written up in `docs/DECISIONS.md`.
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
