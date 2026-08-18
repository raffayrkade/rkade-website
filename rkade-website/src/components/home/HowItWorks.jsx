import React from 'react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const steps = [
  { n: '01', title: 'Discovery', text: 'We map your workflows and find where automation pays off fastest.' },
  { n: '02', title: 'Design', text: "We architect the system's inputs, logic, and outputs around your reality." },
  { n: '03', title: 'Build', text: 'We build and ship it, integrated into the tools you already use.' },
  { n: '04', title: 'Manage', text: 'We monitor, maintain, and improve it so it keeps earning its keep.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line-strong bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            align="center"
            label="How It Works"
            title="A straight line from problem to system."
          />
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block"></div>
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-gold/40 bg-cream font-body text-button text-ink">
                    {s.n}
                  </div>
                  <h3 className="mt-6 font-display text-card text-ink">{s.title}</h3>
                  <p className="mt-3 text-body text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
