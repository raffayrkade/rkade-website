import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import { WHATSAPP_LINK, CALENDAR_LINK } from '@/components/common/CTAButtons';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-graphite py-28 md:py-32">
      <svg
        className="pointer-events-none absolute -top-px left-1/2 h-40 w-[900px] max-w-full -translate-x-1/2"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 200 L0 120 Q0 0 200 0 Q400 0 400 120 L400 200"
          stroke="#1E5EFF"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mx-auto max-w-3xl px-[6vw] text-center md:px-[8vw]">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Stop paying people to do what a system can.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cool-gray">
            Start with a free audit. We'll show you exactly where automation pays off — no
            commitment, no fluff.
          </p>
          <div className="mt-9 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-cobalt px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Book a Free Audit
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.02] px-6 text-sm font-medium text-white transition-colors hover:border-cobalt/60 hover:bg-white/[0.04]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/15 px-6 text-sm font-medium text-white/80 transition-colors hover:text-white hover:border-white/40"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
