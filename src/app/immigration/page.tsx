import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "Immigration guidance",
  description:
    "Express Entry CRS calculator and honest pathway comparisons for applicants from India.",
};

export default function ImmigrationHub() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Immigration, without the sales pitch
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Everything IRCC offers is free to look up — consultants charge for
        convenience, not secrets. Start by knowing your real score and your
        realistic options.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/immigration/crs-calculator"
          className="card transition hover:border-primary-300 hover:shadow-md"
        >
          <span className="text-2xl">📊</span>
          <h2 className="mt-3 font-semibold text-slate-900">
            CRS score calculator
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            The full Express Entry points grid: age, education, language,
            work experience, spouse factors, and skill transferability —
            updated for the 2025 removal of job-offer points.
          </p>
        </Link>
        <Link
          href="/immigration/pathways"
          className="card transition hover:border-primary-300 hover:shadow-md"
        >
          <span className="text-2xl">🗺️</span>
          <h2 className="mt-3 font-semibold text-slate-900">
            Pathways compared
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Express Entry, Provincial Nominee Programs, the study route,
            family sponsorship, and citizenship — with honest trade-offs for
            applicants from India.
          </p>
        </Link>
      </div>

      <div className="mt-10 max-w-3xl">
        <Callout variant="warning" title="Protect yourself from immigration fraud">
          Only lawyers and licensed RCICs (verify at{" "}
          <a
            className="font-medium underline"
            href="https://register.college-ic.ca/Public-Register-EN"
            target="_blank"
            rel="noopener noreferrer"
          >
            the CICC public register
          </a>
          ) can legally charge to represent you. No one — no one — can
          &ldquo;guarantee&rdquo; a visa, buy you extra CRS points, or get you
          a &ldquo;backdoor&rdquo; LMIA. Paying for a job offer is illegal and
          can get you banned for misrepresentation. If an agent in India or
          Canada promises guarantees, walk away.
        </Callout>
      </div>
    </div>
  );
}
