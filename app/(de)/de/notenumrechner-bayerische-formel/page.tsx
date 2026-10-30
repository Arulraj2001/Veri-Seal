import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, GraduationCap, Award, BookOpen, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, School } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyNotenEngine } from '@/components/international/GermanyNotenEngine';

export const metadata: Metadata = {
  title: 'Notenumrechner (Modifizierte Bayerische Formel) | KMK-Standard',
  description:
    'Rechnen Sie ausländische Noten (Schul-, Bachelor- oder Master-Zeugnisse) nach der offiziellen Modifizierten Bayerischen Formel der Kultusministerkonferenz (KMK) in das deutsche Notensystem (1,0 - 5,0) um. Anerkannt für uni-assist.',
  keywords: [
    'notenumrechner bayerische formel kmk',
    'modifizierte bayerische formel uni assist',
    'gpa in deutsches notensystem umrechnen',
    'auslaendische noten umrechnen bachelor master',
    'bayerische formel rechner prozent punkte',
    'anabin noten umrechnen darmstadt muenchen',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/notenumrechner-bayerische-formel`,
    languages: {
      'de-DE': `${SITE_URL}/de/notenumrechner-bayerische-formel`,
      'de': `${SITE_URL}/de/notenumrechner-bayerische-formel`,
      'x-default': `${SITE_URL}/de/notenumrechner-bayerische-formel`,
    },
  },
  openGraph: {
    title: 'Notenumrechner (Modifizierte Bayerische Formel) | KMK-Standard',
    description:
      'Offizielle Notenumrechnung der KMK und Hochschulrektorenkonferenz für internationale Bildungsabschlüsse.',
    url: `${SITE_URL}/de/notenumrechner-bayerische-formel`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notenumrechner Modifizierte Bayerische Formel',
    description:
      'Internationale Schul- und Studienabschlüsse in deutsche Noten (1,0 bis 4,0) umrechnen.',
  },
};

export default function NotenPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Notenumrechner Modifizierte Bayerische Formel Deutschland',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Offizielles Umrechnungstool für internationale Studien- und Schulnoten in das deutsche Notensystem gemäß Beschluss der Kultusministerkonferenz.',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Zeugnisbewertung & Hochschulzugangsprüfung',
        credentialCategory: 'Akademische Notenanerkennung nach KMK-Richtlinie',
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
            name: 'Notenumrechner',
            item: `${SITE_URL}/de/notenumrechner-bayerische-formel`,
          },
        ],
      },
    ],
  };

  const systemsMatrix = [
    { system: 'USA / GPA (Skala 0–4.0, Pass 2.0)', note1: 'GPA 4.0 -> 1,0', note2: 'GPA 3.5 -> 1,75', note3: 'GPA 3.0 -> 2,5', note4: 'GPA 2.5 -> 3,25', note5: 'GPA 2.0 -> 4,0' },
    { system: 'UK Honours (0–100 %, Pass 40 %)', note1: '70 % (1st) -> 1,0', note2: '60 % (2:1) -> 2,0', note3: '55 % -> 2,5', note4: '50 % (2:2) -> 3,0', note5: '40 % (3rd) -> 4,0' },
    { system: 'Frankreich (Skala 0–20, Pass 10)', note1: '16/20 -> 1,6', note2: '14/20 -> 2,2', note3: '13/20 -> 2,5', note4: '12/20 -> 2,8', note5: '10/20 -> 4,0' },
    { system: 'Italien (Skala 0–30, Pass 18)', note1: '30/30 -> 1,0', note2: '27/30 -> 1,75', note3: '24/30 -> 2,5', note4: '21/30 -> 3,25', note5: '18/30 -> 4,0' },
    { system: 'Spanien (Skala 0–10, Pass 5.0)', note1: '10/10 -> 1,0', note2: '8.5/10 -> 1,9', note3: '7.5/10 -> 2,5', note4: '6.5/10 -> 3,1', note5: '5.0/10 -> 4,0' },
  ];

  const faqs = [
    {
      q: 'Wie lautet die mathematische Formel der Modifizierten Bayerischen Formel?',
      a: 'Die offizielle KMK-Formel lautet: Note = 1 + 3 × [(Nmax - Nd) / (Nmax - Nmin)]. Dabei ist Nmax die bestmögliche Note des ausländischen Systems, Nmin die Mindestnote zum Bestehen und Nd die tatsächliche Note des Absolventen. Ergibt die Formel rechnerisch einen Wert unter 1,0, wird auf 1,0 gedeckelt. Ein Wert über 4,0 gilt als nicht bestanden.',
    },
    {
      q: 'Wird diese Formel von uni-assist und deutschen Universitäten offiziell anerkannt?',
      a: 'Ja. Die Modifizierte Bayerische Formel beruht auf einem Beschluss der Ständigen Konferenz der Kultusminister der Länder (KMK). Sie ist der verbindliche Bewertungsmaßstab für alle staatlichen deutschen Universitäten, Fachhochschulen und uni-assist e.V. bei der Feststellung der deutschen Gesamtnote internationaler Bewerber.',
    },
    {
      q: 'Wie werden die Notenstufen im deutschen Hochschulsystem verbal eingeteilt?',
      a: 'Das deutsche Notensystem gliedert sich in: 1,0 bis 1,5 = Sehr gut (eine hervorragende Leistung); 1,6 bis 2,5 = Gut (eine Leistung, die den Anforderungen voll entspricht); 2,6 bis 3,5 = Befriedigend (eine Leistung, die durchschnittlichen Anforderungen entspricht); 3,6 bis 4,0 = Ausreichend (trotz Mängeln noch bestanden); über 4,0 = Nicht ausreichend (nicht bestanden).',
    },
    {
      q: 'Wie wird das Ergebnis gerundet?',
      a: 'Nach den meisten deutschen Prüfungsordnungen wird die errechnete Note nach der ersten Dezimalstelle ohne Rundung abgeschnitten oder auf die nächste Zehntelstelle kaufmännisch gerundet (z. B. 1,76 wird zu 1,8). Eine Aufrundung zum Nachteil des Bewerbers ist unzulässig.',
    },
    {
      q: 'Was tun, wenn das Herkunftsland ein umgekehrtes Notensystem hat (1 ist schlechteste Note)?',
      a: 'Die Modifizierte Bayerische Formel funktioniert universell für alle linearen Skalen. Bei Systemen, in denen die beste Note den numerisch kleinsten Wert hat (wie in Österreich oder der Schweiz), werden Nmax und Nmin in der Formel vertauscht, sodass die proportionale Lage zwischen Bestnote und Bestehensgrenze exakt erhalten bleibt.',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Notenumrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beschluss der Kultusministerkonferenz (KMK) &bull; Hochschulrektorenkonferenz (HRK)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Notenumrechner: Modifizierte Bayerische Formel
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Für Bewerbungen an deutschen Universitäten (über uni-assist) oder die staatliche Anerkennung ausländischer Zeugnisse wenden die Prüfungsämter aller deutschen Bundesländer einheitlich die <strong>Modifizierte Bayerische Formel</strong> an, um ausländische Notensysteme linear in die deutsche Notenskala (1,0 bis 5,0) zu transformieren.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie funktioniert die Modifizierte Bayerische Formel?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Die offizielle KMK-Formel lautet: <code>x = 1 + 3 &times; [(Nmax - Nd) / (Nmax - Nmin)]</code>. Bei einem US-GPA von 3,5 (Skala 2,0 bis 4,0) ergibt sich genau: <code>1 + 3 &times; [(4,0 - 3,5) / 2,0] = 1,75</code> (in Deutschland Note <strong>1,7 - 1,8 / Gut</strong>). Sie wird von uni-assist und allen deutschen Universitäten angewandt.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyNotenEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Vergleichstabelle: Internationale Noten im deutschen System
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Berechnet nach den offiziellen Vorgaben der KMK
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Herkunftsland &amp; Notensystem</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">Sehr gut (~1,0 - 1,5)</th>
                  <th className="py-3 px-4 text-blue-800 font-bold">Gut (~1,6 - 2,5)</th>
                  <th className="py-3 px-4 text-slate-700">Befriedigend (~2,6 - 3,5)</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Ausreichend (4,0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {systemsMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.system}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/20">{row.note1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-800">{row.note2}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.note4}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">{row.note5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Rechtliche Grundlagen der Zeugnisanerkennung in Deutschland
            </h2>
            <p>
              In Deutschland liegt die Kultur- und Bildungshoheit nach dem Grundgesetz bei den 16 Bundesländern. Um dennoch einheitliche Maßstäbe für Hochschulzulassung und Berufsqualifikationen zu sichern, koordiniert die <strong>Kultusministerkonferenz (KMK)</strong> über die <em>Zentrale für ausländisches Bildungswesen (ZAB)</em> die Umrechnungskriterien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <School className="w-4 h-4 text-amber-600" />
                <span>Rolle von uni-assist e.V.</span>
              </div>
              <p className="text-xs">
                Über 180 deutsche Hochschulen nutzen uni-assist e.V. als zentrale Vorprüfungsstelle für internationale Studienbewerbungen. uni-assist prüft die Echtheit der eingereichten Zeugnisse und errechnet die Vorprüfungsdokumentation (VPD) exakt anhand der Modifizierten Bayerischen Formel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Bestehensgrenze als Referenzanker</span>
              </div>
              <p className="text-xs">
                Der entscheidende Hebel der Formel ist die gesetzliche Mindestnote zum Bestehen (Nmin). Ohne Kenntnis von Nmin ist eine seriöse Umrechnung unmöglich. In vielen Ländern reicht eine Leistung von 50 % zum Bestehen aus, während in anderen Ländern erst ab 60 % bestanden wird.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zur Notenumrechnung</span>
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
              Verwandte Bildungs- &amp; Bewerbungswerkzeuge
            </h3>
            <span className="text-xs text-slate-500 font-medium">Praktisch für Studium, Bewerbung &amp; Zeugnisse</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/der-die-das-finder"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Der Die Das Finder</span>
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
              <span>PDF-Kompressor BAföG</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/stundenlohnrechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Stundenlohn &amp; Mindestlohn</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

