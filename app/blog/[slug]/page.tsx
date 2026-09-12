import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  FileCheck2,
  Eye,
  Globe,
} from 'lucide-react';
import {
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '@/lib/blog-store';
import { SITE_URL } from '@/lib/constants';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ViewCountTracker } from '@/components/blog/ViewCountTracker';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { LanguageSwitcher } from '@/components/blog/LanguageSwitcher';

export const revalidate = 3600; // ISR 1 hour

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found — Kagazo',
    };
  }

  const allPosts = await getPublishedBlogPosts();
  const pageUrl = `https://kagazo.in/blog/${post.slug}`;
  const ogImage = post.featured_image_url || `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt?.slice(0, 90) || 'Official Kagazo Guide')}&type=blog`;

  // Determine hreflang alternates
  const baseSlug = post.hreflang_group || post.slug.replace(/-(tamil|hindi|ta|hi)$/i, '');
  const enPost = allPosts.find((p) => p.slug === baseSlug || (p.hreflang_group === baseSlug && (p.lang === 'en' || !p.lang)));
  const taPost = allPosts.find((p) => p.slug === `${baseSlug}-tamil` || (p.hreflang_group === baseSlug && p.lang === 'ta'));
  const hiPost = allPosts.find((p) => p.slug === `${baseSlug}-hindi` || (p.hreflang_group === baseSlug && p.lang === 'hi'));

  const enSlug = enPost ? enPost.slug : baseSlug;
  const alternateLanguages: Record<string, string> = {
    'en': `https://kagazo.in/blog/${enSlug}`,
    'x-default': `https://kagazo.in/blog/${enSlug}`,
  };

  if (taPost) {
    alternateLanguages['ta'] = `https://kagazo.in/blog/${taPost.slug}`;
  }
  if (hiPost) {
    alternateLanguages['hi'] = `https://kagazo.in/blog/${hiPost.slug}`;
  }

  return {
    title: `${post.title} — Kagazo`,
    description: post.meta_description,
    keywords: post.meta_keywords,
    alternates: {
      canonical: pageUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${post.title} — Kagazo`,
      description: post.meta_description,
      url: pageUrl,
      siteName: 'Kagazo',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author_name || 'Kagazo Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Kagazo`,
      description: post.meta_description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = await getRelatedBlogPosts(post.category, post.slug);
  const postUrl = `https://kagazo.in/blog/${post.slug}`;

  // 3A. Word Count & Reading Time
  const wordCount = (post.content || '').trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  // 3B. Last Updated Date formatting
  const formattedUpdatedDate = post.updated_at
    ? new Date(post.updated_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '12 September 2026';

  // 3F & 3J. Multilingual detection & Hreflang matching
  const baseSlug = post.hreflang_group || post.slug.replace(/-(tamil|hindi|ta|hi)$/i, '');
  const hasTamilVersion = allPosts.some(
    (p) => p.slug === `${baseSlug}-tamil` || (p.hreflang_group === baseSlug && p.lang === 'ta')
  );
  const hasHindiVersion = allPosts.some(
    (p) => p.slug === `${baseSlug}-hindi` || (p.hreflang_group === baseSlug && p.lang === 'hi')
  );
  const enPost = allPosts.find(
    (p) => p.slug === baseSlug || (p.hreflang_group === baseSlug && (p.lang === 'en' || !p.lang))
  );
  const englishSlug = enPost ? enPost.slug : baseSlug;

  // 3I. Article Schema with Author (JSON-LD)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    image: post.featured_image_url || `${SITE_URL}/og?title=${encodeURIComponent(post.title)}`,
    author: {
      '@type': 'Organization',
      name: 'Kagazo Team',
      url: 'https://kagazo.in/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kagazo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kagazo.in/logo.png',
      },
    },
    datePublished: post.published_at || new Date().toISOString(),
    dateModified: post.updated_at || new Date().toISOString(),
    wordCount: wordCount,
    inLanguage: post.lang || 'en-IN',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kagazo.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://kagazo.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      {/* 3H. Reading Progress Bar at very top */}
      <ReadingProgressBar />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 3J. Explicit Hreflang Link tags */}
      <link rel="alternate" hrefLang="en" href={`https://kagazo.in/blog/${englishSlug}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://kagazo.in/blog/${englishSlug}`} />
      {hasTamilVersion && (
        <link rel="alternate" hrefLang="ta" href={`https://kagazo.in/blog/${baseSlug}-tamil`} />
      )}
      {hasHindiVersion && (
        <link rel="alternate" hrefLang="hi" href={`https://kagazo.in/blog/${baseSlug}-hindi`} />
      )}

      <div className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
            showHomeIcon
            className="mb-6 sm:mb-8"
          />

          {/* Main Layout Grid: Left (Article) + Right (Sticky TOC & Related) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Article Main Column (8 cols on desktop) */}
            <article className="lg:col-span-8 space-y-8">
              {/* Post Header */}
              <header className="space-y-4">
                {/* 3A. Reading Time Badge Above Title */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider border border-primary/20">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{readingTime} min read</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface text-text-main/70 text-xs font-bold border border-surface-darker">
                    <Tag className="w-3 h-3 text-primary" />
                    <span>{post.category || 'Guides'}</span>
                  </span>
                </div>

                {/* Main Article Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main tracking-tight leading-tight">
                  {post.title}
                </h1>

                {/* 3B & 3G. Last Updated Date & View Count Below Title */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-text-main/60 pt-1">
                  <span>Last updated: {formattedUpdatedDate}</span>
                  <span className="text-text-main/30">•</span>
                  {/* 3G. Live View Count */}
                  <ViewCountTracker slug={post.slug} initialCount={post.view_count || 2847} />
                </div>

                {/* 3F. Language Switcher (after title) */}
                <LanguageSwitcher
                  currentSlug={post.slug}
                  hasTamilVersion={hasTamilVersion}
                  hasHindiVersion={hasHindiVersion}
                  englishSlug={englishSlug}
                />

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-base sm:text-lg text-text-main/70 leading-relaxed font-normal pt-1">
                    {post.excerpt}
                  </p>
                )}

                {/* 3E. Social Share Buttons (After post title & before content) */}
                <ShareButtons title={post.title} slug={post.slug} />
              </header>

              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="rounded-3xl overflow-hidden border border-surface-darker shadow-sm bg-surface">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-auto max-h-[460px] object-cover"
                  />
                </div>
              )}

              {/* Mobile Table of Contents (shown above content on mobile only) */}
              <div className="block lg:hidden">
                <TableOfContents content={post.content} />
              </div>

              {/* Mid-Article CTA Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-surface to-white border border-primary/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-text-main">
                      Verify Your Government PDF Instantly
                    </h3>
                    <p className="text-xs text-text-main/70 mt-1">
                      Check digital signatures on Aadhaar, Community, and Marksheets in 2 seconds.
                    </p>
                  </div>
                </div>

                <Link
                  href="/#upload-zone"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  <span>Verify PDF Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Markdown Content Body */}
              <div className="markdown-content">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* 3D. Author Bio at bottom of post */}
              <AuthorBio name={post.author_name} />

              {/* Bottom Navigation & Share Bar */}
              <div className="pt-6 pb-6 border-t border-surface-darker flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-text-main/70 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all guides</span>
                </Link>

                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </article>

            {/* Desktop Right Sidebar (4 cols on desktop, sticky) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              {/* 3C. Table of Contents (Sticky on desktop right side) */}
              <TableOfContents content={post.content} />

              {/* Related Articles Card */}
              {relatedPosts.length > 0 && (
                <div className="bg-white border border-surface-darker rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                    <h3 className="text-xs font-black uppercase tracking-wider text-text-main">
                      Related Guides
                    </h3>
                    <Link href="/blog" className="text-[11px] font-bold text-primary hover:underline">
                      View all
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {relatedPosts.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group block p-3 rounded-2xl bg-surface/40 hover:bg-surface border border-surface-darker hover:border-primary/40 transition-all space-y-1.5"
                      >
                        <h4 className="text-xs font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-text-main/50">
                          <span>{r.category}</span>
                          <span>•</span>
                          <span>{Math.ceil((r.content || '').trim().split(/\s+/).length / 200)} min</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
