import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Australian PAYG Withholding & Salary Take-Home Calculator | Kagazo Australia',
  description:
    'Statutory PAYG withholding model calibrated to the ATO revised Stage 3 tax cuts, Medicare Levy (2.0%), Medicare Levy Surcharge (MLS), Higher Education Loan Program (HECS/HELP) compulsory repayments, and the 12.0% employer Superannuation Guarantee.',
  alternates: {
    canonical: 'https://kagazo.in/au/payg-withholding-salary-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/payg-withholding-salary-calculator',
      'en': 'https://kagazo.in/au/payg-withholding-salary-calculator',
      'x-default': 'https://kagazo.in/au/payg-withholding-salary-calculator',
    },
  },
  openGraph: {
    title: 'Australian PAYG Withholding & Salary Take-Home Calculator | Kagazo Australia',
    description:
      'Statutory PAYG withholding model calibrated to the ATO revised Stage 3 tax cuts, Medicare Levy (2.0%), Medicare Levy Surcharge (MLS), Higher Education Loan Program (HECS/HELP) compulsory repayments, and the 12.0% employer Superannuation Guarantee.',
    url: 'https://kagazo.in/au/payg-withholding-salary-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian PAYG Withholding & Salary Take-Home Calculator',
    description:
      'Statutory PAYG withholding model calibrated to the ATO revised Stage 3 tax cuts, Medicare Levy (2.0%), Medicare Levy Surcharge (MLS), Higher Education Loan Program (HECS/HELP) compulsory repayments, and the 12.0% employer Superannuation Guarantee.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
