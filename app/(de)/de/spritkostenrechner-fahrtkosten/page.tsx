import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Fuel, Users, Car, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, Navigation } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanySpritkostenEngine } from '@/components/international/GermanySpritkostenEngine';

export const metadata: Metadata = {
  title: 'Spritkostenrechner 2026 | Fahrtkosten & Fahrgemeinschaft berechnen',
  description:
    'Berechnen Sie Benzin- und Dieselverbrauch, gesamte Spritkosten und die faire Kostenaufteilung pro Person für Fahrgemeinschaften und Urlaubsreisen. Inklusive Pendlerpauschale nach § 9 EStG.',
  keywords: [
    'spritkostenrechner 2026',
    'fahrtkosten rechner fahrgemeinschaft',
    'benzinverbrauch rechner liter pro 100km',
    'kilometerpreis berechnen sprit',
    'pendlerpauschale 2026 38 cent ab 21 km',
    'spritkosten teilen urlaubsfahrt',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
    languages: {
      'de-DE': `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
      'de': `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
      'x-default': `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
    },
  },
  openGraph: {
    title: 'Spritkostenrechner 2026 | Fahrtkosten & Fahrgemeinschaft berechnen',
    description:
      'Kostenloser Rechner für Kraftstoffkosten, Verbrauch auf 100 km und Kilometerpreise in Deutschland.',
    url: `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spritkostenrechner Deutschland 2026',
    description:
      'Kraftstoffverbrauch, Fahrtkosten und faire Kostenaufteilung für Fahrgemeinschaften.',
  },
};

export default function SpritkostenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Spritkostenrechner und Fahrtkosten-Kalkulator Deutschland',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für Spritkosten, Kraftstoffbedarf und faire Aufteilung der Reisekosten auf Mitfahrer.',
      },
      {
        '@type': 'TravelAction',
        name: 'Fahrtkosten- und Kraftstoffberechnung',
        description: 'Ermittlung von Kraftstoffbedarf und Pendlerpauschale nach § 9 EStG.',
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
            name: 'Spritkostenrechner',
            item: `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
          },
        ],
      },
    ],
  };

  const routeMatrix = [
    { strecke: 'Frankfurt – Stuttgart', km: '205 km', liter: '14,4 l', spritGesamt: '25,92 €', pro2: '12,96 €', pro4: '6,48 €' },
    { strecke: 'München – Nürnberg', km: '170 km', liter: '11,9 l', spritGesamt: '21,42 €', pro2: '10,71 €', pro4: '5,36 €' },
    { strecke: 'Berlin – Leipzig', km: '190 km', liter: '13,3 l', spritGesamt: '23,94 €', pro2: '11,97 €', pro4: '5,99 €' },
    { strecke: 'Hamburg – Köln', km: '425 km', liter: '29,8 l', spritGesamt: '53,64 €', pro2: '26,82 €', pro4: '13,41 €' },
    { strecke: 'Berlin – München', km: '585 km', liter: '41,0 l', spritGesamt: '73,80 €', pro2: '36,90 €', pro4: '18,45 €' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet man die Spritkosten für eine Fahrt?',
      a: 'Die mathematische Formel lautet: Benzinverbrauch in Litern = (Strecke in km × Verbrauch in l/100km) ÷ 100. Multiplizieren Sie diese Litermenge mit dem aktuellen Kraftstoffpreis je Liter. Bei 400 km Fahrtstrecke und einem Verbrauch von 6,5 l/100km bei 1,80 €/l: (400 × 6,5) ÷ 100 = 26 Liter × 1,80 € = 46,80 Euro.',
    },
    {
      q: 'Wie hoch ist die Pendlerpauschale für Fahrten zur Arbeit im Jahr 2026?',
      a: 'Nach § 9 Abs. 1 Satz 3 Nr. 4 EStG beträgt die Entfernungspauschale für jeden vollen Arbeitstag 0,30 Euro für die ersten 20 Kilometer der einfachen Wegstrecke zwischen Wohnung und erster Tätigkeitsstätte. Ab dem 21. Kilometer erhöht sich die Pauschale auf 0,38 Euro je Kilometer (unabhängig vom Verkehrsmittel).',
    },
    {
      q: 'Können Mitfahrer in einer Fahrgemeinschaft die Pendlerpauschale absetzen?',
      a: 'Ja. Auch Mitfahrer, die nicht selbst fahren, können in ihrer Einkommensteuererklärung die volle Pendlerpauschale für ihre einfache Arbeitsstrecke ansetzen. Für Mitfahrer gilt nach § 9 Abs. 2 EStG allerdings ein jährlicher Höchstbetrag von 4.500 Euro (beim Fahrer des eigenen Pkw gilt diese Begrenzung nicht).',
    },
    {
      q: 'Welche Kilometerpauschale zahlt der Arbeitgeber bei Dienstreisen?',
      a: 'Nach dem Bundesreisekostengesetz (BRKG § 5) kann der Arbeitgeber bei dienstlichen Fahrten mit dem privaten Pkw eine steuerfreie Wegstreckenentschädigung von 0,30 Euro pro gefahrenem Kilometer (Hin- und Rückfahrt!) steuerfrei an den Arbeitnehmer erstatten.',
    },
    {
      q: 'Welche Kosten sollten bei einer fairen Fahrgemeinschaft berücksichtigt werden?',
      a: 'Bei privaten Fahrgemeinschaften für Urlaubsfahrten werden in der Regel die reinen Spritkosten zuzüglich anfallender Autobahnmaut geteilt. Bei dauerhaften Pendlergemeinschaften kann es fair sein, einen anteiligen Abnutzungsbeitrag (z. B. 0,10 €/km für Reifen, Öl und Inspektion) hinzuzurechnen.',
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
          <span className="text-slate-900 font-bold">Spritkostenrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fahrtkosten-Kalkulation &bull; Fahrgemeinschaften &bull; Kilometerpreis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Spritkostenrechner: Benzinkosten &amp; Fahrgemeinschaft
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Berechnen Sie schnell und transparent den Kraftstoffbedarf für eine Autofahrt, die Gesamtkosten an der Tankstelle sowie den fairen Anteil pro Mitfahrer bei Fahrgemeinschaften oder gemeinsamen Urlaubsreisen.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Spritkosten fallen für 500 km an?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei 500 km Strecke, einem Verbrauch von 7,0 l/100km und 1,80 € Spritpreis betragen die Gesamtkosten genau <strong>63,00 € (35 Liter)</strong>. Bei einer Fahrgemeinschaft von 3 Personen zahlt jeder <strong>21,00 €</strong>. Für den Arbeitsweg greift die Pendlerpauschale von 0,30 € bzw. 0,38 € ab dem 21. km (§ 9 EStG).
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanySpritkostenEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Routen-Matrix: Spritkosten beliebter deutscher Strecken
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: 7,0 l / 100 km Verbrauch bei 1,80 € / Liter Kraftstoffpreis
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Reiseroute</th>
                  <th className="py-3 px-4">Strecke</th>
                  <th className="py-3 px-4 text-slate-600">Verbrauch</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Gesamtkosten</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Anteil (2 Pers.)</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Anteil (4 Pers.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {routeMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.strecke}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.km}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.liter}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.spritGesamt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.pro2}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/20">{row.pro4}</td>
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
              Steuerliche Regeln zur Pendlerpauschale &amp; Dienstreisen nach EStG
            </h2>
            <p>
              In Deutschland stellen Fahrtkosten zur Arbeitsstätte und dienstliche Fahrten bedeutende steuerliche Abzugspositionen dar. Das Einkommensteuergesetz regelt exakt, wie Arbeitnehmer und Selbstständige Mobilitätskosten geltend machen können.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>Entfernungspauschale (§ 9 Abs. 1 Nr. 4 EStG)</span>
              </div>
              <p className="text-xs">
                Die Pendlerpauschale gilt verkehrsmittelunabhängig für die einfache Wegstrecke zwischen Wohnung und erster Tätigkeitsstätte: <strong>0,30 Euro</strong> für die ersten 20 km und <strong>0,38 Euro</strong> ab dem 21. km. Bei 220 Arbeitstagen und 35 km Wegstrecke ergibt dies einen jährlichen Werbungskostenabzug von <strong>2.574 Euro</strong>!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Car className="w-4 h-4 text-amber-600" />
                <span>Dienstreisen &amp; Bundesreisekostengesetz</span>
              </div>
              <p className="text-xs">
                Wird das Privatfahrzeug für betriebliche Zwecke oder Auswärtstätigkeiten genutzt, kann der Arbeitgeber nach § 5 BRKG <strong>0,30 Euro je gefahrenem Kilometer</strong> steuerfrei erstatten. Zahlt der Arbeitgeber nichts, kann der Arbeitnehmer denselben Betrag als Werbungskosten in der Anlage N geltend machen.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zu Spritkosten &amp; Fahrtkosten</span>
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
              Verwandte Rechner für Auto &amp; Arbeit
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
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto Netto 2026</span>
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
              href="/de/rabatt-prozent-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rabattrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

