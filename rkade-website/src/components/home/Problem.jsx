import Section from '@/components/layout/Section'
import Reveal from '@/components/common/Reveal'
import RuleSweep from '@/components/common/RuleSweep'

/**
 * The problem, as an argument rather than a menu.
 *
 * This was four bordered cards in a grid, which is the same shape as five
 * other sections on the old homepage. Rows with a large Cormorant numeral read
 * as a case being built, one point after another, which is what the copy is
 * actually doing.
 */

const problems = [
  {
    title: 'Repetitive work eats the day',
    text: 'Copy-paste, data entry, follow-ups. Hours your team will never get back.',
    cost: 'Paid for at full salary',
  },
  {
    title: 'Manual processes slow everything',
    // Source: the widely cited Lead Response Management study (Oldroyd,
    // McElheran & Elkington), which found the odds of qualifying a lead drop
    // roughly 400% between a 5-minute and a 10-minute response. Kept because
    // it is the one specific number in the old copy and the brand guide asks
    // for exactly this kind of specificity. It is an external finding, not an
    // RKade result, and it is not presented as one.
    text: 'Every handoff waits on a human. Let a response slip from 5 minutes to 10 and the odds of qualifying that lead fall by around 400%.',
    cost: 'Lost before anyone notices',
  },
  {
    title: 'Teams stretched thin',
    text: 'Good people buried in busywork instead of the work that moves the needle.',
    cost: 'Your best people, on your worst tasks',
  },
  {
    title: 'Growth capped by headcount',
    text: 'Scaling means hiring. Hiring is slow, expensive, and rarely the real bottleneck.',
    cost: 'A ceiling you keep paying to raise',
  },
]

export default function Problem() {
  return (
    <Section tone="cream" id="problem">
      <div className="max-w-3xl">
        <RuleSweep />
        <p className="mt-3 text-label uppercase text-muted">The problem</p>
        <h2 className="mt-4 font-display text-section text-ink">
          Your team isn&rsquo;t slow. <em className="italic">Your process is manual.</em>
        </h2>
        <p className="mt-5 max-w-xl text-body-lg text-muted">
          Most businesses do not have a talent problem. They have a systems problem: smart people
          doing work a system should be doing.
        </p>
      </div>

      <ol className="mt-16 border-t border-line-strong">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <li className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-2 border-b border-line-strong py-9 md:grid-cols-[6rem_1fr_16rem] md:gap-x-10 md:py-11">
              <span className="font-display text-stat leading-none text-ink/15 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-start-2">
                <h3 className="font-display text-card text-ink">{p.title}</h3>
                <p className="mt-2 max-w-xl text-body text-muted">{p.text}</p>
              </div>
              <p className="col-start-2 text-label uppercase text-muted md:col-start-3 md:pt-2 md:text-right">
                {p.cost}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
