export interface NeuralVoice {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  locale: string;
  flag: string;
  category: 'English' | 'Indian' | 'European' | 'Global';
  sampleText: string;
}

export const POPULAR_NEURAL_VOICES: NeuralVoice[] = [
  { id: 'en-US-JennyNeural', name: 'Jenny (US English)', gender: 'Female', locale: 'en-US', flag: '🇺🇸', category: 'English', sampleText: 'Hello! I am Jenny, your clear and natural studio voice.' },
  { id: 'en-US-GuyNeural', name: 'Guy (US English)', gender: 'Male', locale: 'en-US', flag: '🇺🇸', category: 'English', sampleText: 'Hey there, I am Guy. Ready to deliver professional narration for your content.' },
  { id: 'en-US-AriaNeural', name: 'Aria (US English)', gender: 'Female', locale: 'en-US', flag: '🇺🇸', category: 'English', sampleText: 'Welcome! I am Aria, crafted for engaging stories and commercial voiceovers.' },
  { id: 'en-US-ChristopherNeural', name: 'Christopher (US English)', gender: 'Male', locale: 'en-US', flag: '🇺🇸', category: 'English', sampleText: 'Greetings. I am Christopher, bringing authoritative depth to news and explainers.' },
  { id: 'en-GB-SoniaNeural', name: 'Sonia (UK English)', gender: 'Female', locale: 'en-GB', flag: '🇬🇧', category: 'English', sampleText: 'Hello, I am Sonia. Providing polished British pronunciation for your scripts.' },
  { id: 'en-GB-RyanNeural', name: 'Ryan (UK English)', gender: 'Male', locale: 'en-GB', flag: '🇬🇧', category: 'English', sampleText: 'Good day! I am Ryan, offering articulate British delivery for podcasts and docs.' },
  { id: 'en-IN-NeerjaNeural', name: 'Neerja (Indian English)', gender: 'Female', locale: 'en-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'Namaste! I am Neerja, speaking fluent, authentic Indian English.' },
  { id: 'en-IN-PrabhatNeural', name: 'Prabhat (Indian English)', gender: 'Male', locale: 'en-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'Hello! I am Prabhat, bringing warm and clear Indian English delivery.' },
  { id: 'hi-IN-SwaraNeural', name: 'Swara (Hindi)', gender: 'Female', locale: 'hi-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'नमस्ते! मैं स्वरा हूँ, आपके कथ्य को सहज और मधुर वाणी देती हूँ।' },
  { id: 'hi-IN-MadhurNeural', name: 'Madhur (Hindi)', gender: 'Male', locale: 'hi-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'नमस्ते! मैं मधुर हूँ, स्पष्ट और प्रभावशाली हिंदी स्वर में।' },
  { id: 'ta-IN-PallaviNeural', name: 'Pallavi (Tamil)', gender: 'Female', locale: 'ta-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'வணக்கம்! நான் பல்லவி, உங்கள் உரையை தெளிவான தமிழில் வாசிக்கிறேன்.' },
  { id: 'ta-IN-ValluvarNeural', name: 'Valluvar (Tamil)', gender: 'Male', locale: 'ta-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'வணக்கம்! நான் வள்ளுவர், கம்பீரமான தமிழ் குரலில் படைக்கிறேன்.' },
  { id: 'te-IN-ShrutiNeural', name: 'Shruti (Telugu)', gender: 'Female', locale: 'te-IN', flag: '🇮🇳', category: 'Indian', sampleText: 'నమస్కారం! నేను శృతి, స్పష్టమైన తెలుగులో మాట్లాడగలను.' },
  { id: 'es-ES-ElviraNeural', name: 'Elvira (Spanish)', gender: 'Female', locale: 'es-ES', flag: '🇪🇸', category: 'European', sampleText: '¡Hola! Soy Elvira, tu voz en español para locuciones de alta fidelidad.' },
  { id: 'fr-FR-DeniseNeural', name: 'Denise (French)', gender: 'Female', locale: 'fr-FR', flag: '🇫🇷', category: 'European', sampleText: 'Bonjour! Je suis Denise, apportant une voix française naturelle et élégante.' },
  { id: 'de-DE-KatjaNeural', name: 'Katja (German)', gender: 'Female', locale: 'de-DE', flag: '🇩🇪', category: 'European', sampleText: 'Hallo! Ich bin Katja, deine präzise und angenehme deutsche Stimme.' },
  { id: 'ja-JP-NanamiNeural', name: 'Nanami (Japanese)', gender: 'Female', locale: 'ja-JP', flag: '🇯🇵', category: 'Global', sampleText: 'こんにちは！ナナミです。自然で滑らかな日本語音声をお届けします。' },
  { id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao (Chinese)', gender: 'Female', locale: 'zh-CN', flag: '🇨🇳', category: 'Global', sampleText: '你好！我是晓晓，为您提供自然生动的普通话语音。' },
  { id: 'ar-SA-ZariyahNeural', name: 'Zariyah (Arabic)', gender: 'Female', locale: 'ar-SA', flag: '🇸🇦', category: 'Global', sampleText: 'مرحباً! أنا زارية، أقدم لك تلاوة صوتية عربية واضحة ومميزة.' },
  { id: 'pt-BR-FranciscaNeural', name: 'Francisca (Portuguese)', gender: 'Female', locale: 'pt-BR', flag: '🇧🇷', category: 'Global', sampleText: 'Olá! Sou Francisca, sua voz em português brasileiro natural e envolvente.' },
];

export const SAMPLE_SCRIPTS = [
  {
    title: 'Customer Support Welcome',
    text: 'Hello and welcome to our customer support center. All our client operations execute with complete zero-trust privacy. How may we assist your team today?',
  },
  {
    title: 'Product Announcement',
    text: 'We are thrilled to unveil our latest release featuring instant in-browser compression, zero latency execution, and full compliance with web standards.',
  },
  {
    title: 'Audiobook Narration',
    text: 'The evening mist settled quietly over the valley as the lone traveler reached the crossroads, looking up at the distant beacon glowing softly against the dusk.',
  },
  {
    title: 'Educational Lecture',
    text: 'Artificial intelligence transforms natural language processing through transformer architectures, enabling speech synthesis with unprecedented human-like inflections and natural pauses.',
  },
];

export interface SituationPreset {
  id: string;
  name: string;
  icon: string;
  desc: string;
  rate: number;
  pitch: number;
}

export const SITUATION_PRESETS: SituationPreset[] = [
  {
    id: 'news',
    name: 'News & Anchor',
    icon: '🎙️',
    desc: 'Crisp, articulate broadcast delivery',
    rate: 1.05,
    pitch: 1.0,
  },
  {
    id: 'audiobook',
    name: 'Story & Audiobook',
    icon: '🎧',
    desc: 'Warm, expressive with natural narrative breath pauses',
    rate: 0.88,
    pitch: 0.95,
  },
  {
    id: 'support',
    name: 'Customer Support',
    icon: '🤝',
    desc: 'Friendly, reassuring, and patient conversation',
    rate: 0.95,
    pitch: 1.05,
  },
  {
    id: 'youtube',
    name: 'YouTube & Explainer',
    icon: '⚡',
    desc: 'High-energy, punchy, engaging presentation',
    rate: 1.18,
    pitch: 1.1,
  },
  {
    id: 'calm',
    name: 'Calm & Meditation',
    icon: '🧘',
    desc: 'Slow, soothing, and relaxing cadence',
    rate: 0.8,
    pitch: 0.9,
  },
  {
    id: 'academic',
    name: 'Academic & Lecture',
    icon: '🎓',
    desc: 'Clear, structured, easy to follow',
    rate: 0.98,
    pitch: 1.0,
  },
];

