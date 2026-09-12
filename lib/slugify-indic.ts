/**
 * Intelligent multilingual slug generator for Kagazo Blog.
 * Automatically transliterates Tamil, Hindi, and Indian script titles into clean, SEO-friendly Latin slugs.
 * Also auto-detects language ('en', 'ta', 'hi').
 */

const TAMIL_DICTIONARY: Record<string, string> = {
  'சரிபார்க்கப்படவில்லை': 'not-verified',
  'சரிபார்க்கும்': 'verification',
  'சரிபார்ப்பு': 'verification',
  'சான்றிதழ்கள்': 'certificates',
  'சான்றிதழில்': 'certificate',
  'சான்றிதழை': 'certificate',
  'சான்றிதழ்': 'certificate',
  'கையொப்பங்கள்': 'signatures',
  'கையொப்பத்தை': 'signature',
  'கையொப்பம்': 'signature',
  'சரிசெய்வது': 'fix',
  'சரிசெய்ய': 'fix',
  'சரிசெய்தல்': 'fix',
  'சரிபார்க்க': 'verify',
  'இலவசமாக': 'free',
  'இலவச': 'free',
  'வழிகாட்டி': 'guide',
  'சமூக': 'community',
  'ஜாதி': 'community',
  'ஆதார்': 'aadhaar',
  'குடும்ப': 'ration-card',
  'அட்டை': 'card',
  'பட்டா': 'patta',
  'சிட்டா': 'chitta',
  'இருப்பிட': 'nativity',
  'வருமான': 'income',
  'மதிப்பெண்': 'marksheet',
  'அரசு': 'govt',
  'பதிவிறக்கம்': 'download',
  'மஞ்சள்': 'yellow',
  'கேள்விக்குறி': 'question-mark',
  'பச்சை': 'green',
  'டிக்': 'tick',
  'டிஜிட்டல்': 'digital',
  'தமிழ்நாடு': 'tamil-nadu',
  'எப்படி': 'how-to',
};

const HINDI_DICTIONARY: Record<string, string> = {
  'डिजिटल': 'digital',
  'हस्ताक्षर': 'signature',
  'सत्यापित': 'verified',
  'सत्यापन': 'verification',
  'प्रमाणपत्र': 'certificate',
  'प्रमाण': 'certificate',
  'पत्र': 'card',
  'आधार': 'aadhaar',
  'अंकतालिका': 'marksheet',
  'कैसे': 'how-to',
  'करें': 'do',
  'गाइड': 'guide',
  'मुफ्त': 'free',
  'ऑनलाइन': 'online',
  'जाति': 'community',
  'आय': 'income',
  'निवास': 'domicile',
  'पीला': 'yellow',
  'प्रश्नचिह्न': 'question-mark',
  'हरा': 'green',
  'टिक': 'tick',
};

export function detectLanguageFromText(text: string): 'en' | 'ta' | 'hi' {
  if (!text) return 'en';
  // Tamil Unicode Range: U+0B80 - U+0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  // Devanagari (Hindi) Range: U+0900 - U+097F
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}

export function generateSmartSlug(title: string, userLang?: string): {
  slug: string;
  detectedLang: 'en' | 'ta' | 'hi';
} {
  if (!title || !title.trim()) {
    return { slug: '', detectedLang: 'en' };
  }

  const detectedLang = detectLanguageFromText(title);
  const lang = userLang || detectedLang;

  let working = title.toLowerCase();

  // 1. Check for dictionary replacements for Tamil / Hindi (longest words first)
  if (lang === 'ta' || detectedLang === 'ta') {
    const sortedTamil = Object.entries(TAMIL_DICTIONARY).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [taWord, enReplacement] of sortedTamil) {
      working = working.replaceAll(taWord, ` ${enReplacement} `);
    }
  } else if (lang === 'hi' || detectedLang === 'hi') {
    const sortedHindi = Object.entries(HINDI_DICTIONARY).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [hiWord, enReplacement] of sortedHindi) {
      working = working.replaceAll(hiWord, ` ${enReplacement} `);
    }
  }

  // 2. Clean out non-alphanumerics
  let slug = working
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // 3. If title was non-Latin and slug is empty or just numbers, give a meaningful base
  if (!slug || /^\d+$/.test(slug)) {
    if (lang === 'ta') {
      slug = slug ? `tamil-guide-${slug}` : 'tamil-document-guide';
    } else if (lang === 'hi') {
      slug = slug ? `hindi-guide-${slug}` : 'hindi-document-guide';
    } else {
      slug = slug ? `guide-${slug}` : `article-${Date.now()}`;
    }
  }

  // 4. Ensure language suffix exists for regional posts
  if (lang === 'ta' && !slug.endsWith('-tamil')) {
    slug = `${slug}-tamil`;
  } else if (lang === 'hi' && !slug.endsWith('-hindi')) {
    slug = `${slug}-hindi`;
  }

  return { slug, detectedLang };
}
