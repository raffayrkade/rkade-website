import React from 'react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const steps = [
  { n: '01', title: 'Discover', text: 'We map your workflows and find where automation pays off fastest.' },
  { n: '02', title: 'Design', text: 'We architect the system — inputs, logic, outputs — around your reality.' },
  { n: '03', title: 'Build', text: 'We build and ship it, integrated into the tools you already use.' },
  { n: '04', title: 'Manage', text: 'We monitor, maintain, and improve it so it keeps earning its keep.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-divider bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            align="center"
            label="How It Works"
            title="A straight line from problem to system."
          />
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-divider md:block"></div>
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cream font-heading text-sm font-bold text-gold">
                    {s.n}
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-warmgrey">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
