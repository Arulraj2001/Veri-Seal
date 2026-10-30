import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Car, Zap, Percent, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyFirmenwagenEngine } from '@/components/international/GermanyFirmenwagenEngine';

export const metadata: Metadata = {
  title: 'Firmenwagenrechner 2026 | 1%-Regelung & Elektro (0,25%) berechnen',
  description:
    'Berechnen Sie den geldwerten Vorteil Ihres Dienstwagens 2026 nach § 6 Abs. 1 Nr. 4 EStG: 1%-Regelung (Verbrenner), 0,5% (Hybrid) und 0,25% (Elektro bis 70.000 € BLP). Inklusive Arbeitsweg.',
  keywords: [
    'firmenwagenrechner 2026',
    '1 prozent regelung rechner dienstwagen',
    'elektro dienstwagen 0 25 prozent rechner',
    'geldwerter vorteil rechner firmenwagen',
    'fahrten wohnung erste taetigkeitsstaette 0 03 prozent',
    'blp 70000 euro elektroauto',
    'dienstwagen fahrtenbuch vergleich',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/firmenwagenrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/firmenwagenrechner`,
      'de': `${SITE_URL}/de/firmenwagenrechner`,
      'x-default': `${SITE_URL}/de/firmenwagenrechner`,
    },
  },
  openGraph: {
    title: 'Firmenwagenrechner 2026 | 1%-Regelung & Elektro (0,25%) berechnen',
    description:
      'Geldwerter Vorteil Dienstwagen nach § 6 Abs. 1 Nr. 4 EStG für Verbrenner, Hybrid und reine Elektrofahrzeuge präzise berechnen.',
    url: `${SITE_URL}/de/firmenwagenrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Firmenwagenrechner Deutschland 2026',
    description:
      'Geldwerter Vorteil und Netto-Belastung nach der 1%-, 0,5%- und 0,25%-Regelung.',
  },
};

export default function FirmenwagenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Firmenwagenrechner Deutschland 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Offizieller Rechner für den geldwerten Vorteil von Dienstwagen nach § 6 Abs. 1 Nr. 4 EStG für Verbrenner (1%), Hybrid (0,5%) und Elektro (0,25%).',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Geldwerter Vorteil Firmenwagenbesteuerung',
        description: 'Pauschale Dienstwagenversteuerung nach 1%-Methode und Fahrtenbuchvergleich.',
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
            name: 'Firmenwagenrechner 2026',
            item: `${SITE_URL}/de/firmenwagenrechner`,
          },
        ],
      },
    ],
  };

  const carMatrix = [
    { blp: '35.000 €', typ: 'Verbrenner (1,0 %)', privatVorteil: '350 €', weg20km: '210 €', vorteilGesamt: '560 € / Mo.', nettoKosten: 'ca. 240 €' },
    { blp: '50.000 €', typ: 'Verbrenner (1,0 %)', privatVorteil: '500 €', weg20km: '300 €', vorteilGesamt: '800 € / Mo.', nettoKosten: 'ca. 345 €' },
    { blp: '50.000 €', typ: 'Plug-in-Hybrid (0,5 %)', privatVorteil: '250 €', weg20km: '150 €', vorteilGesamt: '400 € / Mo.', nettoKosten: 'ca. 170 €' },
    { blp: '50.000 €', typ: 'Elektroauto (0,25 %)', privatVorteil: '125 €', weg20km: '75 €', vorteilGesamt: '200 € / Mo.', nettoKosten: 'ca. 85 €' },
    { blp: '70.000 €', typ: 'Elektroauto (0,25 %)', privatVorteil: '175 €', weg20km: '105 €', vorteilGesamt: '280 € / Mo.', nettoKosten: 'ca. 120 €' },
    { blp: '85.000 €', typ: 'Elektroauto (> 70k, 0,5 %)', privatVorteil: '425 €', weg20km: '255 €', vorteilGesamt: '680 € / Mo.', nettoKosten: 'ca. 290 €' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet sich der geldwerte Vorteil nach der 1%-Regelung?',
      a: 'Der geldwerte Vorteil setzt sich aus zwei Bausteinen zusammen: 1. Pauschale Privatnutzung: Monatlich 1,0 % des auf volle 100 Euro abgerundeten Bruttolistenpreises (BLP) zum Zeitpunkt der Erstzulassung. 2. Arbeitsweg: Monatlich 0,03 % des BLP pro einfachem Entfernungskilometer zwischen Wohnung und erster Tätigkeitsstätte (§ 8 Abs. 2 EStG).',
    },
    {
      q: 'Welche Fahrzeuge profitieren von der 0,25%-Regelung im Jahr 2026?',
      a: 'Reine batterieelektrische Fahrzeuge (BEV) ohne CO₂-Emissionen mit einem Bruttolistenpreis bis einschließlich 70.000 Euro werden mit lediglich 0,25 % des BLP für die Privatnutzung und 0,0075 % je Entfernungskilometer versteuert. Übersteigt der BLP 70.000 Euro, greift der Satz von 0,5 %.',
    },
    {
      q: 'Gilt der Rabatt beim Autokauf für den Bruttolistenpreis?',
      a: 'Nein. Maßgeblich ist immer die unverbindliche Preisempfehlung (UVP) des Herstellers zum Zeitpunkt der Erstzulassung inklusive Mehrwertsteuer und Sonderausstattung ab Werk. Händlerrabatte, Tageszulassungs-Nachlässe oder der tatsächliche Gebrauchtwagen-Kaufpreis spielen für die 1%-Regelung keine Rolle.',
    },
    {
      q: 'Wann lohnt sich die 0,002%-Einzelbewertung bei Homeoffice?',
      a: 'Fahren Sie an weniger als 15 Tagen im Kalendermonat ins Büro, lohnt sich die Einzelbewertung nach § 8 Abs. 2 Satz 5 EStG. Statt der Monatspauschale von 0,03 % werden nur 0,002 % des BLP je tatsächlich gefahrenem Arbeitstag und Entfernungskilometer angesetzt (maximal 180 Tage im Jahr nachweisbar).',
    },
    {
      q: 'Mindern eigene Zuzahlungen des Arbeitnehmers den geldwerten Vorteil?',
      a: 'Ja. Leistet der Arbeitnehmer eine einmalige Zuzahlung zu den Anschaffungskosten oder monatliche Eigenanteile (z. B. Tankpauschale, Nutzungsentgelt), mindert dieser Eigenaufwand nach BFH-Rechtsprechung den zu versteuernden geldwerten Vorteil Euro für Euro bis auf 0 Euro.',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumbs */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Firmenwagenrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§ 6 Abs. 1 Nr. 4 EStG &bull; 1%-Regelung &bull; Elektro-Förderung 0,25% (bis 70k BLP)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Firmenwagenrechner 2026: 1%-Regelung &amp; Geldwerter Vorteil
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Berechnen Sie exakt den steuerpflichtigen geldwerten Vorteil für Dienstwagen: Verbrenner (1%), Plug-in-Hybride (0,5%) und Elektroautos (0,25% bis 70.000 € BLP) sowie den realen Netto-Abzug auf Ihrer Gehaltsabrechnung.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie hoch ist der Netto-Abzug bei einem 50.000 € Dienstwagen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei einem Verbrenner mit 50.000 € Bruttolistenpreis und 20 km Arbeitsweg beträgt der geldwerte Vorteil <strong>800 € monatlich</strong> (500 € Privat + 300 € Arbeitsweg). Bei einem Grenzsteuersatz von rund 42 % kostet dieser Firmenwagen den Arbeitnehmer netto ca. <strong>340 € pro Monat</strong>. Als reines Elektroauto (0,25 %) sinkt der Netto-Abzug auf nur <strong>ca. 85 € monatlich</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyFirmenwagenEngine />

        {/* Worked Statutory Reference Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Vergleichstabelle: Geldwerter Vorteil nach Antriebsart 2026
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: 20 km einfache Entfernung zur Arbeitsstätte, Steuerklasse 1
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Listenpreis (BLP)</th>
                  <th className="py-3 px-4">Fahrzeugtyp &amp; Steuersatz</th>
                  <th className="py-3 px-4 text-slate-600">Privatanteil (1 %)</th>
                  <th className="py-3 px-4 text-slate-600">Arbeitsweg (0,03 %)</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Geldwerter Vorteil</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Reale Netto-Kosten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {carMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.blp}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.typ}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.privatVorteil}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.weg20km}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.vorteilGesamt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/30">{row.nettoKosten}</td>
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
              Gesetzliche Systematik der Firmenwagenbesteuerung nach EStG
            </h2>
            <p>
              Stellt der Arbeitgeber ein betriebliches Kraftfahrzeug auch zur privaten Nutzung oder für Fahrten zwischen Wohnung und erster Tätigkeitsstätte zur Verfügung, stellt dies steuerrechtlich einen <strong>Sachbezug (geldwerten Vorteil)</strong> nach § 8 Abs. 2 EStG dar. Dieser Betrag erhöht das steuer- und beitragspflichtige Bruttoentgelt des Arbeitnehmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Car className="w-4 h-4 text-amber-600" />
                <span>1. Die 1%-Pauschalmethode (§ 6 Abs. 1 Nr. 4 EStG)</span>
              </div>
              <p className="text-xs">
                Die 1%-Regelung erfordert keine Aufzeichnungen von Einzelfahrten. Es werden pauschal 1 % des Bruttolistenpreises monatlich angesetzt. Bei Fahrten zur Arbeitsstätte kommen 0,03 % des BLP pro Entfernungskilometer hinzu. Diese Beträge gelten unabhängig davon, ob das Fahrzeug neu, gebraucht oder geleast ist.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>2. Elektro-Dienstwagenförderung (0,25 % bis 70.000 €)</span>
              </div>
              <p className="text-xs">
                Durch das Wachstumschancengesetz wurde die Höchstgrenze des Bruttolistenpreises für die viertelierte Bemessungsgrundlage (0,25 %) bei reinen Elektroautos auf <strong>70.000 Euro</strong> angehoben. Für Fahrzeuge mit Erstzulassung nach dem Stichtag spart der Arbeitnehmer dadurch monatlich hunderte Euro an Lohnsteuer gegenüber einem gleich teuren Verbrenner.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zum Firmenwagenrechner</span>
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
              Verwandte Rechner für Pendler &amp; Arbeitnehmer
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
              href="/de/spritkostenrechner-fahrtkosten"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Spritkosten &amp; Pendler</span>
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
              href="/de/abfindungsrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Abfindung (§ 34 EStG)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

