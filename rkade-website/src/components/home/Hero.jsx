import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { CALENDAR_LINK } from '@/components/common/CTAButtons';
import HeroArt from '@/components/home/HeroArt';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-[72px]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-[6vw] py-20 md:grid-cols-2 md:px-[8vw] md:py-36 lg:py-32">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded border border-line-strong bg-ink/5 px-4 py-1.5 text-label uppercase text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            AI Automation Consultancy
          </span>
          <h1 className="font-display text-hero text-ink">
            We build AI systems that do the work of{' '}
            <span className="italic">extra employees.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-muted">
            Custom automations that make your team faster, cut the manual work, and let you get
            more done with fewer people. Free up time and headcount. Put it toward what actually
            grows the business.
          </p>
          <div className="mt-9 flex flex-col flex-wrap justify-start gap-3 sm:flex-row">
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded bg-gold px-6 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Free Audit
            </a>
            <Link
              to="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-line-strong px-6 text-sm font-medium text-ink/80 transition-colors hover:text-ink hover:border-gold-dark"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
