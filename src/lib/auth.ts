import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Google sign-in is optional infrastructure: when the OAuth env vars are
// missing the app still builds and runs, and the UI hides the sign-in
// button. This keeps local development and first deploys friction-free.

export const googleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

export const authOptions: NextAuthOptions = {
  providers: googleConfigured
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : [],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-do-not-use-in-production",
};
