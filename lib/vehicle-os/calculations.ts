import {
  CostRealityInputs,
  CostRealityResult,
  QuoteAnalysisResult,
  EvaluatedQuoteItem,
  QuoteItemStatus,
  InvoiceAnalysisResult,
  ServiceInvoiceItem,
  TyreAssessmentInputs,
  TyreAssessmentResult,
  BatteryAssessmentInputs,
  BatteryAssessmentResult,
  ComparisonVehicle,
  UsageTierComparisonResult,
  EvVsPetrolInputs,
  EvVsPetrolResult,
} from './types';
import { findBenchmarkMatch } from './service-benchmarks';

/**
 * Calculates standard monthly EMI using reducing balance formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal: number, annualRatePercent: number, tenureYears: number): number {
  if (principal <= 0 || annualRatePercent <= 0 || tenureYears <= 0) return 0;
  const monthlyRate = annualRatePercent / 12 / 100;
  const months = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

/**
 * Tool 1: Vehicle Cost Reality Checker (#1 Tool)
 * Evaluates the full 5-year ownership reality: interest, fuel, insurance, maintenance,
 * tyres, parking, tolls, detailing, minus resale, calculating real ₹/month and real ₹/km.
 */
export function calculateCostReality(inputs: CostRealityInputs): CostRealityResult {
  const years = inputs.ownershipYears || 5;
  const months = years * 12;
  const totalKm = inputs.monthlyKm * months;

  const loanPrincipal = Math.max(0, inputs.vehiclePrice - inputs.downPayment);
  const monthlyEMI = calculateEMI(loanPrincipal, inputs.loanInterestRate, inputs.loanTenureYears);
  const totalEMIPaid = monthlyEMI * Math.min(months, inputs.loanTenureYears * 12);
  const loanInterestTotal = Math.max(0, totalEMIPaid - loanPrincipal);

  // Fuel calculation
  const totalLitresOrKwh = inputs.fuelEfficiency > 0 ? totalKm / inputs.fuelEfficiency : 0;
  const fuelTotal = Math.round(totalLitresOrKwh * inputs.fuelPricePerLitreOrKwh);

  // Recurring ownership elements
  const insuranceTotal = Math.round(inputs.annualInsurance * years);
  const serviceTotal = Math.round(inputs.annualServiceCost * years);
  const tyresTotal = Math.round(inputs.tyreCost5Years * (years / 5));
  const parkingTotal = Math.round(inputs.monthlyParking * months);
  const tollsTotal = Math.round(inputs.monthlyTolls * months);
  const washingTotal = Math.round(inputs.monthlyWashing * months);
  const accessoriesTotal = inputs.accessoriesCost;

  const grossOwnershipCost = Math.round(
    inputs.vehiclePrice +
      loanInterestTotal +
      fuelTotal +
      insuranceTotal +
      serviceTotal +
      tyresTotal +
      parkingTotal +
      tollsTotal +
      washingTotal +
      accessoriesTotal
  );

  const resaleValue = inputs.expectedResaleValue;
  const netOwnershipCost = Math.max(0, grossOwnershipCost - resaleValue);
  const netCostPerMonth = Math.round(netOwnershipCost / months);
  const netCostPerKm = totalKm > 0 ? Number((netOwnershipCost / totalKm).toFixed(2)) : 0;
  const depreciationTotal = Math.max(0, inputs.vehiclePrice - resaleValue);

  return {
    vehiclePrice: inputs.vehiclePrice,
    loanPrincipal,
    loanInterestTotal,
    monthlyEMI,
    fuelTotal,
    insuranceTotal,
    serviceTotal,
    tyresTotal,
    parkingTotal,
    tollsTotal,
    washingTotal,
    accessoriesTotal,
    grossOwnershipCost,
    resaleValue,
    netOwnershipCost,
    netCostPerMonth,
    netCostPerKm,
    totalKmDriven: totalKm,
    depreciationTotal,
  };
}

/**
 * Tool 2: Service Quote Fairness Checker (Top MVP Tool)
 * Evaluates parsed or entered quote items against benchmark databases.
 */
export function evaluateServiceQuote(rawItems: { name: string; price: number }[]): QuoteAnalysisResult {
  let totalQuoted = 0;
  let fairMinTotal = 0;
  let fairMaxTotal = 0;
  let highCount = 0;
  let unnecessaryCount = 0;
  const evaluatedItems: EvaluatedQuoteItem[] = [];
  const scriptPoints: string[] = [];

  rawItems.forEach((item, idx) => {
    totalQuoted += item.price;
    const match = findBenchmarkMatch(item.name);

    if (!match) {
      evaluatedItems.push({
        id: `custom-${idx}`,
        name: item.name,
        quotedPrice: item.price,
        minFairPrice: Math.round(item.price * 0.85),
        maxFairPrice: Math.round(item.price * 1.15),
        status: 'unknown',
        percentageDiff: 0,
        advice: 'Custom or model-specific part. Verify part number with OEM catalog.',
        category: 'general',
      });
      fairMinTotal += Math.round(item.price * 0.85);
      fairMaxTotal += Math.round(item.price * 1.15);
      return;
    }

    let status: QuoteItemStatus = 'fair';
    let percentageDiff = 0;

    if (match.category === 'unnecessary' || match.maxFairPrice === 0) {
      status = 'unnecessary';
      unnecessaryCount++;
      scriptPoints.push(`"${match.commonUpsellAlert || `Please remove ${item.name} as it is an unmandated add-on.`}"`);
      fairMinTotal += 0;
      fairMaxTotal += match.maxFairPrice;
    } else if (item.price > match.maxFairPrice * 1.15) {
      status = 'high';
      highCount++;
      percentageDiff = Math.round(((item.price - match.typicalPrice) / match.typicalPrice) * 100);
      scriptPoints.push(
        `"The quote for ${item.name} is ₹${item.price.toLocaleString('en-IN')}, which is ~${percentageDiff}% higher than standard market rates (₹${match.typicalPrice.toLocaleString('en-IN')}). Can you review this pricing or provide the OEM part number?"`
      );
      fairMinTotal += match.minFairPrice;
      fairMaxTotal += match.maxFairPrice;
    } else {
      status = 'fair';
      fairMinTotal += match.minFairPrice;
      fairMaxTotal += match.maxFairPrice;
    }

    evaluatedItems.push({
      id: match.id,
      name: item.name,
      quotedPrice: item.price,
      minFairPrice: match.minFairPrice,
      maxFairPrice: match.maxFairPrice,
      status,
      percentageDiff,
      advice: match.adviceWhenHigh,
      category: match.category,
    });
  });

  const potentialSavings = Math.max(0, totalQuoted - fairMaxTotal);

  const negotiationScript =
    scriptPoints.length > 0
      ? `Dear Service Advisor,\n\nI reviewed the estimate for my vehicle. Before proceeding with the job card, please adjust the following:\n\n${scriptPoints
          .map((pt, i) => `${i + 1}. ${pt}`)
          .join('\n\n')}\n\nPlease update the revised estimate and send it for my confirmation before opening work. Thank you.`
      : 'Your estimate looks clean and reasonably aligned with typical OEM service pricing bands.';

  return {
    totalQuoted,
    fairMinTotal,
    fairMaxTotal,
    potentialSavings,
    items: evaluatedItems,
    highCount,
    unnecessaryCount,
    negotiationScript,
  };
}

/**
 * Tool 3: Service Invoice Analyzer (Top MVP Tool)
 * Breaks down parts, labour, and taxes, plus calculates period-over-period inflation.
 */
export function analyzeServiceInvoice(
  items: ServiceInvoiceItem[],
  previousTotal?: number,
  kmSinceLastService?: number
): InvoiceAnalysisResult {
  let total = 0;
  let parts = 0;
  let labour = 0;
  let tax = 0;
  let upsells = 0;

  items.forEach((item) => {
    total += item.amount;
    if (item.type === 'parts') parts += item.amount;
    else if (item.type === 'labour') labour += item.amount;
    else if (item.type === 'tax') tax += item.amount;
    else if (item.type === 'upsell') upsells += item.amount;
  });

  const partsPercentage = total > 0 ? Math.round((parts / total) * 100) : 0;
  const labourPercentage = total > 0 ? Math.round((labour / total) * 100) : 0;
  const taxPercentage = total > 0 ? Math.round((tax / total) * 100) : 0;

  const costPerKmSinceLastService =
    kmSinceLastService && kmSinceLastService > 0 ? Number((total / kmSinceLastService).toFixed(2)) : undefined;

  let previousServiceDelta: InvoiceAnalysisResult['previousServiceDelta'] = undefined;
  if (previousTotal && previousTotal > 0) {
    const amountDiff = total - previousTotal;
    const percentageDiff = Math.round((amountDiff / previousTotal) * 100);

    // Identify biggest item in this invoice
    const highestItem = [...items].sort((a, b) => b.amount - a.amount)[0];
    const primaryDriver = highestItem
      ? `${highestItem.description} (₹${highestItem.amount.toLocaleString('en-IN')}) accounts for the primary share of this increase.`
      : 'General routine service inflation.';

    previousServiceDelta = {
      previousTotal,
      amountDiff,
      percentageDiff,
      primaryDriver,
    };
  }

  return {
    totalAmount: total,
    partsAmount: parts,
    labourAmount: labour,
    taxAmount: tax,
    upsellAmount: upsells,
    partsPercentage,
    labourPercentage,
    taxPercentage,
    items,
    costPerKmSinceLastService,
    previousServiceDelta,
  };
}

/**
 * Tool 4: Tyre Replacement Decision Tool
 */
export function evaluateTyres(inputs: TyreAssessmentInputs): TyreAssessmentResult {
  const { tyreAgeMonths, odometerKm, treadDepthMm, hasCracksOrBulges, drivingEnvironment } = inputs;

  // Normal tyre lasts ~45,000 km to 55,000 km or 5-6 years (60-72 months)
  const isTooOld = tyreAgeMonths >= 60; // 5 years rubber hardening
  const isWornOut = treadDepthMm <= 2.0; // Legal minimum in India is 1.6mm
  const isCriticallyLow = treadDepthMm <= 1.6;

  let status: TyreAssessmentResult['status'] = 'safe';
  let headline = 'Tyres are in healthy roadworthy condition';
  let description = 'Tread depth and rubber elasticity are sufficient for safe braking and wet grip.';
  const recommendations: string[] = [];

  if (hasCracksOrBulges) {
    status = 'replace-immediate';
    headline = '⚠️ Immediate Replacement Required (Structural Damage)';
    description = 'Sidewall cracks or bulges indicate internal cord separation. High risk of sudden highway blowout at speed.';
    recommendations.push('Do not drive at high speeds or on expressways until replaced.');
    recommendations.push('Replace immediately in axle pairs (both front or both rear tyres together).');
  } else if (isCriticallyLow) {
    status = 'replace-immediate';
    headline = '⚠️ Tyre Tread Depth Below Legal Limit (<1.6mm)';
    description = 'Your tread depth has reached the wear indicator bar. Wet braking distance is doubled with severe aquaplaning risk.';
    recommendations.push('Replace all 4 tyres or at least the drive axle pair immediately.');
    recommendations.push('Look for deals from verified authorized distributors like Apollo, MRF, CEAT, or Michelin.');
  } else if (isWornOut || isTooOld) {
    status = 'monitor';
    headline = '🟡 Tyres Nearing End of Life (Monitor Closely)';
    description = isTooOld
      ? 'Tyres are over 5 years old. Rubber compounds oxidize and harden, causing reduced wet grip even if tread looks deep.'
      : 'Tread depth is between 2.0mm and 2.5mm. Plan replacement within the next 3,000–5,000 km.';
    recommendations.push('Check tyre pressure weekly (cold tyre PSI).');
    recommendations.push('Plan replacement before monsoon rains or long road trips.');
  } else {
    recommendations.push('Perform 4-wheel rotation, alignment, and balancing every 10,000 km.');
    recommendations.push('Maintain cold tyre PSI as indicated on the driver door B-pillar sticker.');
  }

  // Estimated life calculations
  const remainingMm = Math.max(0, treadDepthMm - 1.6);
  const wearMultiplier = drivingEnvironment === 'bad-roads' ? 0.75 : drivingEnvironment === 'mostly-highway' ? 1.15 : 1.0;
  const estimatedRemainingKm = Math.round(remainingMm * 6500 * wearMultiplier);
  const estimatedLifeTotalKm = Math.max(odometerKm + estimatedRemainingKm, 45000);

  const estimatedReplacementCost = 20000; // Typical set of 4 hatchback/csuv tyres
  const costPerKmTyres = Number((estimatedReplacementCost / estimatedLifeTotalKm).toFixed(2));

  return {
    status,
    headline,
    description,
    estimatedRemainingKm,
    estimatedLifeTotalKm,
    estimatedReplacementCost,
    costPerKmTyres,
    recommendations,
  };
}

/**
 * Tool 5: Battery Replacement Decision Tool
 */
export function evaluateBattery(inputs: BatteryAssessmentInputs): BatteryAssessmentResult {
  const { batteryAgeMonths, crankingSluggish, voltageReading } = inputs;

  let status: BatteryAssessmentResult['status'] = 'healthy';
  let headline = 'Battery is Operating Reliably';
  let description = 'Typical Indian lead-acid automotive batteries last 36 to 48 months under normal tropical usage.';
  const preventiveTips: string[] = [];

  if (voltageReading && voltageReading < 11.9) {
    status = 'replace-immediately';
    headline = '🔴 Severely Discharged / Dead Battery Cell';
    description = `Voltage reading (${voltageReading}V) indicates dead or internally sulfated cells. Vehicle may stall or fail to restart.`;
    preventiveTips.push('Avoid turning off engine in traffic until you reach a workshop or battery retailer.');
    preventiveTips.push('Exchange old battery for scrap rebate (typically ₹600-₹900 discount).');
  } else if (crankingSluggish && batteryAgeMonths >= 36) {
    status = 'replace-immediately';
    headline = '🔴 Battery Due for Replacement (Slow Cranking)';
    description = `At ${batteryAgeMonths} months with sluggish morning cranking, the battery plate active mass is depleted.`;
    preventiveTips.push('Replace with equivalent DIN/JIS capacity (Amaron Hi-Life, Exide Mileage).');
    preventiveTips.push('Ensure 55-month or 66-month warranty card with pro-rata coverage.');
  } else if (crankingSluggish || (voltageReading && voltageReading < 12.3)) {
    status = 'test-required';
    headline = '🟡 Test Required (Alternator or Charge Issue)';
    description = 'Sluggish start may be caused by parasitic draw, loose terminal clamps, or a weak alternator diode.';
    preventiveTips.push('Visit a local battery dealer for a 15-second digital load test.');
    preventiveTips.push('Check alternator charging voltage with multimeter (should be 13.8V - 14.4V with engine idling).');
  } else if (batteryAgeMonths >= 42) {
    status = 'monitor-soon';
    headline = '🟡 Battery In Overtime (>3.5 Years Old)';
    description = 'Operating normally, but approaching average end of life in hot Indian climates.';
    preventiveTips.push('Keep a pair of jumper cables in the boot.');
    preventiveTips.push('Avoid running AC blower, lights, or music system while engine is switched off.');
  } else {
    preventiveTips.push('Keep terminal posts clean and apply petroleum jelly to prevent blue/white acid corrosion.');
    preventiveTips.push('If parking idle for over 2 weeks, disconnect negative terminal.');
  }

  const estimatedMonthsLeft = Math.max(0, 48 - batteryAgeMonths);

  return {
    status,
    headline,
    description,
    estimatedMonthsLeft,
    replacementCostEstimate: 5200,
    preventiveTips,
  };
}

/**
 * Tool 6: Vehicle Comparison Engine (Dynamic Usage Slabs)
 */
export function compareVehiclesAcrossUsage(
  carA: ComparisonVehicle,
  carB: ComparisonVehicle,
  usageKmPerMonth: number,
  fuelPricePerLitre = 102
): UsageTierComparisonResult {
  const months = 60; // 5 years
  const totalKm = usageKmPerMonth * months;

  // Car A
  const carAFuelMonth = Math.round((usageKmPerMonth / carA.fuelEfficiency) * fuelPricePerLitre);
  const carAFiveYearFuel = carAFuelMonth * months;
  const carAFiveYearEMI = carA.monthlyEMI * months;
  const carAFiveYearInsurance = carA.insuranceYearly * 5;
  const carAFiveYearService = carA.serviceYearly * 5;
  const carAGrossCost = carAFiveYearEMI + carAFiveYearFuel + carAFiveYearInsurance + carAFiveYearService + carA.tyreCost5Yr;
  const carAResale = Math.round(carA.purchasePrice * (carA.resalePercentage5Yr / 100));
  const carANetCost = Math.max(0, carAGrossCost - carAResale);
  const carACostPerKm = totalKm > 0 ? Number((carANetCost / totalKm).toFixed(2)) : 0;
  const carAMonthlyTotal = Math.round(carANetCost / months);

  // Car B
  const carBFuelMonth = Math.round((usageKmPerMonth / carB.fuelEfficiency) * fuelPricePerLitre);
  const carBFiveYearFuel = carBFuelMonth * months;
  const carBFiveYearEMI = carB.monthlyEMI * months;
  const carBFiveYearInsurance = carB.insuranceYearly * 5;
  const carBFiveYearService = carB.serviceYearly * 5;
  const carBGrossCost = carBFiveYearEMI + carBFiveYearFuel + carBFiveYearInsurance + carBFiveYearService + carB.tyreCost5Yr;
  const carBResale = Math.round(carB.purchasePrice * (carB.resalePercentage5Yr / 100));
  const carBNetCost = Math.max(0, carBGrossCost - carBResale);
  const carBCostPerKm = totalKm > 0 ? Number((carBNetCost / totalKm).toFixed(2)) : 0;
  const carBMonthlyTotal = Math.round(carBNetCost / months);

  const winner = carANetCost <= carBNetCost ? 'carA' : 'carB';
  const fiveYearSavings = Math.abs(carANetCost - carBNetCost);
  const monthlySavings = Math.round(fiveYearSavings / months);

  const winnerName = winner === 'carA' ? carA.name : carB.name;
  const loserName = winner === 'carA' ? carB.name : carA.name;

  const decisionReason =
    usageKmPerMonth <= 600
      ? `At low running (${usageKmPerMonth} km/mo), upfront purchase price and EMI dominate over fuel savings. ${winnerName} wins by ₹${monthlySavings.toLocaleString('en-IN')}/month.`
      : usageKmPerMonth >= 1800
      ? `At high running (${usageKmPerMonth} km/mo), superior fuel economy offsets higher initial price. ${winnerName} saves you ₹${fiveYearSavings.toLocaleString('en-IN')} over 5 years!`
      : `At moderate running (${usageKmPerMonth} km/mo), ${winnerName} provides the optimal balance of EMI, running cost, and resale value against ${loserName}.`;

  return {
    usageKmPerMonth,
    carA: {
      monthlyFuel: carAFuelMonth,
      monthlyTotal: carAMonthlyTotal,
      fiveYearCost: carAGrossCost,
      resaleValue: carAResale,
      netFiveYearCost: carANetCost,
      costPerKm: carACostPerKm,
    },
    carB: {
      monthlyFuel: carBFuelMonth,
      monthlyTotal: carBMonthlyTotal,
      fiveYearCost: carBGrossCost,
      resaleValue: carBResale,
      netFiveYearCost: carBNetCost,
      costPerKm: carBCostPerKm,
    },
    winner,
    monthlySavings,
    fiveYearSavings,
    decisionReason,
  };
}

/**
 * Tool 7: EV vs Petrol Break-Even Engine
 */
export function calculateEvVsPetrol(inputs: EvVsPetrolInputs): EvVsPetrolResult {
  const upfrontPriceDifference = Math.max(0, inputs.evCarPrice - inputs.petrolCarPrice);

  // Monthly petrol fuel
  const monthlyPetrolLitres = inputs.petrolMileage > 0 ? inputs.monthlyKm / inputs.petrolMileage : 0;
  const monthlyPetrolFuelCost = Math.round(monthlyPetrolLitres * inputs.petrolPrice);

  // Monthly EV energy
  const monthlyKwhNeeded = inputs.evEfficiencyKmPerKwh > 0 ? inputs.monthlyKm / inputs.evEfficiencyKmPerKwh : 0;
  const homeRatio = (inputs.homeChargingPercent || 80) / 100;
  const publicRatio = 1 - homeRatio;
  const blendedTariff = homeRatio * inputs.electricityTariffPerUnit + publicRatio * inputs.publicChargingTariffPerUnit;
  const monthlyEvEnergyCost = Math.round(monthlyKwhNeeded * blendedTariff);

  const monthlyFuelSavings = Math.max(0, monthlyPetrolFuelCost - monthlyEvEnergyCost);
  const monthlyMaintenanceSavings = Math.max(
    0,
    Math.round((inputs.annualPetrolMaintenance - inputs.annualEvMaintenance) / 12)
  );

  const totalMonthlySavings = monthlyFuelSavings + monthlyMaintenanceSavings;
  const breakEvenMonths = totalMonthlySavings > 0 ? Math.round(upfrontPriceDifference / totalMonthlySavings) : 999;

  const totalMonths = (inputs.ownershipYears || 5) * 12;
  const totalSavingsGross = totalMonthlySavings * totalMonths;
  const fiveYearNetSavings = totalSavingsGross - upfrontPriceDifference;

  // CO2 savings: ~2.31 kg CO2 per litre of petrol burned
  const co2SavedKgPerYear = Math.round(monthlyPetrolLitres * 12 * 2.31 * 0.75); // Net of grid emissions

  let recommendation = '';
  if (breakEvenMonths <= 36) {
    recommendation = `🔥 High-ROI EV Match: At ${inputs.monthlyKm.toLocaleString('en-IN')} km/month, you recoup the extra ₹${(upfrontPriceDifference / 100000).toFixed(1)}L EV premium in just ${breakEvenMonths} months (~${(breakEvenMonths / 12).toFixed(1)} years). Over 5 years, you pocket ₹${fiveYearNetSavings.toLocaleString('en-IN')} in clean profit!`;
  } else if (breakEvenMonths <= 60) {
    recommendation = `✅ Viable EV Choice: You break even in ${breakEvenMonths} months (~${(breakEvenMonths / 12).toFixed(1)} years) and save ₹${fiveYearNetSavings.toLocaleString('en-IN')} over 5 years. Recommended if you have dedicated home charging.`;
  } else {
    recommendation = `⚠️ Petrol/Hybrid may be more economical: At ${inputs.monthlyKm.toLocaleString('en-IN')} km/month, it takes ${breakEvenMonths} months (~${(breakEvenMonths / 12).toFixed(1)} years) to recover the EV price premium. Consider an efficient petrol hybrid or a lower-variant EV.`;
  }

  return {
    upfrontPriceDifference,
    monthlyPetrolFuelCost,
    monthlyEvEnergyCost,
    monthlyFuelSavings,
    monthlyMaintenanceSavings,
    totalMonthlySavings,
    breakEvenMonths,
    fiveYearNetSavings,
    co2SavedKgPerYear,
    recommendation,
  };
}
