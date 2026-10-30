import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Percent, TrendingUp, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, Calculator } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanySkontoEngine } from '@/components/international/GermanySkontoEngine';

export const metadata: Metadata = {
  title: 'Skontorechner 2026 | Effektiver Jahreszins & Lieferantenkredit-Formel',
  description:
    'Berechnen Sie Ihren Skontoabzug, den tatsächlichen Zahlbetrag und den effektiven Jahreszins nach der Lieferantenkredit-Formel. Vergleichen Sie Skonto mit dem Kontokorrentkredit Ihrer Bank.',
  keywords: [
    'skontorechner 2026',
    'effektiver jahreszins skonto formel',
    'lieferantenkredit berechnen skonto',
    'skonto vs bankkredit vergleich',
    'skontoabzug rechner netto brutto',
    'vorsteuerkorrektur skonto paragraph 17 ustg',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/skontorechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/skontorechner`,
      'de': `${SITE_URL}/de/skontorechner`,
      'x-default': `${SITE_URL}/de/skontorechner`,
    },
  },
  openGraph: {
    title: 'Skontorechner 2026 | Effektiver Jahreszins & Lieferantenkredit-Formel',
    description:
      'Kostenloser Rechner für Skontofristen, Zahlungsziele und den Vergleich zwischen Skonto und Kontokorrentkredit.',
    url: `${SITE_URL}/de/skontorechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skontorechner Deutschland 2026',
    description:
      'Effektiven Jahreszins des Lieferantenkredits berechnen und Zinskosten sparen.',
  },
};

export default function SkontoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skontorechner und Jahreszins-Kalkulator Deutschland',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für Skontoabzug und effektiven Jahreszins bei vorzeitiger Rechnungsbegleichung nach kaufmännischen Standards.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Lieferantenkredit- und Skonto-Effektivzinsberechnung',
        description: 'Finanzmathematische Zinsanalyse von B2B-Zahlungszielen.',
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
            name: 'Skontorechner',
            item: `${SITE_URL}/de/skontorechner`,
          },
        ],
      },
    ],
  };

  const skontoMatrix = [
    { rechnung: '1.000 €', skonto2: '20,00 €', zahl2: '980,00 €', zins20T: '36,73 % p.a.', vorteilDispo11: '+13,89 €' },
    { rechnung: '5.000 €', skonto2: '100,00 €', zahl2: '4.900,00 €', zins20T: '36,73 % p.a.', vorteilDispo11: '+69,44 €' },
    { rechnung: '10.000 €', skonto2: '200,00 €', zahl2: '9.800,00 €', zins20T: '36,73 % p.a.', vorteilDispo11: '+138,89 €' },
    { rechnung: '25.000 €', skonto2: '500,00 €', zahl2: '24.500,00 €', zins20T: '36,73 % p.a.', vorteilDispo11: '+347,22 €' },
    { rechnung: '50.000 €', skonto2: '1.000,00 €', zahl2: '49.000,00 €', zins20T: '36,73 % p.a.', vorteilDispo11: '+694,44 €' },
    { rechnung: '10.000 € (3 %)', skonto2: '300,00 €', zahl2: '9.700,00 €', zins20T: '55,67 % p.a.', vorteilDispo11: '+240,78 €' },
  ];

  const faqs = [
    {
      q: 'Wie lautet die Formel zur Berechnung des effektiven Jahreszinses bei Skonto?',
      a: 'Die offizielle Formel für den effektiven Jahreszins lautet: Effektivzins = [Skontosatz / (100 - Skontosatz)] × [360 / (Zahlungsziel Tage - Skontofrist Tage)] × 100. Bei 2 % Skonto, 10 Tagen Skontofrist und 30 Tagen Zahlungsziel ergibt sich: (2 / 98) × (360 / 20) × 100 = 0,020408 × 18 × 100 = 36,73 % p.a.',
    },
    {
      q: 'Lohnt es sich, für die Skontonutzung den Bank-Kontokorrentkredit (Dispo) zu nutzen?',
      a: 'Ja, fast ausnahmslos! Ein Dispokredit bei der Bank kostet im Schnitt 9 % bis 14 % Zinsen p.a. Der Verzicht auf 2 % Skonto für 20 Tage entspricht jedoch einem Zinssatz von 36,73 % p.a. Zahlen Sie die Rechnung mit Bankkredit, zahlen Sie der Bank für 20 Tage nur ca. 0,61 % Zinsen, sparen durch das Skonto aber 2,0 % ein – Sie machen also immer noch einen klaren Reingewinn!',
    },
    {
      q: 'Muss die Vorsteuer korrigiert werden, wenn Skonto gezogen wird?',
      a: 'Ja. Nach § 17 Abs. 1 UStG ändert sich bei Inanspruchnahme von Skonto die Bemessungsgrundlage der Lieferung oder Leistung. Sowohl der Leistende (Minderung der Umsatzsteuer) als auch der Leistungsempfänger (Minderung des Vorsteuerabzugs) müssen die Steuerbeträge im Monat der Zahlung entsprechend nach unten korrigieren.',
    },
    {
      q: 'Wird Skonto vom Brutto- oder Nettobetrag abgezogen?',
      a: 'In der kaufmännischen Praxis wird Skonto vom Bruttorechnungsbetrag (inklusive Umsatzsteuer) abgezogen. Bei einer Bruttorechnung über 1.190 Euro mit 2 % Skonto überweist der Kunde genau 1.166,20 Euro. Der Skontoabzug mindert rechnerisch sowohl den Nettobetrag als auch die darin enthaltene Umsatzsteuer.',
    },
    {
      q: 'Was ist der rechtliche Unterschied zwischen Skonto, Rabatt und Bonus?',
      a: 'Rabatt wird sofort beim Kauf gewährt (z. B. Mengenrabatt) und mindert direkt den ursprünglichen Rechnungsbetrag. Skonto ist ein nachträglicher Preisnachlass für vorzeitige Zahlung innerhalb einer Frist (Barzahlungsanreiz). Ein Bonus wird erst am Jahresende rückwirkend bei Erreichen bestimmter Gesamtumsatzschwellen vergütet.',
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
          <span className="text-slate-900 font-bold">Skontorechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lieferantenkredit-Formel &bull; B2B Zahlungskonditionen &bull; Effektivzins</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Skontorechner: Zahlbetrag &amp; Effektiver Jahreszins
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Gewährt ein Lieferant Skonto (z. B. &bdquo;2% Skonto bei Zahlung innerhalb von 10 Tagen, sonst 30 Tage netto&ldquo;), entspricht der Verzicht auf Skonto einem extrem teuren Kredit. Ermitteln Sie Ihren Ersparnisbetrag und vergleichen Sie den rechnerischen Jahreszins mit Ihrem Kontokorrentkredit.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie hoch ist der Jahreszins bei 2 % Skonto?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Ein Skontoabzug von 2 % bei 10 Tagen Frist und 30 Tagen Zahlungsziel entspricht einem <strong>effektiven Jahreszins von 36,73 % p.a.</strong> Bei einer 10.000 € Rechnung spart die Zahlung innerhalb der Skontofrist exakt <strong>200,00 €</strong>. Selbst bei Inanspruchnahme eines 11 % Bank-Dispokredits verbleibt ein Reingewinn von <strong>ca. 139 €</strong>.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanySkontoEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Vergleichstabelle: Ersparnis &amp; Jahreszins bei Skontonutzung
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Basis: 10 Tage Skontofrist, 30 Tage Zahlungsziel (20 Tage Kredit)
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rechnungsbetrag</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Skonto-Ersparnis</th>
                  <th className="py-3 px-4 text-slate-700">Überweisungsbetrag</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Effektiver Jahreszins</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Vorteil trotz 11% Dispo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {skontoMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.rechnung}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/20">{row.skonto2}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.zahl2}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.zins20T}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.vorteilDispo11}</td>
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
              Betriebswirtschaftliche &amp; rechtliche Aspekte des Lieferantenkredits
            </h2>
            <p>
              Im deutschen Wirtschaftsverkehr nutzen Unternehmen Skontovereinbarungen zur Liquiditätssteuerung und zur Beschleunigung des Geldflusses. Wer Skonto nicht zieht, nimmt unbewusst den teuersten Kredit in Anspruch, den der Markt kennt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Die Zinsfalle des Lieferantenkredits</span>
              </div>
              <p className="text-xs">
                Die Zahlungsspanne zwischen Skontofrist (z. B. 10 Tage) und Nettoziel (z. B. 30 Tage) beträgt lediglich 20 Tage. Wenn Sie für diesen kurzen Zeitraum 2 % mehr bezahlen, entspricht das auf 360 Tage hochgerechnet einem Jahreszins von <strong>über 36 % p.a.</strong> Bei 3 % Skonto steigt der Effektivzins sogar auf über 55 % p.a.!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Percent className="w-4 h-4 text-amber-600" />
                <span>Vorsteuerkorrektur nach § 17 UStG</span>
              </div>
              <p className="text-xs">
                Unternehmen müssen bei Inanspruchnahme von Skonto die Vorsteuer in ihrer Buchhaltung anpassen: Da der bezahlte Bruttobetrag sinkt, reduziert sich auch die anrechenbare Vorsteuer anteilig. Moderne Buchhaltungsprogramme buchen diese Vorsteuerkorrektur beim Zahlungsausgleich automatisch.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zu Skonto &amp; Jahreszins</span>
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
              Verwandte Rechner für B2B &amp; Finanzen
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rechnungsvorlage PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/gewerbesteuerrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Gewerbesteuerrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/rabatt-prozent-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Prozentrechner Rabatt</span>
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

