import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * One-column accordion, generous type. Replaces the old two-column card grid,
 * which read as a stat block rather than something written to be read.
 *
 * Keyboard: each question is a real <button>, focusable and operable with
 * Enter or Space by default, with aria-expanded and aria-controls wired to
 * its panel so a screen reader announces the open/closed state correctly.
 */
function FaqItem({ q, a, dark, isOpen, onToggle }) {
  const id = useId()
  const triggerId = `faq-trigger-${id}`
  const panelId = `faq-panel-${id}`

  return (
    <div className={`border-b ${dark ? 'border-cream/15' : 'border-line-strong'}`}>
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark ${
            dark ? 'focus-visible:outline-gold' : ''
          }`}
        >
          <span className={`font-display text-card ${dark ? 'text-cream' : 'text-ink'}`}>{q}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 flex-none transition-transform duration-300 ease-passage motion-reduce:transition-none ${
              isOpen ? 'rotate-180' : ''
            } ${dark ? 'text-gold' : 'text-gold-dark'}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-passage motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className={`max-w-2xl pb-7 text-body-lg ${dark ? 'text-muted-on-ink' : 'text-muted'}`}>{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({ items, tone = 'cream' }) {
  const dark = tone !== 'cream'
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          q={item.q}
          a={item.a}
          dark={dark}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
