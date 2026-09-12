'use client';

import * as React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, User, ShieldCheck } from 'lucide-react';
import { BlogPost, mockBlogPosts } from '@/lib/blog-store';

export function BlogShowcase() {
  const [posts, setPosts] = React.useState<BlogPost[]>(() => mockBlogPosts.slice(0, 3));

  React.useEffect(() => {
    fetch('/api/admin/blog')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((p: BlogPost) => p.published).slice(0, 3);
          if (published.length > 0) {
            setPosts(published);
          }
        }
      })
      .catch(() => {
        // fail silently, keep mockBlogPosts default
      });
  }, []);

  return (
    <section id="blog-guides" className="py-20 bg-surface/50 border-t border-surface-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sovereign Knowledge Hub</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main mt-4 tracking-tight leading-tight">
              Essential Guides for Portals, Exams &amp; Legal Proof
            </h2>
            <p className="text-sm text-text-main/70 mt-2 leading-relaxed">
              Research-backed compliance breakdowns for candidates, cyber cafe operators, and citizens.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>Browse All 13+ Technical Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-surface-darker/80 dark:border-slate-800 shadow-soft hover:shadow-card hover:border-primary/40 hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-primary-light/70 text-primary uppercase tracking-wider">
                    {post.category || 'Compliance'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-text-main/50 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.reading_time || 5} min read</span>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-text-main dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-text-main/70 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-surface-darker/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-text-main/70 dark:text-slate-400 truncate max-w-[150px]">
                  {post.author_name}
                </span>
                <span className="font-bold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
