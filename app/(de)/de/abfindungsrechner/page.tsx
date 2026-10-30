import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyAbfindungEngine } from '@/components/international/GermanyAbfindungEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Scale, FileText, CheckCircle2, TrendingUp, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Abfindungsrechner 2026 | Fünftelregelung § 34 EStG Netto berechnen',
  description:
    'Berechnen Sie Ihre Netto-Abfindung 2026 mit der Fünftelregelung nach § 34 EStG in Deutschland. Regelabfindung nach § 1a KSchG, Steuerersparnis und Sozialabgabenfreiheit.',
  keywords: [
    'abfindungsrechner 2026',
    'fünftelregelung abfindung rechner',
    'abfindung netto berechnen deutschland',
    'steuern auf abfindung sparen',
    'abfindung kuendigungsschutzgesetz rechner 1a kschg',
    'abfindung sozialabgabenfrei',
    'zusammenballung von einkuenften',
    'abfindung rentenversicherung ausgleichszahlung',
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
    title: 'Abfindungsrechner 2026 | Fünftelregelung § 34 EStG Netto berechnen',
    description:
      'Berechnen Sie online, wie viel Netto von Ihrer Abfindung übrig bleibt. Steuerermäßigung durch die Fünftelregelung nach § 34 EStG und Regelabfindung § 1a KSchG.',
    url: `${SITE_URL}/de/abfindungsrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abfindungsrechner Deutschland 2026: Netto & Fünftelregelung',
    description:
      'Genaue Steuerberechnung für Entlassungsabfindungen nach § 34 EStG. Richtwertprüfung nach KSchG.',
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
        '@type': 'FinancialProduct',
        name: 'Fünftelregelung Steuerberechnung für Abfindungen',
        description: 'Berechnung der Einkommensteuer auf außerordentliche Einkünfte nach § 34 EStG.',
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
            name: 'Abfindungsrechner 2026',
            item: `${SITE_URL}/de/abfindungsrechner`,
          },
        ],
      },
    ],
  };

  const abfindungMatrix = [
    { abfindung: '20.000 €', jahresgehalt: '45.000 €', steuerOhne: '8.400 €', steuerMitFuenftel: '6.750 €', ersparnis: '1.650 €', nettoAbfindung: '13.250 €' },
    { abfindung: '35.000 €', jahresgehalt: '50.000 €', steuerOhne: '14.850 €', steuerMitFuenftel: '12.100 €', ersparnis: '2.750 €', nettoAbfindung: '22.900 €' },
    { abfindung: '50.000 €', jahresgehalt: '55.000 €', steuerOhne: '21.600 €', steuerMitFuenftel: '17.800 €', ersparnis: '3.800 €', nettoAbfindung: '32.200 €' },
    { abfindung: '75.000 €', jahresgehalt: '60.000 €', steuerOhne: '32.900 €', steuerMitFuenftel: '27.400 €', ersparnis: '5.500 €', nettoAbfindung: '47.600 €' },
    { abfindung: '100.000 €', jahresgehalt: '70.000 €', steuerOhne: '44.200 €', steuerMitFuenftel: '37.850 €', ersparnis: '6.350 €', nettoAbfindung: '62.150 €' },
  ];

  const faqs = [
    {
      q: 'Wie funktioniert die Fünftelregelung nach § 34 EStG bei einer Abfindung?',
      a: 'Die Fünftelregelung mildert die Progression des deutschen Einkommensteuertarifs bei einer Zusammenballung von Einkünften. Das Finanzamt ermittelt zunächst die Einkommensteuer auf Ihr reguläres Jahresgehalt. Anschließend wird die Steuer auf das Jahresgehalt plus ein Fünftel (1/5) der Abfindungssumme berechnet. Die Differenz zwischen beiden Beträgen wird mit fünf multipliziert. Dadurch wird vermieden, dass der Spitzensteuersatz voll auf die Gesamtsumme durchschlägt.',
    },
    {
      q: 'Fallen auf eine Entlassungsabfindung Sozialabgaben an?',
      a: 'Nein. Eine echte Abfindung, die als Entschädigung für den Verlust des Arbeitsplatzes und künftiger Verdienstmöglichkeiten gezahlt wird, ist in der gesetzlichen Sozialversicherung vollkommen beitragsfrei (§ 14 Abs. 1 SGB IV). Es fallen weder Beiträge zur Renten-, Kranken-, Pflege- noch zur Arbeitslosenversicherung an.',
    },
    {
      q: 'Wann liegt eine steuerlich begünstigte "Zusammenballung von Einkünften" vor?',
      a: 'Voraussetzung für die Fünftelregelung ist nach Rechtsprechung des Bundesfinanzhofs (BFH), dass die Gesamteinkünfte des Arbeitnehmers im Kalenderjahr des Abfindungszuflusses höher sind als die Einkünfte, die er bei ungestörter Fortsetzung des Arbeitsverhältnisses bezogen hätte. Zahlt der Arbeitgeber die Abfindung in Raten über zwei Kalenderjahre, geht die Fünftelregelung in der Regel verloren.',
    },
    {
      q: 'Wie hoch ist die gesetzliche Regelabfindung nach § 1a KSchG?',
      a: 'Wird einem Arbeitnehmer aus dringenden betrieblichen Erfordernissen gekündigt und erhebt dieser bis zum Ablauf der dreiwöchigen Frist keine Kündigungsschutzklage, hat er bei entsprechendem Angebot im Kündigungsschreiben Anspruch auf eine Abfindung von 0,5 Bruttomonatsgehältern pro Beschäftigungsjahr (ein Zeitraum von mehr als sechs Monaten wird auf ein volles Jahr aufgerundet).',
    },
    {
      q: 'Wie kann man die Steuer auf die Abfindung legal weiter senken?',
      a: 'Zwei bewährte Hebel zur Reduzierung der Abfindungssteuer sind: 1. Eine steuerbegünstigte Ausgleichszahlung an die Deutsche Rentenversicherung zur Vermeidung von Rentenabschlägen (§ 187a SGB VI, § 3 Nr. 28 EStG). 2. Vereinbarung des Zuflusses der Abfindung im Januar des Folgejahres ("Dispositionsjahr"), falls im neuen Jahr vorübergehend kein oder ein geringeres Einkommen erzielt wird.',
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
          <span className="text-slate-900 font-bold">Abfindungsrechner</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Einkommensteuergesetz § 34 &amp; Kündigungsschutzgesetz § 1a</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Abfindungsrechner 2026: Netto &amp; Fünftelregelung
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Ermitteln Sie präzise, wie viel von Ihrer Abfindungssumme nach Abzug der Lohnsteuer auf Ihrem Girokonto ankommt
            und wie hoch Ihre Steuerersparnis durch die gesetzliche Fünftelregelung nach § 34 EStG ausfällt.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie wird eine Abfindung in Deutschland besteuert?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Eine echte Abfindung ist <strong>vollständig sozialversicherungsfrei</strong> (0 € Beiträge zur KV, RV, AV und PV). Sie unterliegt jedoch der regulären Einkommensteuer. Die <strong>Fünftelregelung (§ 34 EStG)</strong> mildert die Steuerprogression künstlich, indem die Steuer so berechnet wird, als flösse nur ein Fünftel der Abfindung im aktuellen Steuerjahr zu.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyAbfindungEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Musterberechnungen: Steuerersparnis durch die Fünftelregelung 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: Steuerklasse 1, keine Kirchensteuer, bundesweite Tarife
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Brutto-Abfindung</th>
                  <th className="py-3 px-4">Jahresgehalt</th>
                  <th className="py-3 px-4 text-slate-500">Steuer regulär</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Steuer mit § 34</th>
                  <th className="py-3 px-4 text-emerald-700 font-bold">Ersparnis</th>
                  <th className="py-3 px-4 text-slate-900 font-black">Netto-Auszahlung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {abfindungMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.abfindung}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.jahresgehalt}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 line-through">{row.steuerOhne}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.steuerMitFuenftel}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/40">{row.ersparnis}</td>
                    <td className="py-3 px-4 font-mono font-black text-slate-900">{row.nettoAbfindung}</td>
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
              Arbeitsrechtliche &amp; steuerliche Spielregeln bei Abfindungen
            </h2>
            <p>
              Entgegen einer weit verbreiteten Annahme existiert im deutschen Arbeitsrecht kein allgemeiner Rechtsanspruch auf eine Abfindung bei Beendigung eines Arbeitsverhältnisses. Eine Abfindung wird fast immer im Rahmen eines <strong>Aufhebungsvertrags</strong>, eines <strong>gerichtlichen Vergleichs</strong> vor dem Arbeitsgericht oder nach <strong>§ 1a KSchG</strong> bei einer betriebsbedingten Kündigung ausgehandelt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Faustformel nach § 1a KSchG</span>
              </div>
              <p className="text-xs">
                Die im Arbeitsrecht etablierte Faustformel für Abfindungen lautet:
                <br />
                <strong className="text-slate-900">0,5 Bruttomonatsgehalt &times; Anzahl der Beschäftigungsjahre</strong>.
                <br />
                Bei starken Kündigungsschutzchancen (z. B. Schwerbehinderung, Betriebsrat, lange Betriebszugehörigkeit) werden vor den Arbeitsgerichten in Vergleichen häufig Faktoren zwischen <strong>0,8 und 1,5 Gehältern</strong> pro Dienstjahr erzielt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Gestaltungsmöglichkeit: Ausgleich an Rentenversicherung</span>
              </div>
              <p className="text-xs">
                Nach <strong>§ 187a SGB VI</strong> i. V. m. <strong>§ 3 Nr. 28 EStG</strong> kann der Arbeitgeber Teile der Abfindung direkt als Beitragszahlung an die Deutsche Rentenversicherung überweisen, um spätere Rentenabschläge auszugleichen. Bis zu 50 % dieser Zahlung sind komplett steuer- und sozialversicherungsfrei!
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufige Fragen zur Abfindungsbesteuerung</span>
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
              Verwandte Finanz- &amp; Gehaltswerkzeuge
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher für Deutschland 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto Netto 2026</span>
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
              href="/de/stundenlohnrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Stundenlohn &amp; Mindestlohn</span>
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

