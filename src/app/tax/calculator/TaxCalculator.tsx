"use client";

import { useMemo, useState } from "react";
import {
  estimateTax,
  formatCAD,
  PROVINCES,
  type ProvinceCode,
} from "@/lib/tax";
import CurrencyInput from "@/components/CurrencyInput";
import SegmentedControl from "@/components/SegmentedControl";
import BreakdownBar from "@/components/BreakdownBar";
import Icon from "@/components/Icon";

function WhyWeAsk({ children }: { children: React.ReactNode }) {
  return (
    <details className="group mt-1.5">
      <summary className="flex cursor-pointer list-none items-center gap-1 text-xs text-ink-muted underline decoration-line underline-offset-2 hover:text-spruce-700 [&::-webkit-details-marker]:hidden">
        Why we ask
        <Icon name="chevronDown" size={13} className="transition group-open:rotate-180" />
      </summary>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{children}</p>
    </details>
  );
}

export default function TaxCalculator() {
  const [province, setProvince] = useState<ProvinceCode>("ON");
  const [employment, setEmployment] = useState("75000");
  const [selfEmployed, setSelfEmployed] = useState("");
  const [rrsp, setRrsp] = useState("");

  const result = useMemo(
    () =>
      estimateTax({
        employmentIncome: Number(employment) || 0,
        selfEmployedIncome: Number(selfEmployed) || 0,
        rrspDeduction: Number(rrsp) || 0,
        province,
      }),
    [employment, selfEmployed, rrsp, province]
  );

  const monthly = result.afterTax / 12;
  const provTotal = result.provincialTax + result.ontarioHealthPremium;

  return (
    <>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,400px]">
        <div className="card space-y-6">
          <SegmentedControl
            label="Where do you live?"
            options={(Object.keys(PROVINCES) as ProvinceCode[]).map((c) => ({
              value: c,
              label: PROVINCES[c].name,
            }))}
            value={province}
            onChange={setProvince}
          />
          <div>
            <CurrencyInput
              id="employment"
              label="Employment income (salary, before tax)"
              value={employment}
              onChange={setEmployment}
            />
            <WhyWeAsk>
              The number from your job offer or T4 box 14. Tax, CPP, and EI
              are calculated from it — we do the math so you don&apos;t have
              to.
            </WhyWeAsk>
          </div>
          <div>
            <CurrencyInput
              id="selfemployed"
              label="Self-employment income (net)"
              hint="Uber, DoorDash, consulting, freelance — after business expenses."
              value={selfEmployed}
              onChange={setSelfEmployed}
            />
            <WhyWeAsk>
              Business income is taxed the same, but you pay both halves of
              CPP and no EI. We handle those differences automatically.
            </WhyWeAsk>
          </div>
          <div>
            <CurrencyInput
              id="rrsp"
              label="RRSP contribution"
              value={rrsp}
              onChange={setRrsp}
            />
            <WhyWeAsk>
              RRSP contributions reduce taxable income. Heads up: in your
              first year in Canada you likely have $0 room — room is created
              by the previous year&apos;s Canadian income.
            </WhyWeAsk>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="card">
            <p className="text-sm text-ink-soft">Your estimated take-home</p>
            <p className="display mt-1 text-5xl tabular-nums text-spruce-700">
              {formatCAD(result.afterTax)}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              ≈ {formatCAD(monthly)} per month
            </p>

            <div className="mt-6 border-t border-line-soft pt-5">
              <BreakdownBar
                formatValue={formatCAD}
                segments={[
                  {
                    label: "Take-home",
                    value: result.afterTax,
                    colorClass: "bg-chart-takehome",
                  },
                  {
                    label: "Federal tax",
                    value: result.federalTax,
                    colorClass: "bg-chart-federal",
                  },
                  {
                    label:
                      province === "ON"
                        ? "Ontario tax & health premium"
                        : `${PROVINCES[province].name} tax`,
                    value: provTotal,
                    colorClass: "bg-chart-provincial",
                  },
                  {
                    label: "CPP contributions",
                    value: result.cpp,
                    colorClass: "bg-chart-cpp",
                  },
                  {
                    label: "EI premiums",
                    value: result.ei,
                    colorClass: "bg-chart-ei",
                  },
                ]}
              />
            </div>

            <dl className="mt-5 space-y-2 border-t border-line-soft pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Average tax rate</dt>
                <dd className="font-medium tabular-nums text-ink">
                  {(result.averageRate * 100).toFixed(1)}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Marginal rate (next $1)</dt>
                <dd className="font-medium tabular-nums text-ink">
                  {(result.marginalRate * 100).toFixed(1)}%
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Planning estimate only — assumes full-year residency and no
              other credits.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: live result stays visible while typing */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-baseline justify-between">
          <span className="text-sm text-ink-soft">Take-home</span>
          <span className="font-display text-2xl font-semibold tabular-nums text-spruce-700">
            {formatCAD(result.afterTax)}
          </span>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </>
  );
}
