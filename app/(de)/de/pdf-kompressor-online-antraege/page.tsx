import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileUp, CheckCircle2, Lock, Sparkles, HelpCircle, ArrowRight, FileText, ServerOff } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyPdfKompressorEngine } from '@/components/international/GermanyPdfKompressorEngine';

export const metadata: Metadata = {
  title: 'PDF-Kompressor Behörden & Arbeitsagentur (< 2 MB) | Kagazo',
  description:
    'Komprimieren Sie PDF-Dateien kostenlos unter 2 MB oder 4 MB für Uploads bei der Bundesagentur für Arbeit, BAföG Digital, ELSTER und Justizportalen. 100% lokal im Browser nach DSGVO.',
  keywords: [
    'pdf kompressor arbeitsagentur unter 2mb',
    'bafoeg digital pdf zu gross verkleinern',
    'elster pdf belege komprimieren 4mb',
    'pdf verkleinern online behoerde kostenlos',
    'pdf komprimieren ohne qualitaetsverlust dsgvo',
    'behoerdenportal dateigroesse reduzieren',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/pdf-kompressor-online-antraege`,
    languages: {
      'de-DE': `${SITE_URL}/de/pdf-kompressor-online-antraege`,
      'de': `${SITE_URL}/de/pdf-kompressor-online-antraege`,
      'x-default': `${SITE_URL}/de/pdf-kompressor-online-antraege`,
    },
  },
  openGraph: {
    title: 'PDF-Kompressor Behörden & Arbeitsagentur (< 2 MB) | Kagazo Deutschland',
    description:
      'Optimieren Sie PDF-Dokumente für staatliche Online-Anträge in Deutschland ohne Qualitätsverlust und ohne Serverübertragung.',
    url: `${SITE_URL}/de/pdf-kompressor-online-antraege`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF-Kompressor für Behördenanträge (< 2 MB)',
    description:
      'PDFs unter 2 MB / 4 MB verkleinern für Arbeitsagentur, ELSTER und BAföG Digital.',
  },
};

export default function PdfKompressorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'PDF-Kompressor für Behördenportale Deutschland',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'PDF-Komprimierung für Dateigrößen-Limits von Behördenportalen wie Bundesagentur für Arbeit, ELSTER und BAföG Digital.',
      },
      {
        '@type': 'GovernmentService',
        name: 'E-Government Dokumentenoptimierung',
        serviceType: 'Upload-Vorbereitung für Bundes- und Landesportale',
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
            name: 'PDF-Kompressor Behörden',
            item: `${SITE_URL}/de/pdf-kompressor-online-antraege`,
          },
        ],
      },
    ],
  };

  const portalLimits = [
    { portal: 'Bundesagentur für Arbeit (BA-Mobil / eServices)', limit: 'Max. 2,0 MB je Datei', format: 'PDF, JPG, PNG', anforderung: 'Druckfähige Auflösung, keine Kennwortverschlüsselung' },
    { portal: 'BAföG Digital (Bundesverwaltungsamt)', limit: 'Max. 4,0 MB je Datei', format: 'PDF, JPG', anforderung: 'Klar lesbare Einkommens- & Steuerbescheide' },
    { portal: 'ELSTER (Finanzamt MeinELSTER)', limit: 'Max. 4,0 MB je Anhang', format: 'PDF', anforderung: 'Belegnachreichung zur Einkommensteuererklärung' },
    { portal: 'Elektronischer Gerichts- und Verwaltungspostfach (EGVP)', limit: 'Max. 10,0 MB je Schriftsatz', format: 'PDF/A-1 oder PDF/A-2', anforderung: 'Schrifteinbettung nach ERVB 2024' },
    { portal: 'Rentenversicherung (DRV Online-Dienste)', limit: 'Max. 5,0 MB je Upload', format: 'PDF, TIF', anforderung: 'Nachweise zum Versicherungsverlauf' },
  ];

  const faqs = [
    {
      q: 'Warum verlangen Behörden wie die Bundesagentur für Arbeit Dateien unter 2 MB?',
      a: 'Um Serverüberlastungen und Speicherengpässe in den Fachverfahren der Sozialversicherungsträger zu vermeiden, setzen staatliche IT-Dienstleister strikte Upload-Limits (oft 2 MB oder 4 MB pro Datei). Zu große Dateien werden von der Upload-Validierung automatisch mit einer Fehlermeldung abgewiesen.',
    },
    {
      q: 'Bleibt der Text im PDF nach der Komprimierung durchsuchbar und lesbar?',
      a: 'Ja. Unsere Komprimierungs-Engine optimiert primär überdimensionierte Rasterbilder und hochauflösende Scans im Dokument, während der Textlayer, Schriftarten und Vektorelemente vollständig intakt bleiben. Das Dokument bleibt gestochen scharf lesbar und amtlich anerkannt.',
    },
    {
      q: 'Werden meine hochgeladenen Dokumente auf einem Server gespeichert?',
      a: 'Nein, zu keinem Zeitpunkt. Die Verarbeitung und Komprimierung des PDFs erfolgt zu 100 % lokal im Arbeitsspeicher Ihres eigenen Webbrowsers (mittels WebAssembly und Canvas). Es werden keine Dokumente, Gehaltsabrechnungen oder Bescheide an externe Server übertragen (100% DSGVO-konform).',
    },
    {
      q: 'Welche DPI-Auflösung empfiehlt das Bundesamt für Sicherheit in der Informationstechnik (BSI)?',
      a: 'Nach der Richtlinie BSI TR-03138 (RESISCAN) für das ersetzende Scannen genügt für Textdokumente und Bescheide eine Auflösung von 200 bis 300 DPI. Höhere Auflösungen (z. B. 600 oder 1200 DPI) blähen Dateigrößen unnötig auf, ohne den juristischen Beweiswert zu verbessern.',
    },
    {
      q: 'Was kann man tun, wenn eine PDF-Datei trotz Komprimierung über 2 MB bleibt?',
      a: 'Bei mehrseitigen Akten oder Zeugnismappen empfiehlt es sich, das Dokument in zwei Teil-PDFs aufzuteilen (z. B. "Teil 1 Nachweise" und "Teil 2 Zeugnisse") oder farbige Scans in Graustufen umzuwandeln, was die Dateigröße oft um weitere 60 % bis 80 % reduziert.',
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
          <span className="text-slate-900 font-bold">PDF-Kompressor Behörden</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>E-Government Standard &bull; Bundesagentur für Arbeit &amp; BAföG &bull; DSGVO-Konform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            PDF-Kompressor für Behördenanträge &amp; Arbeitsagentur (&lt; 2 MB)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Deutsche Behördenportale (Bundesagentur für Arbeit, BAföG Digital, ELSTER, Gerichte) weisen Dokumente ab, die die strikte Grenze von <strong>2 MB oder 4 MB</strong> überschreiten. Reduzieren Sie die Dateigröße Ihrer Anträge, Nachweise und Zeugnisse schnell und sicher direkt im Browser.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie groß darf ein PDF für deutsche Behörden sein?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Für Uploads bei der <strong>Bundesagentur für Arbeit</strong> gilt ein Limit von maximal <strong>2 MB</strong> je Datei. Bei <strong>BAföG Digital</strong> und <strong>ELSTER</strong> liegt die Grenze bei <strong>4 MB</strong>. Justizportale (ERV) erlauben bis zu 10 MB. Unser Kompressor verkleinert gescannte Dokumente unter diese Schwellen &mdash; ohne Qualitätsverlust und 100 % lokal ohne Server-Upload.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyPdfKompressorEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Amtliche Dateigrößen-Limits deutscher Behördenportale
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Verbindliche Upload-Vorgaben für E-Government-Verfahren
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Portal / Behörde</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Max. Dateigröße</th>
                  <th className="py-3 px-4 text-slate-700">Formate</th>
                  <th className="py-3 px-4 text-slate-600">Besondere Anforderungen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {portalLimits.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.portal}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.limit}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{row.format}</td>
                    <td className="py-3 px-4 text-slate-600">{row.anforderung}</td>
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
              Datenschutz &amp; Rechtssicherheit bei Behörden-Uploads
            </h2>
            <p>
              Bei behördlichen Anträgen (wie Bürgergeld, Arbeitslosengeld I, BAföG oder Steuererklärungen) übermitteln Bürger hochsensible Sozial- und Finanzdaten nach Art. 9 DSGVO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ServerOff className="w-4 h-4 text-amber-600" />
                <span>Zero-Server-Architektur</span>
              </div>
              <p className="text-xs">
                Herkömmliche Online-PDF-Tools laden Ihre sensiblen Gehaltszettel und Bescheide auf fremde Cloud-Server hoch. Unser Kompressor arbeitet zu 100 % in der JavaScript-Sandbox Ihres eigenen Browsers. Kein einziges Byte Ihrer Dokumente verlässt Ihr Gerät.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>BSI-Konforme Lesbarkeit</span>
              </div>
              <p className="text-xs">
                Unsere Komprimierungsalgorithmen erhalten den Textlayer (OCR) und verkleinern Bilder mit optimierter JPEG/Flate-Kompression, sodass Dokumente die automatische Vorprüfung der Behörden-Scanner problemlos passieren.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zum PDF-Kompressor</span>
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
              Verwandte Behörden- &amp; Alltagshelfer
            </h3>
            <span className="text-xs text-slate-500 font-medium">Rechtssicher nach deutschem Recht 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/passfoto-generator-biometrisch"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Biometrisches Passfoto</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/iban-pruefer-bic-finder"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>IBAN-Prüfer &amp; BLZ</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rechnungsvorlage PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kurzarbeitergeld-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Kurzarbeitergeld (KUG)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

