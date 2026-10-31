import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK Sort Code & Account Validator | Kagazo UK',
  description:
    'Verify 6-digit sort codes and 8-digit account numbers against UK clearing bank modulus check digit algorithms.',
  alternates: {
    canonical: 'https://kagazo.in/uk/hmrc-modulus-11-sort-code-account-validator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/hmrc-modulus-11-sort-code-account-validator',
      'en': 'https://kagazo.in/uk/hmrc-modulus-11-sort-code-account-validator',
      'x-default': 'https://kagazo.in/uk/hmrc-modulus-11-sort-code-account-validator',
    },
  },
  openGraph: {
    title: 'UK Sort Code & Account Validator | Kagazo UK',
    description:
      'Verify 6-digit sort codes and 8-digit account numbers against UK clearing bank modulus check digit algorithms.',
    url: 'https://kagazo.in/uk/hmrc-modulus-11-sort-code-account-validator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Sort Code & Account Validator',
    description:
      'Verify 6-digit sort codes and 8-digit account numbers against UK clearing bank modulus check digit algorithms.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
