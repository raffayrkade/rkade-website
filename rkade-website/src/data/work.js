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
    image: null,
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
      { value: 9, label: 'rounds of client feedback, all closed' },
    ],
    stack: 'Built and handed over. Awaiting the client’s go-ahead to deploy.',
    image: null,
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
    image: null,
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
      { value: 90048, label: 'order rows across two years' },
    ],
    stack: 'Delivered as a dossier and an ownership brief.',
    image: null,
  },
  {
    slug: 'our-own-crm',
    sector: 'RKade',
    title: 'We run the company on our own work',
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
    image: null,
  },
]

export const bySlug = (slug) => work.find((w) => w.slug === slug)
export const slugs = work.map((w) => w.slug)

export default work
