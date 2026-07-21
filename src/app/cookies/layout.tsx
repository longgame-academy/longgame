import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Long Game uses cookies on this site.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
