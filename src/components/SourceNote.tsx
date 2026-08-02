// Trust element: every tool/guide states what it's based on, when it was
// last reviewed, and where the official numbers live.
export default function SourceNote({
  sources,
  reviewed,
}: {
  sources: { label: string; href: string }[];
  reviewed: string;
}) {
  return (
    <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
      <p className="font-semibold text-slate-700">
        Where these numbers come from
      </p>
      <ul className="mt-1.5 space-y-1">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
            >
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-slate-500">Last reviewed: {reviewed}</p>
    </div>
  );
}
