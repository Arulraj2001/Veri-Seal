import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Landmark, Calculator, Percent, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyBaufinanzierungEngine } from '@/components/international/GermanyBaufinanzierungEngine';

export const metadata: Metadata = {
  title: 'Baufinanzierungsrechner 2026 | Monatsrate, Tilgungsplan & Restschuld',
  description:
    'Berechnen Sie Ihre monatliche Kreditrate, Zins- und Tilgungsanteil sowie die Restschuld nach 10, 15 oder 20 Jahren Zinsbindung für Ihr Annuitätendarlehen in Deutschland.',
  keywords: [
    'baufinanzierungsrechner 2026',
    'annuitaetendarlehen tilgungsplan rechner',
    'monatsrate immobilienkredit berechnen',
    'restschuld nach 10 jahren zinsbindung',
    'sonderkuendigungsrecht 489 bgb baufinanzierung',
    'anfaengliche tilgung 2 prozent 3 prozent',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
      'de': `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
      'x-default': `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
    },
  },
  openGraph: {
    title: 'Baufinanzierungsrechner 2026 | Monatsrate, Tilgungsplan & Restschuld',
    description:
      'Immobilienkredit- und Annuitätenrechner mit Zinsbindung, Restschuld und Gesamtzinsbelastung.',
    url: `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baufinanzierungsrechner Deutschland 2026',
    description:
      'Annuitätendarlehen, Monatsrate und Restschuld nach deutscher Zinsbindungsdauer berechnen.',
  },
};

export default function BaufinanzierungPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Baufinanzierungsrechner Deutschland',
        applicationCategory: 'FinancialApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Online-Rechner für Baufinanzierung und Annuitätendarlehen mit variabler Zinsbindung, anfänglicher Tilgung und Restschuldberechnung.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Annuitätendarlehen & Tilgungsplanberechnung',
        description: 'Berechnung von Monatsrate, Zinsaufwand und Restschuld nach deutscher Bankpraxis.',
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
            name: 'Baufinanzierungsrechner',
            item: `${SITE_URL}/de/baufinanzierung-tilgungsrechner`,
          },
        ],
      },
    ],
  };

  const mortgageMatrix = [
    { kredit: '200.000 €', zins: '3,5 %', tilgung: '2,0 %', rateMonat: '916,67 €', rest10J: '148.600 €', getilgt: '51.400 €' },
    { kredit: '300.000 €', zins: '3,5 %', tilgung: '2,0 %', rateMonat: '1.375,00 €', rest10J: '222.900 €', getilgt: '77.100 €' },
    { kredit: '300.000 €', zins: '3,5 %', tilgung: '3,0 %', rateMonat: '1.625,00 €', rest10J: '188.400 €', getilgt: '111.600 €' },
    { kredit: '400.000 €', zins: '3,5 %', tilgung: '2,0 %', rateMonat: '1.833,33 €', rest10J: '297.200 €', getilgt: '102.800 €' },
    { kredit: '500.000 €', zins: '3,5 %', tilgung: '2,0 %', rateMonat: '2.291,67 €', rest10J: '371.500 €', getilgt: '128.500 €' },
    { kredit: '500.000 €', zins: '3,5 %', tilgung: '3,0 %', rateMonat: '2.708,33 €', rest10J: '314.000 €', getilgt: '186.000 €' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet sich die Monatsrate bei einem Annuitätendarlehen?',
      a: 'Die jährliche Annuität ergibt sich aus dem Darlehensbetrag multipliziert mit der Summe aus gebundenem Sollzinssatz und anfänglicher Tilgung: Annuität = Darlehen × (Zinssatz + Tilgungssatz). Teilt man diesen Betrag durch 12 Monate, erhält man die feste monatliche Kreditrate. Da der Restkredit mit jeder Monatsrate sinkt, schrumpft der Zinsanteil stetig zugunsten eines wachsenden Tilgungsanteils.',
    },
    {
      q: 'Wie viel Prozent anfängliche Tilgung wird von Finanzexperten empfohlen?',
      a: 'In der aktuellen Zinsphase empfehlen Verbraucherzentralen und Banken eine anfängliche Tilgung von mindestens 2,0 % bis 3,0 %. Bei nur 1,0 % Tilgung beträgt die Gesamtlaufzeit bis zur vollständigen Entschuldung über 45 Jahre, was ein hohes Zinsänderungsrisiko bei der ersten Anschlussfinanzierung birgt.',
    },
    {
      q: 'Was regelt das gesetzliche Sonderkündigungsrecht nach § 489 BGB?',
      a: 'Nach § 489 Abs. 1 Nr. 2 BGB steht jedem Darlehensnehmer das unverzichtbare Recht zu, ein Festzinsdarlehen 10 Jahre nach dem Tag des vollständigen Darlehensempfangs ganz oder teilweise mit einer Kündigungsfrist von 6 Monaten vorzeitig zu kündigen – und zwar vollkommen ohne Zahlung einer Vorfälligkeitsentschädigung an die Bank.',
    },
    {
      q: 'Welche Vorteile bieten vertragliche Sondertilgungsrechte?',
      a: 'Ein vertragliches Sondertilgungsrecht (üblicherweise 5 % der ursprünglichen Darlehenssumme pro Kalenderjahr) erlaubt es dem Kreditnehmer, außerplanmäßige Zahlungen (z. B. aus Boni, Erbschaften oder Steuerrückerstattungen) direkt in die Kredittilgung einzubringen. Dadurch sinkt die Zinslast über die Laufzeit um tausende Euro.',
    },
    {
      q: 'Was ist der Unterschied zwischen Sollzins und Effektivzins?',
      a: 'Der Sollzins (früher Nominalzins) ist der reine Zinssatz für das geliehene Kapital. Der effektive Jahreszins nach der Preisangabenverordnung (PAngV) beinhaltet zusätzlich alle weiteren Preisbestandteile des Darlehens (wie Tilgungsverrechnungsintervalle oder Bearbeitungskosten) und dient als transparenter Vergleichsmaßstab zwischen verschiedenen Bankangeboten.',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Baufinanzierungsrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Annuitätendarlehen &bull; Zinsbindung &bull; Exakter Tilgungsplan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Baufinanzierungsrechner: Monatsrate &amp; Tilgungsplan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Das Annuitätendarlehen ist die Standardform der Immobilienfinanzierung in Deutschland. Die Monatsrate bleibt über die gesamte Zinsbindungsfrist hinweg konstant: Da mit jeder Rate ein Teil der Schuld getilgt wird, sinkt der Zinsanteil Monat für Monat, während der Tilgungsanteil kontinuierlich ansteigt.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie hoch ist die Monatsrate bei 300.000 € Darlehen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei einem Darlehen von 300.000 € mit 3,5 % Sollzins und 2,0 % anfänglicher Tilgung beträgt die feste Monatsrate <strong>1.375,00 €</strong>. Nach einer 10-jährigen Zinsbindung wurden ca. <strong>77.100 € getilgt</strong> und rund 87.900 € Zinsen bezahlt. Die verbleibende Restschuld beläuft sich auf rund <strong>222.900 €</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyBaufinanzierungEngine />

        {/* Worked Comparison Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Kreditmatrix: Monatsrate &amp; Restschuld nach 10 Jahren
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Vergleich bei 3,5 % Sollzins nach Tilgungsintensität
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kreditbetrag</th>
                  <th className="py-3 px-4">Sollzins</th>
                  <th className="py-3 px-4 text-slate-700">Tilgungssatz</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Monatliche Rate</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Getilgt (10 J.)</th>
                  <th className="py-3 px-4 text-slate-900 font-black">Restschuld (10 J.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {mortgageMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.kredit}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.zins}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.tilgung}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.rateMonat}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">{row.getilgt}</td>
                    <td className="py-3 px-4 font-mono font-black text-slate-900">{row.rest10J}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Gesetzliche &amp; bankfachliche Regeln der Immobilienfinanzierung
            </h2>
            <p>
              In Deutschland schließen Immobilienkäufer Darlehensverträge zumeist mit fester Zinsbindung (5, 10, 15 oder 20 Jahre) ab. Die Wohnimmobilienkreditrichtlinie verpflichtet Kreditinstitute zudem zur strengen Bonitätsprüfung auf Basis einer nachhaltigen Haushaltsrechnung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Landmark className="w-4 h-4 text-amber-600" />
                <span>Gesetzliches Sonderkündigungsrecht (§ 489 BGB)</span>
              </div>
              <p className="text-xs">
                Auch bei langen Zinsbindungen von 15 oder 20 Jahren haben Darlehensnehmer nach <strong>§ 489 Abs. 1 Nr. 2 BGB</strong> das gesetzliche Recht, das Darlehen nach Ablauf von 10 Jahren nach vollständigem Empfang mit 6 Monaten Kündigungsfrist vorzeitig und ohne Vorfälligkeitsentschädigung abzulösen oder umzuschulden.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Percent className="w-4 h-4 text-amber-600" />
                <span>Einfluss des Eigenkapitals</span>
              </div>
              <p className="text-xs">
                Je höher das eingebrachte Eigenkapital, desto günstiger der Beleihungsauslauf (z. B. 60 % statt 80 % oder 100 % des Beleihungswerts). Banken belohnen einen geringeren Beleihungsauslauf mit Zinsnachlässen von 0,2 % bis 0,5 % p.a., was über 10 Jahre tausende Euro an Zinskosten spart.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Baufinanzierung</span>
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
              Verwandte Rechner für Hauskauf &amp; Eigentum
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/notar-und-grundbuchkostenrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Notar- &amp; Grundbuchkosten</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/grunderwerbsteuer-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Grunderwerbsteuer</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/mieterhoehung-kappungsgrenze-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Mieterhöhung (§ 558 BGB)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/mietkautionsrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Mietkaution</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

