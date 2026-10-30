import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, MapPin, Calculator, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyGrunderwerbsteuerEngine } from '@/components/international/GermanyGrunderwerbsteuerEngine';

export const metadata: Metadata = {
  title: 'Grunderwerbsteuer-Rechner 2026 | Alle 16 Bundesländer Tabelle',
  description:
    'Berechnen Sie die Grunderwerbsteuer 2026 für alle 16 Bundesländer (von 3,5% in Bayern & Sachsen bis 6,5% in NRW & Hessen). Mit Tipps zum Herausrechnen von Küche und Zubehör.',
  keywords: [
    'grunderwerbsteuer rechner 2026',
    'grunderwerbsteuer bundeslaender tabelle',
    'grunderwerbsteuer nrw 6 5 prozent',
    'grunderwerbsteuer bayern 3 5 prozent',
    'kaufnebenkosten grunderwerbsteuer berechnen',
    'unbedenklichkeitsbescheinigung finanzamt grunderwerbsteuer',
    'einbaukueche grunderwerbsteuer abziehen',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/grunderwerbsteuer-rechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/grunderwerbsteuer-rechner`,
      'de': `${SITE_URL}/de/grunderwerbsteuer-rechner`,
      'x-default': `${SITE_URL}/de/grunderwerbsteuer-rechner`,
    },
  },
  openGraph: {
    title: 'Grunderwerbsteuer-Rechner 2026 | Alle 16 Bundesländer Tabelle',
    description:
      'Offizieller Rechner für die Grunderwerbsteuer nach GrEStG für Haus- und Wohnungskäufer in ganz Deutschland.',
    url: `${SITE_URL}/de/grunderwerbsteuer-rechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grunderwerbsteuer-Rechner Deutschland 2026',
    description:
      'Grunderwerbsteuersätze aller 16 Bundesländer im direkten Vergleich.',
  },
};

export default function GrunderwerbsteuerPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Grunderwerbsteuer-Rechner Deutschland 2026',
        applicationCategory: 'FinancialApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für die Grunderwerbsteuer nach Bundesländern gemäß Grunderwerbsteuergesetz (GrEStG).',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Grunderwerbsteuer & Kaufnebenkostenanalyse',
        description: 'Autonome Steuersätze der 16 deutschen Bundesländer nach GrEStG.',
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
            name: 'Grunderwerbsteuer-Rechner',
            item: `${SITE_URL}/de/grunderwerbsteuer-rechner`,
          },
        ],
      },
    ],
  };

  const statesTable = [
    { land: 'Bayern', satz: '3,5 %', steuer300k: '10.500 €', steuer500k: '17.500 €' },
    { land: 'Sachsen', satz: '3,5 %', steuer300k: '10.500 €', steuer500k: '17.500 €' },
    { land: 'Baden-Württemberg', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Bremen', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Niedersachsen', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Rheinland-Pfalz', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Sachsen-Anhalt', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Thüringen', satz: '5,0 %', steuer300k: '15.000 €', steuer500k: '25.000 €' },
    { land: 'Hamburg', satz: '5,5 %', steuer300k: '16.500 €', steuer500k: '27.500 €' },
    { land: 'Berlin', satz: '6,0 %', steuer300k: '18.000 €', steuer500k: '30.000 €' },
    { land: 'Mecklenburg-Vorpommern', satz: '6,0 %', steuer300k: '18.000 €', steuer500k: '30.000 €' },
    { land: 'Brandenburg', satz: '6,5 %', steuer300k: '19.500 €', steuer500k: '32.500 €' },
    { land: 'Hessen', satz: '6,5 %', steuer300k: '19.500 €', steuer500k: '32.500 €' },
    { land: 'Nordrhein-Westfalen (NRW)', satz: '6,5 %', steuer300k: '19.500 €', steuer500k: '32.500 €' },
    { land: 'Saarland', satz: '6,5 %', steuer300k: '19.500 €', steuer500k: '32.500 €' },
    { land: 'Schleswig-Holstein', satz: '6,5 %', steuer300k: '19.500 €', steuer500k: '32.500 €' },
  ];

  const faqs = [
    {
      q: 'Wie hoch ist die Grunderwerbsteuer in den Bundesländern?',
      a: 'Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5 % (in Bayern und Sachsen) und 6,5 % (in NRW, Hessen, Brandenburg, Saarland und Schleswig-Holstein). In Baden-Württemberg, Bremen, Niedersachsen, Rheinland-Pfalz, Sachsen-Anhalt und Thüringen beträgt sie 5,0 %, in Hamburg 5,5 % und in Berlin sowie Mecklenburg-Vorpommern 6,0 %.',
    },
    {
      q: 'Wann muss die Grunderwerbsteuer bezahlt werden?',
      a: 'Nach der notariellen Beurkundung des Kaufvertrags leitet der Notar eine Veräußerungsanzeige an das Finanzamt weiter. Das Finanzamt erlässt den Steuerbescheid. Die Steuer ist gesetzlich genau einen Monat nach Bekanntgabe des Bescheids zur Zahlung fällig (§ 14 GrEStG).',
    },
    {
      q: 'Was ist die Unbedenklichkeitsbescheinigung des Finanzamts?',
      a: 'Die Unbedenklichkeitsbescheinigung (§ 22 GrEStG) bestätigt dem Notar und dem Grundbuchamt, dass die Grunderwerbsteuer vollständig beglichen wurde oder keine Steuer anfällt. Ohne dieses Dokument darf das Grundbuchamt den Käufer nicht als neuen Eigentümer in Abteilung I des Grundbuchs eintragen.',
    },
    {
      q: 'Kann man Grunderwerbsteuer durch den Kauf von Küche oder Möbeln sparen?',
      a: 'Ja. Bewegliche Gegenstände wie Einbauküchen, Markisen, Kaminöfen, Saunen oder Gartenhütten unterliegen nicht der Grunderwerbsteuer. Werden diese im Notarvertrag mit realistischen Zeitwerten gesondert ausgewiesen, zieht das Finanzamt diesen Betrag vom steuerpflichtigen Kaufpreis ab. Bei überhöhten Beträgen (über ca. 15 % des Gesamtpreises) fordert das Finanzamt Kaufbelege an.',
    },
    {
      q: 'Wann fällt keine Grunderwerbsteuer an (Steuerbefreiungen)?',
      a: 'Nach § 3 GrEStG ist der Erwerb einer Immobilie komplett steuerfrei bei: 1. Erwerb durch den Ehegatten oder Lebenspartner (auch nach Scheidung im Rahmen der Vermögensaufteilung), 2. Erwerb durch Verwandte in gerader Linie (Eltern an Kinder, Großeltern an Enkel), 3. Erbschaften und Schenkungen (dort greift ggf. das Erbschaftsteuerrecht), 4. Grundstückskäufen unter 2.500 Euro Freigrenze.',
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
          <span className="text-slate-900 font-bold">Grunderwerbsteuer-Rechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GrEStG &bull; Aktuelle Steuersätze 2026 aller 16 Bundesländer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Grunderwerbsteuer-Rechner 2026 für alle Bundesländer
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Die Grunderwerbsteuer stellt den größten Einzelposten der Kaufnebenkosten beim Immobilienkauf dar. Da die Bundesländer den Steuersatz autonom festlegen, reicht die Spanne von <strong>3,5% in Bayern und Sachsen</strong> bis zu <strong>6,5% in NRW, Hessen und Brandenburg</strong>.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Grunderwerbsteuer fällt bei 400.000 € Kaufpreis an?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei einem Kaufpreis von 400.000 € beträgt die Grunderwerbsteuer in Bayern oder Sachsen (3,5 %) genau <strong>14.000 €</strong>, in Baden-Württemberg oder Niedersachsen (5,0 %) genau <strong>20.000 €</strong> und in Nordrhein-Westfalen oder Hessen (6,5 %) genau <strong>26.000 €</strong>. Die Steuer wird 1 Monat nach Erhalt des Bescheids fällig.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyGrunderwerbsteuerEngine />

        {/* Worked Statutory Comparison Table of all 16 States */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Gesetzliche Grunderwerbsteuersätze der 16 Bundesländer 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Quellen: Finanzministerien der Bundesländer &bull; Stand 2026
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bundesland</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Steuersatz</th>
                  <th className="py-3 px-4 text-slate-700">Steuer bei 300.000 € Kauf</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Steuer bei 500.000 € Kauf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {statesTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.land}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.satz}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.steuer300k}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.steuer500k}</td>
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
              Rechtliche Besonderheiten der Grunderwerbsteuer nach GrEStG
            </h2>
            <p>
              Die Grunderwerbsteuer entsteht mit Zustandekommen des rechtswirksamen notariellen Kaufvertrags (§ 38 AO). Als Rechtsverkehrsteuer besteuert sie nicht das Halten, sondern den Erwerb von Grundstücken und Gebäuden in Deutschland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Unbedenklichkeitsbescheinigung (§ 22 GrEStG)</span>
              </div>
              <p className="text-xs">
                Die Unbedenklichkeitsbescheinigung ist ein zwingendes amtliches Dokument. Das Grundbuchamt darf den Käufer erst dann als Eigentümer eintragen, wenn das Finanzamt bescheinigt hat, dass keine steuerlichen Bedenken mehr bestehen (die Grunderwerbsteuer also bezahlt ist).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Steuerfreie Erwerbsvorgänge (§ 3 GrEStG)</span>
              </div>
              <p className="text-xs">
                Übertragungen zwischen Ehegatten, eingetragenen Lebenspartnern sowie in gerader Verwandtschaftslinie (Eltern an Kinder) sind gesetzlich von der Grunderwerbsteuer befreit. Dasselbe gilt für Grundstückserwerbe von Todes wegen (Erbschaft).
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Grunderwerbsteuer</span>
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
              Verwandte Rechner für Hauskauf &amp; Bauherren
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
              href="/de/baufinanzierung-tilgungsrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Baufinanzierung</span>
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

