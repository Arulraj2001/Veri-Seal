import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GermanyGenderFinderEngine } from '@/components/international/GermanyGenderFinderEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, GraduationCap, Languages } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Der Die Das Finder 2026 | Deutscher Artikel Rechner & Grammatikregeln',
  description:
    'Finden Sie sofort den richtigen deutschen Artikel (der, die oder das) für jedes Substantiv. Mit Pluralbildung, Genus-Suffix-Tabelle und Ausnahmeregeln nach Duden.',
  keywords: [
    'der die das finder',
    'deutscher artikel rechner',
    'der die das regeln tabelle',
    'artikel von nomen herausfinden',
    'deutsch artikel lernen endungen duden',
    'grammatik artikel pruefen online kostenlos',
    'genus von woertern bestimmen',
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
    title: 'Der Die Das Finder 2026 | Deutscher Artikel Rechner & Grammatikregeln',
    description:
      'Artikel von deutschen Wörtern sofort nachschlagen. Inklusive Pluralbildung und grammatikalischen Endungsregeln nach Duden.',
    url: `${SITE_URL}/de/der-die-das-finder`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Der Die Das Finder Deutschland 2026',
    description:
      'Deutsches Nomen-Geschlecht (Maskulinum, Femininum, Neutrum) per Knopfdruck bestimmen.',
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
        '@type': 'EducationalOccupationalCredential',
        name: 'Deutsche Grammatik- und Genus-Referenz',
        credentialCategory: 'Sprachzertifikat Deutsch (A1 bis C2)',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Kagazo Deutschland',
            item: `${SITE_URL}/de`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Der Die Das Finder',
            item: `${SITE_URL}/de/der-die-das-finder`,
          },
        ],
      },
    ],
  };

  const homonymMatrix = [
    { wort: 'See', artikel1: 'der See', bedeutung1: 'Binnengewässer (z. B. der Bodensee)', artikel2: 'die See', bedeutung2: 'Das offene Meer / Ozean (z. B. die Nordsee)' },
    { wort: 'Teil', artikel1: 'der Teil', bedeutung1: 'Anteil oder Abschnitt eines Ganzen', artikel2: 'das Teil', bedeutung2: 'Einzelnes Ding, Zubehör oder Ersatzteil' },
    { wort: 'Schild', artikel1: 'der Schild', bedeutung1: 'Schutzwaffe von Rittern oder Kriegern', artikel2: 'das Schild', bedeutung2: 'Hinweisschild, Straßenschild, Namensschild' },
    { wort: 'Verdienst', artikel1: 'der Verdienst', bedeutung1: 'Das erarbeitete Einkommen / Gehalt', artikel2: 'das Verdienst', bedeutung2: 'Eine anerkennenswerte Leistung / Ehre' },
    { wort: 'Band', artikel1: 'der Band', bedeutung1: 'Ein Buchband einer Schriftenreihe', artikel2: 'das Band', bedeutung2: 'Schnur, Textilband oder Klebeband' },
  ];

  const faqs = [
    {
      q: 'An welchen Endungen erkennt man verlässlich feminine Nomen (die)?',
      a: 'Im Deutschen verlangen Substantive mit den Suffixen -ung (die Heizung), -heit (die Gesundheit), -keit (die Schnelligkeit), -schaft (die Landschaft), -tät (die Qualität), -ion (die Station), -ik (die Politik), -ur (die Natur) und -ei (die Bäckerei) zu über 99 % den bestimmten Artikel „die“.',
    },
    {
      q: 'Welche Nomen sind im Deutschen immer sächlich (das)?',
      a: 'Ausnahmslos neutral sind alle Verkleinerungsformen mit den Diminutiven -chen und -lein (das Mädchen, das Häuschen), alle substantivierten Verben (das Essen, das Schwimmen), fast alle chemischen Elemente und Metalle (das Gold, das Eisen) sowie Fremdwörter auf -ment (das Dokument) und -um (das Museum).',
    },
    {
      q: 'Welcher Artikel gilt bei zusammengesetzten Nomen (Komposita)?',
      a: 'Bei Komposita gilt im Deutschen eine eiserne Grundregel: Das letzte Teilwort (Grundwort) bestimmt immer das Genus und damit den Artikel des gesamten zusammengesetzten Wortes. Beispiel: der Tisch + die Decke = die Tischdecke; das Auto + die Tür = die Autotür.',
    },
    {
      q: 'Warum heißt es "das Mädchen", obwohl es ein weibliches Wesen ist?',
      a: 'Im Deutschen herrscht ein strikter Unterschied zwischen natürlichem Geschlecht (Sexus) und grammatikalischem Geschlecht (Genus). Das Wort „Mädchen“ ist historisch eine Diminutivform (Verkleinerung mit dem Suffix -chen). Im Deutschen erzwingen alle Diminutive grammatikalisch zwingend das Neutrum („das“).',
    },
    {
      q: 'Welche Nomen sind fast immer maskulin (der)?',
      a: 'Maskulin sind alle Tage, Monate und Jahreszeiten (der Montag, der Januar, der Sommer), Himmelsrichtungen und Winde (der Norden, der Föhn), Automarken (der BMW, der Audi, der VW) sowie Nomen mit den Endungen -ling (der Lehrling), -ismus (der Realismus), -or (der Motor) und -ist (der Journalist).',
    },
  ];

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Duden-konforme Nomen-Erkennung &amp; Endungsregeln</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Der Die Das Finder: Artikel schnell &amp; sicher prüfen
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Geben Sie ein beliebiges deutsches Substantiv ein, um sofort den richtigen Artikel (der, die oder das),
            die korrekte Pluralform und die zugrunde liegende grammatikalische Regel zu erhalten.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie erkennt man den richtigen deutschen Artikel?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Deutsche Artikel richten sich primär nach Wortendungen: Endungen auf <em>-ung, -heit, -keit, -schaft, -tät, -ion</em> sind immer feminin (<strong>die</strong>). Nomen auf <em>-ling, -or, -ismus, -ist</em> sind maskulin (<strong>der</strong>). Verkleinerungsformen auf <em>-chen, -lein</em> und Fremdwörter auf <em>-ment, -um</em> sind ausnahmslos neutral (<strong>das</strong>).
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyGenderFinderEngine />

        {/* Worked Matrix: Homonyms with Different Articles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Achtung Bedeutungswechsel: Wörter mit unterschiedlichem Artikel
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Häufige Stolperfallen der deutschen Grammatik
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nomen</th>
                  <th className="py-3 px-4 text-blue-800 font-bold">Variante 1</th>
                  <th className="py-3 px-4 text-slate-600">Bedeutung 1</th>
                  <th className="py-3 px-4 text-rose-800 font-bold">Variante 2</th>
                  <th className="py-3 px-4 text-slate-600">Bedeutung 2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {homonymMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.wort}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-800 bg-blue-50/20">{row.artikel1}</td>
                    <td className="py-3 px-4 text-slate-700">{row.bedeutung1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-800 bg-rose-50/20">{row.artikel2}</td>
                    <td className="py-3 px-4 text-slate-700">{row.bedeutung2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur deutschen Artikelzuordnung</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cluster Cross-Links */}
        <div className="p-6 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider font-mono">
              Verwandte Bildungswerkzeuge &amp; Dokument-Tools
            </h3>
            <span className="text-xs text-slate-500 font-medium">Praktisch für Alltag &amp; Studium</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/notenumrechner-bayerische-formel"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Notenumrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/passfoto-generator-biometrisch"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Biometrisches Passfoto</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/pdf-kompressor-online-antraege"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>PDF-Kompressor</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rechnungsvorlage PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

