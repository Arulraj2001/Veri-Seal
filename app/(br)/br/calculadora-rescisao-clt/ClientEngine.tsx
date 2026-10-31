'use client';

import * as React from 'react';
import {
  Briefcase,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface RescisaoResult {
  diasTrabalhadosMes: number;
  saldoSalario: number;
  anosCompletos: number;
  diasAvisoPrevio: number;
  valorAvisoPrevio: number;
  meses13Proporcional: number;
  decimoTerceiroProporcional: number;
  mesesFeriasProporcionais: number;
  feriasProporcionaisComTerco: number;
  feriasVencidasComTerco: number;
  multaFgts: number;
  descontoInssEstimado: number;
  descontoAvisoNaoCumprido: number;
  totalBrutoRescisao: number;
  totalLiquidoRescisao: number;
  saqueFgtsLiberado: number;
  prazoPagamentoTexto: string;
}

export function CalculadoraRescisaoCltClient() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(3800);
  const [dataAdmissao, setDataAdmissao] = React.useState<string>('2023-03-01');
  const [dataDemissao, setDataDemissao] = React.useState<string>('2026-04-15');
  const [motivo, setMotivo] = React.useState<'sem_justa_causa' | 'pedido_demissao' | 'acordo_mutuo' | 'com_justa_causa'>('sem_justa_causa');
  const [avisoPrevio, setAvisoPrevio] = React.useState<'indenizado' | 'trabalhado' | 'dispensado_descontado'>('indenizado');
  const [saldoFgts, setSaldoFgts] = React.useState<number>(9500);
  const [temFeriasVencidas, setTemFeriasVencidas] = React.useState<boolean>(false);

  const calcolaRescisao = React.useCallback((): RescisaoResult => {
    const salario = Math.max(0, salarioBruto);
    const dAdm = new Date(dataAdmissao);
    const dDem = new Date(dataDemissao);

    const diffTime = Math.max(0, dDem.getTime() - dAdm.getTime());
    const anosCompletos = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));

    // Lei 12.506/2011: Aviso Prévio Proporcional (30 dias + 3 dias por ano completo, max 90 dias)
    const diasAvisoPrevio = Math.min(90, 30 + anosCompletos * 3);

    const diaDoMes = dDem.getDate();
    const diasTrabalhadosMes = Math.min(30, diaDoMes);
    const valorDia = salario / 30;
    const saldoSalario = diasTrabalhadosMes * valorDia;

    let valorAvisoPrevio = 0;
    let descontoAvisoNaoCumprido = 0;

    if (motivo === 'sem_justa_causa') {
      if (avisoPrevio === 'indenizado') {
        valorAvisoPrevio = valorDia * diasAvisoPrevio;
      }
    } else if (motivo === 'acordo_mutuo') {
      if (avisoPrevio === 'indenizado') {
        valorAvisoPrevio = (valorDia * diasAvisoPrevio) * 0.5;
      }
    } else if (motivo === 'pedido_demissao') {
      if (avisoPrevio === 'dispensado_descontado') {
        descontoAvisoNaoCumprido = salario;
      }
    }

    const mesDemissao = dDem.getMonth() + 1;
    let meses13 = diaDoMes >= 15 ? mesDemissao : Math.max(0, mesDemissao - 1);

    if (motivo === 'sem_justa_causa' && avisoPrevio === 'indenizado') {
      const dataProjetada = new Date(dDem);
      dataProjetada.setDate(dataProjetada.getDate() + diasAvisoPrevio);
      const mesProj = dataProjetada.getMonth() + 1;
      meses13 = Math.min(12, Math.max(meses13, mesProj));
    }

    let decimoTerceiroProporcional = 0;
    if (motivo !== 'com_justa_causa') {
      decimoTerceiroProporcional = (salario / 12) * meses13;
    }

    let mesesFerias = Math.round(((dDem.getTime() - dAdm.getTime()) / (1000 * 60 * 60 * 24 * 30.4375)) % 12);
    if (mesesFerias === 0 && diffTime > 0) mesesFerias = 12;

    let feriasProporcionaisComTerco = 0;
    if (motivo !== 'com_justa_causa') {
      const feriasPropSimples = (salario / 12) * mesesFerias;
      feriasProporcionaisComTerco = feriasPropSimples * (4 / 3);
    }

    let feriasVencidasComTerco = 0;
    if (temFeriasVencidas) {
      feriasVencidasComTerco = salario * (4 / 3);
    }

    let multaFgts = 0;
    let saqueFgtsLiberado = 0;

    if (motivo === 'sem_justa_causa') {
      multaFgts = saldoFgts * 0.4;
      saqueFgtsLiberado = saldoFgts + multaFgts;
    } else if (motivo === 'acordo_mutuo') {
      multaFgts = saldoFgts * 0.2;
      saqueFgtsLiberado = saldoFgts * 0.8 + multaFgts;
    } else {
      multaFgts = 0;
      saqueFgtsLiberado = 0;
    }

    const inssSaldo = saldoSalario * 0.08;
    const inss13 = decimoTerceiroProporcional * 0.08;
    const descontoInssEstimado = inssSaldo + inss13;

    const totalBrutoRescisao =
      saldoSalario +
      valorAvisoPrevio +
      decimoTerceiroProporcional +
      feriasProporcionaisComTerco +
      feriasVencidasComTerco;

    const totalLiquidoRescisao = Math.max(
      0,
      totalBrutoRescisao - descontoInssEstimado - descontoAvisoNaoCumprido
    );

    const prazoPagamentoTexto = 'Até 10 (dez) dias corridos a partir do término do contrato de trabalho (Art. 477 § 6º da CLT).';

    return {
      diasTrabalhadosMes,
      saldoSalario,
      anosCompletos,
      diasAvisoPrevio,
      valorAvisoPrevio,
      meses13Proporcional: meses13,
      decimoTerceiroProporcional,
      mesesFeriasProporcionais: mesesFerias,
      feriasProporcionaisComTerco,
      feriasVencidasComTerco,
      multaFgts,
      descontoInssEstimado,
      descontoAvisoNaoCumprido,
      totalBrutoRescisao,
      totalLiquidoRescisao,
      saqueFgtsLiberado,
      prazoPagamentoTexto,
    };
  }, [salarioBruto, dataAdmissao, dataDemissao, motivo, avisoPrevio, saldoFgts, temFeriasVencidas]);

  const res = calcolaRescisao();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Parâmetros do Vínculo Empregatício</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioBruto(3800);
              setDataAdmissao('2023-03-01');
              setDataDemissao('2026-04-15');
              setMotivo('sem_justa_causa');
              setAvisoPrevio('indenizado');
              setSaldoFgts(9500);
              setTemFeriasVencidas(false);
            }}
            className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Salário Base */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Último Salário Bruto Mensal (R$)</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={100}
              value={salarioBruto || ''}
              onChange={(e) => setSalarioBruto(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
              placeholder="Ex. 3800.00"
            />
          </div>

          {/* Motivo da Rescisão */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Motivo do Desligamento</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMotivo('sem_justa_causa')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  motivo === 'sem_justa_causa'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Demissão Sem Justa Causa</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">Direito a 40% FGTS + Seguro</span>
              </button>

              <button
                type="button"
                onClick={() => setMotivo('pedido_demissao')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  motivo === 'pedido_demissao'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Pedido de Demissão</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">Iniciativa do empregado</span>
              </button>

              <button
                type="button"
                onClick={() => setMotivo('acordo_mutuo')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  motivo === 'acordo_mutuo'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Acordo Mútuo (Art. 484-A)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">20% multa FGTS + 80% saque</span>
              </button>

              <button
                type="button"
                onClick={() => setMotivo('com_justa_causa')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  motivo === 'com_justa_causa'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Demissão Com Justa Causa</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">Art. 482 CLT (Falta grave)</span>
              </button>
            </div>
          </div>

          {/* Datas de Admissão e Afastamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Data de Admissão</label>
              <input
                type="date"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Data do Último Dia / Afastamento</label>
              <input
                type="date"
                value={dataDemissao}
                onChange={(e) => setDataDemissao(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Tipo de Aviso Prévio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
              <span>Condição do Aviso Prévio</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{res.diasAvisoPrevio} dias calculados</span>
            </label>
            <select
              value={avisoPrevio}
              onChange={(e) => setAvisoPrevio(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="indenizado">Aviso Prévio Indenizado (Pago pela empresa sem trabalhar)</option>
              <option value="trabalhado">Aviso Prévio Trabalhado (Cumprido integralmente)</option>
              <option value="dispensado_descontado">Aviso Não Cumprido / Descontado do Empregado</option>
            </select>
          </div>

          {/* Saldo FGTS & Férias Vencidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Saldo Depositado FGTS (R$)</label>
              <input
                type="number"
                min={0}
                step={500}
                value={saldoFgts || ''}
                onChange={(e) => setSaldoFgts(Number(e.target.value))}
                placeholder="Ex. 9500.00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={temFeriasVencidas}
                  onChange={(e) => setTemFeriasVencidas(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  Possui <strong>férias vencidas</strong> a indenizar (+1/3)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Cálculo atualizado com a projeção do aviso prévio indenizado da Lei 12.506/2011.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Total Líquido da Rescisão
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            TRCT Oficial
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-200 font-medium">Valor a Ser Pago pelo Empregador</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.totalLiquidoRescisao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-300 font-medium block">
            {res.anosCompletos} anos e {res.diasAvisoPrevio} dias de aviso proporcional
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Saldo de Salário ({res.diasTrabalhadosMes} dias)</span>
            <span className="font-mono text-white">R$ {res.saldoSalario.toFixed(2)}</span>
          </div>
          {res.valorAvisoPrevio > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Aviso Prévio Indenizado ({res.diasAvisoPrevio} dias)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.valorAvisoPrevio.toFixed(2)}</span>
            </div>
          )}
          {res.decimoTerceiroProporcional > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>13º Salário Proporcional ({res.meses13Proporcional}/12 avos)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.decimoTerceiroProporcional.toFixed(2)}</span>
            </div>
          )}
          {res.feriasProporcionaisComTerco > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Férias Proporcionais + 1/3 ({res.mesesFeriasProporcionais}/12 avos)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.feriasProporcionaisComTerco.toFixed(2)}</span>
            </div>
          )}
          {res.feriasVencidasComTerco > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Férias Vencidas + 1/3 (Integral)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.feriasVencidasComTerco.toFixed(2)}</span>
            </div>
          )}
          {res.descontoAvisoNaoCumprido > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto Aviso Não Cumprido</span>
              <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoAvisoNaoCumprido.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Desconto INSS Estimado</span>
            <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoInssEstimado.toFixed(2)}</span>
          </div>
          {res.multaFgts > 0 && (
            <div className="flex justify-between py-1 pt-1.5 text-slate-200">
              <span>Multa Rescisória FGTS ({motivo === 'acordo_mutuo' ? '20%' : '40%'})</span>
              <span className="font-mono text-cyan-400 font-bold">R$ {res.multaFgts.toFixed(2)}</span>
            </div>
          )}
          {res.saqueFgtsLiberado > 0 && (
            <div className="flex justify-between py-1 text-slate-200">
              <span>Total Liberado para Saque FGTS</span>
              <span className="font-mono text-cyan-300 font-bold">R$ {res.saqueFgtsLiberado.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Prazo de Pagamento (Art. 477 § 6º CLT):</strong>
          <p>{res.prazoPagamentoTexto}</p>
        </div>
      </div>
    </div>
  );
}

