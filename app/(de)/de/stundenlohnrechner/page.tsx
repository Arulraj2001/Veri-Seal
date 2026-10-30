import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyStundenlohnEngine } from '@/components/international/GermanyStundenlohnEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Stundenlohnrechner 2026 Deutschland | Gehalt umrechnen',
  description:
    'Berechnen Sie Ihren Stundenlohn aus dem Monatsgehalt nach der offiziellen Formel des Bundesarbeitsgerichts. Mindestlohn-Check 2026 und Minijob 538 €.',
  keywords: [
    'stundenlohnrechner 2026',
    'gehalt in stundenlohn umrechnen',
    'gesetzlicher mindestlohn deutschland 2026',
    'minijob stundenlohn rechner 538 euro',
    'arbeitsstunden monat berechnen',
    'formel bundesarbeitsgericht stundenlohn',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/stundenlohnrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/stundenlohnrechner`,
      'de': `${SITE_URL}/de/stundenlohnrechner`,
      'x-default': `${SITE_URL}/de/stundenlohnrechner`,
    },
  },
  openGraph: {
    title: 'Stundenlohnrechner 2026 Deutschland | Gehalt umrechnen',
    description:
      'Rechnen Sie Ihr Monatsgehalt und Ihre Wochenstunden in den genauen Stundenlohn um. Offizielle Formel des Bundesarbeitsgerichts.',
    url: `${SITE_URL}/de/stundenlohnrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
};

export default function GermanyStundenlohnPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Stundenlohnrechner Deutschland 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Kostenloser Rechner zur Umrechnung von Monatsgehalt und Wochenstunden in den tatsächlichen Stundenlohn brutto und netto gemäß Bundesarbeitsgericht (BAG) und Mindestlohngesetz 2026.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie lautet die offizielle Formel zur Berechnung des Stundenlohns?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nach der Rechtsprechung des Bundesarbeitsgerichts (BAG) lautet die exakte Berechnungsformel: (Monatsgehalt brutto × 3 Monate) ÷ 13 Wochen ÷ wöchentliche Arbeitsstunden. Ein Quartal umfasst rechnerisch genau 13 Wochen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hoch ist der gesetzliche Mindestlohn in Deutschland 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Der gesetzliche Mindestlohn nach dem Mindestlohngesetz (MiLoG) liegt in Deutschland im Jahr 2026 bei 12,82 Euro brutto pro Zeitstunde. Für Minijobber mit einem Monatsverdienst bis 538 Euro gilt derselbe gesetzliche Stundensatz.',
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
          <span className="text-slate-900 font-bold">Stundenlohnrechner</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <span>Formel des Bundesarbeitsgerichts & Mindestlohngesetz 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Stundenlohnrechner 2026: Gehalt in Stundenlohn
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Rechnen Sie Ihr festes monatliches Bruttogehalt und Ihre Wochenarbeitszeit in Ihren exakten Stundenlohn um.
            Inklusive Prüfung des gesetzlichen Mindestlohns und Minijob-Grenzwerte.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-amber-50/60 border-l-4 border-amber-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Stundenlohn-Berechnung nach BAG
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Der Stundenlohn wird berechnet, indem das 3-fache Monatsbruttogehalt durch 13 Wochen und die wöchentliche
            Stundenzahl geteilt wird. 2026 beträgt der gesetzliche Mindestlohn in Deutschland 12,82 Euro brutto je Stunde,
            bei einer Minijob-Grenze von 538 Euro.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyStundenlohnEngine />

        {/* Statutory Reference Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Verdienstgrenzen im Arbeitsrecht 2026
            </h2>
            <p className="text-sm text-slate-600">
              Überblick über Steuer- und Sozialversicherungsregeln nach Beschäftigungsstatus.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Beschäftigungsart</th>
                  <th className="py-3 px-4 font-mono">Monatlicher Verdienst</th>
                  <th className="py-3 px-4 font-mono">Mindestlohn 2026</th>
                  <th className="py-3 px-4">Abzüge Arbeitnehmer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Geringfügige Beschäftigung (Minijob)</td>
                  <td className="py-3 px-4 font-bold text-amber-600">bis 538,00 €</td>
                  <td className="py-3 px-4">12,82 € / Std.</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">0 € (steuer- & beitragsfrei)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Übergangsbereich (Midijob)</td>
                  <td className="py-3 px-4 font-bold text-amber-600">538,01 € – 2.000,00 €</td>
                  <td className="py-3 px-4">12,82 € / Std.</td>
                  <td className="py-3 px-4 font-sans text-blue-600 font-bold">Gleitend reduzierter Beitragsanteil</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Reguläres Arbeitsverhältnis</td>
                  <td className="py-3 px-4 font-bold text-amber-600">ab 2.000,01 €</td>
                  <td className="py-3 px-4">12,82 € / Std.</td>
                  <td className="py-3 px-4 font-sans text-slate-700 font-bold">Volle Lohnsteuer & Sozialabgaben</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Möchten Sie das vollständige Netto-Jahresgehalt berechnen?</h3>
            <p className="text-xs text-slate-400">
              Simulieren Sie Lohnsteuer, Krankenkassenbeiträge und Solidaritätszuschlag mit unserem Gehaltsrechner.
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

