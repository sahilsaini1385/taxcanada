// Stacked horizontal bar for money breakdowns.
// Segment colors are the validated CVD-safe chart palette (see
// tailwind.config.ts); 2px gaps + legend + values provide secondary
// encoding so color is never the only channel.

export interface Segment {
  label: string;
  value: number;
  colorClass: string; // tailwind bg-* class
}

export default function BreakdownBar({
  segments,
  formatValue,
}: {
  segments: Segment[];
  formatValue: (n: number) => string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (total <= 0) return null;
  const visible = segments.filter((s) => s.value > 0);

  return (
    <div>
      <div
        className="flex h-4 gap-[2px] overflow-hidden rounded-full"
        role="img"
        aria-label={visible
          .map((s) => `${s.label}: ${formatValue(s.value)}`)
          .join(", ")}
      >
        {visible.map((s) => (
          <div
            key={s.label}
            className={`${s.colorClass} min-w-[3px] rounded-[3px]`}
            style={{ width: `${(s.value / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {visible.map((s) => (
          <li
            key={s.label}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 text-ink-soft">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${s.colorClass}`} />
              {s.label}
            </span>
            <span className="font-medium tabular-nums text-ink">
              {formatValue(s.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
