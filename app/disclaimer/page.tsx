import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, Flag, Building2, ExternalLink, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Government Non-Affiliation Disclaimer — Kagazo',
  description:
    'Important non-affiliation disclaimer: Kagazo is an independent educational and cryptographic technology tool and is NOT affiliated with UIDAI, Government of India, State Governments, or examination commissions.',
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  openGraph: {
    title: 'Government Non-Affiliation Disclaimer — Kagazo',
    description:
      'Official non-affiliation notice: Kagazo is an independent private tool and is not an agency of the Government of India or UIDAI.',
    url: `${SITE_URL}/disclaimer`,
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Official Non-Affiliation Notice</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
            Disclaimer Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-main/70 leading-relaxed">
            Clarification on our independent private entity status, public data sources, and trademark ownership.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/90 border-2 border-amber-300/80 shadow-xs mb-10 text-amber-950 space-y-3">
          <div className="flex items-center gap-2.5 font-black text-base sm:text-lg text-amber-900">
            <Flag className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Kagazo is NOT a Government Website</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
            <strong>Kagazo (kagazo.in)</strong> is an independent, privately developed open-source utility and educational platform. <strong>Kagazo is NOT affiliated with, sponsored by, authorized by, maintained by, or endorsed by</strong> the Unique Identification Authority of India (UIDAI), the Controller of Certifying Authorities (CCA), the Ministry of Electronics and Information Technology (MeitY), the Income Tax Department of India, the National Informatics Centre (NIC), any state government authority (including TNeGA, MeeSeva, Nadakacheri, or e-District), or any public recruitment agency (such as UPSC, SSC, TNPSC, NTA, IBPS, or RRB).
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-darker shadow-xs space-y-8 text-text-main/80 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>1. Independent Educational &amp; Technical Nature</span>
            </h2>
            <p>
              The digital signature verification, PDF compression, and image preparation tools available on this platform are provided solely for educational, technical, and citizen convenience purposes.
            </p>
            <p>
              Our verification algorithms inspect open cryptographic data structures (such as public X.509 certificate chains, SHA-256 byte range digests, and standard ISO 32000-1 Long-Term Validation dictionaries) in accordance with the <strong>Information Technology Act, 2000</strong>. Kagazo does not issue, modify, approve, alter, or cancel any government certificate, identity record, or recruitment status.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>2. Trademark &amp; Official Emblem Attribution</span>
            </h2>
            <p>
              All product names, portal names, government department titles, exam designations (e.g., UPSC, SSC CGL, TNPSC Group 4, IBPS, NEET), and official portal links mentioned on this website are the registered trademarks or service marks of their respective legal owners and statutory bodies.
            </p>
            <p>
              Any reference on this website to specific government entities, recruitment portals, or public services is made purely for nominative descriptive identification to guide citizens on how to format their own documents in compliance with publicly published official notification specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>3. No Warranties Regarding Exam Acceptance</span>
            </h2>
            <p>
              While Kagazo meticulously calibrates all tools to match the latest publicly published gazette guidelines and recruitment notifications (such as 200×230px 20–50KB photo sizes, 10-day Date of Photograph rules, and under-200KB PDF ceilings):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1 text-sm">
              <li>Recruitment commissions and government portals reserve the statutory right to alter upload scripts, file bounds, or format requirements at any time without advance public consultation.</li>
              <li>Applicants must review the official recruitment notification bulletin published directly on the concerned commission&apos;s verified domain (e.g. <code>upsc.gov.in</code>, <code>ssc.gov.in</code>, <code>tnpsc.gov.in</code>) before submitting final applications.</li>
              <li>Kagazo assumes no legal or financial responsibility for rejected applications, missed exam cutoffs, or technical upload failures on government third-party websites.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              4. External Portal Links
            </h2>
            <p>
              Kagazo provides reference hyperlinks to official government websites (such as <code>myaadhaar.uidai.gov.in</code>, <code>tnesevai.tn.gov.in</code>, and <code>incometax.gov.in</code>) strictly as an informational convenience to help users download their authentic records. Kagazo exercises zero editorial or operational control over these third-party government servers, their privacy policies, or their service availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-text-main">
              5. Queries &amp; Trademark Clarification
            </h2>
            <p>
              If any government department, certifying authority, or examination commission has inquiries, feedback, or requests regarding descriptive references on our platform, our team will promptly review and update the relevant technical pages:
            </p>
            <div className="p-4 rounded-2xl bg-surface border border-surface-darker text-sm space-y-1">
              <div><strong>Desk:</strong> Kagazo Legal &amp; Compliance Office</div>
              <div><strong>Email:</strong> <a href="mailto:support@kagazo.in" className="text-primary hover:underline font-semibold">support@kagazo.in</a></div>
              <div><strong>Location:</strong> Tamil Nadu, India</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
