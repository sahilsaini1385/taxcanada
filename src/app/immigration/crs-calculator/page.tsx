import type { Metadata } from "next";
import CrsCalculator from "./CrsCalculator";
import SourceNote from "@/components/SourceNote";
import ExpertCta from "@/components/ExpertCta";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Express Entry CRS calculator",
  description:
    "Free Comprehensive Ranking System calculator with the full IRCC grid — age, education, IELTS/CELPIP CLB levels, work experience, and spouse factors.",
};

export default function CrsPage() {
  return (
    <div className="container-page max-w-4xl py-12">
      <p className="eyebrow">Free tool</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">
        Express Entry CRS calculator
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        A few quick steps, scored live with the same points grid IRCC uses to
        rank Express Entry profiles.
      </p>
      <Callout variant="info" title="2025 rule change">
        IRCC <strong>removed job-offer (arranged employment) points</strong> in
        March 2025 — a job offer no longer adds 50/200 points. This calculator
        reflects that. Convert IELTS/CELPIP/PTE scores to CLB levels first —
        each band maps to a CLB level on{" "}
        <a
          className="font-medium underline"
          href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements/language-testing.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          IRCC&apos;s equivalency chart
        </a>
        .
      </Callout>
      <CrsCalculator />
      <ExpertCta context="Score close to the cut-off and wondering what to do next?" />
      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "IRCC — Comprehensive Ranking System criteria",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html",
          },
          {
            label: "IRCC — Express Entry rounds of invitations (recent cut-offs)",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html",
          },
        ]}
      />
    </div>
  );
}
