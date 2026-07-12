import React from 'react';
import { Link } from 'react-router-dom';
import { ScanSearch, Hammer, Infinity as InfinityIcon } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const tiers = [
  {
    icon: ScanSearch,
    tag: 'Tier 1',
    name: 'Audit',
    text: 'A focused assessment of where automation saves the most time and money — delivered as a concrete report with prioritized recommendations you can act on immediately.',
  },
  {
    icon: Hammer,
    tag: 'Tier 2',
    name: 'Build',
    text: 'Custom AI and automation systems built and shipped for your specific workflow — outreach engines, data pipelines, internal tools. Designed around how you actually operate.',
  },
  {
    icon: InfinityIcon,
    tag: 'Tier 3',
    name: 'Managed',
    text: 'Ongoing management, monitoring, and iteration of the systems we build — so they keep working, keep improving, and you never have to touch the technical side.',
  },
];

export default function ServiceTiers() {
  return (
    <section id="services" className="border-t border-divider bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            label="What We Do"
            title="Three tiers. One progression."
            description="Start with a map. Build the systems. Keep them running. Take what you need — or the whole path."
          />
        </Reveal>
        <div className="mt-4">
          <Link to="/services" className="text-sm font-medium text-gold hover:underline">
            Full services breakdown →
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-divider bg-divider md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden bg-cream p-9 transition-colors hover:bg-cream-elevated">
                <div className="flex items-center justify-between">
                  <t.icon className="h-7 w-7 text-gold" />
                  <span className="font-heading text-4xl font-bold text-ink/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-gold">{t.tag}</p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{t.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-warmgrey">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
