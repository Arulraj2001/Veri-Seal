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



// ---------------------------------------------------------------------------
// STATUTORY MODULE: AUTO-ENTREPRENEUR / MICRO-ENTREPRISE URSSAF 2026
// Code de la sécurité sociale & Direction Générale des Finances Publiques
// ---------------------------------------------------------------------------
export interface AutoEntrepreneurInput {
  chiffreAffairesAnnuel: number;
  typeActivite: 'vente_marchandises' | 'prestations_bic' | 'professions_bnc';
  beneficieAcre: boolean; // Aide aux créateurs d'entreprise (-50% 1ère année)
  versementLiberatoire: boolean; // Option versement libératoire de l'impôt sur le revenu
}

export interface AutoEntrepreneurResult {
  chiffreAffairesAnnuel: number;
  chiffreAffairesMensuelMoyen: number;
  tauxCotisationsUrssaf: number;
  montantCotisationsSocialesAnnuelles: number;
  montantCotisationsSocialesMensuelles: number;
  tauxVersementLiberatoire: number;
  montantVersementLiberatoireAnnuel: number;
  contributionFormationPro: number;
  revenuNetPocheAnnuel: number;
  revenuNetPocheMensuel: number;
  plafondChiffreAffaires: number;
  seuilFranchiseTva: number;
  alerteDepassementTva: boolean;
  alerteDepassementPlafond: boolean;
  libelleActivite: string;
}

export function calculateAutoEntrepreneurFrance(input: AutoEntrepreneurInput): AutoEntrepreneurResult {
  const ca = Math.max(input.chiffreAffairesAnnuel, 0);

  let tauxUrssaf = 0.212;
  let tauxLiberatoire = 0.017;
  let tauxCfp = 0.002;
  let plafondCA = 77700;
  let seuilTva = 37500;
  let libelle = 'Prestations de services commerciales ou artisanales (BIC)';

  if (input.typeActivite === 'vente_marchandises') {
    tauxUrssaf = 0.123; // 12.3%
    tauxLiberatoire = 0.010; // 1.0%
    tauxCfp = 0.001; // 0.1%
    plafondCA = 188700;
    seuilTva = 85000;
    libelle = 'Achat / Revente de marchandises et hébergement (BIC)';
  } else if (input.typeActivite === 'professions_bnc') {
    tauxUrssaf = 0.231; // 23.1% BNC 2026
    tauxLiberatoire = 0.022; // 2.2%
    tauxCfp = 0.002; // 0.2%
    plafondCA = 77700;
    seuilTva = 37500;
    libelle = 'Professions libérales réglementées et non-réglementées (BNC)';
  }

  // Application de l'ACRE (-50% la première année)
  if (input.beneficieAcre) {
    tauxUrssaf = tauxUrssaf / 2;
  }

  const cotisationsSociales = Math.round(ca * tauxUrssaf * 100) / 100;
  const montantLiberatoire = input.versementLiberatoire ? Math.round(ca * tauxLiberatoire * 100) / 100 : 0;
  const montantCfp = Math.round(ca * tauxCfp * 100) / 100;

  const totalPrelevements = cotisationsSociales + montantLiberatoire + montantCfp;
  const netAnnuel = Math.max(Math.round((ca - totalPrelevements) * 100) / 100, 0);

  return {
    chiffreAffairesAnnuel: ca,
    chiffreAffairesMensuelMoyen: Math.round((ca / 12) * 100) / 100,
    tauxCotisationsUrssaf: Math.round(tauxUrssaf * 1000) / 10,
    montantCotisationsSocialesAnnuelles: cotisationsSociales,
    montantCotisationsSocialesMensuelles: Math.round((cotisationsSociales / 12) * 100) / 100,
    tauxVersementLiberatoire: input.versementLiberatoire ? Math.round(tauxLiberatoire * 1000) / 10 : 0,
    montantVersementLiberatoireAnnuel: montantLiberatoire,
    contributionFormationPro: montantCfp,
    revenuNetPocheAnnuel: netAnnuel,
    revenuNetPocheMensuel: Math.round((netAnnuel / 12) * 100) / 100,
    plafondChiffreAffaires: plafondCA,
    seuilFranchiseTva: seuilTva,
    alerteDepassementTva: ca > seuilTva,
    alerteDepassementPlafond: ca > plafondCA,
    libelleActivite: libelle,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: INDEMNITÉ DE RUPTURE CONVENTIONNELLE & LICENCIEMENT 2026
// Code du travail (Articles L.1237-13, R.1234-2, R.1234-4)
// ---------------------------------------------------------------------------
export interface RuptureCalculationInput {
  salaireMensuelBrutMoyen: number; // Salaire brut de référence
  anneesAnciennete: number;
  moisAnciennete: number;
  joursCongesRestants: number;
  typeRupture: 'conventionnelle' | 'licenciement_economique' | 'licenciement_personnel';
}

export interface RuptureCalculationResult {
  salaireReference: number;
  ancienneteTotaleAnnees: number;
  indemniteLegaleMinimum: number;
  indemniteCongesPayes: number;
  totalIndemniteBrute: number;
  formuleDetaillee: string;
  regimeFiscal: string;
}

export function calculateIndemniteRuptureFrance(input: RuptureCalculationInput): RuptureCalculationResult {
  const salaireRef = Math.max(input.salaireMensuelBrutMoyen, 0);
  const totalAnnees = input.anneesAnciennete + input.moisAnciennete / 12;

  let indemnite = 0;
  let formule = '';

  // Barème légal Article R1234-2 :
  // - 1/4 de mois de salaire par année d'ancienneté pour les 10 premières années
  // - 1/3 de mois de salaire par année d'ancienneté à partir de la 11e année
  if (totalAnnees < 0.67) { // Moins de 8 mois
    indemnite = 0;
    formule = "Moins de 8 mois d'ancienneté : pas d'indemnité légale obligatoire.";
  } else if (totalAnnees <= 10) {
    indemnite = (1 / 4) * salaireRef * totalAnnees;
    formule = `(1/4 × ${salaireRef.toLocaleString('fr-FR')} €) × ${totalAnnees.toFixed(2)} ans = ${Math.round(indemnite).toLocaleString('fr-FR')} €`;
  } else {
    const tranche1 = (1 / 4) * salaireRef * 10;
    const tranche2 = (1 / 3) * salaireRef * (totalAnnees - 10);
    indemnite = tranche1 + tranche2;
    formule = `(1/4 × ${salaireRef.toLocaleString('fr-FR')} € × 10 ans) + (1/3 × ${salaireRef.toLocaleString('fr-FR')} € × ${(totalAnnees - 10).toFixed(2)} ans) = ${Math.round(indemnite).toLocaleString('fr-FR')} €`;
  }

  indemnite = Math.round(indemnite * 100) / 100;

  // Congés payés (règle du 1/10e ou maintien de salaire) : salaire journalier moyen ~ salaireRef / 21.67
  const salaireJournalier = salaireRef / 21.67;
  const congesPayes = Math.round(salaireJournalier * Math.max(input.joursCongesRestants, 0) * 100) / 100;
  const total = Math.round((indemnite + congesPayes) * 100) / 100;

  return {
    salaireReference: salaireRef,
    ancienneteTotaleAnnees: Math.round(totalAnnees * 100) / 100,
    indemniteLegaleMinimum: indemnite,
    indemniteCongesPayes: congesPayes,
    totalIndemniteBrute: total,
    formuleDetaillee: formule,
    regimeFiscal: "Exonérée d'impôt sur le revenu dans la limite du montant légal ou conventionnel (Art. 80 duodecies du CGI).",
  };
}
