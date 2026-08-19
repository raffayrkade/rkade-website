import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
import Logo from '../brand/Logo';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Linkedin, Instagram, Mail } from 'lucide-react';
import { WHATSAPP_LINK, CONTACT_EMAIL, INSTAGRAM_LINK, LINKEDIN_LINK } from '@/components/common/CTAButtons';
import ScrollProgress from '@/components/common/ScrollProgress';
import MobileMenu from './MobileMenu';
import { useHeaderTone } from './HeaderTone';
import { organizationJsonLd } from '@/lib/seo';
import FreeAuditLink from '@/components/common/FreeAuditLink'

// Rendered once, sitewide (every route except the catch-all 404 goes through
// this layout), so Google only ever sees one Organization entity for RKade
// rather than a page repeating it with slightly different data every time.
const ORGANIZATION_JSON_LD = organizationJsonLd({
  instagram: INSTAGRAM_LINK,
  linkedin: LINKEDIN_LINK,
});

// Work, Services, About, Contact, then the Free Audit button. "Process" used
// to sit between About and Contact, linking to the homepage's How It Works
// section; dropped so the primary nav matches the settled order exactly.
const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: INSTAGRAM_LINK, Icon: Instagram },
  { label: 'LinkedIn', href: LINKEDIN_LINK, Icon: Linkedin },
].filter((link) => link.href !== 'PLACEHOLDER');

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useHeaderTone();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Head>
        <script type="application/ld+json" data-seo="organization">
          {JSON.stringify(ORGANIZATION_JSON_LD)}
        </script>
      </Head>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 motion-reduce:transition-none ${header.surface}`}
      >
        <ScrollProgress />
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-[6vw] md:px-[8vw]">
          <Link to="/" className="flex items-center">
            <Logo tone={header.wordmark} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className={`text-sm font-medium transition-colors ${header.link}`}
              >
                {l.label}
              </Link>
            ))}
            <FreeAuditLink
        className="inline-flex min-h-[44px] items-center rounded bg-gold px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      >
              Free Audit
            </FreeAuditLink>
          </div>

          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center md:hidden ${header.icon}`}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />

      <main>
        <Outlet />
      </main>

      <footer className="relative border-t border-line-strong bg-cream">
        <svg
          className="pointer-events-none absolute -top-px left-1/2 h-16 w-[520px] max-w-full -translate-x-1/2"
          viewBox="0 0 400 200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 200 L0 120 Q0 0 200 0 Q400 0 400 120 L400 200"
            className="stroke-gold"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mx-auto max-w-[1400px] px-[6vw] py-16 md:px-[8vw]">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo size="text-3xl" />
              <p className="mt-3 text-label uppercase text-muted">
                AI Consultants, Dubai, UAE
              </p>
              <p className="mt-4 max-w-sm text-body text-muted">
                Custom AI systems for growing businesses. We build the infrastructure, so your
                team ships more with less friction.
              </p>
            </div>
            <div>
              {/* h2, not h4: the footer sits after whatever heading level a
                  given page happened to end on (an h2 CTA, an h3 card, a
                  dt/dd stat), and h4 skipped a level on every page that
                  didn't end in exactly h3. A heading never skips a level
                  going *up*, but stepping back down to h2 is always valid,
                  regardless of what came before it. */}
              <h2 className="mb-4 text-label uppercase text-muted">
                Company
              </h2>
              <ul className="space-y-3 text-sm">
                <li><Link className="text-muted hover:text-ink transition-colors" to="/work">Work</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/services">Services</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/about">About</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/contact">Contact</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/#how-it-works">How It Works</Link></li>
              </ul>
            </div>
            <div>
              {/* h2, not h4: the footer sits after whatever heading level a
                  given page happened to end on (an h2 CTA, an h3 card, a
                  dt/dd stat), and h4 skipped a level on every page that
                  didn't end in exactly h3. A heading never skips a level
                  going *up*, but stepping back down to h2 is always valid,
                  regardless of what came before it. */}
              <h2 className="mb-4 text-label uppercase text-muted">
                Get in touch
              </h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors">
                    <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                    WhatsApp
                  </a>
                </li>
              </ul>
              {socialLinks.length > 0 && (
                <div className="mt-5 flex gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded border border-line-strong text-muted transition-colors hover:border-gold/60 hover:text-ink"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line-strong pt-6 text-xs text-muted sm:flex-row">
            <p>© 2026 RKade. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link className="transition-colors hover:text-ink" to="/privacy">Privacy</Link>
              <Link className="transition-colors hover:text-ink" to="/terms">Terms</Link>
              <p>Systems, not hype.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
