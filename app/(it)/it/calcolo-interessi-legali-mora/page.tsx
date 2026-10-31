import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { CalcoloInteressiLegaliClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo Interessi Legali e di Mora Commerciali 2026 | D.Lgs. 231/2002 | Kagazo Italia',
  description:
    'Calcola gli interessi di mora nelle transazioni commerciali B2B e P.A. (D.Lgs. 231/2002), tasso legale civile (Art. 1284 c.c.) e risarcimento forfettario di 40€ per spese di recupero. Genera lettera di sollecito e messa in mora.',
  keywords: [
    'calcolo interessi di mora transazioni commerciali b2b',
    'd lgs 231 2002 interessi moratori bce 8 per cento',
    'saggio interesse legale 2026 art 1284 codice civile',
    'indennizzo 40 euro spese recupero credito art 6',
    'formula calcolo interessi al giorno act 365',
    'decreto ingiuntivo provvisoriamente esecutivo fatture',
    'sollecito di pagamento con calcolo interessi fac simile',
    'interessi mora filiera agroalimentare d lgs 198 2021',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-interessi-legali-mora`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-interessi-legali-mora`,
      'it': `${SITE_URL}/it/calcolo-interessi-legali-mora`,
      'x-default': `${SITE_URL}/it/calcolo-interessi-legali-mora`,
    },
  },
  openGraph: {
    title: 'Calcolo Interessi Legali e di Mora Commerciali 2026 | Kagazo Italia',
    description:
      'Calcolatore professionale interessi moratori ex D.Lgs. 231/2002 e legali civilistici con fac-simile lettera di diffida.',
    url: `${SITE_URL}/it/calcolo-interessi-legali-mora`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Cosa prevede il D.Lgs. 231/2002 sui ritardi di pagamento nelle transazioni commerciali?',
    answer:
      'Il Decreto Legislativo 231/2002 (che recepisce la Direttiva Comunitaria contro i ritardi di pagamento) si applica a tutte le transazioni commerciali tra imprese (B2B) o tra imprese e Pubbliche Amministrazioni. Gli interessi di mora scattano automaticamente dal giorno successivo alla scadenza pattuita, senza bisogno di alcuna diffida o messa in mora, a un tasso maggiorato di 8 punti percentuali rispetto al tasso di riferimento BCE.',
  },
  {
    question: 'Cos\'è l\'indennizzo forfettario di 40 euro per il recupero crediti?',
    answer:
      'Ai sensi dell\'Articolo 6, comma 2 del D.Lgs. 231/2002, il creditore ha diritto, senza che sia necessaria alcuna prova di aver sostenuto spese, a un importo forfettario fisso di 40 euro a titolo di risarcimento del danno per i costi di recupero sostenuti per ciascuna fattura pagata in ritardo, fatto salvo il risarcimento del maggior danno documentato.',
  },
  {
    question: 'Qual è la differenza tra interessi legali civilistici e interessi moratori commerciali?',
    answer:
      'Gli interessi legali (Art. 1284 Codice Civile) si applicano ai rapporti tra privati o in materia risarcitoria e sono fissati annualmente con decreto del MEF (attualmente attorno al 2%). Gli interessi commerciali di mora (D.Lgs. 231/2002) si applicano solo ai contratti d\'impresa o con la P.A. e viaggiano a tassi considerevolmente più elevati (circa 11-12%), fungendo da sanzione deterrente contro i ritardi di liquidità.',
  },
  {
    question: 'Come si calcolano gli interessi con la convenzione ACT/365?',
    answer:
      'La formula canonica del codice civile è: I = (Capitale × Saggio percentuale × Giorni effettivi di ritardo) / 36.500. Il calcolo si basa sull\'anno civile di 365 giorni (o 366 negli anni bisestili) e non consente l\'anatocismo (gli interessi scaduti non producono ulteriori interessi).',
  },
];

export default function CalcoloInteressiPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore Interessi di Mora Commerciali e Legali 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-interessi-legali-mora`,
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
          'Calcola gli interessi moratori commerciali D.Lgs. 231/2002 (BCE + 8%), saggio legale Art. 1284 c.c. e indennizzo spese 40€.',
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
            name: 'Interessi Legali e Mora',
            item: `${SITE_URL}/it/calcolo-interessi-legali-mora`,
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
          <span className="text-sky-700 font-semibold">Interessi Legali e Mora</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>D.Lgs. 231/2002 (Transazioni Commerciali) &amp; Art. 1284 Codice Civile</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Interessi Legali e di Mora 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">D.Lgs. 231/2002, Saggio BCE + 8% &amp; Spese 40 €</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Giuridica Diretta:</strong> Nelle transazioni commerciali tra imprese (B2B) o con la Pubblica Amministrazione, il ritardo nel pagamento delle fatture fa scattare automaticamente gli interessi di mora senza bisogno di formale messa in mora. Il tasso applicato è pari al <strong>tasso di rifinanziamento principale della BCE maggiorato dell&apos;8%</strong> (circa 11,25%). Al creditore spetta inoltre per legge un <strong>indennizzo forfettario di 40 euro</strong> per le spese di recupero.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloInteressiLegaliClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Statutory Legal Guide for AdSense */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              La Tutela del Creditore contro i Ritardi di Pagamento (D.Lgs. 231/2002)
            </h2>
            <p>
              In attuazione delle direttive comunitarie 2000/35/CE e 2011/7/UE, l&apos;ordinamento italiano tutela in modo rigoroso le imprese fornitrici di beni e servizi contro la prassi dei pagamenti dilazionati oltre i termini contrattuali. L&apos;obiettivo della norma è contrastare il fenomeno dei ritardi nei pagamenti che pregiudica gravemente la liquidità aziendale e la sopravvivenza delle piccole e medie imprese.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Confronto Sintetico tra le Tipologie di Interessi
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="py-2.5 px-3 font-bold">Tipologia Interessi</th>
                    <th className="py-2.5 px-3 font-bold">Fonte Normativa</th>
                    <th className="py-2.5 px-3 font-bold">Saggio Tipico</th>
                    <th className="py-2.5 px-3 font-bold">Presupposti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Commerciali B2B / P.A.</td>
                    <td className="py-2.5 px-3">D.Lgs. 231/2002</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-700">BCE + 8,00%</td>
                    <td className="py-2.5 px-3">Contratti tra imprese o tra impresa e P.A. per fornitura merci o servizi.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Filiera Agroalimentare</td>
                    <td className="py-2.5 px-3">D.Lgs. 198/2021</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-700">BCE + 9,00%</td>
                    <td className="py-2.5 px-3">Cessione di prodotti agricoli o alimentari deperibili. Termini max 30-60 gg.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Legali Civilistici Generali</td>
                    <td className="py-2.5 px-3">Art. 1284 Codice Civile</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">2,00% (2025/2026)</td>
                    <td className="py-2.5 px-3">Rapporti tra privati, risarcimenti del danno o contratti senza clausole commerciali.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sugli Interessi di Mora (FAQ)
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
