'use client';

import * as React from 'react';
import { BlogEditor } from '@/components/admin/BlogEditor';

export default function NewBlogArticlePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="pb-2 border-b border-surface-darker">
        <h1 className="text-2xl font-black text-text-main">Create New Blog Article</h1>
        <p className="text-xs text-text-main/70">
          Draft and publish guides on Indian government PDF verification, photo resizers, and compliance.
        </p>
      </div>

      <BlogEditor isStandalonePage />
    </div>
  );
}
