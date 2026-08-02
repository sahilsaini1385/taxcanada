import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { EXPERT, expertContactReady } from "@/lib/site";

export const metadata: Metadata = {
  title: `Talk to ${EXPERT.name}`,
  description: `Book a consultation with ${EXPERT.name} — ${EXPERT.title.toLowerCase()} serving Indian newcomers across Canada in English, Hindi, and Punjabi.`,
};

const SERVICES: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "calculator",
    title: "Personal taxes",
    items: [
      "First-year newcomer returns (world income, treaty relief)",
      "Foreign asset reporting (T1135) done right",
      "Missed benefits — GST/HST credit, CCB, tuition carry-forwards",
      "CRA letters, reviews, and voluntary disclosures",
    ],
  },
  {
    icon: "store",
    title: "Business & accounting",
    items: [
      "Incorporation: when it helps, when it doesn't",
      "GST/HST registration and filings",
      "Bookkeeping and year-end financials",
      "Salary vs dividends planning for owner-operators",
    ],
  },
  {
    icon: "map",
    title: "Immigration support",
    items: [
      "Express Entry profile and documentation review",
      "PNP stream selection for your occupation",
      "Family sponsorship and super visa applications",
      "PR card renewals and citizenship applications",
    ],
  },
];

const WHEN: string[] = [
  "Your first Canadian return with Indian income, property, or NRE/NRO accounts",
  "You got a letter from the CRA and aren't sure what it means",
  "Your business crossed (or will cross) the $30,000 GST/HST threshold",
  "You're deciding whether to incorporate",
  "Your CRS score is close to draw cut-offs and strategy matters",
  "A refusal, a deadline, or anything where a mistake is expensive",
];

export default function ExpertPage() {
  return (
    <div className="container-page max-w-4xl py-14">
      <p className="eyebrow">Need a professional?</p>
      <h1 className="display mt-3 text-3xl [text-wrap:balance] sm:text-4xl">
        When it&apos;s more than a calculator can handle, talk to{" "}
        {EXPERT.name}.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {EXPERT.blurb}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,340px]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-1">
            {SERVICES.map((s) => (
              <div key={s.title} className="card">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-spruce-50 text-spruce-700">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h2 className="font-semibold text-ink">{s.title}</h2>
                </div>
                <ul className="mt-4 space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <Icon
                        name="check"
                        size={15}
                        className="mt-0.5 shrink-0 text-spruce-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 className="font-semibold text-ink">
              When a professional is worth it
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Our free tools handle the common cases. These are the moments
              where hands-on help usually pays for itself:
            </p>
            <ul className="mt-4 space-y-2">
              {WHEN.map((w) => (
                <li
                  key={w}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="mt-0.5 shrink-0 text-saffron-600"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="card border-spruce-200 bg-spruce-50/60 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-spruce-800 font-display text-3xl font-semibold text-white">
              {EXPERT.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <h2 className="display mt-4 text-2xl">{EXPERT.name}</h2>
            <p className="mt-1 text-sm text-ink-soft">{EXPERT.title}</p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-ink-soft">
              <Icon name="globe" size={16} className="text-spruce-600" />
              {EXPERT.languages.join(" · ")}
            </p>

            <div className="mt-6 space-y-2.5">
              {expertContactReady ? (
                <>
                  {EXPERT.bookingUrl && (
                    <a
                      href={EXPERT.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                    >
                      Book a consultation
                    </a>
                  )}
                  {EXPERT.phone && (
                    <a href={`tel:${EXPERT.phone}`} className="btn-secondary w-full">
                      <Icon name="phone" size={18} />
                      {EXPERT.phone}
                    </a>
                  )}
                  {EXPERT.email && (
                    <a
                      href={`mailto:${EXPERT.email}`}
                      className="btn-secondary w-full"
                    >
                      {EXPERT.email}
                    </a>
                  )}
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-spruce-300 bg-white px-4 py-5 text-sm leading-relaxed text-ink-soft">
                  <p className="font-medium text-ink">
                    Consultation bookings opening soon
                  </p>
                  <p className="mt-1">
                    In the meantime, run the{" "}
                    <Link
                      href="/tax/calculator"
                      className="font-medium text-spruce-700 underline decoration-spruce-300 underline-offset-2"
                    >
                      tax calculator
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/profile"
                      className="font-medium text-spruce-700 underline decoration-spruce-300 underline-offset-2"
                    >
                      build your checklist
                    </Link>{" "}
                    so your first conversation starts prepared.
                  </p>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Free tools stay free — professional services are separate and
              always clearly labeled, like this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
