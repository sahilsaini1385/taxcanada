import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import SourceNote from "@/components/SourceNote";

export const metadata: Metadata = {
  title: "Immigration pathways compared",
  description:
    "Express Entry, PNP, study permits, work permits, family sponsorship and citizenship — honest comparisons for applicants from India.",
};

const PATHWAYS = [
  {
    emoji: "⚡",
    title: "Express Entry (FSW / CEC)",
    fit: "Skilled professionals with strong English and work experience",
    time: "~6 months after invitation",
    body: "The main federal route. You build a profile, get a CRS score, and wait for an invitation in a draw. Since 2023, category-based draws (STEM, health care, trades, French) can invite lower scores than all-program draws. With all-program cut-offs high, most Indian applicants without Canadian experience need either a very strong profile, French, or a provincial nomination.",
  },
  {
    emoji: "🏛️",
    title: "Provincial Nominee Programs (PNP)",
    fit: "People whose skills match a specific province's needs",
    time: "Varies widely — months to a year+ before the federal stage",
    body: "Each province runs its own streams (Ontario's OINP tech draws, BC PNP Tech, Alberta, Saskatchewan, Atlantic provinces). A nomination adds 600 CRS points — effectively a guaranteed invitation. Watch province newsletters; streams open and close quickly. Be honest about intent: you're expected to settle in the nominating province.",
  },
  {
    emoji: "🎓",
    title: "Study route (study permit → PGWP → PR)",
    fit: "Younger applicants who can afford tuition and want Canadian credentials",
    time: "2–4 years of study + 1–3 years of work before PR",
    body: "The classic route from India, but it's harder than the agents back home advertise: study permit caps since 2024, higher cost-of-living requirements, and PGWP rules that now exclude many college programs. It works best with a degree program at a public university in a field with real job prospects. Budget honestly — CAD $20k–40k/year tuition plus living costs.",
  },
  {
    emoji: "💼",
    title: "Work permits (LMIA, intra-company transfer)",
    fit: "People with a genuine Canadian job offer or a multinational employer",
    time: "Weeks to months",
    body: "An employer-driven route. Intra-company transfers (moving within a company from an Indian office) are common in IT. Remember: since March 2025 a job offer no longer adds CRS points, but Canadian work experience you gain still boosts your score a lot. Never pay for an LMIA — buying a job offer is fraud and leads to bans.",
  },
  {
    emoji: "❤️",
    title: "Family sponsorship",
    fit: "Spouses/partners of citizens or PRs; parents via lottery",
    time: "~12 months for spouses; years for parents",
    body: "Spousal sponsorship is reliable and has no income requirement (only a basic undertaking). Parents and grandparents depend on an invitation lottery with limited spots — many families use the 10-year super visa instead, which requires private medical insurance.",
  },
  {
    emoji: "🍁",
    title: "Citizenship",
    fit: "PRs with 3 of the last 5 years physically in Canada",
    time: "~1 year processing after applying",
    body: "1,095 days of physical presence in the 5 years before applying, plus a language requirement (CLB 4) and a citizenship test for ages 18–54. Note for Indian citizens: India does not allow dual citizenship — taking Canadian citizenship means surrendering the Indian passport and applying for OCI status, which preserves most practical rights except voting and agricultural land purchase.",
  },
];

export default function PathwaysPage() {
  return (
    <div className="container-page max-w-4xl py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Pathways to Canada, compared honestly
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        There is no &ldquo;best&rdquo; pathway — there&apos;s the one that
        matches your age, money, English/French, and patience. Here&apos;s the
        landscape as of mid-2025.
      </p>

      <div className="mt-8 space-y-5">
        {PATHWAYS.map((p) => (
          <div key={p.title} className="card">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{p.emoji}</span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-900">
                  {p.title}
                </h2>
                <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <span className="text-slate-500">
                    <strong className="text-slate-700">Best for:</strong> {p.fit}
                  </span>
                  <span className="text-slate-500">
                    <strong className="text-slate-700">Typical timeline:</strong>{" "}
                    {p.time}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="info" title="A realistic playbook for many Indian applicants">
        Check your <Link className="font-medium underline" href="/immigration/crs-calculator">CRS score</Link> first.
        If it&apos;s within ~30 points of recent draws, invest in retaking
        IELTS/CELPIP (language is the cheapest big gain) or learning French to
        NCLC 7 (+50 points and access to French draws). If the gap is bigger,
        research PNP streams matching your occupation before spending on
        anything else.
      </Callout>

      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "IRCC — Immigrate to Canada (all programs)",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html",
          },
          {
            label: "IRCC — Express Entry rounds of invitations",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html",
          },
          {
            label: "CICC — Verify a licensed immigration consultant",
            href: "https://register.college-ic.ca/Public-Register-EN",
          },
        ]}
      />
    </div>
  );
}
