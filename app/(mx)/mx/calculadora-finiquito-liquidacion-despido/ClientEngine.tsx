'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Briefcase,
  AlertTriangle,
  Scale,
  Calendar,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UMA_DIARIA_2026 = 113.14;
const SALARIO_MINIMO_GENERAL_2026 = 278.80; // Salario Mínimo General vigente aproximado 2026
const TOPE_PRIMA_ANTIGUEDAD = SALARIO_MINIMO_GENERAL_2026 * 2; // Art. 486 LFT: tope 2 salarios mínimos

export default function CalculadoraFiniquitoLiquidacionMexicoPage() {
  const [tipoSeparacion, setTipoSeparacion] = React.useState<'despido_injustificado' | 'renuncia_voluntaria'>('despido_injustificado');
  const [salarioMensualBruto, setSalarioMensualBruto] = React.useState<number>(20000);
  const [antiguedadAnos, setAntiguedadAnos] = React.useState<number>(3);
  const [diasTrabajadosAnoActual, setDiasTrabajadosAnoActual] = React.useState<number>(180);
  const [diasVacacionesPendientes, setDiasVacacionesPendientes] = React.useState<number>(6);
  const [diasAguinaldoConvenio, setDiasAguinaldoConvenio] = React.useState<number>(15);
  const [porcentajePrimaVacacional, setPorcentajePrimaVacacional] = React.useState<number>(25);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Cálculos base
  const salarioDiario = salarioMensualBruto / 30;
  
  // Salario Diario Integrado (SDI) para indemnizaciones
  // Factor de integración mínimo de ley: 1 + (15/365) + (diasVacaciones * 0.25 / 365)
  // Determinamos vacaciones según antigüedad (Art. 76 LFT reformado)
  const diasVacacionesLey = antiguedadAnos <= 1 ? 12 : antiguedadAnos === 2 ? 14 : antiguedadAnos === 3 ? 16 : antiguedadAnos === 4 ? 18 : antiguedadAnos <= 9 ? 20 : 22;
  const factorIntegracion = 1 + (diasAguinaldoConvenio / 365) + ((diasVacacionesLey * (porcentajePrimaVacacional / 100)) / 365);
  const sdi = salarioDiario * factorIntegracion;

  // 1. FINIQUITO (Partes Proporcionales de Ley)
  // Aguinaldo proporcional
  const aguinaldoProporcional = (diasAguinaldoConvenio / 365) * diasTrabajadosAnoActual * salarioDiario;
  // Vacaciones proporcionales
  const vacacionesProporcionales = (diasVacacionesPendientes) * salarioDiario;
  // Prima vacacional proporcional
  const primaVacacionalProporcional = vacacionesProporcionales * (porcentajePrimaVacacional / 100);
  const subtotalFiniquito = aguinaldoProporcional + vacacionesProporcionales + primaVacacionalProporcional;

  // 2. LIQUIDACIÓN (Indemnización Constitucional si aplica)
  let indemnizacion3Meses = 0;
  let veinteDiasPorAno = 0;
  let primaAntiguedad = 0;

  if (tipoSeparacion === 'despido_injustificado') {
    // 3 meses de salario constitucional (90 días de SDI - Art. 48 LFT)
    indemnizacion3Meses = sdi * 90;
    // 20 días por cada año de servicios prestados (Art. 50 LFT fracción II)
    veinteDiasPorAno = sdi * 20 * antiguedadAnos;
    // Prima de antigüedad: 12 días por año con tope de 2 salarios mínimos (Art. 162 LFT)
    const basePrimaAntiguedad = Math.min(salarioDiario, TOPE_PRIMA_ANTIGUEDAD);
    primaAntiguedad = basePrimaAntiguedad * 12 * antiguedadAnos;
  } else {
    // En renuncia voluntaria, prima de antigüedad solo aplica con 15+ años de servicio (Art. 162 LFT)
    if (antiguedadAnos >= 15) {
      const basePrimaAntiguedad = Math.min(salarioDiario, TOPE_PRIMA_ANTIGUEDAD);
      primaAntiguedad = basePrimaAntiguedad * 12 * antiguedadAnos;
    }
  }

  const subtotalLiquidacion = indemnizacion3Meses + veinteDiasPorAno + primaAntiguedad;
  const granTotalPercepcion = subtotalFiniquito + subtotalLiquidacion;

  // Exención de ISR para indemnizaciones (Art. 93 fracc. XIII LISR: 90 UMAs por cada año de servicio)
  const exencionIndemnizacion = UMA_DIARIA_2026 * 90 * Math.max(1, antiguedadAnos);
  const indemnizacionGravada = Math.max(0, subtotalLiquidacion - exencionIndemnizacion);
  const indemnizacionExenta = Math.min(subtotalLiquidacion, exencionIndemnizacion);

  const handleCopy = () => {
    const text = `Cálculo Oficial Finiquito y Liquidación México 2026 (LFT):
Modalidad: ${tipoSeparacion === 'despido_injustificado' ? 'Despido Injustificado (Liquidación + Finiquito)' : 'Renuncia Voluntaria (Solo Finiquito)'}
Salario Diario Base: $${salarioDiario.toFixed(2)} MXN | SDI Integrado: $${sdi.toFixed(2)} MXN
Antigüedad Computada: ${antiguedadAnos} años

--- FINIQUITO DE LEY (Partes Proporcionales) ---
+ Aguinaldo Proporcional: $${aguinaldoProporcional.toFixed(2)} MXN
+ Vacaciones Pendientes: $${vacacionesProporcionales.toFixed(2)} MXN
+ Prima Vacacional (${porcentajePrimaVacacional}%): $${primaVacacionalProporcional.toFixed(2)} MXN
Subtotal Finiquito: $${subtotalFiniquito.toFixed(2)} MXN

${tipoSeparacion === 'despido_injustificado' ? `--- LIQUIDACIÓN CONSTITUCIONAL (Art. 48 y 50 LFT) ---
+ 3 Meses Constitucionales (90 días SDI): $${indemnizacion3Meses.toFixed(2)} MXN
+ 20 Días por Año de Servicio: $${veinteDiasPorAno.toFixed(2)} MXN
+ Prima de Antigüedad (Art. 162 LFT topada): $${primaAntiguedad.toFixed(2)} MXN
Subtotal Liquidación: $${subtotalLiquidacion.toFixed(2)} MXN\n` : ''}TOTAL A PERCIBIR: $${granTotalPercepcion.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuál es la diferencia legal entre finiquito y liquidación en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El finiquito comprende las prestaciones devengadas proporcionales a las que todo trabajador tiene derecho sin importar el motivo de la baja (aguinaldo, vacaciones y prima vacacional). La liquidación o indemnización constitucional procede en despidos injustificados conforme al Artículo 48 y 50 de la LFT (3 meses de salario, 20 días por año y prima de antigüedad).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo se integra el salario para la liquidación por despido?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La indemnización constitucional de 3 meses y los 20 días por año se pagan con el Salario Diario Integrado (SDI) según el Artículo 84 y 89 de la LFT, el cual incluye la cuota diaria en efectivo más las partes proporcionales de aguinaldo, prima vacacional y cualquier otra prestación convenida.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo se calcula el tope de la prima de antigüedad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 162 en relación con el Artículo 486 de la Ley Federal del Trabajo, la prima de antigüedad equivale a 12 días de salario por año laborado, pero si el salario diario del trabajador excede del doble del salario mínimo general, se toma este último tope máximo como base de cálculo.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/mx" className="hover:text-emerald-700 transition-colors">
          México
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Laboral & Nómina</span>
        <span>/</span>
        <span className="text-slate-400">Finiquito y Liquidación</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 47, 48, 50, 76, 87 y 162 LFT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Finiquito y Liquidación por Despido LFT 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula con precisión legal la indemnización constitucional de 3 meses, 20 días por año, prima de antigüedad y partes proporcionales de aguinaldo y vacaciones conforme a la Ley Federal del Trabajo reformada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Causa de Separación</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              LFT 2026
            </span>
          </div>

          {/* Tipo de Causa Toggle */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Motivo de Término Laboral
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setTipoSeparacion('despido_injustificado')}
                className={`py-3 px-3.5 rounded-2xl text-xs font-bold text-left transition-all border flex items-center justify-between min-h-[44px] cursor-pointer ${
                  tipoSeparacion === 'despido_injustificado'
                    ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="font-bold">Despido Injustificado</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Liquidación completa (3 meses + 20 días/año + prima) + Finiquito
                  </div>
                </div>
                {tipoSeparacion === 'despido_injustificado' && <span className="text-rose-600 font-bold text-xs">✓</span>}
              </button>
              <button
                type="button"
                onClick={() => setTipoSeparacion('renuncia_voluntaria')}
                className={`py-3 px-3.5 rounded-2xl text-xs font-bold text-left transition-all border flex items-center justify-between min-h-[44px] cursor-pointer ${
                  tipoSeparacion === 'renuncia_voluntaria'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="font-bold">Renuncia Voluntaria / Fin de Contrato</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Solo Finiquito (partes proporcionales devengadas de ley)
                  </div>
                </div>
                {tipoSeparacion === 'renuncia_voluntaria' && <span className="text-emerald-700 font-bold text-xs">✓</span>}
              </button>
            </div>
          </div>

          {/* Salario Mensual Bruto */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Último Salario Mensual Bruto
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="1000"
                step="500"
                value={salarioMensualBruto}
                onChange={(e) => setSalarioMensualBruto(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Antigüedad y Días Laborados */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Años de Antigüedad
              </label>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                value={antiguedadAnos}
                onChange={(e) => setAntiguedadAnos(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Días Año en Curso
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={diasTrabajadosAnoActual}
                onChange={(e) => setDiasTrabajadosAnoActual(Math.min(365, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
          </div>

          {/* Vacaciones Pendientes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Días de Vacaciones Pendientes
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={diasVacacionesPendientes}
              onChange={(e) => setDiasVacacionesPendientes(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Estimado a Percibir
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${granTotalPercepcion.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            {/* Subtotales Finiquito vs Liquidación */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Subtotal Finiquito</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${subtotalFiniquito.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Subtotal Liquidación</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  ${subtotalLiquidacion.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Desglose Estatutario */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Conceptos de Finiquito (Irrenunciables):
              </div>
              <div className="flex justify-between text-slate-300 pl-2">
                <span>+ Aguinaldo Proporcional ({diasTrabajadosAnoActual} días):</span>
                <span className="font-mono font-bold text-white">${aguinaldoProporcional.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-2">
                <span>+ Vacaciones Pendientes ({diasVacacionesPendientes} días):</span>
                <span className="font-mono font-bold text-white">${vacacionesProporcionales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-2">
                <span>+ Prima Vacacional ({porcentajePrimaVacacional}%):</span>
                <span className="font-mono font-bold text-white">${primaVacacionalProporcional.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>

              {tipoSeparacion === 'despido_injustificado' && (
                <>
                  <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px] pt-2 border-t border-slate-800">
                    Conceptos de Indemnización Constitucional:
                  </div>
                  <div className="flex justify-between text-rose-300 pl-2">
                    <span>+ 3 Meses Constitucionales (90 días SDI):</span>
                    <span className="font-mono font-bold">${indemnizacion3Meses.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-rose-300 pl-2">
                    <span>+ 20 Días por Año Laborado ({antiguedadAnos} años):</span>
                    <span className="font-mono font-bold">${veinteDiasPorAno.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-rose-300 pl-2">
                    <span>+ Prima de Antigüedad (Art. 162 LFT topada a 2 SMG):</span>
                    <span className="font-mono font-bold">${primaAntiguedad.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}
            </div>

            {/* Salario Diario Integrado Info */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center justify-between">
              <div>
                <span>Salario Diario Integrado (SDI): </span>
                <strong className="text-white font-mono">${sdi.toFixed(2)} MXN</strong>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Factor: {factorIntegracion.toFixed(4)}</span>
            </div>
          </div>

          {/* Exención Fiscal Subcard */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tratamiento Fiscal ISR (Art. 93 Fracción XIII LISR)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Las indemnizaciones por despido están exentas de ISR hasta por un importe equivalente a <strong>90 UMAs por cada año de servicios prestados</strong> (${(UMA_DIARIA_2026 * 90).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN por año). El excedente se grava a la tasa efectiva anual del trabajador.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Bases Estatutarias de la Terminación Laboral en México (LFT 2026)
        </h2>
        <p>
          En la legislación laboral mexicana consagrada en el Artículo 123 apartado A de la Constitución Política y en la Ley Federal del Trabajo, el principio de estabilidad en el empleo constituye una garantía tutelar fundamental. Cuando una relación laboral concluye, los derechos pecuniarios del trabajador varían diametralmente en función de si la causa obedeció a una renuncia voluntaria, una rescisión justificada imputable al empleado (Art. 47 LFT), o un <strong>despido injustificado</strong> imputable a la empresa (Art. 48 LFT).
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Componentes Irrenunciables del Finiquito
        </h3>
        <p>
          El finiquito no es una gracia ni una concesión graciosa del patrón, sino la liquidación de remuneraciones devengadas que ya se incorporaron al patrimonio del trabajador:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Aguinaldo Proporcional (Art. 87 LFT):</strong> Todo trabajador tiene derecho por lo menos a 15 días de salario por año completo, o la proporción exacta calculada mediante la fórmula <code>(15 ÷ 365) × días trabajados en el año natural</code>.
          </li>
          <li>
            <strong>Vacaciones Devengadas No Disfrutadas (Art. 76 LFT):</strong> Con la reforma de <em>Vacaciones Dignas</em>, el primer año otorga un mínimo de 12 días laborables pagados, incrementándose en dos días por cada año subsecuente hasta llegar a 20 días en el quinto año.
          </li>
          <li>
            <strong>Prima Vacacional (Art. 80 LFT):</strong> Mínimo legal obligatorio del 25% sobre el importe de los salarios correspondientes al período de vacaciones adeudadas.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Indemnización Constitucional y Veinte Días por Año
        </h3>
        <p>
          Ante un despido carente de causa justificada comprobada ante el Centro Federal de Conciliación y Registro Laboral o los Tribunales Laborales, el patrón está obligado a resarcir el daño económico:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Tres Meses de Salario Constitucional:</strong> Establecido en el Artículo 48 de la LFT, se calcula sobre el <strong>Salario Diario Integrado (SDI)</strong>, computándose noventa (90) días continuos.
          </li>
          <li>
            <strong>Veinte Días por Año (Art. 50 LFT Fracc. II):</strong> Procede cuando el trabajador demanda la reinstalación en su puesto de trabajo y el patrón se niega a reinstalarlo mediante la excepción patronal legal correspondiente, o en convenios formalizados de liquidación integral.
          </li>
          <li>
            <strong>Prima de Antigüedad (Art. 162 LFT):</strong> Consiste en el pago de 12 días de salario por cada año completo de servicio. Para este concepto no se emplea el SDI, sino el salario diario base con un tope estatutario infranqueable de <strong>dos veces el salario mínimo general vigente</strong> (Art. 486 LFT).
          </li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Tratamiento Fiscal y Exenciones de ISR ante el SAT
        </h3>
        <p>
          El Artículo 93 fracción XIII de la LISR estipula un beneficio fiscal sustancial para los trabajadores liquidados: no se pagará el impuesto sobre la renta por las indemnizaciones por separación o despido hasta por una cantidad equivalente a <strong>90 veces el valor diario de la UMA por cada año de servicios</strong> o por cada fracción de más de seis meses. Solo el importe que supere este generoso umbral exento quedará sujeto a retención definitiva de ISR.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Finiquito y Liquidación</span>
        </h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <details key={idx} className="group rounded-2xl bg-white border border-slate-200/90 p-5 open:shadow-xs transition-all">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
        <Link href="/mx" className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5">
          <span>&larr; Ver todas las 20 Herramientas México</span>
        </Link>
        <Link href="/mx/calculadora-aguinaldo-ley-federal-trabajo" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Calculadora Aguinaldo LFT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

