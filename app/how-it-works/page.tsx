import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Upload, Cpu, CheckCircle2, ShieldCheck, FileCheck2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works — Digital Signature Verification Architecture | VeriSeal',
  description:
    'Learn how VeriSeal verifies Indian government PDF digital signatures using SHA-256 byte range hashing, CCA India root trust anchors, and ISO 32000-1 LTV dictionaries.',
  alternates: {
    canonical: 'https://veriseal.in/how-it-works',
  },
  openGraph: {
    title: 'How It Works — Digital Signature Verification Architecture | VeriSeal',
    description:
      'Learn how VeriSeal audits PDF byte ranges, validates against RCAI root certificates, and embeds Long-Term Validation (LTV) dictionaries.',
    url: 'https://veriseal.in/how-it-works',
    siteName: 'VeriSeal',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'How VeriSeal Works' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How VeriSeal Works — Cryptographic PDF Verification',
    description: 'Learn how VeriSeal validates signatures against CCA India root certificates.',
    images: ['/og'],
  },
};

export default function HowItWorksPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Cryptographic Workflow</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            How VeriSeal Works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            From an unverified yellow question mark to a tamper-evident green checkmark in 3 simple steps.
          </p>
        </div>

        {/* 3 Step Visual Cards */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-white border border-surface-darker shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              01
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-main mb-2">
                1. Upload PDF to Ephemeral Memory
              </h3>
              <p className="text-text-main/70 text-sm leading-relaxed">
                Drag and drop your e-Aadhaar, community certificate, or PAN card into VeriSeal. The file is uploaded through an encrypted TLS 1.3 tunnel directly into volatile RAM. If password-protected, the password is used in-memory solely for decryption and is never retained.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-white border border-surface-darker shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              02
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-main mb-2">
                2. ByteRange Audit &amp; RCAI Root Chain Verification
              </h3>
              <p className="text-text-main/70 text-sm leading-relaxed">
                Our cryptographic engine (powered by pyHanko) parses the PDF&apos;s <code>/ByteRange</code> array and calculates the SHA-256 digest to verify that 0 bytes were modified after signing. It validates the intermediate certificate (NIC Sub-CA, eMudhra, Protean) against the official <strong>Root Certifying Authority of India (RCAI)</strong> repository.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-white border border-surface-darker shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              03
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-main mb-2">
                3. Long-Term Validation (/DSS) Stamping
              </h3>
              <p className="text-text-main/70 text-sm leading-relaxed">
                VeriSeal constructs and embeds an ISO 32000-1 compliant <strong>Document Security Store (/DSS)</strong> dictionary containing all necessary certificate paths, CRLs, and OCSP tokens into the document via an incremental update. The resulting PDF displays a permanent green tick mark across all PDF viewers globally.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture Deep Dive */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-surface-darker space-y-6 text-text-main/80 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl font-black text-text-main">The Math Behind the Green Tick</h2>
          <p>
            Unlike physical ink signatures, a PDF digital signature is an encrypted cryptographic digest. The signer&apos;s private key encrypts the document hash. When opened, the viewer decrypts the digest using the public key and compares it to the calculated hash.
          </p>
          <p>
            Adobe Acrobat displays a yellow question mark because it cannot confirm that the public key originates from a trusted root. By connecting the dots back to the Indian Ministry of Electronics &amp; Information Technology&apos;s sovereign root certificates, VeriSeal provides mathematical certainty of authenticity.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-primary text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">Try It on Your PDF</h3>
          <p className="text-white/80 text-sm max-w-md mx-auto mb-6">
            See the verification engine in action. Free, instant, and completely private.
          </p>
          <Link
            href="/#upload-zone"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold text-sm hover:bg-surface transition-colors shadow-md"
          >
            <span>Verify Document Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
