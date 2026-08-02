"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { LeafMark } from "./Icon";

const NAV = [
  { href: "/tax", label: "Taxes" },
  { href: "/immigration", label: "Immigration" },
  { href: "/profile", label: "My checklist" },
  { href: "/expert", label: "Talk to an expert" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-spruce-800 text-saffron-300">
            <LeafMark size={22} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Apna<span className="text-saffron-600">Canada</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-saffron-500"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <AuthButton />
          <Link
            href="/tax/calculator"
            className="btn-primary !px-5 !py-2 text-sm"
          >
            Estimate my taxes
          </Link>
        </div>

        <button
          className="ml-auto rounded-lg p-2 text-ink-soft hover:bg-cream-deep md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-cream md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-ink-soft hover:bg-cream-deep hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tax/calculator"
              onClick={() => setOpen(false)}
              className="btn-primary mx-3 mt-2 text-sm"
            >
              Estimate my taxes
            </Link>
            <div className="px-3 py-2.5">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
