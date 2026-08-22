import React from 'react';
import Parallax from '@/components/common/Parallax';

export default function PageHeader({ label, title, description }) {
  return (
    <section data-header-tone="light" className="relative overflow-hidden border-b border-line-strong bg-cream pt-[72px]">
      <div className="pointer-events-none absolute -bottom-px left-1/2 h-32 w-[800px] max-w-full -translate-x-1/2">
        <Parallax speed={0.08} className="h-full w-full">
          <svg
            className="h-full w-full"
            viewBox="0 0 400 200"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 200 L0 120 Q0 0 200 0 Q400 0 400 120 L400 200"
              className="stroke-gold"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Parallax>
      </div>
      <div className="mx-auto max-w-[1400px] px-[6vw] py-20 md:px-[8vw] md:py-24">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 text-label uppercase text-muted">
            <span className="h-px w-6 bg-gold"></span>
            {label}
          </span>
          <h1 className="font-display text-section text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-muted">{description}</p>
        </div>
      </div>
    </section>
  );
}
