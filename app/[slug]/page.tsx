import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  FileCheck,
  Lock,
  Upload,
  CheckCircle2,
  Download,
  AlertTriangle,
  Building2,
  BookOpen,
} from 'lucide-react';
import {
  getPublishedSeoPages,
  getSeoPageBySlug,
  getAllSeoPageSlugs,
} from '@/lib/seo-store';
import { SITE_URL } from '@/lib/constants';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { UploadZone } from '@/components/home/UploadZone';
import { FaqAccordion } from '@/components/seo/FaqAccordion';

export const revalidate = 86400; // 24 hours ISR

interface SeoLandingPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SeoLandingPageProps): Promise<Metadata> {
  const page = await getSeoPageBySlug(params.slug);
  if (!page) {
    return {
      title: 'Document Guide Not Found — Kagazo',
    };
  }

  const pageUrl = `${SITE_URL}/${page.slug}`;
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(page.title)}&subtitle=${encodeURIComponent(page.h1)}`;

  return {
    title: page.title,
    description: page.meta_description,
    keywords: page.meta_keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url: pageUrl,
      siteName: 'Kagazo',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description,
      images: [ogImage],
    },
  };
}

export default async function SeoLandingPage({ params }: SeoLandingPageProps) {
  const page = await getSeoPageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  const allPages = await getPublishedSeoPages();
  const relatedPages = allPages.filter((p) => p.slug !== page.slug).slice(0, 4);
  const pageUrl = `${SITE_URL}/${page.slug}`;

  // 1. FAQPage Schema (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // 2. HowToStep Schema (JSON-LD)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to verify ${page.doc_type} PDF signature`,
    description: `Step-by-step instructions to verify the digital signature on ${page.doc_type} and convert unverified question marks into a permanent CCA India verified green tick.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Go to Kagazo',
        text: 'Access the free Kagazo Indian Government digital signature verification engine.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: `Upload your ${page.doc_type} PDF`,
        text: `Drag and drop your official downloaded ${page.doc_type} file into the verification zone.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Enter password if required',
        text: 'For password-protected files like e-Aadhaar, provide the 8-character password. Files without passwords proceed automatically.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Click verify',
        text: 'Initiate the cryptographic audit against the Root Certifying Authority of India (RCAI) and CCA trust chain.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Download verified copy',
        text: 'Download the LTV-stamped PDF displaying the permanent green checkmark across all PDF readers.',
      },
    ],
  };

  // 3. BreadcrumbList Schema (JSON-LD)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: page.title },
            ]}
            showHomeIcon
            className="mb-6 sm:mb-8"
          />

          {/* Hero Header Section */}
          <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{page.portal} • Official PKI Verification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main tracking-tight leading-tight mb-4">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg text-text-main/70 leading-relaxed max-w-2xl mx-auto">
              {page.intro_text}
            </p>
          </header>

          {/* Inline Verify Tool Component */}
          <div className="mb-16">
            <UploadZone />
          </div>

          {/* Section 1: Step-by-Step Tutorial */}
          <section className="my-16 bg-white border border-surface-darker rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
                Quick Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-text-main mt-3">
                {`How to Verify ${page.doc_type} Step by Step`}
              </h2>
              <p className="text-sm text-text-main/70 mt-2">
                Follow these five straightforward steps to validate your digital signature in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 relative">
              {/* Step 1 */}
              <div className="bg-surface/50 border border-surface-darker rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-text-main mb-1">Open Kagazo</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Access Kagazo.in in any browser on mobile or desktop.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-surface/50 border border-surface-darker rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-text-main mb-1">Upload PDF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Drop your downloaded {page.doc_type} into the tool.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-surface/50 border border-surface-darker rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-text-main mb-1">Password</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Enter PDF password if protected (e.g. Aadhaar YOB).
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-surface/50 border border-surface-darker rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                    4
                  </div>
                  <h3 className="font-bold text-sm text-text-main mb-1">Audit Signature</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Engine cryptographically validates CCA India RCAI root.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-primary-light/40 border border-primary/30 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-success text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                    ✓
                  </div>
                  <h3 className="font-bold text-sm text-text-main mb-1">Download Verified</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Get LTV-stamped copy with permanent green checkmark.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Why Yellow Question Mark Explanation */}
          <section className="my-16 bg-white border border-surface-darker rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-text-main">
                  Why Does {page.doc_type} Show a Yellow Question Mark?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/60 mt-1">
                  Technical explanation of Adobe Acrobat trust anchors and CCA India root certificates
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-text-main/80 leading-relaxed">
              <p>
                When you download your <strong>{page.doc_type}</strong> from the official <strong>{page.portal}</strong> and view it in Adobe Acrobat Reader or default operating system previewers, you will see a prominent yellow question mark over the signature panel.
              </p>
              <p>
                This warning occurs because consumer PDF viewers rely exclusively on the <em>Adobe Approved Trust List (AATL)</em>, which consists predominantly of commercial Western certificate authorities. In contrast, the Government of India regulates sovereign digital signatures under the <strong>Information Technology Act, 2000</strong> via the <strong>Controller of Certifying Authorities (CCA)</strong> and the <strong>Root Certifying Authority of India (RCAI)</strong>.
              </p>
              <p>
                Because Western software manufacturers do not bundle India&apos;s RCAI root keys by default, unconfigured readers cannot build the certificate validation chain. Kagazo bridges this gap by directly executing the CCA cryptographic validation and embedding a standards-compliant Document Security Store (/DSS) dictionary, rendering the signature permanently valid and green across all devices.
              </p>
            </div>
          </section>

          {/* Section 3: About Portal */}
          <section className="my-16 bg-white border border-surface-darker rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-text-main">
                  About {page.portal}
                </h2>
                <p className="text-xs sm:text-sm text-text-main/60 mt-1">
                  Official issuance authority and digital infrastructure
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-text-main/80 leading-relaxed">
              {page.portal_description ? (
                page.portal_description
                  .split('\n\n')
                  .map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>
                  The {page.portal} operates as the certified government electronic document delivery system. Documents signed and issued through this platform adhere to the national PKI standards formulated by the Ministry of Electronics &amp; Information Technology (MeitY).
                </p>
              )}
            </div>
          </section>

          {/* Section 4: FAQ Accordion */}
          <section className="my-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-text-main mt-3">
                {page.doc_type} Digital Verification FAQs
              </h2>
              <p className="text-sm text-text-main/70 mt-2">
                Common questions regarding validity, legal status, and troubleshooting
              </p>
            </div>

            <FaqAccordion faqList={page.faq} docType={page.doc_type} />
          </section>

          {/* Section 5: Related Documents Links */}
          {relatedPages.length > 0 && (
            <section className="my-16 pt-12 border-t border-surface-darker">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-text-main">
                  Other Supported Indian Documents
                </h3>
                <p className="text-xs sm:text-sm text-text-main/60 mt-1">
                  Verify digital signatures on other national and state government documents
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedPages.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/${rp.slug}`}
                    className="group bg-white border border-surface-darker rounded-2xl p-5 hover:border-primary/40 hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md border border-primary/20 mb-2 inline-block">
                        {rp.state}
                      </span>
                      <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors line-clamp-2">
                        {rp.doc_type}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-surface-darker/60 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                      <span>Verify Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Bottom Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-primary to-[#D44C06] text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Ready to Verify Your {page.doc_type}?
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mb-6">
              Instant in-memory verification against the Root Certifying Authority of India. No signup required for guest verifications.
            </p>

            <a
              href="#upload-zone"
              className="px-8 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-surface transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Verify Your {page.doc_type} Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
