"use client";

import { useMemo, useState } from "react";
import {
  estimateTax,
  formatCAD,
  PROVINCES,
  type ProvinceCode,
} from "@/lib/tax";

export default function TaxCalculator() {
  const [province, setProvince] = useState<ProvinceCode>("ON");
  const [employment, setEmployment] = useState("75000");
  const [selfEmployed, setSelfEmployed] = useState("0");
  const [rrsp, setRrsp] = useState("0");

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

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="card">
        <h2 className="font-semibold text-slate-900">Your details</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label-field" htmlFor="province">
              Province
            </label>
            <select
              id="province"
              className="input-field"
              value={province}
              onChange={(e) => setProvince(e.target.value as ProvinceCode)}
            >
              {(Object.keys(PROVINCES) as ProvinceCode[]).map((code) => (
                <option key={code} value={code}>
                  {PROVINCES[code].name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              More provinces coming. ON, BC and AB cover most Indian newcomers.
            </p>
          </div>
          <div>
            <label className="label-field" htmlFor="employment">
              Employment income (salary, before tax)
            </label>
            <input
              id="employment"
              className="input-field"
              type="number"
              min="0"
              inputMode="numeric"
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="selfemployed">
              Self-employment / business income (net)
            </label>
            <input
              id="selfemployed"
              className="input-field"
              type="number"
              min="0"
              inputMode="numeric"
              value={selfEmployed}
              onChange={(e) => setSelfEmployed(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              After business expenses. Uber, DoorDash, consulting, and freelance
              income go here.
            </p>
          </div>
          <div>
            <label className="label-field" htmlFor="rrsp">
              RRSP contribution (deduction)
            </label>
            <input
              id="rrsp"
              className="input-field"
              type="number"
              min="0"
              inputMode="numeric"
              value={rrsp}
              onChange={(e) => setRrsp(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              Note: you have no RRSP room in your first year in Canada — room
              is created by the previous year&apos;s Canadian income.
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-primary-950 text-white">
        <h2 className="font-semibold">Your 2025 estimate</h2>
        <p className="mt-4 text-sm text-primary-200">Take-home (after tax, CPP, EI)</p>
        <p className="text-4xl font-extrabold tracking-tight">
          {formatCAD(result.afterTax)}
        </p>
        <p className="mt-1 text-sm text-primary-200">
          ≈ {formatCAD(monthly)} per month
        </p>

        <dl className="mt-6 space-y-2.5 border-t border-primary-800 pt-5 text-sm">
          <Row label="Total income" value={formatCAD(result.totalIncome)} />
          <Row label="Federal tax" value={formatCAD(result.federalTax)} />
          <Row
            label={`${PROVINCES[province].name} tax`}
            value={formatCAD(result.provincialTax)}
          />
          {province === "ON" && result.ontarioHealthPremium > 0 && (
            <Row
              label="Ontario health premium"
              value={formatCAD(result.ontarioHealthPremium)}
            />
          )}
          <Row label="CPP contributions" value={formatCAD(result.cpp)} />
          <Row label="EI premiums" value={formatCAD(result.ei)} />
          <div className="border-t border-primary-800 pt-2.5">
            <Row
              label="Average tax rate"
              value={`${(result.averageRate * 100).toFixed(1)}%`}
            />
            <div className="mt-2.5">
              <Row
                label="Marginal rate (next $1 earned)"
                value={`${(result.marginalRate * 100).toFixed(1)}%`}
              />
            </div>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-primary-300">
          Estimate only. Assumes you were a tax resident all year with no other
          credits or deductions. Ontario figures include the surtax and health
          premium.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-primary-200">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
