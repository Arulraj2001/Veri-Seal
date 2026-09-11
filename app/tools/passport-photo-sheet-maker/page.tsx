import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Grid,
  Award,
  HelpCircle,
  Scissors,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
} from 'lucide-react';
import PhotoSheetEngine from '@/components/tools/PhotoSheetEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Passport Photo Sheet Maker Online Free (4x6" & A4) | VeriSeal',
  description:
    'Create printable 4x6" (8 photos) and A4 (32 photos) passport photo sheets online free at 300 DPI. Add candidate name & date of photo with scissor cutting guides. Save Rs. 100 on photo studio prints.',
  alternates: {
    canonical: 'https://veriseal.in/tools/passport-photo-sheet-maker',
  },
  openGraph: {
    title: 'Passport Photo Sheet Maker Free (4x6" & A4) | VeriSeal',
    description:
      'Tile passport photos onto 4x6" photo card or A4 paper with cutting guides. Ready for instant 300 DPI printing at home or cyber cafe.',
    url: 'https://veriseal.in/tools/passport-photo-sheet-maker',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does printing a 4x6" passport photo sheet save money?',
    answer:
      'Photo studios typically charge ₹80 to ₹150 for 8 passport photos. When you generate a 4x6" (10x15 cm) photo sheet on VeriSeal, you can print it at any local photo lab, studio, or color inkjet printer for just ₹5 to ₹10 as a standard 4x6 photo print, saving up to 90% of the cost!',
  },
  {
    question: 'What is the correct printer scaling setting for exact 3.5×4.5 cm photos?',
    answer:
      'Always select "Actual Size" or "100% Scale" in your printer settings. Do NOT select "Fit to Printable Area" or "Scale to Fit", as this will stretch or shrink the photos by a few millimeters.',
  },
  {
    question: 'Which exams require Candidate Name and Date printed on the photo?',
    answer:
      'Major recruitment examinations such as UPSC Civil Services, NDA/CDS, SSC CGL/CHSL, and various State Police Recruitment Boards mandate that the candidate name in capital letters and the date the photograph was taken (DOP) be visibly printed on a white strip at the bottom of the photo.',
  },
  {
    question: 'Can I print these passport photos on regular A4 copy paper?',
    answer:
      'Yes, you can print the A4 sheet on regular 80 GSM paper for draft verification or forms that accept xerox copies. However, for official application submissions and hall tickets, printing on glossy photo paper (180–230 GSM) is strongly recommended.',
  },
];

const COST_COMPARISON = [
  {
    item: 'Local Photo Studio (8 Passport Photos)',
    cost: '₹80 - ₹150',
    time: '20 - 45 Minutes',
    control: 'No control over dimensions or DOP strip',
  },
  {
    item: 'Commercial Online Photo Apps',
    cost: '₹99 - ₹199 (Shipping + Markup)',
    time: '3 - 5 Days Delivery',
    control: 'Subscription or paywalls',
  },
  {
    item: 'VeriSeal 4x6" Sheet + Local Print',
    cost: '₹5 - ₹10 (Standard 4x6 print cost)',
    time: 'Instant (10 Seconds)',
    control: '100% Free, custom Name/Date & cutting lines',
  },
];

export default function PassportPhotoSheetPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'VeriSeal Passport Photo Sheet Maker',
            url: 'https://veriseal.in/tools/passport-photo-sheet-maker',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'INR',
            },
            description:
              'Generate 4x6 inch and A4 passport photo sheets at 300 DPI with cutting guides and Name/Date caption.',
          }),
        }}
      />

      <div className="max-w-[1440px] xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Photo Studio Suite
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Passport Photo Sheet Maker</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Printer className="w-3.5 h-3.5 text-purple-600" />
            <span>Cyber Cafe &amp; Studio Production Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Passport Photo Sheet Maker (4×6&quot; &amp; A4 at 300 DPI)
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Tile passport photos onto standard 4×6&quot; (8 photos for ₹5 lab print) or A4 sheets (32 photos). Multi-subject support with scissor cutting guidelines, candidate name &amp; DOP stamp, and pure client-side PDF download.
          </p>
        </div>

        {/* In-Memory Privacy Assurance Banner */}
        <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium max-w-2xl shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>100% Secure In-Memory RAM Processing:</strong> Your photos are rendered entirely inside your browser. Zero photos are uploaded or saved to any server disk.
          </span>
        </div>

        {/* THE MASTER STUDIO ENGINE (Full Width) */}
        <div className="pt-2">
          <PhotoSheetEngine />
        </div>

        {/* SEO & Knowledge Sections Below Studio */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cost Saving Comparison Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Why Studios &amp; Candidates Use VeriSeal Photo Sheet Maker</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-surface-darker/60 text-muted-foreground font-semibold">
                    <th className="pb-3 pr-4">Printing Method</th>
                    <th className="pb-3 pr-4">Cost for 8 Photos</th>
                    <th className="pb-3 pr-4">Turnaround Time</th>
                    <th className="pb-3">Customization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-darker/40 text-foreground">
                  {COST_COMPARISON.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-surface-lighter/40 transition-colors ${
                        idx === 2 ? 'bg-purple-50/50 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 pr-4 text-purple-900 font-bold">{row.item}</td>
                      <td className="py-3 pr-4 font-mono">{row.cost}</td>
                      <td className="py-3 pr-4">{row.time}</td>
                      <td className="py-3 text-muted-foreground">{row.control}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Cyber Cafe & Studio Tools */}
          <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span>Related Studio Tools</span>
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/tools/stamp-size-photo-maker"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors text-foreground font-medium group border border-slate-100"
              >
                <span className="truncate">Stamp Size &amp; NEET Postcard Maker</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/pvc-id-card-maker"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors text-foreground font-medium group border border-slate-100"
              >
                <span className="truncate">Dual-Sided PVC Smart Card Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/formal-attire-changer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors text-foreground font-medium group border border-slate-100"
              >
                <span className="truncate">Formal Suit &amp; Attire Changer</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/photo-date-name-stamper"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors text-foreground font-medium group border border-slate-100"
              >
                <span className="truncate">SSC / UPSC Name &amp; DOP Stamper</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/tools/biometric-face-aligner"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/60 transition-colors text-foreground font-medium group border border-slate-100"
              >
                <span className="truncate">ICAO Biometric Face Aligner</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trimming Guide & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Cutting & Trimming Guide */}
          <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Scissors className="w-5 h-5 text-purple-600" />
              <span>How to Cut &amp; Prepare Photos for Hall Tickets</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[11px]">
                  1
                </span>
                <h3 className="font-bold text-slate-800 pt-1">Print at 100%</h3>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Print on 4×6&quot; glossy photo paper. Ensure printer dialog is set to &quot;Actual Size&quot; (100%).
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[11px]">
                  2
                </span>
                <h3 className="font-bold text-slate-800 pt-1">Follow Corner Ticks</h3>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Use a steel ruler and cutter or sharp scissors along the professional corner tick marks.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[11px]">
                  3
                </span>
                <h3 className="font-bold text-slate-800 pt-1">Paste on Admit Card</h3>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Use a dry glue stick to paste smoothly without wrinkling the exam attendance sheet.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl border border-surface-darker/80 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60">
                  <h3 className="font-bold text-slate-800 text-xs">{faq.question}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
