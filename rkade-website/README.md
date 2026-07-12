# RKADE Website

Standalone React + Vite site for RKADE, exported from Base44 and rebuilt for free hosting on Netlify.

## Before deploying

1. **Contact form**: open `src/components/contact/ContactForm.jsx` and replace
   `FORM_ENDPOINT` with your real Formspree endpoint (sign up free at formspree.io,
   create a form, set its destination to `hello@rkade.co`).
2. **Contact details**: all real links (WhatsApp, booking calendar, email) live in
   one place — `src/components/common/CTAButtons.jsx`. Update there if anything changes.

## Local development

```
npm install
npm run dev
```

## Deploy (free)

1. Push this repo to GitHub.
2. Go to app.netlify.com, sign in with GitHub, "Add new site" → "Import an existing project," select this repo, deploy.
3. In Netlify site settings → Domain management, add `rkade.co` and follow the DNS
   instructions it gives you (add those records in GoDaddy's DNS management).
