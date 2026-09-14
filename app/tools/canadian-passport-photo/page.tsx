import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  CheckCircle2,
  DollarSign,
  Printer,
  FileCheck,
  AlertTriangle,
  Globe2,
  Sparkles,
  Layers,
  Scissors,
} from 'lucide-react';
import { PassportPhotoStudioEngine } from '@/components/tools/PassportPhotoStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Canadian Passport & PR Photo Maker (50×70mm) | IRCC Free | Kagazo',
  description:
    'Create official 50x70 mm Canadian passport, PR card, and citizenship photos compliant with IRCC. 31–36mm face height lock, 4x6" printable sheet, 100% free RAM privacy.',
  keywords: [
    'canadian passport photo size 50x70 online free',
    'ircc pr card photo resizer 50x70 mm',
    'canada express entry photo 31 to 36 mm face',
    'canadian passport photo 4x6 sheet printable',
    'canada citizenship photo maker free',
    'shoppers drug mart passport photo print coupon',
    'canada passport photo specifications 50x70',
    'ircc digital photo upload requirements',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/canadian-passport-photo',
  },
  openGraph: {
    title: 'Canadian Passport & PR Photo Maker (50×70mm) | IRCC Free | Kagazo',
    description:
      'Generate IRCC-compliant 50x70 mm Canadian passport and Permanent Resident photos at 300 DPI with printable 4x6 sheet. 100% private in-browser tool.',
    url: 'https://kagazo.in/tools/canadian-passport-photo',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Passport & PR Photo Maker (50×70mm) | IRCC Free | Kagazo',
    description:
      'Create official 50x70 mm Canadian passport and PR photos with printable 4x6 sheets. 100% free in-browser RAM privacy.',
  },
};

const CANADA_PHOTO_SPECS = [
  {
    parameter: 'Physical Dimensions',
    officialRule: '50 mm width × 70 mm height (2" × 2 3/4" / 591 × 827 px @ 300 DPI)',
    commonFailure: 'Uploading standard 35×45 mm or 2×2" US photos',
  },
  {
    parameter: 'Face Length (Chin to Crown)',
    officialRule: '31 mm to 36 mm (occupying 44% to 51% of photo height)',
    commonFailure: 'Face occupying too much of the 70 mm vertical frame',
  },
  {
    parameter: 'Top Margin Clearance',
    officialRule: 'Clear vertical gap between top of hair and top border',
    commonFailure: 'Hair cropped off or touching the upper edge of the photo',
  },
  {
    parameter: 'Background Color',
    officialRule: 'Plain White or Light-Coloured (Uniform, zero shadows)',
    commonFailure: 'Shadows behind neck, doorway patterns, or textured paint',
  },
  {
    parameter: 'Digital Resolution (IRCC)',
    officialRule: '591 × 827 pixels @ 300 DPI (Minimum 420 × 540 px)',
    commonFailure: 'Uploading low-resolution 72 DPI images without density tags',
  },
  {
    parameter: 'File Format & Size',
    officialRule: 'JPEG format, strictly between 60 KB and 4 MB',
    commonFailure: 'Heavy file compression under 60 KB triggering blur warnings',
  },
  {
    parameter: 'Expression & Posture',
    officialRule: 'Neutral expression, mouth closed, eyes looking straight at camera',
    commonFailure: 'Subtle smiles, teeth showing, or tilted head posture',
  },
];

const FAQS = [
  {
    question: 'What is the official size of a Canadian passport photo in mm, inches, and pixels?',
    answer:
      'The official size is 50 mm in width by 70 mm in height (2 inches wide by 2 3/4 inches high). In digital pixels at 300 DPI print density, this measures 591 × 827 pixels. The face length from the bottom of the chin to the top of the hair must measure between 31 mm and 36 mm.',
  },
  {
    question: 'Why are Canadian passport photos taller than US and European photos?',
    answer:
      'Canada uses a unique 50 × 70 mm (5:7 aspect ratio) format, whereas the US uses 51 × 51 mm (1:1 square) and Europe uses 35 × 45 mm (7:9 ratio). Uploading an Indian, US, or European photo to IRCC will result in an immediate rejection due to dimension mismatch.',
  },
  {
    question: 'Does this meet requirements for Canadian PR (Permanent Resident) cards and Citizenship?',
    answer:
      'Yes! Immigration, Refugees and Citizenship Canada (IRCC) mandates the identical 50×70 mm biometric specification across Canadian Passports, PR Cards, Express Entry e-APR, Citizenship applications, and Super Visas.',
  },
  {
    question: 'Can I smile in a Canadian passport photo?',
    answer:
      'No. IRCC strictly enforces a neutral facial expression with mouth closed and eyes looking directly into the camera lens. Any visible smile or parted lips will cause rejection by passport examiners.',
  },
  {
    question: 'Can I wear glasses in a Canadian passport photo?',
    answer:
      'Prescription glasses are allowed only if your eyes are clearly visible and there is no glare or reflection on the lenses. Sunglasses and tinted lenses are strictly forbidden. Most photographers recommend removing glasses to prevent rejection.',
  },
  {
    question: 'How do I save $22 compared to Shoppers Drug Mart or Walmart Canada?',
    answer:
      'Shoppers Drug Mart, Walmart, and CAA charge $19.99 to $24.99 CAD for two Canadian passport photos. When you download Kagazo’s 4×6" photo card sheet (which tiles 4 official 50×70 mm photos at 300 DPI), you can print it at any pharmacy or Walmart photo kiosk as a standard 4×6" photo print for just $0.39 CAD!',
  },
  {
    question: 'What is the rule regarding the photographer’s stamp for physical applications?',
    answer:
      'For mail-in physical passport applications, IRCC requires the photographer/studio name, address, and date taken stamped or written on the back of one photo. If submitting digitally through the IRCC portal, no stamp is required; only the high-resolution 300 DPI JPEG is needed.',
  },
  {
    question: 'What should I wear for a Canadian passport photo?',
    answer:
      'Wear dark, everyday clothing that stands out distinctly against the white background. Avoid white tops, light-colored shirts, uniforms, and military-style apparel.',
  },
  {
    question: 'Can religious headwear be worn?',
    answer:
      'Yes, religious head coverings are permitted if worn daily, provided the full face from the bottom of the chin to the top of the forehead and both edges of the face are completely visible.',
  },
  {
    question: 'Does Kagazo store or share my Canadian passport photos?',
    answer:
      'Never. All processing takes place 100% inside your browser’s local volatile RAM memory. No images or metadata are ever transmitted to external servers.',
  },
];

export default function CanadianPassportPhotoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Canadian Passport & PR Photo Maker (50×70mm IRCC)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/canadian-passport-photo',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CAD',
        },
        description:
          'Create official 50x70 mm Canadian passport, PR card, and citizenship photos compliant with IRCC. 31–36mm face height lock, 4x6" printable sheet, 100% free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Make an IRCC Compliant Canadian Passport Photo at Home',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Take a Frontal Portrait',
            text: 'Stand 4 feet from a plain white or light-colored wall in even daytime light with neutral expression.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload to Kagazo Studio',
            text: 'Select your photo. Kagazo configures the official 50x70 mm (5:7 ratio) canvas at 300 DPI.',
          },
          {
            '@type': 'HowToStep',
            name: 'Align 31–36 mm Face Height',
            text: 'Position your face so the distance from chin to crown aligns within the 31–36 mm calipers.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Digital JPEG',
            text: 'Export the 591x827 px 300 DPI JPEG for online IRCC Express Entry or Citizenship portals.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download 4x6" Print Card',
            text: 'Export a 4-photo 4x6" card to print at Walmart or Shoppers Drug Mart for 39 cents.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Passport & Visa Photo Lab',
            item: 'https://kagazo.in/tools/passport-photo-maker',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Canadian Passport Photo (50×70mm)',
            item: 'https://kagazo.in/tools/canadian-passport-photo',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link
            href="/tools/passport-photo-maker"
            className="hover:text-primary transition-colors font-medium"
          >
            Passport &amp; Visa Photo Lab
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Canadian Passport Photo (50×70mm)</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-extrabold text-emerald-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>IRCC Canada Compliant • 50 × 70 mm (31–36 mm Face) • PR &amp; Express Entry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Canadian Passport &amp; PR Photo Maker </span>
            <span className="text-primary">(50×70mm / IRCC)</span>
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Format, calibrate, and print official 50 × 70 mm photographs compliant with Immigration,
            Refugees and Citizenship Canada (IRCC) standards for Canadian Passports, PR Cards, Express
            Entry, and Citizenship applications. Features exact 31–36 mm face height verification and 4×6&quot;
            printable sheets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> IRCC 50×70 mm Standard
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Globe2 className="w-4 h-4 text-primary" /> 591 × 827 px @ 300 DPI
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Lock className="w-4 h-4 text-emerald-600" /> 100% In-Browser RAM Privacy
            </span>
          </div>
        </header>

        {/* Studio Grid (Main Engine + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Container */}
            <PassportPhotoStudioEngine defaultCountryId="canada-passport" />

            {/* Post-Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Value Pillars */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Why Format Your Canadian Passport Photos on Kagazo?
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Engineered specifically for Immigration, Refugees and Citizenship Canada standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm mb-2.5">
                    50×70
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Official IRCC 50×70 mm Lock</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Formats your portrait to the distinct 5:7 vertical proportion required across all Canadian
                    immigration streams.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mb-2.5">
                    31–36
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Strict 31–36 mm Face Length</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Ensures the distance between chin and hair crown falls precisely within the mandatory
                    31–36 mm window.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm mb-2.5">
                    IRCC
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Express Entry &amp; PR Ready</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generates digital files meeting the minimum 420 × 540 px dimension check for online IRCC
                    portals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm mb-2.5">
                    $CAD
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Save $22 on Pharmacy Prints</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download a 4-photo 4×6&quot; sheet. Print at Walmart Canada or Shoppers for 39¢ instead of
                    $24.99 at the counter.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm mb-2.5">
                    300
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">Embedded 300 DPI JFIF</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Guarantees ultra-sharp 591 × 827 px resolution for laser-etched Canadian passport biodata
                    pages.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-1">100% In-Browser Privacy</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your personal identity photos are processed entirely inside client-side RAM with zero cloud
                    uploads.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Canada Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Official IRCC Canadian Passport &amp; PR Photo Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                    Verified against Immigration, Refugees and Citizenship Canada standards.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                  IRCC Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main/80 font-bold">
                      <th className="py-3 px-3.5">Parameter</th>
                      <th className="py-3 px-3.5">Official IRCC Rule</th>
                      <th className="py-3 px-3.5">Common Rejection Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/75">
                    {CANADA_PHOTO_SPECS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 px-3.5 font-semibold text-text-main whitespace-nowrap">
                          {spec.parameter}
                        </td>
                        <td className="py-3 px-3.5 font-medium text-emerald-700">{spec.officialRule}</td>
                        <td className="py-3 px-3.5 text-text-main/70">{spec.commonFailure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Step-by-Step Instructions */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Step-by-Step: How to Format Your Canadian Passport Photo
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Follow these step-by-step instructions for quick approval on all Canadian applications.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Take Portrait</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Stand 4 feet from a white wall in natural indirect daylight with a neutral facial expression.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Upload to Studio</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Select your image. Kagazo locks the canvas to the unique 50 × 70 mm Canadian proportion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Align 31–36 mm Face</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Adjust zoom so the chin-to-crown measurement matches the 31–36 mm guide, preserving top clearance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Verify White Background</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Confirm that background is clean and shadow-free with zero texture or wall discoloration.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download Digital JPEG</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Export the 591 × 827 px JPEG file for IRCC Express Entry, PR card, or citizenship portal uploads.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-text-main">Download 4×6&quot; Sheet</h3>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Save the 4-photo 4×6 inch gang sheet to print at Walmart or Shoppers Drug Mart for paper submissions.
                  </p>
                </div>
              </div>
            </section>

            {/* Rejection Prevention & Troubleshooting */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Why Canadian Passport Photos Get Rejected &amp; How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Keep these IRCC rules in mind to avoid rejection notices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Rejection: Wrong Aspect Ratio
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> Submitting standard 35×45 mm or 2×2" US photos to IRCC causes immediate administrative return.
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Fix:</strong> Locks the exact 50 mm × 70 mm (5:7 ratio) canvas mandated across Canada.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Rejection: Face Length Exceeds 36 mm
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> Cropping too close so the chin-to-crown measurement exceeds 36 mm (51% of total height).
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Fix:</strong> Visual caliper bounds constrain the face strictly inside the 31–36 mm bracket.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Rejection: Non-Compliant Studio Stamp
                  </h3>
                  <p className="text-xs text-red-800/80 leading-relaxed">
                    <strong>The Cause:</strong> For mail applications, the back of one photo must carry the studio address and date taken.
                  </p>
                  <p className="text-xs text-red-900 font-semibold pt-1">
                    <strong>Kagazo Tip:</strong> For online portals, no stamp is required; for mail, our print sheet leaves room for date notes.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Canadian Passport Photo)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-1">
                  Everything you need to know about IRCC guidelines, PR card specifications, and print sheets.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-mono text-xs sm:text-sm mt-0.5">0{index + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 pl-5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-3xl border border-surface-darker p-4 sm:p-5 shadow-card space-y-3">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Visa Tools
              </span>

              <div className="space-y-1.5">
                <Link
                  href="/tools/us-passport-photo"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      US Passport Photo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    2×2&quot;
                  </span>
                </Link>

                <Link
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

                <Link
                  href="/tools/schengen-visa-photo"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Schengen Visa Photo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    EU
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Global Passport Studio
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    50+
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Sheet Maker
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-main/60 bg-white px-2 py-0.5 rounded border border-surface-darker shrink-0">
                    4×6&quot;
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-xs text-text-main/70 leading-normal">
                Canadian passport and PR photographs are processed in volatile RAM. Never uploaded or saved
                to servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-1">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 50×70 mm IRCC
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 31–36 mm Face
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">
                  ✓ 591×827 px @ 300 DPI
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
