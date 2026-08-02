import { NextResponse } from "next/server";
import { googleConfigured } from "@/lib/auth";

// Lets the client know whether Google sign-in is available, so the UI can
// hide the button (rather than show a broken one) on unconfigured deploys.
export function GET() {
  return NextResponse.json({ googleConfigured });
}
