import PageHeader from '@/components/common/PageHeader'
import Seo from '@/components/common/Seo'
import LegalBody, { LegalSection } from '@/components/legal/LegalBody'
import { CONTACT_EMAIL } from '@/components/common/CTAButtons'

/**
 * Terms of use for the website itself.
 *
 * Scope is deliberately narrow: this governs reading rkade.co, not doing work
 * with RKade. Client work runs on a separate written agreement per engagement,
 * and this page says so rather than quietly trying to be that contract.
 */
export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use"
        description="The terms that apply to using the RKade website. Client work runs on a separate written agreement."
        path="/terms"
      />

      <PageHeader
        label="Legal"
        title="Terms of use"
        description="These cover this website. They are not the terms of any project: work we do together runs on its own written agreement, signed before anything starts."
      />

      <LegalBody updated="19 August 2026">
        <LegalSection title="Using this site">
          <p>
            You are welcome to read this site, quote it and link to it. What you may not do is copy
            it wholesale, pass our work off as your own, or use the site to do anything unlawful.
          </p>
        </LegalSection>

        <LegalSection title="This site is not an offer">
          <p>
            Nothing here forms a contract. Prices, scopes and timelines discussed on this site or
            in a free audit are indicative until they are written into a signed agreement. The free
            audit is genuinely free and carries no obligation on either side.
          </p>
        </LegalSection>

        <LegalSection title="Case studies and numbers">
          <p>
            Client names are withheld deliberately. Every figure in the case studies is taken from
            the project record for that build and was accurate when published. They describe what
            happened on those projects, which is not a promise of what will happen on yours.
          </p>
        </LegalSection>

        <LegalSection title="No warranty">
          <p>
            The site is provided as it is. We keep it accurate and current, but we do not warrant
            that it is free of errors or always available, and nothing on it is professional advice
            for your specific situation. For that, talk to us.
          </p>
        </LegalSection>

        <LegalSection title="Our content">
          <p>
            The writing, design, the RKade name and the arch mark belong to RKade. Third-party
            names mentioned anywhere on the site belong to their respective owners.
          </p>
        </LegalSection>

        <LegalSection title="Links out">
          <p>
            Where we link to another site, we do not control it and are not responsible for what it
            does. That includes the booking and messaging tools linked from the contact page.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            These terms are governed by the laws of the United Arab Emirates, and the courts of
            Dubai have jurisdiction over any dispute arising from them.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about any of this go to{' '}
            <a className="underline decoration-gold-dark underline-offset-4 hover:decoration-ink" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </LegalSection>
      </LegalBody>
    </>
  )
}
