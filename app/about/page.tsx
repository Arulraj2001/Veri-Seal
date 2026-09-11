import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Flag, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About VeriSeal — India\'s Premier Sovereign PKI Verification Platform',
  description:
    'VeriSeal was created to help Indian citizens and businesses verify digital signatures on government PDFs instantly without expensive proprietary software.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About VeriSeal — India\'s Premier Sovereign PKI Verification Platform',
    description:
      'Empowering citizens with instant, free, and in-memory cryptographic verification for e-Aadhaar, state certificates, PAN, and DigiLocker documents.',
    url: `${SITE_URL}/about`,
    siteName: 'VeriSeal',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: 'About VeriSeal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About VeriSeal — Sovereign PKI Verification for India',
    description: 'Empowering citizens with instant cryptographic verification for Indian government PDFs.',
    images: [`${SITE_URL}/og`],
  },
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Flag className="w-3.5 h-3.5" />
            <span>Built for Digital India</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            About VeriSeal
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            Democratizing digital document authenticity for over 1.4 billion Indian citizens.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-white border border-surface-darker shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main mb-3">Our Mission</h3>
            <p className="text-text-main/70 text-sm leading-relaxed">
              Every month, thousands of Indian citizens have college counseling admissions delayed, bank loans deferred, or visa applications questioned simply because of a missing green checkmark on their digital PDFs. VeriSeal was built to solve this challenge once and for all.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-surface-darker shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main mb-3">Cryptographic Engine</h3>
            <p className="text-text-main/70 text-sm leading-relaxed">
              VeriSeal runs on high-performance open-source cryptography (pyHanko) combined with verified root trust anchors from the Controller of Certifying Authorities (CCA India). We deliver instant, standards-compliant verification directly in your browser.
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-surface-darker space-y-6 text-text-main/80 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl font-black text-text-main">The Challenge of Indian Sovereign PKI</h2>
          <p>
            Under the <strong>Information Technology Act, 2000</strong>, India established the <strong>Root Certifying Authority of India (RCAI)</strong> to oversee all government and commercial digital certificates. Because India operates its own independent national PKI trust root rather than paying commercial fees to Western operating system vendors, mainstream PDF software frequently labels genuine Indian government certificates with an unverified yellow question mark.
          </p>
          <p>
            VeriSeal bridges this gap. By reconciling document byte ranges with India&apos;s national certificate stores and embedding standards-compliant <strong>Long-Term Validation (/DSS)</strong> dictionaries, VeriSeal gives citizens submissible, verifiable proof of their documents.
          </p>

          <h3 className="text-xl font-bold text-text-main pt-4">Supported Document Ecosystems</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>UIDAI e-Aadhaar &amp; Masked Aadhaar</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Tamil Nadu e-Sevai / TNeGA Certificates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Protean / UTIITSL e-PAN Cards</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>TRACES Form 16 (Part A &amp; B)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>DigiLocker Driving Licenses &amp; RCs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>CBSE &amp; State Board Digital Marksheets</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-text-main text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">Experience Sovereign Verification</h3>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Verify your e-Aadhaar, community certificate, or PAN card in under 2 seconds. Free and secure.
          </p>
          <Link
            href="/#upload-zone"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all shadow-md hover:shadow-lg"
          >
            <span>Verify Document Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
