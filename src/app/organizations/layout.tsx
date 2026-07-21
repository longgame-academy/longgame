import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Organizations",
  description: "Support your club, team, or association families with a shared language, practical tools, and a healthier parent experience.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
