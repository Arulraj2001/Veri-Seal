import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Home, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CalcoloImuClient } from './ClientEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcolo IMU 2026 e Compilazione Modello F24 | Kagazo Italia',
  description:
    'Calcola l\'IMU 2026 per seconde case, immobili locati e prime case di lusso. Calcolo rendita catastale rivalutata (+5%), moltiplicatori catastali, acconto 16 giugno, saldo 16 dicembre e codici tributo F24.',
  keywords: [
    'calcolo imu 2026 online',
    'calcolo imu seconda casa f24',
    'codice tributo 3918 imu altri fabbricati',
    'rendita catastale rivalutata 5 per cento',
    'scadenza acconto imu 16 giugno',
    'esenzione imu prima casa requisiti',
    'moltiplicatore catastale a2 a7 160',
    'ravvedimento operoso imu omessa',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/calcolo-imu-f24`,
    languages: {
      'it-IT': `${SITE_URL}/it/calcolo-imu-f24`,
      'it': `${SITE_URL}/it/calcolo-imu-f24`,
      'x-default': `${SITE_URL}/it/calcolo-imu-f24`,
    },
  },
  openGraph: {
    title: 'Calcolo IMU 2026 e Compilazione Modello F24 | Kagazo Italia',
    description:
      'Calcolo esatto imposta municipale IMU 2026 con modello F24 (codici 3918 e 3912), ripartizione acconto e saldo e normativa Legge 160/2019.',
    url: `${SITE_URL}/it/calcolo-imu-f24`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Chi è esente dal pagamento dell\'IMU?',
    answer:
      'L\'abitazione principale classificata nelle categorie catastali da A/2 ad A/7 non di lusso, in cui il possessore e il suo nucleo familiare dimorano abitualmente e risiedono anagraficamente, è totalmente esente dall\'IMU. L\'esenzione si estende a un massimo di tre pertinenze catastali (una per categoria C/2, C/6 e C/7).',
  },
  {
    question: 'Come si calcola la base imponibile dell\'IMU?',
    answer:
      'La base imponibile si calcola rivalutando la rendita catastale dell\'immobile del 5% e moltiplicando il risultato per il coefficiente di categoria: 160 per abitazioni (A/1-A/9) e pertinenze (C/2, C/6, C/7); 140 per categoria B e C/3-C/5; 80 per uffici A/10; 65 per capannoni D; 55 per negozi C/1.',
  },
  {
    question: 'Quali sono le scadenze ufficiali per il versamento dell\'IMU?',
    answer:
      'L\'IMU si versa in due rate annuali tramite Modello F24 o bollettino postale: l\'acconto (50% dell\'imposta dovuta) scade il 16 giugno, mentre il saldo a conguaglio con le aliquote deliberate dal Comune scade il 16 dicembre. È possibile versare l\'intera somma in un\'unica soluzione entro il 16 giugno.',
  },
  {
    question: 'Quali codici tributo si utilizzano nel Modello F24 per l\'IMU?',
    answer:
      'Nel Modello F24, nella sezione "IMU e altri tributi locali", i codici tributo principali sono: 3918 per altri fabbricati (seconde case); 3912 per abitazione principale di lusso (A/1, A/8, A/9) e pertinenze; 3916 per aree fabbricabili; 3925 (quota Stato) e 3930 (quota Comune) per immobili a destinazione produttiva di categoria D.',
  },
];

export default function CalcoloImuPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calcolatore IMU 2026 con Modello F24',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/it/calcolo-imu-f24`,
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
          'Calcola l\'imposta municipale IMU 2026 per seconde case, uffici e abitazioni di lusso con ripartizione acconto e saldo F24.',
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
            name: 'Calcolo IMU e F24',
            item: `${SITE_URL}/it/calcolo-imu-f24`,
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
          <span className="text-sky-700 font-semibold">Calcolo IMU F24</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Legge 27 dicembre 2019, n. 160 &amp; Risoluzioni MEF</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo IMU 2026 e Modello F24 <br className="hidden sm:inline" />
            <span className="text-sky-600">Acconto 16 Giugno e Saldo 16 Dicembre</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> L&apos;IMU è dovuta sulle seconde case, immobili ad uso commerciale e prime case di lusso (A/1, A/8, A/9). La base imponibile si ottiene rivalutando la rendita catastale del <strong>5%</strong> e moltiplicandola per il coefficiente di categoria (es. <strong>160</strong> per abitazioni e pertinenze). L&apos;aliquota standard comunale è del <strong>10,6 per mille (1,06%)</strong>. Il versamento avviene tramite Modello F24 con codice tributo <strong>3918</strong> diviso in due rate: acconto 50% entro il <strong>16 giugno</strong> e saldo conguaglio entro il <strong>16 dicembre</strong>.
          </div>
        </div>

        {/* Client Interactive Engine */}
        <CalcoloImuClient />

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* Comprehensive 800+ Words Statutory Legal Guide */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Guida Normativa al Calcolo dell&apos;IMU: Regole, Coefficienti ed Esenzioni
            </h2>
            <p>
              L&apos;<strong>Imposta Municipale Propria (IMU)</strong> è il tributo patrimoniale locale dovuto per il possesso di fabbricati, aree fabbricabili e terreni agricoli sul territorio della Repubblica Italiana. La disciplina vigente deriva dalla <strong>Legge di Bilancio 2020 (Legge 27 dicembre 2019, n. 160)</strong>, che ha unificato in un unico prelievo la precedente IMU e la TASI (Tassa sui Servizi Indivisibili).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">
                1. I Moltiplicatori Catastali Ufficiali
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Il valore catastale si ottiene rivalutando la rendita catastale risultante in visura del 5% (Art. 3, comma 48, Legge 662/1996) e moltiplicando per:
              </p>
              <ul className="text-xs font-mono space-y-1 text-slate-700 pt-1">
                <li>• <strong>160</strong> per i gruppi A (escluso A/10) e C/2, C/6, C/7;</li>
                <li>• <strong>140</strong> per il gruppo B e per le categorie C/3, C/4 e C/5;</li>
                <li>• <strong>80</strong> per la categoria A/10 (uffici e studi privati);</li>
                <li>• <strong>65</strong> per il gruppo D (immobili produttivi industriali);</li>
                <li>• <strong>55</strong> per la categoria C/1 (negozi e botteghe commerciali).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900">
                2. Riduzioni ed Agevolazioni Statutarie
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                La legge riconosce sconti tributari per determinate fattispecie:
              </p>
              <ul className="text-xs space-y-1 text-slate-700 pt-1">
                <li>• <strong>Canone Concordato (Legge 431/98):</strong> Riduzione dell&apos;imposta al <strong>75%</strong> (sconto secco del 25%);</li>
                <li>• <strong>Comodato d&apos;Uso a Genitori o Figli:</strong> Riduzione del <strong>50%</strong> della base imponibile se il contratto è registrato presso l&apos;Agenzia delle Entrate e il comodante non possiede altri immobili ad uso abitativo in Italia oltre alla propria abitazione principale;</li>
                <li>• <strong>Fabbricati Inagibili o Inabitabili:</strong> Riduzione del 50% attestata da perizia tecnica comunale o dichiarazione sostitutiva.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Calcolo IMU (FAQ)
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
