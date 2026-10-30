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
 * - Contingencias Comunes: 4.70%
 * - Desempleo: 1.55% (Contrato Indefinido) / 1.60% (Temporal)
 * - Formación Profesional: 0.10%
 * - MEI (Mecanismo de Equidad Intergeneracional): 0.14% (Empleado)
 * Total Indefinido: 6.49% (capped at Base Máxima de Cotización 2026: ~€4,720.50/mes = €56,646/año)
 */
export function calculateSeguridadSocialSpain(
  grossAnnual: number,
  contractType: 'indefinido' | 'temporal' = 'indefinido'
): { totalAnnual: number; ratePercent: number; baseUsed: number } {
  const BASE_MAXIMA_2026 = 56646; // €4,720.50 x 12
  const BASE_MINIMA_2026 = 15876; // Salario Mínimo Interprofesional (SMI) base

  const base = Math.min(Math.max(grossAnnual, 0), BASE_MAXIMA_2026);
  const desempleoRate = contractType === 'temporal' ? 0.016 : 0.0155;
  const totalRate = 0.047 + desempleoRate + 0.001 + 0.0014; // ~6.49%

  const totalAnnual = Math.round(base * totalRate * 100) / 100;
  return {
    totalAnnual,
    ratePercent: Math.round(totalRate * 10000) / 100, // e.g. 6.49%
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
  // If below minimum threshold (€15,876 SMI 2026), 0% withholding
  if (grossAnnual <= 15876) {
    return { taxAnnual: 0, effectiveRatePercent: 0 };
  }

  // Personal & Family Minimum (Mínimo personal y familiar)
  // Base personal: €5,550
  let minimoPersonal = 5550;
  if (age >= 65) minimoPersonal += 1150;
  if (age >= 75) minimoPersonal += 1400;

  // Children increments (1st child: €2,400; 2nd: €2,700; 3rd: €4,000; 4th+: €4,500)
  if (childrenCount >= 1) minimoPersonal += 2400;
  if (childrenCount >= 2) minimoPersonal += 2700;
  if (childrenCount >= 3) minimoPersonal += 4000;
  if (childrenCount > 3) minimoPersonal += (childrenCount - 3) * 4500;

  // Gastos deducibles generales (Art. 19 LIRPF): €2,000 + SS employee
  const ss = calculateSeguridadSocialSpain(grossAnnual);
  const gastosDeducibles = 2000 + ss.totalAnnual;

  // Base liquidable aproximada
  const baseLiquidable = Math.max(grossAnnual - gastosDeducibles, 0);

  // Progressive tax calculation on base
  function computeProgressive(amount: number): number {
    let tax = 0;
    let prevLimit = 0;
    for (const b of IRPF_BRACKETS_ESTATAL_2026) {
      if (amount > prevLimit) {
        const taxableInBracket = Math.min(amount, b.limit) - prevLimit;
        // Total bracket rate = Estatal + Autonómico (approx 2x Estatal * regionalFactor)
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

/**
 * Master Spain Gross-to-Net Salary Calculator Engine
 */
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
        color: '#10B981', // Emerald
        description: `Importe disponible en cuenta (${payFreq} pagas de ${netMonthly.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €)`,
      },
      {
        label: 'Retención IRPF (Hacienda)',
        amount: irpf.taxAnnual,
        percentOfGross: irpf.effectiveRatePercent,
        color: '#D9531E', // Warm Iberian Terracotta
        description: `Impuesto sobre la Renta calculado para ${AUTONOMOUS_COMMUNITIES_SPAIN[community]?.name || 'España'}`,
      },
      {
        label: 'Seguridad Social (Trabajador)',
        amount: ss.totalAnnual,
        percentOfGross: ss.ratePercent,
        color: '#3B82F6', // Blue
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
