import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Building2, Percent, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyGewerbesteuerEngine } from '@/components/international/GermanyGewerbesteuerEngine';

export const metadata: Metadata = {
  title: 'Gewerbesteuerrechner 2026 | Hebesatz & Freibetrag (§ 11 GewStG)',
  description:
    'Berechnen Sie Ihre Gewerbesteuer 2026 nach Steuermesszahl 3,5%, Hebesatz der Gemeinde, Freibetrag (24.500 € für Einzelunternehmer) und ESt-Anrechnung nach § 35 EStG.',
  keywords: [
    'gewerbesteuerrechner 2026',
    'gewerbesteuer hebesatz stadt vergleich',
    'steuermessbetrag 3 5 prozent berechnen',
    'gewerbesteuer freibetrag 24500 euro',
    'anrechnung gewerbesteuer einkommensteuer 35 estg',
    'gewerbesteuer gmbh vs einzelunternehmen',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/gewerbesteuerrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/gewerbesteuerrechner`,
      'de': `${SITE_URL}/de/gewerbesteuerrechner`,
      'x-default': `${SITE_URL}/de/gewerbesteuerrechner`,
    },
  },
  openGraph: {
    title: 'Gewerbesteuerrechner 2026 | Hebesatz & Freibetrag (§ 11 GewStG)',
    description:
      'Gewerbesteuer für Einzelunternehmen, GbR und GmbH nach dem offiziellen Gewerbesteuergesetz (GewStG) berechnen.',
    url: `${SITE_URL}/de/gewerbesteuerrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gewerbesteuerrechner Deutschland 2026',
    description:
      'Kommunale Gewerbesteuer nach Steuermessbetrag und Hebesatz berechnen.',
  },
};

export default function GewerbesteuerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Gewerbesteuerrechner Deutschland',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Offizieller Gewerbesteuerrechner nach dem Gewerbesteuergesetz (GewStG) mit Steuermessbetrag und kommunalem Hebesatz.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Gewerbesteuer- und Hebesatzanalyse',
        description: 'Berechnung nach §§ 11, 14 GewStG und ESt-Anrechnung nach § 35 EStG.',
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
            name: 'Gewerbesteuerrechner',
            item: `${SITE_URL}/de/gewerbesteuerrechner`,
          },
        ],
      },
    ],
  };

  const municipalMatrix = [
    { stadt: 'Grünwald (Bayern)', hebesatz: '240 %', gewerbe50k: '2.142 €', gewerbe100k: '6.342 €', effSatz: '8,40 %' },
    { stadt: 'Monheim am Rhein (NRW)', hebesatz: '250 %', gewerbe50k: '2.231 €', gewerbe100k: '6.606 €', effSatz: '8,75 %' },
    { stadt: 'Berlin', hebesatz: '410 %', gewerbe50k: '3.659 €', gewerbe100k: '10.835 €', effSatz: '14,35 %' },
    { stadt: 'Frankfurt am Main', hebesatz: '460 %', gewerbe50k: '4.106 €', gewerbe100k: '12.156 €', effSatz: '16,10 %' },
    { stadt: 'Hamburg', hebesatz: '470 %', gewerbe50k: '4.195 €', gewerbe100k: '12.420 €', effSatz: '16,45 %' },
    { stadt: 'München', hebesatz: '490 %', gewerbe50k: '4.373 €', gewerbe100k: '12.949 €', effSatz: '17,15 %' },
    { stadt: 'Köln', hebesatz: '515 %', gewerbe50k: '4.596 €', gewerbe100k: '13.609 €', effSatz: '18,03 %' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet sich die Gewerbesteuer in Deutschland?',
      a: 'Die Berechnung erfolgt in drei Schritten: 1. Gewerbegewinn abzüglich des Freibetrags von 24.500 € (für Einzelunternehmer und GbR). 2. Multiplikation mit der bundeseinheitlichen Steuermesszahl von 3,5 % ergibt den Steuermessbetrag (§ 11 GewStG). 3. Multiplikation des Steuermessbetrags mit dem Hebesatz der jeweiligen Gemeinde (z. B. 400 % = Faktor 4,0).',
    },
    {
      q: 'Wer hat Anspruch auf den Gewerbesteuer-Freibetrag von 24.500 Euro?',
      a: 'Der Freibetrag von 24.500 Euro nach § 11 Abs. 1 Nr. 1 GewStG steht ausschließlich natürlichen Personen (Einzelgewerbetreibenden) und Personengesellschaften (GbR, OHG, KG) zu. Kapitalgesellschaften (GmbH, UG haftungsbeschränkt, AG) steht gesetzlich kein Freibetrag zu – sie zahlen Gewerbesteuer ab dem ersten Euro Gewinn.',
    },
    {
      q: 'Wie funktioniert die Anrechnung der Gewerbesteuer nach § 35 EStG?',
      a: 'Einzelunternehmer und Gesellschafter von Personengesellschaften können das 4,0-Fache des Gewerbesteuermessbetrags direkt von ihrer tariflichen Einkommensteuer abziehen. Bei einem Hebesatz von bis zu 400 % (effektiv 14 % Gewerbesteuersatz) wird die Gewerbesteuer dadurch steuerlich vollständig neutralisiert.',
    },
    {
      q: 'Zahlen Freiberufler auch Gewerbesteuer?',
      a: 'Nein. Freiberufler im Sinne des § 18 EStG (z. B. Ärzte, Rechtsanwälte, Notare, Steuerberater, Architekten, Journalisten, Dolmetscher) unterliegen nicht der Gewerbeordnung und sind vollständig von der Gewerbesteuer befreit, egal wie hoch ihr Jahresgewinn ausfällt.',
    },
    {
      q: 'Was ist der gesetzliche Mindesthebesatz für Gemeinden?',
      a: 'Um Steueroasen innerhalb Deutschlands einzudämmen, hat der Bundesgesetzgeber in § 14 Abs. 4 GewStG einen gesetzlichen Mindesthebesatz von 200 % festgeschrieben. Keine Gemeinde in Deutschland darf einen niedrigeren Hebesatz beschließen.',
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
          <span className="text-slate-900 font-bold">Gewerbesteuerrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§§ 11, 14 GewStG &bull; Steuermesszahl 3,5% &bull; Anrechnung nach § 35 EStG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Gewerbesteuerrechner 2026: Hebesatz &amp; Steuermessbetrag
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Gewerbetreibende in Deutschland unterliegen der Gewerbesteuer, deren Höhe maßgeblich vom Hebesatz der jeweiligen Standortgemeinde abhängt. Berechnen Sie Ihre genaue Zahllast unter Berücksichtigung des Freibetrags von 24.500 € für Personenunternehmen und der steuermindernden Anrechnung auf Ihre Einkommensteuer.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Gewerbesteuer fällt bei 60.000 € Gewinn an?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Für Einzelunternehmer (nach 24.500 € Freibetrag) verbleiben 35.500 € Gewerbeertrag. Mit der Steuermesszahl von 3,5 % ergibt sich ein Steuermessbetrag von 1.242,50 €. Bei einem kommunalen Hebesatz von 400 % beträgt die Gewerbesteuer exakt <strong>4.970,00 €</strong>. Dieser Betrag kann nach § 35 EStG nahezu vollständig auf die Einkommensteuer angerechnet werden.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyGewerbesteuerEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Hebesatz-Vergleich: Gewerbesteuerlast deutscher Städte 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: Einzelunternehmen nach 24.500 € Freibetrag
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Stadt / Gemeinde</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Hebesatz</th>
                  <th className="py-3 px-4 text-slate-700">Steuer bei 50.000 € Gewinn</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Steuer bei 100.000 € Gewinn</th>
                  <th className="py-3 px-4 text-slate-500">Effektiver Steuersatz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {municipalMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.stadt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.hebesatz}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.gewerbe50k}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.gewerbe100k}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{row.effSatz}</td>
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
              Gesetzliche Systematik der Gewerbesteuer im GewStG
            </h2>
            <p>
              Die Gewerbesteuer ist die wichtigste originäre Einnahmequelle der deutschen Kommunen zur Finanzierung lokaler Infrastruktur. Der Steuersatz setzt sich aus zwei Faktoren zusammen: der bundesweit einheitlichen <strong>Steuermesszahl von 3,5 %</strong> und dem <strong>kommunalen Hebesatz</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Hinzurechnungen nach § 8 GewStG</span>
              </div>
              <p className="text-xs">
                Der Gewerbeertrag entspricht nicht immer dem einkommensteuerlichen Gewinn. Das Finanzamt rechnet bestimmte Finanzierungsaufwendungen anteilig wieder hinzu: Zinsen zu 25 %, Mieten und Pachten für unbewegliche Wirtschaftsgüter zu 12,5 % und Leasing für bewegliche Güter zu 5 % (soweit der Freibetrag von 200.000 € überschritten ist).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Percent className="w-4 h-4 text-amber-600" />
                <span>Steuerentlastung nach § 35 EStG</span>
              </div>
              <p className="text-xs">
                Um eine Überlastung von Personenunternehmen zu vermeiden, wird die gezahlte Gewerbesteuer pauschaliert auf die persönliche Einkommensteuer angerechnet. Bis zu einem Hebesatz von rund 400 % führt dies dazu, dass die Gewerbesteuer für Einzelunternehmer im Ergebnis keine zusätzliche Steuerlast darstellt.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Gewerbesteuer</span>
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
              Verwandte Rechner für Unternehmer &amp; Finanzen
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/skontorechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Skontorechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rechnungsvorlage PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto Netto 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/iban-pruefer-bic-finder"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>IBAN-Prüfer &amp; BLZ</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

