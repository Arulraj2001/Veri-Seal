import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Globe2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Lock,
  Scale,
  Users,
  Code2,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Kagazo — Sovereign PKI Verification & Global Compliance Platform',
  description:
    'Discover Kagazo: an independent engineering platform providing zero-retention cryptographic PDF signature validation, sovereign calculation engines, and civic compliance tools across 9 jurisdictions.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Kagazo — Sovereign PKI & Compliance Architecture',
    description:
      'Learn about Kagazo mission, engineering credentials, E-E-A-T disclosures, and global sovereign compliance hubs.',
    url: `${SITE_URL}/about`,
    siteName: 'Kagazo',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: 'About Kagazo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kagazo — Sovereign PKI Verification & Global Tools',
    description:
      'Independent sovereign cryptographic validation and civic utility platform across 9 global jurisdictions.',
    images: [`${SITE_URL}/og`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: 'About Kagazo',
      description:
        'Platform overview, engineering credentials, sovereign jurisdictions, and E-E-A-T disclosures for Kagazo.',
      url: `${SITE_URL}/about`,
    },
    {
      '@type': 'Organization',
      name: 'Kagazo',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        'Independent sovereign PKI verification and multi-jurisdictional civic calculation platform.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@kagazo.in',
        contactType: 'Customer Support',
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
          name: 'About',
          item: `${SITE_URL}/about`,
        },
      ],
    },
  ],
};

export default function AboutPage() {
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
          <span className="text-slate-800 font-medium">About</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Independent Sovereign Engineering Initiative</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About Kagazo
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Democratizing cryptographic document authenticity, statutory precision, and privacy-first digital utilities for citizens and businesses across the globe.
          </p>
        </div>

        {/* Core Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Zero-Retention Security</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every cryptographic verification and image format conversion executes strictly in volatile RAM or local browser memory. No data is stored, profiled, or sold.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Legislative Precision</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our tax, payroll, and court timeline calculators are built on primary gazette laws across 9 sovereign nations, eliminating black-box estimates and opaque rules.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Civic Accessibility</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              High-tier enterprise PKI tools and complex tax calculators are often locked behind paywalls. Kagazo keeps critical sovereign utilities 100% free for all citizens.
            </p>
          </div>
        </div>

        {/* Narrative & Platform History */}
        <article className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Our Genesis: Solving the Sovereign PKI Gap
            </h2>
            <p>
              Kagazo originated as an engineering solution to a frustrating recurring problem in India&apos;s digital infrastructure: genuine electronic documents issued by the government — including UIDAI e-Aadhaar, state revenue e-Sevai certificates, TRACES Form 16s, and e-PAN cards — routinely display a yellow question mark (<em>"Validity Unknown"</em>) when viewed in standard PDF viewers.
            </p>
            <p className="mt-3">
              Because proprietary operating systems and commercial software suites rely on commercial root certification programs (often demanding exorbitant commercial audit fees from foreign sovereign bodies), India&apos;s <strong>Root Certifying Authority of India (RCAI)</strong> trust chain is frequently unverified out-of-the-box. As a consequence, students facing college counseling, applicants seeking government jobs, and entrepreneurs applying for commercial bank loans were routinely turned away due to an unverified visual badge.
            </p>
            <p className="mt-3">
              We engineered a standards-compliant solution: an automated cryptographic engine that validates document byte ranges against the national RCAI root certificate repository and embeds an ISO 32000-1 <strong>Document Security Store (/DSS)</strong> dictionary. This turns the yellow question mark into an universally recognized, permanent green checkmark across all conforming PDF viewers worldwide.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Global Evolution: Sovereign Compliance Across 9 Jurisdictions
            </h2>
            <p>
              Recognizing that citizens in other nations encounter comparable bureaucratic hurdles when formatting official documents, calculating statutory deductions, and validating fiscal identifiers, Kagazo expanded into a global sovereign compliance platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇮🇳 India (Primary PKI)</span>
                e-Aadhaar verification, GSTIN checksum verification, UPSC/SSC exam photo dimensions, state revenue certificates.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇦🇺 Australia</span>
                ATO income tax brackets, Superannuation Guarantee (11.5%), GST calculators, Medicare levy calculations.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇬🇧 United Kingdom</span>
                HMRC PAYE salary calculations, National Insurance thresholds, Stamp Duty Land Tax (SDLT), VAT return tools.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇲🇽 Mexico</span>
                SAT Art. 96 ISR salary deductions, IMSS employer quotas, IVA 16% fiscal engines, RFC homoclave validation.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇧🇷 Brazil</span>
                Salário Líquido CLT, Rescisão Trabalhista, INSS/IRRF progressivo, Módulo 11 CPF/CNPJ, PJe PDF compressor.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇮🇹 Italy</span>
                Stipendio Netto IRPEF, Calcolo Codice Fiscale, Fattura Elettronica, Termini Processuali c.p.c., TFR.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇩🇪 Germany</span>
                Brutto-Netto Rechner, Steuerklassen I–VI, Sozialversicherungsbeiträge (Kranken-/Rentenversicherung).
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇫🇷 France</span>
                Salaire Brut en Net, Cotisations Sociales URSSAF, Barème Progressif IR, TVA, Calculateur Rupture Conventionnelle.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">🇪🇸 Spain</span>
                Sueldo Neto IRPF, Cuotas Seguridad Social, IVA, Impuesto de Transmisiones Patrimoniales (ITP).
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
              Engineering Principles &amp; Technology Stack
            </h2>
            <p>
              Kagazo is constructed with modern, audit-ready open-source technologies designed for high reliability and uncompromised privacy:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Client-Side First:</strong> All document photo formatting, Canvas manipulation, and math calculations run entirely inside the client&apos;s browser using modern JavaScript, HTML5 Canvas, and WebAssembly.
              </li>
              <li>
                <strong>pyHanko Cryptographic Core:</strong> Server-assisted PDF signature validation is powered by hardened, battle-tested Python cryptographic libraries complying with RFC 3161, RFC 5280, and ISO 32000-1 specifications.
              </li>
              <li>
                <strong>Stateless Cloud Infrastructure:</strong> Ephemeral Docker containers operating without attached persistent database volumes ensure that user documents are physically incapable of being saved.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-8 space-y-3 text-xs text-slate-500">
            <h3 className="text-sm font-bold text-slate-900">
              Site Ownership &amp; Non-Affiliation Statutory Disclosure
            </h3>
            <p>
              Kagazo (kagazo.in) is an independent private technology initiative. Kagazo is <strong>not affiliated with, associated with, sponsored by, authorized by, or endorsed by</strong> any government authority, including UIDAI, MeitY, CCA, the Income Tax Department of India, the Australian Taxation Office (ATO), HM Revenue &amp; Customs (HMRC), the Servicio de Administración Tributaria (SAT), the Receita Federal do Brasil (RFB), Agenzia delle Entrate, or the Internal Revenue Service (IRS).
            </p>
            <p>
              All trademarks, product names, logos, and portal references mentioned on this website belong exclusively to their respective statutory owners and are used strictly under fair use principles for nominative identification and informational purposes.
            </p>
            <p>
              For legal inquiries, technical feedback, or questions, please contact our compliance desk at{' '}
              <a href="mailto:support@kagazo.in" className="text-emerald-600 font-semibold underline">
                support@kagazo.in
              </a>.
            </p>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Ready to Validate Your Documents?
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            Join hundreds of thousands of users who trust Kagazo for fast, secure, and private sovereign compliance.
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
