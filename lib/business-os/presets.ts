import { BusinessCategoryId, BusinessPreset } from './types';

export const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: 'kirana_retail',
    title: 'Kirana & Superette Store',
    subtitle: 'Daily FMCG grocery, packaged staples, dairy, personal care',
    typicalMonthlySales: 450000,
    typicalGrossMarginPercent: 18,
    typicalNetMarginPercent: 6.5,
    defaultDailySales: {
      cashSales: 7500,
      upiSales: 9800,
      creditSales: 2200, // Monthly Udhaar khata
      productCost: 14500,
      staffDailyWages: 600,
      rentDailyAlloc: 750, // ₹22,500 / mo
      utilityDailyAlloc: 300, // Refrigerator + deep freezer power
      packagingCost: 150,
      deliveryCost: 0,
      otherExpenses: 150,
    },
    commonLeaks: [
      'Customer Udhaar write-offs (>60 days unpaid)',
      'Perishable dairy and bakery expiry spoilage',
      'High electricity from open deep freezers without night curtains',
    ],
  },
  {
    id: 'instagram_d2c',
    title: 'Instagram / WhatsApp Seller',
    subtitle: 'Apparel, artisanal jewelry, handmade gifts, kurtis',
    typicalMonthlySales: 280000,
    typicalGrossMarginPercent: 55,
    typicalNetMarginPercent: 22,
    defaultDailySales: {
      cashSales: 0,
      upiSales: 8400,
      creditSales: 0,
      productCost: 3800,
      staffDailyWages: 400,
      rentDailyAlloc: 200, // Home room setup
      utilityDailyAlloc: 100,
      packagingCost: 450, // Premium aesthetic boxes + thank you cards
      deliveryCost: 850,
      otherExpenses: 500, // Meta / Instagram ads spend
    },
    commonLeaks: [
      'Courier RTO (Return to Origin) on COD orders',
      'Meta Ad CAC exceeding gross product margin',
      'Holding dead stock of slow-moving sizes (XS / 3XL)',
    ],
  },
  {
    id: 'home_bakery',
    title: 'Home Bakery & Cloud Kitchen',
    subtitle: 'Custom cakes, brownies, meal boxes, catering tiffins',
    typicalMonthlySales: 160000,
    typicalGrossMarginPercent: 62,
    typicalNetMarginPercent: 26,
    defaultDailySales: {
      cashSales: 1200,
      upiSales: 4800,
      creditSales: 0,
      productCost: 2200, // Butter, chocolate, flour, dairy cream
      staffDailyWages: 300,
      rentDailyAlloc: 250,
      utilityDailyAlloc: 350, // OTG oven & refrigeration power
      packagingCost: 400, // Food-grade cake boxes & ribbons
      deliveryCost: 350, // Dunzo / Porter / Swiggy Genie
      otherExpenses: 200,
    },
    commonLeaks: [
      'Raw ingredient wastage (whipping cream, butter shelf life)',
      'Underpricing elaborate custom fondant cake labor hours',
      'High doorstep delivery damage during monsoon or traffic',
    ],
  },
  {
    id: 'freelancer',
    title: 'Freelancer & Creative Agency',
    subtitle: 'UI/UX design, web development, content writing, SEO marketing',
    typicalMonthlySales: 180000,
    typicalGrossMarginPercent: 88,
    typicalNetMarginPercent: 65,
    defaultDailySales: {
      cashSales: 0,
      upiSales: 6000,
      creditSales: 2000, // Invoiced milestone balance
      productCost: 300, // Software licenses, hosting, stock assets
      staffDailyWages: 0,
      rentDailyAlloc: 200,
      utilityDailyAlloc: 150, // High-speed fiber internet & power
      packagingCost: 0,
      deliveryCost: 0,
      otherExpenses: 250,
    },
    commonLeaks: [
      'Scope creep with zero additional billing',
      'Delayed milestone payments dragging into 90+ days overdue',
      'Payment gateway international currency conversion cuts (5–7%)',
    ],
  },
  {
    id: 'salon_spa',
    title: 'Beauty Salon & Grooming Parlor',
    subtitle: 'Haircuts, facials, bridal makeup, nail studio',
    typicalMonthlySales: 240000,
    typicalGrossMarginPercent: 78,
    typicalNetMarginPercent: 32,
    defaultDailySales: {
      cashSales: 3200,
      upiSales: 5400,
      creditSales: 0,
      productCost: 1400, // Professional shampoo, colors, wax, creams
      staffDailyWages: 1800, // Stylists commissions & wages
      rentDailyAlloc: 1000, // Prime commercial street rent
      utilityDailyAlloc: 500, // AC running 10 hours daily + geysers
      packagingCost: 50,
      deliveryCost: 0,
      otherExpenses: 300,
    },
    commonLeaks: [
      'Cosmetics inventory spillage and unmonitored employee usage',
      'Idle staff costs during weekday morning slow hours',
      'High AC power bills in peak summer without inverter optimization',
    ],
  },
  {
    id: 'mobile_repair',
    title: 'Mobile & Electronics Service Center',
    subtitle: 'Screen replacement, battery swap, laptop chip-level repair',
    typicalMonthlySales: 310000,
    typicalGrossMarginPercent: 42,
    typicalNetMarginPercent: 24,
    defaultDailySales: {
      cashSales: 4500,
      upiSales: 6800,
      creditSales: 1200,
      productCost: 5800, // Displays, ICs, charging ports, batteries
      staffDailyWages: 900, // Technician salary
      rentDailyAlloc: 600,
      utilityDailyAlloc: 250,
      packagingCost: 80,
      deliveryCost: 0,
      otherExpenses: 200,
    },
    commonLeaks: [
      'Defective spare parts from wholesale supplier without replacement warranty',
      'Uncollected repair devices lying in shop for >6 months',
      'Unmonitored tool and flux consumables consumption',
    ],
  },
];
