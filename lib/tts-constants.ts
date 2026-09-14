export interface NeuralVoice {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  locale: string;
  flag: string;
}

export const POPULAR_NEURAL_VOICES: NeuralVoice[] = [
  { id: 'en-US-JennyNeural', name: 'Jenny (US English)', gender: 'Female', locale: 'en-US', flag: '🇺🇸' },
  { id: 'en-US-GuyNeural', name: 'Guy (US English)', gender: 'Male', locale: 'en-US', flag: '🇺🇸' },
  { id: 'en-US-AriaNeural', name: 'Aria (US English)', gender: 'Female', locale: 'en-US', flag: '🇺🇸' },
  { id: 'en-US-ChristopherNeural', name: 'Christopher (US English)', gender: 'Male', locale: 'en-US', flag: '🇺🇸' },
  { id: 'en-GB-SoniaNeural', name: 'Sonia (UK English)', gender: 'Female', locale: 'en-GB', flag: '🇬🇧' },
  { id: 'en-GB-RyanNeural', name: 'Ryan (UK English)', gender: 'Male', locale: 'en-GB', flag: '🇬🇧' },
  { id: 'en-IN-NeerjaNeural', name: 'Neerja (Indian English)', gender: 'Female', locale: 'en-IN', flag: '🇮🇳' },
  { id: 'en-IN-PrabhatNeural', name: 'Prabhat (Indian English)', gender: 'Male', locale: 'en-IN', flag: '🇮🇳' },
  { id: 'hi-IN-SwaraNeural', name: 'Swara (Hindi)', gender: 'Female', locale: 'hi-IN', flag: '🇮🇳' },
  { id: 'hi-IN-MadhurNeural', name: 'Madhur (Hindi)', gender: 'Male', locale: 'hi-IN', flag: '🇮🇳' },
  { id: 'ta-IN-PallaviNeural', name: 'Pallavi (Tamil)', gender: 'Female', locale: 'ta-IN', flag: '🇮🇳' },
  { id: 'ta-IN-ValluvarNeural', name: 'Valluvar (Tamil)', gender: 'Male', locale: 'ta-IN', flag: '🇮🇳' },
  { id: 'te-IN-ShrutiNeural', name: 'Shruti (Telugu)', gender: 'Female', locale: 'te-IN', flag: '🇮🇳' },
  { id: 'es-ES-ElviraNeural', name: 'Elvira (Spanish)', gender: 'Female', locale: 'es-ES', flag: '🇪🇸' },
  { id: 'fr-FR-DeniseNeural', name: 'Denise (French)', gender: 'Female', locale: 'fr-FR', flag: '🇫🇷' },
  { id: 'de-DE-KatjaNeural', name: 'Katja (German)', gender: 'Female', locale: 'de-DE', flag: '🇩🇪' },
  { id: 'ja-JP-NanamiNeural', name: 'Nanami (Japanese)', gender: 'Female', locale: 'ja-JP', flag: '🇯🇵' },
  { id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao (Chinese)', gender: 'Female', locale: 'zh-CN', flag: '🇨🇳' },
  { id: 'ar-SA-ZariyahNeural', name: 'Zariyah (Arabic)', gender: 'Female', locale: 'ar-SA', flag: '🇸🇦' },
  { id: 'pt-BR-FranciscaNeural', name: 'Francisca (Portuguese)', gender: 'Female', locale: 'pt-BR', flag: '🇧🇷' },
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
