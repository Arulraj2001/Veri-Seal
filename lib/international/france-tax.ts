import { SalaryCalculationInput, SalaryCalculationResult, NumberToWordsResult } from './types';

/**
 * 2026 French Social Contributions (Cotisations Sociales Salariées)
 * URSSAF & Service-Public France.
 * Non-cadre employee deduction: ~22%
 * Cadre employee deduction: ~25%
 * Fonctionnaire deduction: ~15%
 */
export function calculateFranceSalary(input: SalaryCalculationInput): SalaryCalculationResult {
  const gross = Math.max(input.grossAnnualSalary, 0);
  const status = input.employmentStatus || 'non_cadre';

  let employeeRate = 0.22;
  let statusLabel = 'Salarié Non-Cadre du Secteur Privé';
  if (status === 'cadre') {
    employeeRate = 0.25;
    statusLabel = 'Salarié Cadre (avec cotisations APEC et prévoyance cadre)';
  } else if (status === 'fonctionnaire') {
    employeeRate = 0.15;
    statusLabel = 'Fonctionnaire / Agent Public';
  }

  const socialContributionsAnnual = Math.round(gross * employeeRate * 100) / 100;
  const netBrutAnnual = Math.max(gross - socialContributionsAnnual, 0);

  // Impôt sur le revenu (Prélèvement à la source 2026 - Barème progressif)
  // 0% jusqu'à 11 294 €
  // 11% de 11 295 € à 28 797 €
  // 30% de 28 798 € à 82 341 €
  // 41% de 82 342 € à 177 106 €
  // 45% au-delà
  const ABATTEMENT_FRAIS_PRO = 0.10; // 10% déduction forfaitaire pour frais professionnels (min 495€, max 14 171€)
  const deductionPro = Math.min(Math.max(netBrutAnnual * ABATTEMENT_FRAIS_PRO, 495), 14171);
  const revenuImposable = Math.max(netBrutAnnual - deductionPro, 0);

  let incomeTax = 0;
  if (revenuImposable > 11294) {
    incomeTax += (Math.min(revenuImposable, 28797) - 11294) * 0.11;
  }
  if (revenuImposable > 28797) {
    incomeTax += (Math.min(revenuImposable, 82341) - 28797) * 0.30;
  }
  if (revenuImposable > 82341) {
    incomeTax += (Math.min(revenuImposable, 177106) - 82341) * 0.41;
  }
  if (revenuImposable > 177106) {
    incomeTax += (revenuImposable - 177106) * 0.45;
  }

  incomeTax = Math.round(incomeTax * 100) / 100;
  const netApresImpotAnnual = Math.max(Math.round((netBrutAnnual - incomeTax) * 100) / 100, 0);

  const grossMonthly = Math.round((gross / 12) * 100) / 100;
  const netMonthly = Math.round((netApresImpotAnnual / 12) * 100) / 100;
  const netAvantImpotMonthly = Math.round((netBrutAnnual / 12) * 100) / 100;

  const totalDeductions = Math.round((socialContributionsAnnual + incomeTax) * 100) / 100;
  const takeHomePercent = gross > 0 ? Math.round((netApresImpotAnnual / gross) * 10000) / 100 : 100;
  const effectiveTaxRate = gross > 0 ? Math.round((incomeTax / gross) * 10000) / 100 : 0;

  return {
    grossAnnual: gross,
    grossMonthly,
    netAnnual: netApresImpotAnnual,
    netMonthly,
    totalIncomeTax: incomeTax,
    effectiveTaxRatePercent: effectiveTaxRate,
    totalSocialSecurityEmployee: socialContributionsAnnual,
    socialSecurityRatePercent: Math.round(employeeRate * 10000) / 100,
    totalDeductionsAnnual: totalDeductions,
    takeHomePercent,
    currencySymbol: '€',
    breakdown: [
      {
        label: 'Salaire Net Après Impôt',
        amount: netApresImpotAnnual,
        percentOfGross: takeHomePercent,
        color: '#10B981',
        description: `Montant versé sur votre compte bancaire (${netMonthly.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € / mois)`,
      },
      {
        label: 'Cotisations Sociales Salariées',
        amount: socialContributionsAnnual,
        percentOfGross: Math.round(employeeRate * 10000) / 100,
        color: '#3B82F6',
        description: 'Assurance maladie, retraite de base & complémentaire Agirc-Arrco, CSG/CRDS (9.7%)',
      },
      {
        label: "Impôt sur le Revenu (Prélèvement à la Source)",
        amount: incomeTax,
        percentOfGross: effectiveTaxRate,
        color: '#D9531E',
        description: 'Barème progressif officiel Direction Générale des Finances Publiques (DGFiP)',
      },
    ],
    statutoryDetails: {
      statutProfessionnel: statusLabel,
      salaireNetAvantImpotMensuel: netAvantImpotMonthly,
      tauxPrelevementSourceEstime: `${effectiveTaxRate}%`,
      baseCotisationsUrssaf: gross,
      cadreReglementaire: 'Code du travail & Barème URSSAF 2026',
    },
  };
}

/**
 * Converts numbers to French words adhering strictly to French grammar rules
 * (e.g., quatre-vingts, cent, mille invariable, trait d'union réforme 1990).
 */
export function convertNumberToFrenchWords(num: number): NumberToWordsResult {
  const UNITS = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const TEENS = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const TENS = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];

  function convertBelow100(n: number): string {
    if (n < 10) return UNITS[n];
    if (n >= 10 && n < 20) return TEENS[n - 10];
    if (n === 71) return 'soixante-et-onze';
    if (n > 70 && n < 80) return `soixante-${TEENS[n - 70]}`;
    if (n === 80) return 'quatre-vingts';
    if (n > 80 && n < 90) return `quatre-vingt-${UNITS[n - 80]}`;
    if (n >= 90 && n < 100) return `quatre-vingt-${TEENS[n - 90]}`;

    const ten = Math.floor(n / 10);
    const unit = n % 10;
    if (unit === 1 && ten < 7) return `${TENS[ten]}-et-un`;
    return unit > 0 ? `${TENS[ten]}-${UNITS[unit]}` : TENS[ten];
  }

  function convertBelow1000(n: number): string {
    if (n === 0) return '';
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    let res = '';
    if (hundred === 1) res = 'cent';
    else if (hundred > 1) res = `${UNITS[hundred]}-cent${remainder === 0 ? 's' : ''}`;

    if (remainder > 0) {
      const restWords = convertBelow100(remainder);
      res = res ? `${res}-${restWords}` : restWords;
    }
    return res;
  }

  const integerPart = Math.floor(Math.abs(num));
  const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

  if (integerPart === 0 && decimalPart === 0) {
    return {
      numericValue: num,
      inWords: 'zéro euro',
      currencyLabel: 'euros',
      formattedOfficial: 'Zéro euro et zéro centime',
    };
  }

  let words = '';
  if (integerPart >= 1000000) {
    const millions = Math.floor(integerPart / 1000000);
    words += `${convertBelow1000(millions)} million${millions > 1 ? 's' : ''} `;
  }

  const thousands = Math.floor((integerPart % 1000000) / 1000);
  if (thousands === 1) {
    words += 'mille ';
  } else if (thousands > 1) {
    words += `${convertBelow1000(thousands)} mille `;
  }

  const remainder1000 = integerPart % 1000;
  if (remainder1000 > 0 || words === '') {
    words += convertBelow1000(remainder1000);
  }

  words = words.trim();
  const euroWord = integerPart > 1 ? 'euros' : 'euro';
  let formatted = `${words} ${euroWord}`;

  if (decimalPart > 0) {
    const decimalWords = convertBelow100(decimalPart);
    const centimeWord = decimalPart > 1 ? 'centimes' : 'centime';
    formatted += ` et ${decimalWords} ${centimeWord}`;
  }

  return {
    numericValue: num,
    inWords: formatted,
    currencyLabel: 'euros',
    formattedOfficial: formatted.charAt(0).toUpperCase() + formatted.slice(1),
  };
}
