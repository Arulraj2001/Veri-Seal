'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  Globe,
  Tag,
  Calendar,
  Eye,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';
import { BlogPost } from '@/lib/blog-store';

interface BlogListContainerProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = [
  'All',
  'Verification',
  'Photo & Signature',
  'PDF Tools',
  'Exam Guides',
  'Tamil Nadu',
  'Financial',
  'Document Tips',
];

const LANGUAGES = [
  { key: 'all', label: 'All' },
  { key: 'en', label: 'English' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'hi', label: 'हिंदी' },
];

export function BlogListContainer({ initialPosts }: BlogListContainerProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLang, setSelectedLang] = React.useState('all');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState<'latest' | 'most_read' | 'alphabetical'>('latest');

  // Filter and sort posts
  const filteredPosts = React.useMemo(() => {
    return initialPosts
      .filter((post) => {
        // Language filter
        const postLang = (post.lang || 'en').toLowerCase();
        if (selectedLang !== 'all') {
          if (selectedLang === 'en' && postLang !== 'en') return false;
          if (selectedLang === 'ta' && postLang !== 'ta' && postLang !== 'tamil') return false;
          if (selectedLang === 'hi' && postLang !== 'hi' && postLang !== 'hindi') return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          const cat = post.category || 'General';
          if (!cat.toLowerCase().includes(selectedCategory.toLowerCase())) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchExcerpt = post.excerpt?.toLowerCase().includes(q) || false;
          const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q)) || false;
          if (!matchTitle && !matchExcerpt && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'most_read') {
          return (b.view_count || 0) - (a.view_count || 0);
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        // Default: latest
        const dateA = new Date(a.published_at || a.created_at).getTime();
        const dateB = new Date(b.published_at || b.created_at).getTime();
        return dateB - dateA;
      });
  }, [initialPosts, searchQuery, selectedLang, selectedCategory, sortBy]);

  const getLangBadge = (lang?: string) => {
    switch ((lang || 'en').toLowerCase()) {
      case 'ta':
      case 'tamil':
        return { label: 'தமிழ்', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'hi':
      case 'hindi':
        return { label: 'हिंदी', bg: 'bg-purple-100 text-purple-900 border-purple-300' };
      default:
        return { label: 'EN', bg: 'bg-blue-100 text-blue-900 border-blue-300' };
    }
  };

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-10">
      {/* 4A & 4C & 4D Controls Bar */}
      <div className="bg-white border border-surface-darker rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* 4C. Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-main/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, exams, certificates..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface/40 border border-surface-darker rounded-xl text-xs font-semibold text-text-main placeholder:text-text-main/40 focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>

          {/* 4D. Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-text-main/50" />
            <span className="text-xs font-bold text-text-main/60">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-surface/50 border border-surface-darker rounded-xl text-xs font-bold text-text-main focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="most_read">Most Read</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Row 2: 4A. Language Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-darker/60">
          <span className="text-xs font-black uppercase tracking-wider text-text-main/70 flex items-center gap-1.5 mr-1">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>Language:</span>
          </span>
          <div className="flex flex-wrap items-center bg-surface p-1 rounded-xl border border-surface-darker gap-1">
            {LANGUAGES.map((lang) => {
              const active = selectedLang === lang.key;
              return (
                <button
                  key={lang.key}
                  type="button"
                  onClick={() => setSelectedLang(lang.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    active
                      ? 'bg-primary text-white shadow-2xs'
                      : 'text-text-main/70 hover:text-text-main hover:bg-surface-darker/50'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: 4B. Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-black uppercase tracking-wider text-text-main/70 flex items-center gap-1.5 mr-1 shrink-0">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span>Category:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#E6570B] text-white shadow-2xs'
                    : 'bg-surface/60 hover:bg-surface border border-surface-darker text-text-main/70 hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs font-semibold text-text-main/60 px-1">
        <span>
          Showing <strong className="text-text-main font-black">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'}
        </span>
        {(searchQuery || selectedLang !== 'all' || selectedCategory !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLang('all');
              setSelectedCategory('All');
            }}
            className="text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* No Results Fallback */}
      {filteredPosts.length === 0 && (
        <div className="bg-white border border-surface-darker rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-surface border border-surface-darker flex items-center justify-center mx-auto text-text-main/40">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-text-main">No guides found</h3>
          <p className="text-xs text-text-main/60 max-w-sm mx-auto">
            We couldn&apos;t find any articles matching your search or filters. Try adjusting your search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLang('all');
              setSelectedCategory('All');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Card (if present) */}
      {featuredPost && (
        <div>
          {(() => {
            const wordCount = (featuredPost.content || '').trim().split(/\s+/).filter(Boolean).length;
            const readingTime = Math.ceil(wordCount / 200) || 1;
            const langBadge = getLangBadge(featuredPost.lang);

            return (
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
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-black uppercase tracking-wide shadow-sm">
                        Featured Guide
                      </span>
                      {/* 4F. Language badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-black border uppercase shadow-2xs ${langBadge.bg}`}
                      >
                        {langBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs font-semibold text-text-main/60">
                        <span className="inline-flex items-center gap-1 bg-surface px-2.5 py-1 rounded-lg border border-surface-darker/60 text-primary font-bold">
                          <Tag className="w-3 h-3" />
                          {featuredPost.category || 'Guides'}
                        </span>
                        {/* 4E. Reading time badge */}
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{readingTime} min read</span>
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-text-main group-hover:text-primary transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>

                      <p className="text-sm text-text-main/70 line-clamp-3 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-surface-darker/60 flex items-center justify-between">
                      <div className="text-xs text-text-main/60">
                        By <strong className="text-text-main">{featuredPost.author_name}</strong>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        <span>Read Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })()}
        </div>
      )}

      {/* Grid Posts */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => {
            const wordCount = (post.content || '').trim().split(/\s+/).filter(Boolean).length;
            const readingTime = Math.ceil(wordCount / 200) || 1;
            const langBadge = getLangBadge(post.lang);

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl border border-surface-darker overflow-hidden shadow-sm hover:shadow-card hover:border-primary/40 transition-all duration-300"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-surface">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-text-main text-[11px] font-bold border border-surface-darker shadow-2xs">
                      {post.category || 'Guides'}
                    </span>
                    {/* 4F. Language Badge on cards */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black border uppercase shadow-2xs ${langBadge.bg}`}
                    >
                      {langBadge.label}
                    </span>
                  </div>

                  {/* 4E. Reading time badge on card image bottom */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-[#E6570B]" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-base font-black text-text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-main/70 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface-darker/60 flex items-center justify-between text-[11px] text-text-main/60">
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Recently'}</span>
                    <span className="font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Read guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
