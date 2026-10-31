import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  Globe2,
  CheckCircle2,
  ArrowRight,
  HardDrive,
  Scale,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Retention Architecture — Kagazo',
  description:
    'Kagazo operates on a strict Zero-Retention Architecture. Your PDF documents and citizen records are processed 100% in volatile RAM or client-side browser memory and never saved to disk.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy & Zero-Retention Architecture — Kagazo',
    description:
      'Zero storage, RAM-only execution, zero logs of personal identity data. Kagazo international privacy policy.',
    url: `${SITE_URL}/privacy`,
    siteName: 'Kagazo',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: 'Kagazo Privacy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Zero-Retention Architecture — Kagazo',
    description: 'Zero persistent storage, RAM-only processing. Full GDPR, LGPD, and DPDP 2023 compliance.',
    images: [`${SITE_URL}/og`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Privacy Policy & Zero-Retention Architecture',
      description:
        'Official privacy policy and technical memory lifecycle specification for Kagazo, covering international privacy laws including GDPR, LGPD, and India DPDP 2023.',
      url: `${SITE_URL}/privacy`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy',
          item: `${SITE_URL}/privacy`,
        },
      ],
    },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-slate-50 text-slate-800 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Retention Cryptographic Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            How Kagazo safeguards your identity documents, biometric photos, and fiscal data through mathematical zero-knowledge lifecycles and ephemeral in-memory processing.
          </p>
        </div>

        {/* Security Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">0 Persistent Storage</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Files exist solely in volatile RAM during cryptographic verification and are wiped immediately upon completion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Server className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">Client-Side First</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over 90% of our sovereign tools execute 100% locally in your browser using HTML5 Canvas and WebAssembly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">Global Compliance</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full adherence to GDPR (EU &amp; UK), LGPD (Brazil), DPDP Act 2023 (India), and Australian Privacy Principles.
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              1. Scope of Privacy Architecture
            </h2>
            <p>
              Kagazo provides online sovereign document utilities, including digital signature verification, passport photo sizing, PDF compression, and statutory salary/tax calculations across 9 jurisdictions. We recognize that these operations involve sensitive Personally Identifiable Information (PII), such as national identity identifiers, financial compensation figures, and biometric portraits.
            </p>
            <p>
              This privacy charter articulates our architectural philosophy: <strong>what is never retained cannot be leaked, breached, subpoenaed, or monetized</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              2. Two-Tier Zero-Retention Processing Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-base block">
                  Tier A: 100% Client-Side In-Browser Execution
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Tools like the Passport Photo Resizer, Exam Dimension Tools (UPSC, SSC, NEET), PJe PDF Compressors, and Statutory Payroll Calculators execute <strong>entirely inside your browser environment</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Images, canvas buffers, and input numbers never travel across the internet. They reside only in your device&apos;s local memory and vanish when you close the tab.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-base block">
                  Tier B: Ephemeral RAM Sovereign PKI Engine
                </span>
                <p className="text-slate-600 leading-relaxed">
                  For operations requiring server-assisted root certificate matching (such as verifying RCAI digital signature byte ranges and injecting ISO 32000-1 /DSS dictionaries):
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>The PDF stream is transmitted via an encrypted TLS 1.3 tunnel directly into volatile RAM.</li>
                  <li><strong>Zero Disk Writes:</strong> Server containers operate with read-only root filesystems and zero mounted storage volumes.</li>
                  <li>Memory is purged immediately upon completion via cryptographic garbage collection.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              3. Password Protection &amp; Decryption Keys
            </h2>
            <p>
              When processing password-protected documents (such as e-Aadhaar or e-PAN PDFs), the passphrase you enter is used exclusively in memory to unlock the PDF binary stream for cryptographic signature parsing.
            </p>
            <p>
              Passphrases are never recorded in server access logs, never transmitted to analytics providers, and are purged the microsecond the memory buffer is cleared.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>4. Multi-Jurisdictional Privacy Rights</span>
            </h2>
            <p>
              Depending on your country of residence, you possess specific statutory rights regarding personal data:
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900">GDPR (European Union &amp; UK):</strong> You possess the right to access, rectification, erasure, and restriction of processing. Because Kagazo operates with zero retention of personal records, we hold no user profiles or identifiable databases to erase.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900">LGPD (Brazil - Lei nº 13.709/2018):</strong> Users in Brazil enjoy rights under Art. 18 of the LGPD. We guarantee that fiscal data (CPF, CNPJ, salários) is never shared with credit rating agencies or commercial brokers.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900">DPDP Act 2023 (India):</strong> Kagazo acts as a pure technical processor with zero unauthorized retention of digital identifiers or biometric data.
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              5. Third-Party Advertising &amp; Google AdSense
            </h2>
            <p>
              To maintain our document utilities as 100% free public services, Kagazo partners with <strong>Google AdSense</strong> to display contextual advertisements:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Google uses cookies (including DoubleClick) to serve advertisements based on past visits to websites.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">aboutads.info</a>.</li>
              <li>In GDPR/LGPD jurisdictions, consent is managed in strict adherence to the IAB Europe Transparency and Consent Framework (TCF v2.2).</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              6. Data Privacy Contact Desk
            </h2>
            <p>
              If you have any questions or inquiries regarding our zero-retention memory lifecycle or compliance standards:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm space-y-1">
              <div><strong>Desk:</strong> Data Protection &amp; Privacy Officer</div>
              <div><strong>Email:</strong> <a href="mailto:privacy@kagazo.in" className="text-emerald-600 font-semibold hover:underline">privacy@kagazo.in</a></div>
              <div><strong>Support:</strong> <a href="mailto:support@kagazo.in" className="text-emerald-600 font-semibold hover:underline">support@kagazo.in</a></div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Experience Total Privacy
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Upload your document with absolute peace of mind. 100% ephemeral, 0% stored.
          </p>
          <Link
            href="/#upload-zone"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-md"
          >
            <span>Verify Document Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
