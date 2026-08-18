/**
 * Retired 18-08-2026, phase 6 (correctness and accessibility pass).
 *
 * Left over from the pre-redesign component set. By the time phases 3 to 5
 * landed, every page had moved to Section.jsx plus each page writing its own
 * heading markup for its own tone (cream/ink/ink-deep), and nothing imported
 * this any more. Moved here rather than deleted, per this project's rule that
 * nothing is ever deleted, only moved to docs/history/.
 */
import React from 'react';

export default function SectionHeading({ label, title, description, align = 'left' }) {
  const isCenter = align === 'center';
  return (
    <div className={`flex flex-col max-w-2xl ${isCenter ? 'text-center mx-auto items-center' : 'text-left'}`}>
      <span className="mb-4 inline-flex items-center gap-2 text-label uppercase text-muted">
        <span className="h-px w-6 bg-gold"></span>
        {label}
      </span>
      <h2 className="font-display text-section text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-body-lg text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
