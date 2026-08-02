import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-slate-900">🍁 MapleRoots</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Plain-language tax and immigration guidance for Indian newcomers
              to Canada. Free, private, and honest about its limits.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Explore</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li><Link className="hover:text-primary-700" href="/tax/calculator">Tax calculator</Link></li>
              <li><Link className="hover:text-primary-700" href="/tax/newcomer-guide">Newcomer tax guide</Link></li>
              <li><Link className="hover:text-primary-700" href="/tax/small-business">Small business taxes</Link></li>
              <li><Link className="hover:text-primary-700" href="/immigration/crs-calculator">CRS calculator</Link></li>
              <li><Link className="hover:text-primary-700" href="/immigration/pathways">Immigration pathways</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Official sources</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li>
                <a className="hover:text-primary-700" href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer">
                  Canada Revenue Agency (CRA) ↗
                </a>
              </li>
              <li>
                <a className="hover:text-primary-700" href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">
                  Immigration Canada (IRCC) ↗
                </a>
              </li>
              <li><Link className="hover:text-primary-700" href="/privacy">Privacy — how your data is handled</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
          <p>
            <strong>MapleRoots is educational, not professional advice.</strong>{" "}
            We are not accountants, lawyers, or licensed immigration
            consultants (RCICs). Tax and immigration rules change often and
            depend on your personal situation. Always confirm important
            decisions with the CRA, IRCC, a CPA, or a licensed consultant.
            Figures on this site reflect the 2025 tax year and IRCC rules as
            of mid-2025 unless noted.
          </p>
        </div>
      </div>
    </footer>
  );
}
