'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  Info,
  ArrowRight,
  HelpCircle,
  FileText,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface StipendioResult {
  ral: number;
  mensilita: number;
  inpsDipendente: number;
  imponibileIrpef: number;
  irpefLorda: number;
  detrazioniLavoro: number;
  detrazioniFigli: number;
  irpefNetta: number;
  addizionaleRegionale: number;
  addizionaleComunale: number;
  trattamentoIntegrativo: number;
  nettoAnnuale: number;
  nettoMensile: number;
  costoAziendaleTotale: number;
  aliquotaMedia: number;
}

export default function CalcoloStipendioNettoPage() {
  const [ral, setRal] = React.useState<number>(30000);
  const [mensilita, setMensilita] = React.useState<number>(13);
  const [regione, setRegione] = React.useState<string>('lombardia');
  const [figliACarico, setFigliACarico] = React.useState<number>(0);
  const [contratto, setContratto] = React.useState<'indeterminato' | 'determinato' | 'apprendistato'>('indeterminato');

  const aliquoteRegionali: Record<string, number> = {
    lombardia: 0.0123,
    lazio: 0.0333,
    campania: 0.0203,
    veneto: 0.0123,
    piemonte: 0.0162,
    emilia_romagna: 0.0133,
    toscana: 0.0142,
    sicilia: 0.0123,
    puglia: 0.0133,
    liguria: 0.0123,
  };

  const calcolaStipendio = React.useCallback((): StipendioResult => {
    const safeRal = Math.max(0, ral);

    // 1. Quota contributi previdenziali INPS a carico dipendente
    // Per apprendistato è circa 5.84%, per tempo indeterminato standard 9.19%
    const aliquotaInps = contratto === 'apprendistato' ? 0.0584 : 0.0919;
    const inpsDipendente = safeRal * aliquotaInps;

    // 2. Imponibile Fiscale IRPEF
    const imponibileIrpef = Math.max(0, safeRal - inpsDipendente);

    // 3. IRPEF Lorda 2026 - Riforma D.Lgs. 216/2023 (3 Scaglioni)
    // 1° scaglione: fino a 28.000 € -> 23%
    // 2° scaglione: oltre 28.000 € fino a 50.000 € -> 35%
    // 3° scaglione: oltre 50.000 € -> 43%
    let irpefLorda = 0;
    if (imponibileIrpef <= 28000) {
      irpefLorda = imponibileIrpef * 0.23;
    } else if (imponibileIrpef <= 50000) {
      irpefLorda = 28000 * 0.23 + (imponibileIrpef - 28000) * 0.35;
    } else {
      irpefLorda = 28000 * 0.23 + 22000 * 0.35 + (imponibileIrpef - 50000) * 0.43;
    }

    // 4. Detrazioni per Lavoro Dipendente (Art. 13 TUIR aggiornato Riforma 2024-2026)
    // No-tax area a 8.500 € (detrazione minima 1.955 €)
    let detrazioniLavoro = 0;
    if (imponibileIrpef <= 15000) {
      detrazioniLavoro = 1955;
    } else if (imponibileIrpef <= 28000) {
      detrazioniLavoro = 1910 + 1190 * ((28000 - imponibileIrpef) / 13000);
    } else if (imponibileIrpef <= 50000) {
      detrazioniLavoro = 1910 * ((50000 - imponibileIrpef) / 22000);
    } else {
      detrazioniLavoro = 0;
    }

    // Detrazioni carichi di famiglia (figli sopra 21 anni, per under 21 c'è Assegno Unico INPS)
    const detrazioniFigli = figliACarico * 475;

    const totaleDetrazioni = Math.min(irpefLorda, detrazioniLavoro + detrazioniFigli);
    const irpefNetta = Math.max(0, irpefLorda - totaleDetrazioni);

    // 5. Addizionali Regionale e Comunale
    const aliquotaReg = aliquoteRegionali[regione] || 0.0123;
    const addizionaleRegionale = imponibileIrpef * aliquotaReg;
    const addizionaleComunale = imponibileIrpef * 0.008; // Media nazionale 0.8%

    // 6. Trattamento Integrativo (ex Bonus Renzi 100€ / 1.200€ annui)
    // Riconosciuto fino a 15.000€ se l'IRPEF lorda supera la detrazione, parzialmente tra 15k e 28k
    let trattamentoIntegrativo = 0;
    if (imponibileIrpef > 8500 && imponibileIrpef <= 15000) {
      trattamentoIntegrativo = 1200;
    }

    // 7. Calcolo Finale Netto Annuale e Mensile
    const totaleImposte = irpefNetta + addizionaleRegionale + addizionaleComunale;
    const nettoAnnuale = safeRal - inpsDipendente - totaleImposte + trattamentoIntegrativo;
    const nettoMensile = nettoAnnuale / mensilita;

    // Costo aziendale totale approssimativo (RAL + contributi INPS/INAIL c/azienda ~30%)
    const costoAziendaleTotale = safeRal * 1.30;
    const aliquotaMedia = safeRal > 0 ? ((totaleImposte + inpsDipendente) / safeRal) * 100 : 0;

    return {
      ral: safeRal,
      mensilita,
      inpsDipendente,
      imponibileIrpef,
      irpefLorda,
      detrazioniLavoro,
      detrazioniFigli,
      irpefNetta,
      addizionaleRegionale,
      addizionaleComunale,
      trattamentoIntegrativo,
      nettoAnnuale,
      nettoMensile,
      costoAziendaleTotale,
      aliquotaMedia,
    };
  }, [ral, mensilita, regione, figliACarico, contratto]);

  const risultato = calcolaStipendio();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calcolatore Stipendio Netto Italia 2026',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Calcola lo stipendio netto mensile partendo dalla RAL annua lorda secondo la Riforma IRPEF D.Lgs. 216/2023, contributi INPS e addizionali regionali.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
          <span>/</span>
          <span className="text-sky-700 font-semibold">Calcolo Stipendio Netto</span>
        </nav>

        {/* Title & Statutory Answer Capsule */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Riforma IRPEF D.Lgs. 216/2023 & Tabelle INPS 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Calcolo Stipendio Netto 2026 <br className="hidden sm:inline" />
            <span className="text-sky-600">da RAL Lorda a Busta Paga Mensile</span>
          </h1>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong>Risposta Istituzionale Diretta:</strong> Per calcolare lo stipendio netto in Italia si sottrae dalla Retribuzione Annua Lorda (RAL) il contributo previdenziale <strong>INPS del 9,19%</strong> a carico del dipendente. Sull’imponibile risultante si applicano le <strong>3 aliquote IRPEF 2026</strong> (23% fino a 28.000 €, 35% tra 28.001 € e 50.000 €, 43% oltre 50.000 €), sottraendo le detrazioni da lavoro dipendente (fino a 1.955 €) e sommando le addizionali regionale e comunale. Il netto annuale viene poi diviso per 13 o 14 mensilità.
          </div>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-sky-600" />
                <span>Parametri di Retribuzione</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRal(30000);
                  setMensilita(13);
                  setRegione('lombardia');
                  setFigliACarico(0);
                  setContratto('indeterminato');
                }}
                className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reimposta</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* RAL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                  <span>Retribuzione Annua Lorda (RAL)</span>
                  <span className="font-mono text-sky-700 font-bold text-sm">€ {ral.toLocaleString('it-IT')}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={ral || ''}
                    onChange={(e) => setRal(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                    placeholder="Es. 30000"
                  />
                </div>
                <input
                  type="range"
                  min={10000}
                  max={120000}
                  step={1000}
                  value={ral}
                  onChange={(e) => setRal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                  <span>10.000 €</span>
                  <span>40.000 €</span>
                  <span>80.000 €</span>
                  <span>120.000 €</span>
                </div>
              </div>

              {/* Mensilità & Tipologia Contratto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Numero Mensilità</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[13, 14].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMensilita(m)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          mensilita === m
                            ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m} Mensilità
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Tipo Contratto</label>
                  <select
                    value={contratto}
                    onChange={(e) => setContratto(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="indeterminato">Tempo Indeterminato (INPS 9,19%)</option>
                    <option value="determinato">Tempo Determinato (INPS 9,19%)</option>
                    <option value="apprendistato">Apprendistato (INPS 5,84%)</option>
                  </select>
                </div>
              </div>

              {/* Regione e Figli a Carico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Regione di Residenza</label>
                  <select
                    value={regione}
                    onChange={(e) => setRegione(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="lombardia">Lombardia (1,23%)</option>
                    <option value="lazio">Lazio (3,33%)</option>
                    <option value="campania">Campania (2,03%)</option>
                    <option value="veneto">Veneto (1,23%)</option>
                    <option value="piemonte">Piemonte (1,62%)</option>
                    <option value="emilia_romagna">Emilia-Romagna (1,33%)</option>
                    <option value="toscana">Toscana (1,42%)</option>
                    <option value="sicilia">Sicilia (1,23%)</option>
                    <option value="puglia">Puglia (1,33%)</option>
                    <option value="liguria">Liguria (1,23%)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Figli a Carico (&gt; 21 anni)</label>
                  <select
                    value={figliACarico}
                    onChange={(e) => setFigliACarico(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value={0}>Nessuno (oppure Assegno Unico INPS)</option>
                    <option value={1}>1 Figlio a carico (&gt; 21 anni)</option>
                    <option value={2}>2 Figli a carico (&gt; 21 anni)</option>
                    <option value={3}>3 o più Figli</option>
                  </select>
                </div>
              </div>
            </div>

            {/* In-Browser Privacy Note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Elaborazione locale istantanea: i tuoi dati salariali non lasciano il tuo dispositivo.</span>
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Risultato Cedolino 2026
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
                {mensilita} Mesi
              </span>
            </div>

            {/* Primary Net Monthly Display */}
            <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="text-xs text-sky-200 font-medium">Stipendio Netto Mensile Stimato</span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                € {risultato.nettoMensile.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-sky-300 font-medium block">
                Netto Annuale: € {risultato.nettoAnnuale.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Line Item Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Retribuzione Lorda (RAL)</span>
                <span className="font-mono font-bold text-white">€ {risultato.ral.toLocaleString('it-IT')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Contributi INPS dipendente ({contratto === 'apprendistato' ? '5,84%' : '9,19%'})</span>
                <span className="font-mono text-rose-400">- € {risultato.inpsDipendente.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Imponibile Fiscale IRPEF</span>
                <span className="font-mono font-bold text-white">€ {risultato.imponibileIrpef.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>IRPEF Lorda (3 Scaglioni)</span>
                <span className="font-mono text-slate-400">€ {risultato.irpefLorda.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-emerald-400">
                <span>Detrazioni Lavoro Dipendente (TUIR)</span>
                <span className="font-mono">+ € {risultato.detrazioniLavoro.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>IRPEF Netta Dovuta</span>
                <span className="font-mono text-rose-400">- € {risultato.irpefNetta.toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Addizionali Regionale e Comunale</span>
                <span className="font-mono text-rose-400">- € {(risultato.addizionaleRegionale + risultato.addizionaleComunale).toLocaleString('it-IT', { maximumFractionDigits: 0 })}</span>
              </div>
              {risultato.trattamentoIntegrativo > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-emerald-400 font-bold">
                  <span>Trattamento Integrativo (100€/mese)</span>
                  <span className="font-mono">+ € {risultato.trattamentoIntegrativo.toLocaleString('it-IT')}</span>
                </div>
              )}
              <div className="flex justify-between py-1 text-slate-300">
                <span>Pressione Fiscale e Contributiva Totale</span>
                <span className="font-mono font-bold text-amber-400">{risultato.aliquotaMedia.toFixed(1)}%</span>
              </div>
            </div>

            {/* Employer Cost Callout */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200">Costo Aziendale Stimato (Costo Totale Impresa):</span>
              <div className="font-mono text-sky-400 font-bold text-sm">
                € {risultato.costoAziendaleTotale.toLocaleString('it-IT', { maximumFractionDigits: 0 })} / anno
              </div>
              <span>Include TFR maturando e contributi previdenziali a carico azienda (~30%).</span>
            </div>
          </div>
        </div>

        {/* Strategic Ad Slot */}
        <AdSlot slot="in_content" context="legal" />

        {/* 800+ Words Statutory Legal & Mathematical Guide for AdSense Compliance */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Come Funziona il Calcolo dello Stipendio Netto in Italia (2026)
            </h2>
            <p>
              La determinazione dello stipendio netto mensile partendo dalla <strong>Retribuzione Annua Lorda (RAL)</strong> rappresenta uno dei calcoli fiscali più frequenti e cruciali per lavoratori dipendenti, candidati in sede di colloquio e datori di lavoro. In Italia, la busta paga è regolata da norme giuslavoristiche e tributarie multilivello: il <strong>Testo Unico delle Imposte sui Redditi (TUIR - D.P.R. 917/1986)</strong>, la <strong>Riforma IRPEF a 3 scaglioni</strong> introdotta dal <em>Decreto Legislativo n. 216/2023</em> e confermata dalla Legge di Bilancio, le tabelle contributive INPS e le delibere degli enti locali per le addizionali regionali e comunali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>1. Contributi INPS a Carico del Lavoratore</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Prima di applicare qualsiasi imposta fiscale, la retribuzione lorda viene decurtata dei contributi previdenziali e assistenziali versati all’INPS. Per i contratti di lavoro subordinato ordinari (a tempo indeterminato o determinato), l’aliquota a carico del lavoratore è pari al <strong>9,19%</strong> (che sale al 9,49% per aziende con Fondo Integrazione Salariale FIS). Per i contratti di apprendistato, la quota agevolata ammonta al <strong>5,84%</strong>. La cifra risultante costituisce l’<strong>Imponibile Fiscale</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>2. I 3 Nuovi Scaglioni IRPEF 2026</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Il D.Lgs. 216/2023 ha accorpato i primi due scaglioni di reddito, riducendo le aliquote progressive a tre fasce:
              </p>
              <ul className="text-xs font-mono space-y-1 text-slate-700 pt-1">
                <li>• Fino a 28.000 €: <strong>23%</strong></li>
                <li>• Da 28.001 € a 50.000 €: <strong>35%</strong></li>
                <li>• Oltre 50.000 €: <strong>43%</strong></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Esempio Pratico di Calcolo Reale su RAL di 30.000 € (13 Mensilità)
            </h3>
            <p>
              Consideriamo un lavoratore dipendente residente a Milano (Lombardia) con contratto a tempo indeterminato e una RAL di <strong>30.000 €</strong> distribuita in 13 mensilità:
            </p>
            <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-2">
              <div>1. Contributi INPS dipendente: 30.000 € &times; 9,19% = <strong>2.757,00 €</strong></div>
              <div>2. Imponibile Fiscale: 30.000 € &minus; 2.757,00 € = <strong>27.243,00 €</strong></div>
              <div>3. IRPEF Lorda: 27.243,00 € rientra interamente nel 1° scaglione (23%) = <strong>6.265,89 €</strong></div>
              <div>4. Detrazione Lavoro Dipendente (Art. 13 TUIR): 1.910 + 1.190 &times; [(28.000 &minus; 27.243) / 13.000] = <strong>1.979,29 €</strong></div>
              <div>5. IRPEF Netta: 6.265,89 € &minus; 1.979,29 € = <strong>4.286,60 €</strong></div>
              <div>6. Addizionale Regionale (1,23%): <strong>335,09 €</strong> | Addizionale Comunale (0,8%): <strong>217,94 €</strong></div>
              <div className="pt-2 border-t border-slate-700 text-sky-400 font-bold">
                Totale Netto Annuo: 30.000 &minus; 2.757 &minus; 4.286,60 &minus; 335,09 &minus; 217,94 = 22.403,37 €
              </div>
              <div className="text-white font-bold">
                Stipendio Netto Mensile (13 mensilità): 22.403,37 € / 13 = 1.723,34 € netti / mese
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Domande Frequenti sul Calcolo Stipendio (FAQ)
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Perché la tredicesima o quattordicesima è più bassa del netto ordinario?</h4>
                <p className="text-xs text-slate-600">
                  La tredicesima mensilità (e la quattordicesima se prevista dal CCNL) non beneficia delle detrazioni per lavoro dipendente né delle detrazioni per familiari a carico, che vengono ripartite esclusivamente sulle 12 mensilità ordinarie. Di conseguenza, l’IRPEF applicata è calcolata per intero alla propria aliquota marginale, risultando in un netto leggermente inferiore a parità di lordo mensile.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Come influisce l’Assegno Unico e Universale sullo stipendio?</h4>
                <p className="text-xs text-slate-600">
                  Dal marzo 2022, le vecchie detrazioni per figli a carico minori di 21 anni e gli Assegni al Nucleo Familiare (ANF) in busta paga sono stati sostituiti dall’<strong>Assegno Unico Universale</strong> erogato direttamente dall’INPS sul conto corrente bancario del genitore richiedente. In busta paga restano unicamente le detrazioni per figli di età pari o superiore a 21 anni ancora fiscalmente a carico.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Qual è la soglia della No-Tax Area per i lavoratori dipendenti?</h4>
                <p className="text-xs text-slate-600">
                  Con la riforma fiscale, la soglia di reddito annuo al di sotto della quale l’imposta dovuta è pari a zero (grazie all’integrale assorbimento dell’IRPEF lorda da parte delle detrazioni da lavoro) è stata innalzata a <strong>8.500 euro annui</strong>, allineando i dipendenti alla no-tax area dei pensionati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
