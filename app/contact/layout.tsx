import type { Metadata } from 'next';
import * as React from 'react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Kagazo — Support & Enterprise Digital Signature Verification',
  description:
    'Need help verifying your Indian government PDF signature or have enterprise bulk verification questions? Contact the Kagazo engineering and support team.',
  keywords: [
    'contact Kagazo',
    'Kagazo support',
    'digital signature verification help',
    'aadhaar signature help',
    'enterprise pki api india',
    'Kagazo customer care',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Kagazo — Support & Enterprise Digital Signature Verification',
    description:
      'Need help verifying your Indian government PDF signature or have enterprise bulk verification questions? Contact our team.',
    url: `${SITE_URL}/contact`,
    siteName: 'Kagazo',
    images: [
      {
        url: `${SITE_URL}/og?title=` + encodeURIComponent('Contact Kagazo — Support & Verification Assistance'),
        width: 1200,
        height: 630,
        alt: 'Contact Kagazo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Kagazo — Support & Enterprise Digital Signature Verification',
    description:
      'Contact Kagazo for technical support on Indian government PDF signatures or enterprise API integrations.',
    images: [`${SITE_URL}/og?title=` + encodeURIComponent('Contact Kagazo — Support & Verification Assistance')],
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
    name: 'Contact Kagazo',
    url: `${SITE_URL}/contact`,
    description:
      'Get in touch with the Kagazo team for digital signature verification assistance, technical inquiries, and enterprise integration.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Kagazo',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@Kagazo.in',
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
