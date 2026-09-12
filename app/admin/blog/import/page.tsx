'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileJson,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Sparkles,
  Globe,
  Clock,
  Layers,
} from 'lucide-react';

interface PostBundleItem {
  lang?: string;
  title: string;
  slug: string;
  excerpt?: string;
  meta_description?: string;
  meta_keywords?: string;
  featured_image_url?: string;
  content: string;
  author_name?: string;
  tags?: string[];
  category?: string;
}

interface PostBundle {
  posts: PostBundleItem[];
}

interface ImportResultItem {
  id: string;
  title: string;
  slug: string;
  lang?: string;
  hreflang_group?: string;
  url: string;
}

export default function AdminBlogImportPage() {
  const [jsonText, setJsonText] = React.useState('');
  const [parsedPosts, setParsedPosts] = React.useState<PostBundleItem[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState<string | null>(null);
  const [publishedPosts, setPublishedPosts] = React.useState<ImportResultItem[]>([]);

  // Sample JSON template for quick testing
  const sampleJson: PostBundle = {
    posts: [
      {
        lang: 'en',
        title: 'How to Validate Digital Signatures on Indian Government Marksheets',
        slug: 'validate-digital-signatures-indian-marksheets',
        excerpt: 'Step-by-step instructions on verifying CBSE, state board, and university marksheet digital signatures with green tick.',
        meta_description: 'Learn how to verify digital signatures on marksheet PDFs with CCA India validation.',
        meta_keywords: 'marksheet verification, digital signature, cbse signature',
        featured_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        content: '# Marksheet Digital Signature Guide\n\nIndian university and school board marksheets include cryptographic PDF signatures issued by CCA accredited certifying authorities.\n\n## Why Verification Matters\nEmployers and government verification officers verify signatures to prevent fraudulent degree submissions.\n\n## Steps to Validate\n1. Open your marksheet PDF in Kagazo.\n2. Cryptographic audit runs in 2 seconds.\n3. Download the LTV enabled PDF with permanent green checkmark.',
        author_name: 'Kagazo Team',
        tags: ['Marksheet', 'Education', 'UIDAI', 'Verification'],
        category: 'Exam Guides',
      },
      {
        lang: 'ta',
        title: 'இந்திய மதிப்பெண் சான்றிதழ் டிஜிட்டல் கையொப்பத்தை சரிபார்ப்பது எப்படி',
        slug: 'validate-digital-signatures-indian-marksheets-tamil',
        excerpt: 'CBSE மற்றும் தமிழ்நாடு மாநில கல்வி வாரிய மதிப்பெண் சான்றிதழ்களின் டிஜிட்டல் கையொப்பங்களை சரிபார்க்கும் எளிய வழிகாட்டி.',
        meta_description: 'மதிப்பெண் சான்றிதழ்களில் டிஜிட்டல் கையொப்பத்தை எளிதாக சரிபார்க்கவும்.',
        meta_keywords: 'மதிப்பெண் சான்றிதழ், டிஜிட்டல் கையொப்பம், சரிபார்ப்பு',
        featured_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        content: '# மதிப்பெண் சான்றிதழ் கையொப்ப வழிகாட்டி\n\nஇந்திய கல்வி வாரியங்கள் டிஜிட்டல் முறையில் கையொப்பமிட்ட சான்றிதழ்களை வழங்குகின்றன.\n\n## சரிபார்ப்பு ஏன் அவசியம்\nபோலி சான்றிதழ்களை தவிர்க்க அரசு அதிகாரிகள் சரிபார்க்கின்றனர்.',
        author_name: 'Kagazo Desk',
        tags: ['Marksheet', 'Tamil Nadu'],
        category: 'Tamil Nadu',
      },
      {
        lang: 'hi',
        title: 'भारतीय अंकतालिका डिजिटल हस्ताक्षर को सत्यापित कैसे करें',
        slug: 'validate-digital-signatures-indian-marksheets-hindi',
        excerpt: 'सीबीएसई और राज्य बोर्ड अंकतालिका डिजिटल हस्ताक्षर को सत्यापित करने की संपूर्ण जानकारी।',
        meta_description: 'अंकतालिका डिजिटल हस्ताक्षर सत्यापन गाइड।',
        meta_keywords: 'अंकतालिका सत्यापन, डिजिटल हस्ताक्षर',
        featured_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        content: '# अंकतालिका डिजिटल हस्ताक्षर गाइड\n\nडिजिटल हस्ताक्षर वैध होने पर ही प्रमाण पत्र मान्य होता है।\n\n## सत्यापन प्रक्रिया\nकागजो के माध्यम से कुछ ही सेकंड में सत्यापन करें।',
        author_name: 'Kagazo Desk',
        tags: ['Marksheet', 'Hindi'],
        category: 'Exam Guides',
      },
    ],
  };

  const handleLoadSample = () => {
    setJsonText(JSON.stringify(sampleJson, null, 2));
    setErrorMessage(null);
    setResultMessage(null);
  };

  const handlePreview = () => {
    setErrorMessage(null);
    setResultMessage(null);

    if (!jsonText.trim()) {
      setErrorMessage('Please paste a valid JSON article bundle into the text area.');
      setParsedPosts(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.posts)) {
        throw new Error("JSON must be an object with a 'posts' array: { \"posts\": [ ... ] }");
      }

      if (parsed.posts.length === 0) {
        throw new Error("The 'posts' array is empty. Please provide at least one post.");
      }

      for (let i = 0; i < parsed.posts.length; i++) {
        const p = parsed.posts[i];
        if (!p.title || typeof p.title !== 'string') {
          throw new Error(`Post at index ${i} is missing a required 'title' string.`);
        }
        if (!p.slug || typeof p.slug !== 'string') {
          throw new Error(`Post at index ${i} is missing a required 'slug' string.`);
        }
        if (!p.content || typeof p.content !== 'string') {
          throw new Error(`Post at index ${i} is missing required 'content' markdown string.`);
        }
      }

      setParsedPosts(parsed.posts);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid JSON format. Please verify your syntax.');
      setParsedPosts(null);
    }
  };

  const handleExecuteImport = async (action: 'publish' | 'draft') => {
    setErrorMessage(null);
    setResultMessage(null);
    setPublishedPosts([]);

    // First validate
    let postsToImport: PostBundleItem[] = [];
    if (parsedPosts && parsedPosts.length > 0) {
      postsToImport = parsedPosts;
    } else {
      try {
        const parsed = JSON.parse(jsonText);
        if (!Array.isArray(parsed?.posts) || parsed.posts.length === 0) {
          throw new Error("JSON must have a valid 'posts' array.");
        }
        postsToImport = parsed.posts;
        setParsedPosts(postsToImport);
      } catch (err: any) {
        setErrorMessage(err.message || 'Invalid JSON. Click "Preview Import" to check your syntax.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/blog/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posts: postsToImport,
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to import articles.');
      }

      const count = data.count || postsToImport.length;
      if (action === 'publish') {
        setResultMessage(`🎉 ${count} ${count === 1 ? 'post' : 'posts'} published successfully!`);
      } else {
        setResultMessage(`💾 ${count} ${count === 1 ? 'post' : 'posts'} saved as drafts successfully.`);
      }

      if (Array.isArray(data.posts)) {
        setPublishedPosts(data.posts);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during article import.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLangBadgeColor = (lang?: string) => {
    switch ((lang || 'en').toLowerCase()) {
      case 'ta':
      case 'tamil':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'hi':
      case 'hindi':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getLangLabel = (lang?: string) => {
    switch ((lang || 'en').toLowerCase()) {
      case 'ta':
      case 'tamil':
        return 'தமிழ் (TA)';
      case 'hi':
      case 'hindi':
        return 'हिंदी (HI)';
      default:
        return 'English (EN)';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header / Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-darker">
        <div className="space-y-1">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blog Admin</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight flex items-center gap-2.5">
            <FileJson className="w-7 h-7 text-primary" />
            <span>Bulk Article Import System</span>
          </h1>
          <p className="text-xs text-text-main/70">
            Publish multilingual articles in batches with automatic hreflang language linking.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-surface-darker hover:bg-surface-darker text-xs font-bold text-text-main transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Load Sample JSON</span>
        </button>
      </div>

      {/* Main Form Area */}
      <div className="bg-white border border-surface-darker rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>JSON Article Bundle Payload</span>
            </label>
            <span className="text-[11px] font-semibold text-text-main/50">
              Accepts UTF-8 Markdown &amp; Multilingual Strings
            </span>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Paste your JSON article bundle here..."
            className="w-full h-[400px] p-4 font-mono text-xs bg-surface/30 border border-surface-darker rounded-2xl text-text-main leading-relaxed focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-y"
            spellCheck={false}
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handlePreview}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-surface-darker hover:bg-surface-darker text-xs font-black uppercase tracking-wider text-text-main transition-all shadow-2xs hover:border-primary/40 disabled:opacity-50"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Preview Import</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleExecuteImport('publish')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish All'}</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleExecuteImport('draft')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-surface-darker hover:bg-surface-darker text-xs font-black uppercase tracking-wider text-text-main/80 transition-all shadow-2xs disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving...' : 'Save as Drafts'}</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-error/10 border border-error/20 flex items-start gap-3 text-error">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider">Validation Error</h4>
              <p className="text-xs leading-relaxed font-mono">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Success Alert & Links */}
        {resultMessage && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h4 className="text-sm font-bold">{resultMessage}</h4>
            </div>

            {publishedPosts.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Published Article Links:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {publishedPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-900 hover:text-emerald-700 hover:border-emerald-400 transition-colors shadow-2xs"
                    >
                      <span className="truncate">{post.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {parsedPosts && parsedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-main uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Import Preview ({parsedPosts.length} Articles Ready)</span>
            </h2>
            <span className="text-xs font-bold text-text-main/60">
              Hreflang Group Anchor: <code className="text-primary font-mono">{parsedPosts.find(p => p.lang === 'en')?.slug || parsedPosts[0].slug.replace(/-(tamil|hindi|ta|hi)$/i, '')}</code>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {parsedPosts.map((p, idx) => {
              const wordCount = (p.content || '').trim().split(/\s+/).filter(Boolean).length;
              const readingTime = Math.ceil(wordCount / 200) || 1;

              return (
                <div
                  key={`${p.slug}-${idx}`}
                  className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm hover:shadow-card transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getLangBadgeColor(
                          p.lang
                        )}`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>{getLangLabel(p.lang)}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-main/60">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>{readingTime} min read ({wordCount} words)</span>
                      </span>
                    </div>

                    {/* Title & Slug */}
                    <div>
                      <h3 className="text-sm font-bold text-text-main leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] text-text-main/50 truncate">
                        /blog/{p.slug}
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-text-main/70 line-clamp-3 leading-relaxed">
                      {p.excerpt || p.meta_description || 'No excerpt provided.'}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-surface-darker/60 flex items-center justify-between text-[11px] text-text-main/60">
                    <span>Author: <strong className="text-text-main">{p.author_name || 'Kagazo Team'}</strong></span>
                    {p.tags && p.tags.length > 0 && (
                      <span className="truncate max-w-[120px]">{p.tags.join(', ')}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
