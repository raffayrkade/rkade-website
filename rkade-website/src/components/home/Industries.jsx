import React from 'react';
import {
  ShoppingCart,
  Briefcase,
  HeartPulse,
  Hotel,
  Building2,
  Boxes,
} from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import Marquee from '@/components/common/Marquee';

const industries = [
  { icon: ShoppingCart, label: 'Ecommerce' },
  { icon: Briefcase, label: 'Professional Services' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Hotel, label: 'Hospitality' },
  { icon: Building2, label: 'Real Estate' },
  { icon: Boxes, label: 'Operations & Logistics' },
];

export default function Industries() {
  return (
    <section className="border-t border-line-strong bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            label="Industries We Work With"
            title="Different businesses. Same manual work."
            description="Automation isn't vertical-specific. If your team runs repetitive processes, there's a system to build, wherever you operate."
          />
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <div className="mt-14 border-y border-line-strong py-8">
          <Marquee durationSeconds={26}>
            {industries.map((ind) => (
              <div key={ind.label} className="flex flex-none items-center gap-3 px-8">
                <ind.icon className="h-5 w-5 flex-none text-gold" />
                <span className="whitespace-nowrap font-display text-card text-ink">
                  {ind.label}
                </span>
                <span className="ml-8 h-1.5 w-1.5 flex-none rounded-full bg-line" />
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
