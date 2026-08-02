import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canadian taxes for newcomers",
  description:
    "Tax calculator and guides for Indian immigrants in Canada: first-year filing, world income, and small business taxes.",
};

const ITEMS = [
  {
    href: "/tax/calculator",
    emoji: "🧮",
    title: "2025 income tax calculator",
    desc: "Federal + provincial tax, CPP and EI on employment or self-employment income. Supports Ontario, BC, and Alberta, with RRSP deductions.",
  },
  {
    href: "/tax/newcomer-guide",
    emoji: "🛬",
    title: "Your first tax return in Canada",
    desc: "Tax residency, reporting Indian income, the India–Canada treaty, NRE/NRO interest, T1135, and benefits you can claim from day one.",
  },
  {
    href: "/tax/small-business",
    emoji: "🏪",
    title: "Small business & self-employment",
    desc: "Sole proprietor vs corporation, the $30,000 GST/HST rule, deductible expenses, and paying yourself salary vs dividends.",
  },
];

export default function TaxHub() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Canadian taxes, without the jargon
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Whether it&apos;s your first return or your first business, start
        here. Everything is written for people who learned &ldquo;income
        tax&rdquo; in the Indian system first.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ITEMS.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="card transition hover:border-primary-300 hover:shadow-md"
          >
            <span className="text-2xl">{i.emoji}</span>
            <h2 className="mt-3 font-semibold text-slate-900">{i.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {i.desc}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
        <strong className="text-slate-800">Key dates:</strong> the 2025 tax
        year is filed by <strong>April 30, 2026</strong> (June 15, 2026 if
        you&apos;re self-employed, but any balance is still due April 30).
        Filing late when you owe money means penalties — file even if you
        can&apos;t pay right away.
      </div>
    </div>
  );
}
