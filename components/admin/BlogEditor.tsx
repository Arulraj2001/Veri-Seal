'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Globe,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Tag,
} from 'lucide-react';
import { FeaturedImageUpload } from '@/components/admin/FeaturedImageUpload';
import { BlogPost } from '@/lib/blog-store';
import { cn } from '@/lib/utils';

interface BlogEditorProps {
  initialPost?: Partial<BlogPost>;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
  isStandalonePage?: boolean;
}

export function BlogEditor({
  initialPost,
  onSaveSuccess,
  onCancel,
  isStandalonePage = false,
}: BlogEditorProps) {
  const router = useRouter();
  const [post, setPost] = React.useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    featured_image_url: '',
    published: false,
    author_name: 'Kagazo Team',
    category: 'Guides & Tutorials',
    lang: 'en',
    tags: [],
    ...initialPost,
  });

  const [tagsInput, setTagsInput] = React.useState<string>(
    (initialPost?.tags || []).join(', ')
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setPost((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slug,
    }));
  };

  const handleSave = async (publishStatus: boolean) => {
    setErrorMessage(null);
    if (!post.title || !post.slug) {
      setErrorMessage('Article title and permalink slug are required.');
      return;
    }

    setIsSaving(true);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const wordCount = (post.content || '').trim().split(/\s+/).filter(Boolean).length;
      const readingTime = Math.ceil(wordCount / 200) || 1;

      const payload = {
        ...post,
        published: publishStatus,
        reading_time: readingTime,
        tags: parsedTags,
      };

      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to save article.');
      }

      showToast(publishStatus ? '🎉 Post published live!' : '💾 Post saved as draft.');

      if (onSaveSuccess) {
        onSaveSuccess();
      } else if (isStandalonePage) {
        setTimeout(() => {
          router.push('/admin/blog');
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving article.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push('/admin/blog');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-darker">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-xl border border-surface-darker hover:bg-surface text-xs font-bold text-text-main transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(true)}
            className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Publishing...' : 'Publish Live'}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-2 text-error text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Title & Slug Box */}
          <div className="bg-white border border-surface-darker rounded-3xl p-6 shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Article Title
              </label>
              <input
                type="text"
                required
                placeholder="Enter article title..."
                value={post.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 text-base font-bold bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-main/60 mb-1">
                Permalink Slug
              </label>
              <div className="flex items-center bg-surface/50 border border-surface-darker rounded-xl px-3 py-1.5 font-mono text-xs text-text-main/80">
                <span className="text-text-main/40">https://kagazo.in/blog/</span>
                <input
                  type="text"
                  value={post.slug || ''}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  className="bg-transparent focus:outline-none flex-1 font-bold text-primary ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Excerpt (Card Summary)
              </label>
              <textarea
                rows={2}
                value={post.excerpt || ''}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                placeholder="Brief summary of article..."
                className="w-full px-3 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Markdown Content Box */}
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
              rows={16}
              value={post.content || ''}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder="# Heading 1&#10;&#10;Write article in markdown..."
              className="w-full p-4 font-mono text-xs bg-surface/30 border border-surface-darker rounded-2xl text-text-main leading-relaxed focus:outline-none focus:border-primary resize-y"
            />
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Google SERP Preview */}
          <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-main">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Google Search SERP Preview</span>
            </div>

            <div className="p-3 bg-surface/40 rounded-xl border border-surface-darker text-left space-y-1">
              <div className="text-[11px] text-text-main/60 truncate">
                kagazo.in &rsaquo; blog &rsaquo; {post.slug || 'slug'}
              </div>
              <div className="text-sm font-semibold text-[#1a0dab] hover:underline line-clamp-1 leading-snug cursor-pointer">
                {post.title || 'Your Article Title Appears Here'}
              </div>
              <div className="text-xs text-text-main/80 line-clamp-2 leading-relaxed">
                {post.meta_description || 'Provide a concise meta description summarizing the document verification instructions.'}
              </div>
            </div>
          </div>

          {/* Featured Image Upload */}
          <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm">
            <FeaturedImageUpload
              value={post.featured_image_url || ''}
              onChange={(url) => setPost({ ...post, featured_image_url: url })}
            />
          </div>

          {/* Meta & Taxonomy Fields */}
          <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">
              Taxonomy &amp; Metadata
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-text-main mb-1">Language</label>
              <select
                value={post.lang || 'en'}
                onChange={(e) => setPost({ ...post, lang: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
              >
                <option value="en">English (en)</option>
                <option value="ta">Tamil (ta)</option>
                <option value="hi">Hindi (hi)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-main mb-1">Category</label>
              <select
                value={post.category || 'Guides & Tutorials'}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
              >
                <option value="Verification">Verification</option>
                <option value="Photo & Signature">Photo &amp; Signature</option>
                <option value="PDF Tools">PDF Tools</option>
                <option value="Exam Guides">Exam Guides</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Financial">Financial</option>
                <option value="Document Tips">Document Tips</option>
                <option value="Guides & Tutorials">Guides &amp; Tutorials</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <label className="font-bold text-text-main">Meta Description</label>
                <span
                  className={cn(
                    'font-bold',
                    (post.meta_description?.length || 0) > 160 ? 'text-error' : 'text-text-main/50'
                  )}
                >
                  {post.meta_description?.length || 0}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={post.meta_description || ''}
                onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-main mb-1">
                Meta Keywords
              </label>
              <input
                type="text"
                value={post.meta_keywords || ''}
                onChange={(e) => setPost({ ...post, meta_keywords: e.target.value })}
                placeholder="aadhaar, digital signature, cca india"
                className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-main mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Aadhaar, PDF, Green Tick"
                className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-main mb-1">Author Name</label>
              <input
                type="text"
                value={post.author_name || 'Kagazo Team'}
                onChange={(e) => setPost({ ...post, author_name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
