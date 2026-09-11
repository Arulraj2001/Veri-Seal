import { MetadataRoute } from 'next';
import { getPublishedBlogPosts } from '@/lib/blog-store';
import { getPublishedSeoPages } from '@/lib/seo-store';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 86400; // 24 hours daily revalidation

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date();

  // Core static routes - crawled daily
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.4,
    },
  ];

  // Dynamic published blog posts - auto-crawled daily
  const blogPosts = await getPublishedBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : now,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Dynamic published SEO landing pages - auto-crawled daily
  const seoPages = await getPublishedSeoPages();
  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...seoRoutes, ...blogRoutes];
}
