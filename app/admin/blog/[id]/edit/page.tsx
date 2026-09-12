'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { BlogPost } from '@/lib/blog-store';
import { Loader2 } from 'lucide-react';

export default function EditBlogArticlePage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/blog?id=${id}`);
        if (!res.ok) throw new Error('Failed to load article');
        const data = await res.json();
        setPost(data.post || null);
      } catch (err: any) {
        setError(err.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-xs font-bold text-text-main/60">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading article...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-6 rounded-3xl bg-error/10 border border-error/20 text-error text-center space-y-2 max-w-lg mx-auto mt-12">
        <h3 className="text-sm font-bold">Unable to load article</h3>
        <p className="text-xs">{error || 'Article not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="pb-2 border-b border-surface-darker">
        <h1 className="text-2xl font-black text-text-main">Edit Article: {post.title}</h1>
        <p className="text-xs text-text-main/70">
          Update article content, metadata, and featured image.
        </p>
      </div>

      <BlogEditor initialPost={post} isStandalonePage />
    </div>
  );
}
