import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Long Game's disclaimer for parent development content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
