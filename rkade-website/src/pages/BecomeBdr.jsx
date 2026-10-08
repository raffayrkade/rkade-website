import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import Section from '@/components/layout/Section';
import Seo from '@/components/common/Seo';
import ApplyForm from '@/components/bdr/ApplyForm';
import { WHATSAPP_LINK } from '@/components/common/CTAButtons';

// Copy note: the BDR deck (claude.ai artifact) could not be read when this
// page was written, so the copy below is written from the brief. Check it
// against the deck. See docs/BLOCKED.md.

const STEPS = [
  {
    title: 'Find',
    body: 'You look for owner-run businesses in Dubai that lose hours every week to work a computer could do.',
  },
  {
    title: 'Reach out',
    body: 'You message or call the owner, usually on WhatsApp. A short, friendly conversation, in your own words.',
  },
  {
    title: 'Qualify',
    body: 'You find out whether the owner has a real problem and is the person who decides.',
  },
  {
    title: 'Hand over',
    body: 'You pass the conversation to the RKade founders. They take it from there.',
  },
];

const FITS = [
  'You are comfortable starting a conversation with a business owner.',
  'You write and speak clearly, in English and ideally another language Dubai business owners use.',
  'You follow through. When you say you will message someone back, you do.',
  'You are curious about how businesses run. You do not need to know anything about AI.',
  'You are a student, you have a job, or you are between things. The role fits around your life.',
];

export default function BecomeBdr() {
  return (
    <>
      <Seo
        title="Become a Business Development Representative"
        description="Apply to become a Business Development Representative (BDR) at RKade. Introduce owner-run Dubai businesses to the founders and earn commission, paid when the client has paid in full."
        path="/become-a-bdr"
      />
      <PageHeader
        label="Join RKade"
        title="Become a Business Development Representative"
        description="RKade builds AI systems for owner-run businesses in Dubai. We are looking for people who can open the right conversations, and you earn commission when one turns into a client."
      />

      <Section tone="ink" padding="loose">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="text-label uppercase text-muted-on-ink">The role</p>
              <h2 className="mt-3 font-display text-section text-cream">
                You open the door. <em className="italic text-gold">We close the deal.</em>
              </h2>
              <p className="mt-5 max-w-md text-body text-muted-on-ink">
                A Business Development Representative, or BDR, is an outside representative of
                RKade. You never have to negotiate, quote or explain the technical side. Only the
                RKade founders close deals.
              </p>
              <p className="mt-4 max-w-md text-body text-muted-on-ink">
                You earn commission, paid when the client has paid in full.
              </p>
            </div>
          </Reveal>

          <ol className="grid gap-px bg-cream/15 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.06} className="bg-ink p-7">
                <p className="text-label uppercase text-gold">Step {i + 1}</p>
                <h3 className="mt-3 font-display text-card text-cream">{step.title}</h3>
                <p className="mt-3 text-body text-muted-on-ink">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="cream" padding="loose">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="text-label uppercase text-muted">Who it suits</p>
              <h2 className="mt-3 font-display text-section text-ink">
                People who like <em className="italic">talking to people.</em>
              </h2>
              <ul className="mt-7 space-y-4">
                {FITS.map((line) => (
                  <li key={line} className="flex gap-3 text-body text-muted">
                    <span className="mt-3 h-px w-5 flex-none bg-gold-dark" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-label uppercase text-muted">After you apply</p>
              <h2 className="mt-3 font-display text-section text-ink">
                A real person <em className="italic">reads it.</em>
              </h2>
              <p className="mt-5 max-w-md text-body-lg text-muted">
                The RKade team reads every application. We reply to each one personally, whether
                or not it is a fit right now. We do not send automatic emails, so check your
                WhatsApp as well as your inbox.
              </p>
              <p className="mt-4 max-w-md text-body text-muted">
                If it looks like a good match, we will talk, explain how the role works day to day
                and answer your questions.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" padding="loose" id="apply">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div>
              <p className="text-label uppercase text-muted-on-ink">Apply</p>
              <h2 className="mt-3 font-display text-section text-cream">
                Tell us about <em className="italic text-gold">you.</em>
              </h2>
              <p className="mt-4 max-w-md text-body text-muted-on-ink">
                It takes a few minutes. Only your name, email, WhatsApp number, location,
                languages and a few words about why you want to join are needed.
              </p>
            </div>
          </Reveal>
          {/* Outside Reveal on purpose: Reveal swaps its wrapper element when
              its entrance ends, which remounts the children and would wipe
              anything typed before then. */}
          <div className="mt-9">
            <ApplyForm />
          </div>
        </div>
      </Section>

      <Section tone="cream" padding="tight">
        <Reveal>
          <p className="mx-auto max-w-xl text-center text-body text-muted">
            Questions before you apply? Message us on{' '}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 text-ink underline decoration-gold-dark underline-offset-4 hover:decoration-ink"
            >
              WhatsApp
            </a>
            . A real person answers.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
