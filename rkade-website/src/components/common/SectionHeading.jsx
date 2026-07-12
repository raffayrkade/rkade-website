import React from 'react';

export default function SectionHeading({ label, title, description, align = 'left' }) {
  const isCenter = align === 'center';
  return (
    <div className={`flex flex-col max-w-2xl ${isCenter ? 'text-center mx-auto items-center' : 'text-left'}`}>
      <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
        <span className="h-px w-6 bg-gold"></span>
        {label}
      </span>
      <h2 className="font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-warmgrey sm:text-lg">{description}</p>
      )}
    </div>
  );
}
