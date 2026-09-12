'use client';

import * as React from 'react';
import {
  PenTool,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Save,
  Globe,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  meta_keywords: string;
  featured_image_url: string;
  published: boolean;
  published_at?: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<'all' | 'published' | 'draft'>('all');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Editor State
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [currentPost, setCurrentPost] = React.useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    featured_image_url: '',
    published: false,
    author_name: 'Kagazo Team',
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadPosts = async () => {
    try {
      const res = await fetch(`/api/admin/blog?filter=${filter}`);
      if (res.ok) {
        const json = await res.json();
        setPosts(json.posts || []);
      }
    } catch (e) {
      console.error('Failed to load blog posts:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadPosts();
  }, [filter]);

  // Slug generator
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setCurrentPost((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slug,
    }));
  };

  const handleOpenNew = () => {
    setCurrentPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '# New Article Heading\n\nWrite detailed verification guidance for citizens here.',
      meta_description: '',
      meta_keywords: '',
      featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      published: false,
      author_name: 'Kagazo Team',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setIsEditing(true);
  };

  const handleSavePost = async (publishStatus: boolean) => {
    if (!currentPost.title || !currentPost.slug) {
      alert('Title and slug are required.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentPost,
          published: publishStatus,
        }),
      });
      if (res.ok) {
        showToast(publishStatus ? 'Post published live!' : 'Post saved as draft.');
        setIsEditing(false);
        loadPosts();
      }
    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showToast('Post deleted successfully.');
      }
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW 1: BLOG LIST */}
      {!isEditing && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
                Blog &amp; Resource Guides
              </h1>
              <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                Publish articles on CCA India PKI, Adobe Acrobat yellow question mark fixes, and IT Act compliance
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-surface-darker rounded-xl p-1 shadow-xs text-xs">
                {(['all', 'published', 'draft'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={cn(
                      'px-3 py-1 rounded-lg capitalize font-bold transition-colors',
                      filter === f ? 'bg-primary text-white' : 'text-text-main/60 hover:text-text-main'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleOpenNew}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3">Slug</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Published Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker/50 font-medium">
                  {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/40 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-text-main max-w-sm truncate">
                        {p.title}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-text-main/60">
                        /blog/{p.slug}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {p.published ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-success-light text-success font-bold text-[10px] uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Published</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-light text-warning font-bold text-[10px] uppercase">
                            <Clock className="w-3 h-3" />
                            <span>Draft</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-text-main/60 whitespace-nowrap">
                        {p.published_at
                          ? new Date(p.published_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg border border-error/30 text-error hover:bg-error-light"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: FULL BLOG EDITOR */}
      {isEditing && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSavePost(false)}
                className="px-4 py-2 rounded-xl border border-surface-darker hover:bg-surface text-xs font-bold text-text-main"
              >
                Save as Draft
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSavePost(true)}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
              >
                Publish Live
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Article Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Title & Slug */}
              <div className="bg-white border border-surface-darker rounded-3xl p-6 shadow-sm space-y-3">
                <div>
                  <label className="block text-xs font-bold text-text-main mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter article title..."
                    value={currentPost.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 text-base font-bold bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-main/60 mb-1">
                    Permalink Slug
                  </label>
                  <div className="flex items-center bg-surface/50 border border-surface-darker rounded-xl px-3 py-1.5 font-mono text-xs text-text-main/80">
                    <span className="text-text-main/40">https://Kagazo.in/blog/</span>
                    <input
                      type="text"
                      value={currentPost.slug || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                      className="bg-transparent focus:outline-none flex-1 font-bold text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main mb-1">
                    Excerpt (Summary for cards)
                  </label>
                  <textarea
                    rows={2}
                    value={currentPost.excerpt || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Markdown Content Area */}
              <div className="bg-white border border-surface-darker rounded-3xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-text-main">
                    Markdown Article Content
                  </label>
                  <span className="text-[10px] text-text-main/50 font-medium">
                    Supports GitHub-flavored Markdown
                  </span>
                </div>
                <textarea
                  rows={14}
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  className="w-full p-4 font-mono text-xs bg-surface/30 border border-surface-darker rounded-2xl text-text-main leading-relaxed focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Right Meta & Google Preview (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Google SERP Card */}
              <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-text-main">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Google Search SERP Preview</span>
                </div>

                <div className="p-3 bg-surface/40 rounded-xl border border-surface-darker text-left space-y-1">
                  <div className="text-[11px] text-text-main/60 truncate">
                    Kagazo.in &rsaquo; blog &rsaquo; {currentPost.slug || 'slug'}
                  </div>
                  <div className="text-sm font-semibold text-[#1a0dab] hover:underline line-clamp-1 leading-snug cursor-pointer">
                    {currentPost.title || 'Your Article Title Appears Here'}
                  </div>
                  <div className="text-xs text-text-main/80 line-clamp-2 leading-relaxed">
                    {currentPost.meta_description ||
                      'Provide a concise meta description summarizing the certificate verification instructions.'}
                  </div>
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">
                  Search Engine Optimization
                </h3>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <label className="font-bold text-text-main">Meta Description</label>
                    <span
                      className={cn(
                        'font-bold',
                        (currentPost.meta_description?.length || 0) > 160
                          ? 'text-error'
                          : 'text-text-main/50'
                      )}
                    >
                      {currentPost.meta_description?.length || 0}/160
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={currentPost.meta_description || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, meta_description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">
                    Meta Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={currentPost.meta_keywords || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, meta_keywords: e.target.value })}
                    placeholder="aadhaar, digital signature, cca india"
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={currentPost.featured_image_url || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, featured_image_url: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                  {currentPost.featured_image_url && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-surface-darker max-h-32">
                      <img
                        src={currentPost.featured_image_url}
                        alt="Featured image preview"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">Author Name</label>
                  <input
                    type="text"
                    value={currentPost.author_name || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, author_name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
