import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileUp, CheckCircle2, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyPdfKompressorEngine } from '@/components/international/GermanyPdfKompressorEngine';

export const metadata: Metadata = {
  title: 'PDF-Kompressor Behörden & Arbeitsagentur (<2 MB) | Kagazo',
  description:
    'Komprimieren Sie PDF-Dateien kostenlos unter 2 MB oder 4 MB für Uploads bei der Bundesagentur für Arbeit, BAföG Digital, ELSTER und Gerichten. 100% lokal im Browser nach DSGVO.',
  alternates: {
    canonical: `${SITE_URL}/de/pdf-kompressor-online-antraege`,
  },
  openGraph: {
    title: 'PDF-Kompressor Behörden & Arbeitsagentur (<2 MB) | Kagazo Deutschland',
    description:
      'Optimieren Sie PDF-Dokumente für staatliche Online-Anträge in Deutschland ohne Qualitätsverlust und ohne Serverübertragung.',
    url: `${SITE_URL}/de/pdf-kompressor-online-antraege`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function PdfKompressorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF-Kompressor für Behördenportale Deutschland',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'PDF-Komprimierung für Dateigrößen-Limits von Behördenportalen wie Bundesagentur für Arbeit und BAföG Digital.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
          <ShieldCheck className="w-4 h-4" />
          <span>E-Government Standard • Bundesagentur für Arbeit &amp; BAföG • DSGVO-Konform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          PDF-Kompressor für Behördenanträge &amp; Arbeitsagentur (&lt; 2 MB)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Deutsche Behördenportale (Bundesagentur für Arbeit, BAföG Digital, ELSTER, Gerichte) weisen Dokumente ab, die die strikte Grenze von <strong>2 MB oder 4 MB</strong> überschreiten. Reduzieren Sie die Dateigröße Ihrer Anträge, Nachweise und Zeugnisse schnell und sicher direkt im Browser.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyPdfKompressorEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>Höchste Datensicherheit für vertrauliche Anträge</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gehaltsabrechnungen, Steuerbescheide und ärztliche Atteste enthalten streng vertrauliche Personendaten. Die Komprimierung erfolgt deshalb zu <strong>100% lokal auf Ihrem Endgerät</strong>. Es findet kein Upload auf Cloud-Server statt, womit die Anforderungen der Datenschutz-Grundverordnung (DSGVO) lückenlos gewahrt bleiben.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <FileUp className="w-5 h-5" />
            <span>Dateigrößen-Limits deutscher Portale</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            • <strong>Bundesagentur für Arbeit (Arbeitslosengeld / Bürgergeld):</strong> max. 2 MB pro Datei.<br />
            • <strong>BAföG Digital &amp; Universitäten:</strong> max. 2 bis 4 MB je Dokument.<br />
            • <strong>ELSTER (Finanzamt Belegnachreichung):</strong> max. 4 MB pro PDF.<br />
            • <strong>Elektronischer Rechtsverkehr (Gerichte):</strong> max. 4 bis 10 MB.
          </p>
        </div>
      </div>
    </div>
  );
}
