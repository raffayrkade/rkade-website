// Field limits for the BDR application form. They mirror, character for
// character, "The public applicant endpoint: exact contract" in
// rkade-crm/docs/plan/phase-10.md. If the CRM changes a limit, change it here
// in the same commit. The numbers live in this file on purpose, so the page
// and form components stay free of figures.

export const LIMITS = {
  full_name: { min: 2, max: 120 },
  email: { max: 254 },
  whatsapp_number: { minDigits: 7, maxDigits: 15, maxInput: 40 },
  city: { min: 1, max: 80 },
  country: { min: 1, max: 80 },
  current_activity_where: { max: 120 },
  linkedin_url: { max: 300 },
  languages: { min: 1, max: 200 },
  why_join: { min: 10, max: 1000 },
};

export const ACTIVITIES = ['studying', 'working', 'other'];

// The server rejects a photo over 524288 bytes and never resizes. We aim
// under this so there is room to spare.
export const PHOTO_SERVER_MAX_BYTES = 524288;
export const PHOTO_TARGET_BYTES = 500 * 1024;
export const PHOTO_MAX_SIDE = 800;
// A picker can hand us a huge original. Refuse only the absurd.
export const PHOTO_PICK_MAX_BYTES = 40 * 1024 * 1024;

export const EXAMPLE_WHATSAPP = '+44 7700 900123';
export const EXAMPLE_LINKEDIN = 'https://www.linkedin.com/in/your-name';
