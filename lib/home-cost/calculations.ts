import {
  ApplianceCategory,
  CostBreakdownResult,
  HouseholdApplianceItem,
  IndianStateId,
  WhatIfSimulationAdjustments,
} from './types';
import { calculateStateBill, INDIAN_STATE_TARIFFS } from './tariffs';
import { APPLIANCES_DATABASE } from './appliances-db';

const CATEGORY_COLORS: Record<ApplianceCategory, string> = {
  cooling: '#0284C7', // Sky Blue
  heating: '#EA580C', // Amber Orange
  kitchen: '#16A34A', // Emerald Green
  lighting: '#EAB308', // Yellow
  entertainment: '#8B5CF6', // Purple
  cleaning: '#06B6D4', // Cyan
  general: '#64748B', // Slate
};

const CATEGORY_LABELS: Record<ApplianceCategory, string> = {
  cooling: 'Cooling & AC',
  heating: 'Water Heating & Geysers',
  kitchen: 'Kitchen & Refrigeration',
  lighting: 'Lighting',
  entertainment: 'TV, PC & Entertainment',
  cleaning: 'Washing & Cleaning',
  general: 'Pumps & Baseline Standby',
};

/**
 * Calculates complete household electricity cost breakdown.
 */
export function calculateHouseholdBill(
  appliances: HouseholdApplianceItem[],
  stateId: IndianStateId = 'all_india',
  sanctionedLoadKw: number = 3
): CostBreakdownResult {
  let totalMonthlyUnits = 0;

  // 1. Calculate per-appliance monthly consumption
  const applianceUsage = appliances.map((item) => {
    const days = item.daysPerMonth ?? 30;
    const dailyKwh = (item.wattage * item.quantity * item.dailyHours) / 1000.0;
    const monthlyUnits = Math.round(dailyKwh * days * 10) / 10;
    totalMonthlyUnits += monthlyUnits;

    const def = APPLIANCES_DATABASE.find((a) => a.id === item.applianceId);
    const displayName = item.customName || def?.name || 'Custom Appliance';

    return {
      applianceId: item.applianceId,
      name: displayName,
      category: item.category,
      units: monthlyUnits,
      cost: 0, // calculated once effective bill is known
      percentage: 0,
    };
  });

  const roundedTotalUnits = Math.round(totalMonthlyUnits);
  const billCalc = calculateStateBill(roundedTotalUnits, stateId, sanctionedLoadKw);

  // 2. Allocate bill proportionally to appliances
  const effectiveRate = billCalc.effectiveRatePerUnit > 0 ? billCalc.effectiveRatePerUnit : 7.0;
  const applianceBreakdown = applianceUsage.map((a) => {
    const cost = Math.round(a.units * effectiveRate);
    const percentage = roundedTotalUnits > 0 ? Number(((a.units / roundedTotalUnits) * 100).toFixed(1)) : 0;
    return {
      ...a,
      cost,
      percentage,
    };
  }).sort((a, b) => b.units - a.units);

  // 3. Category aggregation
  const catMap = new Map<ApplianceCategory, { units: number; cost: number }>();
  for (const item of applianceBreakdown) {
    const prev = catMap.get(item.category) || { units: 0, cost: 0 };
    catMap.set(item.category, {
      units: prev.units + item.units,
      cost: prev.cost + item.cost,
    });
  }

  const categoryBreakdown = Array.from(catMap.entries()).map(([category, vals]) => {
    return {
      category,
      label: CATEGORY_LABELS[category] || category,
      units: Math.round(vals.units * 10) / 10,
      cost: vals.cost,
      percentage: roundedTotalUnits > 0 ? Number(((vals.units / roundedTotalUnits) * 100).toFixed(1)) : 0,
      color: CATEGORY_COLORS[category] || '#64748B',
    };
  }).sort((a, b) => b.cost - a.cost);

  return {
    monthlyUnits: roundedTotalUnits,
    monthlyBill: billCalc.totalBill,
    annualBill: billCalc.totalBill * 12,
    effectiveRatePerUnit: billCalc.effectiveRatePerUnit,
    fixedCharges: billCalc.fixedCharges,
    energyCharges: billCalc.energyCharges,
    applianceBreakdown,
    categoryBreakdown,
  };
}

/**
 * Simulates What-If scenario savings.
 */
export function simulateWhatIfSavings(
  appliances: HouseholdApplianceItem[],
  stateId: IndianStateId,
  adj: WhatIfSimulationAdjustments
): {
  baselineUnits: number;
  baselineBill: number;
  simulatedUnits: number;
  simulatedBill: number;
  monthlySavings: number;
  annualSavings: number;
  savingsHighlights: string[];
} {
  const baseline = calculateHouseholdBill(appliances, stateId);

  // Deep clone appliances for simulation
  const simulatedAppliances = appliances.map((item) => ({ ...item }));
  const highlights: string[] = [];

  // 1. AC adjustments (reduced hours & increased set temperature)
  if (adj.acHoursReduction > 0 || adj.acTempIncreaseDegrees > 0) {
    simulatedAppliances.forEach((item) => {
      if (item.category === 'cooling' && item.applianceId.includes('ac')) {
        if (adj.acHoursReduction > 0) {
          item.dailyHours = Math.max(0, item.dailyHours - adj.acHoursReduction);
        }
        // Every 1°C temp increase saves 6% power
        if (adj.acTempIncreaseDegrees > 0) {
          const tempSavingsFactor = 1.0 - (adj.acTempIncreaseDegrees * 0.06);
          item.wattage = Math.round(item.wattage * Math.max(0.7, tempSavingsFactor));
        }
      }
    });

    if (adj.acHoursReduction > 0) {
      highlights.push(`Reduced AC usage by ${adj.acHoursReduction} hrs/day`);
    }
    if (adj.acTempIncreaseDegrees > 0) {
      highlights.push(`Set AC temperature +${adj.acTempIncreaseDegrees}°C higher (saved ~${adj.acTempIncreaseDegrees * 6}%)`);
    }
  }

  // 2. BLDC Fans
  if (adj.fansSwitchedToBldc > 0) {
    let converted = 0;
    simulatedAppliances.forEach((item) => {
      if (item.applianceId === 'ceiling_fan_conventional' && converted < adj.fansSwitchedToBldc) {
        item.wattage = 28; // BLDC wattage
        item.applianceId = 'ceiling_fan_bldc';
        converted += item.quantity;
      }
    });
    highlights.push(`Switched ${adj.fansSwitchedToBldc} conventional fan(s) to 28W BLDC`);
  }

  // 3. Fridge replacement
  if (adj.fridgeReplacedTo5Star) {
    simulatedAppliances.forEach((item) => {
      if (item.applianceId === 'refrigerator_old') {
        item.wattage = 75; // 5-Star Smart Inverter
        item.applianceId = 'refrigerator_frost_free';
      }
    });
    highlights.push('Upgraded older refrigerator to 5-Star Smart Inverter (75W)');
  }

  // 4. Geyser to Solar
  if (adj.geyserSwitchedToSolar) {
    simulatedAppliances.forEach((item) => {
      if (item.category === 'heating' && item.applianceId.includes('geyser')) {
        item.dailyHours = 0.2; // 85% reduction in electric geyser runtime
      }
    });
    highlights.push('Installed Rooftop Solar Water Heater (85% electric water heating eliminated)');
  }

  // Calculate simulated bill before solar credit
  let simulated = calculateHouseholdBill(simulatedAppliances, stateId);
  let finalSimUnits = simulated.monthlyUnits;

  // 5. Rooftop Solar generation offset
  if (adj.solarCapacityKw > 0) {
    const solarGenMonthly = Math.round(adj.solarCapacityKw * 125); // ~125 units/month per kW
    finalSimUnits = Math.max(0, finalSimUnits - solarGenMonthly);
    highlights.push(`${adj.solarCapacityKw} kW Solar generates ~${solarGenMonthly} clean units/month`);
  }

  const finalSimBillResult = calculateStateBill(finalSimUnits, stateId);
  const finalSimBill = finalSimBillResult.totalBill;

  const monthlySavings = Math.max(0, baseline.monthlyBill - finalSimBill);
  const annualSavings = monthlySavings * 12;

  return {
    baselineUnits: baseline.monthlyUnits,
    baselineBill: baseline.monthlyBill,
    simulatedUnits: finalSimUnits,
    simulatedBill: finalSimBill,
    monthlySavings,
    annualSavings,
    savingsHighlights: highlights,
  };
}

/**
 * AC Cost & Star Rating Comparison Calculator.
 */
export function calculateAcDetailedCost(params: {
  tonnage: 1.0 | 1.5 | 2.0;
  isInverter: boolean;
  starRating: 3 | 5;
  roomSizeSqFt: number;
  setTemperature: number; // e.g. 24
  ambientTemperature: number; // e.g. 38
  hoursPerDay: number;
  monthsActivePerYear: number;
  tariffPerUnit: number;
}) {
  // Baseline cooling capacity in watts
  const baseCoolingW = params.tonnage * 3517;

  // ISEER efficiency estimation
  let iseer = 3.8; // 3-star
  if (params.starRating === 5) iseer = 5.2;
  if (!params.isInverter) iseer = params.starRating === 3 ? 3.1 : 3.6;

  // Base power consumption
  let avgWattage = baseCoolingW / iseer;

  // Temperature coefficient: 24°C is baseline. +6% per degree lower than 24, -6% per degree above 24.
  const tempDelta = 24 - params.setTemperature;
  const tempFactor = 1.0 + (tempDelta * 0.06);

  // Ambient heat load (above 35°C compressor works 15% harder)
  const ambientFactor = params.ambientTemperature > 35 ? 1.0 + ((params.ambientTemperature - 35) * 0.02) : 1.0;

  const effectiveWattage = Math.round(avgWattage * tempFactor * ambientFactor);

  const dailyUnits = Number(((effectiveWattage * params.hoursPerDay) / 1000).toFixed(2));
  const monthlyUnits = Math.round(dailyUnits * 30);
  const annualUnits = Math.round(dailyUnits * 30 * params.monthsActivePerYear);

  const monthlyCost = Math.round(monthlyUnits * params.tariffPerUnit);
  const annualCost = Math.round(annualUnits * params.tariffPerUnit);

  // Comparison: 3-Star vs 5-Star Inverter
  const iseer3Star = 3.8;
  const iseer5Star = 5.2;
  const annualUnits3Star = Math.round(((baseCoolingW / iseer3Star) * tempFactor * ambientFactor * params.hoursPerDay * 30 * params.monthsActivePerYear) / 1000);
  const annualUnits5Star = Math.round(((baseCoolingW / iseer5Star) * tempFactor * ambientFactor * params.hoursPerDay * 30 * params.monthsActivePerYear) / 1000);

  const annualCost3Star = Math.round(annualUnits3Star * params.tariffPerUnit);
  const annualCost5Star = Math.round(annualUnits5Star * params.tariffPerUnit);
  const annualSavingWith5Star = Math.max(0, annualCost3Star - annualCost5Star);

  const pricePremium5Star = 8000; // Typical ₹8k difference between 3-star and 5-star AC
  const paybackYears = annualSavingWith5Star > 0 ? Number((pricePremium5Star / annualSavingWith5Star).toFixed(1)) : 99;

  return {
    effectiveWattage,
    dailyUnits,
    monthlyUnits,
    annualUnits,
    monthlyCost,
    annualCost,
    comparison: {
      annualCost3Star,
      annualCost5Star,
      annualSavingWith5Star,
      pricePremium5Star,
      paybackYears,
    },
  };
}

/**
 * Solar Rooftop Sizing & PM Surya Ghar Subsidy Calculator.
 */
export function calculateSolarEconomics(params: {
  monthlyUnits: number;
  monthlyBill: number;
  roofAreaSqFt: number;
  tariffPerUnit: number;
  desiredOffsetPercent: number; // 50 - 100
}) {
  // Required monthly generation
  const targetMonthlyUnits = (params.monthlyUnits * params.desiredOffsetPercent) / 100;

  // 1 kWp solar generates ~125 units/month in India
  const rawKwNeeded = targetMonthlyUnits / 125.0;

  // Check roof area limitation: ~90-100 sq ft per 1 kW
  const maxKwByRoof = Math.floor(params.roofAreaSqFt / 90.0);
  const recommendedKw = Math.max(1, Math.min(Math.round(rawKwNeeded * 2) / 2, Math.max(1, maxKwByRoof)));

  const monthlyGeneration = Math.round(recommendedKw * 125);
  const annualGeneration = monthlyGeneration * 12;

  // Gross market price: approx ₹60,000 to ₹70,000 per kW in India
  const grossCost = recommendedKw * 65000;

  // PM Surya Ghar Muft Bijli Yojana Central Government Subsidy:
  // 1 kW: ₹30,000 | 2 kW: ₹60,000 | 3 kW and above: ₹78,000 cap
  let centralSubsidy = 0;
  if (recommendedKw >= 3) {
    centralSubsidy = 78000;
  } else if (recommendedKw >= 2) {
    centralSubsidy = 60000;
  } else if (recommendedKw >= 1) {
    centralSubsidy = 30000;
  }

  const netCost = Math.max(0, grossCost - centralSubsidy);
  const annualSavings = Math.round(annualGeneration * params.tariffPerUnit);
  const paybackYears = annualSavings > 0 ? Number((netCost / annualSavings).toFixed(1)) : 0;
  const lifetime25YearSavings = Math.round((annualSavings * 25) - netCost);

  return {
    recommendedKw,
    monthlyGeneration,
    annualGeneration,
    grossCost,
    centralSubsidy,
    netCost,
    annualSavings,
    paybackYears,
    lifetime25YearSavings,
    panelsCount: Math.ceil((recommendedKw * 1000) / 540), // 540W Mono PERC panels
    roofRequiredSqFt: Math.round(recommendedKw * 90),
  };
}

/**
 * Inverter & Battery Sizing Calculator.
 */
export function calculateInverterAndBattery(params: {
  fansCount: number;
  lightsCount: number;
  tvsCount: number;
  wifiCount: number;
  fridgeIncluded: boolean;
  acIncluded: boolean;
  requiredBackupHours: number; // 2 - 10
  batteryType: 'tubular' | 'lithium';
}) {
  // Connected load summation
  let totalWatts =
    params.fansCount * 75 +
    params.lightsCount * 15 +
    params.tvsCount * 95 +
    params.wifiCount * 12;

  if (params.fridgeIncluded) totalWatts += 120;
  if (params.acIncluded) totalWatts += 1100;

  // Safety buffer (25% surge headroom)
  const inverterCapacityVa = Math.round((totalWatts / 0.8) * 1.25);
  const recommendedKva = (inverterCapacityVa / 1000).toFixed(1);

  // Battery sizing: (Watts * Hours) / (Volts * Efficiency * DoD)
  const systemVoltage = inverterCapacityVa > 1500 ? 24 : 12;
  const dod = params.batteryType === 'lithium' ? 0.9 : 0.75;
  const efficiency = 0.85;

  const totalWattHoursNeeded = totalWatts * params.requiredBackupHours;
  const requiredAh = Math.round(totalWattHoursNeeded / (systemVoltage * efficiency * dod));

  // Closest standard battery pack
  let recommendedBatteryAh = 150;
  if (requiredAh > 200) recommendedBatteryAh = 200;
  if (requiredAh > 260) recommendedBatteryAh = 150; // Dual 150Ah at 24V

  const batteryCount = systemVoltage === 24 ? 2 : 1;

  return {
    totalWatts,
    inverterCapacityVa,
    recommendedKva,
    systemVoltage,
    requiredAh,
    recommendedBatteryAh,
    batteryCount,
    runtimeHours: params.requiredBackupHours,
  };
}

/**
 * Water Tank Capacity Sizing (IS 1172 standards).
 */
export function calculateWaterTank(params: {
  familyMembers: number;
  bathrooms: number;
  bufferDays: number;
  hasGardenOrCars: boolean;
}) {
  // IS 1172 benchmark: 135 Litres Per Capita per Day (LPCD)
  let dailyLpcd = 135;
  if (params.hasGardenOrCars) dailyLpcd += 40;

  const dailyHouseholdLitres = params.familyMembers * dailyLpcd;
  const requiredBufferLitres = dailyHouseholdLitres * params.bufferDays;

  // Standard overhead tank sizing (rounded to 500, 750, 1000, 1500, 2000 L)
  const overheadOptions = [500, 750, 1000, 1500, 2000, 3000];
  const recommendedOverhead = overheadOptions.find((cap) => cap >= dailyHouseholdLitres) || 3000;

  // Underground sump requirement: typically 1.5x to 2x overhead
  const recommendedSump = Math.round((dailyHouseholdLitres * Math.max(1.5, params.bufferDays)) / 500) * 500;

  return {
    dailyHouseholdLitres,
    recommendedOverhead,
    recommendedSump,
    bufferDays: params.bufferDays,
    dailyLpcd,
  };
}

/**
 * 3-Way Geyser Cost Comparison: Electric vs Gas vs Solar.
 */
export function calculateGeyserComparison(params: {
  familyMembers: number;
  bathsPerDay: number;
  electricityTariff: number;
  lpgCylinderPrice: number; // ₹850
}) {
  // 25L of hot water per bath (heated from 18°C to 45°C -> delta 27°C)
  // Energy required per bath = (25 kg * 4.184 kJ/kg*C * 27) / 3600 = ~0.78 kWh
  const totalBathsPerDay = params.familyMembers * params.bathsPerDay;
  const dailyKwhElectric = totalBathsPerDay * 0.9; // 90% heating efficiency
  const annualUnitsElectric = Math.round(dailyKwhElectric * 365);
  const annualCostElectric = Math.round(annualUnitsElectric * params.electricityTariff);

  // Gas geyser (65% thermal efficiency)
  // 1 LPG cylinder (14.2 kg) = ~160 kWh equivalent useful heat
  const annualLpgCylinders = Number(((annualUnitsElectric * 0.9) / 160).toFixed(1));
  const annualCostGas = Math.round(annualLpgCylinders * params.lpgCylinderPrice);

  // Solar water heater (150-200 LPD system):
  // 300 sunny days free, 65 winter cloudy days electric backup (~15% electrical use)
  const annualCostSolar = Math.round(annualCostElectric * 0.15);
  const annualSavingsSolar = annualCostElectric - annualCostSolar;
  const solarSystemPrice = 28000;
  const solarPaybackYears = Number((solarSystemPrice / annualSavingsSolar).toFixed(1));

  return {
    annualCostElectric,
    annualCostGas,
    annualCostSolar,
    annualSavingsSolar,
    solarPaybackYears,
  };
}

/**
 * LPG Cylinder vs Induction Cooking Comparison.
 */
export function calculateLpgVsInduction(params: {
  hoursCookingPerDay: number;
  lpgPrice: number; // e.g. 850
  electricityTariff: number; // e.g. 7.5
}) {
  // 14.2 kg cylinder lasts approx 30 days for 1.8 hrs daily cooking -> ~54 hours cooking per cylinder
  const hoursPerCylinder = 54;
  const cylindersPerMonth = Number(((params.hoursCookingPerDay * 30) / hoursPerCylinder).toFixed(2));
  const monthlyLpgCost = Math.round(cylindersPerMonth * params.lpgPrice);

  // Induction cooktop at 1400W consumes 1.4 units per hour
  const monthlyInductionUnits = Math.round(params.hoursCookingPerDay * 1.4 * 30);
  const monthlyInductionCost = Math.round(monthlyInductionUnits * params.electricityTariff);

  const monthlyDifference = monthlyLpgCost - monthlyInductionCost;
  const annualDifference = monthlyDifference * 12;

  return {
    monthlyLpgCost,
    monthlyInductionCost,
    monthlyDifference,
    annualDifference,
    cylindersPerMonth,
    monthlyInductionUnits,
  };
}

/**
 * Wall Painting & Floor Tiling Material Estimator.
 */
export function calculateRenovationEstimate(params: {
  roomLengthFt: number;
  roomWidthFt: number;
  roomHeightFt: number;
  coats: 2 | 3;
  paintType: 'tractor_emulsion' | 'premium_acrylic' | 'royale_luxury';
  tileLengthFt: number;
  tileWidthFt: number;
}) {
  const floorAreaSqFt = params.roomLengthFt * params.roomWidthFt;
  const perimeter = 2 * (params.roomLengthFt + params.roomWidthFt);
  // Wall area minus 1 door (21 sq ft) and 1 window (16 sq ft)
  const wallAreaSqFt = Math.max(0, (perimeter * params.roomHeightFt) - 37);

  // Paint coverage: approx 120-140 sq ft per litre for 2 coats
  const coveragePerLitre = params.coats === 3 ? 85 : 125;
  const paintLitres = Math.ceil(wallAreaSqFt / coveragePerLitre);

  const paintPrices = {
    tractor_emulsion: 160,
    premium_acrylic: 320,
    royale_luxury: 580,
  };
  const paintCost = paintLitres * paintPrices[params.paintType];
  const paintingLabor = Math.round(wallAreaSqFt * 14); // ~₹14/sq ft labor

  // Tiles:
  const tileAreaEach = params.tileLengthFt * params.tileWidthFt;
  const tilesWithoutWastage = floorAreaSqFt / tileAreaEach;
  const totalTilesWith10PctWastage = Math.ceil(tilesWithoutWastage * 1.1);
  const tileCost = Math.round(floorAreaSqFt * 55); // ~₹55/sq ft vitrified tile
  const tileLabor = Math.round(floorAreaSqFt * 28); // ~₹28/sq ft tile laying labor

  return {
    floorAreaSqFt,
    wallAreaSqFt,
    paintLitres,
    paintCost,
    paintingLabor,
    totalPaintingCost: paintCost + paintingLabor,
    totalTilesWith10PctWastage,
    tileCost,
    tileLabor,
    totalTilingCost: tileCost + tileLabor,
    grandTotal: paintCost + paintingLabor + tileCost + tileLabor,
  };
}

/**
 * 10-Year Indian Rent vs Buy Financial Decision Model.
 */
export function calculateRentVsBuy(params: {
  monthlyRent: number;
  propertyPrice: number;
  downPaymentPercent: number; // e.g. 20
  homeLoanInterestPercent: number; // e.g. 8.5
  loanTenureYears: number; // e.g. 20
  propertyAppreciationPercent: number; // e.g. 5.5
  rentInflationPercent: number; // e.g. 5.0
  investmentReturnPercent: number; // e.g. 12.0 (Mutual funds)
}) {
  const downPayment = (params.propertyPrice * params.downPaymentPercent) / 100;
  const loanAmount = params.propertyPrice - downPayment;
  const monthlyInterestRate = params.homeLoanInterestPercent / 12 / 100;
  const totalMonths = params.loanTenureYears * 12;

  // EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
  const emi = Math.round(
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
  );

  // 10-Year Simulation (120 months)
  let rentAccumulated = 0;
  let currentRent = params.monthlyRent;
  let investmentPortfolio = downPayment; // if renting, down payment is invested in equity

  for (let year = 1; year <= 10; year++) {
    rentAccumulated += currentRent * 12;
    // Difference between EMI and rent is also invested monthly
    const monthlyDifference = Math.max(0, emi - currentRent);
    investmentPortfolio = (investmentPortfolio + (monthlyDifference * 12)) * (1 + (params.investmentReturnPercent / 100));
    currentRent = currentRent * (1 + (params.rentInflationPercent / 100));
  }

  // Value of home after 10 years
  const propertyValue10Years = Math.round(
    params.propertyPrice * Math.pow(1 + (params.propertyAppreciationPercent / 100), 10)
  );

  // Remaining principal after 10 years
  let remainingPrincipal = loanAmount;
  for (let m = 1; m <= 120; m++) {
    const interest = remainingPrincipal * monthlyInterestRate;
    const principalPaid = emi - interest;
    remainingPrincipal -= principalPaid;
  }
  const buyerNetWorth = propertyValue10Years - Math.max(0, remainingPrincipal);
  const renterNetWorth = Math.round(investmentPortfolio);

  return {
    emi,
    downPayment,
    loanAmount,
    propertyValue10Years,
    buyerNetWorth,
    renterNetWorth,
    netDifference: Math.abs(buyerNetWorth - renterNetWorth),
    recommendation: buyerNetWorth > renterNetWorth ? 'Buying Builds More Wealth' : 'Renting + SIP Investing Outperforms',
  };
}
