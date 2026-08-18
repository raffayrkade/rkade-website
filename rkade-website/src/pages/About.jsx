import React from 'react';
import { Terminal, Handshake } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import Parallax from '@/components/common/Parallax';
import CTASection from '@/components/home/CTASection';

const VAULT_IMG = 'https://media.base44.com/images/public/6a51e4127f3378ab46439447/3a092b520_generated_7262eee4.png';

const founders = [
  {
    icon: Terminal,
    role: 'Automation background',
    text: 'Leans into the build side: lives in the tools, the APIs, and the edge cases, and turns a scoped process into a working system.',
  },
  {
    icon: Handshake,
    role: 'Operations background',
    text: 'Background in deals and operations: sourcing and closing acquisitions, standardizing diligence process at a private equity firm. Leans into client conversations and scoping, turning a messy process into something worth automating.',
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        label="About"
        title="Operators building for operators."
        description="RKade is built by two founders with complementary backgrounds: one who builds the systems, one who understands the business they serve."
      />

      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
          <Reveal>
            <p className="mb-10 max-w-2xl text-body-lg text-muted md:mb-12">
              We both build. We both sit with clients. These are where we naturally spend more of
              our time.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded border border-line-strong bg-line md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.role} delay={i * 0.1}>
                <div className="h-full bg-cream p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-gold/30 bg-gold/10">
                    <f.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-6 font-display text-card text-ink">{f.role}</h3>
                  <p className="mt-4 text-body-lg text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line-strong bg-cream py-28 md:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-[6vw] md:grid-cols-2 md:px-[8vw]">
          <Reveal>
            <Parallax speed={0.12} className="overflow-hidden rounded border border-line-strong">
              <img src={VAULT_IMG} alt="Abstract vaulted ceiling with repeating arches" className="h-full w-full object-cover" />
            </Parallax>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading label="The Name" title="Why RKade." />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-body-lg text-muted">
                <p>
                  RKade comes from <span className="text-ink">arcade</span>, and arcade comes
                  from the Latin for <span className="text-ink">arch</span>: a structure that
                  holds up a passageway.
                </p>
                <p>
                  That's how we see automation. Not a gimmick bolted on top, but structural
                  infrastructure: the arches that carry the weight of your business so your team
                  can move through it faster.
                </p>
                <p className="border-l-2 border-gold pl-5 text-ink">
                  Our mission: build the systems that let good businesses grow on output, not
                  headcount.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
