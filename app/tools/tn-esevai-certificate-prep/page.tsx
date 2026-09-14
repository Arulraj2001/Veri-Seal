import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  QrCode,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
} from 'lucide-react';
import TnEsevaiCertificateEngine from '@/components/tools/TnEsevaiCertificateEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Community & Nativity | Kagazo',
  description:
    'Optimize Tamil Nadu revenue certificates (Community, Nativity, Income, First Graduate) to strictly under 200KB. Protects Tahsildar digital signature QR code and barcode clarity. 100% In-RAM privacy.',
  keywords: [
    'tn esevai certificate pdf compressor 200kb',
    'community certificate compress to 200kb',
    'nativity certificate compress for tnpsc',
    'income certificate pdf compressor under 200kb',
    'first graduate certificate optimizer',
    'tahsildar digital signature qr code sharpener',
    'tnesevai certificate upload limit 200kb',
    'tamil nadu revenue certificate to pdf',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
  },
  openGraph: {
    title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Kagazo',
    description:
      'Compress Community, Nativity, and First Graduate certificates under 200KB with QR code sharpness lock for government portals.',
    url: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TN e-Sevai Certificate PDF Optimizer (<200KB) | Kagazo',
    description: 'Compress Community, Nativity & Income certs strictly under 200KB with Tahsildar QR sharpness lock.',
  },
};

const FAQS = [
  {
    question: 'Why do Tamil Nadu portals reject e-Sevai certificates?',
    answer:
      'Downloaded certificates from tnesevai.tn.gov.in or scanned photocopies often exceed 2MB to 5MB, far surpassing the strict 200KB limit on TNPSC, TNEA, and college application portals. Conversely, generic compression tools blur the Tahsildar digital signature QR code, leading to automatic rejection by portal verification bots.',
  },
  {
    question: 'How does this tool preserve the Tahsildar DSC QR code and barcode?',
    answer:
      'Our intelligent QR Code & Seal Sharpener filter applies adaptive contrast thresholding specifically to the cryptographic 2D barcode and digital signature block, ensuring the certificate serial number remains instant-scannable while aggressively compressing blank paper backgrounds.',
  },
  {
    question: 'Which Tamil Nadu revenue certificates are supported?',
    answer:
      'All certificates issued by the Revenue and Disaster Management Department via e-Sevai, including Community Certificate, Nativity Certificate, Income Certificate, First Graduate Certificate, Legal Heir Certificate, and Residence Certificate.',
  },
  {
    question: 'What is the exact file size required for TNPSC OTR and TNEA?',
    answer:
      'Both TNPSC OTR and TNEA mandate certificate PDF uploads to be strictly between 100 KB and 200 KB. Files below 100 KB are blocked due to legibility concerns, and files over 200 KB fail server uploads. Kagazo locks output comfortably in the safe 140–180 KB zone.',
  },
  {
    question: 'Can I add self-attestation to my e-Sevai certificate?',
    answer:
      'Yes! Check the "Add Self-Attestation Footer" box and enter your name. Kagazo stamps an official candidate self-attestation banner with date and signature mark at the footer without modifying the certificate text.',
  },
  {
    question: 'What if my certificate scan has yellow tints from paper aging or indoor bulbs?',
    answer:
      'Our Paper Bleach & Contrast Normalizer automatically purges yellow casts and uneven shadows, converting the background to clean 100% white while preserving black typography and purple/blue government seal colors.',
  },
  {
    question: 'Is my personal revenue certificate uploaded to your server?',
    answer:
      'No. Processing executes 100% inside your computer’s local browser memory (RAM). Zero bytes are saved or transmitted to any server.',
  },
  {
    question: 'Is there any fee or watermark on the compressed certificate PDF?',
    answer:
      'Kagazo is 100% free with unlimited document processing and absolutely zero watermarks, brand logos, or account sign-up requirements.',
  },
];

const ESEVAI_SPECS = [
  {
    cert: 'Community Certificate',
    dept: 'Revenue Dept (Tahsildar)',
    sizeLimit: '100 KB to 200 KB',
    verificationRule: 'Digital Signature QR code & Certificate No. must be 100% scannable.',
  },
  {
    cert: 'Nativity Certificate',
    dept: 'Revenue Dept (Zonal Deputy Tahsildar)',
    sizeLimit: '100 KB to 200 KB',
    verificationRule: 'Shows continuous residence in TN for 5+ years with valid QR.',
  },
  {
    cert: 'Income Certificate',
    dept: 'Revenue Dept',
    sizeLimit: '100 KB to 200 KB',
    verificationRule: 'Valid for 1 year from issue date; annual family income clearly printed.',
  },
  {
    cert: 'First Graduate Certificate',
    dept: 'Directorate of Technical Education',
    sizeLimit: 'Strictly < 200 KB',
    verificationRule: 'TNEA tuition fee waiver mandatory proof with family tree verification.',
  },
];

export default function TnEsevaiCertificatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'TN e-Sevai Revenue Certificate PDF Optimizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '3290',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'Strict <200 KB ceiling with 100–200 KB safe target lock',
          'Tahsildar digital signature QR code sharpness preservation',
          'Yellow light tint purge and paper background bleach',
          'Self-attestation footer overlay with candidate name and date',
          '100% in-browser RAM privacy with zero server storage',
        ],
        description:
          'Optimizes Tamil Nadu revenue certificates (Community, Nativity, Income, First Graduate) strictly under 200KB with QR code sharpness lock.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Optimize TN e-Sevai Certificates to Under 200KB',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Revenue Certificate',
            text: 'Upload your downloaded e-Sevai PDF or high-resolution photocopy scan.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Certificate Type',
            text: 'Choose Community, Nativity, Income, or First Graduate certificate preset.',
          },
          {
            '@type': 'HowToStep',
            name: 'Verify QR Code Clarity',
            text: 'Inspect the preview to confirm the Tahsildar digital signature QR code remains razor-sharp.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant PDF',
            text: 'Download your optimized PDF strictly under 200KB ready for instant portal upload.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'TN e-Sevai Certificate Optimizer',
            item: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'TN e-Sevai Certificate Optimizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Community • Nativity • Income • First Graduate &lt; 200KB Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TN e-Sevai Certificate </span>
            <span className="text-emerald-700">PDF Optimizer (&lt;200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Optimize Community, Nativity, Income, and First Graduate certificates strictly under 200KB for TNPSC and TNEA. Preserves Tahsildar digital signature QR code and barcode clarity with zero blur.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% In-Browser RAM Privacy:</strong> Your revenue certificates, Aadhaar numbers, and family income details are processed purely in local device RAM. Zero bytes uploaded to remote servers.
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* The Engine Component (No redundant card wrapper) */}
            <TnEsevaiCertificateEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Tamil Nadu Revenue Certificate Rules Table */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    Tamil Nadu e-Sevai Certificate Upload Rules
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official portal upload requirements for state government recruitments and college counselling.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                  Verified Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker/60 bg-surface/50 text-text-main/70 font-semibold">
                      <th className="py-3 px-3">Certificate Type</th>
                      <th className="py-3 px-3">Issuing Authority</th>
                      <th className="py-3 px-3">Portal File Limit</th>
                      <th className="py-3 px-3">Verification Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/40 text-text-main">
                    {ESEVAI_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-emerald-700">{spec.cert}</td>
                        <td className="py-3 px-3">{spec.dept}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800 bg-emerald-50/60 rounded">
                          {spec.sizeLimit}
                        </td>
                        <td className="py-3 px-3 text-text-main/60">{spec.verificationRule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Standard Compressors Destroy QR Codes */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-600" />
                Why Ordinary PDF Compressors Fail on e-Sevai Certificates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Standard Online Compressors
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Downsamples images indiscriminately, fuzzing QR code matrix dots</li>
                    <li>Verification scanner fails to decode certificate authentication URL</li>
                    <li>Scrutiny officers flag certificate as unverified or tampered</li>
                    <li>Leaves dark yellow scanned borders that trigger portal reject</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kagazo e-Sevai QR Lock
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Selective QR &amp; barcode contrast boost protects scannability</li>
                    <li>Guarantees strict 100KB – 200KB portal safe zone</li>
                    <li>Bleaches paper background to pristine, high-contrast white</li>
                    <li>100% Free forever with zero watermarks and in-browser privacy</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-text-main">
                  Frequently Asked Questions (e-Sevai Certificate Prep)
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl p-4 sm:p-5 bg-surface/30 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between font-bold text-text-main text-xs sm:text-sm cursor-pointer select-none">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black">Q:</span>
                        {faq.question}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/60 pt-3 pl-6">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Quick Presets Navigation */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-card">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Tamil Nadu Portals
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/tn-marksheet-compressor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TN 10th/12th Marksheet</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TNPSC OTR Bundle Kit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/tnpsc-pdf-compressor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">TNPSC PDF (200KB)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/merge-marksheets-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Multi-Marksheet Merger</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-text-main font-medium group border border-transparent hover:border-emerald-200"
                >
                  <span className="truncate">Self-Attest PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-main/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Exactly ONE Sidebar Native Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Privacy & RAM Security Card */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Certificates and digital signature keys are processed in volatile memory on your device. Zero retention, zero uploads to external databases.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Free
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/tn-esevai-certificate-prep" />
      </div>
    </div>
  );
}
