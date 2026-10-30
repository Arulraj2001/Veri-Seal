import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Home, AlertCircle, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyMieterhoehungEngine } from '@/components/international/GermanyMieterhoehungEngine';

export const metadata: Metadata = {
  title: 'Mieterhöhung & Kappungsgrenze Rechner (§ 558 BGB) | Kagazo',
  description:
    'Prüfen Sie die Rechtmäßigkeit einer Mieterhöhung nach § 558 BGB : 15% Kappungsgrenze in Gebieten mit angespanntem Wohnungsmarkt vs. 20% regulär und Mietspiegel-Abgleich.',
  alternates: {
    canonical: `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
  },
  openGraph: {
    title: 'Mieterhöhung & Kappungsgrenze Rechner (§ 558 BGB) | Kagazo Deutschland',
    description:
      'Rechner zur Überprüfung von Mieterhöhungen bis zur ortsüblichen Vergleichsmiete und gesetzlichen Kappungsgrenzen.',
    url: `${SITE_URL}/de/mieterhoehung-kappungsgrenze-rechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function MieterhoehungPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mieterhöhungs- und Kappungsgrenzen-Rechner Deutschland',
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
      'Rechner für die gesetzliche Mieterhöhung nach § 558 BGB, Mietspiegel und 15% bzw. 20% Kappungsgrenze im deutschen Mietrecht.',
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
          <span>§ 558 BGB • Mietspiegel • 15% / 20% Kappungsgrenze</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Mieterhöhungs-Rechner : Kappungsgrenze nach § 558 BGB
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Vermieter dürfen die Miete nicht beliebig anheben. Das Bürgerliche Gesetzbuch schützt Mieter durch zwei Barrieren: die Miete darf maximal bis zur <strong>ortsüblichen Vergleichsmiete</strong> steigen und darf sich innerhalb von drei Jahren um nicht mehr als <strong>20% (bzw. 15% in Gebieten mit Mietpreisbremse)</strong> erhöhen.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyMieterhoehungEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Home className="w-5 h-5" />
            <span>Gesetzliche Jahressperrfrist (§ 558 Abs. 1 BGB)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ein Mieterhöhungsverlangen ist erst zulässig, wenn die Miete zu dem Zeitpunkt, zu dem die Erhöhung eintreten soll, seit <strong>mindestens 15 Monaten unverändert</strong> war. Frühestens ein Jahr nach der letzten Mieterhöhung darf der Vermieter die nächste Erhöhung überhaupt ankündigen.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Wo gilt die abgesenkte 15%-Kappungsgrenze?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In Hunderten deutschen Städten und Kommunen mit angespanntem Wohnungsmarkt (darunter Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart) haben die Landesregierungen per Verordnung die Kappungsgrenze von 20% auf <strong>15% abgesenkt</strong>. Innerhalb von drei Jahren darf die Nettokaltmiete dort maximal um 15% steigen.
          </p>
        </div>
      </div>
    </div>
  );
}
