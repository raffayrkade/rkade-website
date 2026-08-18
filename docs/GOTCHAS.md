# Gotchas

**Hard cap: 8 KB.** Traps and precedents, not a changelog. Read before writing
any code. The detail behind an entry, if there is more, lives in
`docs/history/gotchas-archive.md`, and only gets read if it is actually
blocking you.

---

## Netlify serves a static 404 without `public/_redirects`

`BrowserRouter` (react-router-dom) handles routing client-side, but Netlify's
static host has no idea `/services` or `/about` are real. Reloading any route
other than `/` hits Netlify's own 404 page unless `public/_redirects` exists
with:

```
/*  /index.html  200
```

This bit the site once already, 12-07-2026. Check the file exists any time
routing or the Netlify config changes.

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

## The brand guide names a stale booking link

`docs/brand/README.md` and the PDF both say Calendly
(`calendly.com/kushan-rkade/30min`). That is wrong. The real, monitored link is
the Google Calendar one already on the site,
`calendar.app.google/La6EpDjL6HBNR67k7`, confirmed by Raffay 18-08-2026. The
guide looks authoritative and is stale on exactly this one point. Do not "fix"
the calendar link back to Calendly.

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

## Reveal animations do not fire in a full-page screenshot

`Reveal` uses framer-motion `whileInView` with `once: true`, so anything below
the fold sits at `opacity: 0` until it is scrolled into view. Chrome's
full-page screenshot does not scroll, so those sections capture **blank**, and
Lenis's smooth scrolling makes them fire late even when you do scroll.

Before screenshotting any route, scroll the whole page, then scroll directly to
whatever is still hidden, then return to the top. `once: true` means revealed
content stays revealed. Verify with:

```js
[...document.querySelectorAll('#root div')].filter(e => getComputedStyle(e).opacity === '0').length
```

A blank mid-page screenshot is almost always this, not a render bug. Check the
count before going hunting.

## Git Bash rewrites a leading `/` into a Windows path

`npm run verify:routes -- /,/services` gets mangled: MSYS turns the leading
slash into `C:/Program Files/Git/`, and the first route fails with "no
prerendered file". Prefix with `MSYS_NO_PATHCONV=1` and quote the argument, or
just run the script with no arguments and let it use its default list.
