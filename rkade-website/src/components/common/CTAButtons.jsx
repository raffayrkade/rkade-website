// Central place for all real contact links.
// Update here once, it updates everywhere on the site.

export const WHATSAPP_LINK =
  "https://wa.me/971563061331?text=Hi%20RKade%2C%20I%27d%20like%20to%20talk%20about%20automation";

export const CALENDAR_LINK = "https://calendar.app.google/La6EpDjL6HBNR67k7";

// Is the booking page above actually working?
//
// Checked signed out on 18-08-2026 and it was NOT. Google returned
// "Appointment not found. The appointment schedule is currently unavailable."
// The schedule inside the Google Calendar account has been deleted,
// unpublished, or had its sharing switched off. See docs/SETUP.md for the
// steps to fix it.
//
// While this is false, every Free Audit button on the site goes to /contact
// instead, where WhatsApp, email and the contact form all work. A prospect who
// wants to talk can still reach someone. A button opening a Google error page
// in a new tab loses them completely.
//
// SET THIS BACK TO true the moment the booking link works again. That one
// change restores direct-to-calendar behaviour everywhere on the site.
export const CALENDAR_LIVE = false;

// Where "Free Audit" should actually send someone right now.
export const FREE_AUDIT_HREF = CALENDAR_LIVE ? CALENDAR_LINK : "/contact";
export const FREE_AUDIT_IS_EXTERNAL = CALENDAR_LIVE;

export const CONTACT_EMAIL = "contact@rkade.co";

// Set these to the real URLs when the pages exist. While a value is
// still PLACEHOLDER the footer does not render that icon at all, so an
// unfinished profile never ships as a dead link.
export const INSTAGRAM_LINK = "PLACEHOLDER";
export const LINKEDIN_LINK = "PLACEHOLDER";
