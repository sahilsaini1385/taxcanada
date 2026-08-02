// Government and non-profit programs that help newcomers, grouped by
// region. All services listed are free (most are IRCC- or
// provincially-funded). Verify links annually.

export type Region = "canada" | "ON" | "BC" | "AB";

export const REGION_LABELS: Record<Region, string> = {
  canada: "Canada-wide",
  ON: "Ontario",
  BC: "British Columbia",
  AB: "Alberta",
};

export interface Program {
  name: string;
  region: Region;
  kind: "government" | "nonprofit";
  desc: string;
  href: string;
  southAsian?: boolean; // South Asian community focus / Punjabi & Hindi services
}

export const PROGRAMS: Program[] = [
  // ---- Canada-wide ----
  {
    name: "IRCC-funded newcomer services",
    region: "canada",
    kind: "government",
    desc: "Free settlement help near you — job search support, language assessment, school enrolment, and community connections. Every PR and protected person qualifies; many services also open to temporary residents.",
    href: "https://ircc.canada.ca/english/newcomers/services/index.asp",
  },
  {
    name: "LINC — free language classes",
    region: "canada",
    kind: "government",
    desc: "Language Instruction for Newcomers to Canada: free, government-funded English (and French) classes for permanent residents, from beginner to workplace level.",
    href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/improve-english-french.html",
  },
  {
    name: "Free tax clinics (CVITP)",
    region: "canada",
    kind: "government",
    desc: "The Community Volunteer Income Tax Program files simple returns for free if your income is modest — ideal for students and first-year newcomers. Runs at libraries, temples, gurdwaras, and community centres every spring.",
    href: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html",
  },
  {
    name: "Planning for Canada",
    region: "canada",
    kind: "government",
    desc: "Free pre-arrival planning sessions (online, including from India) once you have a visa or invitation — job market prep, credential advice, and settlement planning before you land.",
    href: "https://planningforcanada.ca/",
  },
  {
    name: "Windmill Microlending",
    region: "canada",
    kind: "nonprofit",
    desc: "Low-interest loans up to $15,000 for licensing exams, credential assessments, and bridging courses — built for internationally trained professionals (doctors, nurses, engineers, accountants).",
    href: "https://windmillmicrolending.org/",
  },
  {
    name: "YMCA newcomer programs",
    region: "canada",
    kind: "nonprofit",
    desc: "Settlement workers, youth programs, and employment help at YMCAs across the country — often the easiest first door to walk through.",
    href: "https://www.ymca.ca/",
  },

  // ---- Ontario ----
  {
    name: "Indus Community Services",
    region: "ON",
    kind: "nonprofit",
    southAsian: true,
    desc: "Peel-based (Brampton/Mississauga) settlement, employment, health and seniors' services with deep South Asian roots — services in Punjabi, Hindi, Urdu, and Gujarati.",
    href: "https://induscs.ca/",
  },
  {
    name: "ACCES Employment",
    region: "ON",
    kind: "nonprofit",
    desc: "Job-search programs and sector-specific bridging (IT, finance, engineering, sales) for newcomers in the GTA — plus free pre-arrival services if you're still in India.",
    href: "https://accesemployment.ca/",
  },
  {
    name: "Achēv",
    region: "ON",
    kind: "nonprofit",
    desc: "Employment, newcomer, language, and youth services across the GTA and Peel — includes career counselling and mentorship for internationally trained professionals.",
    href: "https://achev.ca/",
  },
  {
    name: "COSTI Immigrant Services",
    region: "ON",
    kind: "nonprofit",
    desc: "One of Toronto's largest settlement agencies: housing help, employment services, language training, and family support.",
    href: "https://www.costi.org/",
  },
  {
    name: "Ontario Bridge Training",
    region: "ON",
    kind: "government",
    desc: "Provincially funded programs that fast-track internationally trained professionals (nurses, engineers, accountants, teachers) into their licensed field in Ontario.",
    href: "https://www.ontario.ca/page/bridge-training-programs",
  },
  {
    name: "Settlement.Org",
    region: "ON",
    kind: "government",
    desc: "Ontario's official newcomer information hub — housing, health cards (OHIP), schools, driving licences — in plain language, including Hindi and Punjabi resources.",
    href: "https://settlement.org/",
  },

  // ---- British Columbia ----
  {
    name: "PICS — Progressive Intercultural Community Services",
    region: "BC",
    kind: "nonprofit",
    southAsian: true,
    desc: "Surrey-based organization with strong Punjabi community roots: settlement, employment programs, seniors' care, and language services.",
    href: "https://pics.bc.ca/",
  },
  {
    name: "ISSofBC",
    region: "BC",
    kind: "nonprofit",
    desc: "Immigrant Services Society of BC — settlement, career services, and language training across Metro Vancouver, with first-landing support.",
    href: "https://issbc.org/",
  },
  {
    name: "S.U.C.C.E.S.S.",
    region: "BC",
    kind: "nonprofit",
    desc: "One of Canada's largest settlement agencies: employment help, small-business programs, housing, and health services across BC.",
    href: "https://www.successbc.ca/",
  },
  {
    name: "DIVERSEcity",
    region: "BC",
    kind: "nonprofit",
    desc: "Surrey and Delta settlement and employment services, interpretation, and community programs in 60+ languages including Punjabi and Hindi.",
    href: "https://www.dcrs.ca/",
  },
  {
    name: "WelcomeBC",
    region: "BC",
    kind: "government",
    desc: "The province's official newcomer portal — settlement service finder, BC PNP information, and credential recognition guidance.",
    href: "https://www.welcomebc.ca/",
  },

  // ---- Alberta ----
  {
    name: "Immigrant Services Calgary",
    region: "AB",
    kind: "nonprofit",
    desc: "Gateway service that assesses your family's needs and connects you to the right settlement, language, and employment programs in Calgary.",
    href: "https://www.immigrantservicescalgary.ca/",
  },
  {
    name: "Calgary Catholic Immigration Society (CCIS)",
    region: "AB",
    kind: "nonprofit",
    desc: "Settlement, employment, and family services for newcomers of all backgrounds across southern Alberta (no religious requirement).",
    href: "https://www.ccisab.ca/",
  },
  {
    name: "Centre for Newcomers",
    region: "AB",
    kind: "nonprofit",
    desc: "Calgary settlement and employment services, including career programs for internationally trained professionals and youth supports.",
    href: "https://www.centrefornewcomers.ca/",
  },
  {
    name: "Edmonton Mennonite Centre for Newcomers (EMCN)",
    region: "AB",
    kind: "nonprofit",
    desc: "Edmonton settlement agency: language training, career bridging for professionals, and family programs (open to everyone).",
    href: "https://emcn.ab.ca/",
  },
  {
    name: "IQAS — credential assessment",
    region: "AB",
    kind: "government",
    desc: "Alberta's International Qualifications Assessment Service evaluates your Indian degrees for employers, licensing bodies, and some immigration purposes.",
    href: "https://www.alberta.ca/iqas-overview",
  },
];
