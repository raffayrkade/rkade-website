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
    <section className="border-t border-divider bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            label="Industries We Work With"
            title="Different businesses. Same manual work."
            description="Automation isn't vertical-specific. If your team runs repetitive processes, there's leverage to build, wherever you operate."
          />
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <div className="mt-14 border-y border-divider py-8">
          <Marquee durationSeconds={26}>
            {industries.map((ind) => (
              <div key={ind.label} className="flex flex-none items-center gap-3 px-8">
                <ind.icon className="h-5 w-5 flex-none text-gold" />
                <span className="whitespace-nowrap font-heading text-lg font-medium text-ink">
                  {ind.label}
                </span>
                <span className="ml-8 h-1.5 w-1.5 flex-none rounded-full bg-divider" />
              </div>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
