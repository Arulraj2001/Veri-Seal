'use client';

import * as React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans text-slate-800">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Something went wrong</h2>
          <p className="text-sm text-slate-600">
            {error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
