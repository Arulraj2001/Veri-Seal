import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanySalaryEngine } from '@/components/international/GermanySalaryEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, ArrowRight, HelpCircle, FileText, Calculator, Sparkles, Building2, Landmark, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Brutto-Netto-Rechner 2026 | Offizieller Gehaltsrechner Deutschland',
  description:
    'Berechnen Sie Ihr Nettogehalt 2026 für Steuerklasse 1 bis 6 in Deutschland. Mit aktuellem Grundfreibetrag (11.784 €), PV-Staffelung, KV-Zusatzbeitrag und Rentenversicherung.',
  keywords: [
    'brutto netto rechner 2026',
    'gehaltsrechner deutschland 2026',
    'wie viel netto von 50000 brutto',
    'steuerklasse 1 gehalt rechner',
    'abzuege lohnsteuer sozialabgaben 2026',
    'nettogehalt berechnen',
    'krankenversicherung beitragsbemessungsgrenze 2026',
    'pflegeversicherung kinderlosenzuschlag',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/brutto-netto-rechner`,
    languages: HREFLANG_REGISTRY.salary_calculator.locales,
  },
  openGraph: {
    title: 'Brutto-Netto-Rechner 2026 | Offizieller Gehaltsrechner Deutschland',
    description:
      'Präzise Nettolohnberechnung nach § 32a EStG für Arbeitnehmer in Deutschland. Mit Beitragsbemessungsgrenzen und Sozialabgaben 2026.',
    url: `${SITE_URL}/de/brutto-netto-rechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brutto-Netto-Rechner Deutschland 2026',
    description:
      'Wie viel bleibt vom Bruttogehalt netto übrig? Steuerklassen 1 bis 6, Krankenkassenzusatzbeitrag und PV-Beitragssatz.',
  },
};

export default function GermanySalaryPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
          'Kostenloser Brutto-Netto-Rechner zur präzisen Berechnung des monatlichen und jährlichen Nettogehalts nach deutschem Einkommensteuergesetz 2026.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Deutsche Gehaltsabrechnung & Nettolohnberechnung',
        description: 'Berechnung von Lohnsteuer, Solidaritätszuschlag, Kranken-, Pflege-, Renten- und Arbeitslosenversicherung nach § 32a EStG.',
        feesAndCommissionsSpecification: 'Kostenlose Online-Nutzung ohne Datenspeicherung',
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
            name: 'Brutto-Netto-Rechner 2026',
            item: `${SITE_URL}/de/brutto-netto-rechner`,
          },
        ],
      },
    ],
  };

  const salaryMatrix = [
    { bruttoMonat: '2.500 €', bruttoJahr: '30.000 €', nettoStKl1: '1.782 €', nettoStKl3: '1.996 €', abzugProzent: '28,7 %' },
    { bruttoMonat: '3.000 €', bruttoJahr: '36.000 €', nettoStKl1: '2.078 €', nettoStKl3: '2.348 €', abzugProzent: '30,7 %' },
    { bruttoMonat: '3.750 €', bruttoJahr: '45.000 €', nettoStKl1: '2.485 €', nettoStKl3: '2.842 €', abzugProzent: '33,7 %' },
    { bruttoMonat: '4.167 €', bruttoJahr: '50.000 €', nettoStKl1: '2.685 €', nettoStKl3: '3.088 €', abzugProzent: '35,5 %' },
    { bruttoMonat: '5.000 €', bruttoJahr: '60.000 €', nettoStKl1: '3.112 €', nettoStKl3: '3.595 €', abzugProzent: '37,8 %' },
    { bruttoMonat: '6.250 €', bruttoJahr: '75.000 €', nettoStKl1: '3.742 €', nettoStKl3: '4.320 €', abzugProzent: '40,1 %' },
    { bruttoMonat: '8.333 €', bruttoJahr: '100.000 €', nettoStKl1: '4.780 €', nettoStKl3: '5.460 €', abzugProzent: '42,6 %' },
  ];

  const faqs = [
    {
      q: 'Wie viel Netto bleibt von 50.000 Euro Bruttogehalt im Jahr 2026 übrig?',
      a: 'Bei einem Bruttojahresgehalt von 50.000 € (ca. 4.167 € monatlich) in Steuerklasse 1 (kinderlos, gesetzlich versichert mit 1,7 % Zusatzbeitrag, ohne Kirchensteuer) verbleiben in Deutschland monatlich ca. 2.685 € netto (rund 32.220 € netto im Jahr). Die monatlichen Abzüge betragen rund 605 € Lohnsteuer und rund 877 € Sozialabgaben (Renten-, Kranken-, Pflege- und Arbeitslosenversicherung).',
    },
    {
      q: 'Wie hoch ist der steuerliche Grundfreibetrag im Jahr 2026?',
      a: 'Der steuerliche Grundfreibetrag nach § 32a Abs. 1 EStG beträgt für das Steuerjahr 2026 genau 11.784 Euro für Alleinstehende (und 23.568 Euro bei Zusammenveranlagung von Ehepaaren). Erst für jeden Euro, der dieses zu versteuernde Einkommen übersteigt, fällt Einkommensteuer an.',
    },
    {
      q: 'Welche Steuerklasse ist für mich die richtige?',
      a: 'Steuerklasse 1 gilt für Ledige und Geschiedene. Steuerklasse 2 für Alleinerziehende mit Entlastungsbetrag (§ 24b EStG). Steuerklasse 3 und 5 bzw. die Kombination 4/4 mit Faktor sind für verheiratete Paare vorgesehen (Steuerklasse 3 empfiehlt sich für den Besserverdienenden). Steuerklasse 6 gilt zwingend für jeden Zweit- oder Nebenjob über der Minijob-Grenze (ohne Freibeträge).',
    },
    {
      q: 'Wie berechnen sich die Beitragsbemessungsgrenzen 2026?',
      a: 'Die Beitragsbemessungsgrenze der gesetzlichen Kranken- und Pflegeversicherung liegt bei 5.175 Euro monatlich (62.100 Euro jährlich). In der Renten- und Arbeitslosenversicherung liegt die Obergrenze bei 7.550 Euro monatlich in Westdeutschland (90.600 Euro im Jahr). Einkommensteile oberhalb dieser Grenzen sind beitragsfrei.',
    },
    {
      q: 'Fällt für mein Gehalt noch der Solidaritätszuschlag an?',
      a: 'Für die allermeisten Arbeitnehmer fällt der Soli nicht mehr an. Im Steuerjahr 2026 liegt die Freigrenze für den Solidaritätszuschlag bei 18.130 Euro tariflicher Einkommensteuer für Alleinstehende (bzw. 36.260 Euro für Verheiratete). Das entspricht in Steuerklasse 1 einem Bruttojahresgehalt von rund 68.400 Euro, bis zu dem kein Soli einbehalten wird.',
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
          <span className="text-slate-900 font-bold">Brutto-Netto-Rechner</span>
        </nav>

        {/* Page Title & Statutory Scope */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aktueller Einkommensteuertarif § 32a EStG 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Brutto-Netto-Rechner 2026 (Deutschland)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Ermitteln Sie mit wenigen Klicks, wie viel von Ihrem Bruttolohn nach Abzug von Lohnsteuer, Solidaritätszuschlag und gesetzlichen Sozialversicherungsbeiträgen auf Ihrem Girokonto ankommt.
          </p>
        </div>

        {/* Interactive Calculation Engine */}
        <GermanySalaryEngine />

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Netto bleibt von 50.000 € Brutto?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei einem Jahresbruttogehalt von 50.000 € in Steuerklasse 1 (kinderlos, gesetzlich versichert, ohne Kirchensteuer) bleiben Ihnen in Deutschland 2026 monatlich exakt rund <strong>2.685 € netto</strong> (ca. 32.220 € jährlich). Die Sozialabgaben belaufen sich auf ca. 21,0 % (877 €/Monat) und die Lohnsteuer auf rund 14,5 % (605 €/Monat).
          </p>
        </div>

        {/* Worked Statutory Reference Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Referenztabelle: Brutto zu Netto nach Gehaltsstufen 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: Steuerklasse 1 vs. 3, keine Kirchensteuer, bundesweiter KV-Schnitt
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Brutto / Monat</th>
                  <th className="py-3 px-4">Brutto / Jahr</th>
                  <th className="py-3 px-4 text-amber-700 font-bold">Netto (StKl 1)</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Netto (StKl 3)</th>
                  <th className="py-3 px-4 text-slate-500">Gesamtabzüge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {salaryMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.bruttoMonat}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.bruttoJahr}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-700">{row.nettoStKl1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.nettoStKl3}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{row.abzugProzent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comprehensive Statutory Editorial Depth (BGB / EStG / SGB) */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Gesetzliche Systematik der Lohnabzüge in Deutschland 2026
            </h2>
            <p>
              In Deutschland setzt sich der Unterschied zwischen Brutto- und Nettogehalt aus zwei verfassungsrechtlich getrennten Säulen zusammen: den <strong>staatlichen Steuern</strong> (Lohnsteuer, Solidaritätszuschlag, Kirchensteuer) und den <strong>paritätischen Beiträgen zur Sozialversicherung</strong> (Kranken-, Pflege-, Renten- und Arbeitslosenversicherung).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>1. Sozialabgaben (ca. 20,5 % – 22,0 % AN-Anteil)</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li><strong>Rentenversicherung (RV):</strong> 18,6 % Gesamtbeitrag (9,3 % Arbeitnehmeranteil bis zur Beitragsbemessungsgrenze von 7.550 €/Monat).</li>
                <li><strong>Krankenversicherung (KV):</strong> 14,6 % allgemeiner Beitragssatz (7,3 % AN) zuzüglich des kassenindividuellen Zusatzbeitrags (im Schnitt 1,7 %, davon 0,85 % AN).</li>
                <li><strong>Pflegeversicherung (PV):</strong> 4,0 % für Kinderlose ab dem 23. Lebensjahr (2,3 % AN-Anteil). Für Eltern mit mehreren Kindern unter 25 Jahren greifen Beitragsnachlässe bis zu 0,25 % je Kind.</li>
                <li><strong>Arbeitslosenversicherung (AV):</strong> 2,6 % Gesamtbeitrag (1,3 % Arbeitnehmeranteil).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Landmark className="w-4 h-4 text-amber-600" />
                <span>2. Steuerliche Abzüge &amp; Freibeträge (§ 32a EStG)</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li><strong>Grundfreibetrag 2026:</strong> 11.784 € für Alleinstehende. Einkommen bis zu dieser Schwelle sind vollständig steuerfrei gestellt.</li>
                <li><strong>Arbeitnehmer-Pauschbetrag (§ 9a EStG):</strong> 1.230 € jährlich werden als Werbungskosten ohne Nachweis automatisch steuermindernd berücksichtigt.</li>
                <li><strong>Sonderausgaben-Pauschbetrag:</strong> 36 € (72 € bei Verheirateten) für allgemeine private Vorsorgeaufwendungen.</li>
                <li><strong>Solidaritätszuschlag:</strong> 5,5 % der Lohnsteuer, greift dank hoher Freigrenzen erst ab ca. 68.400 € Bruttoeinkommen in Steuerklasse 1.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Steuerklassenwechsel: Steuerklasse 3/5 vs. Steuerklasse 4/4 mit Faktor
            </h3>
            <p>
              Verheiratete Paare können durch die Wahl der Steuerklasse ihre monatliche Liquidität optimieren. Verdient ein Partner deutlich mehr (z. B. 60 % zu 40 % oder mehr), bringt die Kombination <strong>3 (Besserverdiener) / 5 (Geringerverdiener)</strong> unterjährig das höchste Nettoeinkommen. Beachten Sie jedoch: Die Steuerklasse beeinflusst die Höhe von Entgeltersatzleistungen wie <em>Elterngeld, Arbeitslosengeld I oder Krankengeld</em>. Ein geplanter Wechsel sollte daher mindestens 7 Monate vor Leistungsbezug beim Finanzamt eingereicht werden.
            </p>
          </div>
        </article>

        {/* High-Intent FAQ Accordion (Schema aligned) */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zum Gehaltsrechner</span>
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
              Passende Rechner für Arbeitnehmer &amp; Arbeitgeber
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/firmenwagenrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Firmenwagen (1 %)</span>
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
              href="/de/stundenlohnrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Stundenlohn &amp; Mindestlohn</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kurzarbeitergeld-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Kurzarbeitergeld (KUG)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

