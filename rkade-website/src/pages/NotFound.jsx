import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArchTrio from '@/components/arch/ArchTrio';
import Wordmark from '@/components/brand/Wordmark';
import useArchDraw from '@/hooks/useArchDraw';
import Seo from '@/components/common/Seo';

/**
 * 404. Not inside SiteLayout (see routes.jsx: it is a sibling of the
 * SiteLayout route, not a child of it), so it carries no header or footer of
 * its own and is free to be the one page where the arch motif gets to be
 * playful rather than structural.
 *
 * The idea: you have hit a dead end in the passage, and the only way out is
 * back through the arch. One real route home, no other pages implied.
 */
export default function NotFound() {
  const { ref, drawProgress } = useArchDraw({ mode: 'once' });

  return (
    // A <main>, not a <div>: this page sits outside SiteLayout (see
    // routes.jsx) so it carries no <main> of its own, and axe's
    // landmark-one-main audit flags any page with none at all.
    <main
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-deep px-[6vw] py-24 text-cream"
    >
      <Seo
        title="Page Not Found"
        description="This page doesn't exist. Head back to the RKade homepage to find what you're looking for."
        noindex
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold opacity-[0.14]"
      >
        <ArchTrio drawProgress={drawProgress} className="h-[80svh] w-auto" />
      </div>

      <div className="relative w-full max-w-lg text-center">
        <Link to="/" className="inline-flex items-center justify-center" aria-label="RKade, back to the homepage">
          <Wordmark tone="dark" size="text-2xl" />
        </Link>

        <p className="mt-10 text-label uppercase text-muted-on-ink">404</p>
        <h1 className="mt-4 font-display text-section text-cream">
          This passage doesn't <em className="italic text-gold">go anywhere.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-body-lg text-muted-on-ink">
          The page you're looking for isn't here. The way back is through the arch.
        </p>

        <Link
          to="/"
          className="group mt-10 inline-flex min-h-[52px] items-center gap-2 rounded bg-gold px-8 text-button uppercase text-ink transition-transform duration-300 ease-passage hover:-translate-y-0.5"
        >
          Back through the arch
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </main>
  );
}
