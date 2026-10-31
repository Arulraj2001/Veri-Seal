import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'State Land Tax & Surcharge Calculator (NSW, VIC, QLD, WA) | Kagazo Australia',
  description:
    'Model annual state land tax liabilities based on the Valuer-General\'s unimproved site value, evaluate Principal Place of Residence (PPR) full exemptions, and calculate Victorian COVID debt levies and foreign owner surcharges.',
  alternates: {
    canonical: 'https://kagazo.in/au/land-tax-state-revenue-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/land-tax-state-revenue-calculator',
      'en': 'https://kagazo.in/au/land-tax-state-revenue-calculator',
      'x-default': 'https://kagazo.in/au/land-tax-state-revenue-calculator',
    },
  },
  openGraph: {
    title: 'State Land Tax & Surcharge Calculator (NSW, VIC, QLD, WA) | Kagazo Australia',
    description:
      'Model annual state land tax liabilities based on the Valuer-General\'s unimproved site value, evaluate Principal Place of Residence (PPR) full exemptions, and calculate Victorian COVID debt levies and foreign owner surcharges.',
    url: 'https://kagazo.in/au/land-tax-state-revenue-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State Land Tax & Surcharge Calculator (NSW, VIC, QLD, WA)',
    description:
      'Model annual state land tax liabilities based on the Valuer-General\'s unimproved site value, evaluate Principal Place of Residence (PPR) full exemptions, and calculate Victorian COVID debt levies and foreign owner surcharges.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
