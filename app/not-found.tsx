import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, ShieldCheck, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Emblem 404 badge */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary-light border-2 border-primary/20 text-primary mb-6 shadow-sm">
          <span className="text-4xl font-black tracking-tight">404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-text-main/70 leading-relaxed mb-8">
          The verification guide, tool route, or article you were looking for doesn&apos;t exist or has moved to a new permanent URL.
        </p>

        {/* Quick Action Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
          >
            <Home className="w-4 h-4" />
            <span>Go to Kagazo Home</span>
          </Link>

          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface hover:bg-surface-darker/60 text-text-main font-bold text-sm transition-colors border border-surface-darker"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Guides</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-darker flex items-center justify-center gap-2 text-xs text-text-main/60">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Kagazo • Sovereign Indian PKI Signature Verification</span>
        </div>
      </div>
    </div>
  );
}
