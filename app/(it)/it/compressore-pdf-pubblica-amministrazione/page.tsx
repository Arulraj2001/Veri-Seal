import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { CompressorePdfPaClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compressore PDF Pubblica Amministrazione 2026 : Limite 2MB INPS, Entrate e PCT | Kagazo Italia',
  description:
    'Comprimi e ottimizza documenti PDF per i portali telematici della Pubblica Amministrazione (INPS, Agenzia delle Entrate, PCT, inPA). Riduzione file sotto i 2 MB e 5 MB con elaborazione 100% privata e locale.',
  keywords: [
    'compressore pdf pubblica amministrazione',
    'comprimere pdf sotto 2 mb inps allegati',
    'ottimizzazione pdf agenzia entrate rli 5mb',
    'riduci dimensione pdf processo civile telematico pct',
    'standard pdf a conservazione digitale agid',
    'comprimi documenti concorsi inpa online gratis',
    'compressione pdf locale browser privacy gdpr',
    'cad d lgs 82 2005 requisiti documenti digitali',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
    languages: {
      'it-IT': `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
      'it': `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
      'x-default': `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
    },
  },
  openGraph: {
    title: 'Compressore PDF Pubblica Amministrazione | Kagazo Italia',
    description:
      'Strumento client-side sicuro per ridurre il peso dei PDF per bandi, INPS, Entrate e Giustizia Civile sotto i 2MB.',
    url: `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual è il limite massimo di dimensione per i PDF nei portali della Pubblica Amministrazione?',
    answer:
      'Il portale dell\'INPS impone generalmente un limite massimo di 2 MB per singolo file allegato alle domande telematiche (NASpI, congedi, assegno unico). Il portale RLI dell\'Agenzia delle Entrate per la registrazione dei contratti di locazione accetta file PDF o TIFF fino a un massimo di 5 MB. Il Portale del Reclutamento inPA per i concorsi pubblici ammette curriculum e titoli di studio fino a 2 MB per file.',
  },
  {
    question: 'Che cos\'è il formato PDF/A richiesto per gli atti legali e concorsuali?',
    answer:
      'Il PDF/A (standard ISO 19005) è un profilo specializzato del formato PDF specificamente ideato per la conservazione documentale digitale a lungo termine. A differenza dei normali PDF, il PDF/A vieta l\'inserimento di codice eseguibile (Javascript), collegamenti a font esterni non incorporati o file audio/video, garantendo che il testo e il layout rimangano identici ed esattamente leggibili anche a distanza di decenni.',
  },
  {
    question: 'I miei documenti riservati (buste paga, cartelle sanitarie) sono al sicuro?',
    answer:
      'Sì, la privacy è totale. Il nostro compressore utilizza motori di manipolazione PDF eseguiti direttamente nel motore WebAssembly/JavaScript del tuo browser internet. Nessun byte del tuo documento viene mai caricato su server esterni o conservato su database cloud, assicurando la piena conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679).',
  },
  {
    question: 'Come posso ridurre ulteriormente un PDF scansionato troppo pesante?',
    answer:
      'I PDF generati da scanner fisici contengono sovente immagini raster ad altissima risoluzione (300-600 DPI a colori) che occupano decine di megabyte per poche pagine. Ottimizzando gli stream degli oggetti interni, eliminando i metadati ridondanti non necessari e riconfigurando la compressione interna tramite il nostro strumento è possibile ridurre le dimensioni fino al 70-80% mantenendo perfetta leggibilità tipografica.',
  },
];

export default function CompressorePdfPaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compressore PDF Pubblica Amministrazione',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
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
          'Ottimizza e riduce la dimensione dei documenti PDF per INPS, Agenzia Entrate e concorsi pubblici sotto i limiti di 2 MB.',
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
            name: 'Compressore PDF PA',
            item: `${SITE_URL}/it/compressore-pdf-pubblica-amministrazione`,
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
            <span className="text-slate-200 font-medium">Compressore PDF Pubblica Amministrazione</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conforme AgID, INPS, Giustizia Civile (PCT) & Portale inPA</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Compressore PDF per la Pubblica Amministrazione <br className="hidden sm:inline" />
              <span className="text-emerald-400">Ottimizzazione File Sotto i 2 MB & Standard PDF/A</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Comprimi e alleggerisci i tuoi documenti PDF nel rispetto delle soglie dimensionali imposte dai portali telematici statali italiani (INPS, Agenzia delle Entrate, Giustizia Civile e Concorsi pubblici). Elaborazione eseguita integralmente all&apos;interno del browser senza trasmissione di file su server terzi.
            </p>
          </header>

          {/* Answer Capsule (GEO Optimization) */}
          <section className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Sintesi Operativa: Requisiti Dimensionali dei Documenti Telematici PA
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  I principali portali statali italiani richiedono il rispetto di rigide soglie dimensionali: <strong>2 MB</strong> per gli allegati alle istanze INPS (NASpI, maternità, ISEE), <strong>5 MB</strong> per i contratti di locazione caricati su Agenzia Entrate RLI, e <strong>30 MB</strong> per la busta telematica complessiva nel Processo Civile Telematico (PCT). Lo strumento comprime gli stream interni e purifica i metadati non necessari mantenendo inalterata la fedeltà del testo e l&apos;integrità del documento, in conformità con il Regolamento GDPR UE 2016/679.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Engine */}
          <CompressorePdfPaClient />

          {/* In-content Ad Contextual */}
          <div className="my-8">
            <AdSlot slot="in_content" context="legal" />
          </div>

          {/* Authoritative Statutory Guide */}
          <article className="prose prose-invert max-w-none bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Quadro Normativo della Documentazione Digitale nella PA (CAD - D.Lgs. 82/2005)
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                1. Il Codice dell&apos;Amministrazione Digitale e le Linee Guida AgID
              </h3>
              <p>
                Il <strong>Decreto Legislativo 7 marzo 2005, n. 82 (Codice dell&apos;Amministrazione Digitale - CAD)</strong> e le successive <em>Linee Guida sulla formazione, gestione e conservazione dei documenti informatici</em> emanate dall&apos;Agenzia per l&apos;Italia Digitale (AgID) disciplinano l&apos;efficacia probatoria degli atti digitali. Affinché un documento informatico sia opponibile a terzi e conservabile a norma di legge, esso deve rispettare standard aperti che assicurino l&apos;integrità, l&apos;immodificabilità e la leggibilità nel tempo.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                2. Lo Standard PDF/A per la Conservazione a Lungo Termine (ISO 19005)
              </h3>
              <p>
                La normativa tecnica AgID individua nel formato <strong>PDF/A (ISO 19005-1 e successivi)</strong> il formato d&apos;elezione per tutti i documenti della Pubblica Amministrazione. Tale standard prescrive che tutti gli elementi visivi (inclusi caratteri tipografici, tabelle e profili colore di rendering) siano interamente incorporati all&apos;interno del file stesso, vietando espressamente:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Collegamenti ipertestuali a risorse o script esterni che potrebbero modificarsi o diventare inaccessibili;</li>
                <li>Codice attivo o macro incorporata in linguaggio JavaScript;</li>
                <li>Crittografia proprietaria o password che impedirebbero la scansione automatizzata da parte degli archivi di Stato.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                3. Motivi Tecnici delle Soglie Dimensionali dei Portali Statali
              </h3>
              <p>
                Le restrizioni di upload a 2 MB o 5 MB imposte dai portali telematici quali INPS, Agenzia delle Entrate, Giustizia Civile e portale concorsi inPA non dipendono da limitazioni di banda, bensì da esigenze di conformità alle regole tecniche di conservazione sostitutiva a norma di legge. File con pesi eccessivi rallenterebbero l&apos;apposizione massiva della firma digitale qualificata e della marca temporale da parte dei sistemi di protocollazione automatica, causando scarti telematici o timeout di sessione con codice errore di rifiuto istanza.
              </p>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Domande Frequenti sulla Compressione PDF per la PA
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
