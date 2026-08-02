// Express Entry Comprehensive Ranking System (CRS) calculator.
//
// Implements the IRCC CRS criteria grid. Job-offer (arranged employment)
// points were removed by IRCC on March 25, 2025 and are intentionally
// not included here.
//
// Source: ircc.canada.ca — Comprehensive Ranking System criteria

export type Education =
  | "lessThanSecondary"
  | "secondary"
  | "oneYear"
  | "twoYear"
  | "bachelors"
  | "twoOrMore"
  | "masters"
  | "doctoral";

export const EDUCATION_LABELS: Record<Education, string> = {
  lessThanSecondary: "Less than secondary school",
  secondary: "Secondary school (high school)",
  oneYear: "One-year post-secondary program",
  twoYear: "Two-year post-secondary program",
  bachelors: "Bachelor's degree (3+ year program)",
  twoOrMore: "Two or more credentials (one 3+ years)",
  masters: "Master's or professional degree",
  doctoral: "Doctoral degree (PhD)",
};

export interface CrsInput {
  age: number;
  hasSpouse: boolean;
  education: Education;
  // Canadian Language Benchmark level per first-language ability
  // (listening, reading, writing, speaking). CLB 4–10 (10 = 10+).
  firstLangClb: [number, number, number, number];
  hasSecondLang: boolean;
  secondLangClb: [number, number, number, number];
  canadianWorkYears: number; // 0–5
  foreignWorkYears: number; // 0–3+
  hasTradeCertificate: boolean;
  // Spouse factors (ignored when hasSpouse is false)
  spouseEducation: Education;
  spouseLangClb: [number, number, number, number];
  spouseCanadianWorkYears: number;
  // Additional points
  hasProvincialNomination: boolean;
  hasSiblingInCanada: boolean;
  frenchNclc7Plus: boolean;
  englishClb5Plus: boolean; // used with French bonus
  canadianEducation: "none" | "oneOrTwoYear" | "threeYearPlus";
}

export const DEFAULT_CRS_INPUT: CrsInput = {
  age: 29,
  hasSpouse: false,
  education: "bachelors",
  firstLangClb: [9, 8, 7, 7],
  hasSecondLang: false,
  secondLangClb: [4, 4, 4, 4],
  canadianWorkYears: 0,
  foreignWorkYears: 3,
  hasTradeCertificate: false,
  spouseEducation: "bachelors",
  spouseLangClb: [4, 4, 4, 4],
  spouseCanadianWorkYears: 0,
  hasProvincialNomination: false,
  hasSiblingInCanada: false,
  frenchNclc7Plus: false,
  englishClb5Plus: true,
  canadianEducation: "none",
};

const AGE_POINTS: Record<number, [number, number]> = (() => {
  // [without spouse, with spouse]
  const t: Record<number, [number, number]> = {};
  const rows: Array<[number, number, number, number]> = [
    // [ageFrom, ageTo, single, withSpouse]
    [18, 18, 99, 90],
    [19, 19, 105, 95],
    [20, 29, 110, 100],
    [30, 30, 105, 95],
    [31, 31, 99, 90],
    [32, 32, 94, 85],
    [33, 33, 88, 80],
    [34, 34, 83, 75],
    [35, 35, 77, 70],
    [36, 36, 72, 65],
    [37, 37, 66, 60],
    [38, 38, 61, 55],
    [39, 39, 55, 50],
    [40, 40, 50, 45],
    [41, 41, 39, 35],
    [42, 42, 28, 25],
    [43, 43, 17, 15],
    [44, 44, 6, 5],
  ];
  for (const [from, to, single, spouse] of rows) {
    for (let a = from; a <= to; a++) t[a] = [single, spouse];
  }
  return t;
})();

const EDU_POINTS: Record<Education, [number, number]> = {
  lessThanSecondary: [0, 0],
  secondary: [30, 28],
  oneYear: [90, 84],
  twoYear: [98, 91],
  bachelors: [120, 112],
  twoOrMore: [128, 119],
  masters: [135, 126],
  doctoral: [150, 140],
};

const SPOUSE_EDU_POINTS: Record<Education, number> = {
  lessThanSecondary: 0,
  secondary: 2,
  oneYear: 6,
  twoYear: 7,
  bachelors: 8,
  twoOrMore: 9,
  masters: 10,
  doctoral: 10,
};

function firstLangAbilityPoints(clb: number, hasSpouse: boolean): number {
  if (clb < 4) return 0;
  if (clb <= 5) return 6;
  if (clb === 6) return hasSpouse ? 8 : 9;
  if (clb === 7) return hasSpouse ? 16 : 17;
  if (clb === 8) return hasSpouse ? 22 : 23;
  if (clb === 9) return hasSpouse ? 29 : 31;
  return hasSpouse ? 32 : 34;
}

function secondLangAbilityPoints(clb: number): number {
  if (clb <= 4) return 0;
  if (clb <= 6) return 1;
  if (clb <= 8) return 3;
  return 6;
}

function spouseLangAbilityPoints(clb: number): number {
  if (clb <= 4) return 0;
  if (clb <= 6) return 1;
  if (clb <= 8) return 3;
  return 5;
}

const CDN_WORK_POINTS: Array<[number, number]> = [
  // index = years (0–5+): [single, withSpouse]
  [0, 0],
  [40, 35],
  [53, 46],
  [64, 56],
  [72, 63],
  [80, 70],
];

const SPOUSE_CDN_WORK_POINTS = [0, 5, 7, 8, 9, 10];

export interface CrsBreakdown {
  age: number;
  education: number;
  firstLanguage: number;
  secondLanguage: number;
  canadianWork: number;
  coreHumanCapital: number;
  spouseFactors: number;
  transferability: number;
  additional: number;
  total: number;
}

export function calculateCrs(input: CrsInput): CrsBreakdown {
  const s = input.hasSpouse;
  const idx = s ? 1 : 0;

  const agePts = (AGE_POINTS[Math.floor(input.age)] ?? [0, 0])[idx];
  const eduPts = EDU_POINTS[input.education][idx];

  const firstLang = input.firstLangClb.reduce(
    (sum, clb) => sum + firstLangAbilityPoints(clb, s),
    0
  );
  const secondLangRaw = input.hasSecondLang
    ? input.secondLangClb.reduce((sum, clb) => sum + secondLangAbilityPoints(clb), 0)
    : 0;
  const secondLang = Math.min(secondLangRaw, s ? 22 : 24);

  const cdnYears = Math.min(5, Math.max(0, Math.floor(input.canadianWorkYears)));
  const cdnWorkPts = CDN_WORK_POINTS[cdnYears][idx];

  const core = agePts + eduPts + firstLang + secondLang + cdnWorkPts;

  // Spouse factors (max 40)
  let spousePts = 0;
  if (s) {
    spousePts += SPOUSE_EDU_POINTS[input.spouseEducation];
    spousePts += input.spouseLangClb.reduce(
      (sum, clb) => sum + spouseLangAbilityPoints(clb),
      0
    );
    spousePts +=
      SPOUSE_CDN_WORK_POINTS[
        Math.min(5, Math.max(0, Math.floor(input.spouseCanadianWorkYears)))
      ];
    spousePts = Math.min(40, spousePts);
  }

  // Skill transferability (max 100)
  const minClb = Math.min(...input.firstLangClb);
  const clb7All = minClb >= 7;
  const clb9All = minClb >= 9;
  const eduTier =
    input.education === "lessThanSecondary" || input.education === "secondary"
      ? 0
      : input.education === "twoOrMore" ||
          input.education === "masters" ||
          input.education === "doctoral"
        ? 2
        : 1;

  let eduLang = 0;
  if (eduTier === 1) eduLang = clb9All ? 25 : clb7All ? 13 : 0;
  if (eduTier === 2) eduLang = clb9All ? 50 : clb7All ? 25 : 0;

  let eduCdnWork = 0;
  if (eduTier === 1) eduCdnWork = cdnYears >= 2 ? 25 : cdnYears >= 1 ? 13 : 0;
  if (eduTier === 2) eduCdnWork = cdnYears >= 2 ? 50 : cdnYears >= 1 ? 25 : 0;

  const eduSection = Math.min(50, eduLang + eduCdnWork);

  const fYears = Math.max(0, Math.floor(input.foreignWorkYears));
  const fTier = fYears >= 3 ? 2 : fYears >= 1 ? 1 : 0;

  let foreignLang = 0;
  if (fTier === 1) foreignLang = clb9All ? 25 : clb7All ? 13 : 0;
  if (fTier === 2) foreignLang = clb9All ? 50 : clb7All ? 25 : 0;

  let foreignCdnWork = 0;
  if (fTier === 1) foreignCdnWork = cdnYears >= 2 ? 25 : cdnYears >= 1 ? 13 : 0;
  if (fTier === 2) foreignCdnWork = cdnYears >= 2 ? 50 : cdnYears >= 1 ? 25 : 0;

  const foreignSection = Math.min(50, foreignLang + foreignCdnWork);

  let certSection = 0;
  if (input.hasTradeCertificate && minClb >= 5) {
    certSection = clb7All ? 50 : 25;
  }

  const transferability = Math.min(100, eduSection + foreignSection + certSection);

  // Additional points (max 600)
  let additional = 0;
  if (input.hasSiblingInCanada) additional += 15;
  if (input.frenchNclc7Plus) additional += input.englishClb5Plus ? 50 : 25;
  if (input.canadianEducation === "oneOrTwoYear") additional += 15;
  if (input.canadianEducation === "threeYearPlus") additional += 30;
  if (input.hasProvincialNomination) additional += 600;
  additional = Math.min(600, additional);

  const total = Math.min(1200, core + spousePts + transferability + additional);

  return {
    age: agePts,
    education: eduPts,
    firstLanguage: firstLang,
    secondLanguage: secondLang,
    canadianWork: cdnWorkPts,
    coreHumanCapital: core,
    spouseFactors: spousePts,
    transferability,
    additional,
    total,
  };
}
