// 2025 tax-year estimator (returns filed spring 2026).
//
// Figures verified against CRA published amounts for 2025. The federal
// lowest rate is 15% Jan–Jun and 14% Jul–Dec 2025, so the full-year
// effective rate is 14.5% — CRA applies the same blended rate to most
// non-refundable credits for 2025.
//
// Sources:
//   Federal: canada.ca — Income tax rates for individuals (2025)
//   CPP/EI:  canada.ca — CPP contribution rates, EI premium rates (2025)
//   ON/BC/AB: provincial ministry of finance published 2025 brackets

export type ProvinceCode = "ON" | "BC" | "AB";

interface Bracket {
  upTo: number; // upper bound of the bracket (Infinity for the top)
  rate: number;
}

interface ProvinceData {
  name: string;
  brackets: Bracket[];
  bpa: number; // basic personal amount
  creditRate: number; // lowest bracket rate, applied to credits
}

export const FEDERAL_BRACKETS: Bracket[] = [
  { upTo: 57375, rate: 0.145 },
  { upTo: 114750, rate: 0.205 },
  { upTo: 177882, rate: 0.26 },
  { upTo: 253414, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];

// Federal BPA is $16,129, phased down to $14,538 between $177,882 and $253,414.
const FED_BPA_MAX = 16129;
const FED_BPA_MIN = 14538;
const FED_CREDIT_RATE = 0.145;

export const PROVINCES: Record<ProvinceCode, ProvinceData> = {
  ON: {
    name: "Ontario",
    brackets: [
      { upTo: 52886, rate: 0.0505 },
      { upTo: 105775, rate: 0.0915 },
      { upTo: 150000, rate: 0.1116 },
      { upTo: 220000, rate: 0.1216 },
      { upTo: Infinity, rate: 0.1316 },
    ],
    bpa: 12747,
    creditRate: 0.0505,
  },
  BC: {
    name: "British Columbia",
    brackets: [
      { upTo: 49279, rate: 0.0506 },
      { upTo: 98560, rate: 0.077 },
      { upTo: 113158, rate: 0.105 },
      { upTo: 137407, rate: 0.1229 },
      { upTo: 186306, rate: 0.147 },
      { upTo: 259829, rate: 0.168 },
      { upTo: Infinity, rate: 0.205 },
    ],
    bpa: 12932,
    creditRate: 0.0506,
  },
  AB: {
    name: "Alberta",
    brackets: [
      { upTo: 60000, rate: 0.08 },
      { upTo: 151234, rate: 0.1 },
      { upTo: 181481, rate: 0.12 },
      { upTo: 241974, rate: 0.13 },
      { upTo: 362961, rate: 0.14 },
      { upTo: Infinity, rate: 0.15 },
    ],
    bpa: 22323,
    creditRate: 0.08,
  },
};

// CPP / EI, 2025
const CPP_EXEMPTION = 3500;
const CPP_YMPE = 71300; // year's maximum pensionable earnings
const CPP_YAMPE = 81200; // additional maximum (CPP2 ceiling)
const CPP_BASE_RATE = 0.0495; // credited portion
const CPP_ENHANCED_RATE = 0.01; // deductible portion (first enhancement)
const CPP2_RATE = 0.04; // deductible, between YMPE and YAMPE
const EI_RATE = 0.0164;
const EI_MAX_INSURABLE = 65700;

// Ontario surtax (2025 thresholds) and health premium.
const ON_SURTAX_1 = 5710; // 20% of provincial tax above this
const ON_SURTAX_2 = 7307; // +36% of provincial tax above this

function ontarioHealthPremium(taxableIncome: number): number {
  const inc = taxableIncome;
  if (inc <= 20000) return 0;
  if (inc <= 36000) return Math.min(300, (inc - 20000) * 0.06);
  if (inc <= 48000) return 300 + Math.min(150, (inc - 36000) * 0.25);
  if (inc <= 72000) return 450 + Math.min(150, (inc - 48000) * 0.25);
  if (inc <= 200000) return 600 + Math.min(150, (inc - 72000) * 0.25);
  return 750 + Math.min(150, (inc - 200000) * 0.25);
}

function taxFromBrackets(income: number, brackets: Bracket[]): number {
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (income <= prev) break;
    tax += (Math.min(income, b.upTo) - prev) * b.rate;
    prev = b.upTo;
  }
  return tax;
}

function marginalRate(income: number, brackets: Bracket[]): number {
  let prev = 0;
  for (const b of brackets) {
    if (income <= b.upTo && income > prev) return b.rate;
    prev = b.upTo;
  }
  return income <= 0 ? brackets[0].rate : brackets[brackets.length - 1].rate;
}

function federalBpa(netIncome: number): number {
  if (netIncome <= 177882) return FED_BPA_MAX;
  if (netIncome >= 253414) return FED_BPA_MIN;
  const ratio = (netIncome - 177882) / (253414 - 177882);
  return FED_BPA_MAX - ratio * (FED_BPA_MAX - FED_BPA_MIN);
}

export interface TaxInput {
  employmentIncome: number;
  selfEmployedIncome: number;
  rrspDeduction: number;
  province: ProvinceCode;
}

export interface TaxResult {
  totalIncome: number;
  taxableIncome: number;
  federalTax: number;
  provincialTax: number;
  ontarioHealthPremium: number;
  cpp: number;
  ei: number;
  totalTax: number;
  afterTax: number;
  averageRate: number;
  marginalRate: number;
}

export function estimateTax(input: TaxInput): TaxResult {
  const employment = Math.max(0, input.employmentIncome);
  const selfEmployed = Math.max(0, input.selfEmployedIncome);
  const rrsp = Math.max(0, input.rrspDeduction);
  const totalIncome = employment + selfEmployed;
  const prov = PROVINCES[input.province];

  // --- CPP ---
  // Employees contribute on employment income; the self-employed pay both
  // shares on net self-employment income. Contributions are computed on
  // combined pensionable earnings up to the ceilings.
  const pensionable = Math.min(
    Math.max(0, totalIncome - CPP_EXEMPTION),
    CPP_YMPE - CPP_EXEMPTION
  );
  const pensionable2 = Math.min(
    Math.max(0, totalIncome - CPP_YMPE),
    CPP_YAMPE - CPP_YMPE
  );
  const seShare =
    totalIncome > 0 ? Math.min(1, selfEmployed / totalIncome) : 0;

  const cppBaseEmployee = pensionable * CPP_BASE_RATE;
  const cppEnhEmployee = pensionable * CPP_ENHANCED_RATE + pensionable2 * CPP2_RATE;
  // Self-employed portion is doubled (they pay the employer share too).
  const cppBase = cppBaseEmployee * (1 + seShare);
  const cppEnh = cppEnhEmployee * (1 + seShare);
  const cpp = cppBase + cppEnh;

  // --- EI --- (employees only; EI is optional for the self-employed)
  const ei = Math.min(employment, EI_MAX_INSURABLE) * EI_RATE;

  // --- Deductions ---
  // Enhanced CPP is a deduction; for the self-employed, the employer half
  // of the base contribution is also deductible.
  const cppDeduction = cppEnh + cppBaseEmployee * seShare;
  const taxableIncome = Math.max(0, totalIncome - rrsp - cppDeduction);

  // --- Federal ---
  const fedGross = taxFromBrackets(taxableIncome, FEDERAL_BRACKETS);
  const fedCredits =
    (federalBpa(taxableIncome) + cppBaseEmployee + ei) * FED_CREDIT_RATE +
    // Canada employment amount (2025: $1,471) for employees
    (employment > 0 ? Math.min(1471, employment) * FED_CREDIT_RATE : 0);
  const federalTax = Math.max(0, fedGross - fedCredits);

  // --- Provincial ---
  const provGross = taxFromBrackets(taxableIncome, prov.brackets);
  const provCredits = (prov.bpa + cppBaseEmployee + ei) * prov.creditRate;
  let provincialTax = Math.max(0, provGross - provCredits);
  let onHealth = 0;
  if (input.province === "ON") {
    const surtax =
      Math.max(0, provincialTax - ON_SURTAX_1) * 0.2 +
      Math.max(0, provincialTax - ON_SURTAX_2) * 0.36;
    provincialTax += surtax;
    onHealth = ontarioHealthPremium(taxableIncome);
  }

  const totalTax = federalTax + provincialTax + onHealth;
  const afterTax = totalIncome - totalTax - cpp - ei;

  return {
    totalIncome,
    taxableIncome,
    federalTax,
    provincialTax,
    ontarioHealthPremium: onHealth,
    cpp,
    ei,
    totalTax,
    afterTax,
    averageRate: totalIncome > 0 ? totalTax / totalIncome : 0,
    marginalRate:
      marginalRate(taxableIncome, FEDERAL_BRACKETS) +
      marginalRate(taxableIncome, prov.brackets),
  };
}

export function formatCAD(n: number): string {
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}
