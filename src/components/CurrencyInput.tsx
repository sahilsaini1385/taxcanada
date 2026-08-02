"use client";

import { useState } from "react";

const fmt = new Intl.NumberFormat("en-CA");

// Currency field with $ prefix and thousands formatting on blur.
// Keeps a plain digit string in state upstream.
export default function CurrencyInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (digits: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const digits = value.replace(/[^0-9]/g, "");
  const display = focused
    ? digits
    : digits
      ? fmt.format(Number(digits))
      : "";

  return (
    <div>
      <label className="label-field" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-muted">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="input-field pl-8 tabular-nums"
          placeholder="0"
          value={display}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{hint}</p>}
    </div>
  );
}
