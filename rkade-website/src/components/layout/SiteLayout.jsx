import React, { useState } from 'react';
import Wordmark from '../brand/Wordmark';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Linkedin, Instagram, Mail } from 'lucide-react';
import { WHATSAPP_LINK, CALENDAR_LINK, CONTACT_EMAIL, INSTAGRAM_LINK, LINKEDIN_LINK } from '@/components/common/CTAButtons';
import ScrollProgress from '@/components/common/ScrollProgress';
import { HeaderToneProvider, useHeaderTone } from './HeaderTone';


const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/#how-it-works' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: INSTAGRAM_LINK, Icon: Instagram },
  { label: 'LinkedIn', href: LINKEDIN_LINK, Icon: Linkedin },
].filter((link) => link.href !== 'PLACEHOLDER');

export default function SiteLayout() {
  // The provider has to sit above both the header and the page, because a page
  // cannot hand context upward to its own parent.
  return (
    <HeaderToneProvider>
      <SiteChrome />
    </HeaderToneProvider>
  );
}

function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useHeaderTone();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          menuOpen ? 'border-line-strong bg-cream' : header.surface
        }`}
      >
        <ScrollProgress />
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-[6vw] md:px-[8vw]">
          <Link to="/" className="flex items-center">
            <Wordmark tone={menuOpen ? 'light' : header.wordmark} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className={`text-sm font-medium transition-colors ${menuOpen ? 'text-muted hover:text-ink' : header.link}`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded bg-gold px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Free Audit
            </a>
          </div>

          <button
            className={`flex h-11 w-11 items-center justify-center md:hidden ${menuOpen ? 'text-ink' : header.icon}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-line-strong bg-cream px-[6vw] py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm font-medium text-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded bg-gold px-5 text-sm font-medium text-ink"
                onClick={() => setMenuOpen(false)}
              >
                Free Audit
              </a>
            </div>
          </div>
        )}
      </header>

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
              <Wordmark size="text-3xl" />
              <p className="mt-4 max-w-sm text-body text-muted">
                AI automation systems that do the work of extra employees. We build the
                infrastructure, so your team ships more with less.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-label uppercase text-muted">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link className="text-muted hover:text-ink transition-colors" to="/services">Services</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/about">About</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/contact">Contact</Link></li>
                <li><Link className="text-muted hover:text-ink transition-colors" to="/#how-it-works">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-label uppercase text-muted">
                Get in touch
              </h4>
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
          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line-strong pt-6 text-xs text-muted sm:flex-row">
            <p>© 2026 RKade. All rights reserved.</p>
            <p>Systems, not hype.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
