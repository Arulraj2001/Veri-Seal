'use client';

import * as React from 'react';

export function UploadZoneSkeleton() {
  return (
    <section id="upload-zone" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-10 min-h-[480px] flex flex-col justify-between animate-pulse">
          {/* Top Bar Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-surface-darker/60">
            <div className="space-y-2">
              <div className="h-6 w-56 bg-surface-darker/40 rounded-lg" />
              <div className="h-4 w-80 bg-surface-darker/20 rounded-md" />
            </div>
            <div className="h-8 w-28 bg-surface-darker/30 rounded-full" />
          </div>

          {/* Center Box Skeleton */}
          <div className="border-2 border-dashed border-surface-darker/40 bg-surface/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center flex-1">
            <div className="h-16 w-16 rounded-2xl bg-surface-darker/30 mb-5" />
            <div className="h-6 w-64 bg-surface-darker/40 rounded-lg mb-3" />
            <div className="h-4 w-96 max-w-full bg-surface-darker/20 rounded-md mb-6" />
            <div className="h-10 w-44 bg-primary/20 rounded-xl" />
          </div>

          {/* Bottom Indicators Skeleton */}
          <div className="pt-6 mt-6 border-t border-surface-darker/40 flex items-center justify-between">
            <div className="h-4 w-36 bg-surface-darker/20 rounded-md" />
            <div className="h-4 w-28 bg-surface-darker/20 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
