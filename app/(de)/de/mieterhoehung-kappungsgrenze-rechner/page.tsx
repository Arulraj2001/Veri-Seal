import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Home, AlertCircle, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyMieterhoehungEngine } from '@/components/international/GermanyMieterhoehungEngine';

export const metadata: Metadata = {
  title: 'Mieterhöhung & Kappungsgrenze Rechner 2026 (§ 558 BGB) | Kagazo',
  description:
    'Prüfen Sie die Rechtmäßigkeit einer Mieterhöhung nach § 558 BGB: 15% Kappungsgrenze in Ballungsräumen vs. 20% regulär, Jahressperrfrist und Mietspiegel-Abgleich.',
  keywords: [
    'mieterhoehung rechner 2026',
    'kappungsgrenze 15 prozent rechner bgb',
    'mieterhoehung bis ortsuebliche vergleichsmiete',
    'wie viel darf miete in 3 jahren steigen',
    'mieterhoehung zustimmungsfrist 558b bgb',
    'mietspiegel erhoehung pruefen',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
      'de': `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
      'x-default': `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
    },
  },
  openGraph: {
    title: 'Mieterhöhung & Kappungsgrenze Rechner 2026 (§ 558 BGB) | Kagazo Deutschland',
    description:
      'Rechner zur Überprüfung von Mieterhöhungen bis zur ortsüblichen Vergleichsmiete und gesetzlichen Kappungsgrenzen.',
    url: `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mieterhöhung & Kappungsgrenze Rechner Deutschland 2026',
    description:
      'Berechnung der gesetzlichen Kappungsgrenzen (15% vs. 20%) und Zustimmungsfristen nach § 558 BGB.',
  },
};

export default function MieterhoehungPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Mieterhöhungs- und Kappungsgrenzen-Rechner Deutschland',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für die gesetzliche Mieterhöhung nach § 558 BGB, Mietspiegel und 15% bzw. 20% Kappungsgrenze im deutschen Mietrecht.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Mietanpassungs- und Kappungsgrenzenprüfung',
        description: 'Rechtliche Prüfung von Mieterhöhungsverlangen nach BGB Mietrecht.',
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
            name: 'Mieterhöhungs-Rechner',
            item: `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
          },
        ],
      },
    ],
  };

  const increaseMatrix = [
    { kaltmieteAlt: '600 €', max15: '+90 € / Mo.', miete15: '690 €', max20: '+120 € / Mo.', miete20: '720 €' },
    { kaltmieteAlt: '800 €', max15: '+120 € / Mo.', miete15: '920 €', max20: '+160 € / Mo.', miete20: '960 €' },
    { kaltmieteAlt: '1.000 €', max15: '+150 € / Mo.', miete15: '1.150 €', max20: '+200 € / Mo.', miete20: '1.200 €' },
    { kaltmieteAlt: '1.250 €', max15: '+187,50 € / Mo.', miete15: '1.437,50 €', max20: '+250 € / Mo.', miete20: '1.500 €' },
    { kaltmieteAlt: '1.500 €', max15: '+225 € / Mo.', miete15: '1.725 €', max20: '+300 € / Mo.', miete20: '1.800 €' },
  ];

  const faqs = [
    {
      q: 'Wie funktioniert die gesetzliche Kappungsgrenze nach § 558 Abs. 3 BGB?',
      a: 'Die Kappungsgrenze bestimmt, dass sich die Nettokaltmiete innerhalb eines Zeitraums von drei Jahren um nicht mehr als 20 % erhöhen darf. In Städten und Gemeinden mit angespanntem Wohnungsmarkt (per Landesverordnung festgelegt, z. B. Berlin, München, Hamburg, Köln, Frankfurt) ist diese Grenze auf 15 % abgesenkt. Auch wenn der Mietspiegel einen höheren Wert zuließe, ist die Erhöhung durch die Kappungsgrenze zwingend gedeckelt.',
    },
    {
      q: 'Was besagt die Jahressperrfrist bei Mieterhöhungen (§ 558 Abs. 1 BGB)?',
      a: 'Der Vermieter darf eine Mieterhöhung frühestens ein Jahr nach der letzten Mieterhöhung ankündigen. Da dem Mieter eine Überlegungsfrist von zwei vollen Kalendermonaten zusteht, wird die Mieterhöhung frühestens nach 15 Monaten wirksam. Eine frühere Mieterhöhung ist formell unwirksam.',
    },
    {
      q: 'Wie viel Bedenkzeit hat ein Mieter bei einem Mieterhöhungsverlangen?',
      a: 'Nach § 558b Abs. 2 BGB hat der Mieter Zeit bis zum Ablauf des übernächsten Monats nach Zugang des Mieterhöhungsschreibens (Zustimmungsfrist). Geht das Schreiben beispielsweise am 15. März zu, läuft die Frist bis zum 31. Mai. Stimmt der Mieter zu, ist die neue Miete ab dem 1. Juni zu zahlen.',
    },
    {
      q: 'Darf der Vermieter die Miete über die ortsübliche Vergleichsmiete anheben?',
      a: 'Nein. Die ortsübliche Vergleichsmiete (in der Regel aus dem qualifizierten Mietspiegel der Gemeinde entnommen) bildet die absolute Obergrenze für Mieterhöhungen nach § 558 BGB. Selbst wenn die 15%- oder 20%-Kappungsgrenze rechnerisch noch Spielraum ließe, darf die neue Miete den Mietspiegelwert nicht übersteigen.',
    },
    {
      q: 'Zählen Modernisierungsmieterhöhungen in die 3-Jahres-Kappungsgrenze?',
      a: 'Nein. Mieterhöhungen nach Durchführung energetischer oder baulicher Modernisierungsmaßnahmen (§ 559 BGB) fallen nicht unter die reguläre Kappungsgrenze nach § 558 BGB. Hier darf der Vermieter jährlich bis zu 8 % der aufgewendeten Kosten auf die Jahresmiete umlegen (gedeckelt auf max. 3 Euro pro Quadratmeter Wohnfläche innerhalb von 6 Jahren).',
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
          <span className="text-slate-900 font-bold">Mieterhöhungs-Rechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§ 558 BGB &bull; Mietspiegel &bull; 15% / 20% Kappungsgrenze</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Mieterhöhungs-Rechner: Kappungsgrenze nach § 558 BGB
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Vermieter dürfen die Wohnungsmiete nicht beliebig anheben. Das Bürgerliche Gesetzbuch schützt Mieter durch zwei gesetzliche Barrieren: die Miete darf maximal bis zur <strong>ortsüblichen Vergleichsmiete</strong> steigen und darf sich innerhalb von drei Jahren um nicht mehr als <strong>20% (bzw. 15% in Gebieten mit abgesenkter Kappungsgrenze)</strong> erhöhen.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel darf die Miete maximal steigen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Nach § 558 Abs. 3 BGB darf die Nettokaltmiete innerhalb von 3 Jahren um höchstens <strong>20 %</strong> (regulär) bzw. <strong>15 %</strong> (in Gebieten mit Wohnraummangel) steigen. Zudem darf sie den örtlichen Mietspiegel nicht übersteigen. Bei einer Kaltmiete von 1.000 € beträgt der maximale Erhöhungsbetrag somit <strong>150 € (bei 15 %)</strong> bzw. <strong>200 € (bei 20 %)</strong> im Monat.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyMieterhoehungEngine />

        {/* Worked Comparison Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Kappungsgrenzen-Matrix: Maximaler Erhöhungsspielraum über 3 Jahre
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Vergleich 15 % (Ballungsräume) vs. 20 % (Regelfall)
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bisherige Kaltmiete</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Max. Erhöhung (15 %)</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Neue Miete (15 %)</th>
                  <th className="py-3 px-4 text-slate-700">Max. Erhöhung (20 %)</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">Neue Miete (20 %)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {increaseMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.kaltmieteAlt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.max15}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.miete15}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.max20}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.miete20}</td>
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
              Mietrechtliche Vorgaben für Mieterhöhungsverlangen in Deutschland
            </h2>
            <p>
              Ein Mieterhöhungsverlangen des Vermieters ist nur dann rechtlich bindend, wenn es strenge formelle und inhaltliche Kriterien nach §§ 558 ff. BGB erfüllt. Unzureichend begründete oder verfrühte Mieterhöhungen können vom Mieter wirksam zurückgewiesen werden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Home className="w-4 h-4 text-amber-600" />
                <span>Formvorschriften (§ 558a BGB)</span>
              </div>
              <p className="text-xs">
                Die Mieterhöhung muss in Textform (z. B. Brief oder E-Mail) erklärt und begründet werden. Als Begründungsmittel sind gesetzlich zugelassen: 1. Bezugnahme auf den qualifizierten Mietspiegel, 2. Benennung von drei vergleichbaren Wohnungen oder 3. ein mit Gründen versehenes Sachverständigengutachten.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Rechtsfolge bei Nichtzustimmung (§ 558b BGB)</span>
              </div>
              <p className="text-xs">
                Verweigert der Mieter die Zustimmung, darf der Vermieter die Miete nicht eigenmächtig abbuchen. Er muss innerhalb von drei weiteren Monaten Klage auf Erteilung der Zustimmung beim zuständigen Amtsgericht erheben. Das Gericht prüft dann die Rechtmäßigkeit der Mieterhöhung.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Mieterhöhung</span>
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
              Verwandte Rechner für Mieter &amp; Vermieter
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/mietkautionsrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Mietkaution (§ 551 BGB)</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

