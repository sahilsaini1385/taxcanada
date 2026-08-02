import type { Metadata } from "next";
import Callout from "@/components/Callout";
import SourceNote from "@/components/SourceNote";
import ProgramsDirectory from "./ProgramsDirectory";

export const metadata: Metadata = {
  title: "Free newcomer programs & settlement services",
  description:
    "Government and non-profit programs that help new immigrants in Ontario, BC, and Alberta — free settlement services, language classes, job programs, and South Asian community organizations.",
};

export default function ProgramsPage() {
  return (
    <div className="container-page max-w-4xl py-14">
      <p className="eyebrow">Free help</p>
      <h1 className="display mt-3 text-3xl [text-wrap:balance] sm:text-4xl">
        Free programs most newcomers never hear about
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Canada funds an entire network of free settlement services — language
        classes, job programs, credential help, even free tax filing. You
        already paid for these through the system; use them.
      </p>
      <Callout variant="info" title="All of this is genuinely free">
        These services are funded by IRCC, provincial governments, and
        charities. If anyone charges you for &ldquo;access&rdquo; to a
        settlement program or LINC class, it&apos;s a scam — walk away and
        contact the organization directly through the links below.
      </Callout>
      <ProgramsDirectory />
      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "IRCC — Find free newcomer services near you",
            href: "https://ircc.canada.ca/english/newcomers/services/index.asp",
          },
          {
            label: "CRA — Free tax clinics (CVITP)",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html",
          },
        ]}
      />
    </div>
  );
}
