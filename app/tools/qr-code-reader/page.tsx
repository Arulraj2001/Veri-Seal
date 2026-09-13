import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  QrCode,
  Camera,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { QrCodeReaderEngine } from '@/components/tools/QrCodeReaderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'QR Code Reader & Scanner Online Free - From Image or Camera | Kagazo',
  description:
    'Scan and decode QR codes online for free. Upload any QR image or screenshot, or scan in real-time with your laptop or phone camera. Decodes URLs, text, and Wi-Fi credentials with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/qr-code-reader',
  },
  openGraph: {
    title: 'QR Code Reader & Scanner Online Free | Kagazo',
    description: 'Decode QR codes from uploaded images, screenshots, or live camera stream with client-side privacy.',
    url: 'https://kagazo.in/tools/qr-code-reader',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I scan a QR code from a photo or screenshot on my device?',
    answer:
      'Simply drag and drop your image file (or click to browse your photos/gallery) into the upload area. Kagazo instantly scans the image matrix and outputs the decoded URL or text in milliseconds.',
  },
  {
    question: 'Is my camera feed or uploaded photo sent to any server?',
    answer:
      'Never. Kagazo utilizes the client-side jsQR decoding library running exclusively within your browser’s volatile RAM. Your camera stream and photos never leave your device.',
  },
  {
    question: 'Can this reader decode damaged or blurry QR codes?',
    answer:
      'Yes. The engine uses multi-pass contrast inversion and Reed-Solomon error correction to reconstruct obscured or rotated QR codes.',
  },
];

export default function QrCodeReaderPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">QR Code Reader</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Camera className="w-4 h-4 text-primary shrink-0" />
            <span>Dual Image Drop &amp; Live Camera Scanner</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            QR Code Reader &amp; Scanner Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Scan and decode QR codes from saved photos, screenshots, or directly through your camera. Instant URL opening and clipboard copying with 100% in-browser privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <QrCode className="w-4 h-4 text-primary" /> Image Drop &amp; Screenshot Support
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant Client Decoding
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <QrCodeReaderEngine />

            <AdSlot slot="post_download" />

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related QR Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/qr-code-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  QR Code Generator
                </Link>
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WhatsApp Link &amp; QR
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
