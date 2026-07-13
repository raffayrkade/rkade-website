import React from 'react';
import Parallax from '@/components/common/Parallax';

export default function PageHeader({ label, title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-divider bg-cream pt-[72px]">
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
              stroke="#C9A84C"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Parallax>
      </div>
      <div className="mx-auto max-w-[1400px] px-[6vw] py-24 md:px-[8vw] md:py-28">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold"></span>
            {label}
          </span>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warmgrey">{description}</p>
        </div>
      </div>
    </section>
  );
}
