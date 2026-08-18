import { MessageCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_LINK, CONTACT_EMAIL } from '@/components/common/CTAButtons';

/**
 * The three routes in, on ink. Same three destinations as the old cream
 * version, restyled, with the calendar route opening the booking overlay
 * instead of leaving the page directly. Keeps the honest "fastest route"
 * framing on WhatsApp; drops the specific "under an hour" reply-time figure,
 * which is the same call Raffay made for the form's success state on
 * 18-08-2026, just applied to the other place a time promise had crept in.
 */
export default function ContactRoutes({ onOpenBooking }) {
  return (
    <div className="space-y-5">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded border border-cream/15 bg-cream/5 p-7 transition-colors hover:border-gold/50"
      >
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded bg-gold">
          <MessageCircle className="h-5 w-5 text-ink" />
        </div>
        <div>
          <h3 className="flex items-center gap-1 font-display text-card text-cream">
            Chat on WhatsApp
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          <p className="mt-1 text-sm text-muted-on-ink">
            Fastest route. Message us directly and get a real answer.
          </p>
        </div>
      </a>

      <button
        type="button"
        onClick={onOpenBooking}
        className="group flex w-full items-start gap-4 rounded border border-cream/15 bg-cream/5 p-7 text-left transition-colors hover:border-gold/50"
      >
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded border border-gold/40 bg-gold/10">
          <Calendar className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h3 className="flex items-center gap-1 font-display text-card text-cream">
            Free Audit
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          <p className="mt-1 text-sm text-muted-on-ink">
            Grab a slot and we'll map where automation pays off for you.
          </p>
          <p className="mt-2 text-xs text-muted-on-ink">30 minutes, no pitch.</p>
        </div>
      </button>

      <div className="rounded border border-cream/15 p-7">
        <h3 className="font-display text-card text-cream">Prefer email?</h3>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 inline-block text-button text-cream underline decoration-gold underline-offset-4 hover:decoration-cream"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}
