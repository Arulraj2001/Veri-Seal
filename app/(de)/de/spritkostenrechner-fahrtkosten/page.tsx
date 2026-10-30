import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Fuel, Users, Car } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanySpritkostenEngine } from '@/components/international/GermanySpritkostenEngine';

export const metadata: Metadata = {
  title: 'Spritkostenrechner : Fahrtkosten & Fahrgemeinschaft | Kagazo',
  description:
    'Berechnen Sie den Benzin- und Dieselverbrauch, die gesamten Spritkosten und die faire Kostenaufteilung pro Person für Fahrgemeinschaften und Urlaubsfahrten.',
  alternates: {
    canonical: `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
  },
  openGraph: {
    title: 'Spritkostenrechner : Fahrtkosten & Fahrgemeinschaft | Kagazo Deutschland',
    description:
      'Kostenloser Rechner für Kraftstoffkosten, Verbrauch auf 100 km und Kilometerpreise in Deutschland.',
    url: `${SITE_URL}/de/spritkostenrechner-fahrtkosten`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function SpritkostenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Spritkostenrechner und Fahrtkosten-Kalkulator Deutschland',
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
      'Rechner für Spritkosten, Kraftstoffbedarf und faire Aufteilung der Reisekosten auf Mitfahrer.',
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
          <span>Fahrtkosten-Kalkulation • Fahrgemeinschaften • Kilometerpreis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Spritkostenrechner : Benzinkosten &amp; Fahrgemeinschaft
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Berechnen Sie schnell und transparent den Kraftstoffbedarf für eine Autofahrt, die Gesamtkosten an der Tankstelle sowie den fairen Anteil pro Mitfahrer bei Fahrgemeinschaften oder gemeinsamen Urlaubsreisen.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanySpritkostenEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Fuel className="w-5 h-5" />
            <span>Formel zur Berechnung des Benzinverbrauchs</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            Verbrauch in Litern = (Strecke in km × Durchschnittsverbrauch in l/100km) / 100<br />
            Gesamtkosten = Verbrauch in Litern × Kraftstoffpreis pro Liter
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>Steuerlicher Hinweis zu Fahrgemeinschaften</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Auch als Teilnehmer einer Fahrgemeinschaft zur Arbeit können Sie die <strong>Entfernungspauschale (Pendlerpauschale)</strong> von 0,30 € für die ersten 20 km und 0,38 € ab dem 21. km in Ihrer Steuererklärung geltend machen, unabhängig davon, wer an welchem Tag gefahren ist (bis zum Höchstbetrag von 4.500 € pro Jahr für Mitfahrer).
          </p>
        </div>
      </div>
    </div>
  );
}
