import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

const TOOLS: {
  href: string;
  icon: IconName;
  title: string;
  desc: string;
}[] = [
  {
    href: "/tax/calculator",
    icon: "calculator",
    title: "2025 tax calculator",
    desc: "Federal + provincial tax, CPP and EI on your salary or business income — with a visual breakdown of where every dollar goes.",
  },
  {
    href: "/immigration/crs-calculator",
    icon: "gauge",
    title: "CRS score calculator",
    desc: "Your Express Entry score, step by step, with the full IRCC points grid — updated for the 2025 rule changes.",
  },
  {
    href: "/tax/newcomer-guide",
    icon: "landing",
    title: "First-year tax guide",
    desc: "World income, the India–Canada treaty, NRE/NRO interest, T1135 — the parts generic guides skip.",
  },
  {
    href: "/tax/small-business",
    icon: "store",
    title: "Small business guide",
    desc: "The $30,000 GST/HST rule, real write-offs, and an honest take on when incorporating pays off.",
  },
  {
    href: "/immigration/pathways",
    icon: "map",
    title: "Pathways compared",
    desc: "Express Entry vs PNP vs the study route — with the trade-offs agents back home don't mention.",
  },
  {
    href: "/profile",
    icon: "checklist",
    title: "Your checklist",
    desc: "Five questions, one personal to-do list. Saved on your device, never uploaded.",
  },
];

const AUDIENCE: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "globe",
    title: "NRE & NRO accounts",
    desc: "NRE interest is tax-free in India but fully taxable in Canada — we cover the rules that actually apply to you.",
  },
  {
    icon: "file",
    title: "The India–Canada treaty",
    desc: "How foreign tax credits stop double taxation on Indian rental income, interest, and TDS already paid.",
  },
  {
    icon: "sparkle",
    title: "Indian degrees & ECAs",
    desc: "How a B.Tech or M.Com assesses for Express Entry, and where the credential points really come from.",
  },
  {
    icon: "users",
    title: "Money sent home",
    desc: "What sending money to family means at tax time — and what refund promises to ignore.",
  },
];

const FAQ = [
  {
    q: "Is this really free? What's the catch?",
    a: "The tools and guides are free — no paid tier, no ads, no data collection. Here's the honest business model: the site is run by the practice of Jatinder Saini, a tax and accounting professional who also works as an immigration consultant for forms and paperwork. If you ever need hands-on help, that service is paid and always clearly labeled. The calculators never hold anything back to upsell you.",
  },
  {
    q: "Do I need an account?",
    a: "No. Every tool works without signing in. Google sign-in exists only to greet you by name — your answers and income figures stay in your browser either way.",
  },
  {
    q: "Where do your numbers come from?",
    a: "Every calculator and guide links to the exact CRA or IRCC page it's based on, with a visible last-reviewed date. We'd rather you check our work than trust us blindly.",
  },
  {
    q: "Someone called saying I owe the CRA money. Is it real?",
    a: "Almost certainly a scam — they specifically target newcomers, often in Hindi or Punjabi. The CRA never demands gift cards, e-transfers, or crypto, and never threatens arrest or deportation by phone. Hang up and check CRA My Account directly, or call the CRA at 1-800-959-8281.",
  },
  {
    q: "Can this replace an accountant or immigration consultant?",
    a: "No, and we won't pretend otherwise. It will make you a far better-informed client — you'll know your rough numbers, your options, and the right questions to ask before paying anyone. When you do want hands-on help, Jatinder Saini handles taxes and accounting end to end, and takes immigration forms and paperwork off your plate — in English, Hindi, and Punjabi.",
  },
];

function HeroPreview() {
  // Static miniature of the tax result card — a real product preview,
  // not a stock illustration. Figures match the calculator's ON $75k case.
  const segments = [
    { label: "Take-home", pct: 75.6, color: "bg-chart-takehome" },
    { label: "Federal", pct: 11.4, color: "bg-chart-federal" },
    { label: "Provincial", pct: 6, color: "bg-chart-provincial" },
    { label: "CPP", pct: 5.6, color: "bg-chart-cpp" },
    { label: "EI", pct: 1.4, color: "bg-chart-ei" },
  ];
  return (
    <div className="mx-auto w-full max-w-md" aria-hidden="true">
      <div className="rotate-1 rounded-2xl border border-line bg-white p-6 shadow-lift">
        <p className="text-sm text-ink-soft">Take-home on $75,000 in Ontario</p>
        <p className="display mt-1 text-5xl tabular-nums">$56,671</p>
        <p className="mt-1 text-sm text-ink-muted">≈ $4,723 per month</p>
        <div className="mt-5 flex h-3.5 gap-[2px] overflow-hidden rounded-lg">
          {segments.map((s) => (
            <div
              key={s.label}
              className={`${s.color} min-w-[5px] rounded-[3px]`}
              style={{ width: `${s.pct}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {segments.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs text-ink-soft">
              <span className={`h-2.5 w-2.5 rounded-sm ${s.color}`} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 -mt-4 ml-2 flex w-fit -rotate-2 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-lift sm:-ml-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spruce-100 text-spruce-700">
          <Icon name="gauge" size={20} />
        </span>
        <div>
          <p className="text-xs text-ink-muted">Your CRS score</p>
          <p className="text-lg font-semibold tabular-nums text-ink">
            496 <span className="text-xs font-normal text-ink-muted">/ 1,200</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-line bg-white">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr,1fr] lg:py-24">
          <div>
            <p className="eyebrow">For Indian newcomers to Canada</p>
            <h1 className="display mt-4 max-w-2xl text-4xl leading-[1.08] [text-wrap:balance] sm:text-5xl lg:text-[3.4rem]">
              Your first tax season, sorted. Your path to PR, mapped.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Free calculators and plain-language guides that answer the
              questions Indian immigrants actually ask — no jargon, no account,
              no sales pitch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tax/calculator" className="btn-primary">
                Estimate my 2025 taxes
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link href="/immigration/crs-calculator" className="btn-secondary">
                Check my CRS score
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-ink-soft">
              {[
                "100% free, no account",
                "Nothing leaves your device",
                "Built on CRA & IRCC figures",
              ].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" size={15} className="text-spruce-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-8 lg:pb-0">
            <HeroPreview />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <p className="eyebrow">Free tools & guides</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Start with what you need today
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card group transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
                <Icon name={t.icon} size={24} />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {t.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-spruce-700 opacity-0 transition group-hover:opacity-100">
                Open <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Made for your situation</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                The questions generic Canadian sites skip
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                Most tax and immigration content assumes you were born here.
                ApnaCanada starts from the other side of the journey — money,
                family, and paperwork that stretch between India and Canada.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {AUDIENCE.map((a) => (
                <div key={a.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron-50 text-saffron-600">
                    <Icon name={a.icon} size={22} />
                  </span>
                  <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              icon: "lock" as IconName,
              title: "Private by design",
              desc: "No database exists. Your answers and income figures live in your browser and nowhere else — signing in with Google only adds your name.",
            },
            {
              icon: "book" as IconName,
              title: "Sources on every page",
              desc: "Every figure links to the CRA or IRCC page it came from, with a visible last-reviewed date. Check our work — we want you to.",
            },
            {
              icon: "shield" as IconName,
              title: "Honest about limits",
              desc: "This is education, not professional advice. When something needs a CPA or licensed RCIC, we say so instead of pretending.",
            },
          ].map((t) => (
            <div key={t.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spruce-800 text-white">
                <Icon name={t.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid items-center gap-10 rounded-2xl border border-spruce-200 bg-spruce-50 p-8 sm:p-10 lg:grid-cols-[1fr,auto]">
            <div>
              <p className="eyebrow">Need a professional?</p>
              <h2 className="display mt-3 text-2xl [text-wrap:balance] sm:text-3xl">
                Some situations deserve more than a calculator.
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                First-year returns with Indian income, CRA letters, GST/HST,
                bookkeeping for businesses too small for a full-time
                accountant, and immigration forms done right the first time —{" "}
                <strong className="text-ink">Jatinder Saini</strong> handles
                these for Indian newcomers every day, in English, Hindi, and
                Punjabi. Bring your numbers from our tools and the
                conversation starts halfway done.
              </p>
            </div>
            <Link href="/expert" className="btn-primary justify-self-start lg:justify-self-end">
              Meet Jatinder
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page max-w-3xl pb-16 sm:pb-20">
          <h2 className="display text-3xl sm:text-4xl">Fair questions</h2>
          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Icon
                    name="chevronDown"
                    size={18}
                    className="shrink-0 text-ink-muted transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-spruce-900">
        <div className="container-page flex flex-col items-center py-16 text-center sm:py-20">
          <h2 className="display max-w-2xl text-3xl text-white [text-wrap:balance] sm:text-4xl">
            Five minutes now beats a surprise in April.
          </h2>
          <p className="mt-4 max-w-xl text-spruce-100">
            See your 2025 numbers, check your CRS score, and get a checklist
            built for your situation — all before your chai gets cold.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/tax/calculator"
              className="btn-primary !bg-white !text-spruce-900 hover:!bg-cream"
            >
              Estimate my taxes
            </Link>
            <Link
              href="/profile"
              className="btn-secondary !border-spruce-600 !bg-transparent !text-white hover:!bg-spruce-800"
            >
              Build my checklist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
