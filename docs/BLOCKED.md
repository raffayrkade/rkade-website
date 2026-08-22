# Blocked

Things a build ran into that it could not finish, and kept going past.

## Why this file exists

A build must never stop and wait for Raffay. Before 19-08-2026 an agent that
hit something it could not do would stop and ask, which meant an overnight run
did twenty minutes of work and then sat idle until morning.

The rule now: hit a blocker, write one line here, carry on with the next work
unit or lane, and report the whole list at the end.

Interrupt Raffay mid-run only if carrying on would lose work, spend real money,
or reach a client. Those three, nothing else.

## Before you write a line here

Most blockers are not blockers. Check first:

- A credential? Check the service CLI, then `~/.rkade/.env`, then this
  project's `.env.local`, then `rkade vault pull <project>`. The CLIs are all
  installed and signed in. Only after all four come up empty is it blocked.
- A permission prompt? There should not be one. If you genuinely hit a `deny`
  rule, that is a real blocker, and say which rule.
- Something you do not know? That is a job for scout, not a blocker.

## Format

One line each. Newest at the top. Dates dd-mm-yyyy.

| Date | Phase / unit | What is blocked | What is needed to unblock it |
|---|---|---|---|
| 19-08-2026 | Copy review, other pages | The same copy pass on /about, /services, /work and /contact | Kushan's review of those four pages. His document covers the homepage only, and names /about as the one to do first. |
| 19-08-2026 | Site audit, item 5 | The lead-sourcing case study still has no image, on the /work grid and its detail page | One screenshot of the cost-estimate screen. It is RKade's own tool, so this is a screenshot, not a shoot. `work.js` has the empty `images` array ready. |
| 22-08-2026 | Audit pass 2, S2 | Same as the row above, re-confirmed on production. It is now the only item from either audit pass that is still open and actionable. | Unchanged: one screenshot from Raffay. |

## Clearing

recorder clears a row once the blocker is gone. Nothing is deleted, resolved
rows move to `docs/history/`.
