# Session log

Checkpoint-style, one entry per meaningful change, not a full transcript.
Newest last.

---

## 18-08-2026, phase 1: foundation and brand truth

Built and verified locally. Not pushed, not deployed.

- Fonts swapped to Cormorant Garamond and Montserrat, old Inter and Bricolage
  removed. Weights limited to 300/400/600 and 300/500.
- Colour moved into `rkade-website/brand-tokens.json`, the single source read
  by both Tailwind and the contrast checker. Zero raw hex left in `src/`.
- `warmgrey` to `muted`, `divider` split into `line` and `line-strong`,
  `offcream` deleted, `cream-elevated` to `cream-raised`.
- `npm run check:contrast` added and wired into `npm run build`. Proved it
  fails on a deliberate regression and passes when restored.
- `npm run verify:routes` added. All four routes prerender to real HTML.
- Corners to 2px everywhere except the two status dots. Section padding to
  `py-28 md:py-36`. Named type scale added and applied.
- Six illegal gold-on-cream text usages fixed, two by re-solving them as
  italic and as gold underlines rather than flattening the accent.
- Arch mark traced from the PDF and measured to under a pixel. Comparison at
  `docs/brand/arch-mark-trace-comparison.png`, waiting on sign-off.
- Favicon rebuilt with real Cormorant outlines. First ever OG image added.
- `rkade-website - Updated Colors/` retired into `docs/history/`.
- Screenshots of all four routes at 390px and 1440px in `docs/brand/shots/`.
