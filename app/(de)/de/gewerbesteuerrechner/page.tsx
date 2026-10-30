import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Building2, Percent, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyGewerbesteuerEngine } from '@/components/international/GermanyGewerbesteuerEngine';

export const metadata: Metadata = {
  title: 'Gewerbesteuerrechner 2026 : Hebesatz & Freibetrag (§ 11 GewStG) | Kagazo',
  description:
    'Berechnen Sie Ihre Gewerbesteuer nach Steuermesszahl 3,5%, Hebesatz der Gemeinde, Freibetrag (24.500 € für Einzelunternehmer) und ESt-Anrechnung nach § 35 EStG.',
  alternates: {
    canonical: `${SITE_URL}/de/gewerbesteuerrechner`,
  },
  openGraph: {
    title: 'Gewerbesteuerrechner 2026 : Hebesatz & Freibetrag (§ 11 GewStG) | Kagazo Deutschland',
    description:
      'Gewerbesteuer für Einzelunternehmen, GbR und GmbH nach dem offiziellen Gewerbesteuergesetz (GewStG) berechnen.',
    url: `${SITE_URL}/de/gewerbesteuerrechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function GewerbesteuerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Gewerbesteuerrechner Deutschland',
    category: 'BusinessTax',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Offizieller Gewerbesteuerrechner nach dem Gewerbesteuergesetz (GewStG) mit Steuermessbetrag und kommunalem Hebesatz.',
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
          <span>§§ 11, 14 GewStG • Steuermesszahl 3,5% • Anrechnung nach § 35 EStG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Gewerbesteuerrechner 2026 : Hebesatz &amp; Steuermessbetrag
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Gewerbetreibende in Deutschland unterliegen der Gewerbesteuer, deren Höhe maßgeblich vom Hebesatz der jeweiligen Standortgemeinde abhängt. Berechnen Sie Ihre genaue Zahllast unter Berücksichtigung des Freibetrags von 24.500 € für Personenunternehmen und der steuermindernden Anrechnung auf Ihre Einkommensteuer.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyGewerbesteuerEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Freibetrag von 24.500 € für Einzelunternehmer</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Einzelgewerbetreibende und Personengesellschaften (GbR, OHG, KG) erhalten nach § 11 Abs. 1 GewStG einen gesetzlichen <strong>Freibetrag von 24.500 €</strong> auf den Gewerbeertrag. Erst der diesen Betrag übersteigende Gewinn wird mit der bundeseinheitlichen Steuermesszahl von <strong>3,5%</strong> belegt. Kapitalgesellschaften (GmbH, UG, AG) steht kein Freibetrag zu.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Steuerermäßigung bei der Einkommensteuer (§ 35 EStG)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Um eine Doppelbesteuerung zu vermeiden, können Einzelunternehmer die gezahlte Gewerbesteuer bis zum <strong>4,0-fachen des Steuermessbetrags</strong> direkt von ihrer tariflichen Einkommensteuer abziehen. Bei Hebesätzen bis etwa 400% wird die Gewerbesteuer dadurch fast vollständig neutralisiert.
          </p>
        </div>
      </div>
    </div>
  );
}
