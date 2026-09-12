import { TOOLS_CATALOG, ToolItem } from './tools-data';

export interface RelatedTool {
  title: string;
  slug: string;
  description: string;
  category: string;
  badge?: string;
  authorityLogo?: string;
}

export const CANONICAL_SLUG_MAP: Record<string, string> = {
  '/tools/ibps-bank-photo-signature-resizer': '/tools/ibps-photo-signature-resizer',
  '/tools/marksheet-pdf-merger': '/tools/merge-marksheets-pdf',
  '/tools/bilingual-affidavit-generator': '/tools/affidavit-generator',
  '/tools/income-tax-fy25-calculator': '/tools/income-tax-calculator-2025-26',
  '/tools/ats-resume-builder': '/tools/free-ats-resume-builder',
  '/tools/pdf-password-remover': '/tools/unlock-pdf',
  '/tools/aadhaar-masker': '/tools/mask-aadhaar',
  '/tools/ifsc-finder': '/tools/ifsc-code-finder',
};

export const RELATED_TOOLS_MAP: Record<string, string[]> = {
  'gst-verifier': [
    '/tools/income-tax-calculator-2025-26',
    '/tools/salary-slip-generator',
    '/tools/ifsc-code-finder',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'gst-number-verifier': [
    '/tools/income-tax-calculator-2025-26',
    '/tools/salary-slip-generator',
    '/tools/ifsc-code-finder',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'ssc-photo-signature-resizer': [
    '/tools/upsc-photo-signature-resizer',
    '/tools/ibps-photo-signature-resizer',
    '/tools/tnpsc-photo-signature-resizer',
    '/tools/merge-marksheets-pdf',
  ],
  'upsc-photo-signature-resizer': [
    '/tools/ssc-photo-signature-resizer',
    '/tools/compress-pdf-to-200kb',
    '/tools/merge-marksheets-pdf',
    '/tools/free-ats-resume-builder',
  ],
  'tnpsc-photo-signature-resizer': [
    '/tools/tnpsc-otr-compliance-kit',
    '/tools/pstm-certificate-generator',
    '/tools/compress-pdf-to-200kb',
    '/tools/community-certificate-compressor',
  ],
  'ibps-photo-signature-resizer': [
    '/tools/handwritten-declaration-scanner',
    '/tools/ifsc-code-finder',
    '/tools/ssc-photo-signature-resizer',
    '/tools/merge-marksheets-pdf',
  ],
  'ibps-bank-photo-signature-resizer': [
    '/tools/handwritten-declaration-scanner',
    '/tools/ifsc-code-finder',
    '/tools/ssc-photo-signature-resizer',
    '/tools/merge-marksheets-pdf',
  ],
  'merge-marksheets-pdf': [
    '/tools/compress-pdf-to-200kb',
    '/tools/unlock-pdf',
    '/tools/ssc-photo-signature-resizer',
    '/tools/tnpsc-otr-compliance-kit',
  ],
  'marksheet-pdf-merger': [
    '/tools/compress-pdf-to-200kb',
    '/tools/unlock-pdf',
    '/tools/ssc-photo-signature-resizer',
    '/tools/tnpsc-otr-compliance-kit',
  ],
  'aadhaar-pan-kyc-merge': [
    '/tools/mask-aadhaar',
    '/tools/digital-signature-verifier',
    '/tools/ifsc-code-finder',
    '/tools/affidavit-generator',
  ],
  'affidavit-generator': [
    '/tools/aadhaar-pan-kyc-merge',
    '/tools/salary-slip-generator',
    '/tools/marriage-biodata-maker',
    '/tools/unlock-pdf',
  ],
  'bilingual-affidavit-generator': [
    '/tools/aadhaar-pan-kyc-merge',
    '/tools/salary-slip-generator',
    '/tools/marriage-biodata-maker',
    '/tools/unlock-pdf',
  ],
  'income-tax-calculator-2025-26': [
    '/tools/salary-slip-generator',
    '/tools/gst-verifier',
    '/tools/ifsc-code-finder',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'income-tax-fy25-calculator': [
    '/tools/salary-slip-generator',
    '/tools/gst-verifier',
    '/tools/ifsc-code-finder',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'salary-slip-generator': [
    '/tools/income-tax-calculator-2025-26',
    '/tools/free-ats-resume-builder',
    '/tools/gst-verifier',
    '/tools/affidavit-generator',
  ],
  'free-ats-resume-builder': [
    '/tools/salary-slip-generator',
    '/tools/merge-marksheets-pdf',
    '/tools/upsc-photo-signature-resizer',
    '/tools/compress-pdf-to-200kb',
  ],
  'ats-resume-builder': [
    '/tools/salary-slip-generator',
    '/tools/merge-marksheets-pdf',
    '/tools/upsc-photo-signature-resizer',
    '/tools/compress-pdf-to-200kb',
  ],
  'tnpsc-otr-compliance-kit': [
    '/tools/tnpsc-photo-signature-resizer',
    '/tools/pstm-certificate-generator',
    '/tools/compress-pdf-to-200kb',
    '/tools/merge-marksheets-pdf',
  ],
  'unlock-pdf': [
    '/tools/merge-marksheets-pdf',
    '/tools/mask-aadhaar',
    '/tools/compress-pdf-to-200kb',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'pdf-password-remover': [
    '/tools/merge-marksheets-pdf',
    '/tools/mask-aadhaar',
    '/tools/compress-pdf-to-200kb',
    '/tools/aadhaar-pan-kyc-merge',
  ],
  'mask-aadhaar': [
    '/tools/aadhaar-pan-kyc-merge',
    '/tools/digital-signature-verifier',
    '/tools/unlock-pdf',
    '/tools/affidavit-generator',
  ],
  'aadhaar-masker': [
    '/tools/aadhaar-pan-kyc-merge',
    '/tools/digital-signature-verifier',
    '/tools/unlock-pdf',
    '/tools/affidavit-generator',
  ],
};

export function getRelatedTools(currentSlugOrId: string): RelatedTool[] {
  // Normalize slug or id: e.g. "/tools/gst-verifier" or "gst-verifier"
  let cleanKey = currentSlugOrId.replace(/^\/tools\//, '').replace(/^\//, '');
  let fullSlug = currentSlugOrId.startsWith('/tools/')
    ? currentSlugOrId
    : `/tools/${cleanKey}`;

  // Check if there is a canonical slug
  if (CANONICAL_SLUG_MAP[fullSlug]) {
    fullSlug = CANONICAL_SLUG_MAP[fullSlug];
    cleanKey = fullSlug.replace(/^\/tools\//, '');
  }

  const explicitMappedSlugs = RELATED_TOOLS_MAP[cleanKey];

  if (explicitMappedSlugs && explicitMappedSlugs.length > 0) {
    const results: RelatedTool[] = [];
    for (let targetSlug of explicitMappedSlugs) {
      if (CANONICAL_SLUG_MAP[targetSlug]) {
        targetSlug = CANONICAL_SLUG_MAP[targetSlug];
      }
      const match = TOOLS_CATALOG.find((t) => t.slug === targetSlug);
      if (match) {
        results.push({
          title: match.name,
          slug: match.slug,
          description: match.shortDesc,
          category: match.categoryLabel,
          badge: match.badge,
          authorityLogo: match.authorityLogo,
        });
      }
    }
    if (results.length > 0) {
      return results;
    }
  }

  // Fallback: Find tools from the same category in TOOLS_CATALOG
  const currentTool = TOOLS_CATALOG.find(
    (t) => t.slug === fullSlug || t.id === cleanKey
  );

  if (currentTool) {
    const sameCategory = TOOLS_CATALOG.filter(
      (t) => t.slug !== currentTool.slug && t.category === currentTool.category
    ).slice(0, 4);

    if (sameCategory.length >= 3) {
      return sameCategory.map((t) => ({
        title: t.name,
        slug: t.slug,
        description: t.shortDesc,
        category: t.categoryLabel,
        badge: t.badge,
        authorityLogo: t.authorityLogo,
      }));
    }
  }

  // Universal top popular fallback
  return TOOLS_CATALOG.filter((t) => t.slug !== fullSlug)
    .slice(0, 4)
    .map((t) => ({
      title: t.name,
      slug: t.slug,
      description: t.shortDesc,
      category: t.categoryLabel,
      badge: t.badge,
      authorityLogo: t.authorityLogo,
    }));
}
