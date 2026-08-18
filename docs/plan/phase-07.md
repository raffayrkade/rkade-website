# Phase 7: Deploy

**This phase does not run as part of the build loop.** It runs when Raffay types
`deploy`, and only then.

rkade.co is live. Every deploy replaces the public face of the company.

---

## The workflow, which already exists and is not being changed

Established 12-07-2026 after a direct-to-`main` commit went live, Raffay
disliked it, and it had to be reverted on the live site. It has held since. It
holds here.

1. Branch. Descriptive name
2. Commit, push
3. Open the PR **via the GitHub API** using `GITHUB_TOKEN`, which is already set
   as a fine-grained PAT scoped to this repo. Do not hand Raffay a link to click
4. Poll for the Netlify deploy preview URL. It appears as a commit status or a
   `netlify[bot]` PR comment within 10 to 60 seconds
5. **Actually visit the preview** and confirm it rendered. Do not assume the
   diff is right. A passing build has produced a blank page on this repo before
6. Give Raffay the preview link and a summary, and **wait for an explicit yes in
   chat**. This is a standing exception to every "stop asking permission" rule
   in the system, and it exists for a reason
7. On approval: merge to `main` with `--no-ff` and a descriptive merge commit,
   push, then delete the branch locally and remotely without asking. That
   cleanup is pre-approved
8. If Raffay rejects the preview: delete the branch, do not merge. `main` was
   never touched

## What is different about this one

Every previous deploy on this repo was a small change. This is the whole site.

- **One PR, not six.** A phase-by-phase deploy would put a half-redesigned site
  in front of clients for days. Build everything on a long-lived branch, deploy
  once
- **The preview is the review.** Raffay looks at the real thing on a real phone
  at the Netlify preview URL, not at screenshots. Give him time with it
- **Expect a round of changes.** A full redesign gets feedback. Budget for it
  rather than treating the first preview as the deploy

## Before asking for approval

- [ ] Phase 6 fully passed, including the real-device pass
- [ ] Preview URL loaded and confirmed non-blank on desktop and phone
- [ ] All nine routes checked on the preview, including direct reload
- [ ] Before and after screenshots ready
- [ ] Every CTA on the preview clicked and followed to its real destination.
      The booking widget makes a real booking, the form sends a real message
- [ ] `git log origin/main..HEAD` reviewed. Nothing unexpected
- [ ] No secret in any commit. `.env.local` gitignored, the image generation
      keys in `~/.rkade/.env` and not in this repo

## After it goes live

- [ ] rkade.co loads, on a phone, off RKADE's wifi
- [ ] All nine routes 200 on the live domain
- [ ] Direct reload of a deep route works. This is what `_redirects` is for and
      it has broken before
- [ ] Social card renders. Paste the URL into WhatsApp and look at it
- [ ] Contact form sends to the real inbox from the live domain
- [ ] `recorder` updates `docs/STATE.md` with the live status and the date
- [ ] Old site archived: a full screenshot set into
      `docs/history/pre-revamp-site/`, so what was replaced is recoverable

## Rollback

Netlify keeps every previous deploy. Rolling back is one click in the Netlify
dashboard, and it does not need a git revert first. Know where that button is
**before** deploying, not while a client is looking at a broken page.

The git path: revert the merge commit on `main`, push, let Netlify rebuild.
Slower. Use the dashboard.
