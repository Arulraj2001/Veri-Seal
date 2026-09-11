'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQ } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';

const FAQ_TA = [
  {
    question: 'எனது அரசு PDF கோப்பில் மஞ்சள் கேள்விக்குறி ஏன் காட்டப்படுகிறது?',
    answer:
      'இந்திய அரசு PDF கோப்புகள் NIC, eMudhra அல்லது பிற CCA இந்தியா உரிமம் பெற்ற அமைப்புகளின் சான்றிதழ்களைப் பயன்படுத்தி டிஜிட்டல் முறையில் கையொப்பமிடப்படுகின்றன. அடோப் அக்ரோபேட் மற்றும் பெரும்பாலான PDF வியூவர்களது இயல்புநிலை அமைப்பில் இந்தியாவின் Root Certifying Authority (RCAI) சேர்க்கப்படவில்லை. தகவல் தொழில்நுட்ப சட்டம் 2000-இன் கீழ் கையொப்பம் முற்றிலும் சட்டப்பூர்வமாக செல்லுபடியாகும் என்றாலும், உங்கள் PDF வியூவரால் சரிபார்க்க முடியாததால் மஞ்சள் கேள்விக்குறியைக் காட்டுகிறது. வெரிசீல் உங்கள் PDF-ஐ அதிகாரப்பூர்வ CCA கட்டமைப்புடன் சரிபார்த்து, எந்தச் சாதனத்திலும் தெரியக்கூடிய நிரந்தர பச்சை டிக் குறியை வழங்குகிறது.',
  },
  {
    question: 'எனது ஆவணம் பாதுகாப்பானதா? எனது PDF கோப்பை சேமிக்கிறீர்களா?',
    answer:
      'சரிபார்ப்பின் போது உங்கள் PDF நினைவகத்தில் (RAM) மட்டுமே செயலாக்கப்படுகிறது. நாங்கள் உங்கள் கோப்பை ஒருபோதும் கணினி வட்டில் எழுதுவதில்லை, சேமிப்பதில்லை, மூன்றாம் தரப்பினருடன் பகிர்வதில்லை. சரிபார்ப்பு முடிந்த உடனே கோப்பு நினைவகத்திலிருந்து நீக்கப்படும்.',
  },
  {
    question: 'வெரிசீல் எந்தெந்த அரசு ஆவணங்களை ஆதரிக்கிறது?',
    answer:
      'இந்தியாவின் CCA சான்றிதழ் கட்டமைப்பின் கீழ் டிஜிட்டல் கையொப்பமிட்ட அனைத்து PDF ஆவணங்களையும் வெரிசீல் ஆதரிக்கிறது. இதில் இ-ஆதார், பான் கார்டு, டிஜிலாக்கர் ஆவணங்கள், வருமான வரி படிவம் 16, மற்றும் தமிழ்நாடு இ-சேவை சாதி, இருப்பிடம், வருமானம், பட்டா-சிட்டா உள்ளிட்ட அனைத்து மாநில அரசு சான்றிதழ்களும் அடங்கும்.',
  },
  {
    question: 'எனது ஆதார் PDF கடவுச்சொல் பாதுகாக்கப்பட்டது. இது செயல்படுமா?',
    answer:
      'ஆம், நிச்சயமாக செயல்படும். உங்கள் இ-ஆதார் PDF-ஐ பதிவேற்றிய பிறகு தோன்றும் கடவுச்சொல் கட்டத்தில் உங்கள் ஆதார் கடவுச்சொல்லை (உங்கள் பெயரின் முதல் 4 ஆங்கில பெரிய எழுத்துக்கள் + பிறந்த வருடம், எ.கா: RAMA1995) உள்ளிடவும். நாங்கள் அதை நினைவகத்தில் திறந்து கையொப்பத்தை சரிபார்த்து தருவோம்.',
  },
  {
    question: 'Signature Valid மற்றும் Signature Unknown இடையே உள்ள வித்தியாசம் என்ன?',
    answer:
      'Signature Valid என்றால் ஆவணம் உண்மையான அரசு அமைப்பால் வழங்கப்பட்டது மற்றும் மாற்றப்படவில்லை என்று அர்த்தம். Signature Unknown என்றால் உங்கள் PDF வியூவரால் சான்றிதழ் சங்கிலியை சரிபார்க்க முடியவில்லை - இது உங்கள் ஆவணத்தில் உள்ள பிழை அல்ல, பார்வையாளரின் கட்டமைப்பு பிரச்சனை மட்டுமே. Signature Invalid என்றால் ஆவணம் திருத்தப்பட்டிருக்கலாம்.',
  },
  {
    question: 'இது மொபைல் போன்களில் இயங்குமா?',
    answer:
      'ஆம். வெரிசீல் ஆண்ட்ராய்டு மற்றும் ஐபோன் உலாவிகளில் சிறப்பாக வேலை செய்கிறது. எந்த செயலிகளையும் பதிவிறக்கம் செய்ய தேவையில்லை. உங்கள் போன் உலாவியில் veriseal.in ஐ திறந்து உடனடியாக சரிபார்க்கலாம்.',
  },
];

export function FaqSection() {
  const { t, language } = useLanguage();
  const faqList = language === 'ta' ? FAQ_TA : FAQ;

  return (
    <section id="faq-section" className="py-20 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            {t.faq.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            {t.faq.heading}
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            {t.faq.subheading}
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-darker shadow-soft">
          <Accordion defaultValue="faq-0">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Help footer */}
        <div className="mt-10 text-center text-xs text-text-main/60">
          {t.faq.contactNote}{' '}
          <Link
            href="/contact"
            className="text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>{t.faq.contactLink}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
