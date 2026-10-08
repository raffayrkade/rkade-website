# Phase 8: Become a Business Development Representative (apply page)

**Goal:** a page on rkade.co where someone can apply to be a Business
Development Representative (BDR), posting to the CRM's public applicant
endpoint. Brief: `rkade-crm/docs/BDR-BRIEF.md`, section "Website application
form". Build plan and the exact request contract:
`rkade-crm/docs/plan/phase-10.md`, section "The public applicant endpoint:
exact contract". **The contract there is the source of truth. If this file and
that one disagree, that one wins and this file gets fixed.**

**Needs:** nothing in this repo. Runs as a parallel lane alongside the CRM's
phase 10, after the CRM's founder-only guard unit (CRM unit 1b) has passed.
Can be built and fully tested against a local mock of the endpoint.

**Hard rules for this phase:**
- Work on a local branch `bdr-apply`, created from `main`. **Never push, never
  open a PR, never merge.** This repo has only `main` and pushing is
  deploying. Phase 7's deploy workflow runs only when Raffay types `deploy`.
- **No prices on the page, anywhere**, not even as an example or a range.
  Earning is described in words only ("commission, paid when the client has paid
  in full"), no figures, no percentages, no tier names.
- Title is always "Business Development Representative" or "BDR". Never
  "agent" (RKade sells AI agents). "RKade" in body copy, never "RKADE".
- No em dashes. Named colour tokens only, no raw hex. 2px corners. Display
  type 300 or 400 weight only. Follow `docs/CONVENTIONS.md` and
  `docs/ART-DIRECTION.md`.
- Nothing automatic is promised to the applicant: the success message says the
  team reads every application and replies personally, with no timing promise
  and no mention of an automatic email.

---

## Dependencies

| Unit | Needs | Can run with |
|---|---|---|
| A: Apply page and form | CRM phase 10 unit 1b passed (contract frozen) | CRM units 2 and C1 |

## Lanes

**Lane 1:** Unit A, alone on this repo. It edits shared files (`routes.jsx`,
`SiteLayout.jsx`, `CTAButtons.jsx`, the sitemap) but nothing else in this repo
is in flight.

---

## Unit A: the apply page

Owner: `ui-builder`. One launch, five tasks. Files it may touch:
`src/pages/BecomeBdr.jsx` (new), `src/components/bdr/*` (new),
`src/routes.jsx`, `src/components/layout/SiteLayout.jsx` (footer link only),
`src/components/common/CTAButtons.jsx` (one constant), `public/sitemap.xml` and
`scripts/generate-sitemap.mjs` as the sitemap is produced today,
`scripts/mock-bdr-endpoint.mjs` (new).

### 8.1 [S] Route, page and copy
A new route `/become-a-bdr` as a child of `SiteLayout`, page
`BecomeBdr.jsx`, built from the existing `PageHeader`, `Section`, `Reveal` and
`Seo` components so it matches the other inner pages. Footer link "Become a
BDR" next to Privacy and Terms; sitemap entry; page title and meta description
use the full title. Copy: who a BDR is (an outside representative who finds
owner-run Dubai businesses, reaches out by WhatsApp or phone, qualifies them and
hands them over; only the RKade founders close deals), who it suits, what
happens after applying, then the form. Copy is drawn from the BDR deck
(https://claude.ai/artifact/CyrRJPkR6R9UYdCQ9TH3XG, read only); if unreadable,
write a line to `docs/BLOCKED.md`, use short marked placeholder copy and carry
on. Accept: page renders at `/become-a-bdr` including on direct reload (the
`_redirects` rule still works); in the footer and sitemap; a grep of the page
and components for `AED|USD|\$|%|[0-9]{3,}` finds no price or rate; grep for
"agent" and for em dashes is empty; the on-page heading is the full title.

### 8.2 [S] The form, to the contract
`src/components/bdr/ApplyForm.jsx`, styled like `ContactForm.jsx`
(underline fields, inline errors, same states). Fields with exact names from
the contract: `full_name`, `email`, `whatsapp_number`, `city`, `country`,
`current_activity` (studying, working, other), `current_activity_where`,
`linkedin_url` (optional), `languages`, `why_join`, `headshot` (optional), and
the off-screen `_gotcha` honeypot copied from the contact form's pattern.
Client-side validation mirrors the contract's limits and messages; submit sends
`multipart/form-data` via `FormData` with no manual content type and no
credentials. Accept: every required field blocks submit with a plain-English
message; the contract's length limits are enforced live; a filled `_gotcha`
shows success without sending; the button shows "Sending..." and cannot
double-fire; labels are tied to inputs; keyboard order is natural.

### 8.3 [S] Optional photo
A file picker for `headshot` that accepts JPEG, PNG or WebP only, shows a small
preview with a Remove control, and **shrinks the image in the browser** (canvas,
longest side 800 px, JPEG quality stepped down) until it is at most 500 KB
before it is attached, because the server rejects anything over 524288 bytes
and does not resize. Accept: a 6 MB phone photo ends up under 500 KB and still
looks right; a PDF renamed `.jpg` is refused with a plain message; if shrinking
is impossible the form says so and lets the person submit without a photo;
choosing no photo sends no `headshot` field at all.

### 8.4 [S] Endpoint constant, response handling, mock server
`CTAButtons.jsx` gains one constant, `BDR_APPLY_ENDPOINT`: in development
`http://localhost:3000/api/public/applicants`, otherwise
`https://crm.rkade.co/api/public/applicants`, chosen with `import.meta.env.DEV`.
No environment variable. The form maps responses per the contract: 200 shows the
success panel; 400 puts each message under its field; 413 and 415 put the
message under the photo; 429 says to try again later; 403, 500 and a network
failure show the same fallback the contact form uses, a WhatsApp link. The new
`scripts/mock-bdr-endpoint.mjs` is a tiny Node server on port 3000 that
implements the contract's status codes (a query string such as `?mock=429`
forces each one) with the same CORS headers, so the page can be tested with no
CRM running. Accept: all seven status codes behave as described, tested against
the mock; the form never shows a raw error; the success panel states that the
team reads every application and replies personally, with no promise of
timing; the mock is not imported by anything in `src/`.

### 8.5 [S] Proof and local commit
Real-browser check with Playwright at 375px, 768px and 1280px: no horizontal
scroll, tap targets at least 44px, focus rings visible, screen reader labels
present, contrast measured not guessed (the project's existing contrast check
approach). Then `npm run build` passes, and the work is committed on
`bdr-apply`. Accept: no raw hex in `src/` (the convention's grep, with its one
documented exception); no `rounded-xl` or `rounded-full` on the new page; all
other routes still return 200 and the sitemap lists the new one; `git status`
clean; `git log origin/main..bdr-apply` reviewed; **nothing pushed**. The
report ends with the local preview command and the line "waiting for `deploy`".

---

## Merge checkpoint (done together with the CRM's checkpoint 1 and Unit Z)

- Field names, limits and messages in `ApplyForm.jsx` against the contract in
  `rkade-crm/docs/plan/phase-10.md`, character for character. Anything the CRM
  validates that the form does not, or the reverse, is a bug on one side.
- The allowed origin: the form posts from `http://localhost:5173`, which the
  CRM allowlist contains. A Netlify preview URL is not on that list, so the
  live form cannot be tried from a preview until the CRM adds it.
- Unit Z of the CRM plan (10.50) runs this branch against the real CRM
  endpoint once, with a photo, end to end.

## Definition of done

- Branch `bdr-apply` exists locally with the work committed; `main` untouched;
  nothing pushed.
- No price, percentage, tier name or the word "agent" on the page.
- Form verified against the mock for every response code, and against the real
  CRM in Unit Z.
- `docs/STATE.md` updated by `recorder` with: branch open, not deployed.
