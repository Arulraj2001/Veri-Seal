'use client';

import * as React from 'react';
import {
  Search,
  Globe,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Save,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeoPage {
  id: string;
  slug: string;
  title: string;
  h1: string;
  meta_description: string;
  meta_keywords: string;
  intro_text: string;
  doc_type: string;
  state: string;
  portal: string;
  faq: Array<{ q: string; a: string }>;
  published: boolean;
  updated_at: string;
}

export default function AdminSeoPagesPage() {
  const [pages, setPages] = React.useState<SeoPage[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Editor State
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<Partial<SeoPage>>({});
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadPages = async () => {
    try {
      const res = await fetch('/api/admin/seo-pages');
      if (res.ok) {
        const json = await res.json();
        setPages(json.pages || []);
      }
    } catch (e) {
      console.error('Failed to load SEO pages:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadPages();
  }, []);

  const handleOpenEdit = (page: SeoPage) => {
    setCurrentPage({ ...page, faq: page.faq || [] });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentPage.slug || !currentPage.title || !currentPage.h1) {
      alert('Slug, title, and H1 heading are required.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/seo-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPage),
      });
      if (res.ok) {
        showToast('SEO landing page saved successfully.');
        setIsEditing(false);
        loadPages();
      }
    } catch (e) {
      console.error('Failed to save SEO page:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.doc_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW 1: PAGES LIST */}
      {!isEditing && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
                Programmatic SEO Landing Pages
              </h1>
              <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                Manage 10 high-intent Indian government document verification landing pages
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-main/40" />
              <input
                type="text"
                placeholder="Search slug or doc type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs bg-white border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
          </div>

          <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Slug / URL</th>
                    <th className="py-3 px-3">Page Meta Title</th>
                    <th className="py-3 px-3">Document Type</th>
                    <th className="py-3 px-3">State / Jurisdiction</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker/50 font-medium">
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-surface/40 transition-colors">
                      <td className="py-3.5 px-3 font-mono text-[11px] font-bold text-primary whitespace-nowrap">
                        /{page.slug}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-text-main max-w-xs truncate">
                        {page.title}
                      </td>
                      <td className="py-3.5 px-3 text-text-main/80 whitespace-nowrap">
                        {page.doc_type}
                      </td>
                      <td className="py-3.5 px-3 text-text-main/60 whitespace-nowrap">
                        {page.state}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-light text-success font-bold text-[10px] uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Indexed</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(page)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-surface-darker hover:bg-surface text-text-main font-semibold text-[11px]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit SEO</span>
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

      {/* VIEW 2: SEO PAGE EDITOR */}
      {isEditing && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to SEO Pages</span>
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Form (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-surface-darker rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-black text-text-main">
                Edit SEO Page: <span className="font-mono text-primary font-normal">/{currentPage.slug}</span>
              </h2>

              {/* Slug Preview */}
              <div>
                <label className="block text-[11px] font-bold text-text-main uppercase mb-1">
                  Canonical URL Slug
                </label>
                <div className="flex items-center bg-surface/50 border border-surface-darker rounded-xl px-3 py-2 font-mono text-xs text-text-main">
                  <span className="text-text-main/40">https://veriseal.in/</span>
                  <input
                    type="text"
                    value={currentPage.slug || ''}
                    onChange={(e) => setCurrentPage({ ...currentPage, slug: e.target.value })}
                    className="bg-transparent focus:outline-none flex-1 font-bold text-primary"
                  />
                </div>
              </div>

              {/* Title & H1 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-bold text-text-main">Page Title (Meta Title)</label>
                  <span
                    className={cn(
                      'text-[11px] font-bold',
                      (currentPage.title?.length || 0) > 60 ? 'text-error' : 'text-text-main/50'
                    )}
                  >
                    {currentPage.title?.length || 0}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={currentPage.title || ''}
                  onChange={(e) => setCurrentPage({ ...currentPage, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-main mb-1">
                  H1 Heading (On-Page Hero)
                </label>
                <input
                  type="text"
                  value={currentPage.h1 || ''}
                  onChange={(e) => setCurrentPage({ ...currentPage, h1: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main font-bold"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-bold text-text-main">Meta Description (SERP Snippet)</label>
                  <span
                    className={cn(
                      'text-[11px] font-bold',
                      (currentPage.meta_description?.length || 0) > 160
                        ? 'text-error'
                        : 'text-text-main/50'
                    )}
                  >
                    {currentPage.meta_description?.length || 0}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={currentPage.meta_description || ''}
                  onChange={(e) => setCurrentPage({ ...currentPage, meta_description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              {/* Keywords & Intro */}
              <div>
                <label className="block text-xs font-bold text-text-main mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={currentPage.meta_keywords || ''}
                  onChange={(e) => setCurrentPage({ ...currentPage, meta_keywords: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-main mb-1">Introductory Text</label>
                <textarea
                  rows={3}
                  value={currentPage.intro_text || ''}
                  onChange={(e) => setCurrentPage({ ...currentPage, intro_text: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                />
              </div>

              {/* Meta selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">Document Type</label>
                  <input
                    type="text"
                    value={currentPage.doc_type || ''}
                    onChange={(e) => setCurrentPage({ ...currentPage, doc_type: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">State / Jurisdiction</label>
                  <input
                    type="text"
                    value={currentPage.state || ''}
                    onChange={(e) => setCurrentPage({ ...currentPage, state: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-main mb-1">Official Portal</label>
                  <input
                    type="text"
                    value={currentPage.portal || ''}
                    onChange={(e) => setCurrentPage({ ...currentPage, portal: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-surface/40 border border-surface-darker rounded-xl text-text-main"
                  />
                </div>
              </div>

              {/* FAQ Section Builder */}
              <div className="pt-4 border-t border-surface-darker space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-text-main">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>Schema.org FAQ Markup Builder</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage({
                        ...currentPage,
                        faq: [...(currentPage.faq || []), { q: 'New Question', a: 'Answer text' }],
                      })
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-surface-darker text-[11px] font-bold text-primary hover:bg-primary-light"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentPage.faq || []).map((faqItem, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface/30 border border-surface-darker rounded-xl space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-primary">Q{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (currentPage.faq || []).filter((_, i) => i !== idx);
                            setCurrentPage({ ...currentPage, faq: updated });
                          }}
                          className="p-1 text-error hover:bg-error-light rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={faqItem.q}
                        onChange={(e) => {
                          const updated = [...(currentPage.faq || [])];
                          updated[idx].q = e.target.value;
                          setCurrentPage({ ...currentPage, faq: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-surface-darker rounded-lg text-text-main"
                      />
                      <textarea
                        rows={2}
                        value={faqItem.a}
                        onChange={(e) => {
                          const updated = [...(currentPage.faq || [])];
                          updated[idx].a = e.target.value;
                          setCurrentPage({ ...currentPage, faq: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-surface-darker rounded-lg text-text-main"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Preview Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-text-main">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Google SERP Preview</span>
                </div>

                <div className="p-3 bg-surface/40 rounded-xl border border-surface-darker text-left space-y-1">
                  <div className="text-[11px] text-text-main/60 truncate">
                    https://veriseal.in &rsaquo; {currentPage.slug}
                  </div>
                  <div className="text-sm font-semibold text-[#1a0dab] line-clamp-1 leading-snug">
                    {currentPage.title || 'Page Title'}
                  </div>
                  <div className="text-xs text-text-main/80 line-clamp-2 leading-relaxed">
                    {currentPage.meta_description || 'Meta description preview appears here.'}
                  </div>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">
                  Publishing Status
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-main">Published &amp; Indexed</span>
                  <input
                    type="checkbox"
                    checked={currentPage.published ?? true}
                    onChange={(e) => setCurrentPage({ ...currentPage, published: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
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
