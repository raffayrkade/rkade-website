# Deploy state

Stack: GitHub raffayrkade/rkade-website, Netlify site tubular-custard-25a8cf, live https://rkade.co. No database, no migrations.

| Step | Command | Proof (read-only) |
|---|---|---|
| 1 PR merged | gh pr create --base main, then gh pr merge N --merge | git ls-remote origin refs/heads/main shows the merge SHA |
| 2 Netlify builds main | automatic on push to main | live JS bundle at https://rkade.co contains the expected change |
| 3 Health | curl https://rkade.co/ and /contact and /become-a-bdr | all 200 (Netlify serves 200 for every path, so also grep the bundle) |

Last deploy 08-10-2026: PR #15, merge 27d4218. Bundle holds the crm.rkade.co endpoint and no localhost URL. Preflight from https://rkade.co to the CRM endpoint returns Access-Control-Allow-Origin: https://rkade.co. Not done: a real submission, an on-page click test of the footer link, the error statuses.
