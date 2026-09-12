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
} from 'lucide-react';
import {
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  calculateReadTime,
} from '@/lib/blog-store';
import { SITE_URL } from '@/lib/constants';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

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

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt?.slice(0, 90) || 'Official Kagazo Guide')}&type=blog`;

  return {
    title: `${post.title} — Kagazo`,
    description: post.meta_description,
    keywords: post.meta_keywords,
    alternates: {
      canonical: pageUrl,
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
      authors: [post.author_name || 'Kagazo'],
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

  const relatedPosts = await getRelatedBlogPosts(post.category, post.slug);
  const readTime = calculateReadTime(post.content);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // Article structured data schema (JSON-LD)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    image: post.featured_image_url || `${SITE_URL}/og?title=${encodeURIComponent(post.title)}`,
    author: {
      '@type': 'Organization',
      name: 'Kagazo',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kagazo',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  // Breadcrumb structured data schema (JSON-LD)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
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
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation with embedded BreadcrumbList schema */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
            showHomeIcon
            className="mb-6 sm:mb-8"
          />

          {/* Post Header */}
          <header className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary-light text-primary text-xs font-bold border border-primary/20">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main/60">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
              <span className="text-text-main/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-main/60">
                <Calendar className="w-3.5 h-3.5" />
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Published recently'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-text-main/70 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author and Share Bar */}
            <div className="mt-8 pt-6 border-t border-b border-surface-darker/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  VS
                </div>
                <div>
                  <div className="text-sm font-bold text-text-main">{post.author_name}</div>
                  <div className="text-xs text-text-main/60">Controller of Certifying Authorities PKI Research</div>
                </div>
              </div>

              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-10 rounded-3xl overflow-hidden border border-surface-darker shadow-sm bg-surface">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-auto max-h-[460px] object-cover"
              />
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Mid-Article "Verify your PDF now" CTA Box */}
          <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-surface to-white border-2 border-primary/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-text-main">Verify Your Indian Government PDF Now</h3>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Check signatures on e-Aadhaar, community certificates, and PAN cards free in 2 seconds.
                </p>
              </div>
            </div>

            <Link
              href="/#upload-zone"
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span>Verify PDF Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Markdown Content Body */}
          <div className="markdown-content">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* End-of-Article "Verify your PDF now" CTA Box */}
          <div className="mt-14 mb-12 p-8 sm:p-10 rounded-3xl bg-text-main text-white shadow-xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mb-5 shadow-lg">
              <FileCheck2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
              Need Instant Digital Signature Verification?
            </h3>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-6">
              Kagazo operates directly in your browser with CCA India root validation. No Adobe certificate downloads, no software installation, completely private.
            </p>

            <Link
              href="/#upload-zone"
              className="px-8 py-4 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary-hover transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Go to Verification Tool</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom Share Bar */}
          <div className="pt-6 pb-10 border-t border-surface-darker flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-text-main/70 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all guides</span>
            </Link>

            <ShareButtons title={post.title} url={postUrl} />
          </div>

          {/* Related Posts Section (3 posts, same category) */}
          {relatedPosts.length > 0 && (
            <section className="pt-12 border-t border-surface-darker">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-text-main">Related Guides</h3>
                  <p className="text-xs text-text-main/60 mt-1">Recommended reading in {post.category}</p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group block bg-white rounded-2xl border border-surface-darker overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-card transition-all"
                  >
                    <div className="relative h-36 overflow-hidden bg-surface">
                      <img
                        src={r.featured_image_url}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] font-semibold text-text-main/50 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{calculateReadTime(r.content)}</span>
                      </div>
                      <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
