import Link from "next/link";
import Icon from "./Icon";
import { EXPERT } from "@/lib/site";

// Contextual lead card dropped at the bottom of tools and guides.
// `context` tailors the first line to what the reader was just doing.
export default function ExpertCta({ context }: { context: string }) {
  return (
    <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-spruce-200 bg-spruce-50 p-6 sm:flex-row sm:items-center">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-spruce-800 text-white">
        <Icon name="users" size={24} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink">{context}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {EXPERT.name} works with Indian newcomers on exactly this — in
          English, Hindi, and Punjabi. A short consultation often pays for
          itself.
        </p>
      </div>
      <Link
        href="/expert"
        className="btn-primary shrink-0 !py-2.5 text-sm sm:self-center"
      >
        Talk to {EXPERT.name.split(" ")[0]}
        <Icon name="arrowRight" size={16} />
      </Link>
    </div>
  );
}
