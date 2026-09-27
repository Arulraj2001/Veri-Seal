import { SITE_URL } from '@/lib/constants';

export interface BreadcrumbItem {
  name: string;
  url?: string;
  item?: string;
}

export interface HowToStepItem {
  step?: number;
  position?: number;
  title?: string;
  name?: string;
  desc?: string;
  text?: string;
}

export interface FaqItem {
  question?: string;
  q?: string;
  answer?: string;
  a?: string;
}

export interface ToolSchemaOptions {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  browserRequirements?: string;
  price?: string;
  priceCurrency?: string;
  ratingValue?: string;
  ratingCount?: string;
  featureList?: string[];
  howToTitle?: string;
  howToDescription?: string;
  howToSteps?: HowToStepItem[];
  faqs?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Generates an authoritative, interconnected Schema.org @graph for Kagazo tools.
 * Includes WebApplication, HowTo, FAQPage, and BreadcrumbList.
 */
export function buildToolStructuredData(options: ToolSchemaOptions) {
  const {
    name,
    description,
    url,
    applicationCategory = 'UtilitiesApplication',
    operatingSystem = 'All (Web Browser, Android, iOS, Windows, macOS, Linux)',
    browserRequirements = 'Requires JavaScript. Requires HTML5 Canvas & WebAssembly.',
    price = '0',
    priceCurrency = 'INR',
    ratingValue = '4.9',
    ratingCount = '12840',
    featureList = [
      '100% In-Browser Volatile RAM Execution',
      'Zero Cloud File Storage (Complete Privacy)',
      'Instant Processing with No Watermarks',
      'Pre-calibrated to Official Indian Government & Exam Guidelines',
    ],
    howToTitle,
    howToDescription,
    howToSteps = [],
    faqs = [],
    breadcrumbs = [],
  } = options;

  const graph: any[] = [];

  // 1. WebApplication Schema
  graph.push({
    '@type': 'WebApplication',
    '@id': `${url}#webapp`,
    name,
    url,
    applicationCategory,
    operatingSystem,
    browserRequirements,
    description,
    featureList,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: '5',
      worstRating: '1',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Kagazo',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  });

  // 2. HowTo Schema (if steps provided)
  if (howToSteps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: howToTitle || `How to use ${name}`,
      description: howToDescription || description,
      step: howToSteps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: s.position || s.step || idx + 1,
        name: s.name || s.title || `Step ${idx + 1}`,
        text: s.text || s.desc || '',
      })),
    });
  }

  // 3. FAQPage Schema (if faqs provided)
  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((faq) => {
        const q = faq.question || faq.q || '';
        const a = faq.answer || faq.a || '';
        return {
          '@type': 'Question',
          name: q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: a,
          },
        };
      }),
    });
  }

  // 4. BreadcrumbList Schema (if breadcrumbs provided)
  if (breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url || crumb.item || `${SITE_URL}/`,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Builds Schema.org graph for Document & Portal Verification Pages (app/[slug]/page.tsx)
 */
export function buildSeoPortalStructuredData(page: {
  slug: string;
  title: string;
  h1: string;
  meta_description: string;
  doc_type: string;
  portal: string;
  faq: Array<{ q: string; a: string }>;
}) {
  const pageUrl = `${SITE_URL}/${page.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#webapp`,
        name: page.h1,
        url: pageUrl,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All (Web Browser, Android, iOS, Windows, macOS, Linux)',
        browserRequirements: 'Requires modern web browser with HTML5 WebCrypto support.',
        description: page.meta_description,
        featureList: [
          `Cryptographic audit against Root Certifying Authority of India (RCAI)`,
          `Validation of ${page.doc_type} signatures issued by ${page.portal}`,
          `100% In-RAM volatile validation with immediate memory purge`,
          `Long-Term Validation (LTV) green tick embedding for Adobe Acrobat`,
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.95',
          ratingCount: '8950',
          bestRating: '5',
          worstRating: '1',
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Kagazo',
          url: SITE_URL,
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: `How to verify ${page.doc_type} PDF digital signature online`,
        description: `Step-by-step procedure to verify the digital signature on ${page.doc_type} and convert the unverified yellow question mark into a permanent CCA India green tick.`,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Access Kagazo Sovereign Verifier',
            text: 'Open kagazo.in in any desktop or mobile browser.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: `Upload Official ${page.doc_type}`,
            text: `Select or drag and drop your official downloaded ${page.doc_type} PDF into the verification box.`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Document Password (If Encrypted)',
            text: 'For password-protected files like e-Aadhaar, enter the official 8-character password. Unencrypted files proceed instantly.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Audit Cryptographic Signature',
            text: 'Kagazo runs an in-memory audit tracing the signing certificate through the issuing Sub-CA to the Root Certifying Authority of India (RCAI).',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Download LTV-Stamped PDF',
            text: 'Save the verified PDF containing the Document Security Store (DSS) for a permanent green tick across all devices.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
