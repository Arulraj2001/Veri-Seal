import { BusinessHealthScores } from './types';

export function calculateBusinessHealthScore(params: {
  netMarginPercent: number;
  runwayMonths: number;
  overdueReceivables: number;
  monthlyRevenue: number;
  marketplaceFeePercent: number;
}): BusinessHealthScores {
  // 1. Profitability Score (0 - 100, weighted 30%)
  // Net margin: 0% = 20, 10% = 60, 20% = 85, >=25% = 100
  let profitabilityScore = 50;
  if (params.netMarginPercent <= 0) {
    profitabilityScore = 15;
  } else if (params.netMarginPercent < 8) {
    profitabilityScore = 45;
  } else if (params.netMarginPercent < 15) {
    profitabilityScore = 70;
  } else if (params.netMarginPercent < 25) {
    profitabilityScore = 88;
  } else {
    profitabilityScore = 98;
  }

  // 2. Cash Runway Score (0 - 100, weighted 25%)
  // Runway: <1 mo = 10, 1-2 mos = 40, 3-6 mos = 80, >=6 mos = 100
  let cashRunwayScore = 80;
  if (params.runwayMonths < 1) {
    cashRunwayScore = 15;
  } else if (params.runwayMonths < 2) {
    cashRunwayScore = 40;
  } else if (params.runwayMonths < 4) {
    cashRunwayScore = 72;
  } else if (params.runwayMonths < 6) {
    cashRunwayScore = 88;
  } else {
    cashRunwayScore = 96;
  }

  // 3. Receivables Health (0 - 100, weighted 15%)
  // Ratio of overdue Udhaar to monthly sales
  const receivablesRatio = params.monthlyRevenue > 0 ? params.overdueReceivables / params.monthlyRevenue : 0;
  let receivablesScore = 85;
  if (receivablesRatio > 0.35) {
    receivablesScore = 30;
  } else if (receivablesRatio > 0.20) {
    receivablesScore = 55;
  } else if (receivablesRatio > 0.10) {
    receivablesScore = 75;
  } else {
    receivablesScore = 95;
  }

  // 4. Inventory Health Score (0 - 100, weighted 15%)
  const inventoryHealthScore = 78;

  // 5. Platform Independence Score (0 - 100, weighted 15%)
  // If marketplace fees > 15% of revenue, independence is low
  let platformIndependenceScore = 80;
  if (params.marketplaceFeePercent > 18) {
    platformIndependenceScore = 45;
  } else if (params.marketplaceFeePercent > 12) {
    platformIndependenceScore = 65;
  } else {
    platformIndependenceScore = 92;
  }

  // Overall Weighted Score (0–100)
  const overallScore = Math.round(
    profitabilityScore * 0.30 +
    cashRunwayScore * 0.25 +
    receivablesScore * 0.15 +
    inventoryHealthScore * 0.15 +
    platformIndependenceScore * 0.15
  );

  let gradeLabel: 'EXCELLENT' | 'GOOD' | 'NEEDS ATTENTION' | 'CRITICAL LEAK' = 'GOOD';
  if (overallScore >= 80) {
    gradeLabel = 'EXCELLENT';
  } else if (overallScore >= 65) {
    gradeLabel = 'GOOD';
  } else if (overallScore >= 45) {
    gradeLabel = 'NEEDS ATTENTION';
  } else {
    gradeLabel = 'CRITICAL LEAK';
  }

  // Dynamic "Fix These 3 Things"
  const topFixes: string[] = [];

  if (params.overdueReceivables > 15000) {
    topFixes.push(`Collect ₹${params.overdueReceivables.toLocaleString('en-IN')} in customer Udhaar balances overdue by sending polite WhatsApp reminders.`);
  }

  if (params.marketplaceFeePercent > 12) {
    topFixes.push(`Shift 20% of marketplace repeat customers to direct WhatsApp/Shopify to plug the ${params.marketplaceFeePercent}% commission leak.`);
  }

  if (params.netMarginPercent < 15) {
    topFixes.push(`Review discounting and shipping packaging: Your net margin of ${params.netMarginPercent}% leaves little safety buffer for seasonal lulls.`);
  }

  if (params.runwayMonths < 3) {
    topFixes.push(`Cash runway is under 90 days. Freeze non-essential capital purchases until liquid bank balances cover 3 months of fixed expenses.`);
  }

  // Fill default if less than 3
  if (topFixes.length < 3) {
    topFixes.push('Audit recurring supplier raw material invoices for bulk discounts or 30-day supplier credit terms.');
  }

  return {
    overallScore,
    profitabilityScore,
    cashRunwayScore,
    receivablesScore,
    inventoryHealthScore,
    platformIndependenceScore,
    gradeLabel,
    topFixes: topFixes.slice(0, 3),
  };
}
