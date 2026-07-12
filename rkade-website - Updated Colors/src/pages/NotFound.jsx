import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6 text-ink">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-heading text-7xl font-bold text-white/20">404</h1>
        <h2 className="font-heading text-2xl font-bold text-ink">Page not found</h2>
        <p className="text-warmgrey">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
