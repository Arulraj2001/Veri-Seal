import type { Metadata } from 'next';
import { TamilLanguageSetter } from '@/components/providers/TamilLanguageSetter';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    template: '%s | காகஸோ (Kagazo Tamil)',
    default: 'காகஸோ — அரசு ஆவணங்கள் & PDF சரிபார்ப்பு | இலவச இணைய கருவிகள்',
  },
  description:
    'ஆதார் அட்டை, சாதி சான்றிதழ், வருமான சான்றிதழ், டிஜிலாக்கர் PDF டிஜிட்டல் கையொப்ப சரிபார்ப்பு மற்றும் TNPSC, TNEB தேர்வுக்கான புகைப்பட & கையொப்ப அளவு குறைக்கும் இலவச இணையக் கருவிகள்.',
  alternates: {
    canonical: `${SITE_URL}/ta`,
    languages: {
      'ta-IN': `${SITE_URL}/ta`,
      'en': SITE_URL,
    },
  },
  openGraph: {
    locale: 'ta_IN',
    siteName: 'காகஸோ (Kagazo Tamil)',
  },
};

export default function TamilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TamilLanguageSetter />
      <div className="font-tamil">{children}</div>
    </>
  );
}
