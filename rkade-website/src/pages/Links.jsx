import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, Monitor, Mail, Globe, ChevronRight } from 'lucide-react';
import ArchMark from '@/components/brand/ArchMark';
import Wordmark from '@/components/brand/Wordmark';
import Seo from '@/components/common/Seo';
import FreeAuditLink from '@/components/common/FreeAuditLink';
import {
  WHATSAPP_CARD,
  DEMO_LINK,
  CONTACT_EMAIL,
} from '@/components/common/CTAButtons';

/**
 * /links: the destination of the QR code printed on both business cards.
 *
 * The QR is permanent ink on paper, so the ONE thing that can never change is
 * the URL https://rkade.co/links. Everything on this page can. That is the
 * whole design: the card commits to an address, not to content.
 *
 * Sits outside SiteLayout on purpose, like the 404 page: every visit is a
 * phone that just scanned a card, and the person wants five thumb-sized
 * choices, not the site's header and footer around them.
 *
 * The demo button renders only once DEMO_LINK in CTAButtons.jsx stops being
 * PLACEHOLDER, and it must only ever point at a fake-data instance, never a
 * live client system. Social buttons are deliberately absent until the
 * accounts are actually posting: an empty profile behind a business card
 * reads worse than no link at all.
 */

const rowClass =
  'group flex w-full min-h-[64px] items-center gap-4 rounded border border-cream/15 ' +
  'bg-cream/5 px-5 py-4 text-left transition-colors hover:border-gold/50 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

function RowBody({ icon: Icon, title, sub, solid = false }) {
  return (
    <>
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center rounded ${
          solid ? 'bg-gold' : 'border border-gold/40 bg-gold/10'
        }`}
      >
        <Icon className={`h-5 w-5 ${solid ? 'text-ink' : 'text-gold'}`} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-cream">{title}</span>
        <span className="mt-0.5 text-xs text-muted-on-ink">{sub}</span>
      </span>
      <ChevronRight className="ml-auto h-4 w-4 flex-none text-muted-on-ink transition-transform group-hover:translate-x-0.5" />
    </>
  );
}

export default function Links() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center bg-ink-deep px-6 pb-12 pt-16 text-cream">
      <Seo
        title="Links"
        description="Custom AI systems for growing businesses in Dubai. WhatsApp us, book a free audit, or see what we build."
        path="/links"
        noindex
      />

      <div className="w-full max-w-sm">
        <header className="text-center">
          <ArchMark className="mx-auto h-14 w-auto text-gold" />
          <h1 className="mt-5">
            <Wordmark tone="dark" size="text-4xl" />
          </h1>
          <p className="mt-3 text-label uppercase text-muted-on-ink">AI Consultants</p>
          <p className="mx-auto mt-5 max-w-xs text-body text-muted-on-ink">
            Custom AI systems for growing businesses in Dubai. Built around how
            you already work.
          </p>
        </header>

        <nav aria-label="RKade links" className="mt-10 flex flex-col gap-3">
          {DEMO_LINK !== 'PLACEHOLDER' && (
            <a href={DEMO_LINK} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <RowBody icon={Monitor} title="See the system" sub="A live CRM, running on fake data" solid />
            </a>
          )}

          <a href={WHATSAPP_CARD} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <RowBody icon={MessageCircle} title="Message the team" sub="WhatsApp, the fastest way to reach us" />
          </a>

          <FreeAuditLink className={rowClass}>
            <RowBody icon={Calendar} title="Free Audit" sub="30 minutes, no pitch" />
          </FreeAuditLink>

          <Link to="/" className={rowClass}>
            <RowBody icon={Globe} title="The website" sub="What we build, and who for" />
          </Link>

          <a href={`mailto:${CONTACT_EMAIL}`} className={rowClass}>
            <RowBody icon={Mail} title="Email" sub={CONTACT_EMAIL} />
          </a>
        </nav>

        <footer className="mt-12 text-center">
          {/* The hallmark row from the back of the business card: maker's
              mark, 999 purity, DXB assay office. The person holding the card
              sees the same three stamps here, which is what makes the paper
              and the page read as one thing. Decorative, so hidden from
              screen readers, but still full-strength muted-on-ink because
              visible text has no contrast exemption, see docs/GOTCHAS.md. */}
          <svg
            viewBox="0 0 132 34"
            aria-hidden="true"
            className="mx-auto h-8 w-auto text-muted-on-ink"
          >
            <g fill="none" stroke="currentColor">
              <rect x="1" y="1" width="38" height="32" rx="15" strokeWidth="1.1" />
              <path d="M12 25 L12 16 Q12 9 20 9 Q28 9 28 16 L28 25" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M17 25 L17 18 Q17 14 20 14 Q23 14 23 18 L23 25" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="47" y="1" width="38" height="32" rx="15" strokeWidth="1.1" />
              <rect x="93" y="1" width="38" height="32" rx="15" strokeWidth="1.1" />
            </g>
            <text
              x="66"
              y="22.5"
              textAnchor="middle"
              fill="currentColor"
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.6px' }}
            >
              999
            </text>
            <text
              x="112"
              y="22.5"
              textAnchor="middle"
              fill="currentColor"
              style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.9px' }}
            >
              DXB
            </text>
          </svg>
          <p className="mt-4 text-label uppercase text-muted-on-ink">Dubai, UAE</p>
        </footer>
      </div>
    </main>
  );
}
