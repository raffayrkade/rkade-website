import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import Section from '@/components/layout/Section';
import ContactForm from '@/components/contact/ContactForm';
import ContactRoutes from '@/components/contact/ContactRoutes';
import BookingOverlay from '@/components/contact/BookingOverlay';
import Seo from '@/components/common/Seo';

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Seo
        title="Contact RKade: Book a Free Automation Audit"
        description="Tell us where the manual work is piling up. Send a message, book a call, or use the form, and we'll come back with where to start."
        path="/contact"
      />
      <PageHeader
        label="Contact"
        title="Let's find what to automate first."
        description="Three ways to reach us. Pick whichever is fastest. We respond like operators, not a support queue."
      />

      <Section tone="ink" padding="loose">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="text-label uppercase text-muted-on-ink">Send a message</p>
              <h2 className="mt-3 font-display text-section text-cream">
                Tell us where it's <em className="italic text-gold">manual.</em>
              </h2>
              <p className="mt-4 max-w-md text-body text-muted-on-ink">
                Tell us where the manual work is piling up. We'll come back with where to start.
              </p>
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-label uppercase text-muted-on-ink">Or reach us directly</p>
              <div className="mt-6">
                <ContactRoutes onOpenBooking={() => setBookingOpen(true)} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream" padding="default">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-label uppercase text-muted">Book directly</p>
            <h2 className="mt-4 font-display text-section text-ink">Skip the back and forth.</h2>
            <p className="mt-4 text-body-lg text-muted">
              Pick a slot yourself. Thirty minutes on our calendar, no pitch, and you walk away
              knowing exactly where to start.
            </p>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="mt-8 inline-flex min-h-[52px] items-center rounded bg-gold px-8 text-button uppercase text-ink transition-transform duration-300 ease-passage hover:-translate-y-0.5"
            >
              Free Audit
            </button>
          </div>
        </Reveal>
      </Section>

      <BookingOverlay open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
