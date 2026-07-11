import React from 'react';
import { Repeat, Clock, Users, TrendingDown } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const problems = [
  {
    icon: Repeat,
    title: 'Repetitive work eats the day',
    text: 'Copy-paste, data entry, follow-ups — hours your team will never get back.',
  },
  {
    icon: Clock,
    title: 'Manual processes slow everything',
    text: 'Every handoff waits on a human. Throughput is capped by attention, not ability.',
  },
  {
    icon: Users,
    title: 'Teams stretched thin',
    text: 'Good people buried in busywork instead of the work that moves the needle.',
  },
  {
    icon: TrendingDown,
    title: 'Growth capped by headcount',
    text: 'Scaling means hiring. Hiring is slow, expensive, and rarely the real bottleneck.',
  },
];

export default function Problem() {
  return (
    <section className="border-t border-white/10 bg-graphite py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-[6vw] md:px-[8vw]">
        <Reveal>
          <SectionHeading
            label="The Problem"
            title="Your team isn't slow. Your process is manual."
            description="Most businesses don't have a talent problem. They have a leverage problem — smart people doing work a system should be doing."
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full bg-graphite p-8 transition-colors hover:bg-graphite-elevated">
                <p.icon className="h-6 w-6 text-cobalt" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cool-gray">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
