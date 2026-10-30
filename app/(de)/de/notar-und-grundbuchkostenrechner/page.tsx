import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Landmark, Home, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyNotarEngine } from '@/components/international/GermanyNotarEngine';

export const metadata: Metadata = {
  title: 'Notar- & Grundbuchkostenrechner 2026 | GNotKG Tabelle B Gebühren',
  description:
    'Berechnen Sie Notarkosten und Grundbuchgebühren 2026 beim Immobilienkauf nach GNotKG Tabelle B. Genaue Aufschlüsselung von Beurkundung, Grundschuld und Grundbuchamt.',
  keywords: [
    'notarkosten rechner 2026',
    'grundbuchkosten rechner gnotkg',
    'notargebuehren immobilienkauf tabelle b',
    'kaufvertrag grundschuldbestellung kosten',
    'wie viel kostet notar bei 300000 euro kaufpreis',
    'auflassungsvormerkung eigentumsumschreibung kosten',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
      'de': `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
      'x-default': `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
    },
  },
  openGraph: {
    title: 'Notar- & Grundbuchkostenrechner 2026 | GNotKG Tabelle B Gebühren',
    description:
      'Offizieller Rechner für Notargebühren, Grundschuldbestellung und Grundbucheintragung nach den Gebührensätzen des GNotKG.',
    url: `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notar- & Grundbuchkostenrechner Deutschland 2026',
    description:
      'Notar- und Gerichtskosten beim Immobilienkauf nach dem Gerichts- und Notarkostengesetz (GNotKG).',
  },
};

export default function NotarGrundbuchPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Notar- und Grundbuchkostenrechner Deutschland',
        applicationCategory: 'FinancialApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Präzisionsrechner für Notargebühren und Grundbuchamtskosten beim Haus- oder Wohnungskauf in Deutschland nach GNotKG Tabelle B.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Kaufnebenkostenanalyse Notar & Grundbuch',
        description: 'Berechnung von Notargebühren (KV 21100 ff.) und Grundbuchamtsgebühren nach GNotKG.',
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
            name: 'Notar- und Grundbuchkostenrechner',
            item: `${SITE_URL}/de/notar-und-grundbuchkostenrechner`,
          },
        ],
      },
    ],
  };

  const feesMatrix = [
    { kaufpreis: '150.000 €', grundschuld: '120.000 €', notarNetto: '1.850 €', grundbuch: '720 €', mwst: '352 €', gesamt: '2.922 €', quote: '1,95 %' },
    { kaufpreis: '250.000 €', grundschuld: '200.000 €', notarNetto: '2.580 €', grundbuch: '1.040 €', mwst: '490 €', gesamt: '4.110 €', quote: '1,64 %' },
    { kaufpreis: '350.000 €', grundschuld: '280.000 €', notarNetto: '3.240 €', grundbuch: '1.320 €', mwst: '616 €', gesamt: '5.176 €', quote: '1,48 %' },
    { kaufpreis: '500.000 €', grundschuld: '400.000 €', notarNetto: '4.180 €', grundbuch: '1.740 €', mwst: '794 €', gesamt: '6.714 €', quote: '1,34 %' },
    { kaufpreis: '750.000 €', grundschuld: '600.000 €', notarNetto: '5.620 €', grundbuch: '2.380 €', mwst: '1.068 €', gesamt: '9.068 €', quote: '1,21 %' },
  ];

  const faqs = [
    {
      q: 'Wie hoch sind die Notar- und Grundbuchkosten beim Immobilienkauf in Deutschland?',
      a: 'Als Faustregel gilt: Notar- und Grundbuchkosten betragen zusammen ca. 1,5 % bis 2,0 % des notariellen Kaufpreises. Davon entfallen etwa 1,0 % bis 1,2 % auf das Notariat (inklusive 19 % gesetzlicher Mehrwertsteuer) und etwa 0,5 % bis 0,8 % auf das staatliche Grundbuchamt (umsatzsteuerfrei).',
    },
    {
      q: 'Sind Notarkosten verhandelbar oder gibt es Rabatte?',
      a: 'Nein, Notarkosten sind gesetzlich strikt festgelegt. Nach § 17 Abs. 1 der Bundesnotarordnung (BNotO) ist es Notaren gesetzlich ausdrücklich untersagt, Gebühren zu erlassen oder Rabatte zu vereinbaren. Alle Notariate in ganz Deutschland rechnen zwingend nach derselben Gebührentabelle des Gerichts- und Notarkostengesetzes (GNotKG) ab.',
    },
    {
      q: 'Welche Gebühren fallen für die Grundschuldbestellung an?',
      a: 'Wird der Immobilienkauf über ein Bankdarlehen finanziert, verlangt die Bank als Kreditsicherheit eine Grundschuld. Für die Beurkundung der Grundschuldbestellung fällt beim Notar eine 1,0-Gebühr nach KV 21200 an (plus 19% MwSt.) und beim Grundbuchamt eine 1,0-Gebühr nach KV 14120 für die Eintragung in Abteilung III des Grundbuchs.',
    },
    {
      q: 'Wer zahlt den Notar beim Hauskauf?',
      a: 'Im Kaufvertrag wird üblicherweise vereinbart, dass der Käufer alle Kosten der Beurkundung, des Vollzugs und der Eigentumsumschreibung trägt. Der Verkäufer zahlt in der Praxis lediglich die Notar- und Grundbuchgebühren für die Lastenfreistellung (Löschung seiner alten Grundschulden oder eingetragenen Rechte im Grundbuch).',
    },
    {
      q: 'Wann sind die Notargebühren und Grundbuchkosten fällig?',
      a: 'Die Notarrechnung geht dem Käufer meist 2 bis 4 Wochen nach der Beurkundung des Kaufvertrags zu und ist sofort fällig. Die Kostenrechnungen des Grundbuchamts werden in Etappen fällig: zuerst für die Eintragung der Auflassungsvormerkung (nach ca. 2 bis 6 Wochen) und abschließend bei der endgültigen Eigentumsumschreibung.',
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
          <span className="text-slate-900 font-bold">Notar- &amp; Grundbuchkosten</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GNotKG &bull; Gesetzliche Gebührentabelle B &bull; Kaufvertrag &amp; Grundschuld</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Notar- &amp; Grundbuchkostenrechner 2026 nach GNotKG
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Beim Kauf einer Immobilie oder eines Baugrundstücks in Deutschland fallen Notar- und Grundbuchkosten in Höhe von durchschnittlich <strong>1,5% bis 2,0% des Kaufpreises</strong> an. Diese Gebühren sind gesetzlich strikt geregelt und für alle Notariate bundesweit einheitlich verbindlich.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Notar- und Grundbuchkosten fallen bei 350.000 € Kaufpreis an?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei einem Kaufpreis von 350.000 € (mit 280.000 € Grundschuld) betragen die Kaufnebenkosten für Notar und Grundbuchamt zusammen exakt rund <strong>5.176 € (ca. 1,48 % des Kaufpreises)</strong>. Davon entfallen ca. 3.856 € auf das Notariat (inkl. 19 % MwSt.) und rund 1.320 € auf das staatliche Grundbuchamt.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyNotarEngine />

        {/* Worked Statutory Fees Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Kostenmatrix: Notar- &amp; Grundbuchgebühren nach Kaufpreisstufen 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: GNotKG Tabelle B mit 80 % Grundschuldfinanzierung
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kaufpreis</th>
                  <th className="py-3 px-4">Grundschuld</th>
                  <th className="py-3 px-4 text-slate-600">Notar (netto)</th>
                  <th className="py-3 px-4 text-slate-600">Grundbuchamt</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Gesamtkosten</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Kaufpreisquote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {feesMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.kaufpreis}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.grundschuld}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.notarNetto}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.grundbuch}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.gesamt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 bg-amber-50/20">{row.quote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Statutory Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Gesetzliche Abrechnung nach dem Gerichts- und Notarkostengesetz (GNotKG)
            </h2>
            <p>
              In Deutschland erfordert die Übertragung von Grundeigentum nach § 311b BGB zwingend die notarielle Beurkundung. Die Kosten für diese notarielle Mitwirkung sowie die Eintragungen im Grundbuch sind im Gerichts- und Notarkostengesetz (GNotKG) festgeschrieben.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Landmark className="w-4 h-4 text-amber-600" />
                <span>Notargebühren im Detail</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li><strong>Kaufvertragsbeurkundung (KV 21100):</strong> 2,0-fache Gebühr aus dem Kaufpreis.</li>
                <li><strong>Vollzugsgebühr (KV 22110):</strong> 0,5-fache Gebühr für behördliche Genehmigungen &amp; Vorkaufsrechtsverzicht.</li>
                <li><strong>Betreuungsgebühr (KV 22200):</strong> 0,5-fache Gebühr für Fälligkeitsmitteilung an den Käufer.</li>
                <li><strong>Grundschuldbestellung (KV 21200):</strong> 1,0-fache Gebühr aus dem Grundschuldbetrag.</li>
                <li><strong>Umsatzsteuer:</strong> Auf alle Notarleistungen fallen 19 % Mehrwertsteuer an.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Home className="w-4 h-4 text-amber-600" />
                <span>Gebühren des Grundbuchamts</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li><strong>Auflassungsvormerkung (KV 14130):</strong> 0,5-fache Gebühr (sichert den Käufer vor Doppelverkauf).</li>
                <li><strong>Eigentumsumschreibung (KV 14110):</strong> 1,0-fache Gebühr bei finalem Eigentümerwechsel in Abteilung I.</li>
                <li><strong>Grundschuldeintragung (KV 14120):</strong> 1,0-fache Gebühr für Belastung in Abteilung III.</li>
                <li><strong>Steuerfreiheit:</strong> Gerichtskosten sind als öffentlich-rechtliche Gebühren umsatzsteuerfrei (keine MwSt.).</li>
              </ul>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zu Notar- und Grundbuchkosten</span>
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
              Verwandte Rechner für Immobilien &amp; Baufinanzierung
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/grunderwerbsteuer-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Grunderwerbsteuer</span>
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
              <span>Mietkautionsrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

