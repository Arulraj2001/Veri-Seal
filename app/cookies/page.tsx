import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cookie,
  ShieldCheck,
  Eye,
  Lock,
  Globe2,
  CheckCircle2,
  Scale,
  Settings,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cookie Policy & Global Consent Framework — Kagazo',
  description:
    'Comprehensive Cookie Policy covering GDPR (EU), LGPD (Brazil), UK GDPR, India DPDP Act 2023, and Google AdSense compliance. Learn how we protect your privacy.',
  alternates: {
    canonical: `${SITE_URL}/cookies`,
  },
  openGraph: {
    title: 'Cookie Policy & Global Privacy Framework — Kagazo',
    description:
      'Understand how Kagazo uses essential cookies, local browser storage, and privacy-first telemetry in strict compliance with international privacy laws.',
    url: `${SITE_URL}/cookies`,
    siteName: 'Kagazo',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Cookie Policy & Consent Guide',
      description:
        'Official cookie and local storage disclosure covering GDPR, LGPD, and Google AdSense compliance policies.',
      url: `${SITE_URL}/cookies`,
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
          name: 'Cookies',
          item: `${SITE_URL}/cookies`,
        },
      ],
    },
  ],
};

export default function CookiesPage() {
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
          <span className="text-slate-800 font-medium">Cookie Policy</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Cookie className="w-3.5 h-3.5" />
            <span>International Consent &amp; Privacy Standards</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            How Kagazo utilizes essential cookies, local browser storage, and privacy-first advertising partners to maintain free civic utilities without compromising personal privacy.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1: What Are Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are small alphanumeric data packets stored directly on your computing device by your web browser when you access websites. Modern web platforms also utilize browser local storage (<code>localStorage</code> and <code>sessionStorage</code>) to maintain user preferences and offline capabilities without repeatedly pinging remote servers.
            </p>
            <p>
              Kagazo adheres strictly to the principle of <strong>data minimization</strong>. We only invoke cookies and local storage where technically indispensable for security, user preferences, aggregate performance telemetry, and non-intrusive contextual advertising.
            </p>
          </section>

          {/* Section 2: Global Statutory Compliance */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-600" />
              <span>2. Multi-Jurisdiction Privacy Compliance</span>
            </h2>
            <p>
              Because Kagazo serves users across 9 sovereign regions, our cookie framework is engineered to satisfy the strictest international data protection directives:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇪🇺 European Union (GDPR &amp; ePrivacy)</span>
                <p className="text-slate-600">
                  Full adherence to Regulation (EU) 2016/679 (GDPR) and the ePrivacy Directive (Directive 2002/58/EC). Non-essential cookies require clear, affirmative user consent prior to placement.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇧🇷 Brazil (LGPD)</span>
                <p className="text-slate-600">
                  Compliant with Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Respects the principles of purpose, adequacy, necessity, and user rights to revoke consent.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇬🇧 United Kingdom (UK GDPR)</span>
                <p className="text-slate-600">
                  Conforms to the UK Data Protection Act 2018 and Privacy and Electronic Communications Regulations (PECR) for British users.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🇮🇳 India (DPDP Act 2023)</span>
                <p className="text-slate-600">
                  Operates under the Digital Personal Data Protection Act, 2023, ensuring zero unauthorized retention of digital identifiers or citizen biometric data.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Categories of Cookies */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              3. Categories of Cookies Used on Kagazo
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>A. Strictly Necessary &amp; Security Cookies</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  These cookies are vital for the operation of the website, enabling security defenses (such as CSRF mitigation tokens), load-balancing sessions, and rate-limiting against automated scraping. They do not store any personally identifiable information and cannot be switched off in our systems.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>B. Functional &amp; Preference Storage</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Used to remember user selections across page reloads (e.g. chosen tax year, currency display settings, or dark/light theme). This data is stored strictly in your local browser storage and is never transmitted to our backend.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>C. Performance &amp; Aggregate Telemetry</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We collect anonymized, aggregated telemetry to understand page load speeds, Web Vitals, and browser compatibility. IP addresses are automatically truncated and anonymized before processing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Cookie className="w-4 h-4 text-emerald-600" />
                  <span>D. Google AdSense &amp; Advertising Cookies</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To keep our civic tools, statutory calculators, and PDF engines 100% free for students, job applicants, and small business owners worldwide, Kagazo displays contextual advertisements powered by <strong>Google AdSense</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 mt-2">
                  <li>Google and its certified third-party vendor partners use cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to our site or other websites.</li>
                  <li>In regions governed by GDPR and LGPD, personalized advertising cookies are deployed exclusively when the user provides explicit consent via a Google-certified Consent Management Platform (CMP).</li>
                  <li>Users can opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">aboutads.info</a>.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Strict Zero-Document Storage Guarantee */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              4. Absolute Document Privacy Guarantee
            </h2>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed">
              <strong>Strict Commitment:</strong> The PDF documents, government certificates, identity numbers (Aadhaar, PAN, CPF, CNPJ, RFC, Codice Fiscale), passport photographs, and financial values you process on Kagazo are <strong>NEVER saved, tracked, or referenced inside any cookie, tracking beacon, or advertising pixel</strong>. All file manipulations occur in ephemeral RAM or local browser memory.
            </div>
          </section>

          {/* Section 5: Managing and Disabling Cookies */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-600" />
              <span>5. How to Control and Manage Cookies</span>
            </h2>
            <p>
              You maintain complete sovereignty over your browser cookies and can block or delete them at any time:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data.</li>
              <li><strong>Apple Safari:</strong> Settings &gt; Safari &gt; Advanced &gt; Block All Cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.</li>
            </ul>
          </section>

          {/* Section 6: Contact */}
          <section className="space-y-3 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              6. Policy Inquiries
            </h2>
            <p>
              For inquiries regarding our cookie management framework or privacy protections:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm space-y-1">
              <div><strong>Desk:</strong> Kagazo Data Protection &amp; Privacy Office</div>
              <div><strong>Email:</strong> <a href="mailto:privacy@kagazo.in" className="text-emerald-600 hover:underline font-semibold">privacy@kagazo.in</a></div>
              <div><strong>Privacy Policy:</strong> <Link href="/privacy" className="text-emerald-600 hover:underline font-semibold">kagazo.in/privacy</Link></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
