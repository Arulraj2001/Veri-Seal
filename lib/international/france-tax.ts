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


// ---------------------------------------------------------------------------
// STATUTORY MODULE: COÛT D'EMBAUCHE EMPLOYEUR & CHARGES PATRONALES (SUPERBRUT)
// Code du travail & URSSAF 2026 (Réduction générale / Ex-Fillon)
// ---------------------------------------------------------------------------
export interface SuperbrutInput {
  salaireBrutMensuel: number;
  statut: 'cadre' | 'non_cadre';
  tailleEntreprise: 'moins_de_50' | '50_et_plus';
}

export interface SuperbrutResult {
  salaireBrutAnnuel: number;
  salaireBrutMensuel: number;
  chargesPatronalesAnnuelles: number;
  chargesPatronalesMensuelles: number;
  reductionGeneraleAnnuelle: number;
  coutTotalEmployeurAnnuel: number;
  coutTotalEmployeurMensuel: number;
  salaireNetEstimeMensuel: number;
  tauxChargesPatronalesEffectif: number;
  ratioSuperbrutSurNet: number;
}

export function calculateSuperbrutEmployeurFrance(input: SuperbrutInput): SuperbrutResult {
  const brutMensuel = Math.max(input.salaireBrutMensuel, 0);
  const brutAnnuel = brutMensuel * 12;
  const smicHoraire = 11.88; // SMIC 2026
  const smicMensuel = smicHoraire * 151.67; // ~1 801,84 €
  const smicAnnuel = smicMensuel * 12;

  // Taux de charges patronales brut standard (~42% non-cadre, ~45% cadre avec APEC et prévoyance obligatoire)
  const tauxBrutPatronal = input.statut === 'cadre' ? 0.45 : 0.42;
  const chargesBrutesAnnuelles = brutAnnuel * tauxBrutPatronal;

  // Réduction générale des cotisations patronales (ex-Fillon) applicable si salaire < 1.6 SMIC
  let reductionAnnuelle = 0;
  if (brutAnnuel < 1.6 * smicAnnuel && brutAnnuel > 0) {
    const tMax = input.tailleEntreprise === '50_et_plus' ? 0.3235 : 0.3195;
    const coeff = (tMax / 0.6) * ((1.6 * smicAnnuel / brutAnnuel) - 1);
    const coeffFinal = Math.min(Math.max(coeff, 0), tMax);
    reductionAnnuelle = brutAnnuel * coeffFinal;
  }

  const chargesNettesAnnuelles = Math.max(chargesBrutesAnnuelles - reductionAnnuelle, 0);
  const coutTotalAnnuel = brutAnnuel + chargesNettesAnnuelles;
  const salaireNetMensuel = brutMensuel * (input.statut === 'cadre' ? 0.75 : 0.78);

  return {
    salaireBrutAnnuel: Math.round(brutAnnuel * 100) / 100,
    salaireBrutMensuel: Math.round(brutMensuel * 100) / 100,
    chargesPatronalesAnnuelles: Math.round(chargesNettesAnnuelles * 100) / 100,
    chargesPatronalesMensuelles: Math.round((chargesNettesAnnuelles / 12) * 100) / 100,
    reductionGeneraleAnnuelle: Math.round(reductionAnnuelle * 100) / 100,
    coutTotalEmployeurAnnuel: Math.round(coutTotalAnnuel * 100) / 100,
    coutTotalEmployeurMensuel: Math.round((coutTotalAnnuel / 12) * 100) / 100,
    salaireNetEstimeMensuel: Math.round(salaireNetMensuel * 100) / 100,
    tauxChargesPatronalesEffectif: brutAnnuel > 0 ? Math.round((chargesNettesAnnuelles / brutAnnuel) * 1000) / 10 : 0,
    ratioSuperbrutSurNet: salaireNetMensuel > 0 ? Math.round(((coutTotalAnnuel / 12) / salaireNetMensuel) * 100) / 100 : 0,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: PRIME DE PRÉCARITÉ & INDEMNITÉ DE FIN DE CDD
// Code du travail (Article L. 1243-8)
// ---------------------------------------------------------------------------
export interface FinCddInput {
  remunerationBruteTotale: number; // Somme de tous les salaires bruts perçus pendant le CDD
  joursCongesNonPris: number;
  salaireDernierMoisBrut: number;
}

export interface FinCddResult {
  primePrecarite10Pct: number;
  indemniteCongesPayes: number;
  soldeToutCompteFinalBrut: number;
  assietteTotaleBrute: number;
}

export function calculateFinCddFrance(input: FinCddInput): FinCddResult {
  const remunTotale = Math.max(input.remunerationBruteTotale, 0);
  const primePrecarite = Math.round(remunTotale * 0.10 * 100) / 100;

  // Règle du 1/10e sur la rémunération totale majorée de la prime de précarité
  // ou salaire journalier moyen selon congés restants
  const assietteConges = remunTotale + primePrecarite;
  const valeurJourConges = input.salaireDernierMoisBrut > 0 ? input.salaireDernierMoisBrut / 21.67 : (remunTotale / 12) / 21.67;
  const indemniteConges = Math.round(Math.max(input.joursCongesNonPris * valeurJourConges, assietteConges * 0.10 * (Math.min(input.joursCongesNonPris, 30) / 30)) * 100) / 100;

  return {
    primePrecarite10Pct: primePrecarite,
    indemniteCongesPayes: indemniteConges,
    soldeToutCompteFinalBrut: Math.round((primePrecarite + indemniteConges) * 100) / 100,
    assietteTotaleBrute: Math.round(assietteConges * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: FRAIS DE NOTAIRE IMMOBILIER FRANCE 2026
// Décret n° 2016-230 & Arrêté du 28 février 2020
// ---------------------------------------------------------------------------
export interface FraisNotaireInput {
  prixAchatBien: number;
  typeBien: 'ancien' | 'neuf';
  departementTauxPlein: boolean; // 5,80% (vrai pour 97 départements) ou 5,09%
}

export interface FraisNotaireResult {
  prixAcquisition: number;
  droitsEnregistrementFiscaux: number;
  emolumentsNotaireHT: number;
  tvaEmolumentsNotaire: number;
  contributionSecuriteImmobiliere: number;
  fraisFormalitesDebours: number;
  totalFraisAcquisition: number;
  pourcentageEffectif: number;
}

export function calculateFraisNotaireFrance(input: FraisNotaireInput): FraisNotaireResult {
  const P = Math.max(input.prixAchatBien, 0);

  // Droits d'enregistrement (Taxe de publicité foncière)
  let droitsMutation = 0;
  if (input.typeBien === 'ancien') {
    droitsMutation = input.departementTauxPlein ? P * 0.0580665 : P * 0.0509006;
  } else {
    // Vente en VEFA ou neuf soumis à TVA : taxe foncière réduite 0,715%
    droitsMutation = P * 0.00715;
  }

  // Émoluments réglementés du notaire (Barème officiel dégressif par tranches)
  let emolumentsHT = 0;
  if (P > 0) {
    if (P <= 6500) {
      emolumentsHT = P * 0.03870;
    } else if (P <= 17000) {
      emolumentsHT = (6500 * 0.03870) + ((P - 6500) * 0.01596);
    } else if (P <= 60000) {
      emolumentsHT = (6500 * 0.03870) + ((17000 - 6500) * 0.01596) + ((P - 17000) * 0.01064);
    } else {
      emolumentsHT = (6500 * 0.03870) + ((17000 - 6500) * 0.01596) + ((60000 - 17000) * 0.01064) + ((P - 60000) * 0.00799);
    }
  }

  const tvaEmoluments = emolumentsHT * 0.20;
  // Contribution de sécurité immobilière (CSI) : 0,10% du prix avec minimum de 15 €
  const csi = Math.max(P * 0.0010, 15);
  // Formalités administratives, copies authentiques et débours forfaitaires
  const debours = input.typeBien === 'ancien' ? 1200 : 1450;

  const total = Math.round((droitsMutation + emolumentsHT + tvaEmoluments + csi + debours) * 100) / 100;

  return {
    prixAcquisition: P,
    droitsEnregistrementFiscaux: Math.round(droitsMutation * 100) / 100,
    emolumentsNotaireHT: Math.round(emolumentsHT * 100) / 100,
    tvaEmolumentsNotaire: Math.round(tvaEmoluments * 100) / 100,
    contributionSecuriteImmobiliere: Math.round(csi * 100) / 100,
    fraisFormalitesDebours: debours,
    totalFraisAcquisition: total,
    pourcentageEffectif: P > 0 ? Math.round((total / P) * 1000) / 10 : 0,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: PLUS-VALUE IMMOBILIÈRE & ABATTEMENTS POUR DURÉE DE DÉTENTION
// Article 150 VC du Code Général des Impôts (CGI)
// ---------------------------------------------------------------------------
export interface PlusValueImmoInput {
  prixVente: number;
  prixAchat: number;
  anneesDetention: number;
  forfaitTravaux: boolean; // 15% automatique si détention > 5 ans
  forfaitAcquisition: boolean; // 7,5% automatique pour frais d'achat
}

export interface PlusValueImmoResult {
  prixAchatMajore: number;
  plusValueBrute: number;
  tauxAbattementIR: number;
  tauxAbattementPS: number;
  baseImposableIR: number;
  baseImposablePS: number;
  impotRevenu19Pct: number;
  prelevementsSociaux17Pct2: number;
  impotTotalPlusValue: number;
  netVendeurEnPoche: number;
  exonereTotalement: boolean;
}

export function calculatePlusValueImmoFrance(input: PlusValueImmoInput): PlusValueImmoResult {
  const vente = Math.max(input.prixVente, 0);
  const achat = Math.max(input.prixAchat, 0);

  const fraisAchat = input.forfaitAcquisition ? achat * 0.075 : 0;
  const travaux = (input.forfaitTravaux && input.anneesDetention > 5) ? achat * 0.15 : 0;
  const achatMajore = achat + fraisAchat + travaux;

  const pvBrute = Math.max(vente - achatMajore, 0);

  // Abattement IR (19%) : 6% par an de 6 à 21 ans, 4% la 22e année -> Exonération à 22 ans
  let abattementIR = 0;
  if (input.anneesDetention <= 5) {
    abattementIR = 0;
  } else if (input.anneesDetention < 22) {
    abattementIR = (input.anneesDetention - 5) * 0.06;
  } else {
    abattementIR = 1.0;
  }

  // Abattement Prélèvements Sociaux (17,2%) : 1,65% de 6 à 21 ans, 1,6% la 22e, 9% de 23 à 30 ans -> Exonération à 30 ans
  let abattementPS = 0;
  if (input.anneesDetention <= 5) {
    abattementPS = 0;
  } else if (input.anneesDetention <= 21) {
    abattementPS = (input.anneesDetention - 5) * 0.0165;
  } else if (input.anneesDetention === 22) {
    abattementPS = (16 * 0.0165) + 0.016; // 28%
  } else if (input.anneesDetention < 30) {
    abattementPS = 0.28 + (input.anneesDetention - 22) * 0.09;
  } else {
    abattementPS = 1.0;
  }

  const baseIR = Math.max(pvBrute * (1 - abattementIR), 0);
  const basePS = Math.max(pvBrute * (1 - abattementPS), 0);

  const impotIR = Math.round(baseIR * 0.19 * 100) / 100;
  const impotPS = Math.round(basePS * 0.172 * 100) / 100;
  const totalImpot = Math.round((impotIR + impotPS) * 100) / 100;

  return {
    prixAchatMajore: Math.round(achatMajore * 100) / 100,
    plusValueBrute: Math.round(pvBrute * 100) / 100,
    tauxAbattementIR: Math.round(abattementIR * 1000) / 10,
    tauxAbattementPS: Math.round(abattementPS * 1000) / 10,
    baseImposableIR: Math.round(baseIR * 100) / 100,
    baseImposablePS: Math.round(basePS * 100) / 100,
    impotRevenu19Pct: impotIR,
    prelevementsSociaux17Pct2: impotPS,
    impotTotalPlusValue: totalImpot,
    netVendeurEnPoche: Math.round((vente - totalImpot) * 100) / 100,
    exonereTotalement: totalImpot === 0,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: PRÊT IMMOBILIER & MENSUALITÉ CRÉDIT AVEC ASSURANCE
// ---------------------------------------------------------------------------
export interface PretImmoInput {
  montantEmprunte: number;
  dureeAnnees: number;
  tauxInteretAnnuel: number;
  tauxAssuranceAnnuel: number;
}

export interface PretImmoResult {
  mensualiteHorsAssurance: number;
  mensualiteAssurance: number;
  mensualiteTotale: number;
  coutTotalInterets: number;
  coutTotalAssurance: number;
  coutTotalCredit: number;
}

export function calculatePretImmobilierFrance(input: PretImmoInput): PretImmoResult {
  const P = Math.max(input.montantEmprunte, 0);
  const n = input.dureeAnnees * 12;
  const r = (input.tauxInteretAnnuel / 100) / 12;

  let mensualiteHorsAssurance = 0;
  if (r > 0 && n > 0) {
    mensualiteHorsAssurance = P * (r / (1 - Math.pow(1 + r, -n)));
  } else if (n > 0) {
    mensualiteHorsAssurance = P / n;
  }

  const mensualiteAssurance = (P * (input.tauxAssuranceAnnuel / 100)) / 12;
  const mensualiteTotale = mensualiteHorsAssurance + mensualiteAssurance;

  const coutInterets = Math.max((mensualiteHorsAssurance * n) - P, 0);
  const coutAssurance = mensualiteAssurance * n;

  return {
    mensualiteHorsAssurance: Math.round(mensualiteHorsAssurance * 100) / 100,
    mensualiteAssurance: Math.round(mensualiteAssurance * 100) / 100,
    mensualiteTotale: Math.round(mensualiteTotale * 100) / 100,
    coutTotalInterets: Math.round(coutInterets * 100) / 100,
    coutTotalAssurance: Math.round(coutAssurance * 100) / 100,
    coutTotalCredit: Math.round((coutInterets + coutAssurance) * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: PRÊT À TAUX ZÉRO (PTZ 2026)
// Barème Loi de finances 2026
// ---------------------------------------------------------------------------
export interface PtzInput {
  zone: 'A' | 'B1' | 'B2' | 'C';
  nbPersonnesFoyer: number;
  coutProjet: number;
  revenuFiscalReferenceNMoins2: number;
}

export interface PtzResult {
  montantPtzMax: number;
  quotiteFinancement: number;
  plafondOperationRetenu: number;
  revenuMaxAdmissible: number;
  estEligible: boolean;
  trancheRevenu: number;
  dureeRemboursementAnnees: number;
  differeAmortissementAnnees: number;
}

export function calculatePtzFrance(input: PtzInput): PtzResult {
  const nb = Math.max(input.nbPersonnesFoyer, 1);
  const cout = Math.max(input.coutProjet, 0);

  // Plafond d'opération pris en compte selon zone et composition familiale
  const plafondsZone: Record<string, number[]> = {
    A: [150000, 210000, 255000, 300000, 345000],
    B1: [135000, 189000, 230000, 270000, 311000],
    B2: [110000, 154000, 187000, 220000, 253000],
    C: [100000, 140000, 170000, 200000, 230000],
  };
  const idx = Math.min(nb - 1, 4);
  const plafondOperation = plafondsZone[input.zone][idx];
  const assiette = Math.min(cout, plafondOperation);

  // Plafond de ressources 2026
  const plafondsRessources: Record<string, number[]> = {
    A: [49000, 73500, 88200, 102900, 117600],
    B1: [34500, 51750, 62100, 72450, 82800],
    B2: [31500, 47250, 56700, 66150, 75600],
    C: [28500, 42750, 51300, 59850, 68400],
  };
  const plafondRessource = plafondsRessources[input.zone][idx];

  const estEligible = input.revenuFiscalReferenceNMoins2 <= plafondRessource;

  let quotite = 0.40; // 40% standard tranche 2
  let tranche = 2;
  let duree = 20;
  let differe = 5;

  if (estEligible) {
    if (input.revenuFiscalReferenceNMoins2 <= plafondRessource * 0.5) {
      quotite = 0.50; // Tranche 1 (50%)
      tranche = 1;
      duree = 25;
      differe = 10;
    } else if (input.revenuFiscalReferenceNMoins2 > plafondRessource * 0.8) {
      quotite = 0.20; // Tranche 4 (20%)
      tranche = 3;
      duree = 15;
      differe = 0;
    }
  }

  const montantPtz = estEligible ? Math.round(assiette * quotite) : 0;

  return {
    montantPtzMax: montantPtz,
    quotiteFinancement: estEligible ? quotite * 100 : 0,
    plafondOperationRetenu: plafondOperation,
    revenuMaxAdmissible: plafondRessource,
    estEligible,
    trancheRevenu: tranche,
    dureeRemboursementAnnees: duree,
    differeAmortissementAnnees: differe,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: RENDEMENT LOCATIF BRUT & NET FISCAL FRANCE
// ---------------------------------------------------------------------------
export interface RendementLocatifInput {
  prixAchat: number;
  fraisNotaire: number;
  travauxRenovation: number;
  loyerMensuelHorsCharges: number;
  chargesCoproprieteNonRecuperablesAnnuelles: number;
  taxeFonciereAnnuelle: number;
  assurancePnoAnnuelle: number;
  regimeFiscal: 'micro_foncier' | 'reel';
  trancheMarginaleImpot: number; // 0, 11, 30, 41, 45%
}

export interface RendementLocatifResult {
  investissementTotal: number;
  revenusLocatifsAnnuels: number;
  rendementBrut: number;
  rendementNetCharges: number;
  rendementNetFiscal: number;
  impotRevenuEtPrelevementsSociaux: number;
  cashFlowMensuelNet: number;
}

export function calculateRendementLocatifFrance(input: RendementLocatifInput): RendementLocatifResult {
  const investissement = input.prixAchat + input.fraisNotaire + input.travauxRenovation;
  const loyerAnnuel = input.loyerMensuelHorsCharges * 12;

  const chargesAnnuelles = input.chargesCoproprieteNonRecuperablesAnnuelles + input.taxeFonciereAnnuelle + input.assurancePnoAnnuelle;
  const revenuNetCharges = Math.max(loyerAnnuel - chargesAnnuelles, 0);

  // Fiscalité des revenus locatifs (IR au TMI + Prélèvements sociaux 17.2%)
  let baseImposable = 0;
  if (input.regimeFiscal === 'micro_foncier') {
    baseImposable = loyerAnnuel * 0.70; // 30% d'abattement forfaitaire
  } else {
    baseImposable = Math.max(revenuNetCharges, 0);
  }

  const tauxGlobalFiscal = (input.trancheMarginaleImpot / 100) + 0.172;
  const impotTotal = Math.round(baseImposable * tauxGlobalFiscal * 100) / 100;
  const revenuNetNet = Math.max(revenuNetCharges - impotTotal, 0);

  return {
    investissementTotal: investissement,
    revenusLocatifsAnnuels: loyerAnnuel,
    rendementBrut: investissement > 0 ? Math.round((loyerAnnuel / investissement) * 10000) / 100 : 0,
    rendementNetCharges: investissement > 0 ? Math.round((revenuNetCharges / investissement) * 10000) / 100 : 0,
    rendementNetFiscal: investissement > 0 ? Math.round((revenuNetNet / investissement) * 10000) / 100 : 0,
    impotRevenuEtPrelevementsSociaux: impotTotal,
    cashFlowMensuelNet: Math.round((revenuNetNet / 12) * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: VALIDATEUR SIREN / SIRET (Algorithme de Luhn officiel INSEE)
// ---------------------------------------------------------------------------
export interface SirenSiretResult {
  valide: boolean;
  type: 'SIREN' | 'SIRET' | 'INCONNU';
  siren: string;
  nic: string;
  cleLuhn: number;
  message: string;
}

export function validateSirenSiretFrance(code: string): SirenSiretResult {
  const clean = code.replace(/[\s\.-]/g, '');

  if (!/^\d+$/.test(clean)) {
    return {
      valide: false,
      type: 'INCONNU',
      siren: '',
      nic: '',
      cleLuhn: 0,
      message: 'Le code ne doit contenir que des chiffres.',
    };
  }

  // Algorithme de Luhn
  function checkLuhn(str: string): boolean {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      let digit = parseInt(str.charAt(str.length - 1 - i), 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  if (clean.length === 9) {
    const isLuhn = checkLuhn(clean);
    return {
      valide: isLuhn,
      type: 'SIREN',
      siren: clean,
      nic: '',
      cleLuhn: parseInt(clean[8], 10),
      message: isLuhn ? 'Numéro SIREN valide (INSEE).' : 'Clé de contrôle SIREN invalide (échec Luhn).',
    };
  }

  if (clean.length === 14) {
    // Exception officielle INSEE pour les établissements de La Poste
    const isPoste = clean.startsWith('356000000');
    let isLuhn = false;
    if (isPoste) {
      let sum = 0;
      for (let i = 0; i < 14; i++) sum += parseInt(clean[i], 10);
      isLuhn = sum % 5 === 0;
    } else {
      isLuhn = checkLuhn(clean);
    }

    return {
      valide: isLuhn,
      type: 'SIRET',
      siren: clean.substring(0, 9),
      nic: clean.substring(9, 14),
      cleLuhn: parseInt(clean[13], 10),
      message: isLuhn ? 'Numéro SIRET valide (SIREN + Établissement NIC).' : 'Numéro SIRET non conforme (échec Luhn).',
    };
  }

  return {
    valide: false,
    type: 'INCONNU',
    siren: '',
    nic: '',
    cleLuhn: 0,
    message: `Longueur incorrecte (${clean.length} chiffres au lieu de 9 pour SIREN ou 14 pour SIRET).`,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: CALCULATEUR TVA ET CLÉ TVA INTRACOMMUNAUTAIRE
// ---------------------------------------------------------------------------
export interface TvaFranceResult {
  montantHT: number;
  tauxTvaPourcent: number;
  montantTVA: number;
  montantTTC: number;
  numeroTvaIntracommunautaire?: string;
}

export function calculateTvaFrance(
  montant: number,
  sens: 'ht_vers_ttc' | 'ttc_vers_ht',
  tauxPourcent: 20 | 10 | 5.5 | 2.1,
  sirenPourCle?: string
): TvaFranceResult {
  const m = Math.max(montant, 0);
  const taux = tauxPourcent / 100;

  let ht = 0;
  let ttc = 0;
  let tva = 0;

  if (sens === 'ht_vers_ttc') {
    ht = m;
    tva = Math.round(ht * taux * 100) / 100;
    ttc = Math.round((ht + tva) * 100) / 100;
  } else {
    ttc = m;
    ht = Math.round((ttc / (1 + taux)) * 100) / 100;
    tva = Math.round((ttc - ht) * 100) / 100;
  }

  let numeroTva: string | undefined;
  if (sirenPourCle) {
    const cleanSiren = sirenPourCle.replace(/\s+/g, '');
    if (cleanSiren.length === 9 && /^\d+$/.test(cleanSiren)) {
      const sirenNum = parseInt(cleanSiren, 10);
      const cle = (12 + 3 * (sirenNum % 97)) % 97;
      numeroTva = `FR${cle.toString().padStart(2, '0')}${cleanSiren}`;
    }
  }

  return {
    montantHT: ht,
    tauxTvaPourcent: tauxPourcent,
    montantTVA: tva,
    montantTTC: ttc,
    numeroTvaIntracommunautaire: numeroTva,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: HEURES SUPPLÉMENTAIRES (Majorations et Loi TEPA)
// Articles L. 3121-28 et suivants du Code du travail
// ---------------------------------------------------------------------------
export interface HeuresSuppInput {
  tauxHoraireBrut: number;
  heuresMajorees25Pct: number; // 36e à 43e heure
  heuresMajorees50Pct: number; // à partir de la 44e heure
}

export interface HeuresSuppResult {
  tauxHoraireBase: number;
  remunerationSuppBruteTotale: number;
  remunerationSuppNetteEstimee: number;
  allegementCotisationsSalariales: number; // ~11,31% exonérés
  exonerationImpotRevenuEstimee: number;
}

export function calculateHeuresSuppFrance(input: HeuresSuppInput): HeuresSuppResult {
  const th = Math.max(input.tauxHoraireBrut, 0);
  const h25 = Math.max(input.heuresMajorees25Pct, 0);
  const h50 = Math.max(input.heuresMajorees50Pct, 0);

  const gain25 = h25 * th * 1.25;
  const gain50 = h50 * th * 1.50;
  const brutTotal = Math.round((gain25 + gain50) * 100) / 100;

  // Réduction de cotisations salariales d'assurance vieillesse de 11,31%
  const allegementCotisations = Math.round(brutTotal * 0.1131 * 100) / 100;
  // Net perçu avec allègement (cotisations réduites à ~10,69% au lieu de 22%)
  const netEstime = Math.round((brutTotal * 0.8931) * 100) / 100;

  return {
    tauxHoraireBase: th,
    remunerationSuppBruteTotale: brutTotal,
    remunerationSuppNetteEstimee: netEstime,
    allegementCotisationsSalariales: allegementCotisations,
    exonerationImpotRevenuEstimee: brutTotal, // Exonéré d'IR jusqu'à 7 500 € par an
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: BARÈME KILOMÉTRIQUE FISCAL OFFICIEL 2026 (DGFiP)
// ---------------------------------------------------------------------------
export interface FraisKmInput {
  puissanceFiscaleCV: number; // 3 à 7 et +
  distanceAnnuelleKm: number;
  motorisation: 'thermique' | 'electrique';
}

export interface FraisKmResult {
  indemniteKilometriqueTotale: number;
  baremeFormuleUtilisee: string;
  majorationElectrique: number;
}

export function calculateFraisKilometriquesFrance(input: FraisKmInput): FraisKmResult {
  const cv = Math.min(Math.max(input.puissanceFiscaleCV, 3), 7);
  const d = Math.max(input.distanceAnnuelleKm, 0);

  let indemnite = 0;
  let formule = '';

  // Barème officiel de l'administration fiscale
  if (cv <= 3) {
    if (d <= 5000) {
      indemnite = d * 0.529;
      formule = 'd × 0,529 €';
    } else if (d <= 20000) {
      indemnite = (d * 0.316) + 1065;
      formule = '(d × 0,316 €) + 1 065 €';
    } else {
      indemnite = d * 0.370;
      formule = 'd × 0,370 €';
    }
  } else if (cv === 4) {
    if (d <= 5000) {
      indemnite = d * 0.606;
      formule = 'd × 0,606 €';
    } else if (d <= 20000) {
      indemnite = (d * 0.340) + 1330;
      formule = '(d × 0,340 €) + 1 330 €';
    } else {
      indemnite = d * 0.407;
      formule = 'd × 0,407 €';
    }
  } else if (cv === 5) {
    if (d <= 5000) {
      indemnite = d * 0.636;
      formule = 'd × 0,636 €';
    } else if (d <= 20000) {
      indemnite = (d * 0.357) + 1395;
      formule = '(d × 0,357 €) + 1 395 €';
    } else {
      indemnite = d * 0.427;
      formule = 'd × 0,427 €';
    }
  } else if (cv === 6) {
    if (d <= 5000) {
      indemnite = d * 0.665;
      formule = 'd × 0,665 €';
    } else if (d <= 20000) {
      indemnite = (d * 0.374) + 1457;
      formule = '(d × 0,374 €) + 1 457 €';
    } else {
      indemnite = d * 0.447;
      formule = 'd × 0,447 €';
    }
  } else {
    // 7 CV et plus
    if (d <= 5000) {
      indemnite = d * 0.697;
      formule = 'd × 0,697 €';
    } else if (d <= 20000) {
      indemnite = (d * 0.394) + 1515;
      formule = '(d × 0,394 €) + 1 515 €';
    } else {
      indemnite = d * 0.470;
      formule = 'd × 0,470 €';
    }
  }

  // Majoration de 20% pour les véhicules 100% électriques
  let bonusElectrique = 0;
  if (input.motorisation === 'electrique') {
    bonusElectrique = indemnite * 0.20;
    indemnite *= 1.20;
    formule += ' + 20% (bonification véhicule 100% électrique)';
  }

  return {
    indemniteKilometriqueTotale: Math.round(indemnite * 100) / 100,
    baremeFormuleUtilisee: formule,
    majorationElectrique: Math.round(bonusElectrique * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: HEURES DÉCIMALES & CONVERSIONS TEMPS DE TRAVAIL
// ---------------------------------------------------------------------------
export function convertHoursMinutesToDecimal(heures: number, minutes: number): number {
  return Math.round((heures + (minutes / 60)) * 100) / 100;
}

export function convertDecimalToHoursMinutes(decimal: number): { heures: number; minutes: number; affichage: string } {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  return {
    heures: h,
    minutes: m,
    affichage: `${h}h ${m.toString().padStart(2, '0')}min`,
  };
}

// ---------------------------------------------------------------------------
// STATUTORY MODULE: CALCULATEUR DE SOLDES ET REMISES EN CASCADE
// ---------------------------------------------------------------------------
export function calculateSoldesRemisesFrance(prixInitial: number, pourcentage1: number, pourcentage2: number = 0): {
  prixApresPremiereRemise: number;
  montantEconomie1: number;
  prixFinal: number;
  montantTotalEconomie: number;
  tauxReductionReelTotal: number;
} {
  const p = Math.max(prixInitial, 0);
  const r1 = Math.min(Math.max(pourcentage1, 0), 100) / 100;
  const eco1 = p * r1;
  const prix1 = p - eco1;

  const r2 = Math.min(Math.max(pourcentage2, 0), 100) / 100;
  const eco2 = prix1 * r2;
  const prixFinal = prix1 - eco2;
  const totalEco = eco1 + eco2;

  return {
    prixApresPremiereRemise: Math.round(prix1 * 100) / 100,
    montantEconomie1: Math.round(eco1 * 100) / 100,
    prixFinal: Math.round(prixFinal * 100) / 100,
    montantTotalEconomie: Math.round(totalEco * 100) / 100,
    tauxReductionReelTotal: p > 0 ? Math.round((totalEco / p) * 1000) / 10 : 0,
  };
}
