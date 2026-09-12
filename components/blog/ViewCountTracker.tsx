'use client';

import * as React from 'react';
import { Eye } from 'lucide-react';

interface ViewCountTrackerProps {
  slug: string;
  initialCount?: number;
}

export function ViewCountTracker({ slug, initialCount = 0 }: ViewCountTrackerProps) {
  const [views, setViews] = React.useState<number>(initialCount);

  React.useEffect(() => {
    if (!slug) return;

    // Trigger view increment
    const recordView = async () => {
      try {
        const res = await fetch('/api/blog/view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          if (typeof data.view_count === 'number') {
            setViews(data.view_count);
          } else {
            setViews((prev) => prev + 1);
          }
        }
      } catch (e) {
        // Fallback optimistic increment
        setViews((prev) => prev + 1);
      }
    };

    recordView();
  }, [slug]);

  const displayCount = (views || initialCount || 1).toLocaleString('en-IN');

  return (
    <span className="inline-flex items-center gap-1.5 text-text-main/70">
      <Eye className="w-3.5 h-3.5 text-primary" />
      <span>{displayCount} reads</span>
    </span>
  );
}
