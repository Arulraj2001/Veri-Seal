import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Wallet, Calendar, AlertCircle, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyMietkautionEngine } from '@/components/international/GermanyMietkautionEngine';

export const metadata: Metadata = {
  title: 'Mietkautionsrechner 2026 | Maximal 3 Nettokaltmieten (§ 551 BGB)',
  description:
    'Berechnen Sie die gesetzliche Höchstgrenze der Mietkaution (maximal 3 Nettokaltmieten) und Ihren Anspruch auf 3 Monatsraten nach § 551 BGB. Mit Regeln zu Kautionsanlage & Rückzahlung.',
  keywords: [
    'mietkautionsrechner 2026',
    'maximal 3 nettokaltmieten bgb 551',
    'mietkaution in 3 raten zahlen',
    'kaution warmmiete zulaessig',
    'rueckzahlung mietkaution frist vermieter',
    'mietkautionskonto zinsen treuhandkonto',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/mietkautionsrechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/mietkautionsrechner`,
      'de': `${SITE_URL}/de/mietkautionsrechner`,
      'x-default': `${SITE_URL}/de/mietkautionsrechner`,
    },
  },
  openGraph: {
    title: 'Mietkautionsrechner 2026 | Maximal 3 Nettokaltmieten (§ 551 BGB)',
    description:
      'Gesetzliche Obergrenze der Kaution im deutschen Mietrecht und Ratenzahlungsanspruch des Mieters berechnen.',
    url: `${SITE_URL}/de/mietkautionsrechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mietkautionsrechner Deutschland 2026',
    description:
      'Berechnung der gesetzlichen Kautionsgrenze nach § 551 BGB und Aufteilung in drei Monatsraten.',
  },
};

export default function MietkautionPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Mietkautionsrechner Deutschland',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Rechner für die Mietkaution und gesetzliche Ratenzahlung nach § 551 des Bürgerlichen Gesetzbuches (BGB).',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Mietkautions- und Ratenzahlungsberechnung',
        description: 'Ermittlung von Kautionsobergrenze und Monatsraten nach § 551 BGB.',
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
            name: 'Mietkautionsrechner',
            item: `${SITE_URL}/de/mietkautionsrechner`,
          },
        ],
      },
    ],
  };

  const depositMatrix = [
    { kaltmiete: '500 €', maxKaution: '1.500 €', rate1: '500 €', rate2: '500 €', rate3: '500 €' },
    { kaltmiete: '750 €', maxKaution: '2.250 €', rate1: '750 €', rate2: '750 €', rate3: '750 €' },
    { kaltmiete: '1.000 €', maxKaution: '3.000 €', rate1: '1.000 €', rate2: '1.000 €', rate3: '1.000 €' },
    { kaltmiete: '1.250 €', maxKaution: '3.750 €', rate1: '1.250 €', rate2: '1.250 €', rate3: '1.250 €' },
    { kaltmiete: '1.500 €', maxKaution: '4.500 €', rate1: '1.500 €', rate2: '1.500 €', rate3: '1.500 €' },
  ];

  const faqs = [
    {
      q: 'Darf der Vermieter mehr als drei Monatsmieten als Kaution verlangen?',
      a: 'Nein. Nach § 551 Abs. 1 BGB ist die Mietsicherheit gesetzlich auf maximal drei Monatsmieten ohne Nebenkostenvorauszahlungen (Nettokaltmiete) begrenzt. Vereinbarungen im Mietvertrag, die eine höhere Sicherheitsleistung verlangen, sind insoweit unwirksam. Der Mieter muss den übersteigenden Betrag nicht zahlen bzw. kann zu viel gezahlte Beträge unverzüglich zurückfordern.',
    },
    {
      q: 'Hat der Mieter ein gesetzliches Recht auf Ratenzahlung der Kaution?',
      a: 'Ja. Nach § 551 Abs. 2 BGB ist der Mieter zwingend berechtigt, die Kaution in drei gleichen monatlichen Teilzahlungen zu leisten. Die erste Teilzahlung ist zu Beginn des Mietverhältnisses fällig, die beiden weiteren Raten zusammen mit den jeweils folgenden Monatsmieten. Eine Vertragsklausel wie "Schlüsselübergabe nur gegen vollständige Barzahlung der Kaution" ist gesetzwidrig und unwirksam.',
    },
    {
      q: 'Auf welches Konto muss der Vermieter die Mietkaution anlegen?',
      a: 'Der Vermieter ist nach § 551 Abs. 3 BGB gesetzlich verpflichtet, das Kautionsgeld insolvenzfest getrennt von seinem eigenen Vermögen bei einer Bank anzulegen (z. B. auf einem gesonderten Mietkautionskonto / Treuhandkonto). Die Zinsen stehen dem Mieter zu und erhöhen die Kaution.',
    },
    {
      q: 'Wann muss der Vermieter die Kaution nach Auszug zurückzahlen?',
      a: 'Das Gesetz nennt keine starre Frist, die ständige Rechtsprechung des BGH billigt dem Vermieter jedoch eine angemessene Prüf- und Überlegungsfrist von 3 bis höchstens 6 Monaten nach Wohnungsrückgabe zu. Steht noch eine Betriebskostenabrechnung aus, darf der Vermieter einen angemessenen Teilbetrag der Kaution bis zur Abrechnung einbehalten.',
    },
    {
      q: 'Darf der Mieter die letzten Monatsmieten vor Auszug mit der Kaution "abwohnen"?',
      a: 'Nein, das sogenannte "Abwohnen" der Kaution ist unzulässig. Die Kaution dient als Sicherheit für Schäden und Nachzahlungen nach Beendigung des Mietverhältnisses. Stellt der Mieter vorzeitig die Mietzahlung ein, gerät er in Zahlungsverzug und riskiert gerichtliche Mahnverfahren.',
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
          <span className="text-slate-900 font-bold">Mietkautionsrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§ 551 BGB &bull; Gesetzliche Höchstgrenze &bull; Recht auf 3 Raten</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Mietkautionsrechner: Gesetzliche Obergrenze nach § 551 BGB
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Das deutsche Mietrecht setzt Vermietern bei der Sicherheitsleistung enge Schranken: Eine Mietkaution darf höchstens das <strong>Dreifache der monatlichen Nettokaltmiete</strong> betragen. Nebenkosten dürfen nicht einberechnet werden, und Mieter haben ein unabdingbares Recht auf Zahlung in drei Monatsraten.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel Kaution darf der Vermieter maximal verlangen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Nach § 551 Abs. 1 BGB darf die Mietkaution maximal <strong>3 Nettokaltmieten</strong> betragen (ohne Betriebskostenvorauszahlungen). Bei 800 € Kaltmiete beträgt die Höchstkaution genau <strong>2.400 €</strong>. Der Mieter darf diesen Betrag gesetzlich garantiert in <strong>3 gleichen Monatsraten à 800 €</strong> zahlen.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyMietkautionEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Gesetzliche Ratenzahlungs-Matrix nach § 551 Abs. 2 BGB
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Berechnung auf Basis der reinen Nettokaltmiete
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nettokaltmiete</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Max. Kaution (3x Kaltmiete)</th>
                  <th className="py-3 px-4 text-slate-700">1. Rate (Mietbeginn)</th>
                  <th className="py-3 px-4 text-slate-700">2. Rate (Folgemonat)</th>
                  <th className="py-3 px-4 text-slate-900 font-bold">3. Rate (3. Monat)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {depositMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.kaltmiete}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.maxKaution}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.rate1}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.rate2}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.rate3}</td>
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
              Gesetzliche Pflichten zur Kautionsanlage im Bürgerlichen Gesetzbuch
            </h2>
            <p>
              Die Kaution ist eine Treuhandsumme: Sie bleibt Eigentum des Mieters und dient dem Vermieter ausschließlich als Sicherheit für tatsächliche Forderungen aus dem Mietverhältnis (wie Mietausfälle oder vom Mieter verschuldete Schäden).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Wallet className="w-4 h-4 text-amber-600" />
                <span>Getrenntes Treuhandkonto (§ 551 Abs. 3 BGB)</span>
              </div>
              <p className="text-xs">
                Der Vermieter muss die Kaution getrennt von seinem Privat- und Betriebsvermögen auf einem Sonderkonto anlegen. Kommt der Vermieter in Insolvenz, fällt die Kaution dadurch nicht in die Insolvenzmasse, sondern bleibt für den Mieter vollständig geschützt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Rückzahlung nach Auszug</span>
              </div>
              <p className="text-xs">
                Nach Rückgabe der Wohnung steht dem Vermieter eine Prüffrist von 3 bis 6 Monaten zu. Liegen keine Mängel vor, ist die Kaution samt Zinserträgen freizugeben. Für noch ausstehende Nebenkostenabrechnungen darf nur ein angemessener Teilbetrag einbehalten werden.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Mietkaution</span>
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
              Verwandte Rechner für Mieter &amp; Immobilien
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/mieterhoehung-kappungsgrenze-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Mieterhöhung (§ 558 BGB)</span>
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

