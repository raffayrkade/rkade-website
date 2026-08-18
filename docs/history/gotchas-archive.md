# Gotchas archive

Entries moved out of `docs/GOTCHAS.md` to keep it under its 8 KB cap. Nothing
here is wrong or retracted, it is just judged less likely to trip up the next
piece of work than what stayed. Moved here, not deleted, per the project's
nothing-is-deleted rule.

---

## The brand guide names a stale booking link

Moved out 18-08-2026 (phase 6, accessibility re-measure unit): settled fact
about a resolved discrepancy, not a live coding trap, once `CTAButtons.jsx`
was confirmed as the single source of truth.

`docs/brand/README.md` and the PDF both say Calendly
(`calendly.com/kushan-rkade/30min`). That is wrong. The real, monitored link is
the Google Calendar one already on the site,
`calendar.app.google/La6EpDjL6HBNR67k7`, confirmed by Raffay 18-08-2026. The
guide looks authoritative and is stale on exactly this one point. Do not "fix"
the calendar link back to Calendly.

## Fonts are self-hosted from three files, sourced once

Moved out 18-08-2026 (phase 6, accessibility re-measure unit): a how-to for
the next time a font weight is added, not a trap that recurs while building.

`public/fonts/*.woff2` are Google's own variable-font files, downloaded once
from `fonts.gstatic.com` (the `latin` subset only) and committed, not fetched
at runtime. Cormorant Garamond ships as two files (upright covering 300 to
600, italic covering 300 to 400) and Montserrat as one (covering 300 to
500), because Google serves the identical file for several requested weights
when the underlying font is variable, so `font-weight: 300 600` on one
`@font-face` block replaces three separate declarations. If a new weight or
style is ever needed, re-run the same lookup against the Google Fonts CSS2
API for the exact family/weight/style requested, take the `latin` block's
URL, and check whether it already matches a file already downloaded before
adding a fourth.

## Why `verify-routes.mjs`'s `<title>` check is scoped to `<head>`

Trimmed out of the `<Head>`-insertion entry in `docs/GOTCHAS.md` 18-08-2026 to
save space; the core trap (Helmet inserts, never replaces, so a static
`index.html` `<title>`/`<meta charset>` ships alongside every route's own and
can push charset past byte 1024) stays there.

A bare `<title>` regex run against the whole rendered document matches
react-helmet-async's `data-rh="true"` attribute as a non-match in some engines,
and worse, matches ArchTrio's SVG accessibility `<title>` element sitting in
the page body, which let the check report a false PASS on pages with no real
document title at all. The fix scopes the regex to the `<head>` block first
and allows attributes on the tag.

## Netlify serves a static 404 without `public/_redirects`

Moved out 18-08-2026 (phase 6 close, GOTCHAS.md over its 8 KB cap): fixed,
verified, and unlikely to regress silently since `public/_redirects` is
committed and any change to routing would be caught by
`npm run verify:routes` before it shipped.

`BrowserRouter` (react-router-dom) handles routing client-side, but Netlify's
static host has no idea `/services` or `/about` are real. Reloading any route
other than `/` hits Netlify's own 404 page unless `public/_redirects` exists
with `/*  /index.html  200`. Bit the site once already, 12-07-2026.

## Git Bash rewrites a leading `/` into a Windows path

Moved out 18-08-2026 (phase 6 close, GOTCHAS.md over its 8 KB cap): a one-line
workaround, not a design trap.

`npm run verify:routes -- /,/services` gets mangled: MSYS turns the leading
slash into `C:/Program Files/Git/`, and the first route fails with "no
prerendered file". Prefix with `MSYS_NO_PATHCONV=1` and quote the argument, or
just run the script with no arguments and let it use its default list.

## Fast programmatic scrolling outruns IntersectionObserver

Moved out 18-08-2026 (phase 6 close, GOTCHAS.md over its 8 KB cap): a
screenshot-taking technique, not a component bug.

Scripted `window.scrollTo` in 250px steps will skip reveal and counter
triggers even when the components are correct, because the observer samples
per frame and Lenis is easing the position underneath. This shows up as "the
counter is broken" when it is not. To capture a screenshot, scroll each
triggering element into view with `scrollIntoView({ block: 'center' })` and
wait, rather than stepping past it.
