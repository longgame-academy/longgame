import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Guide",
  description: "Get the free guide and start building confidence, communication, and resilience with your young athlete today.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

