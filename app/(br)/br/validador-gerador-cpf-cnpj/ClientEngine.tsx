'use client';

import * as React from 'react';
import {
  Binary,
  CheckCircle2,
  XCircle,
  Copy,
  RotateCcw,
} from 'lucide-react';

// Algoritmos oficiais da Receita Federal (Módulo 11)
function validarCPF(cpf: string): { valido: boolean; motivo?: string } {
  const limpo = cpf.replace(/\D/g, '');
  if (limpo.length !== 11) {
    return { valido: false, motivo: 'O CPF deve possuir exatamente 11 dígitos numéricos.' };
  }
  // Elimina CPFs com dígitos todos iguais (111.111.111-11, etc.)
  if (/^(\d)\1{10}$/.test(limpo)) {
    return { valido: false, motivo: 'Sequência com todos os dígitos idênticos é matematicamente inválida.' };
  }

  // Primeiro Dígito Verificador (DV1)
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(limpo.charAt(9), 10)) {
    return { valido: false, motivo: 'Primeiro dígito verificador incorreto segundo o Módulo 11.' };
  }

  // Segundo Dígito Verificador (DV2)
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(limpo.charAt(10), 10)) {
    return { valido: false, motivo: 'Segundo dígito verificador incorreto segundo o Módulo 11.' };
  }

  return { valido: true };
}

function validarCNPJ(cnpj: string): { valido: boolean; motivo?: string } {
  const limpo = cnpj.replace(/\D/g, '');
  if (limpo.length !== 14) {
    return { valido: false, motivo: 'O CNPJ numérico padrão deve possuir exatamente 14 dígitos.' };
  }
  if (/^(\d)\1{13}$/.test(limpo)) {
    return { valido: false, motivo: 'Sequência com dígitos todos idênticos é matematicamente inválida.' };
  }

  // Primeiro DV: pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(limpo.charAt(i), 10) * pesos1[i];
  }
  let resto = soma % 11;
  const dv1 = resto < 2 ? 0 : 11 - resto;
  if (dv1 !== parseInt(limpo.charAt(12), 10)) {
    return { valido: false, motivo: 'Primeiro dígito verificador incorreto segundo o Módulo 11.' };
  }

  // Segundo DV: pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(limpo.charAt(i), 10) * pesos2[i];
  }
  resto = soma % 11;
  const dv2 = resto < 2 ? 0 : 11 - resto;
  if (dv2 !== parseInt(limpo.charAt(13), 10)) {
    return { valido: false, motivo: 'Segundo dígito verificador incorreto segundo o Módulo 11.' };
  }

  return { valido: true };
}

function gerarCPFValido(): string {
  const noveDigitos: number[] = [];
  for (let i = 0; i < 9; i++) {
    noveDigitos.push(Math.floor(Math.random() * 10));
  }

  // DV1
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += noveDigitos[i] * (10 - i);
  }
  let resto = (soma * 10) % 11;
  const dv1 = resto === 10 || resto === 11 ? 0 : resto;
  noveDigitos.push(dv1);

  // DV2
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += noveDigitos[i] * (11 - i);
  }
  resto = (soma * 10) % 11;
  const dv2 = resto === 10 || resto === 11 ? 0 : resto;
  noveDigitos.push(dv2);

  return noveDigitos.join('');
}

function gerarCNPJValido(): string {
  const oitoDigitos: number[] = [];
  for (let i = 0; i < 8; i++) {
    oitoDigitos.push(Math.floor(Math.random() * 10));
  }
  // Matriz padrão 0001
  const base = [...oitoDigitos, 0, 0, 0, 1];

  // DV1
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += base[i] * pesos1[i];
  }
  let resto = soma % 11;
  const dv1 = resto < 2 ? 0 : 11 - resto;
  base.push(dv1);

  // DV2
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += base[i] * pesos2[i];
  }
  resto = soma % 11;
  const dv2 = resto < 2 ? 0 : 11 - resto;
  base.push(dv2);

  return base.join('');
}

function formatarMascaraCPF(num: string): string {
  const limpo = num.replace(/\D/g, '').slice(0, 11);
  return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarMascaraCNPJ(num: string): string {
  const limpo = num.replace(/\D/g, '').slice(0, 14);
  return limpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function ValidadorGeradorCpfCnpjClient() {
  const [tipoDoc, setTipoDoc] = React.useState<'cpf' | 'cnpj'>('cpf');
  const [modoAba, setModoAba] = React.useState<'validar' | 'gerar'>('validar');

  // Aba Validar
  const [inputDocumento, setInputDocumento] = React.useState<string>('');

  // Aba Gerar
  const [comPontuacao, setComPontuacao] = React.useState<boolean>(true);
  const [documentoGerado, setDocumentoGerado] = React.useState<string>('');
  const [copiado, setCopiado] = React.useState<boolean>(false);

  // Validação dinâmica
  const validacaoResultado = React.useMemo(() => {
    if (!inputDocumento.trim()) return null;
    if (tipoDoc === 'cpf') {
      return validarCPF(inputDocumento);
    } else {
      return validarCNPJ(inputDocumento);
    }
  }, [inputDocumento, tipoDoc]);

  const gerarNovoDoc = React.useCallback(() => {
    if (tipoDoc === 'cpf') {
      const raw = gerarCPFValido();
      setDocumentoGerado(comPontuacao ? formatarMascaraCPF(raw) : raw);
    } else {
      const raw = gerarCNPJValido();
      setDocumentoGerado(comPontuacao ? formatarMascaraCNPJ(raw) : raw);
    }
  }, [tipoDoc, comPontuacao]);

  // Gerar inicial
  React.useEffect(() => {
    gerarNovoDoc();
  }, [gerarNovoDoc]);

  const copiarGerado = () => {
    navigator.clipboard.writeText(documentoGerado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-8 space-y-6">
      {/* Tipo de Documento: CPF vs CNPJ */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTipoDoc('cpf')}
            className={`py-2 px-5 rounded-xl font-bold text-sm transition ${
              tipoDoc === 'cpf'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            CPF (11 dígitos)
          </button>
          <button
            type="button"
            onClick={() => setTipoDoc('cnpj')}
            className={`py-2 px-5 rounded-xl font-bold text-sm transition ${
              tipoDoc === 'cnpj'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            CNPJ (14 dígitos)
          </button>
        </div>

        {/* Operação: Validar vs Gerar */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setModoAba('validar')}
            className={`py-1.5 px-4 rounded-lg font-bold text-xs transition ${
              modoAba === 'validar'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Validar Documento
          </button>
          <button
            type="button"
            onClick={() => setModoAba('gerar')}
            className={`py-1.5 px-4 rounded-lg font-bold text-xs transition ${
              modoAba === 'gerar'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gerar para Testes
          </button>
        </div>
      </div>

      {/* ABA VALIDAR */}
      {modoAba === 'validar' && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Insira o número do {tipoDoc.toUpperCase()} (com ou sem pontuação)
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputDocumento}
              onChange={(e) => setInputDocumento(e.target.value)}
              placeholder={tipoDoc === 'cpf' ? '000.000.000-00 ou 11 dígitos' : '00.000.000/0001-00 ou 14 dígitos'}
              className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white font-mono text-lg text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {inputDocumento && (
              <button
                type="button"
                onClick={() => setInputDocumento('')}
                className="absolute right-3.5 top-4 text-slate-400 hover:text-slate-600"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status da Validação */}
          {validacaoResultado !== null && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition ${
                validacaoResultado.valido
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {validacaoResultado.valido ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {validacaoResultado.valido
                    ? `${tipoDoc.toUpperCase()} com Dígitos Verificadores Válidos!`
                    : `${tipoDoc.toUpperCase()} Inválido`}
                </h4>
                <p className="text-xs mt-1 text-slate-700">
                  {validacaoResultado.valido
                    ? `Os dois dígitos verificadores atendem com exatidão ao cálculo oficial de Módulo 11 estabelecido pela Receita Federal.`
                    : validacaoResultado.motivo}
                </p>
                {validacaoResultado.valido && (
                  <div className="mt-2 text-xs font-mono text-slate-600">
                    Formatado: {tipoDoc === 'cpf' ? formatarMascaraCPF(inputDocumento) : formatarMascaraCNPJ(inputDocumento)} | Sem máscara: {inputDocumento.replace(/\D/g, '')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ABA GERAR */}
      {modoAba === 'gerar' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              {tipoDoc.toUpperCase()} Válido Gerado (Algoritmo Módulo 11):
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
              <input
                type="checkbox"
                checked={comPontuacao}
                onChange={(e) => setComPontuacao(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              Incluir máscara de pontuação
            </label>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <span className="font-mono text-2xl font-bold tracking-widest text-emerald-400">
              {documentoGerado}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copiarGerado}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition"
              >
                {copiado ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                type="button"
                onClick={gerarNovoDoc}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Gerar Outro
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>Nota ética e de conformidade:</strong> Os números gerados por este algoritmo cumprem rigorosamente a fórmula matemática de Módulo 11 para testes unitários, testes de carga e homologação de APIs bancárias e fiscais. O uso para fraudes ou simulações indevidas é estritamente proibido pelo Código Penal Brasileiro (Art. 299 - Falsidade Ideológica).
          </div>
        </div>
      )}
    </div>
  );
}

