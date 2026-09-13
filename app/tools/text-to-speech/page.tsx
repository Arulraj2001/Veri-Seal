import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Volume2,
  FileCheck,
  Radio,
  Languages,
} from 'lucide-react';
import { TextToSpeechEngine } from '@/components/tools/TextToSpeechEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Text to Speech (TTS) Online | Realistic Voice Reader & Generator | Kagazo',
  description:
    'Convert text into natural speech online with pitch, speed, and volume controls. Choose from multiple languages, accents, and realistic voices with 100% in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/text-to-speech',
  },
  openGraph: {
    title: 'Free Text to Speech (TTS) Online | Kagazo',
    description: 'Convert text to natural spoken voice with custom speed, pitch, and language accents.',
    url: 'https://kagazo.in/tools/text-to-speech',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does Kagazo generate speech without sending my text to a server?',
    answer:
      'Kagazo utilizes the official W3C SpeechSynthesis API built directly into your operating system and web browser. The speech synthesis runs purely on your device hardware, guaranteeing zero data exposure.',
  },
  {
    question: 'Can I adjust the speaking speed and pitch?',
    answer:
      'Yes! You can customize playback rate from 0.5x (slow) up to 2.0x (double speed), and pitch from low baritone to higher registers.',
  },
  {
    question: 'Which languages and voices are available?',
    answer:
      'The available voices correspond to your operating system’s installed speech synthesizers, including American, British, Indian, Australian English, Spanish, French, German, Japanese, and more.',
  },
];

export default function TextToSpeechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text to Speech Voice Generator',
        url: 'https://kagazo.in/tools/text-to-speech',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript and Web Speech API',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Text to Speech</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Volume2 className="w-4 h-4 text-primary shrink-0" />
            <span>Web Speech API Synthesis • 100% In-Browser Privacy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Text to Speech Voice Generator
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert any text into natural, spoken voice. Customize <strong>pitch, rate, and volume</strong> across multiple language accents with real-time waveform visualization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Languages className="w-4 h-4 text-primary" /> Multi-Accent Voices
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-blue-600" /> Zero Audio Lag
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <TextToSpeechEngine />

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

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Text Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/word-counter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Word Counter
                </Link>
                <Link
                  href="/tools/case-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Case Converter
                </Link>
                <Link
                  href="/tools/lorem-ipsum-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Lorem Ipsum
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
