import Link from "next/link";
import { LeafMark } from "./Icon";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-spruce-800 text-saffron-300">
                <LeafMark size={19} />
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                MapleRoots
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Plain-language tax and immigration guidance for Indian newcomers
              to Canada. Free, private, and honest about its limits.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Tax tools</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link className="hover:text-spruce-700" href="/tax/calculator">2025 tax calculator</Link></li>
              <li><Link className="hover:text-spruce-700" href="/tax/newcomer-guide">First-year tax guide</Link></li>
              <li><Link className="hover:text-spruce-700" href="/tax/small-business">Small business taxes</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Immigration</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link className="hover:text-spruce-700" href="/immigration/crs-calculator">CRS score calculator</Link></li>
              <li><Link className="hover:text-spruce-700" href="/immigration/pathways">Pathways compared</Link></li>
              <li><Link className="hover:text-spruce-700" href="/profile">Personal checklist</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Trust</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link className="hover:text-spruce-700" href="/privacy">Privacy — nothing leaves your device</Link></li>
              <li>
                <a className="hover:text-spruce-700" href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer">
                  Canada Revenue Agency ↗
                </a>
              </li>
              <li>
                <a className="hover:text-spruce-700" href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">
                  Immigration Canada (IRCC) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-line-soft pt-6 text-xs leading-relaxed text-ink-muted">
          <p>
            <strong className="text-ink-soft">
              MapleRoots is educational, not professional advice.
            </strong>{" "}
            We are not accountants, lawyers, or licensed immigration
            consultants (RCICs). Rules change often and depend on your
            situation — confirm important decisions with the CRA, IRCC, a CPA,
            or a licensed consultant. Figures reflect the 2025 tax year and
            IRCC rules as of mid-2025 unless noted.
          </p>
        </div>
      </div>
    </footer>
  );
}
