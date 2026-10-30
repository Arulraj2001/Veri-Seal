import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Car, Zap, Percent, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyFirmenwagenEngine } from '@/components/international/GermanyFirmenwagenEngine';

export const metadata: Metadata = {
  title: 'Firmenwagenrechner 2026 : 1%-Regelung & Elektro (0,25%) | Kagazo',
  description:
    'Berechnen Sie den geldwerten Vorteil Ihres Dienstwagens nach der 1%-Regelung, 0,5%-Regelung (Hybrid) und 0,25%-Regelung (Elektro bis 70.000 € BLP) inklusive Fahrtenbuch-Vergleich.',
  alternates: {
    canonical: `${SITE_URL}/de/firmenwagenrechner`,
  },
  openGraph: {
    title: 'Firmenwagenrechner 2026 : 1%-Regelung & Elektro (0,25%) | Kagazo Deutschland',
    description:
      'Geldwerter Vorteil Dienstwagen nach § 6 Abs. 1 Nr. 4 EStG für Verbrenner, Hybrid und reine Elektrofahrzeuge präzise berechnen.',
    url: `${SITE_URL}/de/firmenwagenrechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function FirmenwagenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Firmenwagenrechner 1%-Regelung Deutschland 2026',
    category: 'TaxDeduction',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Offizieller Rechner für den geldwerten Vorteil von Dienstwagen nach § 6 Abs. 1 Nr. 4 EStG für Verbrenner (1%), Hybrid (0,5%) und Elektro (0,25%).',
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
          <span>§ 6 Abs. 1 Nr. 4 EStG • 1%-Regelung • Elektro-Förderung 0,25%</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Firmenwagenrechner 2026 : Geldwerter Vorteil nach 1%-Regelung
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Wer seinen Dienstwagen auch privat oder für den Arbeitsweg nutzt, muss diesen Sachbezug als geldwerten Vorteil versteuern. Berechnen Sie exakt den steuerpflichtigen Betrag für Verbrenner (1%), Plug-in-Hybride (0,5%) und reine Elektrofahrzeuge (0,25% bis 70.000 € Bruttolistenpreis) sowie die tatsächlichen Netto-Kosten auf Ihrer Gehaltsabrechnung.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyFirmenwagenEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Car className="w-5 h-5" />
            <span>Wie setzt sich der geldwerte Vorteil zusammen?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Der geldwerte Vorteil besteht aus zwei Komponenten: <strong>1. Pauschale Privatnutzung:</strong> 1% (bzw. 0,5% oder 0,25%) des auf volle 100 € abgerundeten Bruttolistenpreises (BLP) pro Monat. <strong>2. Fahrten zwischen Wohnung und erster Tätigkeitsstätte:</strong> 0,03% des BLP pro Entfernungskilometer und Kalendermonat.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>Die 0,25%-Regelung für Elektro-Dienstwagen</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Für reine Elektrofahrzeuge (ohne CO₂-Emissionen), deren Bruttolistenpreis <strong>70.000 €</strong> nicht übersteigt, wird für die Versteuerung nur ein <strong>Viertel des Bruttolistenpreises (0,25%)</strong> zugrunde gelegt. Bei teureren Elektroautos über 70.000 € und Plug-in-Hybriden gilt die 0,5%-Besteuerung.
          </p>
        </div>
      </div>
    </div>
  );
}
