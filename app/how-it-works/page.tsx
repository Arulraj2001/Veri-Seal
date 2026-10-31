import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
  ArrowRight,
  Globe2,
  FileCheck2,
  Layers,
  Zap,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How It Works — Sovereign Cryptographic & Statutory Verification Architecture | Kagazo',
  description:
    'Comprehensive architectural breakdown of Kagazo: Zero-Retention in-memory digital signature validation, ISO 32000-1 LTV stamping, client-side WebAssembly tools, and multi-jurisdiction tax engines.',
  alternates: {
    canonical: `${SITE_URL}/how-it-works`,
  },
  openGraph: {
    title: 'How It Works — Technical Architecture & Sovereign PKI | Kagazo',
    description:
      'Learn how Kagazo combines client-side WASM, SHA-256 byte range audits, CCA root trust anchors, and multi-sovereign statutory calculation engines.',
    url: `${SITE_URL}/how-it-works`,
    siteName: 'Kagazo',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: 'How Kagazo Works' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Kagazo Works — Cryptographic & Sovereign Architecture',
    description:
      'Deep architectural whitepaper detailing Kagazo zero-knowledge document processing and statutory engines.',
    images: [`${SITE_URL}/og`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      headline: 'Kagazo Platform Architecture: Sovereign PKI, Zero-Retention Memory, and Statutory Engines',
      description:
        'A comprehensive technical whitepaper outlining client-side WebAssembly execution, PDF byte range cryptographic verification, ISO 32000-1 LTV stamping, and multi-jurisdictional tax simulation.',
      url: `${SITE_URL}/how-it-works`,
      publisher: {
        '@type': 'Organization',
        name: 'Kagazo',
        url: SITE_URL,
      },
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
          name: 'How It Works',
          item: `${SITE_URL}/how-it-works`,
        },
      ],
    },
  ],
};

export default function HowItWorksPage() {
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
          <span className="text-slate-800 font-medium">How It Works</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architectural Whitepaper &amp; Execution Model</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How Kagazo Works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            An engineering deep-dive into client-side WebAssembly processing, zero-retention cryptographic verification, and sovereign multi-jurisdiction statutory calculation engines.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              1. Client-Side WebAssembly (WASM) &amp; HTML5 Engines
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For passport photo formatting, exam image cropping, PDF compression, and statutory fiscal calculations, computation executes 100% locally on your machine. Pixels and numbers are processed via browser-sandboxed JavaScript, WebAssembly, and Canvas APIs. No file bytes or personal records are ever transmitted over the network.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              2. Sovereign PKI Signature Validation &amp; /DSS Stamping
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When verifying Indian government digital PDFs (e-Aadhaar, Form 16, e-PAN, state revenue records), our high-throughput cryptographic engine audits the <code>/ByteRange</code> hash array against Root Certifying Authority of India (RCAI) trust anchors, appending ISO 32000-1 Document Security Store (/DSS) dictionaries to permanently turn yellow question marks into verified green checkmarks.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              3. Multi-Jurisdiction Sovereign Statutory Engines
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every country calculator (Australia, UK, Mexico, Brazil, Italy, Germany, France, Spain, and India) is engineered directly from primary statutory legislation: ATO income tax brackets, HMRC PAYE regulations, SAT Mexico Art. 96 ISR tables, CLT Brazil labor law, and Agenzia delle Entrate IRPEF rates. Algorithms run deterministically with zero black-box heuristics.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              4. Zero-Knowledge Cryptographic Memory Lifecycles
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Where server assistance is cryptographically necessary for PKI verification, files exist exclusively in ephemeral, volatile container RAM allocated during the TLS 1.3 handshake. Zero bytes are ever written to magnetic or solid-state disk storage. Upon completion of verification, memory buffers are explicitly wiped via cryptographic garbage collectors.
            </p>
          </div>
        </div>

        {/* Technical Deep-Dive Narrative */}
        <article className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              The Sovereign PKI Dilemma: Why Yellow Question Marks Occur
            </h2>
            <p>
              Under modern public key infrastructure (PKI) standards, digital signatures provide tamper-evident cryptographic proof of origin and integrity. In India, Section 3 of the <strong>Information Technology Act, 2000</strong> grants electronic signatures full legal parity with wet-ink signatures. The Ministry of Electronics &amp; Information Technology oversees the <strong>Root Certifying Authority of India (RCAI)</strong>, which delegates signing authority to licensed Certifying Authorities (such as eMudhra, Protean, Capricorn, IDsign, and the National Informatics Centre).
            </p>
            <p className="mt-3">
              However, desktop PDF viewers such as Adobe Acrobat Reader ship pre-configured with commercial root stores like the Adobe Approved Trust List (AATL). Because sovereign government root certificates are not always embedded into commercial operating system keystores, genuine digital signatures on e-Aadhaar letters, court orders, caste certificates, and tax records are labeled with a confusing yellow question mark stating: <em>"Validity Unknown"</em>.
            </p>
            <p className="mt-3">
              Kagazo resolves this disconnect algorithmically. Rather than requiring users to manually navigate obscure certificate menus, import <code>.cer</code> files, or configure custom trust anchors, our engine parses the cryptographic objects directly and integrates standard-compliant trust material into the document itself.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Step-by-Step Cryptographic Verification Pipeline
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    ByteRange Parsing and Hash Recalculation
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    A PDF signature dictionary contains a <code>/ByteRange [offset1 len1 offset2 len2]</code> array specifying the exact byte sequences covered by the digital signature (omitting the signature value container itself). Kagazo reads these byte streams and computes the SHA-256 hash digest, mathematically proving that zero bytes have been altered or injected since signing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    X.509 Certificate Chain Reconstruction &amp; Revocation Check
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    The engine extracts the signer&apos;s X.509 certificate and recursively reconstructs the complete trust chain up to the RCAI root. Each link in the certificate hierarchy is inspected for validity periods, cryptographic key usage flags (non-repudiation, digital signature), and real-time revocation status via Online Certificate Status Protocol (OCSP) responders or Certificate Revocation Lists (CRLs).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    ISO 32000-1 /DSS (Document Security Store) Injection
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    To make the validation enduring across decades without needing continuous network access, Kagazo constructs a standard ISO 32000-1 Document Security Store (<code>/DSS</code>) dictionary. This dictionary embeds the full certificate chain, OCSP tokens, and cryptographic timestamps directly into the PDF via a standard incremental revision. Once stamped, the PDF displays a permanent green checkmark across all conforming PDF viewers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Client-Side WebAssembly Architecture for Sovereign Tools
            </h2>
            <p>
              In addition to PKI verification, Kagazo hosts over 400 sovereign compliance, photo sizing, and calculation utilities spanning 9 global jurisdictions. Privacy is the fundamental design constraint of this architecture:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Local Image &amp; Document Processing</h4>
                <p className="text-slate-600 text-xs">
                  Tools like the Passport Photo Maker, Exam Dimensions Resizer (UPSC, SSC, NEET), and PDF compressors run via Canvas and client-side WASM. Images never leave your browser buffer.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Deterministic Statutory Engines</h4>
                <p className="text-slate-600 text-xs">
                  Tax brackets, social security deductions, and legal deadlines (CPC Brazil, Art. 120 c.p.c. Italy) are executed via pure client-side mathematical functions, allowing instant recalculation with 0 latency.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Strict Non-Affiliation and Compliance Stance
            </h2>
            <p>
              Kagazo is an independent engineering initiative and is <strong>not affiliated with, endorsed by, or operated by</strong> any government department, tax agency, or judicial court. All algorithms and validation rules are derived from publicly accessible legislation, official gazettes, and international ISO standards.
            </p>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Explore the Sovereign Verification Engine
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Test the speed, accuracy, and zero-retention security of our verification and compliance tools today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#upload-zone"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-md"
            >
              <span>Verify PDF Signature</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition border border-slate-700"
            >
              <span>Browse Sovereign Tools</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
