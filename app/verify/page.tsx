import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Download,
  Building2,
  KeyRound,
  FileText,
  Clock,
  Scale,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { UploadZone } from '@/components/home/UploadZone';
import { UploadZoneSkeleton } from '@/components/home/UploadZoneSkeleton';
import { SupportedDocs } from '@/components/home/SupportedDocs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Verify Indian Government PDF Digital Signatures Online Free | Kagazo',
  description:
    'Instantly verify digital signatures on e-Aadhaar, TN e-Sevai, Patta, Caste, Income, DigiLocker & Form 16 PDFs. Fix yellow "?" mark with CCA India Root (RCAI) green tick. 100% in-browser RAM privacy.',
  keywords: [
    'verify digital signature pdf',
    'fix yellow question mark pdf online',
    'aadhaar signature verify online free',
    'validate e-sevai certificate signature',
    'tn e-sevai digital signature verification',
    'digilocker pdf signature verify',
    'ccaindia root certificate validation',
    'rcai green tick pdf',
    'dpdp compliant pdf verify',
  ],
  alternates: {
    canonical: `${SITE_URL}/verify`,
  },
  openGraph: {
    title: 'Verify Indian Government PDF Digital Signatures Online Free | Kagazo',
    description:
      'Fix yellow "?" mark on government PDFs. Validate signatures against official CCA India Root (RCAI) certificates in browser RAM. Zero server uploads.',
    url: `${SITE_URL}/verify`,
    siteName: 'Kagazo Sovereign Tools',
    locale: 'en_IN',
    type: 'website',
  },
};

const VERIFY_FAQS = [
  {
    value: 'item-1',
    question: 'Why does my government certificate PDF show a yellow question mark?',
    answer:
      'Standard PDF viewers like Adobe Acrobat on Windows, Mac, and mobile devices do not include the Controller of Certifying Authorities (CCA India / RCAI) in their default trusted certificate stores. Even though your document was legally signed by a gazetted officer, Tahsildar, or UIDAI HSM, Adobe displays "Validity Unknown" because it cannot resolve the sovereign Indian root. Kagazo verifies the certificate against official CCA India Root CAs and embeds a Document Security Store (DSS) catalog so Adobe Acrobat permanently displays the green checkmark.',
  },
  {
    value: 'item-2',
    question: 'What is the password format to open e-Aadhaar or encrypted certificates?',
    answer:
      'For e-Aadhaar, the official UIDAI password is the first 4 letters of your name in CAPITAL LETTERS followed by your 4-digit Year of Birth (e.g. if your name is SURESH KUMAR and birth year is 1995, password is SURE1995). For e-Sevai certificates, files are typically unencrypted or use your Date of Birth (DDMMYYYY). Decryption executes 100% within your device memory — passwords are never saved, logged, or sent to any server.',
  },
  {
    value: 'item-3',
    question: 'Are my private documents uploaded to Kagazo servers or stored anywhere?',
    answer:
      'Zero storage. All cryptographic verification, signature parsing, and LTV embedding execute 100% in transient browser RAM using WebAssembly. We never write your files to remote hard drives, never retain copies, and never log demographic details. Once you close the tab, all memory is instantly purged, ensuring full compliance with the Digital Personal Data Protection (DPDP) Act 2023.',
  },
  {
    value: 'item-4',
    question: 'Is a Kagazo-verified PDF legally accepted at banks, colleges, and courts?',
    answer:
      'Yes. Under Section 5 of the Information Technology Act 2000, digital signatures generated under the CCA India root hierarchy hold equal evidentiary value to hand-written signatures. Because Kagazo embeds official Long-Term Validation (LTV DSS), the green tick remains permanently valid offline across bank KYC counters, college admission desks, RTO offices, and court submissions.',
  },
  {
    value: 'item-5',
    question: 'Will the verified green tick remain visible if I email or print the PDF?',
    answer:
      'Yes. The verified signature contains embedded cryptographic timestamps and CRL revocation lists. When you email or share the verified PDF, anyone opening it in Adobe Reader or modern browsers will see the green checkmark and "Certified by CCA India" validation stamp.',
  },
];

export default function VerifyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kagazo Government PDF Signature Verifier',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'In-browser cryptographic verification of Indian digital signatures on government certificates and PDFs with official RCAI Root CA trust embedding.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Verify Indian Government PDF Digital Signatures Online',
        description:
          'Step-by-step instructions to validate unverified digital signatures and convert the yellow question mark to a permanent green checkmark.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Your PDF Document',
            text: 'Drag and drop your e-Aadhaar, community certificate, income certificate, or DigiLocker PDF into the Kagazo verification engine.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Password if Protected',
            text: 'If your PDF is password protected, enter it securely. Decryption runs purely in your device RAM.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Instant Cryptographic Validation',
            text: 'Kagazo inspects the public key certificate chain against the Root Certifying Authority of India (RCAI) trust store.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Download Verified PDF with Green Tick',
            text: 'Download your permanently validated PDF with embedded Long-Term Validation (LTV) DSS catalog.',
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: THE EXECUTIVE VERIFICATION STUDIO COCKPIT (ABOVE THE FOLD)
          Split 2-Column Layout: Left Context & Guidance, Right Interactive Upload
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-background bg-dot-grid border-b border-border/50">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="pt-2">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Verify Document Signatures' },
              ]}
              showHomeIcon
            />
          </div>

          {/* 2-Column Split Studio Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column (5 Cols): Title, Context, Password Tips, and Reassurances */}
            <div className="lg:col-span-5 space-y-5 text-left">
              
              {/* Top Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs font-semibold text-primary shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sovereign Verification Studio</span>
                <span className="text-primary/30">•</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% In-Browser RAM</span>
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-main tracking-tight leading-tight">
                Verify Government PDF Signatures &amp; Fix{' '}
                <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Yellow &quot;?&quot; Mark
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed font-normal">
                Drop your e-Aadhaar, TN e-Sevai, Patta, Caste, Income, or DigiLocker PDF. We resolve the official Controller of Certifying Authorities (CCA India / RCAI) public key chain in your local browser memory and embed permanent Long-Term Validation (LTV).
              </p>

              {/* Quick Document Password & Format Guide */}
              <div className="p-4 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-text-main">
                  <KeyRound className="w-4 h-4 text-primary" />
                  <span>Password Hints for Encrypted PDFs:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-text-main/80">
                  <div className="p-2 rounded-xl bg-surface/60 border border-surface-darker/60">
                    <span className="font-bold block text-text-main">e-Aadhaar PDF:</span>
                    <span>4 Letters of Name + Birth Year (e.g. <code className="font-bold text-primary">RAMA1992</code>)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface/60 border border-surface-darker/60">
                    <span className="font-bold block text-text-main">e-Sevai / Revenue:</span>
                    <span>Usually unencrypted or applicant DOB (<code className="font-bold text-primary">DDMMYYYY</code>)</span>
                  </div>
                </div>
              </div>

              {/* 3 Core Trust Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-[11px] font-bold text-text-main leading-tight">
                    <div>100% RAM Privacy</div>
                    <div className="text-[10px] text-text-muted font-normal">0 Server Uploads</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <div className="text-[11px] font-bold text-text-main leading-tight">
                    <div>CCA India RCAI</div>
                    <div className="text-[10px] text-text-muted font-normal">IT Act 2000 Valid</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <div className="text-[11px] font-bold text-text-main leading-tight">
                    <div>Instant Green Tick</div>
                    <div className="text-[10px] text-text-muted font-normal">Permanent LTV DSS</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (7 Cols): The Verification Engine Cockpit */}
            <div className="lg:col-span-7 w-full">
              <React.Suspense fallback={<UploadZoneSkeleton isHeroMode />}>
                <UploadZone isHeroMode />
              </React.Suspense>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: SUPPORTED GOVERNMENT DOCUMENTS & REGIONAL PORTALS
          Full state-by-state tabs: All India, Tamil Nadu, AP, Karnataka, Kerala, More
         ───────────────────────────────────────────────────────────── */}
      <SupportedDocs />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: 2-COLUMN TECHNICAL AUDIT PROOF & FAQ HUB (LEFT vs RIGHT)
          No vertical single-column stacking; balanced asymmetric layout.
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column (6 Cols): Why Portals Reject Yellow '?' & 4-Step Technical Audit */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20">
                  Cryptographic Trust Proof
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight leading-tight">
                  Why Do Bank &amp; Government Counters Reject Yellow &quot;?&quot; Marks?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Indian government certificates are signed using CCA India licensed Certifying Authorities (NIC, eMudhra, (n)Code, IDsign). Standard PDF viewers lack India&apos;s RCAI Root in their default trust store, showing a yellow question mark. Kagazo resolves the root chain and embeds permanent Long-Term Validation (LTV) directly into the file.
                </p>
              </div>

              {/* Side-by-Side Visual Proof Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Before: Yellow ? */}
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      ❌ Rejected at Counter
                    </span>
                    <span className="text-[10px] font-mono text-amber-800 font-bold">Acrobat Default</span>
                  </div>
                  <div className="flex items-start gap-2.5 pt-1">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0">?</span>
                    <div className="text-xs text-amber-950 font-bold leading-tight">
                      <div>Validity Unknown</div>
                      <div className="text-[10px] text-amber-800/80 font-normal mt-0.5">Signer not trusted by OS</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-900/70 pt-1 leading-snug">
                    Banks decline loan files and colleges stall admissions demanding physical revenue officer stamps.
                  </p>
                </div>

                {/* After: Green Checkmark */}
                <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✅ 100% Accepted
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold">RCAI Validated</span>
                  </div>
                  <div className="flex items-start gap-2.5 pt-1">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0">✔</span>
                    <div className="text-xs text-emerald-950 font-bold leading-tight">
                      <div>Signature Valid &amp; Verified</div>
                      <div className="text-[10px] text-emerald-800/80 font-normal mt-0.5">Permanent LTV DSS Catalog</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-900/70 pt-1 leading-snug">
                    Recognised across all 28 states, public sector banks, recruitment boards, and courts nationwide.
                  </p>
                </div>
              </div>

              {/* 4-Step Technical Verification Pipeline */}
              <div className="p-5 rounded-3xl bg-surface/50 border border-surface-darker/80 space-y-3.5">
                <div className="text-xs font-bold text-text-main flex items-center gap-1.5 uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-primary" />
                  <span>Client-Side Verification Architecture:</span>
                </div>

                <div className="space-y-2.5 text-xs text-text-main/80">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-text-main">In-Memory ArrayBuffer Parsing:</strong> PDF is loaded strictly in client RAM with zero disk persistence.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-text-main">PKCS#7 Signature Extraction:</strong> Isolates the cryptographic signature dictionary without mutating document text.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-text-main">CCA India Root RCAI Audit:</strong> Cross-checks signer certificate against NIC, eMudhra, and licensed CAs.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-text-main">Document Security Store (DSS) Catalog:</strong> Embeds permanent LTV validation for offline viewing.
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (6 Cols): Interactive Verification FAQ Accordion */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  Verification FAQ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight leading-tight">
                  Everything You Need to Know
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Answers to common questions regarding digital signature validity, security compliance, and password decryption.
                </p>
              </div>

              {/* Accordion Component */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-surface-darker/80 shadow-soft">
                <Accordion defaultValue="item-1">
                  {VERIFY_FAQS.map((faq) => (
                    <AccordionItem key={faq.value} value={faq.value}>
                      <AccordionTrigger className="text-left text-xs sm:text-sm font-bold text-text-main hover:text-primary py-3.5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-text-main/75 leading-relaxed pb-3 pt-1">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
