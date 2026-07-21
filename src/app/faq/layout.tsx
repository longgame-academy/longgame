import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about the Long Game Parent Academy and Organization programs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

