import Link from "next/link";

const TOOLS = [
  {
    href: "/tax/calculator",
    emoji: "🧮",
    title: "2025 Tax Calculator",
    desc: "Estimate federal + provincial tax, CPP and EI on your salary or business income. Ontario, BC and Alberta.",
  },
  {
    href: "/immigration/crs-calculator",
    emoji: "📊",
    title: "CRS Score Calculator",
    desc: "Your Express Entry score with the full IRCC points grid — including the 2025 removal of job-offer points.",
  },
  {
    href: "/tax/newcomer-guide",
    emoji: "🛬",
    title: "First-Year Tax Guide",
    desc: "World income, the India–Canada tax treaty, NRE/NRO accounts, T1135 foreign assets — explained simply.",
  },
  {
    href: "/tax/small-business",
    emoji: "🏪",
    title: "Small Business Guide",
    desc: "GST/HST registration, write-offs, and when incorporating actually saves you money.",
  },
  {
    href: "/immigration/pathways",
    emoji: "🗺️",
    title: "Immigration Pathways",
    desc: "Express Entry vs PNP vs study route — honest comparisons for applicants from India.",
  },
  {
    href: "/profile",
    emoji: "✅",
    title: "Your Checklist",
    desc: "Answer five questions, get a personal to-do list. Stored on your device, never uploaded.",
  },
];

const TRUST = [
  {
    emoji: "🔒",
    title: "Private by design",
    desc: "No database. Your answers and income figures stay in your browser. Google sign-in is optional and only adds your name — we never see your numbers.",
  },
  {
    emoji: "📚",
    title: "Sources on every page",
    desc: "Every figure links to the CRA or IRCC page it came from, with a visible last-reviewed date. Check our work — we want you to.",
  },
  {
    emoji: "🤝",
    title: "Honest about limits",
    desc: "We're an educational tool, not a CPA or licensed consultant. When something needs a professional, we say so instead of pretending.",
  },
  {
    emoji: "🇮🇳",
    title: "Built for your situation",
    desc: "NRE accounts, money sent home, Indian degrees and ECAs, the India–Canada tax treaty — the questions generic Canadian sites skip.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="container-page py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">
            For Indian immigrants in Canada 🇮🇳 → 🇨🇦
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Taxes and immigration,{" "}
            <span className="text-primary-700">explained like a friend would</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Free calculators and plain-language guides for your first tax
            return, your CRS score, and your small business — built around the
            questions people from India actually ask. No account needed, no
            data collected.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tax/calculator" className="btn-primary">
              Estimate my 2025 taxes
            </Link>
            <Link href="/immigration/crs-calculator" className="btn-secondary">
              Check my CRS score
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Educational tool — not professional advice. Every page links to
            official CRA and IRCC sources.
          </p>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-slate-900">
          Start with what you need today
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card transition hover:border-primary-300 hover:shadow-md"
            >
              <span className="text-2xl">{t.emoji}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {t.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Why you can trust this site
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Newcomers get targeted by bad advice and outright scams. We built
            MapleRoots to be the opposite: transparent, private, and free.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {TRUST.map((t) => (
              <div key={t.title} className="flex gap-4">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="card border-saffron-200 bg-saffron-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            ⚠️ A note on scams targeting newcomers
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            The CRA will <strong>never</strong> demand payment by gift card,
            e-transfer, or crypto, and will never threaten immediate arrest or
            deportation by phone. IRCC never calls asking for money. If you get
            such a call in Hindi, Punjabi, or English — hang up. Verify any CRA
            matter by logging into{" "}
            <a
              className="font-medium text-primary-700 underline"
              href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CRA My Account
            </a>{" "}
            or calling the CRA directly at 1-800-959-8281.
          </p>
        </div>
      </section>
    </>
  );
}
