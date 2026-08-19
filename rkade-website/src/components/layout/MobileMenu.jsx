import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X, ArrowUpRight } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ArchTrio from '@/components/arch/ArchTrio'
import FreeAuditLink from '@/components/common/FreeAuditLink'

/**
 * The mobile nav, as a proper full-height overlay.
 *
 * It used to be an inline block that pushed the page down. This is a portal
 * instead, so it sits on top of everything including the header, carries its
 * own close control (so there is never a second X hidden underneath it), and
 * matches BookingOverlay.jsx's focus-trap pattern exactly rather than
 * inventing a second one: focus moves to the close button on open, Tab cycles
 * inside the dialog, Escape closes it, and focus returns to whatever was
 * focused before it opened, which is the header's menu button in practice.
 */
export default function MobileMenu({ open, onClose, navLinks }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open, onClose])

  // Guarded for the prerender pass, which has no document. `open` only ever
  // becomes true from a click, well after mount, so this never runs there.
  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      // h-[100dvh] as well as inset-0: a fixed element on iOS Safari is laid
      // out against the toolbar-hidden viewport, so the Free Audit button at
      // the bottom of this panel could sit underneath Safari's own bottom bar.
      // dvh rather than svh here because this is a fixed overlay with the page
      // behind it locked, so there is no layout for a mid-scroll resize to
      // disturb, and dvh always fills exactly what is visible.
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col overflow-y-auto bg-ink-deep md:hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold opacity-[0.1]"
      >
        <ArchTrio className="h-[50dvh] w-auto" />
      </div>

      <div className="relative flex h-[72px] shrink-0 items-center justify-between px-[6vw]">
        <Link to="/" onClick={onClose} className="flex items-center">
          <Logo tone="dark" />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-cream transition-colors hover:text-gold"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="relative flex flex-1 flex-col justify-center gap-1 px-[6vw]" aria-label="Main">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.href}
            onClick={onClose}
            className="border-t border-cream/10 py-5 font-display text-4xl font-light text-cream transition-colors first:border-t-0 hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="relative shrink-0 px-[6vw] pb-12 pt-4">
        <FreeAuditLink
        onClick={onClose}
        className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded bg-gold px-7 text-button uppercase text-ink transition-transform duration-300 ease-passage hover:-translate-y-0.5"
      >
          Free Audit
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </FreeAuditLink>
      </div>
    </div>,
    document.body,
  )
}
