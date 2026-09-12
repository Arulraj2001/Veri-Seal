import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { mockBlogPosts as initialBlogPosts, BlogPost } from '@/lib/blog-store';

let mockBlogPosts: BlogPost[] = [...initialBlogPosts];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const filter = searchParams.get('filter') || 'all';

    if (id) {
      const post = mockBlogPosts.find((p) => p.id === id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    let list = [...mockBlogPosts];
    if (filter === 'published') {
      list = list.filter((p) => p.published);
    } else if (filter === 'draft') {
      list = list.filter((p) => !p.published);
    }

    return NextResponse.json({ posts: list });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
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
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();

    if (id) {
      // Update existing
      const existing = mockBlogPosts.find((p) => p.id === id);
      if (!existing) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      existing.title = title;
      existing.slug = slug;
      existing.excerpt = excerpt || '';
      existing.content = content || '';
      existing.meta_description = meta_description || '';
      existing.meta_keywords = meta_keywords || '';
      existing.featured_image_url = featured_image_url || '';
      if (category) existing.category = category;
      existing.published = Boolean(published);
      if (published && !existing.published_at) {
        existing.published_at = nowIso;
      }
      existing.author_name = author_name || 'Kagazo Team';
      existing.updated_at = nowIso;

      // Sync to Supabase
      try {
        await supabase.from('blog_posts').update({
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt,
          content: existing.content,
          meta_description: existing.meta_description,
          meta_keywords: existing.meta_keywords,
          featured_image_url: existing.featured_image_url,
          category: existing.category,
          published: existing.published,
          published_at: existing.published_at,
          author_name: existing.author_name,
          updated_at: existing.updated_at,
        }).eq('slug', existing.slug);
      } catch (_) {}

      // Ping search engines if published
      if (published) {
        const sitemapUrl = encodeURIComponent('https://kagazo.in/sitemap.xml');
        Promise.allSettled([
          fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
          fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`),
        ]).catch(() => {});
      }

      return NextResponse.json({ success: true, post: existing });
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title,
        slug,
        excerpt: excerpt || '',
        content: content || '',
        meta_description: meta_description || '',
        meta_keywords: meta_keywords || '',
        featured_image_url: featured_image_url || '',
        category: category || 'Guides & Tutorials',
        published: Boolean(published),
        published_at: published ? nowIso : null,
        author_name: author_name || 'Kagazo Team',
        created_at: nowIso,
        updated_at: nowIso,
      };

      mockBlogPosts.unshift(newPost);

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
        }, { onConflict: 'slug' });
      } catch (_) {}

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
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    mockBlogPosts = mockBlogPosts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
