import React from 'react';
import { Terminal, Handshake } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/home/CTASection';

const VAULT_IMG = 'https://media.base44.com/images/public/6a51e4127f3378ab46439447/3a092b520_generated_7262eee4.png';

const founders = [
  {
    icon: Terminal,
    role: 'The Builder',
    text: 'Hands-on automation experience — the one who actually designs and ships the systems. Lives in the tools, the APIs, and the edge cases, and has built working automation before selling it to anyone.',
  },
  {
    icon: Handshake,
    role: 'The Operator',
    text: 'Deal and operations experience — the one who understands how businesses run, where the money leaks, and how to turn a messy process into something worth automating. Translates business problems into systems.',
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        label="About"
        title="Operators building for operators."
        description="RKADE is built by two founders with complementary backgrounds — one who builds the systems, one who understands the business they serve."
      />

      <section className="bg-graphite py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.role} delay={i * 0.1}>
                <div className="h-full bg-graphite p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cobalt/30 bg-cobalt/5">
                    <f.icon className="h-6 w-6 text-cobalt" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-white">{f.role}</h3>
                  <p className="mt-4 text-base leading-relaxed text-cool-gray">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite py-24 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-[6vw] md:grid-cols-2 md:px-[8vw]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src={VAULT_IMG} alt="Abstract vaulted ceiling with repeating arches" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading label="The Name" title="Why RKADE." />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-cool-gray">
                <p>
                  RKADE comes from <span className="text-white">arcade</span> — and arcade comes
                  from the Latin for <span className="text-white">arch</span>: a structure that
                  holds up a passageway.
                </p>
                <p>
                  That's how we see automation. Not a gimmick bolted on top, but structural
                  infrastructure — the arches that carry the weight of your business so your team
                  can move through it faster.
                </p>
                <p className="border-l-2 border-cobalt pl-5 text-white">
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
