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
