import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { incrementBlogView } from '@/lib/blog-store';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const slug = body.slug;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'No slug provided' }, { status: 400 });
    }

    // Call Supabase RPC increment_view_count with fallback
    let updatedCount: number | undefined;
    try {
      const { error } = await supabase.rpc('increment_view_count', {
        post_slug: slug,
      });

      if (!error) {
        const { data } = await supabase
          .from('blog_posts')
          .select('view_count')
          .eq('slug', slug)
          .single();
        if (data && typeof data.view_count === 'number') {
          updatedCount = data.view_count;
        }
      } else {
        // Fallback to in-memory store
        updatedCount = await incrementBlogView(slug);
      }
    } catch (dbErr) {
      updatedCount = await incrementBlogView(slug);
    }

    return NextResponse.json({
      success: true,
      slug,
      view_count: updatedCount,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'No slug provided' }, { status: 400 });
    }

    const updatedCount = await incrementBlogView(slug);
    return NextResponse.json({
      success: true,
      slug,
      view_count: updatedCount,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
