import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How MapleRoots handles your data: everything stays in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page prose-section max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Privacy — the short, honest version
      </h1>
      <p>
        Trust is the whole point of this site, so here is exactly what happens
        with your data. This page is written in plain language on purpose.
      </p>

      <h2>What we store, and where</h2>
      <ul>
        <li>
          <strong>Your checklist answers and calculator inputs</strong> live in
          your browser&apos;s local storage, on your device. They are never
          sent to any server. Clearing your browser data deletes them.
        </li>
        <li>
          <strong>We have no database.</strong> There is nowhere for your
          income, immigration status, or family details to be uploaded to.
        </li>
      </ul>

      <h2>What Google sign-in does (and doesn&apos;t do)</h2>
      <ul>
        <li>
          Signing in with Google shares your <strong>name, email, and
          profile photo</strong> with the site so it can greet you and keep
          you signed in across visits. That&apos;s it.
        </li>
        <li>
          Sign-in does <strong>not</strong> upload your checklist or
          calculator inputs — those stay on your device either way.
        </li>
        <li>
          The site is fully usable without signing in. Nothing is locked
          behind an account.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        The only cookies used are the session cookies that keep you signed in
        after you choose Google sign-in. There are no advertising or tracking
        cookies.
      </p>

      <h2>Questions</h2>
      <p>
        This project is open source — you can read the code and verify every
        claim on this page yourself.
      </p>
    </div>
  );
}
