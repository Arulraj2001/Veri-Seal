import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service — Kagazo',
  description:
    'Terms and conditions governing the use of Kagazo digital signature verification, PDF compression, and exam document preparation utilities.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: 'Terms of Service — Kagazo',
    description:
      'Terms and conditions governing the use of Kagazo sovereign document verification and exam utilities.',
    url: `${SITE_URL}/terms`,
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            Effective Date: September 2026 • Last Updated: October 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-darker shadow-xs space-y-8 text-text-main/80 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the services provided by <strong>Kagazo</strong> (accessible at <Link href="/" className="text-primary hover:underline font-semibold">kagazo.in</Link>), you explicitly acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, along with our <Link href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link> and <Link href="/disclaimer" className="text-primary hover:underline font-semibold">Disclaimer</Link>. If you do not agree to these terms, you must discontinue using this platform immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              2. Description of Services
            </h2>
            <p>
              Kagazo provides browser-based, client-side, and cryptographic server utilities designed to assist Indian citizens, students, job applicants, and cyber café operators. These services include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1 text-sm">
              <li>Cryptographic digital signature verification for Indian government PDF documents (e-Aadhaar, state revenue certificates, PAN, DigiLocker files) against the Controller of Certifying Authorities (CCA India) trust hierarchy.</li>
              <li>PDF compression and document weight reduction to strict kilobyte thresholds (e.g., 100KB, 200KB, 500KB).</li>
              <li>Photo and signature resizing, Date of Photo (DOP) stamping, and layout alignment for recruitment portals (UPSC, SSC, TNPSC, IBPS, RRB).</li>
              <li>Cyber café print layout generation (A4 multi-card gang sheets, 4×6 passport sheets).</li>
              <li>Developer utilities (JSON formatting, minification, encoding/decoding) and financial calculators.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              3. Privacy &amp; Zero-Retention File Processing
            </h2>
            <p>
              Under our <strong>Zero-Retention Architecture</strong>, documents and images uploaded for processing are handled strictly in temporary, volatile computer memory (RAM) or processed 100% locally within your web browser using HTML5 Canvas, WebAssembly, and JavaScript APIs.
            </p>
            <p>
              Kagazo does not store, archive, log, inspect, or sell your personal identity documents, Aadhaar numbers, biometric images, or financial details. As soon as processing completes or your session closes, in-memory buffers are immediately purged.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              4. Permissible Use &amp; Prohibited Conduct
            </h2>
            <p>You agree to use Kagazo only for lawful purposes. You strictly agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1 text-sm">
              <li>Upload fraudulent, counterfeit, altered, or forged government documents or marks with malicious intent to defraud government agencies, banks, or academic institutions.</li>
              <li>Attempt to reverse-engineer, decompile, or launch automated denial-of-service (DoS/DDoS) attacks against the platform's infrastructure.</li>
              <li>Use automated scrapers, bots, or crawling software to burden the server without explicit written permission.</li>
              <li>Misrepresent processed files as official endorsements issued directly by Kagazo.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              5. Intellectual Property &amp; Open Standards
            </h2>
            <p>
              The design, source code, visual branding, proprietary algorithms, and text content of Kagazo are protected by copyright and intellectual property laws. Public domain standards (such as ISO 32000-1 for PDF, RFC 3161 timestamping, and CCA India public root certificates) remain the property of their respective governing bodies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              6. Limitation of Liability &amp; Disclaimer of Warranties
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Crucial Operational Disclaimer</span>
              </div>
              <p>
                Kagazo is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. While our engines strictly adhere to official government guidelines, recruitment portal upload criteria, and cryptographic standards:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>We do not guarantee that recruitment commission portals (UPSC, TNPSC, SSC, NTA) will never alter their server-side validation scripts without notice.</li>
                <li>Users bear sole responsibility for verifying final file dimensions, resolution, and legibility prior to submission on third-party portals.</li>
                <li>Under no circumstances shall Kagazo or its creators be held liable for missed exam deadlines, application rejections, counseling delays, or indirect damages arising from the use of this website.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of India, including the <strong>Information Technology Act, 2000</strong> and the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              8. Contact &amp; Grievance Redressal
            </h2>
            <p>
              If you have any questions, feedback, or grievance reports regarding these terms, please contact our support desk:
            </p>
            <div className="p-4 rounded-2xl bg-surface border border-surface-darker text-sm space-y-1">
              <div><strong>Platform:</strong> Kagazo Sovereign PKI &amp; Document Utilities</div>
              <div><strong>Email:</strong> <a href="mailto:support@kagazo.in" className="text-primary hover:underline font-semibold">support@kagazo.in</a></div>
              <div><strong>Support Desk:</strong> <Link href="/contact" className="text-primary hover:underline font-semibold">kagazo.in/contact</Link></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
