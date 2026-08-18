# Gotchas

**Hard cap: 8 KB.** Traps and precedents, not a changelog. Read before writing
any code. The detail behind an entry, if there is more, lives in
`docs/history/gotchas-archive.md`, and only gets read if it is actually
blocking you.

---

## `vite-react-ssg` prerenders at build time

The site is built with `vite-react-ssg`, which runs every route through a
Node-based prerender pass to generate static HTML. That pass has no `window`,
no `document`, no `localStorage`, nothing that only exists in a browser.

Anything touching `window`/`document` **at module scope** (top of a file, in a
hook's initial state, in a default export's first render) breaks the build
with an opaque error, not a friendly one. It is fine inside `useEffect`, inside
an event handler, or behind `typeof window !== 'undefined'`. It is not fine as
a bare top-level `window.matchMedia(...)` or `document.querySelector(...)`.

If a new animation or utility reads viewport size, motion preference, or
anything else browser-only, gate it behind a mount check or `useEffect`, never
call it during the initial render pass.

## Formspree's delivery address is set in their dashboard, not in code

`ContactForm.jsx` only holds the form's endpoint ID
(`https://formspree.io/f/xxxxxxx`). Where the mail actually lands is a setting
inside the Formspree account itself. Changing `CONTACT_EMAIL` in
`CTAButtons.jsx` changes what the site displays and mails to, but does **not**
repoint where Formspree delivers a form submission. That is a manual step,
written up in `docs/SETUP.md`.

## `currentColor` does not survive an `<img>` tag

`public/brand/arch-mark.svg` paints from `currentColor` so one file can serve
both cream and ink backgrounds. That only works when the SVG is **inlined into
the DOM**. Referenced as `<img src="/brand/arch-mark.svg">` it renders solid
black, because the image is its own document and inherits nothing from the
page.

This was caught on 18-08-2026 while rendering the trace next to its reference,
where it showed up as a black logo on ink. `ArchMark.jsx` therefore carries the
paths inline rather than pointing at the file. The file in `public/` exists for
handoff (rkade-crm needs it) and for anywhere an explicit fill is set.

## A bare `margin: '-60px'` on useInView insets all four sides

framer-motion's `useInView` and `whileInView` pass `margin` straight through to
IntersectionObserver's `rootMargin`, and a single value applies to **all four
sides**. On a 390px viewport `-60px` shrinks the detection root to 270px wide.
A narrow element sitting in the `6vw` gutter then never intersects it, and
whatever it was meant to trigger never fires.

This stranded a `<Counter>` at 0 permanently on mobile, while its wider
siblings on the same row worked, which made it look like a race condition
rather than geometry. Always write the vertical inset explicitly:

```js
useInView(ref, { once: true, margin: '-60px 0px' })
```

The same applies to `viewport={{ margin: ... }}` on `whileInView`.

## `vite-react-ssg`'s `<Head>` inserts, it never replaces

`extractHelmet` in `vite-react-ssg` writes collected `<Head>` tags into the
built HTML by doing `indexHTML.replace(headStartTag, headStartTag + metaTags)`. That
inserts right after `<head>`, it does not remove whatever was already in
`index.html`. A static `<title>` or `<meta name="description">` left in
`index.html` ships **alongside** every route's own tag, not replaced by it,
so the built HTML carries two of each. `index.html` therefore carries no
title, description, canonical, charset or Open Graph tags at all, only the
things that are genuinely identical on every route (viewport, favicon, theme
colour, font preloads). Every route sets its own through
`src/components/common/Seo.jsx`, and charset comes from `RootLayout.jsx`
instead, the one `<Head>` guaranteed to sit above every page's own. Charset
has to be Helmet-managed too, not just title and description: a static
`<meta charset>` left in `index.html` gets pushed past byte 1024 by the
injected title and description ahead of it, which Lighthouse's `charset`
audit catches and a plain glance at the rendered page never will. Confirm
with a view-source on `dist/`, not the browser's live DOM, which normalises
duplicates away and hides both problems. This is also why
`scripts/verify-routes.mjs`'s `<title>` check is scoped to `<head>`: a bare
`<title>` regex over the whole document also matches ArchTrio's SVG
accessibility `<title>` in the page body (see the archive for the full story).

## `Reveal`'s wrapping element breaks `<ol>`/`<ul>`/`<dl>` structure

`<Reveal><li>...</li></Reveal>` in a list renders `<ol><div><li>`, an extra div
axe's `list`/`listitem` audits reject. The same shape in a `<dl>` nests two
divs around a dt/dd pair, which fails `definition-list` (one div per pair is
valid, two nested is not). `Reveal` already takes an `as` prop for this: pass
`as="li"` (or keep the `<dl>` case at the default `as="div"`) and put the
child's own className straight on `Reveal`, dropping the inner wrapper. Broke
silently across five case study pages and both homepage stat lists, caught
18-08-2026.

## `aria-label` on a bare `<span>` fails `aria-prohibited-attr`

A `<span>` has no role that supports author naming. `Counter.jsx` used
`aria-label` on its wrapper span to announce the finished number over the
animated digits; axe flags it even though every screen reader tested it fine.
Fix: a visually-hidden (`sr-only`) sibling span with the real text instead.

## Decorative low-opacity text still needs 3:1 contrast

`aria-hidden="true"` on the site's faint background numerals stops a screen
reader announcing them, but a sighted low-vision user still sees the pixels,
and axe's `color-contrast` audit measures those, not the ARIA tree. Ink at
10% opacity on cream measures roughly 1.2:1; it takes about 55 to 60% to clear
the 3:1 large-text minimum. No attribute exempts visible text from contrast.

## A file sitting in `public/` but referenced by nothing still deploys

Vite copies `public/` into `dist/` verbatim. Nothing checks whether a file in
there is imported or linked anywhere in the app; it becomes a live URL on the
deployed site regardless. Cropping an image to remove something sensitive (a
client name, a dashboard showing real numbers) is not enough by itself: the
uncropped source has to be moved out of `public/` too, or the original still
ships at its own address even though no page ever points at it. Caught
18-08-2026 in the pre-deploy review: an uncropped case-study screenshot, two
unused textures and two OG background plates were all still sitting in
`public/work/` with nothing in `src/` referencing any of them. Before
shipping a crop made for safety, check `public/` itself for the file it was
cropped from, not just the code that renders the replacement.

## A booking or third-party link must be verified signed out

The account owner is always signed into their own Google, Calendly or similar
account, so a broken link can still load a page that looks fine to them.
Everyone else sees the real failure. This is exactly what happened with
RKADE's Google appointment schedule: it looked fine to Raffay in his own
browser and returned "Appointment not found" to every real visitor, caught by
an automated check on 18-08-2026 and confirmed by hand. The replacement link
was checked in a clean, signed-out browser session before being wired in.
Before trusting any third-party link that gates a CTA, load it in a private or
incognito window, signed out, not just the owner's own logged-in browser.
