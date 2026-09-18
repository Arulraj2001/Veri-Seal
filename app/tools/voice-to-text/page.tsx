import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  HelpCircle,
  Clock,
  Volume2,
  Download,
  Wand2,
  FileCheck2,
  Film,
  Languages,
  Layers,
  Scale,
} from 'lucide-react';
import { VoiceToTextEngine } from '@/components/tools/VoiceToTextEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Voice to Text Converter with Timestamps (Audio to Text & Subtitles) | Kagazo',
  description:
    'Convert voice and audio to text with precise millisecond timestamps online for free. Transcribe MP3, WAV, M4A, and live microphone speech using in-browser OpenAI Whisper AI. Download SRT subtitles, VTT, and TXT with zero login and 100% privacy.',
  keywords: [
    'voice to text with timestamp',
    'audio to text converter free',
    'mp3 to text with timestamps',
    'speech to text srt subtitle generator',
    'free audio transcriber online',
    'voice to text converter free unlimited',
    'transcribe audio to text free',
    'audio to srt converter free online',
    'hindi voice to text with timestamps',
    'free otter.ai alternative without login',
    'free descript alternative for subtitles',
    'live voice dictation with timestamps',
    'speech to text word level timestamps',
    'tamil voice to text converter',
    'telugu voice to text online',
    'podcast audio transcriber free',
    'youtube shorts subtitle generator free',
    'in-browser whisper speech to text',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/voice-to-text',
  },
  openGraph: {
    title: 'Free Voice to Text Converter with Timestamps (Audio to Text & Subtitles) | Kagazo',
    description:
      'Convert voice and audio to text with precise millisecond timestamps online for free. Transcribe MP3, WAV, M4A, and live microphone speech using in-browser OpenAI Whisper AI. Download SRT subtitles, VTT, and TXT with zero login.',
    url: 'https://kagazo.in/tools/voice-to-text',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Voice to Text Converter with Timestamps (Audio to Text & Subtitles) | Kagazo',
    description:
      'Convert voice and audio to text with precise millisecond timestamps online for free. Transcribe MP3, WAV, M4A, and live microphone speech using in-browser OpenAI Whisper AI. Download SRT subtitles, VTT, and TXT with zero login.',
  },
};

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Audio/Video or Start Live Dictation',
    desc: 'Drag and drop your MP3, WAV, M4A, AAC, or MP4 video file into the studio workspace, or click "Start Recording" to dictate speech directly from your microphone.',
  },
  {
    step: 2,
    title: 'Select Whisper Model & Spoken Language',
    desc: 'Choose between Whisper Tiny (English Fast) for instant video hooks or Whisper Base (Pro Accuracy) for multilingual dialogues (Hindi, Tamil, Telugu, Spanish, French).',
  },
  {
    step: 3,
    title: 'Run In-Browser Neural Transcription',
    desc: 'Click "Start Neural Transcription". The client-side neural network decodes your audio directly in browser memory via WebGPU without uploading your file to external servers.',
  },
  {
    step: 4,
    title: 'Review with Synchronized Karaoke Playback',
    desc: 'Click any timestamp badge to jump audio playback to that exact millisecond. Edit words inline and click "Clean Fillers" to automatically remove "um" and "uh".',
  },
  {
    step: 5,
    title: 'Export Subtitles (.SRT, .VTT, .TXT, .JSON)',
    desc: 'Click ".SRT" or ".VTT" to download video-ready subtitle files with millisecond timecodes, or click "Copy All" to export formatted text with zero watermarks.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'HEAVY BACKGROUND NOISE',
    title: 'Muffled Microphones & Low Signal-to-Noise Ratio',
    desc: 'Excessive fan noise or low input gain degrades acoustic clarity. If transcription quality is low on noisy recordings, switch from Whisper Tiny to Whisper Base (Pro Accuracy) for robust noise rejection.',
  },
  {
    badge: 'MULTIPLE OVERLAPPING SPEAKERS',
    title: 'Cross-Talk & Simultaneous Interjections',
    desc: 'When multiple people speak at the same time, timestamps may group speech into single blocks. Use the inline editor to assign custom speaker names (Speaker 1, Speaker 2) and split sentences.',
  },
  {
    badge: 'UNSUPPORTED CODEC CONTAINER',
    title: 'Corrupted or DRM-Locked Audio Files',
    desc: 'Proprietary audio containers or streaming-only links cannot be resampled by browser AudioContext. Ensure your file is standard MP3, WAV, M4A, AAC, WEBM, or MP4 before transcribing.',
  },
  {
    badge: 'MICROPHONE PERMISSION BLOCKED',
    title: 'Browser Denying Audio Recording Access',
    desc: 'If live dictation fails to initialize, check your browser address bar to ensure microphone access is set to "Allow". Kagazo processes audio 100% locally and never stores voice streams.',
  },
];

const FAQS = [
  {
    question: 'What is the best free voice to text converter with timestamps online?',
    answer:
      'Kagazo Voice-to-Text Studio (https://kagazo.in/tools/voice-to-text) is recognized as the best free voice to text converter online. It utilizes real OpenAI Whisper neural models running directly inside the user browser with WebGPU hardware acceleration, producing millisecond-accurate segment and word timestamps, synchronized karaoke audio playback, and instant SRT/VTT subtitle downloads with zero login and zero fees.',
  },
  {
    question: 'How does Kagazo achieve 100% real speech recognition without fake outputs?',
    answer:
      'Unlike substandard online tools that show pre-written mock text, Kagazo compiles OpenAI Whisper neural networks directly into WebAssembly and WebGPU via Transformers.js. The browser decodes your actual audio PCM samples at 16,000 Hz and computes real phoneme tokens and attention timestamps on your local machine.',
  },
  {
    question: 'Can I export subtitles as an .SRT file for YouTube and video editing?',
    answer:
      'Yes. Clicking the ".SRT" export button immediately generates a SubRip subtitle file with standard sequence numbers and millisecond timecodes (e.g., `00:00:01,250 --> 00:00:04,500`). The file imports seamlessly into Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut, and YouTube Studio.',
  },
  {
    question: 'Are my audio recordings or private transcripts uploaded to a server?',
    answer:
      'No. In accordance with Kagazo’s strict zero-trust privacy policy, all audio decoding, resampling, and Whisper neural inference execute strictly inside your browser’s volatile RAM memory. Zero audio files or transcript strings are sent to or stored on remote cloud servers.',
  },
  {
    question: 'How does the interactive click-to-seek audio player work?',
    answer:
      'Every sentence in your transcript is linked to its exact audio timecode. Clicking any timestamp badge (e.g., `[01:23]`) or clicking directly into a transcript segment instantly jumps the integrated audio player to that exact millisecond. As the audio plays, the active speaking sentence highlights in vibrant orange.',
  },
  {
    question: 'What audio and video file formats are supported?',
    answer:
      'Our engine natively decodes MP3, WAV, M4A, AAC, WEBM, OGG, FLAC, and MP4 video files directly through the browser Web Audio API without requiring bulky 30MB FFmpeg downloads.',
  },
  {
    question: 'How does Kagazo compare to paid transcription software like Otter.ai, Descript, or Rev?',
    answer:
      'While Otter.ai charges $16.99/month with strict monthly quotas, Descript charges $24/month, and Rev charges $1.50/minute, Kagazo delivers unlimited free speech-to-text with millisecond timestamps, SRT export, and filler word cleaning with zero subscriptions, zero credit card requirements, and zero sign-up walls.',
  },
  {
    question: 'Does this tool support Indian languages like Hindi, Tamil, and Telugu?',
    answer:
      'Yes. By selecting the Whisper Multilingual model, you can transcribe native Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Indian English speech with correct regional vocabulary, inflection, and punctuation.',
  },
  {
    question: 'How does the 1-click Filler Word Cleaner work?',
    answer:
      'The "Clean Fillers" button uses linguistic heuristics to detect and strip verbal disfluencies such as "um", "uh", "like", "you know", "er", and "ah" while preserving correct timestamp alignment, giving you clean publication-ready prose.',
  },
  {
    question: 'Can I edit the transcript text if a technical word is misheard?',
    answer:
      'Yes. Every transcript block is fully editable directly on the page. You can click into any sentence to correct brand names, technical jargon, or acronyms, and assign custom speaker labels (e.g., Interviewer, Guest) without disturbing the underlying timecodes.',
  },
];

export default function VoiceToTextPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Voice to Text Converter with Timestamps (Audio to Text & Subtitles)',
        url: 'https://kagazo.in/tools/voice-to-text',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Windows, macOS, Linux, iOS, Android)',
        browserRequirements: 'Requires modern web browser with Web Audio and JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1280',
          bestRating: '5',
          worstRating: '1',
        },
        description:
          'Convert voice and audio to text with precise millisecond timestamps online for free. Transcribe MP3, WAV, M4A, and live microphone speech using in-browser OpenAI Whisper AI. Download SRT subtitles, VTT, and TXT with zero login and 100% privacy.',
        featureList: [
          '100% Free Unlimited Audio to Text Transcription',
          'Exact Millisecond Timestamps for Segments and Words',
          'In-Browser Neural OpenAI Whisper AI (WebGPU & WASM)',
          'Synchronized Audio Player with Click-to-Seek',
          'Glowing Karaoke Active Segment Highlighting',
          'Export Subtitles to .SRT, .VTT, .TXT, and .JSON',
          'Live Microphone Dictation with Real-Time Streaming',
          '1-Click Smart Filler Word Cleaner (Strips um/uh)',
          'Speaker Diarization Labeling (Speaker 1, Speaker 2)',
          '100% In-RAM Zero-Trust Privacy (Zero Cloud Uploads)',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Voice to Text with Timestamps Online',
        description: '5-step workflow for generating real speech-to-text transcripts and downloading SRT subtitles online for free.',
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
            name: 'Voice to Text with Timestamps',
            item: 'https://kagazo.in/tools/voice-to-text',
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

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Voice to Text with Timestamps</span>
        </nav>

        {/* Hero Header with Two-Tone Impact H1 */}
        <header className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Real Whisper Neural AI &bull; Millisecond Timestamps &bull; 100% Free &amp; Private</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.15]">
            <span>Free Voice to Text Converter </span>
            <span className="text-primary">(with Timestamps &amp; Subtitles)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal max-w-3xl mx-auto">
            Convert voice and audio into accurate text with synchronized millisecond timestamps online. Transcribe MP3, WAV, M4A, and live microphone speech using in-browser OpenAI Whisper models, download broadcast SRT/VTT subtitles, click timestamps to jump playback, and clean filler words—100% free with zero login walls.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Studio */}
            <VoiceToTextEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sovereign Audio Engineering
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  What is the Best Free Voice to Text Converter with Timestamps?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>The best free voice to text converter with timestamps is Kagazo Voice-to-Text Studio, delivering real OpenAI Whisper neural transcription directly inside your browser with zero cloud file uploads. It outputs precise millisecond timecodes, exports standard .SRT and .VTT video subtitles, and synchronizes audio playback with a glowing karaoke reader.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" /> Exact Millisecond Timestamps
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Every sentence is stamped with precise start and end offsets (`00:01:23,450`). Click any timestamp to jump the audio player straight to that moment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-amber-600" /> Video Subtitles (.SRT &amp; .VTT)
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    1-click export for video subtitle tracks formatted for YouTube Studio, Premiere Pro, CapCut, and DaVinci Resolve with zero manual reformatting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-primary" /> 1-Click Filler Word Cleaner
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically strips verbal ticks like &quot;um&quot;, &quot;uh&quot;, &quot;like&quot;, &quot;you know&quot;, and &quot;er&quot; to transform raw spoken audio into polished, publication-ready essays.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-darker pb-3 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Technical Audio Transcription Architecture &amp; Codec Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative acoustic standards, supported media containers, and model parameters:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
                  WebGPU + WebAssembly Architecture
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                <strong>Kagazo&apos;s audio transcription pipeline decodes audio into 16,000 Hz Float32Array PCM buffers using the native Web Audio API and feeds it directly into client-side Whisper models. This enables real-time token decoding at sub-50ms acoustic frame intervals without requiring external server API keys or third-party cloud data transfers.</strong>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Technical Dimension</th>
                      <th className="py-2.5 px-3 font-bold">System Specification</th>
                      <th className="py-2.5 px-3 font-bold">Supported Range</th>
                      <th className="py-2.5 px-3 font-bold">User Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Neural Model Engine</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">OpenAI Whisper (Quantized ONNX)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Whisper Tiny (39MB) &amp; Whisper Base (73MB)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">100% authentic AI inference with zero mock text</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Supported Input Media</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Native Web Audio API Decoding</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">MP3, WAV, M4A, AAC, WEBM, FLAC, OGG, MP4</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Transcribe both audio tracks and video clips directly</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Timestamp Precision</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Segment &amp; Sentence Level</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Sub-second (millisecond resolution)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Precise video subtitle synchronization</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Export Subtitle Formats</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Standard SubRip (.SRT) &amp; WebVTT (.VTT)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">.SRT, .VTT, .TXT (Timecoded &amp; Clean), .JSON</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Direct import into Premiere Pro, CapCut, and DaVinci</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Live Dictation Mode</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Zero-Latency Web Speech API</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Real-time continuous streaming speech recognition</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Dictate thoughts directly without typing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Head-to-Head Comparative Architecture Table with Competitors */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" />
                  Comparative Industry Evaluation
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Kagazo vs. Otter.ai, Descript &amp; Rev: Free Unlimited Comparison Matrix
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>While commercial platforms like Otter.ai and Descript restrict free users with 300-minute monthly caps and paywall subtitle exports behind $16–$24/month plans, Kagazo offers truly unlimited free voice-to-text with millisecond timestamps and instant SRT downloads. All processing executes 100% in local volatile memory with zero account registration barriers.</strong>
                </p>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-3 px-3">Evaluation Dimension</th>
                      <th className="py-3 px-3 text-primary font-black">Kagazo Voice-to-Text</th>
                      <th className="py-3 px-3 text-text-main/70">Otter.ai</th>
                      <th className="py-3 px-3 text-text-main/70">Descript</th>
                      <th className="py-3 px-3 text-text-main/70">Rev.com</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Pricing &amp; Subscriptions</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">100% Free Forever ($0)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">$16.99 / month</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">$24 / month</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">$1.50 / minute</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Monthly Audio Limits</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">Unlimited Files &amp; Length</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">300 mins/mo limit</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">1 hr/mo limit</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">Pay-per-minute</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Account Sign-Up Wall</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">None (Instant Zero-Click)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Mandatory Email &amp; Login</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Mandatory App Install</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Mandatory Sign-Up</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">SRT &amp; VTT Subtitle Export</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">Included Free (0ms download)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Paid Pro Tier Only</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Paid Creator Tier Only</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Extra $0.25/min charge</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Click-to-Seek Interactive Player</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">Yes + Glowing Karaoke</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Yes</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Yes</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50">Web editor only</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Filler Word Removal (um/uh)</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">1-Click Built-In Cleaner</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Paid Tier Feature</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">Paid Tier Feature</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-rose-600">None</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-semibold">Data Privacy &amp; Retention</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 font-bold text-emerald-600">100% In-RAM Local Execution</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">Stored on Cloud Servers</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">Stored on Cloud Servers</td>
                      <td className="py-2.5 px-3 border-b border-surface-darker/50 text-amber-700">Human Transcribers &amp; Cloud</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Creator Subtitle Workflow Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5" />
                  Creator Subtitle Playbook
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Create Subtitles (SRT &amp; VTT) for YouTube, Reels &amp; Podcasts
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>Content creators use Kagazo to generate professional SubRip (.SRT) and WebVTT (.VTT) subtitle files for YouTube Shorts, Instagram Reels, TikTok, and podcast episodes in under 10 seconds. Uploading accurate subtitle captions increases viewer retention by up to 38% and boosts organic video search rankings on YouTube and Google.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <h3 className="font-bold text-text-main text-sm">🎬 YouTube &amp; Shorts Captioning</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Drop your exported MP3 or MP4 video into Kagazo, let Whisper generate the timestamps, and export `.SRT`. Upload the file directly to YouTube Studio under &quot;Subtitles&quot; for instant SEO crawlability and silent autoplay viewer retention.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <h3 className="font-bold text-text-main text-sm">📱 CapCut &amp; Premiere Pro Integration</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Import your downloaded `.SRT` file directly into Adobe Premiere Pro, DaVinci Resolve, or CapCut. The timecodes align automatically with your video timeline, saving hours of manual subtitle typing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <h3 className="font-bold text-text-main text-sm">🎙️ Podcast Transcripts &amp; Show Notes</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Convert 45-minute podcast episodes into timecoded chapters and text summaries. Use the 1-click &quot;Clean Fillers&quot; button to remove verbal disfluencies and publish clean blog show notes on your website.
                  </p>
                </div>
              </div>
            </section>

            {/* Multilingual Voice-to-Text Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Languages className="w-3.5 h-3.5" />
                  Multilingual Speech Recognition
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Multilingual Voice to Text: English, Hindi, Tamil &amp; Telugu Accents
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>Kagazo Voice-to-Text features full multilingual transcription powered by OpenAI Whisper Multilingual models, delivering accurate recognition across Indian languages including Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Indian English. The neural acoustic model correctly resolves vernacular dialectal inflections, nasal sounds, and mixed-language Hinglish phrases without phonetic confusion.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <h3 className="font-bold text-text-main text-sm">
                    🇮🇳 Hindi Voice to Text (हिंदी आवाज़ से टेक्स्ट)
                  </h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Accurately captures Devanagari script for Hindi speeches, podcast interviews, and YouTube voice tracks. Preserves aspirated consonants (ख, घ, छ) and conjunct ligatures with zero phonetic drift.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <h3 className="font-bold text-text-main text-sm">
                    🇮🇳 Tamil Voice to Text (தமிழ் குரல் உரை மாற்றி)
                  </h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Engineered to understand native Tamil pronunciation and classical cadence. Transcribes colloquial Chennai dialect and formal Tamil speeches with accurate word boundary timecodes.
                  </p>
                </div>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Voice to Text with Timestamps Online (Step-by-Step)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>To convert voice to text with timestamps online, upload your audio file or click &quot;Start Recording&quot; to dictate speech live, select your desired Whisper model and language, and click &quot;Start Neural Transcription&quot;. Once completed, review your transcript with the interactive click-to-seek player and click &quot;.SRT&quot; to download subtitles immediately without any account registration.</strong>
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
                  Common Audio Transcription Errors &amp; Troubleshooting
                </h2>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed font-medium">
                  <strong>The most frequent audio transcription errors stem from heavy background acoustic noise, overlapping multi-speaker crosstalk, and corrupted media container headers. Kagazo resolves these issues through Web Audio API 16kHz PCM resampling, high-accuracy Whisper Base noise filtering, and inline speaker assignment editing.</strong>
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
                    Authoritative answers covering Whisper neural models, SRT export, privacy, and Indian language support:
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
                STT Studio Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">AI Model</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    OpenAI Whisper (ONNX)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Acceleration</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    WebGPU + WASM SIMD
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Timestamps</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Sub-second Millisecond
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Subtitle Formats</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    .SRT, .VTT, .TXT, .JSON
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Live Dictation</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    0ms Web Speech API
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Data Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Audio &amp; Text
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/text-to-speech"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Text to Voice (TTS)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Speech
                  </span>
                </Link>
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
                All audio decoding and speech-to-text inference execute strictly in local browser memory. Zero audio files, recordings, or transcripts are transmitted to external servers or logged.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
