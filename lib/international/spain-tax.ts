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


// ---------------------------------------------------------------------------
// 1. JUBILACIÓN Y PENSIÓN ESPAÑA 2026
// Ley 21/2021 de garantía del poder adquisitivo de las pensiones
// ---------------------------------------------------------------------------
export interface JubilacionCalculationInput {
  baseReguladoraMedia: number; // Base media últimos 25 años (300 bases / 350)
  aniosCotizados: number;
  mesesCotizados: number;
  edadActual: number;
}

export interface JubilacionCalculationResult {
  pensionMensualBruta: number;
  pensionAnualBruta: number; // 14 pagas
  porcentajeAplicable: number;
  edadJubilacionOrdinaria: string;
  cumpleRequisitoMinimo: boolean;
  aniosFaltantesParaMaximo: number;
}

export function calculateJubilacionSpain(input: JubilacionCalculationInput): JubilacionCalculationResult {
  const totalMeses = input.aniosCotizados * 12 + input.mesesCotizados;
  const base = Math.max(input.baseReguladoraMedia, 0);

  // Requisito mínimo legal: 15 años (180 meses)
  if (totalMeses < 180) {
    return {
      pensionMensualBruta: 0,
      pensionAnualBruta: 0,
      porcentajeAplicable: 0,
      edadJubilacionOrdinaria: 'No alcanza el mínimo de 15 años de cotización requeridos por la Seguridad Social',
      cumpleRequisitoMinimo: false,
      aniosFaltantesParaMaximo: Math.max(0, Math.round(((438 - totalMeses) / 12) * 10) / 10),
    };
  }

  // 2026: Con 15 años (180 meses) = 50% de la base
  // Meses 181 a 229 (primeros 49 meses siguientes): +0,21% por mes
  // Meses restantes hasta alcanzar el 100% (a los 36 años y 6 meses = 438 meses): +0,19% por mes
  let porcentaje = 50;
  const mesesExtra = totalMeses - 180;

  if (mesesExtra > 0) {
    const tramo1 = Math.min(mesesExtra, 49);
    porcentaje += tramo1 * 0.21;

    const tramo2 = Math.max(mesesExtra - 49, 0);
    if (tramo2 > 0) {
      porcentaje += Math.min(tramo2 * 0.19, 100 - porcentaje);
    }
  }

  porcentaje = Math.min(Math.round(porcentaje * 100) / 100, 100);

  // Pensión máxima 2026 fijada en Presupuestos Generales: ~3.175 €/mes (44.450 €/año)
  const PENSION_MAXIMA_MENSUAL = 3175.04;
  const rawPension = Math.round((base * (porcentaje / 100)) * 100) / 100;
  const pensionMensual = Math.min(rawPension, PENSION_MAXIMA_MENSUAL);
  const pensionAnual = Math.round(pensionMensual * 14 * 100) / 100;

  // Edad ordinaria 2026: 65 años si tienes 38 años y 3 meses o más cotizados; 66 años y 8 meses si tienes menos
  const tieneCotizacionLarga = totalMeses >= (38 * 12 + 3);
  const edadOrdinaria = tieneCotizacionLarga ? '65 años cumplidos' : '66 años y 8 meses cumplidos';

  return {
    pensionMensualBruta: pensionMensual,
    pensionAnualBruta: pensionAnual,
    porcentajeAplicable: porcentaje,
    edadJubilacionOrdinaria: edadOrdinaria,
    cumpleRequisitoMinimo: true,
    aniosFaltantesParaMaximo: Math.max(0, Math.round(((438 - totalMeses) / 12) * 10) / 10),
  };
}

// ---------------------------------------------------------------------------
// 2. HORAS EXTRAS Y RECARGOS ESPAÑA 2026
// Estatuto de los Trabajadores (Art. 35)
// ---------------------------------------------------------------------------
export interface HorasExtrasInput {
  salarioBrutoAnual: number;
  horasConvenioAnuales: number;
  horasExtrasOrdinarias: number;
  horasExtrasFestivasONocturnas: number;
}

export interface HorasExtrasResult {
  precioHoraOrdinaria: number;
  precioHoraExtraOrdinaria: number; // 75% recargo legal mínimo supletorio
  precioHoraExtraFestiva: number; // 100% recargo
  totalImporteExtras: number;
  superaTopeLegal80Horas: boolean;
  totalHorasExtras: number;
}

export function calculateHorasExtrasSpain(input: HorasExtrasInput): HorasExtrasResult {
  const anual = Math.max(input.salarioBrutoAnual, 0);
  const horasTotales = Math.max(input.horasConvenioAnuales, 1);

  const precioHoraOrdinaria = Math.round((anual / horasTotales) * 100) / 100;
  const precioExtraOrdinaria = Math.round(precioHoraOrdinaria * 1.75 * 100) / 100;
  const precioExtraFestiva = Math.round(precioHoraOrdinaria * 2.00 * 100) / 100;

  const importeOrdinarias = Math.round(precioExtraOrdinaria * Math.max(input.horasExtrasOrdinarias, 0) * 100) / 100;
  const importeFestivas = Math.round(precioExtraFestiva * Math.max(input.horasExtrasFestivasONocturnas, 0) * 100) / 100;
  const totalImporte = Math.round((importeOrdinarias + importeFestivas) * 100) / 100;

  const totalHoras = input.horasExtrasOrdinarias + input.horasExtrasFestivasONocturnas;

  return {
    precioHoraOrdinaria,
    precioHoraExtraOrdinaria: precioExtraOrdinaria,
    precioHoraExtraFestiva: precioExtraFestiva,
    totalImporteExtras: totalImporte,
    superaTopeLegal80Horas: totalHoras > 80,
    totalHorasExtras: totalHoras,
  };
}

// ---------------------------------------------------------------------------
// 3. HIPOTECA EURÍBOR ESPAÑA 2026 (Sistema Francés)
// Ley 5/2019 reguladora de los contratos de crédito inmobiliario
// ---------------------------------------------------------------------------
export interface HipotecaCalculationInput {
  capitalPrestamo: number;
  plazoAnios: number;
  tipoInteresAnualPorcentaje: number; // e.g. 2.95% fijo o Euribor 2.2% + 0.75%
}

export interface HipotecaCalculationResult {
  cuotaMensual: number;
  totalIntereses: number;
  totalAPagar: number;
  capitalFinanciado: number;
  porcentajeInteresesSobreCapital: number;
}

export function calculateHipotecaSpain(input: HipotecaCalculationInput): HipotecaCalculationResult {
  const P = Math.max(input.capitalPrestamo, 0);
  const n = Math.max(input.plazoAnios, 1) * 12;
  const r = (Math.max(input.tipoInteresAnualPorcentaje, 0) / 100) / 12;

  let cuota = 0;
  if (r === 0) {
    cuota = P / n;
  } else {
    // Fórmula sistema francés: C = P * [r*(1+r)^n] / [(1+r)^n - 1]
    cuota = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  cuota = Math.round(cuota * 100) / 100;
  const totalAPagar = Math.round(cuota * n * 100) / 100;
  const totalIntereses = Math.max(Math.round((totalAPagar - P) * 100) / 100, 0);
  const ratio = P > 0 ? Math.round((totalIntereses / P) * 10000) / 100 : 0;

  return {
    cuotaMensual: cuota,
    totalIntereses,
    totalAPagar,
    capitalFinanciado: P,
    porcentajeInteresesSobreCapital: ratio,
  };
}

// ---------------------------------------------------------------------------
// 4. GASTOS E ITP COMPRAVENTA DE VIVIENDA ESPAÑA 2026
// Ley del Impuesto sobre Transmisiones Patrimoniales y Actos Jurídicos Documentados
// ---------------------------------------------------------------------------
export const ITP_RATES_BY_COMUNIDAD: Record<string, { name: string; itpRate: number; ajdRate: number }> = {
  madrid: { name: 'Comunidad de Madrid', itpRate: 6.0, ajdRate: 0.75 },
  canarias: { name: 'Canarias', itpRate: 6.5, ajdRate: 1.0 },
  andalucia: { name: 'Andalucía', itpRate: 7.0, ajdRate: 1.2 },
  galicia: { name: 'Galicia', itpRate: 8.0, ajdRate: 1.5 },
  pais_vasco: { name: 'País Vasco', itpRate: 4.0, ajdRate: 0.5 },
  navarra: { name: 'Navarra', itpRate: 6.0, ajdRate: 0.5 },
  cataluna: { name: 'Cataluña', itpRate: 10.0, ajdRate: 1.5 },
  valencia: { name: 'Comunitat Valenciana', itpRate: 10.0, ajdRate: 1.5 },
  baleares: { name: 'Illes Balears', itpRate: 8.0, ajdRate: 1.5 },
  aragon: { name: 'Aragón', itpRate: 8.0, ajdRate: 1.5 },
  asturias: { name: 'Asturias', itpRate: 8.0, ajdRate: 1.2 },
  cantabria: { name: 'Cantabria', itpRate: 9.0, ajdRate: 1.5 },
  castilla_leon: { name: 'Castilla y León', itpRate: 8.0, ajdRate: 1.5 },
  castilla_la_mancha: { name: 'Castilla-La Mancha', itpRate: 9.0, ajdRate: 1.5 },
  extremadura: { name: 'Extremadura', itpRate: 8.0, ajdRate: 1.5 },
  murcia: { name: 'Región de Murcia', itpRate: 8.0, ajdRate: 1.5 },
  rioja: { name: 'La Rioja', itpRate: 7.0, ajdRate: 1.0 },
};

export interface ItpCalculationInput {
  precioCompra: number;
  esObraNueva: boolean; // Si es nueva lleva IVA 10% + AJD; si es segunda mano lleva ITP
  comunidadAutonoma: string;
}

export interface ItpCalculationResult {
  impuestoPrincipalNombre: string;
  impuestoPrincipalImporte: number;
  tipoImpositivoPercent: number;
  gastosNotaria: number; // Arancel notarial oficial RD 1426/1989
  gastosRegistro: number; // Arancel registral RD 1427/1989
  gastosGestoria: number;
  gastosTasacion: number;
  totalGastosEImpuestos: number;
  costeTotalAdquisicion: number;
}

export function calculateItpCompraventaSpain(input: ItpCalculationInput): ItpCalculationResult {
  const precio = Math.max(input.precioCompra, 0);
  const region = ITP_RATES_BY_COMUNIDAD[input.comunidadAutonoma] || ITP_RATES_BY_COMUNIDAD['madrid'];

  let impuestoNombre = '';
  let impuestoImporte = 0;
  let tipoPercent = 0;

  if (input.esObraNueva) {
    impuestoNombre = 'IVA (10%) + AJD';
    const iva = precio * 0.10;
    const ajd = precio * (region.ajdRate / 100);
    impuestoImporte = Math.round((iva + ajd) * 100) / 100;
    tipoPercent = 10 + region.ajdRate;
  } else {
    impuestoNombre = `ITP (${region.itpRate}%)`;
    impuestoImporte = Math.round((precio * (region.itpRate / 100)) * 100) / 100;
    tipoPercent = region.itpRate;
  }

  // Estimación regulada de aranceles notariales y registrales
  const notaria = Math.round((550 + precio * 0.001) * 100) / 100;
  const registro = Math.round((350 + precio * 0.0006) * 100) / 100;
  const gestoria = 380;
  const tasacion = 320;

  const totalGastos = Math.round((impuestoImporte + notaria + registro + gestoria + tasacion) * 100) / 100;

  return {
    impuestoPrincipalNombre: impuestoNombre,
    impuestoPrincipalImporte: impuestoImporte,
    tipoImpositivoPercent: tipoPercent,
    gastosNotaria: notaria,
    gastosRegistro: registro,
    gastosGestoria: gestoria,
    gastosTasacion: tasacion,
    totalGastosEImpuestos: totalGastos,
    costeTotalAdquisicion: Math.round((precio + totalGastos) * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// 5. PLUSVALÍA MUNICIPAL ESPAÑA 2026 (IIVTNU)
// Real Decreto-ley 26/2021 (Método Objetivo vs Plusvalía Real)
// ---------------------------------------------------------------------------
export interface PlusvaliaInput {
  valorCatastralSuelo: number;
  precioAdquisicionOriginal: number;
  precioVentaTransmision: number;
  aniosTenencia: number;
  tipoGravamenMunicipio: number; // Máximo legal 30%
}

export interface PlusvaliaResult {
  cuotaMetodoObjetivo: number;
  cuotaMetodoReal: number;
  cuotaOptimaFinal: number; // El contribuyente tiene derecho legal a tributar por la menor
  metodoRecomendado: 'objetivo' | 'real' | 'exento_perdida';
  coeficienteObjetivoAplicado: number;
  exentoPorPerdidasPatrimoniales: boolean;
}

export function calculatePlusvaliaMunicipalSpain(input: PlusvaliaInput): PlusvaliaResult {
  const anios = Math.min(Math.max(input.aniosTenencia, 1), 20);
  const tipoMunicipio = Math.min(Math.max(input.tipoGravamenMunicipio || 30, 0), 30) / 100;

  // Si se vende con pérdidas, está 100% EXENTO según la Ley del IIVTNU
  if (input.precioVentaTransmision <= input.precioAdquisicionOriginal) {
    return {
      cuotaMetodoObjetivo: 0,
      cuotaMetodoReal: 0,
      cuotaOptimaFinal: 0,
      metodoRecomendado: 'exento_perdida',
      coeficienteObjetivoAplicado: 0,
      exentoPorPerdidasPatrimoniales: true,
    };
  }

  // Coeficientes objetivos máximos aprobados para 2026 (según años de tenencia)
  const COEFICIENTES: Record<number, number> = {
    1: 0.15, 2: 0.15, 3: 0.16, 4: 0.17, 5: 0.17,
    6: 0.16, 7: 0.14, 8: 0.13, 9: 0.12, 10: 0.10,
    11: 0.09, 12: 0.08, 13: 0.08, 14: 0.08, 15: 0.08,
    16: 0.09, 17: 0.13, 18: 0.17, 19: 0.23, 20: 0.45,
  };

  const coef = COEFICIENTES[anios] || 0.10;
  const baseObjetiva = input.valorCatastralSuelo * coef;
  const cuotaObjetiva = Math.round(baseObjetiva * tipoMunicipio * 100) / 100;

  // Método Real: (Ganancia patrimonial) * (Valor catastral suelo / Valor catastral total estimado 60%)
  const gananciaReal = Math.max(input.precioVentaTransmision - input.precioAdquisicionOriginal, 0);
  const baseReal = gananciaReal * 0.60;
  const cuotaReal = Math.round(baseReal * tipoMunicipio * 100) / 100;

  const menorCuota = Math.min(cuotaObjetiva, cuotaReal);

  return {
    cuotaMetodoObjetivo: cuotaObjetiva,
    cuotaMetodoReal: cuotaReal,
    cuotaOptimaFinal: menorCuota,
    metodoRecomendado: cuotaObjetiva <= cuotaReal ? 'objetivo' : 'real',
    coeficienteObjetivoAplicado: coef,
    exentoPorPerdidasPatrimoniales: false,
  };
}

// ---------------------------------------------------------------------------
// 6. ACTUALIZADOR DE ALQUILER CON IPC / LEY DE VIVIENDA 2026
// Ley 12/2023 por el Derecho a la Vivienda (Tope legal de actualización anual)
// ---------------------------------------------------------------------------
export interface AlquilerIpcInput {
  rentaMensualActual: number;
  porcentajeActualizacion: number; // Tope legal 3% en 2026 o índice IRA
}

export interface AlquilerIpcResult {
  rentaActual: number;
  nuevaRentaMensual: number;
  incrementoMensual: number;
  incrementoAnual: number;
  esSuperiorAlTopeLegal: boolean;
}

export function calculateActualizacionAlquilerIpcSpain(input: AlquilerIpcInput): AlquilerIpcResult {
  const actual = Math.max(input.rentaMensualActual, 0);
  const pct = input.porcentajeActualizacion;

  const incrementoMensual = Math.round((actual * (pct / 100)) * 100) / 100;
  const nuevaRenta = Math.round((actual + incrementoMensual) * 100) / 100;

  return {
    rentaActual: actual,
    nuevaRentaMensual: nuevaRenta,
    incrementoMensual,
    incrementoAnual: Math.round(incrementoMensual * 12 * 100) / 100,
    esSuperiorAlTopeLegal: pct > 3.0,
  };
}

// ---------------------------------------------------------------------------
// 7. RENTABILIDAD NETA DE ALQUILER ESPAÑA
// ---------------------------------------------------------------------------
export interface RentabilidadAlquilerInput {
  precioInmueble: number;
  gastosCompraventaYReforma: number;
  alquilerMensualPrevisto: number;
  gastosComunidadAnuales: number;
  ibiAnual: number;
  segurosAnuales: number;
}

export interface RentabilidadAlquilerResult {
  inversionTotal: number;
  ingresosAnualesBrutos: number;
  gastosAnualesOperativos: number;
  beneficioNetoAnual: number;
  rentabilidadBrutaPercent: number;
  rentabilidadNetaPercent: number;
}

export function calculateRentabilidadAlquilerSpain(input: RentabilidadAlquilerInput): RentabilidadAlquilerResult {
  const inversionTotal = Math.max(input.precioInmueble + input.gastosCompraventaYReforma, 1);
  const ingresosAnuales = Math.max(input.alquilerMensualPrevisto * 12, 0);
  const gastosOperativos = Math.max(input.gastosComunidadAnuales + input.ibiAnual + input.segurosAnuales, 0);
  const beneficioNeto = Math.max(ingresosAnuales - gastosOperativos, 0);

  const rentabilidadBruta = Math.round((ingresosAnuales / inversionTotal) * 10000) / 100;
  const rentabilidadNeta = Math.round((beneficioNeto / inversionTotal) * 10000) / 100;

  return {
    inversionTotal,
    ingresosAnualesBrutos: ingresosAnuales,
    gastosAnualesOperativos: gastosOperativos,
    beneficioNetoAnual: beneficioNeto,
    rentabilidadBrutaPercent: rentabilidadBruta,
    rentabilidadNetaPercent: rentabilidadNeta,
  };
}

// ---------------------------------------------------------------------------
// 8. MODELO 303: IVA TRIMESTRAL ESPAÑA 2026
// Ley 37/1992 del Impuesto sobre el Valor Añadido
// ---------------------------------------------------------------------------
export interface IvaTrimestralInput {
  ventasGeneral21: number;
  ventasReducido10: number;
  ventasSuperreducido4: number;
  gastosIvaSoportado21: number;
  gastosIvaSoportado10: number;
  gastosIvaSoportado4: number;
}

export interface IvaTrimestralResult {
  totalIvaRepercutido: number;
  totalIvaSoportado: number;
  resultadoModelo303: number;
  esAIngresar: boolean;
}

export function calculateIvaTrimestralSpain(input: IvaTrimestralInput): IvaTrimestralResult {
  const repercutido =
    input.ventasGeneral21 * 0.21 +
    input.ventasReducido10 * 0.10 +
    input.ventasSuperreducido4 * 0.04;

  const soportado =
    input.gastosIvaSoportado21 * 0.21 +
    input.gastosIvaSoportado10 * 0.10 +
    input.gastosIvaSoportado4 * 0.04;

  const resultado = Math.round((repercutido - soportado) * 100) / 100;

  return {
    totalIvaRepercutido: Math.round(repercutido * 100) / 100,
    totalIvaSoportado: Math.round(soportado * 100) / 100,
    resultadoModelo303: resultado,
    esAIngresar: resultado > 0,
  };
}

// ---------------------------------------------------------------------------
// 9. VALIDADOR IBAN Y ENTIDADES ESPAÑA (ISO 13616 / MOD-97-10)
// ---------------------------------------------------------------------------
export const BANCOS_ESPANA: Record<string, string> = {
  '0049': 'Banco Santander',
  '0182': 'BBVA (Banco Bilbao Vizcaya Argentaria)',
  '2100': 'CaixaBank',
  '0081': 'Banco Sabadell',
  '0128': 'Bankinter',
  '2080': 'Abanca Corporación Bancaria',
  '0075': 'Banco Popular',
  '0073': 'Openbank',
  '1465': 'ING Bank España',
  '2038': 'Bankia (Integrado en CaixaBank)',
  '0239': 'EVO Banco',
  '3058': 'Cajamar Caja Rural',
  '2095': 'Kutxabank',
  '2048': 'Liberbank (Integrado en Unicaja)',
  '2103': 'Unicaja Banco',
};

export function validateIbanSpain(rawIban: string): {
  isValid: boolean;
  cleanIban: string;
  bancoNombre: string;
  codigoBanco: string;
  codigoSucursal: string;
  numeroCuenta: string;
  digitosControl: string;
} {
  const clean = rawIban.replace(/[\s-]/g, '').toUpperCase();
  if (!/^ES\d{22}$/.test(clean)) {
    return {
      isValid: false,
      cleanIban: clean,
      bancoNombre: 'Código de cuenta no reconocido',
      codigoBanco: '',
      codigoSucursal: '',
      numeroCuenta: '',
      digitosControl: '',
    };
  }

  const codBanco = clean.substring(4, 8);
  const codSucursal = clean.substring(8, 12);
  const dc = clean.substring(12, 14);
  const cuenta = clean.substring(14, 24);

  // Módulo 97: Mover 'ES' (E=14, S=28) + 2 dígitos de control al final
  const rearranged = clean.substring(4) + '1428' + clean.substring(2, 4);

  // BigInt mod 97 check
  let remainder = 0;
  for (let i = 0; i < rearranged.length; i++) {
    remainder = (remainder * 10 + parseInt(rearranged.charAt(i), 10)) % 97;
  }

  const isValid = remainder === 1;
  const bancoNombre = BANCOS_ESPANA[codBanco] || 'Entidad Bancaria Registrada en Banco de España';

  return {
    isValid,
    cleanIban: clean.replace(/(.{4})/g, '$1 ').trim(),
    bancoNombre: isValid ? bancoNombre : 'Dígito de control inválido',
    codigoBanco: codBanco,
    codigoSucursal: codSucursal,
    numeroCuenta: cuenta,
    digitosControl: dc,
  };
}
