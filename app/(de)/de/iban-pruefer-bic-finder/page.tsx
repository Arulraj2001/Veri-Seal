import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Building2, CheckCircle2, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyIbanEngine } from '@/components/international/GermanyIbanEngine';

export const metadata: Metadata = {
  title: 'IBAN-Prüfer Deutschland & Bankleitzahl (BLZ) Finder | Kagazo',
  description:
    'Prüfen Sie deutsche IBANs (22 Zeichen) auf mathematische Gültigkeit nach dem ISO 13616 / MOD-97-10 Algorithmus und ermitteln Sie Bankleitzahl (BLZ), Kontonummer und Bankinstitut.',
  alternates: {
    canonical: `${SITE_URL}/de/iban-pruefer-bic-finder`,
  },
  openGraph: {
    title: 'IBAN-Prüfer Deutschland & Bankleitzahl (BLZ) Finder | Kagazo Deutschland',
    description:
      'Offizieller Prüfziffern-Check für deutsche IBANs und automatische Erkennung des Kreditinstituts nach dem Bundesbank-Verzeichnis.',
    url: `${SITE_URL}/de/iban-pruefer-bic-finder`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function IbanPrueferPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'IBAN-Prüfer und BLZ-Finder Deutschland',
    applicationCategory: 'BusinessApplication',
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
      'Prüfsummen-Rechner für deutsche IBANs nach ISO 13616 und Entschlüsselung von Bankleitzahl und Kontonummer.',
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
          <span>ISO 13616 • MOD-97-10 Prüfsumme • Deutsche Bundesbank BLZ-Register</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          IBAN-Prüfer Deutschland &amp; Bankleitzahl-Finder
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Vermeiden Sie teure Fehlüberweisungen und Rücklastschriften. Dieser Prüfer validiert deutsche IBANs (22 Zeichen) mittels der internationalen Modulo-97-Prüfziffer und schlüsselt die enthaltene 8-stellige Bankleitzahl (BLZ) und 10-stellige Kontonummer auf.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyIbanEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Aufbau der deutschen IBAN</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eine deutsche IBAN besteht aus exakt <strong>22 alphanumerischen Zeichen</strong> : Länderkennzeichen <code>DE</code> (2 Buchstaben), <strong>Prüfziffer</strong> (2 Ziffern), <strong>Bankleitzahl</strong> des Kreditinstituts (8 Ziffern) und der auf 10 Stellen mit führenden Nullen aufgefüllten <strong>Kontonummer</strong>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>Mathematischer Prüfziffern-Algorithmus</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nach ISO 7064 wird das Länderkürzel ans Ende verschoben, Buchstaben durch zweistellige Zahlen ersetzt (A=10 bis Z=35) und die resultierende lange Zahl durch 97 geteilt. Nur wenn der mathematische <strong>Divisionsrest exakt 1</strong> ergibt, ist die IBAN gültig und tippfehlerfrei.
          </p>
        </div>
      </div>
    </div>
  );
}
