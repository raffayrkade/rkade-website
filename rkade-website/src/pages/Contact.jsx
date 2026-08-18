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
        title="Let's find what to automate first."
        description="Three ways to reach us. Pick whichever is fastest. We respond like operators, not a support queue."
      />

      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-[6vw] md:grid-cols-2 md:px-[8vw] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="font-display text-section text-ink">Send a message</h2>
              <p className="mt-2 text-sm text-muted">
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
                className="group flex items-start gap-4 rounded border border-line-strong bg-cream-raised p-7 transition-colors hover:border-gold/50"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded bg-gold">
                  <MessageCircle className="h-5 w-5 text-ink" />
                </div>
                <div>
                  <h3 className="flex items-center gap-1 font-display text-card text-ink">
                    Chat on WhatsApp <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-1 text-sm text-muted">Fastest route. Message us directly and get a real answer.</p>
                  <p className="mt-2 text-xs text-muted">Typical reply time: under an hour during business hours.</p>
                </div>
              </a>

              <a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded border border-line-strong bg-cream-raised p-7 transition-colors hover:border-gold/50"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded border border-gold/40 bg-gold/10">
                  <Calendar className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-card text-ink">Free Audit</h3>
                  <p className="mt-1 text-sm text-muted">Grab a slot and we'll map where automation pays off for you.</p>
                  <p className="mt-2 text-xs text-muted">Pick a time that works for you: 30 minutes, no pitch.</p>
                </div>
              </a>

              <div className="rounded border border-line-strong p-7">
                <h3 className="font-display text-card text-ink">Prefer email?</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-button text-ink underline decoration-gold-dark underline-offset-4 hover:decoration-ink">
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
