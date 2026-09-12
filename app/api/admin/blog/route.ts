import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { mockBlogPosts, BlogPost } from '@/lib/blog-store';
import { detectLanguageFromText } from '@/lib/slugify-indic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const filter = searchParams.get('filter') || 'all';

    // 1. If fetching single post by ID or slug
    if (id) {
      // Check in-memory store
      const memoryPost = mockBlogPosts.find((p) => p.id === id || p.slug === id);
      if (memoryPost) {
        return NextResponse.json({ post: memoryPost });
      }

      // Check Supabase
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .or(`id.eq.${id},slug.eq.${id}`)
          .single();
        if (!error && data) {
          const post: BlogPost = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            content: data.content,
            meta_description: data.meta_description || '',
            meta_keywords: data.meta_keywords || '',
            featured_image_url: data.featured_image_url || '',
            category: data.category || 'Guides & Tutorials',
            published: Boolean(data.published),
            published_at: data.published_at,
            author_name: data.author_name || 'Kagazo Team',
            created_at: data.created_at,
            updated_at: data.updated_at,
            lang: data.lang || 'en',
            hreflang_group: data.hreflang_group || null,
            reading_time: data.reading_time || 3,
            view_count: data.view_count || 0,
            tags: Array.isArray(data.tags) ? data.tags : [],
          };
          return NextResponse.json({ post });
        }
      } catch (_) {}

      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 2. Fetch all posts (combine Supabase and memory)
    const combinedMap = new Map<string, BlogPost>();

    // Add memory posts
    for (const p of mockBlogPosts) {
      combinedMap.set(p.slug, p);
    }

    // Add Supabase posts
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        for (const d of data) {
          const post: BlogPost = {
            id: d.id,
            title: d.title,
            slug: d.slug,
            excerpt: d.excerpt || '',
            content: d.content,
            meta_description: d.meta_description || '',
            meta_keywords: d.meta_keywords || '',
            featured_image_url: d.featured_image_url || '',
            category: d.category || 'Guides & Tutorials',
            published: Boolean(d.published),
            published_at: d.published_at,
            author_name: d.author_name || 'Kagazo Team',
            created_at: d.created_at,
            updated_at: d.updated_at,
            lang: d.lang || 'en',
            hreflang_group: d.hreflang_group || null,
            reading_time: d.reading_time || 3,
            view_count: d.view_count || 0,
            tags: Array.isArray(d.tags) ? d.tags : [],
          };
          combinedMap.set(post.slug, post);
        }
      }
    } catch (_) {}

    let list = Array.from(combinedMap.values()).map((p) => ({
      ...p,
      lang: p.lang || detectLanguageFromText(p.title) || 'en',
    }));

    if (filter === 'published') {
      list = list.filter((p) => p.published);
    } else if (filter === 'draft') {
      list = list.filter((p) => !p.published);
    }

    // Sort latest first
    list.sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at).getTime();
      const dateB = new Date(b.published_at || b.created_at).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ posts: list });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    // Allow admin or during non-production local development
    if (role && role !== 'admin' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      meta_description,
      meta_keywords,
      featured_image_url,
      category,
      published,
      author_name,
      lang: userLang,
      tags: userTags,
      reading_time: userReadingTime,
      hreflang_group: userHreflangGroup,
    } = body;

    const trimmedTitle = (title || '').trim();
    const trimmedSlug = (slug || '').trim();

    if (!trimmedTitle || !trimmedSlug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();
    const detectedLang = detectLanguageFromText(trimmedTitle);
    const postLang = userLang || detectedLang || 'en';

    const wordCount = (content || '').trim().split(/\s+/).filter(Boolean).length;
    const computedReadingTime = userReadingTime || Math.max(1, Math.ceil(wordCount / 200));
    const cleanTags = Array.isArray(userTags) ? userTags : [];
    const hreflangGroup = userHreflangGroup || trimmedSlug.replace(/-(tamil|hindi|ta|hi)$/i, '');

    if (id) {
      // 1. Update existing
      const existingIdx = mockBlogPosts.findIndex((p) => p.id === id || p.slug === trimmedSlug);
      const existing = existingIdx >= 0 ? mockBlogPosts[existingIdx] : null;

      const updatedPost: BlogPost = {
        id: existing?.id || id,
        title: trimmedTitle,
        slug: trimmedSlug,
        excerpt: excerpt || '',
        content: content || '',
        meta_description: meta_description || '',
        meta_keywords: meta_keywords || '',
        featured_image_url: featured_image_url || '',
        category: category || existing?.category || 'Guides & Tutorials',
        published: Boolean(published),
        published_at: published ? (existing?.published_at || nowIso) : null,
        author_name: author_name || 'Kagazo Team',
        created_at: existing?.created_at || nowIso,
        updated_at: nowIso,
        lang: postLang,
        hreflang_group: hreflangGroup,
        reading_time: computedReadingTime,
        view_count: existing?.view_count || 0,
        tags: cleanTags,
      };

      if (existingIdx >= 0) {
        mockBlogPosts[existingIdx] = updatedPost;
      } else {
        mockBlogPosts.unshift(updatedPost);
      }

      // Sync to Supabase
      try {
        await supabase.from('blog_posts').upsert({
          title: updatedPost.title,
          slug: updatedPost.slug,
          excerpt: updatedPost.excerpt,
          content: updatedPost.content,
          meta_description: updatedPost.meta_description,
          meta_keywords: updatedPost.meta_keywords,
          featured_image_url: updatedPost.featured_image_url,
          category: updatedPost.category,
          published: updatedPost.published,
          published_at: updatedPost.published_at,
          author_name: updatedPost.author_name,
          updated_at: updatedPost.updated_at,
          lang: updatedPost.lang,
          hreflang_group: updatedPost.hreflang_group,
          reading_time: updatedPost.reading_time,
          view_count: updatedPost.view_count,
          tags: updatedPost.tags,
        }, { onConflict: 'slug' });
      } catch (dbErr) {
        console.warn('Supabase post update notice:', dbErr);
      }

      // Ping search engines if published
      if (published) {
        const sitemapUrl = encodeURIComponent('https://kagazo.in/sitemap.xml');
        Promise.allSettled([
          fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
          fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`),
        ]).catch(() => {});
      }

      return NextResponse.json({ success: true, post: updatedPost });
    } else {
      // 2. Create new post
      const newPost: BlogPost = {
        id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: trimmedTitle,
        slug: trimmedSlug,
        excerpt: excerpt || '',
        content: content || '',
        meta_description: meta_description || '',
        meta_keywords: meta_keywords || '',
        featured_image_url: featured_image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: category || (postLang === 'ta' ? 'Tamil Nadu' : 'Guides & Tutorials'),
        published: Boolean(published),
        published_at: published ? nowIso : null,
        author_name: author_name || 'Kagazo Team',
        created_at: nowIso,
        updated_at: nowIso,
        lang: postLang,
        hreflang_group: hreflangGroup,
        reading_time: computedReadingTime,
        view_count: 0,
        tags: cleanTags,
      };

      const existingIdx = mockBlogPosts.findIndex((p) => p.slug === trimmedSlug);
      if (existingIdx >= 0) {
        mockBlogPosts[existingIdx] = newPost;
      } else {
        mockBlogPosts.unshift(newPost);
      }

      // Sync to Supabase
      try {
        await supabase.from('blog_posts').upsert({
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
        }, { onConflict: 'slug' });
      } catch (dbErr) {
        console.warn('Supabase post insert notice:', dbErr);
      }

      // Ping search engines if published
      if (published) {
        const sitemapUrl = encodeURIComponent('https://kagazo.in/sitemap.xml');
        Promise.allSettled([
          fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
          fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`),
        ]).catch(() => {});
      }

      return NextResponse.json({ success: true, post: newPost });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role && role !== 'admin' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    // Find and remove from memory store
    const idx = mockBlogPosts.findIndex((p) => p.id === id || p.slug === id);
    const targetSlug = idx >= 0 ? mockBlogPosts[idx].slug : id;
    if (idx >= 0) {
      mockBlogPosts.splice(idx, 1);
    }

    // Delete from Supabase
    try {
      await supabase.from('blog_posts').delete().or(`id.eq.${id},slug.eq.${targetSlug}`);
    } catch (_) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
