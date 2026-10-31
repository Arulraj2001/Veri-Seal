import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ShieldCheck,
  Flag,
  Building2,
  Globe2,
  Scale,
  FileWarning,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Government Non-Affiliation Disclaimer & Legal Notices — Kagazo',
  description:
    'Important statutory non-affiliation disclaimer: Kagazo is an independent private technology utility and is NOT affiliated with UIDAI, ATO, HMRC, SAT, Receita Federal, Agenzia delle Entrate, or any public authority.',
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  openGraph: {
    title: 'Government Non-Affiliation Disclaimer — Kagazo',
    description:
      'Official statutory non-affiliation and legal notice across all sovereign jurisdictions: India, Australia, UK, Mexico, Brazil, Italy, Germany, France, and Spain.',
    url: `${SITE_URL}/disclaimer`,
    siteName: 'Kagazo',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Government Non-Affiliation Disclaimer & Legal Notice',
      description:
        'Official non-affiliation notice clarifying that Kagazo is an independent private entity with zero affiliation with any government tax, labor, or judicial authority.',
      url: `${SITE_URL}/disclaimer`,
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
          name: 'Disclaimer',
          item: `${SITE_URL}/disclaimer`,
        },
      ],
    },
  ],
};

export default function DisclaimerPage() {
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
          <span className="text-slate-800 font-medium">Disclaimer</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Comprehensive Statutory Non-Affiliation Notice</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Disclaimer &amp; Legal Notices
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Clarification on our independent private status, jurisdictional boundaries, trademark attribution, and absence of government affiliation across all supported sovereign regions.
          </p>
        </div>

        {/* Prominent High-Visibility Warning Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/90 border-2 border-amber-300/80 shadow-xs mb-10 text-amber-950 space-y-3">
          <div className="flex items-center gap-2.5 font-black text-base sm:text-lg text-amber-900">
            <Flag className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Kagazo is NOT a Government Website or Public Agency</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
            <strong>Kagazo (kagazo.in)</strong> is an independent, privately operated technology platform and civic utility suite. <strong>Kagazo is NOT affiliated with, sponsored by, authorized by, maintained by, or endorsed by</strong> any sovereign government, public recruitment board, judicial tribunal, or statutory tax authority in India, Australia, the United Kingdom, Mexico, Brazil, Italy, Germany, France, Spain, or the United States.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1: Multi-Jurisdictional Scope */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-600" />
              <span>1. Multi-Jurisdictional Non-Affiliation Scope</span>
            </h2>
            <p>
              To ensure absolute clarity for our global user base, we explicitly disclaim any formal, administrative, legal, or commercial affiliation with the following sovereign bodies:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇮🇳 India Authorities</span>
                <p className="text-slate-600">
                  Unique Identification Authority of India (UIDAI), Controller of Certifying Authorities (CCA), Ministry of Electronics &amp; IT (MeitY), Income Tax Department, National Informatics Centre (NIC), UPSC, SSC, TNPSC, NTA, IBPS, CBSE.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇦🇺 Australia Authorities</span>
                <p className="text-slate-600">
                  Australian Taxation Office (ATO), Fair Work Ombudsman, Services Australia, Department of Home Affairs, Australian Securities and Investments Commission (ASIC).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇬🇧 United Kingdom Authorities</span>
                <p className="text-slate-600">
                  HM Revenue &amp; Customs (HMRC), Department for Work and Pensions (DWP), Companies House, Driver and Vehicle Licensing Agency (DVLA), HM Land Registry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇲🇽 Mexico Authorities</span>
                <p className="text-slate-600">
                  Servicio de Administración Tributaria (SAT), Instituto Mexicano del Seguro Social (IMSS), Instituto del Fondo Nacional de la Vivienda para los Trabajadores (INFONAVIT), Secretaría de Hacienda y Crédito Público (SHCP).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇧🇷 Brazil Authorities</span>
                <p className="text-slate-600">
                  Secretaria Especial da Receita Federal do Brasil (RFB), Ministério do Trabalho e Emprego (MTE), Instituto Nacional do Seguro Social (INSS), Caixa Econômica Federal (CEF), Tribunais do Poder Judiciário (PJe).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇮🇹 Italy Authorities</span>
                <p className="text-slate-600">
                  Agenzia delle Entrate, Istituto Nazionale della Previdenza Sociale (INPS), Ministero della Giustizia, Ministero dell&apos;Economia e delle Finanze (MEF).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇩🇪 Germany, 🇫🇷 France, 🇪🇸 Spain Authorities</span>
                <p className="text-slate-600">
                  Bundesministerium der Finanzen (BMF), URSSAF, Ministère de l&apos;Économie, Agencia Estatal de Administración Tributaria (AEAT), Seguridad Social de España.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇺🇸 International &amp; US Authorities</span>
                <p className="text-slate-600">
                  Internal Revenue Service (IRS), US Citizenship and Immigration Services (USCIS), Social Security Administration (SSA).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Informational and Technical Nature */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>2. Independent Technical &amp; Informational Purpose</span>
            </h2>
            <p>
              The digital signature verification tools, image formatting engines, document compressors, and statutory payroll/tax simulators on Kagazo are created strictly for educational, informational, and technical assistance purposes.
            </p>
            <p>
              Kagazo does not issue, modify, approve, alter, or cancel any government certificate, tax registration, social security number, legal contract, or examination record. The platform operates solely as a mathematical processor and format validator based on public specifications.
            </p>
          </section>

          {/* Section 3: No Legal, Financial, or Tax Advice */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>3. No Professional Legal, Tax, or Financial Advice</span>
            </h2>
            <p>
              Calculations performed by our tools (such as net salary after tax, severance pay, rental yields, stamp duties, court procedural deadlines, or invoice taxes) are mathematical simulations based on published statutory formulas and gazettes.
            </p>
            <p className="text-sm">
              They do NOT constitute certified tax advice, chartered accountant consultations, legal opinions, or official administrative determinations. Individual tax situations, collective bargaining agreements (CCNL in Italy, Acordos Coletivos in Brazil), and judicial discretions may introduce variables not reflected in generalized models. For binding advice, consult a licensed attorney, CPA, Dottore Commercialista, or Contabilista Certificado.
            </p>
          </section>

          {/* Section 4: Trademark and Intellectual Property Attribution */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>4. Trademark Attribution &amp; Nominative Fair Use</span>
            </h2>
            <p>
              All product names, logos, official portal names, acronyms (such as e-Aadhaar, PAN, GSTIN, PAYE, TFN, RFC, CPF, CNPJ, Codice Fiscale, PJe), and exam designations (UPSC, SSC, NEET, JEE) mentioned on this website belong exclusively to their respective statutory owners and trademark holders.
            </p>
            <p className="text-sm">
              Any reference on this website to government portals or public systems is made strictly under the doctrine of <strong>Nominative Fair Use</strong> for descriptive identification, enabling citizens to format files and verify compliance with published official guidelines.
            </p>
          </section>

          {/* Section 5: No Warranty & Limitation of Liability */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-amber-600" />
              <span>5. Limitation of Liability</span>
            </h2>
            <p>
              While Kagazo rigorously tests and updates all software against current statutes and portal upload specifications:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
              <li>Statutory authorities and examination commissions reserve the unilateral right to amend upload guidelines, file boundaries, tax brackets, or portal software without prior public notice.</li>
              <li>Users are solely responsible for reviewing the authentic gazette notification or official portal handbook before submitting documents or filing tax returns.</li>
              <li>Under no circumstances shall Kagazo, its developers, or contributors be held liable for any direct, indirect, incidental, special, or consequential damages resulting from rejected applications, missed deadlines, or portal technical errors.</li>
            </ul>
          </section>

          {/* Section 6: Inquiries and Compliance Contact */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              6. Legal Inquiries &amp; Attribution Updates
            </h2>
            <p>
              If any government authority, certification body, or legal entity has questions or notices regarding content on Kagazo, please contact our legal desk for immediate review:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm space-y-1">
              <div><strong>Desk:</strong> Kagazo Legal &amp; Regulatory Compliance</div>
              <div><strong>Email:</strong> <a href="mailto:support@kagazo.in" className="text-emerald-600 hover:underline font-semibold">support@kagazo.in</a></div>
              <div><strong>Website:</strong> <Link href="/" className="text-emerald-600 hover:underline font-semibold">https://kagazo.in</Link></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
