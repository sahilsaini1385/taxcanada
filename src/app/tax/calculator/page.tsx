import type { Metadata } from "next";
import TaxCalculator from "./TaxCalculator";
import SourceNote from "@/components/SourceNote";
import Callout from "@/components/Callout";

export const metadata: Metadata = {
  title: "2025 Canada income tax calculator",
  description:
    "Free 2025 tax estimator for Ontario, BC and Alberta: federal and provincial tax, CPP, EI, RRSP deductions, and self-employment income.",
};

export default function TaxCalculatorPage() {
  return (
    <div className="container-page max-w-4xl py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        2025 income tax estimator
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        See roughly what you&apos;ll owe (or take home) for the 2025 tax year
        — the return you file by April 30, 2026.
      </p>
      <Callout variant="info" title="What this is — and isn't">
        A good-faith estimate using official 2025 brackets, the basic personal
        amount, CPP/EI, and the Canada employment amount. It does not know
        about your specific credits (tuition, medical, donations, childcare,
        foreign tax credits from India). Treat it as a planning number, not a
        filing number. Your inputs never leave this page.
      </Callout>
      <TaxCalculator />
      <SourceNote
        reviewed="August 2025"
        sources={[
          {
            label: "CRA — Income tax rates for individuals (2025)",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html",
          },
          {
            label: "CRA — CPP contribution rates, maximums and exemptions",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html",
          },
          {
            label: "CRA — EI premium rates and maximums",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html",
          },
        ]}
      />
    </div>
  );
}
