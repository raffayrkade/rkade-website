import { Link } from 'react-router-dom'

import { FREE_AUDIT_HREF, FREE_AUDIT_IS_EXTERNAL } from './CTAButtons'

// The one place that decides what a "Free Audit" button does.
//
// When the booking calendar is working, this is an external link that opens
// the Google appointment page in a new tab, which is what the site has always
// done. When it is not working, the same button becomes an internal link to
// /contact, where WhatsApp, email and the contact form are all live.
//
// Both cases are a real link with a real destination, so the button is never
// a dead end and never needs JavaScript to work. Flip CALENDAR_LIVE in
// CTAButtons.jsx to switch every Free Audit button on the site at once.
export default function FreeAuditLink({ className, onClick, children }) {
  if (FREE_AUDIT_IS_EXTERNAL) {
    return (
      <a
        href={FREE_AUDIT_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={FREE_AUDIT_HREF} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}
