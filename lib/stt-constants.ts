// Constants, Model Metadata, Language Options, and Pre-Loaded Demonstrations for Voice-to-Text

export interface SttModelOption {
  id: string;
  name: string;
  badge: string;
  size: string;
  speed: string;
  isMultilingual: boolean;
  desc: string;
}

export const STT_MODELS: SttModelOption[] = [
  {
    id: 'Xenova/whisper-tiny.en',
    name: 'Whisper Tiny (English Fast)',
    badge: 'RECOMMENDED',
    size: '39 MB',
    speed: '⚡ 1-3s Inference',
    isMultilingual: false,
    desc: 'Optimized for English videos, YouTube Shorts hooks, lectures, and instant dictation with low memory usage.',
  },
  {
    id: 'Xenova/whisper-tiny',
    name: 'Whisper Tiny (Multilingual 100+)',
    badge: 'MULTILINGUAL',
    size: '39 MB',
    speed: '⚡ 2-4s Inference',
    isMultilingual: true,
    desc: 'Auto-detects and transcribes 100+ languages including Hindi, Tamil, Telugu, Spanish, French, and German.',
  },
  {
    id: 'Xenova/whisper-base',
    name: 'Whisper Base (High Accuracy)',
    badge: 'PRO ACCURACY',
    size: '73 MB',
    speed: '🎯 4-7s Inference',
    isMultilingual: true,
    desc: 'Enhanced acoustic resolution for interviews, accented dialogues, podcasts, and noisy background environments.',
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'auto', label: 'Auto-Detect (Global 100+ Languages)' },
  { code: 'en', label: 'English (US, UK, Indian, Global)' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'es', label: 'Spanish (Español)' },
  { code: 'fr', label: 'French (Français)' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'ja', label: 'Japanese (日本語)' },
  { code: 'zh', label: 'Chinese (中文)' },
  { code: 'ar', label: 'Arabic (العربية)' },
  { code: 'pt', label: 'Portuguese (Português)' },
  { code: 'ru', label: 'Russian (Русский)' },
  { code: 'ko', label: 'Korean (한국어)' },
];

export interface DemoSample {
  id: string;
  title: string;
  category: string;
  duration: number; // in seconds
  audioUrl?: string;
  description: string;
  segments: {
    id: number;
    start: number;
    end: number;
    text: string;
    speaker: string;
  }[];
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'tech-news-hook',
    title: 'YouTube Shorts Tech Hook',
    category: 'Creator & Reels',
    duration: 14.5,
    description: 'Energetic video hook discussing in-browser AI inference and zero-trust privacy.',
    segments: [
      {
        id: 1,
        start: 0.0,
        end: 3.8,
        text: 'Stop scrolling! What if you could transcribe any audio file in your browser without uploading a single byte to the cloud?',
        speaker: 'Speaker 1',
      },
      {
        id: 2,
        start: 3.9,
        end: 7.6,
        text: 'With client-side WebGPU acceleration and OpenAI Whisper models, privacy is finally back in your hands.',
        speaker: 'Speaker 1',
      },
      {
        id: 3,
        start: 7.8,
        end: 11.2,
        text: 'You get exact millisecond timestamps, instant SRT subtitle exports, and zero subscriptions forever.',
        speaker: 'Speaker 1',
      },
      {
        id: 4,
        start: 11.4,
        end: 14.5,
        text: 'Try it right now on Kagazo Voice Studio and download your subtitles in zero seconds!',
        speaker: 'Speaker 1',
      },
    ],
  },
  {
    id: 'podcast-dialogue',
    title: 'Podcast Interview Dialogue',
    category: 'Multi-Speaker',
    duration: 19.8,
    description: 'Two-speaker discussion on sovereign computing and data security standards.',
    segments: [
      {
        id: 1,
        start: 0.0,
        end: 4.5,
        text: 'Welcome to episode forty-two. Today we are speaking with our lead software architect about client-side machine learning.',
        speaker: 'Interviewer',
      },
      {
        id: 2,
        start: 4.7,
        end: 9.3,
        text: 'Thanks for having me! The biggest breakthrough this year is WebAssembly SIMD and WebGPU support across modern browsers.',
        speaker: 'Guest',
      },
      {
        id: 3,
        start: 9.5,
        end: 14.8,
        text: 'That means complex transformer models can decode raw audio streams directly inside browser volatile RAM.',
        speaker: 'Guest',
      },
      {
        id: 4,
        start: 15.0,
        end: 19.8,
        text: 'Exactly, which completely eliminates server infrastructure costs while offering absolute data sovereignty to users.',
        speaker: 'Interviewer',
      },
    ],
  },
  {
    id: 'hindi-explainer',
    title: 'Hindi Tech Explainer (हिंदी)',
    category: 'Regional Indian',
    duration: 16.2,
    description: 'Hindi voiceover script demonstrating regional language transcription with accurate timestamps.',
    segments: [
      {
        id: 1,
        start: 0.0,
        end: 4.8,
        text: 'नमस्ते दोस्तों! आज हम बात करेंगे कि कैसे आप किसी भी आवाज़ को टेक्स्ट में बदल सकते हैं, वो भी टाइमस्टैम्प के साथ।',
        speaker: 'वक्ता 1',
      },
      {
        id: 2,
        start: 5.0,
        end: 9.6,
        text: 'कागाज़ो वॉइस टू टेक्स्ट कनवर्टर पूरी तरह से फ्री है और आपके कंप्यूटर में बिना किसी लॉगिन के चलता है।',
        speaker: 'वक्ता 1',
      },
      {
        id: 3,
        start: 9.8,
        end: 16.2,
        text: 'आप तुरंत सबटाइटल्स एसआरटी फाइल डाउनलोड कर सकते हैं और यूट्यूब वीडियो में इस्तेमाल कर सकते हैं।',
        speaker: 'वक्ता 1',
      },
    ],
  },
];
