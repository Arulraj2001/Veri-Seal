import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Briefcase, Users, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyKugEngine } from '@/components/international/GermanyKugEngine';

export const metadata: Metadata = {
  title: 'Kurzarbeitergeld-Rechner 2026 | KUG § 105 SGB III Netto berechnen',
  description:
    'Berechnen Sie Ihr Kurzarbeitergeld 2026 nach § 105 SGB III: 60% (kinderlos) oder 67% (mit Kind) des Nettoentgeltausfalls. Inklusive Kurzarbeit Null und Progressionsvorbehalt.',
  keywords: [
    'kurzarbeitergeld rechner 2026',
    'kug rechner netto bundesagentur fuer arbeit',
    'kurzarbeit null wie viel geld bekomme ich',
    'kug leistungssatz 60 67 prozent',
    'progressionsvorbehalt kurzarbeit steuererklaerung',
    'kurzarbeit nettoentgeltdifferenz formel',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/kurzarbeitergeld-rechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/kurzarbeitergeld-rechner`,
      'de': `${SITE_URL}/de/kurzarbeitergeld-rechner`,
      'x-default': `${SITE_URL}/de/kurzarbeitergeld-rechner`,
    },
  },
  openGraph: {
    title: 'Kurzarbeitergeld-Rechner 2026 | KUG § 105 SGB III Netto berechnen',
    description:
      'Offizieller KUG-Rechner nach § 105 und § 106 SGB III: Nettoentgeltausfall, KUG-Auszahlung und Gesamteinkommen berechnen.',
    url: `${SITE_URL}/de/kurzarbeitergeld-rechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurzarbeitergeld-Rechner Deutschland 2026',
    description:
      'Nettoentgeltausfall und KUG-Leistungssatz (60% / 67%) nach den Richtlinien der Bundesagentur für Arbeit.',
  },
};

export default function KurzarbeitergeldPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kurzarbeitergeld-Rechner Deutschland 2026',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für Kurzarbeitergeld (KUG) nach den gesetzlichen Bestimmungen des Dritten Buches Sozialgesetzbuch (SGB III) und der Bundesagentur für Arbeit.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Kurzarbeitergeld Berechnung & Entgeltausfallanalyse',
        description: 'Ermittlung von Soll-Entgelt, Ist-Entgelt und pauschaliertem Nettoentgeltausfall nach § 106 SGB III.',
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
            name: 'Kurzarbeitergeld-Rechner 2026',
            item: `${SITE_URL}/de/kurzarbeitergeld-rechner`,
          },
        ],
      },
    ],
  };

  const kugMatrix = [
    { gehaltVorher: '2.500 €', ausfall: '50 %', restNetto: '890 €', kugOhneKind: '535 €', kugMitKind: '597 €', gesamtMitKind: '1.487 €' },
    { gehaltVorher: '3.000 €', ausfall: '50 %', restNetto: '1.040 €', kugOhneKind: '625 €', kugMitKind: '698 €', gesamtMitKind: '1.738 €' },
    { gehaltVorher: '3.500 €', ausfall: '50 %', restNetto: '1.185 €', kugOhneKind: '715 €', kugMitKind: '798 €', gesamtMitKind: '1.983 €' },
    { gehaltVorher: '3.000 €', ausfall: '100 % (Kurzarbeit Null)', restNetto: '0 €', kugOhneKind: '1.248 €', kugMitKind: '1.393 €', gesamtMitKind: '1.393 €' },
    { gehaltVorher: '4.000 €', ausfall: '100 % (Kurzarbeit Null)', restNetto: '0 €', kugOhneKind: '1.558 €', kugMitKind: '1.740 €', gesamtMitKind: '1.740 €' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet sich das Kurzarbeitergeld nach § 105 SGB III?',
      a: 'Die Bundesagentur für Arbeit berechnet das KUG auf Basis der Nettoentgeltdifferenz: Es wird die Differenz zwischen dem pauschalierten Nettoentgelt aus dem Soll-Entgelt (regulärer Lohn ohne Ausfall) und dem Ist-Entgelt (tatsächlich erarbeiteter Restlohn) gebildet. Von diesem Ausfallbetrag erhalten kinderlose Arbeitnehmer 60 % und Arbeitnehmer mit mindestens 0,5 Kinderfreibetrag 67 % ausgezahlt.',
    },
    {
      q: 'Wie viel Geld bekommt man bei "Kurzarbeit Null"?',
      a: 'Bei Kurzarbeit Null (100 % Arbeitsausfall) entfällt das reguläre Gehalt vollständig. Sie erhalten dann 60 % (kinderlos) bzw. 67 % (mit Kind) Ihres pauschalierten bisherigen Nettoeinkommens als Kurzarbeitergeld von der Agentur für Arbeit überwiesen.',
    },
    {
      q: 'Muss man für das erhaltene Kurzarbeitergeld Steuern zahlen?',
      a: 'Das Kurzarbeitergeld selbst ist steuerfrei und sozialabgabenfrei. Es unterliegt jedoch dem Progressionsvorbehalt (§ 32b Abs. 1 EStG): Bei der jährlichen Steuerveranlagung erhöht das bezogene KUG den Steuersatz für das übrige steuerpflichtige Einkommen. Wer mehr als 410 Euro KUG im Kalenderjahr erhält, ist gesetzlich zur Abgabe einer Steuererklärung verpflichtet.',
    },
    {
      q: 'Wie lange kann Kurzarbeitergeld bezogen werden?',
      a: 'Die gesetzliche Regeldauer für den Bezug von konjunkturellem Kurzarbeitergeld beträgt nach § 104 SGB III maximal 12 Monate. In schweren Wirtschaftskrisen kann das Bundesministerium für Arbeit und Soziales diese Bezugsdauer per Rechtsverordnung auf bis zu 24 Monate verlängern.',
    },
    {
      q: 'Darf man während der Kurzarbeit einen Nebenjob annehmen?',
      a: 'Wurde der Nebenjob bereits vor Beginn der Kurzarbeit ausgeübt, wird das Nebeneinkommen nicht auf das KUG angerechnet. Nehmen Sie jedoch erst während der laufenden Kurzarbeit eine neue Nebenbeschäftigung auf, wird dieser Verdienst in voller Höhe auf den KUG-Anspruch angerechnet (es sei denn, es handelt sich um einen anrechnungsfreien Minijob im Rahmen gesetzlicher Sonderregelungen).',
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
          <span className="text-slate-900 font-bold">Kurzarbeitergeld-Rechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§ 105 SGB III &bull; Bundesagentur für Arbeit &bull; KUG 60% / 67%</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Kurzarbeitergeld-Rechner 2026: KUG &amp; Nettoausfall berechnen
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Wird im Betrieb Kurzarbeit angeordnet, gleicht das Kurzarbeitergeld (KUG) der Bundesagentur für Arbeit den Verdienstausfall ab. Ermitteln Sie Ihren Nettoentgeltausfall und Ihr Gesamteinkommen bei teilweiser Kurzarbeit oder Kurzarbeit Null.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Geld erhält man bei Kurzarbeit?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Das Kurzarbeitergeld beträgt <strong>60 %</strong> (ohne Kinder) bzw. <strong>67 %</strong> (mit Kind auf der Lohnsteuerkarte) der Nettoentgeltdifferenz zwischen Soll- und Ist-Entgelt (§ 105 SGB III). Bei 50 % Kurzarbeit und 3.000 € Brutto erhalten kinderlose Arbeitnehmer rund <strong>1.665 € Gesamteinkommen</strong> (Restlohn + KUG).
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyKugEngine />

        {/* Worked Comparison Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Musterberechnungen: Nettoeinkommen bei Kurzarbeit 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: Steuerklasse 1 vs. Steuerklasse 3 mit Kind
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Brutto vor Kurzarbeit</th>
                  <th className="py-3 px-4">Arbeitsausfall</th>
                  <th className="py-3 px-4 text-slate-600">Restliches Netto</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">KUG (60 % ohne Kind)</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">KUG (67 % mit Kind)</th>
                  <th className="py-3 px-4 text-slate-900 font-black">Gesamtnetto mit Kind</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {kugMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.gehaltVorher}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.ausfall}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.restNetto}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.kugOhneKind}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">{row.kugMitKind}</td>
                    <td className="py-3 px-4 font-mono font-black text-slate-900 bg-amber-50/20">{row.gesamtMitKind}</td>
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
              Gesetzliche Rahmenbedingungen für Kurzarbeitergeld im SGB III
            </h2>
            <p>
              Kurzarbeit soll Entlassungen bei vorübergehendem, unvermeidbarem Arbeitsausfall verhindern. Arbeitgeber melden Kurzarbeit bei der örtlichen Agentur für Arbeit an, sobald mindestens 10 % der Beschäftigten von einem Entgeltausfall von über 10 % betroffen sind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Leistungssatz: 60 % vs. 67 %</span>
              </div>
              <p className="text-xs">
                Arbeitnehmer ohne Kinder erhalten den regulären Leistungssatz von <strong>60 %</strong> der Nettoentgeltdifferenz. Für Beschäftigte mit mindestens einem eingetragenen Kinderfreibetrag (mindestens 0,5 Zähler auf der elektronischen Lohnsteuerkarte) erhöht sich der Anspruch auf <strong>67 %</strong> (§ 105 SGB III).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Steuerpflicht &amp; Progressionsvorbehalt</span>
              </div>
              <p className="text-xs">
                Kurzarbeitergeld ist steuer- und sozialabgabenfrei. Es unterliegt jedoch dem <strong>Progressionsvorbehalt</strong> nach § 32b EStG. Bei einem KUG-Bezug von mehr als 410 Euro im Kalenderjahr besteht eine gesetzliche Abgabepflicht zur Einkommensteuererklärung.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zum Kurzarbeitergeld</span>
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
              Verwandte Rechner für Arbeit &amp; Steuern
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
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

