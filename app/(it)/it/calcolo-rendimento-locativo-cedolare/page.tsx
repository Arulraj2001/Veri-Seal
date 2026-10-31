import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, FileText, CheckCircle2 } from 'lucide-react';
import { RendimentoLocativoClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Rendimento Locativo e Cedolare Secca 2026 | Cap Rate Netto | Kagazo Italia',
  description:
    'Calcola il rendimento lordo e netto da locazione immobiliare (Cap Rate) con confronto tra Cedolare Secca (21% o 10% concordato) e IRPEF ordinaria, detraendo IMU, spese condominiali e rischio sfitto.',
  keywords: [
    'calcolo rendimento locativo netto cap rate',
    'convenienza cedolare secca 21 o irpef ordinaria',
    'cedolare secca 10 per cento canone concordato',
    'rendimento lordo e netto affitto immobile',
    'calcolo imposte affitto seconda casa',
    'd lgs 23 2011 cedolare secca locazioni',
    'tasse affitto inquilino proprietario',
    'investimento immobiliare a reddito simulazione',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
      'it': `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
      'x-default': `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
    },
  },
  openGraph: {
    title: 'Calcolo Rendimento Locativo e Cedolare Secca 2026 | Kagazo Italia',
    description:
      'Simulatore ufficiale redditività investimenti immobiliari: incasso netto mensile, imposte cedolare secca e confronto con IRPEF.',
    url: `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Qual è la differenza tra aliquota Cedolare Secca al 21% e al 10%?',
    answer:
      'L\'aliquota ordinaria della Cedolare Secca è pari al 21% e si applica ai contratti di locazione libera (4+4) o transitori. L\'aliquota ridotta al 10% è invece riservata ai contratti a canone concordato (3+2), contratti per studenti universitari e contratti transitori stipulati nei Comuni ad alta tensione abitativa o colpiti da calamità naturali.',
  },
  {
    question: 'Quando conviene scegliere il Regime Ordinario IRPEF rispetto alla Cedolare Secca?',
    answer:
      'La Cedolare Secca è quasi sempre più conveniente per chi ha redditi medio-alti. Tuttavia, il regime ordinario conviene se il proprietario dispone di ingenti detrazioni fiscali (ristrutturazioni edilizie, ecobonus, spese sanitarie, familiari a carico) che non riuscirebbe a compensare con altri redditi e che andrebbero altrimenti perdute, poiché la cedolare secca non consente alcuna detrazione.',
  },
  {
    question: 'Come si calcola il Rendimento Netto (Net Cap Rate) di un immobile?',
    answer:
      'Il rendimento netto si calcola sottraendo dal canone annuo lordo incassato tutte le uscite reali: l\'imposta sul reddito (cedolare secca o IRPEF), l\'IMU seconda casa, la quota delle spese condominiali ordinarie a carico del proprietario, l\'assicurazione e una stima del rischio di sfitto o manutenzione straordinaria. Il netto risultante viene diviso per il costo totale di acquisto dell\'immobile e moltiplicato per 100.',
  },
  {
    question: 'La Cedolare Secca esonera dal pagamento dell\'imposta di registro e bollo?',
    answer:
      'Sì, totalmente. L\'adesione alla Cedolare Secca esenta le parti dal versamento dell\'imposta di registro (pari al 2% annuo del canone) e dell\'imposta di bollo (16€ ogni 4 facciate o 100 righe) sia per la registrazione iniziale del contratto, sia per le successive proroghe o risoluzioni.',
  },
];

export default function RendimentoLocativoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Rendimento Locativo e Cedolare Secca Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
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
          'Calcola il rendimento netto da locazione immobiliare con cedolare secca (21% o 10%) e imposte ordinarie.',
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
            name: 'Rendimento Locativo & Cedolare',
            item: `${SITE_URL}/it/calcolo-rendimento-locativo-cedolare`,
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
          <span className="text-sky-700 font-semibold">Rendimento Locativo &amp; Cedolare</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>D.Lgs. 14 marzo 2011, n. 23 (Disciplina Cedolare Secca)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Rendimento Locativo 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Cedolare Secca 21% o 10% vs Regime Ordinario IRPEF</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> La Cedolare Secca è un&apos;imposta sostitutiva ad aliquota fissa: <strong>21%</strong> per i contratti a canone libero 4+4 e <strong>10%</strong> per i contratti a canone concordato 3+2 nei Comuni ad alta tensione abitativa. Sostituisce IRPEF, addizionali, imposta di registro (2%) e imposta di bollo. Il rendimento netto effettivo (Cap Rate) si calcola detraendo dal canone annuo l&apos;imposta sostitutiva, l&apos;IMU seconda casa e le spese fisse condominiali.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <RendimentoLocativoClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Cedolare Secca vs Regime Ordinario: Guida alla Redditività degli Affitti
            </h2>
            <p>
              La <strong>Cedolare Secca</strong> è un regime facoltativo di tassazione delle locazioni abitative per persone fisiche che non agiscono nell&apos;esercizio di attività d&apos;impresa. L&apos;adesione a questo regime comporta la totale sostituzione dell&apos;IRPEF e delle addizionali comunali e regionali sui canoni di locazione, oltre all&apos;azzeramento dell&apos;imposta di registro e dell&apos;imposta di bollo sul contratto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. Aliquota al 21% (Canone Libero)</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Si applica ai contratti di locazione a canone libero 4+4 stipulati tra privati. L&apos;imposta del 21% si calcola sul 100% del canone di locazione annuo deliberato nel contratto, senza alcuna deduzione forfettaria per spese di manutenzione.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Aliquota Agevolata al 10% (Canone Concordato)</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Si applica ai contratti concordati 3+2 stipulati secondo gli accordi territoriali tra le organizzazioni della proprietà edilizia e degli inquilini, nonché ai contratti per studenti universitari fuori sede, offrendo il massimo risparmio fiscale per l&apos;investitore immobiliare.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sulla Redditività degli Affitti (FAQ)
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
