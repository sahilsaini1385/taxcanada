"use client";

// Radio-pill group replacing two-option <select>s — one tap instead of two.
export default function SegmentedControl<T extends string>({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="label-field">{label}</legend>
      {hint && <p className="-mt-0.5 mb-1.5 text-xs text-ink-muted">{hint}</p>}
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={`min-h-11 flex-1 basis-auto whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-spruce-800 bg-spruce-800 text-white"
                  : "border-line bg-white text-ink-soft hover:border-ink/30"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function YesNoControl({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <SegmentedControl
      label={label}
      hint={hint}
      value={value ? "yes" : "no"}
      onChange={(v) => onChange(v === "yes")}
      options={[
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ]}
    />
  );
}
