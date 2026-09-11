import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Tamil } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { InstallPromptModal } from '@/components/pwa/InstallPromptModal';
import { FAQ, SITE_CONFIG } from '@/lib/constants';
import { AuthProvider } from '@/components/providers/AuthProvider';

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
  metadataBase: new URL('https://veriseal.in'),
  title: 'VeriSeal — Verify Indian Government PDF Digital Signature Online Free',
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
  authors: [{ name: 'VeriSeal Team' }],
  creator: 'VeriSeal',
  publisher: 'VeriSeal',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: 'https://veriseal.in',
  },
  openGraph: {
    title: 'VeriSeal — Verify Indian Government PDF Digital Signature Online Free',
    description:
      'Instantly verify digital signatures on e-Aadhaar, community certificate, nativity certificate, PAN card, DigiLocker PDFs. Fix yellow question mark.',
    url: 'https://veriseal.in',
    siteName: 'VeriSeal India',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VeriSeal - Indian Government PDF Digital Signature Verification',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeriSeal — Verify Indian Government PDF Digital Signature Online Free',
    description:
      'Fix the yellow question mark on e-Aadhaar, community, and government certificates. Free, instant, 100% in-memory.',
    images: ['/og-image.png'],
    creator: '@veriseal_in',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-veriseal',
  },
};

// 1. WebApplication Schema
const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'VeriSeal',
  url: 'https://veriseal.in',
  description: 'Free tool to verify digital signatures on Indian government PDFs',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  browserRequirements: 'Requires JavaScript',
};

// 2. Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VeriSeal',
  url: 'https://veriseal.in',
  logo: 'https://veriseal.in/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: SITE_CONFIG.supportEmail || 'support@veriseal.in',
  },
};

// 3. FAQPage Schema (Home Page FAQs)
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-VERISEAL01';

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${notoSansTamil.variable}`}>
      <head>
        {/* Preconnect for Google Fonts and Supabase */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}

        {/* Structured Data Schemas */}
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Telemetry & PWA Prompts */}
          <Analytics />
          <GoogleAnalytics gaId={gaId} />
          <InstallPromptModal />
        </AuthProvider>
      </body>
    </html>
  );
}
