import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Tamil } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { InstallPromptModal } from '@/components/pwa/InstallPromptModal';
import { FAQ, SITE_CONFIG, SITE_URL } from '@/lib/constants';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { DraggableStickyNav } from '@/components/navigation/DraggableStickyNav';
import { FloatingContactButton } from '@/components/navigation/FloatingContactButton';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kagazo — Verify Indian Government PDF Digital Signature Online Free',
  description:
    'Instantly verify digital signatures on e-Aadhaar, community certificate, nativity certificate, PAN card, DigiLocker PDFs. Fix yellow question mark. Free, no signup, files never stored. Supports Tamil Nadu, AP, Telangana, Karnataka, Kerala government certificates.',
  keywords: [
    'verify aadhaar pdf',
    'digital signature verify india',
    'community certificate verify',
    'nativity certificate signature',
    'pan card pdf verify',
    'digilocker signature',
    'green tick pdf india',
    'tn edistrict certificate verify',
    'meeseva digital signature',
    'nadakacheri caste certificate signature',
    'sevana kerala birth certificate verify',
  ],
  authors: [{ name: 'Kagazo Team' }],
  creator: 'Kagazo',
  publisher: 'Kagazo',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico?v=3' },
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180' }],
    shortcut: ['/favicon.ico?v=3'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Kagazo — Verify Indian Government PDF Digital Signature Online Free',
    description:
      'Instantly verify digital signatures on e-Aadhaar, community certificate, nativity certificate, PAN card, DigiLocker PDFs. Fix yellow question mark.',
    url: SITE_URL,
    siteName: 'Kagazo India',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Kagazo — Verify Indian Government PDF Digital Signature')}&subtitle=${encodeURIComponent('Free · Instant · 100% In-Memory RAM · DPDP Act 2023 Compliant')}&type=verify`,
        width: 1200,
        height: 630,
        alt: 'Kagazo - Indian Government PDF Digital Signature Verification',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kagazo — Verify Indian Government PDF Digital Signature Online Free',
    description:
      'Fix the yellow question mark on e-Aadhaar, community, and government certificates. Free, instant, 100% in-memory.',
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent('Kagazo — Verify Indian Government PDF Digital Signature')}&subtitle=${encodeURIComponent('Free · Instant · 100% In-Memory RAM · DPDP Act 2023 Compliant')}&type=verify`,
    ],
    creator: '@Kagazo_in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '7hCnl0uBreoGPe1TQgNlojWQ2YMEbBUtQ5m842qDYD8',
  },
  other: {
    'revisit-after': '1 day',
  },
};

// 1. WebSite Schema (Google Sitelinks & Brand Identity)
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kagazo',
  alternateName: ['Kagazo India', 'Kagazo PDF Tools', 'Kagazo Document Verification'],
  url: SITE_URL,
  description: 'Instant Indian Government PDF Digital Signature Verification Engine',
  inLanguage: ['en-IN', 'ta-IN', 'hi-IN'],
};

// 2. WebApplication Schema
const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo',
  url: SITE_URL,
  description: 'Free tool to verify digital signatures on Indian government PDFs',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '4820',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'UIDAI e-Aadhaar verification',
    'Tamil Nadu TNeGA e-Sevai certificate validation',
    'Protean & UTIITSL e-PAN verification',
    'TRACES Form 16 DSC validation',
    'DigiLocker Driving License & RC verification',
    'Long-Term Validation (LTV /DSS) green tick embedding',
  ],
  browserRequirements: 'Requires JavaScript and modern browser (Chrome, Firefox, Safari, Edge)',
};

// 3. Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kagazo',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: SITE_CONFIG.supportEmail || 'support@kagazo.in',
    availableLanguage: ['English', 'Tamil', 'Hindi'],
  },
};

// 4. FAQPage Schema (Home Page FAQs)
const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-Kagazo01';

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${notoSansTamil.variable}`}>
      <head>
        {/* Brand Favicon & Cache-Busting Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />

        {/* Google Site Verification & Search Engine Auto-Crawling */}
        <meta name="google-site-verification" content="7hCnl0uBreoGPe1TQgNlojWQ2YMEbBUtQ5m842qDYD8" />
        <meta name="revisit-after" content="1 day" />

        {/* Preconnect for Google Fonts and Supabase */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}

        {/* Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-text-main antialiased selection:bg-primary/20 selection:text-text-main">
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <DraggableStickyNav />
            <main className="flex-1">{children}</main>
            <FloatingContactButton />
            <Footer />

            {/* Telemetry & PWA Prompts */}
            <Analytics />
            <GoogleAnalytics gaId={gaId} />
            <InstallPromptModal />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
