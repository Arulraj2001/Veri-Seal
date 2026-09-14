import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
  PenTool,
  Search,
  Fingerprint,
  Type,
  AlignLeft,
  Volume2,
  Hash,
  Scissors,
  Check,
} from 'lucide-react';
import { TextToSpeechEngine } from '@/components/tools/TextToSpeechEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Text to Speech Online (Natural Voice TTS & Audio Player) | Kagazo',
  description: 'Convert text to natural speech online for free using the W3C Web Speech API. Features multiple languages, customizable pitch and speech speed, and 100% client-side privacy without sending audio to servers.',
  alternates: {
    canonical: 'https://kagazo.in/tools/text-to-speech',
  },
  openGraph: {
    title: 'Free Text to Speech Online (Natural Voice TTS & Audio Player) | Kagazo',
    description: 'Convert text to natural speech online for free using the W3C Web Speech API. Features multiple languages, customizable pitch and speech speed, and 100% client-side privacy without sending audio to servers.',
    url: 'https://kagazo.in/tools/text-to-speech',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text to Speech Online (Natural Voice TTS & Audio Player) | Kagazo',
    description: 'Convert text to natural speech online for free using the W3C Web Speech API. Features multiple languages, customizable pitch and speech speed, and 100% client-side privacy without sending audio to servers.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter or Paste Text",
    "desc": "Type or paste the article, script, essay, or dialogue into the speech text workspace."
  },
  {
    "step": 2,
    "title": "Select Preferred Voice",
    "desc": "Choose from the dropdown list of available native system voices matching your desired language and accent."
  },
  {
    "step": 3,
    "title": "Adjust Rate & Pitch",
    "desc": "Use the interactive sliders to set your desired reading speed (1.0x normal) and vocal pitch."
  },
  {
    "step": 4,
    "title": "Click Play to Listen",
    "desc": "Hit \"Play\" or \"Speak\" to initiate immediate, crystal-clear voice narration."
  },
  {
    "step": 5,
    "title": "Control Audio Playback",
    "desc": "Pause, resume, or cancel playback at any time using the responsive audio control buttons."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "AUTOPLAY BLOCKED",
    "title": "Browser Autoplay Security Policy Block",
    "desc": "Modern browsers prohibit audio playback without a direct user click. Always click the \"Play\" button to initiate speech synthesis."
  },
  {
    "badge": "BUFFER TIMEOUT",
    "title": "Speech Stopping After 15 Seconds on Chrome",
    "desc": "Chrome has a known bug pausing long continuous utterances. Our engine includes automated chunking to keep long speeches playing smoothly."
  },
  {
    "badge": "ACCENT MISMATCH",
    "title": "Selecting Wrong Language Voice for Text",
    "desc": "Using an English voice to read Spanish or French text produces heavy phoneme errors. Always match the voice language to the text language."
  },
  {
    "badge": "SPEED DISTORTION",
    "title": "Setting Speed Above 2.5x Multiplier",
    "desc": "Setting playback rate to extreme levels causes syllables to blur together. For rapid review, 1.25x to 1.5x provides optimal intelligibility."
  }
];

const FAQS = [
  {
    "question": "How does this online text-to-speech tool work without an API key or account?",
    "answer": "Our tool utilizes the W3C Web Speech API (`window.speechSynthesis`), a modern web standard built directly into Google Chrome, Apple Safari, Microsoft Edge, and Mozilla Firefox. Because speech synthesis runs using your device native voice engines, it requires no external API keys, accounts, or subscriptions."
  },
  {
    "question": "Which voices and languages are available on this tool?",
    "answer": "The available voices depend on your device operating system (Windows, macOS, iOS, Android). Typical installations include high-quality neural voices for English (US, UK, Australia, India), Spanish, French, German, Italian, Portuguese, Hindi, Japanese, and Chinese."
  },
  {
    "question": "Can I change the voice speed and pitch?",
    "answer": "Yes. Use the interactive sliders to adjust speed from 0.5x (slow, deliberate speech) up to 2.0x (speed-listening) and modify the vocal pitch from 0.5 (deeper tone) to 2.0 (higher pitch)."
  },
  {
    "question": "Why does speech sometimes stop in Google Chrome on long articles?",
    "answer": "Google Chrome has a longstanding internal timeout that pauses the `speechSynthesis` engine after approximately 15 seconds of continuous audio. Our application implements an automatic keep-alive timer and text-chunking mechanism that breaks long texts into natural sentences, preventing premature stops."
  },
  {
    "question": "Can I use this tool to proofread my essays and articles?",
    "answer": "Yes. Listening to your writing read aloud is one of the most effective proofreading techniques. Your ear will immediately catch awkward sentence structures, missing words, and grammatical rhythm issues that your eyes might skim past."
  },
  {
    "question": "Does this work on mobile devices like iPhone and Android?",
    "answer": "Yes. It works natively on iOS Safari using Apple's high-quality Siri voices, and on Android Chrome using Google Speech Services."
  },
  {
    "question": "Can I download the spoken audio as an MP3 file?",
    "answer": "The browser Web Speech API streams audio directly to your speaker hardware rather than rendering an audio file. To record the audio into an MP3 or WAV file, you can capture your system audio using free software like Audacity or a browser audio capture extension."
  },
  {
    "question": "Can I use the synthesized voice for YouTube videos or podcasts?",
    "answer": "Yes. Because the voices are rendered by your own operating system (such as Microsoft Windows, Apple macOS, or Android), licensing terms correspond to your OS license, which generally permits personal, educational, and commercial narration."
  },
  {
    "question": "Is my text sent to any cloud server for processing?",
    "answer": "No. All speech synthesis happens 100% locally on your device hardware. Your text never leaves your browser, ensuring absolute privacy for sensitive documents, scripts, and personal notes."
  },
  {
    "question": "Is there a limit on how much text I can listen to?",
    "answer": "No. You can paste and listen to entire book chapters, research papers, and articles without any word count restrictions."
  }
];

export default function TextToSpeechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text to Speech (TTS) Online Voice Studio',
        url: 'https://kagazo.in/tools/text-to-speech',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Convert text to natural speech online for free using the W3C Web Speech API. Features multiple languages, customizable pitch and speech speed, and 100% client-side privacy without sending audio to servers.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Text to Speech Online for Free',
        description: 'Step-by-step verified workflow instructions for Text to Speech (TTS) Online Voice Studio.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
            name: 'Text to Speech (TTS) Online Voice Studio',
            item: 'https://kagazo.in/tools/text-to-speech',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Text to Speech (TTS) Online Voice Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>W3C Web Speech API Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Text to Speech </span>
            <span className="text-primary">Natural Audio Voice Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert text to natural speech online for free using the W3C Web Speech API. Features multiple languages, customizable pitch and speech speed, and 100% client-side privacy without sending audio to servers.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <TextToSpeechEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Linguistic Standards
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> High-Fidelity Natural Voice Synthesis
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Leverages your operating system's native neural and high-quality voices across English, Spanish, French, German, Hindi, and more.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Granular Pitch & Speed Controls
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Fine-tune playback speed (0.5x to 2.0x) for slow comprehension or speed listening, and customize vocal pitch to match your project.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Audio is synthesized directly on your device through the Web Speech API. Zero text strings, articles, or audio recordings are sent to remote servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Web Speech API & Audio Synthesis Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative typography standards, computational parameters, and formatting specifications:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  W3C Speech Synthesis Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Standard Specification</th><th className="py-2.5 px-3 font-bold">Configurable Range</th><th className="py-2.5 px-3 font-bold">Audio Architecture</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Synthesis Engine</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">W3C Web Speech API (SpeechSynthesis)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Browser Native Neural / Formant Engine</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero cloud latency; zero remote API dependencies</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Speech Rate / Speed</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Playback speed multiplier</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">0.5x (Slow) to 2.0x (Double Speed)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Preserves pitch stability during speed shifts</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Pitch Modulation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Voice fundamental frequency</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">0.5 (Deep Bass) to 2.0 (High Pitch)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Simulates diverse speaker age and vocal tone</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Volume Dynamics</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Audio output amplitude</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">0.0 (Mute) to 1.0 (Maximum Volume)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Direct hardware audio driver routing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Voice Selection</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multilingual neural voice matrix</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">System installed OS voices</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">English (US/UK/India), Spanish, French, German, Hindi</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Buffer Handling</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Utterance Chunking Pipeline</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Up to 5,000 characters per stream</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Auto-chunking prevents browser speech buffer timeouts</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Text to Speech Online for Free
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common Text-to-Speech Errors & Quick Troubleshooting
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, syntax bugs, and readability pitfalls:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, typographical, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                TTS Studio Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Engine</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    W3C Web Speech API
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Voices</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Multilingual Neural System
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Controls</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Pitch, Rate, Volume Dynamics
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Chunking</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Auto-Chunking Keep-Alive
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/word-counter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Word Counter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Analytics
                  </span>
                </Link>
                <Link
                  href="/tools/case-converter"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Case Converter
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Casing
                  </span>
                </Link>
                <Link
                  href="/tools/text-cleaner"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Text Cleaner
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Sanitize
                  </span>
                </Link>
                <Link
                  href="/tools/remove-line-breaks"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Remove Line Breaks
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Format
                  </span>
                </Link>
                <Link
                  href="/tools/lorem-ipsum-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Lorem Ipsum Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Dummy
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All text transformations, character counts, and speech syntheses occur strictly inside your device browser memory. Zero articles or confidential documents are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
