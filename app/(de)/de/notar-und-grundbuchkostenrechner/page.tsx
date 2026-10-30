import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Landmark, Home, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyNotarEngine } from '@/components/international/GermanyNotarEngine';

export const metadata: Metadata = {
  title: 'Notar- & Grundbuchkostenrechner 2026 (GNotKG) | Kagazo',
  description:
    'Berechnen Sie die anfallenden Notargebühren und Grundbuchamtskosten beim Immobilienkauf nach dem Gerichts- und Notarkostengesetz (GNotKG).',
  alternates: {
    canonical: `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
  },
  openGraph: {
    title: 'Notar- & Grundbuchkostenrechner 2026 (GNotKG) | Kagazo Deutschland',
    description:
      'Offizieller Rechner für Notargebühren, Grundschuldbestellung und Grundbucheintragung nach den Gebührensätzen des GNotKG.',
    url: `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function NotarGrundbuchPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Notar- und Grundbuchkostenrechner Deutschland',
    category: 'RealEstateAcquisitionFees',
    feesAndCommissionsSpecification: 'Gerichts- und Notarkostengesetz (GNotKG) Tabelle B',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Präzisionsrechner für Notargebühren und Grundbuchamtskosten beim Haus- oder Wohnungskauf in Deutschland.',
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
          <span>GNotKG • Gesetzliche Gebührentabelle B • Kaufvertrag &amp; Grundschuld</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Notar- &amp; Grundbuchkostenrechner 2026 nach GNotKG
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Beim Kauf einer Immobilie oder eines Baugrundstücks in Deutschland fallen Notar- und Grundbuchkosten in Höhe von durchschnittlich <strong>1,5% bis 2,0% des Kaufpreises</strong> an. Diese Gebühren sind gesetzlich strikt geregelt und für alle Notariate bundesweit einheitlich verbindlich.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyNotarEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Landmark className="w-5 h-5" />
            <span>Notargebühren vs. Grundbuchamt</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Die Gesamtkosten teilen sich auf: Der <strong>Notar</strong> erhält Gebühren für die Beurkundung des Kaufvertrags (2,0-Gebühr), die Betreuung und den Vollzug sowie ggf. die Grundschuldbestellung zuzüglich 19% Mehrwertsteuer. Das staatliche <strong>Grundbuchamt</strong> stellt gesondert umsatzsteuerfreie Gebühren für Auflassungsvormerkung und Eigentumsumschreibung in Rechnung.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Home className="w-5 h-5" />
            <span>Sind Notargebühren verhandelbar?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nein. Notare sind Träger eines öffentlichen Amtes. Nach § 17 Abs. 1 der Bundesnotarordnung (BNotO) ist es dem Notar gesetzlich streng untersagt, Gebühren zu erlassen oder Rabatte zu gewähren. Jeder Notar in Deutschland muss exakt nach dem Gerichts- und Notarkostengesetz (GNotKG) abrechnen.
          </p>
        </div>
      </div>
    </div>
  );
}
