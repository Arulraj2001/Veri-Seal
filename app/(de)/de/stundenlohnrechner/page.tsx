import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyStundenlohnEngine } from '@/components/international/GermanyStundenlohnEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Calculator, Clock, Briefcase, FileText } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Stundenlohnrechner 2026 | Offizielle Formel Bundesarbeitsgericht (BAG)',
  description:
    'Berechnen Sie Ihren Stundenlohn aus dem Monatsgehalt nach der offiziellen Formel des Bundesarbeitsgerichts. Mindestlohn-Check 2026 (12,82 €) und Minijob-Grenze (538 €).',
  keywords: [
    'stundenlohnrechner 2026',
    'gehalt in stundenlohn umrechnen',
    'gesetzlicher mindestlohn deutschland 2026',
    'minijob stundenlohn rechner 538 euro',
    'arbeitsstunden monat berechnen formel',
    'formel bundesarbeitsgericht stundenlohn bag',
    '40 stunden woche stundenlohn rechner',
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
    title: 'Stundenlohnrechner 2026 | Offizielle Formel Bundesarbeitsgericht (BAG)',
    description:
      'Rechnen Sie Ihr Monatsgehalt und Ihre Wochenstunden in den genauen Stundenlohn um. Gesetzlicher Mindestlohn 12,82 € und BAG-Formel.',
    url: `${SITE_URL}/de/stundenlohnrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stundenlohnrechner Deutschland 2026',
    description:
      'Monatsgehalt in Stundenlohn umrechnen mit der offiziellen Rechtsprechungsformel des Bundesarbeitsgerichts.',
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
        '@type': 'FinancialProduct',
        name: 'Stundenlohnberechnung & Arbeitszeitanalyse',
        description: 'Umrechnung von Festgehalt in Stundenverrechnungssätze und Mindestlohnprüfung nach MiLoG.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Kagazo Deutschland',
            item: `${SITE_URL}/de`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Stundenlohnrechner 2026',
            item: `${SITE_URL}/de/stundenlohnrechner`,
          },
        ],
      },
    ],
  };

  const hoursMatrix = [
    { monatsgehalt: '2.500 €', stunden35: '16,48 € / h', stunden385: '14,98 € / h', stunden40: '14,42 € / h', jahresgehalt: '30.000 €' },
    { monatsgehalt: '3.000 €', stunden35: '19,78 € / h', stunden385: '17,98 € / h', stunden40: '17,31 € / h', jahresgehalt: '36.000 €' },
    { monatsgehalt: '3.500 €', stunden35: '23,08 € / h', stunden385: '20,98 € / h', stunden40: '20,19 € / h', jahresgehalt: '42.000 €' },
    { monatsgehalt: '4.000 €', stunden35: '26,37 € / h', stunden385: '23,98 € / h', stunden40: '23,08 € / h', jahresgehalt: '48.000 €' },
    { monatsgehalt: '5.000 €', stunden35: '32,97 € / h', stunden385: '29,97 € / h', stunden40: '28,85 € / h', jahresgehalt: '60.000 €' },
    { monatsgehalt: '6.000 €', stunden35: '39,56 € / h', stunden385: '35,96 € / h', stunden40: '34,62 € / h', jahresgehalt: '72.000 €' },
  ];

  const faqs = [
    {
      q: 'Wie lautet die offizielle Formel des Bundesarbeitsgerichts zur Stundenlohnberechnung?',
      a: 'Nach ständiger Rechtsprechung des Bundesarbeitsgerichts (u. a. BAG 5 AZR 381/03) lautet die exakte Formel: (Monatsbruttogehalt × 3 Monate) ÷ 13 Wochen ÷ wöchentliche Arbeitsstunden. Da ein Quartal aus genau 13 Wochen besteht, ergibt dies die juristisch unanfechtbare Umrechnung ohne Rundungsfehler durch variierende Monatstage.',
    },
    {
      q: 'Wie hoch ist der gesetzliche Mindestlohn in Deutschland 2026?',
      a: 'Der gesetzliche Mindestlohn nach dem Mindestlohngesetz (MiLoG) beträgt in Deutschland im Jahr 2026 genau 12,82 Euro brutto je Zeitstunde. Kein Arbeitnehmer darf in Deutschland unter diesem Betrag vergütet werden (Ausnahmen gelten nur für Pflichtpraktika und Jugendliche unter 18 ohne Berufsabschluss).',
    },
    {
      q: 'Wie viele Arbeitsstunden hat ein Monat im Durchschnitt bei einer 40-Stunden-Woche?',
      a: 'Ein Jahr hat 52 Wochen. Bei 40 Wochenstunden ergeben sich 2.080 Arbeitsstunden pro Jahr. Teilt man diese durch 12 Monate, ergibt sich ein rechnerischer Monatsdurchschnitt von 173,33 Stunden (40 × 4,333). Bei einer 38,5-Stunden-Woche sind es 166,83 Stunden und bei einer 35-Stunden-Woche 151,67 Stunden.',
    },
    {
      q: 'Wie viele Stunden darf man bei einem 538-Euro-Minijob maximal arbeiten?',
      a: 'Bei einem gesetzlichen Mindestlohn von 12,82 Euro pro Stunde darf ein Minijobber mit dem monatlichen Verdienstmaximum von 538,00 Euro höchstens 41,96 Stunden im Monat arbeiten (538 € ÷ 12,82 € = 41,96 Stunden bzw. ca. 9 Stunden und 40 Minuten pro Woche). Bei Überschreitung dieser Stundenzahl entsteht Sozialversicherungspflicht.',
    },
    {
      q: 'Zählen Weihnachts- und Urlaubsgeld zur Stundenlohnberechnung?',
      a: 'Wird der Stundenlohn zur Prüfung des gesetzlichen Mindestlohns herangezogen, dürfen Einmalzahlungen wie Urlaubs- oder Weihnachtsgeld nur dann einbezogen werden, wenn sie unwiderruflich und anteilig in jedem Monat ausgezahlt werden. Einmalige Jahressonderzahlungen zählen nach BAG-Urteilen im Fälligkeitsmonat nicht als Ausgleich für Unterzahlungen anderer Monate.',
    },
  ];

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Formel des Bundesarbeitsgerichts &amp; Mindestlohngesetz 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Stundenlohnrechner 2026: Gehalt in Stundenlohn
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Rechnen Sie Ihr monatliches Bruttogehalt und Ihre vereinbarte Wochenarbeitszeit in Ihren exakten Stundenlohn um.
            Inklusive Überprüfung des gesetzlichen Mindestlohns (12,82 €) und Minijob-Grenzwerte.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie berechnet man den Stundenlohn nach Bundesarbeitsgericht?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Nach der offiziellen BAG-Formel wird das 3-fache Bruttomonatsgehalt durch 13 Wochen und die vertraglichen Wochenstunden geteilt: <code>(Gehalt &times; 3) / 13 / Wochenstunden</code>. Bei einem Gehalt von 3.000 € brutto und einer 40-Stunden-Woche ergibt sich ein exakter Stundenlohn von <strong>17,31 € brutto</strong>. Der gesetzliche Mindestlohn 2026 liegt bei 12,82 €.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyStundenlohnEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Referenztabelle: Stundenlöhne nach Arbeitszeitmodell 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Berechnung nach BAG-Formel (13 Wochen je Quartal)
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Monatsgehalt</th>
                  <th className="py-3 px-4">Jahresgehalt</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">35 Std. / Woche</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">38,5 Std. / Woche</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">40 Std. / Woche</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {hoursMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.monatsgehalt}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.jahresgehalt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.stunden35}</td>
                    <td className="py-3 px-4 font-mono text-slate-900">{row.stunden385}</td>
                    <td className="py-3 px-4 font-mono text-slate-900">{row.stunden40}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grounded Statutory Editorial Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Rechtliche Grundlagen zur Arbeitszeit &amp; Mindestlohn in Deutschland
            </h2>
            <p>
              Arbeitnehmer in Deutschland erhalten in Arbeitsverträgen meist ein monatliches Pauschalgehalt. Bei Überstundenabgeltung, Kurzarbeit, Elternzeit oder dem Vergleich von Jobangeboten ist der reale Stundenlohn jedoch die entscheidende Vergleichsgröße.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Gesetzlicher Mindestlohn nach MiLoG</span>
              </div>
              <p className="text-xs">
                Seit dem 1. Januar 2026 beträgt der bundesweite Mindestlohn <strong>12,82 Euro brutto</strong> je Zeitstunde. Arbeitgeber sind verpflichtet, die Arbeitszeiten von Minijobbern und in bestimmten Wirtschaftsbereichen (§ 2a Schwarzarbeitsbekämpfungsgesetz) manipulationssicher zu dokumentieren. Klauseln in Arbeitsverträgen, die diesen Mindestlohn unterschreiten, sind nach § 3 MiLoG unwirksam.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Übergangsbereich (Midijob § 20 SGB IV)</span>
              </div>
              <p className="text-xs">
                Bei einem Monatsverdienst zwischen <strong>538,01 Euro und 2.000,00 Euro</strong> greift der Übergangsbereich. In dieser Gleitzone zahlen Arbeitnehmer verminderte Sozialversicherungsbeiträge, behalten jedoch die vollen Rentenansprüche. Erst ab 2.000,01 Euro monatlich fallen die regulären Sozialversicherungsbeiträge von rund 21 % in voller Höhe an.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Stundenlohnberechnung</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cluster Cross-Links */}
        <div className="p-6 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider font-mono">
              Verwandte Rechner für Vergütung &amp; Arbeitsrecht
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto-Netto-Rechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kurzarbeitergeld-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Kurzarbeitergeld (KUG)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/abfindungsrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Abfindung (§ 34 EStG)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/firmenwagenrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Firmenwagen (1 %)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

