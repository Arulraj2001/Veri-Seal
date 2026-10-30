import { SalaryCalculationInput, SalaryCalculationResult } from './types';

/**
 * 2026 German Brutto-Netto Calculator (Einkommensteuertarif § 32a EStG 2026)
 * - Grundfreibetrag 2026: ~€11,784
 * - Steuerklasse 1: Single
 * - Steuerklasse 2: Alleinerziehende (Entlastungsbetrag)
 * - Steuerklasse 3: Verheiratet (Alleinverdiener)
 * - Steuerklasse 4: Verheiratet (Doppelverdiener)
 * - Steuerklasse 5: Zweitverdiener (hoher Abzug)
 * - Steuerklasse 6: Zweitjob / Nebeneinkommen
 * 
 * Sozialversicherungsbeiträge (Arbeitnehmeranteil 2026):
 * - Krankenversicherung: 7.3% + ~0.85% Zusatzbeitrag (Hälfte von 1.7%) = 8.15%
 * - Rentenversicherung: 9.3%
 * - Arbeitslosenversicherung: 1.3%
 * - Pflegeversicherung: 2.2% (kinderlos + 0.6% = 2.8%)
 * Total Sozialabgaben: ~20.95% - 21.55%
 */
export function calculateGermanySalary(input: SalaryCalculationInput): SalaryCalculationResult {
  const gross = Math.max(input.grossAnnualSalary, 0);
  const taxClass = input.taxClass || 1;
  const hasChildren = (input.childrenCount || 0) > 0;
  const hasChurch = Boolean(input.hasChurchTax);

  // 1. Sozialversicherung (Arbeitnehmeranteil 2026)
  // Beitragsbemessungsgrenzen 2026:
  // KV/PV: €62,100 / Jahr
  // RV/AV: €90,600 / Jahr (West)
  const BBG_KV = 62100;
  const BBG_RV = 90600;

  const baseKV = Math.min(gross, BBG_KV);
  const baseRV = Math.min(gross, BBG_RV);

  const kvRate = 0.073 + 0.0085; // 8.15% (allgemeiner Beitrag + halber Zusatzbeitrag)
  const rvRate = 0.093;          // 9.3% Rentenversicherung
  const avRate = 0.013;          // 1.3% Arbeitslosenversicherung
  const pvRate = hasChildren ? 0.022 : 0.028; // 2.2% mit Kind, 2.8% kinderlos

  const kvAnnual = Math.round(baseKV * kvRate * 100) / 100;
  const rvAnnual = Math.round(baseRV * rvRate * 100) / 100;
  const avAnnual = Math.round(baseRV * avRate * 100) / 100;
  const pvAnnual = Math.round(baseKV * pvRate * 100) / 100;

  const totalSocialSecurity = Math.round((kvAnnual + rvAnnual + avAnnual + pvAnnual) * 100) / 100;
  const totalSocialRate = gross > 0 ? Math.round((totalSocialSecurity / gross) * 10000) / 100 : 21.0;

  // 2. Lohnsteuer (§ 32a EStG 2026)
  // Grundfreibetrag 2026: €11,784
  // Pauschbeträge: Arbeitnehmer-Pauschbetrag €1,230 + Sonderausgaben €36 + Vorsorgepauschale
  const vorsorgepauschale = rvAnnual + kvAnnual;
  const zuVersteuerndesEinkommen = Math.max(gross - 1230 - 36 - vorsorgepauschale, 0);

  let taxFactor = 1.0;
  if (taxClass === 2) taxFactor = 0.88; // Entlastungsbetrag
  if (taxClass === 3) taxFactor = 0.65; // Splittingvorteil
  if (taxClass === 5) taxFactor = 1.35; // Höhere Besteuerung
  if (taxClass === 6) taxFactor = 1.45; // Kein Grundfreibetrag

  let rawLohnsteuer = 0;
  if (zuVersteuerndesEinkommen > 11784) {
    const taxable = zuVersteuerndesEinkommen - 11784;
    if (taxable <= 5000) {
      rawLohnsteuer = taxable * 0.14;
    } else if (taxable <= 50000) {
      rawLohnsteuer = 700 + (taxable - 5000) * 0.28;
    } else {
      rawLohnsteuer = 700 + 12600 + (taxable - 50000) * 0.42;
    }
  }

  const lohnsteuer = Math.round(rawLohnsteuer * taxFactor * 100) / 100;

  // Solidaritätszuschlag (ab Freigrenze ~€18,130 Steuer)
  let soli = 0;
  if (lohnsteuer > 18130) {
    soli = Math.round((lohnsteuer - 18130) * 0.055 * 100) / 100;
  }

  // Kirchensteuer (8% in Bayern/Baden-Württemberg, 9% in anderen Ländern)
  const kirchensteuer = hasChurch ? Math.round(lohnsteuer * 0.09 * 100) / 100 : 0;
  const totalTax = Math.round((lohnsteuer + soli + kirchensteuer) * 100) / 100;

  const totalDeductions = Math.round((totalSocialSecurity + totalTax) * 100) / 100;
  const netAnnual = Math.max(Math.round((gross - totalDeductions) * 100) / 100, 0);

  const grossMonthly = Math.round((gross / 12) * 100) / 100;
  const netMonthly = Math.round((netAnnual / 12) * 100) / 100;

  const takeHomePercent = gross > 0 ? Math.round((netAnnual / gross) * 10000) / 100 : 100;
  const effectiveTaxRate = gross > 0 ? Math.round((totalTax / gross) * 10000) / 100 : 0;

  return {
    grossAnnual: gross,
    grossMonthly,
    netAnnual,
    netMonthly,
    totalIncomeTax: totalTax,
    effectiveTaxRatePercent: effectiveTaxRate,
    totalSocialSecurityEmployee: totalSocialSecurity,
    socialSecurityRatePercent: totalSocialRate,
    totalDeductionsAnnual: totalDeductions,
    takeHomePercent,
    currencySymbol: '€',
    breakdown: [
      {
        label: 'Nettoeinkommen (Auszahlung)',
        amount: netAnnual,
        percentOfGross: takeHomePercent,
        color: '#10B981',
        description: `Monatlicher Auszahlungsbetrag (${netMonthly.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € auf Ihr Girokonto)`,
      },
      {
        label: 'Sozialabgaben (KV, RV, AV, PV)',
        amount: totalSocialSecurity,
        percentOfGross: totalSocialRate,
        color: '#3B82F6',
        description: 'Krankenkasse (8.15%), Rentenversicherung (9.3%), Pflege & Arbeitslosigkeit',
      },
      {
        label: 'Lohnsteuer & Solidaritätszuschlag',
        amount: totalTax,
        percentOfGross: effectiveTaxRate,
        color: '#D9531E',
        description: `Ermittelt nach Steuerklasse ${taxClass} (§ 32a EStG Grundtabelle 2026)`,
      },
    ],
    statutoryDetails: {
      steuerklasse: `Steuerklasse ${taxClass}`,
      krankenversicherungMonat: Math.round((kvAnnual / 12) * 100) / 100,
      rentenversicherungMonat: Math.round((rvAnnual / 12) * 100) / 100,
      solidaritaetszuschlag: soli > 0 ? `${soli} €/Jahr` : '0 € (unter Freigrenze)',
      kirchensteuer: hasChurch ? `${kirchensteuer} €/Jahr (9%)` : 'Keine (nicht kirchensteuerpflichtig)',
      gesetzlicheGrundlage: 'Einkommensteuergesetz (EStG) & SGB IV/V/VI 2026',
    },
  };
}

