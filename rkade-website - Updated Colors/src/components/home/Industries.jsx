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
            description="Automation isn't vertical-specific. If your team runs repetitive processes, there's leverage to build — wherever you operate."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-divider bg-divider sm:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.label} delay={i * 0.03}>
              <div className="flex h-full items-center gap-4 bg-cream p-7 transition-colors hover:bg-cream-elevated">
                <ind.icon className="h-6 w-6 flex-none text-gold" />
                <span className="font-heading text-base font-medium text-ink">{ind.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
