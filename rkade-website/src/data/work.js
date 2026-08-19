/**
 * The five case studies.
 *
 * RULES, decided by Raffay 18-08-2026, and not negotiable:
 *
 * 1. ANONYMISE EVERYTHING. Sector plus outcome, never a name, never a logo,
 *    never a location specific enough to identify by elimination.
 * 2. NO CLIENT FINANCIALS in any form. Not a figure, not a percentage, not
 *    "double digit". Process numbers only: screens surveyed, rows parsed,
 *    years covered.
 * 3. EVERY NUMBER IS CHECKABLE. `source` points at the project folder it came
 *    from. It is never rendered. It exists so the next person can re-verify a
 *    number without opening five project folders.
 * 4. NEVER CLAIM LIVE WHEN IT IS NOT. Statuses were checked against each
 *    project's own docs/STATE.md on 18-08-2026.
 *
 * Two numbers the plan proposed are deliberately absent. It said the lead
 * platform uses "six data providers"; its STATE.md names four free-derivation
 * providers and does not support six, so no provider count ships. It also
 * proposed a phase count for the storefront that its folder does not confirm.
 * An unverifiable number does not go up, even a flattering one.
 *
 * IMAGES. `images` is an array, empty where nothing exists to show (the lead
 * platform never had a screen worth capturing). Each entry carries a `role`:
 *
 *   'problem'  the image that illustrates the "before" state, shown beside
 *              the problem paragraph on the detail page
 *   'build'    the strongest real screenshot of the system, shown beside the
 *              "what we built" list. This is the image the index page uses
 *              too, since a prospect scanning /work should see the actual
 *              product before anything else
 *   'gallery'  supporting screenshots, shown as a smaller strip underneath
 *
 * All seed data in these screenshots is invented for the capture: shop name,
 * owner name, customer names and phone numbers, deal names, all fictional.
 * See docs/history/image-generation.md for how each file was made or
 * sourced, and scripts/generate-work-image-crops.mjs for the two files that
 * are crops of a raw capture rather than the capture itself, and why.
 */

export const STATUSES = {
  live: { label: 'Live', tone: 'gold' },
  delivered: { label: 'Delivered', tone: 'gold' },
  review: { label: 'Built, in client review', tone: 'muted' },
}

const work = [
  {
    slug: 'jewellery-trade-crm',
    sector: 'A Dubai gold and diamond trader',
    title: 'The whole business came off a paper book',
    status: 'live',
    year: '2026',
    summary: 'Stock, sales, customers and cash moved from a paper ledger to a CRM built for the trade.',
    problem:
      'Everything ran in a book. Stock, who owed what, which stone went out on approval and never came back. Nobody could answer a question about the business without turning pages, and nothing could be checked twice.',
    whatWeBuilt: [
      'Stock tracked by piece, by carat and by gram, because the same stone is sold three different ways',
      'Certified and uncertified stones handled as genuinely different things',
      'A custom order workflow that follows a job from quote to collection',
      'Live gold rate feeding pricing, so a quote is never yesterday’s number',
      'Invoicing, customer ledgers and cash position in one place',
    ],
    angle:
      'This was not a CRM bought and configured. Off-the-shelf software has no concept of selling one stone by three units of measure, which is exactly why it had to be built.',
    stats: [
      // Jewelry-CRM/docs/STATE.md: "Phase 28 of 28 (100%)".
      { value: 28, label: 'build phases' },
      // Jewelry-CRM/docs/STATE.md: "All 170 tasks across 28 phases".
      { value: 170, label: 'tasks shipped' },
      // Jewelry-CRM/docs/STATE.md: "migration 120 (error_log)".
      { value: 120, label: 'database migrations' },
    ],
    // Jewelry-CRM/docs/STATE.md: "eu-central-1 (Frankfurt)".
    stack: 'Deployed to Frankfurt for latency and data residency. In daily use.',
    images: [
      {
        role: 'problem',
        src: '/work/jewelry-crm-lead.webp',
        alt: 'A brass balance scale weighing loose diamonds against gold nuggets on a wooden desk, beside an open handwritten ledger and a pair of tweezers, the paper bookkeeping the shop ran on before this system existed.',
        width: 1400,
        height: 933,
      },
      {
        role: 'build',
        src: '/work/jewelry-crm-stock.webp',
        alt: "The CRM's Stock screen, a table of jewellery items by code, name, category and live balance: a 22K gold chain shown in grams, a certified diamond packet shown in carats, a wedding band pair shown by the piece.",
        width: 1440,
        height: 900,
      },
      {
        role: 'gallery',
        caption: 'Today',
        src: '/work/jewelry-crm-today.webp',
        alt: "The CRM's Today screen, quick action tiles for New Sale, New Expense, Receive Payment and New Purchase, above cards totalling the day's sales, expenses and cash in hand in AED.",
        width: 1440,
        height: 900,
      },
      {
        role: 'gallery',
        caption: 'Parties',
        src: '/work/jewelry-crm-parties.webp',
        alt: "The CRM's Parties screen, a table of customers and suppliers with phone numbers, balance status and buttons to collect a payment or view a full ledger.",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: 'luxury-jewellery-storefront',
    sector: 'A UAE luxury jewellery retailer',
    title: 'A storefront the owner can run without us',
    status: 'review',
    year: '2026',
    summary: 'Scroll cinematics on the front, and an upload system a non-technical owner runs himself.',
    problem:
      'The brief was blunt: every competitor site was a simple webpage with some nice photos. They wanted something that felt like the product. They also could not afford to call a developer every time a price moved.',
    whatWeBuilt: [
      'Scroll cinematics that zoom into a diamond and back out to the mountain it came from',
      'An upload system the owner runs himself, five or six products a day, no developer involved',
      'A UAE gold price that refreshes on its own',
      'A product catalogue built around how the shop actually merchandises',
    ],
    angle:
      'The interesting engineering was not the animation. It was making it so the owner never has to call us to change a price.',
    stats: [
      // metro-jewellers-website/docs/STATE.md: rounds 6 to 9 are the most
      // recent four, so nine rounds in total, all closed.
      { value: 9, label: 'feedback rounds, all closed' },
    ],
    stack: 'Built and handed over. Awaiting the client’s go-ahead to deploy.',
    images: [
      {
        role: 'build',
        src: '/work/metro-storefront-certified-card.webp',
        alt: 'Three independent diamond grading reports shown side by side on the storefront, each from a different named lab, listing cut, carat weight, colour grade and clarity grade, so a buyer can compare certificates before choosing a stone.',
        width: 1440,
        height: 410,
      },
      {
        role: 'gallery',
        caption: 'Loose diamonds',
        src: '/work/metro-storefront-diamonds.webp',
        alt: "Loose faceted diamonds scattered across a jeweller's grading card under the storefront's Loose Diamonds section heading, with tweezers resting at the edge of the frame.",
        width: 1280,
        height: 280,
      },
      {
        role: 'gallery',
        caption: 'Gemstones',
        src: '/work/metro-storefront-gemstones.webp',
        alt: "An arrangement of coloured gemstones, sapphires, rubies, emeralds and topaz among them, under the storefront's Gemstones section heading.",
        width: 1280,
        height: 280,
      },
    ],
  },
  {
    slug: 'lead-sourcing-platform',
    sector: 'A lead sourcing and enrichment platform',
    title: 'It tells you what it will cost before it spends anything',
    status: 'live',
    year: '2026',
    summary: 'Sources businesses by category and city, enriches them, and exports the lot as a spreadsheet.',
    problem:
      'Buying leads means paying per lookup, usually before you know whether the lookup will return anything. Most enrichment tools also quietly fill the gaps they cannot answer, which is worse than an empty column.',
    whatWeBuilt: [
      'Sourcing by category and city, then enrichment with websites, phone numbers, social handles and traffic data',
      'A cost estimate shown and confirmed before every paid action',
      'Mock mode on by default, so nothing spends money until it is told to',
      'Encrypted key storage, with each provider isolated behind its own gate',
      'One-click export of the whole result set',
    ],
    angle:
      'The discipline is the product. When a provider returns nothing, the field is left blank rather than guessed. Most tools in this category invent the answer and never tell you which ones they made up.',
    // No counter here on purpose. The only hard number this project offers is
    // its go-live date, and a counter ticking up to 2026 reads as a gimmick.
    // Lead-Generation-Tool/docs/DEPLOYMENT.md: "went live 2026-07-25".
    stats: [],
    stack: 'Live since July 2026. Custom domain, SSL, running on a free tier by design.',
    // No screenshot exists for this one, and none gets invented. The
    // interface is a working form and a spreadsheet export, nothing that
    // reads as distinctive next to the other four, so it ships without an
    // image rather than with a mockup of a UI that does not look like this.
    images: [],
  },
  {
    slug: 'crm-forensic-audit',
    sector: 'A UAE retail group',
    title: 'A forensic audit of a system they did not own',
    status: 'delivered',
    year: '2026',
    summary: 'Surveyed an entire CRM the client could not export from, and built the picture the supplier would not give.',
    problem:
      'The business ran on a CRM it did not own, could not export from cleanly, and could not get straight answers out of. Every question about its own data went through the supplier.',
    whatWeBuilt: [
      'A survey of every screen in the system, captured and catalogued',
      'Extraction proven end to end, including working around an email obfuscation layer and a session filter that hid records',
      'Two years of order data parsed and reconciled',
      'A dossier for the owner, plus an ownership brief setting out what it would take to own the system outright',
    ],
    // HARD RULE. The audit's headline finding was a revenue trend the owner had
    // not spotted. Saying a trend was found is fine. A figure, a percentage or
    // a date range is not, and the first draft of one gets deleted, not
    // softened. That finding belongs to the client.
    angle:
      'The survey surfaced a trend in the numbers that nobody inside the business had raised. That belongs to the client, so it is not on this page. What is on this page is the method that found it.',
    stats: [
      // crm-audit/docs/STATE.md: "67 pages captured, 39 data files, 6,254
      // parsed rows, plus 90,048 rows of order exports across two years."
      { value: 67, label: 'screens captured' },
      { value: 6254, label: 'rows parsed' },
      { value: 90048, label: 'order rows, two years' },
    ],
    stack: 'Delivered as a dossier and an ownership brief.',
    images: [
      {
        role: 'problem',
        src: '/work/crm-audit-lead.webp',
        alt: 'An open antique ledger under a brass magnifying glass, with loose paper receipts beside it, the paper trail RKade traced by hand before the client could get straight answers from a system it did not own.',
        width: 1536,
        height: 1024,
      },
    ],
  },
  {
    slug: 'our-own-crm',
    sector: 'RKade',
    title: 'We run RKade on the system we built for it',
    status: 'live',
    year: '2026',
    summary: 'Our deals, projects, checklists and money, in a CRM we built for ourselves.',
    problem:
      'Recommending systems you do not use yourself is the oldest tell in consulting. We also had the ordinary problem: two founders, deals in a chat thread, and no single place that said what was owed.',
    whatWeBuilt: [
      'Deals through a pipeline, with won deals becoming projects automatically',
      'Per-project-type SOP checklists, so delivery does not depend on memory',
      'Task lists for both founders',
      'The money in AED and USD side by side',
    ],
    angle:
      'Built mobile first, because one founder works from the Gold Souk on a phone. It is the shortest credibility argument available, and it is the one nobody else in the category can make honestly.',
    stats: [
      // rkade-crm/docs/STATE.md: "LIVE at https://crm.rkade.co running PHASE 8,
      // deployed 18-08-2026".
      { value: 8, label: 'phases shipped' },
    ],
    stack: 'Live at crm.rkade.co. Mobile first.',
    images: [
      {
        role: 'build',
        // Cropped to the KPI header strip only. The full board's deal cards
        // carry invented company and contact names for the capture, but
        // this exact project already had one real client name slip into an
        // earlier screenshot (see docs/history/image-generation.md), so the
        // crop drops every deal card rather than trust a second read of
        // names that look like seed data. See
        // scripts/generate-work-image-crops.mjs.
        src: '/work/rkade-crm-pipeline-card.webp',
        alt: "RKade's own CRM Pipeline screen, pipeline value, annual value, deals with a proposal sent, and this month's agreed and closed revenue, each shown in AED and USD.",
        width: 1360,
        height: 320,
      },
      {
        role: 'gallery',
        caption: 'Sign in',
        src: '/work/rkade-crm-login.webp',
        alt: 'RKade’s own CRM sign in screen, an email and password form on a cream background with a gold Sign in button, the same login every project in this list runs behind.',
        width: 1280,
        height: 900,
      },
    ],
  },
]

export const bySlug = (slug) => work.find((w) => w.slug === slug)
export const slugs = work.map((w) => w.slug)

/** The image shown on the /work index row and paired with "what we built"
 * on the detail page: the strongest real screenshot if one exists, else the
 * mood image, else nothing. */
export const primaryImage = (item) =>
  item.images.find((i) => i.role === 'build') ?? item.images.find((i) => i.role === 'problem') ?? null

export const imageByRole = (item, role) => item.images.find((i) => i.role === role) ?? null
export const galleryImages = (item) => item.images.filter((i) => i.role === 'gallery')

export default work
