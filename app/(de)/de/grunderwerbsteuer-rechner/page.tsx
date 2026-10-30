import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, MapPin, Calculator, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyGrunderwerbsteuerEngine } from '@/components/international/GermanyGrunderwerbsteuerEngine';

export const metadata: Metadata = {
  title: 'Grunderwerbsteuer-Rechner 2026 : Alle 16 Bundesländer | Kagazo',
  description:
    'Berechnen Sie die Grunderwerbsteuer beim Immobilienkauf für Ihr Bundesland (von 3,5% in Bayern & Sachsen bis 6,5% in NRW, Hessen und Schleswig-Holstein).',
  alternates: {
    canonical: `${SITE_URL}/de/grunderwerbsteuer-rechner`,
  },
  openGraph: {
    title: 'Grunderwerbsteuer-Rechner 2026 : Alle 16 Bundesländer | Kagazo Deutschland',
    description:
      'Offizieller Rechner für die Grunderwerbsteuer nach GrEStG für Haus- und Wohnungskäufer in ganz Deutschland.',
    url: `${SITE_URL}/de/grunderwerbsteuer-rechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function GrunderwerbsteuerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Grunderwerbsteuer-Rechner Deutschland',
    category: 'RealEstateTax',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Rechner für die Grunderwerbsteuer nach Bundesländern gemäß Grunderwerbsteuergesetz (GrEStG).',
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
          <span>GrEStG • Aktuelle Steuersätze 2026 aller 16 Bundesländer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Grunderwerbsteuer-Rechner 2026 für alle Bundesländer
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Die Grunderwerbsteuer stellt den größten Posten der Kaufnebenkosten beim Immobilienerwerb dar. Da die Bundesländer den Steuersatz autonom festlegen, reicht die Spanne von <strong>3,5% in Bayern und Sachsen</strong> bis zu <strong>6,5% in Nordrhein-Westfalen, Hessen, Brandenburg, Saarland und Schleswig-Holstein</strong>.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyGrunderwerbsteuerEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <MapPin className="w-5 h-5" />
            <span>Fälligkeit &amp; Unbedenklichkeitsbescheinigung</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nach der notariellen Beurkundung sendet das zuständige Finanzamt den Grunderwerbsteuerbescheid. Die Steuer ist <strong>einen Monat nach Bekanntgabe</strong> fällig. Erst wenn die Steuer vollständig bezahlt ist, stellt das Finanzamt die <strong>Unbedenklichkeitsbescheinigung</strong> aus, ohne die der Notar die Eigentumsumschreibung im Grundbuch nicht veranlassen kann.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>Steuer sparen durch Zubehör und Instandhaltungsrücklage</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mitverkaufte bewegliche Gegenstände (z.B. eine Einbauküche, Markisen, Saunen) oder die anteilige Instandhaltungsrücklage bei Eigentumswohnungen unterliegen <strong>nicht der Grunderwerbsteuer</strong>. Werden diese Posten im notariellen Kaufvertrag gesondert mit realistischem Sachwert beziffert, mindert dies die steuerliche Bemessungsgrundlage spürbar.
          </p>
        </div>
      </div>
    </div>
  );
}
