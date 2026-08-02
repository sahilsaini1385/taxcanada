import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/Callout";
import SourceNote from "@/components/SourceNote";

export const metadata: Metadata = {
  title: "First-year tax guide for Indian newcomers",
  description:
    "Canadian tax residency, reporting Indian income, the India–Canada tax treaty, NRE/NRO accounts, T1135, and newcomer benefits — explained simply.",
};

export default function NewcomerGuidePage() {
  return (
    <div className="container-page prose-section max-w-3xl py-12">
      <p className="eyebrow">Guide</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">
        Your first tax return in Canada
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        The Canadian system is different from India&apos;s in ways that
        surprise people. Here&apos;s what actually matters in your first year
        or two.
      </p>

      <Callout variant="warning" title="The single most important idea">
        Canada taxes <strong>residents</strong> on <strong>world income</strong>.
        From the day you become a tax resident, your Canadian salary <em>and</em>{" "}
        your Indian rental income, NRO interest, dividends, and capital gains
        all belong on your Canadian return. India&apos;s financial year
        (April–March) doesn&apos;t matter here — Canada taxes January to
        December.
      </Callout>

      <h2>1. When did you become a tax resident?</h2>
      <p>
        Usually the day you arrived with significant residential ties — a home,
        a spouse, a job here. Your first return is a <em>part-year</em> return:
        world income is only reported from that date onward. Income you earned
        in India <em>before</em> arriving is not taxed by Canada (though it can
        affect some credit calculations).
      </p>

      <h2>2. The India–Canada tax treaty saves you from double tax</h2>
      <p>
        If India already taxed something (say, TDS on NRO interest or tax on
        rental income), you generally claim a{" "}
        <strong>foreign tax credit</strong> on your Canadian return for the
        Indian tax paid, up to the Canadian tax on that income. You pay the
        higher of the two rates overall — not both in full. Keep Indian tax
        documents (Form 26AS, TDS certificates) as proof.
      </p>

      <h2>3. NRE and NRO accounts</h2>
      <ul>
        <li>
          <strong>NRE interest</strong> is tax-free in India for non-residents —
          but it is <strong>fully taxable in Canada</strong> once you&apos;re a
          resident here. This catches many people.
        </li>
        <li>
          <strong>NRO interest</strong> is taxed in India (TDS) and taxable in
          Canada too — claim the foreign tax credit for the Indian TDS.
        </li>
        <li>
          Tell your Indian bank you&apos;ve become a non-resident of India so
          accounts are reclassified correctly under FEMA rules.
        </li>
      </ul>

      <h2>4. Form T1135 — foreign property over $100,000</h2>
      <p>
        If the total <em>cost</em> of your non-Canadian property — Indian real
        estate held as an investment, shares, mutual funds, fixed deposits,
        NRE/NRO balances — exceeds CAD $100,000 at any point in the year, you
        must file Form T1135. Penalties start at $25/day (max $2,500) just for
        not filing.
      </p>
      <Callout variant="success" title="First-year exemption">
        You do <strong>not</strong> file T1135 for the year you first became a
        Canadian tax resident. It starts from your second year. A personal-use
        home in India (where your parents live, not rented out) is generally
        exempt too.
      </Callout>

      <h2>5. Money you send to India</h2>
      <ul>
        <li>
          Sending money to parents or family is a <strong>gift</strong> — not
          deductible in Canada, and no Canadian tax on the transfer itself.
        </li>
        <li>
          But if that money earns interest in India in <em>your</em> name, that
          interest is Canadian taxable income.
        </li>
        <li>
          Supporting parents may qualify you for the{" "}
          <strong>Canada Caregiver Credit</strong> only in narrow cases
          (dependent due to infirmity, generally living in Canada) — be wary of
          anyone promising big refunds for &ldquo;money sent home.&rdquo;
        </li>
      </ul>

      <h2>6. Benefits — file even with zero income</h2>
      <ul>
        <li>
          <strong>GST/HST credit</strong>: cash every quarter for modest
          incomes. Newcomers apply with Form RC151 without waiting for a first
          return.
        </li>
        <li>
          <strong>Canada Child Benefit</strong>: substantial monthly payments if
          you have kids — apply with Form RC66 once someone qualifies.
        </li>
        <li>
          Filing a return is how the government learns you qualify. File even
          for a partial year with little income.
        </li>
      </ul>

      <h2>7. TFSA and RRSP — the newcomer gotchas</h2>
      <ul>
        <li>
          <strong>TFSA room starts only from the year you become a resident</strong>{" "}
          (and you must be 18+ with a SIN). Don&apos;t trust the
          &ldquo;total room since 2009&rdquo; figures you see online.
        </li>
        <li>
          <strong>RRSP room is earned from last year&apos;s Canadian income</strong>{" "}
          — so in your first year you likely have $0 room. Contributing without
          room means a 1%/month penalty tax.
        </li>
        <li>
          US-listed investments inside a TFSA can have US withholding tax
          issues; keep it simple early on.
        </li>
      </ul>

      <h2>8. What to keep in a folder</h2>
      <ul>
        <li>Landing date proof (first entry stamp, CoPR)</li>
        <li>T4 (job), T5 (bank interest), T2202 (tuition) slips</li>
        <li>Indian Form 26AS / AIS, TDS certificates, rent receipts</li>
        <li>Records of transfers between India and Canada</li>
        <li>Rent receipts / property tax (some provincial credits use them)</li>
      </ul>

      <p className="mt-8">
        Ready to see numbers? Try the{" "}
        <Link href="/tax/calculator">2025 tax calculator</Link>, or build your{" "}
        <Link href="/profile">personal checklist</Link>.
      </p>

      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "CRA — Newcomers to Canada (immigrants)",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants.html",
          },
          {
            label: "CRA — Foreign income verification statement (T1135)",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/information-been-moved/foreign-reporting/foreign-income-verification-statement.html",
          },
          {
            label: "Canada–India Tax Convention (Department of Finance)",
            href: "https://www.fin.gc.ca/treaties-conventions/india_-eng.asp",
          },
        ]}
      />
    </div>
  );
}
