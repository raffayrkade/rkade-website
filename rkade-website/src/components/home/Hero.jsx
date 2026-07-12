import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK, CALENDAR_LINK } from '@/components/common/CTAButtons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-[72px]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-[6vw] py-20 md:grid-cols-2 md:px-[8vw] md:py-28 lg:py-32">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-divider bg-ink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-warmgrey">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            AI Automation Consultancy
          </span>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            We build AI systems that do the work of{' '}
            <span className="text-gold">extra employees.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-warmgrey">
            Custom automations that make your team faster, cut the manual work, and let you get
            more done with fewer people. Free up time and headcount — put it toward what actually
            grows the business.
          </p>
          <div className="mt-9 flex flex-col flex-wrap justify-start gap-3 sm:flex-row">
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-gold px-6 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Free Audit
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-divider bg-ink/5 px-6 text-sm font-medium text-ink transition-colors hover:border-gold/60 hover:bg-ink/5"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-divider px-6 text-sm font-medium text-ink/80 transition-colors hover:text-ink hover:border-offcream"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-divider">
            <img
              src="https://media.base44.com/images/public/6a51e4127f3378ab46439447/34c8df738_generated_97089f11.png"
              alt="Structural arch of matte steel and glowing blue fibers"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
