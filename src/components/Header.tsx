"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "./AuthButton";

const NAV = [
  { href: "/tax", label: "Taxes" },
  { href: "/immigration", label: "Immigration" },
  { href: "/profile", label: "My checklist" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 text-lg text-white">
            🍁
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Maple<span className="text-saffron-600">Roots</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-primary-50 text-primary-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <AuthButton />
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2.5">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
