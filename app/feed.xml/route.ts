import { NextResponse } from 'next/server';
import { getPublishedSeoPages } from '@/lib/seo-store';
import { getPublishedBlogPosts } from '@/lib/blog-store';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600; // 1 hour ISR for rapid Googlebot discovery

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = SITE_URL;
  const now = new Date();
  const buildDate = now.toUTCString();

  const [seoPages, blogPosts] = await Promise.all([
    getPublishedSeoPages(),
    getPublishedBlogPosts(),
  ]);

  const items: string[] = [];

  // 1. Add 24 Government Document Verification SEO Pages
  for (const page of seoPages) {
    const pageUrl = `${baseUrl}/${page.slug}`;
    const pubDate = page.updated_at
      ? new Date(page.updated_at).toUTCString()
      : buildDate;

    items.push(`
    <item>
      <title>${escapeXml(page.title)}</title>
      <link>${pageUrl}</link>
      <guid isPermaLink="true">${pageUrl}</guid>
      <description>${escapeXml(page.meta_description)}</description>
      <category>Document Verification</category>
      <pubDate>${pubDate}</pubDate>
    </item>`);
  }

  // 2. Add Core Tools
  const coreTools = [
    {
      title: 'Kagazo Tools — 56+ Free Citizen & Student Utilities',
      slug: 'tools',
      desc: 'Free PDF compressors, photo signature resizers for TNPSC, UPSC, and Indian government document tools.',
    },
    {
      title: 'Free PDF Compressor to 100KB / 200KB / 500KB Online',
      slug: 'tools/pdf-compressor',
      desc: 'Compress Indian government exam PDFs to 100KB, 200KB, or 500KB with zero quality loss.',
    },
    {
      title: 'Mask Aadhaar PDF Online — First 8 Digits Redaction',
      slug: 'tools/mask-aadhaar',
      desc: 'Instantly mask the first 8 digits of your Aadhaar card for RBI, KYC, and hotel check-in compliance.',
    },
    {
      title: 'TNPSC Photo & Signature Resizer Online',
      slug: 'tools/tnpsc-photo-signature-resizer',
      desc: 'Automatically resize photos and signatures to exact TNPSC OTR dimensions (20KB - 50KB).',
    },
  ];

  for (const tool of coreTools) {
    const toolUrl = `${baseUrl}/${tool.slug}`;
    items.push(`
    <item>
      <title>${escapeXml(tool.title)}</title>
      <link>${toolUrl}</link>
      <guid isPermaLink="true">${toolUrl}</guid>
      <description>${escapeXml(tool.desc)}</description>
      <category>Tools &amp; Utilities</category>
      <pubDate>${buildDate}</pubDate>
    </item>`);
  }

  // 3. Add Published Blog Posts
  for (const post of blogPosts) {
    const blogUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = post.published_at || post.created_at
      ? new Date(post.published_at || post.created_at).toUTCString()
      : buildDate;

    items.push(`
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${blogUrl}</link>
      <guid isPermaLink="true">${blogUrl}</guid>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <category>Guides &amp; Articles</category>
      <pubDate>${pubDate}</pubDate>
    </item>`);
  }

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kagazo &#8212; Indian Government Document Verification &amp; Utility Engine</title>
    <link>${baseUrl}</link>
    <description>Instant CCA India cryptographic signature verification, PDF utilities, and compliance tools for Indian citizens, students, and businesses.</description>
    <language>en-IN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.join('\n')}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
