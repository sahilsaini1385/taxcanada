import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Canadian taxes for newcomers",
  description:
    "Tax calculator and guides for Indian immigrants in Canada: first-year filing, world income, and small business taxes.",
};

const ITEMS: { href: string; icon: IconName; title: string; desc: string }[] = [
  {
    href: "/tax/calculator",
    icon: "calculator",
    title: "2025 income tax calculator",
    desc: "Federal + provincial tax, CPP and EI on employment or self-employment income — Ontario, BC, and Alberta, with RRSP deductions.",
  },
  {
    href: "/tax/newcomer-guide",
    icon: "landing",
    title: "Your first tax return in Canada",
    desc: "Tax residency, reporting Indian income, the India–Canada treaty, NRE/NRO interest, T1135, and benefits you can claim from day one.",
  },
  {
    href: "/tax/small-business",
    icon: "store",
    title: "Small business & self-employment",
    desc: "Sole proprietor vs corporation, the $30,000 GST/HST rule, deductible expenses, and paying yourself salary vs dividends.",
  },
];

export default function TaxHub() {
  return (
    <div className="container-page py-14">
      <p className="eyebrow">Taxes</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">
        Canadian taxes, without the jargon
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Whether it&apos;s your first return or your first business, start
        here. Everything is written for people who learned &ldquo;income
        tax&rdquo; in the Indian system first.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ITEMS.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="card group transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
              <Icon name={i.icon} size={24} />
            </span>
            <h2 className="mt-4 font-semibold text-ink">{i.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {i.desc}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex max-w-3xl gap-3 rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-ink-soft">
        <Icon name="file" size={20} className="mt-0.5 shrink-0 text-spruce-600" />
        <p>
          <strong className="text-ink">Key dates:</strong> the 2025 tax year
          is filed by <strong className="text-ink">April 30, 2026</strong>{" "}
          (June 15 if you&apos;re self-employed, but any balance is still due
          April 30). Filing late when you owe means penalties — file even if
          you can&apos;t pay right away.
        </p>
      </div>
    </div>
  );
}
