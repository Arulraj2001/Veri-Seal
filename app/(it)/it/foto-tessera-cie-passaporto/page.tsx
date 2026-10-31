import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Camera, FileText, CheckCircle2 } from 'lucide-react';
import { FotoTesseraCieClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Foto Tessera CIE e Passaporto 2026 : Formato 35x45 mm e Standard ICAO Doc 9303 | Kagazo Italia',
  description:
    'Crea online fototessere perfette per Carta d\'Identità Elettronica (CIE), Passaporto e Patente. Formato ufficiale 35x45 mm a 300 DPI, maschera biometrica ICAO e foglio di stampa 10x15 cm.',
  keywords: [
    'foto tessera carta identita elettronica cie',
    'fototessera passaporto formato 35x45 mm',
    'standard icao doc 9303 ministero interno',
    'stampa fototessere 4 foto foglio 10x15',
    'pixel fototessera 300 dpi 413x531 px',
    'proporzioni viso fototessera occhi mento',
    'creatore fototessera online gratis privacy',
    'regole foto questura passaporto biometrico',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/foto-tessera-cie-passaporto`,
    languages: {
      'it-IT': `${SITE_URL}/it/foto-tessera-cie-passaporto`,
      'it': `${SITE_URL}/it/foto-tessera-cie-passaporto`,
      'x-default': `${SITE_URL}/it/foto-tessera-cie-passaporto`,
    },
  },
  openGraph: {
    title: 'Foto Tessera CIE e Passaporto | Kagazo Italia',
    description:
      'Editor e generatore di fototessere conformi alle specifiche ICAO e del Ministero dell\'Interno: formato 35x45mm e foglio di stampa.',
    url: `${SITE_URL}/it/foto-tessera-cie-passaporto`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Quali sono le dimensioni esatte della fototessera per CIE e passaporto in Italia?',
    answer:
      'Le dimensioni fisiche ufficiali stabilite dal Ministero dell\'Interno e dallo standard ICAO Doc 9303 sono pari a 35 millimetri di larghezza per 45 millimetri di altezza. A una risoluzione tipografica professionale di 300 DPI, queste dimensioni corrispondono a una griglia digitale di 413 pixel in larghezza per 531 pixel in altezza.',
  },
  {
    question: 'Quale percentuale della foto deve essere occupata dal volto?',
    answer:
      'Il viso deve occupare tra il 70% e l\'80% dell\'altezza totale della foto. Nello specifico, la distanza compresa tra il mento e la sommità della testa (esclusa la capigliatura voluminosa) deve misurare tra 31 e 36 millimetri. Gli occhi devono trovarsi a un\'altezza compresa tra 23 e 31 millimetri dal bordo inferiore della fotografia.',
  },
  {
    question: 'È possibile indossare occhiali da vista nella fototessera?',
    answer:
      'Sì, ma solo a condizione che le lenti siano perfettamente trasparenti e non colorate, che non siano presenti riflessi di luce sulle lenti e che la montatura non copra neppure parzialmente gli occhi, le pupille o le sopracciglia. Gli occhiali da sole o con lenti fotocromatiche scure sono tassativamente vietati.',
  },
  {
    question: 'Come stampare correttamente il foglio con 4 tessere su carta 10x15 cm?',
    answer:
      'Scaricando il nostro foglio di stampa 10x15 cm (4 fototessere con linee di taglio tratteggiate), è sufficiente recarsi presso un qualsiasi chiosco fotografico, farmacia o utilizzare la propria stampante a getto d\'inchiostro fotografica selezionando nelle impostazioni di stampa: Formato carta 10x15 cm (4x6 pollici), Scala 100% / Dimensioni effettive, disattivando categoricamente l\'opzione "Adatta alla pagina" o "Riduci/Ingrandisci".',
  },
];

export default function FotoTesseraCiePassaportoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Generatore Fototessera CIE e Passaporto Biometrico',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/foto-tessera-cie-passaporto`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'EUR',
        },
        provider: {
          '@type': 'Organization',
          name: 'Kagazo Italia',
          url: `${SITE_URL}/it`,
        },
        description:
          'Generatore di fototessere conformi agli standard ICAO Doc 9303 del Ministero dell\'Interno per CIE e Passaporto.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Italia',
            item: `${SITE_URL}/it`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Foto Tessera CIE',
            item: `${SITE_URL}/it/foto-tessera-cie-passaporto`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Breadcrumb Visual */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center space-x-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/it" className="hover:text-emerald-400 transition-colors">Italia</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Foto Tessera CIE / Passaporto</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standard ICAO Doc 9303 & Linee Guida Ministero dell&apos;Interno</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Foto Tessera Carta d&apos;Identità Elettronica (CIE) <br className="hidden sm:inline" />
              <span className="text-emerald-400">Formato 35×45 mm, Linee Biometriche e Foglio 10×15</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Crea, ritaglia e allinea la tua fotografia per il rilascio della CIE, del Passaporto elettronico e della Patente di guida in conformità con i requisiti della Polizia di Stato. Elaborazione 100% privata nel browser con download a 300 DPI e foglio di stampa 10×15 cm.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Operativa: Requisiti Ufficiali della Foto CIE e Passaporto
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Per l&apos;omologazione presso l&apos;Ufficio Anagrafe o in Questura, la fotografia deve misurare esattamente <strong>35 mm di larghezza per 45 mm di altezza</strong> (413×531 pixel a 300 DPI). Il viso deve risultare frontale, con sguardo dritto verso l&apos;obiettivo, sfondo chiaro e uniforme (bianco o grigio chiaro), occupando tra il <strong>70% e l&apos;80% dell&apos;inquadratura</strong> (altezza mento-fronte tra 31 e 36 mm). Lo strumento genera sia il file digitale singolo sia la griglia di stampa 4x per carta fotografica 10×15 cm.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <FotoTesseraCieClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Specifiche Tecniche Internazionali ICAO per i Documenti di Riconoscimento
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Lo Standard ICAO Doc 9303 per i Documenti di Viaggio a Lettura Ottica (MRTD)
              </h3>
              <p>
                L&apos;Organizzazione Internazionale dell&apos;Aviazione Civile (ICAO), agenzia specializzata delle Nazioni Unite, ha definito nel documento <strong>ICAO Doc 9303</strong> i parametri globali per i documenti di identità e di viaggio biometrici. Lo Stato italiano ha recepito integralmente tali criteri tramite circolari congiunte del Ministero dell&apos;Interno e del Dipartimento della Pubblica Sicurezza per la Carta d&apos;Identità Elettronica (CIE 3.0) e per il Passaporto Elettronico dotato di microchip contactless.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Geometria Biometrica del Volto e Posizionamento
              </h3>
              <p>
                La scansione automatica dei varchi di frontiera e degli sportelli comunali impiega algoritmi di riconoscimento facciale che richiedono punti fiduciari ben visibili:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Centratura del Viso:</strong> La linea mediana sagittale del volto deve essere perfettamente allineata all&apos;asse verticale dell&apos;immagine, senza inclinazioni della testa (roll, pitch o yaw).
                </li>
                <li>
                  <strong>Distanza Biometrica Occhi-Mento:</strong> L&apos;altezza complessiva del cranio compresa tra la base del mento e il vertice della testa deve rientrare rigorosamente nell&apos;intervallo tra 31 mm e 36 mm.
                </li>
                <li>
                  <strong>Espressione Neutra:</strong> Il soggetto deve mantenere un&apos;espressione rilassata e neutra, con entrambi gli occhi aperti e ben visibili, la bocca rigorosamente chiusa e senza sorrisi forzati.
                </li>
                <li>
                  <strong>Illuminazione Omogenea:</strong> La sorgente luminosa deve illuminare uniformemente entrambi i lati del viso per impedire la formazione di ombre sotto il naso, gli zigomi o sullo sfondo retrostante.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Guida alla Stampa Tipografica su Supporto Fotografico
              </h3>
              <p>
                Qualora il cittadino presenti la foto in formato cartaceo anziché mediante caricamento digitale su chiavetta USB durante l&apos;appuntamento in Comune, è obbligatorio che la stampa avvenga su carta fotografica di alta qualità priva di patinature riflettenti. Impiegando il foglio di stampa 10x15 cm generato dal nostro strumento, il file contiene 4 fototessere distanziate con bordi tratteggiati per un taglio millimetrico con forbici o taglierina a lama rotante.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sulla Foto per CIE e Passaporto
              </h2>
            </div>
            <div className="divide-y divide-slate-700/60">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-base font-medium text-slate-100">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Ad Contextual */}
          <div className="my-6">
            <AdSlot slot="post_download" context="legal" />
          </div>
        </div>
      </div>
    </>
  );
}
