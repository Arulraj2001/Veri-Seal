import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Wallet, Calendar, AlertCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyMietkautionEngine } from '@/components/international/GermanyMietkautionEngine';

export const metadata: Metadata = {
  title: 'Mietkautionsrechner : Maximal 3 Nettokaltmieten (§ 551 BGB) | Kagazo',
  description:
    'Berechnen Sie die gesetzliche Höchstgrenze der Mietkaution (maximal 3 Nettokaltmieten) und Ihren gesetzlichen Anspruch auf Ratenzahlung in 3 Monatsraten nach § 551 BGB.',
  alternates: {
    canonical: `${SITE_URL}/de/mietkautionsrechner`,
  },
  openGraph: {
    title: 'Mietkautionsrechner : Maximal 3 Nettokaltmieten (§ 551 BGB) | Kagazo Deutschland',
    description:
      'Gesetzliche Obergrenze der Kaution im deutschen Mietrecht und Ratenzahlungsanspruch des Mieters berechnen.',
    url: `${SITE_URL}/de/mietkautionsrechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function MietkautionPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mietkautionsrechner Deutschland',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Rechner für die Mietkaution und gesetzliche Ratenzahlung nach § 551 des Bürgerlichen Gesetzbuches (BGB).',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
          <ShieldCheck className="w-4 h-4" />
          <span>§ 551 BGB • Gesetzliche Höchstgrenze • Recht auf 3 Raten</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Mietkautionsrechner : Gesetzliche Obergrenze nach § 551 BGB
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Das deutsche Mietrecht setzt Vermietern bei der Sicherheitsleistung enge Schranken: Eine Mietkaution darf höchstens das <strong>Dreifache der auf einen Monat entfallenden Nettokaltmiete</strong> betragen. Nebenkosten dürfen nicht einberechnet werden, und Mieter haben ein unabdingbares Recht auf Zahlung in drei Monatsraten.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyMietkautionEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Calendar className="w-5 h-5" />
            <span>Unabdingbares Recht auf Zahlung in 3 Monatsraten</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nach <strong>§ 551 Abs. 2 BGB</strong> ist der Mieter zu drei gleichen monatlichen Teilzahlungen berechtigt. Die erste Teilzahlung ist zu Beginn des Mietverhältnisses fällig. Die beiden weiteren Teilzahlungen werden zusammen mit den unmittelbar folgenden Monatsmieten fällig. Klauseln im Mietvertrag, die eine Komplettzahlung vor Schlüsselübergabe fordern, sind <strong>unwirksam</strong>!
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Wallet className="w-5 h-5" />
            <span>Verzinsung &amp; getrenntes Mietkautionskonto</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Der Vermieter ist nach § 551 Abs. 3 BGB verpflichtet, die Kaution getrennt von seinem Privatvermögen bei einem Kreditinstitut zu dem für Spareinlagen mit dreimonatiger Kündigungsfrist üblichen Zinssatz anzulegen. Die Zinsen stehen dem Mieter zu und erhöhen die Sicherheit.
          </p>
        </div>
      </div>
    </div>
  );
}
