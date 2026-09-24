'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FaqItemData {
  question: string;
  answer: string;
}

const FAQ_EN: FaqItemData[] = [
  {
    question: 'Why does my government PDF show a yellow question mark?',
    answer:
      "Indian government PDFs are digitally signed using certificates from NIC, eMudhra, or other CCA India licensed authorities. Adobe Acrobat and most PDF viewers don't include India's Root Certifying Authority (RCAI) in their default trusted certificate store. So even though the signature is completely valid and legally recognised under the Information Technology Act 2000, your PDF viewer shows a yellow question mark because it cannot automatically verify the issuer. Kagazo checks your PDF against the actual CCA India trust hierarchy and gives you a copy with a permanent green tick visible on any device.",
  },
  {
    question: 'Is my document safe? Do you store my PDF or photos?',
    answer:
      'Zero storage. All document verification, photo resizing, and PDF compression executes 100% in your browser memory (RAM) or transient memory. We never write your files to disk, never save copies on cloud servers, and never share data with third parties. Your files are automatically purged from memory immediately upon completion, fully compliant with India’s Digital Personal Data Protection (DPDP) Act 2023.',
  },
  {
    question: 'How does Kagazo ensure zero rejection for UPSC, TNPSC & SSC exam portals?',
    answer:
      'Government exam portals like TNPSC OTR, UPSC Civil Services, SSC CGL, and IBPS enforce strict pixel dimensions (e.g. 125×165px for TNPSC, 3.5×4.5cm for UPSC) and tight file size ceilings (20KB–50KB for photos, 50KB–100KB for declarations, under 200KB for certificates). Kagazo tools use lossless compression and auto-canvas calibration to ensure your files match exact recruitment board criteria on the very first upload without blur or rejection.',
  },
  {
    question: 'What is UIDAI Aadhaar Masking and is it legally valid?',
    answer:
      'Under UIDAI circulars and RBI KYC guidelines, sharing your full 12-digit Aadhaar number with private entities (hotels, employers, telecom agents) is unsafe and strictly discouraged. A masked Aadhaar reveals only the last 4 digits (e.g., XXXX-XXXX-1234) while keeping the photo, demographic details, and QR code intact. Kagazo masks your Aadhaar entirely in client-side canvas without uploading your Aadhaar to any remote server, producing a legally compliant KYC copy.',
  },
  {
    question: 'How do Cyber Cafes and CSC centers print 5 ID cards on a single A4 sheet?',
    answer:
      'Using our A4 Multi-Card Gang Sheet Studio, cyber cafes and CSC operators can upload up to 5 individual cards (Aadhaar, PAN, Voter ID, Driving License) and tile them onto an exact A4 sheet at 300 DPI with cut-guides and Epson L805 tray presets. This saves up to 80% photo paper cost and eliminates tedious manual Photoshop alignment.',
  },
  {
    question: 'My Aadhaar or e-Sevai PDF is password protected. Will it work?',
    answer:
      'Yes. Enter your PDF password (for e-Aadhaar: the first 4 letters of your name in uppercase followed by your birth year, e.g. RAMA1995) in the password field upon uploading. The file is decrypted in RAM, cryptographically audited, and returned with the green seal intact.',
  },
  {
    question: 'How do the Home Construction Cost, Vehicle OS, and Business OS calculators work?',
    answer:
      'Our civic decision calculators provide transparent, unbiased mathematical models. The Home Cost OS calculates cement bags, steel tonnage, sand volume, and labor rates tailored to Indian cities. Vehicle OS computes the true 5-year Total Cost of Ownership (TCO) comparing EV vs Petrol vs Diesel factoring in battery replacement and EMI interest. Business Profit OS models real margins after GST and break-even sales.',
  },
  {
    question: 'Does Kagazo work on mobile phones and tablets?',
    answer:
      'Yes. Kagazo is designed mobile-first and works seamlessly on Android, iOS, Windows, Mac, and Chromebook browsers. You do not need to install any app or plugin. Simply open kagazo.in on your mobile browser and access all 57+ tools instantly.',
  },
];

const FAQ_TA: FaqItemData[] = [
  {
    question: 'எனது அரசு PDF கோப்பில் மஞ்சள் கேள்விக்குறி ஏன் காட்டப்படுகிறது?',
    answer:
      'இந்திய அரசு PDF கோப்புகள் NIC, eMudhra அல்லது பிற CCA இந்தியா உரிமம் பெற்ற அமைப்புகளின் சான்றிதழ்களைப் பயன்படுத்தி டிஜிட்டல் முறையில் கையொப்பமிடப்படுகின்றன. அடோப் அக்ரோபேட் மற்றும் பெரும்பாலான PDF வியூவர்களது இயல்புநிலை அமைப்பில் இந்தியாவின் Root Certifying Authority (RCAI) சேர்க்கப்படவில்லை. தகவல் தொழில்நுட்ப சட்டம் 2000-இன் கீழ் கையொப்பம் முற்றிலும் சட்டப்பூர்வமாக செல்லுபடியாகும் என்றாலும், உங்கள் PDF வியூவரால் சரிபார்க்க முடியாததால் மஞ்சள் கேள்விக்குறியைக் காட்டுகிறது. காகாசோ உங்கள் PDF-ஐ அதிகாரப்பூர்வ CCA கட்டமைப்புடன் சரிபார்த்து, எந்தச் சாதனத்திலும் தெரியக்கூடிய நிரந்தர பச்சை டிக் குறியை வழங்குகிறது.',
  },
  {
    question: 'எனது ஆவணம் பாதுகாப்பானதா? எனது PDF கோப்பை சேமிக்கிறீர்களா?',
    answer:
      'முழுமையான பாதுகாப்பு உத்தரவாதம். உங்கள் ஆவணங்கள் அனைத்தும் உங்களது உலாவி நினைவகத்தில் (RAM) மட்டுமே செயலாக்கப்படுகிறது. நாங்கள் உங்கள் கோப்பை ஒருபோதும் சர்வரில் சேமிப்பதில்லை, மூன்றாம் தரப்பினருடன் பகிர்வதில்லை. சரிபார்ப்பு முடிந்த உடனே கோப்பு நினைவகத்திலிருந்து முழுமையாக அழிக்கப்படும்.',
  },
  {
    question: 'TNPSC, UPSC மற்றும் SSC தேர்வு போர்ட்டல்களில் நிராகரிப்பு இல்லாமல் பதிவேற்றுவது எப்படி?',
    answer:
      'TNPSC OTR, UPSC, SSC மற்றும் IBPS தேர்வுகள் கடுமையான பிக்சல் அளவுகளையும் (எ.கா: TNPSC 125×165px) மற்றும் கோப்பு அளவு வரம்புகளையும் (20KB–50KB புகைப்படம், 200KB சான்றிதழ்) கட்டாயமாக்குகின்றன. காகாசோ கருவிகள் அரசு விதிமுறைகளின்படி புகைப்படங்கள் மற்றும் கையொப்பங்களை துல்லியமாக மாற்றித் தருகின்றன.',
  },
  {
    question: 'ஆதார் எண் மறைப்பு (Masked Aadhaar) சட்டப்பூர்வமானதா?',
    answer:
      'ஆம். UIDAI மற்றும் இந்திய ரிசர்வ் வங்கியின் விதிமுறைகளின்படி, தனியார் நிறுவனங்களுக்கு முழு ஆதார் எண்ணைக் கொடுப்பது தவிர்க்கப்பட வேண்டும். முதல் 8 எண்களை மறைத்து கடைசி 4 எண்களை மட்டும் காட்டும் மாஸ்க் ஆதார் சட்டப்பூர்வமாக செல்லும். இதை காகாசோ மூலம் நொடிகளில் செய்யலாம்.',
  },
  {
    question: 'ஒரே A4 தாளில் 5 ஐடி கார்டுகளை பிரின்ட் செய்வது எப்படி?',
    answer:
      'எங்கள் A4 Multi-Card Gang Sheet கருவியைப் பயன்படுத்தி, இ-சேவை மற்றும் பிரவுசிங் சென்டர் உரிமையாளர்கள் ஆதார், பான், ஓட்டுநர் உரிமம் ஆகியவற்றை ஒரே A4 தாளில் 300 DPI தரத்தில் வரிசைப்படுத்தி பிரின்ட் செய்து தாள் செலவை 80% வரை குறைக்கலாம்.',
  },
  {
    question: 'எனது ஆதார் PDF கடவுச்சொல் பாதுகாக்கப்பட்டது. இது செயல்படுமா?',
    answer:
      'ஆம். உங்கள் பெயரின் முதல் 4 ஆங்கில பெரிய எழுத்துக்கள் + பிறந்த வருடம் (எ.கா: RAMA1995) உள்ளிட்டால், நினைவகத்தில் திறந்து கையொப்பத்தை சரிபார்த்து நிரந்தர பச்சை டிக் முத்திரையுடன் தரும்.',
  },
  {
    question: 'வீட்டு கட்டுமான செலவு மற்றும் வாகன கணக்கீடுகள் எவ்வாறு செயல்படுகின்றன?',
    answer:
      'எங்கள் குடிமக்கள் கணிப்பான்கள் தமிழ்நாட்டின் தற்போதைய சிமெண்ட், கம்பி (TMT Steel), மணல் மற்றும் கூலி விகிதங்களை அடிப்படையாகக் கொண்டு துல்லியமான மதிப்பீட்டை வழங்குகின்றன.',
  },
  {
    question: 'இது மொபைல் போன்களில் இயங்குமா?',
    answer:
      'ஆம். காகாசோ ஆண்ட்ராய்டு மற்றும் ஐபோன் உலாவிகளில் சிறப்பாக வேலை செய்கிறது. எந்த செயலிகளையும் பதிவிறக்கம் செய்ய தேவையில்லை. உங்கள் போன் உலாவியில் kagazo.in ஐ திறந்து உடனடியாக பயன்படுத்தலாம்.',
  },
];

interface FaqSectionProps {
  hideDecisionEngines?: boolean;
}

export function FaqSection({ hideDecisionEngines = true }: FaqSectionProps) {
  const { language } = useLanguage();
  const rawList = language === 'ta' ? FAQ_TA : FAQ_EN;
  const faqList = hideDecisionEngines
    ? rawList.filter(
        (item) =>
          !item.question.includes('Home Construction') &&
          !item.question.includes('வீட்டு கட்டுமான')
      )
    : rawList;

  return (
    <section id="faq-section" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 shadow-2xs">
            {language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main mt-4 tracking-tight">
            {language === 'ta'
              ? 'அரசு ஆவண & தேர்வு கருவிகள் பற்றிய கேள்விகள்'
              : 'Everything You Need to Know About Kagazo'}
          </h2>
          <p className="text-sm sm:text-base text-text-main/70 mt-3">
            {language === 'ta'
              ? 'டிஜிட்டல் கையொப்பங்கள், தேர்வு விதிமுறைகள் மற்றும் தனியுரிமை பாதுகாப்பு விவரங்கள்.'
              : 'Clear answers on digital signature validation, exam upload compliance, and zero-storage privacy.'}
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-surface-darker/80 dark:border-slate-800 shadow-soft">
          <Accordion defaultValue="faq-0">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left font-bold text-base text-text-main dark:text-white hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-text-main/75 dark:text-slate-300 leading-relaxed pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Help footer */}
        <div className="mt-10 text-center text-xs text-text-main/60">
          Have another question or need custom exam portal tools?{' '}
          <Link
            href="/contact"
            className="text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Contact Support &amp; Engineering Desk</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
