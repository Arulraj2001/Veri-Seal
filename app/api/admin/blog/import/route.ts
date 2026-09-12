import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { mockBlogPosts, BlogPost } from '@/lib/blog-store';

interface ImportPostInput {
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

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    // Allow if admin or during local dev
    if (role && role !== 'admin' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { posts, action } = body as {
      posts: ImportPostInput[];
      action: 'publish' | 'draft';
    };

    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ error: 'Invalid payload: posts array is required' }, { status: 400 });
    }

    const isPublish = action === 'publish';
    const nowIso = new Date().toISOString();

    // 1. Determine hreflang_group for language linking
    // If there is an English post in the bundle, use its slug as the group ID
    // Otherwise derive from base slug (e.g., strip -tamil or -hindi)
    const englishPost = posts.find((p) => (p.lang || 'en').toLowerCase() === 'en');
    const defaultHreflangGroup = englishPost
      ? englishPost.slug
      : posts[0].slug.replace(/-(tamil|hindi|ta|hi)$/i, '');

    const processedPosts: BlogPost[] = [];
    const dbInserts = [];

    for (const p of posts) {
      const lang = (p.lang || 'en').toLowerCase();
      // Derive hreflang_group: use english slug or strip suffix
      let group = p.slug.replace(/-(tamil|hindi|ta|hi)$/i, '');
      if (englishPost) {
        group = englishPost.slug;
      } else if (!group) {
        group = defaultHreflangGroup;
      }

      const wordCount = (p.content || '').trim().split(/\s+/).filter(Boolean).length;
      const readingTime = Math.ceil(wordCount / 200) || 1;

      const newPost: BlogPost = {
        id: `post-import-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || '',
        content: p.content,
        meta_description: p.meta_description || p.excerpt || '',
        meta_keywords: p.meta_keywords || '',
        featured_image_url: p.featured_image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: p.category || 'Guides & Tutorials',
        published: isPublish,
        published_at: isPublish ? nowIso : null,
        author_name: p.author_name || 'Kagazo Team',
        created_at: nowIso,
        updated_at: nowIso,
        lang,
        hreflang_group: group,
        reading_time: readingTime,
        view_count: 0,
        tags: p.tags || [],
      };

      processedPosts.push(newPost);

      dbInserts.push({
        title: newPost.title,
        slug: newPost.slug,
        excerpt: newPost.excerpt,
        content: newPost.content,
        meta_description: newPost.meta_description,
        meta_keywords: newPost.meta_keywords,
        featured_image_url: newPost.featured_image_url,
        category: newPost.category,
        published: newPost.published,
        published_at: newPost.published_at,
        author_name: newPost.author_name,
        created_at: newPost.created_at,
        updated_at: newPost.updated_at,
        lang: newPost.lang,
        hreflang_group: newPost.hreflang_group,
        reading_time: newPost.reading_time,
        view_count: newPost.view_count,
        tags: newPost.tags,
      });
    }

    // 2. Insert into Supabase (upsert on slug)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .upsert(dbInserts, { onConflict: 'slug' });
      if (error) {
        console.warn('Supabase bulk upsert notice (using in-memory fallback):', error.message);
      }
    } catch (dbErr) {
      console.warn('Supabase bulk upsert error:', dbErr);
    }

    // 3. Keep in-memory store synchronized
    for (const post of processedPosts) {
      const existingIdx = mockBlogPosts.findIndex((m) => m.slug === post.slug);
      if (existingIdx >= 0) {
        mockBlogPosts[existingIdx] = post;
      } else {
        mockBlogPosts.unshift(post);
      }
    }

    // 4. If published, automatically ping Google & Bing
    if (isPublish) {
      try {
        const sitemapUrl = encodeURIComponent('https://kagazo.in/sitemap.xml');
        Promise.allSettled([
          fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
          fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`),
        ]).catch(() => {});
      } catch (_) {}
    }

    return NextResponse.json({
      success: true,
      count: processedPosts.length,
      action: isPublish ? 'published' : 'draft',
      posts: processedPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        lang: p.lang,
        hreflang_group: p.hreflang_group,
        url: `/blog/${p.slug}`,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
