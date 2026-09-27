import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Download,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Lock,
  ArrowRight,
  ExternalLink,
  Laptop,
  Layers,
  Camera,
  PenTool,
  FileText,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildToolStructuredData } from '@/lib/seo-schema';
import { AnswerCapsule } from '@/components/seo/AnswerCapsule';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kagazo Chrome Extension | Free In-Browser Exam Photo & PDF Resizer | Kagazo',
  description:
    'Download the official Kagazo Chrome Extension. Instantly resize UPSC, SSC, IBPS, and TNPSC exam photos, add name/date stamps, and compress PDFs to 20KB/50KB directly from your browser toolbar. 100% client-side privacy.',
  keywords: [
    'kagazo chrome extension',
    'exam photo resizer chrome extension',
    'in-browser pdf compressor extension',
    'upsc ssc signature 20kb extension',
    'free chrome extension for cyber cafe',
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/chrome-extension`,
  },
  openGraph: {
    title: 'Kagazo Chrome Extension | 100% In-Browser Exam Tools',
    description:
      'Access Kagazo photo resizers, name/date stampers, and PDF tools straight from your Google Chrome and Microsoft Edge toolbar.',
    url: `${SITE_URL}/tools/chrome-extension`,
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
};

const EXTENSION_FAQS = [
  {
    question: 'How do I install the Kagazo Chrome Extension without the Chrome Web Store?',
    answer:
      'Download the extension ZIP file from this page, unzip it to any folder on your computer, open your browser and navigate to chrome://extensions (or edge://extensions), enable "Developer mode" in the top-right corner, and click "Load unpacked", selecting the unzipped folder.',
  },
  {
    question: 'Is it completely safe and private to use this extension?',
    answer:
      'Yes, 100%. The Kagazo extension operates using Manifest V3 without any remote analytics scripts, trackers, or cloud upload APIs. All image transformations and PDF compressions run strictly inside your local browser memory (HTML5 Canvas).',
  },
  {
    question: 'Does the extension work on Microsoft Edge, Brave, and Opera?',
    answer:
      'Yes. Because Microsoft Edge, Brave, Opera, and Vivaldi are built on the Chromium engine, the extension works seamlessly across all of them.',
  },
  {
    question: 'What exam presets are included inside the extension popup?',
    answer:
      'The popup features an instant in-browser resizer with 20KB, 50KB, 100KB, and 200KB presets, plus one-click links to the 3-in-1 TNPSC Combo Pack, SSC Combo Pack, UPSC Name & Date Stamper, and Upload Error Doctor.',
  },
];

export default function ChromeExtensionPage() {
  const structuredData = buildToolStructuredData({
    name: 'Kagazo Chrome Extension for Govt Exam Document Preparation',
    description:
      'Download the official Kagazo Chrome Extension. Instantly resize UPSC, SSC, IBPS, and TNPSC exam photos, add name/date stamps, and compress PDFs to 20KB/50KB directly from your browser toolbar.',
    url: `${SITE_URL}/tools/chrome-extension`,
    applicationCategory: 'BrowserExtension',
    howToTitle: 'How to install and use Kagazo Chrome Extension',
    howToDescription:
      'Step-by-step instructions to load the extension into Google Chrome, Microsoft Edge, or Brave.',
    howToSteps: [
      {
        step: 1,
        title: 'Download Extension Package',
        desc: 'Click the "Download Extension (.ZIP)" button to download the latest Manifest V3 package.',
      },
      {
        step: 2,
        title: 'Extract the Archive',
        desc: 'Unzip the downloaded kagazo-chrome-extension.zip file to a permanent folder on your PC.',
      },
      {
        step: 3,
        title: 'Load in Browser',
        desc: 'Go to chrome://extensions in your URL bar, toggle "Developer mode" ON, click "Load unpacked", and select the unzipped directory.',
      },
    ],
    faqs: EXTENSION_FAQS,
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Tools', url: `${SITE_URL}/tools` },
      { name: 'Chrome Extension', url: `${SITE_URL}/tools/chrome-extension` },
    ],
  });

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <JsonLd data={structuredData} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Chrome Extension' },
          ]}
          suppressSchema
        />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Kagazo Browser Extension (Manifest V3)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight leading-tight">
            Kagazo for <span className="text-primary">Google Chrome &amp; Edge</span>
          </h1>

          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed max-w-2xl mx-auto">
            Prepare your UPSC, SSC, IBPS, and state exam photos and signatures directly from your browser toolbar. Zero cloud uploads, zero tabs lost, instant 1-click downloads.
          </p>

          {/* Master Download Action Box */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/extension/kagazo-chrome-extension.zip"
              download="kagazo-chrome-extension.zip"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-white font-extrabold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Extension (.ZIP) • v1.0.0</span>
            </a>

            <a
              href="#installation-guide"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-surface-darker text-text-main font-bold text-sm hover:bg-surface transition-all"
            >
              <span>Installation Steps</span>
              <ArrowRight className="w-4 h-4 text-text-main/60" />
            </a>
          </div>
        </div>

        {/* GEO Answer Capsule */}
        <AnswerCapsule
          title="Kagazo Browser Extension Technical Overview"
          badge="Product Specifications"
          portal="Chromium Engine (Chrome / Edge / Brave)"
          answer="The Kagazo Chrome Extension brings client-side image resizing (10–20KB signatures, 20–50KB passport photos) and exam portal presets directly into your browser popup. Built strictly on Chrome Manifest V3, it requires zero account registration, operates entirely inside volatile device RAM, and never transmits student documents to external servers."
        />

        {/* Features Grid */}
        <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-extrabold text-text-main flex items-center gap-2">
            <Laptop className="w-5 h-5 text-primary" />
            Why Students &amp; Cyber Cafés Love the Extension
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-1">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-main text-sm">Instant Toolbar Resizer</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Resize candidate photos to exact 20KB, 50KB, 100KB, or 200KB limits without navigating away from the exam application portal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-1">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-main text-sm">100% In-RAM Privacy</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Processes all JPG and PNG files locally using HTML5 WebAssembly. Your photos and sensitive government identity cards never leave your device.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-1">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-main text-sm">1-Click Exam Presets</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Direct access to the TNPSC 3-in-1 Combo Pack, SSC Combo Pack, UPSC Name &amp; Date Stamper, and Upload Error Doctor.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section id="installation-guide" className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-text-main flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              How to Install in 30 Seconds (Step-by-Step)
            </h2>
            <p className="text-xs sm:text-sm text-text-main/70">
              Compatible with Google Chrome, Microsoft Edge, Brave, and all Chromium browsers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center">1</div>
              <h3 className="font-bold text-text-main text-sm">Download &amp; Extract ZIP</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Click the download button above and extract <code className="text-primary font-mono text-[11px]">kagazo-chrome-extension.zip</code> to a folder on your computer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center">2</div>
              <h3 className="font-bold text-text-main text-sm">Open Extensions Page</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                In your browser URL bar, type <code className="text-primary font-mono text-[11px]">chrome://extensions</code> and turn ON the <strong>"Developer mode"</strong> toggle in the top-right corner.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-surface-darker space-y-2">
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center">3</div>
              <h3 className="font-bold text-text-main text-sm">Click "Load Unpacked"</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Click <strong>"Load unpacked"</strong> at the top left, select the unzipped folder, and pin Kagazo to your browser toolbar!
              </p>
            </div>
          </div>
        </section>

        {/* AdSlot */}
        <AdSlot slot="in_content" />

        {/* FAQs */}
        <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-text-main flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions (Chrome Extension)
            </h2>
          </div>
          <div className="divide-y divide-surface-darker">
            {EXTENSION_FAQS.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-main">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
