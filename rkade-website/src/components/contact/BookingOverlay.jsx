import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowUpRight } from 'lucide-react';
import { CALENDAR_LINK, CALENDAR_LIVE, WHATSAPP_LINK, CONTACT_EMAIL } from '@/components/common/CTAButtons';

/**
 * The booking route, in a properly styled overlay rather than a bare
 * new-tab link.
 *
 * This was meant to embed Google's appointment schedule directly inside the
 * page (phase 5 task 5.8). Verified against the real schedule first, per the
 * task's own instruction to confirm it shows real availability before
 * building anything around it: the resolved schedule page
 * (calendar.google.com/calendar/appointments/schedules/...) returned
 * "Appointment not found, the appointment schedule is currently unavailable"
 * on repeated direct visits, including outside of any iframe, so this is not
 * a framing restriction. An iframe that shows that message is worse than the
 * plain link the site had before, so the fallback path applies: keep the
 * outbound link, present it properly. Full trace in the phase 5 unit C
 * report. If the schedule starts resolving again, swap the button below for
 * an <iframe src={CALENDAR_SCHEDULE_URL}> and keep this same fallback link.
 *
 * No third-party network request happens until a visitor opens this, so it
 * costs nothing on first paint either way.
 */
export default function BookingOverlay({ open, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  // Guarded for the prerender pass, which has no document. `open` only ever
  // becomes true from a click, well after mount, so this never runs there.
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    // The backdrop's click-to-dismiss is a mouse convenience layered on top
    // of a keyboard path that already fully works without it: Escape closes
    // the dialog and the visible Close button is reachable by Tab. A
    // keyboard or screen reader user never needs this element, so it stays
    // non-interactive rather than becoming a spurious extra tab stop.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/80 p-[6vw] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-overlay-title"
        className="relative w-full max-w-lg rounded border border-line-strong bg-cream p-9 md:p-11"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded text-muted transition-colors hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded border border-gold/40 bg-gold/10">
          <Calendar className="h-5 w-5 text-gold" />
        </div>

        <h2 id="booking-overlay-title" className="mt-6 font-display text-card text-ink">
          Book a time
        </h2>
        <p className="mt-3 text-body text-muted">
          Thirty minutes, no pitch, just where automation would pay off for you first.
        </p>

        {/* While CALENDAR_LIVE is false the self-serve booking page is not
            reachable, so the overlay offers the two routes that do work rather
            than a button that opens an error page. See CTAButtons.jsx. */}
        {CALENDAR_LIVE ? (
          <>
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded bg-gold px-6 text-button uppercase text-ink transition-transform hover:-translate-y-0.5"
            >
              Open the booking page
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-4 text-xs text-muted">Opens in a new tab, on Google Calendar.</p>
          </>
        ) : (
          <>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded bg-gold px-6 text-button uppercase text-ink transition-transform hover:-translate-y-0.5"
            >
              Message us on WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded border border-line-strong px-6 text-button uppercase text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Email us instead
            </a>
            <p className="mt-4 text-xs text-muted">
              Tell us roughly when suits and we will put a slot in the diary.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
