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

const PROVINCE_OPTIONS: Array<{
  value: NonNullable<UserProfile["province"]>;
  label: string;
}> = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "OTHER", label: "Another province/territory" },
];

function YesNo({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <label className="label-field" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="input-field"
        value={value ? "yes" : "no"}
        onChange={(e) => onChange(e.target.value === "yes")}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  );
}

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
    return <div className="container-page py-12 text-slate-500">Loading…</div>;
  }

  return (
    <div className="container-page max-w-4xl py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        {session?.user?.name
          ? `${session.user.name.split(" ")[0]}'s checklist`
          : "Your checklist"}
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        Five quick questions, one personal to-do list — covering the tax and
        immigration steps that match your situation.
      </p>
      <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
        🔒 Your answers are saved <strong>only in this browser</strong> — they
        are never uploaded, signed in or not.{" "}
        <Link href="/privacy" className="underline">
          How privacy works here
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[340px,1fr]">
        <div className="card space-y-4 self-start">
          <h2 className="font-semibold text-slate-900">About you</h2>
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
          <YesNo
            id="business"
            label="Do you have (or plan) a business or freelance income?"
            value={profile.hasBusiness}
            onChange={(hasBusiness) => update({ hasBusiness })}
          />
          <YesNo
            id="assets"
            label="Assets in India worth over CAD $100,000? (property, FDs, shares)"
            value={profile.hasForeignAssets}
            onChange={(hasForeignAssets) => update({ hasForeignAssets })}
          />
          <YesNo
            id="remit"
            label="Do you send money to family in India?"
            value={profile.sendsMoneyToIndia}
            onChange={(sendsMoneyToIndia) => update({ sendsMoneyToIndia })}
          />
          <button
            onClick={reset}
            className="text-sm font-medium text-slate-500 underline hover:text-slate-700"
          >
            Clear my answers from this device
          </button>
        </div>

        <div>
          {!started ? (
            <div className="card border-dashed text-center text-slate-500">
              <p className="text-4xl">👋</p>
              <p className="mt-3 font-medium text-slate-700">
                Answer the questions to build your checklist
              </p>
              <p className="mt-1 text-sm">
                It updates instantly as you answer — nothing is submitted
                anywhere.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-semibold text-slate-900">
                  Your to-do list ({checklist.filter((i) => done.has(i.id)).length}
                  /{checklist.length} done)
                </h2>
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
                        className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-primary-700"
                      />
                      <div className="min-w-0">
                        <p
                          className={`font-medium text-slate-900 ${
                            checked ? "line-through" : ""
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                          {item.detail}
                        </p>
                        {item.href && (
                          <Link
                            href={item.href}
                            className="mt-1 inline-block text-sm font-medium text-primary-700 hover:underline"
                          >
                            Open the tool →
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
