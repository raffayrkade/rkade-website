// Central place for all real contact links.
// Update here once, it updates everywhere on the site.

export const WHATSAPP_LINK =
  "https://wa.me/971563061331?text=Hi%20RKade%2C%20I%27d%20like%20to%20talk%20about%20automation";

// The /links page (the business card QR destination) offers one WhatsApp
// button for the whole team. It goes to Kushan's number: he is the one in
// the field handing out cards. Decided by Raffay in chat, 28-08-2026,
// replacing an earlier two-button version.
export const WHATSAPP_CARD =
  "https://wa.me/971505502465?text=Hi%20RKade%2C%20I%20scanned%20your%20card";

// The jewellery CRM demo, seeded with fake data, safe to hand to anyone.
// While this is PLACEHOLDER the /links page renders no demo button at all,
// same rule as the social icons below: no button beats a dead button.
// It must NEVER point at a live client instance holding real customer data.
export const DEMO_LINK = "PLACEHOLDER";

export const CALENDAR_LINK = "https://calendar.app.google/waHYAngJttZ25BbL7";

// Is the booking page above actually working?
//
// YES, as of 18-08-2026. Raffay supplied a new appointment schedule and it was
// checked signed out, in a clean browser session, the way a stranger sees it:
// it loads as "RKADE Free Audit Call", 30 minute slots, Google Meet added on
// booking, with real availability. The previous schedule was dead and returned
// "Appointment not found", which is why this switch exists.
//
// If a booking page ever breaks again, set this to false. Every Free Audit
// button on the site then routes to /contact instead, where WhatsApp, email
// and the contact form all work, and the booking overlay offers those two
// routes rather than a button to an error page.
export const CALENDAR_LIVE = true;

// Where "Free Audit" should actually send someone right now.
export const FREE_AUDIT_HREF = CALENDAR_LIVE ? CALENDAR_LINK : "/contact";
export const FREE_AUDIT_IS_EXTERNAL = CALENDAR_LIVE;

export const CONTACT_EMAIL = "contact@rkade.co";

// Set these to the real URLs when the pages exist. While a value is
// still PLACEHOLDER the footer does not render that icon at all, so an
// unfinished profile never ships as a dead link.
export const INSTAGRAM_LINK = "https://www.instagram.com/rkade.co";
export const LINKEDIN_LINK = "PLACEHOLDER";
