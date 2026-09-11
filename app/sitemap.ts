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
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/tools/pdf-compressor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress-pdf-to-200kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress-pdf-to-100kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress-pdf-to-300kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/compress-pdf-to-500kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/tnpsc-pdf-compressor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/upsc-pdf-compressor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/ssc-pdf-compressor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/government-exam-pdf-compressor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/tnpsc-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/upsc-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/ssc-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/neet-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/ibps-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/image-to-pdf-200kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/image-to-pdf-300kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress-image-to-20kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/compress-image-to-50kb`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/pdf-to-image`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/unlock-pdf`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/mask-aadhaar`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/rrb-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/gate-photo-signature-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/merge-marksheets-pdf`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/passport-photo-sheet-maker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/clean-document-scanner`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/signature-cleaner-extractor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/thumb-impression-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/driving-license-card-merger`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/photo-signature-joiner`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/batch-photo-resizer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/pvc-id-card-maker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/self-attest-pdf`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/specifications`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/home-cost/electricity-bill-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/ac-cost-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/appliance-replacement`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/appliance-cost`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/solar-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/inverter-battery-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/water-tank-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/geyser-cost-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/renovation-cost`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/construction-materials`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/lpg-vs-induction`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/home-cost/rent-vs-buy`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/business-os/daily-profit-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/real-profit-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/product-pricing-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/discount-profit-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/break-even-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/sales-target-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/cash-flow-survival-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/delivery-profit-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/quote-generator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/payment-follow-up`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/order-manager`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/inventory-profit-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/cash-calendar`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/reconciliation`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/employee-cost-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/minimum-order-calculator`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/business-os/ai-advisor`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // Vehicle Decision & Ownership Intelligence Suite (Vehicle OS)
    {
      url: `${baseUrl}/vehicle-os`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/vehicle-os/dashboard`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/vehicle-os/service-quote-fairness`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/vehicle-os/service-invoice-analyzer`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/vehicle-os/cost-reality-checker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/vehicle-os/tyre-replacement`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/vehicle-os/battery-replacement`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/vehicle-os/compare`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/vehicle-os/ev-vs-petrol`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/vehicle-os/mileage-anomaly-tracker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/affordability-checker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/trip-true-cost`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/own-vs-cab`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/depreciation-resale`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/repair-or-replace`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/bike-vs-scooter`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/ev-home-charging`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/home-charger-guide`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/vehicle-os/emergency-cost-planner`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
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
