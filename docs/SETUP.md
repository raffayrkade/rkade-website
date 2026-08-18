# Setup: things Raffay has to go and do himself

None of these block the site from running. Nothing here is a code change,
they are all clicks on somebody else's website.

---

## Needed today: nothing blocking

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
