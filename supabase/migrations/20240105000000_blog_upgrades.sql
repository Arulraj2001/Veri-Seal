-- Kagazo Blog System Upgrade Migration
-- Adds multilingual hreflang_group, lang, view counts, reading time, tags, categories, and view counting RPC

-- 1. Add new columns to blog_posts
ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS hreflang_group TEXT;

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'en';

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Kagazo Team';

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS reading_time INTEGER;

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';

-- 2. Indexes for efficient lookup
CREATE INDEX IF NOT EXISTS idx_blog_posts_hreflang ON blog_posts(hreflang_group);
CREATE INDEX IF NOT EXISTS idx_blog_posts_lang ON blog_posts(lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count DESC);

-- 3. View count increment RPC function
CREATE OR REPLACE FUNCTION increment_view_count(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read policy for blog-images
DROP POLICY IF EXISTS "Public Read Blog Images" ON storage.objects;
CREATE POLICY "Public Read Blog Images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

-- Upload policy for blog-images
DROP POLICY IF EXISTS "Allow Upload Blog Images" ON storage.objects;
CREATE POLICY "Allow Upload Blog Images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');
