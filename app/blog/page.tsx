import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, ShieldCheck, Tag } from 'lucide-react';
import { getPublishedBlogPosts, calculateReadTime } from '@/lib/blog-store';
import { BlogListContainer } from '@/components/blog/BlogListContainer';

import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600; // ISR 1 hour

export const metadata: Metadata = {
  title: 'Kagazo Blog — Indian Government PDF & Digital Signature Guides',
  description:
    'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Kagazo Blog — Indian Government PDF & Digital Signature Guides',
    description:
      'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
    url: `${SITE_URL}/blog`,
    siteName: 'Kagazo',
    images: [
      {
        url: `${SITE_URL}/og?title=` + encodeURIComponent('Kagazo Blog — Guides & Tutorials'),
        width: 1200,
        height: 630,
        alt: 'Kagazo Blog — Indian Government PDF & Digital Signature Guides',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kagazo Blog — Indian Government PDF & Digital Signature Guides',
    description:
      'Step-by-step guides to verify Aadhaar, community certificate, PAN card and all Indian government PDF digital signatures. Fix yellow question mark free.',
    images: [`${SITE_URL}/og?title=` + encodeURIComponent('Kagazo Blog — Guides & Tutorials')],
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Kagazo Knowledge Base &amp; Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
            Government PDF &amp; Document Guides
          </h1>
          <p className="text-base sm:text-lg text-text-main/70 leading-relaxed">
            Everything you need to know about Indian government digital signatures, CCA India PKI verification, photo resizers, and fixing Adobe trust errors.
          </p>
        </div>

        {/* Interactive Blog List (Language Tabs, Category Filter, Search, Sort) */}
        <BlogListContainer initialPosts={posts} />

        {/* Bottom Verification Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-surface to-primary/5 border border-primary/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-text-main">Have a digitally signed PDF to verify?</h4>
              <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                Verify e-Aadhaar, community certificates, and PAN cards free in 2 seconds without software installation.
              </p>
            </div>
          </div>

          <Link
            href="/#upload-zone"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-black text-xs sm:text-sm hover:bg-primary-hover transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
          >
            <span>Verify PDF Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
