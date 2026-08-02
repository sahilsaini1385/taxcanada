# 🍁 MapleRoots

**Free, plain-language tax and immigration guidance for Indian immigrants in Canada.**

A Next.js web app (works great on mobile) with:

- **2025 income tax calculator** — federal + provincial tax, CPP/EI, RRSP, self-employment income (Ontario, BC, Alberta)
- **Express Entry CRS calculator** — the full IRCC points grid, updated for the March 2025 removal of job-offer points
- **First-year tax guide** — world income, India–Canada tax treaty, NRE/NRO accounts, T1135, newcomer benefits
- **Small business guide** — GST/HST $30k rule, deductions, sole proprietor vs incorporation
- **Immigration pathways** — honest comparisons: Express Entry, PNP, study route, sponsorship, citizenship
- **Personalized checklist** — answer 5 questions, get a to-do list matched to your situation

## Trust-first design principles

1. **Private by design.** No database. Profile answers and calculator inputs live in the browser's `localStorage` and are never uploaded. Google sign-in is optional and only provides a display identity.
2. **Sources on every page.** Every tool and guide cites the CRA/IRCC pages it's based on, with a visible "last reviewed" date (`SourceNote` component).
3. **Honest about limits.** Disclaimers state clearly this is education, not professional advice, and pages point to CPAs/licensed RCICs where it matters.
4. **Scam awareness.** The landing and immigration pages warn about CRA phone scams and immigration fraud that specifically target newcomers.
5. **Nothing gated.** The full experience works without an account.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

The app runs fully without any environment variables — Google sign-in is simply hidden until configured.

## Enabling Google sign-in (optional)

1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create an **OAuth 2.0 Client ID** (type: Web application).
2. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (and later your production URL: `https://your-app.vercel.app/api/auth/callback/google`).
3. Copy `.env.example` to `.env.local` and fill in:
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET` (generate: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (`http://localhost:3000` locally)

## Free hosting (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo. Vercel auto-detects Next.js; no configuration needed.
3. (Optional) Add the four environment variables above in **Project → Settings → Environment Variables**, with `NEXTAUTH_URL` set to your production URL, and add that URL's callback to the Google OAuth client.
4. Deploy. The Hobby tier is free and comfortably handles this app (static pages + tiny API routes, no database).

Netlify and Cloudflare Pages also work; Vercel is the least-friction option for Next.js.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 3](https://tailwindcss.com)
- [NextAuth 4](https://next-auth.js.org) with Google provider (JWT sessions, no database)

## Keeping figures current

Tax brackets and CRS rules change every year. All figures live in two files:

- `src/lib/tax.ts` — 2025 brackets, BPA, CPP/EI limits, Ontario surtax/health premium
- `src/lib/crs.ts` — CRS points grid

Each page shows a "last reviewed" date via the `SourceNote` component — update those dates when you refresh the data.

## Disclaimer

MapleRoots is an educational tool, not professional advice. It is not a substitute for a CPA, tax lawyer, or licensed immigration consultant (RCIC). Verify important decisions with the CRA, IRCC, or a licensed professional.
