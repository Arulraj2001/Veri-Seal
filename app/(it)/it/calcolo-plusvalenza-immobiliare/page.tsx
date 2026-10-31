import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloPlusvalenzaImmobiliareClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Plusvalenza Immobiliare 2026 : Imposta Sostitutiva 26% | Kagazo Italia',
  description:
    'Calcola la plusvalenza tassabile sulla vendita di immobili entro 5 anni secondo l\'Art. 67 del TUIR. Calcolo deduzione spese incrementative, imposta sostitutiva del 26% e verifica esenzioni prima casa e successione.',
  keywords: [
    'calcolo plusvalenza vendita casa entro 5 anni',
    'imposta sostitutiva 26 per cento notaio rogito',
    'art 67 comma 1 lett b tuir plusvalenze',
    'esenzione plusvalenza abitazione principale 50 per cento',
    'spese deducibili plusvalenza immobiliare fatture',
    'vendita casa ereditata successione plusvalenza',
    'tassazione plusvalenza superbonus 110 per cento',
    'calcolo netto vendita immobile tasse',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
      'it': `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
      'x-default': `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
    },
  },
  openGraph: {
    title: 'Calcolo Plusvalenza Immobiliare 2026 | Kagazo Italia',
    description:
      'Simulatore ufficiale imposta sulla plusvalenza da cessione fabbricati ex Art. 67 TUIR con opzione per l\'imposta sostitutiva del 26%.',
    url: `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Quando non si paga la plusvalenza sulla vendita di una casa?',
    answer:
      'La plusvalenza non è tassata se si verifica una delle seguenti condizioni stabilite dall\'Art. 67 del TUIR: (1) l\'immobile è stato posseduto per più di 5 anni; (2) l\'immobile è stato adibito ad abitazione principale del proprietario o dei suoi familiari per la maggior parte del periodo intercorso tra l\'acquisto e la vendita; (3) l\'immobile è stato acquisito per successione ereditaria mortis causa.',
  },
  {
    question: 'Come si calcola la plusvalenza tassabile?',
    answer:
      'La plusvalenza è pari alla differenza tra il corrispettivo percepito nel rogito di vendita e il costo storico di acquisto (o di costruzione). Da tale guadagno lordo si deducono tutte le spese inerenti documentate: parcella del notaio per l\'acquisto, imposte di registro, ipotecaria e catastale o IVA versate al rogito originario, provvigione dell\'agenzia immobiliare e tutte le spese straordinarie per ristrutturazioni e migliorie apportate all\'immobile.',
  },
  {
    question: 'Perché conviene richiedere l\'imposta sostitutiva del 26% al Notaio?',
    answer:
      'In sede di rogito notarile di compravendita, la parte venditrice persona fisica può richiedere l\'applicazione dell\'imposta sostitutiva del 26% (introdotta dalla Legge 266/2005). Il notaio riscuote l\'imposta e la versa direttamente all\'Erario. Questo evita che la plusvalenza si sommi agli altri redditi IRPEF del venditore, evitando il salto agli scaglioni fiscali superiori (35% o 43%).',
  },
  {
    question: 'Come incide il Superbonus 110% sulla tassazione della plusvalenza?',
    answer:
      'La legge di bilancio ha introdotto una specifica disciplina per gli immobili oggetto di interventi agevolati con il Superbonus conclusi da non più di 10 anni: in caso di vendita, la plusvalenza generata è tassata al 26% e, se la cessione avviene entro 5 anni dalla fine lavori, non è possibile dedurre le spese per gli interventi incentivati fruiti con cessione del credito o sconto in fattura.',
  },
];

export default function CalcoloPlusvalenzaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Plusvalenza Cessione Immobili 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
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
          'Calcola l\'imposta sulla plusvalenza immobiliare del 26% con deduzione spese incrementative e verifica esenzioni quinquennali TUIR.',
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
            name: 'Calcolo Plusvalenza Immobiliare',
            item: `${SITE_URL}/it/calcolo-plusvalenza-immobiliare`,
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
          <span className="text-sky-700 font-semibold">Plusvalenza Immobiliare</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Art. 67, comma 1, lett. b) TUIR (D.P.R. 917/1986)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Plusvalenza Immobiliare 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Imposta Sostitutiva 26% &amp; Spese Deducibili</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> La vendita di un immobile prima di <strong>5 anni</strong> dall&apos;acquisto genera una plusvalenza tassabile se il prezzo di cessione è superiore al prezzo d&apos;acquisto maggiorato delle spese documentate (notaio, imposte di registro, ristrutturazioni straordinarie). La plusvalenza è esente se l&apos;immobile è stato adibito ad <strong>abitazione principale</strong> per la maggior parte del possesso o se acquisito per <strong>successione</strong>. In sede di rogito notarile si può optare per l&apos;<strong>imposta sostitutiva del 26%</strong>.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloPlusvalenzaImmobiliareClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              La Tassazione della Plusvalenza Immobiliare nel Diritto Fiscale Italiano
            </h2>
            <p>
              Il legislatore fiscale italiano considera la vendita di un immobile entro i 5 anni dal suo acquisto come un&apos;operazione potenzialmente speculativa. Per questo motivo, l&apos;eventuale guadagno economico realizzato costituisce un &quot;reddito diverso&quot; assoggettato a imposizione fiscale ai sensi dell&apos;<strong>Art. 67, comma 1, lettera b) del TUIR (Testo Unico delle Imposte sui Redditi)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. Spese Incrementative Deducibili</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                La plusvalenza netta viene calcolata diminuendo il guadagno lordo di tutte le spese notarili del rogito di acquisto, delle imposte versate all&apos;erario (imposta di registro o IVA, imposte ipotecarie e catastali) e dei costi per opere di ristrutturazione edilizia o manutenzione straordinaria regolarmente fatturati e saldati con bonifico parlante.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Esenzione Abitazione Principale</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Anche se l&apos;immobile viene alienato prima dei 5 anni, l&apos;operazione è <strong>totalmente esente da imposte</strong> se per la maggior parte del periodo intercorso tra l&apos;acquisto e la vendita l&apos;unità immobiliare è stata adibita ad abitazione principale del cedente o dei suoi familiari (dimostrato da residenza anagrafica e allacci delle utenze domestiche).
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sulla Plusvalenza Immobiliare (FAQ)
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
