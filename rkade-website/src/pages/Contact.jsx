import React from 'react';
import { MessageCircle, Calendar, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { WHATSAPP_LINK, CALENDAR_LINK, CONTACT_EMAIL } from '@/components/common/CTAButtons';

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's find your leverage."
        description="Three ways to reach us. Pick whichever is fastest — we respond like operators, not a support queue."
      />

      <section className="bg-graphite py-24 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-[6vw] md:grid-cols-2 md:px-[8vw] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Send a message</h2>
              <p className="mt-2 text-sm text-cool-gray">
                Tell us where the manual work is piling up. We'll come back with where to start.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-white/10 bg-graphite-elevated p-7 transition-colors hover:border-cobalt/50"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-cobalt">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="flex items-center gap-1 font-heading text-lg font-semibold text-white">
                    Chat on WhatsApp <ArrowUpRight className="h-4 w-4 text-cobalt transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-1 text-sm text-cool-gray">Fastest route. Message us directly and get a real answer.</p>
                  <p className="mt-2 text-xs text-cool-gray">Typical reply time: under an hour during business hours.</p>
                </div>
              </a>

              <a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-white/10 bg-graphite-elevated p-7 transition-colors hover:border-cobalt/50"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md border border-cobalt/40 bg-cobalt/5">
                  <Calendar className="h-5 w-5 text-cobalt" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">Book a Free Audit</h3>
                  <p className="mt-1 text-sm text-cool-gray">Grab a slot and we'll map where automation pays off for you.</p>
                  <p className="mt-2 text-xs text-cool-gray">Pick a time that works for you — 30 minutes, no pitch.</p>
                </div>
              </a>

              <div className="rounded-xl border border-white/10 p-7">
                <h3 className="font-heading text-lg font-semibold text-white">Prefer email?</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-sm text-cobalt hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
