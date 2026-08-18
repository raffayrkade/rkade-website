import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Boxes, ChartLine } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import Parallax from '@/components/common/Parallax';

const points = [
  {
    icon: Wrench,
    title: 'Operators, not talkers',
    text: 'We build working systems, not slide decks about them. Everything we recommend, we can build.',
  },
  {
    icon: Boxes,
    title: 'Built for your workflow',
    text: 'No off-the-shelf template. We design around how your business actually runs, then automate it.',
  },
  {
    icon: ChartLine,
    title: 'Measured by output',
    text: "Success is fewer manual hours and more done. If it doesn't move that number, we don't build it.",
  },
];

export default function WhyRkade() {
  return (
    <section className="border-t border-line-strong bg-cream py-28 md:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-[6vw] md:grid-cols-2 md:px-[8vw]">
        <Reveal>
          <Parallax speed={0.12} className="overflow-hidden rounded border border-line-strong">
            <img
              src="https://media.base44.com/images/public/6a51e4127f3378ab46439447/15dc1ba51_generated_345bc685.png"
              alt="Abstract data nodes connecting in a grid"
              className="h-full w-full object-cover"
            />
          </Parallax>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading
              label="Why RKade"
              title="We build the system. You close the clients."
              description="We're not AI consultants who talk about automation. We're operators who have built it, and we approach every engagement the same way: understand the work, then build the system that does it."
            />
          </Reveal>
          <div className="mt-10 space-y-6">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded border border-gold/30 bg-gold/10">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-base font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-body text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex min-h-[44px] items-center justify-center rounded border border-line-strong px-6 text-sm font-medium text-ink/80 transition-colors hover:text-ink hover:border-gold-dark"
              >
                Meet the founders
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
