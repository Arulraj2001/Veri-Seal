import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyInvoiceEngine } from '@/components/international/GermanyInvoiceEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kleinunternehmer Rechnung Vorlage PDF 2026 | § 19 UStG',
  description:
    'Erstellen Sie kostenlos rechtssichere Kleinunternehmer-Rechnungen nach § 19 UStG und § 14 UStG als druckfähiges PDF. Ohne Registrierung und ohne Wasserzeichen.',
  keywords: [
    'kleinunternehmer rechnung vorlage pdf',
    'rechnung schreiben kleinunternehmer online',
    'paragraph 19 ustg rechnungsmuster',
    'kostenloser rechnungsgenerator ohne anmeldung',
    'rechnung ohne umsatzsteuer muster',
    'pflichtangaben rechnung kleinunternehmer',
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
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Welcher Pflichtsatz muss auf eine Kleinunternehmer-Rechnung?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Auf jeder Kleinunternehmer-Rechnung muss ein klarer Hinweis auf die Inanspruchnahme der Kleinunternehmerregelung stehen, beispielsweise: „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“ Fehlt dieser Satz oder wird fälschlicherweise Umsatzsteuer ausgewiesen, schuldet der Unternehmer diese Steuer dem Finanzamt.',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Pflichtangaben verlangt § 14 UStG?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vollständiger Name und Anschrift des Leistenden und des Empfängers, Steuernummer oder USt-IdNr., Ausstellungsdatum, einmalige fortlaufende Rechnungsnummer, Menge und handelsübliche Bezeichnung der gelieferten Ware oder Art und Umfang der Dienstleistung sowie der Leistungszeitpunkt.',
            },
          },
        ],
      },
    ],
  };

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
            <span>Umsatzsteuergesetz § 14 & § 19</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Kleinunternehmer-Rechnung kostenlos als PDF
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Erstellen Sie in unter 2 Minuten eine rechtssichere Rechnung nach der Kleinunternehmerregelung (§ 19 UStG).
            Direkt im DIN-A4-Format ausdrucken oder als PDF abspeichern — ohne Wasserzeichen und ohne Anmeldung.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-amber-50/60 border-l-4 border-amber-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5 print:hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Pflichtvorgaben für Kleinunternehmer-Rechnungen
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Rechnungen nach § 19 UStG weisen 0 % Umsatzsteuer aus und erfordern den Pflichtsatz
            „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“, eine fortlaufende Rechnungsnummer,
            Steuernummer, vollständige Anschriften und das genaue Leistungsdatum.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyInvoiceEngine />

        {/* AdSense Placement Slot 1 */}
        <div className="w-full border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 text-center print:hidden">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Werbeplatzhalter
          </span>
        </div>

        {/* Mandatory Legal Clauses Guide */}
        <div className="space-y-6 pt-6 border-t border-slate-200 print:hidden">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Die 7 wichtigsten Pflichtbestandteile nach § 14 UStG
            </h2>
            <p className="text-sm text-slate-600">
              Prüfen Sie Ihre Rechnungen gegen die gesetzlichen Vorgaben des deutschen Finanzamts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">1. Fortlaufende Rechnungsnummer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jede Rechnung muss eine einmalige, systematische Nummer enthalten (z. B. RE-2026-001). Eine Nummer darf im Kalenderjahr niemals doppelt vergeben werden.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">2. Steuernummer oder USt-IdNr.</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Auf der Rechnung muss entweder Ihre persönliche Steuernummer beim zuständigen Finanzamt oder Ihre beim Bundeszentralamt für Steuern beantragte USt-IdNr. stehen.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">3. Pflichtklausel § 19 UStG</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Als Kleinunternehmer dürfen Sie keinen Mehrwertsteuersatz (19% oder 7%) aufführen, sondern müssen den gesetzlichen Satz zur Umsatzsteuerbefreiung einfügen.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Möchten Sie Ihren effektiven Stundenlohn oder Minijob berechnen?</h3>
            <p className="text-xs text-slate-400">
              Prüfen Sie das Verhältnis von Arbeitsstunden, Gehalt und dem gesetzlichen Mindestlohn 2026.
            </p>
          </div>
          <Link
            href="/de/stundenlohnrechner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Stundenlohnrechner 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
