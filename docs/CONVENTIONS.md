# Conventions

**Hard cap: 8 KB.** House rules for this project. Read before writing any code.

---

## The workflow for shipping a change

1. Create a branch for the change (`git checkout -b <descriptive-name>`).
2. Make the edit(s), commit, push the branch.
3. Open the PR via GitHub's API, using `GITHUB_TOKEN`. Don't ask for a manual
   click unless the API is somehow unavailable.
4. Poll for the Netlify deploy preview URL, then actually load it and confirm
   the change rendered correctly. Don't assume the diff is right.
5. Show the preview link and **wait for an explicit "yes" in chat**. This is
   the one checkpoint that always needs a live confirmation, even with
   standing trust for everything else. Never merge to `main` without it.
6. On approval: merge with `--no-ff`, a descriptive merge commit, push, then
   delete the branch both remotely and locally without asking.
7. If rejected: delete the branch without merging. `main` was never touched.

Local Node and npm are available (v24.18.1 / 11.16.0, verified 18-08-2026), so
changes can be built and loaded locally first. The Netlify preview stays as
the **approval gate**, not as the only way to see anything.

## Named tokens, never raw hex

No component carries a raw hex value. Colours are declared once as named
Tailwind tokens (`cream`, `cream-raised`, `ink`, `ink-deep`, `gold`,
`gold-dark`, `muted`, `muted-on-ink`, `line`, `line-strong`) and every
component references the name. If a colour needs a new shade, add the token,
don't inline the hex. Verify with a grep for `#[0-9a-fA-F]{3,6}` in `src/`
before calling anything done.

**One documented exception:** `src/components/arch/Arch.jsx`'s SVG `<mask>`
strokes its centreline with `stroke="#fff"`. That value is never painted on
screen, it only tells the mask which pixels of the arch shape to reveal as the
draw animation progresses. It carries no brand meaning and swapping it for a
token would not change how anything looks. Leave it as `#fff`, don't churn it
into a token.

## Corners

Global corner radius is 2px. The only genuinely round things on the site are
arches and small status dots. A new `rounded-xl` or `rounded-full` on anything
else is a bug, not a style choice.

## Type roles

Display family (Cormorant Garamond) for headings only, weight 300 or 400,
never bold, never below 18px. Labels and eyebrows are Montserrat 500 at 0.3em
tracking. Body copy is Montserrat 300.

## Words

- **No em dashes anywhere.** Comma, colon, or two sentences.
- **Banned words:** leverage, synergy, ecosystem, holistic, cutting-edge,
  seamlessly, robust.
- No passive voice. One sentence where others use three.
- The wordmark is **RKade** in prose: capital R, capital K, lowercase "ade".
  Never RKADE in body copy.
- "Free Audit" is the fixed wording for that CTA everywhere on the site. Never
  soften it to "Get in touch" or "Learn more": the audit is genuinely free and
  that fact is load-bearing.

## Contact details, single source

`src/components/common/CTAButtons.jsx` is the only place email, WhatsApp,
calendar and social links are declared. Every component imports from there.
Never hardcode an email address, phone number or external link inline in a
component.

## Placeholders never ship as dead links

If a link genuinely doesn't exist yet, its constant is the literal string
`'PLACEHOLDER'` in `CTAButtons.jsx`, and the component rendering it filters
placeholders out rather than rendering an `href="#"`. No icons beats dead
icons.
