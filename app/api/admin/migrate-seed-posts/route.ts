import { supabaseAdmin } from '@/lib/supabase';
import { mockBlogPosts } from '@/lib/blog-store';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Security: only allow from admin
  const authHeader = req.headers.get('authorization');
  const migrationSecret = process.env.MIGRATION_SECRET || 'kagazo_migrate_2026';
  
  if (authHeader !== `Bearer ${migrationSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  const postsToMigrate = mockBlogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    meta_description: post.meta_description || '',
    meta_keywords: post.meta_keywords || '',
    featured_image_url: post.featured_image_url || '',
    published: Boolean(post.published),
    published_at: post.published
      ? new Date((post as any).date || post.published_at || Date.now()).toISOString()
      : null,
    lang: post.lang || 'en',
    hreflang_group: post.hreflang_group || post.slug,
    author_name: post.author_name || 'Kagazo Team',
    reading_time: post.reading_time || 5,
    view_count: post.view_count || 0,
    tags: post.tags || [],
    category: post.category || 'General',
    created_at: post.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .upsert(postsToMigrate, { 
      onConflict: 'slug' 
    })
    .select();

  if (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }

  return NextResponse.json({ 
    success: true,
    migrated: postsToMigrate.length,
    posts: postsToMigrate.map((p) => p.slug),
    count: data ? data.length : postsToMigrate.length
  });
}
