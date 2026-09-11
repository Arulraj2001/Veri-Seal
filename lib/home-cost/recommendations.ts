import { CostBreakdownResult, HouseholdApplianceItem, IndianStateId, UpgradeRecommendation } from './types';

/**
 * AI Decision Engine that analyzes home appliance patterns and generates
 * ranked, high-ROI, non-generic upgrade and behavioral actions.
 */
export function generateHomeRecommendations(
  appliances: HouseholdApplianceItem[],
  breakdown: CostBreakdownResult,
  stateId: IndianStateId
): UpgradeRecommendation[] {
  const recommendations: UpgradeRecommendation[] = [];

  // 1. Check for Conventional Induction Fans
  const convFans = appliances.filter((a) => a.applianceId === 'ceiling_fan_conventional');
  const totalConvFansCount = convFans.reduce((acc, f) => acc + f.quantity, 0);

  if (totalConvFansCount > 0) {
    // 75W - 28W = 47W saved per fan per hour
    const avgDailyHours = 14;
    const annualUnitsSavedPerFan = Math.round((47 * avgDailyHours * 365) / 1000);
    const effectiveRate = breakdown.effectiveRatePerUnit || 7.0;
    const annualSavingPerFan = Math.round(annualUnitsSavedPerFan * effectiveRate);
    const totalAnnualSaving = annualSavingPerFan * totalConvFansCount;
    const fanCost = 2899;
    const totalInvestment = fanCost * totalConvFansCount;
    const paybackMonths = Math.round((totalInvestment / (totalAnnualSaving / 12)));

    recommendations.push({
      id: 'upgrade_bldc_fans',
      title: `Switch ${totalConvFansCount} Conventional Fan(s) to 28W Smart BLDC Motors`,
      category: 'Cooling & Ventilation',
      impactLabel: 'HIGH IMPACT',
      description: `Your ${totalConvFansCount} standard 75W ceiling fan(s) consume ~${Math.round(totalConvFansCount * 75 * avgDailyHours * 30 / 1000)} units/mo. Modern BLDC fans cut consumption by 63% with zero hum and run 3x longer on home inverter.`,
      estimatedInvestment: totalInvestment,
      monthlySaving: Math.round(totalAnnualSaving / 12),
      annualSaving: totalAnnualSaving,
      paybackMonths,
      fiveYearNetProfit: (totalAnnualSaving * 5) - totalInvestment,
      affiliateCtaText: 'View Top Rated BLDC Fans on Amazon',
      affiliateSearchQuery: 'bldc ceiling fan 28w 5 star atomberg crompton',
      actionType: 'buy',
    });
  }

  // 2. Check for Air Conditioner Optimization
  const acItems = appliances.filter((a) => a.category === 'cooling' && a.applianceId.includes('ac'));
  const totalAcUnitsMonthly = breakdown.applianceBreakdown
    .filter((a) => a.applianceId.includes('ac'))
    .reduce((sum, a) => sum + a.units, 0);

  if (acItems.length > 0 && totalAcUnitsMonthly > 80) {
    const effectiveRate = breakdown.effectiveRatePerUnit || 7.0;
    // 2°C higher thermostat setting saves ~12% AC electricity
    const monthlySavingUnits = Math.round(totalAcUnitsMonthly * 0.12);
    const monthlySavingInr = Math.round(monthlySavingUnits * effectiveRate);
    const annualSavingInr = monthlySavingInr * 8; // assuming 8 active cooling months

    recommendations.push({
      id: 'tune_ac_thermostat_24c',
      title: 'Set AC Thermostat to 24°C or 25°C with Ceiling Fan on Low',
      category: 'Air Conditioning',
      impactLabel: 'LOW HANGING FRUIT',
      description: `BEE studies prove that every 1°C increase in AC temperature reduces power by ~6%. Running AC at 24°C instead of 20°C with a gentle fan provides identical thermal comfort while slashing AC load by ~18%–24%.`,
      estimatedInvestment: 0,
      monthlySaving: monthlySavingInr,
      annualSaving: annualSavingInr,
      paybackMonths: 0,
      fiveYearNetProfit: annualSavingInr * 5,
      affiliateCtaText: 'Check Smart AC WiFi Controllers',
      affiliateSearchQuery: 'smart ac controller wifi sensibo cielo',
      actionType: 'behavior',
    });
  }

  // 3. Check for Old Inefficient Refrigerator
  const oldFridge = appliances.find((a) => a.applianceId === 'refrigerator_old');
  if (oldFridge) {
    const effectiveRate = breakdown.effectiveRatePerUnit || 7.0;
    // Old fridge (~1.6 kWh/day) vs 5-Star Smart Inverter (~0.6 kWh/day) saves 1.0 kWh/day = 365 units/yr
    const annualSavingUnits = 365;
    const annualSavingInr = Math.round(annualSavingUnits * effectiveRate);
    const newFridgeCost = 27990;
    const paybackMonths = Math.round((newFridgeCost / (annualSavingInr / 12)));

    recommendations.push({
      id: 'replace_old_fridge',
      title: 'Replace >8-Year-Old Refrigerator with 5-Star Smart Inverter Model',
      category: 'Kitchen & Refrigeration',
      impactLabel: 'HIGH IMPACT',
      description: 'Older non-inverter compressors suffer mechanical wear and degraded door gaskets, running almost continuously. A new 5-Star Smart Inverter fridge uses brushless DC technology and saves ~30 units every single month.',
      estimatedInvestment: newFridgeCost,
      monthlySaving: Math.round(annualSavingInr / 12),
      annualSaving: annualSavingInr,
      paybackMonths,
      fiveYearNetProfit: (annualSavingInr * 5) - newFridgeCost,
      affiliateCtaText: 'View 5-Star Inverter Refrigerators',
      affiliateSearchQuery: '5 star double door inverter refrigerator samsung lg',
      actionType: 'buy',
    });
  }

  // 4. Check for Rooftop Solar Suitability (>250 monthly units)
  if (breakdown.monthlyUnits >= 220) {
    const recommendedKw = breakdown.monthlyUnits >= 450 ? 3 : 2;
    const centralSubsidy = recommendedKw === 3 ? 78000 : 60000;
    const grossCost = recommendedKw * 65000;
    const netCost = grossCost - centralSubsidy;
    const annualSolarUnits = recommendedKw * 125 * 12;
    const effectiveRate = breakdown.effectiveRatePerUnit || 7.5;
    const annualSolarSavings = Math.round(annualSolarUnits * effectiveRate);
    const paybackMonths = Math.round((netCost / (annualSolarSavings / 12)));

    recommendations.push({
      id: 'install_pm_surya_solar',
      title: `Install ${recommendedKw} kW Rooftop Solar under PM Surya Ghar Muft Bijli Yojana`,
      category: 'Renewable Power',
      impactLabel: 'HIGH IMPACT',
      description: `Your monthly usage of ${breakdown.monthlyUnits} units puts you into higher billing slabs. Under the PM Surya Ghar scheme, the Central Government provides ₹${centralSubsidy.toLocaleString('en-IN')} direct DBT subsidy. Your net investment is ₹${netCost.toLocaleString('en-IN')} with break-even in ~${(paybackMonths / 12).toFixed(1)} years!`,
      estimatedInvestment: netCost,
      monthlySaving: Math.round(annualSolarSavings / 12),
      annualSaving: annualSolarSavings,
      paybackMonths,
      fiveYearNetProfit: (annualSolarSavings * 5) - netCost,
      affiliateCtaText: 'Find Verified Solar Installers in Your Pincode',
      affiliateSearchQuery: 'rooftop solar panel installation tata power luminous',
      actionType: 'buy',
    });
  }

  // 5. Electric Geyser to Solar Water Heater
  const geyserItem = appliances.find((a) => a.category === 'heating' && a.applianceId.includes('geyser'));
  if (geyserItem) {
    const effectiveRate = breakdown.effectiveRatePerUnit || 7.0;
    const annualGeyserUnits = Math.round(geyserItem.wattage * geyserItem.dailyHours * 365 / 1000);
    const annualSavingInr = Math.round(annualGeyserUnits * 0.85 * effectiveRate);
    const solarHeaterPrice = 24000;
    const paybackMonths = Math.round((solarHeaterPrice / (annualSavingInr / 12)));

    recommendations.push({
      id: 'switch_solar_water_heater',
      title: 'Switch High-Wattage Electric Geyser to Rooftop Solar Water Heater',
      category: 'Water Heating',
      impactLabel: 'MEDIUM IMPACT',
      description: 'Electric geysers are 2000W–3000W monsters that rapidly spike peak morning demand. A 150 LPD ETC solar water heater delivers piping hot water for 300+ days a year using zero grid electricity.',
      estimatedInvestment: solarHeaterPrice,
      monthlySaving: Math.round(annualSavingInr / 12),
      annualSaving: annualSavingInr,
      paybackMonths,
      fiveYearNetProfit: (annualSavingInr * 5) - solarHeaterPrice,
      affiliateCtaText: 'Explore Solar Water Heaters',
      affiliateSearchQuery: 'solar water heater 150 lpd racold supreme',
      actionType: 'buy',
    });
  }

  return recommendations;
}
