import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Globe2, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { KagazoLogo } from '@/components/ui/KagazoLogo';

export const metadata: Metadata = {
  title: 'Offizielle Online-Rechner & Werkzeuge Deutschland 2026 | Kagazo',
  description:
    'Vollständige Suite rechtssicherer Rechner nach deutschem Steuer- und Arbeitsrecht: Brutto-Netto 2026, Firmenwagen 1%-Regelung, Abfindung § 34 EStG, Notarkosten GNotKG, Grunderwerbsteuer und biometrisches Passfoto.',
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: {
      'de-DE': `${SITE_URL}/de`,
      'de': `${SITE_URL}/de`,
      'x-default': `${SITE_URL}/de`,
    },
  },
  openGraph: {
    title: 'Offizielle Online-Rechner & Werkzeuge Deutschland 2026 | Kagazo',
    description:
      'Präzisionsrechner für Arbeitnehmer, Selbstständige, Mieter und Immobilienkäufer nach § 32a EStG, BGB und GNotKG.',
    url: `${SITE_URL}/de`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
};

export default function GermanHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-amber-500/20 selection:text-amber-950 font-sans">
      {/* Precision Editorial Header with Real Brand Logo */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/de" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center p-1 rounded-xl bg-amber-500/10 border border-amber-500/20 group-hover:scale-105 transition-transform">
                <KagazoLogo className="w-7 h-7" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-black tracking-tight text-lg text-slate-950">
                    Kagazo
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-amber-600 text-white font-mono">
                    Deutschland
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block font-mono font-medium">
                  Portal für Steuern, Gehalt &amp; Recht 2026
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 border-l border-slate-200 pl-4 transition-colors"
            >
              <span>&larr; Kagazo Global</span>
            </Link>
          </div>

          {/* Categorized Navigation Bar */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700">
            <Link
              href="/de/brutto-netto-rechner"
              className="hover:text-amber-600 transition-colors"
            >
              Brutto-Netto
            </Link>
            <Link
              href="/de/firmenwagenrechner"
              className="hover:text-amber-600 transition-colors"
            >
              Firmenwagen
            </Link>
            <Link
              href="/de/notar-und-grundbuchkostenrechner"
              className="hover:text-amber-600 transition-colors"
            >
              Notarkosten
            </Link>
            <Link
              href="/de/abfindungsrechner"
              className="hover:text-amber-600 transition-colors"
            >
              Abfindung
            </Link>
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="hover:text-amber-600 transition-colors"
            >
              Rechnung § 19
            </Link>
            <Link
              href="/de/iban-pruefer-bic-finder"
              className="hover:text-amber-600 transition-colors"
            >
              IBAN-Prüfer
            </Link>
          </nav>

          {/* Language Switcher Badge */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Globe2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Deutsch</span>
            </div>
            <Link
              href="/es"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            >
              ES
            </Link>
            <Link
              href="/fr"
              className="hidden sm:inline-block text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            >
              FR
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Comprehensive Categorized Statutory Footer */}
      <footer className="border-t border-slate-200 bg-white py-14 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* 4 Category Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Category 1 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-amber-700">
                1. Gehalt &amp; Steuern
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/de/brutto-netto-rechner" className="hover:text-amber-600 transition-colors">
                    Brutto-Netto-Rechner 2026
                  </Link>
                </li>
                <li>
                  <Link href="/de/abfindungsrechner" className="hover:text-amber-600 transition-colors">
                    Abfindungsrechner (§ 34 EStG)
                  </Link>
                </li>
                <li>
                  <Link href="/de/stundenlohnrechner" className="hover:text-amber-600 transition-colors">
                    Stundenlohn &amp; Mindestlohn 12,82 €
                  </Link>
                </li>
                <li>
                  <Link href="/de/firmenwagenrechner" className="hover:text-amber-600 transition-colors">
                    Firmenwagenrechner (1%-Regelung)
                  </Link>
                </li>
                <li>
                  <Link href="/de/kurzarbeitergeld-rechner" className="hover:text-amber-600 transition-colors">
                    Kurzarbeitergeld-Rechner (KUG)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-amber-700">
                2. Immobilien &amp; Miete
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/de/notar-und-grundbuchkostenrechner" className="hover:text-amber-600 transition-colors">
                    Notar- &amp; Grundbuchkosten (GNotKG)
                  </Link>
                </li>
                <li>
                  <Link href="/de/grunderwerbsteuer-rechner" className="hover:text-amber-600 transition-colors">
                    Grunderwerbsteuer nach Bundesländern
                  </Link>
                </li>
                <li>
                  <Link href="/de/mieterhoehung-kappungsgrenze-rechner" className="hover:text-amber-600 transition-colors">
                    Mieterhöhung &amp; Kappungsgrenze (§ 558 BGB)
                  </Link>
                </li>
                <li>
                  <Link href="/de/baufinanzierung-tilgungsrechner" className="hover:text-amber-600 transition-colors">
                    Baufinanzierung &amp; Tilgungsplan
                  </Link>
                </li>
                <li>
                  <Link href="/de/mietkautionsrechner" className="hover:text-amber-600 transition-colors">
                    Mietkaution (3 Nettokaltmieten § 551)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-amber-700">
                3. Behörden &amp; Dokumente
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/de/kleinunternehmer-rechnung" className="hover:text-amber-600 transition-colors">
                    Kleinunternehmer-Rechnung PDF (§ 19 UStG)
                  </Link>
                </li>
                <li>
                  <Link href="/de/der-die-das-finder" className="hover:text-amber-600 transition-colors">
                    Der Die Das Finder &amp; Artikel-Grammatik
                  </Link>
                </li>
                <li>
                  <Link href="/de/passfoto-generator-biometrisch" className="hover:text-amber-600 transition-colors">
                    Biometrisches Passfoto (35×45 mm)
                  </Link>
                </li>
                <li>
                  <Link href="/de/iban-pruefer-bic-finder" className="hover:text-amber-600 transition-colors">
                    IBAN-Prüfer &amp; BLZ-Finder Deutschland
                  </Link>
                </li>
                <li>
                  <Link href="/de/pdf-kompressor-online-antraege" className="hover:text-amber-600 transition-colors">
                    PDF-Kompressor Behörden &amp; Arbeitsagentur
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-mono text-amber-700">
                4. Gewerbe &amp; Alltag
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/de/gewerbesteuerrechner" className="hover:text-amber-600 transition-colors">
                    Gewerbesteuerrechner nach Hebesatz
                  </Link>
                </li>
                <li>
                  <Link href="/de/skontorechner" className="hover:text-amber-600 transition-colors">
                    Skontorechner &amp; Jahreszins-Formel
                  </Link>
                </li>
                <li>
                  <Link href="/de/notenumrechner-bayerische-formel" className="hover:text-amber-600 transition-colors">
                    Notenumrechner (Bayerische Formel)
                  </Link>
                </li>
                <li>
                  <Link href="/de/rabatt-prozent-rechner" className="hover:text-amber-600 transition-colors">
                    Prozentrechner Rabatt &amp; MwSt
                  </Link>
                </li>
                <li>
                  <Link href="/de/spritkostenrechner-fahrtkosten" className="hover:text-amber-600 transition-colors">
                    Spritkostenrechner für Fahrten &amp; Pendler
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* E-E-A-T & Statutory Standards Declaration */}
          <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-700 border border-amber-200/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[11px] text-slate-500 leading-snug">
                <p className="font-bold text-slate-900">
                  Berechnungsgrundlagen nach den offiziellen Gesetzen der Bundesrepublik Deutschland 2026
                </p>
                <p>
                  Quellen: Einkommensteuergesetz (EStG), Bürgerliches Gesetzbuch (BGB), GNotKG, Mindestlohngesetz (MiLoG) und Bundesdruckerei.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-medium text-slate-500">
              <Link href="/de" className="hover:text-slate-900 transition-colors">
                Portal Deutschland
              </Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                Impressum &amp; Nutzungsbedingungen
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                Datenschutz (DSGVO)
              </Link>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} Kagazo Deutschland. Alle Rechte vorbehalten. 100% lokale Verarbeitung ohne Serverübertragung.
          </div>
        </div>
      </footer>
    </div>
  );
}
