'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  PenTool,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Globe,
  Upload,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { BlogPost } from '@/lib/blog-store';

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Editor State
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [currentPost, setCurrentPost] = React.useState<Partial<BlogPost> | undefined>(undefined);

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

  const handleOpenNew = () => {
    setCurrentPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '# New Article Heading\n\nWrite detailed verification guidance for citizens here.',
      meta_description: '',
      meta_keywords: '',
      featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      published: false,
      author_name: 'Kagazo Team',
      lang: 'en',
      category: 'Guides & Tutorials',
      tags: [],
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article deleted successfully.');
        loadPosts();
      }
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  const filteredPosts = React.useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.lang?.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW 1: POSTS LIST VIEW */}
      {!isEditing && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-surface-darker">
            <div>
              <div className="flex items-center gap-2">
                <PenTool className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-black text-text-main">Blog CMS &amp; Knowledge Base</h1>
              </div>
              <p className="text-xs text-text-main/70 mt-1">
                Manage all English, தமிழ், and हिंदी articles, SEO metadata, and verification guides.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/blog/import"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-surface-darker text-text-main text-xs font-bold hover:bg-surface-darker transition-colors shadow-2xs"
              >
                <Upload className="w-4 h-4 text-primary" />
                <span>Bulk Import</span>
              </Link>

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

          {/* Filters and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-surface-darker/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-main/60 mr-1">Status:</span>
              {(['all', 'published', 'draft'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all',
                    filter === f
                      ? 'bg-primary text-white shadow-2xs'
                      : 'bg-surface text-text-main/70 hover:bg-surface-darker'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-main/40" />
              <input
                type="text"
                placeholder="Search articles by title, slug, or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3">Language</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Slug</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Published Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker/50 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-text-main/50 font-medium">
                        Loading articles...
                      </td>
                    </tr>
                  ) : filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-text-main/50 font-medium">
                        No articles found. Click &quot;New Article&quot; to write one!
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((p) => (
                      <tr key={p.id} className="hover:bg-surface/40 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-text-main max-w-sm truncate">
                          {p.title}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {p.lang === 'ta' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px]">
                              தமிழ் (TA)
                            </span>
                          ) : p.lang === 'hi' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">
                              हिंदी (HI)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
                              EN
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-text-main/70 whitespace-nowrap">
                          {p.category || 'Guides & Tutorials'}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[11px] text-text-main/60 max-w-[180px] truncate">
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
                          <Link
                            href={`/blog/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-surface-darker hover:bg-surface text-text-main/70 inline-flex items-center justify-center"
                            title="View live post"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </Link>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: UNIFIED BLOG EDITOR */}
      {isEditing && (
        <BlogEditor
          initialPost={currentPost}
          onSaveSuccess={() => {
            setIsEditing(false);
            loadPosts();
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
