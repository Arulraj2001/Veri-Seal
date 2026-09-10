import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, ShieldCheck, Tag } from 'lucide-react';
import { getPublishedBlogPosts, calculateReadTime } from '@/lib/blog-store';

export const revalidate = 3600; // ISR 1 hour

export const metadata: Metadata = {
  title: 'VeriSeal Blog — Indian Government PDF & Digital Signature Guides',
  description:
    'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
  alternates: {
    canonical: 'https://veriseal.in/blog',
  },
  openGraph: {
    title: 'VeriSeal Blog — Indian Government PDF & Digital Signature Guides',
    description:
      'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
    url: 'https://veriseal.in/blog',
    siteName: 'VeriSeal',
    images: [
      {
        url: 'https://veriseal.in/og?title=' + encodeURIComponent('VeriSeal Blog — Guides & Tutorials'),
        width: 1200,
        height: 630,
        alt: 'VeriSeal Blog — Indian Government PDF & Digital Signature Guides',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeriSeal Blog — Indian Government PDF & Digital Signature Guides',
    description:
      'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
    images: ['https://veriseal.in/og?title=' + encodeURIComponent('VeriSeal Blog — Guides & Tutorials')],
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge Base &amp; Tutorials</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
              Guides &amp; Tutorials
            </h1>
            <p className="mt-4 text-lg text-text-main/70 leading-relaxed">
              Everything about Indian government PDF digital signatures, CCA India certificate validation, and fixing Adobe trust errors.
            </p>
          </div>

          {/* Featured Post Card */}
          {featuredPost && (
            <div className="mb-14">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block bg-white rounded-3xl border border-surface-darker overflow-hidden shadow-sm hover:shadow-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[280px] overflow-hidden bg-surface">
                    <img
                      src={featuredPost.featured_image_url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide shadow-sm">
                        Featured Guide
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-text-main/60 mb-3">
                        <span className="inline-flex items-center gap-1 bg-surface px-2.5 py-1 rounded-lg border border-surface-darker/60 text-primary font-bold">
                          <Tag className="w-3 h-3" />
                          {featuredPost.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {calculateReadTime(featuredPost.content)}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-text-main group-hover:text-primary transition-colors leading-tight mb-4">
                        {featuredPost.title}
                      </h2>

                      <p className="text-sm sm:text-base text-text-main/70 leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-surface-darker/60 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium text-text-main/60">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {featuredPost.published_at
                            ? new Date(featuredPost.published_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Recently Published'}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Remaining Posts Grid (3 per row desktop, 1 mobile) */}
          {gridPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-surface-darker">
                <h3 className="text-xl font-bold text-text-main">All Articles &amp; Insights</h3>
                <span className="text-xs font-semibold text-text-main/60">{posts.length} Guides Available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl border border-surface-darker overflow-hidden shadow-sm hover:shadow-card hover:border-primary/40 transition-all duration-300 flex flex-col group"
                  >
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 sm:h-52 overflow-hidden bg-surface">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-text-main text-[11px] font-bold border border-white/40 shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-medium text-text-main/60 mb-2.5">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.published_at
                              ? new Date(post.published_at).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {calculateReadTime(post.content)}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-snug mb-2.5">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-surface-darker/60 flex items-center justify-between">
                        <span className="text-xs font-medium text-text-main/60">{post.author_name}</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Verification Banner */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 via-surface to-primary/5 border border-primary/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-text-main">Have a digitally signed PDF to verify?</h4>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verify e-Aadhaar, community certificates, and PAN cards free without software installation.
                </p>
              </div>
            </div>

            <Link
              href="/#upload-zone"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Verify PDF Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
  );
}
