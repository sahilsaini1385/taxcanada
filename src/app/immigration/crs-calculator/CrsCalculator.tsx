"use client";

import { useMemo, useState } from "react";
import {
  calculateCrs,
  DEFAULT_CRS_INPUT,
  EDUCATION_LABELS,
  type CrsInput,
  type Education,
} from "@/lib/crs";

const ABILITIES = ["Listening", "Reading", "Writing", "Speaking"] as const;
const CLB_OPTIONS = [4, 5, 6, 7, 8, 9, 10];

function ClbSelects({
  label,
  values,
  onChange,
  hint,
}: {
  label: string;
  values: [number, number, number, number];
  onChange: (v: [number, number, number, number]) => void;
  hint?: string;
}) {
  return (
    <div>
      <p className="label-field">{label}</p>
      {hint && <p className="mb-2 text-xs text-slate-500">{hint}</p>}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ABILITIES.map((ability, i) => (
          <label key={ability} className="block">
            <span className="mb-0.5 block text-xs text-slate-500">
              {ability}
            </span>
            <select
              className="input-field"
              value={values[i]}
              onChange={(e) => {
                const next = [...values] as [number, number, number, number];
                next[i] = Number(e.target.value);
                onChange(next);
              }}
            >
              <option value={3}>&lt;4</option>
              {CLB_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === 10 ? "10+" : c}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

function EducationSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: Education;
  onChange: (e: Education) => void;
}) {
  return (
    <select
      id={id}
      className="input-field"
      value={value}
      onChange={(e) => onChange(e.target.value as Education)}
    >
      {(Object.keys(EDUCATION_LABELS) as Education[]).map((k) => (
        <option key={k} value={k}>
          {EDUCATION_LABELS[k]}
        </option>
      ))}
    </select>
  );
}

export default function CrsCalculator() {
  const [input, setInput] = useState<CrsInput>(DEFAULT_CRS_INPUT);
  const set = (patch: Partial<CrsInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const result = useMemo(() => calculateCrs(input), [input]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,340px]">
      <div className="space-y-6">
        <div className="card space-y-4">
          <h2 className="font-semibold text-slate-900">About you</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                min={17}
                max={60}
                className="input-field"
                value={input.age}
                onChange={(e) => set({ age: Number(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="label-field" htmlFor="spouse">
                Applying with a spouse/partner?
              </label>
              <select
                id="spouse"
                className="input-field"
                value={input.hasSpouse ? "yes" : "no"}
                onChange={(e) => set({ hasSpouse: e.target.value === "yes" })}
              >
                <option value="no">No — single applicant</option>
                <option value="yes">Yes — spouse coming with me</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-field" htmlFor="edu">
              Highest education (as assessed by your ECA)
            </label>
            <EducationSelect
              id="edu"
              value={input.education}
              onChange={(education) => set({ education })}
            />
            <p className="mt-1 text-xs text-slate-500">
              B.Tech/B.E. (4 years) usually assesses as a bachelor&apos;s.
              Bachelor&apos;s + master&apos;s = &ldquo;two or more
              credentials.&rdquo;
            </p>
          </div>
        </div>

        <div className="card space-y-5">
          <h2 className="font-semibold text-slate-900">Language</h2>
          <ClbSelects
            label="First official language (usually English) — CLB level"
            hint="IELTS example: L8/R7/W7/S7 = CLB 9/9/9/9. Check IRCC's chart for your exact scores."
            values={input.firstLangClb}
            onChange={(firstLangClb) => set({ firstLangClb })}
          />
          <div>
            <label className="label-field" htmlFor="secondlang">
              Did you take a French test too (TEF/TCF)?
            </label>
            <select
              id="secondlang"
              className="input-field"
              value={input.hasSecondLang ? "yes" : "no"}
              onChange={(e) => set({ hasSecondLang: e.target.value === "yes" })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {input.hasSecondLang && (
            <>
              <ClbSelects
                label="Second official language — CLB/NCLC level"
                values={input.secondLangClb}
                onChange={(secondLangClb) => set({ secondLangClb })}
              />
              <div>
                <label className="label-field" htmlFor="french7">
                  NCLC 7+ in all four French abilities?
                </label>
                <select
                  id="french7"
                  className="input-field"
                  value={input.frenchNclc7Plus ? "yes" : "no"}
                  onChange={(e) =>
                    set({ frenchNclc7Plus: e.target.value === "yes" })
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes (worth 25–50 bonus points)</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="card space-y-4">
          <h2 className="font-semibold text-slate-900">Work experience</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="cdnwork">
                Skilled work in Canada
              </label>
              <select
                id="cdnwork"
                className="input-field"
                value={input.canadianWorkYears}
                onChange={(e) =>
                  set({ canadianWorkYears: Number(e.target.value) })
                }
              >
                {[0, 1, 2, 3, 4, 5].map((y) => (
                  <option key={y} value={y}>
                    {y === 0 ? "None" : y === 5 ? "5+ years" : `${y} year${y > 1 ? "s" : ""}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-field" htmlFor="fwork">
                Skilled work outside Canada (e.g. India)
              </label>
              <select
                id="fwork"
                className="input-field"
                value={input.foreignWorkYears}
                onChange={(e) =>
                  set({ foreignWorkYears: Number(e.target.value) })
                }
              >
                <option value={0}>None</option>
                <option value={1}>1–2 years</option>
                <option value={3}>3+ years</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-field" htmlFor="trade">
              Canadian certificate of qualification in a trade?
            </label>
            <select
              id="trade"
              className="input-field"
              value={input.hasTradeCertificate ? "yes" : "no"}
              onChange={(e) =>
                set({ hasTradeCertificate: e.target.value === "yes" })
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        {input.hasSpouse && (
          <div className="card space-y-4">
            <h2 className="font-semibold text-slate-900">Your spouse</h2>
            <div>
              <label className="label-field" htmlFor="spouseedu">
                Spouse&apos;s highest education (with ECA)
              </label>
              <EducationSelect
                id="spouseedu"
                value={input.spouseEducation}
                onChange={(spouseEducation) => set({ spouseEducation })}
              />
            </div>
            <ClbSelects
              label="Spouse's language test — CLB level"
              hint="No test taken = select <4 for all."
              values={input.spouseLangClb}
              onChange={(spouseLangClb) => set({ spouseLangClb })}
            />
            <div>
              <label className="label-field" htmlFor="spousework">
                Spouse&apos;s skilled work in Canada
              </label>
              <select
                id="spousework"
                className="input-field"
                value={input.spouseCanadianWorkYears}
                onChange={(e) =>
                  set({ spouseCanadianWorkYears: Number(e.target.value) })
                }
              >
                {[0, 1, 2, 3, 4, 5].map((y) => (
                  <option key={y} value={y}>
                    {y === 0 ? "None" : y === 5 ? "5+ years" : `${y} year${y > 1 ? "s" : ""}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="card space-y-4">
          <h2 className="font-semibold text-slate-900">Extra points</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="pnp">
                Provincial nomination (PNP)?
              </label>
              <select
                id="pnp"
                className="input-field"
                value={input.hasProvincialNomination ? "yes" : "no"}
                onChange={(e) =>
                  set({ hasProvincialNomination: e.target.value === "yes" })
                }
              >
                <option value="no">No</option>
                <option value="yes">Yes (+600)</option>
              </select>
            </div>
            <div>
              <label className="label-field" htmlFor="sibling">
                Sibling in Canada (citizen/PR)?
              </label>
              <select
                id="sibling"
                className="input-field"
                value={input.hasSiblingInCanada ? "yes" : "no"}
                onChange={(e) =>
                  set({ hasSiblingInCanada: e.target.value === "yes" })
                }
              >
                <option value="no">No</option>
                <option value="yes">Yes (+15)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-field" htmlFor="cdnedu">
              Studied in Canada?
            </label>
            <select
              id="cdnedu"
              className="input-field"
              value={input.canadianEducation}
              onChange={(e) =>
                set({
                  canadianEducation: e.target
                    .value as CrsInput["canadianEducation"],
                })
              }
            >
              <option value="none">No</option>
              <option value="oneOrTwoYear">
                1–2 year credential (+15)
              </option>
              <option value="threeYearPlus">
                3+ year credential or degree (+30)
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="card bg-primary-950 text-white">
          <h2 className="font-semibold">Your CRS score</h2>
          <p className="mt-2 text-5xl font-extrabold tabular-nums tracking-tight">
            {result.total}
          </p>
          <p className="mt-1 text-sm text-primary-200">out of 1,200</p>
          <dl className="mt-5 space-y-2 border-t border-primary-800 pt-4 text-sm">
            {[
              ["Age", result.age],
              ["Education", result.education],
              ["First language", result.firstLanguage],
              ["Second language", result.secondLanguage],
              ["Canadian work experience", result.canadianWork],
              ["Spouse factors", result.spouseFactors],
              ["Skill transferability", result.transferability],
              ["Additional points", result.additional],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex items-baseline justify-between gap-3"
              >
                <dt className="text-primary-200">{label}</dt>
                <dd className="font-semibold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-primary-300">
            Recent all-program draws have hovered well above 500, while
            category-based draws (French, health care, trades) and PNP routes
            invite at other levels. Compare against{" "}
            <a
              className="underline"
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              recent IRCC draws
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
