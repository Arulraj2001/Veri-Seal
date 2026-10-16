import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, ShieldCheck, Eye, Lock, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cookie Policy & Consent Guide — Kagazo',
  description:
    'Information on how Kagazo uses cookies, local browser storage, and privacy-first telemetry in accordance with India DPDP Act 2023 and Google AdSense policies.',
  alternates: {
    canonical: `${SITE_URL}/cookies`,
  },
  openGraph: {
    title: 'Cookie Policy — Kagazo',
    description:
      'Understand how Kagazo uses cookies and local browser storage to provide free tools while protecting your personal privacy.',
    url: `${SITE_URL}/cookies`,
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function CookiesPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Cookie className="w-3.5 h-3.5" />
            <span>Transparency &amp; Consent</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            How we protect your identity while maintaining free utilities, session state, and policy-compliant advertising.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-darker shadow-xs space-y-8 text-text-main/80 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small alphanumeric text files stored on your computer or mobile device by your web browser when you visit a website. They allow websites to remember user preferences, maintain secure login sessions, and understand how visitors interact with the site to optimize performance and usability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              2. How Kagazo Uses Cookies &amp; Local Storage
            </h2>
            <p>
              Kagazo is fundamentally designed on a <strong>Zero-Retention, Privacy-First Architecture</strong>. We do NOT use cookies to track, inspect, or build personal profiles around your identity documents, Aadhaar records, or exam marks.
            </p>
            <p>We use cookies and browser storage strictly for three purposes:</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                <div className="font-bold text-text-main text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Essential Cookies</span>
                </div>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Required for user authentication, security tokens (CSRF mitigation), and anonymous daily usage counters.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                <div className="font-bold text-text-main text-sm flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-primary" />
                  <span>Preference Storage</span>
                </div>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Preserves your selected language preference (English vs. Tamil) and UI settings across page reloads.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                <div className="font-bold text-text-main text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Performance Telemetry</span>
                </div>
                <p className="text-xs text-text-main/70 leading-relaxed">
                  Aggregated, anonymous telemetry (Google Analytics 4 &amp; Vercel Analytics) measuring page load times and errors.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              3. Google AdSense &amp; Advertising Cookies
            </h2>
            <p>
              To keep our document verification and exam resizer tools 100% free for students and cyber café operators, Kagazo may display contextual advertisements served by <strong>Google AdSense</strong> and authorized advertising partners.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1 text-sm">
              <li>Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to our website or other sites on the internet.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve personalized or non-personalized ads based on your visit history.</li>
              <li>Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">google.com/settings/ads</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              4. Client-Side In-Memory Guarantee (No Document Cookie Storage)
            </h2>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm">
              <strong>Strict Guarantee:</strong> The government PDF files, marksheets, photographs, signatures, and biometric scans you process on Kagazo are NEVER embedded, saved, or referenced inside any HTTP cookie or tracking pixel. Processing executes in volatile RAM and is destroyed the moment your browser tab is closed.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              5. How You Can Manage or Block Cookies
            </h2>
            <p>
              You have the right to accept, reject, or delete cookies at any time through your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data.</li>
              <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions.</li>
            </ul>
            <p className="text-xs text-text-main/70 pt-1">
              *Note: Disabling essential cookies may prevent session persistence or language switching, but basic client-side photo resizing will continue to function.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              6. Updates &amp; Contact
            </h2>
            <p>
              This policy is reviewed periodically to remain strictly compliant with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and international privacy regulations. For any questions regarding our cookie practices:
            </p>
            <div className="p-4 rounded-2xl bg-surface border border-surface-darker text-sm space-y-1">
              <div><strong>Email:</strong> <a href="mailto:support@kagazo.in" className="text-primary hover:underline font-semibold">support@kagazo.in</a></div>
              <div><strong>Privacy Policy:</strong> <Link href="/privacy" className="text-primary hover:underline font-semibold">kagazo.in/privacy</Link></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
