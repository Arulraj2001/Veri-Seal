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
  ExternalLink,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { UploadZone } from '@/components/home/UploadZone';
import { UploadZoneSkeleton } from '@/components/home/UploadZoneSkeleton';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Verify Indian Government PDF Digital Signatures Free | Kagazo',
  description:
    'Instantly verify digital signatures on e-Aadhaar, TN e-Sevai, Patta, Caste, Income, DigiLocker & Form 16 PDFs. Fix yellow "?" mark with CCA India Root (RCAI) green tick. 100% client-side in browser RAM.',
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
    title: 'Verify Indian Government PDF Digital Signatures Free | Kagazo',
    description:
      'Fix yellow "?" mark on government PDFs. Validate signatures against official CCA India Root (RCAI) certificates in browser RAM. Zero server uploads.',
    url: `${SITE_URL}/verify`,
    siteName: 'Kagazo Sovereign Tools',
    locale: 'en_IN',
    type: 'website',
  },
};

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
            text: 'If your PDF is password protected (e.g. first 4 letters of name in capital + birth year for Aadhaar), enter it securely. Decryption runs purely in your device RAM.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Instant Cryptographic Validation',
            text: 'Kagazo inspects the public key certificate chain against the Root Certifying Authority of India (RCAI) trust store and verifies certificate validity, revocation status, and digital timestamp.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Download Verified PDF with Green Tick',
            text: 'Download your permanently validated PDF with embedded Long-Term Validation (LTV) DSS catalog, accepted universally across banks, colleges, courts, and government offices.',
          },
        ],
      },
    ],
  };

  const supportedCertificates = [
    {
      title: 'UIDAI e-Aadhaar',
      desc: 'Validates UIDAI DSC public key & embeds official CCA root green tick.',
      tag: 'Central Govt',
      href: '/verify-aadhaar-signature',
    },
    {
      title: 'Tamil Nadu e-Sevai & Revenue',
      desc: 'Community, Nativity, Income, First Graduate, Legal Heir & Patta Chitta.',
      tag: 'TNeGA Portal',
      href: '/verify-community-certificate-signature',
    },
    {
      title: 'DigiLocker Issued Documents',
      desc: 'Marksheets, degree certificates, vehicle RC & insurance certificates.',
      tag: 'MeitY India',
      href: '/verify-digilocker-pdf-signature',
    },
    {
      title: 'Income Tax e-PAN & Form 16',
      desc: 'Protean/UTIITSL DSC validation and employer TRACES Form 16 signature proof.',
      tag: 'CBDT / TRACES',
      href: '/verify-income-tax-form16-signature',
    },
    {
      title: 'MeeSeva Andhra & Telangana',
      desc: 'Integrated caste, residence, and revenue certificates signed by Tahsildars.',
      tag: 'AP / TS Govt',
      href: '/tools',
    },
    {
      title: 'Seva Sindhu Karnataka & Akshaya Kerala',
      desc: 'Revenue department electronic certificates with licensed CA timestamping.',
      tag: 'KA / KL Govt',
      href: '/tools',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Studio Section */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-background bg-dot-grid border-b border-border/50">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
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

          {/* Headline & Value Propositions */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs font-semibold text-primary shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sovereign Document Verification Studio</span>
              <span className="text-primary/30">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% In-Browser RAM</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
              Verify Indian Government PDF Signatures &amp; Fix{' '}
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Yellow &quot;?&quot; Mark
              </span>
            </h1>

            <p className="text-sm sm:text-base text-text-main/75 max-w-2xl mx-auto leading-relaxed">
              Drop any digitally signed e-Aadhaar, Community, Nativity, Income, Patta Chitta, or DigiLocker PDF. We validate cryptographic certificates against the official Controller of Certifying Authorities (CCA India) trust hierarchy and embed a permanent green checkmark recognized across banks, courts, and colleges.
            </p>

            {/* Sovereign Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left text-[11px] font-bold text-text-main leading-tight">
                  <div>100% RAM Privacy</div>
                  <div className="text-[10px] text-text-muted font-normal">0 Server Uploads</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <div className="text-left text-[11px] font-bold text-text-main leading-tight">
                  <div>CCA India RCAI</div>
                  <div className="text-[10px] text-text-muted font-normal">IT Act 2000 Valid</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-left text-[11px] font-bold text-text-main leading-tight">
                  <div>Instant Green Tick</div>
                  <div className="text-[10px] text-text-muted font-normal">Permanent LTV DSS</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="text-left text-[11px] font-bold text-text-main leading-tight">
                  <div>100% Free Access</div>
                  <div className="text-[10px] text-text-muted font-normal">No Login Required</div>
                </div>
              </div>
            </div>
          </div>

          {/* The Verification Engine Cockpit */}
          <div className="max-w-4xl mx-auto">
            <React.Suspense fallback={<UploadZoneSkeleton />}>
              <UploadZone />
            </React.Suspense>
          </div>

        </div>
      </section>

      {/* How It Works: 4-Step Technical Pipeline */}
      <section className="py-16 md:py-20 bg-surface/40 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Zero-Trust Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
              How In-Browser Cryptographic Verification Works
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Unlike cloud services that require uploading your private documents to external servers, Kagazo performs end-to-end cryptographic validation right inside your browser session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-text-main">In-Memory Parsing</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                Your PDF file is loaded directly into your browser RAM as an ArrayBuffer. Not a single byte is transmitted over the wire or stored on disk.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-text-main">PKCS#7 Signature Extraction</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                The engine isolates the cryptographic signature dictionary (`/ByteRange`, `/Contents`, and `/SubFilter`) without modifying document content.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200/60 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-text-main">RCAI Root CA Chain Audit</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                The public key certificate is verified against the official CCA India trust store (eMudhra, (n)Code, IDsign, Capricorn, NIC) to confirm issuer legitimacy and timestamp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-text-main">Permanent LTV DSS Embedded</h3>
              <p className="text-xs text-text-main/70 leading-relaxed">
                A Document Security Store (DSS) dictionary is embedded into the PDF, rendering the verified green checkmark permanent on Adobe Reader across Windows, Mac, and mobile.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Supported Documents Directory */}
      <section className="py-16 md:py-20 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% Legal Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-text-main mt-3 tracking-tight">
                Supported Government Documents &amp; Certificates
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Accepted across all 28 states, union territories, public sector banks, and recruitment boards.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>Explore All 57+ Free Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportedCertificates.map((doc, idx) => (
              <Link
                key={idx}
                href={doc.href}
                className="group p-5 rounded-3xl bg-white border border-surface-darker/80 hover:border-primary/40 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface text-text-muted border border-surface-darker">
                      {doc.tag}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t border-surface-darker/60 flex items-center justify-between text-[11px] font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                  <span>Verify This Document</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Legal & IT Act 2000 FAQ Capsule */}
      <section className="py-16 md:py-20 bg-surface/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Legal Validity &amp; DPDP Act
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
              Frequently Asked Questions on Document Verification
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-text-main">
                Why does my PDF show a yellow question mark instead of a green tick?
              </h3>
              <p className="text-xs text-text-main/75 leading-relaxed">
                Standard PDF viewers like Adobe Acrobat on Windows, macOS, Android, and iOS do not include the Controller of Certifying Authorities (CCA India) root certificates in their default trust stores. While your government document was signed legally, Adobe cannot establish the certificate path and marks it as &quot;Validity Unknown&quot;. Kagazo embeds the certified chain directly into the document so Adobe displays the official green tick on every machine.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-text-main">
                Are my documents uploaded to Kagazo servers or stored anywhere?
              </h3>
              <p className="text-xs text-text-main/75 leading-relaxed">
                No. Absolutely zero document data is uploaded to remote servers or saved to storage drives. Verification processes entirely in your browser memory (RAM) using client-side WebAssembly. Once you close the tab or refresh, all transient memory is instantly discarded. This design is 100% compliant with the Digital Personal Data Protection (DPDP) Act 2023.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-text-main">
                Is the verified document legally valid under Indian law?
              </h3>
              <p className="text-xs text-text-main/75 leading-relaxed">
                Yes. Under Section 5 of the Information Technology Act 2000, digital signatures issued by licensed Certifying Authorities under the CCA India root have equal legal sanctity to physical ink signatures. A document verified and stamped with Long-Term Validation (LTV) is legally binding in Indian courts, banks, revenue offices, and recruitment portals.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surface-darker/80 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-text-main">
                My PDF is password protected. Can I still verify it?
              </h3>
              <p className="text-xs text-text-main/75 leading-relaxed">
                Yes. For password-protected documents such as e-Aadhaar (first 4 capital letters of your name + birth year), Kagazo prompts for your password to decrypt the PDF in memory. The password is used solely within client-side memory to unlock the signature dictionary and is never logged, transmitted, or saved.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
