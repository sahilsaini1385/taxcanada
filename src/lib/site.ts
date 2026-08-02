// Single source of truth for branding and the featured professional.
// Rename the site or update contact details here — nothing else to touch.

export const SITE_NAME = "ApnaCanada";
export const SITE_TAGLINE =
  "Tax & immigration help for Indian newcomers to Canada";

export const EXPERT = {
  name: "Jatinder Saini",
  // Adjust the title/credentials to match actual licensing before launch —
  // only licensed members (e.g. CPA for public accounting, RCIC/lawyer for
  // paid immigration representation) may advertise those designations.
  title: "Tax, Accounting & Immigration Professional",
  blurb:
    "Jatinder helps Indian newcomers and small-business owners across Canada with personal and corporate taxes, bookkeeping, and immigration paperwork — in English, Hindi, and Punjabi.",
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
