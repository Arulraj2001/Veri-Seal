import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { FatturaForfettarioClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Fattura Regime Forfettario 2026 : Rivalsa INPS 4% e Bollo | Kagazo Italia',
  description:
    'Simula la fattura in Regime Forfettario 2026: rivalsa INPS 4%, imposta di bollo 2€, coefficiente di redditività ATECO, imposta sostitutiva al 5% o 15% e diciture di legge per fattura elettronica.',
  keywords: [
    'calcolo fattura regime forfettario 2026',
    'rivalsa inps 4 per cento fattura forfettario',
    'marca da bollo 2 euro fattura elettronica',
    'coefficiente redditività ateco forfettario',
    'dicitura obbligatoria fattura forfettario sdi',
    'aliquota start up 5 per cento primi 5 anni',
    'gestione separata inps forfettario 26.07',
    'limite faturamento forfettario 85000 euro',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/fattura-regime-forfettario`,
    languages: {
      'it-IT': `${SITE_URL}/it/fattura-regime-forfettario`,
      'it': `${SITE_URL}/it/fattura-regime-forfettario`,
      'x-default': `${SITE_URL}/it/fattura-regime-forfettario`,
    },
  },
  openGraph: {
    title: 'Calcolo Fattura Regime Forfettario 2026 | Kagazo Italia',
    description:
      'Generatore e calcolatore fattura per autonomi forfettari: rivalsa INPS, marca da bollo e stima del netto in tasca.',
    url: `${SITE_URL}/it/fattura-regime-forfettario`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual è il limite di fatturato per il Regime Forfettario nel 2026?',
    answer:
      'Il limite massimo di compensi o ricavi incassati nell\'anno solare è fissato a 85.000 euro. Se si superano gli 85.000 euro ma si resta sotto i 100.000 euro, il regime forfettario cessa dall\'anno successivo. Se invece si supera la soglia di 100.000 euro in corso d\'anno, si decade immediatamente dal regime con applicazione immediata dell\'IVA a partire dalle fatture che determinano lo sforamento.',
  },
  {
    question: 'Quando è obbligatoria la marca da bollo da 2,00 euro?',
    answer:
      'L\'imposta di bollo da 2,00 euro è obbligatoria per tutte le fatture in regime forfettario il cui importo complessivo sia superiore a 77,47 euro. Nella fattura elettronica inviata allo SdI va valorizzato il campo "DatiBollo" con "SI" e importo 2.00 euro. Il pagamento trimestrale cumulativo avviene tramite modello F24 precompilato sul portale Fatture e Corrispettivi.',
  },
  {
    question: 'Cos\'è il coefficiente di redditività ATECO?',
    answer:
      'Nel regime forfettario le spese reali non si deducono analiticamente. Il legislatore assegna a ciascun codice ATECO una percentuale fissa di spesa forfettaria. Ad esempio, per professionisti e programmatori informatici il coefficiente è del 78% (le spese riconosciute sono il 22%), mentre per il commercio al dettaglio è del 40% (le spese forfettarie riconosciute sono il 60%).',
  },
  {
    question: 'Qual è la dicitura di legge obbligatoria da inserire in fattura?',
    answer:
      'Nelle note della fattura elettronica è obbligatorio inserire la seguente clausola: "Operazione effettuata ai sensi dell\'art. 1, commi da 54 a 89, della Legge n. 190/2014 e successive modificazioni. Regime forfettario. Si richiede la non applicazione della ritenuta alla fonte a titolo d\'acconto ai sensi del comma 67 dell\'art. 1 della Legge n. 190/2014."',
  },
];

export default function FatturaForfettarioPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Fattura Regime Forfettario 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/fattura-regime-forfettario`,
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
          'Calcola la fattura in regime forfettario con rivalsa INPS 4%, imposta di bollo 2€, imposta sostitutiva e dicitura SDI.',
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
            name: 'Fattura Regime Forfettario',
            item: `${SITE_URL}/it/fattura-regime-forfettario`,
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

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
          <span>/</span>
          <span className="text-sky-700 font-semibold">Fattura Regime Forfettario</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Legge 23 dicembre 2014, n. 190 (Regime Forfettario 2026)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Fattura Regime Forfettario 2026 <br className="hidden sm:inline" />
            <span className="text-amber-600">Rivalsa INPS 4%, Bollo e Diciture SdI</span>
          </h1>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> I professionisti e le imprese in regime forfettario emettono fattura <strong>senza applicazione dell&apos;IVA</strong> e <strong>senza ritenuta d&apos;acconto</strong>. Se il totale della fattura supera <strong>77,47 euro</strong>, è obbligatorio addebitare l&apos;imposta di bollo di <strong>2,00 euro</strong>. I professionisti iscritti alla Gestione Separata INPS possono aggiungere la <strong>rivalsa previdenziale del 4%</strong> a carico del cliente, che concorre a formare il compenso complessivo.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <FatturaForfettarioClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Guida al Regime Forfettario 2026: Requisiti e Limite di 85.000 €
            </h2>
            <p>
              Il <strong>Regime Forfettario</strong> (disciplinato dalla Legge 190/2014) rappresenta il regime fiscale agevolato naturale per le persone fisiche che esercitano un&apos;attività d&apos;impresa, arte o professione in forma individuale in Italia. Con la Legge di Bilancio, la soglia massima di compensi o ricavi incassati nell&apos;anno solare è fissata a <strong>85.000 euro</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">I Vantaggi di Non Applicare l&apos;IVA</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Chi opera in regime forfettario non addebita l&apos;IVA in fattura e non la detrae sugli acquisti. Questo costituisce un enorme vantaggio competitivo verso clienti privati e consumatori finali (B2C), consentendo di formulare prezzi finali più bassi del 22% rispetto a chi opera in regime ordinario.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">Aliquota Start-Up al 5% per 5 Anni</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                L&apos;imposta sostitutiva si riduce al <strong>5% per i primi cinque anni</strong> di attività se il contribuente non ha esercitato un&apos;attività analoga nei tre anni precedenti e se la nuova attività non costituisce una mera prosecuzione di un lavoro dipendente svolto in precedenza.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sulla Fattura Forfettaria (FAQ)
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
