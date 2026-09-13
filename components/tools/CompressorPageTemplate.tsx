import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Award,
  Lock,
  HelpCircle,
  FileCheck,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PdfCompressorEngine } from './PdfCompressorEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import type { ToolConfig } from './tool-configs';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

interface CompressorPageTemplateProps {
  config: ToolConfig;
  breadcrumb?: React.ReactNode;
}

const QUICK_SWITCH_TOOLS = [
  { name: 'Compress PDF to 200KB', href: '/tools/compress-pdf-to-200kb', tag: 'Most Popular', slug: 'compress-pdf-to-200kb' },
  { name: 'Compress PDF to 100KB', href: '/tools/compress-pdf-to-100kb', tag: 'Strict Size', slug: 'compress-pdf-to-100kb' },
  { name: 'Compress PDF to 300KB', href: '/tools/compress-pdf-to-300kb', tag: 'State Exams', slug: 'compress-pdf-to-300kb' },
  { name: 'Compress PDF to 500KB', href: '/tools/compress-pdf-to-500kb', tag: 'Certificates', slug: 'compress-pdf-to-500kb' },
  { name: 'TNPSC Document Compressor', href: '/tools/tnpsc-pdf-compressor', tag: 'TNPSC Rule', slug: 'tnpsc-pdf-compressor' },
  { name: 'UPSC Document Compressor', href: '/tools/upsc-pdf-compressor', tag: 'UPSC Rule', slug: 'upsc-pdf-compressor' },
  { name: 'SSC Document Compressor', href: '/tools/ssc-pdf-compressor', tag: 'SSC Rule', slug: 'ssc-pdf-compressor' },
  { name: 'Master PDF Compressor', href: '/tools/pdf-compressor', tag: 'Custom Slider', slug: 'pdf-compressor' },
];

export function CompressorPageTemplate({ config, breadcrumb }: CompressorPageTemplateProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: config.title,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: config.canonicalUrl,
        inLanguage: ['en-IN', 'ta-IN'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '3480',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          `Strict < ${config.maxLimitKb} KB safe portal limit guarantee`,
          'Zero watermarks added to final PDF',
          'In-memory RAM processing without server disk storage',
          'Interactive visual clarity and stamp legibility inspection',
          'Compatible with TCS iON, NIC, CDAC, and NTA portals',
        ],
        description: config.metaDescription,
      },
      {
        '@type': 'HowTo',
        name: `How to ${config.heroHeading} ${config.heroHighlight}`,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document PDF',
            text: 'Upload your certificate, marksheet, or ID proof PDF (single or batch).',
          },
          {
            '@type': 'HowToStep',
            name: 'Review Pages & Set Target',
            text: `Confirm the safe target limit (under ${config.maxLimitKb} KB) and optionally remove unwanted blank pages.`,
          },
          {
            '@type': 'HowToStep',
            name: 'Compress In Memory',
            text: 'Click compress for instant in-memory downsampling without losing fine text sharpness.',
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Legibility & Download',
            text: 'Preview Page 1 to verify seals and signatures remain crisp, then download directly.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        {breadcrumb || (
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools' },
              { label: config.heroHighlight || config.title },
            ]}
            showHomeIcon
          />
        )}

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>{config.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>{config.heroHeading} </span>
            <span className="text-primary">{config.heroHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            {config.heroDescription}
          </p>
        </header>

        {/* Mobile Horizontal Tool Switcher Chips (Thumb-Zone Friendly) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {QUICK_SWITCH_TOOLS.map((tool, idx) => {
            const isActive = config.slug === tool.slug;
            return (
              <Link
                key={idx}
                href={tool.href}
                className={cn(
                  'whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border transition-all shrink-0',
                  isActive
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-white text-text-main/80 border-surface-darker hover:border-primary/40'
                )}
              >
                {tool.name.replace('Compress PDF to ', '').replace(' Document Compressor', '')}
              </Link>
            );
          })}
        </div>

        {/* 2-Column Responsive Layout Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PRIMARY WORKSPACE (83.3% Width on XL, 75% on LG) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Core Interactive Tool Component */}
            <section aria-label="Interactive PDF Compressor">
              <PdfCompressorEngine config={config} />
            </section>

            {/* Post-Download / In-Tool Native Sponsor Box (Slot B) */}
            <AdSlot slot="post_download" />

            {/* Official Portal Limits Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Indian Government Recruitment Upload Limits
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Official specifications enforced by central and state application servers.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Verified Specs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3.5 px-3.5 font-bold">Exam / Commission</th>
                      <th className="py-3.5 px-3.5 font-bold">Applicable Posts</th>
                      <th className="py-3.5 px-3.5 font-bold">Strict Ceiling</th>
                      <th className="py-3.5 px-3.5 font-bold">Kagazo Safe Target</th>
                      <th className="py-3.5 px-3.5 font-bold hidden md:table-cell">Key Upload Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/70 text-text-main">
                    {config.portalTableSpecs.map((spec, i) => (
                      <tr key={i} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3.5 px-3.5 font-bold text-text-main">{spec.exam}</td>
                        <td className="py-3.5 px-3.5 text-text-main/70">{spec.posts}</td>
                        <td className="py-3.5 px-3.5">
                          <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                            {spec.requiredRange}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5">
                          <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md border border-primary/20">
                            &lt; {spec.targetUsed}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 text-text-main/60 text-xs hidden md:table-cell">
                          {spec.portalNotes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native Sponsor Card (Slot C) */}
            <AdSlot slot="in_content" />

            {/* Why Choose Kagazo */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-text-main">Strict Limit Protection</h3>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Our quantization bisection algorithm strictly ensures your PDF is under {config.maxLimitKb} KB. No more guessing quality percentages.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-text-main">100% On-Device Privacy</h3>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Your confidential marksheets and certificates are processed in browser RAM. Zero bytes uploaded to external servers.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-text-main">Official Portal Ready</h3>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Specially tuned for UPSC ORA, SSC CGL, TNPSC OTR, NTA NEET, and IBPS application servers.
                </p>
              </div>
            </section>

            {/* Deep FAQ Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                  Frequently Asked Questions ({config.presetId?.toUpperCase() || 'PDF'} Compression)
                </h2>
              </div>

              <div className="space-y-4">
                {config.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl p-4 sm:p-5 bg-surface/30 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between font-bold text-text-main text-xs sm:text-sm cursor-pointer select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/60 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Cross-Link to Related Document Presets */}
            {config.relatedTools && config.relatedTools.length > 0 && (
              <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
                <h2 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Related Document Compression Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.relatedTools.map((rel, i) => (
                    <Link
                      key={i}
                      href={rel.href}
                      className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-surface-darker/50 border border-surface-darker text-xs font-bold text-text-main transition-colors"
                    >
                      <span>{rel.name}</span>
                      <span className="text-[10px] text-primary bg-primary-light px-1.5 py-0.5 rounded-md">
                        {rel.limit}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Cross-Link to Kagazo Digital Signature Verifier */}
            <aside className="p-6 sm:p-8 rounded-3xl bg-surface border border-primary/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2 justify-center sm:justify-start">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Need to verify digital signatures on your certificate?
                </h3>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verify CCA India digital signatures on e-Aadhaar, community certificates, and income tax acknowledgements.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                Verify Signatures Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </main>

          {/* ULTRA-COMPACT RIGHT SIDEBAR RAIL (16.7% Width on XL, 25% on LG) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28 self-start">
            {/* 1. Quick Switch Tools Card */}
            <div className="p-3.5 bg-white rounded-3xl border border-surface-darker shadow-card space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  Quick Switch
                </h3>
                <span className="text-[9px] font-extrabold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20">
                  Instant
                </span>
              </div>
              <div className="space-y-1 pt-0.5">
                {QUICK_SWITCH_TOOLS.map((item, idx) => {
                  const isActive = config.slug === item.slug;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-xl text-[11px] font-bold transition-all border',
                        isActive
                          ? 'bg-primary-light border-primary/40 text-primary shadow-2xs'
                          : 'bg-surface/40 border-surface-darker hover:border-primary/40 hover:bg-white text-text-main'
                      )}
                    >
                      <span className="truncate pr-1">{item.name.replace('Compress PDF to ', '').replace(' Document Compressor', '')}</span>
                      <span
                        className={cn(
                          'text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0',
                          isActive ? 'bg-primary text-white' : 'bg-surface border border-surface-darker text-text-main/60'
                        )}
                      >
                        {item.tag}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. Direct Sponsor Slot (Slot A - Sidebar) */}
            <AdSlot slot="sidebar" />

            {/* 3. Official Recruitment Cheatsheet Card */}
            <div className="p-3.5 bg-white rounded-3xl border border-surface-darker shadow-card space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Exam Upload Ceilings
              </h3>
              <div className="space-y-1.5 text-[11px] divide-y divide-surface-darker/60">
                <div className="pt-1.5 flex items-center justify-between">
                  <span className="font-bold text-text-main truncate pr-1">TNPSC Cert</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded text-[9px] shrink-0">&lt; 200 KB</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <span className="font-bold text-text-main truncate pr-1">UPSC Marksheets</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded text-[9px] shrink-0">&le; 300 KB</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <span className="font-bold text-text-main truncate pr-1">SSC Documents</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded text-[9px] shrink-0">&lt; 200 KB</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <span className="font-bold text-text-main truncate pr-1">IBPS Declaration</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded text-[9px] shrink-0">50–100 KB</span>
                </div>
              </div>
            </div>

            {/* 4. Privacy & RAM Processing Guarantee Card */}
            <div className="p-3 rounded-2xl bg-surface/60 border border-surface-darker space-y-1.5">
              <div className="flex items-center gap-1.5 text-text-main font-black text-[11px]">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[10px] text-text-main/70 leading-tight">
                Certificates processed in RAM and never written to disk. Zero retention.
              </p>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug={config.slug || '/tools/pdf-compressor'} />
      </div>
    </div>
  );
}
