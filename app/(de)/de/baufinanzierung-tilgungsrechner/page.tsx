import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Landmark, Calculator, Percent } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyBaufinanzierungEngine } from '@/components/international/GermanyBaufinanzierungEngine';

export const metadata: Metadata = {
  title: 'Baufinanzierungsrechner : Monatsrate & Tilgungsplan | Kagazo',
  description:
    'Berechnen Sie Ihre monatliche Kreditrate, Zins- und Tilgungsanteil sowie die Restschuld nach Ablauf der Zinsbindung für Ihr Annuitätendarlehen.',
  alternates: {
    canonical: `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
  },
  openGraph: {
    title: 'Baufinanzierungsrechner : Monatsrate & Tilgungsplan | Kagazo Deutschland',
    description:
      'Immobilienkredit- und Annuitätenrechner mit Zinsbindung, Restschuld und Gesamtzinsbelastung.',
    url: `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function BaufinanzierungPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Baufinanzierungsrechner Annuitätendarlehen Deutschland',
    category: 'MortgageLoan',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Online-Rechner für Baufinanzierung und Annuitätendarlehen mit variabler Zinsbindung, anfänglicher Tilgung und Restschuldberechnung.',
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
          <span>Annuitätendarlehen • Zinsbindung • Exakter Tilgungsplan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Baufinanzierungsrechner : Monatsrate &amp; Tilgungsplan
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Das Annuitätendarlehen ist die Standardform der Immobilienfinanzierung in Deutschland. Die Monatsrate bleibt über die gesamte Zinsbindungsfrist hinweg konstant: Da mit jeder Rate ein Teil der Schuld getilgt wird, sinkt der Zinsanteil Monat für Monat, während der Tilgungsanteil kontinuierlich ansteigt.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyBaufinanzierungEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Warum ist die anfängliche Tilgung entscheidend?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eine anfängliche Tilgung von mindestens <strong>2% bis 3%</strong> schützt vor einer gefährlich hohen Restschuld zum Ende der Zinsbindung. Bei einer zu niedrigen Tilgung von nur 1% dauert die vollständige Rückzahlung über 40 Jahre, wodurch das Zinsänderungsrisiko bei der Anschlussfinanzierung stark ansteigt.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Landmark className="w-5 h-5" />
            <span>Sonderkündigungsrecht nach § 489 BGB</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Auch bei einer langen Zinsbindung von 15 oder 20 Jahren haben Darlehensnehmer nach <strong>§ 489 Abs. 1 Nr. 2 BGB</strong> das gesetzliche Recht, das Darlehen nach Ablauf von 10 Jahren nach dem vollständigen Empfang ganz oder teilweise ohne Vorfälligkeitsentschädigung unter Einhaltung einer Kündigungsfrist von 6 Monaten zu kündigen.
          </p>
        </div>
      </div>
    </div>
  );
}
