import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Camera, CheckCircle2, FileCheck, Sparkles, HelpCircle, ArrowRight, FileText, Image as ImageIcon } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyPassfotoEngine } from '@/components/international/GermanyPassfotoEngine';

export const metadata: Metadata = {
  title: 'Biometrisches Passfoto Generator 35×45 mm Kostenlos | Bundesdruckerei-Norm',
  description:
    'Erstellen und schneiden Sie biometrische Passbilder nach der offiziellen Fotomustertafel der Bundesdruckerei (35×45 mm, 32–36 mm Gesichtshöhe) für Personalausweis, Reisepass & Führerschein. Export als 10×15 cm Druckbogen.',
  keywords: [
    'biometrisches passfoto generator 35x45',
    'passbild schablone bundesdruckerei kostenlos',
    'passfoto selber machen handy ausweis',
    'fotomustertafel bundesdruckerei gesichtshoehe 32 36 mm',
    'passbild 10x15 ausdrucken dm rossmann',
    'passfoto reisepass buergeramt konform',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/passfoto-generator-biometrisch`,
    languages: {
      'de-DE': `${SITE_URL}/de/passfoto-generator-biometrisch`,
      'de': `${SITE_URL}/de/passfoto-generator-biometrisch`,
      'x-default': `${SITE_URL}/de/passfoto-generator-biometrisch`,
    },
  },
  openGraph: {
    title: 'Biometrisches Passfoto Generator 35×45 mm Kostenlos | Bundesdruckerei-Norm',
    description:
      'Passbild-Schablone nach Bundesdruckerei-Vorgaben für Personalausweis und Reisepass. 100% lokal im Browser.',
    url: `${SITE_URL}/de/passfoto-generator-biometrisch`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biometrisches Passfoto Generator Deutschland',
    description:
      'Amtlich konforme Passbilder (35×45 mm) nach Bundesdruckerei-Norm erstellen und als Fotobogen drucken.',
  },
};

export default function PassfotoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Biometrischer Passfoto-Generator Deutschland',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Online-Generator für biometrische Passbilder (35×45 mm) nach den Kriterien der Passverordnung und der Bundesdruckerei.',
      },
      {
        '@type': 'GovernmentService',
        name: 'Passbild-Konformitätsprüfung Bundesdruckerei',
        serviceType: 'Personalausweis- und Reisepass-Antragsvorbereitung',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo Deutschland',
        },
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
            name: 'Biometrisches Passfoto',
            item: `${SITE_URL}/de/passfoto-generator-biometrisch`,
          },
        ],
      },
    ],
  };

  const bioMatrix = [
    { kriterium: 'Bildgröße', soll: '35 × 45 mm (ohne Rand)', toleranz: 'Genau 35 mm Breite, 45 mm Höhe', fehler: 'Zu groß/klein wird vom Scanner abgelehnt' },
    { kriterium: 'Gesichtshöhe', soll: '32 – 36 mm (70–80 % des Bildes)', toleranz: 'Kinn bis Schädeldecke', fehler: 'Gesicht zu klein oder angeschnitten' },
    { kriterium: 'Blick & Mimik', soll: 'Frontal, Augen offen & direkt in Kamera', toleranz: 'Neutraler Blick, geschlossener Mund', fehler: 'Lächeln, Zähne sichtbar, Halbprofil' },
    { kriterium: 'Hintergrund', soll: 'Einfarbig hell (hellgrau / weiß)', toleranz: 'Gleichmäßig ohne Schatten & Muster', fehler: 'Hintergrundfarben, Tapete, Schattenwurf' },
    { kriterium: 'Brillenträger', soll: 'Augen klar erkennbar', toleranz: 'Keine Reflexionen, kein dickes Gestell', fehler: 'Sonnenbrille, getönte Gläser verboten' },
    { kriterium: 'Fotoauflösung', soll: 'Mindestens 300 DPI (ideal 600 DPI)', toleranz: 'Scharf und kontrastreich', fehler: 'Pixelig oder weichgezeichnet' },
  ];

  const faqs = [
    {
      q: 'Welche genauen Maße hat ein biometrisches Passfoto in Deutschland?',
      a: 'Ein offizielles Passfoto für deutsche Ausweisdokumente muss exakt 35 mm breit und 45 mm hoch sein (Seitenverhältnis 7:9). Bei einer Druckauflösung von 300 DPI entspricht dies 413 × 531 Pixeln, bei 600 DPI genau 827 × 1063 Pixeln.',
    },
    {
      q: 'Darf man auf einem biometrischen Passfoto lächeln?',
      a: 'Nein. Die Vorgaben des Bundesministeriums des Innern (BMI) verlangen einen neutralen Gesichtsausdruck mit geschlossenem Mund. Breites Lächeln oder sichtbare Zähne führen dazu, dass das Bürgeramt das Foto ablehnt, da die automatische Gesichtserkennungssoftware an Grenzübergängen dadurch behindert wird.',
    },
    {
      q: 'Wie druckt man die erstellten Passfotos am günstigsten aus?',
      a: 'Laden Sie den von unserem Generator erstellten 10×15 cm Bogen (enthält 6 Passbilder) herunter. Diesen können Sie an jedem Fototerminal (z. B. bei dm, Rossmann oder Müller) für ca. 0,20 bis 0,35 Euro als Standard-Fotoabzug ausdrucken und mit einer Schere ausschneiden.',
    },
    {
      q: 'Sind Kopfbedeckungen auf dem Passfoto erlaubt?',
      a: 'Kopfbedeckungen sind grundsätzlich unzulässig. Ausnahmen gestattet die Passverordnung (§ 5 PassV) ausschließlich aus nachgewiesenen religiösen Gründen (z. B. Kopftuch). Auch in diesem Fall muss das Gesicht von der Kinnspitze bis zum oberen Stirnbereich vollständig unbedeckt und schattenfrei sichtbar sein.',
    },
    {
      q: 'Werden die Fotos auf einen Server hochgeladen oder gespeichert?',
      a: 'Nein, niemals. Die gesamte Verarbeitung, das Zuschneiden nach der Biometrie-Schablone und das Rendern des 10×15 cm Bogens finden ausschließlich lokal im Arbeitsspeicher Ihres Webbrowsers statt. Es erfolgt keinerlei Übertragung an externe Server (100% DSGVO-konform).',
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
          <span className="text-slate-900 font-bold">Biometrisches Passfoto</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fotomustertafel Bundesdruckerei &bull; BMI Vorgaben &bull; 35×45 mm Passbild</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Biometrisches Passfoto erstellen (35×45 mm) nach Bundesdruckerei-Norm
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Erstellen Sie aus einem einfachen Smartphone-Porträtfoto ein amtlich konformes Passbild für den deutschen Personalausweis, Reisepass oder Führerschein. Mit der visuellen Biometrie-Schablone zentrieren Sie Gesichtshöhe (32–36 mm) und Augenlinie präzise und drucken 6 Fotos auf einem Standard-Fotobogen (10×15 cm).
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Welche Kriterien muss ein deutsches Passfoto erfüllen?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Nach der Fotomustertafel der Bundesdruckerei muss das Passbild exakt <strong>35 &times; 45 mm</strong> groß sein. Die Gesichtshöhe vom Kinn bis zum Scheitel muss <strong>32 bis 36 mm</strong> einnehmen (70–80 % des Bildes). Der Blick muss frontal und neutral mit geschlossenem Mund sein, vor einem einfarbig hellen, schattenfreien Hintergrund.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyPassfotoEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Biometrie-Checkliste: Kriterien der Bundesdruckerei &amp; ICAO
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Verbindlich für alle deutschen Bürgerämter &amp; Passbehörden
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kriterium</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">Amtliche Norm (Soll)</th>
                  <th className="py-3 px-4 text-slate-600">Erlaubter Bereich</th>
                  <th className="py-3 px-4 text-rose-700 font-bold">Häufiger Ablehnungsgrund</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {bioMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.kriterium}</td>
                    <td className="py-3 px-4 font-semibold text-amber-800 bg-amber-50/20">{row.soll}</td>
                    <td className="py-3 px-4 text-slate-600">{row.toleranz}</td>
                    <td className="py-3 px-4 text-rose-700 font-medium bg-rose-50/10">{row.fehler}</td>
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
              Rechtliche Vorgaben des Passgesetzes (PassG) &amp; der Passverordnung
            </h2>
            <p>
              In Deutschland müssen Lichtbilder für Personalausweis, Reisepass und Führerschein biometrietauglich sein, damit Grenzkontrollstellen automatische Gesichtserkennungsabgleiche (eGates) durchführen können.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Passbild-Schablone &amp; Gesichtsproportionen</span>
              </div>
              <p className="text-xs">
                Die Schablone teilt das Foto in festgelegte Zonen ein: Der Augenabstand muss mindestens 8 mm betragen und die Augenachse muss sich im oberen Drittel des Bildes befinden. Haare dürfen das Gesicht nicht verdecken; die Gesichtskonturen von der Schläfe bis zum Kinn müssen klar abgrenzbar sein.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span>100 % DSGVO-Datenschutzgarantie</span>
              </div>
              <p className="text-xs">
                Biometrische Gesichtsdaten sind nach Art. 9 DSGVO besonders schützenswerte personenbezogene Daten. Unser Generator verarbeitet Ihre Bilder zu 100 % lokal auf Ihrem Gerät (In-Memory Canvas-Technologie). Es werden keine Bilddaten auf Server übertragen, protokolliert oder für KI-Modelle verwendet.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zum biometrischen Passfoto</span>
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
              Verwandte Antrags- &amp; Behördenwerkzeuge
            </h3>
            <span className="text-xs text-slate-500 font-medium">100% lokal im Browser für Behördengänge</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/pdf-kompressor-online-antraege"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>PDF-Kompressor Behörden</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/iban-pruefer-bic-finder"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>IBAN-Prüfer &amp; BIC</span>
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
              href="/de/notenumrechner-bayerische-formel"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Notenumrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

