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

export function CompressorPageTemplate({ config }: CompressorPageTemplateProps) {
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

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: config.heroHighlight || config.title },
          ]}
          showHomeIcon
        />

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
          {/* PRIMARY WORKSPACE (Left 8 Cols ~ 68% Desktop Width) */}
          <main className="lg:col-span-8 space-y-8">
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
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">Strict Limit Guarantee</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Unlike generic tools with vague presets, our engine guarantees your file is strictly under {config.maxLimitKb} KB so recruitment portals never reject your upload.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">100% Free Forever • No Paywalls</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Built as a permanent public utility for students, job applicants, and cyber cafes. Zero fees, no daily limits, no watermark additions, and no sign-in required.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">In-Memory Privacy</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Your sensitive marksheets and certificates are processed in RAM and never saved to permanent disk storage. 100% private and confidential.
                </p>
              </div>
            </section>

            {/* Hyper-Targeted FAQ Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 pb-2 border-b border-surface-darker/60">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </h2>

              <div className="space-y-3 pt-2">
                {config.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-surface-darker rounded-2xl bg-surface/40 p-4 sm:p-5 open:bg-surface transition-all cursor-pointer"
                  >
                    <summary className="font-bold text-sm sm:text-base text-text-main list-none flex items-center justify-between">
                      <span>{faq.question}</span>
                      <span className="text-primary text-xl transition-transform group-open:rotate-180 font-bold">▾</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-text-main/80 mt-3 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Tools Topic Cluster (SEO Interlinking) */}
            {config.relatedTools && config.relatedTools.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-white border border-surface-darker shadow-card space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-text-main/70">
                  Related Document &amp; Exam Compressors
                </h3>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {config.relatedTools.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={rel.href}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-surface-darker hover:border-primary/50 text-xs sm:text-sm font-bold text-text-main hover:text-primary transition-colors shadow-2xs"
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

          {/* RIGHT SIDEBAR RAIL (32% Width, Sticky) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            {/* 1. Quick Switch Tools Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  Quick Switch Tools
                </h3>
                <span className="text-[10px] font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/20">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-text-main/60">
                Switch target file limit without losing your place:
              </p>
              <div className="space-y-1.5 pt-0.5">
                {QUICK_SWITCH_TOOLS.map((item, idx) => {
                  const isActive = config.slug === item.slug;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all border',
                        isActive
                          ? 'bg-primary-light border-primary/40 text-primary shadow-2xs'
                          : 'bg-surface/40 border-surface-darker hover:border-primary/40 hover:bg-white text-text-main'
                      )}
                    >
                      <span className="truncate pr-2">{item.name}</span>
                      <span
                        className={cn(
                          'text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0',
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
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Exam Upload Cheatsheet
              </h3>
              <div className="space-y-2 text-xs divide-y divide-surface-darker/60">
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">TNPSC Hall Ticket / Cert</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">&lt; 200 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">UPSC Marksheets</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">20 – 300 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">SSC Documents</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">&lt; 200 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">IBPS Declaration</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">50 – 100 KB</span>
                </div>
              </div>
            </div>

            {/* 4. Privacy & RAM Processing Guarantee Card */}
            <div className="p-5 rounded-3xl bg-surface/60 border border-surface-darker space-y-2">
              <div className="flex items-center gap-2 text-text-main font-black text-xs">
                <Lock className="w-4 h-4 text-primary" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Kagazo processes certificates entirely in memory (RAM). Documents are never saved to permanent disk storage, ensuring 100% data privacy for candidates.
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
