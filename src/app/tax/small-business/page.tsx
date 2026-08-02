import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import SourceNote from "@/components/SourceNote";

export const metadata: Metadata = {
  title: "Small business taxes for newcomers",
  description:
    "GST/HST registration, deductible expenses, sole proprietorship vs incorporation, and paying yourself — for immigrant entrepreneurs in Canada.",
};

export default function SmallBusinessPage() {
  return (
    <div className="container-page prose-section max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Small business & self-employment taxes
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        Driving Uber, running an IT consultancy, a franchise, a trucking
        company, or a corner store — the tax rules are the same, and they
        reward people who keep records.
      </p>

      <h2>1. You might already be a business</h2>
      <p>
        In Canada there&apos;s no registration needed to be a{" "}
        <strong>sole proprietor</strong> — the moment you invoice a client or
        drive for a rideshare app, you have business income. It goes on Form
        T2125 with your personal return, and you&apos;re taxed on{" "}
        <em>profit</em> (revenue minus expenses), not revenue.
      </p>

      <h2>2. The $30,000 GST/HST rule</h2>
      <Callout variant="warning" title="Don't miss this threshold">
        Once your worldwide taxable revenue passes <strong>$30,000 in four
        consecutive calendar quarters</strong> (or one quarter alone), you must
        register for GST/HST, start charging it, and remit it. Rideshare
        drivers must register from <strong>dollar one</strong> — no threshold.
      </Callout>
      <p>
        Registering early (voluntarily) can make sense: you can claim back the
        GST/HST you pay on business purchases (input tax credits). Many
        IT consultants billing US clients register early — exports are
        zero-rated, so they charge 0% but still recover GST/HST on expenses.
      </p>

      <h2>3. Expenses you can actually deduct</h2>
      <ul>
        <li>Home office (the workspace share of rent, utilities, internet)</li>
        <li>Vehicle costs by business-use share — keep a mileage log</li>
        <li>Phone, software, equipment (larger items depreciate via CCA)</li>
        <li>Advertising, professional fees, bank charges, insurance</li>
        <li>50% of eligible meals with clients</li>
      </ul>
      <p>
        The rule of thumb: reasonable, business-purpose, and documented.
        Keep receipts for six years — the CRA can ask.
      </p>

      <h2>4. Sole proprietor vs incorporation</h2>
      <p>
        Incorporation is the most oversold decision in immigrant business
        circles. The honest version:
      </p>
      <ul>
        <li>
          <strong>Corporations pay ~9% federal + provincial small-business
          rate</strong> (roughly 11–12.5% combined in ON/BC/AB) on the first
          $500,000 of active income — but that money is only cheap while it{" "}
          <em>stays in the corporation</em>. Take it out as salary or
          dividends and you pay personal tax then.
        </li>
        <li>
          Incorporate when: you earn well more than you spend and can leave
          money invested in the company; you need liability protection; or
          clients require it (common in IT contracting and trucking).
        </li>
        <li>
          Stay a sole proprietor when: you spend most of what you earn.
          Incorporating then adds ~$1,500–3,000/year in accounting and filing
          costs for little benefit.
        </li>
      </ul>

      <h2>5. Salary vs dividends (if incorporated)</h2>
      <ul>
        <li>
          <strong>Salary</strong> creates RRSP room and CPP pension credit, and
          is deductible to the corporation.
        </li>
        <li>
          <strong>Dividends</strong> skip CPP (saving cash now, reducing pension
          later) and are simpler, but create no RRSP room.
        </li>
        <li>
          Most owner-operators use a mix. This is genuinely a
          talk-to-an-accountant decision once real money is involved.
        </li>
      </ul>

      <h2>6. Set money aside — nobody withholds for you</h2>
      <p>
        Unlike a salaried job, no one deducts tax from business income. A safe
        habit: move <strong>25–30% of every payment</strong> into a separate
        account for income tax, CPP (you pay both halves as self-employed —
        11.9% up to the ceiling), and GST/HST you&apos;ve collected. After your
        first year owing more than $3,000, the CRA will expect quarterly{" "}
        <strong>instalments</strong>.
      </p>

      <Callout variant="info" title="Deadlines for the self-employed">
        Returns are due <strong>June 15</strong>, but any balance owing is
        still due <strong>April 30</strong>. GST/HST filing frequency depends
        on your revenue (usually annual at the start).
      </Callout>

      <p className="mt-8">
        Estimate the tax on your business profit with the{" "}
        <Link href="/tax/calculator">calculator</Link> — enter it as
        self-employment income to include both CPP shares.
      </p>

      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "CRA — When to register for and start charging GST/HST",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html",
          },
          {
            label: "CRA — Business expenses",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/sole-proprietorships-partnerships/business-expenses.html",
          },
          {
            label: "CRA — Corporation tax rates",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-tax-rates.html",
          },
        ]}
      />
    </div>
  );
}
