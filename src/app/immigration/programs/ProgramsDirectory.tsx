"use client";

import { useState } from "react";
import {
  PROGRAMS,
  REGION_LABELS,
  type Region,
} from "@/lib/programs";
import Icon from "@/components/Icon";

type Filter = "all" | Region;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "canada", label: "Canada-wide" },
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
];

export default function ProgramsDirectory() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = PROGRAMS.filter(
    (p) => filter === "all" || p.region === filter || (filter !== "canada" && p.region === "canada")
  );

  return (
    <div className="mt-8">
      <div
        role="radiogroup"
        aria-label="Filter programs by region"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const active = f.value === filter;
          return (
            <button
              key={f.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(f.value)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-spruce-800 bg-spruce-800 text-white"
                  : "border-line bg-white text-ink-soft hover:border-ink/30"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      {filter !== "all" && filter !== "canada" && (
        <p className="mt-3 text-sm text-ink-muted">
          Showing {REGION_LABELS[filter]} programs plus Canada-wide services
          available everywhere.
        </p>
      )}

      <ul className="mt-6 space-y-4">
        {shown.map((p) => (
          <li key={p.name} className="card">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold text-ink">{p.name}</h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  p.kind === "government"
                    ? "bg-spruce-50 text-spruce-800"
                    : "bg-saffron-50 text-saffron-800"
                }`}
              >
                {p.kind === "government" ? "Government" : "Non-profit"}
              </span>
              <span className="rounded-full bg-cream-deep px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                {REGION_LABELS[p.region]}
              </span>
              {p.southAsian && (
                <span className="rounded-full bg-cream-deep px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                  South Asian community focus
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {p.desc}
            </p>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-spruce-700 underline decoration-spruce-300 underline-offset-2 hover:decoration-spruce-600"
            >
              Visit official site
              <Icon name="arrowRight" size={14} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
