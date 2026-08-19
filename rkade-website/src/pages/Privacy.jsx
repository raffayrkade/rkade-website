import PageHeader from '@/components/common/PageHeader'
import Seo from '@/components/common/Seo'
import LegalBody, { LegalSection } from '@/components/legal/LegalBody'
import { CONTACT_EMAIL } from '@/components/common/CTAButtons'

/**
 * The privacy policy.
 *
 * Written from what the site actually does, not from a template. Every claim
 * below was checked against the code on 19-08-2026:
 *
 *   - The only place the site collects anything is the contact form
 *     (src/components/contact/ContactForm.jsx), which posts to Formspree.
 *   - There is no analytics, no tag manager, no pixel, no cookie, and no
 *     localStorage or sessionStorage anywhere in src/ or index.html.
 *   - Fonts are self-hosted in public/fonts, so the site makes zero
 *     third-party requests on any route.
 *
 * If any of those three stop being true, this page is wrong and has to change
 * in the same commit. That is the whole rule.
 */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="What RKade collects through this site, who processes it, and how to ask for it to be deleted."
        path="/privacy"
      />

      <PageHeader
        label="Legal"
        title="Privacy policy"
        description="Short, because the site does very little. It has no cookies, no analytics and no tracking of any kind. The only information we hold is what you choose to send us."
      />

      <LegalBody updated="19 August 2026">
        <LegalSection title="Who we are">
          <p>
            RKade is an AI consultancy based in Dubai, United Arab Emirates. This policy covers
            rkade.co and nothing else. For anything in it, write to{' '}
            <a className="underline decoration-gold-dark underline-offset-4 hover:decoration-ink" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            Only what you type into the contact form: your name, your email address, your company
            if you fill that field in, and your message. Nothing on this site collects anything
            else.
          </p>
          <p>
            If you email us or message us on WhatsApp instead, we hold whatever you send in that
            message, in the same way any business holds its own correspondence.
          </p>
        </LegalSection>

        <LegalSection title="What we do not collect">
          <p>
            This site sets no cookies. It runs no analytics, no advertising pixels and no session
            recording. It does not build a profile of you, and it makes no requests to any
            third-party server while you read it: the fonts are served from our own domain rather
            than from Google, so no other company sees that you visited.
          </p>
        </LegalSection>

        <LegalSection title="Who else handles it">
          <p>
            The contact form is delivered by Formspree, a form processing service. Your submission
            passes through their systems on its way to our inbox, which means it is stored on their
            servers as well as ours. Their own privacy policy is at{' '}
            <a
              className="underline decoration-gold-dark underline-offset-4 hover:decoration-ink"
              href="https://formspree.io/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              formspree.io/legal/privacy-policy
            </a>
            . Beyond Formspree and our own email provider, we share nothing with anyone. We do not
            sell it, and we do not pass it to advertisers, because we do not run any.
          </p>
        </LegalSection>

        <LegalSection title="Why we hold it">
          <p>
            To reply to you, and to carry on that conversation if it turns into work. That is the
            only reason. We do not add you to a mailing list off the back of a contact form.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep it">
          <p>
            Enquiries stay in our email records for as long as the conversation is live and for a
            reasonable period afterwards, so that we can pick up where we left off. If you ask us
            to delete yours, we delete it.
          </p>
        </LegalSection>

        <LegalSection title="What you can ask for">
          <p>
            You can ask us what we hold about you, ask us to correct it, or ask us to delete it.
            Email{' '}
            <a className="underline decoration-gold-dark underline-offset-4 hover:decoration-ink" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{' '}
            and we will do it. There is no form for this and you do not have to give a reason.
          </p>
        </LegalSection>

        <LegalSection title="Children">
          <p>
            This site is aimed at businesses. It is not directed at children and we do not
            knowingly collect anything from them.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            If this policy changes, the date at the top of this page changes with it. There is no
            archive of previous versions: the current one is the one that applies.
          </p>
        </LegalSection>
      </LegalBody>
    </>
  )
}
