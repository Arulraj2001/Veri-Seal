import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, GraduationCap, Award, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyNotenEngine } from '@/components/international/GermanyNotenEngine';

export const metadata: Metadata = {
  title: 'Notenumrechner (Modifizierte Bayerische Formel) | Kagazo',
  description:
    'Rechnen Sie ausländische Noten (z.B. Schul-, Bachelor- oder Master-Zeugnisse) nach der offiziellen Modifizierten Bayerischen Formel der Kultusministerkonferenz (KMK) in das deutsche Notensystem (1,0 - 5,0) um.',
  alternates: {
    canonical: `${SITE_URL}/de/notenumrechner-bayerische-formel`,
  },
  openGraph: {
    title: 'Notenumrechner (Modifizierte Bayerische Formel) | Kagazo Deutschland',
    description:
      'Offizielle Notenumrechnung der KMK und Hochschulrektorenkonferenz für internationale Bildungsabschlüsse.',
    url: `${SITE_URL}/de/notenumrechner-bayerische-formel`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function NotenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Notenumrechner Modifizierte Bayerische Formel Deutschland',
    applicationCategory: 'EducationalApplication',
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
      'Offizielles Umrechnungstool für internationale Studien- und Schulnoten in das deutsche Notensystem gemäß Beschluss der Kultusministerkonferenz.',
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
          <span>Beschluss der Kultusministerkonferenz (KMK) • Hochschulrektorenkonferenz (HRK)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Notenumrechner : Modifizierte Bayerische Formel
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Für Bewerbungen an deutschen Universitäten (über uni-assist) oder die staatliche Anerkennung ausländischer Zeugnisse wenden die Prüfungsämter aller deutschen Bundesländer einheitlich die <strong>Modifizierte Bayerische Formel</strong> an, um ausländische Notensysteme linear in die deutsche Notenskala (1,0 bis 5,0) zu transformieren.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyNotenEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <GraduationCap className="w-5 h-5" />
            <span>Definition der deutschen Notenstufen</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            • 1,0 bis 1,5 = Sehr gut (eine hervorragende Leistung)<br />
            • 1,6 bis 2,5 = Gut (eine Leistung, die den Anforderungen voll entspricht)<br />
            • 2,6 bis 3,5 = Befriedigend (den durchschnittlichen Anforderungen entsprechend)<br />
            • 3,6 bis 4,0 = Ausreichend (Mängel, aber Grundkenntnisse vorhanden)<br />
            • über 4,0 = Nicht ausreichend / Nicht bestanden
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>Voraussetzungen für die korrekte Berechnung</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Für die Berechnung werden exakt drei Werte benötigt: Ihre tatsächliche Gesamtnote (Nd), die nach dem jeweiligen ausländischen System erreichbare Höchstnote (Nmax) und die Mindestnote, die zum Bestehen erforderlich ist (Nmin). Liegt Ihr System auf einer Prozentskala (0–100%), gilt in der Regel Nmax=100 und Nmin=50.
          </p>
        </div>
      </div>
    </div>
  );
}
