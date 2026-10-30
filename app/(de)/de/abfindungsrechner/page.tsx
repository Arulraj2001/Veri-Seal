import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyAbfindungEngine } from '@/components/international/GermanyAbfindungEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Abfindungsrechner 2026 Deutschland | Fünftelregelung Netto',
  description:
    'Berechnen Sie Ihre Netto-Abfindung 2026 mit der Fünftelregelung nach § 34 EStG. Richtwert nach § 1a KSchG, Steuerersparnis und Sozialversicherungsfreiheit.',
  keywords: [
    'abfindungsrechner 2026',
    'fünftelregelung abfindung rechner',
    'abfindung netto berechnen',
    'steuern auf abfindung sparen',
    'abfindung kuendigungsschutzgesetz rechner',
    'abfindung sozialabgabenfrei',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/abfindungsrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/abfindungsrechner`,
      'de': `${SITE_URL}/de/abfindungsrechner`,
      'x-default': `${SITE_URL}/de/abfindungsrechner`,
    },
  },
  openGraph: {
    title: 'Abfindungsrechner 2026 Deutschland | Fünftelregelung Netto',
    description:
      'Berechnen Sie online, wie viel Netto von Ihrer Abfindung übrig bleibt. Steuerermäßigung durch die Fünftelregelung nach § 34 EStG.',
    url: `${SITE_URL}/de/abfindungsrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
};

export default function GermanyAbfindungPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Abfindungsrechner Deutschland 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulationsrechner für Entlassungsabfindungen in Deutschland mit automatischer Anwendung der ermäßigten Besteuerung nach der Fünftelregelung (§ 34 EStG) und Richtwertprüfung (§ 1a KSchG).',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie funktioniert die Fünftelregelung bei einer Abfindung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Die Fünftelregelung nach § 34 EStG mildert die steuerliche Progression bei außerordentlichen Einkünften. Das Finanzamt berechnet die Steuer auf das reguläre Einkommen plus ein Fünftel der Abfindung. Der daraus resultierende Differenzbetrag wird mit fünf multipliziert, was zu einer deutlich geringeren Steuerlast führt als bei einer Vollbesteuerung auf einen Schlag.',
            },
          },
          {
            '@type': 'Question',
            name: 'Müssen auf eine Abfindung Sozialabgaben gezahlt werden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nein, eine echte Abfindung als Entschädigung für den Verlust des Arbeitsplatzes ist in der gesetzlichen Sozialversicherung vollkommen beitragsfrei. Es fallen keine Beiträge zur Renten-, Kranken-, Pflege- oder Arbeitslosenversicherung an.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Abfindungsrechner</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <span>Einkommensteuergesetz § 34 & Kündigungsschutzgesetz § 1a</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Abfindungsrechner 2026: Netto & Fünftelregelung
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Ermitteln Sie präzise, wie viel von Ihrer Abfindungssumme nach Abzug der Lohnsteuer auf Ihrem Konto ankommt
            und wie hoch Ihre Steuerersparnis durch die gesetzliche Fünftelregelung ausfällt.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-amber-50/60 border-l-4 border-amber-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Besteuerung von Abfindungen auf einen Blick
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Echte Entlassungsabfindungen sind sozialversicherungsfrei, unterliegen jedoch der Lohnsteuer.
            Die Fünftelregelung nach § 34 EStG glättet die Steuerprogression, indem sie die Steuerlast
            so berechnet, als würde die Abfindung über fünf Jahre gestreckt zufließen.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyAbfindungEngine />

        {/* AdSense Placement Slot 1 */}
        <div className="w-full border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Werbeplatzhalter
          </span>
        </div>

        {/* Statutory Reference Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Kündigungsabfindung im Arbeitsrecht (§ 1a KSchG)
            </h2>
            <p className="text-sm text-slate-600">
              Gesetzliche Richtwerte bei betriebsbedingter Kündigung oder Aufhebungsverträgen.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kündigungssachverhalt</th>
                  <th className="py-3 px-4 font-mono">Regelabfindung (§ 1a KSchG)</th>
                  <th className="py-3 px-4 font-mono">Sozialabgaben</th>
                  <th className="py-3 px-4">Fünftelregelung anwendbar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Betriebsbedingte Kündigung mit Abfindungsangebot</td>
                  <td className="py-3 px-4 font-bold text-amber-600">0,5 Monatsgehälter / Dienstjahr</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">0 € (beitragsfrei)</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Ja (§ 34 EStG)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Aufhebungsvertrag (gerichtlicher / außergerichtlicher Vergleich)</td>
                  <td className="py-3 px-4 font-bold text-amber-600">0,5 – 1,0 Monatsgehälter / Dienstjahr</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">0 € (beitragsfrei)</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Ja</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Eigenkündigung durch den Arbeitnehmer</td>
                  <td className="py-3 px-4 text-slate-400">Kein gesetzlicher Anspruch</td>
                  <td className="py-3 px-4 font-sans text-slate-400">—</td>
                  <td className="py-3 px-4 font-sans text-slate-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Planen Sie Ihren neuen Arbeitsvertrag in Deutschland?</h3>
            <p className="text-xs text-slate-400">
              Berechnen Sie das Nettogehalt nach Steuerklasse 1 bis 6 und den Sozialabgaben 2026.
            </p>
          </div>
          <Link
            href="/de/brutto-netto-rechner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Brutto Netto Rechner 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
