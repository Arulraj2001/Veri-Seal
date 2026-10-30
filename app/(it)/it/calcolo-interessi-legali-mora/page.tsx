'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Coins,
  Copy,
  Check,
  Building,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface InteressiResult {
  capitale: number;
  giorniRitardo: number;
  tassoApplicato: number;
  quotaInteressi: number;
  speseForfettarie: number;
  totaleDovuto: number;
  formulaSpiegata: string;
}

export default function CalcoloInteressiLegaliMoraPage() {
  const [capitale, setCapitale] = React.useState<number>(5000);
  const [dataScadenza, setDataScadenza] = React.useState<string>('2026-01-15');
  const [dataPagamento, setDataPagamento] = React.useState<string>('2026-05-30');
  const [regime, setRegime] = React.useState<'commerciale_b2b' | 'agroalimentare' | 'legale_civile'>('commerciale_b2b');
  const [includeSpese40, setIncludeSpese40] = React.useState<boolean>(true);
  const [tassoCustom, setTassoCustom] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Tassi di riferimento
  const getTassoDefault = React.useCallback((): number => {
    switch (regime) {
      case 'commerciale_b2b':
        // Tasso BCE rifinanziamento (es. 3.25%) + 8% maggiorazione = 11.25%
        return 11.25;
      case 'agroalimentare':
        // D.Lgs. 198/2021: BCE + 9% maggiorazione per prodotti deteriorabili = 12.25%
        return 12.25;
      case 'legale_civile':
      default:
        // Art. 1284 c.c. D.M. Economia e Finanze
        return 2.0;
    }
  }, [regime]);

  const tassoEffettivo = tassoCustom !== null ? tassoCustom : getTassoDefault();

  const calcolaInteressi = React.useCallback((): InteressiResult => {
    const safeCapitale = Math.max(0, capitale);
    const dScadenza = new Date(dataScadenza);
    const dPagamento = new Date(dataPagamento);

    const diffTime = dPagamento.getTime() - dScadenza.getTime();
    const giorniRitardo = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    // Formula calcolo interessi commerciali e legali al giorno (Convenzione civile ACT/365)
    // I = (C * r * t) / 36500
    const quotaInteressi = (safeCapitale * tassoEffettivo * giorniRitardo) / 36500;
    const spese = regime !== 'legale_civile' && includeSpese40 && giorniRitardo > 0 ? 40 : 0;
    const totaleDovuto = safeCapitale + quotaInteressi + spese;

    const formulaSpiegata = `(${safeCapitale.toFixed(2)} € × ${tassoEffettivo}% × ${giorniRitardo} gg) / 36500 = ${quotaInteressi.toFixed(2)} €`;

    return {
      capitale: safeCapitale,
      giorniRitardo,
      tassoApplicato: tassoEffettivo,
      quotaInteressi,
      speseForfettarie: spese,
      totaleDovuto,
      formulaSpiegata,
    };
  }, [capitale, dataScadenza, dataPagamento, tassoEffettivo, regime, includeSpese40]);

  const res = calcolaInteressi();

  const handleCopySollecito = () => {
    const testoSollecito = `OGGETTO: Costituzione in mora e sollecito pagamento fattura scaduta ex D.Lgs. 231/2002\n\nCon la presente Vi intimiamo il formale pagamento dell'importo di Euro ${res.totaleDovuto.toFixed(2)} a saldo della posizione scaduta in data ${dataScadenza}.\n\nDettaglio contabile aggiornato al ${dataPagamento}:\n- Sorte capitale non versata: € ${res.capitale.toFixed(2)}\n- Interessi di mora maturati (${res.giorniRitardo} giorni al tasso del ${res.tassoApplicato}%): € ${res.quotaInteressi.toFixed(2)}\n${res.speseForfettarie > 0 ? `- Risarcimento forfettario spese di recupero (Art. 6 c. 2 D.Lgs. 231/2002): € 40,00\n` : ''}- TOTALE DOVUTO: € ${res.totaleDovuto.toFixed(2)}\n\nIn difetto di pagamento entro 5 giorni dal ricevimento, si procederà ad adire l'autorità giudiziaria competente per decreto ingiuntivo telematico con aggravio di spese legali.`;
    navigator.clipboard.writeText(testoSollecito);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/it" className="hover:text-slate-800 transition-colors">Italia</Link>
        <span>/</span>
        <span className="text-sky-700 font-semibold">Interessi di Mora & Legali</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>D.Lgs. 231/2002, Direttiva 2011/7/UE & Art. 1284 c.c.</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calcolo Interessi di Mora Commerciali e Legali <br className="hidden sm:inline" />
          <span className="text-sky-600">Transazioni B2B, P.A. e Risarcimento 40€</span>
        </h1>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Risposta Giuridica Diretta:</strong> Nelle transazioni commerciali tra imprese o con la Pubblica Amministrazione (D.Lgs. 231/2002), gli <strong>interessi di mora scattano automaticamente</strong> dal giorno successivo alla scadenza del pagamento, senza necessità di formale costituzione in mora. Il tasso applicato è pari al <strong>tasso BCE sulle operazioni di rifinanziamento maggiorato di 8 punti percentuali</strong> (oppure 9 punti per i prodotti agroalimentari deteriorabili ex D.Lgs. 198/2021). Inoltre, il creditore ha diritto a un risarcimento forfettario di <strong>40,00 €</strong> a titolo di spese di recupero.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Scale className="w-4 h-4 text-sky-600" />
              <span>Parametri del Credito Insoluto</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCapitale(5000);
                setDataScadenza('2026-01-15');
                setDataPagamento('2026-05-30');
                setRegime('commerciale_b2b');
                setIncludeSpese40(true);
                setTassoCustom(null);
              }}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimposta</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Regime Giuridico */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regime e Ambito Giuridico</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRegime('commerciale_b2b');
                    setTassoCustom(null);
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    regime === 'commerciale_b2b'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>B2B & P.A.</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">D.Lgs. 231/02 (BCE + 8%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRegime('agroalimentare');
                    setTassoCustom(null);
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    regime === 'agroalimentare'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Agroalimentare</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">D.Lgs. 198/21 (BCE + 9%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRegime('legale_civile');
                    setTassoCustom(null);
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    regime === 'legale_civile'
                      ? 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Civile / Privati</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Art. 1284 c.c. Legale</span>
                </button>
              </div>
            </div>

            {/* Capitale Non Pagato */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Capitale Scaduto / Importo Fattura (€)</span>
                <span className="font-mono text-sky-700 font-bold text-sm">€ {capitale.toLocaleString('it-IT')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={capitale || ''}
                onChange={(e) => setCapitale(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm font-bold text-slate-900 transition-all"
                placeholder="Es. 5000"
              />
            </div>

            {/* Date Scadenza e Calcolo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Data Scadenza Fattura</label>
                <input
                  type="date"
                  value={dataScadenza}
                  onChange={(e) => setDataScadenza(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Data Conteggio / Saldo</label>
                <input
                  type="date"
                  value={dataPagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Tasso Applicato & Opzioni */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Saggio di Interesse Applicato (% annuo)</span>
                <span className="font-mono text-sky-700 font-bold">{tassoEffettivo}%</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step={0.05}
                  min={0}
                  max={30}
                  value={tassoEffettivo}
                  onChange={(e) => setTassoCustom(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                {tassoCustom !== null && (
                  <button
                    type="button"
                    onClick={() => setTassoCustom(null)}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0"
                  >
                    Ufficiale
                  </button>
                )}
              </div>
            </div>

            {/* Spese 40€ D.Lgs. 231 */}
            {regime !== 'legale_civile' && (
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSpese40}
                  onChange={(e) => setIncludeSpese40(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <span className="text-xs text-slate-800 font-medium">
                  Includi indennizzo forfettario di <strong>40,00 €</strong> per spese di recupero (Art. 6 c. 2 D.Lgs. 231/2002)
                </span>
              </label>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Calcolo conforme alla convenzione civile ACT/365 senza capitalizzazione (anatocismo escluso).</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Totale Liquidabile al Creditore
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono">
              {res.giorniRitardo} Giorni di Mora
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 space-y-1">
            <span className="text-xs text-sky-200 font-medium">Importo Totale da Saldo / Ingiunzione</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              € {res.totaleDovuto.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-sky-300 font-mono block">
              Tasso: {res.tassoApplicato}% su base annua 365 gg
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Sorte capitale originale</span>
              <span className="font-mono text-white">€ {res.capitale.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Interessi maturati ({res.giorniRitardo} gg)</span>
              <span className="font-mono text-amber-400 font-bold">+ € {res.quotaInteressi.toFixed(2)}</span>
            </div>
            {res.speseForfettarie > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Indennizzo forfettario spese (art. 6)</span>
                <span className="font-mono text-emerald-400 font-bold">+ € {res.speseForfettarie.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300">Formula Matematica Applicata:</strong>
            <p className="font-mono text-sky-300 text-[10px] break-all">{res.formulaSpiegata}</p>
          </div>

          <button
            type="button"
            onClick={handleCopySollecito}
            className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Testo Sollecito Copiato!' : 'Copia Testo Diffida / Messa in Mora'}</span>
          </button>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Disciplina degli Interessi di Mora tra Imprese e con la P.A. (D.Lgs. 231/2002)
          </h2>
          <p>
            Il <strong>Decreto Legislativo 9 ottobre 2002, n. 231</strong>, emanato in attuazione della Direttiva Europea 2000/35/CE e successivamente modificato dal D.Lgs. 192/2012 (recepimento Direttiva 2011/7/UE), disciplina la lotta contro i ritardi di pagamento nelle transazioni commerciali.
          </p>
          <p>
            A differenza delle obbligazioni civili ordinarie disciplinate dall’Articolo 1284 del Codice Civile, nei rapporti tra imprese (B2B) e nei rapporti tra imprese e Pubblica Amministrazione (B2G), la tutela accordata al creditore è rafforzata:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Decorrenza Automatica:</strong> Gli interessi moratori decorrono dal giorno successivo alla scadenza del termine di pagamento pattuito, senza che sia necessario alcun atto formale di costituzione in mora o intimazione scritta (Art. 4 D.Lgs. 231/2002).
            </li>
            <li>
              <strong>Tasso Altamente Dissuasivo:</strong> Il saggio degli interessi moratori è calcolato semestralmente sommando al <em>tasso di riferimento della Banca Centrale Europea (BCE)</em> sulle operazioni di rifinanziamento principali una maggiorazione obbligatoria di <strong>8 punti percentuali</strong> (elevata a 9 punti per i prodotti agroalimentari deteriorabili).
            </li>
            <li>
              <strong>Risarcimento Forfettario di 40 Euro:</strong> Ai sensi dell'Articolo 6, comma 2, del D.Lgs. 231/2002, il creditore ha diritto, a prescindere dalla prova di aver subito un danno effettivo, a un importo forfettario di 40,00 € per ciascuna fattura scaduta a titolo di rimborso delle spese amministrative e di recupero stragiudiziale sostenute.
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Differenza tra Interessi Legali Civilistici e Interessi Moratori Commerciali
          </h3>
          <p>
            È fondamentale distinguere l'ambito di applicazione per non richiedere tassi errati:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm border-collapse">
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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Formula di Calcolo al Giorno (Convenzione Civile ACT/365)
          </h3>
          <p>
            Gli interessi di mora maturano quotidianamente secondo la formula standard del codice civile:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
            <p><strong>I = (C × r × g) / 36.500</strong></p>
            <p className="text-xs text-slate-600 font-sans">
              Dove <strong>C</strong> è il capitale originario in euro, <strong>r</strong> è il saggio di interesse percentuale annuo e <strong>g</strong> è il numero di giorni di ritardo effettivi trascorsi tra la scadenza e il saldo.
            </p>
          </div>
          <p className="text-xs text-slate-600">
            <em>Nota sul divieto di anatocismo (Art. 1283 c.c.):</em> Salvo patto contrario successivo alla scadenza o domanda giudiziale formale, gli interessi scaduti non producono ulteriori interessi (divieto di capitalizzazione infrannuale).
          </p>
        </div>
      </div>
    </div>
  );
}
