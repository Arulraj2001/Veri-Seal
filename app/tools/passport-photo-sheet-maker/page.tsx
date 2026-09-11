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

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Exam Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Passport Photo Sheet Maker</span>
        </nav>

        {/* Main Grid: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Printer className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cyber Cafe & Studio Utility</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Passport Photo Sheet Maker (4x6" & A4 at 300 DPI)
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Convert a single photo into a ready-to-print 8-photo sheet on standard 4×6" photo paper or a 32-photo sheet on A4 paper. Includes automatic scissor cutting guidelines and optional UPSC/SSC Name & Date of Photo strips.
              </p>
            </div>

            {/* In-Memory Privacy Callout */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Secure RAM Generation:</strong> Your photo is processed exclusively in temporary computer memory. Zero photos are saved or archived on our servers.
              </span>
            </div>

            {/* The Engine Component */}
            <PhotoSheetEngine />

            {/* Cost Saving Comparison Table */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Why Cyber Cafes & Students Use VeriSeal Photo Sheet Maker
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
                      <tr key={idx} className={`hover:bg-surface-lighter/40 transition-colors ${idx === 2 ? 'bg-emerald-50/50 font-semibold' : ''}`}>
                        <td className="py-3 pr-4 text-emerald-800">{row.item}</td>
                        <td className="py-3 pr-4 font-mono">{row.cost}</td>
                        <td className="py-3 pr-4">{row.time}</td>
                        <td className="py-3 text-muted-foreground">{row.control}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cutting & Trimming Guide */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Scissors className="w-5 h-5 text-emerald-600" />
                How to Cut & Prepare Photos for Hall Tickets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">1</span>
                  <h3 className="font-bold text-slate-800 pt-1">Print at 100%</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Print on 4x6" glossy photo paper. Ensure printer dialog is set to "Actual Size" (100%).
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">2</span>
                  <h3 className="font-bold text-slate-800 pt-1">Follow Dashed Guides</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Use a pair of clean scissors or paper trimmer along the dotted grey borders.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">3</span>
                  <h3 className="font-bold text-slate-800 pt-1">Paste on Admit Card</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Use glue stick (not liquid gum) to avoid wrinkles on the examination attendance sheet.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-surface-darker/40 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1.5 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (32%) Sticky Rail */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Top Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />

            {/* Quick Links */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Exam Photo & Signature Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/tnpsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">TNPSC Photo & Sign Resizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">UPSC Name & Date Photo Maker</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/gate-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">GATE & JAM GOAPS Resizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/rrb-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Railway RRB Photo Resizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Unlock e-Aadhaar PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Bottom Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
