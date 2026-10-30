import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Building2, CheckCircle2, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyIbanEngine } from '@/components/international/GermanyIbanEngine';

export const metadata: Metadata = {
  title: 'IBAN-Prüfer Deutschland 2026 | BLZ-Finder & Modulo-97 Check',
  description:
    'Prüfen Sie deutsche IBANs (22 Zeichen) auf mathematische Gültigkeit nach dem ISO 13616 / MOD-97-10 Algorithmus und ermitteln Sie Bankleitzahl (BLZ), Kontonummer und BIC nach Bundesbank-Register.',
  keywords: [
    'iban pruefer deutschland',
    'bankleitzahl finder blz bic',
    'deutsche iban gueltigkeit pruefen',
    'modulo 97 iban berechnen formel',
    'iban aufbau 22 stellen deutschland',
    'deutsche bank sparkasse blz verzeichnis',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/iban-pruefer-bic-finder`,
    languages: {
      'de-DE': `${SITE_URL}/de/iban-pruefer-bic-finder`,
      'de': `${SITE_URL}/de/iban-pruefer-bic-finder`,
      'x-default': `${SITE_URL}/de/iban-pruefer-bic-finder`,
    },
  },
  openGraph: {
    title: 'IBAN-Prüfer Deutschland 2026 | BLZ-Finder & Modulo-97 Check',
    description:
      'Offizieller Prüfziffern-Check für deutsche IBANs und automatische Erkennung des Kreditinstituts nach dem Bundesbank-Verzeichnis.',
    url: `${SITE_URL}/de/iban-pruefer-bic-finder`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBAN-Prüfer Deutschland 2026',
    description:
      'Mathematische Validierung deutscher IBANs nach ISO 13616 und Bankleitzahl-Erkennung.',
  },
};

export default function IbanPrueferPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'IBAN-Prüfer und BLZ-Finder Deutschland',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Prüfsummen-Rechner für deutsche IBANs nach ISO 13616 und Entschlüsselung von Bankleitzahl und Kontonummer nach dem Verzeichnis der Deutschen Bundesbank.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'SEPA-IBAN-Validierungsdienst',
        description: 'ISO 7064 MOD-97-10 Prüfsummenvalidierung und BLZ-Zuordnung.',
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
            name: 'IBAN-Prüfer & BLZ-Finder',
            item: `${SITE_URL}/de/iban-pruefer-bic-finder`,
          },
        ],
      },
    ],
  };

  const bankDirectory = [
    { bank: 'Deutsche Bank AG', blz: '100 700 00', bic: 'DEUTDEDBFXX', ort: 'Frankfurt am Main' },
    { bank: 'Commerzbank AG', blz: '100 400 00', bic: 'COBADEFFXXX', ort: 'Frankfurt am Main' },
    { bank: 'ING-DiBa AG', blz: '500 105 17', bic: 'INGDDEFFXXX', ort: 'Frankfurt am Main' },
    { bank: 'DKB (Deutsche Kreditbank)', blz: '120 300 00', bic: 'BYLADEM1100', ort: 'Berlin' },
    { bank: 'Berliner Sparkasse', blz: '100 500 00', bic: 'BELADEBE100', ort: 'Berlin' },
    { bank: 'Postbank (Niederlassung DB)', blz: '100 100 10', bic: 'PBNKDEFFXXX', ort: 'Bonn' },
  ];

  const faqs = [
    {
      q: 'Aus wie vielen Zeichen besteht eine deutsche IBAN und wie ist sie aufgebaut?',
      a: 'Eine deutsche IBAN besteht aus exakt 22 Zeichen. Sie gliedert sich in: 1. Länderkennzeichen „DE“ (2 Buchstaben), 2. zweistellige Prüfziffer (nach Modulo 97 berechnet), 3. achtstellige Bankleitzahl (BLZ) des kontoführenden Instituts und 4. zehnstellige Kontonummer (kürzere Nummern werden links mit Nullen aufgefüllt).',
    },
    {
      q: 'Wie funktioniert die mathematische Modulo-97-Prüfung?',
      a: 'Nach der internationalen Norm ISO 7064 / ISO 13616 werden das Länderkürzel DE und die Prüfziffer ans Ende der IBAN verschoben. Anschließend werden die Buchstaben durch Zahlen ersetzt (D = 13, E = 14). Teilt man diese 24-stellige Gesamtzahl durch 97, muss der Divisionsrest exakt 1 ergeben. Ergibt der Rest nicht 1, liegt ein Zahlendreher oder Tippfehler vor.',
    },
    {
      q: 'Haftet die Bank bei Überweisungen an eine falsche IBAN?',
      a: 'Nein! Nach § 675r BGB ist die Bank gesetzlich nur verpflichtet, die Überweisung anhand der angegebenen Kundenkennung (IBAN) auszuführen. Die Bank gleicht den Empfängernamen nicht mehr mit dem Kontoinhaber ab. Bei Tippfehlern, die zu einer gültigen Fremd-IBAN führen, muss der Zahler das Geld mühsam auf zivilrechtlichem Weg vom falschen Empfänger zurückfordern.',
    },
    {
      q: 'Wo findet man die Bankleitzahl (BLZ) in der IBAN?',
      a: 'In jeder deutschen IBAN bilden die Stellen 5 bis 12 (genau 8 Ziffern direkt nach den ersten vier Zeichen) die klassische deutsche Bankleitzahl (BLZ). Anhand dieser 8 Ziffern lässt sich jedes deutsche Kreditinstitut im amtlichen Bankleitzahlenverzeichnis der Deutschen Bundesbank eindeutig identifizieren.',
    },
    {
      q: 'Werden eingegebene IBANs auf einem Server gespeichert?',
      a: 'Nein, keinesfalls. Die gesamte Überprüfung der IBAN und das Auslesen von BLZ und BIC erfolgen zu 100 % lokal in Ihrem Browser mit JavaScript. Es werden keine Bankdaten an unsere Server übermittelt oder in Datenbanken gespeichert (vollständige DSGVO-Konformität).',
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
          <span className="text-slate-900 font-bold">IBAN-Prüfer &amp; BLZ-Finder</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ISO 13616 &bull; MOD-97-10 Prüfsumme &bull; Deutsche Bundesbank BLZ-Register</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            IBAN-Prüfer Deutschland &amp; Bankleitzahl-Finder
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Vermeiden Sie teure Fehlüberweisungen und Rücklastschriften. Dieser Prüfer validiert deutsche IBANs (22 Zeichen) mittels der internationalen Modulo-97-Prüfziffer und schlüsselt die enthaltene 8-stellige Bankleitzahl (BLZ) und 10-stellige Kontonummer auf.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie setzt sich eine deutsche IBAN zusammen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Eine deutsche IBAN umfasst genau <strong>22 Stellen</strong>: Das Länderkürzel <code>DE</code>, eine <strong>2-stellige Prüfziffer</strong> (nach MOD 97-10), die <strong>8-stellige Bankleitzahl</strong> und die <strong>10-stellige Kontonummer</strong>. Bei der mathematischen Validierung muss die nach ISO 7064 umgestellte Zahl geteilt durch 97 den <strong>Rest 1</strong> ergeben.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyIbanEngine />

        {/* Worked Statutory Lookup Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Auszug: Deutsche Großbanken &amp; Bankleitzahlen (BLZ)
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Verzeichnis der Deutschen Bundesbank &bull; Gültig für SEPA
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kreditinstitut</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Bankleitzahl (BLZ)</th>
                  <th className="py-3 px-4 text-slate-700 font-bold">BIC / SWIFT</th>
                  <th className="py-3 px-4 text-slate-600">Hauptsitz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {bankDirectory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.bank}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.blz}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{row.bic}</td>
                    <td className="py-3 px-4 text-slate-600">{row.ort}</td>
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
              Rechtliche &amp; technische Hintergründe der SEPA-Überweisung
            </h2>
            <p>
              Seit Einführung des einheitlichen Euro-Zahlungsverkehrsraums (SEPA) durch die EU-Verordnung Nr. 260/2012 hat die IBAN (International Bank Account Number) die frühere Kontonummer und Bankleitzahl im In- und Auslandszahlungsverkehr vollständig ersetzt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Landmark className="w-4 h-4 text-amber-600" />
                <span>Rechtliche Haftungsfalle nach § 675r BGB</span>
              </div>
              <p className="text-xs">
                Banken sind gesetzlich nicht mehr verpflichtet, den Namen des Empfängers mit der Kontonummer abzugleichen. Stimmt die IBAN mathematisch, wird das Geld unwiderruflich gebucht. Ein Zahlendreher kann daher ohne Prüfung zum sofortigen Geldverlust führen.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Rolle der Deutschen Bundesbank</span>
              </div>
              <p className="text-xs">
                Die Deutsche Bundesbank führt das offizielle Bankleitzahlenverzeichnis für Deutschland und aktualisiert dieses vierteljährlich (März, Juni, September, Dezember). Jedes Kreditinstitut erhält dort seine eindeutige 8-stellige Identifikationsnummer.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur IBAN-Prüfung</span>
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
              Verwandte Rechner für Finanzen &amp; Rechnungen
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
              href="/de/skontorechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Skontorechner</span>
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
              href="/de/pdf-kompressor-online-antraege"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>PDF-Kompressor Behörden</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

