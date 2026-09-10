import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

// In-memory default store for all 5 sections
const contentStore: Record<string, Record<string, any>> = {
  hero: {
    en: {
      headline: 'Verify Indian Government PDF Digital Signatures Online',
      subheadline: 'Instantly validate digital certificates on e-Aadhaar, e-PAN, Community, Income, and Parivahan documents against official CCA India Root Trust Authority.',
      badge1: '100% In-Memory RAM Validation',
      badge2: 'CCA India / RCAI PKI Verified',
      badge3: 'Zero File Retention Guarantee',
      counterLabel: 'Signatures Cryptographically Verified in India',
    },
    ta: {
      headline: 'இந்திய அரசு PDF டிஜிட்டல் கையொப்பங்களை ஆன்லைனில் சரிபார்க்கவும்',
      subheadline: 'மின்-ஆதார், மின்-பான், சாதி, வருமானம் மற்றும் பிற அரசு சான்றிதழ்களின் டிஜிட்டல் கையொப்பங்களை உடனடியாக சரிபார்க்கவும்.',
      badge1: '100% நினைவக பாதுகாப்பு',
      badge2: 'CCA இந்திய அங்கீகாரம்',
      badge3: 'ஆவண சேமிப்பு இல்லை',
      counterLabel: 'சரிபார்க்கப்பட்ட அரசு ஆவணங்கள்',
    },
  },
  how_it_works: {
    en: {
      steps: [
        {
          title: 'Upload Official Government PDF',
          description: 'Drag and drop your digitally signed Aadhaar, PAN card, caste, income, or court order PDF. Password-protected files supported.',
        },
        {
          title: 'Cryptographic Root Audit',
          description: 'pyHanko verification engine parses ByteRanges, digests SHA-256 hashes, and chains to Controller of Certifying Authorities (CCA) India.',
        },
        {
          title: 'Download LTV-Stamped PDF',
          description: 'Inspect full signer DN, timestamp, and download your green-tick stamped PDF with embedded Long-Term Validation (LTV) dictionary.',
        },
      ],
    },
    ta: {
      steps: [
        {
          title: 'அரசு PDF ஆவணத்தைப் பதிவேற்றவும்',
          description: 'உங்கள் கையொப்பமிட்ட மின்-ஆதார், பான் கார்டு அல்லது அரசு சான்றிதழை பதிவேற்றவும்.',
        },
        {
          title: 'கிரிப்டோகிராஃபிக் சரிபார்ப்பு',
          description: 'இந்திய CCA சான்றிதழ் அதிகாரிகளுடன் கையொப்பத்தின் நம்பகத்தன்மையை சரிபார்க்கிறது.',
        },
        {
          title: 'சரிபார்க்கப்பட்ட PDF பதிவிறக்கம்',
          description: 'பச்சை நிற குறியிடப்பட்ட சரிபார்க்கப்பட்ட PDF ஆவணத்தை உடனடியாக பதிவிறக்கவும்.',
        },
      ],
    },
  },
  faq: {
    en: {
      items: [
        {
          q: 'Why does Adobe Acrobat show a yellow question mark on my Aadhaar?',
          a: 'Adobe Reader does not pre-install Indian CCA root certificates. VeriSeal includes the full CCA India trust store to validate the certificate.',
        },
        {
          q: 'Are my uploaded government documents stored on any server?',
          a: 'No. VeriSeal operates strictly in volatile RAM. Once verification finishes, file buffers are permanently discarded.',
        },
        {
          q: 'Can I verify password-protected e-Aadhaar files?',
          a: 'Yes. Simply enter your 8-character Aadhaar password (first 4 letters of name in CAPITAL + year of birth) during upload.',
        },
      ],
    },
    ta: {
      items: [
        {
          q: 'ஆதார் PDF-ல் மஞ்சள் கேள்விக்குறி தோன்றுவது ஏன்?',
          a: 'அடோப் ரீடரில் இந்திய CCA சான்றிதழ்கள் இயல்பாக சேர்க்கப்படவில்லை. வெரிசீல் இதை முழுமையாக சரிசெய்கிறது.',
        },
        {
          q: 'எனது ஆவணங்கள் சேமிக்கப்படுமா?',
          a: 'இல்லை. உங்கள் ஆவணங்கள் எந்த சேவையகத்திலும் சேமிக்கப்படுவதில்லை. முழுமையான தனிநபர் ரகசியத்தன்மை உறுதி செய்யப்படுகிறது.',
        },
      ],
    },
  },
  supported_docs: {
    en: {
      docs: [
        { name: 'UIDAI e-Aadhaar Letter', state: 'All India', portal: 'myAadhaar Portal', active: true },
        { name: 'Income Tax Department e-PAN', state: 'All India', portal: 'Protean / UTIITSL', active: true },
        { name: 'Tamil Nadu Community Certificate', state: 'Tamil Nadu', portal: 'TNeGA e-Sevai', active: true },
        { name: 'Tamil Nadu Nativity Certificate', state: 'Tamil Nadu', portal: 'TNeGA e-Sevai', active: true },
        { name: 'Parivahan RC / Driving Licence', state: 'All India', portal: 'MoRTH Parivahan', active: true },
        { name: 'High Court Certified Orders', state: 'State Judiciaries', portal: 'e-Courts Services', active: true },
      ],
    },
    ta: {
      docs: [
        { name: 'மின்-ஆதார் கடிதம்', state: 'இந்தியா முழுவதும்', portal: 'UIDAI தளம்', active: true },
        { name: 'மின்-பான் கார்டு', state: 'இந்தியா முழுவதும்', portal: 'வருமான வரி தளம்', active: true },
        { name: 'சாதிச் சான்றிதழ்', state: 'தமிழ்நாடு', portal: 'மின்-சேவை தளம்', active: true },
      ],
    },
  },
  trust: {
    en: {
      cards: [
        { icon: 'ShieldCheck', title: 'CCA India Root Authority', description: 'Audits against Root Certifying Authority of India (RCAI) 2014 & 2022 roots.' },
        { icon: 'Lock', title: 'Zero Document Storage', description: 'Documents are processed exclusively in volatile RAM and never saved to disk.' },
        { icon: 'Cpu', title: 'Native pyHanko Verification', description: 'Deterministic ASN.1 parsing and RFC 3161 cryptographic timestamp validation.' },
        { icon: 'FileCheck', title: 'LTV DSS Stamping', description: 'Embeds Long-Term Validation dictionaries compatible with Adobe Acrobat.' },
      ],
    },
    ta: {
      cards: [
        { icon: 'ShieldCheck', title: 'CCA இந்திய சான்றளிப்பு', description: 'அங்கீகரிக்கப்பட்ட இந்திய சான்றிதழ் அதிகாரிகளின் நேரடி சரிபார்ப்பு.' },
        { icon: 'Lock', title: 'முழுமையான பாதுகாப்பு', description: 'ஆவணங்கள் நினைவகத்தில் மட்டுமே சரிபார்க்கப்படுகின்றன.' },
      ],
    },
  },
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section') || 'hero';
    const language = searchParams.get('language') || 'en';

    // Try Supabase first
    try {
      const { data } = await supabase
        .from('content')
        .select('data')
        .eq('section', section)
        .eq('language', language)
        .single();

      if (data && data.data) {
        return NextResponse.json({ data: data.data });
      }
    } catch (e) {
      console.debug('Supabase content read fallback:', e);
    }

    const fallbackData = contentStore[section]?.[language] || {};
    return NextResponse.json({ data: fallbackData });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { section, language, data } = body;

    if (!section || !language || !data) {
      return NextResponse.json({ error: 'Section, language, and data are required.' }, { status: 400 });
    }

    // Save to memory store
    if (!contentStore[section]) contentStore[section] = {};
    contentStore[section][language] = data;

    // Save to Supabase
    try {
      await supabase
        .from('content')
        .upsert({
          section,
          language,
          data,
          updated_at: new Date().toISOString(),
        });
    } catch (e) {
      console.debug('Supabase content write fallback:', e);
    }

    return NextResponse.json({ success: true, section, language, data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
