import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyGenderFinderEngine } from '@/components/international/GermanyGenderFinderEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Der Die Das Finder & Artikel Rechner Deutsch | Kostenlos',
  description:
    'Finden Sie sofort den richtigen deutschen Artikel (der, die oder das) für jedes Substantiv. Mit Pluralform und grammatikalischen Endungsregeln.',
  keywords: [
    'der die das finder',
    'deutscher artikel rechner',
    'der die das regeln tabelle',
    'artikel von nomen herausfinden',
    'deutsch artikel lernen endungen',
    'grammatik artikel pruefen online',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/der-die-das-finder`,
    languages: {
      'de-DE': `${SITE_URL}/de/der-die-das-finder`,
      'de-AT': `${SITE_URL}/de/der-die-das-finder`,
      'de-CH': `${SITE_URL}/de/der-die-das-finder`,
      'de': `${SITE_URL}/de/der-die-das-finder`,
      'x-default': `${SITE_URL}/de/der-die-das-finder`,
    },
  },
  openGraph: {
    title: 'Der Die Das Finder & Artikel Rechner Deutsch | Kostenlos',
    description:
      'Artikel von deutschen Wörtern sofort nachschlagen. Inklusive Pluralbildung und grammatikalischen Endungsregeln nach Duden.',
    url: `${SITE_URL}/de/der-die-das-finder`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
};

export default function GermanyGenderFinderPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Der Die Das Finder - Deutscher Artikel Rechner',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Online-Werkzeug zur schnellen Ermittlung des grammatikalischen Geschlechts deutscher Nomen (Maskulinum, Femininum, Neutrum) anhand von Duden-Wortlisten und Suffix-Heuristiken.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'An welchen Endungen erkennt man feminine Nomen (die)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Substantive mit den Suffixen -ung, -heit, -keit, -schaft, -tät, -ion, -ik, -ur und -ei sind im Deutschen nahezu ausnahmslos feminin und verlangen stets den bestimmten Artikel „die“ (z. B. die Wohnung, die Freiheit, die Möglichkeit).',
            },
          },
          {
            '@type': 'Question',
            name: 'Welche Nomen sind immer sächlich (das)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Verkleinerungsformen mit den Diminutiv-Endungen -chen und -lein (z. B. das Mädchen, das Brötchen), substantivierte Infinitive (das Leben, das Essen) sowie Lehnwörter auf -ment oder -um (das Dokument, das Museum) sind ausnahmslos neutral.',
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
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Der Die Das Finder</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <span>Duden-konforme Nomen-Erkennung & Endungsregeln</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Der Die Das Finder: Artikel schnell prüfen
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Geben Sie ein beliebiges deutsches Substantiv ein, um sofort den richtigen Artikel (der, die oder das),
            die korrekte Pluralform und die zugrunde liegende grammatikalische Regel zu erhalten.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-amber-50/60 border-l-4 border-amber-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Deutsche Artikel-Erkennung
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Deutsche Artikel lassen sich verlässlich an Wortendungen ablesen: -ung, -heit, -keit und -schaft sind feminin (die);
            -chen, -lein, -ment und -um sind neutral (das); -ling, -ismus, -or und -ist sind maskulin (der).
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyGenderFinderEngine />

        {/* Grammatical Suffix Master Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Übersicht der verlässlichen Artikel-Endungen im Deutschen
            </h2>
            <p className="text-sm text-slate-600">
              Prägen Sie sich diese grammatikalischen Suffixe ein, um Artikel ohne Wörterbuch treffsicher zu bestimmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-blue-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                <span className="text-base font-bold text-blue-900">Maskulin (DER)</span>
                <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">männlich</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li><strong>-ling :</strong> der Frühling, der Schmetterling</li>
                <li><strong>-ismus :</strong> der Optimismus, der Tourismus</li>
                <li><strong>-or :</strong> der Motor, der Reaktor</li>
                <li><strong>-ist :</strong> der Polizist, der Tourist</li>
                <li><strong>-ant / -ent :</strong> der Praktikant, der Student</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                <span className="text-base font-bold text-rose-900">Feminin (DIE)</span>
                <span className="text-xs font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">weiblich</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li><strong>-ung :</strong> die Wohnung, die Zeitung</li>
                <li><strong>-heit / -keit :</strong> die Freiheit, die Fähigkeit</li>
                <li><strong>-schaft :</strong> die Freundschaft, die Mannschaft</li>
                <li><strong>-tät :</strong> die Universität, die Realität</li>
                <li><strong>-ion :</strong> die Information, die Region</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span className="text-base font-bold text-emerald-900">Neutrum (DAS)</span>
                <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">sächlich</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li><strong>-chen / -lein :</strong> das Mädchen, das Fräulein</li>
                <li><strong>-ment :</strong> das Dokument, das Instrument</li>
                <li><strong>-um :</strong> das Zentrum, das Museum</li>
                <li><strong>-tum :</strong> das Eigentum, das Wachstum</li>
                <li><strong>Substantivierte Verben :</strong> das Essen, das Leben</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Schreiben Sie Rechnungen als Freiberufler oder Kleinunternehmer?</h3>
            <p className="text-xs text-slate-400">
              Erstellen Sie rechtssichere Rechnungen nach § 19 UStG ohne Umsatzsteuer direkt als PDF.
            </p>
          </div>
          <Link
            href="/de/kleinunternehmer-rechnung"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Kleinunternehmer Rechnung</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

