import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { WHATSAPP_LINK, CALENDAR_LINK, CONTACT_EMAIL } from '@/components/common/CTAButtons';

function Wordmark({ size = 'text-2xl' }) {
  return (
    <span className={`font-heading tracking-tight leading-none ${size}`}>
      <span className="font-bold text-white">RK</span>
      <span className="font-light text-white/60">ade</span>
    </span>
  );
}

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/#how-it-works' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-graphite text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite/70 backdrop-blur-xl transition-all duration-300">
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-[6vw] md:px-[8vw]">
          <Link to="/" className="flex items-center">
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center rounded-md bg-cobalt px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Book a Free Audit
            </Link>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center text-white md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-graphite px-[6vw] py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm font-medium text-white/70"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-cobalt px-5 text-sm font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Book a Free Audit
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="relative border-t border-white/10 bg-graphite">
        <svg
          className="pointer-events-none absolute -top-px left-1/2 h-16 w-[520px] max-w-full -translate-x-1/2"
          viewBox="0 0 400 200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 200 L0 120 Q0 0 200 0 Q400 0 400 120 L400 200"
            stroke="#1E5EFF"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mx-auto max-w-[1400px] px-[6vw] py-16 md:px-[8vw]">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Wordmark size="text-3xl" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cool-gray">
                AI automation systems that do the work of extra employees. We build the
                infrastructure, so your team ships more with less.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link className="text-cool-gray hover:text-white transition-colors" to="/services">Services</Link></li>
                <li><Link className="text-cool-gray hover:text-white transition-colors" to="/about">About</Link></li>
                <li><Link className="text-cool-gray hover:text-white transition-colors" to="/contact">Contact</Link></li>
                <li><Link className="text-cool-gray hover:text-white transition-colors" to="/#how-it-works">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Get in touch
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-cool-gray hover:text-white transition-colors">
                    <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-cool-gray hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-cobalt/60 hover:text-white" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-cobalt/60 hover:text-white" aria-label="X / Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-cobalt/60 hover:text-white" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cool-gray sm:flex-row">
            <p>© 2026 RKADE. All rights reserved.</p>
            <p>Systems, not hype.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
