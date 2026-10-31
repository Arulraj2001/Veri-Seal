import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloTfrClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo TFR Netto e Lordo 2026 : Trattamento Fine Rapporto | Kagazo Italia',
  description:
    'Calcola il TFR netto e lordo maturato secondo l\'Art. 2120 del Codice Civile, con rivalutazione ISTAT FOI, deduzione fondo garanzia INPS e tassazione separata IRPEF.',
  keywords: [
    'calcolo tfr netto online',
    'calcolo buonuscita dipendente privato',
    'art 2120 codice civile tfr',
    'rivalutazione istat tfr 2026',
    'tassazione separata tfr irpef',
    'anticipo tfr prima casa spese mediche',
    'tfr in azienda o fondo pensione',
    'liquidazione fine rapporto lavoro',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
      'it': `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
      'x-default': `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
    },
  },
  openGraph: {
    title: 'Calcolo TFR Netto e Lordo 2026 : Trattamento Fine Rapporto | Kagazo Italia',
    description:
      'Simulatore ufficiale TFR con quote annuali 13,5, rivalutazione ISTAT e calcolo aliquota media tassazione separata.',
    url: `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Come si calcola la quota di TFR maturata ogni anno?',
    answer:
      'In base all\'Articolo 2120 del Codice Civile, la quota annuale di TFR si calcola dividendo la retribuzione utile lorda percepita nell\'anno solare per il coefficiente fisso di 13,5. Dalla somma lorda risultante viene detratto il contributo dello 0,50% devoluto al Fondo di Garanzia INPS.',
  },
  {
    question: 'Come funziona la rivalutazione ISTAT del TFR?',
    answer:
      'Il fondo accantonato al 31 dicembre dell\'anno precedente viene rivalutato il 31 dicembre di ogni anno applicando un tasso composto: una quota fissa pari all\'1,50% più il 75% dell\'incremento dell\'indice ISTAT FOI (prezzi al consumo per famiglie di operai e impiegati). Sulla rivalutazione maturata si applica un\'imposta sostitutiva del 17%.',
  },
  {
    question: 'Come viene tassato il TFR liquidato al lavoratore?',
    answer:
      'Il TFR non si somma ai redditi dell\'anno di liquidazione, ma è soggetto a Tassazione Separata (Art. 19 e 21 TUIR). Si determina il reddito di riferimento dividendo il TFR lordo per gli anni di servizio e moltiplicando per 12. Su tale reddito teorico si calcola l\'aliquota media IRPEF applicata alla liquidazione.',
  },
  {
    question: 'Chi ha diritto a richiedere l\'anticipo del TFR?',
    answer:
      'I lavoratori dipendenti con almeno 8 anni di anzianità continuativa presso lo stesso datore di lavoro possono chiedere un anticipo fino al 70% del TFR accantonato per l\'acquisto della prima casa per sé o per i figli, oppure per documentate e straordinarie spese sanitarie e congedi parentali.',
  },
];

export default function CalcoloTfrPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore TFR Netto e Lordo Italia 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
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
          'Calcola il TFR netto e lordo maturato secondo l\'Art. 2120 c.c., con rivalutazione ISTAT FOI, deduzione fondo garanzia INPS e tassazione separata.',
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
            name: 'Calcolo TFR',
            item: `${SITE_URL}/it/calcolo-tfr-fine-rapporto`,
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
          <span className="text-sky-700 font-semibold">Calcolo TFR</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Art. 2120 Codice Civile &amp; Tassazione Separata TUIR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo TFR Netto e Lordo 2026 <br className="hidden sm:inline" />
            <span className="text-emerald-600">Liquidazione e Rivalutazione ISTAT</span>
          </h1>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> Il Trattamento di Fine Rapporto (TFR) viene calcolato accantonando ogni anno la retribuzione utile divisa per <strong>13,5</strong> (meno 0,5% contributo INPS). Il montante degli anni precedenti si rivaluta al 31 dicembre di ogni anno con un tasso pari a <strong>1,5% fisso + 75% dell&apos;inflazione ISTAT FOI</strong> (con imposta sostitutiva del 17%). Al momento della liquidazione, il TFR è soggetto a <strong>tassazione separata</strong> con aliquota IRPEF media degli ultimi 5 anni.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloTfrClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Comprehensive 800+ Words Statutory Legal Guide */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Disciplina Giuridica e Metodo di Calcolo del TFR (Art. 2120 Codice Civile)
            </h2>
            <p>
              Il <strong>Trattamento di Fine Rapporto (TFR)</strong>, comunemente noto come liquidazione o buonuscita, è una porzione di retribuzione differita riconosciuta a tutti i lavoratori subordinati del settore privato e pubblico al momento della cessazione del rapporto di lavoro per qualsiasi causa: dimissioni volontarie, licenziamento per giustificato motivo, giusta causa o raggiungimento dell&apos;età pensionabile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">
                La Quota Annuale e il Divisore 13,5
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ai sensi del comma 1 dell&apos;Art. 2120 c.c., la quota da accantonare ogni anno si ottiene dividendo la retribuzione utile annua (comprensiva di stipendio base, contingenza, scatti, mensilità aggiuntive e indennità fisse) per il divisore fisso di <strong>13,5</strong>. Per le frazioni di anno, il mese viene conteggiato per intero se il lavoratore ha prestato servizio per almeno 15 giorni solari.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">
                Il Meccanismo di Rivalutazione ISTAT
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Il fondo accantonato al 31 dicembre dell&apos;anno precedente viene rivalutato annualmente al fine di proteggere il potere d&apos;acquisto dei lavoratori dall&apos;erosione inflazionistica. Il coefficiente di rivalutazione è composto da una quota fissa pari all’<strong>1,5%</strong> a cui si aggiunge il <strong>75% della variazione dell&apos;indice dei prezzi al consumo FOI</strong> (famiglie di operai e impiegati) accertato dall&apos;ISTAT. Su questo rendimento finanziario grava un&apos;imposta sostitutiva del <strong>17%</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Anticipazione del TFR: Requisiti di Legge
            </h3>
            <p>
              Il lavoratore con almeno <strong>8 anni di servizio continuativo</strong> presso lo stesso datore di lavoro può richiedere un&apos;anticipazione fino al <strong>70% del TFR maturato</strong> nei seguenti casi specifici documentati:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Acquisto della prima casa di abitazione per sé o per i propri figli;</li>
              <li>Spese sanitarie straordinarie per terapie e interventi necessari riconosciuti dalle strutture sanitarie pubbliche;</li>
              <li>Spese durante i congedi parentali facoltativi o congedi formativi (Art. 7 Legge 53/2000).</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Calcolo del TFR (FAQ)
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
