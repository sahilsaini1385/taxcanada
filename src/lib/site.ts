// Single source of truth for branding and the featured professional.
// Rename the site or update contact details here — nothing else to touch.

export const SITE_NAME = "ApnaCanada";
export const SITE_TAGLINE =
  "Tax & immigration help for Indian newcomers to Canada";

export const EXPERT = {
  name: "Jatinder Saini",
  // Adjust the title/credentials to match actual licensing before launch —
  // designations (e.g. CPA; RCIC for paid immigration services) may only be
  // advertised by licensed members. Jatinder is an immigration consultant,
  // not a lawyer — the copy below sticks to forms/paperwork accordingly.
  title: "Tax & Accounting Professional · Immigration Consultant",
  blurb:
    "Jatinder handles the full range of personal and business taxes, bookkeeping, and accounting for Indian newcomers and small businesses across Canada. As an immigration consultant, she takes the paperwork off your plate — forms, applications, and passport renewals, done right the first time — in English, Hindi, and Punjabi.",
  languages: ["English", "Hindi", "Punjabi"],
  // Fill these in to activate the contact buttons on /expert and the
  // lead cards across the site. Leave empty ("") to show "opening soon".
  phone: "",
  email: "",
  bookingUrl: "",
};

export const expertContactReady = Boolean(
  EXPERT.phone || EXPERT.email || EXPERT.bookingUrl
);
