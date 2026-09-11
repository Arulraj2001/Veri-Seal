import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Retention Architecture — VeriSeal',
  description:
    'VeriSeal strictly operates on a Zero-Retention Architecture. Your Indian government PDF documents are processed 100% in volatile RAM and never saved to disk.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy & Zero-Retention Architecture — VeriSeal',
    description:
      'Zero storage, RAM-only processing, zero logs of personal identity data. VeriSeal privacy policy.',
    url: `${SITE_URL}/privacy`,
    siteName: 'VeriSeal',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: 'VeriSeal Privacy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Zero-Retention Architecture — VeriSeal',
    description: 'Zero storage, RAM-only processing. Full DPDP Act 2023 compliance.',
    images: [`${SITE_URL}/og`],
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Storage Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            How VeriSeal protects your identity data with our Zero-Retention cryptographic architecture.
          </p>
        </div>

        {/* Security Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-surface-darker shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-text-main text-base mb-1">0 Data Retention</h3>
            <p className="text-xs text-text-main/70 leading-relaxed">
              Files exist solely in volatile RAM during cryptographic verification and are purged instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-darker shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-text-main text-base mb-1">In-Memory Engine</h3>
            <p className="text-xs text-text-main/70 leading-relaxed">
              Cryptographic hashes and certificate chains are calculated without ever writing to a database or disk.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-darker shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-text-main text-base mb-1">DPDP 2023 Compliant</h3>
            <p className="text-xs text-text-main/70 leading-relaxed">
              Strictly adheres to India&apos;s Digital Personal Data Protection Act 2023 and Section 43A of the IT Act.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="prose prose-slate max-w-none text-text-main/80 space-y-8 leading-relaxed text-sm sm:text-base">
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-darker">
            <h2 className="text-xl font-bold text-text-main mb-4">1. Scope of Privacy Architecture</h2>
            <p>
              VeriSeal provides online cryptographic digital signature verification for Indian government PDF documents, including e-Aadhaar, state revenue certificates, PAN cards, and DigiLocker files. We recognize that these documents contain highly sensitive Personally Identifiable Information (PII). This policy outlines our absolute commitment to zero persistent data storage.
            </p>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-darker">
            <h2 className="text-xl font-bold text-text-main mb-4">2. Zero-Retention File Processing</h2>
            <p>
              When you upload a PDF to VeriSeal for verification:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Temporary Volatile RAM:</strong> The file buffer is received into isolated container memory (RAM) via an encrypted TLS 1.3 tunnel.</li>
              <li><strong>No Database Storage:</strong> Your document is never saved to physical hard disks, object storage (e.g. AWS S3), or cloud databases.</li>
              <li><strong>Immediate Deletion:</strong> As soon as the cryptographic envelope is parsed and the verification response or stamped file is returned to your browser, all memory allocations are immediately freed and garbage collected.</li>
            </ul>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-darker">
            <h2 className="text-xl font-bold text-text-main mb-4">3. Password Handling</h2>
            <p>
              If your document is password-protected (such as e-Aadhaar or e-PAN), the password you enter is used exclusively in memory to decrypt the PDF binary stream for signature parsing. It is never logged in server access logs, never transmitted to third parties, and is purged as soon as the operation terminates.
            </p>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-darker">
            <h2 className="text-xl font-bold text-text-main mb-4">4. Telemetry & Analytics</h2>
            <p>
              We collect privacy-preserving aggregated telemetry (such as total verification count and generic error codes) to maintain server availability and monitor uptime. We do not track individual users across the web or sell behavioral data to advertising networks.
            </p>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-darker">
            <h2 className="text-xl font-bold text-text-main mb-4">5. Contact Data Privacy Desk</h2>
            <p>
              If you have any questions regarding VeriSeal&apos;s cryptographic security or privacy practices, please contact our privacy compliance desk at <a href="mailto:privacy@veriseal.in" className="text-primary font-bold hover:underline">privacy@veriseal.in</a> or visit our <Link href="/contact" className="text-primary font-bold hover:underline">Contact Desk</Link>.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-primary text-white text-center shadow-lg">
          <h3 className="text-2xl font-black mb-2">Ready to Verify Safely?</h3>
          <p className="text-white/80 text-sm max-w-md mx-auto mb-6">
            Upload your document with total confidence. 100% private, 100% in-memory.
          </p>
          <Link
            href="/#upload-zone"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-surface transition-colors shadow-sm"
          >
            <span>Go to Verification Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
