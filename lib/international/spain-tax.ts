import { SalaryCalculationInput, SalaryCalculationResult } from './types';

/**
 * 2026 Spanish IRPF Brackets (Escala Estatal)
 * Ley 35/2006 del Impuesto sobre la Renta de las Personas Físicas.
 */
export const IRPF_BRACKETS_ESTATAL_2026 = [
  { limit: 12450, rate: 0.095 }, // 9.50% Estatal
  { limit: 20200, rate: 0.12 },  // 12.00%
  { limit: 35200, rate: 0.15 },  // 15.00%
  { limit: 60000, rate: 0.185 }, // 18.50%
  { limit: 300000, rate: 0.225 }, // 22.50%
  { limit: Infinity, rate: 0.245 }, // 24.50%
];

/**
 * Regional Autonomous Tax Coefficients (Autonomous scale approximation vs average)
 */
export const AUTONOMOUS_COMMUNITIES_SPAIN: Record<string, { name: string; regionalFactor: number }> = {
  madrid: { name: 'Comunidad de Madrid', regionalFactor: 0.95 },      // Deflactado / lower regional tax
  andalucia: { name: 'Andalucía', regionalFactor: 0.97 },
  galicia: { name: 'Galicia', regionalFactor: 0.98 },
  valencia: { name: 'Comunitat Valenciana', regionalFactor: 1.01 },
  cataluna: { name: 'Cataluña', regionalFactor: 1.03 },              // Higher top brackets
  pais_vasco: { name: 'País Vasco (Concierto Económico)', regionalFactor: 0.96 },
  canarias: { name: 'Canarias', regionalFactor: 0.97 },
  castilla_leon: { name: 'Castilla y León', regionalFactor: 0.99 },
  castilla_la_mancha: { name: 'Castilla-La Mancha', regionalFactor: 1.00 },
  murcia: { name: 'Región de Murcia', regionalFactor: 0.98 },
  aragon: { name: 'Aragón', regionalFactor: 1.02 },
  baleares: { name: 'Illes Balears', regionalFactor: 1.00 },
  extremadura: { name: 'Extremadura', regionalFactor: 1.01 },
  asturias: { name: 'Principado de Asturias', regionalFactor: 1.02 },
  navarra: { name: 'Comunidad Foral de Navarra', regionalFactor: 0.98 },
  cantabria: { name: 'Cantabria', regionalFactor: 1.01 },
  rioja: { name: 'La Rioja', regionalFactor: 0.99 },
  ceuta_melilla: { name: 'Ceuta y Melilla (Bonificado)', regionalFactor: 0.60 },
};

/**
 * Calculates exact Spanish employee Cotizaciones a la Seguridad Social (2026)
 */
export function calculateSeguridadSocialSpain(
  grossAnnual: number,
  contractType: 'indefinido' | 'temporal' = 'indefinido'
): { totalAnnual: number; ratePercent: number; baseUsed: number } {
  const BASE_MAXIMA_2026 = 56646;
  const base = Math.min(Math.max(grossAnnual, 0), BASE_MAXIMA_2026);
  const desempleoRate = contractType === 'temporal' ? 0.016 : 0.0155;
  const totalRate = 0.047 + desempleoRate + 0.001 + 0.0014;

  const totalAnnual = Math.round(base * totalRate * 100) / 100;
  return {
    totalAnnual,
    ratePercent: Math.round(totalRate * 10000) / 100,
    baseUsed: base,
  };
}

/**
 * Calculates exact progressive IRPF tax for Spain (State + Autonomous community)
 */
export function calculateIrpfSpain(
  grossAnnual: number,
  autonomousCommunityKey = 'madrid',
  childrenCount = 0,
  age = 30
): { taxAnnual: number; effectiveRatePercent: number } {
  if (grossAnnual <= 15876) {
    return { taxAnnual: 0, effectiveRatePercent: 0 };
  }

  let minimoPersonal = 5550;
  if (age >= 65) minimoPersonal += 1150;
  if (age >= 75) minimoPersonal += 1400;

  if (childrenCount >= 1) minimoPersonal += 2400;
  if (childrenCount >= 2) minimoPersonal += 2700;
  if (childrenCount >= 3) minimoPersonal += 4000;
  if (childrenCount > 3) minimoPersonal += (childrenCount - 3) * 4500;

  const ss = calculateSeguridadSocialSpain(grossAnnual);
  const gastosDeducibles = 2000 + ss.totalAnnual;
  const baseLiquidable = Math.max(grossAnnual - gastosDeducibles, 0);

  function computeProgressive(amount: number): number {
    let tax = 0;
    let prevLimit = 0;
    for (const b of IRPF_BRACKETS_ESTATAL_2026) {
      if (amount > prevLimit) {
        const taxableInBracket = Math.min(amount, b.limit) - prevLimit;
        tax += taxableInBracket * (b.rate * 2);
        prevLimit = b.limit;
      } else {
        break;
      }
    }
    return tax;
  }

  const taxBeforeMinimo = computeProgressive(baseLiquidable);
  const taxMinimo = computeProgressive(minimoPersonal);
  const communityFactor = AUTONOMOUS_COMMUNITIES_SPAIN[autonomousCommunityKey]?.regionalFactor || 1.0;

  const rawTax = Math.max((taxBeforeMinimo - taxMinimo) * communityFactor, 0);
  const taxAnnual = Math.round(rawTax * 100) / 100;
  const effectiveRatePercent = Math.round((taxAnnual / grossAnnual) * 10000) / 100;

  return {
    taxAnnual,
    effectiveRatePercent: Math.min(effectiveRatePercent, 47),
  };
}

export function calculateSpainSalary(input: SalaryCalculationInput): SalaryCalculationResult {
  const gross = Math.max(input.grossAnnualSalary, 0);
  const payFreq = input.payFrequency === 14 ? 14 : 12;
  const community = input.autonomousCommunity || 'madrid';

  const ss = calculateSeguridadSocialSpain(gross, input.contractType);
  const irpf = calculateIrpfSpain(gross, community, input.childrenCount || 0, input.age || 30);

  const totalDeductionsAnnual = Math.round((ss.totalAnnual + irpf.taxAnnual) * 100) / 100;
  const netAnnual = Math.max(Math.round((gross - totalDeductionsAnnual) * 100) / 100, 0);

  const grossMonthly = Math.round((gross / payFreq) * 100) / 100;
  const netMonthly = Math.round((netAnnual / payFreq) * 100) / 100;
  const takeHomePercent = gross > 0 ? Math.round((netAnnual / gross) * 10000) / 100 : 100;

  return {
    grossAnnual: gross,
    grossMonthly,
    netAnnual,
    netMonthly,
    totalIncomeTax: irpf.taxAnnual,
    effectiveTaxRatePercent: irpf.effectiveRatePercent,
    totalSocialSecurityEmployee: ss.totalAnnual,
    socialSecurityRatePercent: ss.ratePercent,
    totalDeductionsAnnual,
    takeHomePercent,
    currencySymbol: '€',
    breakdown: [
      {
        label: 'Sueldo Neto Líquido',
        amount: netAnnual,
        percentOfGross: takeHomePercent,
        color: '#10B981',
        description: `Importe disponible en cuenta (${payFreq} pagas de ${netMonthly.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €)`,
      },
      {
        label: 'Retención IRPF (Hacienda)',
        amount: irpf.taxAnnual,
        percentOfGross: irpf.effectiveRatePercent,
        color: '#D9531E',
        description: `Impuesto sobre la Renta calculado para ${AUTONOMOUS_COMMUNITIES_SPAIN[community]?.name || 'España'}`,
      },
      {
        label: 'Seguridad Social (Trabajador)',
        amount: ss.totalAnnual,
        percentOfGross: ss.ratePercent,
        color: '#3B82F6',
        description: 'Contingencias comunes (4.7%), Desempleo (1.55%), Formación y MEI',
      },
    ],
    statutoryDetails: {
      comunidadAutonoma: AUTONOMOUS_COMMUNITIES_SPAIN[community]?.name || 'Comunidad de Madrid',
      numeroPagas: payFreq,
      pagasExtraNetas: payFreq === 14 ? netMonthly : 0,
      baseCotizacionSeguridadSocial: ss.baseUsed,
      normativaVigente: 'Real Decreto Legislativo 8/2015 & Ley 35/2006 IRPF 2026',
    },
  };
}

// ---------------------------------------------------------------------------
// NEW STATUTORY MODULE: AUTÓNOMOS IRPF & CUOTA 2026
// ---------------------------------------------------------------------------
export interface AutonomoCalculationInput {
  ingresosAnuales: number;
  gastosDeducibles: number;
  retencionFacturaPercent?: 7 | 15; // 7% nuevos autónomos, 15% general
  esTarifaPlana?: boolean;
}

export interface AutonomoCalculationResult {
  rendimientoNetoAnual: number;
  tramoCuotaMensual: number;
  cuotaSeguridadSocialAnual: number;
  rendimientoNetoPrevioIRPF: number;
  pagoFraccionadoModelo130Anual: number;
  pagoFraccionadoTrimestral: number;
  retencionesSoportadasFacturas: number;
  ingresoLimpioEnBolsilloAnual: number;
  ingresoLimpioMensualMedio: number;
}

/**
 * 2026 Real Decreto-ley 13/2022: Tramos de Rendimientos Netos y Cuota de Autónomos
 */
export function calculateAutonomoSpain(input: AutonomoCalculationInput): AutonomoCalculationResult {
  const ingresos = Math.max(input.ingresosAnuales, 0);
  const gastos = Math.max(input.gastosDeducibles, 0);
  const rendimientoPrevio = Math.max(ingresos - gastos, 0);

  // Deducción adicional por gastos de difícil justificación (7% para autónomos individuales, capped at €2,000)
  const gastosDificilJustificacion = Math.min(rendimientoPrevio * 0.07, 2000);
  const rendimientoNetoAnual = Math.max(rendimientoPrevio - gastosDificilJustificacion, 0);
  const rendimientoNetoMensual = rendimientoNetoAnual / 12;

  // Cuota mensual según tramos 2026 (o Tarifa Plana de €80-€86/mes si es nuevo)
  let cuotaMensual = 294; // Base intermedia estándar
  if (input.esTarifaPlana) {
    cuotaMensual = 86; // Tarifa plana 2026
  } else {
    if (rendimientoNetoMensual <= 670) cuotaMensual = 225;
    else if (rendimientoNetoMensual <= 900) cuotaMensual = 240;
    else if (rendimientoNetoMensual <= 1166) cuotaMensual = 260;
    else if (rendimientoNetoMensual <= 1300) cuotaMensual = 291;
    else if (rendimientoNetoMensual <= 1500) cuotaMensual = 294;
    else if (rendimientoNetoMensual <= 1700) cuotaMensual = 294;
    else if (rendimientoNetoMensual <= 1850) cuotaMensual = 315;
    else if (rendimientoNetoMensual <= 2030) cuotaMensual = 325;
    else if (rendimientoNetoMensual <= 2330) cuotaMensual = 370;
    else if (rendimientoNetoMensual <= 2760) cuotaMensual = 400;
    else if (rendimientoNetoMensual <= 3190) cuotaMensual = 420;
    else if (rendimientoNetoMensual <= 3620) cuotaMensual = 440;
    else if (rendimientoNetoMensual <= 4050) cuotaMensual = 490;
    else if (rendimientoNetoMensual <= 6000) cuotaMensual = 530;
    else cuotaMensual = 530;
  }

  const cuotaSeguridadSocialAnual = cuotaMensual * 12;
  const baseImponibleIRPF = Math.max(rendimientoNetoAnual - cuotaSeguridadSocialAnual, 0);

  // Modelo 130: Pago fraccionado trimestral general (20% del rendimiento neto)
  const retencionPct = (input.retencionFacturaPercent || 15) / 100;
  const retencionesSoportadas = Math.round(ingresos * retencionPct * 100) / 100;

  // IRPF final aproximado
  const irpfEstimado = Math.round(baseImponibleIRPF * 0.20 * 100) / 100;
  const pagoFraccionadoModelo130Anual = Math.max(irpfEstimado - retencionesSoportadas, 0);
  const pagoFraccionadoTrimestral = Math.round((pagoFraccionadoModelo130Anual / 4) * 100) / 100;

  const totalDeducciones = cuotaSeguridadSocialAnual + irpfEstimado;
  const ingresoLimpioEnBolsilloAnual = Math.max(Math.round((ingresos - gastos - totalDeducciones) * 100) / 100, 0);
  const ingresoLimpioMensualMedio = Math.round((ingresoLimpioEnBolsilloAnual / 12) * 100) / 100;

  return {
    rendimientoNetoAnual,
    tramoCuotaMensual: cuotaMensual,
    cuotaSeguridadSocialAnual,
    rendimientoNetoPrevioIRPF: baseImponibleIRPF,
    pagoFraccionadoModelo130Anual,
    pagoFraccionadoTrimestral,
    retencionesSoportadasFacturas: retencionesSoportadas,
    ingresoLimpioEnBolsilloAnual,
    ingresoLimpioMensualMedio,
  };
}

// ---------------------------------------------------------------------------
// NEW STATUTORY MODULE: FINIQUITO Y DESPIDO ESPAÑA 2026
// Estatuto de los Trabajadores (Art. 49, 53, 56)
// ---------------------------------------------------------------------------
export interface FiniquitoCalculationInput {
  salarioMensualBruto: number;
  pagasExtrasIncluidas: boolean; // Si están prorrateadas o no
  aniosTrabajados: number;
  mesesTrabajados: number;
  diasVacacionesPendientes: number;
  tipoDespido: 'objetivo' | 'improcedente' | 'baja_voluntaria' | 'fin_contrato_temporal';
}

export interface FiniquitoCalculationResult {
  salarioDiario: number;
  indemnizacionTotal: number;
  indemnizacionDias: number;
  importeVacacionesNoDisfrutadas: number;
  totalFiniquitoBruto: number;
  diasIndemnizacionPorAnio: number;
  topeMaximoMensualidades: number;
  normativaAplicada: string;
}

export function calculateFiniquitoSpain(input: FiniquitoCalculationInput): FiniquitoCalculationResult {
  const salarioMes = Math.max(input.salarioMensualBruto, 0);
  const salarioAnual = input.pagasExtrasIncluidas ? salarioMes * 12 : salarioMes * 14;
  const salarioDiario = Math.round((salarioAnual / 365) * 100) / 100;

  const tiempoAnios = input.aniosTrabajados + input.mesesTrabajados / 12;

  let diasPorAnio = 0;
  let topeMeses = 0;
  let normativa = '';

  switch (input.tipoDespido) {
    case 'objetivo':
      // 20 días por año trabajado, máximo 12 mensualidades (Art. 53 ET)
      diasPorAnio = 20;
      topeMeses = 12;
      normativa = 'Art. 53 Estatuto de los Trabajadores (Despido Objetivo: 20 días/año, máx. 12 meses)';
      break;
    case 'improcedente':
      // Reforma laboral: 33 días por año trabajado, máximo 24 mensualidades (Art. 56 ET)
      diasPorAnio = 33;
      topeMeses = 24;
      normativa = 'Art. 56 Estatuto de los Trabajadores (Despido Improcedente: 33 días/año, máx. 24 meses)';
      break;
    case 'fin_contrato_temporal':
      // 12 días por año de servicio (Art. 49.1.c ET)
      diasPorAnio = 12;
      topeMeses = 12;
      normativa = 'Art. 49.1.c ET (Fin de Contrato Temporal: 12 días/año)';
      break;
    case 'baja_voluntaria':
    default:
      diasPorAnio = 0;
      topeMeses = 0;
      normativa = 'Baja Voluntaria / Dimisión: Sin derecho a indemnización por despido';
      break;
  }

  const topeEuros = topeMeses * salarioMes;
  const rawIndemnizacion = Math.round(salarioDiario * diasPorAnio * tiempoAnios * 100) / 100;
  const indemnizacionTotal = topeMeses > 0 ? Math.min(rawIndemnizacion, topeEuros) : 0;
  const indemnizacionDias = Math.round(diasPorAnio * tiempoAnios * 10) / 10;

  // Vacaciones no disfrutadas cotizan y tributan
  const importeVacaciones = Math.round(salarioDiario * Math.max(input.diasVacacionesPendientes, 0) * 100) / 100;
  const totalFiniquitoBruto = Math.round((indemnizacionTotal + importeVacaciones) * 100) / 100;

  return {
    salarioDiario,
    indemnizacionTotal,
    indemnizacionDias,
    importeVacacionesNoDisfrutadas: importeVacaciones,
    totalFiniquitoBruto,
    diasIndemnizacionPorAnio: diasPorAnio,
    topeMaximoMensualidades: topeMeses,
    normativaAplicada: normativa,
  };
}
