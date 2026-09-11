import type { Metadata } from 'next';
import * as React from 'react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact VeriSeal — Support & Enterprise Digital Signature Verification',
  description:
    'Need help verifying your Indian government PDF signature or have enterprise bulk verification questions? Contact the VeriSeal engineering and support team.',
  keywords: [
    'contact veriseal',
    'veriseal support',
    'digital signature verification help',
    'aadhaar signature help',
    'enterprise pki api india',
    'veriseal customer care',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact VeriSeal — Support & Enterprise Digital Signature Verification',
    description:
      'Need help verifying your Indian government PDF signature or have enterprise bulk verification questions? Contact our team.',
    url: `${SITE_URL}/contact`,
    siteName: 'VeriSeal',
    images: [
      {
        url: `${SITE_URL}/og?title=` + encodeURIComponent('Contact VeriSeal — Support & Verification Assistance'),
        width: 1200,
        height: 630,
        alt: 'Contact VeriSeal',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact VeriSeal — Support & Enterprise Digital Signature Verification',
    description:
      'Contact VeriSeal for technical support on Indian government PDF signatures or enterprise API integrations.',
    images: [`${SITE_URL}/og?title=` + encodeURIComponent('Contact VeriSeal — Support & Verification Assistance')],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact VeriSeal',
    url: `${SITE_URL}/contact`,
    description:
      'Get in touch with the VeriSeal team for digital signature verification assistance, technical inquiries, and enterprise integration.',
    mainEntity: {
      '@type': 'Organization',
      name: 'VeriSeal',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@veriseal.in',
        availableLanguage: ['English', 'Tamil', 'Hindi'],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
