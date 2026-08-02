"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  buildChecklist,
  STATUS_LABELS,
  useProfile,
  type ImmigrationStatus,
  type UserProfile,
} from "@/lib/profile";
import { YesNoControl } from "@/components/SegmentedControl";
import Icon from "@/components/Icon";

const PROVINCE_OPTIONS: Array<{
  value: NonNullable<UserProfile["province"]>;
  label: string;
}> = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "OTHER", label: "Another province/territory" },
];

const SAMPLE_ITEMS = [
  "Get your Social Insurance Number (SIN)",
  "Understand your first tax return",
  "Apply for GST/HST credit and benefits",
];

export default function ProfileClient() {
  const { profile, update, reset, loaded } = useProfile();
  const { data: session } = useSession();

  const checklist = buildChecklist(profile);
  const done = new Set(profile.completedTasks);
  const started = profile.status !== null;

  const toggleTask = (id: string) => {
    update({
      completedTasks: done.has(id)
        ? profile.completedTasks.filter((t) => t !== id)
        : [...profile.completedTasks, id],
    });
  };

  if (!loaded) {
    return <div className="container-page py-12 text-ink-muted">Loading…</div>;
  }

  return (
    <div className="container-page max-w-5xl py-12">
      <p className="eyebrow">Your personal plan</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">
        {session?.user?.name
          ? `${session.user.name.split(" ")[0]}, here's your checklist`
          : "Your checklist"}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">
        Five quick questions, one personal to-do list — the tax and
        immigration steps that match your situation, nothing more.
      </p>
      <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
        <Icon name="lock" size={16} className="text-spruce-600" />
        Saved only in this browser — never uploaded, signed in or not.{" "}
        <Link href="/privacy" className="font-medium text-spruce-700 underline decoration-spruce-300 underline-offset-2">
          How privacy works
        </Link>
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px,1fr]">
        <div className="card space-y-5 self-start">
          <h2 className="font-semibold text-ink">About you</h2>
          <div>
            <label className="label-field" htmlFor="status">
              Where are you in the journey?
            </label>
            <select
              id="status"
              className="input-field"
              value={profile.status ?? ""}
              onChange={(e) =>
                update({
                  status: (e.target.value || null) as ImmigrationStatus | null,
                })
              }
            >
              <option value="" disabled>
                Select…
              </option>
              {(Object.keys(STATUS_LABELS) as ImmigrationStatus[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="prov">
              Province
            </label>
            <select
              id="prov"
              className="input-field"
              value={profile.province ?? ""}
              onChange={(e) =>
                update({
                  province: (e.target.value || null) as UserProfile["province"],
                })
              }
            >
              <option value="" disabled>
                Select…
              </option>
              {PROVINCE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <YesNoControl
            label="Business or freelance income (now or planned)?"
            value={profile.hasBusiness}
            onChange={(hasBusiness) => update({ hasBusiness })}
          />
          <YesNoControl
            label="Assets in India worth over CAD $100,000?"
            hint="Property, fixed deposits, shares, mutual funds."
            value={profile.hasForeignAssets}
            onChange={(hasForeignAssets) => update({ hasForeignAssets })}
          />
          <YesNoControl
            label="Do you send money to family in India?"
            value={profile.sendsMoneyToIndia}
            onChange={(sendsMoneyToIndia) => update({ sendsMoneyToIndia })}
          />
          <button
            onClick={reset}
            className="text-sm font-medium text-ink-muted underline hover:text-ink"
          >
            Clear my answers from this device
          </button>
        </div>

        <div>
          {!started ? (
            <div className="relative">
              {/* Skeleton preview so the payoff is visible before answering */}
              <ul className="space-y-3 opacity-50 blur-[1.5px]" aria-hidden="true">
                {SAMPLE_ITEMS.map((t) => (
                  <li key={t} className="card flex items-start gap-3 py-4">
                    <span className="mt-1 h-5 w-5 shrink-0 rounded border border-line" />
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{t}</p>
                      <p className="mt-1.5 h-3 w-2/3 rounded bg-cream-deep" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-card">
                  Answer the questions to unlock your list →
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-semibold text-ink">
                  Your to-do list
                </h2>
                <span className="text-sm tabular-nums text-ink-muted">
                  {checklist.filter((i) => done.has(i.id)).length}/
                  {checklist.length} done
                </span>
              </div>
              <ul className="space-y-3">
                {checklist.map((item) => {
                  const checked = done.has(item.id);
                  return (
                    <li
                      key={item.id}
                      className={`card flex items-start gap-3 py-4 transition ${
                        checked ? "opacity-60" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTask(item.id)}
                        aria-label={`Mark "${item.title}" as done`}
                        className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-spruce-700"
                      />
                      <div className="min-w-0">
                        <p
                          className={`font-medium text-ink ${
                            checked ? "line-through" : ""
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                        {item.href && (
                          <Link
                            href={item.href}
                            className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-spruce-700 hover:underline"
                          >
                            Open the tool <Icon name="arrowRight" size={14} />
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
