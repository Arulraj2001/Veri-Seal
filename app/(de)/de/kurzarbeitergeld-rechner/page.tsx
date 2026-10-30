import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Briefcase, Users, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyKugEngine } from '@/components/international/GermanyKugEngine';

export const metadata: Metadata = {
  title: 'Kurzarbeitergeld-Rechner 2026 (KUG § 105 SGB III) | Kagazo',
  description:
    'Berechnen Sie Ihr Kurzarbeitergeld (60% bzw. 67% mit Kindern) bei Arbeitsausfall und Kurzarbeit Null nach den Richtlinien der Bundesagentur für Arbeit.',
  alternates: {
    canonical: `${SITE_URL}/de/kurzarbeitergeld-rechner`,
  },
  openGraph: {
    title: 'Kurzarbeitergeld-Rechner 2026 (KUG § 105 SGB III) | Kagazo Deutschland',
    description:
      'Offizieller KUG-Rechner nach § 105 und § 106 SGB III : Nettoentgeltausfall, KUG-Auszahlung und Gesamteinkommen berechnen.',
    url: `${SITE_URL}/de/kurzarbeitergeld-rechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function KurzarbeitergeldPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kurzarbeitergeld-Rechner Deutschland',
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
      'Rechner für Kurzarbeitergeld (KUG) nach den gesetzlichen Bestimmungen des Dritten Buches Sozialgesetzbuch (SGB III).',
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
          <span>§ 105 SGB III • Bundesagentur für Arbeit • KUG 60% / 67%</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Kurzarbeitergeld-Rechner 2026 : KUG &amp; Nettoausfall berechnen
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Wird im Betrieb Kurzarbeit angeordnet, gleicht das von der Bundesagentur für Arbeit gezahlte Kurzarbeitergeld (KUG) einen Großteil des Verdienstausfalls aus. Ermitteln Sie Ihren Nettoentgeltausfall und Ihr Gesamteinkommen bei teilweiser Kurzarbeit oder Kurzarbeit Null.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyKugEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>Leistungssatz: 60% oder 67%?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arbeitnehmer ohne Kinder auf der Lohnsteuerkarte erhalten den regulären Leistungssatz von <strong>60%</strong> der Nettoentgeltdifferenz. Für Beschäftigte, bei denen mindestens ein Kind auf der elektronischen Lohnsteuerkarte eingetragen ist (Kinderfreibetrag mindestens 0,5), erhöht sich der Satz auf <strong>67%</strong> (erhöhter Leistungssatz nach § 105 SGB III).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Briefcase className="w-5 h-5" />
            <span>Progressionsvorbehalt beachten</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Das Kurzarbeitergeld selbst ist steuer- und sozialabgabenfrei. Es unterliegt jedoch dem <strong>steuerlichen Progressionsvorbehalt</strong> nach § 32b Abs. 1 Nr. 1 Buchst. a EStG. Bei Bezug von mehr als 410 € KUG im Kalenderjahr besteht eine gesetzliche Verpflichtung zur Abgabe einer Einkommensteuererklärung.
          </p>
        </div>
      </div>
    </div>
  );
}
