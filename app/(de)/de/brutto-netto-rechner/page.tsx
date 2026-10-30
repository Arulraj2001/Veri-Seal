import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanySalaryEngine } from '@/components/international/GermanySalaryEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Brutto-Netto-Rechner 2026 | Gehaltsrechner Deutschland',
  description:
    'Berechnen Sie Ihr Nettogehalt 2026 in Deutschland für Steuerklasse 1 bis 6. Genaue Ermittlung von Lohnsteuer, Krankenkasse und Rentenversicherung.',
  keywords: [
    'brutto netto rechner 2026',
    'gehaltsrechner deutschland',
    'wie viel netto von 50000 brutto',
    'steuerklasse 1 gehalt rechner',
    'abzuge lohnsteuer sozialabgaben',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/brutto-netto-rechner`,
    languages: HREFLANG_REGISTRY.salary_calculator.locales,
  },
};

export default function GermanySalaryPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Brutto-Netto-Rechner Deutschland 2026',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Kostenloser Brutto-Netto-Rechner zur präzisen Berechnung des Nettogehalts nach deutschem Einkommensteuergesetz 2026.',
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Brutto-Netto-Rechner</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <span>Aktueller Einkommensteuertarif § 32a EStG 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Brutto-Netto-Rechner 2026 (Deutschland)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Ermitteln Sie mit wenigen Klicks, wie viel von Ihrem Bruttolohn nach Abzug von Steuern und Sozialabgaben auf Ihrem Bankkonto ankommt.
          </p>
        </div>

        <GermanySalaryEngine />

        {/* Answer Capsule (GEO Rule of 45 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Direkte Antwort: Wie viel Netto bleibt von 50.000 € Brutto?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Bei einem Jahresbruttogehalt von <strong>50.000 €</strong> in Steuerklasse 1 (kinderlos, ohne Kirchensteuer) bleiben Ihnen in Deutschland 2026 monatlich rund <strong>2.685 € netto</strong> (ca. 32.220 € jährlich). Die Sozialabgaben betragen ca. 21% und die Lohnsteuer rund 14,5%.
          </p>
        </div>

        {/* Gesetzliche Abzüge */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Zusammensetzung der gesetzlichen Gehaltsabzüge in Deutschland
          </h2>
          <p>
            Vom Bruttogehalt eines Arbeitnehmers werden in Deutschland automatisch zwei Hauptblöcke einbehalten:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Gesetzliche Sozialabgaben (~21% Arbeitnehmeranteil):</strong> Krankenversicherung (7,3% + halber Zusatzbeitrag), Rentenversicherung (9,3%), Arbeitslosenversicherung (1,3%) und Pflegeversicherung (2,2% mit Kind, 2,8% ohne Kind).
            </li>
            <li>
              <strong>Steuerabzüge:</strong> Die Lohnsteuer richtet sich nach Ihrem zu versteuernden Einkommen und Ihrer gewählten Steuerklasse (Klassen 1 bis 6). Der Grundfreibetrag liegt 2026 bei ca. 11.784 Euro.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

