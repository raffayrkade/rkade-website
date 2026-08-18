# Setup: things Raffay has to go and do himself

None of these block the site from running. Nothing here is a code change,
they are all clicks on somebody else's website.

---
## Needed today, and this one is broken on the LIVE site right now

### Your Google booking link is dead. Every "Free Audit" button on rkade.co
### currently leads to an error page.

**What it is for:** every Free Audit button on the site, on every page, sends
people to `calendar.app.google/La6EpDjL6HBNR67k7`. That is meant to be your
appointment booking page. It is the single most important link on the whole
site, because it is the one a prospect clicks when they have decided to talk to
you.

**What is wrong:** that link now loads a Google error page reading
"Appointment not found. The appointment schedule is currently unavailable."
Checked twice on 18-08-2026, once automatically and once in a real browser,
signed out, the way a stranger would see it. It is not a temporary blip and it
is not caused by anything on this website. The appointment schedule inside your
Google Calendar has been deleted, unpublished, or had its sharing turned off.

**What it means:** anyone who visited rkade.co and tried to book has hit a dead
end. There is no way to know how many. This is worth ten minutes today,
separately from the website rebuild.

**What it costs:** free. Appointment schedules are included with Google
Workspace. If the account is a plain free gmail.com account rather than a
Workspace one, appointment schedules are limited, which may be the actual cause.

**The website:** calendar.google.com

**The literal clicks:**
1. Go to calendar.google.com and sign in with the account that owns the RKADE
   booking page.
2. Look at the left sidebar. Under **My calendars**, check whether you are
   signed into the right account, top right corner shows which one.
3. Click the **Create** button, top left, and see whether **Appointment
   schedule** appears in the menu that drops down.
   - **If it does not appear at all**, this account cannot make appointment
     schedules. That is the answer, and it means the old link was made on a
     different account. Sign out and try the other account you use for RKADE.
   - **If it does appear**, carry on to step 4.
4. Switch the calendar to a week view and look for the existing appointment
   schedule block. It usually shows as a shaded repeating block. If you find
   one called something like Free Audit or Consultation, click it, then click
   **Open booking page** and see whether it loads properly.
5. If the old one is gone or broken, click **Create**, then **Appointment
   schedule**, and make a new one:
   - **Title**: Free Audit
   - **Appointment duration**: 30 minutes
   - **General availability**: set the days and hours you actually want calls
   - Click **Next**, then leave the booking form settings as they are
   - Click **Save**
6. Click the new schedule in your calendar, then click the **Share** button.
7. Copy the address in the box labelled **Booking page link**.

**What it is called on that page:** Google calls it an "appointment schedule",
and the link is called the "booking page link".

**What it should look like:** starts `https://calendar.app.google/` followed by
about 17 letters and numbers. That is the same shape as the old dead one, so
compare them: if the new link is character for character identical to
`https://calendar.app.google/La6EpDjL6HBNR67k7` then you have found the old
schedule rather than made a new one, which is fine, it just means the problem
was that it was unpublished.

**The trap:** there are two very similar things in Google Calendar,
**appointment schedules** and **appointment slots**. Appointment slots are the
older feature and their links look completely different. If what you end up
with does not start `calendar.app.google`, you made the wrong one.

**Second trap:** after making the schedule, open the booking link in a private
or incognito browser window before sending it. Signed into your own account
almost everything looks like it works. Signed out is how a prospect sees it,
and that is where this one failed.

**When it is actually needed:** the broken link is live today, so today.
For the rebuild specifically, it is needed before the new site goes live.
Send me the working link and I will wire it in. If it is not fixed by the time
the new site is ready to deploy, the Free Audit buttons will point at the
contact page instead, which has WhatsApp, email and the contact form all
working. That is a smaller loss than a button that leads to an error page.

---



## Needed today: the GitHub token, so the deploy can happen without you

**What it is for:** at the very end of this build the whole new site goes up as
a pull request, which is a "here is the change, look at it before it goes live"
page on GitHub. Netlify then builds a private preview of the site from it, and
that preview link is the thing you actually look at and approve. Creating that
pull request automatically needs a GitHub token. There used to be one on this
machine, saved as `GITHUB_TOKEN`, and it is gone now. Without it, you have to
click a "Create pull request" button yourself, which is not the end of the
world, but it means the last step of the build stops and waits for you.

**What it costs:** free. GitHub tokens cost nothing, on any plan, forever.

**The website:** github.com

**The literal clicks:**
1. Go to github.com and sign in as `raffayrkade`.
2. Click your **profile picture**, top right corner.
3. Click **Settings** in the menu that drops down.
4. Scroll to the very bottom of the left sidebar and click **Developer
   settings**. It is the last item.
5. Click **Personal access tokens** in the left sidebar, then click
   **Fine-grained tokens** underneath it.
6. Click the green **Generate new token** button, top right.
7. In the box labelled **Token name**, type: `rkade-website-deploy`
8. In the box labelled **Expiration**, choose **90 days**. (Choosing "No
   expiration" also works but GitHub will nag you about it.)
9. Under **Repository access**, click the option **Only select repositories**.
   A dropdown appears. Click it and tick **raffayrkade/rkade-website**.
10. Under **Permissions**, click **Repository permissions** to open the list.
    It is long. You only need to change two rows:
    - Find the row **Contents**. Its dropdown says "No access". Change it to
      **Read and write**.
    - Find the row **Pull requests**. Change its dropdown to **Read and write**.
    - Leave every other row alone. A row called **Metadata** will switch itself
      to "Read-only" automatically and refuse to be changed back. That is
      normal and correct, leave it.
11. Scroll to the bottom and click the green **Generate token** button.
12. The next screen shows the token once and never again. Click the
    **copy icon** next to it.

**What it is called on that page:** GitHub calls it a "fine-grained personal
access token". It is never called `GITHUB_TOKEN` anywhere on GitHub's site.
`GITHUB_TOKEN` is only the name this computer stores it under.

**What it should look like:** starts with `github_pat_`, roughly 90 characters
of letters, numbers and underscores.

**Now save it onto this computer.** Do not paste it into the chat.
1. Click the Windows **Start** button and type `cmd`.
2. Click **Command Prompt** in the results.
3. Type this, replacing the part in capitals with the token you copied, then
   press Enter:

   ```
   setx GITHUB_TOKEN "PASTE_THE_TOKEN_HERE"
   ```

   Keep the quote marks. This is the one place quote marks are needed, because
   Windows needs them.
4. It should reply `SUCCESS: Specified value was saved.`
5. **Close this Claude Code window and open the project again** with
   `rkade rkade-website`. Programs only pick up a new environment variable when
   they start, so the currently running one will not see it.

**The trap:** on step 5 there are two lists, **Tokens (classic)** and
**Fine-grained tokens**. Use fine-grained. A classic token works but it has
access to every repository you own, including anything with client work in it,
which is exactly what we do not want a token sitting on a laptop to have.

**Second trap:** on step 12, if you click away before copying, the token is
gone permanently and you have to delete it and start again from step 6. GitHub
will not show it a second time.

**When it is actually needed:** only at the very end, when you type `deploy`.
Nothing in the build waits for it. Do it whenever is convenient between now and
then. If it is not there when we get to the end, I will push the branch and
hand you a link to click instead, and the deploy still happens, just with one
manual step.

---

## Needed soon: point the contact form's real inbox at contact@rkade.co

**What it is for:** the contact form on `/contact` is wired to Formspree, a
service that takes the form submission and emails it somewhere. Right now
that "somewhere" is still set to `hello@rkade.co` inside the Formspree
account itself, even though every email address shown on the site was
changed to `contact@rkade.co`. The code cannot fix this part: Formspree
stores the delivery address on their server, not in this repo.

**What it costs:** free, on Formspree's free plan (up to 50 submissions a
month, which this site is nowhere near). No card needed.

**The website:** formspree.io

**The literal clicks:**
1. Go to formspree.io and log in (this project already has an account, since
   the form is live and working today).
2. Click the form already in use for rkade.co. If unsure which one, the form
   ID is `mzdnppbe`, so the form's URL in the dashboard will end in
   `/forms/mzdnppbe` or show that ID somewhere on its settings page.
3. Click **Settings** (usually a tab near the top of the form's page).
4. Find the field labelled **Email** or **Notification Email** (Formspree has
   changed this label before, so look for whichever box currently holds an
   email address).
5. Change it from `hello@rkade.co` to `contact@rkade.co`.
6. Click **Save**.

**What it should look like when done:** the settings page shows
`contact@rkade.co` in that box, not `hello@rkade.co`.

**The trap:** there may be a second, separate field for a "reply-to" or
"CC" address. Only change the one that controls where the submission itself
is delivered. Leaving a stray CC pointed at the old address is harmless but
pointless, so change it too if you see it.

**When it is actually needed:** before relying on the contact form to reach
anyone. It does not block the site from working today: the form still sends,
it just currently lands in the old inbox. Do this whenever convenient.

---

## Needed only when the pages exist: Instagram and LinkedIn URLs

**What they are for:** the two social icons in the site footer. Both are
currently suppressed (nothing renders) because neither profile exists yet.
The moment a real URL is pasted into `CTAButtons.jsx`, that one icon appears
in the footer automatically, with no other change needed.

**What it costs:** free. Creating an Instagram business account or a LinkedIn
company page costs nothing.

**The websites:** instagram.com and linkedin.com

**The literal clicks, once each page exists:**
1. Open the Instagram profile (or the LinkedIn company page) in a browser.
2. Copy the address straight out of the browser's address bar. For Instagram
   it will look like `https://www.instagram.com/rkade.co/` (the brand guide
   names the handle `@rkade.co`). For LinkedIn it will look like
   `https://www.linkedin.com/company/rkade` or similar, whatever the company
   page's actual slug ends up being.
3. Open `rkade-website/src/components/common/CTAButtons.jsx` in the code, or
   ask whoever is doing the next round of edits to paste it in for you.
4. Replace the text `PLACEHOLDER` after `INSTAGRAM_LINK =` (or
   `LINKEDIN_LINK =`) with the URL copied in step 2, keeping the quote marks
   around it.

**What it should look like:** a full `https://` address inside quotes, not
just a handle like `@rkade.co`.

**The trap:** don't paste in a login page or a "create account" URL by
mistake. It should be the public profile page anyone can see while logged
out.

**When it is actually needed:** not until the Instagram and LinkedIn pages
themselves exist and have real content on them. Nothing breaks by leaving
this blank indefinitely, the footer simply shows no social icons until then.

INSTAGRAM_LINK=PASTE_HERE
LINKEDIN_LINK=PASTE_HERE
