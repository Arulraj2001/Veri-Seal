import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Camera, CheckCircle2, FileCheck } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyPassfotoEngine } from '@/components/international/GermanyPassfotoEngine';

export const metadata: Metadata = {
  title: 'Biometrisches Passfoto Generator 35×45 mm Kostenlos | Kagazo',
  description:
    'Erstellen und schneiden Sie biometrische Passbilder nach der offiziellen Fotomustertafel der Bundesdruckerei für Personalausweis, Reisepass und Führerschein. Export als 10×15 cm Druckbogen.',
  alternates: {
    canonical: `${SITE_URL}/de/passfoto-generator-biometrisch`,
  },
  openGraph: {
    title: 'Biometrisches Passfoto Generator 35×45 mm Kostenlos | Kagazo Deutschland',
    description:
      'Passbild-Schablone nach Bundesdruckerei-Vorgaben für Personalausweis und Reisepass. 100% lokal im Browser.',
    url: `${SITE_URL}/de/passfoto-generator-biometrisch`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function PassfotoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Biometrischer Passfoto-Generator Deutschland',
    applicationCategory: 'MultimediaApplication',
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
      'Online-Generator für biometrische Passbilder (35×45 mm) nach den Kriterien der Passverordnung und der Bundesdruckerei.',
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
          <span>Fotomustertafel Bundesdruckerei • BMI Vorgaben • 35×45 mm Passbild</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Biometrisches Passfoto erstellen (35×45 mm) nach Bundesdruckerei-Norm
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Erstellen Sie aus einem einfachen Smartphone-Porträtfoto ein amtlich konformes Passbild für den deutschen Personalausweis, Reisepass oder Führerschein. Mit der visuellen Biometrie-Schablone zentrieren Sie Gesichtshöhe (32–36 mm) und Augenlinie präzise und drucken 6 Fotos auf einem Standard-Fotobogen (10×15 cm).
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyPassfotoEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Camera className="w-5 h-5" />
            <span>Kriterien der Bundesdruckerei für Bürgeramt und Ausweis</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Damit das Bürgeramt das Bild akzeptiert: Das Gesicht muss <strong>70% bis 80% des Bildes</strong> einnehmen (32 bis 36 mm von Kinnspitze bis Schädeldecke). Die Person muss frontal in die Kamera blicken, mit neutralem Gesichtsausdruck und geschlossenem Mund. Der Hintergrund muss einfarbig hell (ideal hellgrau), schattenfrei und ohne Muster sein.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <FileCheck className="w-5 h-5" />
            <span>Datenschutz &amp; Privatsphäre nach DSGVO</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ihre biometrischen Bilddaten und privaten Fotos werden <strong>niemals auf einen externen Server übertragen</strong>. Das Zuschneiden und Rendern auf dem 10×15 cm Druckbogen erfolgt zu 100% lokal im Arbeitsspeicher Ihres Webbrowsers via Canvas-Technologie.
          </p>
        </div>
      </div>
    </div>
  );
}
