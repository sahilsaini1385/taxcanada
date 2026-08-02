"use client";

import { useMemo, useState } from "react";
import {
  calculateCrs,
  DEFAULT_CRS_INPUT,
  EDUCATION_LABELS,
  type CrsInput,
  type Education,
} from "@/lib/crs";
import SegmentedControl, { YesNoControl } from "@/components/SegmentedControl";
import Icon from "@/components/Icon";

const ABILITIES = ["Listening", "Reading", "Writing", "Speaking"] as const;
const CLB_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10];

// Recent all-program draw cut-offs have hovered around this level (2025).
const DRAW_REFERENCE = 520;

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
      {hint && <p className="-mt-0.5 mb-2 text-xs text-ink-muted">{hint}</p>}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ABILITIES.map((ability, i) => (
          <label key={ability} className="block">
            <span className="mb-1 block text-xs text-ink-muted">{ability}</span>
            <select
              className="input-field !py-2"
              value={values[i]}
              onChange={(e) => {
                const next = [...values] as [number, number, number, number];
                next[i] = Number(e.target.value);
                onChange(next);
              }}
            >
              {CLB_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === 3 ? "Below 4" : c === 10 ? "CLB 10+" : `CLB ${c}`}
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
  const [step, setStep] = useState(0);
  const set = (patch: Partial<CrsInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const result = useMemo(() => calculateCrs(input), [input]);

  const steps = useMemo(() => {
    const s = ["About you", "Language", "Work"];
    if (input.hasSpouse) s.push("Your spouse");
    s.push("Extra points");
    return s;
  }, [input.hasSpouse]);

  const stepName = steps[Math.min(step, steps.length - 1)];
  const isLast = step >= steps.length - 1;
  const gap = DRAW_REFERENCE - result.total;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,360px]">
      <div>
        {/* Stepper */}
        <ol className="mb-5 flex flex-wrap items-center gap-x-1 gap-y-2">
          {steps.map((s, i) => {
            const stateCls =
              i === step
                ? "bg-spruce-800 text-white"
                : i < step
                  ? "bg-spruce-100 text-spruce-800"
                  : "bg-cream-deep text-ink-muted";
            return (
              <li key={s} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${stateCls}`}
                >
                  {i < step && <Icon name="check" size={12} />}
                  {s}
                </button>
                {i < steps.length - 1 && (
                  <span className="h-px w-3 bg-line" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="card space-y-5">
          {stepName === "About you" && (
            <>
              <h2 className="display text-xl">Let&apos;s start with you</h2>
              <div>
                <label className="label-field" htmlFor="age">
                  How old are you?
                </label>
                <input
                  id="age"
                  type="number"
                  min={17}
                  max={60}
                  className="input-field max-w-[10rem] tabular-nums"
                  value={input.age}
                  onChange={(e) => set({ age: Number(e.target.value) || 0 })}
                />
                <p className="mt-1.5 text-xs text-ink-muted">
                  Age 20–29 scores the maximum. Points taper from 30 onward.
                </p>
              </div>
              <YesNoControl
                label="Will a spouse or partner immigrate with you?"
                value={input.hasSpouse}
                onChange={(hasSpouse) => set({ hasSpouse })}
              />
              <div>
                <label className="label-field" htmlFor="edu">
                  Highest completed education (as your ECA assesses it)
                </label>
                <EducationSelect
                  id="edu"
                  value={input.education}
                  onChange={(education) => set({ education })}
                />
                <p className="mt-1.5 text-xs text-ink-muted">
                  A 4-year B.Tech/B.E. usually assesses as a bachelor&apos;s.
                  Bachelor&apos;s + master&apos;s = &ldquo;two or more
                  credentials.&rdquo;
                </p>
              </div>
            </>
          )}

          {stepName === "Language" && (
            <>
              <h2 className="display text-xl">Your language scores</h2>
              <ClbSelects
                label="First official language (usually English)"
                hint="Convert IELTS/CELPIP/PTE to CLB using IRCC's chart. IELTS L8 R7 W7 S7 = CLB 9/9/9/9."
                values={input.firstLangClb}
                onChange={(firstLangClb) => set({ firstLangClb })}
              />
              <YesNoControl
                label="Have you also taken a French test (TEF/TCF)?"
                hint="French is the single cheapest way to add 25–50 points."
                value={input.hasSecondLang}
                onChange={(hasSecondLang) => set({ hasSecondLang })}
              />
              {input.hasSecondLang && (
                <>
                  <ClbSelects
                    label="French — NCLC level"
                    values={input.secondLangClb}
                    onChange={(secondLangClb) => set({ secondLangClb })}
                  />
                  <YesNoControl
                    label="NCLC 7 or higher in all four French abilities?"
                    value={input.frenchNclc7Plus}
                    onChange={(frenchNclc7Plus) => set({ frenchNclc7Plus })}
                  />
                </>
              )}
            </>
          )}

          {stepName === "Work" && (
            <>
              <h2 className="display text-xl">Your work experience</h2>
              <SegmentedControl
                label="Skilled work experience in Canada"
                hint="The strongest points factor after age and language."
                options={[0, 1, 2, 3, 4, 5].map((y) => ({
                  value: String(y),
                  label: y === 0 ? "None" : y === 5 ? "5+ yrs" : `${y} yr${y > 1 ? "s" : ""}`,
                }))}
                value={String(input.canadianWorkYears)}
                onChange={(v) => set({ canadianWorkYears: Number(v) })}
              />
              <SegmentedControl
                label="Skilled work experience outside Canada (e.g. India)"
                options={[
                  { value: "0", label: "None" },
                  { value: "1", label: "1–2 yrs" },
                  { value: "3", label: "3+ yrs" },
                ]}
                value={String(input.foreignWorkYears)}
                onChange={(v) => set({ foreignWorkYears: Number(v) })}
              />
              <YesNoControl
                label="Canadian certificate of qualification in a skilled trade?"
                value={input.hasTradeCertificate}
                onChange={(hasTradeCertificate) => set({ hasTradeCertificate })}
              />
            </>
          )}

          {stepName === "Your spouse" && (
            <>
              <h2 className="display text-xl">About your spouse</h2>
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
                label="Spouse's language test"
                hint="No test yet? Leave everything at “Below 4”. A spouse test is often worth ~10–20 points."
                values={input.spouseLangClb}
                onChange={(spouseLangClb) => set({ spouseLangClb })}
              />
              <SegmentedControl
                label="Spouse's skilled work in Canada"
                options={[0, 1, 2, 3, 4, 5].map((y) => ({
                  value: String(y),
                  label: y === 0 ? "None" : y === 5 ? "5+ yrs" : `${y} yr${y > 1 ? "s" : ""}`,
                }))}
                value={String(input.spouseCanadianWorkYears)}
                onChange={(v) => set({ spouseCanadianWorkYears: Number(v) })}
              />
            </>
          )}

          {stepName === "Extra points" && (
            <>
              <h2 className="display text-xl">Almost there — bonus points</h2>
              <YesNoControl
                label="Provincial nomination (PNP)?"
                hint="Worth 600 points — effectively a guaranteed invitation."
                value={input.hasProvincialNomination}
                onChange={(hasProvincialNomination) =>
                  set({ hasProvincialNomination })
                }
              />
              <YesNoControl
                label="Brother or sister in Canada (citizen or PR)?"
                value={input.hasSiblingInCanada}
                onChange={(hasSiblingInCanada) => set({ hasSiblingInCanada })}
              />
              <SegmentedControl
                label="Did you study in Canada?"
                options={[
                  { value: "none", label: "No" },
                  { value: "oneOrTwoYear", label: "1–2 year credential" },
                  { value: "threeYearPlus", label: "3+ years / degree" },
                ]}
                value={input.canadianEducation}
                onChange={(v) =>
                  set({
                    canadianEducation: v as CrsInput["canadianEducation"],
                  })
                }
              />
              <div className="rounded-xl bg-cream-deep p-4 text-sm leading-relaxed text-ink-soft">
                <strong className="text-ink">Note:</strong> job-offer points
                were removed by IRCC in March 2025, so a job offer no longer
                changes your score — though Canadian work experience still
                does, a lot.
              </div>
            </>
          )}

          <div className="flex items-center justify-between border-t border-line-soft pt-4">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm font-medium text-ink-soft hover:text-ink disabled:invisible"
            >
              ← Back
            </button>
            {!isLast ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary !py-2.5 text-sm"
              >
                Continue
                <Icon name="arrowRight" size={16} />
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium text-spruce-700">
                <Icon name="check" size={16} />
                That&apos;s everything — your score is live
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Live score panel */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="card">
          <p className="text-sm text-ink-soft">Your CRS score so far</p>
          <p className="display mt-1 text-6xl tabular-nums">{result.total}</p>
          <p className="mt-1 text-sm text-ink-muted">out of 1,200</p>

          <div className="mt-5">
            <div className="relative h-3 overflow-hidden rounded-full bg-cream-deep">
              <div
                className="h-full rounded-full bg-spruce-600 transition-all"
                style={{ width: `${Math.min(100, (result.total / 1200) * 100)}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-ink/50"
                style={{ left: `${(DRAW_REFERENCE / 1200) * 100}%` }}
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              {gap > 0 ? (
                <>
                  <span className="font-medium text-ink">
                    {gap} points below
                  </span>{" "}
                  recent all-program draws (~{DRAW_REFERENCE}). Category draws
                  (French, health, trades) and PNP invite at other levels.
                </>
              ) : (
                <>
                  <span className="font-medium text-spruce-700">
                    At or above recent all-program draws
                  </span>{" "}
                  (~{DRAW_REFERENCE}) — check{" "}
                  <a
                    className="underline"
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    the latest cut-offs
                  </a>
                  .
                </>
              )}
            </p>
          </div>

          <dl className="mt-5 space-y-2 border-t border-line-soft pt-4 text-sm">
            {[
              ["Age", result.age],
              ["Education", result.education],
              ["First language", result.firstLanguage],
              ["Second language", result.secondLanguage],
              ["Canadian work", result.canadianWork],
              ["Spouse factors", result.spouseFactors],
              ["Skill transferability", result.transferability],
              ["Additional points", result.additional],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between">
                <dt className="text-ink-soft">{label}</dt>
                <dd className="font-medium tabular-nums text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Mobile: live score visible while answering */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-baseline justify-between">
          <span className="text-sm text-ink-soft">CRS score</span>
          <span className="font-display text-2xl font-semibold tabular-nums text-ink">
            {result.total}
            <span className="ml-1 text-xs font-normal text-ink-muted">/ 1,200</span>
          </span>
        </div>
      </div>
      <div className="h-14 lg:hidden" />
    </div>
  );
}
