import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Immigration guidance",
  description:
    "Express Entry CRS calculator and honest pathway comparisons for applicants from India.",
};

export default function ImmigrationHub() {
  return (
    <div className="container-page py-14">
      <p className="eyebrow">Immigration</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">
        Immigration, without the sales pitch
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Everything IRCC offers is free to look up — consultants charge for
        convenience, not secrets. Start by knowing your real score and your
        realistic options.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/immigration/crs-calculator"
          className="card group transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
            <Icon name="gauge" size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-ink">CRS score calculator</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            The full Express Entry points grid in a guided, step-by-step flow —
            age, education, language, work experience, spouse factors — updated
            for the 2025 removal of job-offer points.
          </p>
        </Link>
        <Link
          href="/immigration/pathways"
          className="card group transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
            <Icon name="map" size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-ink">Pathways compared</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Express Entry, Provincial Nominee Programs, the study route,
            family sponsorship, and citizenship — with honest trade-offs for
            applicants from India.
          </p>
        </Link>
        <Link
          href="/immigration/programs"
          className="card group transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
            <Icon name="users" size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-ink">Free newcomer programs</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Government and non-profit services in your province — free
            language classes, job programs, credential help, and South Asian
            community organizations.
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
          ) can legally charge to represent you. No one can
          &ldquo;guarantee&rdquo; a visa, buy you extra CRS points, or get you
          a &ldquo;backdoor&rdquo; LMIA. Paying for a job offer is illegal and
          can get you banned for misrepresentation. If an agent promises
          guarantees, walk away.
        </Callout>
      </div>
    </div>
  );
}
