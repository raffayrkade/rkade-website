import React from 'react';
import { ScanSearch, Hammer, Infinity as InfinityIcon, Check } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/home/CTASection';

const tiers = [
  {
    tag: 'Tier 1',
    name: 'Audit',
    icon: ScanSearch,
    text: 'A focused assessment of where automation would save the most time and money across your business.',
    deliverables: [
      'Workflow mapping across your core operations',
      'Prioritized list of automation opportunities',
      'Estimated time saved per opportunity',
      'A concrete, ranked action report',
    ],
  },
  {
    tag: 'Tier 2',
    name: 'Build',
    icon: Hammer,
    text: 'Custom AI and automation systems built and shipped for your specific workflow.',
    deliverables: [
      'Systems designed around how you operate',
      'Outreach engines, data pipelines, internal tools',
      'Integrated with the tools you already use',
      'Tested, documented, and handed over',
    ],
  },
  {
    tag: 'Tier 3',
    name: 'Managed',
    icon: InfinityIcon,
    text: 'Ongoing management, monitoring, and iteration so your systems keep working and improving.',
    deliverables: [
      'Continuous monitoring and uptime checks',
      'Iterative improvements as you scale',
      'New automations added over time',
      'You never touch the technical side',
    ],
  },
];

const faqs = [
  { q: 'Do I have to start with the Audit?', a: "It's the fastest way to know what to automate first, but if you already know what you want built, we can start there." },
  { q: 'How long does a build take?', a: 'It depends on scope. Most first systems ship in weeks, not months. The audit gives you a clear timeline before anything is committed.' },
  { q: 'Which tools do you work with?', a: 'We build around your existing stack rather than forcing a new one. If it has an API or an interface, we can usually automate it.' },
  { q: 'What happens after a system is built?', a: 'You can run it yourself, or move to Managed and let us monitor and improve it so it keeps earning its keep.' },
  { q: 'Is this a fit for a small team?', a: "Yes. Smaller teams often get the most out of automation. It's the difference between hiring and simply getting more done." },
];

export default function Services() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Map it. Build it. Keep it running."
        description="Three tiers that stack into one system. Take what you need, or the whole path from assessment to fully managed automation."
      />

      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] space-y-px overflow-hidden rounded border border-line-strong bg-line px-0 md:mx-[8vw]">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="grid gap-8 bg-cream p-9 md:grid-cols-3 md:p-12">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-gold/30 bg-gold/10">
                    <t.icon className="h-6 w-6 text-gold" />
                  </div>
                  <p className="mt-6 text-label uppercase text-muted">{t.tag}</p>
                  <h2 className="mt-2 font-display text-section text-ink">{t.name}</h2>
                </div>
                <div className="md:col-span-2">
                  <p className="text-body-lg text-ink">{t.text}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {t.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-gold" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line-strong bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
          <Reveal>
            <SectionHeading label="FAQ" title="How engagements work." />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-line-strong bg-line md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="h-full bg-cream p-8">
                  <h3 className="font-display text-card text-ink">{f.q}</h3>
                  <p className="mt-3 text-body text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
