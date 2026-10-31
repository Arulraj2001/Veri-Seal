import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, FileText, CheckCircle2 } from 'lucide-react';
import { AdeguamentoAffittoIstatClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Adeguamento Canone Affitto ISTAT 2026 : Calcolo FOI 100% e 75% | Kagazo Italia',
  description:
    'Calcola l\'aggiornamento del canone di locazione con l\'indice ISTAT FOI (100% per canone libero 4+4, 75% per canone concordato 3+2 e commerciale). Genera fac-simile lettera per l\'inquilino e verifica blocco cedolare secca.',
  keywords: [
    'adeguamento istat canone affitto 2026',
    'calcolo indice foi istat locazioni',
    'aumento affitto 100 per cento o 75',
    'lettera richiesta aumento istat inquilino fac simile',
    'cedolare secca blocco aumento istat',
    'legge 392 78 art 32 canone locazione',
    'scadenza comunicazione istat canone',
    'calcolo rivalutazione affitto istat',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/adeguamento-affitto-istat`,
    languages: {
      'it-IT': `${SITE_URL}/it/adeguamento-affitto-istat`,
      'it': `${SITE_URL}/it/adeguamento-affitto-istat`,
      'x-default': `${SITE_URL}/it/adeguamento-affitto-istat`,
    },
  },
  openGraph: {
    title: 'Adeguamento Canone Affitto ISTAT 2026 | Kagazo Italia',
    description:
      'Calcolatore ufficiale aumento canone di locazione ISTAT FOI con fac-simile lettera raccomandata per inquilino e normative Art. 32 L. 392/78.',
    url: `${SITE_URL}/it/adeguamento-affitto-istat`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come si calcola l\'adeguamento ISTAT del canone di affitto?',
    answer:
      'L\'aggiornamento si calcola moltiplicando il canone mensile pattuito per la variazione percentuale annua dell\'indice ISTAT FOI (famiglie di operai e impiegati al netto dei tabacchi). Nei contratti liberi 4+4 si applica generalmente il 100% della variazione se previsto nel contratto, mentre nei contratti a canone concordato 3+2 e ad uso commerciale 6+6 si applica per legge al massimo il 75% dell\'indice.',
  },
  {
    question: 'Chi ha la Cedolare Secca può aumentare l\'affitto con l\'ISTAT?',
    answer:
      'No, in nessun caso. L\'Articolo 3, comma 11 del Decreto Legislativo n. 23/2011 stabilisce espressamente che l\'opzione per la Cedolare Secca comporta la rinuncia irrevocabile da parte del locatore alla facoltà di chiedere l\'aggiornamento del canone a qualsiasi titolo, inclusa la variazione ISTAT, per tutto il periodo di durata dell\'opzione.',
  },
  {
    question: 'L\'aumento ISTAT scatta in automatico o va richiesto?',
    answer:
      'L\'aumento non è mai automatico. Secondo la giurisprudenza consolidata della Corte di Cassazione, l\'adeguamento del canone deve essere formalmente richiesto dal locatore all\'inquilino tramite raccomandata con ricevuta di ritorno o PEC. La decorrenza scatta dal mese successivo al ricevimento della comunicazione.',
  },
  {
    question: 'Il proprietario può richiedere gli arretrati ISTAT non riscossi negli anni passati?',
    answer:
      'No. Il locatore non può pretendere il pagamento retroattivo delle somme non richieste nei mesi o anni precedenti. Tuttavia, ha facoltà di rideterminare il canone attuale calcolando la rivalutazione ISTAT cumulata dalla data di stipula del contratto, richiedendo il nuovo importo solo per le mensilità future a decorrere dalla richiesta.',
  },
];

export default function AdeguamentoAffittoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Adeguamento Canone Affitto ISTAT 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/adeguamento-affitto-istat`,
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
          'Calcola l\'adeguamento ISTAT FOI per contratti di locazione liberi (100%) e concordati (75%) con generatore lettera raccomandata.',
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
            name: 'Adeguamento Affitto ISTAT',
            item: `${SITE_URL}/it/adeguamento-affitto-istat`,
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
          <span className="text-sky-700 font-semibold">Adeguamento Affitto ISTAT</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Indice ISTAT FOI (Famiglie Operai e Impiegati) Legge 431/1998</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Adeguamento Canone Affitto ISTAT 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">Calcolo Indice FOI 100% o 75% &amp; Lettera per Inquilino</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Giuridica Diretta:</strong> L’adeguamento ISTAT del canone di locazione si calcola moltiplicando il canone mensile in corso per la variazione percentuale annua dell’<strong>indice FOI</strong> (senza tabacchi). Nei contratti liberi 4+4 si applica generalmente il <strong>100%</strong> dell&apos;indice, mentre nei contratti a canone concordato (3+2) e commerciali (6+6) il limite massimo di legge è il <strong>75%</strong>. Se il proprietario ha optato per il regime della <strong>Cedolare Secca</strong>, qualsiasi aggiornamento del canone è nullo per legge.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <AdeguamentoAffittoIstatClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              La Disciplina Giuridica dell&apos;Adeguamento ISTAT nei Contratti di Locazione
            </h2>
            <p>
              L&apos;adeguamento del canone di locazione è la facoltà riconosciuta al locatore di aggiornare periodicamente l&apos;importo dell&apos;affitto per proteggerlo dall&apos;inflazione e dalla perdita del potere d&apos;acquisto della moneta. Tale meccanismo è ancorato all&apos;<strong>indice nazionale dei prezzi al consumo per le famiglie di operai e impiegati (FOI) al netto dei tabacchi</strong> elaborato mensilmente dall&apos;Istituto Nazionale di Statistica (ISTAT) e pubblicato sulla Gazzetta Ufficiale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">1. Contratti a Canone Libero (4+4)</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Nei contratti a canone libero stipulati ai sensi dell&apos;Art. 2, comma 1 della Legge 431/1998, le parti possono concordare liberamente l&apos;applicazione dell&apos;adeguamento fino al <strong>100% della variazione annuale dell&apos;indice FOI</strong>. Tuttavia, se nel contratto di locazione non è presente un&apos;esplicita clausola che prevede l&apos;aggiornamento ISTAT, il proprietario non ha diritto ad applicarlo unilateralmente.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">2. Contratti Concordati (3+2) e Commerciali (6+6)</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Per i contratti a canone concordato (Art. 2, comma 3, Legge 431/1998) e per le locazioni ad uso diverso dall&apos;abitazione (negozi, uffici, capannoni ex Art. 32 Legge 392/1978), la legge impone un tetto invalicabile: l&apos;aggiornamento non può mai superare il <strong>75% della variazione dell&apos;indice ISTAT</strong>. Eventuali pattuizioni contrattuali che prevedono il 100% sono considerate nulle per violazione di norma imperativa.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sull&apos;Adeguamento ISTAT Affitti (FAQ)
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
