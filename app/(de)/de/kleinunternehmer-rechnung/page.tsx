import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyInvoiceEngine } from '@/components/international/GermanyInvoiceEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, FileText, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kleinunternehmer Rechnung Vorlage PDF 2026 | § 19 UStG',
  description:
    'Erstellen Sie kostenlos rechtssichere Kleinunternehmer-Rechnungen nach § 19 UStG und § 14 UStG als druckfähiges PDF. Mit neuer Umsatzgrenze 2026, ohne Registrierung und ohne Wasserzeichen.',
  keywords: [
    'kleinunternehmer rechnung vorlage pdf',
    'rechnung schreiben kleinunternehmer online',
    'paragraph 19 ustg rechnungsmuster 2026',
    'kostenloser rechnungsgenerator ohne anmeldung',
    'rechnung ohne umsatzsteuer muster',
    'pflichtangaben rechnung kleinunternehmer 14 ustg',
    'kleinunternehmergrenze 25000 euro 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/kleinunternehmer-rechnung`,
    languages: HREFLANG_REGISTRY.invoice_generator.locales,
  },
  openGraph: {
    title: 'Kleinunternehmer Rechnung Vorlage PDF 2026 | § 19 UStG',
    description:
      'Rechtssichere Rechnungen für Kleinunternehmer nach § 19 UStG kostenlos erstellen und als PDF herunterladen.',
    url: `${SITE_URL}/de/kleinunternehmer-rechnung`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kleinunternehmer Rechnungsgenerator PDF 2026',
    description:
      'Rechtssichere Rechnungen für Kleinunternehmer nach § 19 UStG und § 14 UStG erstellen.',
  },
};

export default function GermanyInvoicePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kleinunternehmer Rechnungsgenerator PDF Deutschland',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Kostenloses Online-Tool zur Erstellung finanzamtkonformer Rechnungen für Kleinunternehmer gemäß § 19 UStG und § 14 UStG mit automatischer Druck- und PDF-Exportfunktion.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Rechnungserstellung & § 19 UStG Konformitätsprüfung',
        description: 'Finanzamtkonforme Rechnungslegung nach Umsatzsteuergesetz.',
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
            name: 'Kleinunternehmer Rechnung PDF',
            item: `${SITE_URL}/de/kleinunternehmer-rechnung`,
          },
        ],
      },
    ],
  };

  const checklistMatrix = [
    { bestandteil: 'Vollständiger Name & Anschrift', gesetz: '§ 14 Abs. 4 Nr. 1 UStG', kleinunternehmer: 'Zwingend (Leistender & Kunde)', fehlerfolge: 'Vorsteuerabzug des Kunden gefährdet' },
    { bestandteil: 'Steuernummer oder USt-IdNr.', gesetz: '§ 14 Abs. 4 Nr. 2 UStG', kleinunternehmer: 'Zwingend erforderlich', fehlerfolge: 'Formelle Ungültigkeit der Rechnung' },
    { bestandteil: 'Ausstellungsdatum & Rechnungsnummer', gesetz: '§ 14 Abs. 4 Nr. 3 & 4 UStG', kleinunternehmer: 'Fortlaufend & einmalig', fehlerfolge: 'Verstoß gegen GoBD' },
    { bestandteil: 'Art & Umfang der Leistung', gesetz: '§ 14 Abs. 4 Nr. 5 UStG', kleinunternehmer: 'Handelsübliche Bezeichnung', fehlerfolge: 'Beanstandung bei Betriebsprüfung' },
    { bestandteil: 'Liefer-/Leistungszeitpunkt', gesetz: '§ 14 Abs. 4 Nr. 6 UStG', kleinunternehmer: 'Tag oder Monat zwingend', fehlerfolge: 'Fehlende Fälligkeit' },
    { bestandteil: 'Hinweis auf § 19 UStG', gesetz: '§ 19 Abs. 1 UStG', kleinunternehmer: '„Gemäß § 19 UStG wird keine USt berechnet“', fehlerfolge: '§ 14c UStG Steuerschuld bei Ausweis von MwSt!' },
  ];

  const faqs = [
    {
      q: 'Welcher Pflichtsatz muss zwingend auf einer Kleinunternehmer-Rechnung stehen?',
      a: 'Auf jeder Rechnung muss der Grund für das Fehlen der Umsatzsteuer genannt sein. Der empfohlene Standardtext lautet: „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“ oder „Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG.“ Weisen Sie fälschlicherweise 19 % oder 7 % Mehrwertsteuer aus, schulden Sie diesen Betrag nach § 14c UStG an das Finanzamt!',
    },
    {
      q: 'Wie hoch sind die Umsatzgrenzen für Kleinunternehmer im Jahr 2026?',
      a: 'Durch die Umsetzung der EU-Kleinunternehmer-Richtlinie und das Wachstumschancengesetz liegt die Umsatzgrenze bei 25.000 Euro im vorangegangenen Kalenderjahr (zuvor 22.000 Euro) und 100.000 Euro im laufenden Kalenderjahr (zuvor 50.000 Euro). Maßgeblich ist der tatsächlich vereinnahmte Bruttoumsatz.',
    },
    {
      q: 'Müssen Kleinunternehmer eine USt-IdNr. angeben?',
      a: 'Auf der Rechnung muss entweder die persönliche Steuernummer oder die Umsatzsteuer-Identifikationsnummer (USt-IdNr.) angegeben werden. Aus Datenschutzgründen empfiehlt sich die Angabe der USt-IdNr., da die persönliche Steuernummer Rückschlüsse auf das private Steuerkonto beim Finanzamt erlaubt. Die USt-IdNr. kann beim Bundeszentralamt für Steuern kostenlos beantragt werden.',
    },
    {
      q: 'Gilt die E-Rechnungspflicht ab 2025/2026 auch für Kleinunternehmer?',
      a: 'Ja und Nein: Im B2B-Bereich müssen auch Kleinunternehmer ab dem 1. Januar 2025 in der Lage sein, elektronische Rechnungen (z. B. nach dem ZUGFeRD- oder XRechnung-Standard) von Geschäftspartnern zu empfangen. Für das eigene Ausstellen von Rechnungen an andere Unternehmen dürfen Kleinunternehmer jedoch bis auf Weiteres einfache PDF- oder Papierrechnungen verwenden.',
    },
    {
      q: 'Wie lange müssen Rechnungen aufbewahrt werden?',
      a: 'Nach § 14b UStG müssen Unternehmer (auch Kleinunternehmer) alle ausgestellten und empfangenen Rechnungen genau 10 Jahre lang aufbewahren. Die Aufbewahrungsfrist beginnt mit dem Schluss des Kalenderjahres, in dem die Rechnung ausgestellt wurde.',
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
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium print:hidden">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Kleinunternehmer Rechnung PDF</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Umsatzsteuergesetz § 14 &amp; § 19 &bull; Neue Umsatzgrenzen 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Kleinunternehmer-Rechnung kostenlos als PDF
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Erstellen Sie in unter 2 Minuten eine rechtssichere Rechnung nach der Kleinunternehmerregelung (§ 19 UStG).
            Direkt im DIN-A4-Format ausdrucken oder als PDF abspeichern &mdash; ohne Wasserzeichen und ohne Registrierung.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Welche Angaben muss eine Kleinunternehmer-Rechnung enthalten?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Eine Kleinunternehmer-Rechnung nach § 19 UStG darf <strong>keine Mehrwertsteuer</strong> (0 %) ausweisen und muss zwingend den Hinweissatz enthalten: <em>„Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“</em> Zudem verlangt § 14 UStG eine fortlaufende Rechnungsnummer, Steuernummer oder USt-IdNr., vollständige Anschriften und das genaue Leistungsdatum.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyInvoiceEngine />

        {/* Worked Statutory Checklist Matrix */}
        <div className="space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Gesetzliche Pflichtangaben nach § 14 Abs. 4 UStG Checklist
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Vorgaben der Bundesfinanzverwaltung für Betriebsprüfungen
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rechnungsbestandteil</th>
                  <th className="py-3 px-4">Rechtsnorm</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Vorgabe Kleinunternehmer</th>
                  <th className="py-3 px-4 text-rose-700 font-bold">Rechtsfolge bei Fehlen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {checklistMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.bestandteil}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.gesetz}</td>
                    <td className="py-3 px-4 text-slate-800">{row.kleinunternehmer}</td>
                    <td className="py-3 px-4 text-rose-700 font-medium bg-rose-50/20">{row.fehlerfolge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed print:hidden">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Steuerrechtliche Spielregeln für Kleinunternehmer in Deutschland 2026
            </h2>
            <p>
              Die Kleinunternehmerregelung nach § 19 UStG ist ein bürokratisches Privileg für Gründer und Selbstständige mit überschaubaren Umsätzen. Sie befreit von der Pflicht zur monatlichen oder quartalsweisen Umsatzsteuervoranmeldung, schließt im Gegenzug jedoch auch den Vorsteuerabzug aus Eingangsrechnungen aus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Die Haftungsfalle nach § 14c UStG</span>
              </div>
              <p className="text-xs">
                Weist ein Kleinunternehmer auf einer Rechnung versehentlich Umsatzsteuer gesondert aus, schuldet er diesen Steuerbetrag dem Finanzamt nach <strong>§ 14c UStG</strong>, darf ihn aber selbst nicht als Vorsteuer geltend machen. Eine Rechnungskorrektur mit Stornorechnung ist in diesem Fall zwingend erforderlich.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                <span>Neue Schwellenwerte: 25.000 € / 100.000 €</span>
              </div>
              <p className="text-xs">
                Mit den aktuellen Grenzwerten darf der Vorjahresumsatz 25.000 Euro nicht überstiegen haben und der laufende Jahresumsatz voraussichtlich 100.000 Euro nicht überschreiten. Bei Überschreiten der 100.000-Euro-Grenze entfällt die Steuerbefreiung mit sofortiger Wirkung ab dem Umsatz, der die Grenze bricht.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4 print:hidden">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zu Kleinunternehmer-Rechnungen</span>
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
        <div className="p-6 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider font-mono">
              Verwandte Werkzeuge für Selbstständige &amp; Gründer
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/gewerbesteuerrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Gewerbesteuerrechner</span>
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
              href="/de/iban-pruefer-bic-finder"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>IBAN-Prüfer &amp; BLZ</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto Netto 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

