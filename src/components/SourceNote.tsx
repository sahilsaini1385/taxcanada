import Icon from "./Icon";

// Compact trust chip: sources + last-reviewed date in one expandable row,
// so disclaimers don't triple-stack on every page.
export default function SourceNote({
  sources,
  reviewed,
}: {
  sources: { label: string; href: string }[];
  reviewed: string;
}) {
  return (
    <details className="group mt-10 rounded-xl border border-line bg-white">
      <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-sm text-ink-soft [&::-webkit-details-marker]:hidden">
        <Icon name="shield" size={18} className="shrink-0 text-spruce-600" />
        <span>
          Built on official figures · Last reviewed{" "}
          <span className="font-medium text-ink">{reviewed}</span>
        </span>
        <Icon
          name="chevronDown"
          size={16}
          className="ml-auto shrink-0 text-ink-muted transition group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-line-soft px-4 py-3 text-sm text-ink-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Sources
        </p>
        <ul className="mt-1.5 space-y-1.5">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spruce-700 underline decoration-spruce-300 underline-offset-2 hover:decoration-spruce-600"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          MapleRoots is educational, not professional advice. Confirm important
          decisions with the CRA, IRCC, a CPA, or a licensed consultant.
        </p>
      </div>
    </details>
  );
}
