import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Your checklist",
  description:
    "Answer a few questions and get a personalized tax and immigration checklist. Stored only on your device.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
