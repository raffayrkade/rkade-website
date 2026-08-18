# Decisions

Every call taken during planning, with the reason, so any of them can be
reversed. Newest last. Format: `[dd-mm-yyyy] decision. Why. How to reverse.`

---

## 18-08-2026, planning session

- **[18-08-2026] The arch is the organising idea of the whole site.** RKADE is
  arcade is *arcus* is arch, and that story is currently a buried paragraph on
  page four. It is the only thing the company owns that no competitor can copy,
  and the logo already is three nested arches. Alternatives considered: a
  straight modernisation in the same layout (safe, forgettable), or a
  data/dashboard aesthetic (every AI agency has one). Reverse by treating
  `docs/ART-DIRECTION.md`'s "The idea" section as decoration rather than
  structure; the token layer and type work in phase 1 survive either way.

- **[18-08-2026] The three arches map to the three service tiers, and the
  homepage builds the logo as you scroll through them.** Audit is the outermost
  arch, Build the middle, Manage the innermost. This is the single creative bet
  of the redesign. It works because the mark genuinely has three arches and the
  model genuinely has three tiers, so it explains rather than decorates.
  Reverse: phase 3 unit B is self-contained, drop it for a conventional
  three-column section and nothing else breaks.

- **[18-08-2026] Section tone alternates dark and light through the whole
  site.** Currently every section of every page is on `#F5F0E8`, which is why
  the site reads as flat. The brand guide explicitly defines a dark version and
  the site has never used it. `<Section>` enforces the alternation so it cannot
  drift back. Reverse: set every `tone` to `cream`.

- **[18-08-2026] Corner radius drops from `rounded-xl` to 2px.** Rounded cards
  plus a serif reads as a SaaS template wearing a costume. The only round things
  on the site become arches. Reverse: one token in `tailwind.config.js`.

- **[18-08-2026] Adopting `rkade-crm`'s corrected palette values rather than
  the brand guide's literal ones for three tokens.** `muted` `#8A7060` measures
  4.07:1 on cream and **fails WCAG AA for normal text**, and this site uses it
  in nearly every secondary paragraph. `#D4C5A9` measures 1.50:1 and was doing
  two jobs. `rkade-crm` measured and fixed both in its phase 8, after Raffay
  said the colours were "blending in with the background". Using `muted`
  `#6F5A48` (5.7:1), `line` `#C0AC89`, `line-strong` `#9C8259` (3.2:1).
  This is a deliberate, documented departure from the guide's stated hexes on
  accessibility grounds. Flag it to both founders. Reverse: restore the guide
  values and accept the AA failures.

- **[18-08-2026] Porting `npm run check:contrast` from `rkade-crm` and wiring
  it into the build.** It is the reason the above cannot silently come back.
  Also the **second sighting on a second project**, so it qualifies for
  promotion to `Templates/modules/` under the two-sightings rule. Flagged for
  `harvester` at the phase 1 boundary rather than done inline.

- **[18-08-2026] The arch mark was extracted from the brand guide PDF and
  measured, rather than left as a blocker.** Five lockups were embedded as
  JPEGs. They are now in `docs/brand/extracted/` with the geometry written up in
  `docs/brand/README.md`. **This also unblocks `rkade-crm`'s open item O.1**,
  which has been waiting since 16-08-2026. What is still missing is a
  transparent SVG master, so the site ships the wordmark alone until it arrives.
  The guide says never redraw the mark, and that rule is being kept.

- **[18-08-2026] A `/work` page with five anonymised case studies, placed first
  in the navigation, ahead of Services.** Proof sells harder than a service
  list, and the site currently proves nothing at all. Anonymisation was Raffay's
  call. Reverse: remove the route and the nav entry; nothing else depends on it
  except the homepage's Selected Work teaser.

- **[18-08-2026] No client financial figures on the site, in any form, taken
  rather than asked.** Anonymisation alone does not make a client's revenue
  decline publishable. The forensic audit case study uses process metrics
  instead: screens surveyed, rows parsed, years covered. Reverse only with the
  client's written consent, which is not a copy decision.

- **[18-08-2026] Real screenshots before generated images.** Raffay confirmed
  image generation access is available. Four of the five systems run locally,
  and a real screenshot of working software beats generated art, which is
  precisely the failure mode of the current site's two base44 stock images.
  Generation is reserved for what cannot be photographed. Reverse: generate
  more, within a budget Raffay sets first.

- **[18-08-2026] The image generation keys move to `~/.rkade/.env`, not copied
  into this project.** They currently sit in
  `metro-jewellers-website/.env.local`. They are account-level capabilities, and
  `~/.rkade/.env` exists outside every project folder so a key cannot be
  committed or sent to a client. Copying doubles the leak surface. `SERVICES.md`
  updates in the same change.

- **[18-08-2026] `rkade-website - Updated Colors/` moves to
  `docs/history/updated-colors-experiment/`.** Open question since July. It has
  no `package.json`, no entry point, is not runnable, and its
  `tailwind.config.js` is the live one minus the marquee keyframes. Nothing is
  ever deleted, only moved. Reverse: move it back.

- **[18-08-2026] The project gets the standard RKADE document set.** It was the
  only project without `STATE.md`, `GOTCHAS.md`, `CONVENTIONS.md`,
  `ART-DIRECTION.md` or `docs/history/`. That is why this planning session had
  to reconstruct context from source rather than reading it.

- **[18-08-2026] The stack stays.** React, Vite, Tailwind, Framer Motion,
  Lenis, `vite-react-ssg`. All correct for the job, and `components/common/` is
  a genuinely reusable motion kit that gets extended rather than replaced. This
  is a redesign, not a re-platform.

- **[18-08-2026] Positioning stays "AI automation consultancy", and Audit /
  Build / Manage stays.** Raffay's call. It matches the brand guide's own cover
  line. What changes is the substance underneath: the three tiers stop being
  cards of adjectives and start carrying named deliverables and finished work.

## 18-08-2026, answers from Raffay

All six open items closed the same day. These are his calls, not defaults.

- **[18-08-2026] The arch mark is traced from the brand guide PDF.** Raffay:
  "everything is in the pdf, get what you want from the brand guide". That is
  the approval that makes reproducing it legitimate, since the guide itself says
  never redraw the mark. Built in phase 1 task 1.8 from
  `docs/brand/extracted/arch-mark-icon.jpg` against the measurements in
  `docs/brand/README.md`, and **it ships only after he approves it side by side
  with the reference.** A supplied master file, if one ever appears, replaces the
  trace immediately. The same SVG closes `rkade-crm`'s open item O.1.

- **[18-08-2026] Image generation capped at USD 20 total for the whole
  revamp.** Raffay asked for a number rather than a question: "you suggest
  something, just do what you need". Working estimate is USD 5 to 8 for roughly
  10 to 12 finished assets across 35 to 45 attempts; the cap is set higher so a
  bad run does not need a second conversation. Every generation is logged with
  its cost in `docs/history/image-generation.md`. Screenshots come first and may
  drive the real spend close to zero. Reverse: change the number in phase 4 task
  4.16.

- **[18-08-2026] The founders are named: Raffay Ali and Kushan Naresh. No
  photos.** This reverses the July `about-anonymize-founder-cards` change. Two
  unnamed role cards read as evasive on the About page of a two-person
  consultancy, which is the opposite of what anonymising them was for. Reverse:
  restore the role-only cards.

- **[18-08-2026] The Tier 1 Audit is genuinely free.** RKADE makes its money on
  Build and Manage. This resolves a real contradiction on the live site, where
  "Free Audit" is the button everywhere while "Audit" is simultaneously
  presented as a priced tier. It is now the strongest fact on the homepage and
  it is said out loud on the first arch. Phase 3 unit B and phase 5 unit A both
  restructure around it.

- **[18-08-2026] Pricing: explain the model, publish no numbers.** The audit is
  free, a build is quoted per project after the audit, management is a monthly
  retainer. One FAQ entry. No range, no "from" price, no typical-project figure,
  because none of those are decided. Reverse: add numbers once they exist.

- **[18-08-2026] Nothing about IP or code ownership goes on the site.**
  Raffay's call: handle it on the call. So the FAQ entry that was planned is
  dropped and nothing anywhere states who owns the code or the data. Reverse:
  answer the question, then add it back.

- **[18-08-2026] The Manage tier gets no client example.** Nobody is on an
  ongoing management arrangement yet. It is written as an offer, never as a
  track record, and it carries no case study link. Do not stretch another
  project to fill the slot. Reverse when a real retainer exists.

- **[18-08-2026] The booking link stays as it is. The brand guide is wrong.**
  The guide names `calendly.com/kushan-rkade/30min`; the live, monitored route
  is the Google Calendar link already on the site,
  `calendar.app.google/La6EpDjL6HBNR67k7`. Phase 5 embeds **that** schedule and
  explicitly does not switch to Calendly to make embedding easier. Recorded
  because the guide looks authoritative and is stale on this one point.

- **[18-08-2026] Social links ship as suppressed placeholders.** Raffay: "just
  leave it as a placeholder and I'll fill it with proper links when ready."
  Neither the Instagram nor the LinkedIn page exists yet. `CTAButtons.jsx`
  carries both as `PLACEHOLDER` and the footer renders no icon for any value
  still set to it, so today the footer shows no social icons at all and no dead
  link can ship. Each icon appears on its own the moment a real URL is pasted
  in. The two blanks are written up to the `env-var-standard` house standard in
  `docs/SETUP.md`. X/Twitter and GitHub are deleted outright.

- **[18-08-2026] The dead duplicate is retired, not deleted.**
  `rkade-website - Updated Colors/` was tracked in git, had no `package.json`
  and was not runnable. It is now `docs/history/updated-colors-experiment/`,
  moved with `git mv` so the history is intact. To recover it, `git mv` it
  back. Nothing was deleted.

- **[18-08-2026] `gold-dark` is asserted as a non-text token, not held to 3:1.**
  The contrast checker first failed `gold-dark on cream` at 2.66. That was the
  checker being wrong, not the colour. `docs/ART-DIRECTION.md` defines
  `gold-dark` as fills and rules and forbids it as text on cream, and pure
  decoration is out of scope for WCAG 1.4.11. It is now recorded in the
  checker's non-text list, which prints its ratio without asserting a floor, so
  nobody quietly promotes it to text later. Reverse by moving it back into
  `PAIRS` if it ever becomes a text colour.

- **[18-08-2026] The outer arch is one filled path, not a stroke plus a taper.**
  Drawing it as a stroked arc joined to a filled taper left a visible hairline
  seam at the apex. Merging them removed it. The cost is that the outer arch
  cannot be animated with `stroke-dashoffset`, so phase 2's arch-draw should
  use a mask over the whole group instead, which works for filled and stroked
  paths alike.

- **[18-08-2026] The favicon's letterforms are outlined, not font-referenced.**
  An SVG favicon cannot load a web font, so `font-family: Cormorant Garamond`
  would have silently fallen back to whatever serif the viewer has. The "RK"
  glyphs are converted to paths from the real variable font at weight 600. The
  trade is that changing the favicon's letterforms now means regenerating them
  with `fonttools`, not editing text in the file.

- **[18-08-2026] Two illegal gold-on-cream text usages were re-solved, not
  recoloured flat.** The Hero's emphasised phrase became italic Cormorant, and
  the two gold links became ink text with a `gold-dark` underline. Both are
  routes the brand guide explicitly allows on cream, so the accent survives
  while the contrast becomes legal.

- **[18-08-2026] The system trio is `ArchTrio`, not a second `ArchMark`.**
  `docs/plan/phase-02.md` asked for `src/components/arch/ArchMark.jsx`, but
  `src/components/brand/ArchMark.jsx` already exists and holds the traced logo.
  Two components with one name is an import footgun whose failure mode is an
  unapproved mark appearing in the header. Renamed to `ArchTrio`. Reverse by
  renaming the file and its two imports.

- **[18-08-2026] The measured arch geometry supersedes the plan's numbers.**
  Phase 2 quotes half-spans 98.5 / 65.75 / 33, gap 15.75, pitch 32.75. Pixel
  sampling gives exactly 33 / 66 / 99, gap 16, pitch 33. The plan's figures
  were a first pass with rounding error. `geometry.js` uses the measured ones
  and says so.

- **[18-08-2026] Arches are filled paths, drawn on by a mask.**
  The plan called for `drawProgress` to drive `stroke-dasharray`. A tapered
  arch changes width along its length, so it cannot be a stroke at all. Both
  variants are filled, and `drawProgress` sweeps a mask along the centreline
  with `pathLength="1"`. This works identically for tapered and untapered
  arches, and needs no runtime path measurement.

- **[18-08-2026] `Reveal` drops its clip path once it settles.**
  A resting clip path, even at a 2px round, still creates a clipping context
  and shifted antialiasing on images. That broke phase 2's rule that no real
  page may change. `onAnimationComplete` now removes the clip entirely, so the
  resting render is pixel-identical to phase 1.

- **[18-08-2026] The nav restyle was reverted out of phase 2.**
  Wiring the header tone also changed the cream bar from `/70` to `/80` and the
  nav links to `text-button`. Both are arguably more correct, and both are
  phase 3's call, not phase 2's. Reverted so the cream state is unchanged.
  Only the new dark state is new.

- **[18-08-2026] The tier centrepiece is a sticky visual beside flowing copy,
  not a pinned block.** The first build pinned the whole two-column block in a
  centred `min-h-screen` box. At 1440x900 the copy was taller than the
  viewport, so the heading went under the fixed header and tier 3 was cut off
  the bottom: exactly metro-jewellers-website's round 9 failure. A sticky arch
  column beside text that flows normally cannot clip at any height. The arch
  column is also deliberately shorter than the viewport, because a sticky
  element only stays pinned for its parent's height minus its own.

- **[18-08-2026] The proof strip publishes four numbers, not the five planned.**
  "5 systems shipped" was dropped: the project folders do not support a clean
  count of shipped versus archived versus survey, and the rule is that an
  unsourceable number does not go up. The four that remain each carry their
  source in a code comment. The plan's "rows migrated and audited" was also
  corrected to "order rows audited", because crm-audit is a survey and
  extraction project and nothing was migrated.

- **[18-08-2026] Both base44 images are deleted, including the About page's.**
  Generic AI art served from a third-party CDN nobody at RKade controls. Phase
  3 only required removing the homepage one. The About page's was removed in
  the same pass rather than leaving a known dependency behind for phase 5.

- **[18-08-2026] The arch mark trace is APPROVED and shipping.** Raffay said
  yes against `docs/brand/arch-mark-trace-comparison.png`. `Logo.jsx` now
  defaults `showMark` to true, the header and footer carry the full lockup, and
  the favicon is the mark rather than the RK letters, which is what the guide
  calls the icon. The SVG was handed to `rkade-crm`, closing its open item O.1,
  blocked since 16-08-2026. If a master AI file ever turns up it replaces the
  trace, no questions.

- **[18-08-2026] Two case-study numbers from the plan were dropped, not
  softened.** The plan credited the lead platform with "six data providers";
  its own STATE.md names four free-derivation providers and does not support
  six. It also gave the storefront a phase count its folder does not confirm.
  The rule is that an unverifiable number does not ship, including a flattering
  one. Everything that did ship carries its source in a comment.

- **[18-08-2026] Section tone is computed, not hardcoded, where a list drives
  it.** The Work index alternates row tones, so its closing block derives its
  tone from the row count. Adding a sixth study therefore cannot silently put
  two cream sections next to each other. The same applies on a detail page when
  a study has no stats band.

## Open, needs Raffay

Nothing is blocking. Two things to do when convenient:

1. ~~Approve the traced arch mark.~~ **Done, 18-08-2026.** It ships.
2. **Paste in the Instagram and LinkedIn URLs** when those pages exist. Nothing
   breaks in the meantime, the icons simply do not render.
