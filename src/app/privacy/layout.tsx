import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Long Game's privacy policy and how we handle your data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
