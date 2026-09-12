'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Kagazo application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-error-light text-error mb-6 shadow-sm border border-error/20">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight mb-2">
          Application Exception Encountered
        </h1>

        <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed mb-6">
          An unexpected system state occurred. Your documents remain completely isolated in memory and were purged safely.
        </p>

        {error?.digest && (
          <div className="mb-6 p-2.5 rounded-xl bg-surface border border-surface-darker text-[11px] font-mono text-text-main/60">
            Error Ref ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Component</span>
          </Button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-darker/60 text-text-main font-bold text-xs sm:text-sm transition-colors border border-surface-darker"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
