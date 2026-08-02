"use client";

import { useCallback, useEffect, useState } from "react";

// Profile data lives in the browser (localStorage) by design: no server
// database means nothing sensitive ever leaves the user's device. Signing
// in with Google only attaches a display identity — it does not upload
// the profile anywhere.

export type ImmigrationStatus =
  | "planning"
  | "student"
  | "worker"
  | "pr"
  | "citizen";

export const STATUS_LABELS: Record<ImmigrationStatus, string> = {
  planning: "Planning to move to Canada",
  student: "In Canada on a study permit",
  worker: "In Canada on a work permit",
  pr: "Permanent resident",
  citizen: "Canadian citizen",
};

export interface UserProfile {
  status: ImmigrationStatus | null;
  province: "ON" | "BC" | "AB" | "OTHER" | null;
  arrivalYear: number | null;
  hasBusiness: boolean;
  hasForeignAssets: boolean; // assets outside Canada > $100k CAD
  sendsMoneyToIndia: boolean;
  completedTasks: string[];
}

export const EMPTY_PROFILE: UserProfile = {
  status: null,
  province: null,
  arrivalYear: null,
  hasBusiness: false,
  hasForeignAssets: false,
  sendsMoneyToIndia: false,
  completedTasks: [],
};

const STORAGE_KEY = "apnacanada.profile.v1";

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROFILE;
    return { ...EMPTY_PROFILE, ...JSON.parse(raw) };
  } catch {
    return EMPTY_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Storage unavailable (private browsing etc.) — profile stays in memory.
  }
}

export function clearProfile(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setLoaded(true);
  }, []);

  const update = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      saveProfile(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearProfile();
    setProfile(EMPTY_PROFILE);
  }, []);

  return { profile, update, reset, loaded };
}

export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
  href?: string;
}

// Personalized to-do list derived from the profile answers.
export function buildChecklist(p: UserProfile): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  if (p.status === "planning") {
    items.push(
      {
        id: "crs",
        title: "Check your Express Entry CRS score",
        detail:
          "See where you stand before spending money on language tests or consultants.",
        href: "/immigration/crs-calculator",
      },
      {
        id: "pathways",
        title: "Compare immigration pathways",
        detail:
          "Express Entry, Provincial Nominee Programs, and study routes suit different situations.",
        href: "/immigration/pathways",
      },
      {
        id: "ecacheck",
        title: "Get your Indian degrees assessed (ECA)",
        detail:
          "WES is the most common body for Indian credentials. Reports take several weeks — start early.",
      },
      {
        id: "funds",
        title: "Plan proof of settlement funds",
        detail:
          "Express Entry (except CEC) requires proof of funds held for 6 months. Keep bank statements clean.",
      }
    );
  } else {
    items.push({
      id: "sin",
      title: "Get your Social Insurance Number (SIN)",
      detail:
        "Free from Service Canada, needed to work and file taxes. If you have one, mark this done.",
    });
    items.push({
      id: "settlement",
      title: "Use the free settlement services you already qualify for",
      detail:
        "Government-funded language classes, job programs, and newcomer help — including South Asian community organizations in ON, BC, and Alberta.",
      href: "/immigration/programs",
    });
    items.push({
      id: "firstreturn",
      title: "Understand your first tax return",
      detail:
        "You must report world income from the date you became a Canadian tax resident — including Indian income.",
      href: "/tax/newcomer-guide",
    });
    items.push({
      id: "benefits",
      title: "Apply for GST/HST credit and benefits",
      detail:
        "Newcomers can apply with Form RC151 before their first return. Money you may be leaving on the table.",
      href: "/tax/newcomer-guide",
    });
  }

  if (p.status === "student") {
    items.push({
      id: "tuition",
      title: "Claim tuition credits (T2202)",
      detail:
        "Download your T2202 from your school portal. Unused credits carry forward to future years.",
    });
  }

  if (p.status === "worker" || p.status === "student") {
    items.push({
      id: "prpath",
      title: "Track your path to permanent residence",
      detail:
        "Canadian work experience is the strongest CRS factor. Check your score as your experience grows.",
      href: "/immigration/crs-calculator",
    });
  }

  if (p.status === "pr") {
    items.push({
      id: "citizenship",
      title: "Track citizenship eligibility",
      detail:
        "You need 1,095 days of physical presence in the 5 years before applying. Keep a travel journal.",
    });
  }

  if (p.hasForeignAssets) {
    items.push({
      id: "t1135",
      title: "File Form T1135 (foreign property over $100k)",
      detail:
        "Indian property, shares, FDs and NRE/NRO balances count. Penalties start at $25/day. Exempt in your first year of residence.",
      href: "/tax/newcomer-guide",
    });
  }

  if (p.sendsMoneyToIndia) {
    items.push({
      id: "remittance",
      title: "Know the rules on money sent to India",
      detail:
        "Gifts to family are not deductible in Canada, and interest earned in India is taxable here. Keep transfer records.",
      href: "/tax/newcomer-guide",
    });
  }

  if (p.hasBusiness) {
    items.push(
      {
        id: "gsthst",
        title: "Check GST/HST registration ($30k threshold)",
        detail:
          "Once revenue passes $30,000 in four consecutive quarters, registration is mandatory.",
        href: "/tax/small-business",
      },
      {
        id: "incorporate",
        title: "Sole proprietorship vs incorporation",
        detail:
          "Incorporating can defer tax at ~12% small-business rates, but adds cost. See when it makes sense.",
        href: "/tax/small-business",
      }
    );
  }

  if (p.province && p.province !== "OTHER") {
    items.push({
      id: "estimate",
      title: "Estimate your taxes",
      detail: "See your federal + provincial tax, CPP and EI for 2025.",
      href: "/tax/calculator",
    });
  }

  return items;
}
