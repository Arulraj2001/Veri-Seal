import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const INDEXNOW_KEY = 'kagazo2026indexnow';
const SITE_URL = 'https://kagazo.in';

const STATIC_URLS = [
  // Core pages
  '/',
  '/about',
  '/how-it-works',
  '/contact',
  '/privacy',
  '/blog',
  '/tools',
  '/tools/specifications',
  '/vehicle-os',
  '/home-cost',
  '/business-os',

  // SEO landing pages
  '/verify-aadhaar-pdf',
  '/verify-community-certificate-tamil-nadu',
  '/verify-nativity-certificate-tamil-nadu',
  '/verify-income-certificate',
  '/verify-pan-card-pdf',
  '/verify-digilocker-pdf',
  '/verify-epfo-uan-card',
  '/verify-itr-acknowledgement',

  // Tools — PDF
  '/tools/pdf-compressor',
  '/tools/compress-pdf-to-100kb',
  '/tools/compress-pdf-to-200kb',
  '/tools/compress-pdf-to-300kb',
  '/tools/compress-pdf-to-500kb',
  '/tools/tnpsc-pdf-compressor',
  '/tools/upsc-pdf-compressor',
  '/tools/ssc-pdf-compressor',
  '/tools/government-exam-pdf-compressor',
  '/tools/tn-marksheet-compressor',
  '/tools/compress-image-to-20kb',
  '/tools/compress-image-to-50kb',
  '/tools/compress-for-whatsapp',
  '/tools/image-to-pdf-200kb',
  '/tools/image-to-pdf-300kb',
  '/tools/pdf-to-image',
  '/tools/unlock-pdf',
  '/tools/merge-marksheets-pdf',
  '/tools/self-attest-pdf',
  '/tools/driving-license-card-merger',

  // Tools — Aadhaar & KYC
  '/tools/mask-aadhaar',
  '/tools/aadhaar-front-back-pdf',
  '/tools/aadhaar-pan-kyc-merge',
  '/tools/pvc-id-card-maker',
  '/tools/a4-multi-card-sheet',

  // Tools — Photo & Signature
  '/tools/tnpsc-photo-signature-resizer',
  '/tools/upsc-photo-signature-resizer',
  '/tools/ssc-photo-signature-resizer',
  '/tools/neet-photo-signature-resizer',
  '/tools/ibps-photo-signature-resizer',
  '/tools/rrb-photo-signature-resizer',
  '/tools/gate-photo-signature-resizer',
  '/tools/passport-photo-sheet-maker',
  '/tools/stamp-size-photo-maker',
  '/tools/photo-date-name-stamper',
  '/tools/photo-signature-joiner',
  '/tools/batch-photo-resizer',
  '/tools/biometric-face-aligner',
  '/tools/clean-document-scanner',
  '/tools/signature-cleaner-extractor',
  '/tools/thumb-impression-resizer',
  '/tools/handwritten-declaration-scanner',
  '/tools/formal-attire-changer',
  '/tools/college-admission-photo-maker',

  // Tools — TN Specific
  '/tools/tn-esevai-certificate-prep',
  '/tools/tnpsc-otr-compliance-kit',
  '/tools/tnea-cutoff-calculator',
  '/tools/pstm-certificate-generator',

  // Tools — Document Generators
  '/tools/affidavit-generator',
  '/tools/salary-slip-generator',
  '/tools/free-ats-resume-builder',

  // Tools — Financial & Verification
  '/tools/income-tax-calculator-2025-26',
  '/tools/gst-verifier',
  '/tools/gst-number-verifier',
  '/tools/ifsc-code-finder',

  // Vehicle OS
  '/vehicle-os/dashboard',
  '/vehicle-os/cost-reality-checker',
  '/vehicle-os/service-quote-fairness',
  '/vehicle-os/service-invoice-analyzer',
  '/vehicle-os/tyre-replacement',
  '/vehicle-os/battery-replacement',
  '/vehicle-os/compare',
  '/vehicle-os/ev-vs-petrol',
  '/vehicle-os/mileage-anomaly-tracker',
  '/vehicle-os/affordability-checker',
  '/vehicle-os/trip-true-cost',
  '/vehicle-os/own-vs-cab',
  '/vehicle-os/depreciation-resale',
  '/vehicle-os/repair-or-replace',
  '/vehicle-os/bike-vs-scooter',
  '/vehicle-os/ev-home-charging',
  '/vehicle-os/home-charger-guide',
  '/vehicle-os/emergency-cost-planner',

  // Home Cost
  '/home-cost/electricity-bill-calculator',
  '/home-cost/ac-cost-calculator',
  '/home-cost/solar-calculator',
  '/home-cost/inverter-battery-calculator',
  '/home-cost/appliance-cost',
  '/home-cost/appliance-replacement',
  '/home-cost/geyser-cost-calculator',
  '/home-cost/lpg-vs-induction',
  '/home-cost/water-tank-calculator',
  '/home-cost/construction-materials',
  '/home-cost/renovation-cost',
  '/home-cost/rent-vs-buy',

  // Business OS
  '/business-os/daily-profit-calculator',
  '/business-os/real-profit-calculator',
  '/business-os/product-pricing-calculator',
  '/business-os/break-even-calculator',
  '/business-os/discount-profit-calculator',
  '/business-os/sales-target-calculator',
  '/business-os/cash-flow-survival-calculator',
  '/business-os/delivery-profit-calculator',
  '/business-os/inventory-profit-calculator',
  '/business-os/minimum-order-calculator',
  '/business-os/employee-cost-calculator',
  '/business-os/quote-generator',
  '/business-os/order-manager',
  '/business-os/payment-follow-up',
  '/business-os/cash-calendar',
  '/business-os/reconciliation',
  '/business-os/ai-advisor',

  // Blog posts currently live
  '/blog/fix-yellow-question-mark-aadhaar-pdf',
  '/blog/verify-tamil-nadu-community-nativity-certificate',
  '/blog/verify-pan-card-form-16-digital-signature',
  '/blog/verify-digilocker-digital-signature-driving-license-rc',
  '/blog/fix-aadhaar-pdf-yellow-question-mark',
  '/blog/verify-community-certificate-tamil-nadu',
  '/blog/tnpsc-otr-document-requirements-2026',
  '/blog/what-is-cca-india-digital-signature',
  '/blog/digilocker-pdf-signature-not-verified-fix',
  '/blog/gstin-verification-online-free',
  '/blog/community-certificate-signature-not-verified-free-fix-how-to-2026-tamil',
  '/blog/community-certificate-signature-not-verified-fix',
  '/blog/tnpsc-otr-photo-size-requirements-2026',
  '/blog/tnpsc-otr-photo-size-requirements-2026-tamil',
  '/blog/tnpsc-otr-photo-size-requirements-2026-hindi',
];

async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: 'kagazo.in',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u}`)),
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return res.status;
}

// POST — submit specific URLs
// Called automatically after new blog post published
export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 });
    }

    const status = await submitToIndexNow(urls);

    return NextResponse.json({
      success: true,
      status,
      submitted: urls.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

// GET — submit ALL site URLs
// Called by cron job every Monday
// Or manually by admin
export async function GET() {
  try {
    // Start with static URLs
    const allUrls = [...STATIC_URLS];

    // Add dynamic blog posts from Supabase
    try {
      let blogPosts: { slug: string }[] | null = null;
      // First try status column as in spec, then fallback to published boolean if schema differs
      const { data: byStatus } = await supabaseAdmin
        .from('blog_posts')
        .select('slug')
        .eq('status', 'published');

      if (byStatus && byStatus.length > 0) {
        blogPosts = byStatus;
      } else {
        const { data: byPublished } = await supabaseAdmin
          .from('blog_posts')
          .select('slug')
          .eq('published', true);
        if (byPublished) {
          blogPosts = byPublished;
        }
      }

      if (blogPosts) {
        for (const post of blogPosts) {
          const blogUrl = `/blog/${post.slug}`;
          if (!allUrls.includes(blogUrl)) {
            allUrls.push(blogUrl);
          }
        }
      }
    } catch {
      // Supabase failed — continue with static list
    }

    // Remove duplicates
    const uniqueUrls = Array.from(new Set(allUrls));

    // Submit in batches of 100
    const batches: string[][] = [];
    for (let i = 0; i < uniqueUrls.length; i += 100) {
      batches.push(uniqueUrls.slice(i, i + 100));
    }

    const results = [];
    for (const batch of batches) {
      const status = await submitToIndexNow(batch);
      results.push({
        count: batch.length,
        status,
      });
    }

    return NextResponse.json({
      success: true,
      total_urls: uniqueUrls.length,
      batches: results.length,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: 'IndexNow failed' }, { status: 500 });
  }
}
